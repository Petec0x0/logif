import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import Footer from 'components/footer/Footer'
import Navbar from 'components/navbar/Navbar'
import membership_bg from 'img/membership-bg.jpg';
import MembershipPaymentModalContent from 'components/MembershipPaymentModalContent';
import ProgressBar from 'components/ProgressBar';


// const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });
const Membership = () => {
    // states htmlFor storing form data
    const [formInputData, setFormInputData] = useState({
        firstname: '', lastname: '', phone: '', email: '',
        occupation: '', nationality: '', country: '', stateOrRegion: '',
        password: '', passwordConfirm: '', maritalStatus: 'married'
    });
    // States htmlFor checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [isEmailInUse, setEmailInUse] = useState(false);

    const [uploadedReceiptImg, setUploadedReceiptImg] = useState();
    const [uploadedPassportImg, setUploadedPassportImg] = useState();
    const [passportPhotoReaderResult, setPassportPhotoReaderResult] = useState();
    const [receiptReaderResult, setReceiptReaderResult] = useState();
    const [isMakingPayment, setIsMakingPayment] = useState(false);

    const handleReceiptUpload = (e) => {
        setUploadedReceiptImg(e.target.files[0]);
    }

    const handlePassportUpload = (e) => {
        setUploadedPassportImg(e.target.files[0]);
    }

    const handleFormInput = (e) => {
        setFormInputData({
            ...formInputData,
            [e.target.name]: e.target.value
        });
    }

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // make sure compulsory inputs are not empty
        if (formInputData.candidatesName === '' ||
            formInputData.firstname === '' || formInputData.lastname === '' ||
            formInputData.phone === '' || formInputData.email === '' ||
            formInputData.occupation === '' || formInputData.nationality === '' ||
            formInputData.country === '' || formInputData.stateOrRegion === '') {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all the required fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        // make sure password and password confirm password values matches
        if (formInputData.password !== formInputData.passwordConfirm) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        // validate email address
        if (!validateEmail(formInputData.email)) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Invalid email address',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        // validate whether email is in use or not
        if (isEmailInUse) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Email address already in use by another candidate',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        if (!uploadedReceiptImg) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please upload donation receipt to continue',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        if (!uploadedPassportImg) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please upload passport photograph to continue',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        // send form data as post request to the server
        (async () => {
            const rawResponse = await fetch('/api/auth/membership/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formInputData,
                    passportPhoto: passportPhotoReaderResult,
                    receipt: receiptReaderResult
                })
            });
            const content = await rawResponse.json();
            // stop the progress bar
            setSubmitted(false);
            // check if there is an error in the response
            if (content.error) {
                Swal.fire({
                    title: 'Error!',
                    text: content.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else {
                setFormInputData({
                    ...formInputData,
                    firstname: '', lastname: '', phone: '', email: '',
                    occupation: '', nationality: '', country: '', stateOrRegion: '',
                    password: '', passwordConfirm: ''
                });

                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        })();
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const checkEmailInUseStatus = (e) => {
        if (!e.target.value) {
            // exit
            return false;
        }
        /**
         * Send post request to the server to confirm 
         * email address have been used
         */
        (async () => {
            const rawResponse = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: e.target.value
                })
            });
            const content = await rawResponse.json();
            if (content.error) {
                setEmailInUse(true);
                alert(content.message);
            } else {
                setEmailInUse(false);
            }

        })();
    }

    useEffect(() => {
        if (!uploadedReceiptImg) {
            return;
        }

        const receiptReader = new FileReader();
        receiptReader.readAsDataURL(uploadedReceiptImg);
        receiptReader.onloadend = () => {
            setReceiptReaderResult(receiptReader.result);
        };
        receiptReader.onerror = () => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong with the uploaded receipt',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedReceiptImg]);

    useEffect(() => {
        if (!uploadedPassportImg) {
            return;
        }

        const passportPhotoReader = new FileReader();
        passportPhotoReader.readAsDataURL(uploadedPassportImg);
        passportPhotoReader.onloadend = () => {
            setPassportPhotoReaderResult(passportPhotoReader.result);
        };
        passportPhotoReader.onerror = () => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong with the uploaded passport photo',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedPassportImg]);

    useEffect(() => {
        // start up backend server
        fetch('/api/startup');
    }, []);

    return (
        <>
            <Navbar />
            <section className="bg-gray-900">
                <div className="flex justify-center min-h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: `url(${membership_bg})` }}>
                    </div>

                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold tracking-wider capitalize text-white">
                                Collaborate with us at LOGIF
                            </h1>

                            <p className="mt-4 text-gray-400">
                                Thank you for your interest in becoming a committed partner
                                of the Lovers of God International Foundation-LOGIF (Non Governmental Org).
                                Please review the following commitments that we ask all partners to agree to:
                            </p>

                            <ul className="list-disc list-inside mt-2 ml-2">
                                <li className="mb-3 text-gray-500">
                                    1. Make God's word the foundation of life by living a life that is without sins and sinful desires.
                                </li>
                                <li className="mb-3 text-gray-500">
                                    2. Loving God, Jesus Christ and the Holy Spirit above all.
                                </li>
                                <li className="mb-3 text-gray-500">
                                    3. Love and serve others: We believe that following Jesus means loving
                                    and serving others, just as he did. We ask all partners to strive to
                                    love their fellow human beings as themselves and to seek out opportunities
                                    to help those who are less privileged.
                                </li>
                                <li className="mb-3 text-gray-500">
                                    4. Tithe
                                </li>
                                <li className="mb-3 text-gray-500">
                                    5. Church building projects supports
                                </li>
                                <li className="mb-3 text-gray-500">
                                    6. Seed Sowing
                                </li>
                                <li className="mb-3 text-gray-500">
                                    7. Offerings
                                </li>
                                <li className="mb-3 text-gray-500">
                                    8. Thanksgiving/Maintenance fees
                                </li>
                                <li className="mb-3 text-gray-500">
                                    9. Note: These freewill donations are offered to God, His children and His works.
                                    Therefore, they are not refundable.
                                </li>
                            </ul>

                            <p className="mt-4 text-gray-400 mb-4">
                                If you agree to these commitments and would like to become a 
                                committed partner of the City of Jesus International Ministry, 
                                please fill out the partnership form below. 
                                Thank you for your dedication to the church and its mission.
                            </p>


                            <div className="p-2 flex justify-center items-center mt-2">
                                <div className="w-full md:w-1/2 relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg">
                                    <div
                                        className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 ">
                                        <label className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
                                                rounded-md font-semibold text-xs tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
                                                focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" htmlFor="passportImage">

                                            Select a passport photograph
                                        </label>
                                        <input id="passportImage" onChange={handlePassportUpload} className="text-sm cursor-pointer w-36 hidden" type="file" />

                                    </div>
                                    <div
                                        className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                                        {
                                            uploadedPassportImg ?
                                                <img className="w-16 h-24 md:w-32 md:h-40" src={URL.createObjectURL(uploadedPassportImg)} alt="Uploaded passport" /> :
                                                <span className="text-gray-400 opacity-75">
                                                    <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                    </svg>
                                                </span>
                                        }

                                    </div>
                                </div>
                            </div>


                            <div className="mt-2">
                                <h1 className="text-gray-300">Marital Status</h1>

                                <div className="mt-3 md:flex md:items-center">
                                    <div>
                                        <input onChange={handleFormInput} name="maritalStatus" type="radio" id="married" value="married" className="peer hidden" defaultChecked />
                                        <label
                                            htmlFor="married"
                                            className="text-white block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                                            Married
                                        </label>
                                    </div>

                                    <div>
                                        <input onChange={handleFormInput} name="maritalStatus" type="radio" id="single" value="single" className="peer hidden" />
                                        <label
                                            htmlFor="single"
                                            className="text-white block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                                            Single
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">First Name</label>
                                    <input onChange={handleFormInput} name="firstname" value={formInputData['firstname']} type="text" placeholder="e.g Christopher" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Last name</label>
                                    <input onChange={handleFormInput} name="lastname" value={formInputData['lastname']} type="text" placeholder="e.g Orji" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Phone number</label>
                                    <input onChange={handleFormInput} name="phone" value={formInputData['phone']} type="text" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Email address</label>
                                    <input onBlur={checkEmailInUseStatus} onChange={handleFormInput} name="email" value={formInputData['email']} type="email" placeholder="e.g cojimmedia@gmail.com" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Occupation</label>
                                    <input onChange={handleFormInput} name="occupation" value={formInputData['occupation']} type="text" placeholder="Enter your Occupation" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Nationality</label>
                                    <input onChange={handleFormInput} name="nationality" value={formInputData['nationality']} type="text" placeholder="Enter your Nationality" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Country of Residence</label>
                                    <input onChange={handleFormInput} name="country" value={formInputData['country']} type="text" placeholder="Enter your Country of Residence" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">State of Origin/ Region</label>
                                    <input onChange={handleFormInput} name="stateOrRegion" value={formInputData['stateOrRegion']} type="text" placeholder="Enter your State of Origin/ Region" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Password</label>
                                    <input onChange={handleFormInput} name="password" value={formInputData['password']} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-200">Confirm password</label>
                                    <input onChange={handleFormInput} name="passwordConfirm" value={formInputData['passwordConfirm']} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 border border-gray-700 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <button
                                    onClick={() => setIsMakingPayment(true)}
                                    type="button"
                                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    <span>Make Donation </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>

                            <div className="p-2 flex justify-center items-center mt-2">
                                <div className="w-full md:w-1/2 relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg">
                                    <div
                                        className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 ">
                                        <label className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
                                                rounded-md font-semibold text-xs tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
                                                focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" htmlFor="receiptImage">

                                            Upload proof of donation
                                        </label>
                                        <input id="receiptImage" onChange={handleReceiptUpload} className="text-sm cursor-pointer w-36 hidden" type="file" />

                                    </div>
                                    <div
                                        className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                                        {
                                            uploadedReceiptImg ?
                                                <img className="w-16 h-24 md:w-32 md:h-40" src={URL.createObjectURL(uploadedReceiptImg)} alt="Uploaded receipt" /> :
                                                <span className="text-gray-400 opacity-75">
                                                    <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                    </svg>
                                                </span>
                                        }

                                    </div>
                                </div>
                            </div>

                            {
                                submitted ?
                                    <ProgressBar /> : ''
                            }
                            <div className="flex justify-center">
                                <button onClick={handleSubmit} className="p-3 my-8 text-lg bg-gradient-to-r from-blue-500 to-primary rounded-xl text-white">Submit Now</button>
                            </div>

                            <p className="mt-4 text-gray-400">
                                Please send a screenshot of your registration form to our WhatsApp number at <a className="text-primary" target="_blank" rel="noreferrer" href="https://wa.me/2347043315405?text=">+2347043315405</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div data-modal-show="true" aria-hidden="true" className={`${isMakingPayment ? 'flex' : 'hidden'} modal bg-overlay flex flex-col justify-start items-center fixed z-50 h-full w-full inset-0 visible opacity-100 transition-all-300 overflow-auto`}>
                <div className="flex justify-center my-10 w-full">
                    <div className="scale-100 w-[1000px] min-w-[250px] bg-gray-200 rounded-lg px-3 pb-3 pt-7 mx-3 md:m-5 relative">
                        <button onClick={() => setIsMakingPayment(!isMakingPayment)} className="absolute top-0 right-0 sm:text-white sm:bg-primary sm:hover:bg-blue-500 transition-all-300 sm:top-[-10px] sm:right-[-10px] sm:rounded-lg p-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>

                        <MembershipPaymentModalContent />
                    </div>
                </div>
            </div>
            {
                isMakingPayment &&
                <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
            }
            <Footer />
        </>
    )
}

export default Membership