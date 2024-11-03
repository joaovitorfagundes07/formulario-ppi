import express from'express';

const app = express();

app.use(express.urlencoded({extended: true}))
const porta = 3000;
const host = '0.0.0.0'; //placa de rede locais

var listausuario = [];  //global-lista de usuarios

    //formulario

function cadastrarUsuario(req, resp){

    resp.send(`
        
        <html lang="pt-BR">
            <head>
                <title>Cadastro de Usuário</title>
                 <link rel="stylesheet" href="estilo.css">
                    <style>
                        body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 0;
                                height: 100vh;
                                background-color: rgb(243, 243, 245);
                            }

                            form {
                                height: auto; 
                                width: 400px;
                                padding: 20px; 
                                border: solid 2px #007bff; 
                                border-radius: 8px;
                                background-color: rgb(255, 255, 255);
                                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
                            }

                            h2 {
                                font-size:37px;
                                text-align: center; 
                                color: #333; 
                            }

                            label {
                                display: block; 
                                margin: 10px 0 5px; 
                                font-weight:bold;
                            }

                            input {
                                width: 300px;
                                padding: 10px; 
                                border: solid 1px #ccc; 
                                border-radius: 4px; 
                                margin-bottom: 15px; 
                                transition: border-color 0.3s; 
                            }

                            input:focus {
                                border-color: #007bff; 
                                outline: none; 
                            }

                            button {
                                width: 100%; 
                                padding: 10px; 
                                background-color: #007bff; 
                                color: white; 
                                border: none;
                                border-radius: 4px; 
                                cursor: pointer; 
                                font-size: 16px; 
                                transition: background-color 0.3s;
                            }

                            button:hover {
                                background-color: #0056b3;
                            }
                    </style>

             </head>
             <body>
                <form method="POST" action="/cadastrarUsuario">
                
                    <h2>Cadastro de Usuário</h2>
                    <label for="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" required="required">

                    <label for="idade">Idade:</label>
                    <input type="number" name="idade" id="idade" required="required" min="0" max="100">
                    
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" id="email" required="required">     
                    
                    <label for="senha">Senha:</label>
                    <input type="password" name="senha" id="senha" required="required">

                    
                    <button type="submit">Cadastrar</button>
                </form>
            </body>
        </html>

        
        
        
    `);
}

function cadastrar(req, resp){

    const nome  = req.  body.nome;
    const idade = req.body.idade;       //pegando as informacoes do corpo da pagina 'name'
    const email = req.body.email;       
    const senha = req.body.senha;
   

    const usuario = {nome,idade,email,senha};

    listausuario.push(usuario); //adicionando usuario cadastrado

    resp.write(`

    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tabela de Usuários</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    margin: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                table {
                    width: 60%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                th, td {
                    border: 1px solid #dee2e6;
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background-color: #007bff;
                    color: white;
                }

                tr:nth-child(even) {
                    background-color: #f2f2f2; 
                }

                tr:hover {
                    background-color: #e0e7ff; 
                }
                .link-botao {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #007bff; 
                    color: white; 
                    text-decoration: none;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    transition: background-color 0.3s;
                    margin-top: 20px;
                }
                .link-botao:hover {
                     background-color: #0056b3; 
                }

            </style>
    </head>
    <body>
        <h2>Tabela de Usuários</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>E-mail</th>
                    <th>Senha</th>
                </tr>
            </thead>
            <tbody>`);

            //adicionando os dados na tabela

            for(var i= 0; i<listausuario.length; i++){

                resp.write(`
                    <tr>
                    <td>${listausuario[i].nome}</td>
                    <td>${listausuario[i].idade}</td>
                    <td>${listausuario[i].email}</td>
                    <td>${listausuario[i].senha}</td>

                `);

            }

    resp.write(`
            </tbody>
        </table>
            <a href="/cadastrarUsuario" class="link-botao">Continuar cadastros</a>

            <a href="/" class="link-botao">Menu</a>
            </body>
            </html>
        `);

        resp.end(); //envia a resposta
}

function menu(req, resp){
    resp.send(`

 <html lang="pt-BR">
    <head>
     <title>Menu</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/cadastrarUsuario">cadastrar Usuario</a>
            </div>
        </nav>

        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/lista">Lista</a>
            </div>
        </nav>

    </body>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
 </html>
        `);


}

function mostrarlista(req, resp){

    resp.write(`

        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabela de Usuários</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        margin: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    }
    
                    table {
                        width: 60%;
                        border-collapse: collapse;
                        margin-top: 20px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
    
                    th, td {
                        border: 1px solid #dee2e6;
                        padding: 12px;
                        text-align: left;
                    }
    
                    th {
                        background-color: #007bff;
                        color: white;
                    }
    
                    tr:nth-child(even) {
                        background-color: #f2f2f2; 
                    }
    
                    tr:hover {
                        background-color: #e0e7ff; 
                    }
                    .link-botao {
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #007bff; 
                        color: white; 
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                        font-weight: bold;
                        text-align: center;
                        transition: background-color 0.3s;
                        margin-top: 20px;
                    }
                    .link-botao:hover {
                         background-color: #0056b3; 
                    }
    
                </style>
        </head>
        <body>
            <h2>Tabela de Usuários</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>E-mail</th>
                        <th>Senha</th>
                    </tr>
                </thead>
                <tbody>`
    );
    
    for(var i= 0; i<listausuario.length; i++){

        resp.write(`
            <tr>
            <td>${listausuario[i].nome}</td>
            <td>${listausuario[i].idade}</td>
            <td>${listausuario[i].email}</td>
            <td>${listausuario[i].senha}</td>

        `);

    }

        resp.write(`
            </tbody>
        </table>
            <a href="/cadastrarUsuario" class="link-botao">Continuar cadastros</a>

            <a href="/" class="link-botao">Menu</a>
            </body>
            </html>
        `);

        resp.end(); //envia a resposta
}

app.get('/lista',mostrarlista);

app.get('/',menu);

app.post('/cadastrarUsuario',cadastrar);

app.get('/cadastrarUsuario',cadastrarUsuario); //enviar o formulario



app.listen(porta, host, () => {
    console.log(`servidor iniciado e em execução no endereco http://${host}:${porta}`);
})