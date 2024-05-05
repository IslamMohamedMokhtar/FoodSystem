export default class ProductModel{
    constructor({ _id = null, picUrl = null, name = null, price = null, description = null, type = null}) {
      this._id = _id;
      this.picUrl = picUrl;
      this.name = name;
      this.price = price;
      this.description = description;
      this.type = type;
    }
  }
  