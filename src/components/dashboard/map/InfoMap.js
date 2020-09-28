import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css'

class InfoMap extends MapControl {
  createLeafletElement(props) {}
  componentDidMount() {
    const info = L.control({ position: this.props.position });

    info.onAdd = () => {
      const div = L.DomUtil.create("div", "info info");
      
      let d;
      if (this.props.props && this.props.data[this.props.props.cmun]) {
        d = this.props.data[this.props.props.cmun];
      } else {
        d = 0;
      }

      div.innerHTML = '<h5>Usuarios</h5>' +
      (this.props.props
        ? '<b>' + this.props.props.municipio + '</b><br />' + d + ' registros'
        : 'Pasa el ratón sobre un municipio');
      return div;
    };

    const { map } = this.props.leaflet;
    info.addTo(map);
  }
}

export default withLeaflet(InfoMap);

