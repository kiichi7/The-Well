#pragma strict
private var swimValue : float;
private var turnValue : float;
private var updownValue : float;
private var pingPongStartValue : float;

function Start () {

	pingPongStartValue = Random.value;

}

function Update () {

	
	
	transform.localEulerAngles.y += turnValue * Time.deltaTime;	
	transform.position += transform.TransformDirection(Vector3.right) * swimValue * Time.deltaTime;
	if (renderer.isVisible) {
		transform.position.y += updownValue * Time.deltaTime;
		transform.localScale.y = 0.8*turnValue/360 + 0.05*Mathf.PingPong(pingPongStartValue+Time.time, 1.0)-0.025;
	}
	
}

function SetSwimValue(theValue : float){
	swimValue = theValue;
}

function SetTurnValue(theValue : float){
	turnValue = theValue;
}

function SetUpdownValue(theValue : float){
	updownValue = theValue;
}
