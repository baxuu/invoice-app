import React, { useState, useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { fetchInvoice, editInvoice } from '../store/actions';
import NoVatPrice from '../createInvoice/NoVatPrice';
import VatPrice from '../createInvoice/VatPrice';
import Loader from '../../layout/loader/Loader';

const EditInvoice = ({ match }) => {
  const { invoice } = useSelector(({ invoices }) => invoices);
  const { isLoading } = useSelector(({ shared }) => shared);
  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);

  const currencies = ['$', '€', 'zł'];

  const { register, control, handleSubmit, watch, errors, reset } = useForm({
    defaultValues: {
      invoice,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  let counter = 0;
  const history = useHistory();
  const dispatch = useDispatch();
  const items = watch('items');

  useEffect(() => {
    const invoiceId = match.params.id;
    dispatch(fetchInvoice(invoiceId));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    reset({
      ...invoice,
      items: Object.keys(invoice).length ? invoice.items : [],
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  const onSubmit = async (invoiceData) => {
    dispatch(editInvoice(invoice._id, invoiceData, history));
  };
  let sum = (a) => a.reduce((x, y) => x + y);

  const calcGrantTotal = () => {
    if (items.length) {
      let sumAmount = sum(items.map((x) => Number(x.totalMoney)));
      return sumAmount.toFixed(2);
    }
  };
  const calcSubTotal = () => {
    if (items.length) {
      let sumAmount = sum(items.map((x) => Number(x.priceNoVat)));
      return sumAmount.toFixed(2);
    }
  };

  const calcTaxTotal = () => {
    if (items.length) {
      let sumGrandTotal = sum(items.map((x) => Number(x.totalMoney)));
      let sumSubTotal = sum(items.map((x) => Number(x.priceNoVat)));
      return (sumGrandTotal - sumSubTotal).toFixed(2);
    }
  };
  return isLoading ? (
    <Loader />
  ) : (
    <Form className='form__invoice' onSubmit={handleSubmit(onSubmit)}>
      <h2>Invoice </h2>
      <div className='row' size='sm'>
        <div className=' col-lg-6'>
          <Form.Row>
            <Col sm={8} md={8} xs={12}>
              <Form.Label>Invoice number</Form.Label>
              <Form.Control
                name='invoiceNumber'
                placeholder='#'
                size='sm'
                ref={register({
                  required: 'Invoice number is required.',
                  maxLength: {
                    value: 12,
                    message: 'Max length exceeded- 12 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='invoiceNumber' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
        <div className='col-lg-6'>
          <Form.Row>
            <Col sm={4} md={4} xs={12}>
              <Form.Label>Date Of Invoice</Form.Label>
              <Form.Control
                name='dateInvoice'
                type='date'
                size='sm'
                ref={register({ required: 'Date of Invoice is required.' })}
              />
              <ErrorMessage errors={errors} name='dateInvoice' as='p' />
            </Col>
            <Col sm={4} md={4} xs={12}>
              <Form.Label>City</Form.Label>
              <Form.Control
                size='sm'
                name='cityInvoice'
                ref={register({
                  required: 'Invoice city is required.',
                  maxLength: {
                    value: 14,
                    message: 'Max length exceeded- 14 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='cityInvoice' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
      </div>
      <hr />
      <div className='row '>
        <div className=' col-lg-6 '>
          <Form.Label className='invoice__label'>Seller</Form.Label>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                size='sm'
                name='SellerCompanyName'
                ref={register({
                  required: 'Seller name is required.',
                  maxLength: {
                    value: 60,
                    message: 'Max length exceeded- 60 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyName' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyStreet'
                ref={register({
                  required: 'Seller street is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyStreet' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={3} xs={5} md={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyZip'
                ref={register({
                  required: 'Seller zip-code is required.',
                  maxLength: {
                    value: 10,
                    message: 'Max length exceeded- 10 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyZip' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
            <Col sm={5} xs={7} md={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyCity'
                ref={register({
                  required: 'Seller  city is required.',
                  maxLength: {
                    value: 20,
                    message: 'Max length exceeded- 20 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyCity' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyVat'
                ref={register({
                  required: 'Seller vat number is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyVat' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='number'
                size='sm'
                name='SellerCompanyPhone'
                ref={register({
                  required: 'Seller phone number is required.',
                  maxLength: {
                    value: 16,
                    message: 'Max length exceeded- 16 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyPhone' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
        <div className=' col-lg-6'>
          <Form.Label className='invoice__label'>Buyer</Form.Label>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                size='sm'
                name='BuyerCompanyName'
                ref={register({
                  required: 'Buyer name is required.',
                  maxLength: {
                    value: 60,
                    message: 'Max length exceeded- 60 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyName' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyStreet'
                ref={register({
                  required: 'Buyer street is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyStreet' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={3} xs={5} md={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyZip'
                ref={register({
                  required: 'Buyer zip-code is required.',
                  maxLength: {
                    value: 10,
                    message: 'Max length exceeded- 10 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyZip' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
            <Col sm={5} xs={7} md={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyCity'
                ref={register({
                  required: 'Buyer city is required.',
                  maxLength: {
                    value: 20,
                    message: 'Max length exceeded- 20 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyCity' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyVat'
                ref={register({
                  required: 'Buyer vat number is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyVat' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} xs={12} md={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyPhone'
                ref={register({
                  required: 'Buyer phone number is required.',
                  maxLength: {
                    value: 16,
                    message: 'Max length exceeded- 16 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyPhone' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-lg-12 dynamic__table'>
          <table className='table table-bordered table-hover' id='tab_logic'>
            <thead>
              <tr>
                <th className='text-center'> # </th>
                <th className='text-center'> Product name</th>
                <th className='text-center'> Unit Cost</th>
                <th className='text-center'> Qty </th>
                <th className='text-center'> Price excluding VAT</th>
                <th className='text-center'> VAT %</th>
                <th className='text-center'> Price including VAT </th>
              </tr>
            </thead>
            {fields &&
              fields.map((item, index) => {
                counter++;
                return (
                  <tbody key={item.id}>
                    <tr id='addr0'>
                      <td>{counter}</td>
                      <td className='row__position'>
                        <Form.Control
                          name={`items[${index}].productName`}
                          defaultValue={item.productName}
                          type='text'
                          className='form-control dynamic__fields'
                          ref={register({
                            required: 'Product name is required.',
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].productName`}
                          as='p'
                        />
                      </td>
                      <td>
                        <Form.Control
                          type='number'
                          name={`items[${index}].unitCost`}
                          defaultValue={item.unitCost}
                          className='form-control dynamic__fields'
                          ref={register({
                            required: 'Unit cost is required.',
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].unitCost`}
                          as='p'
                        />
                      </td>
                      <td>
                        <Form.Control
                          name={`items[${index}].qty`}
                          defaultValue={item.qty}
                          type='number'
                          className='form-control dynamic__fields'
                          ref={register({
                            required: 'Quantity is required.',
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].qty`}
                          as='p'
                        />
                      </td>
                      <td>
                        <NoVatPrice
                          name={`items[${index}].priceNoVat`}
                          index={index}
                          register={register()}
                          control={control}
                        />
                      </td>
                      <td>
                        <Form.Control
                          defaultValue={item.vat}
                          name={`items[${index}].vat`}
                          type='number'
                          className='form-control dynamic__fields'
                          ref={register({
                            required: 'Vat % is required.',
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].vat`}
                          as='p'
                        />
                      </td>
                      <td>
                        <VatPrice
                          register={register()}
                          control={control}
                          index={index}
                        />
                      </td>
                      <td
                        className='delete__button'
                        onClick={() => remove(index)}
                      >
                        <i className='fas fa-trash-alt'></i>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-6 col-md-8'>
          <div className='row'>
            <div className='col-xs-6 col-md-8'>
              <Button onClick={() => append({})}>
                <i className='fas fa-plus-circle'> Add item </i>
              </Button>
            </div>
            <div className='col-xs-6 col-md-4 '>
              <Col xs={8} className='choose__curency'>
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  name='currency'
                  ref={register}
                  as='select'
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </div>
          </div>
        </div>
        <div className='col-xs-6 col-md-4'>
          <table
            className='table table-bordered table-hover'
            id='tab_logic_total'
          >
            <tbody>
              <tr>
                <th className='text-center'>Sub Total</th>
                <td className='text-center'>
                  <Form.Control
                    ref={register}
                    readOnly
                    value={items && calcSubTotal()}
                    name='sub_total'
                    placeholder='0.00'
                    className='form-control'
                    id='sub_total'
                  />
                </td>
                <th className='text-center'>{currency}</th>
              </tr>
              <tr>
                <th className='text-center'>Tax Amount</th>
                <td className='text-center'>
                  <Form.Control
                    ref={register}
                    readOnly
                    value={items && calcTaxTotal()}
                    name='tax_amountTotal'
                    id='tax_amount'
                    placeholder='0.00'
                    className='form-control'
                  />
                </td>
                <th className='text-center'>{currency}</th>
              </tr>
              <tr>
                <th className='text-center'>Grand Total</th>
                <td className='text-center'>
                  <Form.Control
                    ref={register}
                    readOnly
                    value={items && calcGrantTotal()}
                    name='total_amount'
                    id='total_amount'
                    placeholder='0.00'
                    className='form-control'
                  />
                </td>
                <th className='text-center'>{currency}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-6 col-md-10'></div>
        <div className='col-md-2'>
          <Button className='invoice__save' type='submit'>
            <i className='fas fa-save'> Save Invoice </i>
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default EditInvoice;
