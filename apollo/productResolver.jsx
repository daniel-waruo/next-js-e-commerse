export default {
  // TODO : Change addProductDialog to showProductDialog
  showProductDialog: (obj, args, {cache}, info) => {
    // change apollo cache state to show the show the product dialog
    // TODO : create product dialog type with visibility and productID as attributed
    console.log("Show Product Dialog");
    cache.writeData({
      data: {
        addCartVisible: true,
        addCartProductID: args.productID
      }
    });
    return null;
  },
  removeProductDialog: (obj, args, {cache}, info) => {
    // change apollo cache state to remove the product Dialog
    cache.writeData({
      data: {
        addCartVisible: false,
        addCartProductID: null
      }
    });
    return null;
  },
  applyFilters: (obj, args, {cache}, info) => {

    return true
  }
}