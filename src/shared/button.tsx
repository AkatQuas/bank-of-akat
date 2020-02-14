import React, { useMemo } from 'react';

declare type ButtonType =
  | 'primary'
  | 'info'
  | 'success'
  | 'warn'
  | 'error';

type ButtonProps = {
  label: string;
} & typeof defaultProps;

const defaultProps = {
  onClick: () => { },
  type: 'primary' as ButtonType,
  block: false,
};

const _Button = (
  {
    label,
    onClick,
    type,
    block,
  }: ButtonProps
) => {
  const className = useMemo(() => {
    const base = `rounded text-center py-2 px-6 text-white`;
    let _type = 'blue';
    switch (type) {
      case 'primary':
        break;
      case 'success':
        _type = 'green';
        break;
      case 'info':
        _type = 'gray';
        break;
      case 'warn':
        _type = 'yellow';
        break;
      case 'error':
        _type = 'red';
        break;
      default:
        break;
    }
    const _block = block === true
      ? 'block w-full'
      : '';
    return `${base} bg-${_type}-500 ${_block}`;
  }, [block, type]);
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

_Button.defaultProps = defaultProps;

export const Button = React.memo(_Button);
