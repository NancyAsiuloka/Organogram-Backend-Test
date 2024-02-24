const path = require('path')
const express = require ("express");
const bodyParser = require ("body-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const productRoutes = require ("./routes/product.js");

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

// Use swagger-ui-express to serve Swagger documentation
const swaggerDocument = YAML.load(path.resolve(__dirname, 'swagger.yaml')); // Use path.resolve to handle file paths
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/product", productRoutes);
app.get("/", (req, res) => res.send("Welcome to the Products API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));