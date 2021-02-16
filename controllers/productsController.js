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

    if(req.files.length == []) {

      nuevoProduct.push({
        ...req.body,
        id: nuevoProduct[nuevoProduct.length - 1].id + 1,
        image: ""
      });      

    } else {

      nuevoProduct.push({
        ...req.body,
        id: nuevoProduct[nuevoProduct.length - 1].id + 1,
        image: req.files[0].filename

      });

      

    }

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

    buscar = [...actualProduct]

    for(let i = 0; i < buscar.length; i++) {

      if (buscar[i].id == req.params.id) {

        buscar[i].name = req.body.name,
        buscar[i].price = req.body.price,
        buscar[i].discount = req.body.discount,
        buscar[i].category = req.body.category,
        buscar[i].description = req.body.description

        if(req.files.length == []) {

          buscar[i].image = "";

        } else {

          buscar[i].image = req.files[0].filename;

        }

        break

      }

    }  	

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
