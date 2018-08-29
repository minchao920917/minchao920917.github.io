/* math.js */

function addNumbers(x,y) {
  return x + y;
}

function minNumbers(x,y) {
  return x - y;
}

/* 
  Add a eventlistener to the worker, this will
  be called when the worker receives a message
  from the main page.
*/
this.onmessage = function (event) {
  var data = event.data;

  switch(data.op) {
  case 'min':
    postMessage(minNumbers(data.x, data.y));
    break;
  case 'add':
    postMessage(addNumbers(data.x, data.y));
    break;
  default:
    postMessage("Wrong operation specified");
  }
};