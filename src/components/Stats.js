import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Stats = () => {
    let navigate = useNavigate();

    const [stats, setStats] = useState({
        totalAccounts: 0,
        totalReviewedAccount: 0,
        totalUnreviewedAccounts: 0,
        newPaymentCount: 0
    });

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        // send a get request to the server to fetch products
        (async () => {
            const rawResponse = await fetch(`/api/admin/members-list`, {
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
                // update statistics
                let totalReviewedAccount = content.data.filter((item) => item.reviewed === true);
                setStats({
                    ...stats,
                    totalAccounts: content.data.length,
                    totalReviewedAccount: totalReviewedAccount.length,
                    totalUnreviewedAccounts: content.data.length - totalReviewedAccount.length
                });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-blue-50 flex-wrap py-2 px-10">
            <div className="flex flex-col justify-evenly md:flex-row">
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Total Accounts</span>
                        <h1 className="text-2xl font-bold">{numberWithCommas(stats.totalAccounts)}</h1>
                    </div>
                    <div>
                        <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
                            <path className="cls-1" d="M72.45,44.22a11.29,11.29,0,0,1-5.34-3.37c3.57-1.35,5.23-5,5.45-11.29.17-4.69-.8-6.93.8-11.56,3.17-9.19,14.92-12.33,21.46-7,5.13-.54,10.3,2.11,11.41,10,.83,5.9-.93,9.75.93,15.19a8.53,8.53,0,0,0,4.37,5.18,12.72,12.72,0,0,1-5.84,2.81,58.72,58.72,0,0,1-9.22,1V48l3.21,5.14L89.31,61.27,79,53.23l2.3-4.92v-3a39.49,39.49,0,0,1-8.81-1.11ZM25.16,37.76a3.13,3.13,0,0,1-1.67-.37,3.87,3.87,0,0,1-1.59-1.88c-.73-1.64-1.31-6,.53-7.2l-.34-.22,0-.48c-.07-.87-.09-1.92-.11-3-.07-4.06-.15-9-3.5-10L17,14.19l.94-1.14a54.24,54.24,0,0,1,8.4-8.31A21.77,21.77,0,0,1,36.07.14a11.89,11.89,0,0,1,9.45,2.58A17.37,17.37,0,0,1,48.06,5.2a10.83,10.83,0,0,1,7.57,4.31,14.83,14.83,0,0,1,2.47,4.85,16.14,16.14,0,0,1,.66,5.49,13,13,0,0,1-3.93,8.9,2.9,2.9,0,0,1,1.22.31c1.4.73,1.45,2.31,1.08,3.64-.36,1.11-.82,2.39-1.26,3.47-.53,1.46-1.3,1.73-2.8,1.58-3.36,14.69-23.67,15.2-27.91,0Zm1.25,11.47,6.8,17.85,3.42-9.73L35,55.52c-1.26-1.84-.82-3.93,1.51-4.31A16.27,16.27,0,0,1,39,51.16a13.48,13.48,0,0,1,2.78.11c2.17.48,2.39,2.58,1.31,4.25l-1.67,1.83,3.41,9.73L51,49.23c4.44,4,14.38,4.8,19.27,7.52C77,60.54,76.5,65.41,78,72.19H0c1.47-6.72,1.64-11.71,8.39-15.44,6-3.34,13.1-3.09,18-7.52Zm79.19,8.34c-1.71-3.42-2.29-4.74-4.8-7.46,3.89,1.51,16.91,4.76,18.93,8.55,2.27,4.25,1.94,9,3.15,13.51H82.58a4.45,4.45,0,0,0-.1-1c-.26-1.19-.45-2.28-.63-3.31-.66-3.81-1.23-7.07-3.27-10l10.47,8.36,11.61-8.84,4.94.12ZM71.21,52.12c2.05-.58,4.25-1.09,6.63-2a20.16,20.16,0,0,0-3.06,4.08c-.69-.49-1.45-1-2.29-1.45h0c-.4-.22-.82-.43-1.26-.62Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Total Reviewed Accounts</span>
                        <h1 className="text-2xl font-bold">{stats.totalReviewedAccount}</h1>
                    </div>
                    <div>
                        <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
                            <path className="cls-1" d="M72.45,44.22a11.29,11.29,0,0,1-5.34-3.37c3.57-1.35,5.23-5,5.45-11.29.17-4.69-.8-6.93.8-11.56,3.17-9.19,14.92-12.33,21.46-7,5.13-.54,10.3,2.11,11.41,10,.83,5.9-.93,9.75.93,15.19a8.53,8.53,0,0,0,4.37,5.18,12.72,12.72,0,0,1-5.84,2.81,58.72,58.72,0,0,1-9.22,1V48l3.21,5.14L89.31,61.27,79,53.23l2.3-4.92v-3a39.49,39.49,0,0,1-8.81-1.11ZM25.16,37.76a3.13,3.13,0,0,1-1.67-.37,3.87,3.87,0,0,1-1.59-1.88c-.73-1.64-1.31-6,.53-7.2l-.34-.22,0-.48c-.07-.87-.09-1.92-.11-3-.07-4.06-.15-9-3.5-10L17,14.19l.94-1.14a54.24,54.24,0,0,1,8.4-8.31A21.77,21.77,0,0,1,36.07.14a11.89,11.89,0,0,1,9.45,2.58A17.37,17.37,0,0,1,48.06,5.2a10.83,10.83,0,0,1,7.57,4.31,14.83,14.83,0,0,1,2.47,4.85,16.14,16.14,0,0,1,.66,5.49,13,13,0,0,1-3.93,8.9,2.9,2.9,0,0,1,1.22.31c1.4.73,1.45,2.31,1.08,3.64-.36,1.11-.82,2.39-1.26,3.47-.53,1.46-1.3,1.73-2.8,1.58-3.36,14.69-23.67,15.2-27.91,0Zm1.25,11.47,6.8,17.85,3.42-9.73L35,55.52c-1.26-1.84-.82-3.93,1.51-4.31A16.27,16.27,0,0,1,39,51.16a13.48,13.48,0,0,1,2.78.11c2.17.48,2.39,2.58,1.31,4.25l-1.67,1.83,3.41,9.73L51,49.23c4.44,4,14.38,4.8,19.27,7.52C77,60.54,76.5,65.41,78,72.19H0c1.47-6.72,1.64-11.71,8.39-15.44,6-3.34,13.1-3.09,18-7.52Zm79.19,8.34c-1.71-3.42-2.29-4.74-4.8-7.46,3.89,1.51,16.91,4.76,18.93,8.55,2.27,4.25,1.94,9,3.15,13.51H82.58a4.45,4.45,0,0,0-.1-1c-.26-1.19-.45-2.28-.63-3.31-.66-3.81-1.23-7.07-3.27-10l10.47,8.36,11.61-8.84,4.94.12ZM71.21,52.12c2.05-.58,4.25-1.09,6.63-2a20.16,20.16,0,0,0-3.06,4.08c-.69-.49-1.45-1-2.29-1.45h0c-.4-.22-.82-.43-1.26-.62Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Total Unreviewed Accounts</span>
                        <h1 className="text-2xl font-bold">{stats.totalUnreviewedAccounts}</h1>
                    </div>
                    <div>
                        <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
                            <path className="cls-1" d="M72.45,44.22a11.29,11.29,0,0,1-5.34-3.37c3.57-1.35,5.23-5,5.45-11.29.17-4.69-.8-6.93.8-11.56,3.17-9.19,14.92-12.33,21.46-7,5.13-.54,10.3,2.11,11.41,10,.83,5.9-.93,9.75.93,15.19a8.53,8.53,0,0,0,4.37,5.18,12.72,12.72,0,0,1-5.84,2.81,58.72,58.72,0,0,1-9.22,1V48l3.21,5.14L89.31,61.27,79,53.23l2.3-4.92v-3a39.49,39.49,0,0,1-8.81-1.11ZM25.16,37.76a3.13,3.13,0,0,1-1.67-.37,3.87,3.87,0,0,1-1.59-1.88c-.73-1.64-1.31-6,.53-7.2l-.34-.22,0-.48c-.07-.87-.09-1.92-.11-3-.07-4.06-.15-9-3.5-10L17,14.19l.94-1.14a54.24,54.24,0,0,1,8.4-8.31A21.77,21.77,0,0,1,36.07.14a11.89,11.89,0,0,1,9.45,2.58A17.37,17.37,0,0,1,48.06,5.2a10.83,10.83,0,0,1,7.57,4.31,14.83,14.83,0,0,1,2.47,4.85,16.14,16.14,0,0,1,.66,5.49,13,13,0,0,1-3.93,8.9,2.9,2.9,0,0,1,1.22.31c1.4.73,1.45,2.31,1.08,3.64-.36,1.11-.82,2.39-1.26,3.47-.53,1.46-1.3,1.73-2.8,1.58-3.36,14.69-23.67,15.2-27.91,0Zm1.25,11.47,6.8,17.85,3.42-9.73L35,55.52c-1.26-1.84-.82-3.93,1.51-4.31A16.27,16.27,0,0,1,39,51.16a13.48,13.48,0,0,1,2.78.11c2.17.48,2.39,2.58,1.31,4.25l-1.67,1.83,3.41,9.73L51,49.23c4.44,4,14.38,4.8,19.27,7.52C77,60.54,76.5,65.41,78,72.19H0c1.47-6.72,1.64-11.71,8.39-15.44,6-3.34,13.1-3.09,18-7.52Zm79.19,8.34c-1.71-3.42-2.29-4.74-4.8-7.46,3.89,1.51,16.91,4.76,18.93,8.55,2.27,4.25,1.94,9,3.15,13.51H82.58a4.45,4.45,0,0,0-.1-1c-.26-1.19-.45-2.28-.63-3.31-.66-3.81-1.23-7.07-3.27-10l10.47,8.36,11.61-8.84,4.94.12ZM71.21,52.12c2.05-.58,4.25-1.09,6.63-2a20.16,20.16,0,0,0-3.06,4.08c-.69-.49-1.45-1-2.29-1.45h0c-.4-.22-.82-.43-1.26-.62Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">New Payment(s)</span>
                        <h1 className="text-2xl font-bold">{stats.newPaymentCount}</h1>
                    </div>
                    <div>
                        <svg className="h-8 w-8 text-red-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
                            <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;