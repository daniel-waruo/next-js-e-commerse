import authResolvers from './authResolvers'
import productResolvers from './productResolver'
import cartResolvers from './cartResolver'

export default {
  Mutation: {
    ...authResolvers,
    ...productResolvers,
    ...cartResolvers
  }
};