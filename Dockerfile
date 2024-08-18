FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock) 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .
ARG NEXT_PUBLIC_SERVER
ARG NEXT_PUBLIC_LOCAL_SERVER
ENV NEXT_PUBLIC_SERVER=$NEXT_PUBLIC_SERVER
ENV NEXT_PUBLIC_LOCAL_SERVER=$NEXT_PUBLIC_LOCAL_SERVER

RUN npm run build

# 3000번 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]