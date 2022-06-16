import React, { useEffect, useState } from 'react';
import Wrapper from '../components/misc/PageWrapper'
import {Button, Divider, Grid, Typography} from '@material-ui/core'

import AddDelivery from './delivery/AddDelivery';
import AddDriver from './driver/AddDriver';
import AddVehicle from './vehicle/AddVehicle';

import Orders from './delivery/Orders';
import Drivers from './driver/Drivers';
import Vehicles from './vehicle/Vehicles';

import Dashboard from './dashboard/dashboard';
import SelectionDialog from './misc/Dialog';

import { getOtherOrders } from '../redux/actions/deliveryOrder';

import PastOrderCard from './orderCards/PastOrderCard';
import OrderCard from './orderCards/OrderCard';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



const Home = () => {
    const [selectionDialogOpen, setSelectionDialogOpen] = useState(false)
    const [listKey, setListKey] = useState(null)
    const [parentId, setParentId] = useState(null)
    const dispatch = useDispatch()

    const user = useSelector(state=> state.auth.user)
    const currentOrders = useSelector(state => state.deliveryOrder.otherOrders.orders)
    const pastOrders = useSelector(state => state.deliveryOrder.otherOrders.sortedOrders)

    const handleClose = () => {
        setSelectionDialogOpen(false)
        setParentId(null)
    }

    useEffect(()=> {
        if(user.phoneNumber){
            dispatch(getOtherOrders(user.phoneNumber))
        }
    }, [])

    return (<Wrapper>
    {detailsSectionShow=>
        <Grid container>
            <Grid item xs={12}><Typography variant="h3">Current Orders:</Typography></Grid>
            <Grid item xs={12}>
                {
                    currentOrders && currentOrders.map(order=> <OrderCard order={order}/>)
                }
            </Grid>
            <Grid item xs={12}>
                <br/>
                <Divider/>
                <br/>
            </Grid>
            <Grid item xs={12}><Typography variant="h3">Past Orders:</Typography></Grid>
            <Grid item xs={12}>
                {
                    pastOrders && pastOrders.map(order=> <PastOrderCard order={order}/>)
                }
            </Grid>
        </Grid>
    }
        {/* {detailsSectionShow=>(
            <Grid container>
                <SelectionDialog open={selectionDialogOpen} listKey={listKey} handleClose={handleClose} parentId={parentId}/>
                // { This is details section }
                <Grid item container xs={12}>
                    {formSwitch(detailsSectionShow, setSelectionDialogOpen, setListKey, setParentId)}
                </Grid>
            </Grid>)
        } */}
    </Wrapper>)
}

// const formSwitch = (detailsSectionShow, setSelectionDialogOpen, setListKey, setParentId)=>{
//     switch(detailsSectionShow){
//         case "DeliveryForm":
//             return <AddDelivery setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
//         case "DriverForm":
//             return <AddDriver/>
//         case "VehicleForm":
//             return <AddVehicle/>
//         case "Drivers":
//             return <Drivers setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
//         case "Vehicles":
//             return <Vehicles setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
//         case "Orders":
//             return <Orders setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
//         default:
//             return <Dashboard/>
//     }
// }

export default Home