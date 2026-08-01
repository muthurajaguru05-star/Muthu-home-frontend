import { useEffect, useState } from "react";
import Admin from "./Admin";
import "./Adminpannel.css/Category.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Categore() {

  const [catget, setCatGet] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    category();
  }, []);

  const category = () => {
    axios.get("http://localhost:5001/api/categores")
      .then(res => setCatGet(res.data))
      .catch(err => console.log(err));
  };

  // ✅ EDIT CLICK
  const handleEdit = (item) => {
    navigate("/addcategory", { state: item });
  };

const handleDelete = (id) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`http://localhost:5001/api/categores/${id}`)
        .then(() => {
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          category(); // refresh list
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

      <div className="content">

        <div className="topbar">
          <div className="total-box">
            <span className="categorytotalspan">Total Category</span>
            <h2 className="cath2">{catget.length}</h2>
          </div>

          <button className="addcategory">
            <Link to="/addcategory">Add Category</Link>
          </button>
        </div>

        <div className="categorehead">
          <i className="fa-solid fa-list"></i>
          <h2>CATEGORY</h2>
        </div>

        <table className="categoretable">
          <thead>
            <tr>
              <th>S No</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {catget.map((a, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{a.name}</td>
                <td>
                  {/* SAME CLASS BUTTONS */}
                  <button className="editbtn" onClick={() => handleEdit(a)}>
                    Edit
                  </button>

                  <button  onClick={() => handleDelete(a._id)} className="deletebtn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Categore;