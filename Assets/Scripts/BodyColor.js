#pragma strict
var aValue : float;

function Start () {

}

function Update () {

	renderer.sharedMaterials[0].color.a = Mathf.Pow(aValue,0.4);
	renderer.sharedMaterials[1].color.a = Mathf.Pow((1-aValue),0.4);

}