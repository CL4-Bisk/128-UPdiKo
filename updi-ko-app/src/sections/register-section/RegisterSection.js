import './RegisterSection.css';
import { signUp, saveUserDataToDB, updateUserProfile } from "../../firebase/firebase.js"; 

import mascot from './../../images/logo/barney.jpg'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'
import showPassIcon from './../../images/icon/view-pass-icon.png'
import hidePassIcon from './../../images/icon/hide-pass-icon.png'

import { useState } from "react" 

function RegisterSection({ isActive, setAppSection }) {
    const [isVisible, setVisible] = useState(false);

    function togglePasswordVisibility() {    
        setVisible(!isVisible);
    }

    async function handleRegister() {
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const FName = document.querySelector('.FName').value.toUpperCase();
        const LName = document.querySelector('.LName').value.toUpperCase();
        const name = `${FName} ${LName}`;
        try {
            const newUser = await signUp(email, password);
            await updateUserProfile({
              displayName: name
            });
            await saveUserDataToDB(newUser.uid, {
              name,
              email
            });
          } catch (error) {
            console.error("Error creating account:", error);
          }
        setAppSection("LOGIN");  // Push user back to re-authenticate
    }

    async function goToLogin() {
        setAppSection("LOGIN");
    }

    return (
        (isActive) ? (
            <div className="RegisterSection">
                <header> 
                <figure className='logo'>
                    <img src={mascot} alt='Logo Image'></img>
                    <figcaption className="logo-name">
                        User Signup
                    </figcaption>
                </figure>
            </header>   

            <section className='form-section'>
                <div className="register-container">
                     <input type="text" className='FName' placeholder="First Name"></input>
                        <input type="text" className='LName' placeholder="Last Name"></input>
                        <input type="text" className='email' placeholder="Email"></input>
                        <div className='password-input-container'>                            
                            <img 
                                className='show-pass-btn btn' 
                                src={ isVisible ? hidePassIcon : showPassIcon }
                                onClick={ togglePasswordVisibility }
                            />
                            <input 
                                type= { isVisible? "text": "password"} 
                                placeholder="Password"

                            />        
                        </div>                        
                        <button className="register-button" onClick={() => handleRegister()}>Register</button>
                </div>
            </section>

            <section className='register-description-section'>
                Already have an account? <br></br><span className='to-register-ref' onClick={ () => setAppSection("LOGIN") }>Login to your account</span> 
            </section>

            {/* NAV BAR */}
            <footer>
                <nav>
                    <ul>
                        <li className='navigation btn' onClick={ () => setAppSection("HOME") }>
                            <img className='icon' src={homeIcon}></img>
                            <p className='label'>Service</p>    
                        </li>
                        <li className='navigation btn'>
                            <img className='icon' src={mapIcon} onClick={ () => setAppSection("MAP") }></img>
                            <p className='label'>Map</p>    
                        </li>
                        <li className='navigation active btn' onClick={ () => setAppSection("ACCOUNT") }>
                            <img className='icon' src={accountIcon}></img>
                            <p className='label'>Account</p>    
                        </li>
                    </ul>
                </nav>
            </footer>
        </div>
        ) : <></>
    );
}

export default RegisterSection;