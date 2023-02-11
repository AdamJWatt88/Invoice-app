// edit and default values for the FormSlide component.

// when an invoice is being edited use these values for default
function editDefaults(invoice) {
  return {
    id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    status: invoice.status,
    senderAddress: {
      street: invoice.senderAddress?.street,
      city: invoice.senderAddress?.city,
      postCode: invoice.senderAddress?.postCode,
      country: invoice.senderAddress?.country,
    },
    clientAddress: {
      street: invoice.clientAddress?.street,
      city: invoice.clientAddress?.city,
      postCode: invoice.clientAddress?.postCode,
      country: invoice.clientAddress?.country,
    },
    total: invoice.total,
  };
}

// when an invoice is new use these defaults
const defaultValues = {
  id: "",
  createdAt: "",
  paymentDue: "",
  description: "",
  paymentTerms: null,
  clientName: "",
  clientEmail: "",
  status: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: null,
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: null,
    country: "",
  },
  total: null,
};

export { editDefaults, defaultValues };
