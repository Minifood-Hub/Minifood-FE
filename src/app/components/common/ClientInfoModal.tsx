import { ShopIcon } from '@/app/ui/iconPath';
import Icons from './Icons';

interface ClientInfoModalProps {
  name: string | undefined;
  region: string | undefined;
  address: string | undefined;
  isForAccount?: boolean;
}

export default function ClientInfoModal({
  name,
  region,
  address,
  isForAccount,
}: ClientInfoModalProps) {
  return (
    <div
      className={`flex w-[600px] py-[18px] px-6 flex-col justify-center items-start rounded bg-white  ${isForAccount ? 'border border-[#E0E0E0]' : 'shadow-md'}`}
    >
      <div className="flex items-center gap-[18px]">
        <div className="flex-center min-w-[60px] h-[60px] rounded-full bg-primary-3">
          <Icons name={ShopIcon} />
        </div>

        <div className="flex justify-center items-start flex-col gap-[18px]">
          <div className="flex items-center gap-[18px]">
            <p className="text-[#333] text-lg font-medium">{name}</p>
            <div className="flex-center py-1 px-2 h-[25px] rounded border border-primary-3 bg-white text-sm">
              {region}
            </div>
          </div>

          <div className="text-[#333]">{address}</div>
        </div>
      </div>
    </div>
  );
}
