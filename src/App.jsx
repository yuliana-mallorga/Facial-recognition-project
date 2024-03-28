import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

//revisar si funciona particlesOptions y en idex ccs particles la clase que en el video iba en app.css
//no veo que funcione, en el body le agregue background y se perdio el dise;o de circulos
function App() {
  return (
    <div >  
      <ParticlesBg className="particles" params={particlesOptions} color="#f5bc02" num={20} type="circle" bg={true} />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* 
      <FaceRecognition/>*/}
      
    </div>
  )
}

export default App
