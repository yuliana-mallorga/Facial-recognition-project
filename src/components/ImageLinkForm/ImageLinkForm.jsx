import './ImageLinkForm.css'
function ImageLinkForm() {
   return(
        <>
            <p className="f3 tc">
                {'This Magic Brain will detect faces in your pictures. Git it a try'}
            </p>
            <div className="w-90 pa3 br3 shadow-5 form center">
                <input className="f4 pa2 w-70 center" type="text" />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
            </div>
        </>
   ) 
}

export default ImageLinkForm;