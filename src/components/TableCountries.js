import React from 'react';
import { Table } from 'react-bootstrap';

function TableCountries({ countries }) {
    return (
        <Table table-sm borderless hover size="sm" className="dataTable overflow-auto">
            <tbody>
            { countries.map(( { country, cases }) => (
                <tr key={country}>
                    <td>{country}</td>
                    <td>{cases}</td>
                </tr>
            ))} 
            </tbody>
        </Table>
    )
}

export default TableCountries;
