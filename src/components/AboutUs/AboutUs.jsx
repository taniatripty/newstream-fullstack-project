import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Marker icons
const mainOfficeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // red marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const districtIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // blue marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Array of district info including popup colors
const districts = [
  {
    name: "Dhaka (Main Office)",
    position: [23.8103, 90.4125],
    isMain: true,
    popupColor: "#FFCDD2", // light red
  },
  {
    name: "Chittagong",
    position: [22.3569, 91.7832],
    popupColor: "#BBDEFB", // light blue
  },
  {
    name: "Khulna",
    position: [22.8456, 89.5403],
    popupColor: "#C8E6C9", // light green
  },
  {
    name: "Rajshahi",
    position: [24.3636, 88.6241],
    popupColor: "#FFF9C4", // light yellow
  },
  {
    name: "Barisal",
    position: [22.701, 90.3535],
    popupColor: "#D1C4E9", // light purple
  },
  {
    name: "Sylhet",
    position: [24.8949, 91.8687],
    popupColor: "#FFECB3", // light amber
  },
  {
    name: "Rangpur",
    position: [25.7439, 89.2752],
    popupColor: "#B2EBF2", // light cyan
  },
  {
    name: "Mymensingh",
    position: [24.7471, 90.4203],
    popupColor: "#F8BBD0", // light pink
  },
];

export default function DistrictMap() {
  return (
    <div className="max-w-5xl mx-auto p-2">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>{" "}
        <p className="mb-4 text-gray-600">
          {" "}
          Welcome to NewsStream website! We are dedicated to providing quality
          content and services.{" "}
        </p>
        <p className="mb-8 text-gray-600">
          {" "}
          Our main office is located at: <br />
          123 Main Street, Dhaka, Bangladesh
        </p>
      </div>

      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={7}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {districts.map(({ name, position, isMain, popupColor }, idx) => (
          <Marker
            key={idx}
            position={position}
            icon={isMain ? mainOfficeIcon : districtIcon}
          >
            <Popup>
              <div
                style={{
                  backgroundColor: popupColor,
                  padding: "8px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {name}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
