import React from "react";
import './helloPage.scss';
import { withRouter } from "react-router";
class CustomerWindowComponent extends React.Component {

    render() {
        return (
            <div className="container">
                <h3>Jeśli jesteś klientem, przejdź do strony logowania dla klientów</h3>
                <button type="button" className="btn" onClick={() => {this.props.history.push('/CustomerLoginPage')}}>
                    Logowanie dla klientów
                </button>
            </div>
        )
    }

}

export const CustomerWindow = withRouter(CustomerWindowComponent)