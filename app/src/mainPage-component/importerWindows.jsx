import React from "react";
import './helloPage.scss';
import { withRouter } from "react-router";
export class ImportWindowElement extends React.Component {

    render() { 
        return (
            <div className="container">
                <h3>Jeśli jesteś importerem, przejdź do strony logowania dla importerów</h3>
                <button type="button" className="btn" onClick={() => this.props.history.push('/ImporterLoginPage')}>Logowanie dla importerów</button>
            </div>
        )
    }

}

export const ImportWindow = withRouter(ImportWindowElement)