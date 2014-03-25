#pragma strict
var UADValue : float;
var turnValue : float;
var speedValue : float;
var flapping : SwallowFlapping;


function Start () {

	flapping = GetComponent(SwallowFlapping);
	transform.parent = transform.parent.parent;

}

function LateUpdate () {

	UADValue = Mathf.Clamp(UADValue,-89,89);
	speedValue = Mathf.Clamp(speedValue,0,2);
	turnValue = Mathf.Clamp(turnValue,-89,89);
	//向前飞
	flapping.SetFan(speedValue);
	//上下飞
	transform.eulerAngles.x = -UADValue;
	//转向
	transform.eulerAngles.y += 5 * turnValue * Time.deltaTime;
	transform.eulerAngles.z = -turnValue;
	//if ((transform.eulerAngles.z < 90)&&(transform.eulerAngles.z > 45)) transform.eulerAngles.z = 45;
	//else if ((transform.eulerAngles.z > 90)&&(transform.eulerAngles.z < 315)) transform.eulerAngles.z = 315;
	
}

function FixedUpdate () {

	transform.position += 30*transform.TransformDirection(Vector3.forward)*Time.deltaTime;

}

function SetUAD (v : float) {

	UADValue = v;
	
}

function SetSpeed (v : float) {

	speedValue = v;
	
}

function SetTurn (v : float) {

	turnValue = v;

}
