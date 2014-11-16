// // set the scene size
// var WIDTH = 400,
//   HEIGHT = 300;
//
// // set some camera attributes
// var VIEW_ANGLE = 45,
//   ASPECT = WIDTH / HEIGHT,
//   NEAR = 0.1,
//   FAR = 10000;
//
// // create a WebGL renderer, camera
// // and a scene
// var renderer = new THREE.WebGLRenderer({
//   devicePixelRatio: 1,
//   alpha: true
// });
// var camera =
//   new THREE.PerspectiveCamera(
//     VIEW_ANGLE,
//     ASPECT,
//     NEAR,
//     FAR);
//
// var scene = new THREE.Scene();
//
// // add the camera to the scene
// scene.add(camera);
//
// // the camera starts at 0,0,0
// // so pull it back
// camera.position.z = 300;
//
// // start the renderer
// renderer.setSize(WIDTH, HEIGHT);
//
// // create the sphere's material
// var sphereMaterial =
//   // new THREE.MeshLambertMaterial(
//   new THREE.MeshBasicMaterial(
//     {
//       color: 0xCC0000,
//       // transparent: true,
//       // opacity: 0.5
//     });
//
// // set up the sphere vars
// var radius = 50,
//     segments = 16,
//     rings = 16;
//
// // create a new mesh with
// // sphere geometry - we will cover
// // the sphereMaterial next!
// var sphere = new THREE.Mesh(
//
//   new THREE.SphereGeometry(
//     radius,
//     segments,
//     rings),
//
//   sphereMaterial);
//
// // add the sphere to the scene
// scene.add(sphere);
//
// // create a point light
// // var pointLight =
// //   new THREE.PointLight(0xFFFFFF);
// //
// // // set its position
// // pointLight.position.x = 10;
// // pointLight.position.y = 50;
// // pointLight.position.z = 130;
// //
// // // add to the scene
// // scene.add(pointLight);
//
// var light = new THREE.AmbientLight( 0xffffff );
// scene.add( light );
//
// // var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
// // directionalLight.position.set( 0, 0, 1 );
// // scene.add( directionalLight );
//
//
// renderer.render(scene, camera);
//
// Meteor.startup(function() {
//   // get the DOM element to attach to
//   // - assume we've got jQuery to hand
//   var $container = $('#container');
//
//   // attach the render-supplied DOM element
//   $container.append(renderer.domElement);
// });
