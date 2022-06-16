import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {ReactComponent as TruckReached} from '../../public/icons/truckReached.svg'
import {ReactComponent as TruckMoving} from '../../public/icons/truckMoving.svg'

const useStyles = makeStyles((theme)=>({
    timeLine : {
        width: '100%',
        height: '4px',
        backgroundColor: '#ccc',
        margin: '12px 0px'
    },
    completedTimeLine: {
        height: '3px',
        backgroundColor: '#03c04a',
        borderRadius: '5px'
    },
    checkPointList:{
        display: 'flex'
    },
    checkPoint1: {
        height: '20px',
        width: '20px',
        borderRadius: '50%', 
        marginTop: '-11px',
        marginLeft: '-2px',
        backgroundColor: '#ccc',
        marginRight: '12%',
        padding: '2px'
    },
    checkPoint2: {
        height: '20px',
        width: '20px',
        borderRadius: '50%', 
        marginTop: '-11px',
        marginLeft: '-2px',
        backgroundColor: '#ccc',
        marginRight: '54%',
        padding: '2px'
    },
    checkPoint3: {
        height: '20px',
        width: '20px',
        borderRadius: '50%', 
        marginTop: '-11px',
        marginLeft: '-2px',
        backgroundColor: '#ccc',
        marginRight: '12%',
        padding: '2px'
    },
    checkPoint4: {
        height: '20px',
        width: '20px',
        borderRadius: '50%', 
        marginTop: '-11px',
        marginRight: '-2px',
        backgroundColor: '#ccc',
    },
    checkPointIcon:{
        display: 'block',
        width: '100%',
        height: '100%',
        color: 'white'
    },
    checkPointIconLocal:{
        display: 'block',
        width: '100%',
        height: '100%',
        '& g':{
            fill: 'white'
        }
    },
    checkPointReached:{
        backgroundColor: '#03c04a'
    },
    checkPointReachedLocal:{
        backgroundColor: '#03c04a'
    },
    checkPointReachedIcon:{
        color: '#efefef'
    }
}))

const progressBarPercentage = (orderStatus) =>{
    switch(orderStatus){
        case '2':
            return '22%'
        case '3':
            return '50%'
        case '4':
            return '78%'
        case '5':
            return '100%'
        default: 
            return '0%'
    }
}

const ProgressTimeline = ({orderStatus}) => {
    const classes = useStyles()


    return<>
        <div container className={classes.timeLine}>
            <div item xs={12} className={classes.completedTimeLine} style={{width: progressBarPercentage(orderStatus)}}>
            </div>
            
            <div item xs={12} className={classes.checkPointList}>
                <div className={`${classes.checkPoint1} ${orderStatus>=2 && classes.checkPointReached}`}>
                    <TruckReached className={`${classes.checkPointIconLocal}`}/>
                </div>
                <div className={`${classes.checkPoint2} ${orderStatus>=3 && classes.checkPointReached}`}>
                    <TruckMoving className={`${classes.checkPointIconLocal}`}/>
                </div>
                <div className={`${classes.checkPoint3} ${orderStatus>=4 && classes.checkPointReached}`}>
                    <TruckReached className={`${classes.checkPointIconLocal}`}/>
                </div>
                <div className={`${classes.checkPoint4} ${orderStatus>=5 && classes.checkPointReached}`}>
                    <CheckCircleIcon className={`${classes.checkPointIcon} ${orderStatus>=4 && classes.checkPointReachedIcon}`}/>
                </div>
            </div>
        </div>
    </>
}

export default ProgressTimeline