// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies;

// size
// Matter.Bodies.rectangle(x, y, width, height, [options])
var ww = window.innerWidth;
var wh = window.innerHeight;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: ww,
    height: wh,
    wireframes: false,
    background: "#000",
  },
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(ww / 2, wh, ww, 20, {
  isStatic: true,
  render: {
    fillStyle: '#CCCCCC'
  }
});
var sensor = Bodies.rectangle(ww / 2, wh/2, ww, wh, {
  isStatic: true,
  isSensor: true,
  render: {
    fillStyle: 'transparent'
  }
});

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

engine.world.gravity.y = 0.1;

// Socket
$(function () {
  var socket = io();

  socket.on("tempLevel", function (tempLevel) {
    console.log("The temp level is!!!" + tempLevel);
  });
});

var stack = Composites.stack(ww / 2, 0, 2, 2, 10, 10, function (x, y) {
  return Bodies.circle(x, y, Common.random(15, 30), {
    restitution: 0.6,
    friction: 0.1,
  });
});

World.add(engine.world, [
  stack,
  // Bodies.polygon(200, 460, 3, 60),
  // Bodies.polygon(400, 460, 5, 60),
  // Bodies.rectangle(600, 460, 80, 80),
]);

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
