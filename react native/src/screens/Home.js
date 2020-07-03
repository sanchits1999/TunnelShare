import React, { useRef, useEffect, useState } from "react"
import { View, Text, Dimensions, StatusBar , Animated, TouchableWithoutFeedback, TouchableOpacity, Image, TextInput, Alert } from "react-native"
//import Animated from "react-native-reanimated"
import { Ionicons } from '@expo/vector-icons'
import Scanner from "./Scanner"

const Home = (props) => {

    const { height, width } = Dimensions.get("screen")
    const [isOpen, setOpen] = useState(false)
    const [link, setLink] = useState("")
    const translatey = useRef(new Animated.Value(0)).current
    const stranslate = useRef(new Animated.Value(height - 190)).current

    const EXTPORT = "http://127.0.0.1:3001"

    useEffect(() => {

    }, [])


    useEffect(() => {
        startAnimation()
    }, [])

    const startAnimation = () => {

        Animated.sequence([
            Animated.timing(translatey, {
                toValue: 5,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(translatey, {
                toValue: -5,
                duration: 800,
                useNativeDriver: true
            })
        ]).start(() => { startAnimation() })

    }

    const Opensheet = () => {
        if(link.length===0){
            return Alert.alert("Link cannot be empty")
        }
        Animated.timing(stranslate, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true
        }).start(() => {
            setOpen(true)
        })

    }


    const Closesheet = () => {
        Animated.timing(stranslate, {
            toValue: height - 190,
            duration: 700,
            useNativeDriver: true
        }).start(() => {
            setOpen(false)
        })
    }


    console.log(link)


    return (
        <View style={{ backgroundColor: "#2196f3", height: height, width: width, alignItems: "center" }}>
            <StatusBar backgroundColor="#2196f3" />
            <View style={{ width: "100%", height: height-200, backgroundColor: "transparent", alignItems: "center" }}>
                <View style={{ width: "60%", height: 200, marginTop: 50 }}>
                    <Image style={{ flex: 1, height: null, width: null, resizeMode: "cover", borderRadius: 10 }} source={require("../../assets/scan.png")} />
                </View>
                <View style={{ marginTop: 20, width: "100%" }}>
                    <Text style={{ fontSize: 22, fontWeight: "700", color: "#ffffff", width: "100%", textAlign: "center" }}>Welcome to Tunnel Share</Text>
                </View>
                <View style={{ marginTop: 5, width: "90%", opacity: 0.8 }}>
                    <Text style={{ fontSize: 14, fontWeight: "500", letterSpacing: 0, color: "#ffffff", width: "100%", textAlign: "center" }}>Please scan QR code on our website after opening it on your laptop or any endpoint, you want to send data to.Click on Open Scanner to start scanning and sharing data</Text>
                </View>
                <View style={{ width: "90%", height: 50, backgroundColor: "rgba(255,255,255,1)", paddingLeft: 20, marginTop: 30, borderRadius: 30 }}>
                    <TextInput value={link} onChangeText={(text)=>{setLink(text)}} style={{ width: "100%", height: "100%", textAlign: "center" }} placeholder="Enter URL to send" placeholderTextColor="#000000" />
                </View>
                <TouchableOpacity onPress={() => { { isOpen ? Closesheet() : Opensheet() } }} style={{ width: "90%", height: 50, marginTop: 30 }}>
                    <View style={{ width: "100%", height: "100%", backgroundColor: "transparent", borderRadius: 30, justifyContent: "center", borderColor: "#ffffff", borderWidth: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#ffffff", width: "100%", textAlign: "center" }}>Open Scanner</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Animated.View style={{ height: height, width: width, position: "absolute", borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#ffffff", transform: [{ translateY: stranslate }] }}>
                <TouchableWithoutFeedback style={{}} onPress={() => { { isOpen ? Closesheet() : Opensheet() } }}>
                    <View style={{ alignSelf: "center", paddingTop: 5, paddingBottom: 5 }}>
                        <Animated.View style={{ transform: [{ translateY: translatey }] }}>
                            {!isOpen ? <Ionicons name="ios-arrow-up" size={24} color="black" /> : <Ionicons name="ios-arrow-down" size={24} color="black" />}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ marginTop: 10, width: "100%" }}>
                    <Text style={{ fontSize: 22, fontWeight: "700", color: "#000000", width: "100%", textAlign: "center" }}>Code Scanner</Text>
                </View>
                <View style={{ width: "100%", height: height - 100 }}>
                    {isOpen ? <Scanner link={link} onSuccess={(res)=>{
                        if(res==="success"){
                            Alert.alert("Sent Successfully")
                            setTimeout(()=>{Closesheet()},1000)
                            setLink("")
                        }else{
                            Alert.alert("Unsuccessfull")
                        }
                    }}/> : null}
                </View>
            </Animated.View>
        </View>
    )
}

export default Home