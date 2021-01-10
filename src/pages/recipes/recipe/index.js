import {useParams, Link,useHistory} from "react-router-dom";
import {UseRecipe, deleteRecipe} from '../../../api';
import './recipe.css';



const GoBack = () => {
    const history = useHistory(); 
    return(
       <button onClick={history.goBack}>Back!</button>
    )
}


export default function Recipe (){
    
    const { id } = useParams();

    const recipe = UseRecipe(id);
    const history = useHistory();
    const deleteRecipeHandler = deleteRecipe(id);
    
     if(!recipe){
         return <h2>Loading the recipe...wait please</h2>
     }
     const handleRemove = () => {
        deleteRecipeHandler().then(response => history.push('/recipes'));
     }
    const url = `/recipes/${recipe.id}/edit`
    return(
        <div>
            <div>
            <h3>Recipe: {recipe.title}</h3>
            <Link to={url}>
                <button>Edit recipe</button>
            </Link>  
            <h4>Keywords: {recipe.keywords.map(keyword => <span>"{keyword}" </span>)}</h4>
                    
            <img className="photo" src={recipe.photo} />
            </div>
            
           <GoBack />
           <Link to="/">
                <button>Home</button>
            </Link>
            <button onClick={handleRemove}> Delete </button>
        </div>
    )
}