import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import NumberFormat from 'number-format.js';


class AsciiCard extends React.Component {

  constructor() {
    super();
  }

  parseDate(dateString){
    var now = Moment(),
    date = Moment(Date.parse(dateString));

    if(date.add(7,'days') < now){
      return date.fromNow();
    } else {
      return date.format('DD/MM/YYYY');
    }
  }

  parseDollar(numberCents){
    return NumberFormat( "$ #,###.00", numberCents);
  }

  render(){
    var formattedDate = this.parseDate(this.props.ascii.date);
    var formattedDollar = this.parseDollar(this.props.ascii.price/100);
    var faceFontSize = {"fontSize": this.props.ascii.size};

    return(
      <tr>
        <td>{this.props.ascii.id}</td>
        <td style={faceFontSize}>{this.props.ascii.face}</td>
        <td>{this.props.ascii.size}</td>
        <td>{formattedDollar}</td>
        <td>{formattedDate}</td>
      </tr>
    )
  }
}

module.exports = AsciiCard;
