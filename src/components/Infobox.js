import React from 'react'
import { Card } from 'react-bootstrap'

function Infobox({ title, cases, total, classes}) {
    return (
        <Card className={classes}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{cases}</Card.Subtitle>
            </Card.Body>
            
            <Card.Footer>Total: {total}</Card.Footer> 
            
        </Card>
    )
}

export default Infobox
