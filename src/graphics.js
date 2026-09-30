import * as THREE from 'three';

export function initGraphics() {
  // Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.8)');
    document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

    // Event delegation for interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .btn, [data-event-id], .event-card, .filter-pill')) {
        cursor.classList.add('active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .btn, [data-event-id], .event-card, .filter-pill')) {
        cursor.classList.remove('active');
      }
    });
  }

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
    const particleCount = 250;
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
    const particlesMat = new THREE.PointsMaterial({ color: 0x00ffcc, size: 0.08, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    const linesGeo = new THREE.BufferGeometry();
    const linesMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    group.add(linesMesh);

    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    });

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.05;
      group.rotation.x += (mouseY * 0.5 - group.rotation.x) * 0.05;
      
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
      const threshold = 3.0; // Distance threshold to draw a line
      
      for(let i = 0; i < particleCount; i++) {
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
      
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
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
