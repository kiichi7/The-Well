#pragma strict
var poem : GUITexture;
var texture : Texture2D[];
private var timer : float;
private var i : int;
private var k : float = 0.9;
private var o : float = 0.8;

function Start () {

	timer = 100;
	for (i = 0; i<4; i++) poem.color.a = 0;

}

function Update () {

	if (GameState.gameState != 0) {
	
		timer += Time.deltaTime;
		if ((timer < 25)&&(timer > 5))  {
			if (poem.color.a < 0.5) poem.color.a += 0.15*Time.deltaTime; 
			else poem.color.a = 0.5;
		}
		else if (timer < 35) {
			if (poem.color.a > 0) poem.color.a -= 0.25*Time.deltaTime; 
			else poem.color.a = 0;
		}
		else if (timer > 40){
			timer = 0;
			i = (i + Random.Range(1,4))%4;
			poem.guiTexture.texture = texture[i];
			var height : float;
			height = GameInfo.theCamera.pixelRect.height;
			var xPos : float;
			if (GameInfo.thePlayer.GetComponent(PlayerOutput).GetWalkDirection()) xPos = GameInfo.theCamera.pixelRect.width*o - 0.5*height * k;
			else xPos = GameInfo.theCamera.pixelRect.width*(1-o) - 0.5*height * k;
			poem.pixelInset = Rect (xPos, 0.5*(1-k)*height, height * k, height * k);
		}
		
		var a : float;
		a = poem.color.a;
		poem.color = Color.white - AmbientLight.ambientLight;
		poem.color.a = a;
		
	}

}
