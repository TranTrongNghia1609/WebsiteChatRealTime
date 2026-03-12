import mongoose from "mongoose"

export const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log('Lien ket csdl thanh cong!');
  }catch(error){
    console.log("Loi khi ket noi csld:", error);
    process.exit(1);
  }
}