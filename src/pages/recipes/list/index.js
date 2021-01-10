import {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { GetRecipes, deleteRecipe, GetFilterRecipes } from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'



const RecipesItems = (props) => {

    const deleteRecipeHandler = deleteRecipe(props.id);
    const history = useHistory();
    
    const handleRemove = () => {
        deleteRecipeHandler().then(response => history.go(0));
     }
    
 
    return (<div>
        <span>{props.title}</span>
        <button onClick={handleRemove}><FontAwesomeIcon icon={faTrashAlt} /></button> 
        <Link to={'/recipes/'+props.id}>
            <button>
                Recipe
            </button>
        </Link>
       
    </div>)
    
}
const parseQuery = (queryString) => {
    var search = queryString.substring(1);
    JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
}



export default function RecipesList () {
    
  
    let recipes = GetRecipes();
       
    const history = useHistory();
    const location = useLocation();
    
    //convert to an object
    var index = location.search.indexOf("=");
    var query = location.search.substring(index+1, location.search.length);
    let values = query.split(",");
    let finalquery = JSON.stringify(values);
    
    console.log(query);
    const newRecipes = GetFilterRecipes(query);
    console.log(newRecipes);
           
  
    const searchBarKeyword = e => {
        if(e.key === 'Enter'){
            const search = e.target.value;
            const url = '/recipes?keywords='+search;
            if(search === ""){
                return history.push('/recipes');
            }
            return history.push(url);   
          
            
        }
    }
    const searchBarTitle = e => {
        if(e.key === 'Enter'){
            const search = e.target.value;
            const url = '/recipes?title='+search;
            return history.push(url);
            
        }
        
    }
   
   
    return (
        <div>
            <div>
                <div><span>Title Search Bar:  <input type="text" onKeyPress={searchBarTitle}/></span></div>
                <div><span>Keyword Search Bar:  <input type="text" onKeyPress={searchBarKeyword}/></span></div>
                <br/>
            </div>
            Recipes: {query || ""}
            <div>
                <Link to={'/recipes/create'}>
                <button>
                    Create
                </button>
                </Link>
            </div>
            
            {query ? newRecipes.map(r => <RecipesItems {...r}/>) : recipes.map(r => <RecipesItems {...r}/>)}
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    )
    
}
