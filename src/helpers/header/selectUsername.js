export const selectUsername = (state) => {
  return state?.auth?.user?.username ?? null;
};
export const selectPicture = (state) => {
  return state?.auth?.user?.picture ?? null;
};

export const selectUserId = (state) => {
  return state?.auth?.user?.uid ?? null;
};
