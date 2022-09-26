import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import Cookies from 'js-cookie'
import { withRouter } from "react-router";
class UserPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ShouldWeRender: false,
            Data: []

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
        fetch('https://s402340.labagh.pl/API/Customer/get-customer-data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                data = data.customerData;
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

    hanldeDodajDane = (e) => {
        this.props.history.push('/AddressData');
    }

    render() {
        const Data = this.state.Data;
        const AreWeRender = this.state.ShouldWeRender;
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
                                        <label htmlFor="Name">Imie: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="Name2">{user.first_name}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="KRS">Nazwisko: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="KRS2">{user.last_name}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Name">Miasto: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="Name2">{user.address_city}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="KRS">Kod pocztowy: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="KRS2">{user.address_postal_code}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Name">Ulica: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="Name2">{user.address_street}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="KRS">Email: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="KRS2">{user.email}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="KRS">Telefon: </label>
                                    </div>
                                    <div className="form-group2">
                                        <label htmlFor="KRS2">{user.mobile}</label>
                                    </div>
                                </div>))}
                            <div className="footer">
                                <button type="button" className="btn" onClick={this.hanldeDodajDane}>
                                    Dodaj dane
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export const UserPage = withRouter(UserPageComponent)