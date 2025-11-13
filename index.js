import expres from "express";

const app = expres();


app.get("/",(req,res) => {
    res.send("Bienvenido a mi API con NodeJS")
})



app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

