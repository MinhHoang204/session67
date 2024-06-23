// tạo kho 
import {createStore, combineReducers} from "redux";
import jobReducer from "./reducers/jobReducer";
const rootReducer = combineReducers({
    jobReducer
})
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('jobs');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('jobs', serializedState);
    } catch {
    }
};

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState({
        jobReducer: store.getState().jobReducer,
    });
});
export const store = createStore(rootReducer);