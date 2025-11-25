import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductsStore } from "../../store/productsStore";
import "./productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useProductsStore((state) => state.products);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  
  const productFromStore = products.find(
    (p) => String(p.id) === String(id)
  );

  const [product, setProduct] = useState(
    productFromStore || location.state?.product || null
  );
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ensureProduct = async () => {
      try {
        if (!products.length) {
          await fetchProducts();
        }
        const updated = products.find((p) => String(p.id) === String(id));
        if (updated) {
          setProduct(updated);
          setLoading(false);
          return;
        }

        
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setError("Product loading error");
      } finally {
        setLoading(false);
      }
    };

    if (!product) {
      ensureProduct();
    }
  }, [id, product, products, fetchProducts]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="detaild_box">
      <button onClick={() => navigate(-1)}>⬅ Go Back</button>

      <div className="detaild_product">
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "250px", objectFit: "contain" }}
        />

        <div>
          <h1>{product.title}</h1>
          {product.category && (
            <p>
              <b>Category:</b> {product.category}
            </p>
          )}
          <p>{product.description}</p>
          <p>
            <b>Rate:</b> {product.rating?.rate ?? "-"}
          </p>
          <p>
            <b>Count:</b> {product.rating?.count ?? "-"}
          </p>
          <h2>Price: ${product.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
