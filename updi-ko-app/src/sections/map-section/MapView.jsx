import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapView.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { onAuthStateChangedListener, getPinnedLocationsFromDB } from "../../firebase/firebase.js";

let currentUser = null;
let userPinnedLocations = [];

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
  useEffect(() => {
    if (center) map.setView(center);
  }, [center, map]);
  return null;
}

onAuthStateChangedListener(async (user) => {
  currentUser = user;
  if (user) {
    const pinnedLocations = await getPinnedLocationsFromDB(user.uid);

    pinnedLocations.forEach((location) => {
      userPinnedLocations.push([location.name, location.latitude, location.longitude]);
    });

    console.log(pinnedLocations);
  }
});

// main map element
const MapView = ({ userLocation }) => {
  const defaultCenter = [10.641944, 122.235556];
  const [center, setCenter] = useState(defaultCenter);
  const [loading, setLoading] = useState(true);
  const [pinnedLocations, setPinnedLocations] = useState([]); // NEW

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
        setPinnedLocations(pins);
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

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={15} style={{ width: "100%", height: "100%" }} zoomControl={false}>
        <ChangeView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>You are here</Popup>
        </Marker>
        {pinnedLocations.map((pin) => (
          <Marker key={pin.id} position={[pin.latitude, pin.longitude]}>
            <Popup>{pin.locationName}</Popup>
          </Marker>
        ))}
        <Marker position={[10.640435, 122.231978]}>
          <Popup>AK Sisig House Box</Popup>
        </Marker>
        <Marker position={[10.641780, 122.234923]}>
          <Popup>Printlab by Stanphil</Popup>
        </Marker>
        <Marker position={[10.642304, 122.234654]}>
          <Popup>Flippers E-Sports Cafe</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
