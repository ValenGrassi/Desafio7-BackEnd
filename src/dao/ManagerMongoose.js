import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

export class ManagerMongoose {
    constructor(nombreCollecion, schema) {
        const _schema = new mongoose.Schema(schema, {versionKey: false})
        _schema.plugin(mongoosePaginate)
        this.collection = mongoose.model(nombreCollecion, _schema);
    }

    async guardar(registro) {
        return await this.collection.create(registro)
    }

    async encontrar({criterio = {}, paginar = false, limit, page}) {
        if (!paginar) {
            return await this.collection.find(criterio).lean()
        } else {
            return await this.collection.paginate(criterio, {limit, page, lean: true})
        }
    }

    async actualizarUnoConCódigo(codigo, cambio) {
        return await this.collection.findOneAndUpdate({
            code: codigo
        }, cambio)
    }

    async borrarUnoConCódigo(codigo) {
        return await this.collection.findOneAndRemove(codigo)
    }

    async obtenerSegunCampo({campo,valor}) {
        const criterio = {}
        criterio[campo] = valor
        const buscado = await this.collection.findOne(criterio).lean()
        if (!buscado) {
            throw new Error("no encontrado")
        } else {
            return buscado
        }

    }
}