const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const corsOptions = {
    origin: ["https://timelytransitclient.onrender.com/"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());



let busData = {}
app.post('/api/buses', (req, res) =>{
    busData = req.body
    res.json({"message": "form submitted"})
})



app.get("/api", (req, res) => {
    const appID= "dab0fe4c";
    const apiKey= "904e007115c858366b35b1aca5566ec9";
    const url =  `https://api.octranspo1.com/v2.0/GetNextTripsForStop?appID=${appID}&apiKey=${apiKey}&stopNo=${busData.stopNo}&routeNo=${busData.busNo}&format=json`;
    
    
    fetch(url)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => {
            res.status(500).json({ error: error.toString() });
        });
});


app.listen(8080, ()=>{
    console.log("Server started running on port 8080")
}); 






