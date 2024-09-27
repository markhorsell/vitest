

import ProductForm from "../components/ProductForm";
import { ProductFormData } from "../validationSchemas/productSchema";


const PlaygroundPage = () => {
  return <ProductForm onSubmit={function (product: ProductFormData): Promise<void> {
    throw new Error("Function not implemented.");
  } }/>;
};

export default PlaygroundPage;
