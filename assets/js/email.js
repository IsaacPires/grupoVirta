document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('calculate');
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();

      xhr.open('POST', '/send', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  console.log('E-mail enviado com sucesso');
                  // Aqui você pode adicionar código para exibir uma mensagem de sucesso para o usuário
              } else {
                  console.error('Erro ao enviar o e-mail');
                  // Aqui você pode adicionar código para exibir uma mensagem de erro para o usuário
              }
          }
      };

      const jsonData = {};
      formData.forEach((value, key) => {
          jsonData[key] = value;
      });

      xhr.send(JSON.stringify(jsonData));
  });
});




const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seuemail@gmail.com',
        pass: 'suasenha'
    }
});

// Middleware para decodificar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para enviar o e-mail
app.post('/send', (req, res) => {
    const { email, mensagem } = req.body;

    // Configurações do e-mail a ser enviado
    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: 'destinatario@gmail.com',
        subject: 'Contato através do formulário',
        text: `E-mail: ${email}\n\nMensagem: ${mensagem}`
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar o e-mail');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.send('E-mail enviado com sucesso');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
