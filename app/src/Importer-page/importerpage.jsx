import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import Cookies from 'js-cookie'

export class ImporterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ShouldWeRender: false,
            Data: [],
            name: "",
            krs: "",
            winesNumber: ""

            //ImporterDate: this.GetImporter(),
        }
        this.GetImporter();
        //console.log(this.state.name);
    }

    GetImporter() {
        let json
        const data = {
            jwt: Cookies.get('jwt'),
        }
        fetch('https://s402340.labagh.pl/API/Importer/get-importer-data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                data = data.wines;
                this.setState({ Data: data })
                //data = JSON.parse(data);
                this.setState({ ShouldWeRender: true })
                json = data;
            })
            .catch((error) => {
                console.error('Error', error);
            });
        //return json
    }


    render() {
        const  Data = this.state.Data;
        const AreWeRender = this.state.ShouldWeRender;
        console.log(this.state.Data.name);
        return (
            <div className="userpage">
                <div className="container-user">
                    <div className="user-container">
                        <div className="header">Profil</div>
                        <div className="content">
                            <div className="image">
                                <img src={profilePicture} />
                            </div>
                            {AreWeRender && Data.map((user) => (
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="Name">Nazwa: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="Name2">{user.name}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="KRS">KRS: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="KRS2">{user.krs}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Login">Liczba win: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="Login2">{user.winesNumber}</label>
                                    </div>
                                </div>))}
                            {/* <div className="footer">
                                <button type="button" className="btn" >
                                    Zmień hasło
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>);
    }
}