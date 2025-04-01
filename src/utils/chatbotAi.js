import {GoogleGenerativeAI} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API2;

const genAI = new GoogleGenerativeAI(apiKey);
export const model2 = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
