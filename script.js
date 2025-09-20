// Enhanced Theme Management
        class ThemeManager {
            constructor() {
                this.theme = localStorage.getItem('theme') || 'dark';
                this.init();
            }

            init() {
                document.body.setAttribute('data-theme', this.theme);
                this.updateThemeIcon();
            }

            toggle() {
                this.theme = this.theme === 'dark' ? 'light' : 'dark';
                document.body.setAttribute('data-theme', this.theme);
                localStorage.setItem('theme', this.theme);
                this.updateThemeIcon();
                this.animateThemeTransition();
            }

            updateThemeIcon() {
                const icon = document.querySelector('#themeToggle i');
                icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            animateThemeTransition() {
                document.body.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            }
        }

        // Enhanced Audio Player
        class AudioPlayer {
            constructor() {
                this.audio = document.getElementById('audio');
                this.playBtn = document.getElementById('playBtn');
                this.progressBar = document.getElementById('progressBar');
                this.isPlaying = false;
                this.init();
            }

            init() {
                this.playBtn.addEventListener('click', () => this.togglePlay());
                this.audio.addEventListener('timeupdate', () => this.updateProgress());
                this.audio.addEventListener('ended', () => this.onEnded());
                this.audio.addEventListener('loadedmetadata', () => this.onLoaded());
            }

            togglePlay() {
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
            }

            play() {
                this.audio.play()
                    .then(() => {
                        this.isPlaying = true;
                        this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        this.playBtn.classList.add('playing');
                    })
                    .catch(console.error);
            }

            pause() {
                this.audio.pause();
                this.isPlaying = false;
                this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                this.playBtn.classList.remove('playing');
            }

            updateProgress() {
                if (this.audio.duration) {
                    const progress = (this.audio.currentTime / this.audio.duration) * 100;
                    this.progressBar.style.width = `${progress}%`;
                }
            }

            onEnded() {
                this.isPlaying = false;
                this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                this.playBtn.classList.remove('playing');
                this.progressBar.style.width = '0%';
            }

            onLoaded() {
                console.log('Audio loaded successfully');
            }
        }

        // Floating Images
        class FloatingImages {
            constructor() {
                this.container = document.getElementById('floatingImages');
                this.images = [
                    '/images/Mudathir.png',
          '/images/sheddy.png',
          '/images/zouzoua.png',
          '/images/zimbwe.png',
          '/images/ande_boyeli.png',
          '/images/ecua.png',
          '/images/kouma.png',
          '/images/doumbia.png',
          '/images/boyeli.png',
          '/images/conte.png',
          '/images/diarra.png',
          '/images/paccomezouzoua.png',
          '/images/pacomme.png',
          '/images/muda.png',
          '/images/muda_simu.png',
          '/images/max.png',
          '/images/captain.png',
          '/images/ki.png',
          '/images/baka.png',
          '/images/yahya.png',
          '/images/engineer.png',
          '/images/arafat.png',
          '/images/jersey.png',
          '/images/jerseys 2.png',
          '/images/job.png',
          '/images/m_husein.png',
          '/images/baller.png',
          '/images/djigui.png',
          '/images/me.png'

                ];
                this.init();
            }

            init() {
                this.createFloatingImages();
                this.animateImages();
            }

            createFloatingImages() {
                const imageCount = 7;
                for (let i = 0; i < imageCount; i++) {
                    const img = document.createElement('img');
                    img.className = 'floating-img';
                    img.src = this.images[i % this.images.length];
                    img.alt = 'Portfolio Image';

                    img.style.left = `${Math.random() * 90}%`;
                    img.style.top = `${Math.random() * 90}%`;
                    img.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                    img.style.animationDelay = `${Math.random() * 5}s`;

                    this.container.appendChild(img);
                }
            }

            animateImages() {
                const images = this.container.querySelectorAll('.floating-img');
                images.forEach((img, index) => {
                    this.animateImage(img, index);
                });
            }

            animateImage(img, index) {
                let x = parseFloat(img.style.left);
                let y = parseFloat(img.style.top);
                const xSpeed = (Math.random() - 0.5) * 0.2;
                const ySpeed = (Math.random() - 0.5) * 0.2;

                const animate = () => {
                    x += xSpeed;
                    y += ySpeed;

                    if (x < 0 || x > 85) x = Math.max(0, Math.min(85, x));
                    if (y < 0 || y > 85) y = Math.max(0, Math.min(85, y));

                    img.style.left = `${x}%`;
                    img.style.top = `${y}%`;

                    requestAnimationFrame(animate);
                };

                setTimeout(() => animate(), index * 100);
            }
        }

        // Scroll Progress Indicator
        class ScrollProgress {
            constructor() {
                this.progressBar = document.getElementById('scrollProgress');
                this.init();
            }

            init() {
                window.addEventListener('scroll', () => this.updateProgress());
            }

            updateProgress() {
                const scrolled = window.pageYOffset;
                const maxHeight = document.body.scrollHeight - window.innerHeight;
                const progress = (scrolled / maxHeight) * 100;
                this.progressBar.style.width = `${Math.min(progress, 100)}%`;
            }
        }

        // Navbar Behavior
        class NavbarManager {
            constructor() {
                this.navbar = document.getElementById('navbar');
                this.lastScrollY = window.pageYOffset;
                this.init();
            }

            init() {
                window.addEventListener('scroll', () => this.handleScroll());
                this.setActiveNavItem();
            }

            handleScroll() {
                const currentScrollY = window.pageYOffset;

                if (currentScrollY > 100) {
                    this.navbar.style.background = 'var(--glass-bg)';
                    this.navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    this.navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                }

                this.lastScrollY = currentScrollY;
            }

            setActiveNavItem() {
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        navItems.forEach(nav => nav.classList.remove('active'));
                        item.classList.add('active');
                    });
                });
            }
        }

        // Loading Manager
        class LoadingManager {
            constructor() {
                this.overlay = document.getElementById('loadingOverlay');
                this.init();
            }

            init() {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        this.hideLoading();
                    }, 1500);
                });
            }

            hideLoading() {
                this.overlay.style.opacity = '0';
                setTimeout(() => {
                    this.overlay.style.display = 'none';
                }, 500);
            }
        }

        // Performance Optimization
        class PerformanceOptimizer {
            constructor() {
                this.init();
            }

            init() {
                // Lazy load images
                this.lazyLoadImages();

                // Debounce resize events
                window.addEventListener('resize', this.debounce(this.handleResize, 250));
            }

            lazyLoadImages() {
                const images = document.querySelectorAll('img[data-src]');
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }

            debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }

            handleResize() {
                // Handle responsive adjustments
                console.log('Window resized');
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize all systems
            const themeManager = new ThemeManager();
            const audioPlayer = new AudioPlayer();
            const floatingImages = new FloatingImages();
            const scrollProgress = new ScrollProgress();
            const navbarManager = new NavbarManager();
            const loadingManager = new LoadingManager();
            const performanceOptimizer = new PerformanceOptimizer();

            // Theme toggle event
            document.getElementById('themeToggle').addEventListener('click', () => {
                themeManager.toggle();
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Enhanced button interactions
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.02)';
                });

                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Social links hover effects
            document.querySelectorAll('.social-link').forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
                });

                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                });
            });

            console.log('🚀 Enhanced Portfolio Loaded Successfully!');
        });







        document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });
});