#pragma strict
private var theFishOutput : FishOutput;
private var hits1 : RaycastHit[];
private var hits2 : RaycastHit[];
//输入各种参数
private var swimSpeed : float;
private var turnSpeed : float;
private var updownSpeed : float;
//鱼属性域
private var theSpeed : float;
private var originalSpeed : float;
private var theHeight : float;

private var isHeadFish : boolean = false;

function Awake () {

	theFishOutput = GetComponent(FishOutput);

}

function Update () {
	
	if ((renderer.isVisible)||(isHeadFish)) {
		swimSpeed += Random.Range(-0.2,0.2);
		turnSpeed += Random.Range(-5.0,5.0);
		updownSpeed += Random.Range(-0.1,0.1);
		if (((transform.position.y > -0.8*theHeight)&&(updownSpeed > 0))||((transform.position.y < -1.25*theHeight)&&(updownSpeed < 0))) updownSpeed = -updownSpeed;
		swimSpeed = Mathf.Clamp(swimSpeed, 0.8*theSpeed, 1.25*theSpeed);
		updownSpeed = Mathf.Clamp(updownSpeed, -0.1*theSpeed, 0.1*theSpeed);
	}
	if ((turnSpeed == 180)||(turnSpeed == -180)) turnSpeed = 0;
	
	var pnValue : float;
	pnValue = Mathf.Abs(turnSpeed)/turnSpeed;
	hits1 = Physics.RaycastAll(transform.position + 10*transform.TransformDirection(Vector3.right) - Vector3(0,2,0), Vector3(0,1,0), 1.8-transform.position.y);
	hits2 = Physics.RaycastAll(transform.position - 5*pnValue*transform.TransformDirection(-Vector3.up - pnValue*Vector3.right) - Vector3(0,2,0), Vector3(0,1,0), 1.8-transform.position.y);
	//Debug.DrawRay(transform.position + 10*transform.TransformDirection(Vector3.right) - Vector3(0,50,0), Vector3(0,49.8-transform.position.y,0), Color.green);
	//Debug.DrawRay(transform.position - 5*pnValue*transform.TransformDirection(-Vector3.up - pnValue*Vector3.right) - Vector3(0,50,0), Vector3(0,49.8-transform.position.y,0), Color.green);
	   
   	if (hits2.Length > 0) {
    	if (turnSpeed > 0) turnSpeed = -180;
		else turnSpeed = 180;
    }
    else if (hits1.Length > 0) {
    	if (turnSpeed < 0) turnSpeed = -180;
		else turnSpeed = 180;
    }
	
	theFishOutput.SetSwimValue(swimSpeed);
	theFishOutput.SetTurnValue(turnSpeed);
	theFishOutput.SetUpdownValue(updownSpeed);

}

function Initialize (s : float ,k : float) {

	theSpeed = s;
	originalSpeed = s;
	theHeight = k;
	
}

function SetHeadFish () {
	renderer.enabled = false;
	isHeadFish = true;
}

function SpeedUp (theValue : float) {
	theSpeed = (Mathf.Log10(theValue + 10)) * originalSpeed;
}

function SpeedDown () {
	theSpeed = originalSpeed;
}

//优先GetBack 于是远处鱼回归可以无视地形
function GetBack (theValue : float) {

	if ((theValue - transform.localEulerAngles.y + 360)%360 > 180) turnSpeed = -90;
	else turnSpeed = 90;
	//turnSpeed = -((theValue - transform.localEulerAngles.y + 360)%360 - 180);

}

function ClampAngle () {

	turnSpeed = Mathf.Clamp(turnSpeed, -30, 30);
	
}