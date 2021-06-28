import React from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';
import { connect } from 'react-redux';

class WalkiddieHereMaps extends React.Component{
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
    this.mapData = this.props.formData;
    
    this.marker = new H.map.Marker({lat: -6.364520803098946, lng: 106.82922538589406}, {
      // mark the object as volatile for the smooth dragging
      volatility: true
    });
  };

  handleMapViewChange = (ev) => {
    const {
      onMapViewChange
    } = this.props;
    if (ev.newValue && ev.newValue.lookAt) {
      const lookAt = ev.newValue.lookAt;
      // adjust precision
      const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
      const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
      const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
      onMapViewChange(zoom, lat, lng);
    }
  };

  addDraggableMarker(map, behavior){
    // Ensure that the marker can receive drag events
    this.marker.draggable = true;
    map.addObject(this.marker);
  
    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener('dragstart', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        var targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
      }
    }, false);
  
  
    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', function(ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.enable();
        console.log(this.mapData);
        console.log('change')
        console.log(target.getGeometry().lat);
        console.log(target.getGeometry().lng);
        localStorage.setItem('lat', target.getGeometry().lat);
        localStorage.setItem('lng', target.getGeometry().lng);
        console.log('localStorage');
        console.log(localStorage.getItem('lat'));
        console.log(localStorage.getItem('lng'));
        // this.props.setFormData({...this.mapData, lat: target.getGeometry().lat, lng: target.getGeometry().lng});
        // setFormData({ ...formData, totalBiaya: totalSemuaBiaya});
      };
    }, false);
  
    // Listen to the drag event and move the position of the marker
    // as necessary
     map.addEventListener('drag', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, false);
  };

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: `${process.env.REACT_APP_HERE_MAPS_API_KEY}`
      });
      const layers = platform.createDefaultLayers();

      var map = new H.Map(
        this.ref.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: -6.364520803098946, lng: 106.82922538589406},
          zoom: 13,
        },
      );

      onResize(this.ref.current, () => {
        map.getViewPort().resize();
      });
      this.map = map;

      // attach Dragable Behavior
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      this.addDraggableMarker(this.map,behavior);

      // // attach interactive behavior
      // this.map.addEventListener('mapviewchange', this.handleMapViewChange);
      // new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }
  };

  componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener('mapviewchange', this.handleMapViewChange);
    }
  };

  render() {
    return (
      <div
        style={{ position: 'relative', width: '100%', height:'300px' }}
        ref={this.ref}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  location :state.auth.location
})

export default connect(mapStateToProps)(WalkiddieHereMaps);