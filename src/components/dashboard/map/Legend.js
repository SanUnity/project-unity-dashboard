import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css'

class Legend extends MapControl {
  createLeafletElement(props) {}
  componentDidMount() {
    const legend = L.control({ position: this.props.position });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < this.props.grades.length; i++) {
        from = this.props.grades[i];
        to = this.props.grades[i + 1];

        labels.push(
          '<i style="background:' +
          this.props.getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);

