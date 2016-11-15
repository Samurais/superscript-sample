/**
 * Superscript Refresher
 */

const Promise = require('bluebird'),
    mongodb = require('mongodb'),
    facts = require("sfacts"),
    rmdir = Promise.promisify(require('rimraf')),
    superscript = require('superscript'),
    fs = require("fs"),
    mongoose = require('mongoose');

const config = {
    mongo: {
        uris: 'mongodb://localhost/superscriptSampleDB'
    },
    superscript: {
        skipRemoveAll: false,
        collectionsToRemove: ['users', 'topics', 'replies', 'gambits'],
        flushTopics: true,
        facts: './systemDB',
        topic: './topics',
        preserveRandom: false
    }
}

function removeAll(db) {
    /**
     * @param {Object} MongoDB instance
     * @return {Promise} Resolved after listed collections are removed and the fact system directory has been recursively cleared
     */

    if (config.superscript.skipRemoveAll) return;
    return Promise.map(config.superscript.collectionsToRemove,
        function (collName) {
            var coll = db.collection(collName);
            return coll
                .removeAsync({})
                .then(isClear.bind(collName));
        })
        .then(function () {
            // Delete the old fact system directory
            return rmdir(config.superscript.facts)
        });
}


function isClear() {
    return true;
}

function createFresh() {
    /**
     * @return {Promise} Resolves after all data from the Topics folder has been loaded into Mongodb
     */

    // Generate Shared Fact System
    // If not pre-generated, superscript will throw error on initialization
    var factSystem = facts.create(config.superscript.facts),
        parser = require('ss-parser')(factSystem),
        loadDirectory = Promise.promisify(parser.loadDirectory, parser);

    function importAll(data) {
        /**
         * @param {Object} Parsed data from a .ss file
         * @return {Promise} Resolved when import is complete
         */

        return new Promise(function (resolve, reject) {
            mongoose.connect(mongoURL);

            new superscript({ factSystem: factSystem, mongoose: mongoose },
                function (err, bot) {
                    if (!err) bot.topicSystem.importerData(data,
                        resolve,
                        config.superscript.flushTopics,
                        config.superscript.preserveRandom);
                    else reject(err);
                });
        });
    }

    return loadDirectory(config.superscript.topic)
        .then(importAll);
}


// Setup Mongo Client: accepts MONGO_URI from environment, and URI or components or defaults as provided in options.
const MongoClient = Promise.promisifyAll(mongodb).MongoClient,
    mongoURL = config.mongo.uris;

exports.flush = function () {
    return MongoClient
        .connectAsync(mongoURL)
        .then(removeAll);
}