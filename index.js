const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');

const {connectDB}=require('./Connection/Connection');
const userRoutes=require('./Routes/routes')

const app = express();
const port = process.env.PORT || 9000;


// Middleware
app.use(express.json());
app.use(cors());

// Swagger Setup
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/',userRoutes)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

