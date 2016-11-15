/**
 * Return a simple bot instance
 */

const superscript = require("superscript");
const mongoose = require("mongoose");
const facts = require("sfacts");
const factSystem = facts.create('telnetFacts');
const flush = require('./flush');

mongoose.connect('mongodb://localhost/superscriptSampleDB');
var TopicSystem = require("superscript/lib/topics/index")(mongoose, factSystem);

var options = {
    factSystem: factSystem,
    mongoose: mongoose
};

exports = module.exports = new Promise(function (resolve, reject) {
    // This assumes the topics have been compiled to data.json first
    // See superscript/bin/parse for information on how to do that.
    // Main entry point
    flush.flush()
        .then(function () {
            TopicSystem.importerFile('./data.json', function () {
                new superscript(options, function (err, botInstance) {
                    if (err)
                        return reject(err);
                    resolve(botInstance);
                });
            });
        }, function(err){
            reject(err);
        });
});