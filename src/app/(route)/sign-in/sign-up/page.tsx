import SignUpComponents from '@/app/components/sign-in/sign-up/SignUpComponents';

export default function SignUp() {
  return (
    <section>
      <div className="flex-center w-full h-screen flex-col px-20">
        <div className="h-[200px] w-[900px] text-[100px] text-center font-black whitespace-nowrap">
          정말 맛있는 푸드
        </div>
        <SignUpComponents />
      </div>
    </section>
  );
}
