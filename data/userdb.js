const { Connection, Request} = require('tedious');

const config = {
    authentication: {
      options: {  
        userName: 'webappdbuser',
        password: 'bK100200',
      },
      type: 'default'
    },
    server: 'ps-webappdb.database.windows.net',
    options: {
        database:'webappdb',
        encrypt: true,
        trustServerCertificate: false,
        rowCollectionOnRequestCompletion:true
    }
};

const getConnection = async () =>{
    return new Promise((resolve, reject) =>{
        const connection = new Connection(config);
        connection.on('connect', (err)=>{
            if(err){
                reject(err);
            } else {
                resolve(connection);
            }
        })
    })
};

const executeQuery = async (sql)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const connection = await getConnection();
            const request = new Request(sql, (err, rowCount, rows)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve({rowCount:rowCount, rows:rows});
                }
            });
            connection.execSql(request);
        } catch(err) {
            reject(err);
        }
    })
}

module.exports.createUsers = async ()=>{
    const sql = `
        INSERT INTO USERS (name, email) VALUES('David', 'david@gmail.com')
        INSERT INTO USERS (name, email) VALUES('Jane', 'jane@gmail.com')
        INSERT INTO USERS (name, email) VALUES('Edward', 'edward@gmail.com')
    `;
    return await executeQuery(sql);
}

module.exports.getUsers = async ()=>{
    const sql = `SELECT * FROM users`;
    return await executeQuery(sql);
}