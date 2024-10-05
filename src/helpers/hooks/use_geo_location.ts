import { useQuery } from "@tanstack/react-query";

type LocationType = Pick<GeolocationCoordinates, 'latitude' | 'longitude'>
const getGeoLocation = (): Promise<LocationType> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        resolve({ latitude: coords.latitude, longitude: coords.longitude });
      }, 
      (err) => {
        reject(err);
      }
    );
  });
};

const useGeoLocation = () => {
  const { data: location, isLoading, error } = useQuery<LocationType, GeolocationPositionError>({
    queryKey: ['geoLocation'],
    queryFn: getGeoLocation,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { location, isLoading, error };
};

export default useGeoLocation;
