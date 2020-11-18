import React, { useState, useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CreateInvoiceForm from './CreateInvoiceForm';
import Loader from '../../layout/loader/Loader';
import { addInvoice } from '../store/actions';

const CreateInvoice = () => {
  const { isLoading } = useSelector(({ shared }) => shared);
  const { user } = useSelector(({ auth }) => auth);
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue,
    useWatch,
    reset,
  } = useForm({
    defaultValues: {
      invoiceNumber: `/${new Date().getFullYear()}`,
      SellerCompanyCity: user && user.CompanyCity,
      SellerCompanyName: user && user.CompanyName,
      SellerCompanyStreet: user && user.CompanyStreet,
      SellerCompanyVat: user && user.CompanyVat,
      SellerCompanyZip: user && user.CompanyZip,
      SellerCompanyPhone: user && user.CompanyPhone,
      dateInvoice: new Date().toISOString().split('T')[0],
      cityInvoice: user && user.CompanyCity,
      items: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const items = watch('items');

  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);
  const currencies = ['$', '€', 'zł'];

  const onSubmit = (invoice) => {
    dispatch(addInvoice(invoice, history));
  };
  useEffect(() => {
    reset({
      invoiceNumber: `/${new Date().getFullYear()}`,
      SellerCompanyCity: user && user.CompanyCity,
      SellerCompanyName: user && user.CompanyName,
      SellerCompanyStreet: user && user.CompanyStreet,
      SellerCompanyVat: user && user.CompanyVat,
      SellerCompanyZip: user && user.CompanyZip,
      SellerCompanyPhone: user && user.CompanyPhone,
      dateInvoice: new Date().toISOString().split('T')[0],
      cityInvoice: user && user.CompanyCity,
      items: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return isLoading ? (
    <Loader />
  ) : (
    <CreateInvoiceForm
      useWatch={useWatch}
      watch={watch}
      setValue={setValue}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      remove={remove}
      append={append}
      fields={fields}
      onSubmit={onSubmit}
      currency={currency}
      register={register}
      setCurrency={setCurrency}
      currencies={currencies}
      items={items}
    />
  );
};

export default CreateInvoice;
