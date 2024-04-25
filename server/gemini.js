require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    console.log(typeof(result))
    const response = await result.response;
    console.log('response is ', response)
    const text = await response.text();
    // console.log(text);
    return text;
  } catch (error) {
    console.error("Error occurred in run function:", error);
    throw error; // re-throw the error for proper handling
  }
}
module.exports = {
  run: run
};