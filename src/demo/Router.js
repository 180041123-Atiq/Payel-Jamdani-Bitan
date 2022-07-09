import React,{Component} from 'react'
import {Outlet,Link} from 'react-router-dom'

class Router extends Component{
    render(){
        return (
            <div>
                <h1>Atiqonfire using a router</h1>
                <nav>
                    <Link to="/Invoices">Invoices</Link>|{" "}
                    <Link to="/Expenses">Expenses</Link>|{" "}
                    <Link to = '/NoWhere'>NoWhere</Link>
                </nav>
                <Outlet/>
            </div>
        )
    }
}

export default Router