import React,{Component} from 'react';
import './quicksearch.css';
import QuickDisplay from './QuickDisplay';

const url ="https://edu-zomato-project-api.herokuapp.com/mealtype"

class QuickSearch extends Component {
    constructor(){
        super()

        this.state={
            mealType:''
        }
    }

    render(){
        return(
            <>
                <div className="quickSearch">
                    <span id="QuickSearchHeading">
                        QuickSearch
                    </span>
                    <span id="QuickSubHeading">
                        Find Restaurants By MealType
                    </span>
                    <QuickDisplay mealData={this.state.mealType}/>
                </div>
            </>
        )
    }

    //api on pageLoad 
    componentDidMount(){
        fetch(url,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({mealType:data})
        })
    }
}

export default QuickSearch;