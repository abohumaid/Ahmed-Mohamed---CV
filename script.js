document.addEventListener('DOMContentLoaded', () => {
    // Add reveal animations on scroll
    const sections = document.querySelectorAll('.section, .sidebar section');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Global function for PDF download
    window.downloadPDF = function () {
        const element = document.querySelector('.cv-container');
        const opt = {
            margin: [0, 0, 0, 0],
            filename: 'Ahmed_Mohamed_Ahmed_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Button feedback
        const btn = document.querySelector('.print-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            btn.innerHTML = originalText;
            btn.disabled = false;
            // Fallback to print
            window.print();
        });
    };

    // Log for verification
    console.log('CV Scripts Loaded Successfully');
});
