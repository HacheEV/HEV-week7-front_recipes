import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

export const GetRecipes = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

            fetch('http://localhost:8000/recipes', {
            method: 'GET'
            }).then(response => response.json()).then(response => {
                setRecipes(response);
            })
       
    }, [])
    return recipes;
}
export const GetFilterRecipes = (keywords) => {

    const [recipes, setRecipes] = useState([]);
       
    useEffect(() => {

            fetch('http://localhost:8000/recipes?keywords='+keywords, {
            method: 'GET'
            }).then(response => response.json()).then(response => {
                setRecipes(response);
            })
       
    }, [])
    return recipes;
}

export const UseRecipe = (id) => {

    const [recipe, setRecipe] = useState();

    useEffect(() => {

            fetch('http://localhost:8000/recipes/'+id, {
            method: 'GET'
            }).then(response => response.json()).then(response => {
                setRecipe(response);
            })
       
    }, [id])
    return recipe;
}
export const deleteRecipe = (id) => {
  return () =>  fetch('http://localhost:8000/recipes/'+id, {
        method: 'DELETE'
        });
}

export const createRecipe = () => {
  return (body) =>  fetch('http://localhost:8000/recipes/', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
        }).then(response => response.json());
}
export const editRecipe = (id) => {
    return (body) =>  fetch('http://localhost:8000/recipes/'+id, {
          method: 'PUT',
          headers:{
              'Content-type': 'application/json'
          },
          body: JSON.stringify(body),
          }).then(response => response.json());
  }