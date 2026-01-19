import { getAllProducts } from "@/actions/product-actions";
import FormSale from "@/components/form/FormSale";
import { getAuthUser } from "@/lib/auth";

const CreateInvoice = async () => {
  const { products } = await getAllProducts();
  const authUser = await getAuthUser();
  const userId = authUser?.id;
  return (
    <>
      <FormSale products={products} userId={userId} />
    </>
  );
};

export default CreateInvoice;
