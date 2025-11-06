// Fade in animation on load
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.link-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Smooth hover effects
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});
