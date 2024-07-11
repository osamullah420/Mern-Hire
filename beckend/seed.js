const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Developer = require('../beckend/Model/developer'); // Ensure the path to your Developer model is correct

mongoose.connect('mongodb://localhost:27017/mern-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const seedDevelopers = async () => {
  try {
    await Developer.deleteMany({}); // Clear existing developers

    const developers = [
      {
        name: 'Saad',
        skills: ['HTML', 'CSS', 'Express', 'Node'],
        contact: 'saad123@example.com',
        feedback: [
          { user: 'ayesharizwan123', comment: 'It was a good experience working with her', rating: 4.5 },
          { user: 'faizarizwan065', comment: 'It was a good experience of working with her', rating: 4.5 }
        ],
        rating: 4.5
      },
      {
        name: 'Ayesha',
        skills: ['HTML', 'CSS', 'Express', 'Node'],
        contact: 'ayesha@example.com',
        feedback: [
          { user: 'ayesharizwan123', comment: 'It was a good experience working with her', rating: 4.5 },
          { user: 'faizarizwan065', comment: 'It was a good experience of working with her', rating: 4.5 }
        ],
        rating: 4.5
      },
      {
        name: 'Faiza',
        skills: ['HTML', 'CSS', 'Express', 'MernStack'],
        contact: 'faiza@example.com',
        feedback: [
          { user: 'ayesharizwan123', comment: 'It was a good experience working with her', rating: 4.5 },
          { user: 'faizarizwan065', comment: 'It was a good experience of working with her', rating: 4.5 }
        ],
        rating: 4.5
      },
      {
        name: 'hamna',
        skills: ['FastAPI', 'Django', 'python', 'MernStack'],
        contact: 'laiba@example.com',
        feedback: [
          { user: 'ayesharizwan123', comment: 'It was a good experience working with her', rating: 4.5 },
          { user: 'faizarizwan065', comment: 'It was a good experience of working with her', rating: 4.5 }
        ],
        rating: 4.5
      },
      
    ];

    await Developer.insertMany(developers);
    console.log('Developers seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding developers:', err);
    mongoose.disconnect();
  }
};

seedDevelopers();
