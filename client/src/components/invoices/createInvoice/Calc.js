let sum = (a) => a.reduce((x, y) => x + y);

export const CalcGrantTotal = ({ setValue, watch }) => {
  const items = watch('items');
  let sumAmount = items.length && sum(items.map((x) => Number(x.totalMoney)));
  const outputGrantTotal = sumAmount.toFixed(2);
  setValue('total_amount', outputGrantTotal);
  return null;
};

export const CalcSubTotal = ({ setValue, watch }) => {
  const items = watch('items');
  let sumAmount = items.length && sum(items.map((x) => Number(x.priceNoVat)));
  const outputSubTotal = sumAmount.toFixed(2);
  setValue('sub_total', outputSubTotal);

  return null;
};

export const CalcTaxTotal = ({ setValue, watch }) => {
  const items = watch('items');
  let sumGrandTotal =
    items.length && sum(items.map((x) => Number(x.totalMoney)));
  let sumSubTotal = items.length && sum(items.map((x) => Number(x.priceNoVat)));
  const outputTaxTotal = (sumGrandTotal - sumSubTotal).toFixed(2);
  setValue('tax_amountTotal', outputTaxTotal);
  return null;
};
