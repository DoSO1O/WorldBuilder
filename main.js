let base = new WorldBuilder(10, 10, 10);

window.addEventListener("keydown", (event) => {
	switch (event.keyCode) {
		default:
			console.log(event.keyCode);
			break;

		case 65:
			base.camera.rotateY(Math.PI / 180);
			break;

		case 87:
			base.camera.rotateX(Math.PI / 180);
			break;

		case 68:
			base.camera.rotateY(-Math.PI / 180);
			break;

		case 83:
			base.camera.rotateX(-Math.PI / 180);
			break;
	}
});