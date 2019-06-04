const express = require('express');
const Datastore = require('nedb');

const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    
    let data = request.body;
    let timestamp = Date.now();
    data.timestamp = timestamp;
    
    
    database.insert(data);
    
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    })
});




app.listen(3000, () => console.log('Listening at 3000'));