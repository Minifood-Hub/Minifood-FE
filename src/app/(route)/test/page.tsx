'use client';

import Icons from '@/app/components/common/Icons';
import { titleIcon } from '@/app/ui/iconPath';
import { testAlert, testAlert2 } from '@/app/utils/toast';
import useTestStore from '@/app/utils/useStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Testpage() {
  const { count, increase } = useTestStore();

  return (
    <div className="w-full h-full flex items-center justify-center text-white text-2xl gap-x-10">
      <div className="w-[600px] h-[400px] bg-white rounded-2xl p-4">
        <h2 className="text-black">toastify</h2>
        {/* <ToastContainer style={{ width: 400, height: 180 }} />  다음과 같이 알림창 크기 조정 가능 */}
        <ToastContainer />
        <button
          type="button"
          onClick={testAlert}
          className="bg-slate-400 rounded-3xl m-4 p-3"
        >
          알림창 테스트 버튼
        </button>
        <button
          type="button"
          onClick={testAlert2}
          className="bg-slate-400 rounded-3xl m-4 p-3"
        >
          알림창 테스트 버튼(error버전 + 이모지x)
        </button>
      </div>
      <div className="w-[600px] h-[400px] bg-white rounded-2xl text-black flex flex-col items-center justify-center gap-y-6 ">
        zustand
        <div className="flex p-2 bg-black text-white rounded-2xl">
          <Icons name={titleIcon} />
          <span>점수 : {count}</span>
        </div>
        <button
          type="button"
          onClick={increase}
          className="w-20 h-10  text-yellow-1 bg-black rounded-2xl"
        >
          one up
        </button>
      </div>
    </div>
  );
}

export default Testpage;
