import {useParams, Link,useHistory} from "react-router-dom";
import {UseRecipe, editRecipe} from '../../../api';
import {useEffect, useState} from 'react';
import './editRecipe.css';


const EditRecipe = () => {
    //importar datos de la receta
    const {id} = useParams();
    const recipe = UseRecipe(id);

    const [title, setTitle] = useState();
    const [keywords, setKeywords] = useState();
    
    const [waiting, setWaiting] = useState(false);
    const history = useHistory();
    const editedRecipe = editRecipe(id);

    const handleUpdate = (id) => {
        setWaiting(true);
        editedRecipe({
            title, 
            keywords: keywords.split(","),
        }).then(response => history.push('/recipes'))
    }
    useEffect(() => {
        if(recipe){
            setTitle(recipe.title);
            setKeywords(recipe.keywords.join(','));
        }
       
    }, [recipe])
    
    return(
        <div>
            <div>
                <h3>New Recipe</h3>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title}/>
                <input type="text" onChange={e => setKeywords(e.target.value)} value={keywords}/>
                <button onClick={handleUpdate} disabled={waiting}> 
                    {waiting ? "Please wait": "Update"} 
                    </button>
            
            </div>
            
            <Link to="/recipes">
                <button>Back</button>
            </Link>
           <Link to="/">
                <button>Home</button>
            </Link>
           
        </div>
    )
}
export default EditRecipe;