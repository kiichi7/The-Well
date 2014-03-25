#pragma strict
var k : float = 0.9;
var o : float = 0.618;
var isPositive : boolean = true;

function Start () {

	guiTexture.color.a = 0;

}

function LateUpdate () {

	if (GameState.gameState == 0) {
		if (guiTexture.color.a < 1) guiTexture.color.a += 0.15*Time.deltaTime;
		else guiTexture.color.a = 1;
	}
	else {
		if (guiTexture.color.a > 0) guiTexture.color.a -= 0.25*Time.deltaTime;
		else guiTexture.color.a = 0;
	}
	var a : float;
	a = guiTexture.color.a;
	guiTexture.color = Color.white - AmbientLight.ambientLight;
	guiTexture.color.a = a;
	var height : float;
	height = GameInfo.theCamera.pixelRect.height;
	var xPos : float;
	if (isPositive) xPos = GameInfo.theCamera.pixelRect.width*o - 0.5*height * k;
	else xPos = GameInfo.theCamera.pixelRect.width*(1-o) - 0.5*height * k;
	guiTexture.pixelInset = Rect (xPos, 0.5*(1-k)*height, height * k, height * k);


}