const sheetAPI = "https://script.google.com/macros/s/AKfycbyXyTPge0UXjgfewFsJKKGjPX31Bp65au_ER5kB20EtB1z5qCdj2_edXJpadebHiTBPmg/exec";  // Ganti dengan ID script kamu

document.addEventListener("DOMContentLoaded", function () {
    fetchData();
    
    document.getElementById("search").addEventListener("input", filterData);
    document.getElementById("filterDate").addEventListener("change", filterData);
    document.getElementById("todayBtn").addEventListener("click", () => setDateFilter(0));
    document.getElementById("yesterdayBtn").addEventListener("click", () => setDateFilter(1));
});

let reportData = [];

function fetchData() {
    fetch(sheetAPI)
        .then(response => response.json())
        .then(data => {
            reportData = data.slice(1);
            renderTable(reportData);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function renderTable(data) {
    const tbody = document.querySelector("#reportTable tbody");
    tbody.innerHTML = "";
    data.forEach(row => {
        const tr = document.createElement("tr");
        row.slice(0, 6).forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function filterData() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const selectedDate = document.getElementById("filterDate").value;

    const filtered = reportData.filter(row => 
        (searchQuery === "" || row[1].toLowerCase().includes(searchQuery)) &&
        (selectedDate === "" || row[6] === selectedDate)
    );
    
    renderTable(filtered);
}

function setDateFilter(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    document.getElementById("filterDate").value = date.toISOString().split("T")[0];
    filterData();
}
