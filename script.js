// Mengambil elemen dari HTML
const inputTugas = document.getElementById("inputTugas");
const listContainer = document.getElementById("listContainer");
const tombol = document.getElementById("tombol");
const totalTugas = document.getElementById("totalTugas");
const tugasSelesai = document.getElementById("tugasSelesai");
const tugasBelumSelesai = document.getElementById("tugasBelumSelesai");

// menghitung status tugas
function updateStatistik() {
    const semuaTugas = listContainer.querySelectorAll("li");
    const selesai = listContainer.querySelectorAll("li.selesai");

    const total = semuaTugas.length;
    const jumlahSelesai = selesai.length;
    const belumSelesai = total - jumlahSelesai;

    totalTugas.textContent = total;
    tugasSelesai.textContent = jumlahSelesai;
    tugasBelumSelesai.textContent = belumSelesai;
}

// Menambahkan tugas
function tambahTugas() {
    if (inputTugas.value.trim() === "") {
        alert("Oops, list-mu masih kosong!");
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let taskText = document.createElement("span");
    taskText.textContent = inputTugas.value;
    taskText.className = "task-text";

    let hapus = document.createElement("button");
    hapus.textContent = "x";
    hapus.className = "hapus";

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(hapus);

    listContainer.appendChild(li);

    inputTugas.value = "";

    saveData();
    updateStatistik();
}

// Tombol tambah
tombol.onclick = function() {
    tambahTugas();
};

// Menambahkan dengan enter
inputTugas.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        tombol.click();
    }
});

// Tanda Selesai & Menghapus
listContainer.addEventListener("click", function(e) {

    if (e.target.classList.contains("hapus")) {
        e.target.parentElement.remove();

    } else if (e.target.type === "checkbox") {
        e.target.parentElement.classList.toggle(
            "selesai",
            e.target.checked
        );
    }

    saveData();
    updateStatistik();
});

// Menyimpan Data
function saveData() {
    localStorage.setItem(
        "data_tugas",
        listContainer.innerHTML
    );
}

// 8. Menampilkan Data
function tampilkanTugas() {
    const dataTersimpan = localStorage.getItem("data_tugas");

    if (dataTersimpan) {
        listContainer.innerHTML = dataTersimpan;
    }

    updateStatistik();
}

tampilkanTugas();