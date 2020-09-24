import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

//https://disease.sh/v3/covid-19/countries

 function HomeScreen() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('wordlwide');

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

    const onCountryChange = (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    }

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
        </Container>
    )
    
}

export default HomeScreen;