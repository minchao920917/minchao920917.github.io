
(function() {
  
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

  // create an engine
  let engine = Engine.create();
  let idRAF = null;

function isPC() {
    var userAgentInfo = navigator.userAgent,
        Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
        flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
  function init(){
    let numm = Math.random();
    // $("canvas").remove();
    let anyway = document.getElementById("anyway");
    anyway.removeChild(anyway.childNodes[0]);
    // document.getElementsByTagName("canvas")[0].remove();
    // $("canvas").css("margin-top","50px");
    cancelAnimationFrame(idRAF);
    let width = window.innerWidth;;
    let height = window.innerHeight-93;

    let offset = -1;
      // module aliases
    
    engine.events = {};
    World.clear(engine.world);
    Engine.clear(engine);
    
    engine = Engine.create();

    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    let mouseConstraint = MouseConstraint.create(engine);
    World.add(engine.world, mouseConstraint);

    // create a renderer
    let render = Render.create({
      element: document.getElementById("anyway"),
      engine: engine,
      options: {
        wireframes: false,
        background: 'transparent',
        width: width,
        height: height
        // showDebug: false,
        // showBroadphase: false,
        // showBounds: false,
        // showVelocity: false,
        // showCollisions: false,
        // showSeparations: false,
        // showAxes: false,
        // showPositions: false,
        // showAngleIndicator: false,
        // showIds: false,
        // showShadows: false,
        // showVertexNumbers: false,
        // showConvexHulls: false,
        // showInternalEdges: false,
        // showMousePosition: false
      }
    });
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height / 2, 30, 46, {
        isStatic: true,
        render: {
          fillStyle: "transparent"
        }
      }),
      
      Bodies.rectangle(width / 2, (height / 2) - 40, 180, 20, {
        isStatic: true,
        render: {
          fillStyle: "transparent"
        }
      }),
      Bodies.rectangle(width / 2, (height / 2) + 40, 180, 20, {
        isStatic: true,
        render: {
          fillStyle: "transparent"
        }
      }),
      Bodies.rectangle(width / 2, height - offset, width, 1, {
        isStatic: true,
        render: {
          fillStyle: "#FFFFFF"
        }
      }),
      Bodies.rectangle(width / 2, offset, width, 1, {
        isStatic: true,
        render: {
          fillStyle: "#FFFFFF"
        }
      }),
      Bodies.rectangle(offset, height / 2, 1, height, {
        isStatic: true,
        render: {
          fillStyle: "#FFFFFF"
        }
      }),
      Bodies.rectangle(width - offset, height / 2, 1, height, {
        isStatic: true,
        render: {
          fillStyle: "#FFFFFF"
        }
      })
    ]);

    var balls = 0;
    if(isPC()){
        balls = 230;
    }else{
        balls = 50;
    }
    for (let i = 0; i < balls; i++) {
      let radius = 2 + Math.random() * 20
      World.add(engine.world, Bodies.circle(
        40 + Math.random() * width - 80,
        40 + Math.random() * 100,
        radius, {
          render: {
            fillStyle: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 3)]
          }

        }
      ))
    }


    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    let inc = 0

    engine.world.gravity.y = 4
    function update() {
      if(inc > 8){
        engine.world.gravity.x = Math.cos(inc / 55)
        engine.world.gravity.y = Math.sin(inc / 55)
      }
      inc++
      idRAF = requestAnimationFrame(update.bind(this))
    }
    update()
  } 

init();
document.body.removeEventListener("touchstart", function(){},true);
document.body.removeEventListener("touchstart", true);
document.body.removeEventListener("touchstart", true);
}());

