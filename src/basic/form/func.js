const validateDate = inputText => {
  const dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/;
  // Match the date format through regular expression
  if (inputText.value.match (dateformat)) {
    document.form1.text1.focus ();
    //Test which separator is used '/' or '-'
    let opera1 = inputText.value.split ('/');
    let opera2 = inputText.value.split ('-');
    // Extract the string into month, date and year
    let pDate;
    if (opera1.length > 1) {
      pDate = inputText.value.split ('/');
    } else if (opera2.length > 1) {
      pDate = inputText.value.split ('-');
    }
    let dd = parseInt (pDate[0]);
    let mm = parseInt (pDate[1]);
    let yy = parseInt (pDate[2]);
    // Create list of days of a month [assume there is no leap year by default]
    const ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm === 1 || mm > 2) {
      if (dd > ListOfDays[mm - 1]) {
        alert ('Invalid date format!');
        return false;
      }
    }
    if (mm === 2) {
      let lYear = false;
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lYear = true;
      }
      if (lYear === false && dd >= 29) {
        alert ('Invalid date format!');
        return false;
      }
      if (lYear === true && dd > 29) {
        alert ('Invalid date format!');
        return false;
      }
    }
  } else {
    alert ('Invalid date format!');
    document.form1.text1.focus ();
    return false;
  }
};
