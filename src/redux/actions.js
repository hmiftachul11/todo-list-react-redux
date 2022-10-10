import { FETCH_TODO, ADD_TODO, TOGGLE_TODO, SET_FILTER, DELETE_TODO, UPDATE_TODO } from './actionsTypes';

export const fetchTodo = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(todos =>
      dispatch({
        type: FETCH_TODO,
        payload: todos
      })
    );
};

export const addTodo = item => dispatch => {
  fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(res => res.json())
    .then(newTodo =>
      dispatch({
        type: ADD_TODO,
        payload: newTodo
      }))
    .catch(e => (e));
};

export const updateTodo = item => async (dispatch, getState) => {
  const { id } = item

  const { todos } = getState().todos;
  item.completed = !item.completed;

  dispatch({
    type: FETCH_TODO,
    payload: todos.map(todo => (todo.id === item.id ? item : todo))
  })

  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(item)
  }).then(() => {
    // throw new Error("Couldn't persist the deletion, restauring the app state");
    dispatch({
      type: UPDATE_TODO,
      payload: {
        type: 'success',
        title: 'Successfuly updated',
        description: 'The item was successfully updated in the backend'
      }
    })
  }).catch((e) => {
    dispatch({
      type: UPDATE_TODO,
      payload: {
        type: 'error',
        title: 'Oops, something went wrong',
        description: e.message
      }
    })
    item.completed = !item.completed;
    dispatch({
      type: FETCH_TODO,
      payload: todos
    })
  });
};

export const deleteTodo = item => async (dispatch, getState) => {
  const { id } = item

  const { todos } = getState().todos;

  dispatch({
    type: FETCH_TODO,
    payload: todos.filter(todo => (todo.id !== item.id))
  })

  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(item)
  }).then(() => {
    // throw new Error("Couldn't persist the deletion, restauring the app state");
    dispatch({
      type: DELETE_TODO,
      payload: {
        type: 'success',
        title: 'Successfuly deleted',
        description: 'The item was successfully deleted in the backend'
      }
    })
  }).catch((e) => {
    dispatch({
      type: DELETE_TODO,
      payload: {
        type: 'error',
        title: 'Oops, something went wrong',
        description: e.message
      }
    })
    dispatch({
      type: FETCH_TODO,
      payload: todos
    })
  });
};

// let nextTodoId = 0;
// export const addTodo = content => ({
//   type: ADD_TODO,
//   payload: {
//     id: ++nextTodoId,
//     content
//   }
// });

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: { filter }
});

