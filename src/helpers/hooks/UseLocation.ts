import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

const UseLocation = () => {
  const [location, setLocation] = useState<Location>();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!location) {
      setIsloading(true);
      const successCallback = (position: GeolocationPosition) => {
        const {
          coords: { latitude, longitude },
        } = position;
        setLocation({
          latitude,
          longitude,
        });
        setIsloading(false);
      };
      const errorCallback = (err: GeolocationPositionError) => {
        console.log(err, err.message);
        alert("You won't be able to enjoy all features of the website");
        setIsloading(false);
      };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }, [location]);

  return { location, isLoading };
};

export default UseLocation;
