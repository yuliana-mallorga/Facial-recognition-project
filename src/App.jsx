import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: Number(data.entries),
      joined: data.joined,
    });
  };
  const calculateFaceLocation = (data) => {
    const regions = data.data || [];

    const faceLocations = regions.map((region) => {
      const boundingBox = region.regionInfo.boundingBox;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      const leftCol = boundingBox.leftCol * width || "0px";
      const topRow = boundingBox.topRow * height || "0px";
      const rightCol = width - boundingBox.rightCol * width || "0px";
      const bottomRow = height - boundingBox.bottomRow * height || "0px";

      return { leftCol, topRow, rightCol, bottomRow };
    });
    return faceLocations;
  };

  const displayBox = (box) => {
    return setBox(box);
  };

  const onInputChange = (e) => {
    const newInput = e.target.value;
    return setInput(newInput);
  };

  const onSubmit = async () => {
    setImgUrl(input);

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_DATABASE_URL}/imageurl`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          input: input,
        },
      });

      const result = response.data;

      if (result) {
        const res = await axios({
          method: "put",
          url: `${import.meta.env.VITE_DATABASE_URL}/image`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id: user.id,
          },
        });
        loadUser({
          ...user,
          entries: res.data,
        });
      }

      const box = calculateFaceLocation(result);

      displayBox(box);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const onRouteChange = (route) => {
    setRoute(route);
    if (route === "signout") {
      setIsSignedIn(false);
      setImgUrl("");
      setInput("");
      setBox([]);
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
      setRoute("signin");
    } else if (route === "home") {
      setIsSignedIn(true);
    } else {
      setRoute(route);
      setIsSignedIn(false);
    }
  };

  return (
    <div>
      <ParticlesBg num={12} type="circle" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} imgUrl={imgUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
