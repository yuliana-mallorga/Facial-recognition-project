import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
function Logo() {
    return(
        <div className="ma4 mt0 pa3 w-30">
            <Tilt className='br2 shadow-2'>
                <div style={{background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)', textAlign: 'center' }}>
                    <img src={brain}/> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;