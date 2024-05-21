const http = require("http");
const sqlite3 = require("sqlite3").verbose();
const db = new  sqlite3.Database("/tmp/livros.db", (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log("Conexão estabelecida com sucesso ao banco de dados dos livros.")
    }
});
db.run(
    `CREATE TABLE IF NOT EXISTS livros(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        livro text,
        autor text,
        descricao text,
        data text,
        imagem text
    )`,
    (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Tabela de livros criada com sucesso.");
        }
    }
);
const search = (callback)=>{
    db.all("SELECT * FROM livros", (err, rows)=>{
        if(err){
            console.error(err);
        }else{
            callback(rows);
        }
    });
};
async function insertData(item) {
    try {
        return new Promise((resolve, reject) => {
            const caminho = item.imagem.replace(/^.*[\\/]/, '/imagens/');
            db.run('INSERT INTO livros (livro, autor, descricao, data, imagem) VALUES (?, ?, ?, ?, ?)',
            [item.livro, item.autor, item.descricao, item.data, caminho], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    } catch (err) {
        throw err;
    }
}
async function deleteData(item) {
    try {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM livros WHERE id == ?', [item], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    } catch (err) {
        throw err;
    }
}
const modifyData = db.prepare(
    `UPDATE livros
      SET livro = ?,
          autor = ?,
          descricao = ?,
          data = ?,
          imagem = ?
     WHERE id = ?`,
     (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Dados do livro modificados com sucesso.");
        }
     }
);
const server = http.createServer((req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    search((result)=>{
        res.write(JSON.stringify(result));
        res.end();
    });
    if(req.method === "POST"){
        let body = "";
        req.on("data", (chunk)=>{
            body += chunk;
        });
        req.on("end", ()=>{
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            insertData(parsedBody);
            console.log("ID atribuido automaticamente pelo banco de dados. Endereco da imagem tratado pelo servidor.");
            console.log("Dados do livro criados com sucesso.");
        });
    }else if(req.method === "DELETE"){
        let body = "";
        req.on("data", (chunk)=>{
            body += chunk;
        });
        req.on("end", ()=>{
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            deleteData(parsedBody);
            console.log("Dados do livro excluídos com sucesso.");
        });
    }else if(req.method === "PUT"){
        let body = "";
        req.on("data", (chunk)=>{
            body += chunk;
        });
        req.on("end", ()=>{
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            modifyData.run(
                parsedBody.livro,
                parsedBody.autor,
                parsedBody.descricao,
                parsedBody.data,
                parsedBody.imagem,
                parsedBody.id
            );
            console.log("Dados do livro modificados com sucesso.");
        });
    }
});
const port = 3001;
server.listen(port);
console.log(`Servidor escutando na porta ${port}`)
