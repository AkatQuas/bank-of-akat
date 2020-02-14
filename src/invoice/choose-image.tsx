import React, { useCallback } from 'react';
import { InvoiceContext } from './context';

const _ChooseImage = () => {
  const { dispatch, state } = React.useContext(InvoiceContext);

  const handleInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) {
        return;
      }
      try {
        const url = window.URL.createObjectURL(files[0]);
        dispatch({
          type: 'SET_IMG',
          payload: url,
        });
      } catch (error) {
        console.warn('Unable to convert to url, %s', error);
      }
    },
    [dispatch],
  );

  const { img } = state;
  const labelCls = "block bg-white h-full pt-32 " +
    (img ? 'opacity-0' : '');
  return (
    <div className="text-center">
      <div className="rounded w-64 h-64 mx-auto my-4 relative">
        <input
          id="upload-file"
          type="file"
          className="absolute w-0 h-0"
          accept="image/*"
          onChange={handleInputChange}
        />
        {
          img
            ? (
              <img
                src={img}
                alt="screenshot"
                className="h-full absolute inset-0 mx-auto"
              />
            )
            : null
        }
        <label
          className={labelCls}
          htmlFor="upload-file"
        >
          上传转账截图
        </label>
      </div>
    </div>
  );
}

export const ChooseImage = React.memo(_ChooseImage);
