import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, CardDeck, Card } from 'react-bootstrap';

import Infobox from '../components/Infobox';
import Map from '../components/Map';

//https://disease.sh/v3/covid-19/countries

 function HomeScreen() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('wordlwide');
    const [countryInfo, setCountryInfo] = useState({});

    // Cargar los datos de todo el mundo al cargarse la página
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        })
    }, []);

    // Obtener el listado de países para el select
    useEffect(() => {
        // Envia un request, espera por este, hace algo con la información
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country) =>(
                    {
                        name: country.country, // Spain
                        value: country.countryInfo.iso2 // ES
                    }
                ));
                setCountries(countries);
            })
        }
        getCountriesData(); 
    }, []);

    // Función que se ejecuta al seleccionar un país
    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        // Obtener los datos del país
        const url = countryCode === 'wordlwide'
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
        await fetch(url)
        .then(response => response.json())
        .then(data => {           
            setCountry(countryCode);
            // Todos los datos del país seleccionado.
            setCountryInfo(data);
        });
    };
    console.log(countryInfo);

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center justify-content-md-end align-items-center mt-3 mb-4">
                <Col md="auto"></Col>
                <Col xs={12} sm={6} md={4}>
                    <Form.Control as="select" size="sm" onChange={onCountryChange} value={country}>
                            <option value="wordlwide">Wordlwide</option>
                        {countries.map(country => (
                            <option value={country.value}>{country.name}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Row> 
            <Row className="d-flex flex-column flex-md-row">
                <Col sm={12} md={8}>                    
                    <Row className="d-flex justify-content-around">
                        <CardDeck>
                            <Infobox title="Casos Coronavirus" cases={countryInfo.todayCases} total={countryInfo.cases} />
                            <Infobox title="Recuperados" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                            <Infobox title="Fallecidos" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
                        </CardDeck>
                    </Row>    
                    <Row>
                        <Map />
                    </Row>
                </Col>
                <Col sm={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Live Cases by Country</Card.Title>                           
                            <Card.Title>Wordlwide new cases</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
    
}

export default HomeScreen;