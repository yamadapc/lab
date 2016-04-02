var GitLab = require
function runCreate(name) {
  console.error('Creating project ' + name);
}


/**
 * Main entry point
 */

function main() {
  console.log('function main');
  var program = require('commander');
  program.usage('<command> [options]')
    .command('create <name>', 'Creates a new repository').action(function(name) {
      runCreate(name)
      process.exit(0);
    })
    .parse(process.argv);
}

main();
