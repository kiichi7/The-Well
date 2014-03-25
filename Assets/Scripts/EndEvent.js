#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	if (collision.gameObject.name == "Player") {
		GameState.GetEnd();
	}

}