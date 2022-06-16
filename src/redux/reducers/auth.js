import { SETH_AUTH, REMOVE_AUTH, UPDATE_LOGIN_INPUT_SUCCESS, UPDATE_LOGIN_INPUT_ERROR } from '../actions/auth'

const INITIAL_STATE = {
    user: null,
    loginForm:{
        phoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true},
        password: {
            value: '', 
            validationType: "validateText",
            validation: false, //password is not needed now
            required: false
        }
    }
}

export default function auth(state = INITIAL_STATE, action) {

    switch (action.type) {
        case SETH_AUTH:
            return {
                ...state,
                user: action.payload.data
            }
        case UPDATE_LOGIN_INPUT_SUCCESS:
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    [action.inputName]: action.payload
                }
            }
        case UPDATE_LOGIN_INPUT_ERROR:
            return {
                ...state,
                loginForm: { ...state.orderForm, 
                    [action.inputName]: action.payload
                }
            }
        case REMOVE_AUTH:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}