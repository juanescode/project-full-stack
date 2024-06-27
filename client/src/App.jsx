import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PosProveedor from "./components/PosProveedor";
import Proveedorlist from "./components/Proveedorlist";
import Lotes from "./components/lotes";
import Loteslistar from "./components/loteslistar";
import PosLotes from "./components/Poslotes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Proveedorlist />} />
        <Route path="/lotes" element={<Lotes />} />
        <Route path="/lotes/edit" element={<PosLotes />} />
        <Route path="/loteslistar" element={<Loteslistar/>}/>
        <Route path="/proveedor/edit" element={<PosProveedor />} />
        <Route path="/proveedor/:id_proveedor/edit" element={<PosProveedor/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
