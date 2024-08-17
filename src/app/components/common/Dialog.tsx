import Button from './Button';
import Input from './Input';

interface DialogProps {
  topText: string;
  subText?: string;
  BtnText: string;
  onBtnClick: () => void;

  isTwoButton?: boolean;
  onSubBtnClick?: () => void;

  hasInput?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Dialog({
  topText,
  subText,
  BtnText,
  onBtnClick,

  isTwoButton,
  onSubBtnClick,

  hasInput,
  value,
  onChange,
}: DialogProps) {
  return (
    <div className="fixed inset-0 flex-center z-50 bg-black bg-opacity-30">
      <div className="flex w-[500px] p-8 flex-col items-start gap-8 rounded-[4px] border-[1px] border-gray-2 bg-white shadow-xl">
        {/* 텍스트 */}
        <div className="flex items-center flex-col gap-2 self-stretch ">
          <span className="text-center text-lg font-medium break-words whitespace-pre-wrap">
            {topText}
          </span>
          <p className="text-sm">{subText}</p>
        </div>

        {/* 인풋 */}
        {hasInput && (
          <div className="flex flex-col items-start self-stretch">
            <Input
              type="dialog"
              textValue={value}
              onChange={onChange || (() => {})}
            />
            <p className="flex pt-1 pr-2 items-center justify-end self-stretch text-xs">
              {value?.length} / 10
            </p>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-6 self-stretch">
          {/* 버튼 2개일 때 나오는 왼쪽 버튼 */}
          {isTwoButton && (
            <Button
              onClickHandler={onSubBtnClick || (() => {})}
              className="bg-white text-gray-7 border-[1px] border-gray-1 w-full"
              buttonText="취소"
              type="dialog"
              isDisabled={false}
            />
          )}

          {/* 기본 버튼 */}
          <Button
            onClickHandler={onBtnClick}
            buttonText={BtnText}
            type="dialog"
            className="bg-primary-3 text-white w-full"
            isDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}
