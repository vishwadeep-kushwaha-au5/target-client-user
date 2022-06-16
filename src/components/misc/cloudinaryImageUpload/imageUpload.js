import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Helmet} from 'react-helmet'

const useStyles = makeStyles(()=>({
    errorButton:{
        color: 'red',
        borderColor: 'red'
    }
}))

export default function UploadImage(props){
    // function which opens up the widget
    const classes = useStyles()

    const generateSignature = async (callback, params_to_sign) => {
        try {
           // getSignature is calling an API, passing the params_to_sign           
           // in the request body 
           // and returns the signature
            const signature = await axios.post('/api/image/generateCloudinarySignature', params_to_sign);
            callback(signature.data.result);
        } catch (err) {
            console.log(err);
        }
    };

    var widget = window.cloudinary.createUploadWidget({
        cloudName: "aryalico",
        uploadPreset: "ml_default",
        apiKey: '341291847791626',
        folder: 'sample',
        uploadSignature: generateSignature
    },
    (error, result) => {
        if (result.event === 'success') {
            props.onChange({target:{
                name: props.name,
                value: result.info.url
            }});
        }
    }) 

    const showWidget = () => {
        widget.open();
    };
    // function handleScriptInject({ scriptTags }) {
    //     console.log("hoohoh", scriptTags)
    //     if (scriptTags) {
    //         const scriptTag = scriptTags[0];
    //         scriptTag.onload = handleOnLoad;
    //     }
    // }

    // function handleOnLoad(){
    //     console.log("hello",widget )
    //     setWidget(window.cloudinary && )
    // }

    return<>
        {/* <Helmet
            script={[{ src: 'https://upload-widget.cloudinary.com/global/all.js' }]}
            // Helmet doesn't support `onload` in script objects so we have to hack in our own
            onChangeClientState={(newState, addedTags) => handleScriptInject(addedTags)}
        /> */}
        {/* <Helmet>
            <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script> 
        </Helmet> */}

        {widget?<Button
            variant="outlined"
            component="label"
            onClick={showWidget}
            className={props.error && classes.errorButton}
            >Upload {props.label} </Button>:'Loading'}
        {/* preview image change */}
        {props.value && <img src={props.value} width="500" height="600"/>}
    </>
}