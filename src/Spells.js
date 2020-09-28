import React, { Component } from "react";
import axios from "axios";

class spells extends Component {
  componentDidMount() {
    axios({
      method: "GET",
      url: "https://api.open5e.com/spells/",
      dataResponse: "json",
      params: {
        format: "json",
        page: 1,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        data: [...res.data.results],
        isLoading: false,
      });
      console.log(this.state.data);
    });
  }
  render() {
    return (
      <div className="spells">
        {this.state.isLoading ? (
          <p>loading...</p>
        ) : (
          this.state.data.map((spell) => {
            return (
              <div>
                <div
                  onClick={
                    (() => this.handleClick(spell.name),
                    () => this.handleClick(spell))
                  }
                  key={spell.slug}
                  className="spellCard"
                >
                  <p> spell: {spell.name}</p>
                </div>
                <div className="spellBook">
                <p>{spellBook}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default spells;
