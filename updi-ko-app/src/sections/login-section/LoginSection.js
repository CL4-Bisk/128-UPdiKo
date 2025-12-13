import './LoginSection.css';

import mascot from './../../images/logo/barney.jpg'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'
import showPassIcon from './../../images/icon/view-pass-icon.png'
import hidePassIcon from './../../images/icon/hide-pass-icon.png'

import { useState } from "react" 
import { logIn } from "../../firebase/firebase.js"; 

function LoginSection({ isActive, setAppSection }) {
    const [isVisible, setVisible] = useState(false);

    function togglePasswordVisibility() {    
        setVisible(!isVisible);
    }

    async function handleLogin() {
        const email = document.querySelector('.email').value.trim();
        const password = document.querySelector('.password').value.trim();
        try {
            await logIn(email, password);
            setAppSection("HOME");  // Push user back home
        } catch (e) {
            return;   
        }   
    }

    return (
        (isActive) ? (
            <div className="LoginSection">

                 <header> 
                    <figure className='logo'>
                        <img src={mascot} alt='Logo Image'></img>
                        <figcaption className="logo-name">
                            User Login
                        </figcaption>
                        <figcaption className='subheading'>
                            Login to save your favorite spots, create custom pins, and access student features!
                        </figcaption>
                    </figure>
                </header>   

                <section className='form-section'>
                    <div className="login-container">
                        <input type="text" placeholder="Email" className='email'></input>
                        <div className='password-input-container'>                            
                            <img 
                                className='show-pass-btn btn' 
                                src={ isVisible ? hidePassIcon : showPassIcon }
                                onClick={ togglePasswordVisibility }
                            />
                            <input 
                                type= { isVisible? "text": "password"} 
                                placeholder="Password"
                                className='password'
                            />
                                
                        </div>
                        <button className="login-button" onClick={() => handleLogin()}>Login</button>
                    </div>
                </section>

                <section className='register-description-section'>
                    Do not have an account, yet? <br></br><span className='to-register-ref' onClick={ () => setAppSection("REGISTER") }>Create new account</span> 
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
                                <img className='icon' src={mapIcon}  onClick={ () => setAppSection("MAP") }></img>
                                <p className='label'>Map</p>    
                            </li>
                            <li className='navigation btn active' onClick={ () => setAppSection("LOGIN") }>
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

export default LoginSection;