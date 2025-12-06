import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Carousel.css';


function Sliders() {
  // Objeto con categorías e imágenes
  const categorias = [
    {
      titulo: "Comedia 🍿",
      id: "cat1",
      imagenes: [
        "https://es.web.img3.acsta.net/c_310_420/pictures/14/02/12/11/19/020809.jpg",
        "https://m.media-amazon.com/images/I/71+C9MNEjlL._AC_UF894,1000_QL80_.jpg",
        "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/69/54/60/20056273.jpg",
        "https://i.pinimg.com/736x/2e/b2/0d/2eb20d5143d8b9908ae8f99c81859442.jpg",
        "https://i.pinimg.com/564x/81/0c/0e/810c0eb747297db3a848d83c017a2d06.jpg",
        "https://m.media-amazon.com/images/M/MV5BOWY0YzE1OTYtOTZkZC00YTVhLTkwZjQtYTQwNmExNmUxYTU4XkEyXkFqcGc@._V1_.jpg",
        "https://es.web.img3.acsta.net/r_1280_720/pictures/16/03/03/13/19/355096.jpg",
        "https://cinescopia.com/wp-content/uploads/2013/08/forty_year_old_virgin_ver2.jpg",
        "https://www.alvarocuevas.es/wp-content/uploads/2020/06/american-pie-1.jpg",
        "https://es.web.img2.acsta.net/pictures/16/02/11/17/08/295858.jpg",
        "https://image.tmdb.org/t/p/original/brpvlgumBfw8LaJfnIk0teZUrHq.jpg",
        "https://scontent.ftuc1-2.fna.fbcdn.net/v/t51.82787-15/529951136_18415029805128894_8114074410545918033_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGP1L_iBJhGaez06he02rTwyO5UHQUOb-nI7lQdBQ5v6cggkJ2OILxNERrqEZn2G_dUcANc8C4cy5CSEhgOnxdL&_nc_ohc=x6KthYeVXUkQ7kNvwFyKFk9&_nc_oc=AdmWuyW4JH9WXe_j9WDG3msdAMqugydFZBWEq4Q2gryR9Si8o_y5puF9ox-OEdCTQIA&_nc_zt=23&_nc_ht=scontent.ftuc1-2.fna&_nc_gid=pi-SW_cafm5e_vVSSRFjig&oh=00_AfnYwNXneNNolNaR-xSERHMrVa7pL0wMByEYjq-GSkH2BA&oe=6938EA9B",
        "https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_.jpg",
        'https://es.web.img3.acsta.net/pictures/14/04/29/10/13/335512.jpg'
      ],
    },
    {
      titulo: "Ciencia Ficción 🛸",
      id: "cat2",
      imagenes: [
        "https://im.ziffdavisinternational.com/ign_es/screenshot/default/guardaines_jhsk.jpg",
        "https://im.ziffdavisinternational.com/ign_es/screenshot/default/matrix_c1cf.jpg",
        'https://es.web.img3.acsta.net/c_310_420/pictures/17/01/30/11/31/059557.jpg',
        "https://es.web.img3.acsta.net/c_310_420/pictures/18/03/16/15/33/3988420.jpg",
        "https://im.ziffdavisinternational.com/ign_es/screenshot/default/star-trek_rkus.jpg",
        'https://www.filmclub.es/wp-content/uploads/2016/02/portada.jpg',
        'https://i.pinimg.com/originals/e0/b3/f1/e0b3f10f7f05dfb0f50a5dd2010ecb20.jpg',
        'https://im.ziffdavisinternational.com/ign_es/screenshot/default/avatar_6fyc.jpg',
        'https://es.web.img3.acsta.net/pictures/15/08/27/13/26/081921.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgn15WA8rUMIBGssuPX4SH3uz9QR4hxtu4yg&s',
        'https://i.pinimg.com/236x/a0/75/34/a0753430500b50dd19efb368c2dd936e.jpg',
        'https://tumbaabierta.com/wp-content/uploads/2013/03/world_war_z_xlg-e1364226851321.jpg',
        'https://es.web.img3.acsta.net/pictures/16/10/18/16/59/275907.jpg',
        'https://i.pinimg.com/474x/47/f2/2f/47f22f40160ffb33987fa4b9091dcee0.jpg',
      ],
    },
    {
      titulo: "Terror 👻",
      id: "cat3",
      imagenes: [
        "https://storage.googleapis.com/pod_public/750/251643.jpg",
        "https://www.cineyliteratura.cl/wp-content/uploads/2024/02/cuando-acecha-la-maldad-1.jpeg",
        "https://fanofhorror.wordpress.com/wp-content/uploads/2012/11/sinister-caratula.jpg",
        "https://i.pinimg.com/736x/14/2c/68/142c687c979283e65f73788d1556604e.jpg",
        "https://i0.wp.com/cinemedios.com/wp-content/uploads/2023/09/El-Conjuro-2-imagen-2.jpg?resize=640%2C853&ssl=1",
        'https://i.pinimg.com/originals/8b/bc/14/8bbc1425081b1f33c45c1bdd335b0ab7.jpg',
        'https://static.posters.cz/image/350/posters/el-exorcista-i75296.jpg',
        'https://es.web.img3.acsta.net/r_1280_720/img/13/30/1330f802a364bea1a73e645ee75189eb.jpg',
        'https://m.media-amazon.com/images/I/61oKraCWQxL._AC_UF894,1000_QL80_.jpg',
        'https://pbs.twimg.com/media/C57RpX5WYAAg7_j.jpg',
        'https://storage.googleapis.com/pod_public/750/251647.jpg',
        'https://m.media-amazon.com/images/S/pv-target-images/2d8eed82148cd101e89f168ec5c2e8b78d1692b1e9285fed63e9ed20974717f7.jpg',
        'https://m.media-amazon.com/images/S/pv-target-images/b3cd537530219fe94499f734a34a0f4c4de3e3f84a484b5156239bbffb4d8747.jpg',
        'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/08/03132536/poster1.jpg'
        
      ],
    },
];

// Función para decidir cuántas imágenes mostrar según el tamaño de pantalla
const obtenerCantidadImagenes = () => {
  const ancho = window.innerWidth; 

  if (ancho < 480) return 1;      // Celular chico
  if (ancho < 768) return 2;      // Celular grande / tablet chica
  if (ancho < 1024) return 3;     // Tablet grande

  return 7; // Monitores grandes
};
  const renderCategoria = (categoria) => {

    // Cantidad de imágenes según el dispositivo
    const imagenesPorDiapositiva = obtenerCantidadImagenes();

    const totalDiapositivas = Math.ceil(
      categoria.imagenes.length / imagenesPorDiapositiva
    );

    return (
      <div key={categoria.id} className="mb-5 text-center">
        <h2 className="mb-2">{categoria.titulo}</h2>

        <div id={categoria.id} className="carousel slide" data-bs-touch="true">
          <div className="carousel-inner">

            {Array.from({ length: totalDiapositivas }).map((x , indice) => {
              const inicio = indice * imagenesPorDiapositiva;
              const fin = inicio + imagenesPorDiapositiva;
              const grupoImagenes = categoria.imagenes.slice(inicio, fin);

              return (
                <div
                  key={indice}
                  className={`carousel-item ${indice === 0 ? "active" : ""}`}
                >
                              {/* Estilos y llamados a para el carousel*/}
                  <div
                    className="d-flex justify-content-center gap-3 p-2"
                    style={{
                      minHeight: "180px",
                    }}
                  >            
                    {grupoImagenes.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="imgage-slider"
                        style={{
                          width: window.innerWidth < 600 ? "60vw" : "250px",
                          height: window.innerWidth < 600 ? "250px" : "auto",
                          objectFit: "cover",
                          flex: "0 0 auto",
                        }}
                        alt={categoria.titulo}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev d-flex justify-content-start"
            type="button"
            data-bs-target={`#${categoria.id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next d-flex justify-content-end"
            type="button"
            data-bs-target={`#${categoria.id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>
      </div>
    );
  };

  return <div>{categorias.map(renderCategoria)}</div>;
};

export default Sliders;