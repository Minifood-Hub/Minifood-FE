export const BUTTON_STYLE = {
  reorder: (className: string) =>
    `w-[111px] h-[39px] bg-[#55aa00] rounded text-white text-base font-normal ${className}`,
  dialog: (className: string) =>
    `flex-center p-2 gap-2 rounded-lg w-full whitespace-nowrap text-sm font-extrabold ${className}`,
  default: (className: string) => `w-full h-full ${className}`,
  modalLogin: (className: string) =>
    `w-[110px] h-[45px] bg-[#55aa00] rounded text-white text-sm font-bold font-medium cursor-pointer ${className}`,
  modalClose: (className: string) =>
    `w-[110px] h-[45px] bg-white rounded text-black text-sm font-bold border border-[#E0E0E0] cursor-pointer ${className}`,
  modalButton: (className: string) =>
    `flex-center text-white w-[180px] h-[60px] rounded-[50px] text-2xl shadow-md ${className}`,
  faqButton: (className: string) =>
    `flex-center text-white w-[39px] h-[24px] rounded-[4px] text-[13px] ${className}`,
  recommendButton: (className: string) =>
    `flex-center text-black w-[244px] h-[41px] rounded text-[18px] border border-[#e0e0e0] mt-2 font-normal p-2.5 ${className}`,
} as const;

export const INPUT_STYLE = {
  // 회원가입 input
  signin: (className: string) =>
    `w-full p-3 items-center rounded-xl border-2 bg-white text-gray-7 font-bold placeholder:text-gray-2 placeholder:font-normal ${className}`,
  search: (className: string) =>
    ` px-2 py-1 font-black placeholder:font-black focus:outline-none ${className}`,
  // 견적서 개수 입력
  count: (className: string) => `w-14 text-right bg-gray-0 ${className}`,
  headerSearch: (className: string) =>
    `w-80 h-4 font-normal outline-none	 ${className}`,
  default: (className: string) => `w-full h-full ${className}`,
} as const;
