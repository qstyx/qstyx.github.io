  var tempvalue;
  var lightvalue;
  var motionsensor = 0;
  
  function main() {
      tempvalue= cpf.get("a0");
      celsius= toCelsius(tempvalue);
      lightvalue= cpf.get("a3");
      motionsensor= cpf.get("d5");
      document.getElementById("tempdata").innerHTML = celsius;
      document.getElementById("lightdata").innerHTML = lightvalue;
      if(motionsensor == 1) {
        cpf.request('["grove_setColorRGB", 0, 255, 0, 0]');
        document.getElementById("movDetected").style.opacity = "1";
      } else{
        cpf.request('["grove_setColorRGB", 0, 0, 0, 0]');
        document.getElementById("movDetected").style.opacity = "0";
      }
    setTimeout(main, 1000); 
  }
  
  function toCelsius(value) {
    var resistance = parseFloat((1023-value) * 10000 / value);
    var temperature = 1 / (Math.log(resistance / 10000) / 3975+1 / 298.15) - 273.15;
    
    return temperature.toFixed(2);
  }
  
  // Initial Setup: Temperature A0; Light Sensor A3; Motion Sensor D5; 1 led D7
    function setup() {
    cpf.setPinMode('["resetPin"],["setPinMode", "analog", 0, "INPUT"],["setPinMode", "analog", 3, "INPUT"], ["setPinMode", "digital", 5, "INPUT"],["grove_newChainableLED", 7, 8, 1]');
  }

  
  setup();
  main();