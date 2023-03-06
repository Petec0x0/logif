import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// import Alert from './Alert';
import ProgressBar from './ProgressBar';

const MemberDetail = ({ toggleEditModal, itemDetails, setItemDetails, isEditModalOpen }) => {
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    
    const handlePartnershipIdChange = (e) => {
        setItemDetails({
            ...itemDetails,
            partnershipId: e.target.value
        });
    }

    const handleUpdateId = (e) => {
        e.preventDefault();
        // send a patch request to the server to update member ID
        (async () => {
            const rawResponse = await fetch('/api/admin/update-id-partner', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    partnerId: itemDetails._id,
                    partnershipId: itemDetails.partnershipId
                })
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                Swal.fire({
                    title: 'Info!',
                    text: "Updated!",
                    icon: 'info',
                    confirmButtonText: 'Ok'
                });
                refreshPage();
            }
        })();
    }

    // Handling the form submission
    const handleApprove = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // send a patch request to the server to update member
        (async () => {
            const rawResponse = await fetch('/api/admin/approve-member', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    memberId: itemDetails._id,
                })
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                refreshPage();
            }
        })();
    }

    const handleDeleteItem = (_id) => {
        // make user confirm delete before proceeding
        if (!window.confirm('Are you sure you want to delete this account?')) {
            // exit function if false
            return false;
        }

        // delete member from server
        // send a delete request to the server to delete member
        (async () => {
            const rawResponse = await fetch('/api/admin/delete-member', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ memberId: itemDetails._id })
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                Swal.fire({
                    title: 'Info!',
                    text: content.message,
                    icon: 'info',
                    confirmButtonText: 'Ok'
                });
                refreshPage();
            }
        })();
    }

    return (
        <>
            <div data-modal-show="true" aria-hidden="true" className={`${isEditModalOpen ? 'flex' : 'hidden'} modal bg-overlay flex flex-col justify-start items-center fixed z-50 h-full w-full inset-0 visible opacity-100 transition-all-300 overflow-auto`}>
                <div className="flex justify-center my-10 w-full">
                    <div className="scale-100 w-[900px] min-w-[250px] bg-gray-200 rounded-lg px-3 pb-3 pt-7 mx-3 md:m-5 relative">
                        <button onClick={() => toggleEditModal(itemDetails)} className="absolute top-0 right-0 sm:text-white sm:bg-primary sm:hover:bg-teal-500 transition-all-300 sm:top-[-10px] sm:right-[-10px] sm:rounded-lg p-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold">{itemDetails.partnershipId}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline m-1" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        </svg>
                                        {new Date(itemDetails.createdAt).toGMTString()}
                                    </span>
                                </div>
                            </div>
                            {/* {
                                // show the alert message if the fields are left empty
                                (error) ? (
                                    <Alert errorMsg={alertMsg.msg} color={alertMsg.color} />
                                ) : ""
                            } */}

                            <div className="relative max-w-md mx-auto md:max-w-full break-words bg-white w-full mb-6 shadow-lg rounded-xl">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full flex justify-center">
                                            <div className="relative">
                                                <img alt="passport" className="rounded-full h-60 border-x-8 border-primary mt-2" src={`${itemDetails.passportPhoto ? itemDetails.passportPhoto.url : ''}`} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{itemDetails.firstname} {itemDetails.lastname}</h3>
                                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{itemDetails.country}, {itemDetails.stateOrRegion}
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 shadow-xl rounded-sm">
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide text-primary font-bold text-xl">About</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                                    <div className="px-4 py-2">{itemDetails.firstname}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                                    <div className="px-4 py-2">{itemDetails.lastname}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Marital Status</div>
                                                    <div className="px-4 py-2">{itemDetails.maritalStatus ? itemDetails.maritalStatus.toUpperCase() : ''}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                    <div className="px-4 py-2">{itemDetails.phone}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Occupation</div>
                                                    <div className="px-4 py-2">{itemDetails.occupation}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Nationality</div>
                                                    <div className="px-4 py-2">{itemDetails.nationality}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                                    <div className="px-4 py-2">
                                                        <a className="text-blue-800" href={`mailto:${itemDetails.email}`}>{itemDetails.email}</a>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Country or Residence</div>
                                                    <div className="px-4 py-2">{itemDetails.country}</div>
                                                </div>
                                            </div>

                                            <hr className="my-2" />
                                            <div className="md:flex md:flex-row md:space-x-4 w-full text-xs my-4">
                                                <div className="w-full flex flex-col mb-3">
                                                    <label className="font-semibold text-gray-600 py-2">Membership Id</label>
                                                    <input onChange={handlePartnershipIdChange} value={itemDetails.partnershipId} placeholder="Member Id" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="membershipId" />
                                                </div>

                                                <button onClick={handleUpdateId} className={`w-max bg-green-900 text-white uppercase font-bold rounded-lg p-2 m-2 pt-[-10px]`} href="/#">
                                                    <span className="text-center">Update</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mt-8">
                                            <span clas="text-green-500">
                                                <svg fill="#000000" className="h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.5,18 C21.776,18 22,18.224 22,18.5 L22,19.5 C22,20.881 20.881,22 19.5,22 L7.5,22 C7.411,22 7.323,21.995 7.236,21.986 C7.159,21.995 7.08,22 7,22 C6.859,22 6.732,21.942 6.642,21.849 C5.684,21.499 5,20.579 5,19.5 L5,6 L2.5,6 C2.224,6 2,5.776 2,5.5 L2,4 C2,2.896 2.896,2 4,2 L16.534,2 C17.915,2 19.034,3.119 19.034,4.5 L19.034,18 L21.5,18 Z M21,19.5 L21,19 L9,19 L9,20 C9,20.364 8.902,20.706 8.732,21 L19.5,21 C20.329,21 21,20.328 21,19.5 Z M8,18.5 C8,18.224 8.224,18 8.5,18 L18.034,18 L18.034,4.5 C18.034,3.671 17.363,3 16.534,3 L5.723,3 C5.895,3.295 6,3.634 6,4 L6,19.5 C6,20.234 6.527,20.846 7.225,20.975 C7.668,20.873 8,20.475 8,20 L8,18.5 Z M5,5 L5,4 C5,3.448 4.552,3 4,3 C3.448,3 3,3.448 3,4 L3,5 L5,5 Z M9.5,8 C9.224,8 9,8.224 9,8.5 L9,9.5 C9,9.776 9.224,10 9.5,10 L14.5,10 C15.329,10 16,10.671 16,11.5 L16,12.5 C16,13.329 15.329,14 14.5,14 L14,14 L14,14.5 C14,14.776 13.776,15 13.5,15 C13.224,15 13,14.776 13,14.5 L13,14 L11,14 L11,14.5 C11,14.776 10.776,15 10.5,15 C10.224,15 10,14.776 10,14.5 L10,14 L9.5,14 C8.671,14 8,13.329 8,12.5 C8,12.224 8.224,12 8.5,12 C8.776,12 9,12.224 9,12.5 C9,12.776 9.224,13 9.5,13 L14.5,13 C14.776,13 15,12.776 15,12.5 L15,11.5 C15,11.224 14.776,11 14.5,11 L9.5,11 C8.671,11 8,10.329 8,9.5 L8,8.5 C8,7.671 8.671,7 9.5,7 L10,7 L10,6.5 C10,6.224 10.224,6 10.5,6 C10.776,6 11,6.224 11,6.5 L11,7 L13,7 L13,6.5 C13,6.224 13.224,6 13.5,6 C13.776,6 14,6.224 14,6.5 L14,7 L14.5,7 C15.329,7 16,7.671 16,8.5 C16,8.776 15.776,9 15.5,9 C15.224,9 15,8.776 15,8.5 C15,8.224 14.776,8 14.5,8 L9.5,8 Z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide text-primary font-bold text-xl">Payment Receipt</span>
                                        </div>
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full flex justify-center">
                                                <div className="relative">
                                                    <img alt="receipt" className="mt-2" src={`${itemDetails.paymentreceipt ? itemDetails.paymentreceipt.url : ''}`} />
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            to={`../payment-list/${itemDetails._id}`}
                                            className="block w-full text-center text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                            Show Payment History
                                        </Link>

                                        {
                                            // show the progress bar if data is submited and being processed
                                            (submitted) ? (
                                                <div className="bg-gray-900">
                                                    <ProgressBar />
                                                </div>
                                            ) : ""
                                        }

                                        <div className="flex justify-center">
                                            <button onClick={handleApprove} disabled={itemDetails.reviewed} className={`w-max ${itemDetails.reviewed ? 'bg-green-200' : 'bg-green-900'} text-white uppercase font-bold rounded-lg p-2 px-3 m-2`} href="/#">
                                                <span className="text-center">Approve</span>
                                            </button>
                                            <button onClick={handleDeleteItem} className="w-max bg-red-900 text-white uppercase font-bold rounded-lg p-2 px-3 m-2" href="/#">
                                                <span className="text-center">Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => toggleEditModal(itemDetails)} className="w-max ml-auto bg-primary text-white uppercase font-bold rounded-lg p-2 px-3" href="/#">
                                <span className="text-center">Close</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default MemberDetail