import { useLocation } from "react-router-dom";

const StyledContainer = ({ children }) => {
  const location = useLocation();
  const pathsBackgroundGrey = ["/auth/login", "/auth/register"];

  const divStyles = {
    backgroundColor: pathsBackgroundGrey.includes(location.pathname)
      ? "#F2F2F2"
      : "",
  };

  return (
    <div className="container" style={divStyles}>
      {children}
    </div>
  );
};

export default StyledContainer;
