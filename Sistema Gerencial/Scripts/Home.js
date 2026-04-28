async function carregarDashboard() {
  const { data, error } = await window.supabaseCliente
    .from("table_ocorrencia")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  // ================= KPI =================
  document.getElementById("kpi-total").innerText = data.length;

  document.getElementById("kpi-aguardando").innerText =
    data.filter(d => d.status === "Aguardando").length;

  document.getElementById("kpi-finalizadas").innerText =
    data.filter(d => d.status === "Visualizado").length;

  // ================= FORMATAR DATA =================
  const formatarData = (dataString) => {
  const data = new Date(dataString);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
};

  const datasSet = new Set();
  const tiposSet = new Set();
  const cidadesSet = new Set();

  data.forEach(item => {
    datasSet.add(formatarData(item.criado_em));
    tiposSet.add(item.tipo);
    cidadesSet.add(item.cidade?.trim());
  });

  const datas = Array.from(datasSet).sort();
  const tipos = Array.from(tiposSet);
  const cidades = Array.from(cidadesSet);

  // ================= GRAFICO 1 (EMPILHADO) =================
  const datasetsTipo = tipos.map(tipo => {
    return {
      label: tipo,
      data: datas.map(dataRef => {
        return data.filter(d =>
          formatarData(d.criado_em) === dataRef &&
          d.tipo === tipo
        ).length;
      })
    };
  });

  new Chart(document.getElementById("chart-1"), {
    type: "bar",
    data: {
      labels: datas,
      datasets: datasetsTipo
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true }
      }
    }
  });

  // ================= GRAFICO 2 (CIDADES) =================
  const datasetsCidade = cidades.map(cidade => {
    return {
      label: cidade,
      data: datas.map(dataRef => {
        return data.filter(d =>
          formatarData(d.criado_em) === dataRef &&
          d.cidade?.trim() === cidade
        ).length;
      })
    };
  });

  new Chart(document.getElementById("chart-2"), {
    type: "bar",
    data: {
      labels: datas,
      datasets: datasetsCidade
    }
  });
}

window.addEventListener("DOMContentLoaded", carregarDashboard);