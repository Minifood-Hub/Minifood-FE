import EditClientComponents from '@/app/components/sign-in/client/EditClientComponents';

export default function ClientEdit() {
  return (
    <section>
      <div className="flex-center w-full h-screen flex-col px-20">
        <div className="h-[200px] w-[900px] text-[100px] text-center font-black whitespace-nowrap">
          거래처 수정
        </div>
        <EditClientComponents />
      </div>
    </section>
  );
}
