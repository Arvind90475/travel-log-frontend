import { LatLngExpression } from "leaflet";

export interface ILogEntry {
  location: {
    coordinates: [number, number];
    type: "Point";
  };
  rating: number;
  visitDate: string;
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  email: string;
  password: string;
}
