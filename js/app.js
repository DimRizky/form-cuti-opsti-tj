/* =====================================
   KONFIGURASI
===================================== */
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyEzWVoPABcgp9gnI2qO7t0XXuoD8-RgsusRsUzCNTK-XUiEsLlQn08aLEWT2eWc5pt/exec";

const TOKEN = "CTOPTI_INTERNAL_2025";

/* =====================================
   SET TANGGAL PENGAJUAN (UI ONLY)
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("todayDate").value = today;
});

/* =====================================
   HANDLE SUBMIT FORM
===================================== */
document.getElementById("cutiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  /* Ambil data input */
  const payload = {
    token: TOKEN,
    nik: nik.value.trim(),
    nama: nama.value.trim(),
    hp: hp.value.trim(),
    email: email.value.trim(),
    jumlah: Number(jumlah.value),
    mulai: mulai.value,
    akhir: akhir.value,
    kembali: kembali.value,
    alasan: alasan.value.trim(),
    atasan1: atasan1.value,
    atasan2: atasan2.value
  };

  /* Kirim ke server */
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.status !== "success") {
      alert(result.message || "Pengajuan gagal");
      return;
    }

    /* Tampilkan Form ID dari SERVER */
    document.getElementById("formId").value = result.formId;

    alert(
      "Pengajuan Cuti Berhasil Dikirim!\n\nForm ID: " + result.formId
    );

    e.target.reset();

  } catch (error) {
    alert("Tidak Dapat Terhubung ke Server, Ulangi Beberapa Saat");
  }
});

