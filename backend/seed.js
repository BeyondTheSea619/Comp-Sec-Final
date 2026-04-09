// Run with: node seed.js
// Populates the DB with an admin user, a regular user, restaurants, and menu items.

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./db");
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Restaurant.deleteMany({});
  await MenuItem.deleteMany({});
  console.log("Cleared existing data");

  // Seed users
  const hashedAdmin = await bcrypt.hash("Admin1234@", 10);
  const hashedUser = await bcrypt.hash("User1234!", 10);

  const admin = await User.create({
    email: "admin@test.com",
    password: hashedAdmin,
    role: "admin",
  });

  const user = await User.create({
    email: "user@test.com",
    password: hashedUser,
    role: "user",
  });

  console.log("Seeded users:", admin.email, user.email);

  // Seed restaurants
  const restaurants = await Restaurant.insertMany([
    { name: "BurgerKing", cuisine: "Fast Food", address: "123 King St" },
    { name: "Domino's Pizza", cuisine: "Pizza", address: "456 Pizza Ave" },
    { name: "A&W", cuisine: "Fast Food", address: "789 Root Beer Rd" },
    { name: "Subway", cuisine: "Sandwiches", address: "321 Sub Lane" },
  ]);

  console.log(
    "Seeded restaurants:",
    restaurants.map((r) => r.name),
  );

  // Seed menu items
  await MenuItem.insertMany([
    {
      restaurantId: restaurants[0]._id,
      name: "Whopper",
      description: "Flame-grilled beef burger",
      price: 8.99,
      category: "Burgers",
    },
    {
      restaurantId: restaurants[0]._id,
      name: "Fries",
      description: "Crispy golden fries",
      price: 3.49,
      category: "Sides",
    },
    {
      restaurantId: restaurants[1]._id,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni on hand-tossed dough",
      price: 14.99,
      category: "Pizza",
    },
    {
      restaurantId: restaurants[1]._id,
      name: "Cheesy Bread",
      description: "Oven-baked with mozzarella",
      price: 6.99,
      category: "Sides",
    },
    {
      restaurantId: restaurants[2]._id,
      name: "Teen Burger",
      description: "Classic A&W beef burger with fresh toppings",
      price: 9.49,
      category: "Burgers",
    },
    {
      restaurantId: restaurants[3]._id,
      name: "Italian BMT",
      description: "Pepperoni, salami, and ham on fresh bread",
      price: 10.99,
      category: "Subs",
    },
  ]);

  console.log("Seeded menu items");
  console.log("Seed complete!");
  mongoose.connection.close();
};

seed().catch((err) => {
  console.error("Seed error:", err);
  mongoose.connection.close();
});
