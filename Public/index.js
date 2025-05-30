document.addEventListener('DOMContentLoaded', () => {
  let path = window.location.pathname;

  // Função para transformar em maiúsculas
  function upperCaseById(id) {
    let input = document.getElementById(id);
    if (input) {
      input.value = input.value.toUpperCase();
    }
  }

  // Se estiver na página de contato
  if (path === '/contato') {
    let nome = document.getElementById('nome');
    if (nome) {
      nome.addEventListener('input', () => upperCaseById('nome'));
    }
  }

  // Se estiver nas páginas relacionadas a usuário
  if (path === '/usuario' || path === '/usuario/cadastro') {
    let nome = document.getElementById('inputNome');
    if (nome) {
      nome.addEventListener('input', () => upperCaseById('inputNome'));
    }

    let registro = document.getElementById('registro');
    if (registro) {
      registro.addEventListener('click', () => {
        registro.innerHTML = "Registrando...";
      });
    }
  }
  // Se estiver na página de login
  if (path === '/loginAva') {
    let btn = document.getElementById('btn-procurar');
    btn.addEventListener('click', function (e) {
      btn.innerHTML = "Procurando...";
    });
  }

  // Se estiver na página de avaliação
  if (path === '/loginAva' || path === '/loginAva/avaliar-aluno') {

    window.atualizarNota = function () { 

    let nota1 = document.getElementById('avaNota1').value;
    let nota2 = document.getElementById('avaNota2').value;
    let nota3 = document.getElementById('avaNota3').value;
    let nota4 = document.getElementById('avaNota4').value;
    let nota5 = document.getElementById('avaNota5').value;
    let nota6 = document.getElementById('avaNota6').value;
    let nota7 = document.getElementById('avaNota7').value;
    let nota8 = document.getElementById('avaNota8').value;
    let mediaDisplay = document.getElementById('media');

    let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4) + Number(nota5) + Number(nota6) + Number(nota7) + Number(nota8)) / 8;

    mediaDisplay.value = media.toFixed(2);
  }
}



// SCRIPT DA PÁGINA DE ADIÇÃO DE PERFIL


if (path.startsWith('/add-foto/')) {
path.split('/')[2]; 

let btn = document.getElementById('confirmar');

btn.addEventListener('click', function (e) {

btn.innerHTML = "Aguarde...";



});

}


// Script para editar nota 

if(path.startsWith('/visualizar/')){
  path.split('/')[2];

 window.atualizarNota = function () { 

    let nota1 = document.getElementById('avaNota1').value;
    let nota2 = document.getElementById('avaNota2').value;
    let nota3 = document.getElementById('avaNota3').value;
    let nota4 = document.getElementById('avaNota4').value;
    let nota5 = document.getElementById('avaNota5').value;
    let nota6 = document.getElementById('avaNota6').value;
    let nota7 = document.getElementById('avaNota7').value;
    let nota8 = document.getElementById('avaNota8').value;
    let mediaDisplay = document.getElementById('media');

    let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4) + Number(nota5) + Number(nota6) + Number(nota7) + Number(nota8)) / 8;

    mediaDisplay.value = media.toFixed(2);
  }

}


// SCRIPT DA PÁGINA DE CADASTRO DE USUÁRIO

if(path === '/usuario' || path === '/usuario/cadastro'){

let btn = document.getElementById('registro');

btn.addEventListener('click', function (e) {
btn.innerHTML = "Registrando...";

});

}

if(path === '/desempenho-aluno'){

let btn = document.getElementById('btn-procurar');
btn.addEventListener('click', function (e) {
btn.innerHTML = "Aguarde...";


});
}

if(path.startsWith('/editar-usuario/')){
  path.split('/')[2];


    let nome = document.getElementById(inputNome);
    if (nome) {
     nome.addEventListener('input', () => upperCaseById('inputNome'));
    }

}


// Scritp da página de publicação de vagas

  if (path === '/publicar-vagas' || path === '/publicar-vagas/vaga-publicada') {
  let btn = document.getElementById('publicar');

  if (!btn) {
    console.error('Botão #publicar não encontrado!');
    return;
  }

  btn.addEventListener('click', function (e) {
    btn.innerHTML = 'Publicando...';
  //   let existente = document.getElementById('modalAviso');
  //   if (!existente) {
  //     let nova_div = document.createElement('div');

  //     nova_div.innerHTML = `
  //       <div class="modal fade" id="modalAviso" tabindex="-1">
  //         <div class="modal-dialog">
  //           <div class="modal-content">
  //             <div class="modal-header">
  //               <h5 class="modal-title success">AVISO</h5>
  //               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
  //             </div>
  //             <div class="modal-body">
  //               <p>Vaga publicada com sucesso!</p>
  //             </div>
  //             <div class="modal-footer">
  //               <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;

  //     document.body.appendChild(nova_div);
  //   }

    
  //   setTimeout(() => {
  //     const el = document.getElementById('modalAviso');
  //     if (el) {
  //       const modal = new bootstrap.Modal(el);
  //       modal.show();
  //     }
  //   }, 50);
  // });
  // }
  });
}
});

