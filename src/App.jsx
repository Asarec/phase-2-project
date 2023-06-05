import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import { Dashboard, Invoice, FourOhFour } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<SideBar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="invoice" element={<Invoice />} />
      </Route>
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default App;
