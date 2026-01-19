import { getSaleId } from "@/actions/sale-actions";
import FormSale from "@/components/form/FormSale";
import { getAllProducts } from "@/actions/product-actions";

const EditSale = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const sale = await getSaleId(id);
  const { products } = await getAllProducts();
  if (!sale) {
    return <h2>Producto no encontrado</h2>;
  }
  return (
    <>
      <FormSale products={products} sale={sale} />
    </>
  );
};

export default EditSale;
