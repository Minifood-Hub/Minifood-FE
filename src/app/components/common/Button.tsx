'use client';

import { BUTTON_STYLE } from '@/app/constants/styles';

interface ButtonProps {
  buttonText: string;
  type: keyof typeof BUTTON_STYLE;
  buttonType?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  onClickHandler: () => void;
  mouseEnterHandler?: () => void;
  mouseLeaveHandler?: () => void;
  className?: string;
  children?: React.ReactNode;
}

function Button({
  type,
  buttonText,
  buttonType = 'button',
  className,
  isDisabled, 
  onClickHandler,
  mouseEnterHandler,
  mouseLeaveHandler,
  children,
}: ButtonProps) {
  const buttonStyles = BUTTON_STYLE[type](className || '');

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType  }
      className={`${buttonStyles}`}
      onClick={onClickHandler}
      disabled={isDisabled}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {children}
      {buttonText}
    </button>
  );
}

export default Button;
