import { legacy_createStore as createStore } from "redux";

const notesReducer = (state = {notes: []}, action)=>{
    switch(action.type){
        case 'add':
            return {
                notes: [action.newNote, ...state.notes]
            };
        case 'delete':
            const updatedNotes = [...state.notes];
            updatedNotes.splice(action.index, 1);
            return {
                notes: updatedNotes
            };
        case 'override':
            return { ...state, notes: action.newNotes };
        case 'merge':
            return { notes: [...state.notes, ...action.newNotes].sort((a, b) => b.date - a.date) };
        default:
            return state;
    }
}
const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {notes: []}
const store = createStore(notesReducer, persistentState)
export default store;