const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PENTING: Ganti tulisan di bawah dengan Kunci API Gemini Anda yang asli
const GEMINI_API_KEY = "GANTI_DENGAN_KUNCI_API_GEMINI_ANDA"; 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Endpoint untuk mengecek apakah server hidup
app.get('/', (req, res) => {
    res.send('Server Vokal Ajaib Backend is running!');
});

// Endpoint utama untuk fitur text-to-voice
app.post('/generate-voice', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    
    // Memanggil model Gemini untuk menghasilkan teks (bukan suara langsung)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Karena Gemini API saat ini tidak langsung menghasilkan suara,
    // kita akan simulasikan dengan mengembalikan link audio statis sebagai placeholder.
    // Di aplikasi nyata, 'text' ini bisa diteruskan ke API Text-to-Speech Google.
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    // Kirim jawaban kembali ke frontend
    res.json({ generatedText: text, audioUrl: audioUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memproses permintaan" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));