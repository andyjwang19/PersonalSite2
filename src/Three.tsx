import { useEffect, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";

function Three() {
  const refContainer = useRef<HTMLDivElement>(null);
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0.5, 0.5, 0.5);

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
    new MTLLoader()
      .setPath("materials/")
      .load("model.mtl", function (materials) {
        materials.preload();

        new OBJLoader()
          .setMaterials(materials)
          .setPath("models/")
          .load(
            "obj.obj",
            function (object) {
              // object.position.y = -0.95;
              // object.scale.setScalar(0.01);
              scene.add(object);
            },
            function (xhr) {
              if (xhr.lengthComputable) {
                const percentComplete = (xhr.loaded / xhr.total) * 100;
                console.log(percentComplete.toFixed(2) + "% downloaded");
              }
            }
          );
      });

    // var loader = new OBJLoader();
    // var mtlLoader = new MTLLoader();
    // loader.load("models/obj.obj", function (obj) {
    //   // center asset

    //   // var box = new THREE.Box3().setFromObject(obj);
    //   // var center = new THREE.Vector3();
    //   // box.getCenter(center);
    //   // obj.position.sub(center);

    //   // add to scene
    //   obj.traverse(function (child) {
    //     if (child instanceof THREE.Mesh) {
    //       mtlLoader.load("materials/model.mtl", (mdl)=>{

    //       })
    //       child.material = new THREE.MeshBasicMaterial({ color: "red" });
    //     }
    //   });
    //   // obj.scale.set(0.1, 0.1, 0.1);
    //   obj.position.set(0, 0, 0);

    //   console.log(obj.children);
    //   scene.add(obj);
    // });

    function animate() {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <div ref={refContainer}></div>;
}

export default Three;
