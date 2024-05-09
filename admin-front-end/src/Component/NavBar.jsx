import "../assets/css/NavBar.css"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <aside id="sidebar">
                <div className="d-flex">
                    <button className="toggle-btn" onClick={() => {
                        document.querySelector("#sidebar").classList.toggle("expand");
                        var toggleBtn = document.querySelector('.toggle-icon');
                        toggleBtn.classList.toggle('rotating');
                    }} type="button">
                        <i className="lni lni-grid-alt toggle-icon"></i>
                    </button>
                    <div className="sidebar-logo">
                        <Link to="/"><span style={{ color: "red" }}>Crick</span><span style={{ color: "white" }}>Zone</span></Link>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/dashboard" className="sidebar-link">
                            <i className="lni lni-dashboard mt-2"></i>
                            <span className="mb-2">Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/users" className="sidebar-link">
                            <i className="lni lni-users"></i>
                            <span>User</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/box-keepers" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Seller</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/boxes" className="sidebar-link">
                            <i className="material-icons-outlined">inventory</i>
                            <span>Product</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/bookings" className="sidebar-link">
                            <i className="lni lni-calendar"></i>
                            <span>Booking</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/charts" className="sidebar-link">
                            <i className="lni lni-bar-chart"></i>
                            <span>Charts</span>
                        </Link>
                    </li>
                </ul> 
                <li className="sidebar-footer" style={{marginTop: -20}}>
                    <Link to="/profile" className="sidebar-link">
                        <i className="lni lni-user"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <div className="sidebar-footer">
                    <Link to="#"
                    onClick={() => {
                        localStorage.removeItem('adminData');
                        setTimeout(() => {
                            navigate('/');
                        }, 10);
                    }}
                    className="sidebar-link">
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

NavBar.propTypes = {
    noOfApplication: PropTypes.number,
    setNoOfApplication: PropTypes.func
}

export default NavBar