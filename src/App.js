import { Routes,Route,Navigate } from "react-router-dom";
import "./App.css";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CreateProduct from "./components/CreateProduct/CreateProduct";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={<Navigate to='/products'/>} />
        <Route path="products" element={ <Products />}/>
        <Route path="/products/:id" element={ <ProductDetails />} />
        <Route path="/create-product" element= { <CreateProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
