import axios from 'axios';
import { isLoading, success, error } from './status';
import { validateFields } from '../../utils/validator'

export const SETH_AUTH = "SETH_AUTH"
export const REMOVE_AUTH = "REMOVE_AUTH"
export const UPDATE_LOGIN_INPUT_SUCCESS = "UPDATE_LOGIN_INPUT_SUCCESS"
export const UPDATE_LOGIN_INPUT_ERROR = "UPDATE_LOGIN_INPUT_ERROR" 


export const updateLoginField = (inputName, input) => async (dispatch, getSTate) => {
    console.log(inputName, input)
    let validationType = input.validationType
    if(input.required && Object.getPrototypeOf(input) !== Object.prototype){
        //check if empty
        input["validation"] = validateFields.validateEmpty(input.value);
        if(!input["validation"])
            input["validation"] = window["validateFields"][validationType](input.value);
    }
    else{ 
        //validate field
        input["validation"] = window["validateFields"][validationType](input.value);
    }
    console.log(input)
    if(!input["validation"]){
        dispatch({
            type: UPDATE_LOGIN_INPUT_SUCCESS,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: UPDATE_LOGIN_INPUT_ERROR,
            payload: input,
            inputName: inputName
        })
    }
}

export const register = (data) => async (dispatch, getState) => {
    dispatch(isLoading())
    axios.post('/api/user/signup', data).then(res => {
        dispatch(success())
        dispatch({
            type: SETH_AUTH,
            payload: {
                data: res.data
            }
        })
    }).catch(err => {
        dispatch(error(err.response.data))
    })
}


export const login = (phoneNumber) => async (dispatch, getState) => {
    dispatch(isLoading())
    dispatch(success())
        dispatch({
            type: SETH_AUTH,
            payload: {
                data: {phoneNumber: phoneNumber}
            }
        })
//     axios.post('/api/user/loginUser', {phoneNumber: phoneNumber}).then(res => {
//         dispatch(success())
//         dispatch({
//             type: SETH_AUTH,
//             payload: {
//                 data: phoneNumber
//             }
//         })
//     }).catch(err => {
//         dispatch(error(err.response.data))
//     })
}

export const logout = () => async (dispatch,) => {
    dispatch(isLoading())
    dispatch({
        type: REMOVE_AUTH
    })
}
