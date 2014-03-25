
function Start () {

	//if (!renderer.isVisible) RainDeastroy();
	//else {
		transform.parent = GameObject.Find("Water").transform;
		renderer.material.mainTextureScale.x = -0.5;
		transform.position.y = 0.1 * Random.value;
		transform.eulerAngles.y = Random.Range(0,360);
		transform.localScale = 0.2 * Vector3.one;
	//}

}

function Update () {
	
	transform.localScale += Time.deltaTime * Vector3.one;
	if (renderer.material.color.a < 0.05) {
		RainDeastroy();
	}
	else {
		renderer.material.color.a -= Time.deltaTime;
	}

}

function RainDeastroy () {

	Destroy(gameObject);
	//GameInfo.GameSystem.GetComponent("PoolingManager").instance.rain.ReleaseElement(gameObject, true);

}
