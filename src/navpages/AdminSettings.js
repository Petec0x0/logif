import React, { useState } from 'react';
import Swal from 'sweetalert2'
import Alert from 'components/Alert';
import ProgressBar from 'components/ProgressBar';

const AdminSettings = () => {
    // States for the login
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErroMsg] = useState("");

    // Handling the oldPassword change
    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the confirmPassword change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
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
        setSubmitted(true);
        setError(false);

        if (confirmPassword === '' || password === '' || oldPassword === '') {
            setErroMsg("Please fill all the required fields");
            setSubmitted(false);
            setError(true);
            return false;
        }

        if(password !== confirmPassword){
            setErroMsg("Password and Confirm Password does not match");
            setSubmitted(false);
            setError(true);
            return false;
        }
        
        // send a post request to the server
        (async () => {
            const rawResponse = await fetch('/api/admin/update-admin-password', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    oldPassword: oldPassword
                })
            });
            const content = await rawResponse.json();
            // stop the progress bar
            setSubmitted(false);
            // check if there is an error in the response
            if (content.error) {
                setErroMsg(content.message);
                setError(true);
            } else {
                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        })();
    }

    return (
        <>
            <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 className="text-2xl font-medium">Update Password</h1>
                {/* <p className="text-slate-500">Hi, Welcome back 👋</p> */}
                <form action="" className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label for="oldPassword">
                            <p className="font-medium text-slate-700 pb-2">Old Password</p>
                            <input onChange={handleOldPassword} value={oldPassword} id="oldPassword" name="oldPassword" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Old Password" />
                        </label>

                        <label for="password">
                            <p className="font-medium text-slate-700 pb-2">New Password</p>
                            <input onChange={handlePassword} value={password} id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="New Password" />
                        </label>

                        <label for="confirmPassword">
                            <p className="font-medium text-slate-700 pb-2">Confirm password</p>
                            <input onChange={handleConfirmPassword} value={confirmPassword} id="confirmPassword" name="confirmPassword" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Confirm password" />
                        </label>

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

                        <button onClick={handleSubmit} className="w-full py-3 font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg border-blue-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Update</span>
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminSettings;