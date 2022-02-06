const { schema } = require('normalizr');

const authorSchema = new schema.Entity("autor", {}, { idAttribute: "id" });
const msjSchema = new schema.Entity("mensaje", {author: authorSchema}, { idAttribute: "dateTime" });
const postSchema= new schema.Entity('post', { mensajes: [msjSchema] }, { idAttribute: 'id' })

module.exports