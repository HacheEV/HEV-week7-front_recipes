import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/home';
import RecipesList from './pages/recipes/list';
import Recipe from './pages/recipes/recipe';
import Header from './pages/header/index.js';
import NewRecipe from './pages/recipes/newRecipe';
import EditRecipe from './pages/recipes/edit';

function App() {
  return (
   <Router>
     <Header />
     <Switch>
     <Route path="/recipes/:id/edit">
        <EditRecipe /> 
      </Route>
     <Route path="/recipes/create">
         <NewRecipe />
      </Route>
      <Route path="/recipes/:id">
         <Recipe />
      </Route>
      <Route path="/recipes" exact>
         <RecipesList />
         
      </Route>
      <Route path="/">
        <Home/>
      </Route>

     </Switch>

   </Router>
  );
}

export default App;
