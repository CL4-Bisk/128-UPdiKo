import './MapSection.css'

import searchIcon from './../../images/icon/search-icon.png'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png';
import compassIcon from './../../images/icon/compass-icon.png';
import backIcon from './../../images/icon/back-icon.png';
import saveIcon from './../../images/icon/save-icon.png';
import closeIcon from './../../images/icon/close-icon.png';
import timeIcon from './../../images/icon/time-icon.png';
import placeholder from './../../images/bg/placeholder.png';


import campusServicesData from './../../json/campus-facilities.json';
import communityServicesData from './../../json/miagao-facilities.json';
import { act, useState, useEffect } from 'react';

import { getCurrentUser, addPinnedLocationToDB } from '../../firebase/firebase.js';

import React from "react";
import MapView from "./MapView";

function MapSection({isActive, setAppSection, service, setAppService}) {   

    /* Create Pin Location Logic */
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


    /* Search Location Logic */
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


    /* Map Information Logic */
    const [openMapInfo, setOpenMapInfo] = useState(false);
    const [mapInfoTab, setMapInfoTab] = useState("about");



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
                        <div className= "map-pin-info-container">
                            <div className='pin-info-header'>
                                <div className='pin-header-container'>
                                    <h1 className='name'>Name</h1>
                                    <h2 className='tags'>Tags</h2>
                                </div>
                                <div className='pin-buttons-container'>
                                    <figure className='save-img btn'><img src={saveIcon}></img></figure>
                                    <figure className='close-info btn'><img src={closeIcon}></img></figure>
                                </div>
                            </div>
                            <div className='pin-info-nav'>
                                <div className= {(mapInfoTab == "about") ?  'info-tab btn active': 'info-tab btn'} onClick={() => setMapInfoTab("about")}> About </div>
                                <div className={(mapInfoTab == "photo") ?  'photo-tab btn active': 'photo-tab btn'} onClick={() => setMapInfoTab("photo")}> Photos </div>
                            </div>
                            <div className={(mapInfoTab == "about") ? "pin-info-body": "pin-info-body hidden"}>
                                <div className='pin-important-info'>
                                    <figure>
                                        <img src={mapIcon}></img>
                                        <figcaption>Located at </figcaption>
                                    </figure>
                                    <figure>
                                        <img src={timeIcon}></img>
                                        <figcaption>Opens at</figcaption>
                                    </figure>
                                </div>
                                <div className='pin-other-info'>    
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vestibulum quam tellus, euismod laoreet velit varius sit amet. Nullam rutrum ante non mauris ultricies, vitae tempus diam ornare. Nullam egestas placerat orci pretium fermentum. Duis fermentum tortor nec tristique congue. Fusce commodo maximus lobortis.
                                </div>
                            </div>
                            <div className= {(mapInfoTab == "photo") ? "pin-photo-body": "pin-photo-body hidden"}>
                                <figure>
                                    <img src={placeholder}></img>
                                </figure>
                                <figure>
                                    <img src={placeholder}></img>
                                </figure>
                            </div>

                        </div>
                    </div>
                </section>


                {/* {showCreatePin && (
                    <div className="create-pin-sheet">
                        

                        <div className="sheet-header">
                            <h2>Create Pin</h2>
                            <span className="close-btn" onClick={() => setShowCreatePin(false)}>
                            ✕
                            </span>
                        </div>

                        <hr></hr>
                        
                        <div className="sheet-inputs">
                            
                            <div className="pin-info-form">
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
                            </div>

                            <div className="coordinates-inputs">
                                <input
                                    className="info-input"
                                    placeholder="Latitude"
                                    value={pinLatitude || ""}
                                    onChange={(e) => setPinLatitude(parseFloat(e.target.value))}
                                />
                                <input
                                    className="info-input"
                                    placeholder="Longitude"
                                    value={pinLongitude || ""}
                                    onChange={(e) => setPinLongitude(parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="description-input">
                                <textarea
                                    className="info-input"
                                    placeholder="Description"
                                    value={pinDescription}
                                    onChange={(e) => setPinDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <span className="confirm-pin-btn" onClick={() => handleAddPinnedLocation()}>
                            →
                        </span>
                    </div>
                )}

             */}

                <section className="controls">
                    <button className="current-location-btn">
                        <img className="current-location-img" src={compassIcon}></img>
                    </button>    
                    <br></br>
                    <button className="current-location-btn" onClick={handleOpenCreatePin}>
                        <img className="current-location-img" src={mapIcon}></img>
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