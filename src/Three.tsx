import { useEffect, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import useMousePosition from "./useMousePosition";

function Three() {
  const refContainer = useRef<HTMLDivElement>(null);

  const refMouseCoords = useRef<{x: number, y: number}> ({x:0,y: 0});
  document.addEventListener('mousemove', function(e) {
    refMouseCoords.current = getMousePos(e);
  });

  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.01,
      3000
    );
    camera.position.z = 500;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load("./sky.jpg");
    // scene.fog = new THREE.Fog("#808080");

    var ambientLight = new THREE.AmbientLight(0xcccccc, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    // directionalLight.position.set(0.5, 0.5, 0.5);
    directionalLight.position.set(0.2,0,1);

    // pointLight.position.set(0, 0, 250);
    // camera.add(pointLight);
    scene.add(directionalLight);
    scene.add(camera);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current?.appendChild(renderer.domElement);
    var controls = new OrbitControls(camera, renderer.domElement);
    var a_letter: any;
    new GLTFLoader()
      .setPath("models/lower_a/")
      .load("24_09_27_19_03_20_342.gltf", (data)=>{
        a_letter = data.scene
        a_letter.rotation.set(0, Math.PI, 0)
        a_letter.position .set(0,-50,0)
        a_letter.scale.set(0.5,0.5,0.5)
        scene.add(a_letter)
      })
    

      // console.log("MOUSE", MousePosition)
    function animate() {
      // console.log(refMouseCoords)


          const targetX = refMouseCoords.current.x * .001
          const targetY = refMouseCoords.current.y * .001
        
          // const elapsedTime = clock.getElapsedTime()
        
          // //Update objects - increase number to create automated animation
          // sphere.rotation.x = 0 * elapsedTime
          // sphere.rotation.y = 0 * elapsedTime

          if (a_letter !== undefined){
            // a_letter.rotation.x += 2 * (targetY - a_letter.rotation.x)
            a_letter.rotation.y = targetX
            a_letter.rotation.x = targetY
          }
        
          // sphere.rotation.x += 2 * (targetY - sphere.rotation.x)
          // sphere.rotation.y += 1.5 * (targetX - sphere.rotation.y)
          // // NewCode
          // if (myModel){
          //   myModel.rotation.copy(sphere.rotation.clone())
          // }
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <div ref={refContainer}></div>;
}
function getMousePos(e: MouseEvent) {
  return { x: e.clientX, y: e.clientY };
}

export default Three;
