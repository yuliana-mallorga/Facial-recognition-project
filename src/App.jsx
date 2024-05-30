import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = "99831ae376d34e6789ca5b2b6c158cfe";
  const USER_ID = "clayuli2024";
  const APP_ID = "Project-face-detection";
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
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });
  

  const loadUser = (data) => {
    user; // to fix
    setUser({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  const calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions || [];
    const faceLocations = regions.map((region)=> {
      const boundingBox = region.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      const leftCol = boundingBox.left_col * width || '0px';
      const topRow= boundingBox.top_row * height || '0px';
      const rightCol= width - (boundingBox.right_col * width) || '0px';
      const bottomRow= height - (boundingBox.bottom_row * height) || '0px';
      return { leftCol, topRow, rightCol, bottomRow };
    });
    return faceLocations;
  }

  const displayBox = (box) =>{
    setBox(box);
  }
  const onInputChange = (e) => {
    const newInput = e.target.value;
    return setInput(newInput);
  };

  const onSubmit = async () => {
    setImgUrl(input);
    try {
      const response = await fetch(
        "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
        returnClarifaiRequestOptions(input)
      );
      const result = await response.json();
      console.log("hi", result);
      const box = calculateFaceLocation(result);
      displayBox(box);
    } catch (error) {
      console.log("error", error);
    }
  };
  const onRouteChange = (route)=>{
    setRoute(route)
    if (route === 'home') {
      setIsSignedIn(true)
    }
  }
  return (
    <div>
      <ParticlesBg num={12} type="circle" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
{ route === 'home' 
  ? <div>
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </div>
    : (
      route === 'signin'
      ? <Signin onRouteChange={onRouteChange}/>
      : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
    )
}
    </div>
  );
}

export default App;
