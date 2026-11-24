export function initNavigation() {
  const buttons = [...document.querySelectorAll("[data-page]")];
  const pages = [...document.querySelectorAll(".page")];
  const heading = document.getElementById("page-heading");
  const titles = {
    beranda: "Selamat datang",
    operasi: "Operasi Matriks",
    determinan: "Determinan Matriks",
    invers: "Invers Matriks"
  };

  function navigate(page) {
    pages.forEach(section => section.classList.toggle("active", section.id === `page-${page}`));
    buttons.forEach(button => button.classList.toggle("active", button.dataset.page === page));
    heading.textContent = titles[page] || "MatrixLab";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  buttons.forEach(button => button.addEventListener("click", () => navigate(button.dataset.page)));
  document.querySelectorAll("[data-go]").forEach(button =>
    button.addEventListener("click", () => navigate(button.dataset.go))
  );
}
