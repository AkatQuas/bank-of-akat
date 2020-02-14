import React from 'react';
import { ChooseImage } from './choose-image';
import { InvoiceProvider } from './context';
import { Info } from './info';
import { Generate } from './generate';

const _Invoice = () => (
  <InvoiceProvider>
    <ChooseImage />
    <Info />
    <Generate />
  </InvoiceProvider>
);

export const Invoice = React.memo(_Invoice);
