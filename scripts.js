// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const datetimeElement = document.getElementById("datetime");
    const cattleForm = document.getElementById("cattle-form");
    const cattleDataTable = document.getElementById("cattle-data");
    const currentQuoteElement = document.getElementById("current-quote");
    const quoteChartCanvas = document.getElementById("quote-chart");

    let cattleData = [];
    let currentQuote = 300.00; // Example initial quote for arroba
    
    // Update datetime
    function updateDateTime() {
        const now = new Date();
        datetimeElement.textContent = now.toLocaleString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }

    // Update quote dynamically
    function updateCurrentQuote() {
        // Simulate price fluctuation (random value for demonstration)
        currentQuote += (Math.random() - 0.5) * 10;
        currentQuote = Math.max(0, parseFloat(currentQuote.toFixed(2))); // Ensure positive value
        currentQuoteElement.textContent = `R$ ${currentQuote.toFixed(2)}`;
    }

    // Handle cattle form submission
    cattleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const cattleId = document.getElementById("cattle-id").value;
        const weight = parseFloat(document.getElementById("weight").value);
        const breed = document.getElementById("breed").value;
        const location = document.getElementById("location").value;
        const feed = document.getElementById("feed").value;

        const arroba = (weight / 15).toFixed(2);
        const newRow = {
            cattleId,
            weight: weight.toFixed(2),
            arroba,
            breed,
            location,
            feed,
        };

        cattleData.push(newRow);
        updateCattleTable();
        cattleForm.reset();
    });

    function updateCattleTable() {
        cattleDataTable.innerHTML = "";
        cattleData.forEach((row) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.cattleId}</td>
                <td>${row.weight} kg</td>
                <td>${row.arroba}</td>
                <td>${row.breed}</td>
                <td>${row.location}</td>
                <td>${row.feed}</td>
            `;
            cattleDataTable.appendChild(tr);
        });
    }

    // Initialize chart
    const quoteChart = new Chart(quoteChartCanvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Cotação do Arroba",
                data: [],
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                fill: true,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Horário",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Cotação (R$)",
                    },
                },
            },
        },
    });

    function updateChartData() {
        const now = new Date();
        const label = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        quoteChart.data.labels.push(label);
        quoteChart.data.datasets[0].data.push(currentQuote);

        if (quoteChart.data.labels.length > 60) {
            quoteChart.data.labels.shift();
            quoteChart.data.datasets[0].data.shift();
        }

        quoteChart.update();
    }

    // Initial setup
    setInterval(updateDateTime, 1000);
    setInterval(() => {
        updateCurrentQuote();
        updateChartData();
    }, 10000);

    updateDateTime();
    updateCurrentQuote();
});
