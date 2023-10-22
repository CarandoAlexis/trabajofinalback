import Joi from "joi";

class ProductDTO {
  constructor({ title, description, price, code, category, owner }) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0).required(),
      code: Joi.string().required(),
      category: Joi.string().required(),
      owner: Joi.string().required(),
    });

    const { error, value } = schema.validate({
      title,
      description,
      price,
      code,
      category,
      owner,
    });

    if (error) {
      throw new Error(`Error de validación: ${error.details[0].message}`);
    }

    this.title = value.title;
    this.description = value.description;
    this.price = value.price;
    this.code = value.code;
    this.category = value.category;
    this.owner = value.owner;
  }
}

export default ProductDTO;
