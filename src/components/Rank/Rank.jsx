import PropTypes from "prop-types";
function Runk({ user }) {
    return(
        <div>
            <div className="gold f3 tc">
                {`${user.name}, your current rank is...`}
            </div>
            <div className="gold f1 tc">
                {`# ${user.entries}`}
            </div>
        </div>
    )
}

Runk.propTypes = {
    user: PropTypes.object
  };
export default Runk;