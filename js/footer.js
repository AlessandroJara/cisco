// Cargar el componente del footer
document.addEventListener("DOMContentLoaded", function () {
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar el footer:", error));
});
