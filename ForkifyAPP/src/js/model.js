import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJson } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    }
}

export const loadRecipe = async function(id) {// remember: async function will return a promise
    try {
        const data = await getJson(`${API_URL}${id}`);

        const {recipe}= data.data;
        state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        img: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        }
    } catch (err) {
        console.error(`${err} 🎃👎`);
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query; // save the passed in parameter
        const data = await getJson(`${API_URL}?search=${query}`);
        // console.log(data);
        // save search results in global var state
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                img: rec.image_url
            };
        });
    } catch (err) {
        console.error(`${err}💥💥💥`);
        throw err;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    console.log(state.recipe);

    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = newServings;
}