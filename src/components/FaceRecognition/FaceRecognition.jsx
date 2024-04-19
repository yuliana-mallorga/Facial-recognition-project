import PropTypes from "prop-types";
import './FaceRecognition.css'
function FaceRecognition({ box, imgUrl }) {
    return(
        <div className="flex justify-center">
            <div className="mt2 relative">
                <img id="inputImage" src={imgUrl} alt="Face Recognition" width="500px" height="auto" />
                <div className="bounding-box" style={{top: box[0].topRow, right: box[0].rightCol, bottom: box[0].bottomRow, left: box[0].leftCol}}></div>
            </div>
        </div>
    )
}
 
FaceRecognition.propTypes = {
    box: PropTypes.array.isRequired,
    imgUrl: PropTypes.string.isRequired
  };
export default FaceRecognition;
