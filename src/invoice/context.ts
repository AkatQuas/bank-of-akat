import { simpleContext } from '../shared/simple-context';

type ActionType =
  | { type: 'SET_IMG', payload: string }
  | { type: 'SET_NAME', payload: string }
  | { type: 'SET_AMOUNT', payload: number };

const initialState = {
  img: '',
  name: '',
  amount: 0,
};

type AppState = typeof initialState

function reducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case 'SET_IMG':
      return {
        ...state,
        img: action.payload,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        amount: action.payload,
      };
    default:
      return state;
  }
}

export const [InvoiceContext, InvoiceProvider] = simpleContext(reducer, initialState);
