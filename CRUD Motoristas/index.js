//Aqui fica armazenado o conteúdo do CRUD
let data = [
    {id: 1, nome: "Emerson", email: "EmersonL@gmail.com", cpf: "784.521.458-86", dataNasc: "12/12/2000"},
    {id: 2, nome: "Cleverson", email: "CleversonI@gmail.com", cpf: "852.421.128-16", dataNasc: "02/02/1990"},
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
    var obj = {id: data.length + 1, nome: nome, email: email, cpf: cpf, dataNasc: dataNasc};
    data.push(obj)
    lerTudo();
    document.querySelector(".nome").value = "";
    document.querySelector(".email").value = "";
    document.querySelector(".cpf").value = "";
    document.querySelector(".dataNasc").value = "";
}

//Função para a tabela ler o conteúdo
function lerTudo(){
    //anotação para eu lembrar: Document representa a árvore DOM, querySelector é um metodo de encontrar 
    //o primeiro representante do que for chamado...
    var tableData = document.querySelector(".table_data");
    var elements = '';

    data.map(obj => (
        elements += `
          <tr>
            <td>${obj.nome}</td>
            <td>${obj.email}</td>
            <td>${obj.cpf}</td>
            <td>${obj.dataNasc}</td>
            <td>
                <button class="update_button" onclick(edit(${obj.id}))>Update</button>
                <button class="delete_button" onclick(delete()>Delete</button>
            </td>
          </tr>
        `
        )
    )  
    tableData.innerHTML = elements;
}

function edit(id){
    document.querySelector('.create_form').style.display = "none";
    document.querySelector('.update_form').style.display = "block";
    var object = data.find(obj => obj.id === id)

    document.querySelector(".unome").value = object.nome;
    document.querySelector(".uemail").value = object.email;
    document.querySelector(".ucpf").value  = object.cpf;
    document.querySelector(".udataNasc").value  = object.dataNasc;
}
