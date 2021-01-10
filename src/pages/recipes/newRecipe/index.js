import {useParams, Link,useHistory} from "react-router-dom";
import {UseRecipe, deleteRecipe, createRecipe} from '../../../api';
import {useRef, useState} from 'react';
import './newRecipe.css';


const NewRecipe = () => {
    const [waiting, setWaiting] = useState(false);
    const history = useHistory();
    const createNewRecipe = createRecipe();
    const titleRef = useRef();
    const keywordsRef = useRef();

    const handleCreate = () => {
        setWaiting(true);
        createNewRecipe({
            title: titleRef.current.value,
            keywords: keywordsRef.current.value.split(","),
        }).then(response => history.goBack(-2))
    }
    
    return(
        <div>
            <div>
                <h3>New Recipe</h3>
                <input type="text" placeholder="Title" ref={titleRef}/>
                <input type="text" placeholder="Keywords" ref={keywordsRef} />
                <button onClick={handleCreate} disabled={waiting}> 
                    {waiting ? "Please wait": "Create"} 
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
export default NewRecipe;