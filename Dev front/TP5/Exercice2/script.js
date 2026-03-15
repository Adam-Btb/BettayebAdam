window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const ratio = scrollTop / (scrollHeight - clientHeight);
    document.body.style.backgroundColor = `rgb(${ratio * 255}, 0, 0)`;
});