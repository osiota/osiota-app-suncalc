var SunCalc = require("suncalc");

exports.init = function(node, app_config, main) {
	//main.getconfig(app_config, "latitude", "position");
	var latitude = 52.51872463625155;
	var longitude = 13.376219384358473;
	var height = 0;

	if (typeof app_config.latitude === "number") {
		latitude = app_config.latitude;
	}
	if (typeof app_config.longitude === "number") {
		longitude = app_config.longitude;
	}
	if (typeof app_config.height === "number") {
		height = app_config.height;
	}

	var timepoint = "sunrise";
	if (typeof app_config.timepoint === "string") {
		timepoint = app_config.timepoint;
	}
	if (timepoint === "customMoring") {
		timepoint = "_" + this._id;
		if (typeof app_config.custom_angle === "number") {
			SunCalc.addTime(app_config.custom_angle,
				"_" + this._id, "_" + this._id + "_evening")
		}
	}
	if (timepoint === "customEvening") {
		timepoint = "_" + this._id + "_evening";
		if (typeof app_config.custom_angle === "number") {
			SunCalc.addTime(app_config.custom_angle,
				"_" + this._id, "_" + this._id + "_evening")
		}
	}

	var metadata = {
		"type": "time.trigger",
		"suncalc_timepoint": timepoint
	};
	node.announce([metadata, app_config.metadata]);

	var a_tid = [];

	var calc = function() {
		var dt = new Date();
		var d = SunCalc.getTimes(new Date(), latitude, longitude,
				height);
		//console.log("suncalc", d);
		if (!timepoint || typeof d !== "object" || d === null ||
				!d.hasOwnProperty(timepoint)) {
			console.error("Error: suncalc time point not found.");
			return;
		}
		if (isNaN(d[timepoint].getTime())) {
			console.error("Error: suncalc invalid date.");
			return;
		}
		var diff = d[timepoint] - new Date();
		while (diff < 0) {
			dt.setHours(dt.getHours() + 6);

			d = SunCalc.getTimes(dt, latitude, longitude,
				height);
			if (!timepoint || typeof d !== "object" || d === null ||
					!d.hasOwnProperty(timepoint)) {
				console.error("Error: suncalc time point not found.");
				return;
			}
			if (isNaN(d[timepoint].getTime())) {
				console.error("Error: suncalc invalid date.");
				return;
			}
			diff = d[timepoint] - new Date();
		}
		console.log("suncalc", timepoint, d[timepoint]);

		node.announce([metadata, app_config.metadata, {
			"next_date": d[timepoint].toISOString()
		}], true);

		console.log("suncalc wait:", diff / 60/60/1000, "hours");

		a_tid[0] = setTimeout(function() {
			node.publish(undefined, true);

			a_tid[0] = setTimeout(calc, 3*60*1000);
		}, diff);
	};
	calc();

	return [a_tid, node];
};

