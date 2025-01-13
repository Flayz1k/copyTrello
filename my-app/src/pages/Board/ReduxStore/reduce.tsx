const init = {
  danni: {},
};

export const counterReducer = (state = init, action: any) => {
  switch (action.type) {
    case "SET-DATA":
      return {
        ...state,
        danni: action.payload,
      };
    default:
      return state;
  }
};
export const cReducer = (state: any = false, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return (state = true);
    case "DECREMENT":
      return (state = false);
    default:
      return state;
  }
};
