import React, { useEffect, useState } from "react";
import {Card, CardContent, Typography, Grid, Button, makeStyles} from '@material-ui/core'
import moment from 'moment'
import Geocode from 'react-geocode'
import ProgressTimeline from '../misc/progressTimeline'
import axios from "axios";

const useStyles = makeStyles((theme)=>({
    trackButton: {
        padding: 0,
        '& a':{
            padding: '20px',
            textDecoration: 'none',
            color: theme.palette.common.textTertiary
        }
    },
    orderStatusText: {
        fontSize: '15px',
        color: '#03c04a',
    }
}))

Geocode.setApiKey("AIzaSyBv6DEf2K26lxoAURZHe98bzwEnTLKJs0U");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");

const orderStatuSwtich = (orderStatus) =>{
    switch(orderStatus){
        case '2':
            return 'Loading on vehicle'
        case '3':
            return 'Left for delivery'
        case '4':
            return 'Unloading from vehicle'
        case '5':
            return 'Delivery completed'
        default: 
            return '0%'
    }
}

const OrderCard = (props) => {
    const classes = useStyles()

    const [driverLocation, setDriverLocation] = useState({})
    const [driverAddress, setDriverAddress] = useState(null)
    const orderStatus = '4'

    useEffect(()=>{
        let driverId = props.order?.deliveryPartnerId
        let locations = []
        if(driverId){
            axios.post('https://server.gotarget.in/api/driver/getDriverCurrentLocation', {'driverId': driverId}).then(res=>{
                locations = res.data?.result
                console.log(locations)
                if(locations.length){
                    setDriverLocation(locations[0])
                    Geocode.fromLatLng(locations[0].lat, locations[0].lng).then(
                    (response) => {
                        console.log(response)
                        const address = response.results[0].formatted_address;
                        setDriverAddress(address)
                    },
                    (error) => {
                        console.error(error);
                    }
                    );
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[props])

    return(
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6">Date:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{moment(props.order?.date).format('LLLL')}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6">From:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{props.order?.destinationAddress?.placeName}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6">To:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{props.order?.originAddress?.placeName}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}><br/><br/></Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h5">Status:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6" className={classes.orderStatusText}>{orderStatuSwtich(orderStatus)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressTimeline orderStatus={orderStatus}/>
                    </Grid>
                    <Grid item xs={12}>
                        <small>Your is at <Typography variant="subtitle2" component="span">{driverAddress}</Typography></small>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">updated @{moment(driverLocation.date).format('LLLL')}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row-reverse">
                    <Grid item>
                        {(driverLocation?.lat&& driverLocation?.lng &&props.order?.destinationAddress?.lat && props.order?.destinationAddress?.lng)?
                        <Button variant="outlined" className={classes.trackButton}>
                            <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/${driverLocation.lat},${driverLocation.lng}/${props.order.destinationAddress.lat},${props.order.destinationAddress.lng}`}>Track order</a>
                        </Button>:"Error"}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default OrderCard