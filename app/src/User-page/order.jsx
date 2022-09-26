import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import Cookies from 'js-cookie'
import { render } from "@testing-library/react";

export default class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wineId: this.props.id,
            howMany: this.props.amount,
            wineName: this.props.wineName,
            bool: false
        }
        console.log(this.state.howMany);
    }

    // const[winneId] = useState(props.id);
    // console.log(winneId);
    // const[howMany, setHowMany] = useState(props.amount);
    // const[xd, setXd] = useState(0);
    // const[bool, setBool] = useState(false);

    DeleteButtonClick = () => {
        let json
        const data = {
            jwt: Cookies.get('jwt'),
            wineId: this.state.wineId,
        }
        fetch('https://s402340.labagh.pl/API/Customer/delete-from-basket.php', {
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
                //console.log(this.state.ShouldWeRender);
                this.setState({bool: true});
                json = data;
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }

    render() {
        if(this.state.bool){
            return null
        }
        return (
            <div className="order2">
                <div className="content">
                    <div className="content2">
                        <div className="form">
                            {this.state.wineName}
                        </div>
                        <div className="form">
                            Ilość: {this.state.howMany}
                        </div>
                        <div className="forma2">
                            <button className="button" className="btn" onClick={this.DeleteButtonClick}>
                                Usuń z koszyka
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}