const Model = require('../model');
const {
	Item
} = Model;

const itemController = {
	all(req, res) {
		Item.find({})
			.exec((err, items) => res.json(items))
	},
	create(req, res) {
		const requestBody = req.body;
		const newItem = new Item(requestBody);

		newItem.save((err, saved) => {
			Item
				.findOne({
					_id: newItem._id
				})
				.exec((err, item) => res.json(item))
		})
	}
}

module.exports = itemController;
