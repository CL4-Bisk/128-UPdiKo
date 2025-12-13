import './MapSection.css'

// import mapImg from './../../images/icons/map-template-example.png'
// import homeIcon from './../../images/icons/home-icon.png'
// import mapIcon from './../../images/icons/pin-solid-icon.png'
// import accountIcon from './../../images/icons/account-icon.png'
// import menuIcon from './../../images/icons/menu-icon.png'
// import recentIcon from './../../images/icons/recent-icon.png'
// import closeIcon from './../../images/icons/close-icon.png'
// import backIcon from './../../images/icons/back-icon.png'
import searchIcon from './../../images/icon/search-icon.png'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png';
import compassIcon from './../../images/icon/compass-icon.png';
import backIcon from './../../images/icon/back-icon.png';


import campusServicesData from './../../json/campus-facilities.json';
import communityServicesData from './../../json/miagao-facilities.json';
import { act, useState } from 'react';

import { getCurrentUser } from '../../firebase/firebase.js';

import React from "react";
import MapView from "./MapView";

function MapSection({isActive, setAppSection, service, setAppService}) {   

    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearch, setSearchActive] = useState(false);
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase().trim()); 
    }

    const services = [...campusServicesData, ...communityServicesData]
    const filteredServices = services.filter(service => {
        const nameLower = service.name.toLowerCase();    
        const matchesSearch = nameLower.includes(searchQuery);
        return matchesSearch ;
    });

    // sample location
    const userLocation = { lat: 10.641944, lng: 122.235556 };

    return (
        (isActive) ? (
            <div className="MapSection">
                <header className = {(activeSearch) ? "active-search-layout" : "inactive-search-layout"}>
                    { (activeSearch) ? <img src={backIcon} onClick={() => setSearchActive(false)} className="close-search-btn btn"></img> : null }
                    <section className='search-container'>
                        <img src={searchIcon} className="icon"></img>
                        <input  
                            className='search-bar' 
                            placeholder='Search for Services'
                            onChange={handleSearchChange}
                            onFocus={() => setSearchActive(true)}
                        />
                    </section>  
                </header>

                <section className= { (activeSearch) ? 'search-list-section' : 'search-list-section hidden' }>
                    <section className='service-list'>
                    {
                        filteredServices.map((service, index) => (
                            <div key={index} className='service-btn btn' >
                                <img src={mapIcon}></img>
                                <div>
                                    <h2 className='title'>{service.name}</h2>
                                    <h3 className='tag'>{service.tags}</h3>
                                </div>
                            </div>
                        ))
                    }
                    </section>
                </section>

                <section className="map">
                    <div className = "map-container">
                        <MapView userLocation={userLocation} selectedService={service}/>
                    </div>
                </section>

                <section className="controls">
                    <button className="current-location-btn">
                        <img className="current-location-img" src={compassIcon}></img>
                    </button>    
                </section>

                <footer>
                    <nav>
                        <ul>
                            <li className='navigation btn' onClick={ () => setAppSection("HOME") }>
                                <img className='icon' src={homeIcon}></img>
                                <p className='label'>Service</p>    
                            </li>
                            <li className='navigation active btn' onClick={ () => setAppSection("MAP") }>
                                <img className='icon' src={mapIcon}></img>
                                <p className='label'>Map</p>    
                            </li>
                            <li className='navigation btn' onClick={ () => getCurrentUser() ? setAppSection("ACCOUNT") : setAppSection("LOGIN") }>
                                <img className='icon' src={accountIcon}></img>
                                <p className='label'>Account</p>    
                            </li>
                        </ul>
                    </nav>
                </footer>
            </div>
        ) 
        : ( <></> )
        
    );
}

export default MapSection;