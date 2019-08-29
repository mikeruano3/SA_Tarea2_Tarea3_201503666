var soap = require('soap');
  var url = 'http://localhost:8001/wsdl?wsdl';
  var args = {'Content-Type': 'text/xml;charset=UTF-8', 
              'input': 'holamundo'
              };
  soap.createClient(url, function(err, client) {
      client.echoInput(args, function(err, result) {
        console.log(result);
      });
  });