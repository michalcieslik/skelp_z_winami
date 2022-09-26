import React from "react";
import history from '../history';
import Cookies from 'js-cookie'
export class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
    }

    addToCart = () => {
        console.log(this.state.id);
        const data = {
            jwt: Cookies.get('jwt'),
            wineId: this.state.id,
            amount: "1"
        }
        fetch('https://s402340.labagh.pl/API/Customer/add-to-basket.php', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error', error);
        });
    }

    showInfo = () => {

    }

    render() {
        return(
            <div className="product" onClick={this.showInfo}>
                <img width="200px" height="300px" src={`https://s402340.labagh.pl${this.props.img_path}`}/>
                <div><h3>{this.props.name}</h3></div>
                <div class="dropdown">
                    <button class="dropbtn">Więcej informacji</button>
                        <div class="dropdown-content">
                            <a>Kraj pochodzenia: {this.props.country}</a>
                            <a>Zawartość alkoholu: {this.props.strength}</a>
                            <a>Pojemność: {this.props.capacity}</a>
                            <a>Typ: {this.props.type}</a>
                            <a>Ilość dostępnych sztuk: {this.props.quantity}</a>
                        </div>
                </div>
                <div><h4>{this.props.price}</h4></div>
                <button className="buttonProduct" onClick={this.addToCart}>Dodaj do koszyka</button>
            </div>
        )
    }
}