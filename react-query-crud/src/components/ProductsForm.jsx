import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

function ProductsForm() {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("Product created successfully!");
      queryClient.invalidateQueries("products");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData);
    createProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />
      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductsForm;
