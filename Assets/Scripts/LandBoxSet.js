#pragma strict
@script ExecuteInEditMode()


function Start () {

	//transform.Find("Land").localScale = GetComponent(BoxCollider).size;
	

}

function Update () {

	transform.Find("Land").localScale = 0.99*GetComponent(BoxCollider).size;
	transform.position.y = 0;
	if(Application.isPlaying) Destroy(this);

}