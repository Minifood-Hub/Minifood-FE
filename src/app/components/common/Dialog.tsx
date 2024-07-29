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
      <div className="flex w-auto min-w-[30vw] max-w-[80vw] py-6 px-4 flex-col items-start gap-8 rounded-2xl bg-white shadow-xl">
        {/* 텍스트 */}
        <div className="flex items-center py-0 px-4 flex-col gap-2 self-stretch">
          <span className="self-stretch text-center text-xl font-semibold">
            {topText}
          </span>
          <p>{subText}</p>
        </div>

        {/* 인풋 */}
        {hasInput && (
          <div className="relative w-full">
            <Input
              className="border-2 border-gray-1 px-2 py-4"
              type="default"
              textValue={value}
              onChange={onChange || (() => {})}
            />
            <p className="text-xs text-end">{value?.length} / 10</p>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex px-8 items-center gap-4 self-stretch">
          {/* 버튼 2개일 때 나오는 왼쪽 버튼 */}
          {isTwoButton && (
            <Button
              onClickHandler={onSubBtnClick || (() => {})}
              className="bg-gray-1 text-gray-7"
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
            className="bg-primary-3 text-white"
            isDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}
