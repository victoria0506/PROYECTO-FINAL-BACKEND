const Home = () => {
  return (
    <div className="home-page">
      {/* Video de fondo */}
      <video className="background-video" autoPlay loop muted>
        <source src="src/img/arena.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Contenido de la página */}
      <div className="imglogohomecenter">
        <img className="imglogohome" src="src/img/file.png" alt="" />
      </div>
      <p className="parrafohome">Bienvenido a RestaurApp, la plataforma que hace que encontrar <br />
        el restaurante perfecto sea más fácil que nunca.
      </p>
      <img className="solhome" src="src/img/solhome.png" alt="" />
    </div>
  );
};

export default Home;
