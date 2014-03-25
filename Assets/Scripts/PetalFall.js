#pragma strict
private var fallSpeed : float;
private var theColorChange : ColorChange;
private var fallTimer : float;

function Start () {

	fallSpeed = Random.Range(-0.05, -0.02);
	theColorChange = GetComponent(ColorChange);
	theColorChange.SetAlpha(0.0);

}

function Update () {
	
	fallTimer += Time.deltaTime;
	transform.position.y += fallSpeed;
	if (fallTimer < 0.5) theColorChange.SetAlpha(theColorChange.GetAlpha() + Time.deltaTime);
	else if (fallTimer > 2) Destroy(gameObject); 
	else if (fallTimer > 1.5) theColorChange.SetAlpha(theColorChange.GetAlpha() - 2 * Time.deltaTime);

}
/*
function ReStart () {

	if (transform.parent.GetComponent(TreeQuality).petalNumber >= GameInfo.GetPetalSpeed()) {
		Destroy(gameObject); 
		transform.parent.GetComponent(TreeQuality).petalNumber--;
	}
	else {
		fallTimer = 0;
		transform.localPosition = Vector3(Random.Range(-10, 10),0.01,Random.Range(-6, -3));
	}
	
}*/