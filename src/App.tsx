import "./App.css";
import UseLocation from "./helpers/hooks/UseLocation";
import Map from "./components/Map";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isLoading, location: clientLocation } = UseLocation();
  return (
    <div className="app">
      {!isLoading && clientLocation ? (
        <Map clientLocation={clientLocation} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default App;
