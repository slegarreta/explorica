import React from 'react';
import './App.css';
import firebase from './Firebase.js';

export default class Search extends React.Component {

state = {
    websiteName: 'EXPLORICA',
		data: [],
    inputValue: '',
    searchArray: [],
    pictureData: []
	};

componentDidMount() {

  		let database = firebase.database();

      this.setState({
  			database: database
      })
      let favoriteSavedArray = database.ref('favoriteSavedFirebase');

}


makeRequest = () => {
    let allCities = [];
    let actualData = [];
    const place = this.state.inputValue;
    const laPhotoID = "4efe34736da1cd035752078a";
    const url = `https://api.foursquare.com/v2/venues/explore?categoryId=4deefb944765f83613cdba6e&client_id=JDFOE0O0TWPFCHRHQAHMUKIUQJT32XANBRVKV0Q5KTDZM2FY&client_secret=NLBE1S1XICQWIUNIHBDXMWVM2N4NXAXQ1N5EMXTNLVRZMBPE&v=20180323&limit=8&near=${place}`;

    // fetch call for foursquare venues
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({
          data: data
        })
        console.log(this.state.data);
        allCities = data.response.groups[0].items;

        for (let key of allCities) {
            let searchData = {
              title: key.venue.name,
              city: key.venue.location.city,
              country: key.venue.location.country,
              photoId: key.venue.id
            }
            actualData.push(searchData);
            };
        this.setState({
          searchArray: actualData
        })


        for (let i = 0; i < this.state.searchArray.length; i++) {
          // console.log(this.state.searchArray[i].photoId)
          const venueId = this.state.searchArray[i].photoId;

          const photoUrl = `https://api.foursquare.com/v2/venues/${venueId}/photos?/&client_id=JDFOE0O0TWPFCHRHQAHMUKIUQJT32XANBRVKV0Q5KTDZM2FY&client_secret=NLBE1S1XICQWIUNIHBDXMWVM2N4NXAXQ1N5EMXTNLVRZMBPE&v=20180323`;
          fetch(photoUrl).then((response) => {
            return response.json();
          }).then((photoData) => {
            this.setState({
              pictureData: [...this.state.pictureData, {photoData: photoData}]
            })
            console.log(this.state.pictureData);
            console.log(this.state.searchArray);
          })
        };

      }) /* end of the then block */


    

  }; /*end of makeRequest method */


  handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
  }

  handleSubmit = (e) => {
        e.preventDefault();
        this.makeRequest();
  }

  favoriteClick = (placeObject) => {
    this.state.database.ref('favoriteSavedFirebase').push({
      ...placeObject
    })
  }

render() {
  return (
    <main className="container p-3">
          <h1 className="row justify-content-center">{this.state.websiteName}</h1>
          <form className="row justify-content-center" onSubmit={this.handleSubmit}>
            <input type="text" className="" value={this.state.inputValue} onChange={this.handleChange} />
            <button className="btn btn-primary">Where do you want to explore?</button>
          </form>
          <div className="row justify-content-center">
                {this.state.data.response && this.state.searchArray.map((place,index) => {
                  return (
                    <div className="card col-lg-4 p-2 m-1">
                         <p className="row justify-content-center title">{place.title}</p>
                         <img src="https://cdn.pixabay.com/photo/2018/08/01/21/26/map-3578213_960_720.jpg"/>
                         <p className="row justify-content-center location">{place.city}, {place.country}</p>
                        <button className="btn btn-success" size="sm" onClick={(e) => this.favoriteClick(place)}>Favorite this</button>
                    </div>
                  );
                })}
          </div>

        </main>
  );
}
}
