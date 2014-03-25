#pragma strict

function Start () {

}

function Update () {

	transform.localScale += 0.5*Time.deltaTime * Vector3.one;
	transform.localPosition += 0.5*transform.TransformDirection(Vector3.forward) * Time.deltaTime;
	transform.localPosition -= 0.1*transform.TransformDirection(Vector3.up) * Time.deltaTime;
	transform.localEulerAngles.x += 10*Time.deltaTime;
	if (renderer.material.color.a < 0.05) {
		Destroy(gameObject);
	}
	else {
		renderer.material.color.a -= 0.3*Time.deltaTime;
	}

}