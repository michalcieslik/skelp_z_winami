import React, { useState } from "react";
import ProductList from "../product-component/productList";
import './style.scss'
import Cookies from 'js-cookie'
import { withRouter } from "react-router";
export default class FilterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            name: "",
            importerName: "",
            price: "",
            countryList: [],
            importerNamesList: [],
            isImporterListPresent: false,
            isCountryListPresent: false,
            filteredWines: [],
            areFilteredWinesPresent: false
        };
        this.getWinesWithoutFilters();
        this.getImporterList();
        this.getCountryList();
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleImporterChange = this.handleImporterChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    getImporterList() {
        const data = {
            jwt: Cookies.get('jwt')
        }
        fetch('https://s402340.labagh.pl/API/Importer/get-all-importers.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ isImporterListPresent: true })
                this.setState({ importerNamesList: data.importers })
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }

    getCountryList() {
        const data = {
            jwt: Cookies.get('jwt')
        }
        fetch('https://s402340.labagh.pl/API/Wines/countries.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ isCountryListPresent: true })
                this.setState({ countryList: data.countries })
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }

    getWinesWithoutFilters(){
        this.setState({areFilteredWinesPresent:false})
        const data = {
            jwt: Cookies.get('jwt')
        }
        fetch(`https://s402340.labagh.pl/API/Wines/filter-wines.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ filtredWines: data.wines })
                this.setState({areFilteredWinesPresent:true})
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }

    handleFilter = (e) => {
        this.setState({areFilteredWinesPresent:false})
        let areSelectsEmpty = true;
        let tempArr = []
        let tempParamString
        if (this.state.country != "") {
            tempArr.push('country=' + this.state.country)
            areSelectsEmpty = false
        }

        if (this.state.importerName != "") {
            tempArr.push('importerName=' + this.state.importerName)
            areSelectsEmpty = false
        }

        if (this.state.price != "") {
            tempArr.push('price=' + this.state.price)
            areSelectsEmpty = false
        }

        if (this.state.name != "") {
            tempArr.push('name=' + this.state.name)
            areSelectsEmpty = false
        }
        if (!areSelectsEmpty) {
            tempParamString = '?'
            tempArr.forEach(element => {
                tempParamString += element + '&'
            });
            tempParamString = tempParamString.slice(0, -1)
        } else
            tempParamString = ""

        const data = {
            jwt: Cookies.get('jwt')
        }
        fetch(`https://s402340.labagh.pl/API/Wines/filter-wines.php${tempParamString}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ filtredWines: data.wines })
                this.setState({areFilteredWinesPresent:true})
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }
    handleCountryChange = (e) => {
        this.setState({ country: e.target.value })
    }
    handleImporterChange = (e) => {
        this.setState({ importerName: e.target.value })
    }
    handlePriceChange = (e) => {
        this.setState({ price: e.target.value })
    }
    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    render() {
        const countryList = this.state.countryList;
        const importerList = this.state.importerNamesList;
        return (
            <div>
                <div className="navbarFilter">
                    <div className="navComponent" onClick={() => {this.props.history.push('/')}}>Wybór użytkownika</div>
                    <div className="navComponent" onClick={() => {this.props.history.push('/ProductList')}}>Strona główna</div>
                    <div className="navComponent" onClick={() => {this.props.history.push('/UserPage')}}>Koszyk</div>
                </div>
                <div className="filters">
                    {this.state.isCountryListPresent &&
                        <div className="filter">
                            <h1>Kraj</h1>
                            <select id="countrySelect" onChange={this.handleCountryChange}>
                                <option value=""></option>
                                {countryList.map((country) => (
                                    <option value={country.country}>{country.country}</option>
                                ))}
                            </select>
                        </div>
                    }
                    {this.state.isImporterListPresent &&
                        <div className="filter">
                            <h1>Dostawca</h1>
                            <select id="importerSelect" onChange={this.handleImporterChange} >
                                <option value=""></option>
                                {importerList.map((importer) => (
                                    <option value={importer.name}>{importer.name}</option>
                                ))}
                            </select>
                        </div>
                    }
                    <div className="filter">
                        <h1>Po cenie</h1>
                        <select id="importerSelect" onChange={this.handlePriceChange} >
                            <option value=""></option>
                            <option value='ASC'>Rosnąco</option>
                            <option value='DESC'>Malejąco</option>
                        </select>
                    </div>
                    <div className="filter">
                        <h1>Po nazwie</h1>
                        <select id="importerSelect" onChange={this.handleNameChange} >
                            <option value=""></option>
                            <option value='DESC'>Rosnąco</option>
                            <option value='ASC'>Malejąco</option>
                        </select>
                    </div>
                    <div>
                        <button className="filterButton" onClick={this.handleFilter}>Filtruj</button>
                    </div>
                </div>
                <div>{this.state.areFilteredWinesPresent &&
                    <ProductList wineList = {this.state.filtredWines}/>}
                </div>
            </div>
        )
    }
}

export const filter = withRouter(FilterComponent)