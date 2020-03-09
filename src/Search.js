import React from "react";
import "./App.css";
import "./Search.css";
import firebase from "./Firebase.js";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      websiteName: "EXPLORICA",
      data: [],
      inputValue: "",
      searchArray: [],
      pictureData: [],
      photoArray: [],
      actualCityData: [],
      actualPhotoData: []
    };
  }

  componentDidMount() {
    let database = firebase.database();
    this.setState({
      database: database
    });
  }

  /**
   * Get all venues for a city
   * @param {string} place - the location to get venues from
   */

  getCityVenueData = async (place) => {
    const url = `https://api.foursquare.com/v2/venues/explore?categoryId=4bf58dd8d48988d12d941735,4bf58dd8d48988d181941735,4deefb944765f83613cdba6e&client_id=JDFOE0O0TWPFCHRHQAHMUKIUQJT32XANBRVKV0Q5KTDZM2FY&client_secret=NLBE1S1XICQWIUNIHBDXMWVM2N4NXAXQ1N5EMXTNLVRZMBPE&v=20180323&limit=8&near=${place}`;
    const res = await fetch(url)
    const data = await res.json();
    return data.response.groups[0].items.map(item => item.venue);
  }

  /**
   * Get a photo for a venue
   * @param {string} venueId - the id of the venue
   */
  getVenuePhoto = async (venueId) => {
    const url = `https://api.foursquare.com/v2/venues/${venueId}/photos?/&client_id=JDFOE0O0TWPFCHRHQAHMUKIUQJT32XANBRVKV0Q5KTDZM2FY&client_secret=NLBE1S1XICQWIUNIHBDXMWVM2N4NXAXQ1N5EMXTNLVRZMBPE&v=20180323`
    const res = await fetch(url);
    const data = await res.json();
    return data.response.photos.items[0];
  }

  /**
   * Returns an array of venues containing relevant data
     and a single photo
   */
  getVenueData = async () => {
    const venues = await this.getCityVenueData(this.state.inputValue);
    return Promise.all(venues.map(async venue => {
      const photo = await this.getVenuePhoto(venue.id);
      return {
        title: venue.name,
        city: venue.location.city,
        country: venue.location.country,

        photo: {
          id: photo.id,
          prefix: photo.prefix,
          suffix: photo.suffix,
          size: 'height300',
        }
      }
    }))
  }

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const venueData = await this.getVenueData();
    this.setState({
      cardArray: venueData,
    })
  };

  favoriteClick = placeObject => {
    this.state.database.ref("favoriteSavedFirebase").push({
      ...placeObject
    });
  };

  handleClick = e => {

  }

  render() {
    return (
      <main className="container p-3">
        <h2 className="description">Explorica helps you search the world for its wonders and attractions.</h2>
        <form className="row justify-content-center" onSubmit={this.handleSubmit}>
          <input placeholder="Which country or city would you like to explore..." type="text" className="" value={this.state.inputValue} onChange={this.handleChange} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Where would you like to explore..."}/>
          <button className="btn btn-primary"> Go! </button>
        </form>
        <div className="row justify-content-center">
          {this.state.cardArray && this.state.cardArray.map((place, index) => {
              return (
                <div key={index} className="card col-lg-4 pb-2 m-1">
                  <img alt="travel-location" src={`${place.photo.prefix}` + `${place.photo.size}` + `${place.photo.suffix}`}/>
                  <p className="row justify-content-center title">{place.title}</p>
                  <p className="row justify-content-center location">{place.city}, {place.country}</p>
                  <button className="btn btn-success" size="sm" onClick={e => this.favoriteClick(place)}> Favorite this</button>
                </div>
              );
            })}
        </div>
      </main>
    );
  }
}
