import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const OtpVarification = ({ userData, otp, setOtp }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [errStatus, setErrorStatus] = useState(false);
    const [varifyOtp, setVarifyOtp] = useState("");

    const handleChange = (e) => {
        setVarifyOtp(e.target.value);
    };

    const resendOtp = () => {
        if (otp === "" || !userData) {
            navigate("/register");
        }
        axios
            .post("http://127.0.0.1:7575/sendOtp", { UEmail: userData.UEmail, UName: userData.UName })
            .then((response) => {

                setMessage(response.data.message); // set message
                setOtp(response.data.otp) // set otp to app.jsx

                navigate("/emailVarification");
            })
            .catch((error) => {
                setMessage(error.response.data.message);
                setErrorStatus(true)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorStatus(false);
        setMessage("");

        if (otp === "" || !userData) {
            navigate("/register");
        } else if (varifyOtp.length !== 6) {
            setErrorStatus(true);
            setMessage("Please enter a valid OTP");
        } else if (otp === varifyOtp) {
            axios.post("http://127.0.0.1:7575/signup", { userData })
                .then((response) => {
                    setMessage(response.data.message);
                    localStorage.setItem("UserData", JSON.stringify(response.data.newUserData));
                    navigate("/");
                })
                .catch((error) => {
                    setMessage(error.response.data.message);
                    setErrorStatus(true);
                });
        } else {
            setMessage("Invalid OTP");
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
                            <label htmlFor="otp" className="sr-only">Verification Code</label>
                            <input
                                id="otp"
                                type="text"
                                autoComplete="OTP"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Verification Code"
                                value={varifyOtp}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify Verification Code
                        </button>
                    </div>
                </form>
                <div>
                    <button
                        onClick={resendOtp}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Resend Verification Code
                    </button>
                </div>
                <div className={errStatus ? "text-red-600" : "text-green-600"}>
                    {message}
                </div>
            </div>
        </div>
    );
};

OtpVarification.propTypes = {
    userData: PropTypes.object.isRequired,
    otp: PropTypes.string.isRequired,
    setOtp: PropTypes.func.isRequired,
};

export default OtpVarification;
