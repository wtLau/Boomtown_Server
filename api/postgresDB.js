import pool from '../database/index'
import admin from '../config/firebase'

function renameId(rows) {
  return rows.map((row) => Object.keys(row).reduce((acc, usr) =>{
    acc = { ...row, id: row.userid }
    delete acc.userid
    return acc
  }), {})
}

// READ HELPERS

export const getUsers = () => {
  return pool.query(`SELECT * from user_profiles`)
    .then(response => {
      return renameId(response.rows)
    })
    .catch(errors => {console.log(errors)})
}

export const getUser = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      let user = await pool.query(`SELECT * from user_profiles WHERE userid='${id}'`)
      const fbUser = await admin.auth().getUser(id)
      user = renameId(user.rows)[0]
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
      return renameId(response.rows)      
    })
    .catch(errors => console.log(errors))
}

export const getItem = (id) => {
  return pool.query(`SELECT * from items WHERE ownerid='${id}'`)
    .then(response => {
      return renameId(response.rows)[0]
    })
    .catch(errors => console.log(errors))
}

export const getUserOwnItem = (id) => {
  return pool.query(`SELECT * from items WHERE itemowner='${id}')`)
    .then (response => response.json())
    .catch(errors => console.log(errors))
}

export const getBorrowed = (id) => {
  return pool.query(`SELECT * from items WHERE borrower='${id}')`)
    .then (response => response.json())
    .catch(errors => console.log(errors))
}

// ALL TAGS FOR A GIVEN ITEM
export const getItemAllTags = (itemId) => {
  return 
    pool.query(
      `SELECT tags.title 
        from tags
        	inner join itemtags
        		on itemtags.tagid=tags.tagid
          where
            itemtags.itemid=${itemId}
      `
    )
      .then (response => response.json())
      .catch(errors => console.log(errors))
}

// ALL ITEMS FOR A GIVEN TAG
export const getTagAllItems = (tagId) => {
  return pool.query(
    `SELECT * 
      from items
        inner join itemtags
          on itemtags.itemid=items.itemid
        where
          itemtags.tagid=${tagId}
  `)
    .then (response => response.json())
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
        text: 'INSERT INTO user_profiles(fullname, bio, userid) VALUES($1, $2, $3) RETURNING *',
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

export const createItem = (title, imageurl, description, itemowner, ) => {
  return pool.query(`SELECT * from items WHERE borrower='${id}')`)
    .then (response => response.json())
    .catch(errors => console.log(errors))
}
