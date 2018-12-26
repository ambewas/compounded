/* eslint-disable react/no-multi-comp */
import React, { Component, createContext } from "react";

const context = createContext({});

const { Provider, Consumer: ButtonCoreApi } = context;

const interact = fn => e => fn && fn(e);

class ButtonCore extends Component {
  state = {
    hovering: false,
  };

  setHovering = hovering => {
    this.setState({ hovering });
  };

  render() {
    const value = {
      interact,
      hovering: this.state.hovering,
      setHovering: this.setHovering,
      environment: "native", // could come from a HOC
      theme: "some theme object", // maybe useful, I dont know? perhaps from another context?
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ButtonCoreApi };
export default ButtonCore;
