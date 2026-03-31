import { connect } from "mongoose";
const connect_db=async(url:string)=>{
    try {
    await connect(url);
    } catch (error) {
        console.log("Connection failed", error);
        process.exit(1);
    }
}
export {connect_db};