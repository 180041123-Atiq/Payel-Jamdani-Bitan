import {Component} from 'react'
import '../css/Purchase.css'
import appWithFirebase from './components/firestore'
import {getFirestore,addDoc,collection} from 'firebase/firestore'

const db = getFirestore(appWithFirebase)

class Purchase extends Component{

    constructor(props){
        super(props)

        this.state = {
            cname:'',
            cnumber:'',
            caddress:'',
            msg:`Purchasing Product with ID : ${this.props.pobj.pid}`,
        }

        this.handleName = this.handleName.bind(this)
        this.handleNumber = this.handleNumber.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName(e){
        this.setState({
            msg:`Purchasing Product with ID : ${this.props.pobj.pid}`,
            cname:e.target.value,
        })
    }

    handleNumber(e){
        this.setState({
            msg:`Purchasing Product with ID : ${this.props.pobj.pid}`,
            cnumber:e.target.value,
        })
    }

    handleAddress(e){
        this.setState({
            msg:`Purchasing Product with ID : ${this.props.pobj.pid}`,
            caddress:e.target.value,
        })
    }

    async handleSubmit(){

        if(this.state.cname !== '' && this.state.cnumber !== '' && this.state.caddress !== '') {

            try{
                let docRef = await addDoc(collection(db,'customers'),{
                    cname:this.state.cname,
                    cnumber:this.state.cnumber,
                    caddress:this.state.caddress,
                    cpid:this.props.pobj.pid,
                })

                this.setState({
                    cname:'',
                    cnumber:'',
                    caddress:'',
                    msg:'We got your information,we will contact you soon.'
                })

            } catch(e) {
                this.setState({
                    msg:'Error while uploading,please try again.'
                })
            }

        } else {
            this.setState({
                msg:'Please fill up all'
            })
        }

    }

    render(){
        return (
            <div className='puContainer'>
                <h2 className='purtitle'>{this.state.msg}</h2>
                <div className='cautionary'>
                    <h3>Please Read this before submiting your information</h3>
                    <p>Before you proceed to purchase, 
                        we want to clear something out.
                        There will be no transaction online.
                        Before delivering your product, 
                        we will call at your provided mobile number.
                        And if you confirm purchasing we will 
                        deliver your product to your home and then
                        you have to give the cost of the product 
                        specified in the product's web page, 
                        nothing else.
                    </p>
                </div>
                <div className='insertInfo'>
                    <input value={this.state.cname} onChange={this.handleName} className='inputd' placeholder='Name'/>
                    <input value={this.state.cnumber} onChange={this.handleNumber} className='inputd' placeholder='Mobile Number'/>
                    <div><textarea value={this.state.caddress} onChange={this.handleAddress} className='inputdt' placeholder='Address'/></div>
                </div>
                <button onClick={this.handleSubmit} className='sumbitB'>Submit</button>
            </div>
        )
    }
}

export default Purchase