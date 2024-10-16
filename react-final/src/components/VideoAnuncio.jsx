function VideoAnuncio() {
  
  return (
    <div>
    <video className="videoanuncio" controls autoPlay muted>
      <source src="src/img/videofaro.mp4" type="video/mp4" />
    </video>
  </div>
  )
}

export default VideoAnuncio