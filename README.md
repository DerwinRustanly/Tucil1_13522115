<h1 align="center"> Tugas Kecil 1 IF2211 Strategi Algoritma</h1>
<h1 align="center">  Cyberpunk 2077 Breach Protocol Solver </h1>

## Identitas Pengembang Program
- **Nama: Derwin Rustanly**
- **NIM : 13522115**
- **Kelas : K1**
## Deskripsi Program
Permainan Breach Protocol merupakan salah satu sub permainan dari permainan video daring yang berjudul Cyberpunk 2077. Secara sederhana aturan dari permainan ini adalah mengoptimalkan pencocokan pola token pada matriks dan sekuens berbobot hadiah variatif dengan memanfaatkan buffer yang memiliki batasan ukuran tertentu baik secara horizontal dan vertikal secara bergantian. Tujuan utama dari permainan ini adalah memaksimalkan bobot hadiah yang diperoleh pada buffer dengan memanfaatkan langkah yang seminimum mungkin. 

Repositori ini mensimulasikan algoritma penyelesaian dari permainan meretas Breach Protocol (Breach Protocol Hacking) dengan memanfaatkan algoritma <b> brute force </b>. Program yang dibentuk merupakan aplikasi berbasis web yang dibangun berdasarkan *framework* **React** dan **Flask**, serta program menggunakan bahasa pemrograman **Python**. 


## Setup dan Requirements Program
1. Silahkan lakukan clone repositori ini dengan menjalankan perintah:
    ```bash
    git clone https://github.com/DerwinRustanly/Tucil1_13522115.git  
    ```
2. Setelah berhasil melakukan clone, pengguna akan berada di **root program**, kemudian pengguna harus terlebih dahulu menjalankan perintah:
    ```bash
    cd src
    ```
    di terminal, kemudian:
    ```bash
    cd backend
    ```
    Setelah berada di path **backend**, pengguna dapat membuat **virtual environment** (hanya untuk pertama kali) bernama ‘env’ dengan menggunakan perintah 
    ```bash
    python -m venv env
    ```
    di terminal.

3. Setelah muncul folder **env**, pengguna kemudian dapat mengaktifkan **virtual Environment** dengan menggunakan perintah 
    ```bash
    env\Scripts\activate
    ```
    di terminal untuk pengguna **Windows** dan 
    ```bash
    env\bin\activate
    ```
    untuk pengguna **Mac**.

4. Kemudian pengguna dapat menginstall requirement yang dibutuhkan program dengan menggunakan perintah 
    ```bash
    pip install -r requirements.txt
    ```
5. Setelah berhasil diinstal, pengguna dapat menjalankan backend dengan cara 
    ```bash
    flask run --debug
    ```
6. Kemudian pengguna dapat membuka terminal baru, lalu kemudian membuat perintah 
    ```bash
    cd src
    ```  
    kemudian 
    ```bash
    cd frontend 
    ```
7. Setelah berhasil masuk di path **frontend**, pengguna dapat menjalankan website dengan menggunakkan perintah 
    ```bash
    npm run start
    ```
    Setelah itu web akan terbuka dan program akan dapat dioperasikan.

## Cara Menggunakan Program
1. Ketika web telah dijalankan, pengguna dapat menekan tombol **Start Now** untuk memulai program
2. Setelah pengguna menekan tombol **Start Now**, pengguna akan diminta untuk memilih salah satu dari dua metode masukan (*input*), yakni mengunggah file txt (**Upload File**) atau memberikan masukan secara manual (**Input Manually**)
3. Apabila pengguna memilih metode unggah file txt (**Upload File**), pengguna akan diminta untuk mengunggah file dengan format yang telah disediakan pada laman tersebut, dengan cara menekan kolom unggah yang tersedia. Setelah pengguna berhasil mengunggah, laman akan menampilkan nama file yang telah diunggah, kemudian pengguna dapat menekan tombol **Solve** untuk mendapatkan solusi dari permainan Breach Protocol.
4. Apabila pengguna memilih metode masukan secara manual, pengguna akan diarahkan ke laman yang berisi *form* dengan komponen, jumlah token yang akan diinput, token yang valid, ukuran buffer, ukuran matriks (jumlah baris dan kolom), jumlah sekuens, serta ukuran maksimal sekuens. Setelah pengguna mengisi *form* tersebut, pengguna dapat menekan tombol **Solve** dan program akan secara otomatis menghasilkan matriks dan sekuens secara acak berdasarkan *form* masukan pengguna, dan solusi dari permainan akan ditampilkan.
5. Setelah solusi permainan ditampilkan, pengguna dapat menyimpan solusi permainan dalam file txt dengan cara menekan tombol **Save Result**, kemudian pengguna akan diminta untuk memberi masukan berupa nama file output yang akan disimpan.
