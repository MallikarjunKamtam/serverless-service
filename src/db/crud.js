const { getDrizzleDbClient } = require("./clients");
const { CarSchema } = require("./schema");

async function createCar(data) {
  try {
    const db = await getDrizzleDbClient();
    const response = await db.insert(CarSchema).values(data).returning("*");
    return response[0];
  } catch (error) {
    console.error("Error creating car:", error.message);
    throw new Error("Failed to create car. Please try again.");
  }
}

async function getCars() {}

module.exports.createCar = createCar;
module.exports.getCars = getCars;
