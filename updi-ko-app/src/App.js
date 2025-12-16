import { useState } from 'react';
import MapSection from './sections/map-section/MapSection'
import StartSection from './sections/start-section/StartSection';
import AccountSection from './sections/account-section/AccountSection';
import LoginSection from './sections/login-section/LoginSection';
import RegisterSection from './sections/register-section/RegisterSection';
import AccountInfoSection from './sections/account-info-section/AccountInfoSection';
import AccountUpdateSection from './sections/account-update-section/AccountUpdateSection';
import PersonalPinSection from './sections/personal-pin-section/PersonalPinSection';

function App() {
    /** 
     *  This hook is a global state that keeps track of the current page the user is in.  
     *  The pages are: HOME, MAP, ACCOUNT, LOGIN, & REGISTER  
     */
    const [section, setSection] = useState("HOME");
    
    /** 
     *  This hook is a global state that keeps track of the previous page that user was in.  
     */
    const [redirect, setRedirectBody] = useState(null);
    

    /**
     * This hook is a global state that keeps track of the current service the user chose/searched 
     * from HOME or MAP
     * 
     * The service state will be kept until the user exits MAP.  
     * The service will be displayed in MAP.
     */
    const [service, setService] = useState(null); 

    /**
     * These are the routes or logic for the currently renderd page.
     */
    switch (section) {
    case "HOME":
        return <StartSection setAppSection={setSection} setAppService={setService} />;
    case "MAP":
        return <MapSection setAppSection={setSection} service={service} setAppService={setService} />;
    case "ACCOUNT":
        return <AccountSection setAppSection={setSection} redirect={redirect} setAppRedirectBody={setRedirectBody}/>;
    case "ACCOUNT-UPDATE": 
        return <AccountUpdateSection setAppSection={setSection} redirect={redirect} setAppRedirectBody={setRedirectBody}/>;
    case "LOGIN":
        return <LoginSection setAppSection={setSection} />;
    case "REGISTER":
        return <RegisterSection setAppSection={setSection} />;
    case "PERSONAL-PIN":
        return <PersonalPinSection setAppSection={setSection} />;
    default:
        return <StartSection setAppSection={setSection} setAppService={setService} />; // Fallback
    }
}

export default App;