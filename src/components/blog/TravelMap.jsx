'use client';

import { useEffect, useRef } from 'react';
import Radar from 'radar-sdk-js';
import { createMapsPlugin } from '@radarlabs/plugin-maps';
import maplibregl from 'maplibre-gl';
import '@radarlabs/plugin-maps/dist/radar-maps.css';
import 'maplibre-gl/dist/maplibre-gl.css';

Radar.registerPlugin(createMapsPlugin());

const places = [
  { name: 'Bangkok', coordinates: [100.5018, 13.7563], years: [2001, 2006, 2010, 2019] },
  { name: 'New York', coordinates: [-74.006, 40.7128], years: [2010,2019,'2023-2026'] },
  { name: 'Tokyo', coordinates: [139.6917, 35.6895], years: [2012, 2026] },
  { name: 'London', coordinates: [-0.1276, 51.5072], years: [2018] },
  { name: 'Paris', coordinates: [2.3522, 48.8566], years: [2018] },

  { name: 'San Francisco', coordinates: [-122.4194, 37.7749], years: [2018, 2025] },
  { name: 'Mountain View', coordinates: [-122.0838, 37.3861], years: [2018, 2025] },
  { name: 'Point Reyes', coordinates: [-122.9394, 38.069], years: [2025] },
  { name: 'Big Sur', coordinates: [-121.8081, 36.2704], years: [2025] },
  { name: 'Yosemite', coordinates: [-119.5383, 37.8651], years: [2025] },

  { name: 'Grand Canyon', coordinates: [-112.1401, 36.0544], years: [2025] },
  { name: 'Las Vegas', coordinates: [-115.1398, 36.1699], years: [2016, 2018, 2025] },
  { name: 'Los Angeles', coordinates: [-118.2437, 34.0522], years: [2016] },
  { name: 'Page', coordinates: [-111.4558, 36.9147], years: [2025] },
  { name: 'Zion National Park', coordinates: [-113.0263, 37.2982], years: [2025] },

  { name: 'Toronto', coordinates: [-79.3832, 43.6532], years: ['present'] },
  { name: 'Waterloo', coordinates: [-80.5204, 43.4643], years: [2024] },
  { name: 'Markham', coordinates: [-79.337, 43.8561], years: [] },
  { name: 'Stoney Creek', coordinates: [-79.7599, 43.2175], years: [] },
  { name: 'Niagara Falls', coordinates: [-79.0849, 43.0896], years: [] },

  { name: 'Helsinki', coordinates: [24.9384, 60.1699], years: [2025] },
  { name: 'Rovaniemi', coordinates: [25.7294, 66.5039], years: [2025] },
  { name: 'Ruka', coordinates: [29.1617, 66.1686], years: [2025] },

  { name: 'Amsterdam', coordinates: [4.9041, 52.3676], years: [2019] },
  { name: 'Venice', coordinates: [12.3155, 45.4408], years: [2018] },
  { name: 'Rome', coordinates: [12.4964, 41.9028], years: [2018] },

  { name: 'Singapore', coordinates: [103.8198, 1.3521], years: [2012] },
  { name: 'Koh Tao', coordinates: [99.835, 10.0993], years: [2012] },
  { name: 'Koh Chiang', coordinates: [102.32, 12.05], years: [2012] },
  { name: 'Cambodia', coordinates: [104.99, 12.5657], years: [2012] },
  { name: 'Laos', coordinates: [102.4955, 19.8563], years: [2012] },

  { name: 'Miami', coordinates: [-80.1918, 25.7617], years: [2018, 2022, 2024] },
  { name: 'Orlando', coordinates: [-81.3792, 28.5383], years: [2008, 2019, 2025] },
  { name: 'Tampa Bay', coordinates: [-82.4572, 27.9506], years: [2017] },
  { name: 'Fort Lauderdale', coordinates: [-80.1373, 26.1224], years: [2018] },

  { name: 'Cozumel', coordinates: [-86.9458, 20.422], years: [2018] },
  { name: 'Ensenada', coordinates: [-116.5964, 31.8667], years: [2016] },

  { name: 'Seattle', coordinates: [-122.3321, 47.6062], years: [2017] },
  { name: 'Vancouver', coordinates: [-123.1207, 49.2827], years: [2022] },
  { name: 'Calgary', coordinates: [-114.0719, 51.0447], years: [2022] },
  { name: 'Edmonton', coordinates: [-113.4909, 53.5461], years: [2022] },
  { name: 'Jasper', coordinates: [-118.0814, 52.8737], years: [2022] },
  { name: 'Banff', coordinates: [-115.5708, 51.1784], years: [2022] },

  { name: 'Juneau', coordinates: [-134.4197, 58.3019], years: [2017] },
  { name: 'Ketchikan', coordinates: [-131.6461, 55.3422], years: [2017] },
  { name: 'Glacier Bay National Park', coordinates: [-137, 58.6658], years: [2017] },

  { name: 'Detroit', coordinates: [-83.0458, 42.3314], years: [2015] },
  { name: 'Chicago', coordinates: [-87.6298, 41.8781], years: [2008] },
  { name: 'Columbus', coordinates: [-82.9988, 39.9612], years: [2013] },
  { name: 'Cincinnati', coordinates: [-84.512, 39.1031], years: [2013] },
  { name: 'Cleveland', coordinates: [-81.6944, 41.4993], years: [2013] },
  { name: 'Omaha', coordinates: [-95.998, 41.2565], years: [2011] },
  { name: 'Des Moines', coordinates: [-93.6091, 41.6005], years: [2011] },
  { name: 'Pittsburgh', coordinates: [-79.9959, 40.4406], years: [2014] },
  { name: 'Washington DC', coordinates: [-77.0369, 38.9072], years: [2012, 2018] },

  { name: 'Great Smoky Mountains', coordinates: [-83.4895, 35.6118], years: [2013] },
  { name: 'Mount Rainier', coordinates: [-121.7603, 46.8523], years: [2017] },

  { name: 'Ottawa', coordinates: [-75.6972, 45.4215], years: [2005, 2012,2022] },
  { name: 'Montreal', coordinates: [-73.5673, 45.5017], years: [2005] },
  { name: 'Muskoka', coordinates: [-79.3, 45.0], years: [2018, 2021] },
  { name: 'Parry Sound', coordinates: [-80.033, 45.347], years: [2014] },
  { name: 'Tobermory', coordinates: [-81.6665, 45.2536], years: [2017,2019, 2021, 2022] },

  { name: 'Victoria', coordinates: [-123.3656, 48.4284], years: [2017] },
  { name: 'Salt Lake City', coordinates: [-111.891, 40.7608], years: [2025] },
  { name: 'Nassau', coordinates: [-77.3554, 25.0443], years: [2017, 2025] },

  { name: 'Boston', coordinates: [-71.0589, 42.3601], years: [2023] },
  { name: 'Philadelphia', coordinates: [-75.1652, 39.9526], years: [2025] },
  { name: 'Squamish', coordinates: [-123.1558, 49.7016], years: [2022] },
];

const placesGeoJSON = {
  type: 'FeatureCollection',
  features: places.map((place, index) => ({
    type: 'Feature',
    id: index,
    properties: {
      name: place.name,
      years: place.years,
    },
    geometry: {
      type: 'Point',
      coordinates: place.coordinates,
    },
  })),
};

function formatYears(years) {
  if (!years) return '';

  // If it's a string, try to parse it
  if (typeof years === 'string') {
    try {
      years = JSON.parse(years);
    } catch {
      return years; // fallback: just show the string
    }
  }

  if (!Array.isArray(years) || years.length === 0) return '';

  return years.map(String).sort().join(', ');
}

function getPopupHTML(name, years) {
  const yearsText = formatYears(years);

  return `
    <div style="padding: 4px 6px;">
      <div style="font-weight: 600; font-size: 13px;">${name}</div>
      ${yearsText ? `<div style="font-size: 12px; opacity: 0.7;">${yearsText}</div>` : ''}
    </div>
  `;
}

export default function TravelMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    Radar.initialize(import.meta.env.VITE_RADAR_KEY);

    const map = Radar.ui.map({
      container: containerRef.current,
      // style: '7b865c44-a27e-4419-9096-4fb87c0ed236',
      style: '889f1b50-ce62-452f-92cf-8c063439b322',
      center: [10, 20],
      zoom: 1.5,
      minZoom: 1,
    });

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 12,
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addSource('places', {
        type: 'geojson',
        data: placesGeoJSON,
      });

      map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-radius': 2.5,
          'circle-color': '#ff78a8',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
      });

      const bounds = new maplibregl.LngLatBounds();
      places.forEach((place) => bounds.extend(place.coordinates));
      map.fitBounds(bounds, { padding: 60, maxZoom: 4 });

      map.on('mousemove', (e) => {
        const feature = map.queryRenderedFeatures(e.point, {
          layers: ['places'],
        })[0];

        if (!feature) {
          map.getCanvas().style.cursor = '';
          popup.remove();
          return;
        }

        map.getCanvas().style.cursor = 'pointer';

        popup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(getPopupHTML(feature.properties.name, feature.properties.years))
          .addTo(map);
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });

    return () => {
      popup.remove();

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '520px' }} />
    </div>
  );
}
