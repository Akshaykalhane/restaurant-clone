import React, { Component } from "react"

class MenuDisplay extends Component {
    orderId = [];

    addItems=(id)=>{
        this.orderId.push(id)
        this.props.finalOrder(this.orderId)
    }

    removeItems=(id)=>{
        if(this.orderId.indexOf(id)>-1){
            this.orderId.splice(this.orderId.indexOf(id),1)
            console.log('item remove', this.orderId.splice(this.orderId.indexOf(id),0))
        }
        this.props.finalOrder(this.orderId)
    }

    renderCart=(orders)=>{
        if(orders){
            return orders.map((item,index)=>{
                return(
                <b key={index}>{item} &nbsp; &nbsp;</b>
                )
            })
        }
    }


    renderMenu = ({menuData}) => {
        if(menuData){
            return menuData.map((item) => {
                return(
                    <div key={item.menu_id} >
                        <div className="row" style={{marginTop:'2%'}}>
                            <div className="col-md-7">
                                <b>{item.menu_id}. </b>
                                <img src={item.menu_image} alt={item.menu_name} style={{width:80, height:80}}  className="image" />
                                &nbsp; {item.menu_name}- Rs.{item.menu_price}
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-success"
                                onClick={() => {this.addItems(item.menu_id)}}>ADD &nbsp;
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button> &nbsp;
                                <button className="btn btn-danger"
                                onClick={() => {this.removeItems(item.menu_id)}}>REMOVE &nbsp;
                                    <span className="glyphicon glyphicon-minus"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return(
            <>
                <div className="col-md-12 bg-success">
                    <h1>Item Added</h1>
                    Item Number {this.renderCart(this.orderId)} Added
                </div>
                <div className="col-md-12 bg-info">
                    {this.renderMenu(this.props)}
                </div>
            </>
        )
    }
}

export default MenuDisplay

