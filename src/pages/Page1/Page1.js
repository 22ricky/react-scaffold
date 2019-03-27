import React, { Component } from 'react';
import './Page1.css';
import image from './images/horse.png';

export default class Page1 extends Component {
  render() {
    return (
      <div className="page-box">
        This is Page1~
        <img src={image} />
      </div>
    );
  }
}