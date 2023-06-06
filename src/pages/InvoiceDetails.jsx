import { useState } from "react";
import { useParams } from "react-router-dom";

function InvoiceDetails({ invoices }) {
  const [option, setOption] = useState();
  const filteredInvoice = invoices.filter((invoice) => invoice.id == useParams().id);
  let selectedInvoice = filteredInvoice[0];

  function handleOption(event) {
    setOption(event.target.value);
  }

  return (
    <div className="grid h-screen place-items-center content-center bg-gray-50">
      <div className="rounded-none bg-white py-5 shadow-none sm:min-w-[38rem] sm:rounded-md sm:shadow-md">
        <div className="flex justify-between border-b border-gray-100 px-5 pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">{selectedInvoice.name}</h2>
          <p className="text-xs leading-8 text-gray-300">{selectedInvoice.reference}</p>
        </div>
        <p className="px-5 py-5 font-light text-gray-700">{selectedInvoice.description}</p>
        <table className="min-w-full divide-y divide-gray-300 border-b border-t border-gray-100">
          <tbody className="bg-white">
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-5 text-sm font-medium text-gray-900">{selectedInvoice.name}</td>
              <td className="whitespace-nowrap py-4 pr-5 text-right text-sm text-gray-500">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(selectedInvoice.dueAmount)}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-5 text-sm font-medium text-gray-900">Tax</td>
              <td className="whitespace-nowrap py-4 pr-5 text-right text-sm text-gray-500">
                {`${selectedInvoice.taxRate}%`}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-5 text-right text-sm font-medium text-gray-900">Total</td>
              <td className="whitespace-nowrap py-4 pr-5 text-right text-sm text-gray-500">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format((selectedInvoice.taxRate / 100) * selectedInvoice.dueAmount + selectedInvoice.dueAmount)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end pr-5 pt-5">
          <select
            className="mr-2.5 block rounded-md border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 hover:cursor-pointer focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Paid"
            onChange={(event) => handleOption(event)}
          >
            <option>Paid</option>
            <option>Not Paid</option>
            <option>Cancelled</option>
          </select>
          <button
            className={`${
              selectedInvoice.paymentStatus === option ? "pointer-events-none line-through" : ""
            } text-sm font-light text-indigo-600 hover:text-indigo-300`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
