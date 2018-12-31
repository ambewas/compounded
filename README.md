# compounded component library

## Raison d'être
### Compounded is built to make developing a custom component library easy
problems:
- developing a custom component library based on atomic design is **hard**.
- using an existing library such as material-ui is enticing, and even theming them is doable to some degree - but most often UX considerations require you to have control over markup, as well as styling. Something that's very hard, or impossible to do with most theming systems out there
- Maintaining different themes for the same functionality is hard
- devleoping cross-platform compatible components is hard

After developing custom component libraries in React for almost 4 years, we noticed common patterns coming back again and again. The same problems needed to be solved over and over.

We built Compounded with the motivation to stop re-inventing the wheel every time we started a new project for a different client, who required us to build a full blown atomic styleguide from scratch.



common functionality is abstracted away in a core component. When given the task to build a component library for your startup/corporate environment, you can use these to kickstart your development. Go as finegrained as you need to. Full control over markup and style, theme our existing whitelabeled compounded library, or even use one of our own flavoured compounded libraries (TODO: we will have an implementation that works like material-ui, one for ant-design, for semantic ui,... anything goes.)




## Main Principles:

With the basic philosophy out of our way, and what Compounded will look like, interested readers can take a look look at the main principles the development of Compounded will follow to pave the way to a truly universal, re-useable component-library base API.

You can read through these principles in more detail on our [github repo](CONTRIBUTING.MD).

In this article, though, I want to touch on the most important principle Compunded is build around:


### Separation of concerns
The first, and most principle of Compounded is a strict separation between Core-components that **only** describe functionality, and Compounds, that **only** care about rendering.


In a Core-component, you'll find that there is no *real* rendering going on. The only thing it returns is a context provider.

```js
CODE example here
```

No platform specific APIs are allowed, which ensures a Core-Component can be written to be **platform agnostic** (i.e. they can be use ase a core for react-native implementations of Compounds, as well as for DOM implementations of Compounds)


A Compound, then, consumes the API exposed by a Core-component:


```js
CODE example here
```

Compounds **are** platform aware, as they care about how something is rendered. They will usually be styled functional components, implementing a specific *theme* or design system.

When working with Compounded to convert the atomic design system from your UX/UI team into actual react components, you will mostly be concerned with writing custom Compounds, using Core-components.

It should be noted, however, that writing your own custom Compounds is not necessary to get started with Compounded. We [are working on](link_to_repo) implementations of material-design, and other popular design frameworks in a themed Compound library, to get started quickly.

Your custom developed Compounds (or those from our premade themes) will eventually be very easy to use for everyone in your theme:


```js
CODE example here
```



Now, if you've been working in the field of software development for a while, and web development specifically, you might be thinking to yourself that we've gone full circle again. And indeed you would not be too far off: this separation of concerns does look kinda like good-old MVC - but here it's implemented at the component level.

The use of the compound components pattern (TODO: popularised by who? can we namedrop?), enables us to be **very flexible** with the decoupling of view-controller. We can nest things, compose things, move things around like it's nobody's business.


// TODO: is it clear enough here what we are doing etc?

### the different components of Compounded
So, from that main principle follows that every Compounded component should be made up of a couple of different elements working together.

It can be somewhat confusing to wrap your head around, though, so let's work through a very specific example here and see how the classic problem of developing a really good (and accessible) custom dropdown component becomes trivial by using Compounded:

Let's look at the code for our own material-design themed Dropdown Compound.



```js
CODE example here
```
If we break it down, we can see that it is made up out of... TODO: complete
TODO: also put in how it's easy to add in custom logic as well!




Let's recap what we have learned so far. This is an overview of the different elements the Compounded library exposes, specifically in the context of a dropdown component:

* DropDownCoreAPI + consumer
  * The core of a Compounded component.
  * This is where the entire API of the dropdown component lives. It knows what the inputvalue is, how the items are sorted, if the itemdrawer is dropped or closed, what the selected value is,... etc. In short: it's a state container, as well as a provider of utility functions that can be used in a Compound
  * As a developer of your own custom library, you will only ever have to consume the API from these Core-Components (but if you're looking to help us out - [PRs are encouraged!](contributing.md))
* Compounds: the consumers of the CoreAPI component. They have access to all API methods, and as such only decide on the markup and styling - (including any other conditional logic the end user might decide on).
  * DropDownInput
  * DropDownItems
* DropDown: the entire pre-built component.

TODO: put some code examples here

Thus, for every Compounded component, we expose the entire coreAPI, its consumer, our pre-made compounds (from whatever theme you are implementing), as well as the final pre-built full component.

This means you can go as fine-grained with your own custom implementation as you want - or just use our pre-made themed compounds (e.g. material design themed)

TODO: put a list of planned primitives here
 - interaction core
 - table core
 - tab core
 - dropdown core
 - ...


## Advantages vs other approaches
### Full control over markup AND style
other component libraries give you control over styling, usually via a theming provider. This is fine if you need to change colours or font styles, but starts to get unwieldy once you have more advanced styling needs.

By exposing the entire functional API, compounded hands over full control - so you can easily implement your own version of, say, a dropdown.

If you do not need that fine grained control over markup, you can use the final component, or it's compounds to build out whatever you want. Compounded provides a theming system as well, so style changes without controlling the markup is possible this way.
It's discouraged, however, as compounded was built to allow a full atomic design system to be built, and used as compounds.

From our experience working in larger corporate environments, just using an existing library like material-ui does not cut it. And without a fine grained approach to markup control, the entire premise of using an existing library (to not have to re-invent the wheel and have easy components to access), falls apart.

Compounded was built to change that.

### Full separation between logic and markup
the compounded architecture ensures a full divide between a component view, and it's controller. It kinda looks like MVC, but on a component level.

Testing a compound, or a core-component, thus becomes trivial. For testing a core component, we only need to worry about checking state changes (or subscriptions). In fact, Compounded already takes care of that. There's no need to test this API when building your own compounds, and indeed: when developing our own themed compounds, we only need to worry about testing UI and custom logic based on the exposed core API.

### built with atomic design principles in mind
Compounded is built with atomic design systems in mind. As such, you can replace all our compounds with your own implementation.

TODO: more blabla about atomic design

### build with composition in mind
Furthermore, you are never limited to just using one core API. Compounded might even evolve to expose some state primitives (especially when hooks become mainstream). Why not use the interactionCore and dropdownCore together in one compound? It's possible.

### cross platform
Compounded core components are, by their very design, platform agnostic. This means they can be dropped in a react-native environment - and still work.

TODO: this next part is totally unclear,... what do we mean here? Talk more about how the native implementation should use `<View>` versus `<div>` for example

It also means we can provide different approaches to design system, all based on the same core API components. A dropdown in a native environment, after all, has a very different rendering mechanism compared to that same dropdown in a web environment.


### compounded will never make layout decisions for you
Everything outside of a component (margin, position, padding in some cases) stays outside of that component. We'll never hardcode any of these in, and instead provide all the utilities you need to build complex layouts.

TODO: more blabla about how, in a large team, this makes a LOT of sense.

For some of our compounds, we might use css-grid internally, with an exposed API so you can easily re-arrange different elements yourself, without having to build your own compound, just to shuffle things around.


## Disadvantages vs other approaches
Whenever
### more code is a necessary tradeoff for fine-grained control
you'll have to write compounds yourself if you want fine grained control. Luckily, those won't actually need to contain much logic. You will only need to  bind certain API methods from a core component to your view component.

Nevertheless, it's worth mentioning that to take full advantage of Compounded, by using its core primitive APIs, you will probably have to write more code than simply editing a theme.

Still, we are convinced that you will end up with a stable (and saner) code-basem, compared to hacking around an existing component library when you need slightly different mark-up.

### context everywhere
for now, using compounded will pollute your virtual DOM with contexts everywhere. The DOM obviously stays clean, but finding the exact view component will be a pain.

This is a common occurrence in react projects these days anyway, and anything that uses a theme provider, for example, also suffers from the same issues.

### let's mind performance
React-context isn't the most performant api out there, because of unnecessary re-renders. That being said, most UI performance bottlenecks arise from some top component that re-renders, with hundreds of child components also unnecessarily reconciling. A great example is when rendering hundreds of markers on a map, for example. When every marker has to reconcile for about 1ms, that doesn't sound like a lot -- but multiply it by a thousand, and you've got a 1sec lag on your hands.

Compounded components, however, should only have a very shallow child subtree. We don't expect performance to be impacted by the use of context here. Nevertheless, running performance tests is definitely on the list of things we will be working on in the coming weeks.

Even if performance issues should arise, [there is a way](https://medium.com/@leonardobrunolima/react-tips-context-api-performance-considerations-d964f3ad3087) to mitigate them.

