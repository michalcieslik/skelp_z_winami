import React from "react";
import history from '../history';
import { Product } from "./product";
import './productList.scss'

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wineList: this.props.wineList
            //winesNotEmpty: false
        }
        //this.getWines();
        console.log("Dupa");
    }

    // getWines() {
    //     let json
    //     const data = {
    //         jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDQ4NTk3MzEsIm5iZiI6MTY0NDg1OTczMSwiZXhwIjoxNjQ0ODc3NzMxLCJpc3MiOiJodHRwczovL3M0MDIzNDAubGFiYWdoLnBsL0FQSSIsImRhdGEiOnsiaWQiOiI5IiwiYWNjVHlwZSI6IkN1c3RvbWVyIn19.f4PRoLl7PsV8cmIvxv-l7I14-ZO0KLlDd4Zhyq1eb3M"
    //     }
    //     fetch('https://s402340.labagh.pl/API/Wines/filter-wines.php', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //         json = data.wines;
    //         this.setState({wineList: json});
    //         this.setState({winesNotEmpty: true});
    //     })
    //     .catch((error) => {
    //         console.error('Error', error);
    //     });
    //     console.log('test1');
    // }


    render() {
        const {wineList} = this.state;
        const isReady = this.state.winesNotEmpty;
        return(
            <div className="productList">
                {wineList.map((wine) => (
                    <Product name = {wine.name} 
                    price = {wine.price} 
                    id = {wine.id} 
                    img_path = {wine.img_path}
                    country = {wine.country}
                    strength = {wine.alcoholic_strength}
                    capacity = {wine.capacity}
                    quantity = {wine.quantity}
                    type = {wine.wine_type}
                    //importer = {wine.}
                    />
                ))}
            </div>
        )
    }
}