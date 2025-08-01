
async function buscarPosts() {
    const userIdInput = document.getElementById('userIdInput').value;
    const resultadoDiv = document.getElementById('resultado');
    
    resultadoDiv.innerHTML = '<p class="loading">Carregando posts...</p>';

    if (!userIdInput || userIdInput < 1 || userIdInput > 10) {
        resultadoDiv.innerHTML = '<p class="error">Por favor, digite um ID de usuário válido (1-10).</p>';
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userIdInput}`);
        const posts = await response.json();

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
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

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