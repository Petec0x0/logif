import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF, FaTiktok, FaTwitter } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import PayStackPop from '@paystack/inline-js';
import './give.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './local.css';

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });
const Give = () => {
  // For the paystack
  const [email, setemail] = useState('');
  const [amount, setamount] = useState('');
  const [first, setfirst] = useState('');
  const [last, setlast] = useState('');

  const paystack = (e) => {
    e.preventDefault();

    const payme = new PayStackPop();
    payme.newTransaction({
      key: 'pk_live_439d0945863071775784e3267f50754fcd8be337',
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

  // For the paypal
  const [price, setprice] = useState(0);
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  const [filter, setfilter] = useState('BANK');
  return (
    <>
      <Navbar />
      <div className="inter-body">
        <div className="inter-cont">
          {/* For the buttons */}
          <div className="inter-btn">
            <button
              className={`bank-btn ${
                filter === 'BANK' ? 'bank-btn-active' : ''
              }`}
              onClick={() => setfilter('BANK')}
            >
              BANK TRANSFERS
            </button>
            <button
              className={`bank-btn ${
                filter === 'PAYPAL' ? 'bank-btn-active' : ''
              }`}
              onClick={() => setfilter('PAYPAL')}
            >
              PAYPAL
            </button>
            <button
              className={`bank-btn ${
                filter === 'PAYSTACK' ? 'bank-btn-active' : ''
              }`}
              onClick={() => setfilter('PAYSTACK')}
            >
              PAYSTACK
            </button>
          </div>
          {/* For each information */}
          {filter === 'BANK' && (
            <div className="inter-left">
              <p>
                kindly send your donations to the following Bank account
                numbers;
              </p>

              <span>Lovers of God international Foundation</span>
              {/* banks */}
              <div className="inter-bank">
                <div className="uba-bank">
                  <div>
                    <span>UNITED BANK FOR AFRICA (UBA) </span>
                    <ul>
                      <li>Naira 1022696637</li>
                      <li>Usd 3002854480</li>
                      <li>Eur 3002854497</li>
                      <li>GBP 3002854507</li>
                    </ul>
                  </div>
                  <div>
                    <span>FIRSTBANK ACCOUNT NUMBERS</span>
                    <ul>
                      <li>2035291381(NGN)</li>
                      <li>2035291673(GBP)</li>
                      <li>2035291721(EUR)</li>
                      <li>2035291628(USD)</li>
                    </ul>
                  </div>
                </div>
                <div className="uk-bank">
                  <div>
                    <span>ECOBANK </span>
                    <ul>
                      <li>1190009269 USD</li>
                      <li>1190009245 Naira </li>
                      <li>1190009283 GBP</li>
                      <li>1190009252 EURO</li>
                    </ul>
                  </div>
                  <div className="uk">
                    <span>ZENITH BANK</span>
                    <ul>
                      <li>Pounds - 5060333978</li>
                      <li>Dollars - 5071304631</li>
                      <li>Euro - 5080327715</li>
                      <li>Naira - 1017152353</li>
                    </ul>
                  </div>
                </div>
              </div>

              <span>Purpose of donation - </span>
              <ul>
                <li>LOGIF Partnership</li>
                <li>Seed sowing/Offering</li>
                <li>Donation</li>
                <li>Church building fund</li>
              </ul>

              <p>All Donors Must send Proof of payment to the following;</p>

              <p>Email : donations@cojim.org</p>
              <p>
                Whatsapp : <span>+2347043315405</span>
              </p>
              <p>
                SMS : <span>+2347043315405</span>
              </p>

              <p className="note">
                Please state the purpose of your donation on the payment slip or
                the comment/note section of your bank transfer app.
              </p>
            </div>
          )}
          {/* For the paypal */}

          {filter === 'PAYPAL' && (
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
          )}
          {filter === 'PAYSTACK' && (
            <div className="paystack-right">
              <div className="pay-input">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />

                <label htmlFor="first-name">FirstName:</label>
                <input
                  type="text"
                  value={first}
                  onChange={(e) => setfirst(e.target.value)}
                />

                <label htmlFor="last-name">LastName:</label>
                <input
                  type="text"
                  value={last}
                  onChange={(e) => setlast(e.target.value)}
                />

                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                />
                <input
                  onClick={paystack}
                  className="pay-sub"
                  type="submit"
                  value="Pay to COJIM"
                />
                <input
                  onClick={paystack2}
                  className="pay-sub"
                  type="submit"
                  value="Pay to LOGIF"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="about-socio l-icon">
        <a
          target="_blank"
          href="https://web.facebook.com/ChristopherOrjiMinistriesCOJIM?mibextid=ZbWKwL&_rdc=1&_rdr"
          className="socio-fb"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
        <a
          target="_blank"
          href="https://twitter.com/cojimofficiel?t=gM2yvX_4GzUAgcdXD-rP8g&s=09"
          className="socio-tw"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          target="_blank"
          href="https://www.tiktok.com/@cojim?_t=8Z9fouq804D&_r=1"
          className="socio-tik"
          rel="noreferrer"
        >
          <FaTiktok />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/cojimofficiel/?igshid=YmMyMTA2M2Y%3D"
          className="socio-in"
          rel="noreferrer"
        >
          <AiFillInstagram />
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Give;
