#pragma strict
static var ifKeepFade : boolean = true;
var theTown : GameObject;
var theIslands : GameObject;
var theRaft : GameObject;
private var timer : float;

function Start () {

}

function LateUpdate () {

	timer += Time.deltaTime;
	//if (Input.GetKeyDown(KeyCode.Alpha1)) ifKeepFade = true;
	//if (Input.GetKeyDown(KeyCode.Alpha2)) ifKeepFade = false;
	if ((ifKeepFade)&&(timer > 2)) theTown.SetActive (false);

}

function OnTriggerEnter (other : Collider)  {

	if (other.name == "Player") {
		ifKeepFade = false;
		theTown.SetActive (true);
		theIslands.SetActive (false);
		theRaft.transform.position.x = 860;
		Destroy(gameObject);
	}

}