const commonFunc = class CommonClass {
    constructor() {
        this.api_var = {
            'version' : 1.0,
            'developer' : 'Prithwiraj Bhadra'
        }
    }

    badRequestStatusBuild(res, msg, dataset = []) {
		let response_raws = {};
		if (Object.keys(dataset).length === 0) {
			dataset = {};
		}
		response_raws.data = dataset;
		this.status = {
			'message': msg,
			'action_status': false
		};
		response_raws.status = this.status;
		response_raws.publish = this.api_var;
		res.status(global.CONFIG.constants.HTTP_RESPONSE_BAD_REQUEST);
		res.send({ response: response_raws});
	}

	unauthorizedStatusBuild(res, msg,dataset = []) {
		let response_raws = {};
		response_raws.message = msg;
		if (Object.keys(dataset).length === 0) {
			dataset = {};
		}
		response_raws.data = dataset;
		response_raws.publish = this.api_var;
		res.status(global.CONFIG.constants.HTTP_RESPONSE_UNAUTHORIZED);
		res.send({ response: response_raws});
	}

	forbiddenStatusBuild(res, msg,dataset = []) {
		let response_raws = {};
		if (Object.keys(dataset).length === 0) {
			dataset = {};
		}
		response_raws.data = dataset;
		this.status = {
			'message': msg,
			'action_status': false
		};
		response_raws.status = this.status;
		response_raws.publish = this.api_var;
		res.status(global.CONFIG.constants.HTTP_RESPONSE_UNAUTHORIZED);
		res.send({ response: response_raws});
	}

	successStatusBuild(res, dataset, msg) {
		let response_raws = {};
		if (Object.keys(dataset).length === 0) {
			dataset = {};
		}
		response_raws.data = dataset;
		this.status = {
			'message': msg,
			'action_status': true
		};
		response_raws.status = this.status;
		response_raws.publish = this.api_var;
		res.status(global.CONFIG.constants.HTTP_RESPONSE_OK);
		res.send({ response: response_raws});
	}

	notAcceptableStatusBuild(res, msg) {
		let response_raws = {};
		let response_dataset = [];
		response_raws.message = msg;
		response_raws.data = response_dataset;
		response_raws.publish = this.api_var;
		res.status(global.CONFIG.constants.HTTP_RESPONSE_NOT_ACCEPTABLE);
		res.send({ response: {"raws":response_raws}});
	}

	methodNotAllowedStatusBuild(res, msg) {
		let response_raws = {};
		let response_dataset = [];
		response_raws.message = msg;
		response_raws.data = response_dataset;
		response_raws.publish = this.api_var;
		res.setHeader('content-type', 'application/json');
		res.status(global.CONFIG.constants.HTTP_RESPONSE_METHOD_NOT_ALLOWED);
		res.send({ response: {"raws":response_raws}});
	}
}

module.exports = commonFunc