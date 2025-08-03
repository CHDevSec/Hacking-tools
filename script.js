// Matrix Effect
class MatrixEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 12;
        this.columns = 0;
        this.drops = [];

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Fade In Observer
class FadeInObserver {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.init();
    }

    init() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => this.observer.observe(el));
    }
}

// Video Modal Handler
class VideoModal {
    constructor() {
        this.modal = document.getElementById('video-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalVideo = document.getElementById('modal-video');
        this.modalDescription = document.getElementById('modal-description');
        this.closeBtn = document.querySelector('.modal-close');

        this.videos = {
            shadowport: {
                title: 'ShadowPort - Scanner de Portas Avançado',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pela URL real
                description: 'Veja como usar o ShadowPort para identificar portas abertas, serviços e vulnerabilidades em sistemas remotos.'
            },
            dirbusterpro: {
                title: 'DirBusterPro - Directory Buster Profissional',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pela URL real
                description: 'Demonstração do DirBusterPro para descoberta de diretórios e arquivos ocultos em servidores web.'
            },
            breachhunter: {
                title: 'BreachHunter - Caçador de Vazamentos',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pela URL real
                description: 'Aprenda a usar o BreachHunter para monitorar breaches em tempo real e analisar dados expostos.'
            },
            reconpro: {
                title: 'Recon Pro v2.0 - Framework de Automação',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pela URL real
                description: 'Veja como o Recon Pro v2.0 automatiza reconnaissance integrando múltiplas ferramentas OSINT.'
            },
            reconbasic: {
                title: 'recon_basic - Reconnaissance Básico',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pela URL real
                description: 'Demonstração das funcionalidades básicas de reconnaissance com recon_basic.'
            },
            tuxhacking: {
                title: 'Tux-Hacking - Framework Linux',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pela URL real
                description: 'Framework completo para hacking em ambientes Linux. Veja ferramentas de pentest e exploração Unix.'
            }
        };

        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(toolName) {
        const video = this.videos[toolName];
        if (video) {
            this.modalTitle.textContent = video.title;
            this.modalVideo.src = video.url;
            this.modalDescription.textContent = video.description;
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.modalVideo.src = '';
        document.body.style.overflow = 'auto';
    }
}

// Terminal Typing Effect
class TerminalTyping {
    constructor() {
        this.commands = [
            './shadowport --scan target.com',
            './dirbusterpro -u target.com',
            './reconpro --target example.com',
            './breachhunter --monitor domain',
            './reconbasic --enum target.com',
            './tux-hacking --scan network'
        ];
        this.currentCommandIndex = 0;
        this.init();
    }

    init() {
        const commandElement = document.querySelector('.terminal-line .command');
        if (commandElement) {
            setInterval(() => {
                this.typeCommand(commandElement);
            }, 5000);
        }
    }

    typeCommand(element) {
        const command = this.commands[this.currentCommandIndex];
        element.textContent = '';

        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += command[i];
            i++;

            if (i >= command.length) {
                clearInterval(typeInterval);
                this.currentCommandIndex = (this.currentCommandIndex + 1) % this.commands.length;
            }
        }, 100);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Stats Counter Animation
class StatsCounter {
    constructor() {
        this.init();
    }

    init() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPlus = target.includes('+');
        const isPercent = target.includes('%');
        const isK = target.includes('K');
        const isSlash = target.includes('/');
        
        if (isSlash) {
            // Para 24/7, não animar
            return;
        }
        
        let number = parseInt(target.replace(/[^\d]/g, ''));
        if (isK) number = number * 1000; // Para valores em K

        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isK) displayValue = Math.floor(displayValue / 1000) + 'K';
            else {
                if (isPlus) displayValue += '+';
                if (isPercent) displayValue += '%';
            }
            
            element.textContent = displayValue;
        }, 40);
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 0, 0.2)';
            } else {
                this.navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Tool Card Hover Effects
class ToolCardEffects {
    constructor() {
        this.init();
    }

    init() {
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
        });
    }

    addGlowEffect(card) {
        const icon = card.querySelector('.tool-icon');
        const title = card.querySelector('.tool-info h3');
        
        if (icon) {
            icon.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
        }
        
        if (title) {
            title.style.textShadow = '0 0 10px var(--accent-bright-green)';
        }
    }

    removeGlowEffect(card) {
        const icon = card.querySelector('.tool-icon');
        const title = card.querySelector('.tool-info h3');
        
        if (icon) {
            icon.style.boxShadow = '';
        }
        
        if (title) {
            title.style.textShadow = '0 0 5px var(--accent-bright-green)';
        }
    }
}

// Button Click Effects
class ButtonEffects {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        // Add ripple animation keyframes if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Global function for opening video modal (called from HTML)
function openVideoModal(toolName) {
    if (window.videoModal) {
        window.videoModal.openModal(toolName);
    }
}

// Console ASCII Art
function showConsoleArt() {
    console.log(`
    ██████╗██╗  ██╗██████╗ ███████╗██╗   ██╗███████╗███████╗ ██████╗
    ██╔════╝██║  ██║██╔══██╗██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝
    ██║     ███████║██║  ██║█████╗  ██║   ██║███████╗█████╗  ██║     
    ██║     ██╔══██║██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║██╔══╝  ██║     
    ╚██████╗██║  ██║██████╔╝███████╗ ╚████╔╝ ███████║███████╗╚██████╗
     ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝
    `);
    console.log('🔥 CHDEVSEC Hacking Tools Landing Page Loaded! 🔥');
    console.log('💀 Ready to hack the world ethically! 💀');
    console.log('🚀 Developed with love for the cybersecurity community 🚀');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show console art
    showConsoleArt();

    // Initialize Matrix effect
    new MatrixEffect('matrix-canvas');

    // Initialize fade-in animations
    new FadeInObserver();

    // Initialize video modal
    window.videoModal = new VideoModal();

    // Initialize terminal typing effect
    new TerminalTyping();

    // Initialize smooth scrolling
    new SmoothScroll();

    // Initialize stats counter
    new StatsCounter();

    // Initialize navbar scroll effect
    new NavbarScroll();

    // Initialize tool card effects
    new ToolCardEffects();

    // Initialize button effects
    new ButtonEffects();

    console.log('✅ All systems initialized successfully!');
});