import { HumanMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";
import readline from "readline/promises";
import { createAgent, tool } from "langchain";
import sendEmail from "./email.service.js";
import { z } from "zod";
import webSerch from "./webSerch.service.js";
//NOTE - terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//! model defination  
const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    maxRetries: 2,
});
//! tools

const emailSenderTool = tool(
    sendEmail,
    {
        name: "sendEmail",
        description: "send email to user",
        schema: z.object({
            to: z.string().describe("Email address"),
            subject: z.string().describe("Email subject"),
            html: z.string().optional(),
            text: z.string().optional(),
        })
    }

)
const webSerchTool = tool(
    webSerch,
    {
        name: "webSerch",
        description: "search web",
        schema: z.object({
            searchQuery: z.string().describe("search query"),
        })
    })
const agent = createAgent({
    model,
    tools: [emailSenderTool, webSerchTool],
});

const chatHistory = [];

async function ChatWithAi() {
    while (true) {
        const userInput = await rl.question("Enter your question: ");

        // add user message
        chatHistory.push(new HumanMessage(userInput));

        const response = await agent.invoke({
            messages: chatHistory
        });

        console.log("\nAI:", response.messages.at(-1).content, "\n");

        // store AI response
        chatHistory.push(response.messages.at(-1));
    }
}

export { ChatWithAi };