import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css'

class InfoMapLegend extends MapControl {
  createLeafletElement(props) {}
  componentDidMount() {
    const info = L.control({ position: this.props.position });

    info.onAdd = () => {
      const div = L.DomUtil.create("div", "info info");
      div.innerHTML = `<span style="font-size:16px, width:300px">*Este mapa muestra los registros en app por municipio en el rango de fechas seleccionadas</span>`;

      return div;
    };
    const { map } = this.props.leaflet;
    info.addTo(map);
  }
  componentWillUnmount() {
    const { map } = this.props.leaflet;
    map.removeLayer();
  }
}

export default withLeaflet(InfoMapLegend);

