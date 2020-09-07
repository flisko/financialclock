import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
var moment = require('moment-timezone');
const forextokyostart = "9:00AM";
const forextokyoend = "6:00PM";
const forexlondonstart = "8:00AM";
const forexlondonend = "4:00PM";
const forexnewyorkstart = "8:00AM";
const forexnewyorkend = "4:00PM";
const stonktokyostart ="9:00AM";
const stonktokyoend = "15:00PM";
const stonklondonstart ="8:00AM";
const stonklondonend = "4:30PM";
const stonknewyorkstart = "9:30AM";
const stonknewyorkend = "4:00PM";
const tokyozone = "Asia/Tokyo";
const londonzone = "Europe/London";
const newyorkzone = "America/New_York";

class App extends Component {
  state = {
    account: null,
    headerValue: null
  };

  isOpen(openTime, closeTime, timezone) {

    // handle special case
    if (openTime === "24HR") {
      return "open";
    }

    // get the current date and time in the given time zone
    const now = moment.tz(timezone);

    // Get the exact open and close times on that date in the given time zone
    // See https://github.com/moment/moment-timezone/issues/119
    const date = now.format("YYYY-MM-DD");
    const storeOpenTime = moment.tz(date + ' ' + openTime, "YYYY-MM-DD h:mmA", timezone);
    const storeCloseTime = moment.tz(date + ' ' + closeTime, "YYYY-MM-DD h:mmA", timezone);

    let check;
    if (storeCloseTime.isBefore(storeOpenTime)) {
      // Handle ranges that span over midnight
      check = now.isAfter(storeOpenTime) || now.isBefore(storeCloseTime);
    } else {
      // Normal range check using an inclusive start time and exclusive end time
      check = now.isBetween(storeOpenTime, storeCloseTime, null, '[)');
    }
    let timeuntil;
    if (check) {
      timeuntil = now.to(storeCloseTime);
      console.log(timezone + now.to(storeCloseTime));
      return check ? "Open, closes   " + timeuntil : "closed";
    } else {

      timeuntil = now.to(storeOpenTime);
      console.log(timezone + now.to(storeOpenTime));
      timeuntil = timeuntil.toString().replace("ago", "");
      return check ? "Open " : "closed, opens  " + timeuntil;
    }
  }

  componentDidMount() {
    // const zone = "Asia/Tokyo";
    //console.log("now", moment.tz(zone).format("h:mmA"));
    //console.log("9:00AM-6:00PM", this.isOpen(forextokyostart, forextokyoend, tokyozone));
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification is-primary">
                    <p className="title">Forex Tokyo</p>
                    <p className="subtitle">Open :{forextokyostart}</p>
                    <p className="subtitle">Close: {forextokyoend}</p>
                    <p className="subtitle">status: {this.isOpen(forextokyostart, forextokyoend, tokyozone)}</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification is-primary">
                    <p className="title">Forex London</p>
                    <p className="subtitle">Open :{forexlondonstart}</p>
                    <p className="subtitle">Close: {forexlondonend}</p>
                    <p className="subtitle">status: {this.isOpen(forexlondonstart, forexlondonend, londonzone)}</p>
                  </article>
                </div>

                <div className="tile is-parent">
                  <article className="tile is-child notification is-primary">
                    <p className="title">Forex New York</p>
                    <p className="subtitle">Open :{forexnewyorkstart}</p>
                    <p className="subtitle">Close: {forexnewyorkend}</p>
                    <p className="subtitle">status: {this.isOpen(forexnewyorkstart, forexnewyorkend, newyorkzone)}</p>
                  </article>
                </div>
              </div>
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification is-primary">
                    <p className="title">STONK Tokyo</p>
                    <p className="subtitle">Open :{stonktokyostart}</p>
                    <p className="subtitle">Close: {stonktokyoend}</p>
                    <p className="subtitle">status: {this.isOpen(stonktokyostart, stonktokyoend, tokyozone)}</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification is-primary">
                    <p className="title">STONK London</p>
                    <p className="subtitle">Open :{stonklondonstart}</p>
                    <p className="subtitle">Close: {stonklondonend}</p>
                    <p className="subtitle">status: {this.isOpen(stonklondonstart, stonklondonend, londonzone)}</p>
                  </article>
                </div>

                <div className="tile is-parent">
                  <article className="tile is-child notification is-primary">
                    <p className="title">STONK London</p>
                    <p className="subtitle">Open :{stonknewyorkstart}</p>
                    <p className="subtitle">Close: {stonknewyorkend}</p>
                    <p className="subtitle">status: {this.isOpen(stonknewyorkstart, stonknewyorkend, newyorkzone)}</p>
                  </article>
                </div>
              </div>

            </div>
          </div>

        </header>
      </div>
    );
  }

}

export default App;
