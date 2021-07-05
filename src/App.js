import './App.css';
import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as projectsData from './descriptions';
import mapStyle from './mapStyle';
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';



function Map(props){

  const {
    selectedArtist,
    setSelectedArtist,
  } = props;

  return(
    <>
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{lat: 51.128721, lng: -3.002075}}
      options={{styles: mapStyle, fullscreenControl: false}}
    >
    {projectsData.features.map((artist) => (
      <Marker
        key={artist.properties.ARTIST_ID}
        position={{
          lat: artist.properties.geometry.coordinates[0],
          lng: artist.properties.geometry.coordinates[1]
        }}
        onClick={() => {
          setSelectedArtist(artist);
          // console.log({selectedArtist});
        }}
        icon= {{
          url: "./icons/pin.png",
          scaledSize: new window.google.maps.Size(50, 50)
        }}

      />
    ))}

      {selectedArtist && (
        <InfoWindow
          position={{
            lat: selectedArtist.properties.geometry.coordinates[0],
            lng: selectedArtist.properties.geometry.coordinates[1]
          }}
          onCloseClick={() => {
            setSelectedArtist(null);
          }}
          >

          <div class="content">
            <h2>{selectedArtist.properties.name}</h2>
            <h3>{selectedArtist.properties.location}</h3>
            <p dangerouslySetInnerHTML={{
              __html: selectedArtist.properties.description
            }}/>
            <p dangerouslySetInnerHTML={{
              __html: selectedArtist.properties.description2
            }}/>
            {selectedArtist.properties.image &&
              <img src = {`${selectedArtist.properties.image.link}`} alt="popupImg" class="popupImg"/>
            }
            <a href={`${selectedArtist.properties.link.source}`} target="_black">
              <h3>{selectedArtist.properties.click}</h3>
            </a>
            <a href={`${selectedArtist.properties.mapslocation.source}`} target="_black">
            <button>
              FIND ON GOOGLE MAPS
            </button>
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    </>
  );
}

function Sidebar(props) {
  const {setSelectedArtist,
    setSidebarOpen,
    sidebarOpen,
  } = props;
  return (

      <div className="Sidebar"
        style={
          sidebarOpen ? { width: '100%'} :
          { width: 0 }
        }
      >

          <a href="http://www.bridgwaterquaysidefestival.uk/programme-of-events/" target="_black">
            <img src = "/images/BridgwaterLogo.png" alt="logo"/>
          </a>
          <div className="SidebarIntro">
          <button className="close-button"
            onClick={() => {
              setSidebarOpen(false)
            }}
          >Close Menu</button>
          <h2>Bridgwater Quayside Festival Summer Season</h2>
          <p>Welcome to the Bridgwater Quayside Festival Summer Season 2021 June to August.</p>
          </div>
          <ul className="SidebarList">
          {projectsData.features.map((artist, key) => {
              return (
                  <li
                  key={artist.properties.ARTIST_ID}
                  className="row"
                  id={window.location.pathname === artist.properties.ARTIST_ID ? "active" : ""}
                  onClick={()=> {
       
                      setSelectedArtist(artist);
                      let width = window.innerWidth
                      || document.documentElement.clientWidth
                      || document.body.clientWidth;

                      if (width < 760) {
                        setSidebarOpen(false);
                      }

                  }}
                  >
                  {" "}
                  <div id="icon">{<LocationOnSharpIcon/>}</div>{" "}
                  <div id="name">
                      {artist.properties.name}
                  </div>
                  </li>
              )
          })}
          </ul>
      </div>
  )
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <div className="main-wrapper">
      <WrappedMap
        setSelectedArtist={setSelectedArtist}
        selectedArtist={selectedArtist}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB53ksL_sKlL9wcJvBPH4i2-_4U_DY1X4M`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div className="map-wrapper" style={{ height: `100%` }} />}
      />

      <div>
        <Sidebar setSelectedArtist={setSelectedArtist} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {!sidebarOpen
        &&
        <button className="open-map-button" onClick={() => setSidebarOpen(true)}>Open Menu</button>
      }
    </div>

  );

}
