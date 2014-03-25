#pragma strict
private var oRX : float;

function Start () {

	oRX = transform.localEulerAngles.x;

}

function Update () {

	transform.localEulerAngles.x += 5*(Random.value - 0.5);
	transform.localEulerAngles.x = Mathf.Clamp(transform.localEulerAngles.x, oRX - 12, oRX + 12);

}