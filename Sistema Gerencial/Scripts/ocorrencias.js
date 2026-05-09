let ocorrenciasOriginais = [];

function formatarData(dataString) {
  const data = new Date(dataString);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function criarBadgeStatus(status) {
  const texto = status || "-";
  const statusNormalizado = texto.toLowerCase().trim();

  let classe = "status-outro";

  if (statusNormalizado === "aguardando") {
    classe = "status-aguardando";
  } else if (statusNormalizado === "visualizado") {
    classe = "status-visualizado";
  }

  return `<span class="badge-status ${classe}">${texto}</span>`;
}

function limitarTexto(texto, limite = 180) {
  if (!texto) return "-";

  const textoTratado = String(texto).trim();

  if (textoTratado.length <= limite) {
    return textoTratado;
  }

  return textoTratado.substring(0, limite) + "...";
}

function aplicarFiltroStatus(lista) {
  const filtro = document.getElementById("filtro-status").value;

  if (filtro === "todos") {
    return lista;
  }

  return lista.filter(item => (item.status || "").trim() === filtro);
}

function atualizarContador(total) {
  const totalEl = document.getElementById("total-ocorrencias");
  totalEl.innerText = `${total} registro${total !== 1 ? "s" : ""}`;
}

function montarTabela(lista) {
  const tbody = document.getElementById("tabela-body");

  if (!lista || lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="estado-tabela">Nenhuma ocorrência encontrada para esse filtro.</td>
      </tr>
    `;
    atualizarContador(0);
    return;
  }

  atualizarContador(lista.length);
  tbody.innerHTML = "";

  lista.forEach(ocorrencia => {
    const tr = document.createElement("tr");

    const podeVisualizar = (ocorrencia.status || "").trim().toLowerCase() === "aguardando";

    tr.innerHTML = `
      <td class="col-id">${ocorrencia.id ?? "-"}</td>
      <td class="col-tipo">${ocorrencia.tipo ?? "-"}</td>
      <td class="col-data">${ocorrencia.criado_em ? formatarData(ocorrencia.criado_em) : "-"}</td>
      <td>${ocorrencia.cidade || "-"}</td>
      <td>${ocorrencia.bairro || "-"}</td>
      <td>${ocorrencia.rua || "-"}</td>
      <td>${criarBadgeStatus(ocorrencia.status)}</td>
      <td class="col-descricao" title="${ocorrencia.descricao || ""}">
        ${limitarTexto(ocorrencia.descricao)}
      </td>
      <td>
        ${
          podeVisualizar
            ? `<button class="btn-acao" data-id="${ocorrencia.id}">Marcar como visualizado</button>`
            : `<span class="acao-concluida"> </span>`
        }
      </td>
    `;

    tbody.appendChild(tr);
  });

  adicionarEventosBotoes();
}

function adicionarEventosBotoes() {
  const botoes = document.querySelectorAll(".btn-acao");

  botoes.forEach(botao => {
    botao.addEventListener("click", async function () {
      const id = this.dataset.id;
      await marcarComoVisualizado(id, this);
    });
  });
}

async function marcarComoVisualizado(id, botao) {
  try {
    botao.disabled = true;
    botao.innerText = "Atualizando...";

    const { error } = await window.supabaseCliente
      .from("table_ocorrencia")
      .update({ status: "Visualizado" })
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status.");
      botao.disabled = false;
      botao.innerText = "Marcar como visualizado";
      return;
    }

    await carregarOcorrencias();
  } catch (erro) {
    console.error("Erro inesperado:", erro);
    alert("Ocorreu um erro ao atualizar a ocorrência.");
    botao.disabled = false;
    botao.innerText = "Marcar como visualizado";
  }
}

async function carregarOcorrencias() {
  const tbody = document.getElementById("tabela-body");
  tbody.innerHTML = `
    <tr>
      <td colspan="9" class="estado-tabela">Carregando ocorrências...</td>
    </tr>
  `;

  const { data, error } = await window.supabaseCliente
    .from("table_ocorrencia")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao carregar ocorrências:", error);
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="estado-tabela">Erro ao carregar ocorrências.</td>
      </tr>
    `;
    atualizarContador(0);
    return;
  }

  ocorrenciasOriginais = data || [];
  const listaFiltrada = aplicarFiltroStatus(ocorrenciasOriginais);
  montarTabela(listaFiltrada);
}

window.addEventListener("DOMContentLoaded", () => {
  carregarOcorrencias();

  document.getElementById("filtro-status").addEventListener("change", () => {
    const listaFiltrada = aplicarFiltroStatus(ocorrenciasOriginais);
    montarTabela(listaFiltrada);
  });
});