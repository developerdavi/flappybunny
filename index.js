var express = require('express');
// var path = require('path');
var app = express();
var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var mysql = require('mysql');

// // MySQL
// var dbconn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "flappybunny"
// });

// dbconn.connect(function(err) {
//   if (err) throw err;
//   console.log("[SERVER] Database succesfully connected!");
// });

// Express
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/statistics', function(req, res) {
	res.sendFile(__dirname + '/public/statistics.html');
})

// Server port
var port = 3000;

http.listen(port, function() {
	console.log('[SERVER] Successfully started! Running on port: ' + port);
});

// function sendData(socket) {
	
// 	var wins
// 	var loses
// 	var average
// 	let query = 'SELECT COUNT(*) as wins FROM result WHERE win LIKE TRUE'
// 	dbconn.query(query, function(err, result, fields) {
// 		wins = result
// 		wins = wins[0]
// 		wins = wins.wins
// 		query = 'SELECT COUNT(*) as loses FROM result WHERE win LIKE FALSE'
// 		dbconn.query(query, function(err, result, fields) {
// 			loses = result
// 			loses = loses[0]
// 			loses = loses.loses
// 			query = 'SELECT AVG(score) as average FROM result'
// 			dbconn.query(query, function(err, result, fields) {
// 				average = result
// 				average = average[0]
// 				average = average.average
// 				if (average == null) {
// 					average = 0
// 				}
// 				let data = {
// 					wins: wins,
// 					loses: loses,
// 					average: average
// 				}
// 				console.log(data)
// 				socket.emit('data', data)
// 			})
// 		})
// 	})
// }

// io.on('connection', function(socket) {
// 	socket.on('disconnect', function() {

// 	})
// 	socket.on('get data', function() {
// 		sendData(socket)
// 	})
// 	socket.on('reset', function() {
// 		dbconn.query('DELETE FROM result WHERE 1', function(err, result) {
// 			if (err) throw err
// 			sendData(socket)
// 		})
// 	})
// 	socket.on('game over', function(data) {
// 		let query = 'INSERT INTO result(score, win, date) VALUES(\''+data.score+'\', '+data.win+', NOW())'
// 		dbconn.query(query, function(err, result) {
// 			if (err) throw err
// 			let text = '[RESULTS] Score inserted: '
// 			if (data.win == 1) {
// 				text += '(win)  '
// 			} else {
// 				text += '(lose) '
// 			}
// 			text += ' -  ' + data.score
// 			console.log(text)
// 			sendData(io)
// 		})
// 	})
// })
