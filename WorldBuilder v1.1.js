/*/
 *#######################################################################
 *WorldBuilder v1.1
 *Copyright (C) 2017 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
class WorldBuilder {
	static get Block () {
		return class Block extends THREE.Mesh {
			static get SIZE () {
				return { X: 16, Y: 16, Z: 16 }
			}


			
			constructor () {
				super(new THREE.BoxGeometry(Block.SIZE.X, Block.SIZE.Y, Block.SIZE.Z), []);
			}

			//x++ / x-- / y++ / y-- / z++ / z--
			get top () { return this._top }
			set top (texture = "") {
				this._top = new THREE.TextureLoader().load(texture);
				this.material[0] = new THREE.MeshStandardMaterial({ map: this._top });
			}

			get bottom () { return this._bottom }
			set bottom (texture = "") {
				this._bottom = new THREE.TextureLoader().load(texture);
				this.material[1] = new THREE.MeshStandardMaterial({ map: this._bottom });
			}

			get forward () { return this._forward }
			set forward (texture = "") {
				this._forward = new THREE.TextureLoader().load(texture);
				this.material[2] = new THREE.MeshStandardMaterial({ map: this._forward });
			}

			get back () { return this._back }
			set back (texture = "") {
				this._back = new THREE.TextureLoader().load(texture);
				this.material[3] = new THREE.MeshStandardMaterial({ map: this._back });
			}

			get left () { return this._left }
			set left (texture = "") {
				this._left = new THREE.TextureLoader().load(texture);
				this.material[4] = new THREE.MeshStandardMaterial({ map: this._left });
			}

			get right () { return this._right }
			set right (texture = "") {
				this._right = new THREE.TextureLoader().load(texture);
				this.material[5] = new THREE.MeshStandardMaterial({ map: this._right });
			}
		}
	}

	static get Blocks () {
		return {
			Grass: class Grass extends WorldBuilder.Block {
				constructor () {
					super();

					super.forward = "assets/images/blocks/Grass/top.png",
					super.back = "assets/images/blocks/Grass/bottom.png";
					super.top = super.bottom = super.left = super.right = "assets/images/blocks/Grass/side.png";
				}
			},

			KasuteraBlock: class KasuteraBlock extends WorldBuilder.Block {
				constructor () {
					super();

					super.forward = "assets/images/blocks/KasuteraBlock/top.png"
				}
			}
		}
	}



	constructor (x = 0, y = 0, z = 0) {
		this.x = x,
		this.y = y,
		this.z = z;

		let width = WorldBuilder.Block.SIZE.X * x,
			height = WorldBuilder.Block.SIZE.Y * y,
			depth = WorldBuilder.Block.SIZE.Z * z;

		let ctx = this.ctx = new THREE.WebGLRenderer({ antialias: true });
			ctx.setSize(DOM.width, DOM.height);

			document.body.appendChild(ctx.domElement);

		let scene = this.scene = new THREE.Scene();
			scene.add(new THREE.AmbientLight(0xFFFFFF));

		let camera = this.camera = new THREE.PerspectiveCamera(50, DOM.width / DOM.height, 0.1, 1000000);
			camera.position.set(0, WorldBuilder.Block.SIZE.Y * 2, 0);
			camera.lookAt(width, WorldBuilder.Block.SIZE.Y * 2, depth);
			
			new THREE.OrbitControls(camera);

		let axesHelper = new THREE.AxesHelper(width);
			scene.add(axesHelper);

		let sun = this.sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load("assets/images/sun.png") }));
			sun.position.set(width / 2, height / 2, depth / 2);
			scene.add(sun);

		let sunLight = this.sunLight = new THREE.DirectionalLight(0xFFCCCC);
			sunLight.position.set(width / 2, height / 2, depth / 2);

			scene.add(sunLight);

		for (let mx = 0; mx < x; mx++) {
			for (let mz = 0; mz < z; mz++) {
				let ground = new WorldBuilder.Blocks.Grass();
					ground.position.set(WorldBuilder.Block.SIZE.X * 0.5 + WorldBuilder.Block.SIZE.X * mx, -WorldBuilder.Block.SIZE.Y * 0.5, WorldBuilder.Block.SIZE.Z * 0.5 + WorldBuilder.Block.SIZE.Z * mz);

					scene.add(ground);
			}
		}

		requestAnimationFrame(function looper () {
			ctx.render(scene, camera);

			requestAnimationFrame(looper);
		});
	}
}