import React, { useState } from "react";
import "./style.scss";
import Cookies from 'js-cookie'

export default class AddWine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            country: "",
            price: "",
            winetype: "",
            capacity: "",
            alcoholicstrength: "",
            img: ""
        }
    }

    handleName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleCountry = (e) => {
        this.setState({ country: e.target.value });
    }

    handlePrice = (e) => {
        this.setState({ price: e.target.value });
    }

    handleWineType = (e) => {
        this.setState({ winetype: e.target.value });
    }

    handleCapacity = (e) => {
        this.setState({ capacity: e.target.value });
    }

    handleAlcoholicStrength = (e) => {
        this.setState({ alcoholicstrength: e.target.value });
    }

    handleImage = (e) => {
        console.log(e)
        this.setState({ img: e.target.files[0] });
    }

    handleGoToUser = (e) => {
        //przejsc do importera
    }

    handleDodaj = (e) => {
        console.log(this.state.name)
        console.log(this.state.country)
        console.log(this.state.price)
        console.log(this.state.winetype)
        console.log(this.state.capacity)
        console.log(this.state.alcoholicstrength)
        console.log(this.state.img)
        if (this.state.name != "" && this.state.country != "" && this.state.price != "" && this.state.winetype != "" && this.state.capacity != "" && this.state.alcoholicstrength && this.state.img != "") {
            const formData = new FormData();

            formData.append('sendImage', this.state.img);

            const data = {
                jwt: Cookies.get('jwt'),
                name: this.state.name,
                country: this.state.country,
                price: this.state.price,
                wineType: this.state.winetype,
                capacity: this.state.capacity,
                alcoholicStrength: this.state.alcoholicstrength
            };

            formData.append('data', JSON.stringify(data));

            console.log(JSON.stringify(data))
            console.log(formData)


            fetch('https://s402340.labagh.pl/API/Wines/create-new-wine.php', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                body: formData,
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
                            <div className="header">Dodaj Wino</div>
                            <div className="content">
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="name">Nazwa:</label>
                                        <input type="text" name="name" onChange={this.handleName} placeholder="Nazwa" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Kraj:</label>
                                        <input type="text" name="country" onChange={this.handleCountry} placeholder="Kraj" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Cena:</label>
                                        <input type="text" name="price" onChange={this.handlePrice} placeholder="Cena" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="winetype">Typ:</label>
                                        <input type="text" name="winetype" onChange={this.handleWineType} placeholder="Typ" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="capacity">Pojemność:</label>
                                        <input type="text" name="capacity" onChange={this.handleCapacity} placeholder="Pojemność" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="alcoholicstrength">Procent:</label>
                                        <input type="text" name="alcoholicstrength" onChange={this.handleAlcoholicStrength} placeholder="Procent" />
                                    </div>
                                    <div>
                                        <label htmlFor="img">Zdjecie: </label>
                                        <input type="file" name="img" onChange={this.handleImage} />
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