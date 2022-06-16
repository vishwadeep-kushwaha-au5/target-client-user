import React from "react";
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import moment from 'moment'

const PastOrderCard = (props) => {
    return(
        <Card>
            <CardContent>
                {console.log(props)}
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
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6">Delivered On:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{moment(props.order?.deliveryEndTime).format('LLLL')}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PastOrderCard