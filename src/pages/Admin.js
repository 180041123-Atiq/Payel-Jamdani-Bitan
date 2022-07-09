import { Component } from "react";
import '../css/Admin.css'
import appWithFirebase from "./components/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL,deleteObject} from 'firebase/storage'
import {getFirestore,collection,addDoc,getDocs,deleteDoc,doc} from 'firebase/firestore'
import Orders from "./components/Orders";

const storage = getStorage(appWithFirebase)
const db = getFirestore(appWithFirebase)

class Admin extends Component{

    constructor(props){
        super(props)

        this.state = {
            pid:'',
            pname:'',
            pdesc:'',
            pprice:'',
            imgSrc : null,
            imgFile: null,
            msg:'Add Product',
            did:'',
            dmsg:'Delete Product',
            cdb:[],
        }

        this.handleDeleteInput = this.handleDeleteInput.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.changeOnImgToUpload = this.changeOnImgToUpload.bind(this)
        this.handleId = this.handleId.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleDesc = this.handleDesc.bind(this)
        this.handlePrice = this.handlePrice.bind(this)
        this.handleDownImage = this.handleDownImage.bind(this)
        this.handleUpImage = this.handleUpImage.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    // async componentDidMount(){
    //     let querySnapshot = await getDocs(collection(db,'customers'))
    //     querySnapshot.forEach((doc) => {
    //         let arr = this.state.cdb
    //         arr.push({...doc.data(),docid:doc.id})
    //         this.setState({
    //             cdb:arr,
    //         })
    //     })
    // }

    handleDeleteInput(e){
        this.setState({
            did:e.target.value,
            dmsg:'Delete Product',
        })
    }

    async handleDelete(){

        let querySnapshot = await getDocs(collection(db,'products'))
        let objarr = []

        querySnapshot.forEach((doc) => {
            objarr.push({...doc.data(),docid:doc.id})
        })

        if(objarr.find(o => o.pid === this.state.did) === undefined){
            this.setState({
                dmsg:'Invalid ID',
            })

            return 
        }

        try
        {
            let docid
            objarr.forEach((obj) => {
                if(obj.pid === this.state.did){
                    docid = obj.docid
                    return 
                }
            })

            await deleteDoc(doc(db,'products',docid))

            deleteObject(ref(storage,this.state.did)).then(() => {
                
                this.setState({
                    dmsg:'Deleted',
                })

            }).catch(e => {
                this.setState({
                    dmsg:'error',
                })
            })

        } catch(e) {
            this.setState({
                dmsg:'error',
            })
        }

    }

    changeOnImgToUpload(e){
        if(e.target.files && e.target.files[0] && this.state.pid !== '') {
            
            this.setState({
                imgFile:e.target.files[0],
            })
            
        }
        else if(this.state.pid === '' ){
            this.setState({
                msg:'Set ID First',
            })
        }
    }

    handleId(e){
        this.setState({
            pid:e.target.value,
            msg:'Add Product',
        })
    }
    
    handleName(e){
        this.setState({
            pname:e.target.value,
            msg:'Add Product',
        })
    }

    handleDesc(e){
        this.setState({
            pdesc:e.target.value,
            msg:'Add Product',
        })
    }

    handlePrice(e){
        this.setState({
            pprice:e.target.value,
            msg:'Add Product',
        })
    }

    handleUpImage(){
        uploadBytes(ref(storage,this.state.pid),this.state.imgFile).then((snapShot) => {
            
            this.setState({
                msg:'Image Uploading Complete',
            })
        }).catch((e) => {
            console.log('Error while uploading')
        })
    }

    handleDownImage(){
        getDownloadURL(ref(storage,this.state.pid))
        .then((url) => {
            this.setState({
                imgSrc:url,
                msg:'Image downloading done',
            })
            
        })
        .catch((e) => {
            console.log('Error while getting DownloadURL : ',e)
        })
    }

    async handleAdd(){

        let querySnapshot = await getDocs(collection(db,'products'))
        let objarr = []

        querySnapshot.forEach((doc) => {
            objarr.push({...doc.data(),docid:doc.id})
        })
        
        if(objarr.find(o => o.pid === this.state.pid) !== undefined){
            this.setState({
                msg:'You have to give unique ID',
            })
            return
        }

        if(this.state.pid !== '' && this.state.pname !== '' && this.state.pdesc !== '' && this.state.pprice !== '' && this.state.imgSrc !== null ){
            try{
                let docRef = await addDoc(collection(db,'products'),{
                    pid:this.state.pid,
                    pname:this.state.pname,
                    pdesc:this.state.pdesc,
                    pprice:this.state.pprice,
                    imgSrc:this.state.imgSrc,
                })

                this.setState({
                    pid:'',
                    pname:'',
                    pdesc:'',
                    pprice:'',
                    msg:'Product added',
                })

                //console.log("Document Written with ID : ",docRef.id)
                
            } catch(e) {
                console.error("Error while adding document : ",e)
            }

        } else {
            this.setState({
                msg:'You have to give all the info'
            })
        }
    }

    render(){
        return (
            <div className="aContainer">
                <div className="deleteField">
                <h3 className="deleteTitle" >{this.state.dmsg}</h3>
                    <input
                        className="deleteInput"
                        onChange={this.handleDeleteInput} 
                        placeholder="ID of the product you want to delete"
                    />
                    <div className="deleteButton" onClick={this.handleDelete}>Delete</div>
                </div>
                <h3 className="addTitle" >{this.state.msg}</h3>
                <input className='inputField' onChange={this.handleId} value={this.state.pid} placeholder="ID"/>
                <input className='inputField' onChange={this.handleName} value={this.state.pname} placeholder="Name"/>
                <div><textarea className='tField' onChange={this.handleDesc} value={this.state.pdesc} placeholder="Description"/></div>
                <input className='inputField' onChange={this.handlePrice} value={this.state.pprice} placeholder="Price"/>
                <div className="inputImage">
                    <input type='file' onChange={this.changeOnImgToUpload} accept=".jpg, .jpeg, .png" />
                </div>
                <img className='imageField' src={this.state.imgSrc} />
                <button className='addButton' onClick={this.handleUpImage} >Up Image</button>
                <button className='addButton' onClick={this.handleDownImage} >Down Image</button>
                <button className="addButton" onClick={this.handleAdd}>add</button>
                <div>
                    <Orders/>
                </div>
            </div>
        )
    }
}

export default Admin 