import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { InvoiceList, InvoiceDetails, AddInvoice, FourOhFour } from "./pages";

function App() {
  const [invoices, setInvoices] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:3000/invoices")
      .then((response) => response.json())
      .then((data) => setInvoices(data));
  }, []);

  function handleInvoicesUpdate(newInvoiceData) {
    setInvoices((prevInvoices) => {
      const newArray = [...prevInvoices];
      const index = newArray.findIndex((invoice) => invoice.id === newInvoiceData.id);

      if (index !== -1) {
        newArray[index] = newInvoiceData;
      } else {
        newArray.push(newInvoiceData);
      }

      return newArray;
    });
  }

  return (
    <Routes>
      <Route path="/" element={<InvoiceList invoices={invoices} />} />
      <Route
        path="/invoices/:id"
        element={<InvoiceDetails invoices={invoices} handleInvoicesUpdate={handleInvoicesUpdate} />}
      />
      <Route path="/new-invoice" element={<AddInvoice handleInvoicesUpdate={handleInvoicesUpdate} />} />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default App;
