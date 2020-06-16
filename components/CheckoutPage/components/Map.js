import React from 'react'
import MapGL, {Marker} from 'react-map-gl'
import {MAP_BOX} from "../../../_constants";
import 'mapbox-gl/dist/mapbox-gl.css'
import {MDBBtn, MDBIcon} from "mdbreact"

class Map extends React.PureComponent {
  state = {
    viewport: {
      width: "100%",
      height: 400,
      latitude: 0.0236,
      longitude: 37.9062,
      zoom: 5
    },
    userLocation: {}
  }
  handleViewportChange = viewport => {
    this.setState({
      viewport: {...viewport, transitionDuration: 1000}
    })
  }

  handleMapCLick = ({lngLat: [longitude, latitude]}) => {
    this.setState({
      userLocation: {
        longitude,
        latitude
      }
    })
  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const newViewport = {
        ...this.state.viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      }
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      this.setState({
        viewport: newViewport,
        userLocation: userLocation
      })
    })
  }

  render() {

    return (
      <>
        <div className={"text-center"}>
          <MDBBtn outline className={"rounded-pill"} onClick={this.setUserLocation}>
            <MDBIcon icon={"location"}/>
            Get Current Location
          </MDBBtn>
        </div>
        <div>
          <MapGL
            {...this.state.viewport}
            mapboxApiAccessToken={MAP_BOX.token}
            mapStyle="mapbox://styles/mapbox/dark-v8"
            onClick={this.handleMapCLick}
            onViewportChange={this.handleViewportChange}
          >
            {this.state.userLocation.longitude ?
              <Marker {...this.state.userLocation}><MDBIcon icon="map-marker-alt" className="text-danger" size={"2x"}/></Marker> : null
            }
          </MapGL>
        </div>
      </>
    )
  }
}

export default Map