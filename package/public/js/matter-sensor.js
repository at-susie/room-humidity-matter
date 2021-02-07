// module aliases

var Engine = Matter.Engine,
  Composites = Matter.Composites,
  Runner = Matter.Runner,
  Mouse = Matter.Mouse,
  Events = Matter.Events,
  World = Matter.World,
  Common = Matter.Common,
  Vertices = Matter.Vertices,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint,
  Render = Matter.Render,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint;

// size
// Matter.Bodies.rectangle(x, y, width, height, [options])
var ww = window.innerWidth;
var wh = window.innerHeight;

// Images
//var water1 = require("../img/Water-1.png");

// Number control

// create an engine
// // please dont look at this hot mess
$("body").append('<div id="clock"></div>');
var start = new Date(),
  sec = start.getSeconds(),
  min = start.getMinutes() * 60 + sec,
  hour = (start.getHours() % 12) * 3600 + min;
sW = $(window).width();
sH = $(window).width() / 3 * 2;

var engine = Engine.create($("#clock"));

// create a renderer
var render = Render.create({
  element: $("#clock")[0],
  engine: engine,
  options: {
    width: sW,
    height: sH,
    wireframes: false,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false,
    background: "transparent"
  },
});
//var engine = Engine.create();


var sensor = Bodies.circle(sW / 2, sH / 2, sW/4 + 32, {
  isStatic: true,
  isSensor: true,
  render: {
    fillStyle: "transparent",
    // fillStyle: "#00B7FF",
    // opacity: 0.3,
  },
});

var count = 0;
// Sensor Control - Counting the objects

Events.on(engine, "collisionStart", function (event) {
  var pairs = event.pairs;

  for (var i = 0, j = pairs.length; i != j; ++i) {
    var pair = pairs[i];

    if (pair.bodyA === sensor) {
      console.log("collide!");
      count++;
    } else if (pair.bodyB === sensor) {
    }
  }
});

Events.on(engine, "collisionEnd", function (event) {
  var pairs = event.pairs;

  for (var i = 0, j = pairs.length; i != j; ++i) {
    var pair = pairs[i];

    if (pair.bodyA === sensor) {
      console.log("collide out!");
      count--;
    } else if (pair.bodyB === sensor) {
    }
  }
});

////////////////////////////////

//Render.run(render);
hourHand = addRect({
  x: sW / 2,
  y: sH / 2,
  w: 20,
  h: sW - 20,
  options: {
    angle: 0,
    density: 4,
    isStatic: true,
    render: {
      fillStyle: "black",
      strokeStyle: "black",
      lineWidth: 10,
    },
  },
});
minuteHand = addRect({
  x: sW / 2,
  y: sH / 2,
  w: 10,
  h: sW - 20,
  options: {
    angle: 0,
    density: 4,
    isStatic: true,
    render: {
      fillStyle: "#000000",
      strokeStyle: "#000000",
      lineWidth: 6,
    },
  },
});
secondHand = addRect({
  x: sW / 2,
  y: sH / 2,
  w: 15,
  h: sW - 100,
  options: {
    angle: 0,
    density: 4,
    isStatic: true,
    render: {
      fillStyle: "#8bc34a",
      strokeStyle: "#8bc34a",
      // fillStyle: "#FE7452",
      // strokeStyle: "#FE7452",
      lineWidth: 3,
    },
  },
});


m = Math.min(sW, sH);
rat = (1 / 4.5) * 1.75; //Clock container size
r = m * rat;
parts = [];
pegCount = 64;
TAU = Math.PI * 2;
for (i = 0; i < pegCount; i++) {
  segment = TAU / pegCount;
  angle2 = (i / pegCount) * TAU + segment / 2;
  x2 = Math.cos(angle2);
  y2 = Math.sin(angle2);
  cx2 = x2 * r + sW / 2;
  cy2 = y2 * r + sH / 2;
  rect = addRect({
    x: cx2,
    y: cy2,
    w: (10 / 1000) * m,
    h: (400 / 1000) * m,
    options: {
      angle: angle2,
      isStatic: true,
      density: 1,
      render: {
        fillStyle: "transparent",
        // fillStyle: "white",
        // strokeStyle: "white",
        lineWidth: 0,
      },
    },
  });
  parts.push(rect);
}
function addBody(...bodies) {
  //World.add(engine.world, [sensor, ...bodies]);
  World.add(engine.world, sensor);
  World.add(engine.world, ...bodies);
}

// Socket
$(function () {
  socket.on("humidityLevel", function (humidityLevel) {
    console.log("The humidity level is!!!" + humidityLevel);
    console.log("The count is " + count);

    var dif = Math.round(humidityLevel) - count;

    function addBall() {
      for (var i = 0; i < dif; i++) {
        var x = ww / 2 - 120;
        var y = wh / 2 - 50;
        var radius = Common.random(15, 20, 25) ;
          //(ww > 640) ? Common.random(8, 16, 20) : Common.random(6, 12, 16);
        
        var Circle1 = Bodies.circle(x, y, radius, {
          restitution: 1.1,
          render: {
            //fillStyle: "#00B7FF",
            opacity: Common.random(0.7, 0.9, 1),
            sprite: {
              texture: '../img/Water-2.png',
              xScale: 0.12,
              yScale: 0.12
            }
          },
          label: 'humidity'
        });

        var Circle2 = Bodies.circle(x, y, radius, {
          restitution: 1.1,
          render: {
            //fillStyle: "#00B7FF",
            //opacity: Common.random(0.6, 0.8, 1),
            sprite: {
              texture: '../img/Water-3.png',
              xScale: 0.15,
              yScale: 0.15
            }
          },
          label: 'humidity'
        });

        var Circle3 = Bodies.circle(x, y, radius, {
          restitution: 1.1,
          render: {
            //fillStyle: "#00B7FF",
            //opacity: Common.random(0.6, 0.8, 1),
            sprite: {
              texture: '../img/Water-4.png',
              xScale: 0.14,
              yScale: 0.14
            }
          },
          label: 'humidity'
        });

        World.add(engine.world, [Circle1, Circle2, Circle3]);

      }
    }
    
    var filteringCircle = engine.world.bodies.filter(obj => {
      return obj.label === 'humidity'
    })
    

    var rectangle = engine.world.bodies.filter(obj => {
      return obj.label === 'Rectangle Body'
    })
    console.log('Body is ' + rectangle[0])

    //Matter.Composite.remove(engine.world, rectangle[30, 31, 32, 33, 34, 35], true);

    if (dif > 0) {
      console.log("Count < humidity. Dif is " + dif);
      addBall();
    } else if (dif < 0) {
      console.log("Need to reduce");
      var redundant = count - Math.round(humidityLevel);
      console.log(redundant);
      for (var i = 0; i < redundant; i++) {
        Matter.Composite.remove(engine.world, filteringCircle[i], true);
      }
      
    } else if ((dif == 0)) {
      console.log("Balanced");
    }
  });
});

engine.world.gravity.y = -0.001;

function addRect({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) {
  body = Bodies.rectangle(x, y, w, h, options);
  addBody(body);
  return body;
}
runner = Engine.run(engine);
hourHand.vertices[0].x = -1;
hourHand.vertices[0].y = 0;
hourHand.vertices[1].x = -5;
hourHand.vertices[1].y = 0;
Body.scale(hourHand, 0.25, 0.10);
Body.setVertices(hourHand, hourHand.vertices);
minuteHand.vertices[0].x = -1;
minuteHand.vertices[0].y = 0;
minuteHand.vertices[1].x = -5;
minuteHand.vertices[1].y = 0;
Body.scale(minuteHand, 0.35, 0.10);
Body.setVertices(minuteHand, minuteHand.vertices);
secondHand.vertices[0].x = -1;
secondHand.vertices[0].y = 0;
secondHand.vertices[1].x = -5;
secondHand.vertices[1].y = 0;
Body.scale(secondHand, 0.35, 0.25);
Body.setVertices(secondHand, secondHand.vertices);
function draw() {
  var now = new Date(),
    diff = Math.abs(start.getTime() - now.getTime()) / 1000,
    degS = ((sec + diff) / 60) * 360 + 30,
    degM = ((min + diff) / 3600) * 360 + 30,
    degH = ((hour + diff) / 43200) * 360 + 30;
  Body.setAngle(hourHand, ((degH * Math.PI) / 180));
  Body.setAngle(minuteHand, ((degM * Math.PI) / 180));
  Body.setAngle(secondHand, ((degS * Math.PI) / 180));
  requestAnimationFrame(draw);
  var timeMin = degM / 6;
  //console.log(degS);
}


draw();

var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function () {
  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }
});
function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta);
  } else {
    timeout = false;
    resetBounds();
  }
}



////////////////

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
