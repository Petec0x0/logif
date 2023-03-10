import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waitingIllustration from 'img/waiting-for-customer.svg';
import LogifFormDataDetails from 'components/LogifFormDataDetails';
import ProgressBar from 'components/ProgressBar';

const LogifFormData = () => {
    let navigate = useNavigate();
    const [itemDetails, setItemDetails] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isDataReady, setIsDataReady] = useState(false);
    const [partners, setPartners] = useState({});

    const [query, setQuery] = useState('');
    const handleSearchItem = (e) => {
        setQuery(e.target.value);
    }

    const toggleEditModal = (itemDetails = {}) => {
        // update item details based on the selected item
        setItemDetails(itemDetails);
        // open modal
        setIsEditModalOpen(!isEditModalOpen);
    }
    
    useEffect(() => {
        // send a get request to the server to fetch partners
        (async () => {
            const rawResponse = await fetch(`/api/logif-data/logif-need-list?query=${query}`, {
                method: 'GET',
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/admin/login");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                // update customers
                const dataObj = {};
                content.data.map(item => dataObj[item._id] = item)
                setPartners({ ...dataObj });
                // stop the progress bar
                setIsDataReady(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <div className="w-full overflow-x-auto">
            <div className="md:w-[584px] mx-auto bg-white m-2 flex w-[92%] items-center rounded-full border hover:shadow-md">
                <div className="pl-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input onChange={handleSearchItem} type="text" className="w-full bg-white rounded-full py-[14px] pl-4 outline-none" />
            </div>
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Full Names</th>
                        <th className="py-3 px-6 text-left">Phone</th>
                        <th className="py-3 px-6 text-center">Email </th>
                        <th className="py-3 px-6 text-center">Nationality</th>
                        <th className="py-3 px-6 text-center">Gender</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {
                        // if data is not ready diplay spinners else diplay the table
                        !isDataReady ? (
                            <tr>
                                <td>
                                    <ProgressBar />
                                </td>
                            </tr>
                        ) : (
                            // If there is no customer yet, display a message
                            !(Object.values(partners) === undefined || Object.values(partners).length === 0) ? (
                                Object.values(partners).map((partner, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center">
                                                    <span>{partner.fullname}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span>{partner.phone}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{partner.email}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{partner.nationality}</span>
                                            </td>

                                            <td className="py-3 px-6 text-center text-primary">
                                                <span>{partner.gender}</span>
                                            </td>

                                            <td className="py-3 px-6 text-center">
                                                {
                                                    (partner.reviewed) ? (
                                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Reviewed</span>
                                                    ) : (
                                                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Pending</span>
                                                    )
                                                }

                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button onClick={() => toggleEditModal(partner)} className="bg-blue-600 text-white rounded-lg px-3 py-2 font-bold text-xs drop-shadow-lg" aria-label="Edit">
                                                        More Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })

                            ) : <tr></tr>

                        )
                    }
                </tbody>
            </table>
            {
                (Object.values(partners) === undefined || Object.values(partners).length === 0) ? (
                    <>
                        <h3 className="text-center text-gray-600 p-4 text-lg">The list of all partners will appear here</h3>
                        <div className="flex">
                            <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                        </div>
                    </>
                ) : ''
            }

            <LogifFormDataDetails
                toggleEditModal={toggleEditModal}
                itemDetails={itemDetails}
                isEditModalOpen={isEditModalOpen} />
            {
                isEditModalOpen &&
                <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
            }
        </div>

    )
}

export default LogifFormData;