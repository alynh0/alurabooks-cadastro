async function buscaEndereco(cep) {
  const msgErro = document.getElementById("erro");
  msgErro.innerHTML = "";
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCepJson = await res.json();
    if (consultaCepJson.erro) {
      throw Error("CEP inválido!");
    }

    // Campos do formulário
    const logradouro = document.getElementById("endereco");
    const cidade = document.getElementById("cidade");
    const bairro = document.getElementById("bairro");
    const estado = document.getElementById("estado");

    // Preenche os campos do formulário com os dados do CEP
    cidade.value = consultaCepJson.localidade;
    logradouro.value = consultaCepJson.logradouro;
    bairro.value = consultaCepJson.bairro;
    estado.value = consultaCepJson.uf;

    return consultaCepJson;
  } catch (erro) {
    msgErro.innerHTML = `<p>CEP inválido</p>`;
  }
}

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
