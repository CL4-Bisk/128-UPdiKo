import './PersonalPinSection.css'

import mascot from './../../images/logo/barney.jpg'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'
import bookmarkIcon from './../../images/icon/saved-icon.png'
import logoutIcon from './../../images/icon/logout-icon.png'
import backIcon from './../../images/icon/back-icon-2.png'

import { useState, useEffect } from 'react';

import { getCurrentUser, logOut, getPinnedLocationsFromDB } from '../../firebase/firebase.js';

function PersonalPinSection({setAppSection, setAppService}) {  
    
    const [pinnedLocations, setPinnedLocations] = useState([]);

    const user = getCurrentUser();

    async function userLogOut() {
        await logOut();
        setAppSection("LOGIN");  
    }

    useEffect(() => {
        async function fetchPinnedLocations() {
            if (!user) return;
            const locations = await getPinnedLocationsFromDB(user.uid);
            setPinnedLocations(locations);
        }
        fetchPinnedLocations();
    }, []);

    return (
        <div className="PersonalPinSection">
            <header>
                <div className='profile'>
                    <figure className='logo'><img src={mascot}></img></figure>
                    <div className='information'>
                        <div className='name'>{user.displayName}</div>
                        <div className='email'>{user.email}</div>
                    </div>
                </div>
                <div className='buttons'>
                    <figure className='logout-icon btn'><img src={logoutIcon} onClick={ userLogOut }></img></figure>
                </div>
            </header>

        <section className="section-name"> 
           <hgroup>
                <h1>Update Account</h1>
            </hgroup>
            <figure className="back-button btn" onClick={ () => setAppSection("ACCOUNT")} >
              <img src={backIcon}></img>  
            </figure>        
        </section> 

            <section className='personal-pins'>
                {pinnedLocations.length === 0 ? (
                    <p>You have no personal pins yet.</p>
                ) : (
                    <div className='pinned-locations'>
                        {pinnedLocations.map((index, location) => (
                            <div className='pinned-location-card' key={index}>
                                <h3 className='location-name'>{location.locationName}</h3>
                                <p className='location-coordinates'>Lat: {location.latitude}, Lng: {location.longitude}</p>
                                <p className='location-description'>{location.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
                    
            <footer>
                <nav>
                    <ul>
                        <li className='navigation btn' onClick={ () => { setAppSection("HOME") } }>
                            <img className='icon' src={homeIcon}></img>
                            <p className='label'>Service</p>    
                        </li>
                        <li className='navigation btn' onClick={ () => setAppSection("MAP") }>
                            <img className='icon' src={mapIcon}></img>
                            <p className='label'>Map</p>    
                        </li>
                        <li className='navigation active btn' onClick={ () => getCurrentUser() ? (setAppSection("ACCOUNT"), setAppService(null)) : (setAppSection("LOGIN"), setAppService(null))}>
                            <img className='icon' src={accountIcon}></img>
                            <p className='label'>Account</p>    
                        </li>
                    </ul>
                </nav>
            </footer>
        </div>        
    );
}

export default PersonalPinSection;