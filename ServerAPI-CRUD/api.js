import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//import vendaMensalModel from './VendaMensal.js';
import VendaMensal from './VendaMensal.js';

dotenv.config();


const app = express();
const PORT = 3000;

// Middleware para permitir o envio de dados em formato JSON

app.use(express.json())

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }

}

connectDB();

// Começando a "editar/consumir" os dados - CRUDE


//CREATE
app.post('/vendas', async (req, res) => {

    try {
        const novaVendaMensal = await VendaMensal.create(req.body)
        res.json(novaVendaMensal);

    } catch (error) {
        res.json({ error: error });
    }

});


//READ
app.get('/vendas', async (req, res) => {
    try {
        const vendasMensais = await VendaMensal.find();
        res.json(vendasMensais);
    } catch (error) {
        res.json({ error: error });
    }
})

// UPDATE
app.put("/vendas/:id", async (req, res) => {
  try {
    const vendaMensalAtualizada = await VendaMensal.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(vendaMensalAtualizada);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// DELETE
app.delete("/vendas/:id", async (req, res) => {
  try {
    const vendaMensalDeletada = await VendaMensal.findByIdAndDelete(
      req.params.id
    );
    res.json(vendaMensalDeletada);
  } catch (error) {
    res.json({ error: error.message });
  }
});



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));