import "./ImageLinkForm.css";
import PropTypes from "prop-types";
function ImageLinkForm({ onInputChange, onSubmit }) {
  return (
    <>
      <p className="f3 tc">
        {"This Magic Brain will detect faces in your pictures. Git it a try"}
      </p>
      <div className="w-90 pa3 br3 shadow-5 form center">
        <input
          className="f4 pa2 w-70 center"
          type="text"
          onChange={onInputChange}
        />
        <button 
        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
        onClick={onSubmit}
        >
          Detect
        </button>
      </div>
    </>
  );
}

ImageLinkForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ImageLinkForm;
