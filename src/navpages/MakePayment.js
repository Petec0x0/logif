import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import MembershipPaymentModalContent from 'components/MembershipPaymentModalContent';
import ProgressBar from 'components/ProgressBar';


const MakePayment = () => {
    const [isMakingPayment, setIsMakingPayment] = useState(false);
    const [uploadedReceiptImg, setUploadedReceiptImg] = useState();
    const [receiptReaderResult, setReceiptReaderResult] = useState();
    // States htmlFor checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleReceiptUpload = (e) => {
        setUploadedReceiptImg(e.target.files[0]);
    }

    // Handling the email change
    const handleAmount = (e) => {
        setAmount(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // make sure compulsory inputs are not empty
        if (amount < 1) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all the required fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }


        if (!uploadedReceiptImg) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please upload payment receipt to continue',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        // send form data as post request to the server
        (async () => {
            const rawResponse = await fetch('/api/payment/store-payment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
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
                setAmount(0);
                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        })();
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const todayDate = new Date();

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

    return (
        <>
            <div className="m-4">



                <div className="flex items-center md:p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <button
                            onClick={() => setIsMakingPayment(true)}
                            type="button"
                            className="flex items-center mt-2 mx-auto w-1/2 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>Pay for the month of {monthNames[todayDate.getMonth()]} </span>

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                        <form
                            className="py-6 px-9"
                            method="POST"
                        >
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="mb-3 block text-base font-medium text-[#e6514c]"
                                >
                                    Save donation record below after making the donation
                                </label>

                                <div className="font-semibold">How much are you paying?</div>
                                <div className="mb-2">
                                    <input onChange={handleAmount} name="amount" className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" type="text" placeholder="e.g 10000" />
                                </div>

                                <div className="p-2 flex justify-center items-center mt-2">
                                    <div className="w-full md:w-1/2 relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg">
                                        <div
                                            className="rounded-l-lg p-6 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 ">
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
                                    // show the progress bar if data is submited and being processed
                                    (submitted) ? (
                                        <div className="bg-gray-900">
                                            <ProgressBar />
                                        </div>
                                    ) : ""
                                }
                                <div className="flex justify-center">
                                    <button onClick={handleSubmit} className="p-3 my-2 text-lg bg-gradient-to-r from-blue-500 to-primary rounded-xl text-white">Submit Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

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
            </div>
        </>
    )
}

export default MakePayment