import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
          <>
            <header>
              <h1>the grimoire</h1>
              <div className="headerContainer">
                <p>
                  Push the "Transcribe" button (found at the bottom of each
                  spell card found in the compendium) to add a spell to your
                  personal spellbook.
                </p>
                <p>
                  In your spell book you may push the "Remove" button (found at
                  the bottom of each spell card found in Your Spellbook) to take
                  a spell out of your spellbook
                </p>
              </div>
            </header>
          </>
        );
    }
}

export default Header;