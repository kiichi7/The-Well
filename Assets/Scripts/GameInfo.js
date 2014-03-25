#pragma strict
static var GameSystem : GameObject;
static var thePlayer : GameObject;
static var theCamera : Camera;
static var playerPos : Vector3;
static var cameraPos : Vector3;
static var qualityDis : float;

static var isRaining : boolean = false;
private var changeTimer : float = -5.0;

static var theSpeed : float;
static var PCDis : float;
static var lastWalkState : float;
static var lastMoveState : float;

static var chaosLineValue : float;
static var chaosValue : float;
private var lastChaosValue : float;
private var absorptionCoefficient : float = 0.25;
private var conversionCoefficient : float = 1.005;

static var canControl : boolean = false;

static var SameAsPlayerValue : float;
//static var StareAtCamera : float;

function Awake () {
	
	GameSystem = gameObject;
	thePlayer = GameObject.Find("Player");
	
}

function Update () {

	SameAsPlayerValue = Camera.main.transform.eulerAngles.y + 180;

	if (chaosLineValue < 15) chaosLineValue -= 1.5*absorptionCoefficient*Time.deltaTime;
	else chaosLineValue -= 2.5*absorptionCoefficient*Time.deltaTime;
	chaosLineValue = Mathf.Clamp(chaosLineValue,0,100);
	chaosValue = 1.0 - 1.0/Mathf.Pow(conversionCoefficient,Mathf.Pow(chaosLineValue,2.0));
	//print("混乱判定" + chaosLineValue + " " + chaosValue);
	if (Time.time > (changeTimer + 5)) {
		if ((chaosValue > 0.4)&&(lastChaosValue < 0.4)) {
			isRaining = !isRaining;
			changeTimer = Time.time;
		}
	}
	
	lastChaosValue = chaosValue;

	if (theCamera == null) theCamera = Camera.main;
	if (thePlayer == null) thePlayer = gameObject;
	
	//if (Input.GetKeyDown(KeyCode.Alpha5)) isRaining = true;
	//if (Input.GetKeyDown(KeyCode.Alpha6)) isRaining = false;
	
	playerPos = thePlayer.transform.position;
	cameraPos = theCamera.transform.position;
	
	if (isRaining) {
		theSpeed += 2 * Time.deltaTime;
	}
	else {
		theSpeed -= 2 * Time.deltaTime;
	}
	theSpeed = Mathf.Clamp(theSpeed,0,5);
	
	//print(GetPetalSpeed () + " " + GetRainSpeed ());

}

static function GetPetalSpeed () {

	var v : float;
	v = 5 - theSpeed;
	if (Time.deltaTime> 0.03) v *= Mathf.Pow((0.03/Time.deltaTime),3);
	return v;

}

static function GetRainSpeed () {

	var v : float;
	v = 4 * theSpeed * (chaosValue - 0.45);
	if (Time.deltaTime> 0.03) v *= Mathf.Pow((0.03/Time.deltaTime),3);
	else if ((v < 0.5)&&(isRaining)) v = 0.5;
	return v;
	
}

static function PlayerDis (xValue : float, zValue : float) {

	return(Vector2.Distance(Vector2(xValue, zValue), Vector2(playerPos.x, playerPos.z)));

}

static function CameraDis (xValue : float, zValue : float) {

	return(Vector2.Distance(Vector2(xValue, zValue), Vector2(cameraPos.x, cameraPos.z)));

}

static function OnWalk (theValue : float) {
	if ((theValue*lastWalkState)<0) {
		chaosLineValue ++;
	}
	if (theValue!=0) lastWalkState = theValue;
}

static function OnMove (theValue : float) {
	if ((lastMoveState!=0)&&((theValue*lastMoveState)<=0)) {
		chaosLineValue ++;
	}
	lastMoveState = theValue;
}
