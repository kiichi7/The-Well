#pragma strict
private var size : Vector3;
var part : Transform[];

function Awake () {
	
	var i : int;
	var boxCollider = GetComponent(BoxCollider);
	size = boxCollider.size;
	boxCollider.center.y = 0.5*size.y;
	
	part[0].localPosition = Vector3(0,size.y,-0.5*size.z);
	part[1].localPosition = Vector3(0,size.y,0.5*size.z);
	part[2].localPosition = Vector3(-0.5*size.x,size.y,0);
	part[3].localPosition = Vector3(0.5*size.x,size.y,0);
	part[4].localPosition = Vector3(-0.5*size.x,0.5*size.y,-0.5*size.z);
	part[5].localPosition = Vector3(-0.5*size.x,0.5*size.y,0.5*size.z);
	part[6].localPosition = Vector3(0.5*size.x,0.5*size.y,0.5*size.z);
	part[7].localPosition = Vector3(0.5*size.x,0.5*size.y,-0.5*size.z);
	part[8].localPosition = Vector3(0,0,-0.5*size.z-0.02);
	part[9].localPosition = Vector3(0,0,0.5*size.z+0.02);
	part[10].localPosition = Vector3(-0.5*size.x-0.02,0,0);
	part[11].localPosition = Vector3(0.5*size.x+0.02,0,0);
	part[12].localPosition = Vector3(0,0.5*size.y,0);
	
	part[0].localScale.x = size.x;
	part[1].localScale.x = size.x;
	part[2].localScale.x = size.z;
	part[3].localScale.x = size.z;
	
	for (i = 4; i < 8; i++) part[i].localScale.x = size.y;
	
	part[8].localScale.x = size.x;
	part[9].localScale.x = size.x;
	part[10].localScale.x = size.z;
	part[11].localScale.x = size.z;
	
	for (i = 0; i < 12; i++) {
		part[i].localScale.x += 0.02;
		part[i].localScale.y *= 0.1/part[i].lossyScale.y;
	}
	
	part[12].localScale = size;

}

function Update () {

}