#pragma strict
var swallow : Transform;
var wings: Transform;
var wingsShadow: Transform;


function Start () {

}

function Update () {

	transform.position.y = -swallow.position.y;
	transform.position.x = swallow.position.x;
	transform.position.z = swallow.position.z;
	transform.eulerAngles.x = -swallow.eulerAngles.x;
	transform.eulerAngles.y = swallow.eulerAngles.y;
	transform.eulerAngles.z = -swallow.eulerAngles.z;
	wingsShadow.localScale.x = wings.localScale.x;
	wingsShadow.localScale.y = wings.localScale.y;

}