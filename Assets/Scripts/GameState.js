//0表示开始中,1表示游戏中,2表示结束中
static var gameState : int;

function Awake () {

	gameState = 0;
	//AmbientLight.adjustLight = Color.white;

}

function Update () {

	switch (gameState) {
		case 0:
			if ((Input.anyKeyDown)&&(Time.time > 2.5)) gameState = 1;
			if (GetComponent(AmbientLight).targetAdjustLight.a > 0) {
				GetComponent(AmbientLight).targetAdjustLight.a -= 0.2*Time.deltaTime;
			}
		break;
		case 1:
			if (!audio.isPlaying) audio.Play();
			GameInfo.canControl = false;
			if (GetComponent(AmbientLight).targetAdjustLight.a <= 0.2) {
				GameInfo.canControl = true;
			}
			if (GetComponent(AmbientLight).targetAdjustLight.a >= 0) {
				GetComponent(AmbientLight).targetAdjustLight.a -= 0.2*Time.deltaTime;
			}
		break;
		case 2:
			GameInfo.canControl = false;
			GetComponent(AmbientLight).targetAdjustLight.a += 1.0*Time.deltaTime;
			if (GetComponent(AmbientLight).targetAdjustLight.a >= 1) gameState = 3;
		break;
		case 3:
			GameInfo.canControl = false;
			GetComponent(AmbientLight).targetAdjustLight.r = 0;
			GetComponent(AmbientLight).targetAdjustLight.g = 0;
			GetComponent(AmbientLight).targetAdjustLight.b = 0;
			
			GetComponent(AmbientLight).targetAdjustLight.a += 1.0*Time.deltaTime;
			audio.volume -= 0.2*Time.deltaTime;
			if ((GetComponent(AmbientLight).targetAdjustLight.a >= 1)&&(audio.volume < 0.1)) Application.Quit();
		break;
	}

}

static function GetEnd () {

	AmbientLight.targetAdjustLight = Color.black;
	AmbientLight.targetAdjustLight.a = 0;
	gameState = 2;

}