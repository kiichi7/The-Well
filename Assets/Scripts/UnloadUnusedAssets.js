#pragma strict
private var timer : float;

function Start () {

}

function Update () {

	timer += Time.deltaTime;
	if (timer > 60) {
		Resources.UnloadUnusedAssets();
		System.GC.Collect();
		timer = 0;
	}

}