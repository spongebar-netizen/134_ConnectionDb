// 1. Import library yang dibutuhkan
const express = require('express');
const mysql = require('mysql');

// Kode BARU yang sudah diperbaiki
const db = mysql.createConnection({
    host: 'localhost',      // Sesuai screenshot
    user: 'root',           // Sesuai screenshot
    password: '',           // Kosongkan saja jika tidak di-set
    database: 'mahasiswa',  // Nama database kita
    port: 3309              // <--- INI BAGIAN PENTINGNYA!
});


// 3. Lakukan koneksi ke database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Successfully connected to the database as id ' + db.threadId);
});

// 4. Inisialisasi Express app
const app = express();
const port = 3000;

// 5. Buat endpoint (rute) dengan metode GET untuk mengambil data

app.get('/biodata', (req, res) => {
    // Buat query SQL untuk mengambil semua data dari tabel biodata
    const sqlQuery = "SELECT * FROM biodata";

    // Jalankan query ke database
    db.query(sqlQuery, (err, results) => {
        // Cek jika ada error saat menjalankan query
        if (err) {
            console.error('Error executing query:', err.stack);
            // Kirim response error ke client
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }

        // Jika query berhasil, kirim data sebagai response dalam format JSON
        res.status(200).json({
            success: true,
            message: 'Data biodata berhasil diambil',
            data: results
        });
    });
});

// 6. Jalankan server agar "mendengarkan" permintaan pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server is running and listening on http://localhost:${port}`);
});