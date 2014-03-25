#pragma strict

function Start () {

	print("按R重新游戏");

}

function Update () {

	if (Input.GetKeyDown(KeyCode.R)) Application.LoadLevel(Application.loadedLevel);

}