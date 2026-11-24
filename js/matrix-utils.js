export function createMatrixInputs(container, size, prefix, initial = null) {
  const matrix = initial || Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => r === c ? 1 : 0)
  );
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${size}, 45px)`;

  matrix.forEach((row, r) => row.forEach((value, c) => {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "any";
    input.value = value;
    input.id = `${prefix}-${r}-${c}`;
    input.setAttribute("aria-label", `${prefix}, baris ${r + 1}, kolom ${c + 1}`);
    container.appendChild(input);
  }));
}

export function readMatrix(container, size) {
  const inputs = [...container.querySelectorAll("input")];
  if (inputs.length !== size * size) throw new Error("Input matriks belum siap.");
  const values = inputs.map(input => {
    if (input.value.trim() === "") throw new Error("Semua elemen matriks harus diisi.");
    const number = Number(input.value);
    if (!Number.isFinite(number)) throw new Error("Masukkan bilangan yang valid.");
    return number;
  });
  return Array.from({ length: size }, (_, r) =>
    values.slice(r * size, (r + 1) * size)
  );
}

export function formatNumber(value) {
  const clean = Math.abs(value) < 1e-10 ? 0 : value;
  return Number(clean.toFixed(6)).toString();
}

export function renderMatrix(matrix) {
  const wrapper = document.createElement("div");
  wrapper.className = "matrix-editor";
  wrapper.style.gridTemplateColumns = `repeat(${matrix[0].length}, 45px)`;
  matrix.flat().forEach(value => {
    const cell = document.createElement("span");
    cell.textContent = formatNumber(value);
    cell.style.cssText = "display:grid;place-items:center;width:45px;height:39px;font-weight:700;color:#315bc6;font-size:12px";
    wrapper.appendChild(cell);
  });
  return wrapper;
}

export function showError(container, message) {
  container.innerHTML = "";
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;
  container.appendChild(error);
}

export function renderResult(container, title, value, steps, tag = "SELESAI") {
  container.innerHTML = "";
  const header = document.createElement("div");
  header.className = "result-header";
  header.innerHTML = `<div><span class="eyebrow">HASIL PERHITUNGAN</span><h3>${title}</h3></div><span class="result-tag">${tag}</span>`;
  container.appendChild(header);

  const valueBox = document.createElement("div");
  valueBox.className = "result-value";
  const caption = document.createElement("div");
  caption.className = "result-caption";
  caption.textContent = "HASIL AKHIR";
  valueBox.appendChild(caption);
  if (Array.isArray(value)) valueBox.appendChild(renderMatrix(value));
  else {
    const scalar = document.createElement("div");
    scalar.className = "result-scalar";
    scalar.textContent = formatNumber(value);
    valueBox.appendChild(scalar);
  }
  container.appendChild(valueBox);

  const titleNode = document.createElement("div");
  titleNode.className = "steps-title";
  titleNode.textContent = "Langkah penyelesaian";
  container.appendChild(titleNode);

  steps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "step-item";
    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = index + 1;
    const content = document.createElement("div");
    content.className = "step-content";
    content.textContent = step;
    item.append(number, content);
    container.appendChild(item);
  });
}

export function resetResult(container, message) {
  container.innerHTML = `<div class="empty-state"><div class="empty-icon">∑</div><h3>${message}</h3><p>Masukkan nilai matriks, lalu jalankan perhitungan untuk melihat hasil dan langkahnya.</p></div>`;
}
