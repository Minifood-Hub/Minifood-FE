'use client';

import Image from 'next/image';
import { REORDER_TEXT } from '@/app/constants/main';
import Button from '../../common/Button';

function Reorder() {
  return (
    <div className="w-[1140px] h-[400px] flex flex-col">
      <div className="rounded-full bg-[#28DE5A] w-8 h-8" />
      <div className="text-[42px] font-medium">{REORDER_TEXT[0]}</div>
      <div className="w-full h-[255px] flex gap-x-7 mt-9 items-center">
        <div>
          <Image
            src="/Images/reorder.jpg"
            alt="재주문 사진"
            width={200}
            height={180}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-4 items-center">
            <div className="flex w-[700px] flex-col gap-y-1 text-xl font-medium">
              <div className="ml-6 text-[#007C31] font-semibold">
                2024. 07. 03
              </div>
              <div className="ml-6">냉동목살, 대파, 양파, 토마토</div>
              <div className="flex h-2 left-0 bg-gradient-to-r from-lime-600 to-green-200 rounded-[30px]" />
            </div>
            <Button
              buttonText={REORDER_TEXT[1]}
              type="reorder"
              isDisabled={false}
              onClickHandler={() => console.log('재주문')}
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex w-[700px] flex-col gap-y-1 text-xl font-medium">
              <div className="ml-6 text-[#007C31] font-semibold">
                2024. 07. 03
              </div>
              <div className="ml-6">냉동목살, 대파, 양파, 토마토</div>
              <div className="flex h-2 left-0 bg-gradient-to-r from-lime-600 to-green-200 rounded-[30px]" />
            </div>
            <Button
              buttonText={REORDER_TEXT[1]}
              type="reorder"
              isDisabled={false}
              onClickHandler={() => console.log('재주문')}
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex w-[700px] flex-col gap-y-1 text-xl font-medium">
              <div className="ml-6 text-[#007C31] font-semibold">
                2024. 07. 03
              </div>
              <div className="ml-6">냉동목살, 대파, 양파, 토마토</div>
              <div className="flex h-2 left-0 bg-gradient-to-r from-lime-600 to-green-200 rounded-[30px]" />
            </div>
            <Button
              buttonText={REORDER_TEXT[1]}
              type="reorder"
              isDisabled={false}
              onClickHandler={() => console.log('재주문')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reorder;
