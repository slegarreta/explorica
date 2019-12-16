import React from 'react';
import './App.css';
import firebase from './Firebase.js';

export default class Search extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        websiteName: 'EXPLORICA',
        data: [],
        inputValue: '',
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
      })
      // let favoriteSavedArray = database.ref('favoriteSavedFirebase')
    }


makeRequest = () => {
    let actuallyPhotoData = [];
    let actualPhotoData = [];
    let actualCityData = [];
    var photoAndSearchData = [];



    const place = this.state.inputValue;
    const url = `https://api.foursquare.com/v2/venues/explore?categoryId=4deefb944765f83613cdba6e&client_id=JDFOE0O0TWPFCHRHQAHMUKIUQJT32XANBRVKV0Q5KTDZM2FY&client_secret=NLBE1S1XICQWIUNIHBDXMWVM2N4NXAXQ1N5EMXTNLVRZMBPE&v=20180323&limit=8&near=${place}`;

// first fetch call to foursquare returning 8 venues for location searched (picture data not included in response)
  Promise.all([
    fetch(url)])
    .then((response) => {
        return response.json();
        }).then((data) => {

        let allCities = data.response.groups[0].items;

        for (let key of allCities) {
            let searchData = {
              title: key.venue.name,
              city: key.venue.location.city,
              country: key.venue.location.country,
              photoId: key.venue.id
            }

            let venueIdArray = {
              photoId: key.venue.id
            }
            actualCityData.push(searchData);
            actualPhotoData.push(venueIdArray);
          }; /* end of for loop, placed response data in 2 arrays, need venueIdArray for 2nd fetch call (loop of 8 fetch calls) */

  // for loop for second fetch call (loop of 8 fetch calls) to foursquare returning photos for 8 venues, fetch calls made with venue IDs returned with first fetch call

        for (let i = 0; i < actualPhotoData.length; i++) {

          var venueId = actualPhotoData[i].photoId;
          let photoUrl = `https://api.foursquare.com/v2/venues/${venueId}/photos?/&client_id=JDFOE0O0TWPFCHRHQAHMUKIUQJT32XANBRVKV0Q5KTDZM2FY&client_secret=NLBE1S1XICQWIUNIHBDXMWVM2N4NXAXQ1N5EMXTNLVRZMBPE&v=20180323`;

          fetch(photoUrl).then((response) => {
            return response.json();
          }).then((photoData) => {
            // console.log(photoData);
            actuallyPhotoData.push({
              returnPhotoId: photoData.meta.requestId,
              returnVenueId: i,
              prefix: photoData.response.photos.items[0].prefix,
              size: '300x500',
              suffix: photoData.response.photos.items[0].suffix
            });

            actuallyPhotoData.sort((a,b) => a.returnVenueId - b.returnVenueId);


            for (let j = 0; j < actualCityData.length; j++) {
              // console.log(actuallyPhotoData, actualCityData);
              photoAndSearchData.push({
                key1: actualCityData[j],
                key2: actuallyPhotoData[j]
              });
          console.log(photoAndSearchData)
  // actuallyPhotoData does not push to photoAndSearchData. even though it appears on line 91 console.log, it does not appear in console.log on line 98. perhaps the 2nd loop of fetch calls takes too long and i need to use async/await?

          }
              // this.setState({
              //   cardArray: photoAndSearchData
              // })

          console.log(this.state)
        }
      )}
      console.log(photoAndSearchData)

      // attempt to loop throught both arrays needed for render (names of cities, and pictures of cities) to merge into one array so it can be mapped in the render
    })
  }; /*end of the makeRequest method */

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
                {this.state.cardArray && this.state.cardArray.map((place,index) => {
                  return (
                    <div className="card col-lg-4 p-2 m-1">
                         <p className="row justify-content-center title">{place.key1.title}</p>
                         <img alt="travel-place" src={`${place.key2.prefix}+${place.key2.size}+ ${place.key2.suffix}`}/>
                         <p className="row justify-content-center location">{place.key1.city}, {place.key1.country}</p>
                        <button className="btn btn-success" size="sm" onClick={(e) => this.favoriteClick(place)}>Favorite this</button>
                    </div>
                  );
                })}
          </div>

        </main>
      );
  }
}
