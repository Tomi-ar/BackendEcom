import { Context } from '../devDependencies.js'
import { Colors } from '../types/colores.ts'

const arr:any = []
let id:number = 0

export const getColors = (ctx:Context) => {
    try {
        ctx.response.body = arr
    } catch (err) {
        ctx.response.status = 404,
        ctx.response.body = {msj: "Error en función getColors"}
    }
}

export const createColors = async (ctx:Context) => {
    try {
        const {name} = await ctx.request.body().value
        let newColor:Colors = {
            uuid: id++,
            name
        }
        arr.push(newColor)
        ctx.response.body = newColor

    } catch (error) {
        ctx.response.status = 404,
        ctx.response.body = {msj: "Error en función createColors"}
    }
}