import React, { useState } from "react";
import "./style.scss";
import Cookies from 'js-cookie'

export default class AddAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            addressPostalCode: "",
            addressStreet: "",
            mobile: ""
        }
    }

    handleName = (e) => {
        this.setState({ firstName: e.target.value });
    }

    handleCountry = (e) => {
        this.setState({ lastName: e.target.value });
    }

    handlePrice = (e) => {
        this.setState({ address: e.target.value });
    }

    handleWineType = (e) => {
        this.setState({ addressPostalCode: e.target.value });
    }

    handleCapacity = (e) => {
        this.setState({ addressStreet: e.target.value });
    }

    handleAlcoholicStrength = (e) => {
        this.setState({ mobile: e.target.value });
    }

    handleImage = (e) => {
        console.log(e)
        this.setState({ img: e.target.files[0] });
    }

    handleGoToUser = (e) => {
        //przejsc do user
    }

    handleDodaj = (e) => {
        console.log(this.state.firstName)
        console.log(this.state.lastName)
        console.log(this.state.address)
        console.log(this.state.addressPostalCode)
        console.log(this.state.addressStreet)
        console.log(this.state.mobile)
        if (this.state.firstName != "" && this.state.lastName != "" && this.state.address != "" && this.state.addressPostalCode != "" && this.state.addressStreet != "" && this.state.mobile) {

            const data = {
                jwt: Cookies.get('jwt'),
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                addressCity: this.state.address,
                addressPostalCode: this.state.addressPostalCode,
                addressStreet: this.state.addressStreet,
                mobile: this.state.mobile
            };


            fetch('https://s402340.labagh.pl/API/Customer/update-customer-data.php', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error', error);
                });
            //przejs do importera
        }
    }

    render() {
        return (
            <div className="App">
                <div className="userpageadd">
                    <div className="container-useradd">
                        <div className="base-container">
                            <div className="header">Dodaj Dane</div>
                            <div className="content">
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Imie:</label>
                                        <input type="text" name="firstName" onChange={this.handleName} placeholder="Imie" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Nazwisko:</label>
                                        <input type="text" name="lastName" onChange={this.handleCountry} placeholder="Nazwisko" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Adres:</label>
                                        <input type="text" name="address" onChange={this.handlePrice} placeholder="Adres" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addressPostalCode">Kod pocztowy:</label>
                                        <input type="text" name="addressPostalCode" onChange={this.handleWineType} placeholder="Kod pocztowy" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addressStreet">Ulica:</label>
                                        <input type="text" name="addressStreet" onChange={this.handleCapacity} placeholder="Ulica" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobile">Telefon:</label>
                                        <input type="text" name="mobile" onChange={this.handleAlcoholicStrength} placeholder="Telefon" />
                                    </div>
                                </div>
                                <div className="footer">
                                    <button type="button" className="btn" onClick={this.handleDodaj}>
                                        Dodaj
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}