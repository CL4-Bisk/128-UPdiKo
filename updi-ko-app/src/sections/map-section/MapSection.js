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
import { act, useState, useEffect } from 'react';

import { getCurrentUser, addPinnedLocationToDB } from '../../firebase/firebase.js';

import React from "react";
import MapView from "./MapView";

function MapSection({isActive, setAppSection, service, setAppService}) {   

    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearch, setSearchActive] = useState(false);

    const [showCreatePin, setShowCreatePin] = useState(false);
    const [pinName, setPinName] = useState("");
    const [pinAddress, setPinAddress] = useState("");
    const [pinDescription, setPinDescription] = useState("");
    const [pinLatitude, setPinLatitude] = useState(null);
    const [pinLongitude, setPinLongitude] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 10.641944, lng: 122.235556 });

    const handleOpenCreatePin = () => {
        if (!getCurrentUser()) {
        alert("Please log in to add pins.");
        return;
        }
        setShowCreatePin(true);
    };

    const handleAddPinnedLocation = async () => {
        const user = getCurrentUser();
        if (!user) return;

        try {
            await addPinnedLocationToDB(
                user.uid,
                pinName || "Untitled Pin",
                pinAddress || "N/A",
                Number(pinLatitude),
                Number(pinLongitude),
                pinDescription
            );


            // Reset
            setShowCreatePin(false);
            setPinName("");
            setPinAddress("");
            setPinDescription("");

            alert("Pin created!");
        } catch (err) {
            alert(err.message);
        }
    };

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
                        <MapView userLocation={userLocation} selectedService={service} onCenterChange={(lat, lng) => setMapCenter({ lat, lng })}/>
                    </div>
                </section>

                <section className="controls">
                    <button className="current-location-btn">
                        <img className="current-location-img" src={compassIcon}></img>
                    </button>    
                    <br></br>
                    <button className="current-location-btn" onClick={handleOpenCreatePin}>
                        <img className="current-location-img" src={mapIcon}></img>
                    </button>
                </section>

                {showCreatePin && (
                    <div className="create-pin-sheet">
                    <div className="sheet-handle" />

                    <div className="sheet-header">
                        <h2>Create Pin</h2>
                        <button className="close-btn" onClick={() => setShowCreatePin(false)}>
                        ✕
                        </button>
                    </div>

                    <input
                        className="info-input"
                        placeholder="Name"
                        value={pinName}
                        onChange={(e) => setPinName(e.target.value)}
                    />

                    <input
                        className="info-input"
                        placeholder="Address"
                        value={pinAddress}
                        onChange={(e) => setPinAddress(e.target.value)}
                    />

                    <div className="info-input">
                        <input
                            placeholder="Latitude"
                            value={pinLatitude || ""}
                            onChange={(e) => setPinLatitude(parseFloat(e.target.value))}
                        />
                        <input
                            placeholder="Longitude"
                            value={pinLongitude || ""}
                            onChange={(e) => setPinLongitude(parseFloat(e.target.value))}
                        />
                    </div>

                    <textarea
                        className="info-input"
                        placeholder="Description"
                        value={pinDescription}
                        onChange={(e) => setPinDescription(e.target.value)}
                    />

                    <button className="confirm-pin-btn" onClick={() => handleAddPinnedLocation()}>
                        →
                    </button>
                    </div>
                )}

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