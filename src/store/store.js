import { legacy_createStore as createStore } from "redux";

const notesReducer = (state = {notes: []}, action)=>{
    if(action.type==='add'){
        return {
            notes: [action.newNote, ...state.notes]
        }
    }
    return state
}
const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {notes: []}
const store = createStore(notesReducer, persistentState)
export default store;