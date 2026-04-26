async function handleCadastro() {
  const nome = document.getElementById("cadastro-nome").value;
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const { error } = await window.supabaseCliente
    .from("table_operadores")
    .insert([
      { nome_operador: nome, email_operador: email, senha_operador: senha }
    ]);

  if (error) {
    alert("Erro: " + error.message);
    return;
  }

  alert("Operador cadastrado com sucesso!");
  window.location.href = "login.html";
}

// deixa acessível no HTML
window.handleCadastro = handleCadastro;