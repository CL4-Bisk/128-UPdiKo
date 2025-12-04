import './RegisterSection.css';
import { signUp, saveUserDataToDB, updateUserProfile } from "../../firebase/firebase.js"; 

function RegisterSection({ isActive, setAppSection }) {
    console.log("RegisterSection.js");
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

                {/* HEADER */}
                <main>
                    <figure className="mascot"></figure>
                    <div className="mascot-dialogue">
                        ACCOUNT SETTINGS
                    </div>
                </main>

                {/* ACCOUNT OPTIONS */}
               <section>
                    <div className="register-container">
                        <input type="text" className='FName' placeholder="First Name"></input>
                        <input type="text" className='LName' placeholder="Last Name"></input>
                        <input type="text" className='email' placeholder="Email"></input>
                        <input type="password" className='password' placeholder="Password"></input>
                        <button className="login-button" onClick={() => handleRegister()}>Register</button>
                        <section>
                            Already have an account?
                            <a className="register-button" onClick={() => goToLogin()}>Login</a>
                        </section>
                    </div>
               </section>

            
            </div>
        ) : <></>
    );
}

export default RegisterSection;