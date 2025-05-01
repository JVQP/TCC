document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
  
    // Função para transformar em maiúsculas
    function upperCaseById(id) {
      const input = document.getElementById(id);
      if (input) {
        input.value = input.value.toUpperCase();
      }
    }
  
    // Se estiver na página de contato
    if (path === '/contato') {
      const nome = document.getElementById('nome');
      if (nome) {
        nome.addEventListener('input', () => upperCaseById('nome'));
      }
    }
  
    // Se estiver nas páginas relacionadas a usuário
    if (path === '/usuario' || path === '/usuario/cadastro') {
      const nome = document.getElementById('inputNome');
      if (nome) {
        nome.addEventListener('input', () => upperCaseById('inputNome'));
      }
  
      const registro = document.getElementById('registro');
      if (registro) {
        registro.addEventListener('click', () => {
          registro.innerHTML = "Registrando...";
        });
      }
    }
  });
  