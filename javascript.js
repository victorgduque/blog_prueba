document.addEventListener('DOMContentLoaded', () => {
    const imgs = Array.from(document.querySelectorAll('img#fotog'));
    if (imgs.length === 0) return;

    // Crear un contenedor para apilar las imágenes
    const wrapper = document.createElement('div');
    wrapper.id = 'gallery-wrapper';
    const firstImg = imgs[0];
    firstImg.parentNode.insertBefore(wrapper, firstImg);
    imgs.forEach(img => wrapper.appendChild(img));

    // Estilos básicos del contenedor y las imágenes
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'inline-block';

    imgs.forEach((img, i) => {
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.transition = 'opacity 600ms ease';
        img.style.opacity = i === 0 ? '1' : '0';
        img.style.pointerEvents = 'none';
    });

    // Ajustar tamaño del contenedor según la primera imagen cuando cargue
    function setWrapperSize() {
        const w = firstImg.naturalWidth || firstImg.width;
        const h = firstImg.naturalHeight || firstImg.height;
        if (w && h) {
            wrapper.style.width = w + 'px';
            wrapper.style.height = h + 'px';
        }
    }
    if (firstImg.complete) setWrapperSize(); else firstImg.addEventListener('load', setWrapperSize);

    // Lógica del slideshow
    let current = 0;
    let intervalId = null;
    const changeTo = (next) => {
        imgs[current].style.opacity = '0';
        imgs[next].style.opacity = '1';
        current = next;
    };
    const start = () => {
        if (intervalId) return;
        intervalId = setInterval(() => {
            const next = (current + 1) % imgs.length;
            changeTo(next);
        }, 3000);
    };
    const stop = () => {
        clearInterval(intervalId);
        intervalId = null;
    };

    // Pausar al pasar el ratón y reanudar al salir
    wrapper.addEventListener('mouseenter', stop);
    wrapper.addEventListener('mouseleave', start);

    start();
});