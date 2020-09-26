import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        multiplier: 800
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        multiplier: 1200
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        multiplier: 2000
    }
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1);
};

// DRAW circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType])* casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="">
                    <div className="info-flag" roundedCircle style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div>{country.country}</div>
                    <div className="">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);