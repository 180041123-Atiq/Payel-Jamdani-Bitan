import React, { Component } from 'react'
import Products from './Products'
import Purchase from './Purchase'
import Admin from './Admin'
import Card from './components/Card'
import '../css/Home.css'
import appWithFirebase from './components/firestore'
import {getFirestore,getDocs,collection,doc} from 'firebase/firestore'
import { FiSearch,FiHome } from "react-icons/fi";


const db = getFirestore(appWithFirebase)

var prod = null
var pur = null

class Home extends Component {

    constructor(props){
        super(props)

        this.state= {
            home:true,
            prod:false,
            pur:false,
            admin:false,
            searchInput:'',
            datadb:[],
            fullViewIdx:'',
            msg:'Serach Product By ID',
            pass:'',
        }

        this.handleFullViewClick = this.handleFullViewClick.bind(this)
        this.handleBackToHomeClick =this.handleBackToHomeClick.bind(this)
        this.handlePurchaseClick = this.handlePurchaseClick.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleSearchClick = this.handleSearchClick.bind(this)
    }

    async componentDidMount(){
        let querySnapshot = await getDocs(collection(db,'products'))
        querySnapshot.forEach((doc) => {
            let arr = this.state.datadb
            arr.push({...doc.data(),docid:doc.id})
            this.setState({
                datadb:arr,
            })
        })
        let query = await getDocs(collection(db,'pass'))
        query.forEach((doc) => {
            this.setState({
                pass:doc.data().pass,
            })
        })
    }

    handleFullViewClick(pobj){

        prod = <div className='productsContainer'>
            <button className='backHome' onClick={this.handleBackToHomeClick}><FiHome/></button>
            <Products goToPurchase={this.handlePurchaseClick} pobj = {pobj} />
            </div>;

            this.setState({
                home:false,
                prod:true,
                pur:false,
                admin:false,
            })

    }

    handleBackToHomeClick(){
        this.setState({
            home:true,
            prod:false,
            pur:false,
            admin:false,
        })
    }

    handlePurchaseClick(pobj){

        pur = <div>
                <button className='backHome' onClick={this.handleBackToHomeClick}><FiHome/></button>
                <Purchase pobj={pobj} />
            </div>

        this.setState({
            home:false,
            prod:false,
            pur:true,
            admin:false,
        })
    }

    handleSearchInput(e){
        this.setState({
            searchInput:e.target.value,
            msg:'Serach Product By ID',
        })
    }

    handleSearchClick(){

        if(this.state.searchInput === this.state.pass){
            this.setState({
                home:false,
                prod:false,
                pur:false,
                admin:true,
                searchInput:'',
            })
            return 
        } else {

            let flag = null

            this.state.datadb.map((item,i) => {
                if(item.pid === this.state.searchInput){
                    flag = item
                    return 
                }
            })

            if(flag !== null){

                prod = <div className='productsContainer'>
            <button className='backHome' onClick={this.handleBackToHomeClick}><FiHome/></button>
            <Products goToPurchase={this.handlePurchaseClick} pobj = {flag} />
            </div>;

            this.setState({
                home:false,
                prod:true,
                pur:false,
                admin:false,
            })

            } else {
                this.setState({
                    searchInput:'',
                    msg:'Invalid ID',
                })
            }
        }
    }

    render() {
        let productId = 1
        return (
            <div
                className='container'
            >
                {this.state.home === true || this.state.prod === true ? 
                <div
                    className='navContainer'
                >
                    <div className='shopName' >Payel Jamdani Bitan</div>
                    <div className='searchField'>
                        <input 
                            className='searchInput'
                            type = 'text'
                            onChange = {this.handleSearchInput}
                            value = {this.state.searchInput}
                            placeholder={this.state.msg}
                        />
                        <div 
                            className='searchButton'
                            onClick={this.handleSearchClick}
                        ><FiSearch/></div>
                    </div>
                </div>
                :null}
                <div className='pageContainer'>
                    { this.state.home ? 
                        <div 
                            className='homeContainer'
                        >
                            <Card getFullView={this.handleFullViewClick} datadb={this.state.datadb} />
                        </div>
                        :null
                    }
                    { 
                        this.state.prod ? prod : null
                    }
                    { this.state.pur ? 
                        pur
                        :null
                    }
                    { this.state.admin ? 
                        <div className='adminContainer' >
                            <button className='backHome' onClick={this.handleBackToHomeClick}><FiHome/></button>
                            <Admin />
                        </div>
                        :null
                    }
                </div>
                <div className='footer'>
                    <h3>Payel Jamdani Bitan</h3>
                    <p>
                        This website is designed for 
                        mobile devices. So for Better Experience 
                        switch to Mobile if you are on laptop, desktop 
                        or any sort of wide screen device. 
                        And if you are already on mobile ignore this 
                        message. We are designing this website for wide 
                        screen and we will be providing that as fast as 
                        we can. Really Really Sorry!!! for the 
                        inconvenience.
                    </p>
                    <p>
                        All the products in this website are from 
                        a REAL SHOP at Dhanmondi Hawkers Market.  
                    </p>
                    <h3>Shop No : 154</h3>
                    <h3>Shop Address : Dhanmondi Hawkers Market, Dhaka-1205</h3>
                    <h3>Mobile Number : 01614169204</h3>
                    <p>For any query about the website,
                         or facing any problems with the website,
                         give a mail at shafin.atiq@gmail.com</p>
                    <h3>&copy; MD Atiqur Rahman</h3>
                </div>             
            </div>
        )
    }
}

export default Home