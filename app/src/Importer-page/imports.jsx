import React, { useState } from "react";
import profilePicture from "../userdefault.png";
import "./style.scss";
import Order from "./order";
import Cookies from 'js-cookie'
import { withRouter } from "react-router";

export class ImportsComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ShouldWeRender: false,
            importList: []
            
            //ImporterDate: this.GetImporter(),
        }
        this.GetImports();
        //console.log('data:', this.state.importList, this.state.ShouldWeRender);
    }

    GetImports() {
        let json
        const data = {
            jwt: Cookies.get('jwt'),
        }
        fetch('https://s402340.labagh.pl/API/Importer/get-importer-wines.php', {
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
            data = data.wines;
            //console.log(data);
            this.setState({ShouldWeRender: true});
            //console.log(this.state.ShouldWeRender);
            this.setState({importList: data});
            json = data;
        })
        .catch((error) => {
            console.error('Error', error);
        });
        //return json
    }

    ButtonPress = (e) => {
        //przejscie do//xx
        this.props.history.push('/AddWinePage');
    }

    render(){
        const {importList} = this.state;
        const AreWeRender = this.state.ShouldWeRender;
    return (
        <div className="basket">
            <div className="container-basket">
                <div className="user-container">
                    <div className="header">Importy</div>
                    <div > 
                        {AreWeRender
                            && importList.map((order) => (
                                <Order
                                    //key={order}
                                    name={order.name}
                                    country={order.country}
                                    price={order.price}
                                    quantity={order.quantity}
                                    wine_type={order.wine_type}
                                    alcoholic_strength={order.alcoholic_strength}
                                    id={order.id}
                                    img_path={order.img_path}
                                />
                            ))
                        }
                    </div>
                    <div className="footeroutside">
                        <button type="button" className="btn" onClick={this.ButtonPress}>
                            Dodaj wino
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}
}

export const Imports = withRouter(ImportsComponent);