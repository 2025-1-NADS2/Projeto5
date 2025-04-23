document.addEventListener("DOMContentLoaded", function() {
    // Função de Pesquisa
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
      searchBar.addEventListener("input", function(e) {
        const searchValue = e.target.value.toLowerCase();
        const events = document.querySelectorAll(".event-item");
        events.forEach(event => {
          const eventText = event.innerText.toLowerCase();
          event.style.display = eventText.includes(searchValue) ? "block" : "none";
        });
      });
    }
  
    // Função de Ordenação
    const sortOptions = document.getElementById("sortOptions");
    const eventsContainer = document.querySelector(".events-list");
  
    if (sortOptions && eventsContainer) {
      sortOptions.addEventListener("change", function(e) {
        const sortBy = e.target.value;
        const events = Array.from(document.querySelectorAll(".event-item"));
  
        // Função para extrair a data do evento (formato "dd/mm/yyyy")
        const getDateFromEvent = (item) => {
          const dateElem = item.querySelector(".date");
          if (dateElem) {
            const dateStr = dateElem.innerText.trim();
            const parts = dateStr.split("/");
            if (parts.length === 3) {
              return new Date(parts[2], parts[1] - 1, parts[0]);
            }
          }
          return new Date();
        };
  
        const sortedEvents = events.sort((a, b) => {
          if (sortBy === "status") {
            return a.getAttribute("data-status").localeCompare(b.getAttribute("data-status"));
          } else if (sortBy === "date") {
            const dateA = getDateFromEvent(a);
            const dateB = getDateFromEvent(b);
            return dateA - dateB;
          }
          return 0;
        });
  
        eventsContainer.innerHTML = "";
        sortedEvents.forEach(event => eventsContainer.appendChild(event));
      });
    }
  });
  