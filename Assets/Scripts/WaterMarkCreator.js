#pragma strict
var waterArea : Transform;
var waterMark : GameObject;
private var timer : float;
private var gap : float = 0.3;

function Start () {

	timer = Random.Range(0.0, gap);

}

function Update () {

	timer += Time.deltaTime;
	if (timer > gap) {
		Instantiate(waterMark, transform.position + Random.Range(-5.0,5.0)*transform.TransformDirection(Vector3.right) + Random.Range(-0.05,0.05)*transform.TransformDirection(Vector3.up), transform.rotation).transform.parent = waterArea;
		timer = Random.Range(0.0, gap/2);
	}

}