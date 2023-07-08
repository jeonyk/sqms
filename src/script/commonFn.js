export const commonFn = {
    methods: {
        isEmpty: function(str) {      // 빈 값 체크
            if(str == null || String(str).trim() == '') {
                return true;
            }else {
                return false;
            }
        },
        emailValidation: function(str) {   // 이메일 유효성 체크
            var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            if(regExp.test(str)){  // 통과
                return true;
            }else{  // 유효X
                return false;
            }
        },
        phoneValidation: function(str) {   // 핸드폰 유효성 체크
            var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
            if(regExp.test(str)){
                return true;
            }else{
                return false;
            }
        },
        addCommas: function(num) {  // 3자리 단위마다 콤마 생성
            var len, point, str;
            num = num+"";
            if(num.indexOf(',') != -1){ 
                num = num.replace(/,/g, '');
            }
            point = num.length % 3;
            len = num.length;
            
            str = num.substring(0, point);
            while(point < len) {
                if(str != "") str+= ",";
                str += num.substring(point, point+3);
                point += 3;
            }
            return str;
        },
        removeCommas: function(str) {   // 콤마 제거
            if(!str || str.length == 0) { 
                return "";
            }else {
                return str.split(",").join("");
            }
        },
        onlyNumber: function(str) {     // 숫자 형태만 남기고 리턴
            return str.replace(/[^0-9]/g,"");
        },
        getToday: function() {  // 오늘날짜 가져오기
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            
            if(dd < 10) dd = "0" + dd;
            if(mm < 10) mm = "0" + mm;
            
            today = yyyy + "-" + mm + "-" + dd;
            return today;
        },
        parseDate: function(s) {     // String 타입 date 타입으로 변경
            /*  s : string  
             	형식 : 2020-09-18T15:59:58.000+0000
            	'2017-04-18T11:18:05-0300',  // No colon in timezone
                '2017-04-18 11:18:05-0300', // Space separator instead of T
                '2016-04-12T04:31+05:30',   // Colon in timezone
                '2016-02-29T04:31+05:30',   // Colon, leap year
                '2016-04-12T04:31:56.004Z', // GMT
                '2000-02-29T04:31+05:30',   // Colon, leap year
                '1900-02-29T04:31+05:30',   // Colon, not leap year (invalid date)
                '2016-04-12T04:31:56.004',  // Local
                '2016-04-12',               // Date only (local)
                '2016-04',
                '2020-09-23T01:31:22.000+0000' 
             */
            if(s == '' || s == undefined || s == null) {
                return;
            }
            
            // Create base Date object
             var date = new Date();
             date.setHours(12, 0, 0, 0);
             var invalidDate = new Date(NaN);
        
             // Set some defaults
             var sign = -1,
               tzMins = 0;
             var tzHr, tzMin;
        
             // Trim leading and trailing whitespace
             s = s.replace(/^\s*|\s*$/g, '').toUpperCase();
        
             // Get parts of string and split into numbers
             var d = (s.match(/^\d+(-\d+){0,2}/) || [''])[0].split(/\D/);
             var t = (s.match(/[\sT]\d+(:\d+){0,2}(\.\d+)?/) || [''])[0].split(/\D/);
             var tz = (s.match(/Z|[+-]\d\d:?\d\d$/) || [''])[0];
        
             // Resolve timezone to minutes, may be Z, +hh:mm or +hhmm
             // substr is old school but more compatible than slice
             // Don't need to split into parts but makes validation easier
             if (tz) {
               sign = /^-/.test(tz) ? 1 : -1;
               tzHr = tz == 'Z' ? 0 : tz.substr(1, 2);
               tzMin = tz == 'Z' ? 0 : tz.substr(tz.length - 2, 2) * 1;
               tzMins = sign * (tzHr * 60 + tzMin);
             }
        
             // Validation
             function isLeap(year) {
               return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
             }
        
             // Check number of date parts and month is valid
             if (d.length > 3 || d[1] < 1 || d[1] > 12) return invalidDate;
        
             // Test day is valid
             var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
             var monthMax = isLeap(d[0]) && d[1] == 2 ? 29 : monthDays[+d[1]];
             if (d[2] < 1 || d[2] > monthMax) return invalidDate;
        
             // Test time parts
             if (t.length > 5 || t[1] > 23 || t[2] > 59 || t[3] > 59 || t[4] > 999) return invalidDate;
        
             // Test tz within bounds
             if (tzHr > 12 || tzMin > 59) return invalidDate;
        
             // If there's a timezone, use UTC methods, otherwise local
             var method = tz ? 'UTC' : '';
        
             // Set date values
             date['set' + method + 'FullYear'](d[0], (d[1] ? d[1] - 1 : 0), d[2] || 1);
             // Set time values - first memeber is '' from separator \s or T
             date['set' + method + 'Hours'](t[1] || 0, (+t[2] || 0) + tzMins, t[3] || 0, t[4] || 0);
        
             return date;
        },
        getFormatDate: function(date, format) {    // 넘어온 format 형식에 맞게 yyyymmdd 변환
            // format : '-' or '.' or ''
            var year = date.getFullYear();
            var month = (date.getMonth() + 1);
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;

            return year+format+month+format+day;
        },
        formatDateYYYYMMDD: function(date) { 
            // 넘어온 날짜 YYYY-MM-DD로 변경
            var year = date.getFullYear();
            var month = (date.getMonth() + 1);
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;

            return year+'-'+month+'-'+day;
        }
    }
}