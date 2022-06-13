import React,{Component} from 'react';

import ListingDisplay from './ListingDisplay';
import axios from 'axios';
import './listing.css';
import CostFilter from '../filter/costFilter';
import CuisineFilter from '../filter/cuisineFilter';
import SortFilter from '../filter/sortFilter';
import Header from '../../Header';

const restUrl="https://edu-zomato-project-api.herokuapp.com/restaurants?mealtype_id=";


class Listing extends Component {
    constructor(props){
        super(props);
        this.state={
            restaurantList:''
        };
    }
    setDataPerFilter = (data) => {
        this.setState({restaurantList:data})
    }
    
    render(){
     
        return (
        <>
        <Header />
             <div className="row">
                    <div id="mainListing">
                        <div id="filter">
                            <center>
                                <h3>Filter</h3>
                            </center>
                           <CuisineFilter mealId={this.props.match.params.mealId} restPerCuisine={(data)=>{this.setDataPerFilter(data)}} / >
                            <CostFilter  mealId={this.props.match.params.mealId} restPerCost={(data) => {this.setDataPerFilter(data)}}/>
                            <SortFilter mealId={this.props.match.params.mealId} restPerSort={(data)=>{this.setDataPerFilter(data)}} />
                        </div>
                        <ListingDisplay listData={this.state.restaurantList}/>
                    </div>
            </div>
        </>
        )
    }
    componentDidMount(){
        let mealid =  this.props.match.params.mealId;
        // sessionStorage.setItem('mealId',mealid)
        axios.get(`${restUrl}${mealid}`)
        .then((res) => {this.setState({restaurantList:res.data})})
    }

}

export default Listing;



