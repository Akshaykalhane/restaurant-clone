import React, { Component } from "react";
import './placeOrder.css';
import Header from '../../Header';

const url = "https://edu-zomato-project-api.herokuapp.com/menuItem";
// let postData = "http://localhost:8700/orders";
let postData = "https://edu-zomato-project-api.herokuapp.com/placeOrder";

class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        let userData = sessionStorage.getItem('userInfo')

        this.state = {
            id: Math.floor(Math.random() * 100000),
            hotel_name: this.props.match.params.restName,
            name: userData? userData.split(',')[0]:'',
            email:userData? userData.split(',')[1]:'',
            cost:0,
            phone:userData? userData.split(',')[2]:'',
            address: 'savarkar street',
            // message: '',
            menuItem: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    checkout = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu')
        fetch(postData, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            // .then(this.props.history.push('/viewBooking'))
            .then(console.log('order taken'))
    }

    renderMenu = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <div className="orderItems" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name} />
                        <p className="heading">{item.menu_name}</p>
                        <p className="costhead">Rs. {item.menu_price}</p>
                    </div>
                )
            })
        }
    }

    render() {
        if (sessionStorage.getItem('loginStatus') === 'loggedOut') {
            return (
                <>
                    <Header />
                    <center>
                        <h2>Login First To Place Order</h2>
                    </center>
                </>
            )
        }


        return (
            <>
                <Header />
                <div className="container">
                    <hr />
                    <div className="panel ">
                        <div className="panel-heading">
                            <h3>Your Order from Restaurant{this.props.match.params.restName}</h3>
                        </div>
                        <div className="panel-body">

                        <form action="https://developerpayment.herokuapp.com/paynow" method="POST">

                                <input type="hidden" name="cost" value={this.state.cost}/>
                                <input type="hidden" name="id" value={this.state.id}/>
                                <input type="hidden" name="hotel_name" value={this.state.hotel_name}/>


                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label for="fname">Name</label>
                                        <input id="fname" name="name" value={this.state.name} className="form-control" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="email">Email</label>
                                        <input id="email" name="email" value={this.state.email} className="form-control" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="phone">Phone</label>
                                        <input id="phone" name="phone" value={this.state.phone} className="form-control" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="address">Address</label>
                                        <input name="address" id="address" className="form-control" value={this.state.address} onChange={this.handleChange} />
                                    </div>
                                    {/* <div className="form-group col-md-9">
                                        <p>Any extra Tips:</p>
                                        <textarea name="message" id="address" rows="5" className="form-control" value={this.state.message} onChange={this.handleChange}></textarea>
                                    </div> */}
                                </div>
                                {this.renderMenu(this.state.menuItem)}
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Total Price is Rs. {this.state.cost}</h2>
                                    </div>
                                </div>
                                <button className="btn btn-info" onClick={this.checkout} type="submit">Place Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        let menuItem = sessionStorage.getItem('menu');
        let orderId = [];
        menuItem.split(',').map((item) => {
            orderId.push(parseInt(item));
            return 'ok'
        })
        fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderId)
        })
            .then((res) => res.json())
            .then((data) => {
                let totalPrice = 0;
                data.map((item) => {
                    totalPrice += parseFloat(item.menu_price)
                    return 'ok'
                })
                this.setState({ cost: totalPrice, menuItem: data })
            })
    }

}

export default PlaceOrder;