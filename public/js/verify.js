const file = document.querySelector("#file-upload");
const spanMessage = document.querySelector("#spanMessage");
const buttonSubmit = document.querySelector("#buttonSubmit");
const loading = document.querySelector("#loading");
const textButton = document.querySelector("#text-button");
const download = document.querySelector("#download");
const form = document.querySelector("#form");
const textFile = document.querySelector("#text-file");
const downloadIcon = document.querySelector("#download-icon");
const linkFile = document.querySelector("#link-file");
const buttonModal = document.querySelector("#button-modal");
const modal = document.querySelector("#modal");
const textModal = document.querySelector("#text-modal");

const typeImages = ["application/pdf", "text/plain"];
let storedFiles = [];

file.addEventListener("change", (e) => {
  if (!typeImages.includes(e.target.files[0].type)) {
    spanMessage.classList.remove("hidden");
    spanMessage.textContent = "Tipo de arquivo não suportado.";
    return;
  }

  let files = e.target.files;
  storedFiles = Array.from(files);

  textFile.textContent = e.target.files[0].name;
  download.classList.remove("hidden");
  spanMessage.classList.add("hidden");
  form.classList.add("hidden");
});

buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  textButton.classList.add("hidden");
  loading.classList.remove("hidden");

  const data = new FormData();

  const len = storedFiles.length;
  for (let i = 0; i < len; i++) {
    data.append("file", storedFiles[i]);
  }

  setTimeout(() => {
    fetch("http://localhost:3000/verify", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        download.classList.remove("hidden");
        textButton.classList.remove("hidden");
        loading.classList.add("hidden");
        modal.classList.remove("hidden");
        textModal.textContent = response.message
      });
  }, 500);
});

buttonModal.addEventListener("click", () => {
  modal.classList.add("hidden")
})