const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	index: (req, res) => {
		res.render('products/products', {productos: products, convertir: toThousand})
	},

	detail: (req, res) => {
		let detalle = products.find(function(encontrar) {
			if(encontrar.id == req.params.id) {
				return encontrar
			}
		})

		console.log(detalle);
		res.render('products/detail', {detalle: detalle, convertir: toThousand})
	},

	create: (req, res) => {
		res.render('products/product-create-form')
	},

	store: (req, res) => {

		let pathFile = path.join('data','newProducts.json')

		let nuevoProduct = fs.readFileSync(pathFile, { encoding: 'utf-8' })

		nuevoProduct = JSON.parse(nuevoProduct)

		nuevoProduct.push({
		...req.body,
		id: nuevoProduct[nuevoProduct.length - 1].id + 1,
		})

		nuevoProduct = JSON.stringify(nuevoProduct)

		fs.writeFileSync(pathFile, nuevoProduct)		

		res.send('Producto Creado')
	},
};

module.exports = controller;