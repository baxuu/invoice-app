import axios from 'axios';

import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';
import { tokenConfig } from '../../auth/store/actions';
import * as types from './types';
import api from '../../../api/config';

export const invoicesFetchSuccess = (payload) => {
  return {
    type: types.FETCH_INVOICES,
    payload,
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

export const saveQuery = (query) => {
  return {
    type: types.SAVE_QUERY,
    payload: query,
  };
};

export const invoiceUpdateSucces = (invoiceId, invoiceData) => {
  return {
    type: types.UPDATE_INVOICE,
    payload: (invoiceId, invoiceData),
  };
};

export const fetchInvoices = (queryFilter = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch(loaderOn());
    const response = await axios.get(
      `${api}/feed/invoices${queryFilter}`,
      tokenConfig(getState)
    );
    dispatch(invoicesFetchSuccess(response.data));
    dispatch(loaderOff());
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const fetchInvoice = (invoiceId) => async (dispatch, getState) => {
  try {
    dispatch(loaderOn());

    const invoice = await axios.get(
      `${api}/feed/invoices/${invoiceId}`,
      tokenConfig(getState)
    );
    dispatch(loaderOff());
    dispatch(invoiceFetchSuccess(invoice));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const addInvoice = (invoiceData, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(loaderOn());
    const response = await axios.post(
      `${api}/feed/invoice`,
      invoiceData,
      tokenConfig(getState)
    );
    const { invoice, message } = response.data;
    const status = response.status;
    dispatch(loaderOff());
    history.push(`/invoices/${invoice._id}`);
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const editInvoice = (invoiceId, invoiceData, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(loaderOn());
    const edit = await axios.put(
      `${api}/feed/invoices/${invoiceId}`,
      invoiceData,
      tokenConfig(getState)
    );
    history.push(`/invoices/${invoiceId}`);
    const { message } = edit.data;
    const status = edit.status;
    dispatch(invoiceUpdateSucces(invoiceId, invoiceData));
    dispatch(loaderOff());
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const deleteInvoice = (invoiceId, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(loaderOn());
    const remove = await axios.delete(
      `${api}/feed/invoices/${invoiceId}`,
      tokenConfig(getState)
    );
    history.push(`/invoices`);
    const { message } = remove.data;
    const status = remove.status;
    dispatch(loaderOff());
    dispatch(invoiceDeleteSuccess(invoiceId));
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(toasterOn(err.message));
    dispatch(loaderOff());
  }
};
