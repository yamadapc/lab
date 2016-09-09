#!/usr/bin/env node
const childProcess = require('child_process');
const open = require('open');

const remote = childProcess.execSync('git remote -v | grep gitlab').toString().split('\n')[0];
const [m, namespace, project] = /gitlab.com[:\/]([^\/]+)\/([^\s]+)/.exec(remote);

const id = namespace + '/' + project;
open('https://gitlab.com/' + id);
