# What I've learnt
###### For more details, see `src/exercise/*.md` files
-----------------

## `useState`
- `useState()` triggers a re-render, and a good practice is to set a default value for the [initial state](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/01.tsx) so that your component is  "*under control*"

## `useEffect`
- [Getting initial state](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/02.tsx) from `localStorage` and setting `localStorage` with `useEffect()` 
- Using `useState()` lazy state initialization (i.e. setting initial state with a function) to avoid a performance bottleneck of reading the initial state multiple times
- A custom hook is a hook which uses default React hook(s) or other custom hook(s) inside of it.