import React from 'react'
import Button from './Button'
import {Link, useRouteMatch} from 'react-router-dom'

const SignUp = ( {updateFormState, signUp}) => {
    const {path} = useRouteMatch();

    const style = {
        input: {
            marginBottom:'2%', width:'35%', 
            height:'8%', 
            border:'1px solid black'
        }
    }
    return (
        [
            <input style={style.input}
                name='username'
                onChange={e => {e.persist(); updateFormState(e)}}
                placeholder='username'
            />,
            <input style={style.input}
                type='password' 
                name='password'
                onChange={e => {e.persist(); updateFormState(e)}}
                placeholder='password'
            />,
            <input style={style.input}
                name='email'
                onChange={e => {e.persist(); updateFormState(e)}}
                placeholder='email'
            />,
            <Button onClick={signUp}>Sign Up</Button>,
            // <p >
            //     Already have an account? 
            //     <Link to={`${path}/signin`}> 
            //         Sign In
            //     </Link>
            // </p>
        ]
    );
}

export default SignUp