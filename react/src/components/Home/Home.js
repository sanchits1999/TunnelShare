import React, { useRef, useState, useEffect } from "react"
import Hstyle from "./Home.module.css"
import { AiFillSignal } from 'react-icons/ai'
import io from "socket.io-client"
import Paper from '@material-ui/core/Paper';
import QRCode from "qrcode.react"



const Home = (props) => {

    const socketRef = useRef();
    const EXTPORT = "https://tunnelshare.herokuapp.com"
    const [socketId, setSocketId] = useState("")
    const [link, setlink] = useState("Link Recieved")

    useEffect(() => {
        socketRef.current = io.connect(EXTPORT)

        socketRef.current.on('connect', function () {
            setSocketId(socketRef.current.id);

            socketRef.current.on("message", (link) => {
                setlink(link)
                openInNewTab(link)
            })
        })

    }, [])

    console.log(socketId)

    const openInNewTab = (url) => {
        var win = window.open(url, '_newtab')
        if (win != null) {
            win.focus();
        }
    }

    return (
        <div className={Hstyle.parent}>
            <div className={Hstyle.head}>
                <div className={Hstyle.logo}>
                    <div className={Hstyle.Ltext}>TUNNEL SHARE</div>
                    <AiFillSignal className={Hstyle.Limage} size={20} />
                </div>
            </div>

            <div className={Hstyle.body}>
                <Paper className={Hstyle.card} elevation={3}>
                    <div className={Hstyle.cardp}>
                        <QRCode value={socketId} className={Hstyle.qrcode} size={250} />
                        <div className={Hstyle.child}>
                            <div className={Hstyle.chead}>
                                Your Identification
                            </div>
                            <div className={Hstyle.subhead}>
                                Tunnel Share allows users to send data and links over the internet from their phones directly to their desktop or laptop with only one step. Download our app from the button below , scan the qr code provided on the website from our app and voila. Tunnel Share will open the link on your laptop in a new tab.
                            </div>
                            <div className={Hstyle.link}>
                                <div className={Hstyle.linkt}>
                                    {link}
                                </div>
                            </div>
                            <div className={Hstyle.downloadb}>
                                <div onClick={()=>{openInNewTab("https://drive.google.com/file/d/1GYjAf-SgrKSydPyB-eJLnlNCpOLXp5qG/view")}} className={Hstyle.downloadt}>
                                    Download
                                </div>
                            </div>

                        </div>
                    </div>
                </Paper>
            </div>

        </div>
    )
}

export default Home
