import { API_URL } from "./config.js";
import { getJson } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
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
