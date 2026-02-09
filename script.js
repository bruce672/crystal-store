const { jsPDF } = window.jspdf;

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const convertBtn = document.getElementById("convertBtn");

let images = [];

fileInput.addEventListener("change", handleFiles);
dropZone.addEventListener("dragover", e => e.preventDefault());
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  handleFiles({ target: { files: e.dataTransfer.files } });
});

function handleFiles(e) {
  const files = [...e.target.files];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      images.push(reader.result);
      showPreview();
    };
    reader.readAsDataURL(file);
  });
}

function showPreview() {
  preview.innerHTML = "";
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    preview.appendChild(img);
  });
}

convertBtn.addEventListener("click", () => {
  if (images.length === 0) return alert("Add images first!");

  const pdf = new jsPDF();

  images.forEach((img, i) => {
    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 10, 10, 190, 270);
  });

  pdf.save("crystal-pdf.pdf");
});
