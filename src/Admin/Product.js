import { Link, useNavigate } from "react-router-dom";
import Admin from "./Admin";
import "./Adminpannel.css/Product.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Product() {
  const navigate = useNavigate();
  const [getproduct, setgetproduct] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    product();
  }, []);

  const product = () => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => {
        setgetproduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = getproduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(getproduct.length / productsPerPage);


  const handleEdit = (item) => {
  navigate("/addproduct", { state: item });
};

const handleDelete = (id) => {

  Swal.fire({
    title: "Are you sure?",
    text: "This product will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes Delete"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`http://localhost:5001/api/products/${id}`)
        .then(() => {

          Swal.fire("Deleted!", "Product removed", "success");

          product(); // refresh list

        })
        .catch((err) => console.log(err));

    }

  });

};

  return (
    <div className="maincontainer">
      <div className="sidebar">
        <Admin />
      </div>

      <div className="procontent">
        <div className="totalproducts">
          <span>Total Products</span>
          <h2>{getproduct.length}</h2>
        </div>

        {/* <Link to="/addproduct" className="addproductclick">
          Add product
        </Link> */}

        <Link  to="/addproduct" className="addproductclick">
          Add Product
        </Link>

        <div className="productheading">
          <i className="fa-brands fa-product-hunt"></i>
          <h2>PRODUCT</h2>
        </div>

        <table className="producttable">
          <thead>
            <tr>
              <th>S No</th>
              <th>Category</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Img</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map((iteam, index) => (
              <tr key={index}>
                <td>{indexOfFirstProduct + index + 1}</td>
                <td>{iteam.category}</td>
                <td>{iteam.title}</td>
                <td>{iteam.price}</td>
                <td>{iteam.stock}</td>

                <td>
                  <img
                    src={iteam.image}
                    alt="product"
                    width="70"
                    height="70"
                    style={{ objectFit: "cover" }}
                  />
                </td>

                <td>
                  <button onClick={() => handleEdit(iteam)}>Edit</button>
                  <button   onClick={() => handleDelete(iteam._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Bar */}
        <div className="paginationproduct">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "activePage" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;