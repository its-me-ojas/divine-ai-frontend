import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

interface AskQuestionPayload {
  question: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const api = {
  askQuestion: async (question: string): Promise<string> => {
    try {
      const response = await axios.post<ChatResponse>(`${API_BASE_URL}/ask`, {
        question,
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  },
}; 