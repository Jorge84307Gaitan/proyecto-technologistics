const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db"); 

const app = express();


app.use(cors());
app.use(express.json()); 
app.use("/clientes", require("./routes/clientes"));
app.use("/productos", require("./routes/productos"));
app.use("/pedidos", require("./routes/pedidos"));
app.use("/detallepedido", require("./routes/detallepedido"));
app.use("/detalleenvio", require("./routes/detalleenvio"));
app.use("/rutas", require("./routes/ruta")); 
app.use("/seguimientopedido", require("./routes/seguimientopedido"));
app.use("/transportista", require("./routes/transportista"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
