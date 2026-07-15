require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Book = require("./models/Book");

const books = [
  { title: "Dune", author: "Frank Herbert", category: "Sci-Fi", price: 12.99, stockQuantity: 14, description: "A desert planet, a doomed house, and the birth of a messiah.", coverImage: "dune.jpg" },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", category: "Sci-Fi", price: 11.5, stockQuantity: 8, description: "An envoy on a genderless world caught between empires.", coverImage: null },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", category: "Fantasy", price: 14.0, stockQuantity: 20, description: "The first leg of a journey to unmake the One Ring.", coverImage: null },
  { title: "Circe", author: "Madeline Miller", category: "Fantasy", price: 13.25, stockQuantity: 10, description: "A witch, exiled, finds her own kind of power.", coverImage: null },
  { title: "In Cold Blood", author: "Truman Capote", category: "Non-Fiction", price: 10.75, stockQuantity: 6, description: "A true-crime account of a Kansas farm family's murder.", coverImage: null },
  { title: "Sapiens", author: "Yuval Noah Harari", category: "Non-Fiction", price: 15.99, stockQuantity: 18, description: "A brief history of humankind.", coverImage: null },
  { title: "The Big Sleep", author: "Raymond Chandler", category: "Mystery", price: 9.99, stockQuantity: 12, description: "Philip Marlowe wades into a family's blackmail troubles.", coverImage: null },
  { title: "And Then There Were None", author: "Agatha Christie", category: "Mystery", price: 8.5, stockQuantity: 0, description: "Ten strangers, an island, and a nursery rhyme that turns deadly.", coverImage: null },
  { title: "Educated", author: "Tara Westover", category: "Biography", price: 12.0, stockQuantity: 9, description: "A memoir of self-invention through education.", coverImage: null },
  { title: "Ariel", author: "Sylvia Plath", category: "Poetry", price: 10.0, stockQuantity: 7, description: "Plath's searing, posthumously arranged collection.", coverImage: null },
];

async function run() {
  await connectDB();
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log(`Seeded ${books.length} books.`);
  await mongoose.connection.close();
  process.exit(0);
}

run();
