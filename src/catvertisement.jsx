import React from 'react';
import ReactDOM from 'react-dom';

class Catvertisement extends React.Component {
render(){
  var adStyle = {
    width:"100%",
    height: "150px",
    backgroundImage: "url(" +  this.props.queryString  + ")",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  return (<tr className="adr">
            <td colSpan="5" className="ad"><div style={adStyle}> Cat-vertisement </div></td>
          </tr>)
  }
}

module.exports = Catvertisement;
