#pragma strict
var driveValue : float;
var turnValue : int;
//private var lastValue : float;
//用以锁定Vertical值，以仅在变化是输入
private var lastTurnValue : int;
private var lastTurnTimer : float;
//行走速度
private var driveSpeed : float = 0.05;
//true代表往右走,反之往左
var driveDirection : boolean = true;
//面向xz平面的东南西北1\2\3\4
var faceDirection : int = 0;
//相对方向,用以确定行走配合角色方向
var relaDir : boolean;

var underControl : boolean = false;

var onRaft : boolean = false;

private var randomSpeed : Vector2;

private var canDrift : boolean = false;


function Awake () {

	faceDirection = transform.eulerAngles.y/4;

}

function Update () {
//print(driveValue);
//print(gameObject.name + " " + faceDirection);
		//判断行走方向
	if (underControl) {
		if (driveValue > 0) driveDirection = true;
		else if (driveValue < 0) driveDirection = false;
		//上下转向
		if ((lastTurnValue != turnValue)&&((Time.time-lastTurnTimer)>2.5)) {
			if (turnValue == 1) {
				if (driveDirection) faceDirection --;
				else faceDirection ++;
				lastTurnTimer = Time.time;
			}
			else if (turnValue == -1) {
				if (driveDirection) faceDirection ++;
				else faceDirection --;
				lastTurnTimer = Time.time;
			}
			faceDirection = (faceDirection + 4)%4;
		}
		lastTurnValue = turnValue;
	}


}

function FixedUpdate () {

	if (!canDrift) {
		if (onRaft) canDrift = true;
	}
	else if (!onRaft) {
		randomSpeed.x += 0.001*(Random.value - 0.5);
		randomSpeed.y += 0.001*(Random.value - 0.5);
		randomSpeed.x = Mathf.Clamp(randomSpeed.x,-0.005,0.005);
		randomSpeed.y = Mathf.Clamp(randomSpeed.y,-0.005,0.005);
		transform.position.x += randomSpeed.x;
		transform.position.z += randomSpeed.y;
	}
	
	//print(driveValue);
	//if (!underControl) {
	if (Mathf.Abs(driveValue) < 0.0045) driveValue = 0;
	else {
		if (driveValue > 0) driveValue -= 0.045*Time.deltaTime;
		else driveValue += 0.045*Time.deltaTime;
	}
	//}
	transform.eulerAngles.y = RotLerp(transform.eulerAngles.y, faceDirection*90, 0.5*Time.fixedDeltaTime);	
	if (relaDir) transform.position += 5 * transform.TransformDirection(Vector3.right) * Time.fixedDeltaTime * driveValue;
	else transform.position -= 5 * transform.TransformDirection(Vector3.right) * Time.fixedDeltaTime * driveValue;
	transform.position.y = 0;
	rigidbody.velocity = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;

}

function RotLerp (from : float, to : float, t : float) {

	if ((to == 90)&&(from > 270)) {
		from -= 360;
	}
	else if ((to == 270)&&(from < 90)) {
		from += 360;
	}
	else if ((to == 0)&&(from > 180)) {
		to += 360;
	}
	return Mathf.Lerp(from, to, t);
	
}

function SetHorizontalValue(theValue : float){
	if (theValue != 0) driveValue = 0.99*driveValue + 0.01*theValue;
}

function SetVerticalValue(theValue : int){
	turnValue = theValue;
}

function OnCollisionStay(collisionInfo : Collision) {

	if (collisionInfo.gameObject.name.ToString()[0] == "i") driveValue *= 0.99;

}