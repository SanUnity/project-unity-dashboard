import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import Legend from './Legend';
import InfoMap from './InfoMap'
import InfoMapLegend from './InfoMapLegend'
import 'leaflet/dist/leaflet.css'
import statesData from './madrid-municipios.js';
import mapUtils from '../../../utils/mapUtils';
import './MapTest.css';

const MapTest = ({mapData, iniDate, endDate, grades, getColor}) => {
  const mapRef = useRef();
  const style = {
    width: '100%',
    height: '600px',
    margin: '3rem 0 0 0'
  };
  const [layers, setLayers] = useState(null)
  const dataArr = mapData && mapData.map(name => {
    const newData = {};
    newData[name.suburbMapID] = name.registers;
    return newData;
  });
  const data =dataArr && dataArr.reduce((acc, e, i) => {
    let elKeys = Object.keys(dataArr[i]);
    elKeys.forEach(key => {
      acc[key] = e[key];
    });
    return acc;
  }, {});

  useEffect(() => {
    const mapStyle = feature => {
      return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5,
        fillColor: mapUtils.GET_COLOR(data[feature.properties.cmun])
      };
    };
    
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    if (!map) return;

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    };
    const highlightFeature = e => {
      var layer = e.target;
      layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });
      layer.bringToFront();
      
      setLayers(layer.feature.properties);
      infoMap.update(layer.feature.properties);
    };
    const resetHighlight = event => {
      madridGeoJson.resetStyle(event.target);
      
    };
    const zoomToFeature = e => {
      map.fitBounds(e.target.getBounds());
    };

    //info.addTo(map);

    const madridGeoJson = new L.GeoJSON(statesData, {
      style: mapStyle,
      onEachFeature: onEachFeature
    }).addTo(map)
    const info = L.control({ position: 'bottomleft' });

    info.onAdd = () => {
      const div = L.DomUtil.create("div", "info info");
      div.innerHTML = `<span style="font-size:16px, width:300px">*Este mapa muestra los registros en app por municipio en el rango de fechas seleccionadas</span>`;

      return div;
    };
    info.addTo(map);


    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
          getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    legend.addTo(map);

    const infoMap = L.control({ position: 'topright' });
    const div = L.DomUtil.create("div", "info info");
    infoMap.onAdd = () => {
      
        return div;
    };
     
     
    infoMap.update = (props) => {
      
      
      let d;
      if (props && data[props.cmun]) {
        d = data[props.cmun];
      } else {
        d = 0;
      }
  
      div.innerHTML = '<h5>Usuarios</h5>' +
      (props
        ? '<b>' + props.municipio + '</b><br />' + d + ' registros'
        : 'Pasa el ratón sobre un municipio');
        return div;
    };
  
  
    infoMap.addTo(map);
   
    
  }, [mapRef, mapData]);


  return (
      <Map ref={mapRef} center={[40.416824, -3.703579]} zoom={9} style={style}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution="©OpenStreetMap, ©CartoDB"
        />
      </Map>
  );
};
export default MapTest;
