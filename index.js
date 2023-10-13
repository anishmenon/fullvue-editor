import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Example {
  constructor() {
    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.init();
  }

  init() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(50, this.aspect, 1, 1000);
    this.camera.position.z = -200;
    this.camera.position.y = 200;

    this.scene = new Scene();
    this.scene.background = new Color("#191919");
    this.scene.add(this.mesh);

    const color = 0xffffff;
    const intensity = 1;
    const light = new AmbientLight(color, intensity);
    this.scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      "./stadium.gltf",
      function (gltf) {
        this.scene.add(gltf.scene);
      }.bind(this)
    );

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true
    });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(this.animate);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

new Example();
