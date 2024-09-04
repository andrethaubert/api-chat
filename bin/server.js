require("dotenv").config();
const app = require("../src/api");

app.use((req, res, next)=>{
    next();  
});

let port = process.env.API_PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`DB HOST: ${process.env.DB_HOST}`);
});

