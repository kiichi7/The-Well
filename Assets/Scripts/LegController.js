#pragma strict
//true代表往右走,反之往左
var walkDirection : boolean = true;
var aValue : float;
var isWalking : boolean;
private var leftP : float;
private var rightP : float;
var pValue : float;

function Start () {

	leftP = -0.05;
	rightP = 0.625;

}

function Update () {

	
	if (isWalking) {
		pValue = (0.04*aValue)%0.04;
		if (walkDirection) {
			renderer.sharedMaterials[0].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[0].mainTextureOffset.x,(leftP - (0.04-pValue)),5*Time.deltaTime);
			renderer.sharedMaterials[1].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[1].mainTextureOffset.x,(rightP - pValue),5*Time.deltaTime);
		}
		else {
			renderer.sharedMaterials[0].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[0].mainTextureOffset.x,(leftP + (0.04-pValue)),5*Time.deltaTime);
			renderer.sharedMaterials[1].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[1].mainTextureOffset.x,(rightP + pValue),5*Time.deltaTime);
		}
		transform.parent.localScale.x = Mathf.Lerp(transform.parent.localScale.x, 0.8, Time.deltaTime);
	}
	else {
		//pValue = Mathf.Lerp(pValue, 0, 4*Time.deltaTime);
		renderer.sharedMaterials[0].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[0].mainTextureOffset.x,leftP,Time.deltaTime);
		renderer.sharedMaterials[1].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[1].mainTextureOffset.x,rightP,Time.deltaTime);
		transform.parent.localScale.x = Mathf.Lerp(transform.parent.localScale.x, 1, Time.deltaTime);
	}
	
	renderer.sharedMaterials[0].color.a = Mathf.Pow((1-aValue),0.4);
	renderer.sharedMaterials[1].color.a = Mathf.Pow(aValue,0.4);


}