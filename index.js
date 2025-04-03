function buscarUsuarios() {
    const input = document.getElementById("usuarioInput");
    const buscaTermo = input.value.trim();

    
    document.getElementById("resultados").innerHTML = '';
    document.getElementById("erro").innerHTML = '';

    
    if (buscaTermo === '') {
        document.getElementById("erro").textContent = "Por favor, insira um nome de usuário.";
        return;
    }

   
    const url = `https://api.github.com/search/users?q=${buscaTermo}`;

    
    fetch(url)
        .then(response => response.json())
        .then(data => {
           
            if (data.items && data.items.length > 0) {
                mostrarUsuarios(data.items);
            } else {
                document.getElementById("erro").textContent = "Não foram encontrados usuários para esta pesquisa.";
            }
        })
        .catch(error => {
            document.getElementById("erro").textContent = "Ocorreu um erro ao buscar os usuários. Tente novamente.";
            console.error(error);
        });
}


function mostrarUsuarios(usuarios) {
    const resultadosDiv = document.getElementById("resultados");

    
    usuarios.forEach(usuario => {
        const usuarioElement = document.createElement('div');
        usuarioElement.classList.add('usuario');

        
        usuarioElement.innerHTML = `
            <div class="perfil">
                <img src="${usuario.avatar_url}" alt="${usuario.login}">
                <div class="usuario-info">
                    <a href="${usuario.html_url}" target="_blank"><strong>${usuario.login}</strong></a>
                    <p>${usuario.type}</p>
                </div>
            </div>
        `;

        resultadosDiv.appendChild(usuarioElement);
    });
}