/**
 * In the src folder, files are imported. No fetching for you to do as Webpack does it all for you,
 * but this means that to get image files, json files, css files, and such, we import them.
 * 
 */ 
import './StartSection.css'
import dropdownIcon from './../../images/dropdown-icon.png'
import homeIcon from './../../images/home-icon.png'
import mapIcon from './../../images/pin-solid-icon.png'
import accountIcon from './../../images/account-icon.png'
import servicesData from './../../json/tags.json';
import { useRef } from 'react';
import { onAuthStateChangedListener } from '../../firebase/firebase.js'

function StartSection({isActive, setAppSection, setAppService}) {
    /**
     * These are props. Yey.
     * 
     * These are just values or functions passed to this component. 
     * To pass, you noticed the isActive = {...} and such in the App.js.
     * 
     * It is like a function, but a wacky way of passing values.
     */


    /**
     * UseRef is a hook that gets a reference to an element.
     * If you know document.getElementByID() and such, that is what UseRef is.
     * To set the reference, go to an element and put ref = {ref variable}.
     * 
     * You will see <section className="selections" ref={dropdownsRef}>
     * 
     * This just means that this section tag is being stored in the dropdownsRef variable 
     * (just like document.getElementByID() :0)
     * 
     */

    onAuthStateChangedListener(async (user) => {
        if (user) {
            console.log(`User logged in -\nName: ${user.displayName}\nEmail: ${user.email}\nUID: ${user.uid}`);
        } else {
            console.log("wala user eh :)");
        }
    })


    const dropdownsRef = useRef(null);

    function toggleDropdown(index) {
        const dropdownsContainer = dropdownsRef.current;        // use current to get the actual element from dropdownsRef
        const dropdown = dropdownsContainer.querySelectorAll('.service-dropdown .dropdown-option-list')[index];
        dropdown.classList.toggle("hidden");
    }

    // Storing JSON from tags.json
    const services = servicesData

    /**
     * This is just basic HTML with some JS flavor.
     * 
     * It checks if it is the active page using isActive, if it is, then it is rendered, else it is not rendered. 
     * We cannot work with If Else statements, so we use ? operator instead. 
     *   
     * Also, we do not addEventListener() anymore, we use onClick, onFocus, and etc. in the elements.
     * React is wacky, it does not allow me to do imperative code :<
     */
    return (
        (isActive) ? (
            <div className="StartSection">

                { /* Header */}
                <main> 
                    <figure className="mascot"></figure>
                    <div className="mascot-dialogue">
                        What services would you like me to find you?
                    </div>
                </main>   
                
                { /* Users see the dropdowns which contains the services they want to get */}
                <section className="selections" ref={dropdownsRef}>
                {
                    services.map((service, index) => (
                        <div key={index} className="service-dropdown">
                            <div className="dropdown-selected-container"  onClick= {() => toggleDropdown(index)}>
                                <p>{service.group}</p>
                                <img src={dropdownIcon}></img>
                            </div>
                            <div className="dropdown-option-list hidden" onClick={() => setAppSection("MAP")}>
                                {
                                    service.tags.map((tag, tagIndex) => (
                                        <button key={tagIndex} className="dropdown-option" onClick = {() => setAppService(tag)}>{tag}</button>
                                    ))
                                }
                            </div>    
                        </div>    
                    ))  
                }
                </section>
            
                { /* Navigation bar to other sections */}
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
            </div>
        ) : ( <></> )
    );
}

export default StartSection;