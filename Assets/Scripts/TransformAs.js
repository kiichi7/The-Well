#pragma strict
var targetT : Transform;
var isShadow : boolean = true;

function Start () {

}

function Update () {

	if (isShadow) {
	transform.localPosition = targetT.localPosition;
	transform.localEulerAngles = targetT.localEulerAngles;
	transform.localScale =  targetT.localScale;
	}
	else {
		transform.localPosition = targetT.position;
		transform.localEulerAngles = targetT.eulerAngles;
		transform.localScale =  targetT.lossyScale;
		transform.localPosition.y = -targetT.position.y;
		transform.localScale.z =  -targetT.lossyScale.z;
	}
	
}