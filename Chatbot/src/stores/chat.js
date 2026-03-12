import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
async function getOpenAIResponse(message) {
  const API_KEY =
    'gAAAAABpdxIP_FZhSl6tOTdFP6wzYEycZ-RLlQtIpAAtEKpNRZ-TzDGCOui9UHwalyAbHkBw6i2RvApIy_sISKZwYvgWi5iPhU4G81-CORDssksJYHHgs5AO0cMWzXv4GEkcyQrRcTJAeUlmnkVaADWLVzluOz-dW0mlP0phQm5BVYQpphulnVo='
  try {
    const response = await axios.post(
      'https://api.textcortex.com/v1/texts/blogs', // xafoxil224@sepole.com
      {
        context: message,
        max_tokens: 100,
        model: 'gemini-2-5-flash',
        source_lang: 'en',
        target_lang: 'en',
        title: '',
        keywords: [],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )
    return response.data.data.outputs[0].text
  } catch (error) {
    console.error(error)
    return "Sorry, I couldn't generate a response."
  }
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const useOpenAI = ref(true)

  const addUserMessage = (text) => {
    messages.value.push({ role: 'user', content: text })
  }

  const addAIMessage = (text) => {
    messages.value.push({ role: 'ai', content: text })
  }

  const sendMessage = async (text) => {
    addUserMessage(text)

    let aiReply
    if (useOpenAI.value) {
      aiReply = await getOpenAIResponse(text)
    }

    addAIMessage(aiReply)
  }
  const init = () => {
    addAIMessage('How may I help you?')
  }

  return { messages, init, useOpenAI, addUserMessage, addAIMessage, sendMessage }
})
