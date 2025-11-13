import expres from "express";
import fs from "fs";
import bodyParser from "body-parser";
const app = expres();
app.use(bodyParser.json());

const archivo = "./db/db.json";
const leerData = () => {
  try {
    const data = fs.readFileSync(archivo);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const escribirData = (data) => {
  try {
    fs.writeFileSync(archivo, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/libros", (req, res) => {
  const data = leerData();
  res.json(data.libros);
});

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API con NodeJS");
});

app.get("/libros/:id", (req, res) => {
  const data = leerData();
  const id = parseInt(req.params.id);
  const libro = data.libros.find((libr) => libr.id === id);
  res.json(libro);
});

app.post("/nuevo-libro", (req, res) => {
  const data = leerData();
  const body = req.body;
  const nuevoLibro = {
    id: data.libros.length + 1,
    ...body,
  };
  data.libros.push(nuevoLibro);
  escribirData(data);
  res.json(nuevoLibro);
});

leerData();

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
