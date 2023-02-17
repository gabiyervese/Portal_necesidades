const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllCommentsFromEntryQuery = async (idEntry, del) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos los comentarios segun el id de la entry a la  que pertenecen.
    const [comments] = await connection.query(
      `  SELECT C.id, C.user_id,U.username,U.avatar, C.entry_id, C.text, C.file_name, C.creation_date, AVG(R.rating) as averageRating
      FROM comments C
      INNER JOIN entries E on E.id = C.entry_id
      LEFT JOIN ratings R on R.comment_id = C.id
      INNER JOIN users U on U.id = C.user_id
      WHERE E.id = ?
      GROUP BY C.id`,
      [idEntry]
    );

    //devuelve los comentarios.
    return comments;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectAllCommentsFromEntryQuery;
