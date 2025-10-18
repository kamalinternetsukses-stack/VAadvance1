const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors'); // Tambahkan ini

const app = express();
app.use(cors()); // Izinkan akses dari domain lain (Netlify)
app.use(express.json());

const GEMINI_API_KEY = "KUNCI_RAHASIA_ANDA_TARUH_DI_SINI";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Ini hanya untuk mengecek apakah server hidup
app.get('/', (req, res) => {
    res.send('Server Vokal Ajaib Backend is running!');
});

app.post('/generate-voice', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // --- LOGIKA AI ANDA DI SINI ---
    // Contoh: Memanggil model Gemini untuk menghasilkan teks (bukan suara)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Karena Gemini API saat ini tidak langsung menghasilkan suara,
    // kita akan simulasikan dengan mengembalikan teks yang dihasilkan Gemini.
    // Di aplikasi nyata, teks ini bisa diteruskan ke API Text-to-Speech Google.

    // Untuk demo ini, kita kembalikan link audio statis sebagai placeholder.
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    res.json({ generatedText: text, audioUrl: audioUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memproses permintaan" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));