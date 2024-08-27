import { SingInButtonProps } from '@/app/_types/sign-in';

export default function SignInButton({
  onClick,
  type,
  text,
}: SingInButtonProps) {
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="flex-center h-[45px] py-1 px-6 self-stretch rounded-md bg-primary-3"
    >
      <p className="text-white">{text}</p>
    </button>
  );
}
