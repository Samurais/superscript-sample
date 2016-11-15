# SuperScript Sample

## Intallation

```
npm install
```

## Run Test
```
ava function.test.js
```

Testcase fail due to [addMessageProp does not work](https://github.com/superscriptjs/superscript/issues/301).

### Trace
```
$ ava function.test.js
Number of Gambits: 2
Number of Replies: 4
(node:67099) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongo
osejs.com/docs/promises.html
Number of Replies: 4
Number of Gambits: 2
{"replyId":"582a9c44f285d4061c10ccbf","createdAt":"2016-11-15T05:25:26.492Z","string":"hello1 foo","topicName":"greetings","subReplies":[],"debug":{"user_id":
"testuser","raw_input":"__preview","normalized_input":"__preview","matched_gambit":[{"topic":"greetings","input":"__preview","reply":"{@__res1__} foo ^addMess
ageProp(voice_file_upper,v0)","output":"hello1 foo"}],"final_output":"hello1 foo","timestamp":"2016-11-15T05:25:25.851Z"},"voice_file_upper":"v0"}

   1 failed


   1. SuperScript Function#addMessageProp
   addMessageProp in lower gambit
  t.truthy(["v1", "v2", "v3"].includes(reply.voice_file), "addMessageProp in lower gambit")
                              |              |
                              false          undefined

      false          undefined
        function.test.js:13:15
        node_modules/superscript/index.js:271:16
        node_modules/async/lib/async.js:52:16
        node_modules/async/lib/async.js:361:13
        node_modules/async/lib/async.js:52:16
        node_modules/async/lib/async.js:269:32
```