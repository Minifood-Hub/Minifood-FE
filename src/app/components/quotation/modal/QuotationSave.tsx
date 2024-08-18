import { MODAL_TEXT } from '@/app/constants/order';
import CameraIcon from '@/app/ui/Icons/Camera';
import { MouseEventHandler } from 'react';

interface QuotationSaveProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function QuotationSave({ onClick }: QuotationSaveProps) {
  return (
    <div
      onClick={onClick}
      className="flex-center w-[152px] h-10 border-2 rounded-3xl border-black gap-x-1 cursor-pointer"
    >
      <CameraIcon />
      <div className="text-lg">{MODAL_TEXT[4]}</div>
    </div>
  );
}
