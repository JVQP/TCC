if(window.location.pathname == '/contato'){

    function upperCase(){

        let nome = document.getElementById('nome');
        nome.value = nome.value.toUpperCase();
    }
        
    }

if(window.location.pathname == '/usuario'){
    function upperCase(){

        let nome = document.getElementById('inputNome');
        nome.value = nome.value.toUpperCase();
    }
        
    let registro = document.getElementById('registro');

    registro.addEventListener('click', function(){

        registro.innerHTML = "Registrando...";

    });

    }
if(window.location.pathname == '/usuario/cadastro'){
    function upperCase(){

        let nome = document.getElementById('inputNome');
        nome.value = nome.value.toUpperCase();
    }
        
    let registro = document.getElementById('registro');

    registro.addEventListener('click', function(){

        registro.innerHTML = "Registrando...";

    });

    }