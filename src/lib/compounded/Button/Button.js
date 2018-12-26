/* eslint-disable react/no-multi-comp */
import React from "react";
import ButtonCore, { ButtonCoreApi } from "../../core/ButtonCore";

// this is a DOM button
const Button = ({ children, onClick }) => (
  <ButtonCore>
    <ButtonCoreApi>
      {({ interact }) => <button onClick={interact(onClick)}>{children}</button>}
    </ButtonCoreApi>
  </ButtonCore>
);

// this is a different DOM button, with two interactable areas, for some reason.
const ButtonTwo = ({ children, onClick }) => (
  <div>
    <ButtonCore>
      <ButtonCoreApi>
        {({ interact, hovering, setHovering }) => (
          <div
            onClick={interact(onClick)}
            onMouseEnter={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
          >
            <div>{hovering ? "hovered!" : "not hovered"}</div>
            <div>{children}</div>
          </div>
        )}
      </ButtonCoreApi>
    </ButtonCore>
    <div>some content that you cannot interact with</div>
    <ButtonCore>
      <ButtonCoreApi>
        {({ interact, hovering, setHovering }) => (
          <div
            onClick={interact(onClick)}
            onMouseEnter={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
          >
            <div>{hovering ? "hovered this one!" : "not hovered this one"}</div>
            <div>{children}</div>
          </div>
        )}
      </ButtonCoreApi>
    </ButtonCore>
  </div>
);

// this is a button that renders differently based on environment, native vs DOM vs sketch vs...?
// Core should be able to figure that out?
const ButtonThree = ({ children, onClick }) => {
  return (
    <ButtonCore>
      <ButtonCoreApi>
        {({ interact, environment }) =>
          environment === "native" ? (
            <button onClick={interact(onClick)}>native! {children}</button>
          ) : (
            <button onClick={interact(onClick)}>{children}</button>
          )
        }
      </ButtonCoreApi>
    </ButtonCore>
  );
};

// i guess we only need consumer when state is necessary...
// dont think we actually need interact. we can just pass through onclick or onPress
// ..but lets abstract it anyway. Perhaps we can decide in ButtonCore what onClick is supposed to do?
// so now anyone who has access to ButtonCore and ButtonCoreApi,
// can implement hovering and clicking, anyway they want - even natively!
// ... without needing to implement the state setting...
// and now we could actually write a button component that detects if its native or not, maybe?
// for a button this is very over engineered, but lets look at a different component, like a dropdown
// we can probably skip core and consumer, and just use hooks? but then hooks aren't context aware...?
export { Button, ButtonTwo, ButtonThree };
