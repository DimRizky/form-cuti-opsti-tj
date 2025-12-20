document.addEventListener("DOMContentLoaded", () => {

  function pad(num) {
    return num.toString().padStart(2, "0");
  }
  
  function formatDDMMYYYY(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

  const now = new Date();

  const formId =
    "CTOPTI-" +
    now.getFullYear() +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());

  document.getElementById("formId").value = formId;
  document.getElementById("todayDate").value =
    now.toISOString().split("T")[0];

  const form = document.getElementById("cutiForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
  formId: formId,
  tanggal: formatDDMMYYYY(
  document.getElementById("todayDate").value
  ),
  nik: document.getElementById("nik").value,
  nama: document.getElementById("nama").value,
  hp: document.getElementById("hp").value,
  email: document.getElementById("email").value,
  jumlah: document.getElementById("jumlah").value,
  mulai: formatDDMMYYYY(
    document.getElementById("mulai").value
  ),
  akhir: formatDDMMYYYY(
    document.getElementById("akhir").value
  ),
  kembali: formatDDMMYYYY(
    document.getElementById("kembali").value
  ),
  alasan: document.getElementById("alasan").value,
  atasan1: document.getElementById("atasan1").value,
  atasan2: document.getElementById("atasan2").value
};

    console.log("DATA DIKIRIM KE SERVER:", data)

    fetch("https://script.google.com/macros/s/AKfycbyEzWVoPABcgp9gnI2qO7t0XXuoD8-RgsusRsUzCNTK-XUiEsLlQn08aLEWT2eWc5pt/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(() => {
      alert("Pengajuan Cuti Berhasil Dikirim!");
      form.reset();
    })
    .catch(err => {
      console.error(err);
      alert("Tidak Dapat Terhubung ke Server, Ulangi Beberapa Saat");
    });

  });

});
