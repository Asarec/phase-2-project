import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { InvoiceList, InvoiceDetails, FourOhFour } from "./pages";

function App() {
  const [invoices, setInvoices] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:3000/invoices")
      .then((response) => response.json())
      .then((data) => setInvoices(data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<InvoiceList invoices={invoices} />} />
      <Route path="/invoices/:id" element={<InvoiceDetails invoices={invoices} />} />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default App;
