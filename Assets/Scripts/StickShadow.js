#pragma strict
var theStick : Transform;

function Start () {

}

function Update () {

	transform.localScale.x = theStick.localScale.x;
	transform.localPosition.x = theStick.localPosition.x;
	transform.localPosition.y = theStick.localPosition.y;
	transform.localPosition.z = -theStick.localPosition.z;
	transform.localEulerAngles.y = -theStick.localEulerAngles.y;

}