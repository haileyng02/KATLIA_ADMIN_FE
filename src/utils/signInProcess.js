import { signIn } from "../actions/auth";
// import { openNotification } from "../actions/notification";

const signInProcess = ({
  token,
  notification,
  isChecked,
  dispatch,
  navigate,
}) => {
  //App state
  dispatch(signIn(token));

  //Local storage for user remembering
  const date = new Date();
  // if (isChecked) date.setDate(date.getDate() + 30);
  // else
  date.setDate(date.getDate() + 30);
  const item = {
    token: token,
    expiry: date,
  };
  localStorage.setItem("user", JSON.stringify(item));

  //Navigate to home
  //   if (notification) {
  //     dispatch(openNotification(notification));
  //   }

  navigate("/");
};

export default signInProcess;