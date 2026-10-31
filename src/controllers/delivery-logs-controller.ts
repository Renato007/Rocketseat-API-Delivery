import {Request, Response} from 'express'
class DeliveryLogsController{
    async create(request:Request, responde:Response){
        return responde.json({message:"ok"})
    }
}

export {DeliveryLogsController}