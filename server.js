const express = require('express');
const path = require('path');
const fs = require('fs'); // Adicionado para listar arquivos no diretório img
const app = express();

// Definindo a porta a partir da variável de ambiente ou usando 3000 como padrão
const port = process.env.PORT || 3000;

// Definindo a pasta pública para servir arquivos estáticos (imagens, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Definindo a pasta img para servir imagens diretamente
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rota para servir o index.html na raiz
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(500).send('Erro ao carregar a página. Verifique se o arquivo index.html existe no diretório public.');
        }
    });
});

// Rota para listar as imagens no diretório img (opcional)
app.get('/imagens', (req, res) => {
    const imgDir = path.join(__dirname, 'img');
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            console.error('Erro ao listar imagens:', err);
            return res.status(500).send('Erro ao listar as imagens.');
        }
        // Filtra apenas arquivos de imagem (opcional: você pode ajustar as extensões)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        // Cria uma lista de links para as imagens
        const imageList = images.map(file => `/img/${file}`);
        res.json(imageList);
    });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});