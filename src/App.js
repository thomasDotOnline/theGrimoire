import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Header from "./Header.js";
import firebase from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      pageNumber: 1,
      spellBook: [],
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "https://api.open5e.com/spells/",
      dataResponse: "json",
      params: {
        format: "json",
        page: this.state.pageNumber,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        data: [...res.data.results],
        isLoading: false,
      });
    });

    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const newState = [];
      const data = response.val();

      for (const key in data) {
        newState.push({
          key: key,
          spellData: data[key],
        });
      }

      this.setState({
        spellBook: newState,
      });
      console.log(newState);
    });
  }
  componentDidUpdate() {
    axios({
      method: "GET",
      url: "https://api.open5e.com/spells/",
      dataResponse: "json",
      params: {
        format: "json",
        page: this.state.pageNumber,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        data: [...res.data.results],
        isLoading: false,
      });
    });
  }

  handleNextPage = () => {
    console.log("next");
    if ((this.state.pageNumber > 1, this.state.pageNumber < 7)) {
      const nextPage = this.state.pageNumber + 1;
      this.setState({
        pageNumber: nextPage,
      });
    }
  };

  handlePrevPage = () => {
    console.log("previous");
    if ((this.state.pageNumber < 7, this.state.pageNumber > 1)) {
      const prevPage = this.state.pageNumber - 1;
      this.setState({
        pageNumber: prevPage,
      });
    }
  };

  handleClick = (event) => {
    const dbRef = firebase.database().ref();
    dbRef.push(event);
  };

  handleRemove = (spellBookKey) => {
    const dbRef = firebase.database().ref();

    dbRef.child(spellBookKey).remove();
  };

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="App">
          <div className="spellBookContainer">
            <div className="spellBook">
              {this.state.isLoading ? (
                <p>Loading...</p>
              ) : (
                this.state.spellBook.map((spellRes) => {
                  return (
                    <div key={spellRes.key} className="spellBookItem">
                      <h2>{spellRes.spellData.name}</h2>
                      <p className="description">{spellRes.spellData.desc}</p>
                      <button onClick={() => this.handleRemove(spellRes.key)}>
                        Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="spellsContainer">
            <div className="buttonContainer">
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
              <div className="spells">
                {this.state.isLoading ? (
                  <p>Loading...</p>
                ) : (
                  this.state.data.map((spell) => {
                    return (
                      <div
                        className="spellCard"
                        onClick={
                          (() => this.handleClick(spell.name),
                          () => this.handleClick(spell))
                        }
                        key={spell.slug}
                        // className="spellCard"
                      >
                        <h2>{spell.name}</h2>
                        <p className="description">{spell.desc}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
