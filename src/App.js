import React, { Component } from 'react';
import './App.css';

const breweries = [
  {
    name: "Burial Beer Co.",
    location: {lat: 35.588252, lng: -82.553736},
    local: true,
    food: true
  },
  {
    name: "Sierra Nevada Brewing Co.",
    location: {lat: 35.430819, lng: -82.553687},
    local: false,
    food: true
  },
]

class App extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadGoogleMapsScript();
    // set the window's initMap property to App's initmap for GoogleMaps URL to function
    window.initMap = this.initMap;
  }

  initMap = () => {
    const avlCenter = {lat: 35.517908, lng: -82.553479};
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: avlCenter,
      zoom: 13
    });
    const markers = [];
    for (let i = 0; i < breweries.length; i++) {
      let marker = new window.google.maps.Marker({
        position: breweries[i].location,
        title: breweries[i].title,
        animation: window.google.maps.Animation.DROP,
      });
      markers.push(marker);
    }
    const bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

function loadGoogleMapsScript(url) {
  // find the first script element in the DOM
  const domScript = window.document.getElementsByTagName("script")[0];
  // make a new script element for the Google Maps API URL
  const googleMapsScript = window.document.createElement("script");
  googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDc-xve6rATSllKLGksP6Mu401efM5QzVY&v=3&callback=initMap";
  googleMapsScript.async = true;
  googleMapsScript.defer = true;
  // insert the Google Maps script into the DOM
  domScript.parentNode.insertBefore(googleMapsScript, domScript);
}

export default App;
