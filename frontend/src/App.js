import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Add from "./pages/Add";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./pages/Edit";
import Favourite from "./pages/Favourite";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/addproduct" element={<Add />} />
        <Route path="/editproduct/:id" element={<Edit />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
