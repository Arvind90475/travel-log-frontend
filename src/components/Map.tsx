import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import "leaflet/dist/leaflet.css";
import LogEntryDescriptionCard from "./LogEntryDescriptionCard";
import { useFetchLogEntries } from "../helpers/hooks/use_fetch_log_entries";

const tileurl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// @ts-ignore
function Map({ clientLocation }) {
  const { data: logs } = useFetchLogEntries();

  return (
    <MapContainer
      style={{
        height: "100vh",
        width: "100vw",
      }}
      center={[
        clientLocation?.latitude || -27.46977,
        clientLocation?.longitude || 153.025131,
      ]}
      zoom={12}
      scrollWheelZoom={true}
      doubleClickZoom={false}
    >
      <TileLayer url={tileurl} attribution={tileAttribution} />
      {logs &&
        logs.map(
          (logEntry: {
            location: any;
            _id: string;
            image: string;
            description: string;
          }) => (
            <Marker key={logEntry._id} position={logEntry.location.coordinates}>
              <Popup>
                <LogEntryDescriptionCard
                  image={logEntry.image}
                  description={logEntry.description}
                />
              </Popup>
            </Marker>
          )
        )}
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;
