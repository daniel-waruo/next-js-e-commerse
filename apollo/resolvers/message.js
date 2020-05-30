export default {
  addMessage: async (obj, args, {cache}, info) => {
    const {messages} = args;
    cache.writeData({
      data: {
        messages: messages
      }
    })
  }
}