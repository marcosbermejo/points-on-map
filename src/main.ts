import './style.css';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Icon, Stroke, Style } from 'ol/style';
import data from './data.json';
import { TrackerData } from './types';
import { LineString } from 'ol/geom';


const zoom = 10;
const center = fromLonLat([24.7536, 59.4370]);

const { location: routes } = (data as TrackerData);

const icon = {
    src: 'poi.svg',
    anchor: [0.5, 0.5],
    scale: 1
}

const routeStyle = new Style({
    stroke: new Stroke({
        color: '#800020',
        width: 3
    })
});

const baseLayer = new TileLayer({ source: new OSM() });

const vehiclesLayer = new VectorLayer({
    source: new VectorSource({
        features: Object.values(routes).map(points => new Feature({
            geometry: new Point(fromLonLat([parseFloat(points[0].lng), parseFloat(points[0].lat)]))
        }))
    }),
    style: new Style({ image: new Icon(icon) })
});

const routesLayer = new VectorLayer({
    source: new VectorSource({
        features: Object.values(routes).map(points => new Feature({
            geometry: new LineString(points.map(({ lng, lat }) => fromLonLat([parseFloat(lng), parseFloat(lat)])))
        }))
    }),
    style: routeStyle,
    visible: false // Hidden just for testing
});

const historicalLayer = new VectorLayer({
    source: new VectorSource({
        features: Object.values(routes).reduce<Feature[]>((acc, points) => {
            return acc.concat(points.map(({ lng, lat }) => new Feature({
                geometry: new Point(fromLonLat([parseFloat(lng), parseFloat(lat)]))
            })))
        }, [])
    }),
    style: new Style({ image: new Icon({ ...icon, opacity: 0.5 }) })
});

new Map({
    target: 'map',
    layers: [
        baseLayer,
        vehiclesLayer,
        routesLayer,
        historicalLayer
    ],
    view: new View({
        center,
        zoom
    })
});
