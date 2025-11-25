#  React Products SPA

A fully functional Single Page Application (SPA) built with **React**, **React Router**, and **Zustand**. The app retrieves products from a public API, supports **CRUD**, **search**, **filters**, **favorites**, **pagination**, and is fully responsive.

---

##  Features

-  Product list with cards (title, image, price, delete, like)
-  Favorites (like toggle, favorites filter)
-  Live search (no submit)
-  Pagination (client-side, dynamic)
-  Create product (form validation, add to store)
-  Product details page with full info
-  Zustand store: products, search, filters, pagination, actions
-  Delete product (works for API and created items)
-  Responsive, mobile-first UI

---

##  Tech Stack

| Purpose | Technology |
|---------|------------|
| Framework | React |
| Routing | React Router v6 |
| Store | Zustand |
| API | https://fakestoreapi.com |
| Language | JavaScript (ES6+) |
| Styling | CSS |
| Deployment | Vercel / Netlify / GitHub Pages |

---

##  Project Structure

src/
├── components/
│ ├── Products/
│ │ ├── Products.jsx
│ │ └── products.css
│ ├── ProductCard/
│ │ ├── ProductCard.jsx
│ │ └── productCard.css
│ ├── ProductDetails/
│ │ ├── ProductDetails.jsx
│ │ └── productDetails.css
│ ├── CreateProduct/
│ │ ├── CreateProduct.jsx
│ │ └── createProduct.css
├── store/
│ └── productsStore.js
├── App.jsx
├── index.js
└── index.css

##  Installation

```bash
git clone https://github.com/your-username/react-products-spa.git
cd react-products-spa
npm install
npm start

## Live Demo

https://products-spa-1lwc.vercel.app/products

Author
 Andranik Kocharyan
 React · Zustand 
 GitHub: https://github.com/And-Koch
