
// ==============================
// LOADING SCREEN
// ==============================

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 2200);
});


// ==============================
// MUSIK WEBSITE
// ==============================

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

let musicPlaying = false;

musicButton.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await music.play();
      musicPlaying = true;
      musicButton.innerHTML = "♫";
      musicButton.style.animation = "floating 1s infinite";
    } else {
      music.pause();
      musicPlaying = false;
      musicButton.innerHTML = "♪";
      musicButton.style.animation = "none";
    }
  } catch (error) {
    alert("Musik belum tersedia. Periksa file musik.mp3");
  }
});


// ==============================
// NOMOR ANTREAN
// ==============================

function getNextQueue() {
  let number = Number(
    localStorage.getItem("jaspostQueue") || 0
  );

  number++;

  localStorage.setItem("jaspostQueue", number);

  return "#HA-" + String(number).padStart(3, "0");
}


// ==============================
// FORM JASPOST WHATSAPP
// ==============================

const form = document.getElementById("jaspostForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const jualBeli = document.getElementById("jualBeli").value;
  const akun = document.getElementById("akun").value.trim();
  const spek = document.getElementById("spek").value.trim();
  const login = document.getElementById("login").value.trim();
  const bind = document.getElementById("bind").value.trim();
  const harga = document.getElementById("harga").value.trim();
  const exinc = document.getElementById("exinc").value;
  const wa = document.getElementById("wa").value.trim();

  if (!jualBeli || !akun || !spek ||
      !login || !bind || !harga || !exinc || !wa) {
    alert("Harap lengkapi semua formulir!");
    return;
  }

  // Membuat nomor antrean
  const queue = getNextQueue();

  document.getElementById("queueNumber").textContent = queue;

  // Format pesan WhatsApp
  const pesan = `*FORMAT JASPOST haji akbar*
*[ BUKAN AKUN ADMIN ]*

*NO ANTREAN : ${queue}*

*JUAL/BELI* : ${jualBeli}
*AKUN* : ${akun}
*SPEK* : ${spek}
*LOGIN* : ${login}
*BIND* : ${bind}
*HARGA* : ${harga}
*EX/INC* : ${exinc}
*NO WA LU* : ${wa}
*MC/REKBER : haji akbar*

*NOTE*⚠️
*JASAPOST DI haji akbar WAJIB MENGGUNAKAN MC/REKBER haji akbar SUPAYA TERHINDAR DARI PENIPUAN*⚠️

*WA REKBER Haji akbar*⤵️
https://wa.me/6283182386351`;

  const nomorAdmin = "6283182386351";

  const linkWhatsApp =
    "https://wa.me/" + nomorAdmin +
    "?text=" + encodeURIComponent(pesan);

  // Membuka WhatsApp
  window.open(linkWhatsApp, "_blank");

  alert(
    "Nomor antrean kamu: " + queue +
    "\nWhatsApp akan dibuka. Tekan KIRIM untuk mengirim formulir."
  );
});
