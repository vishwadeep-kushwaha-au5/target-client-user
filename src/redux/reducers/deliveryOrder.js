import { UPDATE_ORDER_FIELD, UPDATE_ORDER_ERROR, SET_ORDER_LIST, SET_ORDER, SET_VEHICLE_MODEL_ID } from '../actions/deliveryOrder'

const INITIAL_STATE = {
    orderForm: {
        customerName: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        originAddress: {
            value: '', 
            validationType: "validateObject",
            validation: true,
            required: true
        },
        destinationAddress: {
            value: '', 
            validationType: "validateObject",
            validation: true,
            required: true
        },
        customerPhoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true
        },
        destionationPhoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true
        },
        distance: {
            value: '', 
            validationType: "validateObject",
            validation: true,
            required: true
        },
        billingDetails: {
            value: '', 
            validationType: "validateDateTime",
            validation: true,
            required: true
        },
        timerW: {
            value: '',
            validationType: "validateNumber",
            validation: true,
            required: true
        },
        deliveryPartnerId: {
            value: '',
            validationType: "validateText", //objectId of driver model
            validation: true,
            required: true
        },
        //FYI: fields below are updated later and the fields above are created during new order creation
        orderStatus: {
            value: "1", //P.S.: {0=> order cancelled, 1=> order placed, 2=> order reached pickup point, 3=> order left pickup point, 4=> order reached destination, 5=> order left destination, deivery complete}
            validationType: "validateText",
            validation: false,
            required: true
        },
        deliveryStartTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        },
        loadEndTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        },
        unloadStartTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        },
        deliveryEndTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        }
    },
    order: {},
    orderList:[],
    vehicleModel: {},
    otherOrders: {}
}

export default function status(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_ORDER_FIELD:
            return {
                ...state,
                orderForm: { ...state.orderForm,
                    [action.inputName]: action.payload
                }
            }
        case UPDATE_ORDER_ERROR:
            return {
                ...state,
                orderForm: { ...state.orderForm, 
                    [action.inputName]: action.payload
                }
            }
        case SET_ORDER_LIST:
            return {
                ...state,
                orderList: action.payload
            }
        // case SET_ORDER:
        //     return {
        //         ...state,
        //         order: action.payload
        //     }
        case SET_ORDER:
            return {
                ...state,
                otherOrders: action.payload
            }
        case SET_VEHICLE_MODEL_ID:
            return{
                ...state,
                vehicleModel: action.payload
            }
        default:
            return state
    }
}