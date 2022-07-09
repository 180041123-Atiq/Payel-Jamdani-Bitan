import {Component} from 'react'
import '../../css/Orders.css'
import appWithFirebase from './firestore'
import {getFirestore,getDocs,collection,deleteDoc,doc} from 'firebase/firestore'

const db = getFirestore(appWithFirebase)

class Orders extends Component{

    constructor(props){
        super(props)

        this.state = {
            cdb:[],
        }

        this.handleReload = this.handleReload.bind(this)
        this.handleDebug = this.handleDebug.bind(this)
    }

    async componentDidMount(){
        let querySnapshot = await getDocs(collection(db,'customers'))
        querySnapshot.forEach((doc) => {
            let arr = this.state.cdb
            arr.push({...doc.data(),docid:doc.id})
            this.setState({
                cdb:arr,
            })
        })
    }

    async handleReload(docid){
        let arr = this.state.cdb
        let narr = []
        arr.map((item,i) => {
            if(item.docid !== docid)narr.push(item)
        })

        await deleteDoc(doc(db,'customers',docid))

        this.setState({
            cdb:narr,
        })
    }

    handleDebug(){
        
    }

    render(){

        return(
            <div className='oc'>
                <h3 className="od">Total Orders : {this.state.cdb.length}</h3>
                {this.state.cdb.map((item,i) => {
                    return (
                        <div className='ols' key={item.docid}>
                            <h3>Product Id : {item.cpid}</h3>
                            <h3>Name : {item.cname}</h3>
                            <h3>Number : {item.cnumber}</h3>
                            <p>Address : {item.caddress}</p>
                            <button className='clb' onClick={() => this.handleReload(item.docid)}>Clear</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Orders