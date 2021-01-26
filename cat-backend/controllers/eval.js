const Model = require('../model/index');
const {
	Eval
} = Model;

const evalController = {
	all(req, res) {
		Eval.find({})
			.exec((err, eval_data) => {
				console.log(err);
				res.json(eval_data)
			})
	},
	findlatest(req, res) {
		Eval.findOne()
			.sort({
				createdAt: -1
			})
			.exec((err, post) => res.json(post))
	},
	create(req, res) {
		const requestBody = req.body;
		const newEval = new Eval(requestBody);

		newEval.save((err, saved) => {
			console.log(err);
			Eval
				.findOne({
					_id: newEval._id
				})
				.exec((err, eval_data) => {
					console.log(err);
					res.json(eval_data)
				})
		})
	},
	remove(req, res) {
		const idParams = req.params.id;
		Eval.findOne({
				_id: idParams
			})
			.remove((err, removed) => res.json(idParams))
	}
}

module.exports = evalController;
