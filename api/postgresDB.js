import pool from '../database/index'

export const getUser = (id) => {
  return pool.query(`SELECT * from user_profiles WHERE userid='${id}'`)
    .then(response => {
      return response.rows[0]
    })
    .catch(errors => {
      console.log(errors)
    })
}

export const getItem = (id) => {
  return pool.query(`SELECT * from items WHERE ownerid='${id}'`)
    .then(response => response.rows[0])
    .catch(errors => console.log(errors))
}

// export const getUserOwnItem = (id) => {
//   return pool.query(`SELECT * from items WHERE itemOwner=(ownerid='${id}')`)
//     .then (response => response.json())
//     .catch(errors => console.log(errors))
// }