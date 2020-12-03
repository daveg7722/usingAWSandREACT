import React, {useState, useEffect} from 'react'
import * as classes from '../css/BeginsWith.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'

const BeginsWith = ({setFilter, close}) => {

    const [showAll, setShowAll] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState("-");

    useEffect(()=> {
        console.log(close)
        if(close) {
            setShowAll(false);
            setSelectedLetter("-");
        }
    }, [close])

    const onLetterClickHandler = (e) => {
        const letter = e.target.innerText;
        const element = e.target;
        element.classList.toggle(classes.itemSelected)
        setShowAll(!showAll);
        setFilter(letter);
        setSelectedLetter(letter);
    }

    const letters = [<div onClick={()=> setShowAll(!showAll)} className={classes.item}>
            <FontAwesomeIcon icon={faChevronUp} className={classes.hide} />
        </div>];

    for(let i = 65; i < 91; i++){           
        letters.push(<div className={classes.item} onClick={(e) => onLetterClickHandler(e)}>{String.fromCharCode(i)}</div>);
    }
    return (
        <>
            {showAll ? <div className={classes.grid}>
                    {letters}
                </div> : 
                <div className={classes.show} onClick={()=> setShowAll(!showAll)}>                    
                    <p className={classes.letter} >{selectedLetter}</p>
                    <FontAwesomeIcon icon={faChevronDown} style={{fontSize: '1.2em', color: 'gray', backgroundColor:'white'}} />
                </div>
            }
        </>
    );
}




export default BeginsWith;