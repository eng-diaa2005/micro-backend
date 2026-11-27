import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL)
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
}
export default connect