import { SingInButtonProps } from '@/app/_types/sign-in';

export default function SignInButton({
  onClick,
  type,
  text,
  isDelete,
}: SingInButtonProps) {
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${isDelete ? 'bg-red-1' : 'bg-primary-1'} w-full mt-4 rounded-xl py-3`}
    >
      <p className="text-white text-xl font-black">{text}</p>
    </button>
  );
}
