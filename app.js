import express from 'express';

import fs from 'fs';
import path from path;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express ();
const PORT = 3000;

const dadosFilePath = path.join(__dirname, 'dados.json');

app.use(express.json())
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname , 'public , index.html'
    ))})

function LerDados(){

    try {
        const dados = fs.readSync(dadosFilePath, 'utf8')
        return JSON.parse(dados);

    } catch (error) {
        console.error('Erro ao ler Arquivo', error);
        return []
    }
}

function salvarDados(novoDado){
    const dados = LerDados()
dados.push(novoDado);

try {
    fs.writeFileSync(dadosFilePath, JSONs.stringfy
        (dados,
         null, 
         2), "utf-8");
         console.log ('Dados criado com sucesso')
} catch (error) {
    console.error('Erro ao salvar dados ', error)
}
}

app.post('/salvar', (req, res) =>{
    const dadosParaSalvar = req.body;
    console.log('Dados recebidos',dadosParaSalvar );

    if(!dadosParaSalvar || !dadosParaSalvar.total){
        return res.status(400).send('Dados inválidos');

    }
    salvarDados(dadosParaSalvar);
    res.send('Dados salvos com sucesso');
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

app.get('ler', (req, res) =>{
try {
    const dados = LerDados()
} catch (error) {
    res.status(500).send('Erro ao ler dados')
    
}})