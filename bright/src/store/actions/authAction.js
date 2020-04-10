export const signIn = (credentials) => {
    return ( dispatch , getState , {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR' , err})
        })
    }
}

export const signOut = () => {
    return( dispatch,getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type : 'SIGNOUT_SUCCESS'})
        })
    }
}

export const signUp = (newUser) => {
    return( dispatch , getState , { getFirebase , getFirestore}) => {
        const firebase =  getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            firestore.collection('Cart').doc(resp.user.uid).set({
               Cart:[],
               Count:[]
            })
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName + "  "  +newUser.lastName
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({ type : 'SIGNUP_ERROR',err})
        })
    }
}

export const createmarket = (newUser) => {
    return( dispatch , getState , { getFirebase , getFirestore}) => {
        const firebase =  getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('ShoppingCart').doc(resp.user.uid).set({
                Cart : []
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({ type : 'SIGNUP_ERROR',err})
        })
    }
}