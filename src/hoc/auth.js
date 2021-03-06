import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    console.log('reload', reload);
                    if (reload) {
                        props.history.push('/login')
                    }
                }else {
                    // admin
                    if (adminRoute && !response.payload.data.role === 1) {
                        props.history.push('/');
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/');
                        }
                    }
                }
            })
            
        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


