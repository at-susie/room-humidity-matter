// size
// Matter.Bodies.rectangle(x, y, width, height, [options])
var ww = window.innerWidth;
var wh = window.innerHeight;



// Socket
$(function () {
  var socket = io();
  
  socket.on('humidityLevel', function(humidityLevel){
    console.log("The humidity level is!!!" + humidityLevel);

    var FLAKE_COUNT = humidityLevel;
    for (let i = 0; i < FLAKE_COUNT; i++) {
      newFlake();
    }

  });
});

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


// create an engine
var engine = Engine.create({
  //enableSleeping: true
});

engine.world.gravity.y = -0.001;

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  wireframes: false,
  options: {
    width: ww,
    height: wh,
    wireframes: false,
    background: 'transparent'
  },
});

const newFlake = () => {
  const flake = Bodies.circle(
    Math.floor(Math.random() * 800),
    Math.floor(Math.random() * wh),
    Math.floor(Math.random() * 12) + 8,
    { render: { 
      fillStyle: "#fff",
      opacity: Common.random(0.2, 0.5, 0.8),
    } 
  }
  );
  World.add(engine.world, flake);
  setTimeout(function() {
    newFlake();
  }, Math.floor(Math.random() * 1000) + 3000);

  setTimeout(function() {
    World.remove(engine.world, flake, true);
  }, Math.floor(Math.random() * 1000) + 1000);
};



var ground = Bodies.rectangle(400, -20, 810, 10, { isStatic: true });

//const thaw = body => World.remove(engine.world, body)

//setInterval(() => World.add(engine.world, newFlake()), 10);

render.options.wireframes = false;
render.options.showDebug = true;

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

// add all of the bodies to the world
World.add(engine.world, mouseConstraint, [ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

