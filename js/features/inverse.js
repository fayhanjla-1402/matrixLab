import { createMatrixInputs, readMatrix, formatNumber, renderResult, showError, resetResult } from "../matrix-utils.js";

export function initInverse() {
  const editor = document.getElementById("inverse-a");
  const result = document.getElementById("inv-result");

  function build() {
    createMatrixInputs(editor, 2, "inv-a");
    resetResult(result, "Invers akan muncul di sini");
  }

  function calculate() {
    try {
      const A = readMatrix(editor, 2);
      const [[a,b],[c,d]] = A;
      const det = a*d - b*c;
      if (Math.abs(det) < 1e-10) {
        showError(result, "Matriks tidak memiliki invers karena determinannya sama dengan nol. Coba masukkan matriks lain.");
        return;
      }
      const inverse = [[d/det, -b/det], [-c/det, a/det]];
      const steps = [
        `Hitung determinan: det(A) = (${formatNumber(a)} × ${formatNumber(d)}) − (${formatNumber(b)} × ${formatNumber(c)}) = ${formatNumber(det)}.`,
        "Gunakan rumus invers matriks 2×2: A⁻¹ = 1/det(A) × [[d, −b], [−c, a]].",
        `Tukar posisi elemen diagonal utama (${formatNumber(a)} dan ${formatNumber(d)}), lalu ubah tanda elemen lainnya.`,
        `Bentuk matriks adjoin: [[${formatNumber(d)}, ${formatNumber(-b)}], [${formatNumber(-c)}, ${formatNumber(a)}]].`,
        `Kalikan setiap elemen adjoin dengan 1/${formatNumber(det)} untuk memperoleh matriks invers.`
      ];
      renderResult(result, "Invers matriks A", inverse, steps, "INVERS DITEMUKAN");
    } catch (error) {
      showError(result, error.message);
    }
  }

  document.getElementById("inv-calculate").addEventListener("click", calculate);
  document.getElementById("inv-reset").addEventListener("click", build);
  build();
}
