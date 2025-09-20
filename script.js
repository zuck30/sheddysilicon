

      (function() {
        // Theme functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMobileMenu = document.getElementById('closeMobileMenu');

        // Audio player functionality
        const audioPlayButton = document.getElementById('audioPlayButton');
        const audioProgressBar = document.getElementById('audioProgressBar');
        const audioTitle = document.getElementById('audioTitle');
        const backgroundAudio = document.getElementById('backgroundAudio');

        // Theme functions
        const getStoredTheme = () => localStorage.getItem('theme') || 'dark';
        const setStoredTheme = theme => localStorage.setItem('theme', theme);

        const getSystemTheme = () =>
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        const applyTheme = theme => {
          body.setAttribute('data-theme', theme);
          themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        };

        const toggleTheme = () => {
          const currentTheme = body.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          applyTheme(newTheme);
          setStoredTheme(newTheme);
        };

        // Initialize theme
        const initialTheme = getStoredTheme();
        applyTheme(initialTheme);

        // Audio player functions
        let isPlaying = false;
        
        const updatePlayButton = () => {
          const icon = audioPlayButton.querySelector('i');
          icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        };

        const updateProgress = () => {
          if (backgroundAudio.duration) {
            const progress = (backgroundAudio.currentTime / backgroundAudio.duration) * 100;
            audioProgressBar.style.width = progress + '%';
          }
        };

        const toggleAudio = () => {
          if (isPlaying) {
            backgroundAudio.pause();
          } else {
            backgroundAudio.play().catch(e => {
              console.log('Audio play failed:', e);
              // Fallback for browsers that require user interaction
            });
          }
        };

        // Mobile menu functions
        const openMobileMenu = () => {
          mobileMenu.style.transform = 'translateX(0)';
          document.body.style.overflow = 'hidden';
        };

        const closeMobileMenuFunc = () => {
          mobileMenu.style.transform = 'translateX(-100%)';
          document.body.style.overflow = '';
        };

        // Event Listeners
        themeToggle.addEventListener('click', toggleTheme);
        
        // Mobile menu events
        mobileMenuToggle.addEventListener('click', openMobileMenu);
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
          if (e.target === mobileMenu) {
            closeMobileMenuFunc();
          }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', closeMobileMenuFunc);
        });

        // Audio player events
        audioPlayButton.addEventListener('click', toggleAudio);

        backgroundAudio.addEventListener('play', () => {
          isPlaying = true;
          updatePlayButton();
        });

        backgroundAudio.addEventListener('pause', () => {
          isPlaying = false;
          updatePlayButton();
        });

        backgroundAudio.addEventListener('ended', () => {
          isPlaying = false;
          updatePlayButton();
          audioProgressBar.style.width = '0%';
        });

        backgroundAudio.addEventListener('timeupdate', updateProgress);

        backgroundAudio.addEventListener('loadedmetadata', () => {
          // Update audio title when metadata loads
          audioTitle.textContent = 'My Little Journey'; // Update with actual title
        });

        // System theme change listener
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
          // Escape to close mobile menu
          if (e.key === 'Escape' && mobileMenu.style.transform === 'translateX(0px)') {
            closeMobileMenuFunc();
          }
          
          // Space to toggle audio (when not focused on other interactive elements)
          if (e.key === ' ' && !['INPUT', 'BUTTON', 'A'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            toggleAudio();
          }
        });

      })();
