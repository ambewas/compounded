import React, { Component } from "react";
import { Dropdown } from "../lib/compounded/Dropdown/Dropdown";

class Main extends Component {
  state = {
    selectedItem: { label: "hello", value: "hello" },
  };

  render() {
    return (
      <Dropdown
        selectedItem={this.state.selectedItem} // of course, you can control the component as well, although it's not strictly necessary
        onSelectItem={id => this.setState({ selectedItem: id })}
        items={[
          { label: "hello", value: "hello" },
          { label: "world", value: "world" },
          { label: "new_world", value: "new_world" },
        ]}
        theme
      />
    );
  }
}

export default Main;
