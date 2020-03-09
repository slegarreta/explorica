import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {

navSlide() {
    // const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelector('.nav-links li');

    // hamburger.addEventListener('click', () => {

    nav.classList.toggle('nav-active');
    // navLinks.forEach((link, index) => {

      for(let i = 0; i < navLinks.length; i++){
        let link = navLinks;
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${i / 7 + 1.5}s`;
      }
    }
    // });
  // }
  // )
}

render(){
  return (
    <nav className="navbar fixed-top">
      <div className="logo">
        <Link to="/">
          <h3>EXPLORICA</h3>
        </Link>
      </div>
      <ul className="nav-links">
        <Link to="/">
          <li>Search</li>
        </Link>
        <Link to="/Favorites">
          <li>Favorites</li>
        </Link>
      </ul>
      <div className="hamburger-menu" onClick={this.navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );

}
  
}
