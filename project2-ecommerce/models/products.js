const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: ['Clothing', 'Shoes', 'Accessories', 'Electronics'], // optional, adjust as needed
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
        },
        message: props => `${props.value} is not a valid image URL!`,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔹 Virtual field "isOutOfStock" (not stored in DB, computed dynamically)
productSchema.virtual('isOutOfStock').get(function () {
  return this.stock === 0;
});

// Ensure virtuals show up in JSON and Object responses
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
