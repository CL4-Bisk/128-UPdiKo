import './AccountInfoSection.css';
// import dropdownIcon from './../../images/icon/dropdown-icon.png'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'
import { getCurrentUser } from '../../firebase/firebase.js';
import { useRef, useState } from "react";

function AccountInfoSection({ setAppSection }) {

    // const [setDropdownVisible] = useState(false);

    // function toggleDropdown() {
    //     setDropdownVisible(prev => !prev);
    // }

    // const dropdownsRef = useRef(null);
    
    // function toggleDropdown(index) {
    //     const dropdownsContainer = dropdownsRef.current;        // use current to get the actual element from dropdownsRef
    //     const dropdown = dropdownsContainer.querySelectorAll('.service-dropdown .dropdown-option-list')[index];
    //     dropdown.classList.toggle("hidden");
    // }

    // const data = accountData;

    const user = getCurrentUser();

    return (
        <div className="AccountInfoSection">

            {/* HEADER */}
            <main>
                <figure className="mascot"></figure>
                <div className="mascot-dialogue">
                    ACCOUNT SETTINGS
                </div>
            </main>

            { /* Users see the dropdowns which contains the services they want to get */}
            {/* <section className="selections" ref={dropdownsRef}> */}
            {
                // data.map((service, index) => (
                //     <div key={index} className="service-dropdown">
                //         <div className="dropdown-selected-container"  onClick= {() => toggleDropdown(index)}>
                //             <p>{service.setting}</p>
                //             <img src=''></img>
                //         </div>
                //         <div className="dropdown-option-list hidden">
                //             {
                //                 service.tags.map((tag, index) => (
                //                     <button key={index} className="dropdown-option" onClick = { () => handleTag(tag.toUpperCase())}>{tag}</button>
                //                 ))
                //             }
                //         </div>    
                //     </div>    
                // ))  

                getCurrentUser() ? (
                    <div className="user-info-container">
                        <h2 className="info-title">User Information</h2>
                        <div className="user-info">
                            <p className="info-label">Name:</p>
                            <p className="info-content">{user.displayName}</p>
                        </div>
                        <div className="user-info">
                            <p className="info-label">Email:</p>
                            <p className="info-content">{user.email}</p>
                        </div>
                    </div>
                ) : <></>
            }
            {/* </section> */}

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
    );
}

export default AccountInfoSection;