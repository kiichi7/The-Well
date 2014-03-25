#pragma strict
var isShadow : boolean = true;

function Start () {

	//倒影制造
	if (!isShadow) {
		isShadow = true;
		var houseShadow : GameObject;
		houseShadow = Instantiate (gameObject, Vector3(transform.position.x,-transform.position.y,transform.position.z), transform.rotation);
		houseShadow.transform.parent = gameObject.transform;
		houseShadow.transform.localScale.y = -1;
		houseShadow.name = "HouseShadow";
	}
	Destroy(this);

}

function Update () {

	//if (Input.GetKeyDown(KeyCode.L)) 

}