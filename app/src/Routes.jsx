import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Hello from './mainPage-component/hello';
import CustomerLoginPage from "./login-component/customerLoginPage";
import ImporterLoginPage from "./importer-login-component/importerLoginPage";
import Filter from "./filter-component/filter"
import FinalImporterPage from "./Importer-page/finalimporterpage";
import AddWine from "./addwine-page/addwine";
import FinalUserPage from "./User-page/finaluserpage";
import AddAddress from "./add-address-page/addaddress";
export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Hello} />
                <Route path="/CustomerLoginPage" component={CustomerLoginPage} />
                <Route path="/ImporterLoginPage" component={ImporterLoginPage} />
                <Route path="/ProductList" component={Filter} />
                <Route path="/ImporterPage" component={FinalImporterPage} />
                <Route path="/AddWinePage" component={AddWine} />
                <Route path="/UserPage" component={FinalUserPage} />
                <Route path="/AddressData" component={AddAddress} />
            </Switch>
        )
    }
}