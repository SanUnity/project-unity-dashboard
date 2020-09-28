import React from 'react';
import L from 'leaflet';
import statesData from './madrid-municipios.js';
import './MapTest.css';

const style = {
  width: '100%',
  height: '600px',
  margin: '3rem 0 0 0'
};

class MapTest extends React.Component {
  state = {
    mapData: this.props.mapData,
    initDate: this.props.initDate,
    endDate: this.props.endDate,
    grades: this.props.grades,
    getColor: this.props.getColor,
    colorGrades: this.props.colorGrades,
    info: this.props.info,
    globalResults: this.props.globalResults
  };

  getMap = props => {
    const propsData = this.props.mapData;
    const { grades, colorGrades, info, getColor, globalResults } = this.state;
    const dataArr = propsData.map(name => {
      const newData = {};
      newData[name.suburbMapID] = globalResults ? name.level1 : name.registers;
      return newData;
    });
    const dataArrTotal = propsData.map(name => {
      const newData = {};
      newData[name.suburbMapID] = name.total;
      return newData;
    });
    const dataArrLevel0 = propsData.map(name => {
      const newData = {};
      newData[name.suburbMapID] = name.level0;
      return newData;
    });
    const data = dataArr.reduce((acc, e, i) => {
      let elKeys = Object.keys(dataArr[i]);
      elKeys.forEach(key => {
        acc[key] = e[key];
      });
      return acc;
    }, {});

    const dataTotal = dataArrTotal.reduce((acc, e, i) => {
      let elKeys = Object.keys(dataArr[i]);
      elKeys.forEach(key => {
        acc[key] = e[key];
      });
      return acc;
    }, {});
    const dataLevel0 = dataArrLevel0.reduce((acc, e, i) => {
      let elKeys = Object.keys(dataArr[i]);
      elKeys.forEach(key => {
        acc[key] = e[key];
      });
      return acc;
    }, {});

    const mapStyle = feature => {
      return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5,
        fillColor: getColor(data[feature.properties.cmun])
      };
    };

    this.map = L.map('map', {
      center: [40.416824, -3.703579],
      zoom: 9,
      layers: [
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: '©OpenStreetMap, ©CartoDB',
            id: 'streets-v9'
          }
        )
      ]
    });
    this.geojson = L.geoJson(statesData, {
      style: mapStyle,
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    this.info = L.control();
    this.info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };
    this.info.update = function(item) {
      let d;
      let t;
      let level0;
      let percentage = 0;

      if (item && data[item.cmun]) {
        d = data[item.cmun];
        t = dataTotal[item.cmun];
        level0 = dataLevel0[item.cmun];
        percentage = ((d / t) * 100).toFixed(0);
      } else {
        d = 0;
        t = 0;
        level0 = 0;
      }
      this._div.innerHTML = !globalResults
        ? 
          item
          ? '<b>' + item.municipio + '</b><br />' + d + ' ' + info
          : 'Pasa el ratón sobre un municipio'
        : 
        item
        ? '<b>' +
          item.municipio +
          '</b><br />' +
          d +
          ' con síntomas compatibles' +
          '<br />' +
          level0 +
          ' sin síntomas compatibles' +
          '<br />' +
          t +
          ' totales' +
          '<br />' +
          percentage +
          '%' +
          ' con síntomas compatibles' +
          '<br />'
        : 'Pasa el ratón sobre un municipio';
    };
    this.info.addTo(this.map);

    this.layer = L.layerGroup().addTo(this.map);
    this.legend = L.control({ position: 'bottomright' });
    this.legendNew = L.control({ position: 'bottomleft' });
    this.legend.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'info legend');

      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          colorGrades[i] +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    this.legendNew.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'info legend');
      !globalResults
        ? (div.innerHTML = `<span class="legend-text">*Este mapa muestra los ${info.toLowerCase()} en app por municipio en el rango de fechas seleccionadas</span>`)
        : (div.innerHTML = `<span class="legend-text">*Este mapa muestra los datos por municipio en el rango de fechas seleccionadas</span>`);
      return div;
    };
    this.legend.addTo(this.map);
    this.legendNew.addTo(this.map);
  };

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature
    });
  };
  highlightFeature = e => {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    layer.bringToFront();
    this.info.update(layer.feature.properties);
  };
  resetHighlight = event => {
    this.geojson.resetStyle(event.target);
    this.info.update();
  };
  zoomToFeature = e => {
    this.map.fitBounds(e.target.getBounds());
  };
  componentDidMount() {
    this.getMap(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.mapData !== prevProps.mapData) {
      this.setState({
        mapData: this.props.mapData,
        initDate: this.props.initDate,
        endDate: this.props.endDate,
        grades: this.props.grades,
        getColor: this.props.getColor,
        colorGrades: this.props.colorGrades,
        info: this.props.info
      });
      this.map.remove();
      this.getMap(this.props.mapData);
    }
  }

  render() {
    return <div id="map" style={style} />;
  }
}
export default MapTest;
