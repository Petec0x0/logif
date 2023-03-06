import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Stats = () => {
    let navigate = useNavigate();

    const [stats, setStats] = useState({
        totalAccounts: 0,
        totalReviewedAccount: 0,
        totalUnreviewedAccounts: 0,
        unconfirmedPayment: 0
    });

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        // send a get request to the server to fetch members data
        (async () => {
            const rawResponse = await fetch(`/api/admin/members-list`, {
                method: 'GET',
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
                const members = content.data;
                // send a get request to the server to fetch payment data
                (async () => {
                    const rawResponse = await fetch(`/api/payment/get-all-payment`, {
                        method: 'GET',
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
                        const payments = content.data;
                        // update statistics
                        let totalReviewedPayment = payments.filter((item) => item.reviewed === true);
                        let totalReviewedAccount = members.filter((item) => item.reviewed === true);
                        setStats({
                            ...stats,
                            totalAccounts: members.length,
                            totalReviewedAccount: totalReviewedAccount.length,
                            totalUnreviewedAccounts: members.length - totalReviewedAccount.length,
                            unconfirmedPayment: payments.length - totalReviewedPayment.length
                        });
                    }
                })();
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
                        <svg className="h-8 w-8 text-blue-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
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
                        <svg className="h-8 w-8 text-green-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
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
                        <svg className="h-8 w-8 text-yellow-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
                            <path className="cls-1" d="M72.45,44.22a11.29,11.29,0,0,1-5.34-3.37c3.57-1.35,5.23-5,5.45-11.29.17-4.69-.8-6.93.8-11.56,3.17-9.19,14.92-12.33,21.46-7,5.13-.54,10.3,2.11,11.41,10,.83,5.9-.93,9.75.93,15.19a8.53,8.53,0,0,0,4.37,5.18,12.72,12.72,0,0,1-5.84,2.81,58.72,58.72,0,0,1-9.22,1V48l3.21,5.14L89.31,61.27,79,53.23l2.3-4.92v-3a39.49,39.49,0,0,1-8.81-1.11ZM25.16,37.76a3.13,3.13,0,0,1-1.67-.37,3.87,3.87,0,0,1-1.59-1.88c-.73-1.64-1.31-6,.53-7.2l-.34-.22,0-.48c-.07-.87-.09-1.92-.11-3-.07-4.06-.15-9-3.5-10L17,14.19l.94-1.14a54.24,54.24,0,0,1,8.4-8.31A21.77,21.77,0,0,1,36.07.14a11.89,11.89,0,0,1,9.45,2.58A17.37,17.37,0,0,1,48.06,5.2a10.83,10.83,0,0,1,7.57,4.31,14.83,14.83,0,0,1,2.47,4.85,16.14,16.14,0,0,1,.66,5.49,13,13,0,0,1-3.93,8.9,2.9,2.9,0,0,1,1.22.31c1.4.73,1.45,2.31,1.08,3.64-.36,1.11-.82,2.39-1.26,3.47-.53,1.46-1.3,1.73-2.8,1.58-3.36,14.69-23.67,15.2-27.91,0Zm1.25,11.47,6.8,17.85,3.42-9.73L35,55.52c-1.26-1.84-.82-3.93,1.51-4.31A16.27,16.27,0,0,1,39,51.16a13.48,13.48,0,0,1,2.78.11c2.17.48,2.39,2.58,1.31,4.25l-1.67,1.83,3.41,9.73L51,49.23c4.44,4,14.38,4.8,19.27,7.52C77,60.54,76.5,65.41,78,72.19H0c1.47-6.72,1.64-11.71,8.39-15.44,6-3.34,13.1-3.09,18-7.52Zm79.19,8.34c-1.71-3.42-2.29-4.74-4.8-7.46,3.89,1.51,16.91,4.76,18.93,8.55,2.27,4.25,1.94,9,3.15,13.51H82.58a4.45,4.45,0,0,0-.1-1c-.26-1.19-.45-2.28-.63-3.31-.66-3.81-1.23-7.07-3.27-10l10.47,8.36,11.61-8.84,4.94.12ZM71.21,52.12c2.05-.58,4.25-1.09,6.63-2a20.16,20.16,0,0,0-3.06,4.08c-.69-.49-1.45-1-2.29-1.45h0c-.4-.22-.82-.43-1.26-.62Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Unconfirmed Payment(s)</span>
                        <h1 className="text-2xl font-bold">{stats.unconfirmedPayment}</h1>
                    </div>
                    <div>
                        <svg fill="currentColor" className="h-8 w-8 text-red-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5,18 C21.776,18 22,18.224 22,18.5 L22,19.5 C22,20.881 20.881,22 19.5,22 L7.5,22 C7.411,22 7.323,21.995 7.236,21.986 C7.159,21.995 7.08,22 7,22 C6.859,22 6.732,21.942 6.642,21.849 C5.684,21.499 5,20.579 5,19.5 L5,6 L2.5,6 C2.224,6 2,5.776 2,5.5 L2,4 C2,2.896 2.896,2 4,2 L16.534,2 C17.915,2 19.034,3.119 19.034,4.5 L19.034,18 L21.5,18 Z M21,19.5 L21,19 L9,19 L9,20 C9,20.364 8.902,20.706 8.732,21 L19.5,21 C20.329,21 21,20.328 21,19.5 Z M8,18.5 C8,18.224 8.224,18 8.5,18 L18.034,18 L18.034,4.5 C18.034,3.671 17.363,3 16.534,3 L5.723,3 C5.895,3.295 6,3.634 6,4 L6,19.5 C6,20.234 6.527,20.846 7.225,20.975 C7.668,20.873 8,20.475 8,20 L8,18.5 Z M5,5 L5,4 C5,3.448 4.552,3 4,3 C3.448,3 3,3.448 3,4 L3,5 L5,5 Z M9.5,8 C9.224,8 9,8.224 9,8.5 L9,9.5 C9,9.776 9.224,10 9.5,10 L14.5,10 C15.329,10 16,10.671 16,11.5 L16,12.5 C16,13.329 15.329,14 14.5,14 L14,14 L14,14.5 C14,14.776 13.776,15 13.5,15 C13.224,15 13,14.776 13,14.5 L13,14 L11,14 L11,14.5 C11,14.776 10.776,15 10.5,15 C10.224,15 10,14.776 10,14.5 L10,14 L9.5,14 C8.671,14 8,13.329 8,12.5 C8,12.224 8.224,12 8.5,12 C8.776,12 9,12.224 9,12.5 C9,12.776 9.224,13 9.5,13 L14.5,13 C14.776,13 15,12.776 15,12.5 L15,11.5 C15,11.224 14.776,11 14.5,11 L9.5,11 C8.671,11 8,10.329 8,9.5 L8,8.5 C8,7.671 8.671,7 9.5,7 L10,7 L10,6.5 C10,6.224 10.224,6 10.5,6 C10.776,6 11,6.224 11,6.5 L11,7 L13,7 L13,6.5 C13,6.224 13.224,6 13.5,6 C13.776,6 14,6.224 14,6.5 L14,7 L14.5,7 C15.329,7 16,7.671 16,8.5 C16,8.776 15.776,9 15.5,9 C15.224,9 15,8.776 15,8.5 C15,8.224 14.776,8 14.5,8 L9.5,8 Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;