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
      className="flex-center h-[46px] py-4 px-6 self-stretch rounded bg-primary-3"
    >
      <p className="text-white">{text}</p>
    </button>
  );
}
