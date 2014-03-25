#pragma strict
private var timer : float = 0;


function Start () {

}

function Update () {

	timer += Time.deltaTime;
	if (ShowTown.ifKeepFade) GetComponent(AlphaFade).ColorFade();
	if (timer > 2) Destroy(this);

}