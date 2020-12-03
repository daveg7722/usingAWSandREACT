import React, {useEffect, useCallback} from 'react'
import {Auth} from 'aws-amplify'
import {useHistory} from 'react-router-dom'

const protectedRoute = (Comp, route ='/profile') => (props) => {
    
    const history = useHistory();
    
    const checkAuthState = useCallback(async() => {
        try {
            await Auth.currentAuthenticatedUser()
        } catch (err) {
            history.push(route)
        }
    }, [history])

    useEffect (() => {
        checkAuthState()
    }, [checkAuthState])
    return <Comp {...props} />
    
}

export default protectedRoute