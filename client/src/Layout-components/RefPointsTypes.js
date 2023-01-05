import { Marker, Popup } from "react-leaflet";
import * as L from "leaflet";

function MarkerColor(rpType) {
  let iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/";
  if (rpType === "parking") {
    iconUrl += "marker-icon-2x-green.png";
  } else if (rpType === "hut") {
    iconUrl += "marker-icon-2x-yellow.png";
  } else if (rpType === "peak") {
    iconUrl += "marker-icon-2x-red.png";
  } else {
    iconUrl += "marker-icon-2x-blue.png";

  }
  let icon = new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return icon;
}

export function StartPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        This is the starting point
      </Popup>
    </Marker>
  );
}

export function EndPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        This is the ending point
      </Popup>
    </Marker>
  );
}

export function RefPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        This is a reference point
      </Popup>
    </Marker>
  );
}

export function MyStartPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        {props.text}
      </Popup>
    </Marker>
  );
}

export function MyEndPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        {props.onClick}
      </Popup>
    </Marker>
  );
}

export function MyRefPoint(props) {
  const icon = MarkerColor(props.type);
  return (

    <Marker position={props.position} icon={icon} >
      <Popup>
        This is a reference point
      </Popup>
      
    </Marker>
  );
}