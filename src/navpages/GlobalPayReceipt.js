import React, { useEffect, useState } from 'react';
import logo from 'img/logif-min.png';

const GlobalPayReceipt = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let txnref = params.get('txnref');
    console.log(txnref);
    const [transactionData, setTransactionData] = useState({
        resultset: ""
    });

    useEffect(() => {
        // send a get request to the server to fetch payments
        (async () => {
            const rawResponse = await fetch(`/api/payment/verify-globalpay-payment?txnref=${txnref}`, {
                method: 'GET',
            });
            const content = await rawResponse.json();

            // check if there is an error in the response
            if (content.error) {
                alert(content);
            } else {
                // update
                console.log(content.data);
                setTransactionData({ ...content.data });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div id="receipt-content" className="text-left mx-auto md:w-1/2 text-sm p-6 overflow-auto">
                <div className="text-center">
                    <img src={logo} alt="LOGIF" className="w-44 h-16 mx-auto" />
                </div>
                <hr className="my-2" />
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                    <div className="w-full p-3 border-b border-gray-200">
                        <div className="mb-5">
                            <img alt="GlobalPay" src="https://demo.globalpay.com.ng/GlobalPayAPI/img/globalpay.jpg" className="h-6 ml-3" />
                        </div>
                        {
                            transactionData.resultset !== "" ?
                                <div>
                                    <div className="text-center">
                                        <h2 className="text-lg font-semibold">Transaction Status</h2>
                                        <p>
                                            Find below details of your transaction status -
                                            <span className={`font-extrabold ${(transactionData.resultset.record.payment_status === 'successful') ? 'text-green-600' : 'text-red-600'}`}>
                                                {transactionData.resultset.record.payment_status.toUpperCase()}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                        <p className="text-gray-600">
                                            Transaction Ref. No:
                                        </p>
                                        <p className="font-bold">
                                            {transactionData.resultset.record.txnref}
                                        </p>
                                        <p className="text-gray-600">
                                            Transaction Date:
                                        </p>
                                        <p className="font-bold">
                                            {transactionData.resultset.record.payment_date}
                                        </p>
                                        <p className="text-gray-600">
                                            Payment Method:
                                        </p>
                                        <p className="font-bold">
                                            {transactionData.resultset.record.channel.toUpperCase()}
                                        </p>
                                        <p className="text-gray-600">
                                            Status:
                                        </p>
                                        <p className="font-bold">
                                            {transactionData.resultset.record.payment_status_description}
                                        </p>
                                        <p className="text-gray-600">
                                            Transaction Amount:
                                        </p>
                                        <p className="font-bold">
                                            {transactionData.resultset.record.amount}
                                        </p>
                                        <p className="text-gray-600">
                                            Transaction Currency:
                                        </p>
                                        <p className="font-bold">
                                            {transactionData.resultset.record.field_values.field_values.field[2]['currency']}
                                        </p>
                                    </div>
                                </div> :
                                <>
                                    <div className="text-5xl font-dark font-bold">Uppsss...
                                        <strong> 404 </strong>
                                    </div>
                                    <br />
                                    <br />
                                    <p
                                        className="text-xl md:text-2xl font-light leading-normal"
                                    ><strong>Transaction Not Found</strong></p>
                                    <br />
                                    <br />
                                    <p className="mb-8">Check if the transaction reference is correct. If you think this is an error, contact support                 <strong>Thanks!</strong></p>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default GlobalPayReceipt;