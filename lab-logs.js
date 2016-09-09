const childProcess = require('child_process');
const request = require('superagent');
const logSymbols = require('log-symbols');
const _ = require('lodash');

const remote = childProcess.execSync('git remote -v | grep gitlab').toString().split('\n')[0];
const [m, namespace, project] = /gitlab.com[:\/]([^\/]+)\/(\w+)/.exec(remote);

const id = encodeURIComponent(namespace + '/' + project)

function getSymbol(status) {
  if (logSymbols[status]) return logSymbols[status];
  switch (status) {
    case 'skipped': return logSymbols.warning;
    case 'failed': return logSymbols.error;
  }

  return logSymbol.info;
}


const sha = childProcess.execSync('git rev-parse HEAD').toString().split('\n')[0];

request
  .get(`https://gitlab.com/api/v3/projects/${id}`)
  .set('private-token', process.env.GITLAB_TOKEN)
  .end((err, res) => {
    if (err) throw err;

    const pid = res.body.id;

console.log(`https://gitlab.com/api/v3/projects/${pid}/repository/commits/${sha}/builds`);
request
  .get(`https://gitlab.com/api/v3/projects/${pid}/repository/commits/${sha}/builds`)
  .set('private-token', process.env.GITLAB_TOKEN)
  //.query({
    //scope: [
      //'running'
    //]
  //})
  .end((err, res) => {
    if (err) throw err;
    _.uniqBy(res.body, b => b.commit.message).forEach((build) => {
      // console.log(JSON.stringify(build));
      process.stdout.write(build.id + ' ' + getSymbol(build.status) + ' [' + build.ref + '/' + build.commit.short_id + ' ' + build.commit.message.split('\n')[0] + ']' + '\n');
    });
  });

  });
