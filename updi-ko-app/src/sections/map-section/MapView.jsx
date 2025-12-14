import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
import "./MapView.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import closeIcon from './../../images/icon/close-icon.png';
import timeIcon from './../../images/icon/time-icon.png';
import { onAuthStateChangedListener, getPinnedLocationsFromDB } from "../../firebase/firebase.js";
import Miagao from "../../json/miagao-facilities.json"
import Campus from "../../json/campus-facilities.json"

// fixes icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// responds to location change
function ChangeView({ center }) {
  const map = useMap();
  const prevCenter = useRef(center);
  
  useEffect(() => {
    // Only update if center coordinates actually changed
    if (center && (prevCenter.current[0] !== center[0] || prevCenter.current[1] !== center[1])) {
      map.setView(center);
      prevCenter.current = center;
    }
  }, [center, map]);

  return null;
}

// // main map element
function MapView({ userLocation, selectedService }) {
  const defaultCenter = [10.641944, 122.235556];
  const [center, setCenter] = useState(defaultCenter);
  const [loading, setLoading] = useState(true);
  const [pinnedLocations, setPinnedLocations] = useState([]); // NEW
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); // NEW state
  const [selectedPanelTab, setSelectedPanelTab] = useState("About"); // NEW state

  useEffect(() => {
    if (userLocation) {
      setCenter([userLocation.lat, userLocation.lng]);
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [userLocation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const pins = await getPinnedLocationsFromDB(user.uid);
        setPinnedLocations(
          pins.map((pin) => ({
            id: pin.id,
            name: pin.locationName,
            latitude: pin.latitude,
            longitude: pin.longitude,
            type: "Pinned",
            address: pin.address,
            description: pin.description,
            contact_info: pin.contact_info || [],
            opening_hours: pin.opening_hours || [],
          }))
        );
      } else {
        setPinnedLocations([]);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
      </div>
    );
  }
  const shouldShowMarker = (facility) => {
    if (selectedService === "All") return true;
    
    // Check if facility has a tags array and if it includes the selected service
    return facility.tags && facility.tags.includes(selectedService);
  };

  
  return (  
    <div className="MapView">
      <MapContainer center={center} zoom={15} style={{ width: "100%", height: "100%", zIndex: 0}} zoomControl={false}>
        <ChangeView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={center}>
          <Popup>You are here</Popup>
        </Marker> */}
         {pinnedLocations.map((pin) => (
          <Marker key={pin.id} position={[pin.latitude, pin.longitude]} eventHandlers={{ click: () => setSelectedMarkerInfo(pin) }}>
            <Popup>{pin.name}</Popup>
          </Marker>
        ))}
        {Miagao.filter(shouldShowMarker).map((facility) => (
          <Marker key={facility.id} position={facility.reformat_coords} eventHandlers={{ click: () => setSelectedMarkerInfo({...facility, type: "Miagao"}) }}>
            <Popup>{facility.name}</Popup>
          </Marker>
        ))}
        {Campus.filter(shouldShowMarker).map((facility) => (
          <Marker key={facility.id} position={facility.reformat_coords} eventHandlers={{ click: () => setSelectedMarkerInfo({...facility, type: "Campus"}) }}>
            <Popup>{facility.name}</Popup>
          </Marker>
        ))} 
      </MapContainer>
      {selectedMarkerInfo && (
        <div className="marker-info-panel">

          <div className="panel-handle">
          <h2>{selectedMarkerInfo.name}</h2>
          <span className="close-btn btn" onClick={() => setSelectedMarkerInfo(null)}><img src={closeIcon}></img></span>
          </div>

          <hr className="separator"></hr>

          <div className="marker-info-header">
            <span className={"header-btn btn " + ((selectedPanelTab == "About") ? "active" : " ")} onClick={() => setSelectedPanelTab("About")}>About</span>
            <span className={"header-btn btn " + ((selectedPanelTab == "Photos") ? "active" : " ")}  onClick={() => setSelectedPanelTab("Photos")}>Photos</span>
          </div>

          {selectedPanelTab === "About" && (
            <div className="marker-info-container">
              <div className="marker-description">
                <p>{selectedMarkerInfo.type}</p>
                <p>{selectedMarkerInfo.address}</p>                       
                {selectedMarkerInfo.opening_hours && selectedMarkerInfo.opening_hours.length > 0 && (
                  <div>
                    <br></br>
                    <h3>Opening Hours</h3>
                    <ul>
                      {selectedMarkerInfo.opening_hours.map((hour, index) => (
                        <li key={index}>{hour}</li>
                      ))}
                    </ul>
                  </div>
                )} 

                {selectedMarkerInfo.contact_info && selectedMarkerInfo.contact_info.length > 0 && (
                  <div>
                    <br></br>
                    <h3>Contact Information</h3>
                    <ul>
                      {selectedMarkerInfo.contact_info.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ul>
                  </div>
                )}     
              </div>
            </div>
          )}
          
          {selectedPanelTab === "Photos" && selectedMarkerInfo.images && selectedMarkerInfo.images.length > 0 && (
            <div className="image-container">
              <div className="image-gallery">
                {selectedMarkerInfo.images.map((imgUrl, index) => (
                  <img key={index} className="image" src={imgUrl} alt={`Image ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
          {selectedPanelTab === "Photos" && selectedMarkerInfo.images && selectedMarkerInfo.images.length <= 0 && (
            <div className="image-container">
              <p>No photos available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
};

export default MapView;