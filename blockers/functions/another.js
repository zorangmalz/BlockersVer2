const functions = require('firebase-functions');

const firebaseAdmin = require('firebase-admin');

require('dotenv').config();
const privateKey = (process.env.PRIVATE_KEY || "").split("\\n").join("\n");
let serviceAccount = { 
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X_CERT_URL
}

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL:  "https://blockers-8a128.firebaseio.com"
  })


/**
 * updateOrCreateUser - Update Firebase user with the give email, create if
 * none exists.
 *
 * @param kakaoUserProfile requestMe로 받아온 카카오 유저의 프로필 JSON
 * @return {Promise<UserRecord>} Firebase user record in a promise
 */
function updateOrCreateUser(kakaoUserProfile) {
    const {userId, email, nickname, profileImage} = kakaoUserProfile;
    const updateParams = {
        provider: 'Kakao',
        displayName: nickname ? nickname : email,
        photoURL: profileImage ? profileImage : ""
    };

    return firebaseAdmin.auth().updateUser(userId, updateParams)
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                updateParams['uid'] = userId;
                if (email) {
                    updateParams['email'] = email;
                }
                return firebaseAdmin.auth().createUser(updateParams);
            }
            throw error;
        });
}


/**
 * createFirebaseToken - returns Firebase token using Firebase Admin SDK
 *
 * @param  {String} kakaoUserProfile requestMe로 받아온 카카오 유저의 프로필 JSON
 * @return {Promise<string>}                  Firebase token in a promise
 */
function createFirebaseToken(kakaoUserProfile) {
    if (kakaoUserProfile['userId']) {
        kakaoUserProfile['userId'] = `kakao:${kakaoUserProfile.userId}`;
    } else {
        return res.status(404)
            .send({message: 'There was no user Id.'});
    }

    return updateOrCreateUser(kakaoUserProfile).then((userRecord) => {
        const userId = userRecord.uid;
        // console.log(`creating a custom firebase token based on uid ${userId}`);
        return firebaseAdmin.auth().createCustomToken(userId, {provider: 'Kakao'});
    });
}

// actual endpoint that creates a firebase token with Kakao access token
exports.verifyKakao = functions.https.onRequest((req, res) => {
    const kakaoUserProfile = JSON.parse(req.body);

    if (!kakaoUserProfile) {
        return res.status(400).send({error: 'There is no userProfile.'});
    }

    return createFirebaseToken(kakaoUserProfile).then((firebaseToken) => {
        return res.send({firebase_token: firebaseToken});
    }).catch((err) => {
        return res.status(400).send({
            error: 'Failed sending a firebaseToken.',
            msg: err
        })
    });
});