import mysql from "mysql2/promise";

export async function query({ query, values = [] }){
    const db = await mysql.createConnection({
        host:'localhost',
        database:'todolist',
        user:'root',
        password:'vaiosony',
    });

    try{
        const [results] = await db.execute(query,values);
        db.end();
        return results;
    }catch(error){
        throw Error(error.message);
        return {error};
    }
}