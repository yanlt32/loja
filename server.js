const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Definindo a pasta pública (onde estão os arquivos como imagens, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
