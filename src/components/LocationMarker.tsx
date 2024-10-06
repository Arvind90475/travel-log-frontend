import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { Marker, useMapEvent, Popup } from "react-leaflet";
import InputForm from "./InputForm";
import ModalComponent from "../ui/modal";

export default function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression>();
  useMapEvent("dblclick", (e) => {
    setPosition(e.latlng);
  });

  const onClose = () => {
    setPosition(undefined);
  };

  return position ? (
    <>
      <Marker position={position}></Marker>
      <Popup
        className="wide-popup"
        position={position}
        eventHandlers={{ popupclose: onClose }}
      >
        <InputForm onClose={onClose} position={position} />
      </Popup>
    </>
  ) : null;
}
