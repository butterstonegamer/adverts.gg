import React from 'react';
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/react"
import '../Home/Home.css'

export function Home( props ) {
    const login = () => window.location.href = 'http://localhost:3001/api/auth/discord';
    return (
        <div>
            <div className="background">
            </div>
            <div id="navbar">
                <img id="logo"/>
                <Button id="LoginButton" onClick={login}>Login</Button>
            </div>
            <div id="menu">
            <Divider/>
                <span id="MenuItem">For Advertisers</span>
                <span id="MenuItem">Home</span>
                <span id="MenuItem">For Server Owners</span>
            </div>
            <div id="information">
                <h1>The Ultimate Way to Reach Discord Users</h1>
                <p><span id="boldinformation">We know how to build & grow communities on Discord.</span><br/><br/>Whether you're looking to grow your community or earna a revenue off of an established one you've found the right place!<br/><br/>Ready to take your community to the next level?</p>
                <Button id="GetStartedButton" onClick={login}>Get Started</Button>
            </div>
        </div>
    )
}