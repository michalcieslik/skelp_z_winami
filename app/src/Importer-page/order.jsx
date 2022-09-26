import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import Cookies from 'js-cookie'

function Order(props) {
    
    const [winneId] = useState(props.id);
    console.log(winneId);
    const [howMany, setHowMany] = useState(1);

    const PlusButtonClick = () => {
        setHowMany(howMany + 1)
    }

    const MinusButtonClick = () => {
        if (howMany > 0) {
            setHowMany(howMany - 1)
        }
    }

    const DodajButtonClick = () => {
        let json
        const data = {
            jwt: Cookies.get('jwt'),
            wineId: winneId,
            quantity: howMany
        }
        fetch('https://s402340.labagh.pl/API/Importer/create-new-import.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            //data = JSON.parse(data);
            //console.log(data);
            //data = data.wines;
            //console.log(data);
            setHowMany(1);
            //console.log(this.state.ShouldWeRender);
            //this.setState({importList: data});
            json = data;
        })
        .catch((error) => {
            console.error('Error', error);
        });
    }

    return (
        <div className="order">
            <div className="content">
                <div className="header">
                    {props.name}
                </div>
                <div className="content2">
                    <div className="image">
                        <img src={`https://s402340.labagh.pl${props.img_path}`}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            Kraj: {props.country}
                        </div>
                        <div className="form-group">
                            Cena: {props.price}
                        </div>
                        <div className="form-group">
                            Typ: {props.wine_type}
                        </div>
                        <div className="form-group">
                            Procent: {props.alcoholic_strength}
                        </div>
                    </div>
                    <div className="content">
                        <div className="content2">
                            <div className="form">
                                <div className="form-group2">
                                    <div>
                                        Ilość:
                                    </div>
                                    <div>
                                        {howMany}
                                    </div>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group3">
                                    <button className="button" className="btn" onClick={PlusButtonClick}>
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group3">
                                    <button className="button" className="btn" onClick={MinusButtonClick}>
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <div className="form-group2">
                                <button className="button" className="btn" onClick={DodajButtonClick}>
                                    Dodaj
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;