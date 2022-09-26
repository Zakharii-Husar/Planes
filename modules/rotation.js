const rotationFunction = (object) => {
    const rad = object.degrees * (Math.PI / 180);
    object.dx = Math.cos(rad);
    object.dy = Math.sin(rad);
}


export default rotationFunction;