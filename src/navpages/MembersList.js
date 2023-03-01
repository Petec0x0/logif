import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waitingIllustration from 'img/waiting-for-customer.svg';
import MemberDetail from 'components/MemberDetail';
import ProgressBar from 'components/ProgressBar';

const MembersList = () => {
    let navigate = useNavigate();
    const [itemDetails, setItemDetails] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isDataReady, setIsDataReady] = useState(false);
    const [members, setMembers] = useState({});

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
        // send a get request to the server to fetch members
        (async () => {
            const rawResponse = await fetch(`/api/admin/members-list?query=${query}`, {
                method: 'GET',
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/login");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                // update customers
                const dataObj = {};
                content.data.map(item => dataObj[item._id] = item)
                setMembers({ ...dataObj });
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
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Phone</th>
                        <th className="py-3 px-6 text-center">Email </th>
                        <th className="py-3 px-6 text-center">Nationality</th>
                        <th className="py-3 px-6 text-center">County of Residence</th>
                        <th className="py-3 px-6 text-center">State of Origin</th>
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
                            !(Object.values(members) === undefined || Object.values(members).length === 0) ? (
                                Object.values(members).map((member, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img alt="img" className="w-8 h-8 rounded-md" src={`${member.passportPhoto.url}`} />
                                                    </div>
                                                    <span>{member.firstname} {member.lastname}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span>{member.phone}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{member.email}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{member.nationality}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{member.country}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{member.stateOrRegion}</span>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button onClick={() => toggleEditModal(member)} className="bg-blue-600 text-white rounded-lg px-7 py-3 font-bold text-sm drop-shadow-lg" aria-label="Edit">
                                                        View Details
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
                (Object.values(members) === undefined || Object.values(members).length === 0) ? (
                    <>
                        <h3 className="text-center text-gray-600 p-4 text-lg">The list of all members will appear here</h3>
                        <div className="flex">
                            <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                        </div>
                    </>
                ) : ''
            }

            <MemberDetail
                toggleEditModal={toggleEditModal}
                itemDetails={itemDetails}
                isEditModalOpen={isEditModalOpen}/>
            {
                isEditModalOpen &&
                <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
            }
        </div>

    )
}


export default MembersList