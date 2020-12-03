
let initialState = {
    query: "",
    sortBy: "",
    filter: ""
}

const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SUBMIT_QUERY' :
            let searchQuery = action.payload;
            console.log(searchQuery);
            return {
                ...state,
                query: searchQuery
            }
        case 'SUBMIT_SORTBY' :
            let sortBy = action.payload;
            console.log(sortBy);
            return {
                ...state,
                sortBy
            }
        case 'SUBMIT_FILTER' :
            let filter = action.payload;
            console.log(filter);
            return {
                ...state,
                filter
            }
        case 'SUBMIT_SEARCH' :
            let search = action.payload;
            console.log(JSON.stringify(search));
            return {
                ...state,
                ...search
            };
        default: return state
    }
}

export default searchReducer;