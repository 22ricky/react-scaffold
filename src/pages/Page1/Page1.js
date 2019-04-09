import React, { Component } from 'react';
import style from './Page1.css';
import image from './images/horse.png';

export default class Page1 extends Component {
  render() {
    return (
      <div className={style.box}>
        This is Page1~
        <img src={image} />
      </div>
    );
  }
}