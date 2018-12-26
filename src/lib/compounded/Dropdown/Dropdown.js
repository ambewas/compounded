/* eslint-disable react/no-multi-comp */
import React, { Fragment } from "react";
import DropdownCore, { DropdownCoreApi } from "../../core/DropdownCore";
import interactWithValue from "../../functions/getValueFromEvent";

const DropDownInput = () => (
  <DropdownCoreApi>
    {api => (
      <Fragment>
        <input // obviously this can also be another styled input
          type="text"
          value={api.inputValue}
          onFocus={() => api.setDropped(true)} // control when you open the item drawer yourself!
          onBlur={e => {
            // using refs is also pretty easy, we can just get them from the API
            // for example, we don't want to close the dropdown when clicking on one of the dropdown items

            // FIXME: this is logic we could/should probably move to a helper function.
            // can't move it to core, because it adresses the browser event api!
            console.log("e.relatedTarget", e.relatedTarget);
            if (Object.keys(api.componentRefs).length >= 0) {
              for (const ref in api.componentRefs) {
                if (e.relatedTarget.contains(api.componentRefs[ref])) {
                  return;
                }
              }
            }
            api.setDropped(false);
          }}
          onChange={interactWithValue(api.handleInputChange)}
        />
        selected: {api.selectedItem.label}
      </Fragment>
    )}
  </DropdownCoreApi>
);

const DropDownItems = () => (
  <DropdownCoreApi>
    {api =>
      api.dropped && // or, if you prefer, use another param, like wether the user typed 2 or more chars...
      api.inputValue.length >= 2 && (
        <div
          // we can set refs on the api context as well. We'll need them in this case
          ref={c => api.setComponentRef(c, `dropdownItemContainer`)}
        >
          {api.filteredItems.map((item, i) => (
            <div
              // can be on some other event, of course..
              // all controlled props are passed down to the API anyway
              onClick={() => api.onSelectItem(item)}
              ref={c => api.setComponentRef(c, `dropDownItem_${item.value}`)}
              key={item.value}
              // an accessible dropdown should have a tabIndex
              // and coincidentally, we need it to be focuseable so we can control open/close on blur of input
              tabIndex={i}
            >
              {item.label}
            </div>
          ))}
        </div>
      )
    }
  </DropdownCoreApi>
);

// this is the one the end user will be using, or creating himself with the compounds
// they will be able to provide markup here
// or, if they need deeper customisation, they can recreate these components using the DropDownCoreApi
const Dropdown = props => (
  <DropdownCore {...props}>
    <DropDownInput />
    <hr />
    <DropDownItems />
  </DropdownCore>
);

export { Dropdown };
