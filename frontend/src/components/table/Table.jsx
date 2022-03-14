import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadDataStart } from "../../redux/actions";
import "./table.scss";

export default function Table() {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.data);
  const [isFav, setIsFav] = useState(false);
  console.log("isfav", isFav);
  useEffect(() => {
    dispatch(loadDataStart());
  }, []);

  const [product, setProduct] = useState([]);

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`).then((res) => console.log(res.data));
    setProduct(product.filter((elem) => elem._id !== id));
    toast.success("product deleted successfully..");
  };

  console.log(isFav);

  const favouriteProduct = async (id) => {
    await axios.put(`/products/${id}`).then((res) => console.log(res.data));
    window.location.reload();
  };

  if (loading) {
    return (
      <MDBSpinner
        style={{ marginTop: "150px", marginLeft: "50%", marginRight: "50%" }}
        role="status"
      ></MDBSpinner>
    );
  }
  return (
    <MDBTable responsive>
      <MDBTableHead>
        <tr>
          <th scope="col" className="text-uppercase">
            sku
          </th>
          <th scope="col" className="text-uppercase">
            Image
          </th>
          <th scope="col" className="text-uppercase">
            Product Name
          </th>
          <th scope="col" className="text-uppercase">
            Price
          </th>
          <th scope="col" className="text-uppercase">
            action
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {products &&
          products.map((item, i) => {
            // console.log(item.image.map((it) => it.filename));
            const img_length = item.image.length;
            // console.log(img_length);
            return (
              <tr key={item._id}>
                <td>{item.sku}</td>
                <td>
                  {item.image.slice(img_length - 1, img_length).map((it, i) => {
                    console.log(public_folder + it.filename);
                    return (
                      <img
                        key={i}
                        src={`${public_folder}${it.filename}`}
                        className="product_img"
                        alt=""
                      />
                    );
                  })}
                </td>
                <td>{item.product}</td>
                <td>{item.price}</td>
                <td>
                  <img
                    className="img_icon"
                    src="/assets/delete-icon.svg"
                    onClick={() => {
                      if (window.confirm("sure to delete?") === true) {
                        deleteProduct(item._id);
                      }
                    }}
                    alt=""
                  />
                  <Link to={`/editproduct/${item._id}`}>
                    <img
                      className="img_icon"
                      src="/assets/edit-icon.svg"
                      alt=""
                    />
                  </Link>
                  {item.favourite === true ? (
                    <img
                      className="img_icon"
                      src="/assets/starred.svg"
                      alt=""
                      onClick={() => {
                        if (window.confirm("sure to delete?") === true) {
                          favouriteProduct(item._id);
                        }
                      }}
                    />
                  ) : (
                    <img
                      className="img_icon"
                      src="/assets/star.svg"
                      alt=""
                      onClick={() => {
                        if (window.confirm("sure to delete?") === true) {
                          favouriteProduct(item._id);
                        }
                      }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
      </MDBTableBody>
    </MDBTable>
  );
}
