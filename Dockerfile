# 1단계: 환경 설정 및 dependancy 설치
# Docker image 설정 및 별명 설정
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

# 명령어를 실행할 디렉터리 지정 / 존재하지 않으면 생성됨
WORKDIR /usr/src/app

# Dependancy install을 위해 package.json, package-lock.json 복사 
COPY package.json package-lock.json ./

ARG NEXT_PUBLIC_SERVER
ARG NEXT_PUBLIC_NEXT_SERVER
RUN echo "NEXT_PUBLIC_SERVER=${NEXT_PUBLIC_SERVER}" > .env.local
RUN echo "NEXT_PUBLIC_NEXT_SERVER=${NEXT_PUBLIC_LOCAL_SERVER}" >> .env.local


# Dependancy 설치 (새로운 lock 파일 수정 또는 생성 방지)
RUN yarn --frozen-lockfile 

###########################################################

# 2단계: next.js 빌드 단계
FROM node:18-alpine AS builder

# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app

# node_modules 등의 dependancy를 복사함.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Build 도중 생성된 .env.local 파일을 복사
COPY --from=deps /usr/src/app/.env.local ./.env.local

RUN yarn build

###########################################################

# 3단계: next.js 실행 단계
FROM node:18-alpine AS runner

# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app
 
# container 환경에 시스템 사용자를 추가함
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# next.config.js에서 output을 standalone으로 설정하면 
# 빌드에 필요한 최소한의 파일만 ./next/standalone로 출력이 된다.
# standalone 결과물에는 public 폴더와 static 폴더 내용은 포함되지 않으므로, 따로 복사를 해준다.
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# 컨테이너의 수신 대기 포트를 60005으로 설정
EXPOSE 3000

# node로 애플리케이션 실행
CMD ["node", "server.js"]