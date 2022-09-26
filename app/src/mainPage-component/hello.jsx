import React from 'react';
import { CustomerWindow } from './customerWindow';
import { ImportWindow } from './importerWindows';
import loginImg from "../login.jpg";
import './helloPage.scss'

export default class Hello extends React.Component {

    render() {
        return (
            <div>
                <div className="image">
                    <img src={loginImg}/>
                </div>
                <div className="box">
                    <div>
                        <ImportWindow/>
                    </div>
                    <div>
                        <CustomerWindow/>
                    </div>
                </div>
            </div>
        )
    };
}