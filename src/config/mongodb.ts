require('dotenv').config()


export default {
  mongoURI : `mongodb+srv://${process.env.DB_Username}:${process.env.DB_password}@cluster1.tc92k.mongodb.net/bookend?retryWrites=true&w=majority`
};