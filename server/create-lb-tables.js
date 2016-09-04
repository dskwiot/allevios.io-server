var server = require('./server/server');
var ds = server.dataSources.AlleviosServer;
var lbTables = ['user','accessToken','userCredential','userIdentity','ACL','RoleMapping','Role'];
ds.automigrate(lbTables, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
    ds.disconnect();
});
