import * as THREE from 'three';
import * as DataSet from '../datasets/sequences';

const immersion = (chosenSeq = DataSet.zika.seq) => {
    //initialize scene
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    let camera = new THREE.PerspectiveCamera(75, (window.innerWidth/2) / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight);

    //setup canvas
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);
        camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onWindowResize, false);
    let container = document.getElementById("immersion");
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    //move molecule
    moveMolecule(scene, container);

    //colors
    const aColor = "#FFC6CE";   //red
    const tColor = "#95E0FF";   //blue
    const cColor = "#95FFC0";   //green
    const gColor = "#ECC6FA";   //purple
    const bbColor = "#27007B";  //darker purple

    //shapes
    let tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 32);
    let ballGeometry = new THREE.SphereGeometry(0.8, 32, 32);

    //materials
    let aMaterial = new THREE.MeshBasicMaterial({ color: aColor });
    let tMaterial = new THREE.MeshBasicMaterial({ color: tColor });
    let cMaterial = new THREE.MeshBasicMaterial({ color: cColor });
    let gMaterial = new THREE.MeshBasicMaterial({ color: gColor });
    let bbMaterial = new THREE.MeshBasicMaterial({ color: bbColor });

    let rodMaterial = {
        "A": { "mat": aMaterial, "pair": "T"},
        "T": { "mat": tMaterial, "pair": "A"},
        "C": { "mat": cMaterial, "pair": "G"},
        "G": { "mat": gMaterial, "pair": "C"}
    }

    //main graphics
    let dna = new THREE.Object3D();
    let holder = new THREE.Object3D();
    
    //build rows
    let maxRows = chosenSeq.length;
    if (maxRows > 50) maxRows = 50;
    for (let i = 0; i < maxRows; i++) {
        let row = new THREE.Object3D();

        let ballRight = new THREE.Mesh(ballGeometry, bbMaterial);
        ballRight.position.x = 6;
        let ballLeft = new THREE.Mesh(ballGeometry, bbMaterial);
        ballLeft.position.x = -6;
    
        let newRod = new THREE.Mesh(tubeGeometry, rodMaterial[chosenSeq[i]].mat);
        newRod.rotation.z = 90 * Math.PI / 180;
        newRod.position.x = 3;
        let oppRod = new THREE.Mesh(tubeGeometry, rodMaterial[rodMaterial[chosenSeq[i]].pair].mat);
        oppRod.rotation.z = 90 * Math.PI / 180;
        oppRod.position.x = -3;
        
        row.add(newRod);
        row.add(oppRod);
        row.add(ballRight);
        row.add(ballLeft);
        row.position.y = i*2;
        row.rotation.y = 30*i * Math.PI/180; //angle for spiral
        dna.add(row);
    };

    //add strand to scene
    dna.position.y = -40;
    scene.add(dna);
    dna.position.y = -40;
    holder.add(dna)
    scene.add(holder);

    camera.position.z = 60;

    const render = function () {
        requestAnimationFrame(render);
        // holder.rotation.z += 0.01;
        holder.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();
}

const moveMolecule = (scene, container) => { //rotates scene based on change in mouse coordinates
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
        if (!mouseDown) {
            return;
        }
        e.preventDefault();
        let deltaX = e.clientX - mouseX;
        let deltaY = e.clientY - mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        rotateScene(deltaX, deltaY);
    }

    const onMouseDown = (e) => {
        e.preventDefault();
        mouseDown = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    const onMouseUp = (e) => {
        e.preventDefault();
        mouseDown = false;
    }

    const addMouseHandler = (canvas) => {
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
    }

    const rotateScene = (deltaX, deltaY) => {
        scene.rotation.y += deltaX / 100;
        scene.rotation.x += deltaY / 100;
    }

    addMouseHandler(container);
}

export default immersion;