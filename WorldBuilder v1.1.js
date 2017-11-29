/*/
 *#######################################################################
 *WorldBuilder v1.1
 *Copyright (C) 2017 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
class WorldBuilder {
	constructor (width = window.innerWidth, height = window.innerHeight) {
		this.width = width,
		this.height = height;

		let ctx = this.ctx = new THREE.WebGLRenderer({ antialias: true });
			ctx.setSize(width, height);

			document.body.appendChild(ctx.domElement);
	}
}