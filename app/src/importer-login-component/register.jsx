import React from "react";
import loginImg from "../login.jpg";

export class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleKrsChange = (e) => {
        this.setState({krs: e.target.value});
    }

    handleLoginChange = (e) => {
        this.setState({login: e.target.value});
    }


    handleRegister = (e) => {
        console.log(this.state.password);
        console.log(this.state.login);
        const data = {
            name: this.state.name,
            password: this.state.password,
            krs: this.state.krs,
            login: this.state.login
        };
        fetch('https://s402340.labagh.pl/API/Importer/register.php', {
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
                        <label htmlFor="name">Nazwa</label>
                        <input type="text" name="name" onChange={this.handleNameChange} placeholder="Nazwa"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input type="text" name="password" onChange={this.handlePasswordChange} placeholder="Hasło"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="krs">KRS</label>
                        <input type="text" name="krs" onChange={this.handleKrsChange} placeholder="KRS"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" onChange={this.handleLoginChange} placeholder="Login"/>
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