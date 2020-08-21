


const express = require('express');


const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


let filePath = null;

function server(file) {
    filePath = file;
    read();
    return app;
}

async function read() {
    try {
        const data = await fs.readFileSync(filePath, 'utf-8');
        return await JSON.parse(data);
    } catch (error) {
        console.log(error);
        write({});
    }
}
function write(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'), 'utf-8', (error) => {
        if (error) {
            console.log(error);
        }
        fs.close();
    });
}

app.get('/*', async (req, res) => {
    const path = req.params[0];

    if (path === 'favicon.ico') {
        res.sendStatus(200);
    } else {
        let data = await read();

        if (path) {
            data = data[path];
            data = data.filter(item => {
                let match = true;
                Object.keys(req.query).forEach(key => {
                    if (req.query[key] != item[key]) {
                        match = false;
                    }
                });
                if (match) {
                    return item;
                } else {
                    return;
                }
            });       
        }
        res.send(data); 
    }
});

app.post('/*', async (req, res) => {
    const path = req.params[0];

    let data = await read();
    data = data;
    data[path] = data[path].sort((a, b) => a.id - b.id);

    if (data[path]) {
        const body = req.body;
        if (!body.id) {
            if (data[path].length < 1) {
                body.id = "1";
            } else {
                const id = parseInt(data[path][data[path].length - 1].id) + 1;
                body.id = id.toString();
            }
        }
        data[path].push(body);
        write(data);
        res.sendStatus(200);
    } else {
        res.status(500).send('error');
    }
});

app.delete('/*/:id', async (req, res) => {
    const path = req.params[0];

    let data = await read();
    const id = req.params.id;

    if (data[path]) {
        const index = data[path].findIndex(item => item.id === id);
        if ((index === 0 || index) && index !== -1) {
            data[path].splice(index, 1);
            write(data);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }   
    }
});

app.patch('/*/:id', async (req, res) => {
    const path = req.params[0];

    let data = await read();
    const id = req.params.id;

    if (data[path]) {
        const index = data[path].findIndex(item => item.id == id);
   
        if ((index === 0 || index) && index !== -1) {
            data[path][index] = { ...data[path][index], ...req.body }
            write(data);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
});


module.exports = server;
