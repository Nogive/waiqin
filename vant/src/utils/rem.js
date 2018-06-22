(function(d, w) {
  const doc = d.documentElement;
  function rem() {
    const width = Math.min(doc.getBoundingClientRect().width, 768);
    if (width < 768) {
      doc.style.fontSize = width / 24 + "px";
    } else {
      doc.style.fontSize = width / 36 + "px";
    }
  }
  rem();
  w.addEventListener("resize", rem);
})(document, window);
