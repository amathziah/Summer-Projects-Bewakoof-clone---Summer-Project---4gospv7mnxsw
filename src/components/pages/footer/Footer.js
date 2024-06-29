import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSnapchat, faTwitter, faPinterest, faApple } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark p-4 text-center">
            <div className="footer-logo mb-4">
                <h1 className="bewakoof-name">Bewakoof</h1>
            </div>
            <div className="footer-links">
                <ul className="flex flex-col md:flex-row justify-center gap-4">
                    <li>
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/about-us">About Us</Link>
                    </li>
                    <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} /> Facebook
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} /> Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSnapchat} /> Snapchat
                        </a>
                    </li>
                    <li>
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faApple} /> App Store
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} /> Twitter
                        </a>
                    </li>
                    <li>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faPinterest} /> Pinterest
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-policy mt-4">
                <p>15 days return policy and Cash on delivery</p>
            </div>
        </footer>
    );
};

export default Footer;




