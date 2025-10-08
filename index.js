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
        cor: "Prata"
    },
    {
        id: 2,
        nome: "Cleverson",
        email: "CleversonI@gmail.com",
        cpf: "852.421.128-16",
        dataNasc: "02/02/1990",
        placa: "XYZ-5678",
        modelo: "Gol",
        cor: "Preto"
    },
];

//FUNÇÃO A BAIXO FEITA PELO CHAT-GPT - serve para o texto do input formatar como CPF
function CPF(){
    document.getElementById('cpf').addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, ""); 
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = v;
    })
}

//FUNÇÃO A BAIXO FEITA PELO CHAT-GPT - serve para o texto do input formatar como data
//Fiz assim em vez de data pois estava formatando como Ano/Mês/Dia, e estava atrapalhando o processo!
function DataMask() {
    const el = document.getElementById('data');
    if (!el) return;
  
    el.addEventListener('input', function (e) {
      // remove tudo que não for dígito e limita a 8 caracteres (DDMMYYYY)
      let v = e.target.value.replace(/\D/g, '').slice(0, 8);
  
      // aplica as barras: DD/MM/AAAA
      if (v.length >= 5) {
        v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
      } else if (v.length >= 3) {
        v = v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
      }
  
      e.target.value = v;
    });
  
    // validação simples ao perder o foco: limita dia e mês
    el.addEventListener('blur', function (e) {
      const parts = e.target.value.split('/');
      if (parts.length === 3) {
        let day = parseInt(parts[0], 10) || 0;
        let month = parseInt(parts[1], 10) || 0;
        let year = parts[2] || '';
  
        // limita mês e dia (não faz validação de mês com dias diferentes ou anos bissextos)
        if (month < 1) month = 1;
        if (month > 12) month = 12;
        if (day < 1) day = 1;
        if (day > 31) day = 31;
  
        e.target.value =
          String(day).padStart(2, '0') +
          '/' +
          String(month).padStart(2, '0') +
          (year ? '/' + year : '');
      }
    });
  }

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
function criar(){
    var nome = document.querySelector(".nome").value;
    var email = document.querySelector(".email").value;
    var cpf = document.querySelector(".cpf").value;
    var dataNasc = document.querySelector(".dataNasc").value;
    var placa = document.querySelector(".placa").value;
    var modelo = document.querySelector(".modelo").value;
    var cor = document.querySelector(".cor").value;
    var obj = {
        id: data.length + 1,
        nome,
        email,
        cpf,
        dataNasc,
        placa,
        modelo,
        cor
    };
    data.push(obj)
    lerTudo();
    document.querySelector(".nome").value = "";
    document.querySelector(".email").value = "";
    document.querySelector(".cpf").value = "";
    document.querySelector(".dataNasc").value = "";
    document.querySelector(".placa").value = "";
    document.querySelector(".modelo").value = "";
    document.querySelector(".cor").value = "";
}

//Função para a tabela ler o conteúdo
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
            <td>${obj.cor}</td>
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
  document.querySelector(".ucor").value  = object.cor;
}

function atualizar(){
  var id = Number(document.querySelector(".id").value);
  var nome = document.querySelector(".unome").value;
  var email = document.querySelector(".uemail").value;
  var cpf = document.querySelector(".ucpf").value;
  var dataNasc = document.querySelector(".udataNasc").value;
  var placa = document.querySelector(".uplaca").value;
  var modelo = document.querySelector(".umodelo").value;
  var cor = document.querySelector(".ucor").value;

  var index = data.findIndex(obj => obj.id === id);
  if (index === -1) {
    alert("Motorista não encontrado!");
    return;
  } 
  data[index] = {id, nome, email, cpf, dataNasc, placa, modelo, cor};
  document.querySelector('.update_form').style.display = "none";
  document.querySelector('.create_form').style.display = "grid";
  lerTudo();
}

function deletar(id){
  var index = data.findIndex(obj => obj.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    lerTudo();
  } else {
    alert("Motorista não encontrado!");
  }
}

//mascara feita pelo chat-gpt
// Serve para formatar a placa no padrão Mercosul: ABC1D23
function PlacaMask() {
    const placaInputs = [document.getElementById('placa'), document.getElementById('uplaca')];
    placaInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function(e) {
            let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

            // 3 letras
            let letras1 = v.substring(0, 3).replace(/[^A-Z]/g, '');
            // 1 número
            let num1 = v.substring(3, 4).replace(/[^0-9]/g, '');
            // 1 letra
            let letra2 = v.substring(4, 5).replace(/[^A-Z]/g, '');
            // 2 números
            let num2 = v.substring(5, 7).replace(/[^0-9]/g, '');

            let resultado = letras1;
            if (letras1.length === 3) resultado += '-';
            resultado += num1 + letra2 + num2;
            resultado = resultado.substring(0, 8); // Limita a 8 caracteres (incluindo o traço)
            e.target.value = resultado;
        });
    });
}

function cancelar() {
  document.querySelector('.update_form').style.display = "none";
  document.querySelector('.create_form').style.display = "grid";
}