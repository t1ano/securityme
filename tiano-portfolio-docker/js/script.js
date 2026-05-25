(() => {
      const root = document.documentElement;
      const toggle = document.querySelector('[data-theme-toggle]');
      let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', currentTheme);
      const updateThemeIcon = () => {
        toggle.innerHTML = currentTheme === 'dark'
          ? '<i class="fa-regular fa-sun"></i>'
          : '<i class="fa-regular fa-moon"></i>';
        toggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      };
      updateThemeIcon();
      toggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
      });

      const menuToggle = document.getElementById('menuToggle');
      const siteNav = document.getElementById('siteNav');
      menuToggle?.addEventListener('click', () => {
        const open = siteNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(open));
      });
      siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
      }));

      const roles = ['Cyber Security Enthusiast', 'Network Engineer', 'SOC Analyst Learner'];
      const typingText = document.getElementById('typingText');
      let roleIndex = 0, charIndex = 0, deleting = false;
      function typeRole() {
        const current = roles[roleIndex];
        typingText.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
        let speed = deleting ? 45 : 85;
        if (!deleting && charIndex === current.length + 1) {
          deleting = true; speed = 1400;
        } else if (deleting && charIndex < 0) {
          deleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 300;
        }
        setTimeout(typeRole, speed);
      }
      typeRole();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

      const contactForm = document.getElementById('contactForm');
      const formStatus = document.getElementById('formStatus');
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.textContent = 'Encrypted message queued successfully. Replace this demo handler with Formspree, Netlify Forms, or your backend API.';
        contactForm.reset();
      });

      const loadingScreen = document.getElementById('loadingScreen');
      window.addEventListener('load', () => {
        setTimeout(() => loadingScreen.classList.add('hidden'), 2200);
      });

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cursorDot = document.getElementById('cursorDot');
      const cursorRing = document.getElementById('cursorRing');
      if (!reduceMotion && window.innerWidth > 820) {
        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let ringX = mouseX, ringY = mouseY;
        const hoverTargets = 'a, button, input, textarea, .skill-card, .project-card, .contact-link';
        window.addEventListener('pointermove', (e) => {
          mouseX = e.clientX; mouseY = e.clientY;
          cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
          document.body.style.setProperty('--cursor-x', `${mouseX}px`);
          document.body.style.setProperty('--cursor-y', `${mouseY}px`);
        });
        document.querySelectorAll(hoverTargets).forEach(el => {
          el.addEventListener('mouseenter', () => { cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; cursorRing.style.borderColor = 'rgba(139, 92, 246, 0.65)'; });
          el.addEventListener('mouseleave', () => { cursorRing.style.width = '34px'; cursorRing.style.height = '34px'; cursorRing.style.borderColor = 'rgba(54, 209, 255, 0.45)'; });
        });
        const animateRing = () => {
          ringX += (mouseX - ringX) * 0.16;
          ringY += (mouseY - ringY) * 0.16;
          cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
          requestAnimationFrame(animateRing);
        };
        animateRing();
      }

      function setupParticles() {
        const canvas = document.getElementById('particlesCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resize = () => {
          canvas.width = innerWidth * devicePixelRatio;
          canvas.height = innerHeight * devicePixelRatio;
          canvas.style.width = innerWidth + 'px';
          canvas.style.height = innerHeight + 'px';
          ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
          particles = Array.from({ length: innerWidth < 700 ? 26 : 48 }, () => ({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            r: Math.random() * 2 + .6,
            vx: (Math.random() - .5) * .35,
            vy: (Math.random() - .5) * .35,
          }));
        };
        resize();
        addEventListener('resize', resize);
        const render = () => {
          ctx.clearRect(0, 0, innerWidth, innerHeight);
          for (const p of particles) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(91, 214, 255, 0.8)';
            ctx.shadowBlur = 14;
            ctx.shadowColor = 'rgba(54,209,255,0.6)';
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const a = particles[i], b = particles[j];
              const dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy);
              if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(86, 180, 255, ${0.16 - dist / 900})`;
                ctx.lineWidth = 1;
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
          requestAnimationFrame(render);
        };
        render();
      }

      function setupMatrix() {
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');
        const chars = '01<>[]{}#*+-=/';
        let columns = [], fontSize = 14;
        const resize = () => {
          canvas.width = innerWidth * devicePixelRatio;
          canvas.height = innerHeight * devicePixelRatio;
          canvas.style.width = innerWidth + 'px';
          canvas.style.height = innerHeight + 'px';
          ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
          const count = Math.floor(innerWidth / fontSize);
          columns = Array.from({ length: count }, () => Math.random() * -50);
        };
        resize();
        addEventListener('resize', resize);
        const draw = () => {
          ctx.fillStyle = 'rgba(4, 7, 13, 0.06)';
          ctx.fillRect(0, 0, innerWidth, innerHeight);
          ctx.fillStyle = 'rgba(86, 255, 176, 0.58)';
          ctx.font = `${fontSize}px monospace`;
          columns.forEach((y, index) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = index * fontSize;
            ctx.fillText(text, x, y * fontSize);
            columns[index] = y * fontSize > innerHeight && Math.random() > 0.985 ? 0 : y + 1;
          });
          requestAnimationFrame(draw);
        };
        draw();
      }

      if (!reduceMotion) {
        setupParticles();
        setupMatrix();
      }
    })();
