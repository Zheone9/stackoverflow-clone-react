import { setPreviousPage, startHandleLogout } from "../../actions/auth.js";

export const handleLogoutWithPreviousPage = async (dispatch) => {
  dispatch(setPreviousPage(window.location.pathname));
  await dispatch(startHandleLogout());
};
