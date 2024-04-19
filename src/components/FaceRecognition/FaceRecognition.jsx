import PropTypes from "prop-types";
import "./FaceRecognition.css";
function FaceRecognition({ box, imgUrl }) {
    return(
    <div className="flex justify-center">
      <div className="mt2 relative">  
        { imgUrl ? (
            <img
            id="inputImage"
            src={imgUrl}
            alt="Face Recognition"
            width="500px"
            height="auto"
          />
        ): null}
        {box != [] ? box.map((faceBox, id) => {
            return (
                <div
                  className="bounding-box"
                  key= {id}
                  style={{
                    top: faceBox.topRow,
                    right: faceBox.rightCol,
                    bottom: faceBox.bottomRow,
                    left: faceBox.leftCol,
                  }}
                ></div>
              )
        })
          : null}
      </div>
    </div>
  );
}

FaceRecognition.propTypes = {
  box: PropTypes.array,
  imgUrl: PropTypes.string.isRequired,
};
export default FaceRecognition;
