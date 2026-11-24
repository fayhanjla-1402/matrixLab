import { createMatrixInputs, readMatrix, formatNumber, renderResult, showError, resetResult } from "../matrix-utils.js";

export function initOperations() {
  const order = document.getElementById("operation-order");
  const type = document.getElementById("operation-type");
  const aBox = document.getElementById("operation-a");
  const bBox = document.getElementById("operation-b");
  const result = document.getElementById("operation-result");
  const symbol = document.getElementById("operation-symbol");

  const symbols = { add: "+", subtract: "−", multiply: "×" };

  function build() {
    const n = Number(order.value);
    createMatrixInputs(aBox, n, "op-a");
    createMatrixInputs(bBox, n, "op-b");
    symbol.textContent = symbols[type.value];
    resetResult(result, "Hasil akan muncul di sini");
  }

  function calculate() {
    try {
      const n = Number(order.value);
      const A = readMatrix(aBox, n);
      const B = readMatrix(bBox, n);
      const operation = type.value;
      const C = Array.from({ length: n }, () => Array(n).fill(0));
      const steps = [];

      if (operation === "multiply") {
        for (let r = 0; r < n; r++) {
          for (let c = 0; c < n; c++) {
            const products = [];
            for (let k = 0; k < n; k++) {
              C[r][c] += A[r][k] * B[k][c];
              products.push(`(${formatNumber(A[r][k])} × ${formatNumber(B[k][c])})`);
            }
            steps.push(`Elemen hasil baris ${r + 1}, kolom ${c + 1}: ${products.join(" + ")} = ${formatNumber(C[r][c])}.`);
          }
        }
      } else {
        const sign = operation === "add" ? 1 : -1;
        for (let r = 0; r < n; r++) {
          for (let c = 0; c < n; c++) {
            C[r][c] = A[r][c] + sign * B[r][c];
            const op = sign === 1 ? "+" : "−";
            steps.push(`Elemen baris ${r + 1}, kolom ${c + 1}: ${formatNumber(A[r][c])} ${op} ${formatNumber(B[r][c])} = ${formatNumber(C[r][c])}.`);
          }
        }
      }
      const title = { add: "Penjumlahan matriks", subtract: "Pengurangan matriks", multiply: "Perkalian matriks" }[operation];
      renderResult(result, title, C, steps);
    } catch (error) {
      showError(result, error.message);
    }
  }

  order.addEventListener("change", build);
  type.addEventListener("change", () => { symbol.textContent = symbols[type.value]; resetResult(result, "Hasil akan muncul di sini"); });
  document.getElementById("operation-calculate").addEventListener("click", calculate);
  document.getElementById("operation-reset").addEventListener("click", build);
  build();
}
