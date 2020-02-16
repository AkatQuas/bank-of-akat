import React, { useContext, useCallback, Fragment } from 'react';
import { Input } from '../shared/name-input';
import { InvoiceContext } from './context';

const _Info = () => {
  const { state, dispatch } = useContext(InvoiceContext);
  const onNameChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      dispatch({
        type: 'SET_NAME',
        payload: (e.target as HTMLInputElement).value,
      });
    },
    [dispatch],
  );

  const onAmountChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      dispatch({
        type: 'SET_AMOUNT',
        payload: +(e.target as HTMLInputElement).value,
      });
    },
    [dispatch],
  );

  return (
    <div>
      {
        state.img
          ? (
            <Fragment>
              <Input
                value={state.name}
                onChange={onNameChange}
                inputMode="text"
                placeholder="input your name"
                label="Account"
              />
              <Input
                value={state.amount}
                onChange={onAmountChange}
                placeholder="input the amount"
                type="number"
                label="Amount"
              />
            </Fragment>

          )
          : null
      }
    </div>
  )
}

export const Info = React.memo(_Info);
