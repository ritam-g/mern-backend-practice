import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0,
    maxRetries: 2,

})

async function ChatWithAi() {
    const response = await model.invoke("what is the capital of india?");
    console.log(response.content);

}

export { ChatWithAi };
