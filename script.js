// Fade in animation on load
document.addEventListener('DOMContentLoaded', () => {
    // Animate link cards with stagger
    const elements = document.querySelectorAll('.link-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 400 + (index * 80));
    });

    // Add parallax effect on scroll for banner (desktop only)
    if (window.innerWidth > 768) {
        const banner = document.getElementById('banner-img');
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.5;
                    if (banner) {
                        banner.style.transform = `translateY(${rate}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Magnetic effect on CTA buttons (desktop only)
    if (window.innerWidth > 768) {
        document.querySelectorAll('.link-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                card.style.transform = `translateY(-4px) rotateX(${deltaY * -2}deg) rotateY(${deltaX * 2}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }
});

// Share functionality
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Anyro - AI Automation Expert',
            text: 'I help build and scale businesses through AI automation, content creation, and strategic growth',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    });
}

// Anti-Scraping & Design Protection
(function() {
    'use strict';

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable text selection on key elements (but allow on body for accessibility)
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName === 'IMG' ||
            e.target.classList.contains('link-card') ||
            e.target.classList.contains('profile')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable common keyboard shortcuts for copying/saving
    document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (DevTools)
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+C on images and styled elements
        if (e.ctrlKey && e.keyCode === 67) {
            const selection = window.getSelection();
            if (selection && selection.toString().length > 100) {
                e.preventDefault();
                return false;
            }
        }
    });

    // Detect DevTools opening
    const devtools = {
        isOpen: false,
        orientation: null
    };

    const threshold = 160;
    const emitEvent = (isOpen, orientation) => {
        if (devtools.isOpen !== isOpen || devtools.orientation !== orientation) {
            devtools.isOpen = isOpen;
            devtools.orientation = orientation;
            if (isOpen) {
                // Optionally blur or redirect when devtools detected
                console.clear();
                document.body.style.filter = 'blur(5px)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 100);
            }
        }
    };

    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
            emitEvent(true, orientation);
        } else {
            emitEvent(false, null);
        }
    }, 500);

    // Prevent drag and drop of images
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Add watermark to copied text
    document.addEventListener('copy', (e) => {
        const selection = window.getSelection();
        if (selection.toString().length > 20) {
            e.clipboardData.setData('text/plain',
                selection.toString() + '\n\n---\nSource: anyrxo.com | © 2026 Anyro - All Rights Reserved'
            );
            e.preventDefault();
        }
    });

    // Detect automated tools and bots
    const detectBot = () => {
        const botPatterns = [
            /bot/i, /crawl/i, /spider/i, /scrape/i, /curl/i, /wget/i, /python/i,
            /phantom/i, /headless/i, /puppeteer/i, /selenium/i
        ];
        const userAgent = navigator.userAgent.toLowerCase();

        for (let pattern of botPatterns) {
            if (pattern.test(userAgent)) {
                return true;
            }
        }

        // Check for headless browser
        if (navigator.webdriver) return true;
        if (!navigator.languages || navigator.languages.length === 0) return true;
        if (!/Chrome|Firefox|Safari|Edge/.test(navigator.userAgent)) return true;

        return false;
    };

    // Honeypot trap for scrapers
    const honeypot = document.createElement('div');
    honeypot.style.cssText = 'position:absolute;left:-9999px;opacity:0;pointer-events:none;';
    honeypot.innerHTML = '<a href="/admin" class="admin-link">Admin Panel</a><input type="email" name="email" />';
    document.body.appendChild(honeypot);

    // Monitor honeypot interaction
    honeypot.addEventListener('click', () => {
        console.warn('Honeypot triggered');
        // Optionally redirect or block
    });

    // Detect if bot or suspicious activity
    if (detectBot()) {
        // Add subtle indication without breaking functionality
        console.log('Automated access detected');
    }

    // Disable print screen (limited effectiveness but worth trying)
    window.addEventListener('beforeprint', (e) => {
        document.body.style.display = 'none';
    });

    window.addEventListener('afterprint', (e) => {
        document.body.style.display = 'block';
    });

    // Performance monitoring to detect scraping patterns
    let requestCount = 0;
    const requestWindow = 10000; // 10 seconds
    setInterval(() => {
        requestCount = 0;
    }, requestWindow);

    // Monitor rapid interactions (scraper behavior)
    let interactionCount = 0;
    document.addEventListener('click', () => {
        interactionCount++;
        if (interactionCount > 50) {
            console.warn('Suspicious activity detected');
        }
    });

    setInterval(() => {
        interactionCount = 0;
    }, 5000);

    // Add copyright notice to console
    console.log('%c⚠️ WARNING', 'color: #ff0000; font-size: 40px; font-weight: bold;');
    console.log('%cThis website and its design are protected by copyright.', 'font-size: 16px;');
    console.log('%c© 2026 Anyro - All Rights Reserved', 'font-size: 14px; color: #666;');
    console.log('%cUnauthorized copying, scraping, or reproduction is strictly prohibited.', 'font-size: 14px; color: #666;');
    console.log('%cViolators will be prosecuted to the fullest extent of the law.', 'font-size: 14px; font-weight: bold; color: #ff0000;');

})();
