import PropTypes from "prop-types";
function Rank({ user }) {
    return(
        <div>
            <div className="gold f3 tc">
                {`${user.name}, your current entry count is...`}
            </div>
            <div className="gold f1 tc">
                {`# ${user.entries}`}
            </div>
        </div>
    )
}

Rank.propTypes = {
    user: PropTypes.shape({
     name: PropTypes.string,
     entries: PropTypes.number
    })
  };
export default Rank;