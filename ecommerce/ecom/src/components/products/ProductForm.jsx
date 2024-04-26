import React,{useState} from "react";
import { addProductData } from "../../service/product.service";
import { useForm } from "react-hook-form";
// import { generateImageUrl } from "../../service/product.service";
const ProductForm = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.productImage = imageUpload;
    const addProductResponse = await addProductData(data);
    setImageUpload(null);
    reset();
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name of Product"
          {...register("productName", { required: true, maxLength: 20 })}
        />
        {errors.productName && <span>Required!!</span>}
        <br />
        <input
          type="number"
          placeholder="Enter Price"
          {...register("productPrice", { required: true })}
        />
        {errors.productPrice && <span>Required!!</span>}
        <br />
        <textarea
          cols="30"
          rows="10"
          {...register("description", { required: true, maxLength: 40 })}
        ></textarea>
        {errors.description && <span>Required!!</span>}
        <br />
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/JPG,image/PNG"
          onChange={(e) => {
            setImageUpload(e.target.files[0])
          }}
          // {...register("productImage", { required: true })}
        />
        <br />
        <button type="submit">Add product</button>
      </form>
    </>
  );
};

export default ProductForm;
