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
  if (container && window.THREE) {
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

    // Core Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(2, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.15 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner Shell
    const shellGeo = new THREE.IcosahedronGeometry(2.8, 2);
    const shellMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    const shellEdges = new THREE.EdgesGeometry(shellGeo);
    const shell = new THREE.LineSegments(shellEdges, shellMat);
    group.add(shell);

    // Data Rings
    const ringGroup = new THREE.Group();
    group.add(ringGroup);

    const createRing = (radius, tube, color, opacity, rotationSpeed) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const mat = new THREE.PointsMaterial({ color: color, size: 0.05, transparent: true, opacity: opacity });
      const points = new THREE.Points(geo, mat);
      points.userData = { rotationSpeed };
      ringGroup.add(points);
      return points;
    };

    createRing(4.5, 0.2, 0x00ffcc, 0.4, { x: 0.002, y: 0.005, z: 0.001 });
    createRing(5.5, 0.1, 0xffffff, 0.2, { x: -0.001, y: -0.003, z: 0.002 });
    createRing(6.5, 0.05, 0x00ffff, 0.15, { x: 0.003, y: 0.001, z: -0.002 });

    // Floating Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.03, color: 0xffffff, transparent: true, opacity: 0.3 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

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
      
      core.rotation.y = elapsedTime * 0.1;
      core.rotation.x = elapsedTime * 0.05;
      
      shell.rotation.y = elapsedTime * -0.08;
      shell.rotation.z = elapsedTime * 0.03;

      ringGroup.children.forEach(ring => {
        ring.rotation.x += ring.userData.rotationSpeed.x;
        ring.rotation.y += ring.userData.rotationSpeed.y;
        ring.rotation.z += ring.userData.rotationSpeed.z;
      });

      particles.rotation.y = elapsedTime * 0.02;

      targetX = mouseX * 2;
      targetY = mouseY * 2;
      
      group.rotation.y += (targetX - group.rotation.y) * 0.05;
      group.rotation.x += (targetY - group.rotation.x) * 0.05;
      
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
