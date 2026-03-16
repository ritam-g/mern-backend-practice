import { HumanMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";
import readline from "readline/promises";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
  maxRetries: 2,
});


const chatHistery=[]
async function ChatWithAi() {
  while (true) {
    const userInput = await rl.question("Enter your question: ");
    //REVIEW - adding human maessage for stucture data
    chatHistery.push(new HumanMessage(userInput))
    const response = await model.invoke([
        ...chatHistery
    ]);
    
    
    chatHistery.push(response)
    console.log("\nAI:", response.content, "\n");
  }
}

export { ChatWithAi };