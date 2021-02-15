const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render("products/products", {
      productos: products,
      convertir: toThousand,
    });
  },

  detail: (req, res) => {
    let detalle = products.find(function (encontrar) {
      if (encontrar.id == req.params.id) {
        return encontrar;
      }
    });

    res.render("products/detail", { detalle: detalle, convertir: toThousand });
  },

  create: (req, res) => {
    res.render("products/product-create-form");
  },

  store: (req, res) => {
    let pathFile = path.join("data", "productsDataBase.json");

    let nuevoProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    nuevoProduct = JSON.parse(nuevoProduct);

    nuevoProduct.push({
      ...req.body,
      id: nuevoProduct[nuevoProduct.length - 1].id + 1,
    });

    nuevoProduct = JSON.stringify(nuevoProduct);

    fs.writeFileSync(pathFile, nuevoProduct);

    res.redirect('/products');
  },

  edit: (req, res) => {
    let editar = products.find(function (buscar) {
      if (buscar.id == req.params.id) {
        return buscar;
      }
    });
    res.render("products/product-edit-form", { editar: editar });
  },

  update: (req, res) => {
    let pathFile = path.join("data", "productsDataBase.json");
    let actualProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });
    actualProduct = JSON.parse(actualProduct);
    actualProduct = actualProduct.map(function(buscar) {
		if (buscar.id == req.params.id) {
			buscar = {...req.body};
			buscar.id = req.params.id;

			return buscar;
		}
	  });



  	
    actualProduct = JSON.stringify(actualProduct);
    fs.writeFileSync(pathFile, actualProduct);
    res.redirect('/products');
  },

  destroy: (req, res) => {
    let pathFile = path.join("data", "productsDataBase.json");

    let actualProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    actualProduct = JSON.parse(actualProduct);

    actualProduct = actualProduct.filter(function (buscar) {
      if (buscar.id != req.params.id) {
        return buscar;
      }
    });

    actualProduct = JSON.stringify(actualProduct);

    fs.writeFileSync(pathFile, actualProduct);

    res.redirect('/');
  },
};

module.exports = controller;
