import axios from 'axios'
import { validateFields } from '../../utils/validator'
import { getKeyValueObjectFromReduxObject } from '../../utils/helper'
import VehicleModels from '../../public/vehicleModel';

window.validateFields = validateFields
export const UPDATE_ORDER_FIELD = "UPDATE_ORDER_FIELD"
export const UPDATE_ORDER_ERROR = "UPDATE_ORDER_ERROR"
export const SET_ORDER_LIST = "SET_ORDER_LIST"
export const SET_ORDER = "SET_ORDER"
export const SET_VEHICLE_MODEL_ID = "SET_VEHICLE_MODEL_ID"


export const updateOrderField = (inputName, input) => (dispatch, getState) => {
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
    console.log(input["validation"])
    if(!input["validation"]){
        dispatch({
            type: UPDATE_ORDER_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: UPDATE_ORDER_ERROR,
            payload: input,
            inputName: inputName
        })
    }

    // return ({
    //     type: IS_LOADING,
    // })
}

export const submitOrder = (data) => (dispatch, getState) => {
    if(Object.values(data).every(curr => curr.validation === false )){
        axios.post(process.env.REACT_APP_NEW_ORDER,getKeyValueObjectFromReduxObject(data)).then(res=>{
            axios.put(process.env.REACT_APP_UPDATE_DRIVER, {id: res?.data?.result?.deliveryPartnerId, currentOrderId: res?.data?.result?._id}).then(res=>{
                console.log("Done")
            }).catch(err=>{
                console.log("err", err)
            })
        }).catch(err=>{
            console.log("err", err)
        })
    }else{
        console.log("NONONO")
    }
}

export const updateOrder = (data) => (dispatch, getState) => {
    if(data // 👈 null and undefined check
    && Object.keys(data).length !== 0
    && Object.getPrototypeOf(data) === Object.prototype){
        axios.put(process.env.REACT_APP_UPDATE_ORDER, data).then(res=>{
            console.log("Done")
        }).catch(err=>{
            console.log("err", err)
        })
    }else{
        console.log("NONONO")
    }
}

export const updateVehicleModel = (vehicleModelId) => (dispatch, getState) =>{
    dispatch({
        type: SET_VEHICLE_MODEL_ID,
        payload: VehicleModels['456'] //TODO: replace this with actual vehicle Model ID
    })
}

export const getAllOrders = (pageNumber = 0) => (dispatch, getstate) => {
    axios.get(process.env.REACT_APP_GET_ALL_ORDERS+'/'+pageNumber).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            console.log("fine")
            dispatch({
                type: SET_ORDER_LIST,
                payload: res.data.result
            })
        }
    }
    ).catch(err=>{
        console.log(err)
    })
}

export const getOrder = (orderId) => (dispatch, getState) => {
    axios.get(process.env.REACT_APP_GET_ORDER+'/'+orderId).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            console.log("fine")
            dispatch({
                type: SET_ORDER,
                payload: res.data.result[0]
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}

export const getOtherOrders = (phoneNumber) => (dispatch, getState) => {
    axios.post(process.env.REACT_APP_GET_MY_ORDER, {phoneNumber: phoneNumber}).then(res=>{
        if(res.status === 200 && res.data.result){
            dispatch({
                type: SET_ORDER,
                payload: res.data.result
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}
