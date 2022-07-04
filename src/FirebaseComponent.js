import React,{Component} from 'react'
import db from './firestore'
import {collection,addDoc,getDocs} from 'firebase/firestore'
import { async } from '@firebase/util'

class FirebaseComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            email:'',
            name:'',
            out:[],
        }
    }

    async componentDidMount(){
        const querySnapshot = await getDocs(collection(db, "info"));
        querySnapshot.forEach((doc) => {
            let outv = this.state.out
            let objv = {
                name:doc.data().name,
                email:doc.data().email,
            }
            outv.push(objv)
            this.setState({
                out:outv
            })
        });
    }

    updateInput = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    addUser = async (e) => {
        e.preventDefault()

        try{
            const docRef = await addDoc(collection(db,'info'),{
                name:this.state.name,
                email:this.state.email,
            })
            console.log('Document written with ID : ',docRef.id)
        } catch(e) {
            console.error("Error while adding document : ",e)
        }

        this.setState({
            name:'',
            email:'',
        })
    }

    render(){
        return (
            <div>
                <h1>Atiqonfire using Firebase</h1>
                <form onSubmit={this.addUser}>
                    <input
                        type = "text"
                        name = "name"
                        placeholder = "Give a Name"
                        onChange={this.updateInput}
                        value = {this.state.name}
                    />
                    <input
                        type = "text"
                        name = "email"
                        placeholder='email'
                        onChange={this.updateInput}
                        value = {this.state.email}
                    />
                    <button type = "submit">Submit</button>
                </form>
                {
                    this.state.out.length > 0 ?
                    <h2>{this.state.out[0].name}</h2> :
                    <h2>Nothing to show</h2>
                }
            </div>
        )
    }
}

export default FirebaseComponent