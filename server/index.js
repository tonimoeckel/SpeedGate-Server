// server/index.js
'use strict';

const async = require('async');

const app = require('./app');

const PORT = process.env.PORT || 9000;

// const service = require('feathers-rethinkdb');
// const rethink = require('rethinkdbdash');

// // Connect to a local RethinkDB server.
// const r = rethink({
//     db: 'speedgate'
// });
//
// var services = [];
//
// services.push({
//     service: service({
//         Model: r,
//         name: 'challenges',
//         paginate: {
//             default: 10,
//             max: 50
//         }
//     }),
//     url: '/api/challenges'
// });
//
// services.push({
//     service: service({
//         Model: r,
//         name: 'runs',
//         paginate: {
//             default: 10,
//             max: 50
//         }
//     }),
//     url: '/api/runs'
// });
//
// services.push({
//     service: service({
//         Model: r,
//         name: 'players',
//         paginate: {
//             default: 10,
//             max: 50
//         }
//     }),
//     url: '/api/players'
// });
//
// async.eachSeries(services, function iteratee(item, callback) {
//     item.service.init().then(()=>{
//         app.use(item.url, item.service);
//         callback();
//     });
// }, function done() {
//
//     // start the server.
//
//     app.listen(PORT, () => {
//         console.log(`App listening on port ${PORT}!`);
//     });
//
// });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
