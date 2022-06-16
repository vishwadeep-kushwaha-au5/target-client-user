import React, { useEffect, useState } from "react";
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import moment from 'moment'
import Geocode from 'react-geocode'
import ProgressTimeline from '../misc/progressTimeline'
import axios from "axios";

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
    const [driverLocation, setDriverLocation] = useState({})
    const [driverAddress, setDriverAddress] = useState(null)
    const orderStatus = '4'

    useEffect(()=>{
        let driverId = props.order?.deliveryPartnerId
        if(driverId){
            axios.post('https://server.gotarget.in/api/driver/getDriverCurrentLocation', {'driverId': driverId}).then(res=>{
                let locations = res.data?.result
                if(locations.length){
                    Geocode.fromLatLng(locations[0].lat, locations[0].lng).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        setDriverLocation(locations[0])
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
                        <Typography variant="h6">Status:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{orderStatuSwtich(orderStatus)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressTimeline orderStatus={orderStatus}/>
                    </Grid>
                    <Grid item xs={12}>
                        <small>Vehicle is at <Typography variant="subtitle2">{driverAddress}</Typography></small>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">updated @{moment(driverLocation.date).format('LLLL')}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default OrderCard