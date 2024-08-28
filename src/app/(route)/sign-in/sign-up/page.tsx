import Header from '@/app/components/common/layout/Header';
import SignUpComponents from '@/app/components/sign-in/sign-up/SignUpComponents';

export default function SignUp() {
  return (
    <section>
      <div className="shadow-lg">
        <Header />
      </div>
      <div className="flex items-center pt-[101px] w-full h-screen flex-col px-20">
        <SignUpComponents />
      </div>
    </section>
  );
}
