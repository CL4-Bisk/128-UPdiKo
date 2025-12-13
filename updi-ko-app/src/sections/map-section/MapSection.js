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

import campusServicesData from './../../json/campus-facilities.json';
import communityServicesData from './../../json/miagao-facilities.json';
import { useRef } from 'react';

import React from "react";
import MapView from "./MapView";

function MapSection({isActive, setAppSection, service, setAppService}) {   
    // Hooks for search bar and search bar operations.
    // const searchMenuRef = useRef(null);
    // const searchBarContainerRef = useRef(null);
    // const backButtonRef = useRef(null);
    // const clearButtonRef = useRef(null);

    // function openSearchMenu() {
    //     const searchMenu = searchMenuRef.current;
    //     searchMenu.classList.remove("hidden");
        
    //     const searchBarContainer = searchBarContainerRef.current;
    //     const backButton = backButtonRef.current;
    //     const searchBar = searchBarContainer.querySelector(".search-bar");
    //     const clearButton = clearButtonRef.current;
        
    //     backButton.classList.remove("hidden");
    //     clearButton.classList.remove("hidden");
    //     searchBar.style.backgroundColor = "#DDDDDD";        
    //     searchBar.style.backgroundImage = "none";        
    // }

    // function closeSearchMenu() {
    //     const searchMenu = searchMenuRef.current;
    //     searchMenu.classList.add("hidden");
        
    //     const searchBarContainer = searchBarContainerRef.current;
    //     const backButton = backButtonRef.current;
    //     const searchBar = searchBarContainer.querySelector(".search-bar");
    //     const clearButton = clearButtonRef.current;
        
    //     backButton.classList.add("hidden");
    //     clearButton.classList.add("hidden");
    //     searchBar.value = "";
    //     searchBar.style.backgroundColor = "white";        
    //     searchBar.style.backgroundImage = "url(" + searchIcon + ")";        
    // }

    // function clearSearchBar() {
    //     const searchBarContainer = searchBarContainerRef.current;
    //     const searchBar = searchBarContainer.querySelector(".search-bar");
        
    //     searchBar.value = "";
    // }

    const services = [...campusServicesData, ...communityServicesData]

    // sample location
    const userLocation = { lat: 10.641944, lng: 122.235556 };

    return (
        (isActive) ? (
            <div className="MapSection">
                <header>
                    <img src={searchIcon} className="icon"></img>
                    <input className='search-bar' placeholder='Search for Services'></input>    
                </header>

                <section className='search-list-section'>
                    <input className='search-bar' placeholder='Search for Services'></input>    
                    
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
                            <li className='navigation btn' onClick={ () => setAppSection("LOGIN") }>
                                <img className='icon' src={accountIcon}></img>
                                <p className='label'>Account</p>    
                            </li>
                        </ul>
                    </nav>
                </footer>

                {/* <header>
                    <div className="search-bar-container" ref={searchBarContainerRef}>
                        <figure className='close-search-menu-btn hidden' ref={backButtonRef} onClick={closeSearchMenu}><img src={backIcon}></img></figure>
                        <input className="search-bar" type="text" placeholder="Search" onFocus={openSearchMenu}></input>
                        <figure className='clear-input-btn hidden' ref={clearButtonRef} onClick={clearSearchBar}><img src={closeIcon}></img></figure>
                    </div>

                    <div className="filters-container">
                        <select 
                            className="filters" 
                            value={service}
                            onChange={(e) => setAppService(e.target.value)}
                        >
                            <option value="All">All</option>
                            {
                                services.map((service) => (
                                    service.tags.map((tag, index) => (
                                        <option key={index} value={tag}>{tag}</option>
                                    ))
                                ))
                            }
                        </select>
                    </div>
                </header>
                 */}
                {/* This is where the locations are displayed or stored. This is not finished.
                    The same thing from the Hackathon will be done here. Dynamic display of locations on search.

                    Si Clyde kabalo sini, pero React garing ni bro T_T
                */}
                {/* <div className="search-menu-container hidden" ref={searchMenuRef}>
                    <div className='default-menu'>
                        <p className='subtitle'>Recent</p>
                        <div className='location'>
                            <figure>
                                <img src={recentIcon}></img>
                            </figure>
                            <div className='location-content'>
                                <p className='location-name'>Location 1</p>
                                <p className='location-details'>Miagao, Iloilo</p>
                            </div>
                        </div>
                        <div className='location'>
                            <figure>
                                <img src={recentIcon}></img>
                            </figure>
                            <div className='location-content'>
                                <p className='location-name'>Location 2</p>
                                <p className='location-details'>Morshu, Negros Occidental</p>
                            </div>
                        </div>
                        <div className='location'>
                            <figure>
                                <img src={recentIcon}></img>
                            </figure>
                            <div className='location-content'>
                                <p className='location-name'>Location 3</p>
                                <p className='location-details'>Pototan, Iloilo</p>
                            </div>
                        </div>
                        <div className='location'>
                            <figure>
                                <img src={recentIcon}></img>
                            </figure>
                            <div className='location-content'>
                                <p className='location-name'>Location 4</p>
                                <p className='location-details'>Malay, Aklan</p>
                            </div>
                        </div>
                        <div className='location'>
                            <figure>
                                <img src={recentIcon}></img>
                            </figure>
                            <div className='location-content'>
                                <p className='location-name'>Location 5</p>
                                <p className='location-details'>Manila</p>
                            </div>
                        </div>
                    </div>
                </div>
     */}
                {/* For people making the map, this is where the map interface will be put.
                    Placeholder lang gid ni ang map nga picture. Remove lang, 
                    
                    Also, if you want to change style of the this, look sa MapSection.css :>
                    Also, check the next comment for the controls for the map.
               */}
                {/* <section className="map">
                    <div style={{ width: "100%", height: "93%" }}>
                        <MapView userLocation={userLocation} selectedService={service}/>
                    </div>
                </section>

                { /* For now, the current-location-btn is here to readjust the map to the current user. */ }                    
                {/* <section className="controls">
                    <button className="current-location-btn">
                        <img className="current-location-img" src={compassIcon}></img>
                    </button>    
                </section>
                
                { /* Nav bar */} 
                {/* <footer>
                    <nav className="nav-bar">
                        <div className="navigations" onClick={() => { setAppSection("HOME") ; setAppService("All")}}>
                            <img src={homeIcon}></img>
                            <p>Home</p>
                        </div>
                        <div className="navigations active-section" onClick={() => setAppSection("MAP") }>
                            <img src={mapIcon}></img>
                            <p>Map</p>
                        </div>        
                        <div className="navigations" onClick={() => setAppSection("ACCOUNT")}>
                            <img src={accountIcon}></img>
                            <p>Account</p>
                        </div>
                        <div className="navigations">
                            <img src={menuIcon}></img>
                            <p>Menu</p>
                        </div>
                    </nav>
                </footer>             */}
            </div>
        ) 
        : ( <></> )
        
    );
}

export default MapSection;