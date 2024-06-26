import { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';

const RegistrationForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errStatus, setErrorStatus] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(false);
    setMessage("");

    if(formData.password === formData.confirmPassword) {

      const userData = {
        UName : formData.username,
        UEmail : formData.email,
        UPassword : formData.password,
        UImage: "default.jpeg",
      }

      axios
      .post("http://127.0.0.1:7575/sendOtp", {UEmail: userData.UEmail, UName: userData.UName})
      .then((response) => {

        setMessage(response.data.message); // set message
        props.setOtp(response.data.otp) // set otp to app.jsx
        props.setNewUser(userData); // set new user data to app.jsx

          navigate("/emailVarification");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setErrorStatus(true)
      });
    }
    else {
      setMessage("Password and Confirm Password must be same")
      setErrorStatus(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>

          <div className={errStatus ? "text-red-600" : "text-green-600"}>
            {message}
          </div>
          <div>
            <Link to="/Login"> All Ready Have An Account ? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  setOtp: PropTypes.func.isRequired,
  setNewUser: PropTypes.func.isRequired,
}

export default RegistrationForm;
