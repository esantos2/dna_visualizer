import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as DataSet from '../datasets/sequences';

const immersion = (chosenSeq = DataSet.zika.seq) => {
    //initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 2 / window.innerHeight,
        0.1,
        1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);

    //setup canvas
    const onWindowResize = () => {
        if (window.innerWidth < 1100) {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            camera.aspect = window.innerWidth / 2 / window.innerHeight;
            renderer.setSize(window.innerWidth / 2, window.innerHeight);
        }
        camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onWindowResize, false);
    const container = document.getElementById('immersion');
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    //colors
    const aColor = '#FF6358'; //red
    const tColor = '#FFD246'; //yellow
    const cColor = '#78D237'; //green
    const gColor = '#28B4C8'; //blue
    const bbColor = '#160036'; //dark purple

    //shapes
    const tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 32);
    const ballGeometry = new THREE.SphereGeometry(0.8, 32, 32);

    //materials
    const aMaterial = new THREE.MeshBasicMaterial({ color: aColor });
    const tMaterial = new THREE.MeshBasicMaterial({ color: tColor });
    const cMaterial = new THREE.MeshBasicMaterial({ color: cColor });
    const gMaterial = new THREE.MeshBasicMaterial({ color: gColor });
    const bbMaterial = new THREE.MeshBasicMaterial({ color: bbColor });

    const rodMaterial = {
        A: { mat: aMaterial, pair: 'T' },
        T: { mat: tMaterial, pair: 'A' },
        C: { mat: cMaterial, pair: 'G' },
        G: { mat: gMaterial, pair: 'C' },
    };

    //main graphics
    const dna = new THREE.Object3D();
    const holder = new THREE.Object3D();

    //build rows
    let maxRows = chosenSeq.length;
    if (maxRows > 50) maxRows = 50;
    for (let i = 0; i < maxRows; i++) {
        const row = new THREE.Object3D();

        const ballRight = new THREE.Mesh(ballGeometry, bbMaterial);
        ballRight.position.x = 6;
        const ballLeft = new THREE.Mesh(ballGeometry, bbMaterial);
        ballLeft.position.x = -6;

        const newRod = new THREE.Mesh(
            tubeGeometry,
            rodMaterial[chosenSeq[i]].mat,
        );
        newRod.rotation.z = (90 * Math.PI) / 180;
        newRod.position.x = 3;

        const oppRod = new THREE.Mesh(
            tubeGeometry,
            rodMaterial[rodMaterial[chosenSeq[i]].pair].mat,
        );
        oppRod.rotation.z = (90 * Math.PI) / 180;
        oppRod.position.x = -3;

        row.add(newRod);
        row.add(oppRod);
        row.add(ballRight);
        row.add(ballLeft);
        row.position.y = i * 2;
        row.rotation.y = (30 * i * Math.PI) / 180; //angle for spiral
        dna.add(row);
    }

    //add strand to scene
    dna.position.y = -40;
    scene.add(dna);
    dna.position.y = -40;
    holder.add(dna);
    scene.add(holder);

    camera.position.z = 60;
    controls.update();

    const render = function () {
        requestAnimationFrame(render);
        holder.rotation.y += 0.01;
        renderer.render(scene, camera);
        controls.update();
    };

    render();
};

export default immersion;
