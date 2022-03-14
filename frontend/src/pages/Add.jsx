import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "../styles/addoredit.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDataStart } from "../redux/actions";
import { toast } from "react-toastify";

const Add = () => {
  const location = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.data);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleProduct = products.find((item) => item.id === Number(id));
      console.log("single ", singleProduct);
    }
  }, [id]);

  // const [formValue, setFormValue] = useState(initialState);
  // const { sku, quantity, product, image, description, price } = formValue;
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState("");

  const onChangeFile = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("sku", sku);
    formData.append("quantity", quantity);
    formData.append("product", product);
    formData.append("description", description);
    // formData.append("image", image);
    for (const key of Object.keys(image)) {
      formData.append("image", image[key]);
    }
    // _.forEach(e.target.files, (file) => {
    //   formData.append("image", file);
    // });
    formData.append("price", price);

    dispatch(createDataStart(formData));
    toast.success("Product added successfully..");
    setTimeout(() => location("/"), 500);
  };

  return (
    <>
      <MDBValidation
        className="row g-3"
        style={{ marginTop: "20px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>Add Products</h1>
        <div className="input_field">
          <MDBInput
            value={sku}
            name="sku"
            type="text"
            onChange={(e) => setSku(e.target.value)}
            required
            label="Sku"
            validation="Please enter the sku"
            invalid
          />
          <br />
          <MDBInput
            value={quantity}
            name="quantity"
            type="Number"
            onChange={(e) => setQuantity(e.target.value)}
            required
            label="Quantity"
            validation="Please enter the quantity"
            invalid
          />
          <br />
          <MDBInput
            value={product}
            name="product"
            type="text"
            onChange={(e) => setProduct(e.target.value)}
            required
            label="Product"
            validation="Please enter the product"
            invalid
          />
          <br />
          <MDBInput
            // value={product}
            name="image"
            type="file"
            onChange={onChangeFile}
            multiple="true"
          />
          <br />
          <MDBInput
            value={description}
            name="description"
            textarea
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
          />
          <br />
          <MDBInput
            value={price}
            name="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            required
            label="Price"
            validation="Please enter the price"
            invalid
          />
          <br />
          <div className="col-12">
            <MDBBtn style={{ marginRight: "10px" }} type="submit">
              Add Products
            </MDBBtn>
            <MDBBtn onClick={() => location("/")} color="success">
              Go to Home
            </MDBBtn>
          </div>
        </div>
      </MDBValidation>
    </>
  );
};

export default Add;
