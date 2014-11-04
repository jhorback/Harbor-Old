function isodate() {
    var numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];

    function dateFromISO(s) {
	    var lastValue;
        s = s.split(/\D/);
	    lastValue = s[6] || "";
        return new Date(Date.UTC(s[0], --s[1] || '', s[2] || '', s[3] || '', s[4] || '', s[5] || '', lastValue.substr(0,3) || ''));
    }

    return {
        parse: function (isoDateString) {
	        var dt = new Date(isoDateString), str = dt.toString();
            return (str !== "NaN" && str !== "Invalid Date") ? dt : dateFromISO(isoDateString);
        }
    };
}

appui.service("isodate", isodate);
