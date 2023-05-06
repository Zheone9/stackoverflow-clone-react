export const selectUsername = (state) => {
  return state?.auth?.user?.username ?? "Usuario predeterminado";
};
