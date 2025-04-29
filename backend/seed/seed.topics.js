import mongoose from 'mongoose';
import Topic from '../models/topic.model.js';
import { DB_URI } from '../config/env.js';

const topics = [
  'Education', 'Health', 'Technology', 'Science',
  'Sports', 'Art', 'Business', 'Entertainment',
  'History', 'Politics', 'Culture', 'Travel',
  'Quizzes', 'Surveys', 'Opinion', 'Other'
];

async function seed() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Conexión exitosa a MongoDB');
    
    const topicDocs = topics.map(name => ({ name }));
    await Topic.insertMany(topicDocs);
    
    console.log('Temas predefinidos sembrados');
  } catch (error) {
    console.error('Error al conectar o insertar en MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
