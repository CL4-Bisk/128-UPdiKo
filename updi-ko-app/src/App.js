import './App.css'
import { useState } from 'react';
import MapSection from './sections/map-section/MapSection'
import StartSection from './sections/start-section/StartSection';

function App() {

    /**
     * This is an example of a hook. useState() in this case stores a state.
     * 
     * section variable is the current section in the app that the user is in. 
     * Values are ("HOME", "MAP", "ACCOUNT", "MENU", "LOGIN", "REGISTER")
     * As of now, we only have two pages, and by default, it starts with HOME
     * 
     * setSection function is just what you expect. It is a setter to change the section variable.
     * 
     */  
    const [section, setSection] = useState("HOME");

    /**
     * service variable is the current service that the user inputted after pressing 
     * his/her/their desired service in the HOME page.
     *  
     * setService function is just what you expect. It is a setter to change the service variable.
     * By default, the service set is All or "all services, no filters".
     */  
    const [service, setService] = useState("All");
    
    /**
     * This is the returned JSX file. Add more JSX components for future sections.
     * 
     * You may see a new tag <StartSection/> and <MapSection/>. These are your components 
     * from the sections folder. These are basically custom HTML.
     *      
     * You may see that there are properties inside the <StartSection/> and <MapSection/>.
     * These are properties. Go to StartSection.js for the properties.
     * Mainly, these props are ways to customize these custom HTML elements or pass values
     * from parent (containing) component to child (contained) component. In this case,
     * we are seeing if it is the active section using isActive, and we are passing the setter 
     * functions from parent to child, so that the child can also use these setters.
     * 
     */
    return ( 
        <div className="App">
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
        </div>
    );
}

export default App;