import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [userData, setUserData] = useState({});

    const handleLogout = () => {
        // redirect to home page
        navigate('/');
    }

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
                setIsAdmin(content.isAdmin);
                console.log(content.isAdmin);
                setUserData({
                    ...userData,
                    ...content.data
                });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <aside id="sidebar" className={`fixed ${isSidebarOpen ? 'flex' : 'hidden'}  z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`} aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        {
                            isAdmin ?
                                <ul className="space-y-2 pb-2">
                                    <li>
                                        <Link to="overview" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="members-list" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
                                                <path className="cls-1" d="M72.45,44.22a11.29,11.29,0,0,1-5.34-3.37c3.57-1.35,5.23-5,5.45-11.29.17-4.69-.8-6.93.8-11.56,3.17-9.19,14.92-12.33,21.46-7,5.13-.54,10.3,2.11,11.41,10,.83,5.9-.93,9.75.93,15.19a8.53,8.53,0,0,0,4.37,5.18,12.72,12.72,0,0,1-5.84,2.81,58.72,58.72,0,0,1-9.22,1V48l3.21,5.14L89.31,61.27,79,53.23l2.3-4.92v-3a39.49,39.49,0,0,1-8.81-1.11ZM25.16,37.76a3.13,3.13,0,0,1-1.67-.37,3.87,3.87,0,0,1-1.59-1.88c-.73-1.64-1.31-6,.53-7.2l-.34-.22,0-.48c-.07-.87-.09-1.92-.11-3-.07-4.06-.15-9-3.5-10L17,14.19l.94-1.14a54.24,54.24,0,0,1,8.4-8.31A21.77,21.77,0,0,1,36.07.14a11.89,11.89,0,0,1,9.45,2.58A17.37,17.37,0,0,1,48.06,5.2a10.83,10.83,0,0,1,7.57,4.31,14.83,14.83,0,0,1,2.47,4.85,16.14,16.14,0,0,1,.66,5.49,13,13,0,0,1-3.93,8.9,2.9,2.9,0,0,1,1.22.31c1.4.73,1.45,2.31,1.08,3.64-.36,1.11-.82,2.39-1.26,3.47-.53,1.46-1.3,1.73-2.8,1.58-3.36,14.69-23.67,15.2-27.91,0Zm1.25,11.47,6.8,17.85,3.42-9.73L35,55.52c-1.26-1.84-.82-3.93,1.51-4.31A16.27,16.27,0,0,1,39,51.16a13.48,13.48,0,0,1,2.78.11c2.17.48,2.39,2.58,1.31,4.25l-1.67,1.83,3.41,9.73L51,49.23c4.44,4,14.38,4.8,19.27,7.52C77,60.54,76.5,65.41,78,72.19H0c1.47-6.72,1.64-11.71,8.39-15.44,6-3.34,13.1-3.09,18-7.52Zm79.19,8.34c-1.71-3.42-2.29-4.74-4.8-7.46,3.89,1.51,16.91,4.76,18.93,8.55,2.27,4.25,1.94,9,3.15,13.51H82.58a4.45,4.45,0,0,0-.1-1c-.26-1.19-.45-2.28-.63-3.31-.66-3.81-1.23-7.07-3.27-10l10.47,8.36,11.61-8.84,4.94.12ZM71.21,52.12c2.05-.58,4.25-1.09,6.63-2a20.16,20.16,0,0,0-3.06,4.08c-.69-.49-1.45-1-2.29-1.45h0c-.4-.22-.82-.43-1.26-.62Z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Partners</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="unconfirmed-payments" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg fill="#000000" className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.5,18 C21.776,18 22,18.224 22,18.5 L22,19.5 C22,20.881 20.881,22 19.5,22 L7.5,22 C7.411,22 7.323,21.995 7.236,21.986 C7.159,21.995 7.08,22 7,22 C6.859,22 6.732,21.942 6.642,21.849 C5.684,21.499 5,20.579 5,19.5 L5,6 L2.5,6 C2.224,6 2,5.776 2,5.5 L2,4 C2,2.896 2.896,2 4,2 L16.534,2 C17.915,2 19.034,3.119 19.034,4.5 L19.034,18 L21.5,18 Z M21,19.5 L21,19 L9,19 L9,20 C9,20.364 8.902,20.706 8.732,21 L19.5,21 C20.329,21 21,20.328 21,19.5 Z M8,18.5 C8,18.224 8.224,18 8.5,18 L18.034,18 L18.034,4.5 C18.034,3.671 17.363,3 16.534,3 L5.723,3 C5.895,3.295 6,3.634 6,4 L6,19.5 C6,20.234 6.527,20.846 7.225,20.975 C7.668,20.873 8,20.475 8,20 L8,18.5 Z M5,5 L5,4 C5,3.448 4.552,3 4,3 C3.448,3 3,3.448 3,4 L3,5 L5,5 Z M9.5,8 C9.224,8 9,8.224 9,8.5 L9,9.5 C9,9.776 9.224,10 9.5,10 L14.5,10 C15.329,10 16,10.671 16,11.5 L16,12.5 C16,13.329 15.329,14 14.5,14 L14,14 L14,14.5 C14,14.776 13.776,15 13.5,15 C13.224,15 13,14.776 13,14.5 L13,14 L11,14 L11,14.5 C11,14.776 10.776,15 10.5,15 C10.224,15 10,14.776 10,14.5 L10,14 L9.5,14 C8.671,14 8,13.329 8,12.5 C8,12.224 8.224,12 8.5,12 C8.776,12 9,12.224 9,12.5 C9,12.776 9.224,13 9.5,13 L14.5,13 C14.776,13 15,12.776 15,12.5 L15,11.5 C15,11.224 14.776,11 14.5,11 L9.5,11 C8.671,11 8,10.329 8,9.5 L8,8.5 C8,7.671 8.671,7 9.5,7 L10,7 L10,6.5 C10,6.224 10.224,6 10.5,6 C10.776,6 11,6.224 11,6.5 L11,7 L13,7 L13,6.5 C13,6.224 13.224,6 13.5,6 C13.776,6 14,6.224 14,6.5 L14,7 L14.5,7 C15.329,7 16,7.671 16,8.5 C16,8.776 15.776,9 15.5,9 C15.224,9 15,8.776 15,8.5 C15,8.224 14.776,8 14.5,8 L9.5,8 Z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Unconfirmed Payments</span>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link to="media-upload" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="#000000" d="M13,1 C14.1046,1 15,1.89543 15,3 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,3 C1,1.89543 1.89543,1 3,1 L13,1 Z M13,3 L3,3 L3,13 L13,13 L13,3 Z M9.5,8 L12,10.8571 L12,12 L4,12 L4,10.8 L5.5,9 L7.02439,10.8293 L9.5,8 Z M6.5,5 C7.32843,5 8,5.67157 8,6.5 C8,7.32843 7.32843,8 6.5,8 C5.67157,8 5,7.32843 5,6.5 C5,5.67157 5.67157,5 6.5,5 Z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Media</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="settings" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
                                        </Link>
                                    </li>
                                </ul>
                                :
                                <ul className="space-y-2 pb-2">
                                    <li>
                                        <Link to="profile" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Profile</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="make-payment" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22 7.54844C22 8.20844 21.46 8.74844 20.8 8.74844H3.2C2.54 8.74844 2 8.20844 2 7.54844V7.53844C2 5.24844 3.85 3.39844 6.14 3.39844H17.85C20.14 3.39844 22 5.25844 22 7.54844Z" fill="#292D32" />
                                                <path d="M2 11.45V16.46C2 18.75 3.85 20.6 6.14 20.6H17.85C20.14 20.6 22 18.74 22 16.45V11.45C22 10.79 21.46 10.25 20.8 10.25H3.2C2.54 10.25 2 10.79 2 11.45ZM8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25ZM14.5 17.25H10.5C10.09 17.25 9.75 16.91 9.75 16.5C9.75 16.09 10.09 15.75 10.5 15.75H14.5C14.91 15.75 15.25 16.09 15.25 16.5C15.25 16.91 14.91 17.25 14.5 17.25Z" fill="#292D32" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Make Payment</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to={`payment-list/${userData._id}`} className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg fill="#000000" className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.5,18 C21.776,18 22,18.224 22,18.5 L22,19.5 C22,20.881 20.881,22 19.5,22 L7.5,22 C7.411,22 7.323,21.995 7.236,21.986 C7.159,21.995 7.08,22 7,22 C6.859,22 6.732,21.942 6.642,21.849 C5.684,21.499 5,20.579 5,19.5 L5,6 L2.5,6 C2.224,6 2,5.776 2,5.5 L2,4 C2,2.896 2.896,2 4,2 L16.534,2 C17.915,2 19.034,3.119 19.034,4.5 L19.034,18 L21.5,18 Z M21,19.5 L21,19 L9,19 L9,20 C9,20.364 8.902,20.706 8.732,21 L19.5,21 C20.329,21 21,20.328 21,19.5 Z M8,18.5 C8,18.224 8.224,18 8.5,18 L18.034,18 L18.034,4.5 C18.034,3.671 17.363,3 16.534,3 L5.723,3 C5.895,3.295 6,3.634 6,4 L6,19.5 C6,20.234 6.527,20.846 7.225,20.975 C7.668,20.873 8,20.475 8,20 L8,18.5 Z M5,5 L5,4 C5,3.448 4.552,3 4,3 C3.448,3 3,3.448 3,4 L3,5 L5,5 Z M9.5,8 C9.224,8 9,8.224 9,8.5 L9,9.5 C9,9.776 9.224,10 9.5,10 L14.5,10 C15.329,10 16,10.671 16,11.5 L16,12.5 C16,13.329 15.329,14 14.5,14 L14,14 L14,14.5 C14,14.776 13.776,15 13.5,15 C13.224,15 13,14.776 13,14.5 L13,14 L11,14 L11,14.5 C11,14.776 10.776,15 10.5,15 C10.224,15 10,14.776 10,14.5 L10,14 L9.5,14 C8.671,14 8,13.329 8,12.5 C8,12.224 8.224,12 8.5,12 C8.776,12 9,12.224 9,12.5 C9,12.776 9.224,13 9.5,13 L14.5,13 C14.776,13 15,12.776 15,12.5 L15,11.5 C15,11.224 14.776,11 14.5,11 L9.5,11 C8.671,11 8,10.329 8,9.5 L8,8.5 C8,7.671 8.671,7 9.5,7 L10,7 L10,6.5 C10,6.224 10.224,6 10.5,6 C10.776,6 11,6.224 11,6.5 L11,7 L13,7 L13,6.5 C13,6.224 13.224,6 13.5,6 C13.776,6 14,6.224 14,6.5 L14,7 L14.5,7 C15.329,7 16,7.671 16,8.5 C16,8.776 15.776,9 15.5,9 C15.224,9 15,8.776 15,8.5 C15,8.224 14.776,8 14.5,8 L9.5,8 Z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Payment History</span>
                                        </Link>
                                    </li>

                                </ul>
                        }

                        <div className="space-y-2 pt-2">
                            <span onClick={handleLogout} className="cursor-pointer text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-4">Logout</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;