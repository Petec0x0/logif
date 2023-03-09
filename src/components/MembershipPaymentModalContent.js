import React, { useState } from 'react';
import PayStackPop from '@paystack/inline-js';

const MembershipPaymentModalContent = () => {
  // For the paystack
  const [email, setemail] = useState('');
  const [amount, setamount] = useState('');
  const [first, setfirst] = useState('');
  const [last, setlast] = useState('');

  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const paystack2 = (e) => {
    e.preventDefault();

    const payme = new PayStackPop();
    payme.newTransaction({
      key: 'pk_live_c9aac3fe503d82d5f48a7ea50327f063b3708068',
      amount: amount * 100,
      email,
      first,
      last,
      onSuccess(transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        alert(message);
        setemail('');
        setamount('');
        setfirst('');
        setlast('');
      },
      onCancel() {
        alert('You have cancelled the transaction');
      },
    });
  };

  // // For the paypal
  // const [price, setprice] = useState(0);
  // const createOrder = (data, actions) => {
  //     return actions.order.create({
  //         purchase_units: [
  //             {
  //                 amount: {
  //                     value: price,
  //                 },
  //             },
  //         ],
  //     });
  // };

  // const onApprove = (data, actions) => {
  //     return actions.order.capture();
  // };
  const [filter, setfilter] = useState('GLOBALPAY');

  return (
    <>
      <section className="md:flex md:flex-row mx-2 flex-col justify-center">
        <button onClick={() => setfilter('GLOBALPAY')} type="button" className="text-primary bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2">
          <img alt="Globay Pay" src="https://demo.globalpay.com.ng/GlobalPayAPI/img/globalpay.jpg" className="w-20 h-4" />
        </button>
        <button onClick={() => setfilter('BANK')} type="button" className="text-primary bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 -ml-1 w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z" />
          </svg>
          Bank Transfer
        </button>
        {/* <button onClick={() => setfilter('PAYPAL')} type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                                Donate with PayPal
                            </button> */}
        <button onClick={() => setfilter('PAYSTACK')} type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
          <img alt="Paystack" src="https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png" className="mr-2 w-5 h-4" />
          Donate with Paystack
        </button>
      </section>

      <div className="inter-body">
        <div className="">
          {/* For each information */}
          {filter === 'BANK' && (
            <div className="inter-left">
              <span>Lovers of God international Foundation</span>
              {/* banks */}
              <div className="inter-bank">
                <section className="bg-[#F3F4F6] pt-4 pb-10 px-4">
                  <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                        <div className="mb-10 overflow-hidden rounded-lg bg-white">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Ecobank_Logo_EN.png"
                            alt="ECOBANK"
                            className="w-full"
                          />
                          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                              <a
                                href="/#"
                                className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                              >
                                ECOBANK
                              </a>
                            </h3>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              1190009269 USD
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              1190009245 Naira
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              1190009283 GBP
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              1190009252 EURO
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                        <div className="mb-10 overflow-hidden rounded-lg bg-white">
                          <img
                            src="https://businessday.ng/wp-content/uploads/2022/02/UBA-8-1.png"
                            alt="UBA"
                            className="w-full"
                          />
                          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                              <a
                                href="/#"
                                className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                              >
                                UNITED BANK FOR AFRICA (UBA)
                              </a>
                            </h3>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Naira 1022696637
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Usd 3002854480
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Eur 3002854497
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              GBP 3002854507
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                        <div className="mb-10 overflow-hidden rounded-lg bg-white">
                          <img
                            src="https://i2.wp.com/kleenriteltd.com/wp-content/uploads/2014/11/zenith-bank.jpg?fit=750%2C350&ssl=1"
                            alt="ZENITH BANK"
                            className="w-full"
                          />
                          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                              <a
                                href="/#"
                                className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                              >
                                ZENITH BANK
                              </a>
                            </h3>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Pounds - 5060333978
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Dollars - 5071304631
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Euro - 5080327715
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              Naira - 1017152353
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                        <div className="mb-10 overflow-hidden rounded-lg bg-white">
                          <img
                            src="https://cdn.punchng.com/wp-content/uploads/2022/06/09021310/First-Bank.png"
                            alt="FIRSTBANK ACCOUNT"
                            className="w-full"
                          />
                          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                              <a
                                href="/#"
                                className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                              >
                                FIRSTBANK ACCOUNT
                              </a>
                            </h3>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              2035291381(NGN)
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              2035291673(GBP)
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              2035291721(EUR)
                            </p>
                            <p className="text-body-color mb-1 text-base leading-relaxed">
                              2035291628(USD)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <span>Purpose of donation - </span>
              <ul>
                <li>LOGIF Partnership</li>
              </ul>

              <p>All member must send proof of donation to the following;</p>

              <p>Email : donations@cojim.org</p>
              <p>
                Whatsapp : <span>+2347043315405</span>
              </p>
              <p>
                SMS : <span>+2347043315405</span>
              </p>

              <p className="note">
                Please state the purpose of your donation on the donation slip or
                the comment/note section of your bank transfer app.
              </p>
            </div>
          )}
          {/* For the paypal */}

          {/* {filter === 'PAYPAL' && (
                                    <div className="inter-right">
                                        <div className="cont">
                                            <label>Enter a Price:</label>
                                            <input
                                                type="number"
                                                onChange={(e) => setprice(e.target.value)}
                                                value={price}
                                            />
                                            <PayPalButton
                                                createOrder={(data, actions) => createOrder(data, actions)}
                                                onApprove={(data, actions) => onApprove(data, actions)}
                                            />
                                        </div>
                                    </div>
                                )} */}
          {filter === 'PAYSTACK' && (
            <div className="paystack-right">
              <div className="pay-input">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                />

                <label htmlFor="first-name">FirstName:</label>
                <input
                  type="text"
                  value={first}
                  onChange={(e) => setfirst(e.target.value)}
                  className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                />

                <label htmlFor="last-name">LastName:</label>
                <input
                  type="text"
                  value={last}
                  onChange={(e) => setlast(e.target.value)}
                  className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                />

                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                />

                <input
                  onClick={paystack2}
                  className="pay-sub rounded-lg"
                  type="submit"
                  value="Pay to LOGIF"
                />
              </div>
            </div>
          )}

          {filter === 'GLOBALPAY' && (
            <>
              <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                  <form
                    target="_blank"
                    className="py-6 px-9"
                    action="https://demo.globalpay.com.ng/globalpay_demo/Paymentgatewaycapture.aspx"
                    method="POST"
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Fill in the required details below to continue
                      </label>
                      <div className="font-semibold">Full Name</div>
                      <div className="mb-2">
                        <input name="names" className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" type="text" placeholder="e.g Christopher Orji" />
                      </div>

                      <div className="font-semibold">How much would you like to donate?</div>
                      <div className="mb-2">
                        <input name="amount" className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" type="text" placeholder="e.g 10000" />
                      </div>

                      <div className="font-semibold">Enter your email address</div>
                      <div className="mb-2">
                        <input name="email_address" className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" type="text" placeholder="e.g cojimmedia@gmail.com" />
                      </div>

                      <div className="font-semibold">Enter your phone number</div>
                      <div className="mb-2">
                        <input name="phone_number" className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" type="text" placeholder="e.g +2347043315405" />
                      </div>

                      <div className="relative inline-flex self-center">
                        <svg className="text-white bg-primary absolute top-0 right-0 m-2 pointer-events-none p-2 rounded" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 38 22" version="1.1">
                          <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
                          <g id="ZahnhelferDE—Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-539.000000, -199.000000)" fill="#ffffff" fillRule="nonzero">
                              <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                                <polygon id="Path-Copy" transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) " points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631" />
                              </g>
                            </g>
                          </g>
                        </svg>
                        <select name="currency" className="text-2xl w-64 font-bold rounded border-2 border-pribg-primary text-gray-600 h-14 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                          <option>NGN</option>
                          <option>USD</option>
                        </select>
                      </div>

                      <input type="hidden" id="merch_txnref" name="merch_txnref" value={makeid(50)}></input>
                      <input type="hidden" id="merchantid" name="merchantid" value="22979" />
                    </div>


                    <div>
                      <button
                        className="hover:shadow-form w-full rounded-md bg-primary py-3 px-8 text-center text-base font-semibold text-white outline-none"
                      >
                        Donate Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MembershipPaymentModalContent