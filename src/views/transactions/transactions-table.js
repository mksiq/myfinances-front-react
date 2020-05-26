import React from 'react'

export default props => {
    const rows = props.transactions.map( transaction => {
        return (
            <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.value}</td>
                <td>{transaction.type}</td>
                <td>{transaction.month}</td>
                <td>{transaction.status}</td>
            </tr>
        );
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col">Type</th>
                    <th scope="col">Month</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
