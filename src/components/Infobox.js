import React from 'react'
import { Card } from 'react-bootstrap'

function Infobox({ title, cases, total}) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{cases}</Card.Subtitle>
                <Card.Text>Total: {total}</Card.Text> 
            </Card.Body>
        </Card>
    )
}

export default Infobox
