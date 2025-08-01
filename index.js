
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
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

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