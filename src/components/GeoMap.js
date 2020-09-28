import React from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import mapData from '../data/countries.json';

function GeoMap(countries) {
    console.log(countries.countries)
    const mapStyle = {
        fillColor: 'white',
        fillOpacity: 1,
        color: 'black',
        weight: 1
    }

    const onEachCountry = (country, layer) => {
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const confirmedText = country.properties.confirmedText;
        layer.bindPopup(`${name} ${confirmedText}`);
    }

    return (
        <Map 
            style={{ height: "400px", width: "100%"}} 
            zoom={1}
            center={[20, 100]} 
        >
            <GeoJSON
                style={mapStyle}
                data={mapData.features} 
                onEachFeature={onEachCountry}
            />
        </Map>
    ) 
    
}

export default GeoMap;
