import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import newJson from 'newjson';
import AsciiCardList from './ascii-card-list';
import Catvertisement from './catvertisement';

class WarehouseWrapper extends React.Component {

  constructor() {
    super();
    this.fetchProducts = this.fetchProducts.bind(this);
    this.checkHeight = this.checkHeight.bind(this);
    this.generateAds = this.generateAds.bind(this);

    this.state = {
      isLoading: false,
      isCatalogueFullyLoaded: false,
      adArray: [],
      data: []
    }
  }

  componentDidMount(){
    this.fetchProducts();
    window.addEventListener('scroll', this.checkHeight)
  }

  fetchProducts(isLoadMore = false, limit = 15, skip = 0){
    var component = this;
    $.ajax({
      method: "GET",
      url: '/api/products2s?limit=' + limit + '&skip=' + skip,
      dataType: 'text',
      beforeSend: function(){
        component.setState({
          isLoading: true
        });
      },
      success: function(data) {
        var dataObj = newJson.parse(data),
        dataList = [];
        Object.keys(dataObj).forEach(function(key){
            dataList.push(dataObj[key])
        });

        var originalLength = component.state.data.length,
        newList = component.state.data.concat(dataList),
        adArray = component.generateAds(newList, originalLength, component.state.adArray)

        if(isLoadMore){
          component.setState({
            data: newList,
            adArray: adArray,
            isLoading: false
          });
        } else {
          component.setState({
            data: dataList,
            adArray: adArray,
            isLoading: false
          });
        }

        if(component.state.data.length > 279){
          component.setState({isCatalogueFullyLoaded: true});
        }
      },
      error: function(xhr, status, err) {
        console.log(status);
        console.log(err);
      }
    });
  }

  checkHeight(){
    var asciiList = document.getElementsByClassName('ascii-card-list')[0],
    asciiListHeight = asciiList.clientHeight,
    asciiIndex = this.state.data.length,
    bottomOfWindow = window.pageYOffset + window.innerHeight;

    if (asciiListHeight - bottomOfWindow < 150 && !this.state.isLoading){ //if page bottom is close to asciiList
        this.fetchProducts(true, 15, asciiIndex);
    }
  }

  generateAds(asciiArray, startIndex = 0, adArray){
    var length = asciiArray.length;
    for(var i = startIndex; i < length; i++){
      if(i % 20 === 0 && i != 0 && i != 280 && i >= startIndex){
        var newAd = "/ad/?r=" + Math.floor(Math.random()*1000);
        var lastAd = this.state.adArray.length > 1 ? this.state.adArray[this.state.adArray.length - 1] : "";

        if(newAd != lastAd){
          adArray.push({
            isCatvertisement: true,
            queryString: newAd
          });
        }
      }
    }
    return adArray
  }

  render(){
    var loadingMessage = <div><img src="./hex-loader.gif" /></div>;
    var catalogueFullyLoadedMessage = <div>That's it! thanks for shopping at discount ascii warehouse!</div>

    return (
      <div className="ascii-card-list-wrapper">
      <h1>Discount Ascii Warehouse</h1>
      <AsciiCardList data={this.state.data} adArray={this.state.adArray} />
      {this.state.isLoading && !this.state.isCatalogueFullyLoaded ? loadingMessage : ""}
      {this.state.isCatalogueFullyLoaded ? catalogueFullyLoadedMessage : ""}
      </div>
    )
  }
}



ReactDOM.render(<WarehouseWrapper />, document.getElementById('main'));
