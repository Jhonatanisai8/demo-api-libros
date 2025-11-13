import expres from "express";
import fs from "fs";
const app = expres();

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

leerData();

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
