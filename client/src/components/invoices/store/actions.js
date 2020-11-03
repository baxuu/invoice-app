import axios from 'axios';

import * as types from './types';

import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';

export const invoicesFetchSuccess = (invoices, totalItems, currentPage) => {
  return {
    type: types.FETCH_INVOICES,
    payload: { invoices, totalItems, currentPage },
  };
};

export const invoiceFetchSuccess = (invoice) => {
  return {
    type: types.FETCH_INVOICE,
    payload: invoice.data.invoice,
  };
};

export const invoiceDeleteSuccess = (invoiceId) => {
  return {
    type: types.DELETE_INVOICE,
    payload: invoiceId,
  };
};

export const invoiceUpdateSucces = (invoiceId, invoiceData) => {
  return {
    type: types.UPDATE_INVOICE,
    payload: (invoiceId, invoiceData),
  };
};

export const fetchInvoices = (pageNumber) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.get(
      `http://localhost:8080/feed/invoices?page=${pageNumber}`
    );
    console.log(response);
    const { invoices, totalItems, currentPage } = response.data;
    dispatch(loaderOff());
    dispatch(invoicesFetchSuccess(invoices, totalItems, currentPage));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const fetchInvoice = (invoiceId) => async (dispatch) => {
  try {
    const invoice = await axios.get(
      `http://localhost:8080/feed/invoices/${invoiceId}`
    );
    dispatch(invoiceFetchSuccess(invoice));
  } catch (err) {
    console.log(err);
  }
};

export const addInvoice = (invoice) => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/feed/invoice', invoice);
  } catch (err) {
    console.log(err);
  }
};

export const editInvoice = (invoiceId, invoiceData) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:8080/feed/invoices/${invoiceId}`,
      invoiceData
    );
    dispatch(invoiceUpdateSucces(invoiceId, invoiceData));
  } catch (err) {
    console.log(err);
  }
};

export const deleteInvoice = (invoiceId) => async (dispatch) => {
  try {
    console.log(`http://localhost:8080/feed/invoices/${invoiceId}`);
    await axios.delete(`http://localhost:8080/feed/invoices/${invoiceId}`);
    dispatch(invoiceDeleteSuccess(invoiceId));
  } catch (err) {
    console.log(err);
  }
};