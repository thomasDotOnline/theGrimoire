import React, { Component } from "react";

class spells extends Component {
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
                    (() => this.handleClick(props.spell.name),
                    () => this.handleClick(props.spell))
                  }
                  key={props.spell.slug}
                  className="spellCard"
                >
                  <p> spell: {props.spell.name}</p>
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
