import * as THREE from 'three';

const immersion = () => {
    //initialize scene
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    document.getElementById("seq-data").appendChild(renderer.domElement);

    //colors
    const aColor = "#FFC6CE";   //red
    const tColor = "#95E0FF";   //blue
    const cColor = "#95FFC0";   //green
    const gColor = "#ECC6FA";   //purple
    const bbColor = "#27007B";

    //shapes
    let tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 32);
    let ballGeometry = new THREE.SphereGeometry(0.8, 32, 32);

    //materials
    let aMaterial = new THREE.MeshBasicMaterial({ color: aColor });
    let tMaterial = new THREE.MeshBasicMaterial({ color: tColor });
    let cMaterial = new THREE.MeshBasicMaterial({ color: cColor });
    let gMaterial = new THREE.MeshBasicMaterial({ color: gColor });
    let bbMaterial = new THREE.MeshBasicMaterial({ color: bbColor });

    //main graphics
    let dna = new THREE.Object3D();
    let holder = new THREE.Object3D();
    
    //build rows
    for (let i = 0; i <= 40; i++) {
        let row = new THREE.Object3D();

        let tRod = new THREE.Mesh(tubeGeometry, tMaterial);
        tRod.rotation.z = 90 * Math.PI / 180; //orient horizontal
        tRod.position.x = -3;
        let aRod = new THREE.Mesh(tubeGeometry, aMaterial);
        aRod.rotation.z = 90 * Math.PI / 180;
        aRod.position.x = 3;
        let cRod = new THREE.Mesh(tubeGeometry, cMaterial);
        cRod.rotation.z = 90 * Math.PI / 180;
        cRod.position.x = -3;
        let gRod = new THREE.Mesh(tubeGeometry, gMaterial);
        gRod.rotation.z = 90 * Math.PI / 180;
        gRod.position.x = 3;
        let ballRight = new THREE.Mesh(ballGeometry, bbMaterial);
        ballRight.position.x = 6;
        let ballLeft = new THREE.Mesh(ballGeometry, bbMaterial);
        ballLeft.position.x = -6;
        
        row.add(tRod);
        row.add(aRod);
        row.add(ballRight);
        row.add(ballLeft);
        row.position.y = i*2;
        row.rotation.y = 30*i * Math.PI/180;
        dna.add(row);
    };

    //add strand to scene
    dna.position.y = -40;
    scene.add(dna);
    dna.position.y = -40;
    holder.add(dna)
    scene.add(holder);

    camera.position.z = 30;

    const render = function () {
        requestAnimationFrame(render);
        // holder.rotation.x += 0.01;
        holder.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    render();
}

export default immersion;