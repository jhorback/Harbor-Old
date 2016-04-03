/** @memberof appui */
function isodate() {

    function dateFromISO(s) {
	    var day, tz,
            rx=/^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
            p= rx.exec(s) || [];
            if(p[1]){
                day= p[1].split(/\D/);
                for(var i= 0, L= day.length; i<L; i++){
                    day[i]= parseInt(day[i], 10) || 0;
                };
                day[1]-= 1;
				day[6] = day[6] ? String(day[6]).substr(0,3) : "";
                day= new Date(Date.UTC.apply(Date, day));
                if(!day.getDate()) return NaN;
                if(p[5]){
                    tz= (parseInt(p[5], 10)*60);
                    if(p[6]) tz+= parseInt(p[6], 10);
                    if(p[4]== '+') tz*= -1;
                    if(tz) day.setUTCMinutes(day.getUTCMinutes()+ tz);
                }
                return day;
            }
            return NaN;
    }

    /** @name appui.isodate */
    return {
        /**
         * Given an isodate string from .NET, returns a JS date object set to the string's date/time value
         * @param {string} isoDateString - a .NET format ISO date string
         * @returns {Date}
         */
        parse: function (isoDateString) {
	        var dt = new Date(isoDateString), str = dt.toString();
            return (str !== "NaN" && str !== "Invalid Date") ? dt : dateFromISO(isoDateString);
        }
    };

}

appui.service("isodate", isodate);
