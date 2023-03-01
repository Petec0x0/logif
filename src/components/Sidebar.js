import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // redirect to home page
        navigate('/');
    }

    return (
        <aside id="sidebar" className={`fixed ${isSidebarOpen ? 'flex' : 'hidden'}  z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`} aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
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
                                    <span className="ml-3 flex-1 whitespace-nowrap">Members</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link to="/" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
                                </Link>
                            </li>
                        </ul>
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