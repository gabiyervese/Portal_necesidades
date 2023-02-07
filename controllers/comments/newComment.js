const insertCommentQuery = require("../../ddbb/queries/comments/insertCommentQuery");
const { generateError, saveFile } = require("../../helpers");

const newComment = async (req, res, next) => {
  try {
    //Obtenemos la información necesaria de nuestra request.
    const { text } = req.body;
    const { idEntry } = req.params;
    const file = req.files?.file;
    let fileName;
    //Guardamos el archivo y su nombre.
    if (req.files) {
      fileName = saveFile(file);
    }

    //Llamamos a la función encargada de registrar el comentario en la base de datos.
    await insertCommentQuery(req.user.id, idEntry, text, fileName);

    res.send({
      status: "ok",
      message: "Comment creado",
      data: { text, fileName },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newComment;
