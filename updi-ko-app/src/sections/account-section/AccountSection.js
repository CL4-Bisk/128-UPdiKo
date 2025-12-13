import './AccountSection.css';
// import dropdownIcon from './../../images/icon/dropdown-icon.png'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'
import accountData from './../../json/accountTags.json';
import { logOut } from '../../firebase/firebase.js';
import { useRef, useState } from "react";

function AccountSection({ isActive, setAppSection }) {

    const [setDropdownVisible] = useState(false);

    function toggleDropdown() {
        setDropdownVisible(prev => !prev);
    }

    const dropdownsRef = useRef(null);
    
    function toggleDropdown(index) {
        const dropdownsContainer = dropdownsRef.current;        // use current to get the actual element from dropdownsRef
        const dropdown = dropdownsContainer.querySelectorAll('.service-dropdown .dropdown-option-list')[index];
        dropdown.classList.toggle("hidden");
    }

    async function handleTag(tag) {
        if (tag === "LOGOUT") {
            await logOut();
            setAppSection("LOGIN");  // Push user back home
        } else {
            setAppSection(tag);  // Push user to the selected section
        }
    }

    const data = accountData;

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

                { /* Users see the dropdowns which contains the services they want to get */}
                <section className="selections" ref={dropdownsRef}>
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
                                        <button key={index} className="dropdown-option" onClick = { () => handleTag(tag.toUpperCase())}>{tag}</button>
                                    ))
                                }
                            </div>    
                        </div>    
                    ))  
                }
                </section>

                {/* NAV BAR */}
                <footer>
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
            </div>
        ) : <></>
    );
}

export default AccountSection;