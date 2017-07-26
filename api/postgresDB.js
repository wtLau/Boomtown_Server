import pool from '../database/index'

function renameId(rows) {
  return rows.map((row) => Object.keys(row).reduce((acc, usr) =>{
        acc = { ...row, id: row.userid }
        delete acc.userid
        return acc
      }), {})
}

export const getUsers = () => {
  return pool.query(`SELECT * from user_profiles`)
    .then(response => {
      return renameId(response.rows)
    })
    .catch(errors => {console.log(errors)})
}

export const getItems = (id) => {
  return pool.query(`SELECT * from items`)
    .then(response => response.rows)
    .catch(errors => console.log(errors))
}

export const getUser = (id) => {
  return pool.query(`SELECT * from user_profiles WHERE userid='${id}'`)
    .then(response => {
      return renameId(response.rows)[0]
    })
    .catch(errors => {
      console.log(errors)
    })
}

// export const getItem = (id) => {
//   return pool.query(`SELECT * from items WHERE ownerid='${id}'`)
//     .then(response => response.rows[0])
//     .catch(errors => console.log(errors))
// }

// export const getUserOwnItem = (id) => {
//   return pool.query(`SELECT * from items WHERE itemOwner=(ownerid='${id}')`)
//     .then (response => response.json())
//     .catch(errors => console.log(errors))
// }