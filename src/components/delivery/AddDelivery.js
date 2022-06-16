import React, { useEffect, useState } from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';


import { baseChargeCalculate } from '../../utils/helper';
import { updateOrderField, submitOrder } from '../../redux/actions/deliveryOrder';
import { setMapLoaded, unsetMapLoaded } from '../../redux/actions/googleMap';
import Search from '../googleMaps/GoogleAutocomplete'
import GooglePlannerMap from '../googleMaps/map'

const useStyles = makeStyles(()=>({
    formWrapper:{
        padding: '20px'
    }
}))

const AddDelivery = (props)=>{
    const classes= useStyles()
    const dispatch = useDispatch()

    const mapLoaded = useSelector(state => state.googleMap.mapLoaded)
    const deliveryOrderState = useSelector(state=> state.deliveryOrder.orderForm)
    const drivers = useSelector((state)=> state.driver.driverList)
    const vehicleModel = useSelector((state)=> state.deliveryOrder.vehicleModel)

    const [selectedMarker, setSelectedMarker] = useState({})
    const [value, setValue] = useState({
        originAddress: {},
        destinationAddress: {}
    })
    
    const {setSelectionDialogOpen, setListKey, ...others} = props

    function handlePlaceChange(input) {
        setValue(value=>({
            ...value,
            [input.target.name]: input.target.value
        }))
        setSelectedMarker(input.target.value)
        handleInputChange(input)
        // if (inputType === "markers") { dispatch(updateSelectedMarker(data.length ? data[data.length - 1] : '')) }
        // dispatch(updateInput(data, inputType, day))
        // dispatch(updateStepCreateTrip({ category: category, type: type, departureDate: departureDate }, change))
    }

    const handleInputChange = (input) =>{
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value //doing this because material ui input return values in string format. This needs to be improved by making a seperate component for textfield input and handling parseInt in that component
        dispatch(updateOrderField(input.target.name,{...deliveryOrderState[input.target.name], value: value}))
        if(input.target.name === 'distance'){
            let mileage = 22;
            if(vehicleModel // 👈 null and undefined check
            && Object.keys(vehicleModel).length !== 0
            && Object.getPrototypeOf(vehicleModel) === Object.prototype) mileage = vehicleModel.mileage
            let chargeMultiplier = mileage/22
            dispatch(updateOrderField("billingDetails", {...deliveryOrderState[input.target.name], value :{baseCharge: baseChargeCalculate(input.target?.value?.distance.text, chargeMultiplier)} }))
        }
    }

    useEffect(()=>{
        if(deliveryOrderState.billingDetails.value){
            console.log('hehe')
            let mileage = 22;
            if(vehicleModel // 👈 null and undefined check
            && Object.keys(vehicleModel).length !== 0
            && Object.getPrototypeOf(vehicleModel) === Object.prototype) mileage = vehicleModel.mileage
            let chargeMultiplier = mileage/22
            dispatch(updateOrderField("billingDetails", {...deliveryOrderState["billingDetails"], value :{baseCharge: deliveryOrderState["billingDetails"]?.value?.baseCharge/chargeMultiplier} }))
        }
    },[vehicleModel])

    const onSubmit = () => {
        //Todo: Fix 
        let newdeliveryOrderState = (({customerName, originAddress, destinationAddress, customerPhoneNumber, destionationPhoneNumber, distance, billingDetails, timerW, deliveryPartnerId, orderStatus})=> ({customerName, originAddress, destinationAddress, customerPhoneNumber, destionationPhoneNumber, distance, billingDetails, timerW, deliveryPartnerId, orderStatus}))(deliveryOrderState);
        dispatch(submitOrder(newdeliveryOrderState))
    }

    useEffect(()=>{dispatch(unsetMapLoaded())},[])
    
    return(
        <Grid container className={classes.formWrapper} spacing={2} justifyContent="center">
            <Typography variant="h5">Add Derlivery:</Typography>
            <Grid item xs={12}>
                <TextField label="Name" variant="outlined" size="small" onChange={handleInputChange} name="customerName" value={deliveryOrderState.customerName.value} error={deliveryOrderState.customerName.validation} helperText={<>{deliveryOrderState.customerName.validation}</>}/>
            </Grid>
            <Grid item container xs={12} justifyContent="space-between">
                <Grid item xs={5}>
                    {mapLoaded ?<Search handleInputChange={handlePlaceChange} address={value.originAddress} name="originAddress"  error={deliveryOrderState.originAddress.validation} helperText={<>{deliveryOrderState.originAddress.validation}</>}/> : <div>Loading</div>}
                </Grid>
                <Grid item xs={5}>
                    {mapLoaded ?<Search handleInputChange={handlePlaceChange} address={value.destinationAddress} name="destinationAddress"  error={deliveryOrderState.destinationAddress.validation} helperText={<>{deliveryOrderState.destinationAddress.validation}</>}/> : <div>Loading</div>}                
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Customer Phone number" variant="outlined" size="small" onChange={handleInputChange} name="customerPhoneNumber" value={deliveryOrderState.customerPhoneNumber.value}  error={deliveryOrderState.customerPhoneNumber.validation} helperText={<>{deliveryOrderState.customerPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Destination Phone number" variant="outlined" size="small" onChange={handleInputChange} name="destionationPhoneNumber" value={deliveryOrderState.destionationPhoneNumber.value}  error={deliveryOrderState.destionationPhoneNumber.validation} helperText={<>{deliveryOrderState.destionationPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Timer W" type='number' variant="outlined" size="small" onChange={handleInputChange} name="timerW" value={deliveryOrderState.timerW.value.toString()}  error={deliveryOrderState.timerW.validation} helperText={<>{deliveryOrderState.timerW.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={()=> {props.setSelectionDialogOpen(true); setListKey("default");}}>Add</Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={onSubmit}>Submit</Button>
            </Grid>
            <Grid item xs={12}>
                Distance: {deliveryOrderState?.distance?.value?.distance?.text}
                Base Charge: {deliveryOrderState?.billingDetails?.value?.baseCharge}
            </Grid>
            <GooglePlannerMap markers={value} mapValue={mapLoaded} selectedMarker={selectedMarker} dimensions={{ width: "100%", height: "500px" }} updateDistanceDetails={handleInputChange}></GooglePlannerMap>
        </Grid>
    )
}

export default AddDelivery