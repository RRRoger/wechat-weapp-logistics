const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


// time tools START

const mths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const WEEKs = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEKs = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//替换
function strReplaceAll(source, s1, s2) {
  return source.replace(new RegExp(s1, "gm"), s2);
};

function dateParseString(date, format) {
  var YYYY = date.getFullYear() + ''; //2011

  var YY = YYYY.substr(2); // 11
  format = strReplaceAll(format, "@YYYY@", YYYY);
  format = strReplaceAll(format, "@YY@", YY);

  var M = date.getMonth() + 1;
  var MM = (M < 10) ? "0" + M : M;
  var MMM = mths[M - 1];
  format = strReplaceAll(format, "@MMM@", MMM);
  format = strReplaceAll(format, "@MM@", MM);
  format = strReplaceAll(format, "@M@", M);

  var D = date.getDate();
  var DD = (D < 10) ? "0" + D : D;
  format = strReplaceAll(format, "@DD@", DD);
  format = strReplaceAll(format, "@D@", D);

  var h = date.getHours();
  var hh = (h < 10) ? "0" + h : h;
  format = strReplaceAll(format, "@hh@", hh);
  format = strReplaceAll(format, "@h@", h);
  var m = date.getMinutes();
  var mm = (m < 10) ? "0" + m : m;
  format = strReplaceAll(format, "@mm@", mm);
  format = strReplaceAll(format, "@m@", m);
  var s = date.getSeconds();
  var ss = (s < 10) ? "0" + s : s;
  format = strReplaceAll(format, "@ss@", ss);
  format = strReplaceAll(format, "@s@", s);
  var dayOfWeek = date.getDay();
  format = strReplaceAll(format, "@WEEK@", WEEKs[dayOfWeek]);
  format = strReplaceAll(format, "@WEK@", WEKs[dayOfWeek]);
  return format;
};

// time tools END

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function checkEmail(email) {
  var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return myreg.test(email)
}


module.exports = {
  checkEmail: checkEmail,
  dateParseString: dateParseString,
  formatTime: formatTime,
  formatNumber: formatNumber
}