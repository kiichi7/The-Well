#pragma strict
var ifDisappear : boolean = false;


function Start () {

}

function Update () {

	if(ifDisappear) renderer.material.color.a -= Time.deltaTime;
	if(renderer.material.color.a <= 0) Destroy(gameObject);

}

function Disappear () {
	
	ifDisappear = true;
	Destroy(GetComponent(AlphaFade));
	
}