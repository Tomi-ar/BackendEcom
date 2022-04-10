const connection =  {
    mongodb: {
        cnxStr: 'mongodb+srv://Tomas:t4VMECAcMAvPYNN@ecommerceatlas.80zrg.mongodb.net/backendFinal?retryWrites=true&w=majority',
        // options: {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     serverSelectionTimeoutMS: 5000,
        // }
    },
    firebase: {
        "type": "service_account",
        "project_id": "backend-coder-9b544",
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": "firebase-adminsdk-zbdys@backend-coder-9b544.iam.gserviceaccount.com",
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zbdys%40backend-coder-9b544.iam.gserviceaccount.com"
      },
    // sqlite3: {
    //     client: 'sqlite3',
    //     connection: {
    //         filename: `./DB/ecommerce.sqlite`
    //     },
    //     useNullAsDefault: true
    // }
}
module.exports = connection;