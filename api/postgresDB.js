import pool from '../database/index'
import admin from '../config/firebase'

// function renameId(rows) {
//   return rows.map((row) => Object.keys(row).reduce((acc, usr) =>{
//     acc = { ...row, id: row.userid }
//     delete acc.userid
//     return acc
//   }), {})
// }

// READ HELPERS

export const getUsers = () => {
  return pool.query(`SELECT * from user_profiles`)
    .then(response => {
      return response.rows
    })
    .catch(errors => {console.log(errors)})
}

export const getUser = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      let user = await pool.query(`SELECT * from user_profiles WHERE id='${id}'`)
      const fbUser = await admin.auth().getUser(id)
      user = user.rows[0]
      user = {...user, email: fbUser.email }
      resolve(user)
    } catch(e) {
      console.log(e)
      reject(e)
    }
  })
}

export const getItems = () => {
  return pool.query(`SELECT * from items`)
    .then(response => {
      return response.rows     
    })
    .catch(errors => console.log(errors))
}

export const getItem = (id) => {
  return pool.query(`SELECT * from items WHERE id='${id}'`)
    .then(response => {
      return response.rows[0]
    })
    .catch(errors => console.log(errors))
}

export const getUserOwnItem = (id) => {
  return pool.query(`SELECT * from items WHERE itemowner='${id}'`)
    .then (response => response.rows)
    .catch(errors => console.log(errors))
}

export const getBorrowed = (id) => {
  return pool.query(`SELECT * from items WHERE borrower='${id}'`)
    .then (response => response.rows)
    .catch(errors => console.log(errors))
}

// ALL TAGS FOR A GIVEN ITEM
export const getItemAllTags = (itemId) => {
  return 
    pool.query(
      `SELECT tags.title 
        from tags
        	inner join itemtags
        		on itemtags.tagid=tags.id
          where
            itemtags.itemid=${itemId}
      `
    )
      .then (response => {
        return response.rows})
      .catch(errors => console.log(errors))
}

// ALL ITEMS FOR A GIVEN TAG
export const getTagAllItems = (tagId) => {
  return pool.query(
    `SELECT * 
      from items
        inner join itemtags
          on itemtags.itemid=items.id
        where
          itemtags.tagid=${tagId}
  `)
    .then (response => response.rows)
    .catch(errors => console.log(errors))
}



// WRITE HELPER
export const createUser= (args, context) => {
  return new Promise(async(resolve, reject) => {
    try {
      let fbUser = await admin.auth().createUser({
        email: args.email,
        password: args.password
      })
      const query = {
        text: 'INSERT INTO user_profiles(fullname, bio, id) VALUES($1, $2, $3) RETURNING *',
        values: [args.fullname, args.bio, fbUser.uid],
      }
      let pgUser = await pool.query(query)
      let user = {...pgUser.rows[0], email: fbUser.email, id: fbUser.uid } 
      resolve(user)
    } catch(e) {
      console.log(e)
      reject(e)
    }
  })
}


export const postNewItem = (args, context) => {
  return new Promise( async (resolve, reject) => {
    try {
      const itemQuery = {
        text: 
          'INSERT INTO items( title, imageurl, itemowner, description, created) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values: 
          [ args.title, args.imageurl, args.itemowner, args.description, args.created]
      }
      const newItem = await pool.query(itemQuery)

     
      const insertTag = (tags) => {
        return tags.map(tag => {
          return `(${newItem.rows[0].id}, ${tag.id})`
        }).join(',')
      }
     
      const tagQuery = {
        text: 
          `INSERT INTO itemtags(itemid, tagid) VALUES ${insertTag(args.tags)}`
      }

      const tags = await pool.query(tagQuery)

      resolve({id: newItem.rows[0].id})
    } catch(e) {
      reject(e)
    }
  })
}
