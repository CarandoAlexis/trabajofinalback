import Product from '../dao/models/products.model.js';

class ViewController {
  async renderProductList(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort === 'desc' ? -1 : 1;
        const query = req.query.query || '';
    
        const filter = {};
        if (query) {
          filter.$or = [
            { category: { $regex: query, $options: 'i' } },
            { availability: { $regex: query, $options: 'i' } },
          ];
        }
        const totalProducts = await Product.countDocuments(filter).lean();
        const totalPages = Math.ceil(totalProducts / limit);
        const skip = (page - 1) * limit;
    
        const products = await Product.find(filter)
          .sort({ price: sort })
          .limit(limit)
          .skip(skip)
          .lean();
    
        res.render('productList', {
          products,
          totalPages,
          prevPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null,
          page,
          hasPrevPage: page > 1,
          hasNextPage: page < totalPages,
          prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}&sort=${req.query.sort}&query=${query}` : null,
          nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}&sort=${req.query.sort}&query=${query}` : null,
        });
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
    }
  }

  async renderLogin(req, res) {
    try {
        res.render("login");
      } catch (error) {
        console.error("Error al mostrar la vista de inicio de sesión:", error);
        res.status(500).json({ message: "Error al mostrar la vista de inicio de sesión" });
      }
  }

  async renderRegister(req, res) {
    try {
      const errorMessage = req.query.error;
      res.render("register", { error: errorMessage });
    } catch (error) {
      console.error("Error al mostrar la vista de registro:", error);
      res.status(500).json({ message: "Error al mostrar la vista de registro" });
    }
  }

  async renderProfile(req, res) {
    const user = req.session.user;
    res.render("profile", {
      last_name: user.last_name || user.first_name,
      age: user.age,
      email: user.email,
    });
  }

}

export default ViewController;