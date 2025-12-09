let historyData = {};   
let historyPage = 0;
const ITEMS_PER_PAGE = 7;

function loadHistory() {
    fetch("/history.json")
        .then(res => res.json())
        .then(data => {
            historyData = Object.entries(data);
            renderHistoryPage();
        });
}

function renderHistoryPage() {
    const start = historyPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const pageItems = historyData.slice(start, end);

    const container = document.getElementById("historyContainer");
    container.innerHTML = "";

    pageItems.forEach(([date, value]) => {
        const maxValue = 50;  
        const height = (value / maxValue) * 100;

        container.innerHTML += `
        <div class="history-card">
            <div class="history-date">${date}</div>
            <div class="history-bar-container">
                <div class="history-bar" style="height:${height}px"></div>
            </div>
        </div>`;
    });

    document.getElementById("pageInfo").innerText =
        `Page ${historyPage + 1} / ${Math.ceil(historyData.length / ITEMS_PER_PAGE)}`;
}

document.getElementById("nextPage").onclick = () => {
    if ((historyPage + 1) * ITEMS_PER_PAGE < historyData.length) {
        historyPage++;
        renderHistoryPage();
    }
};

document.getElementById("prevPage").onclick = () => {
    if (historyPage > 0) {
        historyPage--;
        renderHistoryPage();
    }
};
