import React , {Component} from "react";
import axios from "axios";


const url="https://edu-zomato-project-api.herokuapp.com/filter";

class SortFilter extends Component{
    filterSort=(event)=>{
        let mealId=this.props.mealId;
        let cuisineId=event.target.value;
        let cuisineUrl="";
        if(cuisineId===""){
            cuisineUrl=`${url}/${mealId}`
        }
        else{
            cuisineUrl=`${url}/${mealId}?cuisine=${cuisineId}`
        }
        axios.get(cuisineUrl)
        .then((res)=>{this.props.restPerSort(res.data)})
    }
    render(){
        return(
            <>
                <center>Sort Filter</center>
                <div style={{marginLeft:'15%'}} onChange={this.filterSort}>
                <label className="radio">
                        <input type="radio" value="" name="cuisine"/>Low To High
                    </label>
                    <label className="radio">
                        <input type="radio" value="1" name="cuisine"/>High To Low
                    </label>
                </div>
            </>
        )
    }
}

export default SortFilter;