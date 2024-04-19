//import Clarifai from 'clarifai';
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import ParticlesBg from "particles-bg";


//clarify yuliana123
//const Clarifai = require('clarifai');
{
  /*
const app = new Clarifai.App({
 apiKey: 'c1bf8cf2c74d4f47960e582f045f4eef'
});
*/
}
//const MODEL_ID = 'face-detection';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = "99831ae376d34e6789ca5b2b6c158cfe";
  const USER_ID = "clayuli2024";
  const APP_ID = "Project-face-detection";
  //const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState({});

  const calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const faceLocations = regions.map((region)=> {
      const boundingBox = region.region_info.bounding_box;
      console.log('regions calculateface', regions);
      const image = document.getElementById('inputImage');

      if (!image) {
        console.error('Image element with ID "inputImage" not found.');
        return null; 
      }

      const width = Number(image.width);
      const height = Number(image.height);
    
      //console.log(width, height);
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height)
      };
    });
    console.log('faceLocations lo que devuelve', faceLocations);
    return faceLocations;
  }

  const displayBox = (box) =>{
    setBox({box});
    return console.log('box en display', box);
  }
  const onInputChange = (e) => {
    const newInput = e.target.value;
    return setInput(newInput);
  };


{/** probar despues comentando onSutmit
const onSubmit = async () => {
  setImgUrl(input);

  try {
    const response = await fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnClarifaiRequestOptions(imgUrl)
    );
    const result = await response.json();
    console.log("hi", result);
    const box = calculateFaceLocation(result);
    displayBox(box);
  } catch (error) {
    console.log("error", error);
  }
};
*/}



  const onSubmit = () => {
    setImgUrl(input)
    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnClarifaiRequestOptions(input)
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("hi", result);
        displayBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  
  return (
    <div>
      <ParticlesBg num={12} type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </div>
  );
}

export default App;
