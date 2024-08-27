import Header from '@/app/components/common/layout/Header';
import SignInComponents from '@/app/components/sign-in/SignInComponents';

export default function SignIn() {
  return (
    <section>
      <div className="shadow-lg">
        <Header />
      </div>
      <div className="flex items-center pt-[101px] w-full h-screen flex-col px-20">
        <SignInComponents />
      </div>
    </section>
  );
}
