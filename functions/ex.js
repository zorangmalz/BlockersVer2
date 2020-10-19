const functions =require("firebase-functions");

exports.helloworld=functions.https.onRequest((request,response)=>{
    const token=request.body.data.token
    // console.log(token)
    // if(!token){
    //     return response.status(400).send({error:"error"})
    // }
    response.send({data:{datasdf:token}})
})