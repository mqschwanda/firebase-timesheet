  console.log('loaded');

// Dynamic Format of Inputs
  // Currency Rules
    $('#monthlyRateInput').on( "keyup", function( event ) {
      // 1.
      var selection = window.getSelection().toString();
      if ( selection !== '' ) {
          return;
      }
      // 2.
      if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
          return;
      }
      // 1
      var $this = $( this );
      var input = $this.val();
      // 2
      var input = input.replace(/[\D\s\._\-]+/g, "");
      // 3
      input = input ? parseInt( input, 10 ) : 0;
      // 4
      $this.val( function() {
          return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
      });
    });
  // startDateInput Rules
    var startDateInput = document.getElementById('startDateInput');

    function checkValue(str, max) {
      if (str.charAt(0) !== '0' || str == '00') {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
      };
      return str;
    };

    startDateInput.addEventListener('input', function(e) {
      this.type = 'text';
      var input = this.value;
      if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
      var values = input.split('/').map(function(v) {
        return v.replace(/\D/g, '')
      });
      if (values[0]) values[0] = checkValue(values[0], 12);
      if (values[1]) values[1] = checkValue(values[1], 31);
      var output = values.map(function(v, i) {
        return v.length == 2 && i < 2 ? v + '/' : v;
      });
      this.value = output.join('').substr(0, 10);
    });

    startDateInput.addEventListener('blur', function(e) {
      this.type = 'text';
      var input = this.value;
      var values = input.split('/').map(function(v, i) {
        return v.replace(/\D/g, '')
      });
      var output = '';
      
      if (values.length == 3) {
        var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
        var month = parseInt(values[0]) - 1;
        var day = parseInt(values[1]);
        var d = new startDateInput(year, month, day);
        if (!isNaN(d)) {
          document.getElementById('result').innerText = d.toString();
          var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
          output = dates.map(function(v) {
            v = v.toString();
            return v.length == 1 ? '0' + v : v;
          }).join('/');
        };
      };
      this.value = output;
    });
