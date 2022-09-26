import React, { useState } from "react";
import "./style.scss";

function MakeImport(props) {

    const handleOldPassword = (e) => {
        this.setState({oldpassword: e.target.value});
    }
    
    const handleNewPassword = (e) => {
        this.setState({newpassword: e.target.value});
    }

    const handleZmien = (e) => {
        console.log(this.state.newpassword)
        console.log(this.state.oldpassword)
    }

    return (
        <div className="userpage">
            <div className="container-user">
        <div className="base-container">
            <div className="header">Zmień hasło</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="oldpassword">Stare hasło</label>
                        <input type="text" name="oldpassword"  onChange={handleOldPassword} placeholder="Stare hasło"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newpassword">Nowe hasło</label>
                        <input type="text" name="newpassword" onChange={handleNewPassword} placeholder="Nowe hasło"/>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={handleZmien}>
                        Zmień
                    </button>
                </div>
            </div>
        </div>
        </div>
        </div>);
}

export default MakeImport;