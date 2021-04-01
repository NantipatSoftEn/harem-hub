// export const state = () => ({
//   list: []
// });

export const state = {
  list: []
};

export type State = typeof state;
export type Todo = {
  done: Boolean;
  text: String;
};

export const mutations = {
  add(state: { list: Array<Todo> }, text: String) {
    state.list.push({
      text,
      done: false
    });
  },
  // remove(state: State, { todo }) {
  //   console.log(`todo`, todo);
  //   state.list.splice(state.list.indexOf(todo), 1);
  // },
  toggle(state: Todo, todo: Todo) {
    todo.done = !todo.done;
  }
};

export const getters = {
  lists(state: State) {
    return state.list;
  }
};

export const actions = {
  addTodo({ commit }: { commit: Function }, e: Event) {
    let text = (<HTMLInputElement>e.target).value;
    commit("add", text);
    text = "";
  }
};
