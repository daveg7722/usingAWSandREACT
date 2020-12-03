import React from 'react'
import Button from './Button'

const ForgotPasswordSubmit = (props) => {
    const style = {
        input: {
            marginBottom:'2%', width:'35%', 
            height:'8%', 
            border:'1px solid black'
        }
    }
    return (
        <>
            <input style={style.input}
                name="confirmationCode"
                placeholder="Confmration Code"
                onChange={e => {e.persist(); props.updateFormState(e)}}
            />
            <input style={style.input}
                name="password"
                placeholder="New Password"
                type='password'
                onChange={e => {e.persist(); props.updateFormState(e)}}
            />
            <Button onClick={props.forgotPasswordSubmit}>Save new password</Button>
        </>
    );
}

export default ForgotPasswordSubmit