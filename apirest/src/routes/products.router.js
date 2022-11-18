import {Router} from 'express';
import {Product,products} from '../classProduct.js';

const router = Router();


router.get('/',(req,res)=>{
    res.json({products});
});

router.get('/products/:id', (req, res) => {
	let product = Product.products.find(
		product => product.id === Number(req.params.id)
	);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ error: 'Producto no encontrado' });
	}
});

router.post('/', (req, res) => {
	let { title, price, thumbnail } = req.body;
	const product = { title, price, thumbnail };
	product.id = Product.products.length + 1;
	Product.products.push(product);
	res.send(Product.products);
});

router.put('/:id', (req, res) => {
	let { title, price, thumbnail } = req.body;
	let index = Product.products.findIndex(
		product => product.id === Number(req.params.id)
	);
	if (index >= 0) {
		Product.products[index] = { title, price, thumbnail };
		Product.products[index].id = Number(req.params.id);
		res.send(Product.products[index]);
	} else {
		res.status(404).send({ error: 'Producto no encontrado' });
	}
});

router.delete('/:id', (req, res) => {
	let index = Product.products.findIndex(
		product => product.id === Number(req.params.id)
	);
	if (index >= 0) {
		Product.products.splice(index, 1);
		res.send({ message: 'Producto eliminado' });
	} else {
		res.status(404).send({ error: 'Producto no encontrado' });
	}
});

export default router;