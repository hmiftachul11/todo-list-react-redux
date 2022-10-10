import { ADD_TODO, TOGGLE_TODO, FETCH_TODO, UPDATE_TODO, DELETE_TODO } from '../actionsTypes';


const initalState = {
  todos: [],
  newTodo: '',
  response: {}
};

export default function (state = initalState, action) {
  switch (action.type) {
    case FETCH_TODO:
      return {
        ...state,
        todos: action.payload
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      }
    case UPDATE_TODO:
    case DELETE_TODO:
      return {
        ...state,
        response: action.payload
      }
    default: return state;
  }
}

// const initialState = {
//   todos: [],
//   userId: [],
//   id: [],
//   title: null,
//   completed: false,
// }



// const todos = (state = initialState, action) => {
//   switch(action.type) {
//     case ADD_TODO: {
//       const { id, content } = action.payload;
//       return {
//         todos: [
//           ...state.todos,
//           { content, completed: false, id }
//         ]
//       }
//     }

//     case TOGGLE_TODO: {
//       const { id } = action.payload;
//       const todos = state.todos.map(obj => obj.id === id ? { ...obj, completed: !obj.completed } : obj);
//       return { todos }
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export default todos;
