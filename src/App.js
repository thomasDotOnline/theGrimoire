import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Header from "./Header.js";
import Footer from "./Footer.js"
import firebase from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      pageNumber: 1,
      spellBook: [],
      userId: "",
    };
  }

  componentDidMount() {
    // axios call
    axios({
      method: "GET",
      url: "https://api.open5e.com/spells/",
      dataResponse: "json",
      params: {
        format: "json",
        page: this.state.pageNumber,
      },
    }).then((res) => {
      this.setState({
        data: [...res.data.results],
        isLoading: false,
      });
    });

    // firebase logic start 

    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const newState = [];
      const data = response.val();
      if (data) {
        const user = data.users[this.state.userId];

        for (const key in user) {
          newState.push({
            key: key,
            spellData: user[key],
          });
        }

        this.setState({
          spellBook: newState,
        });
      }
    });

    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;

        this.setState({
          userId: uid,
        });
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
  }
  handleClick = (event) => {
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(this.state.userId).push(event);
  };

  handleRemove = (spellBookKey) => {
    const dbRef = firebase.database().ref();

    dbRef.child("users").child(this.state.userId).child(spellBookKey).remove();
  };

  // firebase logic end

  // page change logic start
  getSpells = (page) => {
    axios({
      method: "GET",
      url: "https://api.open5e.com/spells/",
      dataResponse: "json",
      params: {
        format: "json",
        page: this.state.pageNumber,
      },
    }).then((res) => {
      this.setState({
        data: [...res.data.results],
        isLoading: false,
      });
    });
  };

  handleNextPage = () => {
    if ((this.state.pageNumber > 1, this.state.pageNumber < 7)) {
      const nextPage = this.state.pageNumber + 1;
      this.setState(
        {
          pageNumber: nextPage,
        },
        () => {
          this.getSpells(nextPage);
        }
      );
    }
  };

  handlePrevPage = () => {
    if ((this.state.pageNumber < 7, this.state.pageNumber > 1)) {
      const prevPage = this.state.pageNumber - 1;
      this.setState(
        {
          pageNumber: prevPage,
        },
        () => {
          this.getSpells(prevPage);
        }
      );
    }
  };
  // page change logic end

  render() {
    return (
      <div>
        <div className="App wrapper">
          <Header />
          {/* spellbook rendered from firebase */}
          <div className="spellBookContainer">
            <h2>Your Spellbook</h2>
            <div className="spellBook">
              {this.state.isLoading ? (
                <p>Loading...</p>
              ) : (
                this.state.spellBook.map((spellRes) => {
                  return (
                    <div key={spellRes.key} className="spellBookItem">
                      <div className="spellContent">
                        <h3>{spellRes.spellData.name}</h3>
                        <h4>{spellRes.spellData.level}</h4>
                        <h4>{spellRes.spellData.range}</h4>
                        <p className="description">{spellRes.spellData.desc}</p>
                        <button onClick={() => this.handleRemove(spellRes.key)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="spellsContainer">
            <div className="buttonContainer">
              {/* axios page change */}
              <button
                onClick={() => {
                  this.handlePrevPage();
                }}
              >
                previous page
              </button>
              <button
                onClick={() => {
                  this.handleNextPage();
                }}
              >
                next page
              </button>
            </div>
            <div className="contentContainer">
              <h2>Compendium of Spells</h2>
              {/* axios call render */}
              <div className="spells">
                {this.state.isLoading ? (
                  <p>Loading...</p>
                ) : (
                  this.state.data.map((spell) => {
                    return (
                      <div className="spellCard" key={spell.slug}>
                        <div className="spellContent">
                          <h3>{spell.name}</h3>
                          <h4>{spell.level}</h4>
                          <h4>{spell.range}</h4>
                          <p className="description">{spell.desc}</p>
                          <button
                            onClick={
                              (() => this.handleClick(spell.name),
                              () => this.handleClick(spell))
                            }
                          >
                            Transcribe
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
