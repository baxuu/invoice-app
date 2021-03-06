import pkg from 'mongoose';
const { Schema, model } = pkg;

const InvoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
    },
    dateInvoice: {
      type: String,
      required: true,
    },
    cityInvoice: {
      type: String,
      required: true,
    },
    SellerCompanyName: {
      type: String,
      required: true,
    },
    SellerCompanyStreet: {
      type: String,
      required: true,
    },
    SellerCompanyZip: {
      type: String,
      required: true,
    },
    SellerCompanyCity: {
      type: String,
      required: true,
    },
    SellerCompanyVat: {
      type: String,
      required: true,
    },
    SellerCompanyPhone: {
      type: String,
      required: true,
    },
    BuyerCompanyName: {
      type: String,
      required: true,
    },
    BuyerCompanyStreet: {
      type: String,
      required: true,
    },
    BuyerCompanyZip: {
      type: String,
      required: true,
    },
    BuyerCompanyCity: {
      type: String,
      required: true,
    },
    BuyerCompanyVat: {
      type: String,
      required: true,
    },
    BuyerCompanyPhone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    sub_total: {
      type: String,
      required: true,
    },
    tax_amountTotal: {
      type: String,
      required: true,
    },
    total_amount: {
      type: String,
      required: true,
    },
    items: [
      {
        productName: {
          type: String,
          required: true,
        },
        unitCost: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        priceNoVat: {
          type: String,
          required: true,
        },
        vat: {
          type: String,
          required: true,
        },
        totalMoney: {
          type: String,
          required: true,
        },
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = model('invoice', InvoiceSchema);
export default Invoice;
