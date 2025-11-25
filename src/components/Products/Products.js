
import { useEffect } from "react";
import { useProductsStore } from "../../store/productsStore";
import ProductCard from "../ProductCard/ProductCard";
import "./products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.loading);
  const error = useProductsStore((state) => state.error);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  const filter = useProductsStore((state) => state.filter);
  const setFilter = useProductsStore((state) => state.setFilter);

  const searchQuery = useProductsStore((state) => state.searchQuery);
  const setSearchQuery = useProductsStore((state) => state.setSearchQuery);

  const currentPage = useProductsStore((state) => state.currentPage);
  const itemsPerPage = useProductsStore((state) => state.itemsPerPage);
  const setPage = useProductsStore((state) => state.setPage);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!products || products.length === 0) return <p>No products</p>;


  const byFilter =
    filter === "favorites"
      ? products.filter((p) => p.isLiked)
      : products;

  
  const query = searchQuery.toLowerCase().trim();
  const bySearch = byFilter.filter((p) => {
    if (!query) return true;
    const title = p.title?.toLowerCase() || "";
    return title.startsWith(query);
  });

  
  const totalItems = bySearch.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = bySearch.slice(startIndex, endIndex);

  const handlePageClick = (page) => {
    setPage(page);
  };

  const handlePrev = () => {
    if (safePage > 1) setPage(safePage - 1);
  };

  const handleNext = () => {
    if (safePage < totalPages) setPage(safePage + 1);
  };

  return (
    <div>
      <div className="head_box">
        <button onClick={() => navigate('/create-product')}>Create Product</button>
        <input
          className="products_search"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="products_filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "favorites" ? "active" : ""}
            onClick={() => setFilter("favorites")}
          >
            Favorites
          </button>
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p>No products match this filter</p>
      ) : (
        <div className="products_box">
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePrev}
            disabled={safePage === 1}
            className="page_btn"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`page_btn ${page === safePage ? "active" : ""}`}
              disabled={safePage === page}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={safePage === totalPages}
            className="page_btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
