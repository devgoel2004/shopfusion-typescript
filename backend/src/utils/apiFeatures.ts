import { Query, Document } from "mongoose";
class APIFeatures<T extends Document>{
    declare query: Query<T[],T>;
    declare queryStr: Record<string,any>;
    constructor(query: Query<T[],T>, queryStr: Record<string,any>){
        this.query=query;
        this.queryStr= queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword
        ?{
            name:{
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        }:{};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy= {...this.queryStr};
        const removeFields = ['keyword','page','limit'];
        removeFields.forEach((key)=>delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage: number){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export default APIFeatures;