// ===============================
// VISAO VISAO VISAO
// ===============================
const smallCtx = document.getElementById('smallChart').getContext('2d');
const smallChart = new Chart(smallCtx, {
  type: 'doughnut',
  data: {
    labels: ['Eventos', 'Participantes', 'Doações'],
    datasets: [{
      data: [58, 2691, 289],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  },
});

// ===============================
// GRÁFICO DE FAIXA ETÁRIA – BLOCO OVERVIEW SUMMARY (Pie Chart)
// ===============================
const ageCtx = document.getElementById('ageChart').getContext('2d');
const ageChart = new Chart(ageCtx, {
  type: 'pie',
  data: {
    labels: ['18-25 anos', '26-39 anos', '40+ anos'],
    datasets: [{
      data: [30, 30, 40],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  },
});

// ===============================
// GRÁFICO – HISTÓRICO DE DOAÇÕES (Bar Chart)
// ===============================
const donationCtx = document.getElementById('donationChart').getContext('2d');
const donationChart = new Chart(donationCtx, {
  type: 'bar',
  data: {
    labels: ['Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    datasets: [{
      label: 'R$ em Doações',
      data: [600, 850, 800, 850, 800],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `R$ ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R$ ${value}`,
        },
      },
    },
  },
});
