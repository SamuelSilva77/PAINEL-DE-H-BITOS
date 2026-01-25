//ELEMENTOS
let adicionar = document.querySelector(".adicionar");
let armazenar = document.querySelector(".armazenar");
let endereco = 10;
//EVENTOS
adicionar.addEventListener("click", () => {
  ++endereco;

  let tarefa = prompt("Insira seu hábito");
  while (!tarefa || !isNaN(tarefa)) {
    tarefa = prompt("Insira seu Hábito");
  }

  let metaDeDias = prompt("Insira sua meta para esse hábito");
  while (!metaDeDias || isNaN(metaDeDias)) {
    metaDeDias = prompt("Insira sua meta para esse hábito");
  }

  armazenar.innerHTML += `<div class = "card" id="${tarefa}">
        <button class="deletar" onclick="deletar('${tarefa}')"> Deletar </button>   

        <p> ${tarefa.toUpperCase()} </p>

        <h3 > Dias Concluídos: <span id="${endereco}"> 0 </span> </h3>
        <br>
        <h3> Meta De Dias: ${metaDeDias}</h3>
        <progress value="" id="${tarefa + metaDeDias}" max="${Number(metaDeDias)}"></progress>
        <button class="concluir" onclick="aumentar('${endereco}', '${tarefa + metaDeDias}', '${tarefa}', '${metaDeDias}')"> Concluí Hoje!! </button>

     </div>`;

  let diaAtual = new Date().getDate() - 1;

  let conjunto = JSON.stringify({
    tarefa: tarefa,
    metaDeDias: metaDeDias,
    ultimaData: diaAtual,
  });
  localStorage.setItem(tarefa, conjunto);
});

const aumentar = (endereco, progresso, tarefa, meta) => {
  let pegar = localStorage.getItem(tarefa);
  let obj = JSON.parse(pegar);
  //VERIFICAR ULTIMA DATA
  let diaNovo = new Date().getDate();

  if (diaNovo > obj.ultimaData || diaNovo == 1) {
    let sequencia = document.getElementById(endereco);
    sequencia.innerHTML = parseInt(sequencia.innerHTML) + 1;
    let numeros = sequencia.innerHTML;

    //IPLEMENTAR NO ARRAY O ENDERECO
    obj.endereco = numeros;

    //BARRA DE PROGRESSO
    let progress = document.getElementById(progresso);
    console.log(progresso);
    console.log(progress);
    progress.value += 1;
    obj.barra = progress.value;

    //VERIFICAR SE BATEU A META
    if (progress.value == meta) {
      metaDeDias = prompt("Você bateu a meta!! Insira uma nova");
      while (
        !metaDeDias ||
        isNaN(metaDeDias) ||
        metaDeDias < parseInt(sequencia.innerHTML) ||
        metaDeDias - 1 < parseInt(sequencia.innerHTML)
      ) {
        metaDeDias = prompt("Você bateu sua meta! Insira uma nova");
      }
      obj.metaDeDias = metaDeDias;
      obj.barra = parseInt(sequencia.innerHTML);
      location.reload();
    }

    //SALVAR NO STORAGE
    obj.ultimaData = diaNovo;
    let transform = JSON.stringify(obj);
    localStorage.setItem(tarefa, transform);

    //

    switch (sequencia.innerHTML) {
      case "1":
        alert("Parabéns! Esse é o primeiro passo!");
        break;
      case "10":
        alert("Já fazem 10 dias consecutivos que você está focado! Parabéns!!");
        break;
      case "25":
        alert("Já fazem 25 dias! Rumo aos 50!");
        break;
      case "50":
        alert("100 DIAS! Isso é de dar inveja!!");
        break;
    }
  } else {
    alert("Você já concluiu essa tarefa Hoje!");
  }
};

const deletar = (id) => {
  let elemento = document.getElementById(id);
  elemento.remove();
  localStorage.removeItem(id);
};

for (let i = 0; i < localStorage.length; i++) {
  let pegar = localStorage.key(i);
  let data = new Date().getDate();

  if (isNaN(pegar)) {
    endereco++;
    let pegarTarefa = localStorage.getItem(pegar);
    let transformar = JSON.parse(pegarTarefa);
    console.log(data > transformar.ultimaData + 1);

    if (data > transformar.ultimaData + 1) {
      console.log("sl");
      armazenar.innerHTML += `<div class = "card" id="${transformar.tarefa}">
        <button class="deletar" onclick="deletar('${transformar.tarefa}')"> Deletar </button>   

        <p> ${pegar.toUpperCase()} </p>

        <h3 > Dias Concluídos: <span id="${endereco}"> 0 </span> </h3>
        <br>
        <h3> Meta de Dias: ${transformar.metaDeDias}</h3>
        <progress value="${transformar.barra}" id="${transformar.tarefa + transformar.metaDeDias}"  max="${transformar.metaDeDias}"></progress>
        <button class="concluir" onclick="aumentar('${endereco}', '${transformar.metaDeDias}', '${transformar.tarefa}')"> Concluí Hoje!! </button>

     </div>`;

      alert(
        "A ATIVIDADE: " +
          transformar.tarefa +
          " foi zera pois nao foi feita no ultimo dia",
      );
      transformar.barra = 0;
      transformar.ultimaData = data - 1;
      let destransformar = JSON.stringify(transformar);
      localStorage.setItem(pegar, destransformar);
    } else if (!transformar.endereco) {
      armazenar.innerHTML += `<div class = "card" id="${transformar.tarefa}">
        <button class="deletar" onclick="deletar('${transformar.tarefa}')"> Deletar </button>   

        <p> ${pegar.toUpperCase()} </p>

        <h3 > Dias Concluídos: <span id="${endereco}"> 0 </span> </h3>
        <br>
        <h3> Meta de Dias: ${transformar.metaDeDias}</h3>
        <progress value="${transformar.barra}" id="${transformar.tarefa + transformar.metaDeDias}"  max="${transformar.metaDeDias}"></progress>
        <button class="concluir" onclick="aumentar('${endereco}', '${transformar.metaDeDias}', '${transformar.tarefa}')"> Concluí Hoje!! </button>

     </div>`;
    } else {
      armazenar.innerHTML += `<div class = "card" id="${transformar.tarefa}">
        <button class="deletar" onclick="deletar('${transformar.tarefa}', '${endereco}')"> Deletar </button>   

        <p> ${transformar.tarefa.toUpperCase()} </p>

        <h3 > Dias Concluídos: <span id="${endereco}"> ${transformar.endereco} </span> </h3>
        <br>
        <h3> Meta De Dias: ${transformar.metaDeDias} </h3>
        <progress value="${transformar.barra}" id="${transformar.tarefa + transformar.metaDeDias}" max="${transformar.metaDeDias}"></progress>
        <button class="concluir" onclick="aumentar('${endereco}', '${transformar.tarefa + transformar.metaDeDias}', '${transformar.tarefa}', '${transformar.metaDeDias}')"> Concluí Hoje!! </button>

     </div>`;
    }
  }
}
