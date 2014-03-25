#pragma strict
var sameAsSky : boolean = false;
var isMeshFade : boolean = false;
var isDarkUnseen : boolean = false;

function Start () {

}

function Update () {

	//var theColor = AmbientLight.ambientLight;
	if (AmbientLight.isAmbientLightChanging) {
		if ((isDarkUnseen)&&(!isMeshFade)) {
			renderer.material.color.a = (AmbientLight.ambientLight.r+AmbientLight.ambientLight.g+AmbientLight.ambientLight.b)/3;
		}
		
		if (isMeshFade) {
				if (sameAsSky) {
					GetComponent(ColorChange).SetColor(AmbientLight.ambientLight);
				}
				else {
					GetComponent(ColorChange).SetColor(Color.white - AmbientLight.ambientLight);
				}
		}
		else {
			if (sameAsSky) {
				renderer.material.color.r = AmbientLight.ambientLight.r;
				renderer.material.color.g = AmbientLight.ambientLight.g;
				renderer.material.color.b = AmbientLight.ambientLight.b;
			}
			else {
				renderer.material.color.r = 1.0 - AmbientLight.ambientLight.r;
				renderer.material.color.g = 1.0 - AmbientLight.ambientLight.g;
				renderer.material.color.b = 1.0 - AmbientLight.ambientLight.b;
			}
		}
	}

}