import Map from "../components/Map";
import LoadingSpinner from "../components/LoadingSpinner";
import useGeoLocation from "../helpers/hooks/use_geo_location";

const Home = () => {
  const { isLoading, location: clientLocation } = useGeoLocation();

  return (
    <div className="app">
      {!isLoading && clientLocation ? (
        <Map clientLocation={clientLocation} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Home;
