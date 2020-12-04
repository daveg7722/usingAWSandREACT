import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {setUser, removeUser} from './store/userActions'
import Button from './Button'
import {Auth, Hub} from 'aws-amplify'
import Container from './Container'
import Form from './Form'
import protectedRoute from './protectedRoute'
import * as classes from './Container.module.css'

import {useHistory} from 'react-router-dom'
//import { propStyle } from 'aws-amplify-react';



const Profile = (props) => {
    const {setUser} = props;
    let history = useHistory();    
    

    useEffect(()=> {
        console.log(props.username);
        if(props.username === "")
        {
        (async () => {
            try {
                const data = await Auth.currentUserPoolUser()
                const userInfo = { username: data.username, ...data.attributes}
                const user = {
                    id: userInfo.sub,
                    username: userInfo.username,
                    phone_number: userInfo.phone_number,
                    email: userInfo.email
                }
                setUser(user);
                console.log("Loading in user " + JSON.stringify(userInfo));
            } catch (err) { 
                console.log('in catch of check user')
            }
        })();
        }
        Hub.listen('auth', (data) => {
            const {payload} = data
            if(payload.event === 'signOut'){
                console.log("Signed out, heard from the HUB!")
            }
        })
    }, [setUser, props.username])
    

    async function signOut() {
        await Auth.signOut().catch(err => console.log('error signing out: ', err))
        props.removeUser();
        console.log("signing out")
    }
    const setUserInfo = (userInfo) => {
        const user = {
            id: userInfo.sub,
            username: userInfo.username,
            phone_number: userInfo.phone_number,
            email: userInfo.email
        }
        setUser(user);
        history.push('/profile')
    }
    if (props.signedIn) {
        return (
            <Container classes={classes.container}>
                <h1>Profile</h1>
                <h2>Username: {props.username}</h2>
                <h3>Email: {props.email}</h3>
                <h4>Phone: {props.phone_number}</h4>
                <Button onClick={signOut}>Sign Out</Button>
            </Container>
        );
    } else if (!props.signedIn) {
        return <Container classes={classes.container}><Form setUserInfo={setUserInfo} /></Container>
    } else {
    return <p>...loading </p>
    }

}

const fromState = state => {
    return {
        username: state.user.username,
        id: state.user.id,
        email: state.user.email,
        phone_number: state.user.phone_number,
        signedIn: state.user.signedIn
    };
};

const toState = dispatch => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        removeUser: () => dispatch(removeUser())
    };
};
export default connect(fromState, toState)(protectedRoute(Profile))


// const checkUser = async () => {
    //     console.log('in check user function')
    //     try {
    //         console.log('in try of check user')
    //         const data = await Auth.currentUserPoolUser()
    //         const userInfo = { username: data.username, ...data.attributes}
    //         const user = {
    //             id: userInfo.sub,
    //             username: userInfo.username,
    //             phone_number: userInfo.phone_number,
    //             email: userInfo.email
    //         }
    //         console.log(JSON.stringify(userInfo))
    //         setUser(user);
    //         setUserChecked(true);
    //         console.log("Loading in user " + JSON.stringify(userInfo));
    //     } catch (err) { 
    //         console.log('in catch of check user')
    //         setUserChecked(true);
    //     }
    // }