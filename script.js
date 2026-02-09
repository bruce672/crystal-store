const { jsPDF } = window.jspdf;

const input = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const button = document.getElementById("convertBtn");

let images = [];

input.addEventListener("change", e => {
  const files = [...e.target.files];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      images.push(reader.result);
      showPreview();
    };
    reader.readAsDataURL(file);
  });
});

function showPreview() {
  preview.innerHTML = "";
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    preview.appendChild(img);
  });
}

button.addEventListener("click", () => {
  if (images.length === 0) {
    alert("Add images first!");
    return;
  }

  const pdf = new jsPDF();

  images.forEach((img, i) => {
    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 10, 10, 190, 270);
  });

  pdf.save("output.pdf");
});
