import React, { Component } from 'react'
import { Link,Outlet } from 'react-router-dom'
import { getInvoices } from '../data'

class Invoices extends Component {
    render() {

        let invoices = getInvoices()

        return (
            <div style={{ display: "flex" }}>
                <nav
                    style={{
                        borderRight: "solid 1px",
                        padding: "1rem",
                    }}
                >
                    {invoices.map((invoice) => (
                        <Link
                            style={{ display: "block", margin: "1rem 0" }}
                            to={`/Invoices/${invoice.number}`}
                            key={invoice.number}
                        >
                            {invoice.name}
                        </Link>
                    ))}
                </nav>
                <Outlet/>
            </div>
        )
    }
}

export default Invoices