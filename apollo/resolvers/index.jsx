import authResolvers from './auth'
import productResolvers from './product'
import cartResolvers from './cart'
import messageResolvers from './message'


export default {
  Mutation: {
    ...authResolvers,
    ...productResolvers,
    ...cartResolvers,
    ...messageResolvers
  }
};