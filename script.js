// ===================================================
// 3D INTERACTIVE COMPONENT - THREE.JS (Enhanced Wireframe)
// ===================================================

const container = document.getElementById('three-container');
let scene, camera, renderer;
let mouseX = 0, mouseY = 0; 

// Initialize the 3D environment
function initThree() {
    // 1. Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 4. Create the 3D Objects (Wireframe and Solid objects)
    
    // Geometry (Dodecahedron, slightly larger)
    const geometry = new THREE.DodecahedronGeometry(2, 0); 
    
    // Wireframe Mesh (Subtle Background Object)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x4CAF50, 
        wireframe: true, 
        transparent: true,
        opacity: 0.2 // Subtle opacity
    });
    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    mesh.name = 'interactiveMesh'; 
    scene.add(mesh);

    // Edges Object (Bright, sharp lines)
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
        color: 0x4CAF50,
        linewidth: 2 
    }));
    line.name = 'interactiveLine';
    scene.add(line);
    
    // 5. Add Lighting (Point Light follows mouse for dynamic effect)
    // Point Light: Bright, focused glow
    const pointLight = new THREE.PointLight(0x4CAF50, 20, 100); // Increased intensity
    pointLight.position.set(5, 5, 5);
    pointLight.name = 'interactiveLight';
    scene.add(pointLight);

    // Ambient Light: Soft overall lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 5); 
    scene.add(ambientLight);
    
    // 6. Handle resizing
    window.addEventListener('resize', onWindowResize, false);
    
    // 7. Add Interactivity: Track mouse movement
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

// Function to handle window resizing
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Function to track mouse movement for interactivity
function onDocumentMouseMove(event) {
    // Normalize mouse coordinates to a range of -1 to +1
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// 8. Animate and Render Loop
function animate() {
    requestAnimationFrame(animate); 

    // Find the objects by their names
    const animatedMesh = scene.getObjectByName('interactiveMesh');
    const animatedLine = scene.getObjectByName('interactiveLine');
    const light = scene.getObjectByName('interactiveLight');

    if (animatedMesh && animatedLine && light) {
        // Constant slow rotation
        animatedMesh.rotation.x += 0.003;
        animatedMesh.rotation.y += 0.005;
        animatedLine.rotation.x += 0.003;
        animatedLine.rotation.y += 0.005;

        // INTERACTIVITY: Objects position subtly shifts with mouse (Parallax)
        animatedMesh.position.x = mouseX * 0.5;
        animatedMesh.position.y = mouseY * 0.5;
        animatedLine.position.x = mouseX * 0.5;
        animatedLine.position.y = mouseY * 0.5;
        
        // INTERACTIVITY: Light source follows the mouse dramatically
        light.position.x = mouseX * 8;
        light.position.y = mouseY * 8;
    }

    renderer.render(scene, camera); // Draw the scene
}

// Start the whole process!
initThree();
animate();