import { Link } from "react-router-dom";

function InvoiceList({ invoices }) {
  const statuses = {
    Paid: "text-green-700 bg-green-50 ring-green-600/20",
    "Not Paid": "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
    Cancelled: "text-red-700 bg-red-50 ring-red-600/20",
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="grid h-screen place-items-center content-center bg-gray-50">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-none bg-white px-5 shadow-none sm:min-w-[38rem] sm:rounded-md sm:shadow-md"
      >
        <div className="flex justify-between py-5">
          <h2 className="text-2xl font-semibold leading-10 text-gray-600">Invoices</h2>
          <Link
            to="/new-invoice"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Invoice
          </Link>
        </div>
        {invoices.map((invoice, id) => (
          <li key={id} className="flex items-center justify-between py-5">
            <div className="mr-24 min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6">{invoice.name}</p>
                <p
                  className={classNames(
                    statuses[invoice.paymentStatus],
                    "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {invoice.paymentStatus}
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <p className={`${invoice.paymentStatus === "Cancelled" ? "hidden" : ""} text-sm text-green-700`}>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(invoice.dueAmount)}
              </p>
              <Link
                to={`/invoices/${invoice.id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View<span className="sr-only">, {invoice.name}</span>
              </Link>
            </div>
          </li>
        ))}
        <li className="flex items-center justify-between py-5">
          <div className="mr-24 min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6">False Invoice</p>
              <p
                className={classNames(
                  statuses["Cancelled"],
                  "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                Cancelled
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <p className="hidden text-sm text-green-700">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(17000)}
            </p>
            <Link
              to="/404"
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default InvoiceList;
