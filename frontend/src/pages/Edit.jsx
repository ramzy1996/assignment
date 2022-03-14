import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "../styles/addoredit.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDataStart } from "../redux/actions";
import { toast } from "react-toastify";
import axios from "axios";

const Edit = (props) => {
  const location = useNavigate();
  const dispatch = useDispatch();
  //   const { products } = useSelector((state) => state.data);
  const { id } = useParams();

  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => [
        setSku(res.data.sku),
        setQuantity(res.data.quantity),
        setProduct(res.data.product),
        setDescription(res.data.description),
        setPrice(res.data.price),
      ])
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    for (const key of Object.keys(image)) {
      formData.append("image", image[key]);
    }
    formData.append("price", price);

    axios
      .put(`/products/update/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
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

export default Edit;
