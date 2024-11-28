import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import axios from 'axios';
import Swal from 'sweetalert2';


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = import.meta.env.VITE_REACT_APP_API_KEY;
  const USER_ID = import.meta.env.VITE_USER_ID;
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

  return {
    url: "https://api.clarifai.com/v2/models/face-detection/outputs",
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    data: raw,
  };
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
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: Number(data.entries),
      joined: data.joined
    })
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

    const config = returnClarifaiRequestOptions(input)
  
    try {
      const response = await axios(config);
      const result = response.data;

      if(result){
        const res = await axios({
          method: 'put',
          url:`${import.meta.env.VITE_DATABASE_URL}/image`, 
          headers: {
            'Content-Type': 'application/json'
          },
          data:{
            id: user.id 
          }
        })
        loadUser({
          ...user,
          entries: res.data
        });
      }

      const box = calculateFaceLocation(result);

      displayBox(box);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
  };
  const onRouteChange = (route)=>{
    setRoute(route)
    if (route === "signout") {
      setIsSignedIn(false);
      setImgUrl("");
      setInput("");
      setBox([]);
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      });
      setRoute("signin");
      console.log("signout false?", isSignedIn, route);
    } else if (route === 'home') {
      setIsSignedIn(true);
      console.log("signin true?", isSignedIn, route);
    } else{
      setRoute(route);
      setIsSignedIn(false);
      console.log("register false?", isSignedIn, route);

    }
  }

  
  return (
    <div>
      <ParticlesBg num={12} type="circle" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
{ route === 'home' 
  ?  <div>
      <Logo />
      <Rank user={user}/>
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </div>
    : (
      route === 'signin'
      ? <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>
      : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
    )
}
    </div>
  );
}

export default App;
