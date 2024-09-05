import { ShopIcon } from '@/app/ui/iconPath';
import Icons from './Icons';

interface ClientInfoModalProps {
  name: string | undefined;
  region: string | undefined;
}

export default function ClientInfoModal({
  name,
  region,
}: ClientInfoModalProps) {
  return (
    <div className=" flex w-[600px] py-[18px] px-6 flex-col justify-center items-start gap-4 rounded bg-white shadow-md">
      <div className="flex items-center gap-[18px]">
        <div className="flex-center w-[60px] h-[60px] rounded-full bg-primary-3">
          <Icons name={ShopIcon} />
        </div>

        <div className="flex justify-center items-start flex-col gap-[18px]">
          <div className="flex items-center gap-[18px]">
            <p className="text-[#333] text-lg font-medium">{name}</p>
            <div className="flex-center py-1 px-2 rounded border border-primary-3 bg-white text-sm">
              {region}
            </div>
          </div>

          <p className="text-[#333]">어디에도 몇시 어쩌구 어디로 1234-5678</p>
        </div>
      </div>
    </div>
  );
}
