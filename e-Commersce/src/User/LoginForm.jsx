import { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errStatus, setErrorStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(false);
    setMessage("");

    const userData = {"email" : formData.email, "password" : formData.password};
    axios
      .post("http://127.0.0.1:7575/login", userData)
      .then((response) => {
        setMessage(response.data.message);
        localStorage.setItem("UserData" , JSON.stringify(response.data.user))
        setInterval(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setErrorStatus(true)
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              LOGIN
            </button>
          </div>

          <div className={errStatus ? "text-red-600" : "text-green-600"}>
            {message}
          </div>
          <div>
            <Link to="/register"> I Dont Have An Account ? Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
