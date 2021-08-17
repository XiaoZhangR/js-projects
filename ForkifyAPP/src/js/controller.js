import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try{
    const id = window.location.hash.slice(1);
    // console.log(id);

    if(!id) return;

    recipeView.renderSpinner();
    
    // 1. Loading recipe
    await model.loadRecipe(id);//this is a async function, it manipulated data in state

    // 2. Rendering recipe 
    recipeView.render(model.state.recipe);
      
    
  } catch(err) {
    recipeView.renderError();
  }
};


// this function excutes right in the begining when page loads
// we need to listen to some event(form submit/click button), then only on that event we want to call this function
const controlSearchResults = async function() {
  try{
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1. Get search query
    const query = searchView.getQuery();
    if(!query) return;
    // console.log(query);

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Rendering search results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();