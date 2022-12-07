import axios from "axios";

const productsAPI = axios.create({
  baseURL: "http://localhost:3000",
});

export const getProducts = async () => {
  const { data } = await productsAPI.get("/products");
  return data;
};

export const createProduct = async (product) => {
  productsAPI.post("/products", product);
};

export const deleteProduct = async (id) => {
  productsAPI.delete(`/products/${id}`);
};

export const updateProduct = async (product) => {
  productsAPI.put(`/products/${product.id}`, product);
};
