import "./Adminpannel.css/Addproduct.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function AddProduct() {

       const navigate = useNavigate();
       const location = useLocation();

       const editData = location.state;

       const [isEdit, setIsEdit] = useState(false);

       const [getcat, setgetcat] = useState([]);

       const [title, setTitle] = useState("");
       const [categorys, setCategory] = useState("");
       const [stock, setStock] = useState("");
       const [file, setFile] = useState(null);
       const [description, setDescription] = useState("");
       const [brand, setBrand] = useState("");
       const [offer, setOffer] = useState("");
       const [price, setPrice] = useState("");
       const [oldprice, setoldprice] = useState("");

    useEffect(() => {

    axios.get("http://localhost:5001/api/categores")
      .then(res => setgetcat(res.data));

    if (editData) {
      setTitle(editData.title);
      setCategory(editData.category);
      setStock(editData.stock);
      setDescription(editData.description);
      setBrand(editData.brand);
      setOffer(editData.offer);
      setPrice(editData.price);
      setoldprice(editData.oldprice);
      setIsEdit(true);
    }

  }, [editData]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", categorys);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("offer", offer);
    formData.append("price", price);
    formData.append("oldprice", oldprice);

    if (file) {
      formData.append("image", file);
    }

    try {

      if (isEdit) {

        await axios.put(
          `http://localhost:5001/api/products/${editData._id}`,
          formData
        );

        Swal.fire("Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:5001/api/products",
          formData
        );

        Swal.fire("Added Successfully");
      }

      navigate("/product");

    } catch (err) {
        console.log(err);
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.'
        });
       }
       };

  return (
    <div className="page">

      <div className="form-container">

        <h2>
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form className="product-form" onSubmit={handlesubmit}>

          <input
            type="text"
            className="productinput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Name"
          />

          <select
            className="productselc"
            value={categorys}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            {getcat.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <input className="productinput" type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
          />

          <input className="productinput" type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <textarea
            className="productinput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <input className="productinput"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />

          <input className="productinput"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Offer"
          />

          <input className="productinput"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <input className="productinput"
            value={oldprice}
            onChange={(e) => setoldprice(e.target.value)}
            placeholder="Old Price"
          />

          <button className="addproductbutton" type="submit">
            {isEdit ? "Update" : "Upload"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;