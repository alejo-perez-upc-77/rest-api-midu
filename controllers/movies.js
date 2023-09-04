import { MovieModel } from "../models/movie";
export class MovieController{
    static async getAll (req, res){
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json(movies) 
    }
    static async getById (req, res){
        
    }


}