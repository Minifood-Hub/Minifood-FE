import '@/app/ui/maincarousel.css';
import Announcement from '../Information/Announcement';
import CustomerService from '../Information/CustomerService';
import Question from '../Information/Question';
import MainCarousel from '../carousel/MainCarousel';

function InformationContainer() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-[360px] w-full mb-6">
        <MainCarousel />
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
