#pragma strict
//编辑器窗口也影响这个

function OnBecameVisible() {

	transform.parent.GetComponent(TreeQuality).SetVisible();

}

function OnBecameInvisible() {

	transform.parent.GetComponent(TreeQuality).SetInvisible();
	
}
