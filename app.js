const app = require('./server/startup/server');

app.listen(8080, function () {
    console.log('server is listening...');
})

