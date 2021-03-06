import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {persistMiddleware} from "./middlewares/persist-middleware";
import {ActionType} from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));
// instruction on how to show content with show() function

/*store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    },
});


// starter cells with explanations
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    },
});*/
