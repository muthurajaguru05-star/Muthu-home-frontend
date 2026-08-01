import React, { useState, useEffect } from "react";
import "./Adminpannel.css/Addcategory.css"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Addcategory() {

  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state;

  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (editData) {
      setCategory(editData.name);
      setIsEdit(true);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      return alert("Please fill category");
    }

    const formData = new FormData();
    formData.append("category", category);

    if (file) {
      formData.append("image", file);
    }

    try {

      if (isEdit) {

        await axios.put(
          `http://localhost:5001/api/categores/${editData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
        });

      } else {

        await axios.post(
          "http://localhost:5001/api/categores",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          title: "Added Successfully",
          icon: "success",
        });
      }

      navigate("/Categore");

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
  <div className="wholeaddcat">

    <div className="addcatcard">

      {/* LEFT SIDE */}
      <div className="addcatleft">

        <h1>CATEGORY</h1>

        <h3>ADD CATEGORY</h3>

        <p>
          Create and manage product categories
          for your electronic store.
        </p>

        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>

      </div>

      {/* RIGHT SIDE */}
      <div className="addcatright">

        <h2 className="title">
          {isEdit ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label className="addcatlabel">
            Category Name
          </label>

          <input
            className="addcatinput"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category Name"
          />

          <label className="addcatlabel">
            Upload Image
          </label>

          <input
            className="addcatinput"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
  
          <button
            type="submit"
            className="addcategorybutton"
          >
            {isEdit ? "Update Category" : "Add Category"}
          </button>

        </form>


      </div>

    </div>

  </div>
);
}

export default Addcategory;