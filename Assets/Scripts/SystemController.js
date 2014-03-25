#pragma strict
var ifShowCursor : boolean = true;
var ifLockCursor : boolean = false;
var ifRunInBackground : boolean = false;
var escExit : boolean = false;

function Start () {

	Screen.showCursor = ifShowCursor;
	Screen.lockCursor = ifLockCursor;
	Application.runInBackground = ifRunInBackground;

}

function Update () {
	
	if (escExit) {
		if (Input.GetKey(KeyCode.Escape)) GameState.gameState = 3;
	}
	
}
