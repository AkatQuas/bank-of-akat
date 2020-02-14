import React, { useContext, useRef, useEffect, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { InvoiceContext } from './context';
import { Button } from '../shared/button';
import { generateImage } from './generateImage';

export const Generate = () => {
  const { state } = useContext(InvoiceContext);
  const ref = useRef<typeof state | null>(null);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  const generate = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const { img, name, amount } = ref.current;
    generateImage(img, name, amount).then((blob) => {
      saveAs(blob, 'generated.png');
    }).catch(e => void (console.error(e)));
  }, []);
  return (
    <div className="mx-20">
      {
        state.img && state.name && state.amount > 0
          ? (
            <Button
              label="生成收据🧾"
              block
              onClick={generate}
            />
          )
          : null
      }
    </div>
  );
}
