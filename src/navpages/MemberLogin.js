import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'components/Alert';
import ProgressBar from 'components/ProgressBar';
import Footer from 'components/footer/Footer'
import Navbar from 'components/navbar/Navbar'
import membership_bg from 'img/membership-bg.jpg';

const MemberLogin = () => {
    let navigate = useNavigate();

    // States for the login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErroMsg] = useState("");

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setErroMsg("Please enter all the fields");
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            // send a post request to the server
            (async () => {
                const rawResponse = await fetch('/api/auth/member/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                });
                const content = await rawResponse.json();
                // stop the progress bar
                setSubmitted(false);
                // check if there is an error in the response
                if (content.error) {
                    setErroMsg(content.message);
                    setError(true);
                } else {
                    // redirect to login page
                    navigate("/dashboard/profile");
                }
            })();
        }
    }

    return (
        <>
            <Navbar />
            {/* <!-- component --> */}
            <div className="bg-white dark:bg-gray-900">
                <div className="flex justify-center h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(${membership_bg})` }}>
                        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Join Our Community and Make a Difference Today!</h2>

                                <p className="max-w-xl mt-3 text-gray-300">
                                    Welcome back! Please enter your credentials to access your account.
                                    If you don't have an account yet, you can sign up for one here.
                                    Every contribution, no matter how small, helps us bring hope and support to those in need.
                                    Join us today and start making a difference
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Welcome Back</h2>

                                <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your membership account</p>
                            </div>


                            <div className="mt-8">
                                <form>
                                    <div>
                                        <label for="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                        <input onChange={handleEmail} value={email} type="email" name="email" id="email" placeholder="cojimmedia@gmail.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div className="mt-6 mb-2">
                                        <div className="flex justify-between mb-2">
                                            <label for="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                            {/* <a href="/#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> */}
                                        </div>

                                        <input onChange={handlePassword} value={password} type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    {
                                        // show the alert message if the fields are left empty
                                        (error) ? (
                                            <Alert errorMsg={errorMsg} color="red" />
                                        ) : ""
                                    }

                                    {
                                        // show the progress bar if data is submited and being processed
                                        (submitted) ? (
                                            <div className="bg-gray-900">
                                                <ProgressBar />
                                            </div>
                                        ) : ""
                                    }

                                    <div className="mt-6">
                                        <button
                                            onClick={handleSubmit}
                                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Login
                                        </button>
                                    </div>

                                </form>

                                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/membership" className="text-blue-500 focus:outline-none focus:underline hover:underline">Become a member</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MemberLogin