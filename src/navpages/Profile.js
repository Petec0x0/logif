import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Profile = () => {
    const navigate = useNavigate();
    const [itemDetails, setItemDetails] = useState({});

    useEffect(() => {
        // send a get request to the server to fetch members
        (async () => {
            const rawResponse = await fetch(`/api/auth/is-auth`, {
                method: 'GET',
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/membership");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                setItemDetails({
                    ...itemDetails,
                    ...content.data
                });

            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
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
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Partnership Number</div>
                                    <div className="px-4 py-2">{itemDetails.partnershipId}</div>
                                </div>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile