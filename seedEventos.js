const mongoose = require("mongoose");

const Eventos = require("./models/eventos.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/salaPlay")
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err);
  });

const preEventos = [
  {
    name: "Estopa",
    price: 29,
    date: "7/7/2023",
    description:
      "Estopa es un grupo de jovenes que esta empezando en la musica, su estilo es una mezcla entre lo acustico y rockero",
    img: "../../../../assets/img/estopa.jpg",
    tickets: 200
  },
  {
    name: "SFDK",
    price: 49,
    date: "14/7/2023",
    description:
      "SFDK es un grupo de jovenes sevillanos, un cantante y su DJ, su estilo de musica es del ambito urbano / Hip-Hop",
    img: "../../../../assets/img/sfdk.jpg",
    tickets: 200
  },
  {
    name: "Shakira",
    price: 19,
    date: "21/7/2023",
    description:
      "Shakira es una joven ex pareja del futbolista pique, debido a su separacion su cache ha bajado bastante, su estilo esta muy regido por latinoamerica",
    img: "../../../../assets/img/shakira.jpg",
    tickets: 200
  },
  {
    name: "ZNP",
    price: 24,
    date: "28/7/2023",
    description:
      "ZNP es un grupo que tuvo su epoca de auge en los 90, actualemente este grupo alicantino se dedica a dar conciertos por la zona, su tipo de musica se ve muy influenciada por el movimiento Hip-Hop",
    img: "../../../../assets/img/znp.jpg",
    tickets: 200
  },
  {
    name: "Kase.O",
    price: 34,
    date: "4/8/2023",
    description:
      "El integrante del grupo Violadores del Verso, hace gira en solitario tras aparcar su carrera con su grupo, su estilo esta muy influenciado por la cultura Hip-Hop y el jazz",
    img: "../../../../assets/img/kase.jpg",
    tickets: 200
  },
  {
    name: "El canto del loco",
    price: 49,
    date: "11/8/2023",
    description:
      "Este grupo de rock en español, muy conocido desde la epoca de los 2000, vuelve a los escenarios despues de su paron en 2012",
    img: "../../../../assets/img/canto_loco.jpg",
    tickets: 200
  },
  {
    name: "Pignoise",
    price: 29,
    date: "18/8/2023",
    description:
      "El grupo pignoise o tambien conocidos como 'La copia del Canto del loco', un grupo de rock español que viene a cerrar el cartel de verano.",
    img: "../../../../assets/img/pignoise.jpg",
    tickets: 200
  },
];

Eventos.insertMany(preEventos)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
