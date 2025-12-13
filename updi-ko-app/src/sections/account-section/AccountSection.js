import './AccountSection.css';

import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'

import { logOut, getUserDataFromDB } from '../../firebase/firebase.js';
import { useRef, useState } from "react";

function AccountSection({ isActive, setAppSection }) {
    return (
        (isActive) ? (
            <div className="AccountSection">
                
                {/* HEADER */}
                {/* <main>
                    <figure className="mascot"></figure>
                    <div className="mascot-dialogue">
                        ACCOUNT SETTINGS
                    </div>
                </main> */}

                { /* Users see the dropdowns which contains the services they want to get */}
                {/* <section className="selections" ref={dropdownsRef}>
                {
                    data.map((service, index) => (
                        <div key={index} className="service-dropdown">
                            <div className="dropdown-selected-container"  onClick= {() => toggleDropdown(index)}>
                                <p>{service.setting}</p>
                                <img src=''></img>
                            </div>
                            <div className="dropdown-option-list hidden">
                                {
                                    service.tags.map((tag, index) => (
                                        <button key={index} className="dropdown-option" onClick = { () => handleTag(tag.toLowerCase())}>{tag}</button>
                                    ))
                                }
                            </div>    
                        </div>    
                    ))  
                }
                </section> */}

                {/* NAV BAR */}
                {/* <footer>
                    <nav className="nav-bar">
                        <div className="navigations" onClick={() => setAppSection("HOME")}>
                            <img src={homeIcon}></img>
                            <p>Home</p>
                        </div>
                        <div className="navigations" onClick={() => setAppSection("MAP")}>
                            <img src={mapIcon}></img>
                            <p>Map</p>
                        </div>        
                        <div className="navigations active-section" onClick={() => setAppSection("ACCOUNT")}>
                            <img src={accountIcon} id='account'></img>
                            <p>Account</p>
                        </div>
                    </nav>
                </footer>
             */}
            </div> 
        ) : <></>
    );
}

export default AccountSection;