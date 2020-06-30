import React from 'react'

export default props => {
    const rows = props.transactions.map( transaction => {
        return (
            <tr key={transaction.id}>
                <td>{transaction.description}</td>
                
                <td>{ new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(transaction.value) }</td>
                <td>{transaction.type}</td>
                <td>{transaction.month}</td>
                <td>{transaction.status}</td>
                <td>
                    <button type="button" className="btn btn-success" title="Approve"
                        disable={ transaction.status !== "PENDING"}
                        onClick={ e => props.updateStatus(transaction, 'APPROVED')}><i className="pi pi-check"></i></button>
                    <button type="button" className="btn btn-warning" title="Cancel"
                        disable={ transaction.status !== "PENDING"}
                        onClick={ e => props.updateStatus(transaction, 'CANCELED')}><i className="pi pi-times"></i></button>
                    <button type="button" className="btn btn-primary" title="Edit"
                        onClick={ e => props.editAction(transaction.id )}><i className="pi pi-pencil"></i></button>
                    <button type="button" className="btn btn-danger" title="Remove"
                        onClick={ e => props.deleteAction(transaction)}><i className="pi pi-trash"></i></button>
                </td>
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
