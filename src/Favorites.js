import React from "react";
import "./App.css";
import firebase from "./Firebase.js";
import Card from "./Card";

export default class Favorites extends React.Component {
  state = {
    favoritePlaces: []
  };

  componentDidMount() {
    let database = firebase.database();

    this.setState({
      database: database
    });
    let favoriteSavedArray = database.ref("favoriteSavedFirebase");

    favoriteSavedArray.on("value", response => {
      let favoritesData = response.val();

      let favoritesArray = [];

      for (let item in favoritesData) {
        favoritesArray.push({
          key: item,
          item: favoritesData[item]
        });
      }

      this.setState({
        favoritePlaces: favoritesArray
      });
      console.log(this.state.favoritePlaces);
    });
  }

  delete = key => {
    this.state.database.ref("favoriteSavedFirebase/" + key).remove();
  };

  update = (e, key, info) => {
    this.state.database.ref("favoriteSavedFirebase/" + key).update({
      notes: info
    });
  };

  render() {
    let favoritePlaces = this.state.favoritePlaces.map((place, index) => {
      return <Card place={place} delete={this.delete} update={this.update} />;
    });
    return (
      <main className="container p-3">
        <div>
          <h2>Favorites</h2>
          <div className="row justify-content-center">{favoritePlaces}</div>
      </div>
      </main>
    );
  }
}
