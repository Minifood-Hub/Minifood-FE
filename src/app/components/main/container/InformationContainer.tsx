import Image from 'next/image';
import Announcement from '../Information.tsx/Announcement';
import CustomerService from '../Information.tsx/CustomerService';
import Question from '../Information.tsx/Question';

function InformationContainer() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-[360px] w-full mb-6">
        <Image
          src="/Images/maintest2.jpg"
          alt="배경"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" w-[1050px] flex justify-between">
        <Announcement />
        <Question />
        <CustomerService />
      </div>
    </div>
  );
}

export default InformationContainer;
