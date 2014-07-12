function isodate() {
    function dateFromISO(s) {
        s = s.split(/\D/);
        return new Date(Date.UTC(s[0], --s[1] || '', s[2] || '', s[3] || '', s[4] || '', s[5] || '', s[6] || ''));
    }

    return {
        parse: function (isoDateString) {
            var dt = new Date(isoDateString);
            return dt.toString() !== "NaN" ? dt : dateFromISO(isoDateString);
        }
    };
};

appui.service("isodate", isodate);