export interface user {
    user_id: number;
    alamat: string | null;
    email: string;
    nama: string;
    no_telpon: string | null;
    password: string | null;
    keranjang: keranjang;
  }
  
  export interface admin {
    admin_id: number;
    email: string | null;
    nama: string | null;
    password: string | null;
  }
  
  export interface keranjang {
    keranjang_id: number;
    jenis_tiket: string | null;
    jumlah_tiket: number;
    total_harga: number;
    museum: museum;
  }
  
  export interface museum {
    museum_id: number;
    jam_operasional: string | null;
    jumlah_tiket: number;
    keterangan: string | null;
    latitude: string | null;
    likes: number;
    lokasi: string | null;
    longitude: string | null;
    nama: string;
    no_telpon: string | null;
    rating: number | null;
    tiket_keluarga_price: number;
    tiket_pelajar_price: number;
    tiket_reguler_price: number;
  }
  
  export interface payment {
    payment_id: number;
    bank: string | null;
    jenis_tiket: string | null;
    jumlah_tiket: number;
    metode_pembayaran: string | null;
    status_pembayaran: boolean;
    tanggal_pembayaran: Date;
    total_harga: number;
    keranjang_id: number | null;
    museum_id: number | null;
    user_id: number | null;
  }
  
  export interface review {
    review_id: number;
    comment: string | null;
    rating: number;
    museum: museum;
    user: user;
  }
  
  export interface tiket_keluarga {
    tiket_id: number;
    jenis_tiket: string | null;
    kode_tiket: string | null;
    status: string | null;
    tanggal_kunjungan: Date | null;
    jumlah_orang: number;
    nama_keluarga: string | null;
    keranjang: keranjang;
    museum: museum;
    payment: payment;
  }
  
  export interface tiket_pelajar {
    tiket_id: number;
    jenis_tiket: string | null;
    kode_tiket: string | null;
    status: string | null;
    tanggal_kunjungan: Date | null;
    jumlah_orang: number;
    nama_sekolah: string | null;
    keranjang: keranjang;
    museum: museum;
    payment: payment;
  }
  
  export interface tiket_reguler {
    tiket_id: number;
    jenis_tiket: string | null;
    kode_tiket: string | null;
    status: string | null;
    tanggal_kunjungan: Date | null;
    keranjang: keranjang;
    museum: museum;
    payment: payment;
  }
  