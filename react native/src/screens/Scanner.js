import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Camera } from "expo-camera"
import { BarCodeScanner } from 'expo-barcode-scanner'
import api from "../api/api"

const Scanner = (props) => {


    const [address, setaddress] = useState(null)
    const [hasCameraP, setCameraP] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            checkCamerP()
        }, 800)
    }, [])

    const checkCamerP = () => {
        Camera.getPermissionsAsync().then((res) => {
            if (res.status === "granted") {
                setCameraP(true)
            } else {
                setCameraP(false)
                getCameraP()
            }
        })
    }

    const getCameraP = () => {

        Camera.requestPermissionsAsync().then((res) => {
            if (req.status === "granted") {
                setCameraP(true)
            } else {
                setCameraP(false)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const onScanner = (res) => {
        if (address === null) {
            setaddress(res.data)
            api.post("/message", {
                socketid: res.data,
                link: props.link
            }).then((r) => {
                if(r.data==="success"){
                    props.onSuccess("success")
                }
                console.log(r.data)
            }).catch((e)=>{
                props.onSuccess("fail")
                console.log(e)
            })
            console.log("hey1")
            //send data through
        }
        if (address !== null & address !== res.data) {
            setaddress(res.data)
            console.log("hey2")
            //send data through
        }

    }


    return (
        <View style={{ height: "100%", width: "100%" }}>
            {hasCameraP ? <BarCodeScanner
                onBarCodeScanned={onScanner}
                style={{ width: "100%", height: "100%" }}
            /> : null}

        </View>
    )
}

export default Scanner