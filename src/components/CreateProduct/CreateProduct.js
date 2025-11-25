import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsStore } from "../../store/productsStore";
import "./createProduct.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const addProduct = useProductsStore((state) => state.addProduct);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!image.trim()) newErrors.image = "Image URL is required";

    const priceNumber = Number(price);
    if (!price || isNaN(priceNumber) || priceNumber <= 0) {
      newErrors.price = "Price must be a number > 0";
    }

    if (!category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      description,
      category,
      image,
      isLiked: false,
      rating: {
        rate: 0,
        count: 0,
      },
    };

    addProduct(newProduct);
    navigate("/products");
  };

  return (
    <div className="create_box">
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit} className="create_form">
        <label>Title*</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product title"
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <label>Description*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}

        <label>Price*</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        {errors.price && <span className="error">{errors.price}</span>}

        <label>Image URL*</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
        />
        {errors.image && <span className="error">{errors.image}</span>}

        <label>Category*</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        {errors.category && <span className="error">{errors.category}</span>}

        <div className="buttons">
          <button type="button" onClick={() => navigate("/products")}>
            Cancel
          </button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
