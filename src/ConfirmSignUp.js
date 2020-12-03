import React from 'react'
import Button from './Button'

const ConfirmSignUp = (props) => {
    return (
        <div>
            <input 
                name='confirmationCode'
                placeholder='Confirmation Code'
                onChange={e => {e.persist(); props.updateFormState(e)}}
            />
            <Button onClick={props.confirmSignUp}>Confirm Sign Up</Button>         
        </div>
    );
}

export default ConfirmSignUp