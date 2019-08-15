function start(){
  anime({
    targets: '.far',
    rotateZ: '-30deg',
    easing: 'easeOutElastic',
    duration: 2000,
    delay: anime.stagger(200, {easing: 'easeOutQuad'})
  });
}
