const functions =require("firebase-functions");

exports.helloworld=functions.https.onRequest((request,response)=>{
    response.send("hello!!for test")
})