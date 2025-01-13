export const increment = (data: any) => {
  return {
    type: "SET-DATA",
    payload: data,
  };
};

export const inc = () => {
  return {
    type: "INCREMENT",
  };
};

export const dec = () => {
  return {
    type: "DECREMENT",
  };
};
