If you wish to contribute to Compounded, please make sure you familiarise yourself with the following principles for developing a core API or Compound first:

### Separation of concerns:

  * core-Components that only describe functionality.
      * No JSX allowed
      * No platform specific API’s allowed (<- this will be a challenge for components that work with the DOM to do their thing)
      * Reason = should be useable for react-native as well as react-dom, react-sketch, etc.
  * Components that implement these core-components, with any style you’d like (material, ant, own,…) (name TBD, let’s call them final-components for now)
      * Purely dumb components.
      * Don’t need to be functional (e.g. local UI state is sometimes necessary for a dropdown or the like, but see below) -> FIXME: this is no longer true <-

### Whenever internal state is used, provide a state-reducer prop (TODO: should we?)
  * This is analogous to a reducer in redux: it takes state and an action, and returns more state
  * This way, users can intercept the state change done by the internal component, and do something else with it — creating super-customisable component functionality
  * For an example, see https://github.com/paypal/downshift#statereducer (could be that we actually use downshift or some variation of it, for our dropdown. It’s MIT licensed, so we can )

### Render props everywhere (with compound components pattern)
  * Because of the Separation of Concerns principle, a base-component is not concerned with how something will be rendered, or even what will be rendered
  * It always exposes it’s internal API via a context provider. For detailed information, see https://blog.logrocket.com/guide-to-react-compound-components-9c4b3eb482e9
  * Final-components will consume that internal API, and do with it whatever it pleases.
  * This is the key part that makes it possible to write your own custom implementation based on all the core-components
      * Final-components can then decide on their markup entirely. Order, styling, elements,… everything is customisable.

### Utilities for layout
  * Padding, margin
  * ...Are all utilities. A component can never implement margin or padding directly.
  * The library component COULD implement padding, but only through these utitlies
  * Reasons:
      * with utilities, using a fixed scale is enforced, and re-scaling (e.g. enlarged mode) becomes trivial
      * Components are always isolated. Padding/margin is part of context
  * For layout inside a component, we can use CSS grid abstraction
      * ONLY if necessary inside a component. TBD if it can be avoided
      * Users need to be able to customise the placement of sub components. (Can do with a prop, if you use grid)
      * We should be able to achieve this in the DOM with CSS grid.
      * But we need an abstraction layer, because for Native it could be a different rendering system that takes care of it (probably Flex ?)

### Use composition for extending functionality
  * The core-components must be as simple as possible. The bare minimum that is necessary to call the component what it is. (e.g. a table base component does not implement sorting, pagination, checkboxes,…. Only cares about rendering rows, header, cells.)
  * Extending functionality should be done by writing a HOC for the base-component

### Use constants for everything
  * Colors, scales, … should always come from a constant.
  * This way, theming (and theme switching) is super easy, sass style.

### Compounded cares about accessibility
  * accessiblity is important,.. etc.

### Compounded cares about browser support
  * support all the way back to IE11 -- which is necessary in a lot of corporate environments