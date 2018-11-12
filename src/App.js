import React, { Component } from 'react';
import './App.css';

let map;
const breweries = [
  {
    name: "Burial Beer Co.",
    location: {lat: 35.588252, lng: -82.553736},
    local: true, food: true
  },
  {
    name: "Sierra Nevada Brewing Co.",
    location: {lat: 35.430819, lng: -82.553687},
    local: false, food: true
  },
  {
    name: "Thirsty Monk",
    location: {lat: 35.486380, lng: -82.555217},
    local: false, food: true
  },
  {
    name: "Highland Brewing Company",
    location: {lat: 35.570867, lng: -82.497882},
    local: true, food: false
  },
  {
    name: "New Belgium Brewing Company",
    location: {lat: 35.586751, lng: -82.570580},
    local: false, food: false
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
    const googleMaps = window.google.maps;
    const avlCenter = {lat: 35.517908, lng: -82.553479};

    map = new googleMaps.Map(document.getElementById('map'), {
      center: avlCenter,
      zoom: 13
    });

    const markers = [];
    const beer = {
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/155/beer-mug_1f37a.png',
      scaledSize: new googleMaps.Size(50, 50)
    }
    const toast = {
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/155/clinking-beer-mugs_1f37b.png',
      scaledSize: new googleMaps.Size(50, 50)
    }
    const infoWindow = new googleMaps.InfoWindow();
    for (let i = 0; i < breweries.length; i++) {
      let marker = new googleMaps.Marker({
        position: breweries[i].location,
        title: breweries[i].name,
        animation: googleMaps.Animation.DROP,
        icon: beer
      });
      marker.addListener('click', function() {
        marker.setIcon(toast);
        marker.setAnimation(googleMaps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setIcon(beer);
          marker.setAnimation(null);
        }, 2000);
        populateInfoWindow(this, infoWindow)
      })
      markers.push(marker);
    }
    const bounds = new googleMaps.LatLngBounds();
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

function populateInfoWindow(marker, infoWindow) {
  // if infoWindow for marker not already open, open infoWindow
  if (infoWindow.marker !== marker) {
    infoWindow.marker = marker;
    infoWindow.setContent(`<div>${marker.title}</div>`);
    infoWindow.open(map, marker);
    infoWindow.addListener('closeclick', function() {
      infoWindow.setMarker = null;
    });
  }
}

export default App;
