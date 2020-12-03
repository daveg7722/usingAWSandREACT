import React from 'react'
import Button from './Button'

const SignIn = ({signIn, updateFormState}) => {
    
    return (
        <>
            <input 
                style={{marginBottom:'2%', width:'35%', height:'8%', border:'1px solid black'}}
                name='username'
                onChange={e => {e.persist(); updateFormState(e)}}
                placeholder='username'            
            />
            <input 
                style={{marginBottom:'2%', width:'35%', height:'8%', border:'1px solid black'}}
                type='password'
                name='password'
                onChange={e => {e.persist(); updateFormState(e)}}
                placeholder="password"
            />
            <Button style={{ border:'1px solid black'}} onClick={signIn}>Sign In</Button>
            
                    {/* <p >
                        Already have an account? 
                        <Link to={`${path}/signin`}
                        > Sign In</Link>
                    </p>
                    <div>
                        <p >
                            Need an account? <Link to={`${path}/signup`}
                            > Sign Up</Link>
                        </p>
                        <p >
                            Forget your password? <Link to={`${path}/forgotpassword`}
                            > Reset Password</Link>
                        </p>
                    </div> */}
        </>
    );
}

export default SignIn