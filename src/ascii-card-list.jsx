import React from 'react';
import ReactDOM from 'react-dom';
import AsciiCard from './ascii-card'
import Catvertisement from './catvertisement'


class AsciiCardList extends React.Component {

  constructor() {
    super();
    this.state = {
      sortedBy: false
    }
  }

  makeList(heapOfAsciis){
    var list = heapOfAsciis.map((ascii, index) => {
      if(ascii.isCatvertisement){
        return (<Catvertisement queryString={ascii.queryString} key={index}/>)
      } else {
        return (<AsciiCard ascii={ascii} key={index}/>);
      }
    })
    return list;
  }

  sortList(event){
    var OGlist = this.props.data,
    sortType = event.target.getAttribute("data-sort"),
    allAds,
    sortedList;

    if(this.state.sortedBy != sortType){
      sortedList = this.props.data.sort(function(a,b){
        if(a[sortType] > b[sortType]){return 1}
        if(a[sortType] < b[sortType]){return -1}
        else{return 0}
        })
    } else {
      sortedList = this.props.data.reverse()
    }
    this.setState({data: sortedList, sortedBy: sortType});
  }

  injectAds(asciiArray, adArray){
    var totalLength = asciiArray.length,
    newArray = [],
    adCounter = 0;

    for(var i = 0; i < totalLength; i++){
      if(i % 20 === 0 && i != 0 && i != 280){
        var adToPush = adArray[adCounter];
        adCounter++;
        newArray.push(adToPush)
      } else {
        newArray.push(asciiArray[i])
      }
    }
    return newArray;
  }

  render(){
    var listWithAds = this.injectAds(this.props.data, this.props.adArray);
    var finalList = this.makeList(listWithAds);

    return (
      <table className="hover ascii-card-list">
        <thead>
          <tr>
            <th className="table-header-id" onClick={this.sortList.bind(this)} data-sort="id">ID</th>
            <th className="table-header-face">Face</th>
            <th className="table-header-size" onClick={this.sortList.bind(this)} data-sort="size">Size</th>
            <th className="table-header-price" onClick={this.sortList.bind(this)} data-sort="price">Price</th>
            <th className="table-header-added">Added</th>
          </tr>
        </thead>
        <tbody>
          {finalList}
        </tbody>
      </table>
    )
  }
}

module.exports = AsciiCardList;
