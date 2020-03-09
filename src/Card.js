import React from "react";
import "./App.css";

export default class Card extends React.Component {
  state = {
    value: ""
  };

  handleUpdateChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  triggerUpdateChange = e => {
    this.props.update(e, this.props.place.key, this.state.value);
  };

  render() {
    return (
      <div className="card col-lg-4 pb-2 m-1">
        <img alt="travel-locations" src={`${this.props.place.item.photo.prefix}` + `${this.props.place.item.photo.size}` + `${this.props.place.item.photo.suffix}`}/>
        <p className="row justify-content-center title">{this.props.place.item.title}</p>
        <p className="row justify-content-center location">{this.props.place.item.city}, {this.props.place.item.country}</p>
        <p>{this.props.place.item.notes}</p>

        <input
          type="text"
          value={this.state.value}
          onChange={this.handleUpdateChange}
        />
        <button onClick={e => this.triggerUpdateChange(e)}>Update Note</button>
        <button
          className="btn btn-danger"
          size="sm"
          onClick={e => this.props.delete(this.props.place.key)}
        >
          Remove
        </button>
      </div>
    );
  }
}
