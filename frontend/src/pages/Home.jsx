import { MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../components/main/Main";
import { loadDataStart } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadDataStart());
  }, []);
  console.log("products", products);

  return (
    <div>
      <Main />
    </div>
  );
};

export default Home;
