const { Client, Buttons, List, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Buat client WhatsApp
const client = new Client({
  puppeteer: {
		args: ['--no-sandbox'],
	},
    authStrategy: new LocalAuth(),
  });
  const ownerNumber = 'NOMERLO@c.us'; //UBAH NOMER LO TANPA HAPUS @c.us 

// Persiapkan event handler untuk menerima pesan
client.on('message', async (msg) => {
    if (msg.body.startsWith('hello')) {
        let button = new Buttons('GATAU MASUKIN AJA PESAN LO,GUA UDAH PUSING BANG', [{ body: 'LIST' }, { body: 'TERSERAH ENTE' }], 'JUDUL ENTE', 'BAGIAN FOOTER');
        client.sendMessage(msg.from, button);
        
    }else if (msg.body.startsWith('LIST')) {
      let sections = [{title:'sectionTitle',rows:[{title:'1000 Followers Instagram', description: 'Rp.15.000'},{title:'ITEM KE 2'}]}];
      let list = new List('List body','btnText',sections,'Title','footer');
      client.sendMessage(msg.from, list);
    }else if (msg.body.startsWith('1000 Followers Instagram')){ //bisa ente sesuaikan sama button sebelumnya
      let pesan = new Buttons('*DETAIL ORDER* \n ITEM : 1000 Followers Instagram Bergaransi 1 TAHUN \n Harga : 20.000 \n Silahkan Melakukan Pembayaran ke list rekening berikut : \n Dana : 082329451862 \n Gopay : 087734355568 \n BCA : 2381132929 \n *NOTE : SEMUA REKENING A/N SATRIA ARYA WIDYADHANA* \n', [{ body: 'KONFIRMASI 1000 FOLLOWERS INSTAGRAM' }, { body: 'BATALAKAN' }], 'FORM PEMBAYARAN', 'Jika sudah melakukan pembayaran silahkan klik konfirmasi');
      let media = await MessageMedia.fromUrl('https://i.ibb.co/LYQ2fwB/3515181b-49e3-454e-89f0-f9fcaa9f1e92.jpg'); //url QRIS LO TAPI KALO GA ADA QRIS BISA PAKE MUKA DHENDY
      client.sendMessage(msg.from, media); //ini kalo misal ga ada qris bisa di hide pake // atasnya juga bang
      client.sendMessage(msg.from, pesan);
      
    }else if (msg.body.startsWith('KONFIRMASI 1000 FOLLOWERS INSTAGRAM')) { //jangan lupa ubah bagian button pesan gan
      client.sendMessage(msg.from, 'Silahkan Kirim username dengan format instagram|1000|username ig');
      client.sendMessage(ownerNumber, `*NOTIFIKASI KONTOL*\nNOMOR ${msg.from} TELAH MELAKUKAN PEMBAYARAN,SILAHKAN ENTE KONFIRMASI YH ANJING `);
    }else if (msg.body.startsWith('instagram|1000')){ //ini juga jangan lupa ubah
      let parts = msg.body.split('|');
      let layanan = parts[0];
      let jumlah = parts[1];
      let username = parts[2];
      client.sendMessage(msg.from, `Layanan: ${layanan} \n Jumlah: ${jumlah} \n Username: ${username}\n silahkan kirimkan bukti pembayaran ke whatsapp owner di link terimakasih atas supportnya`);
      client.sendMessage(ownerNumber, `*NOTIFIKASI KONTOL*\nFORMAT DATA PEMBELIAN NOMOR ${msg.from} \n Layanan: ${layanan} \n Jumlah: ${jumlah} \n Username: ${username}\nJANGAN LUPA PROSES GAN H3H3H3`);
    }
    console.log(`[!] Message From (${msg.from}) ~> ${msg.body}`);
    });
            
                // Event handler untuk melihat status koneksi
client.on('authenticated', (session) => {
    console.log(`[${new Date().toLocaleString()}] Authenticated successfully with session:`);
    console.log(session);
  });
  
  client.on('auth_failure', (msg) => {
    console.log(`[${new Date().toLocaleString()}] Auth failure: ${msg}`);
  });
  
  client.on('ready', () => {
    console.log(`[${new Date().toLocaleString()}] Ready.`);
  });
        // Tampilkan QR code di terminal saat client dimulai
        client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
        });

        // Mulai client
        client.initialize();