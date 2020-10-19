const functions = require('firebase-functions')
const admin = require('firebase-admin')

// require('dotenv').config();
const privateKey = ("-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrofu2xdSkeMDc\na1i0qjJYVI4wjzNdi+WqF0eFAFAorEGgTaudvi+eMXoPeylNvek5m2SViX0UFjJ2\nbmXwGgepiCG6i2B/U8AMFBDDH40aE5IKL7DUkT7k8bU6I/oJcuZ24txhnIUS1lGn\neyCUDlxQfzy8W0Wzq/liydspUizMPbor4Hn3YTSPlq2jfhMNeL6XL1vjfzSwrH74\nkL3Ss02TyiDDjKQoICZsepksfdQczf8sA31jQ+3y1RFH0miFOa2LYSnQKJ3BddfY\n3cFHK37tnNMiEADh3sRtZVQAOOkKgo/JVV2KRp4HFuy9Z3KV0sCZh2DFq7R97YwS\nAs1yEmNBAgMBAAECggEAD0v7lDmjjxkYD00d9dQpcofuuFM6/75lNLiobikt+8IG\ng1QI1KFLuyyrtU+DyeMAM1svJsi/NhgYXUfPnAul3S093FNpwU9kkW8EY2+fctCF\ntpSzjO55DYyhW1Izib4M3lGv1J9PmPMzCdtGdwuknKQKdLspxi6wpmZZOyCQz48X\nd7wgh/lD3d4m4yxD/7cS2Lopb68oG1DSerqNDiEVACp/RATIXg4h/EWmdW/f1eRU\n7e+GYvGY6n7DWFWhRwJq7elt5p9y0eO3XYd5zLy3bVj7XdGNswy7vpj/zjHWaCIq\ncYp8L3YzUmnVuOohOuew5VQrtKI90AC7Tlu9WbjwMQKBgQDUGUlTo4pBBmf8cccx\nYJVHL8EhsumMKbr2wfMtD/mjQtthPdev/w+KmjTc4FbT0uWiQNuZ/lkxEq+Kf3gU\nVi6NmeDhnZvjsLeE7D/gKlkscXfEY9S4nokToVQ+CHDI7hcZz48nFuDDLPkACh3V\ntP73El56Q3jYMVAydKZJUhNPbQKBgQDPKHp5dwrlBd9fv1D5QXZw+FNw8BZkAMnr\noptLvtGLwc/fzQ6QuLYlStwIr6Cn8QRVR+BNhn1vxyKCZUIyUggac03jTYhTGS3E\nhBf4VQfJCYQtWAcl4BbDMMBK/c1FUoW7f/qkoxDhtMS6e/ui4ZNpll1+HlxNaK9D\nIH47kbe6pQKBgQDQLs25idFfR/FzaR5yifGcQPRZpmn0yNUZ9X9CIOcQZ8Q7a181\nAa74haoTjyPKoLwDCZRDT9OuBkBFOh7cH0dsd7iy22ezErbfgqCj4A1NQUakfrTC\nTeIQYY71oIVLw97q178USDFvgcoaTtO/+vsz+lS/v1BzK9wi2jqJx0Tq9QKBgFiH\nPOfBpsc+3jnFwa3zetFGXipKf9cWuzPW1rTlBBnMprBGqm3Qcg630hZoL6j1h9uG\nDuYyjlKBcE73RPXKNqpPEj8MODEC9psftDqs49nXFkRmdQ+Ll06s+9BQbDOu03XQ\neGV5RlKedOAY8e2mpt+dobCu+tUd4qA2N5vvZuv9AoGAex4KQ5/1VuxyQmv5fFKP\nAosVlGz/y50MRMDmrX2/dPdWuMETHDVF1P8/ofd3+MIcn8cHMx1BFiPMsP6jrP2O\ni1dge7kAku2mzakIBXxRzphEdgRRYosdjS9lRPSUICiAn4gJ/hQM+/1TjYlkGu0u\nvUKyNRw9h1aRwznHrSeugRE=\n-----END PRIVATE KEY-----\n" || "").split("\\n").join("\n");
let serviceAccount = { 
  type: "service_account",
  project_id: "blockers-8a128",
  private_key_id: "631587c93f3c38864a6072ee7e7ab76c91a7f593",
  private_key: privateKey,
  client_email: "firebase-adminsdk-wyi08@blockers-8a128.iam.gserviceaccount.com",
  client_id: "108320859434849496663",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wyi08%40blockers-8a128.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  "https://blockers-8a128.firebaseio.com"
})

const request = require('axios')

    const kakaoRequestMeUrl = 'https://kapi.kakao.com/v2/user/me?secure_resource=true'
    
    /**
     * requestMe - Returns user profile from Kakao API
     *
     * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
     * @return {Promise<Responser>}      User profile response in a promise
     */
    function requestMe(kakaoAccessToken) {
      console.log('Requesting user profile from Kakao API server.')
      return request({
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + kakaoAccessToken},
        url: kakaoRequestMeUrl,
      })
    }

/**
   * updateOrCreateUser - Update Firebase user with the give email, create if
   * none exists.
   *
   * @param  {String} userId        user id per app
   * @param  {String} email         user's email address
   * @param  {String} displayName   user
   * @param  {String} photoURL      profile photo url
   * @return {Promise<UserRecord>} Firebase user record in a promise
   */
  async function updateOrCreateUser(userId, email, displayName, photoURL) {
    console.log('updating or creating a firebase user');
    const updateParams = {
      provider: 'Kakao',
      displayName: displayName,
    };
    if (displayName) {
      updateParams['displayName'] = displayName;
    } else {
      updateParams['displayName'] = email;
    }
    if (photoURL) {
      updateParams['photoURL'] = photoURL;
    }
    console.log(updateParams,"hhhhfhkjeoisgjpoi");
    return admin.auth().updateUser(userId, updateParams)
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        updateParams['uid'] = userId;
        if (email) {
          updateParams['email'] = email;
        }
        return admin.auth().createUser(updateParams);
      }
      throw error;
    });
  }

  /**
   * createFirebaseToken - returns Firebase token using Firebase Admin SDK
   *
   * @param  {String} kakaoAccessToken access token from Kakao Login API
   * @return {Promise<String>}                  Firebase token in a promise
   */
  async function createFirebaseToken(kakaoAccessToken) {
    return requestMe(kakaoAccessToken).then((body) => {
    //     console.log("here")
    //     console.log(response)
    //   const body = JSON.parse(response)
    //   console.log("there")
      console.log(body)
console.log("!")
      const userId = `kakao:${body.data.id}`
      if (!userId) {
        return res.status(404)
        .send({message: 'There was no user with the given access token.'})
      }
      let nickname = null
      let profileImage = null
      if (body.data.properties) {
        nickname = body.data.properties.nickname
        profileImage = body.data.properties.profile_image
      }
      return updateOrCreateUser(userId, body.data.kakao_account.email, nickname,
        profileImage)
    }).then((userRecord) => {
        console.log(userRecord)
      const userId = userRecord.uid
      console.log(`creating a custom firebase token based on uid ${userId}`)
      return admin.auth().createCustomToken(userId, {provider: 'Kakao'})
    }).catch((err)=>{
        console.log("error at here")
        console.error(err)
    })
  }

  exports.kakaoCustomAuth = functions.https
  .onRequest((req, res) => {
    
    const token = req.body.data.token
    if (!token) return res.status(400).send({error: 'There is no token.'})
    console.log(`Verifying Kakao token: ${token}`)
    return createFirebaseToken(token).then((firebaseToken) => {
      console.log(`Returning firebase token to user: ${firebaseToken}`)
        // res.status(200).send(JSON.stringify({ firebase_token : firebaseToken}));
    
        res.send({data:{ firebase_token : firebaseToken}});
        // res.status(200).send({data:"hi"})
        
        // res.send({data:"hello!!for test"})
    })

  })
  