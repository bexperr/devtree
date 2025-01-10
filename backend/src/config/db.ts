import colors from 'colors'
import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)

        console.log(connection);
        console.log(`MongoDB Conectado en ${connection.host} : ${connection.port}`)

    } catch (error) {
        console.log(colors.bgRed.white.bold(error.message))
        process.exit(1)
    }
}