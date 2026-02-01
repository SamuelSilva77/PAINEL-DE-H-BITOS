//API
let api = fetch("https://697011fda06046ce61887960.mockapi.io/habitos");

//BOTAO ADICIONAR
let adicionar = document.querySelector(".adicionar");

//DIV ONDE FICARÃOP AS TAREFAS
let armazenar = document.querySelector(".armazenar");

//ADICIONAR TAREFA
adicionar.addEventListener("click", () => {
  let tarefa = prompt("Digite sua tarefa");
  if (tarefa) {
    let meta = Number(prompt("Digite sua meta para essa tarefa"));
    while (!meta) {
      meta =  Number(prompt("Digite sua meta para essa tarefa"));
    }

    armazenar.innerHTML += `
          <div class="card" id="${tarefa}">
            <button class="deletar" onclick="deletar('${tarefa}')"> Deletar </button>   

            <p> ${tarefa} </p>

            <h3 > Dias Concluídos: <span id="span${tarefa}"> 0 </span> </h3>
            <br>
            <h3> Meta De Dias: ${meta} </h3>

            <progress value="0" max="${meta}" id="${tarefa + meta}"></progress>

            <button class="concluir" onclick="concluiHoje('span${tarefa}', '${tarefa + meta}', '${tarefa}', '${meta}')"> Concluí Hoje!! </button>
        </div>
  `;

  let dia = new Date().getDate() - 1

    fetch("https://697011fda06046ce61887960.mockapi.io/habitos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tarefa: tarefa,
        meta: meta, 
        diasConcluidos: 0,
        ultimoDia: dia
      }),
    });
  }
});

//CONCLUIR META
async function concluiHoje(idSpan, barra, tarefa, meta){
  //API
  let api = await fetch("https://697011fda06046ce61887960.mockapi.io/habitos/")
  let respost = await api.json()

  //VERIFICAR SE JA FEZ A TAREFA HOJE
  let diaAtual = new Date().getDate()

  respost.forEach((index) => {
    if(index.tarefa == tarefa){
      diaArmazenado = index.ultimoDia
    }
  })
  
  if(diaAtual > diaArmazenado || diaAtual == 1){
  //AUMENTAR DIAS CONCLUIDOS
  let dias = parseInt(document.getElementById(idSpan).innerHTML)
  document.getElementById(idSpan).innerHTML = dias + 1

  //AUMENTAR BARRA DE PROGRESSO
  let barraProgresso = document.getElementById(barra)
  barraProgresso.value = dias + 1

  //VERIFICAR SE BATEU A META
  if(barraProgresso.value == meta){
    meta = Number(prompt("Você bateu a meta! Insira uma nova"))
    while(!meta){
      meta = Number(prompt("Você bateu a meta! Insira uma nova"))
    }
  }
  console.log(meta)
  //SALVAR NA API
  respost.forEach(index => {
    if(index.tarefa == tarefa){
      fetch("https://697011fda06046ce61887960.mockapi.io/habitos/" + index.id, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          tarefa: tarefa,
          meta: meta,
          diasConcluidos: dias + 1,
          ultimoDia: diaAtual
        })
      })
    }
  })

  
  }else{
    alert("Você já concluiu sua tarefa hoje!")
  }
}


//DELETAR TAREFA
async function deletar(tarefa){
  let div = document.getElementById(tarefa);
  div.remove()

  //DELETAR DA API
  try{
  let api = await fetch("https://697011fda06046ce61887960.mockapi.io/habitos");
  let resposta = await api.json()

  resposta.forEach(index => {
    if(index.tarefa == tarefa){
      fetch("https://697011fda06046ce61887960.mockapi.io/habitos/" + index.id, {
        method: "DELETE"
      })
    }
  });
  }catch(err){
    alert("Erro! Tente Novamente mais tarde")
  }

}


//CARREGAR TAREFAS
async function passarDados(){
  try{
  let api = await fetch("https://697011fda06046ce61887960.mockapi.io/habitos")
  return await api.json()
  }catch(err){
    alert("Erro! Tente novamente mais tarde")
  }
}

async function carregarTarefas() {
  let dados = await passarDados()

  dados.forEach((index) => {
        armazenar.innerHTML += `
          <div class="card" id="${index.tarefa}">
            <button class="deletar" onclick="deletar('${index.tarefa}')"> Deletar </button>   

            <p> ${index.tarefa} </p>

            <h3 > Dias Concluídos: <span id="span${index.tarefa}"> ${index.diasConcluidos} </span> </h3>
            <br>
            <h3> Meta De Dias: ${index.meta} </h3>

            <progress value="${index.diasConcluidos}" max="${index.meta}" id="${index.tarefa + index.meta}"></progress>

            <button class="concluir" onclick="concluiHoje('span${index.tarefa}', '${index.tarefa + index.meta}', '${index.tarefa}', '${index.meta}')"> Concluí Hoje!! </button>
        </div>
  `;
  })
}

carregarTarefas()