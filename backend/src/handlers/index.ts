import { Request, Response } from "express"
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"

export const createAccount = async (req: Request,res: Response)=>{
    const {email, password,handle} = req.body

    const handleToFind = slug(handle,'')

    const userExists = await User.findOne({email})
    const handleExists = await User.findOne({handle:handleToFind})

    console.log('userExists',userExists);
    console.log('handleExists',handleExists);
    

    if(userExists){
        const error = new Error('El usuario ya esta registrado')
        res.status(409).json({error:error.message})
        return
    }

    if(handleExists){
        const error = new Error('El nombre de usuario no disponible')
        res.status(409).json({error:error.message})
        return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handleToFind

    await user.save();

    res.status(201).send('Registro creado correctamente')
}


export const login = async (req: Request,res: Response)=>{
    const {email, password} = req.body

    //validacion de usuario
    const userExists = await User.findOne({email})
    if(!userExists){
        const error = new Error('El usuario no existe')
        res.status(404).json({error:error.message})
        return
    }

    console.log('Si existe...');

    //comprobar el password
    const isPasswordCorrect = await checkPassword(password,userExists.password);
    if(!isPasswordCorrect){
        const error = new Error('Password incorrecto')
        res.status(401).json({error:error.message})
        return
    }

    res.send("Authenticado")

}