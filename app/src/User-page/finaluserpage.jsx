import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import { UserPage, Basket } from ".";

export default class FinalUserPage extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="App">
                <UserPage />
                <Basket />
            </div>
        );
    }
}