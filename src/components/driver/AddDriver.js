import React, { useEffect, useState } from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { updateDriverField, submitDriver } from '../../redux/actions/driver';
import Search from '../googleMaps/GoogleAutocomplete'
import UploadImage from '../misc/cloudinaryImageUpload/imageUpload';

const useStyles = makeStyles(()=>({
    formWrapper:{
        padding: '20px'
    }
}))


const AddDriver = ()=>{
    const classes= useStyles()
    const dispatch = useDispatch()

    const driver = useSelector(state=> state.driver.driverForm)

    const handleInputChange = (input) =>{
        dispatch(updateDriverField(input.target.name,{...driver[input.target.name],value:input.target.value}))
    }
    
    const onSubmit = () => {
        let data = (({driverName, driverAddress, driverPhoneNumber, licenseNumber, licensePhoto, driverPhoto})=> ({driverName, driverAddress, driverPhoneNumber, licenseNumber, licensePhoto, driverPhoto}))(driver);
        dispatch(submitDriver(data))
    }

    return(
        <Grid container className={classes.formWrapper} spacing={2} justifyContent="center">
            <Typography variant="h5">Add Driver:</Typography>
            <Grid item xs={12}>
                <TextField label="Name" variant="outlined" size="small" onChange={handleInputChange} name="driverName" value={driver.driverName.value} error={driver.driverName.validation} helperText={<>{driver.driverName.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Driver Phone number" variant="outlined" size="small" onChange={handleInputChange} name="driverPhoneNumber" value={driver.driverPhoneNumber.value}  error={driver.driverPhoneNumber.validation} helperText={<>{driver.driverPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Driver Address" variant="outlined" size="small" onChange={handleInputChange} name="driverAddress" value={driver.driverAddress.value}  error={driver.driverAddress.validation} helperText={<>{driver.driverAddress.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="License number" variant="outlined" size="small" onChange={handleInputChange} name="licenseNumber" value={driver.licenseNumber.value}  error={driver.licenseNumber.validation} helperText={<>{driver.licenseNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <UploadImage label="License Photo" onChange={handleInputChange} name="licensePhoto" value={driver.licensePhoto.value}  error={driver.licensePhoto.validation} helperText={<>{driver.licensePhoto.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <UploadImage label="DriverPhoto" onChange={handleInputChange} name="driverPhoto" value={driver.driverPhoto.value}  error={driver.driverPhoto.validation} helperText={<>{driver.driverPhoto.validation}</>}/>
            </Grid>
            <Grid item>
                <Button variant="outlined" onClick={onSubmit}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default AddDriver