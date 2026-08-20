import "./Adminpannel.css/Admin.css";
import male from "./adminimage/malecorton.jpg";
import { Link } from "react-router-dom";

function Admin() {
    return (
        <>
            <div className="admindashboard">

                <img src={male} className="adminmale" alt="" />

                <div className="online">
                    <i className="fa-solid fa-rotate"></i>
                    <span>Online</span>
                </div>

                <div className="dikbox">
                    <h3>Admin</h3>

                    <i className="fa-solid fa-envelope-open-text"
                        style={{
                            color: "rgb(9, 166, 118)",
                            fontSize: "26px",
                            marginTop: "20px",
                            marginLeft: "45px"
                        }}
                    ></i>
                </div>

                          <div className="adminmenu">

                                     <button className="adminbtn active">
                                    <Link to="/dashboard" className="adminlink">Dashboard</Link>
                                    <i className="fa-solid fa-gauge-high"></i>
                                     </button>

                                     <button className="adminbtn">
                                    <Link to="/product" className="adminlink">Product</Link>
                                    <i className="fa-solid fa-box"></i>
                                     </button>

                                    <button className="adminbtn">
                                    <Link to="/categore" className="adminlink">Category</Link>
                                    <i className="fa-solid fa-layer-group"></i>
                                    </button>

                                    <button className="adminbtn">
                                    <Link to="/user" className="adminlink">User</Link>
                                    <i className="fa-solid fa-user"></i>
                                    </button>

                                    <button className="adminbtn">
                                    <Link to="/order" className="adminlink">Orders</Link>
                                    <i className="fa-solid fa-bag-shopping"></i>
                                    </button>

                                    <button className="adminbtn logout-btn">
                                    <Link to="/logout" className="adminlink">Logout</Link>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                     </button>
     </div>
       </div>
        </>
    );
}

export default Admin;