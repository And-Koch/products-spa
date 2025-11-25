import { useNavigate } from "react-router-dom";
import "./productCard.css";
import { useProductsStore } from "../../store/productsStore";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleToggleLike = useProductsStore((state) => state.toggleLike);
  const handleDelete = useProductsStore((state) => state.deleteProduct);
  return (
    <div
      className="prod_card"
      onClick={() =>
        navigate(`/products/${product.id}`, { state: { product } })
      }
    >
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={150} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleLike(product.id);
        }}
        className="like_btn"
      >
        {product.isLiked ? "💖" : "🤍"}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(product.id);
        }}
        className="delete_btn"
      >
        Delete
      </button>
    </div>
  );
};
export default ProductCard;
