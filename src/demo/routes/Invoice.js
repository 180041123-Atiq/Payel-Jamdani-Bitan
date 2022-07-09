import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import { getInvoice } from '../data'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

class Invoice extends React.Component {

    render() {

        let params = this.props.params
        let invoice = getInvoice(parseInt(params.invoiceId, 10))

        return (
            <main style={{ padding: "1rem" }}>
                <h2>Total Due: {invoice.amount}</h2>
                <p>
                    {invoice.name}: {invoice.number}
                </p>
                <p>Due Date: {invoice.due}</p>
            </main>
        )
    }
}

export default withParams(Invoice)