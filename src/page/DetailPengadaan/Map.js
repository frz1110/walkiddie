import React from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      const platform = new H.service.Platform({
        apikey: `${process.env.REACT_APP_HERE_MAPS_API_KEY}`
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.ref.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: localStorage.getItem('lat'), lng: localStorage.getItem('long')},
          zoom: 13,
        },
      );
      // Create a marker using the previously instantiated icon:
      var marker = new H.map.Marker({ lat: localStorage.getItem('lat'), lng: localStorage.getItem('long') });

      // Add the marker to the map:
      map.addObject(marker);
      onResize(this.ref.current, () => {
        map.getViewPort().resize();
      });
      this.map = map;
    }
  }
  
  render() {
    return (
      <div
        style={{ position: 'relative', width: '100%', height:'300px' }}
        ref={this.ref}
      />
    )
  }
}  