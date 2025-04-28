const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const iframe = document.getElementById("preview");

  Inputmask({ mask: "(99) 99999-9999" }).mask(
    document.getElementById("telefone")
  );
  Inputmask({ mask: "(99) 99999-9999" }).mask(
    document.getElementById("contatoTelefone")
  );

  document.getElementById("btnLimpar").addEventListener("click", () => {
    const form = document.getElementById("formulario");

    // Resetando os campos de texto e selects
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.value = "";
    });

    // Limpando os containers dinâmicos
    document.getElementById("habilidadesContainer").innerHTML = "";
    document.getElementById("experienciasContainer").innerHTML = "";
    document.getElementById("cursosContainer").innerHTML = "";
    document.getElementById("adicionaisContainer").innerHTML = "";
    setTimeout(() => {
      const nomeInput = form.querySelector("input[name='nome']");
      if (nomeInput) {
        nomeInput.focus();
      }
    }, 10);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Corrigir campos compostos
    data.formacao = {
      nivel: form.querySelector("input[name='formacao.nivel']").value,
      instituicao: form.querySelector("input[name='formacao.instituicao']")
        .value,
      ano: form.querySelector("input[name='formacao.ano']").value,
    };

    // Arrays
    data.habilidades = [
      ...document.querySelectorAll("input[name='habilidade']"),
    ].map((el) => el.value);
    data.adicionais = [
      ...document.querySelectorAll("input[name='adicional']"),
    ].map((el) => el.value);

    data.experiencias = [...document.querySelectorAll(".experiencia-item")].map(
      (item) => ({
        empresa: item.querySelector("input[name='empresa']").value,
        local: item.querySelector("input[name='local']").value,
        periodo: item.querySelector("input[name='periodo']").value,
        cargo: item.querySelector("input[name='cargo']").value,
        descricao: item.querySelector("textarea[name='descricao']").value,
      })
    );

    data.cursos = [...document.querySelectorAll(".curso-item")].map((item) => ({
      titulo: item.querySelector("input[name='titulo']").value,
      conteudo: item.querySelector("textarea[name='conteudo']").value,
      cargaHoraria: item.querySelector("input[name='cargaHoraria']").value,
      instituicao: item.querySelector("input[name='instituicao']").value,
      conclusao: item.querySelector("input[name='conclusao']").value,
    }));

    // Carregar e compilar o template
    const templatePath = path.join(__dirname, "template.html");
    const templateContent = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(templateContent);
    const html = template(data);

    // Inserir no iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
  });

  const { ipcRenderer } = require("electron");
  document.getElementById("btnImprimir").addEventListener("click", () => {
    const iframe = document.getElementById("preview");
    const iframeWindow = iframe.contentWindow;

    if (iframeWindow) {
      iframeWindow.focus(); // Garante que o iframe tenha foco
      iframeWindow.print(); // Abre a caixa de diálogo de impressão
    } else {
      alert("Preview ainda não carregado.");
    }
  });
});
