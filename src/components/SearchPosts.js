import React, {useState, useEffect, useReducer, useRef} from 'react';
import {connect} from 'react-redux';

import * as classes from '../css/SearchPosts.module.css'
import BeginsWith from './BeginsWith';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

import { /*submitQuery, submitSortBy, submitFilter,*/ submitSearch} from '.././store/actions';

const initialState = {
    query: "",
    sortBy: "",
    filter: ""
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SUBMIT_QUERY' :
            let query = action.payload;
            console.log(query);
            return {
                ...state,
                query
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
        case 'RESET' :
            return initialState;
        default: return state
    }
}

const SearchPosts = props => {

    // const [query, setQuery] = useState("");
    // const [sortState, setSortState] = useState("");
    const sortRef = useRef({value:""});

    const [search, setSearch] = useReducer(reducer, initialState)
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setError(null);
        setReset(false);
    }, [reset])

    const onChangeQueryHandler = (event) => {
        //setQuery(event.target.value);
        setSearch({type: 'SUBMIT_QUERY', payload: event.target.value});
    }

    const resetForm = () => {
        // setQuery("");
        sortRef.current.value = "";
        // setSortState("");
        setReset(true);
        setSearch({type: 'RESET'});
    }

    const setFilter = (letter) => {
        console.log("in search posts " + letter)
        setSearch({type: 'SUBMIT_FILTER', payload: letter})
    }

    const onChangeSelecthandler = (event) => {
        if (event.target.value === "") setSearch({type: 'SUBMIT_FILTER', payload: ""});
        setSearch({
            type: 'SUBMIT_SORTBY',
            payload: event.target.value
        })
    }

    const onClickSearchHandler = () => {
        switch (search.sortBy) {
            case 'postTitle' : 
                if (search.query !== "" && search.filter === "") {
                    props.submitSearch(search); 
                    setError(null);
                } else {
                    setError("*Please enter your search query");
                }
                break;
            case 'postOwnerUsername' :
                if(search.query !== "" && search.filter !== "") {
                    props.submitSearch(search);
                    setError(null);
                } else {
                    setError("*Please enter both a search query and a filter");
                }                
                break;
            default: 
                setError("*All fields are required");
                break;
        }
    }

    return(
        <>
            <div className={classes.search} >
                <input className={classes.input} onChange={onChangeQueryHandler}
                    type="text"
                    value={search.query}
                    />

                <button className={classes.button}  onClick={onClickSearchHandler}>
                    {props.viewWidth < 800 ?  <FontAwesomeIcon icon={faSearch} /> : "Search"}
                </button>
                <select ref={sortRef} className={classes.dropDown} onChange={onChangeSelecthandler}>
                    <option value="">--sort by--</option>
                    <option value="postTitle">title</option>
                    <option value="postOwnerUsername">user</option>
                </select>
                {(search.query !== "" || search.sortBy !== "" || search.filter !== "") && <div className={classes.reset} onClick={resetForm}>
                        <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: '2.5em', color: 'gray', backgroundColor:'white'}} />
                    </div>}
                {search.sortBy === "postOwnerUsername" && <BeginsWith setFilter={setFilter} close={reset} />}
            </div>
            {error && <div className={classes.error}><p className={classes.errorMessage}>{error}</p></div>}
        </>
    )
};

// const fromState = state => {
//     return {
//         query: state.query
//     };
// };

const toState = dispatch => {
    return {
        // submitQuery: (query) => dispatch(submitQuery(query)),  //dispatch(actionCreators.incrementAge(incrementBy))
        // submitSortBy: (sortBy) => dispatch(submitSortBy(sortBy)),
        // submitFilter: (filter) => dispatch(submitFilter(filter)),
        submitSearch: (search) => dispatch(submitSearch(search))
    };
};

export default connect(null, toState)(SearchPosts);

/*
import Select from react-select

<Select ref={sortBy} className={classes.dropDown} defaultValue={{value: "", label: "--sort by--"}} 
options={[{value: "postTitle", label:"title"},{value: "postOwnerUsername", label:"user"}]}/>
*/