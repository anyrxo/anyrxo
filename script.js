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
