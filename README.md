# MatrixLab

Media pembelajaran Aljabar Linier berbasis HTML, CSS, dan JavaScript murni.

## Menjalankan
1. Ekstrak folder `MatrixLab`.
2. Buka folder menggunakan VS Code.
3. Jalankan `index.html` dengan ekstensi Live Server, atau gunakan server lokal.
   Modul JavaScript (`type="module"`) sebaiknya dijalankan melalui server lokal, bukan `file://`.

## Struktur
- `index.html` — struktur halaman dan navigasi.
- `css/style.css` — seluruh tampilan.
- `js/app.js` — titik masuk aplikasi.
- `js/navigation.js` — perpindahan halaman.
- `js/matrix-utils.js` — fungsi umum input, validasi, format, dan hasil matriks.
- `js/features/operations.js` — penjumlahan, pengurangan, dan perkalian.
- `js/features/determinant.js` — determinan 2×2 dan 3×3.
- `js/features/inverse.js` — invers 2×2.

Tidak membutuhkan backend, database, maupun login.
