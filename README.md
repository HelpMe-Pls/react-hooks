# What I've learnt
###### *For more details, see [`src/exercise/*.md`](https://github.com/HelpMe-Pls/react-hooks/tree/master/src/exercise) files*
-----------------

## `useState`
- `useState()` hook triggers a re-render, and a good practice is to set a default value for the [initial state](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/01.tsx) so that your component is "*under control*".
- The initial value of a `useState()` hook is always _discarded_ on re-renders: it *only* has an effect when the component **_mounts_**.
- The state value might be different between 2 renders, but *remains a **constant*** inside any rendered instance and inside ***any closures*** (e.g. `useEffect()`, event handlers, *inside* any `Promise` or 
  `setTimeout()`). That's why we use the `useState()` return values as `const`:
```javascript
const [state, setState] = useState('initial')
```
 - Use [the functional updater](https://tkdodo.eu/blog/things-to-know-about-use-state#1-the-functional-updater) (in form of a *[pure function](https://beta.reactjs.org/apis/usestate#my-initializer-or-updater-function-runs-twice))* to compute new state based on previous state and prevent stale state values from closure-related issues. Also useful if you need [complex calculation](https://tkdodo.eu/blog/things-to-know-about-use-state#2-the-lazy-initializer) to initialize the state (i.e. lazy state initialization), or [avoiding repeated calculation](https://tkdodo.eu/blog/use-state-for-one-time-initializations#state-to-the-rescue) is necessary.
 - Use TypeScript's generic in case type inferrence is [not guaranteed](https://tkdodo.eu/blog/things-to-know-about-use-state#4-the-convenience-overload).


## `useEffect`
- [Getting initial state](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/02.tsx) from `localStorage` and setting `localStorage` with `useEffect()`.
- Using `useState()` lazy state initialization (i.e. setting initial state with a function) to avoid a performance bottleneck of reading the initial state multiple times.
- A custom hook is a hook which uses default React hook(s) or other custom hook(s) inside of it.
- [Beware](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures#another-example) of stale closure. If you want to bypass the ESLINT's `react-hooks/exhaustive-deps` rule, consider the [latest ref](https://github.com/HelpMe-Pls/advanced-react-patterns/blob/master/README.md#latest-ref) pattern.

## Lifting state
- Lifting state: moving the shared state from components to their least common parent (keep in mind the Separation of Concern in terms of performance).
- Just because you have an input doesn’t mean it needs to be controlled. You really only need a controlled input when you’re going to programmatically change the value of that input. Otherwise it’s just extra work [for no benefit](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/03.tsx).
- Consider using the `key` prop [as an alternative](https://tkdodo.eu/blog/putting-props-to-use-state#3-fully-uncontrolled-with-a-key).

## Practical `useState`
- **Derived** state: consider using this technique and see whether certain state variables can be [computed on the fly](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/04.tsx) rather than stored in the state to make it easier to keep your data in sync when changes occur. React's state should be *[a single source of truth](https://tkdodo.eu/blog/dont-over-use-state#an-example)* that you need to keep track of, while all other ones derived from it, simplifies the state mutation.
- If your state updates *independently*: use separate `useStates()`s.
- For states that [updates together](https://tkdodo.eu/blog/use-state-vs-use-reducer#client-state), or only [one state's field](https://github.com/HelpMe-Pls/react-hooks/blob/master/src/final/TS/06.tsx) update at a time: use a single state object
- For state where user interactions [update different parts](https://tkdodo.eu/blog/use-state-vs-use-reducer#passing-props-to-reducers) of the state: `useReducer()`.
- __Dev tip__: when you're facing a challenging problem, try to set up the UI before adding interactivity and state management.

## DOM Side-Effects
- It's a good practice to do direct DOM interactions/manipulations (with the `ref.current`) [inside](https://github.com/HelpMe-Pls/react-hooks/blob/extra/src/final/TS/05.tsx) the `useEffect()` callback.

## HTTP request with `useEffect`
-  `useEffect()` hook cannot return anything other than the cleanup function, so it's a good practice to extract all the async code into a utility function and then call it using the promise-based `.then()` method instead of using `async/await` syntax.
-  The difference between using `.catch()` method and adding an extra argument to `.then()` method to handle errors (see more in [Extra Credit 1](https://github.com/HelpMe-Pls/react-hooks/blob/master/src/exercise/06.md#1--handle-errors)). 
-  Combining states into a state object.
-  There **is** a logical difference between setting the state inside of a clean up function and setting the state at the top of a `useEffect()` callback in terms of resetting the state ([see more at line 45](https://github.com/HelpMe-Pls/react-hooks/blob/master/src/final/TS/06.tsx)).
-  Resetting a child component's state by passing to it an extra prop (ideally, it should be the `key` prop) which contain the parent component's state ([see more at line 95](https://github.com/HelpMe-Pls/react-hooks/blob/master/src/final/TS/06.tsx)).
-  `ErrorBoundary` not only catches error from our defined `error` state but also catches other errors **anywhere** in their child component tree, log those errors, and display a fallback UI (defined by us).
- We can use the `ErrorBoundary` component and its props from the `react-error-boundary` library instead of writing our own `ErrorBoundary` ~~***cLaSs***~~ component.
