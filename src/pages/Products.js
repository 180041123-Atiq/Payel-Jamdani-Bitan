import { Component } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import '../css/Products.css'

class Products extends Component {

    constructor(props){
        super(props)

        this.handleDebug = this.handleDebug.bind(this)
    }

    handleDebug(){
        console.log(this.props.pidx)
    }

    render() {

        return (
            <div className='pContainer'>
                <h3 className='ptitle'>Product ID : {this.props.pobj.pid}</h3>
                <div className='imgField'>
                    <TransformWrapper>
                        <TransformComponent>
                            <img className='imgHolder' src={this.props.pobj.imgSrc} alt="test" />
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className='pinfoField'>
                    <h3>{this.props.pobj.pname}</h3>
                    <p>{this.props.pobj.pdesc}</p>
                    <h3>{this.props.pobj.pprice} TK</h3>
                </div>
                <div>
                    <button onClick={() => {this.props.goToPurchase(this.props.pobj)}} className='debug'>Purchase</button>
                </div>
            </div>
        )
    }
}

export default Products