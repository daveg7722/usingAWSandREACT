import React from 'react'
import Button from './Button'

const ForgotPassword = (props) => {
    const style = {
        input: {
            marginRight:'1%', 
            width:'50%', 
            height:'100%',
            border:'1px solid black'
        }
    }
    return (
        <div>
            <input style={style.input}
                name='username'
                placeholder='Username'
                onChange={e => {e.persist(); props.updateFormState(e)}}
            />
            <Button onClick={props.forgotPassword}>Reset password</Button>
        </div>
    );
}

export default ForgotPassword