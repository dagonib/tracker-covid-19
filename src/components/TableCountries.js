import React from 'react';
import { Table } from 'react-bootstrap';

function TableCountries({ countries }) {
    return (
        <Table table-sm borderless striped hover size="sm" className="dataTable overflow-auto w-100">
            <tbody className="mx-3">
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
