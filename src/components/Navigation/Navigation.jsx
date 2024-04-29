import PropTypes from "prop-types";
function Navigation({ onRouteChange, isSignedIn }) {
     if (isSignedIn){
        return(
            <nav
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              background: "linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)",
            }}
          >
            <p
              onClick={() => onRouteChange("signin")}
              className="f3 link underline pa3 pointer"
            >
              Sign Out
            </p>
          </nav>
          );
     } else{
        return(
            <nav
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              background: "linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)",
            }}
          >
            <p
              onClick={() => onRouteChange("signin")}
              className="f3 link underline pa3 pointer"
            >
              Sign in
            </p>
            <p
              onClick={() => onRouteChange("register")}
              className="f3 link underline pa3 pointer"
            >
              Register
            </p>
          </nav>
          );
     }
      
      
}
     
Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};
export default Navigation;
