// Carousel de productos
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("carousel-container");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  const items = container.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;
  let itemsPerView = 4;
  let totalPages = 1;

  // Obtener items por vista según el ancho de pantalla
  function getItemsPerView() {
    const width = window.innerWidth;
    if (width < 640) return 1; // móvil
    if (width < 768) return 2; // tablet pequeña
    if (width < 1024) return 3; // tablet/laptop pequeña
    return 4; // desktop
  }

  // Calcular el número total de páginas
  function calculateTotalPages() {
    itemsPerView = getItemsPerView();
    totalPages = Math.max(1, Math.ceil(totalItems - itemsPerView + 1));
    // Ajustar currentIndex si es mayor que el nuevo totalPages
    if (currentIndex >= totalPages) {
      currentIndex = totalPages - 1;
    }
  }

  // Establecer ancho de las cards dinámicamente
  function setCardWidths() {
    const containerWidth = container.parentElement.offsetWidth;
    const gap = 24; // gap-6
    const totalGapSpace = gap * (itemsPerView - 1);
    const cardWidth = (containerWidth - totalGapSpace) / itemsPerView;

    items.forEach((item) => {
      item.style.width = `${cardWidth}px`;
    });
  }

  // Crear indicadores
  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement("button");
      indicator.className = `h-2 rounded-full transition-all duration-300 ${
        i === currentIndex ? "w-8 bg-[#049FD9]" : "w-2 bg-gray-300"
      }`;
      indicator.setAttribute("aria-label", `Ir a página ${i + 1}`);
      indicator.addEventListener("click", () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  // Actualizar indicadores
  function updateIndicators() {
    const indicators = indicatorsContainer.querySelectorAll("button");
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.className =
          "h-2 w-8 rounded-full bg-[#049FD9] transition-all duration-300";
      } else {
        indicator.className =
          "h-2 w-2 rounded-full bg-gray-300 transition-all duration-300";
      }
    });
  }

  // Actualizar posición del carousel
  function updateCarousel() {
    calculateTotalPages(); // Recalcular páginas
    setCardWidths(); // Recalcular anchos antes de mover

    const cardWidth = items[0].offsetWidth;
    const gap = 24;
    const offset = currentIndex * (cardWidth + gap);
    container.style.transform = `translateX(-${offset}px)`;

    // Actualizar estado de los botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalPages - 1;

    updateIndicators();
    createIndicators(); // Recrear indicadores con nuevo total
  }

  // Navegar a un slide específico
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalPages - 1));
    updateCarousel();
  }

  // Evento botón anterior
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Evento botón siguiente
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalPages - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Inicializar carousel solo si hay productos
  if (totalItems > 0) {
    createIndicators();
    updateCarousel();

    // Actualizar en resize
    window.addEventListener("resize", updateCarousel);
  }
});
