# What I've learnt
###### For more details, see `src/exercise/*.md` files
-----------------

## `useState`
- `useState()` triggers a re-render, and a good practice is to set a default value for the [initial state](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/01.tsx) so that your component is  "*under control*"

## `useEffect`
- [Getting initial state](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/02.tsx) from `localStorage` and setting `localStorage` with `useEffect()` 
- Using `useState()` lazy state initialization (i.e. setting initial state with a function) to avoid a performance bottleneck of reading the initial state multiple times
- A custom hook is a hook which uses default React hook(s) or other custom hook(s) inside of it.

## Lifting state
- Lifting state: moving the shared state from components to their least common parent (keep in mind the Separation of Concern in terms of performance)
- Just because you have an input doesn’t mean it needs to be controlled. You really only need a controlled input when you’re going to programmatically change the value of that input. Otherwise it’s just extra work [for no benefit](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/03.tsx).
