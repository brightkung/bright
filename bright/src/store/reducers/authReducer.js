const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'EDIT_ERROR':
            console.log('edit error')
            return{
                ...state,
                authError: 'edit failed'
            }
        case 'EDIT_SUCCESS':
            console.log('edit sucess')
            return{
                ...state,
                authError: null
            }

        case 'LOGIN_ERROR':
            console.log('login error')
            return{
                ...state,
                authError: 'Login failed'
            }

        case 'LOGIN_SUCCESS':
            console.log('login sucess')
            return{
                ...state,
                authError: null
            }

        case 'SIGNOUT_SUCCESS':
            console.log('signout success')
            return state

        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return{
                ...state,
                authError: action.err.message
            }
            
        default: 
        return state

    }
    
}

export default authReducer