import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function AddInvoice({ handleInvoicesUpdate }) {
  const invoiceNumber = crypto.randomUUID();
  const navigate = useNavigate();

  function formSubmission(event) {
    event.preventDefault();

    const newInvoiceData = {
      reference: invoiceNumber,
      paymentStatus: "Not Paid",
      billedTo: event.target[0].value,
      name: event.target[1].value,
      description: event.target[2].value,
      dueAmount: Number(event.target[3].value),
      taxRate: Number(event.target[4].value),
    };

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
          <form onSubmit={(event) => formSubmission(event)}>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Client Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="client@company.com"
              />
            </div>
            <label className="mt-6 block text-sm font-medium leading-6 text-gray-900">Invoice Name</label>
            <div className="mt-2">
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <label className="mt-6 block text-sm font-medium leading-6 text-gray-900">Invoice Description</label>
            <div className="mt-2">
              <textarea
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
