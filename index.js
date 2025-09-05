
async function buscarPosts() {
    const userIdInput = document.getElementById('userIdInput').value;
    const resultadoDiv = document.getElementById('resultado');
    
    resultadoDiv.innerHTML = '<p class="loading">Carregando posts...</p>';

    if (!userIdInput || userIdInput < 1 || userIdInput > 10) {
        resultadoDiv.innerHTML = '<p class="error">Por favor, digite um ID de usuário válido (1-10).</p>';
        return;
    }

    try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userIdInput}`, { timeout: 5000 });
    const posts = response.data;

        if (posts.length === 0) {
            resultadoDiv.innerHTML = '<p class="error">Nenhum post encontrado para este usuário.</p>';
            return;
        }

        exibirPosts(posts);
    } catch (error) {
        resultadoDiv.innerHTML = '<p class="error">Erro ao buscar posts. Tente novamente.</p>';
    }
}

async function buscarTodosPosts() {
    const resultadoDiv = document.getElementById('resultado');
    
    resultadoDiv.innerHTML = '<p class="loading">Carregando todos os posts...</p>';

    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { timeout: 5000 });
    const posts = response.data;

        const primeiros10Posts = posts.slice(0, 10);
        exibirPosts(primeiros10Posts);
    } catch (error) {
        resultadoDiv.innerHTML = '<p class="error">Erro ao buscar posts. Tente novamente.</p>';
    }
}

function exibirPosts(posts) {
    const resultadoDiv = document.getElementById('resultado');
    
    const postsHTML = posts.map(post => `
        <div class="post">
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
            <div class="post-info">
                <strong>Post ID:</strong> ${post.id} | 
                <strong>Usuário ID:</strong> ${post.userId}
            </div>
        </div>
    `).join('');

    resultadoDiv.innerHTML = postsHTML;
}




async function consultarCEP() {
    const cepInput = document.getElementById('cepInput').value;
    const resultadoDiv = document.getElementById('resultado');
    
    // limpa o resultado anterior
    resultadoDiv.innerHTML = '';

    // validação do CEP
    const cep = cepInput.replace(/\D/g, '');
    if (cep.length !== 8) {
        resultadoDiv.innerHTML = '<p class="error">Por favor, digite um CEP válido (00000-000 ou 00000000).</p>';
        return;
    }

    try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, { timeout: 5000 });
    const data = response.data;

        if (data.erro) {
            resultadoDiv.innerHTML = '<p class="error">CEP não encontrado.</p>';
            return;
        }

        // Exibe os dados
        resultadoDiv.innerHTML = `
            <p><strong>CEP:</strong> ${data.cep}</p>
            <p><strong>Logradouro:</strong> ${data.logradouro || 'Não informado'}</p>
            <p><strong>Complemento:</strong> ${data.complemento || 'Não informado'}</p>
            <p><strong>Unidade:</strong> ${data.unidade || 'Não informado'}</p>
            <p><strong>Bairro:</strong> ${data.bairro || 'Não informado'}</p>
            <p><strong>Localidade:</strong> ${data.localidade || 'Não informado'}</p>
            <p><strong>UF:</strong> ${data.uf || 'Não informado'}</p>
            <p><strong>Estado:</strong> ${data.estado || 'Não informado'}</p>
            <p><strong>Região:</strong> ${data.regiao || 'Não informado'}</p>
            <p><strong>DDD:</strong> ${data.ddd || 'Não informado'}</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = '<p class="error">Erro ao consultar o CEP. Tente novamente.</p>';
    }
}