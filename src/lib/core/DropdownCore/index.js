/* eslint-disable react/no-multi-comp */
import React, { Component, createContext } from "react";

const context = createContext({});
const { Provider, Consumer: DropdownCoreApi } = context;
const interact = fn => e => fn && fn(e);

class DropdownCore extends Component {
  state = {
    dropped: false,
    inputValue: "",
    filteredItems: [],
  };

  componentRefs = {};

  setDropped = dropped => {
    this.setState({ dropped });
  };

  handleInputChange = value => {
    // we could have passed e, and prevent default here, but we dont.
    // its the responsibility of the implementer -- this doesn't know about browser API!
    this.setState({
      inputValue: value,
    });
  };

  getFilterItems = () => {
    const filtered = this.props.items.filter(item => {
      const regex = new RegExp(this.state.inputValue);

      return item.label.match(regex);
    });

    return filtered;
  };

  setComponentRef = (componentRef, id) => {
    // namespacing it for clarity
    this.componentRefs[id] = componentRef;
  };

  render() {
    const value = {
      interact,
      dropped: this.state.dropped,
      setDropped: this.setDropped,
      inputValue: this.state.inputValue,
      handleInputChange: this.handleInputChange,
      setComponentRef: this.setComponentRef,
      componentRefs: this.componentRefs,
      filteredItems: this.getFilterItems(), // TODO: should we already execute this, or actually execute in the consumer so we can pass a predicate for the filtering...?
      ...this.props, // useful for controlled component behavior
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { DropdownCoreApi };
export default DropdownCore;
