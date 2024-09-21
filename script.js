// Actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// Action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });

// Reducer
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}

// Redux-inspired Store
function createStore(reducer) {
  let state = reducer(undefined, {}); // initialize state
  let listeners = [];

  // Get the current state
  function getState() {
    return state;
  }

  // Dispatch an action to update the state
  function dispatch(action) {
    state = reducer(state, action); // Update state using the reducer
    listeners.forEach(listener => listener()); // Notify all subscribers
  }

  // Subscribe to state changes
  function subscribe(listener) {
    listeners.push(listener); // Add listener
    return () => {
      listeners = listeners.filter(l => l !== listener); // Remove listener
    };
  }

  return { getState, dispatch, subscribe };
}

// Create the store
const store = createStore(counterReducer);

// Subscribe to state changes and log them to the console
const unsubscribe = store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// Dispatch actions to test the store
store.dispatch(increment()); // State updated: { count: 1 }
store.dispatch(increment()); // State updated: { count: 2 }
store.dispatch(decrement()); // State updated: { count: 1 }
store.dispatch(reset());     // State updated: { count: 0 }

// If you want to stop listening to state changes
unsubscribe();
