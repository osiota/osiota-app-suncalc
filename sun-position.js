var SunCalc = require("suncalc");

exports.default_node_name = "Sun";

exports.init = function(node, app_config, main) {
	//main.getconfig(app_config, "latitude", "position");
	var latitude = 51.2610509;
	var longitude = 9.3228767;

	if (typeof app_config.latitude === "number") {
		latitude = app_config.latitude;
	}
	if (typeof app_config.longitude === "number") {
		longitude = app_config.longitude;
	}

	var node_al = node.node("Height");
	node_al.announce({
		"type": "altitude.sun.data",
		"name_de": "Höhe"
	});
	var node_az = node.node("Direction");
	node_az.announce({
		"type": "azimuth.sun.data",
		"name_de": "Richtung"
	});

	var calc = function() {
		var p = SunCalc.getPosition(new Date(), latitude, longitude);
		var al = p.altitude * 180 / Math.PI;
		node_al.publish(undefined, al, true);

		// north azimuth:
		var az = p.azimuth * 180 / Math.PI + 180;
		node_az.publish(undefined, az, true);
	};

	var tid = setInterval(calc, 5*60*1000);
	calc();

	return [tid, node_al, node_az];
};
