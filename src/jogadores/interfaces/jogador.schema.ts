import mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    phone: { type: String },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    positionRanking: Number,
    urlPayer: String,
  },
  { timestamp: true, collection: 'jogadores' },
);
