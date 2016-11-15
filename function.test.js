/**
 * SuperScript Function Test
 */
const test = require('ava');
const botInstance = require('./index');

test.cb('SuperScript Function#addMessageProp', t => {
    botInstance.then(function (bot) {
        // Use the remoteIP as the name since the PORT changes on ever new connection.
        bot.reply('testuser', '__preview', function (err, reply) {
            console.log(JSON.stringify(reply));
            t.is(reply.voice_file_upper, "v0", "addMessageProp in upper gambit");
            t.truthy(["v1", "v2", "v3"].includes(reply.voice_file), "addMessageProp in lower gambit");
            t.pass();
            t.end();
        });
    }, function (err) {
        t.fail(err);
        t.end();
    });
})
