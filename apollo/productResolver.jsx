export default {
  showProductDialog: (obj, args, {cache}, info) => {
    // change apollo cache state to show the show the product dialog
    cache.writeData({
      data: {
        productDialog: {
          __typename: 'ProductDialog',
          visible: true,
          productID: args.productID
        }
      }
    });
    return null;
  },
  removeProductDialog: (obj, args, {cache}, info) => {
    // change apollo cache state to remove the product Dialog
    cache.writeData({
      data: {
        productDialog: {
          __typename: 'ProductDialog',
          visible: false,
          productID: null
        }
      }
    });
    return null;
  },
  applyFilters: (obj, args, {cache}, info) => {

    return true
  }
}