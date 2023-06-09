import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function AddInvoice({ handleInvoicesUpdate }) {
  const [recipient, setRecipient] = useState({
    Content: "",
    formCheck: false,
  });
  const [invoiceName, setInvoiceName] = useState({
    Content: "",
    formCheck: false,
  });
  const [invoiceDescription, setInvoiceDescription] = useState({
    Content: "",
    formCheck: false,
  });
  const [invoiceAmount, setInvoiceAmount] = useState({
    Content: "",
    formCheck: false,
  });
  const [invoiceTax, setInvoiceTax] = useState({
    Content: "",
    formCheck: false,
  });

  const formClasses =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const formIndicator = {
    Good: "ring-gray-300",
    Bad: "ring-red-300",
  };

  const invoiceNumber = crypto.randomUUID();
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function handleRecipientUpdate(event) {
    event.preventDefault();
    setRecipient((recipient) => ({
      ...recipient,
      Content: event.target.value,
    }));

    event.target.value.length <= 0
      ? setRecipient((recipient) => ({ ...recipient, formCheck: true }))
      : setRecipient((recipient) => ({ ...recipient, formCheck: false }));
  }

  function handleInvoiceNameUpdate(event) {
    event.preventDefault();
    setInvoiceName((invoiceName) => ({
      ...invoiceName,
      Content: event.target.value,
    }));

    event.target.value.length <= 0
      ? setInvoiceName((invoiceName) => ({ ...invoiceName, formCheck: true }))
      : setInvoiceName((invoiceName) => ({ ...invoiceName, formCheck: false }));
  }

  function handleInvoiceDescriptionUpdate(event) {
    event.preventDefault();
    setInvoiceDescription((invoiceDescription) => ({
      ...invoiceDescription,
      Content: event.target.value,
    }));

    event.target.value.length <= 0
      ? setInvoiceDescription((invoiceDescription) => ({ ...invoiceDescription, formCheck: true }))
      : setInvoiceDescription((invoiceDescription) => ({ ...invoiceDescription, formCheck: false }));
  }

  function handleInvoiceAmountUpdate(event) {
    event.preventDefault();
    setInvoiceAmount((invoiceAmount) => ({
      ...invoiceAmount,
      Content: event.target.value,
    }));

    event.target.value.length <= 0
      ? setInvoiceAmount((invoiceAmount) => ({ ...invoiceAmount, formCheck: true }))
      : setInvoiceAmount((invoiceAmount) => ({ ...invoiceAmount, formCheck: false }));
  }

  function handleInvoiceTaxUpdate(event) {
    event.preventDefault();
    setInvoiceTax((invoiceTax) => ({
      ...invoiceTax,
      Content: event.target.value,
    }));

    event.target.value.length <= 0
      ? setInvoiceTax((invoiceTax) => ({ ...invoiceTax, formCheck: true }))
      : setInvoiceTax((invoiceTax) => ({ ...invoiceTax, formCheck: false }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    let formCheck = false;

    const newInvoiceData = {
      reference: invoiceNumber,
      paymentStatus: "Not Paid",
      billedTo: recipient.Content,
      name: invoiceName.Content,
      description: invoiceDescription.Content,
      dueAmount: Number(invoiceAmount.Content),
      taxRate: Number(invoiceTax.Content),
    };

    switch (true) {
      case recipient.Content.length <= 0:
        setRecipient((recipient) => ({ ...recipient, formCheck: true }));
        formCheck = true;
      case invoiceName.Content.length <= 0:
        setInvoiceName((invoiceName) => ({ ...invoiceName, formCheck: true }));
        formCheck = true;
      case invoiceDescription.Content.length <= 0:
        setInvoiceDescription((invoiceDescription) => ({ ...invoiceDescription, formCheck: true }));
        formCheck = true;
      case invoiceAmount.Content.length <= 0 || isNaN(invoiceAmount.Content):
        setInvoiceAmount((invoiceAmount) => ({ ...invoiceAmount, formCheck: true }));
        formCheck = true;
      case invoiceTax.Content.length <= 0 || isNaN(invoiceTax.Content):
        setInvoiceTax((invoiceTax) => ({ ...invoiceTax, formCheck: true }));
        formCheck = true;
    }

    if (formCheck === false) {
      fetch("http://localhost:3000/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoiceData),
      })
        .then((response) => response.json())
        .then((data) => handleInvoicesUpdate(data));

      navigate("/");
    }
  }

  return (
    <div className="grid h-screen place-items-center content-center bg-gray-50">
      <div className="relative rounded-none bg-white py-5 shadow-none sm:min-w-[38rem] sm:rounded-md sm:shadow-md">
        <div className="absolute left-[-46px]">
          <Link to="/">
            <ArrowLeftIcon className="h-8 w-8 text-gray-700 hover:cursor-pointer hover:text-gray-300" />
          </Link>
        </div>
        <div className="flex justify-between border-b border-gray-100 px-5 pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">Create New Invoice</h2>
          <p className="text-xs leading-8 text-gray-300">{invoiceNumber}</p>
        </div>
        <div className="px-5 pt-5">
          <form>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Client Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                className={classNames(formIndicator[`${recipient.formCheck ? "Bad" : "Good"}`], formClasses)}
                placeholder="client@company.com"
                onChange={(event) => handleRecipientUpdate(event)}
              />
            </div>
            <label className="mt-6 block text-sm font-medium leading-6 text-gray-900">Invoice Name</label>
            <div className="mt-2">
              <input
                type="text"
                className={classNames(formIndicator[`${invoiceName.formCheck ? "Bad" : "Good"}`], formClasses)}
                onChange={(event) => handleInvoiceNameUpdate(event)}
              />
            </div>
            <label className="mt-6 block text-sm font-medium leading-6 text-gray-900">Invoice Description</label>
            <div className="mt-2">
              <textarea
                rows={4}
                className={classNames(formIndicator[`${invoiceDescription.formCheck ? "Bad" : "Good"}`], formClasses)}
                onChange={(event) => handleInvoiceDescriptionUpdate(event)}
              />
            </div>
            <div className="flex justify-between">
              <div className="w-[46%]">
                <label className="mt-6 block text-sm font-medium leading-6 text-gray-900">Invoice Amount</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className={classNames(
                      formIndicator[`${invoiceAmount.formCheck ? "Bad" : "Good"}`],
                      formClasses + " pl-7 pr-12"
                    )}
                    onChange={(event) => handleInvoiceAmountUpdate(event)}
                    placeholder="0.00"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>
              <div className="w-[46%]">
                <label className="mt-6 block text-sm font-medium leading-6 text-gray-900">Tax Rate</label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    className={classNames(formIndicator[`${invoiceTax.formCheck ? "Bad" : "Good"}`], formClasses)}
                    onChange={(event) => handleInvoiceTaxUpdate(event)}
                    placeholder="0"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded bg-indigo-600 px-2 py-1 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(event) => handleFormSubmit(event)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInvoice;
