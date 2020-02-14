import React from 'react';

const _Input = ({
  label,
  onChange,
  value,
  placeholder,
  type,
}: React.HTMLProps<HTMLInputElement>) => (
    <div className="flex mx-10 mb-4 items-center">
      <span
        className="w-20"
      >{label}:</span>
      <input
        type={type}
        className="flex-1 p-1"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );

_Input.defaultProps = {
  onChange: () => { },
  value: '',
  placeholder: '',
  type: 'text',
  label: '',
}

export const Input = React.memo(_Input);
