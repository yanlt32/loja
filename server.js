const express = require('express');
const path = require('path');
const app = express();

// Definindo a porta a partir da variável de ambiente ou usando 3000 como padrão
const port = process.env.PORT || 3000;

// Definindo a pasta pública para servir arquivos estáticos (imagens, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

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

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});