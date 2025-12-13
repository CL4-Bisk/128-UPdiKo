import './App.css'
import { useState } from 'react';
import MapSection from './sections/map-section/MapSection'
import StartSection from './sections/start-section/StartSection';
import AccountSection from './sections/account-section/AccountSection';
import LoginSection from './sections/login-section/LoginSection';
import RegisterSection from './sections/register-section/RegisterSection';

function App() {
    const [section, setSection] = useState("HOME");
    const [service, setService] = useState("All"); 

    return ( 
        <div className="App">
            <div className="HomeUI">
                <StartSection 
                    isActive = { section  === "HOME"} 
                    setAppSection = {setSection}  
                    setAppService = {setService}
                />
                <MapSection 
                    isActive = { section === "MAP"} 
                    setAppSection = {setSection} 
                    service = {service}
                    setAppService = {setService}
                />
                <AccountSection 
                    isActive = { section === "ACCOUNT"} 
                    setAppSection = {setSection}
                />
            </div>
            <div className='AccountUI'>
                <LoginSection 
                    isActive = { section === "LOGIN"} 
                    setAppSection = {setSection}
                />
                <RegisterSection 
                    isActive = { section === "REGISTER"} 
                    setAppSection = {setSection}
                />
            </div>
        </div>
    );
}

export default App;