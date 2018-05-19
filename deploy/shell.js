// https://gist.github.com/millermedeiros/4724047
//
// spawn a child process and execute shell command
// borrowed from https://github.com/mout/mout/ build script
// author Miller Medeiros
// released under MIT License
// version: 0.1.0 (2013/02/01)


exports.exec = function(cmd, cb){
    // this would be way easier on a shell/bash script :P
    var child_process = require('child_process');
    var parts = cmd.split(/\s+/g);
    var p = child_process.spawn(parts[0], parts.slice(1), {stdio: 'inherit'});
    p.on('exit', function(code){
        var err = null;
        if (code) {
            err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
            err.code = code;
            err.cmd = cmd;
        }
        if (cb) cb(err);
    });
};


exports.series = function(cmds, cb){
    var execNext = function(){
        exports.exec(cmds.shift(), function(err){
            if (err) {
                cb(err);
            } else {
                if (cmds.length) execNext();
                else cb(null);
            }
        });
    };
    execNext();
};
