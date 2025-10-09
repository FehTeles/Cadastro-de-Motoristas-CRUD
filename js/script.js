//Aqui fica armazenado o conteúdo do CRUD
let data = [
    {
        id: 1,
        nome: "Emerson",
        email: "EmersonL@gmail.com",
        cpf: "784.521.458-86",
        dataNasc: "12/12/2000",
        placa: "ABC-1234",
        modelo: "Fiat Uno",
    },
    {
        id: 2,
        nome: "Cleverson",
        email: "CleversonI@gmail.com",
        cpf: "852.421.128-16",
        dataNasc: "02/02/1990",
        placa: "XYZ-5678",
        modelo: "Gol",
    },
];

//Verificação simples de valores para não enviar valores vazios
function verifvalores(){
    var nome = document.querySelector(".nome").value;
    var email = document.querySelector(".email").value;
    var cpf = document.querySelector(".cpf").value;
    var dataNasc = document.querySelector(".dataNasc").value;
    if (
        nome !== "" &&
        email !== "" &&
        cpf !== "" &&
        dataNasc !== ""
    ){
        criar()
    }else {
        alert("Preencha todos os campos!");
    }
}

//Função de criar na tabela
//Nessa etapa ele vai pegar os valores que estão nos inputs inseridos no HTML
//E vai criar um objeto com esses valores e inserir esse objeto no array data
//Depois ele chama a função lerTudo() para atualizar a tabela
function criar(){
    var nome = document.querySelector(".nome").value;
    var email = document.querySelector(".email").value;
    var cpf = document.querySelector(".cpf").value;
    var dataNasc = document.querySelector(".dataNasc").value;
    var placa = document.querySelector(".placa").value;
    var modelo = document.querySelector(".modelo").value;
    var obj = {
        id: data.length + 1,
        nome,
        email,
        cpf,
        dataNasc,
        placa,
        modelo
    };
    data.push(obj)
    lerTudo();
    limpar_inputs();
}

//Função para limpar os inputs após o cadastro
function limpar_inputs() {
    document.querySelector(".nome").value = "";
    document.querySelector(".email").value = "";
    document.querySelector(".cpf").value = "";
    document.querySelector(".dataNasc").value = "";
    document.querySelector(".placa").value = "";
    document.querySelector(".modelo").value = "";
}

//Função para a tabela ler o conteúdo do array data
//Ela percorre o array e cria uma linha na tabela para cada objeto
//E insere os valores do objeto nas colunas da tabela
//Também cria os botões de update e delete para cada linha
function lerTudo(){
    var tableData = document.querySelector(".table_data");
    var elements = '';

    data.map(obj => (
        elements += `
          <tr>
            <td>${obj.nome}</td>
            <td>${obj.email}</td>
            <td>${obj.cpf}</td>
            <td>${obj.dataNasc}</td>
            <td>${obj.placa}</td>
            <td>${obj.modelo}</td>
            <td>
                <button class="update_button" onclick="edit(${obj.id})">Update</button>
                <button class="delete_button" onclick="deletar(${obj.id})">Delete</button>
            </td>
          </tr>
        `
        )
    )  
    tableData.innerHTML = elements;
}

//Função para editar um objeto
//Ela recebe o id do objeto que será editado
//E preenche os inputs do formulário de update com os valores do objeto
//Também esconde o formulário de criação e mostra o formulário de atualização
function edit(id) {
  document.querySelector('.create_form').style.display = "none";
  document.querySelector('.update_form').style.display = "grid";
  var object = data.find(obj => obj.id === id)

  document.querySelector(".id").value = object.id;
  document.querySelector(".unome").value = object.nome;
  document.querySelector(".uemail").value = object.email;
  document.querySelector(".ucpf").value  = object.cpf;
  document.querySelector(".udataNasc").value  = object.dataNasc;
  document.querySelector(".uplaca").value  = object.placa;
  document.querySelector(".umodelo").value  = object.modelo;
}

//Função para atualizar o objeto
//Ela pega os valores dos inputs do formulário de update
//E atualiza o objeto no array data com esses valores
//Depois chama a função lerTudo() para atualizar a tabela
//E por fim esconde o formulário de atualização e mostra o formulário de criação
function atualizar(){
  var id = Number(document.querySelector(".id").value);
  var nome = document.querySelector(".unome").value;
  var email = document.querySelector(".uemail").value;
  var cpf = document.querySelector(".ucpf").value;
  var dataNasc = document.querySelector(".udataNasc").value;
  var placa = document.querySelector(".uplaca").value;
  var modelo = document.querySelector(".umodelo").value;

  var index = data.findIndex(obj => obj.id === id);
  if (index === -1) {
    alert("Motorista não encontrado!");
    return;
  } 
  data[index] = {id, nome, email, cpf, dataNasc, placa, modelo};
  document.querySelector('.update_form').style.display = "none";
  document.querySelector('.create_form').style.display = "grid";
  lerTudo();
  limpar_inputs
}

//Função para deletar um objeto
//Ela recebe o id do objeto que será deletado
//E remove esse objeto do array data
//Depois chama a função lerTudo() para atualizar a tabela
function deletar(id){
  var index = data.findIndex(obj => obj.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    lerTudo();
  } else {
    alert("Motorista não encontrado!");
  }
}

//Função para cancelar a atualização
//Ela esconde o formulário de atualização e mostra o formulário de criação
function cancelar() {
  document.querySelector('.update_form').style.display = "none";
  document.querySelector('.create_form').style.display = "grid";
  limpar_inputs
}