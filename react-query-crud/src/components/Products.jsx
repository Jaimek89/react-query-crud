import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct } from "../api/productsAPI";

function Products() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: products,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product deleted successfully!");
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Product updated successfully!");
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) <div>Loading...</div>;
  else if (isError) <div>Error: {error.message}</div>;

  return products?.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => deleteProductMutation.mutate(product.id)}>
        Delete
      </button>
      <input
        type="checkbox"
        checked={product.inStock}
        id={product.id}
        onChange={(event) => {
          updateProductMutation.mutate({
            ...product,
            inStock: event.target.checked,
          });
        }}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
}

export default Products;
