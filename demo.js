


const server = require('./server');

const s = server('./db.json');



s.listen(3000, () => console.log('server running...'));
