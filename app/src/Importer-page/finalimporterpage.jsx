import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import { ImporterPage, Imports } from ".";

export default class FinalImporterPage extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="App">
                <ImporterPage />
                <Imports />
            </div>
        );
    }
}
