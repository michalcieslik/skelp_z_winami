import React from "react";
import loginImg from "../login.jpg";
import Cookies from 'js-cookie';
import { withRouter } from "react-router";
class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFailed: false
        }
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleLogin = (e) => {
        console.log(this.state.password);
        console.log(this.state.email);
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        fetch('https://s402340.labagh.pl/API/Customer/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.hasOwnProperty('jwt')) {
                Cookies.set('jwt', data.jwt);
                this.props.history.push('/ProductList');
            } else {
                this.setState( {isFailed: true} );
            }
        })
        .catch((error) => {
            console.error('Error', error);
        });
    }

    render() {
        return (
        <div className="base-container">
            <div className="header">Wino Wino wypij do dna</div>
            <div className="content">
                <div className="imageLogin">
                    <img src={loginImg}/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="email">E-Mail</label>
                        <input type="text" name="email"  onChange={this.handleEmailChange} placeholder="E-Mail"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input type="text" name="password" onChange={this.handlePasswordChange} placeholder="Hasło"/>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.handleLogin}>
                        Zaloguj
                    </button>
                    <div>
                        {this.state.isFailed &&
                        <div className="errorLogin">Błędny login lub hasło</div>
                        }
                    </div>
                </div>
            </div>
        </div> )
    }
}

export const Login = withRouter(LoginComponent)