const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

const DespSchema = Schema({
	score: String,
	description: String
}, {
	_id: false
});

const ItemSchema = Schema({
	num: String, //1.1.1
	name: String,
	weight: Number,
	score: Number,
	weighted_score: Number,
	score_lower_than: Number,
	score_higher_than: Number,
	condition: String,
	rating_description: {
		type: [DespSchema],
		default: undefined
	}
}, {
	_id: false
});

const SubComponentSchema = Schema({
	name: String,
	score: Number,
	items: {
		type: [ItemSchema],
		default: undefined
	}
}, {
	_id: false
});

const ImageListSchema = Schema({
	name: String,
	url: String
});

const ComponentSchema = Schema({
	name: String,
	score: Number,
	handle_suggestion: String,
	sub_component_list: {
		type: [SubComponentSchema],
		default: undefined
	},
	image_list: {
		type: [ImageListSchema],
		default: undefined
	}
}, {
	_id: false,
	timestamps: true
});

const EvalBasicSchema = Schema({
	operation_id: String, //"运行编号": "/",
	force_out: String, //"额定出力": "/",
	force_in: String, //"额定入力": "/",
	rated_head: String, //"额定水头": "/",
	flow: String, //"额定流量": "/",
	rpm: String, //"额定转速": "/",
	manufacturer: String, //"生产厂商": "/",
	installer: String, //"安装厂商": "/",
	serial_num: String, //"出厂编号": "/",
	type: String, //"型式": "/",
	date_on: String,
	date_inspection: String,
	eval_score: Number ,//"评价分数": "/",
	rated_by: String,
	verified_by: String
}, {
	_id: false
});

const EvalSchema = Schema({
	id: ObjectId,
	basic_info: EvalBasicSchema,
	details: {
		type: [ComponentSchema],
		default: undefined
	}
}, {
	timestamps: true
});

const Desp = model('Desp', DespSchema);
const Item = model('Item', ItemSchema);
const SubComponent = model('SubComponent', SubComponentSchema);
const Component = model('Component', ComponentSchema);
const EvalBasic = model('EvalBasic', EvalBasicSchema);
const Eval = model('Eval', EvalSchema);

module.exports = {
	Desp,
	Item,
	SubComponent,
	Component,
	EvalBasic,
	Eval
};
