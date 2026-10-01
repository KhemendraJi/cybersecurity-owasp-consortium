import * as THREE from 'three';

export function initGraphics() {
  // 3D Scene (Unique Cyber-Core Design)
  const container = document.getElementById('webgl-container');
  if (container) {
    container.innerHTML = '';
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Network Nodes
    const particleCount = 120; // Lower density
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    for(let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0xff1a1a, size: 0.1, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    const linesGeo = new THREE.BufferGeometry();
    const linesMat = new THREE.LineBasicMaterial({ color: 0xff1a1a, transparent: true, opacity: 0.25 });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    group.add(linesMesh);

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    let mouseX = 0;
    let mouseY = 0;
    const mouseNDC = new THREE.Vector2(-9999, -9999);
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
      mouseNDC.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3();

    function animate() {
      requestAnimationFrame(animate);
      
      // Pause if tab is hidden
      if (document.hidden) return;

      const elapsedTime = clock.getElapsedTime();
      
      group.rotation.y += (mouseX - group.rotation.y) * 0.05 + 0.001;
      group.rotation.x += (mouseY - group.rotation.x) * 0.05 + 0.001;
      
      const posAttribute = particlesGeo.attributes.position;
      const posArray = posAttribute.array;
      
      // Update positions
      for(let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;
        
        // Wrap around bounds
        if(posArray[i * 3] > 12.5 || posArray[i * 3] < -12.5) velocities[i].x *= -1;
        if(posArray[i * 3 + 1] > 12.5 || posArray[i * 3 + 1] < -12.5) velocities[i].y *= -1;
        if(posArray[i * 3 + 2] > 12.5 || posArray[i * 3 + 2] < -12.5) velocities[i].z *= -1;
      }
      posAttribute.needsUpdate = true;
      
      // Update lines
      const linePositions = [];
      const threshold = 3.5; // Distance threshold to draw a line
      
      // Get mouse world pos
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(mousePlane, mouseWorld);
      
      for(let i = 0; i < particleCount; i++) {
        // Connect to mouse spotlight
        const mDx = posArray[i * 3] - mouseWorld.x;
        const mDy = posArray[i * 3 + 1] - mouseWorld.y;
        const mDz = posArray[i * 3 + 2] - mouseWorld.z;
        const mDistSq = mDx*mDx + mDy*mDy + mDz*mDz;
        if (mDistSq < 12.0) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            mouseWorld.x, mouseWorld.y, mouseWorld.z
          );
        }

        for(let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx*dx + dy*dy + dz*dz;
          
          if(distSq < threshold * threshold) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            );
          }
        }
      }
      linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
