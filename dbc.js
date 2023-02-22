const mariadb = require('mariadb');
const vals = require('./consts.js');
 
const pool = mariadb.createPool({
    host: vals.DBhost, port:vals.DBport,
    user: vals.DBuser, password: vals.DBpass,
    connectionLimit: 5000
});
//요부분을 약간 그때그때 이용해볼까

async function appendUser(id){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE libetta');
        conn.query(`insert into userdata values (${id}, 0, 0)`);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
    }
}

async function find_user_libe(id){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE libetta');
        rows = await conn.query(`SELECT AVG(libe) FROM userdata WHERE id = ${id}`);
        rows = rows[0]['AVG(libe)']*1
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}

async function find_user_item(id_){
    let conn, rows;
    console.log(id_)
    try{
        conn = await pool.getConnection();
        await conn.query('USE libetta');
        rows = await conn.query(`SELECT item FROM userdata WHERE id = ${id_}`);
        console.log(`SELECT item FROM userdata WHERE id = ${id_}`)
        rows=rows.map((k)=>k.item);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}

module.exports = {
    appendUser:appendUser,
    find_user_libe:find_user_libe,
    find_user_item:find_user_item,
}