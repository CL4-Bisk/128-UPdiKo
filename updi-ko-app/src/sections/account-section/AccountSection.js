import './AccountSection.css';
import dropdownIcon from './../../images/dropdown-icon.png';
import homeIcon from './../../images/home-icon.png';
import mapIcon from './../../images/pin-solid-icon.png';
import accountIcon from './../../images/account-icon.png';
import StartSection from '../start-section/StartSection.js';
import { logOut } from "../../firebase/firebase.js"; 
import { useState } from "react";

function AccountSection({ isActive, setAppSection }) {

    const [dropdownVisible, setDropdownVisible] = useState(false);

    function toggleDropdown() {
        setDropdownVisible(prev => !prev);
    }

    async function handleLogout() {
        await logOut();
        setAppSection("HOME");  // Push user back home
    }

    return (
        (isActive) ? (
            <div className="AccountSection">

                {/* HEADER */}
                <main>
                    <figure className="mascot"></figure>
                    <div className="mascot-dialogue">
                        ACCOUNT SETTINGS
                    </div>
                </main>

                {/* ACCOUNT OPTIONS */}
                <section className="selections">
                    <div className="service-dropdown">

                        {/* Dropdown header */}
                        <div className="dropdown-selected-container" onClick={toggleDropdown}>
                            <p>Account Options</p>
                            <img src={dropdownIcon} />
                        </div>

                        {/* Dropdown items */}
                        <div className={`dropdown-option-list ${dropdownVisible ? "" : "hidden"}`}>
                            {/* <button className="dropdown-option" onClick={() => setAppSection("EDIT_PROFILE")}>
                                Edit Profile
                            </button>
                            <button className="dropdown-option" onClick={() => setAppSection("CHANGE_PASSWORD")}>
                                Change Password
                            </button> */}
                            <button className="dropdown-option" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>

                    </div>
                </section>

                {/* NAV BAR */}
                <footer>
                    <nav className="nav-bar">
                        <div className="navigations active-section" onClick={() => setAppSection("HOME")}>
                            <img src={homeIcon}></img>
                            <p>Home</p>
                        </div>
                        <div className="navigations" onClick={() => setAppSection("MAP")}>
                            <img src={mapIcon}></img>
                            <p>Map</p>
                        </div>        
                        <div className="navigations" onClick={() => setAppSection("ACCOUNT")}>
                            <img src={accountIcon} id='account'></img>
                            <p>Account</p>
                        </div>
                    </nav>
                </footer>

                {/* <div className="Account">
                    <StartSection 
                        isActive = { section  === "LOGIN"} 
                        setAppSection = {setSection}  
                        setAppService = {setService}
                    />
                    <MapSection 
                        isActive = { section === "SIGNUP"} 
                        setAppSection = {setSection} 
                        setAppService = {setService}
                    />
                    <AccountSection 
                        isActive = { section === "ACCOUNT"} 
                        setAppSection = {setSection}
                    />
                </div> */}

            </div>
        ) : <></>
    );
}

export default AccountSection;