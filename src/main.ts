import './style.css';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';

const Barcelona = fromLonLat([2.1734, 41.3851]);
const Madrid = fromLonLat([-3.7038, 40.4168]);
const Sevilla = fromLonLat([-5.9826, 37.3886]);

const icon = new Icon({
  src: 'poi.png',
  anchor: [0.5, 1],
  scale: 0.05
});

const features = [Barcelona, Madrid, Sevilla].map(point => new Feature({
  geometry: new Point(point)
}));

const poiLayer = new VectorLayer({
  source: new VectorSource({ features }),
  style: new Style({ image: icon })
});

const baseLayer = new TileLayer({ source: new OSM() });

new Map({
  target: 'map',
  layers: [
    baseLayer,
    poiLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
