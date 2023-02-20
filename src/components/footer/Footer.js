import React from 'react';
import './footer.css';
import { TfiFacebook, TfiTwitter, TfiYoutube } from 'react-icons/tfi';
import { FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className="footer">
      <p>
        © <span>{new Date().getFullYear()} </span>
        Lovers of God International Foundation.
      </p>
      <div className="fo-socio">
        <a
          target="_blank"
          href="https://web.facebook.com/ChristopherOrjiMinistriesCOJIM?_rdc=1&_rdr"
          className="socio"
          rel="noreferrer"
        >
          <TfiFacebook />
        </a>
        <a
          target="_blank"
          href="https://twitter.com/cojimofficiel"
          className="socio"
          rel="noreferrer"
        >
          <TfiTwitter />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/cojimofficiel/"
          className="socio"
        >
          <FiInstagram />
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/@christopherorjiministries6459"
          className="socio"
          rel="noreferrer"
        >
          <TfiYoutube />
        </a>
      </div>
    </div>
  );
};

export default Footer;
