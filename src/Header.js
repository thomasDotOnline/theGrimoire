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
                  spell card found in the compendium) found at the bottom of the
                  spell cards to add a spell to your personal spellbook.
                </p>
                <p>
                  In your spell book you may push the "Remove" (found at the
                  bottom of each spell card found in Your Spellbook) button to
                  take a spell out of your spellbook
                </p>
              </div>
            </header>
          </>
        );
    }
}

export default Header;