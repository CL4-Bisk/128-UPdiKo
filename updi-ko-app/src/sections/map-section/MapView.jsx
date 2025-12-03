import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapView.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// fixes icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// // responds to location change
// function ChangeView({ center }) {
//   const map = useMap();
//   useEffect(() => {
//     if (center) map.setView(center);
//   }, [center, map]);
//   return null;
// }

// // main map element
// const MapView = ({ userLocation }) => {
//   const defaultCenter = [10.641944, 122.235556];
//   const [center, setCenter] = useState(defaultCenter);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userLocation) {
//       setCenter([userLocation.lat, userLocation.lng]);
//     }
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, [userLocation]);

//   if (loading) {
//     return (
//       <div className="map-loading">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={15} style={{ width: "100%", height: "100%" }} zoomControl={false}>
//         <ChangeView center={center} />
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={center}>
//           <Popup>You are here</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;


// Component that changes the map view when props update
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center]);
  return null;
}

export default function MapView({ userLocation, searchMarker }) {
  const defaultCenter = [10.7202, 122.5621]; // Iloilo City

  const center = searchMarker
    ? [searchMarker.lat, searchMarker.lng]
    : userLocation
    ? [userLocation.lat, userLocation.lng]
    : defaultCenter;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}        // removed zoom buttons
        scrollWheelZoom={true}
        touchZoom={true}
      >
        <ChangeView center={center} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* <Marker position={center}>
          <Popup>{userLocation ? "You are here" : "Default Location"}</Popup>
        </Marker> */}

        {/* User location marker */}
      {userLocation && !searchMarker && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Temporary search marker */}
      {searchMarker && (
        <Marker position={[searchMarker.lat, searchMarker.lng]}>
          <Popup>Search Result</Popup>
        </Marker>
      )}
      </MapContainer>
    </div>
  );
}