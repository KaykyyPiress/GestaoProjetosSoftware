async function authLogin() {
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const { data, error } = await window.supabaseCliente
    .from("table_operadores")
    .select("*")
    .eq("email_operador", email)
    .eq("senha_operador", senha)
    .single();

  if (error || !data) {
    alert("Email ou senha inválidos");
    return;
  }

  // salva usuário logado (opcional, mas útil)
  localStorage.setItem("usuarioLogado", JSON.stringify(data));

  alert("Operador logado com sucesso!");
  window.location.href = "home.html";
}

window.authLogin = authLogin;