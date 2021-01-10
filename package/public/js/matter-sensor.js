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

// Number control

// create an engine
// // please dont look at this hot mess
$("body").append('<div id="clock"></div>');
var start = new Date(),
  sec = start.getSeconds(),
  min = start.getMinutes() * 60 + sec,
  hour = (start.getHours() % 12) * 3600 + min;
sW = $(window).width() / 2;
sH = $(window).width() / 2;

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


// Container
var ground = Bodies.rectangle(ww / 2, wh + 54, ww, 20, {
  isStatic: true,
  render: {
    //fillStyle: "#FFB086",
    fillStyle: "#transparent",
  },
});
var wallLeft = Bodies.rectangle(45, wh / 2 + 30, 8, wh, {
  isStatic: true,
  render: {
    //fillStyle: "#CCCCCC",
    fillStyle: "#transparent",
  },
});
var wallRight = Bodies.rectangle(ww + 45, wh / 2 + 30, 8, wh, {
  isStatic: true,
  render: {
    //fillStyle: "#CCCCCC",
    fillStyle: "#transparent",
  },
});

var wallTop = Bodies.rectangle(ww / 2 + 45, 0, ww, 20, {
  isStatic: true,
  render: {
    //fillStyle: "#FFB086",
    fillStyle: "#transparent",
  },
});

var sensor = Bodies.rectangle(ww / 2 + 45, wh / 2 + 54, ww, wh + 54, {
  isStatic: true,
  isSensor: true,
  render: {
    fillStyle: "transparent",
    // fillStyle: "#FFFFFF",
    // opacity: 0.3,
  },
});

// add all of the bodies to the world
//World.add(engine.world, [sensor, ground, wallLeft, wallRight, wallTop]);

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
  w: 15,
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
  w: 15,
  h: sW - 20,
  options: {
    angle: 0,
    density: 4,
    isStatic: true,
    render: {
      fillStyle: "black",
      strokeStyle: "black",
      lineWidth: 6,
    },
  },
});
secondHand = addRect({
  x: sW / 2,
  y: sH / 2,
  w: 15,
  h: sW - 20,
  options: {
    angle: 0,
    density: 4,
    isStatic: true,
    render: {
      fillStyle: "black",
      strokeStyle: "black",
      lineWidth: 3,
    },
  },
});


m = Math.min(sW, sH);
rat = (1 / 4.5) * 2;
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
        //strokeStyle: "white",
        lineWidth: 0,
      },
    },
  });
  parts.push(rect);
}
function addBody(...bodies) {
  World.add(engine.world, [...bodies, sensor]);
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
        var radius =
          ww > 640 ? Common.random(10, 30, 50) : Common.random(10, 25, 40);

        var Circle = Bodies.circle(x, y, radius, {
          restitution: 1.0,
          render: {
            fillStyle: "#00B7FF",
            opacity: Common.random(0.3, 0.6, 0.9),
          },
        });

        World.add(engine.world, Circle);
      }
    }

    function tremorGravity() {
      engine.world.gravity.y = 0.003;
      engine.world.gravity.x = 0.003;
      setTimeout(function () {
        engine.world.gravity.y = -0.003;
        engine.world.gravity.x = -0.003;
      }, 2000);
    }

    //tremorGravity();

    // setTimeout(function(){
    //   console.log("setTimeout is working")
    //   //console.log(World.Bodies.circle);
    //   //console.log(World.Bodies);
    //   //console.log(engine.world.bodies);
    //   //Matter.Composite.remove(engine.world, engine.world.bodies[4], true);
    // }, 3000);

    if (dif > 0) {
      console.log("Count < humidity. Dif is " + dif);
      addBall();
    } else if (dif < 0) {
      console.log("Need to reduce");
      Matter.Composite.remove(engine.world, engine.world.bodies[4], true);
    } else if ((dif = 0)) {
      console.log("Balanced");
    }
  });
});

engine.world.gravity.y = 0.008;

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
Body.scale(hourHand, 0.3, 0.2);
Body.setVertices(hourHand, hourHand.vertices);
minuteHand.vertices[0].x = -1;
minuteHand.vertices[0].y = 0;
minuteHand.vertices[1].x = -5;
minuteHand.vertices[1].y = 0;
Body.scale(minuteHand, 0.4, 0.3);
Body.setVertices(minuteHand, minuteHand.vertices);
secondHand.vertices[0].x = -1;
secondHand.vertices[0].y = 0;
secondHand.vertices[1].x = -5;
secondHand.vertices[1].y = 0;
Body.scale(secondHand, 0.4, 0.4);
Body.setVertices(secondHand, secondHand.vertices);
function draw() {
  var now = new Date(),
    diff = Math.abs(start.getTime() - now.getTime()) / 1000,
    degS = ((sec + diff) / 60) * 360,
    degM = ((min + diff) / 3600) * 360,
    degH = ((hour + diff) / 43200) * 360;
  Body.setAngle(hourHand, (degH * Math.PI) / 180);
  Body.setAngle(minuteHand, (degM * Math.PI) / 180);
  Body.setAngle(secondHand, (degS * Math.PI) / 180);
  requestAnimationFrame(draw);
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
