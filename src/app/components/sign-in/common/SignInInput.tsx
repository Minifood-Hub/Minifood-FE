import { SignInputProps } from '@/app/_types/sign-in';
import Input from '../../common/Input';

function SignInInput({
  placeholder,
  type,
  value = '',
  onChange = () => {},
  error,
}: SignInputProps) {
  return (
    <Input
      className={`flex h-14 py-1 px-6 items-center gap-[10px] self-stretch rounded border ${error ? 'border-[#FC4C00]' : 'border-gray-1'} bg-white text-gray-7 placeholder:text-gray-4`}
      textValue={value}
      inputType={type}
      placeholder={placeholder}
      type="signin"
      onChange={onChange}
    />
  );
}

export default SignInInput;
