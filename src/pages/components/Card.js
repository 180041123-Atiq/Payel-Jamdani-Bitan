import { Component } from "react";
import '../../css/Card.css'
import { FiArrowLeft,FiArrowRight } from "react-icons/fi";

class Card extends Component {

    constructor(props){
        super(props)

        this.state = {
            imgURL:null,
            idx:0,
        }

        this.handlePrev = this.handlePrev.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }

    handlePrev(){
        if(this.props.datadb.length > 0){
            if(this.state.idx === 0)this.setState({idx:this.props.datadb.length - 1})
            else this.setState({idx:this.state.idx - 1})
        }
    }

    handleNext(){
        if(this.props.datadb.length > 0){
            this.setState({
                idx:(this.state.idx+1)%this.props.datadb.length,
            })
        }
    }

    render(){
        return (
            <div className="Container" >
                <div className="controlPanel" >
                    <button onClick={this.handlePrev} className="controls"><FiArrowLeft/></button>
                    <button onClick={() => {this.props.getFullView(this.props.datadb[this.state.idx])}} className="controls">Get Full View</button>
                    <button onClick={this.handleNext} className="controls"><FiArrowRight/></button>
                </div>
                <div className="infoField">
                    <h3>Product ID : {this.props.datadb.length > 0 ? this.props.datadb[this.state.idx].pid : "Nothing To Show Yet" }</h3>
                    <h3>Price : {this.props.datadb.length > 0 ? this.props.datadb[this.state.idx].pprice : "Nothing To Show Yet" } TK</h3>
                </div>
                <div className="imageField">
                    <img className="imgHolder" src={this.props.datadb.length > 0 ? this.props.datadb[this.state.idx].imgSrc : null}/>
                </div>
            </div>
        )
    }
}

export default Card