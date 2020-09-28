import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, CardDeck } from 'react-bootstrap';
import numeral from 'numeral';

import Infobox from '../components/Infobox';
import TableCountries from '../components/TableCountries';
import { sortData, formatData } from '../util';
import LineGraph from '../components/LineGraph';
import GeoMap from '../components/GeoMap';

//https://disease.sh/v3/covid-19/countries

 function HomeScreen() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('wordlwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [dataTable, setDataTable] = useState([]);
    const [mapCenter, setMapCenter] = useState([ 0, -10.4796]);
    const [mapZoom, setMapZoom] = useState(2);
    const [mapCountries, setMapCountries] = useState([]);
    const [date, setDate] = useState([]);

    // Cargar los datos de todo el mundo al cargarse la página
    useEffect(() => {
        fetch('https://corona-api.com/timeline')
        .then(response => response.json())
        .then(data => {
            const globaldata = data.data.shift();
            setCountryInfo(globaldata);
            setDate(formatData(globaldata.updated_at));
        })
    }, []);

    // Obtener el listado de países para el select
    useEffect(() => {
        // Envia un request, espera por este, hace algo con la información
        const getCountriesData = async () => {
            await fetch('https://corona-api.com/countries')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data)
                const countries = data.data.map((country) =>(
                    {
                        name: country.name, // Spain
                        value: country.code // ES
                    }
                ));
                const sortedData = sortData(data.data);
                setDataTable(sortedData);
                setMapCountries(data.data); // Toda la información de los países
                setCountries(countries);
            });
        };
        getCountriesData();  
    }, []);
    
    // Función que se ejecuta al seleccionar un país
    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        // Obtener los datos del país
        const url = countryCode === 'wordlwide'
            ? 'https://corona-api.com/timeline'
            : `https://corona-api.com/countries/${countryCode}`;      
            await fetch(url)
        .then(response => response.json())
        .then(data => {   
            
            setCountry(countryCode);
            // Todos los datos del país seleccionado.
            if(countryCode === 'wordlwide') {      
                const info = data.data.shift()        
                setCountryInfo(info);   
                console.log(info)             
                setDate(formatData(info.updated_at));
            } else {
                
                if (data.data.timeline.length <= 0) {
                    const info = {
                        updated_at: 0,
                        new_confirmed: 0,
                        confirmed: 0,
                        new_recovered: 0,
                        recovered: 0,
                        new_deaths: 0,
                        deaths: 0,
                    }
                    setCountryInfo(info);
                    setDate(formatData(info.updated_at));
                } else {
                    const info = data.data.timeline.shift();
                    setCountryInfo(info)                
                    setDate(formatData(info.updated_at));
                }
            }
            
            // establecer las coordenadas del pais seleccionado
            setMapCenter([data.data.coordinates.latitude, data.data.coordinates.longitude]);
            setMapZoom(4);
        });
    };

    return (
        <Container fluid>
            <Row className="d-flex flex-column flex-md-row mx-0 mx-md-0 my-3">
                <Col sm={12} md={8} className="p-0 my-md-0">
                    <h6 className="text-center text-secondary font-weight-bold m-t">Fecha de actualización:{' '}</h6>
                    <h6 className="text-center text-secondary m-t">{date}</h6>
                </Col>
                <Col xs={12} sm={6} md={4} className="align-self-center mx-0">
                    <Form.Control as="select" size="sm" onChange={onCountryChange} value={country}>
                            <option value="wordlwide">Wordlwide</option>
                        {countries.map(country => (
                            <option value={country.value}>{country.name}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Row> 
            <Row className="d-flex flex-column flex-md-row mx-0 mx-md-0">
                <Col sm={12} md={8} className="p-0 my-md-0">                    
                    <Row className="d-flex justify-content-center mx-0" >
                        <CardDeck  className="mx-0">
                            <Infobox 
                                classes={"bg-primary text-white text-center"}
                                title="Casos Coronavirus" 
                                cases={numeral(countryInfo.new_confirmed).format('0,0')} 
                                total={numeral(countryInfo.confirmed).format('0,0')} 
                            />
                            <Infobox 
                                classes={"bg-success text-white text-center"}
                                title="Recuperados" 
                                cases={numeral(countryInfo.new_recovered).format('0,0')} 
                                total={numeral(countryInfo.recovered).format('0,0')} 
                            />
                            <Infobox 
                                classes={"bg-dark text-white text-center"}
                                title="Fallecidos" 
                                cases={numeral(countryInfo.new_deaths).format('0,0')} 
                                total={numeral(countryInfo.deaths).format('0,0')} 
                            />
                        </CardDeck>
                    </Row>    
                    <Row className="mx-0 my-3">
                        <GeoMap countries={countries}>
                            Mapa
                        </GeoMap>
                    </Row>
                </Col>
                <Col sm={12} md={4} className="p-0 my-3 mt-md-0 bg-white">
                    <Row className="d-flex flex-column align-content-center mx-0">
                        <h5 className="text-center mt-3">Live Cases by Country</h5>
                        <TableCountries countries={dataTable} />
                    </Row>
                    <Row className="d-flex flex-column align-content-center mx-0">
                        <h5 className="text-center">Wordlwide new cases</h5>
                        <LineGraph />
                    </Row>
                </Col>
            </Row>           
        </Container>
    )
    
}

export default HomeScreen;