const nodemon = require('nodemon');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

nodemon({
  script: resolve('/mock-server.js'),
  ext: 'json'
});

nodemon.on('start', () => {
	console.log('\033[34m', 'mockServer has started', '\033[32m\n');
}).on('quit', () => {
	console.log('\033[31m', 'mockServer has quit');
}).on('restart', files => {
	console.log('\033[33m', 'mockServer restarted due to: ', files);
})
