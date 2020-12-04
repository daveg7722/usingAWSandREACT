import React, {useState, useEffect, useCallback} from 'react'
import {Auth} from 'aws-amplify'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ConfirmSignUp from './ConfirmSignUp'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordSubmit from './ForgotPasswordSubmit'

import {Route, Link, useRouteMatch, Switch, Redirect, useLocation, useHistory} from 'react-router-dom';

async function signIn({username, password}, setUserInfo) {
    try {
        console.log("Signing up with username - " + username);
        const user = await Auth.signIn(username, password);
        const userInfo = {username: user.username, ...user.attributes}
        setUserInfo(userInfo)

    } catch (err) {
        console.log(err);
        setUserInfo(null)
    }
}

// async function signUp({username, password, email}, updateFormType) {
//     try {
//         await Auth.signUp({
//             username, password, attributes: {email}
//         });
//     } catch (err) {
//         console.log('error signing up...', err)
//     }
// }

// async function confirmSignUp({username, confirmationCode}, updateFormType) {
//     try {
//         await Auth.confirmSignUp(username, confirmationCode);
//     } catch (err) {
//         console.log("Error signing up! ", err)
//     }
// }

// async function forgotPassword({username}, updateFormType) {
//     try {
//         await Auth.forgotPassword(username);
//     } catch (err) {
//         console.log('error submitting username to reset password...', err)
//     }
// }

// async function forgotPasswordSubmit({ username, confirmationCode, password}, updateFormType) {
//     try {
//         await Auth.forgotPasswordSubmit(username, confirmationCode, password)
//     } catch (err) {
//         console.log('error updating password...:', err)
//     }
// }

const initialFormState = {
    username: '', password: '', email: '', confirmationCode: ''
}

const Form = ({setUserInfo}) => {
    const {url, path} = useRouteMatch();
    const {pathname} = useLocation();
    const [formType, updateFormType] = useState('signin')
    const [formState, updateFormState] = useState(initialFormState)
    let history = useHistory();

    const signUp = useCallback(async ({username, password, email}) => {
        try {
            await Auth.signUp({
                username, password, attributes: {email}
            });
            history.push("confirmsignup");
        } catch (err) {
            console.log('error signing up...', err)
        }
    }, [history])

    const confirmSignUp = useCallback(async({username, confirmationCode}) => {
            try {
                await Auth.confirmSignUp(username, confirmationCode);
                history.push('signin');
            } catch (err) {
                console.log("Error signing up! ", err)
            }
    }, [history]);

    const forgotPassword = useCallback( async ({username}) => {
        try {
            await Auth.forgotPassword(username);
            history.push('forgotpasswordsubmit')
        } catch (err) {
            console.log('error submitting username to reset password...', err)
        }
    }, [history]);
    
    const forgotPasswordSubmit = useCallback(async ({ username, confirmationCode, password}) => {
        try {
            await Auth.forgotPasswordSubmit(username, confirmationCode, password)
            history.push('signin');
        } catch (err) {
            console.log('error updating password...:', err)
        }
    }, [history]);

    useEffect(()=>{
        console.log("in effect")
        let newFormType = pathname.substring(9, pathname.length);
        console.log("form type is now " + newFormType);
        updateFormType(newFormType)
    }, [pathname])


    function updateForm(event) {
        const newFormState = {
            ...formState, [event.target.name] : event.target.value
        }
        updateFormState(newFormState)
    }  
   
   
    return (
        <>  
            <Switch>
                <Route exact path={`${url}/signin`}>
                    <SignIn 
                        signIn={() => signIn(formState, setUserInfo)}
                        updateFormState={e=> updateForm(e)}
                    />
                </Route>
                <Route  path={`${url}/signup`}>
                    <SignUp
                        signUp={()=> signUp(formState)}
                        updateFormState={e=> updateForm(e)}
                    /> 
                </Route>
                <Route  path={`${url}/confirmsignup`}>
                    <ConfirmSignUp
                        confirmSignUp={()=>confirmSignUp(formState)}
                        updateFormState={e=> updateForm(e)}
                    />    
                </Route>
                  
                <Route  path={`${url}/forgotpassword`}>        
                    <ForgotPassword
                        forgotPassword={() => forgotPassword(formState)}
                        updateFormState={e => updateForm(e)}
                    />
                </Route>  
                <Route  path={`${url}/forgotpasswordsubmit`}>
                    <ForgotPasswordSubmit
                        forgotPasswordSubmit={() => forgotPasswordSubmit(formState)}
                        updateFormState={e => updateForm(e)}
                    />
                 </Route>  
                 <Route path={`${url}`}>
                    <Redirect to={{pathname:"/profile/signin"}}/>
                 </Route>                  
            </Switch>
            {
                formType === 'signup' && (
                    <p >
                        Already have an account? 
                        <Link to={`${path}/signin`}
                           //onClick={() => updateFormType('signin')}
                        > Sign In</Link>
                    </p>
                )
            }
            {
                formType ==='signin' && (
                    <div>
                        <p >
                            Need an account? <Link to={`${path}/signup`}
                                //onClick={()=> updateFormType('signup')}
                            > Sign Up</Link>
                        </p>
                        <p >
                            Forget your password? <Link to={`${path}/forgotpassword`}
                               // onClick={() => updateFormType('forgotpassword')}
                            > Reset Password</Link>
                        </p>
                    </div>
                )
            }
        </>
    )
}

const styles = {
    container: {

    },
    input: {

    }
}

export { styles, Form as default}

// const renderForm = () => {
//     switch(formType) {
//         case 'signUp':
//             return (
//                 <SignUp
//                     signUp={()=> signUp(formState, updateFormType)}
//                     updateFormState={e=> updateForm(e)}
//                 />    
//             )
//         case 'confirmSignUp':
//             return (
//                 <ConfirmSignUp
//                     confirmSignUp={()=>confirmSignUp(formState, updateFormType)}
//                     updateFormState={e=> updateForm(e)}
//                 />    
//             )
//         case 'signIn':
//             return (
//                 <SignIn 
//                     signIn={() => signIn(formState, props.setUser)}
//                     updateFormState={e=> updateForm(e)}
//                 />
//             )
//         case 'forgotPassword':
//             return (
//                 <ForgotPassword
//                     forgotPassword={() => forgotPassword(formState, updateFormType)}
//                     updateFormState={e => updateForm(e)}
//                 />
//             )
//         case 'forgotPasswordSubmit':
//             return (
//                 <ForgotPasswordSubmit
//                     forgotPasswordSubmit={() => forgotPasswordSubmit(formState, updateFormType)}
//                     updateFormState={e => updateForm(e)}
//                 />
//             )
//             default: return null;
//     }
// }