import './LoginSection.css';
import { logIn } from "../../firebase/firebase.js"; 

function LoginSection({ isActive, setAppSection }) {
    console.log("LoginSection.js");
    async function handleLogin() {
        const email = document.querySelector('input[type="text"]').value.trim();
        const password = document.querySelector('input[type="password"]').value.trim();
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

                {/* HEADER */}
                <main>
                    <figure className="mascot"></figure>
                    <div className="mascot-dialogue">
                        LOGIN
                    </div>
                </main>

                {/* ACCOUNT OPTIONS */}
                <section>
                    <div className="login-container">
                        <input type="text" placeholder="Email"></input>
                        <input type="password" placeholder="Password"></input>
                        <button className="login-button" onClick={() => handleLogin()}>Login</button>
                        <button className="register-button" onClick={() => setAppSection("REGISTER")}>Register</button>
                    </div>
                </section>

                {/* NAV BAR */}
                <footer>
                    {/* <nav className="nav-bar">
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
                    </nav> */}
                </footer>
            </div>
        ) : <></>
    );
}

export default LoginSection;