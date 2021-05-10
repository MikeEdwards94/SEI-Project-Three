import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 500 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
})


const recommendationsSchema = new mongoose.Schema({
  parkName: { type: String },
  activity: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


const nationalParkSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: [{ type: String, required: true }],
  description: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  region: { type: String, required: true },
  country: { type: String, required: true },
  facts: [{ type: String, required: true }],
  comments: [commentSchema],
  recommendations: [recommendationsSchema],
  parkUrl: { type: String }
})

export default mongoose.model('Park', nationalParkSchema)