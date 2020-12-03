import React, {useEffect, useRef} from 'react'
import * as classes from '../css/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import {useHistory, useRouteMatch} from 'react-router-dom'

const NavBar = () => {
    let history = useHistory();
    const navRef = useRef(null)
    useEffect(()=>{
        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {                
                navRef.current.style.top = "1%";
            } else {
                navRef.current.style.top = "1%";
            }
        }
    }, [])

    return (
        <div className={classes.container}>
        <nav ref={navRef} className={classes.navbar}>
            <FontAwesomeIcon icon={faHome} size="lg" className={classes.home} onClick={() => history.push('/')}/>
             <FontAwesomeIcon icon={faUser} size="lg" className={classes.profile} onClick={() => history.push('/profile')} />
        </nav>
        </div>
    );
}

export default NavBar
