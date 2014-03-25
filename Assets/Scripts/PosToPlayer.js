#pragma strict
@script ExecuteInEditMode()
var player : Transform;

function Start () {
	
	if(Application.isPlaying) {
	transform.position = Vector3.zero;
		Destroy(this);
	}

}

function Update () {

	transform.position = player.position;

}