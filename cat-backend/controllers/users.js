const User = require('../model/users');

exports.getUser = async (req, res) => {
	try {
		let Users = await User.find({});
		res.status(201).json({
			Users
		});
	} catch (err) {
		res.status(400).json({
			err: err
		});
	}
};

exports.registerNewUser = async (req, res) => {
	try {
		let isUser = await User.find({
			name: req.body.name
		});
		console.log(isUser);
		if (isUser.length >= 1) {
			return res.status(409).json({
				message: "user already exists"
			});
		}
		const user = new User({
			name: req.body.name,
			password: req.body.password
		});
		let data = await user.save();
		const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
		res.status(201).json({
			data,
			token
		});
	} catch (err) {
		res.status(400).json({
			err: err
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const name = req.body.name;
		const password = req.body.password;
		const user = await User.findByCredentials(name, password);
		if (!user) {
			return res
				.status(401)
				.json({
					error: "Login failed! Check authentication credentials"
				});
		}
		const token = await user.generateAuthToken();
		res.status(201).json({
			user,
			token
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err
		});
	}
};

exports.removeUser = async (req, res) => {
	try {
		let result = await User.deleteOne({
			_id: req.params.id
		});
		res.status(201).json({
			result
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err
		});
	}
};
