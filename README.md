# compounded component library
## Main Principles:

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




# rough content for an eventual medium post
## Raison d'être
### Compounded is built to make developing a custom component library easy
common functionality is abstracted away in a core component. When given the task to build a component library for your startup/corporate environment, you can use these to kickstart your development. Go as finegrained as you need to. Full control over markup and style, theme our existing whitelabeled compounded library, or even use one of our own flavoured compounded libraries (TODO: we will have an implementation that works like material-ui, one for ant-design, for semantic ui,... anything goes.)


### the different components of compounded
Every Compounded component is made up of a couple of things, which are all at your disposal

Let's take our Dropdown component for example. It is made up of:
* DropDownCoreAPI + consumer
  * The core of a Compounded component.
  * This is where the entire API of the dropdown component lives. It knows what the inputvalue is, how the items are sorted, if the itemdrawer is dropped or closed, what the selected value is,... etc. In short: it's a state container, as well as a provider of utility functions that can be used in a Compound
* Compounds: the consumers of the CoreAPI component. They have access to all API methods, and as such only decide on the markup (including any other conditional logic the end user might decide on).
  * DropDownInput
  * DropDownItems
* final component: the entire pre-built component.

Thus, for every Compounded component, we expose the entire coreAPI, its consumer, our pre-made compounds (from whatever theme you are implementing), as well as the final pre-built full component.

This means you can go as fine-grained with your own custom implementation as you desire - or just use our pre-made themed compounds (e.g. material design themed)

## Advantages vs other approaches
### Full control over markup AND style
other component libraries give you control over styling, usually via a theming provider. This is fine if you need to change colours or font styles, but starts to get unwieldy once you have more advanced styling needs.

By exposing the entire functional API, compounded hands over full control - so you can easily implement your own version of, say, a dropdown.

If you do not need that fine grained control over markup, you can use the final component, or it's compounds to build out whatever you want. Compounded provides a theming system as well, so style changes without controlling the markup is possible this way.
It's discouraged, however, as compounded was built to allow a full atomic design system to be built, and used as compounds.

From our experience working in larger corporate environments, just using an existing library like material-ui does not cut it. And without a fine grained approach to markup control, the entire premise of using an existing library (to not have to re-invent the wheel and have easy components to access), falls apart. Compounded was built to change that.

### Full separation between logic and markup
the compounded architecture ensures a full divide between a component view, and it's controller. It kinda looks like MVC, but on a component level.

Testing thus becomes trivial.

### built with atomic design principles in mind
Compounded is built with atomic design systems in mind. As such, you can replace all our compounds with your own implementation.

### build with composition in mind
Furthermore, you are never limited to just using one core API. Compounded might even evolve to expose some state primitives. Why not use the buttonCore and dropdownCore together in one compound? It's possible.

### cross platform
Compounded core components are by their very design platform agnostic. This means they can be dropped in a react-native environment - and still work.

It also means we can provide different approaches to design system, all based on the same core API components. A dropdown in a native environment, after all, had a very different rendering mechanism compared to that same dropdown in a web environment.

TODO: I think it might even be possible to use these APIs as providers for webcomponents/vue/angular/whatever...? ? ?

### compounded will never make layout decisions for you
Everything outside of a component (margin, position, padding in some cases) stays outside of that component. We'll never hardcode any of these in, and instead provide all the utilities you need to build complex layouts.

For some of our compounds, we might use css-grid internally, with an exposed API so you can easily re-arrange different elements yourself, without having to build your own compound, just to shuffle things around.


## Disadvantages vs other approaches
### more code is a necessary tradeoff for fine-grained control
you'll have to write compounds yourself if you want fine grained control. Luckily, those won't actually need to contain much logic. You will only need to  bind certain API methods from a core component to your view component.

### context everywhere
for now, using compounded will pollute your virtual DOM with contexts everywhere. The DOM obviously stays clean, but finding the exact view component will be a pain.