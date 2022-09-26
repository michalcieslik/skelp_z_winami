import React from "react";
import loginImg from "../login.jpg";

export class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleRegister = (e) => {
        console.log(this.state.password);
        console.log(this.state.email);
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        fetch('https://s402340.labagh.pl/API/Customer/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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

    render() {
        return (
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Zarejestruj</div>
            <div className="content">
                <div className="imageLogin">
                    <img src={loginImg}/>
                </div>
                <form>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="email">E-Mail</label>
                        <input type="text" name="email" onChange={this.handleEmailChange} placeholder="E-Mail"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input type="text" name="password" onChange={this.handlePasswordChange} placeholder="Hasło"/>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.handleRegister}>
                        Zarejestruj
                    </button>
                </div>
                </form>
            </div>
        </div> )
    }
}