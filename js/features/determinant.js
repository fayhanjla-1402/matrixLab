import { createMatrixInputs, readMatrix, formatNumber, renderResult, showError, resetResult } from "../matrix-utils.js";

function determinant2(A) {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function determinant3(A) {
  const [a,b,c] = A[0], [d,e,f] = A[1], [g,h,i] = A[2];
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

export function initDeterminant() {
  const order = document.getElementById("det-order");
  const editor = document.getElementById("determinant-a");
  const result = document.getElementById("det-result");

  function build() {
    createMatrixInputs(editor, Number(order.value), "det-a");
    resetResult(result, "Nilai determinan muncul di sini");
  }

  function calculate() {
    try {
      const n = Number(order.value);
      const A = readMatrix(editor, n);
      let value;
      let steps;
      if (n === 2) {
        const [a,b] = A[0], [c,d] = A[1];
        value = determinant2(A);
        steps = [
          "Untuk matriks 2×2, gunakan rumus det(A) = ad − bc.",
          `Substitusi nilai: (${formatNumber(a)} × ${formatNumber(d)}) − (${formatNumber(b)} × ${formatNumber(c)}).`,
          `Hitung hasil perkalian: ${formatNumber(a*d)} − ${formatNumber(b*c)}.`,
          `Jadi, determinan matriks A adalah ${formatNumber(value)}.`
        ];
      } else {
        const [a,b,c] = A[0], [d,e,f] = A[1], [g,h,i] = A[2];
        const t1 = a * (e*i - f*h);
        const t2 = -b * (d*i - f*g);
        const t3 = c * (d*h - e*g);
        value = t1 + t2 + t3;
        steps = [
          "Gunakan ekspansi kofaktor pada baris pertama: det(A) = a(ei − fh) − b(di − fg) + c(dh − eg).",
          `Suku pertama: ${formatNumber(a)} × (${formatNumber(e)}×${formatNumber(i)} − ${formatNumber(f)}×${formatNumber(h)}) = ${formatNumber(t1)}.`,
          `Suku kedua: −${formatNumber(b)} × (${formatNumber(d)}×${formatNumber(i)} − ${formatNumber(f)}×${formatNumber(g)}) = ${formatNumber(t2)}.`,
          `Suku ketiga: ${formatNumber(c)} × (${formatNumber(d)}×${formatNumber(h)} − ${formatNumber(e)}×${formatNumber(g)}) = ${formatNumber(t3)}.`,
          `Jumlahkan ketiga suku: ${formatNumber(t1)} + ${formatNumber(t2)} + ${formatNumber(t3)} = ${formatNumber(value)}.`
        ];
      }
      if (Math.abs(value) < 1e-10) steps.push("Determinan bernilai nol, sehingga matriks ini singular dan tidak mempunyai invers.");
      else steps.push("Determinan tidak nol, sehingga matriks mempunyai invers.");
      renderResult(result, "Determinan matriks A", value, steps, "TERHITUNG");
    } catch (error) {
      showError(result, error.message);
    }
  }

  order.addEventListener("change", build);
  document.getElementById("det-calculate").addEventListener("click", calculate);
  document.getElementById("det-reset").addEventListener("click", build);
  build();
}
