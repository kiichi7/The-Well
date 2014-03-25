private var fallSpeed : float = -1;
//private var theTimer : float;
//0,1,2三级状态
private var rainState : int = 0;
//private var ifVisible : boolean = true;
//var rD : float;
//var rA : float;
//var thePos : Vector3;

function Start () {

}

function Update () {
	
	//theTimer += Time.deltaTime;
	if (rainState == 0) {
		//if (fallSpeed > -1) fallSpeed -= 0.5 * Time.deltaTime;
		transform.position.y += fallSpeed;
		if (transform.position.y < 0.5) OnWater();
		//if (theTimer < 5) {
			//theColorChange.SetAlpha(theColorChange.GetAlpha() + 0.3 * Time.deltaTime);
		//}
		//thePos = GameInfo.cameraPos + rD * GameInfo.theCamera.transform.TransformDirection(Mathf.Sin(rA),0,Mathf.Cos(rA)) + Vector3(0,0.5*GameInfo.qualityDis,0);
		//transform.position.x = thePos.x;
		//transform.position.z = thePos.z;
		//transform.position = GameInfo.cameraPos + GameInfo.theCamera.transform.TransformDirection(Vector3(relativelyPosX,transform.position.y,relativelyPosZ));
		//transform.position.z = GameInfo.cameraPos.z + relativelyPosZ; 
	}
	else if (rainState == 2) {
		transform.localScale += Time.deltaTime * Vector3.one;
		if (renderer.material.color.a < 0.05) {
			RainDeastroy();
		}
		else {
			//theTimer += Time.deltaTime;
			renderer.material.color.a -= 1.2*Time.deltaTime;
		}
	}
	else if (rainState == 1) {
	}
	
}

/*function OnSomething () {

	//此项暂时没用
	theTimer = 0;

}*/

/*function Initialize () {
	
	fallSpeed = -1;
	transform.parent = GameObject.Find("RainArea").transform;
	renderer.material.mainTextureScale.x = 0.5;
	transform.eulerAngles.x = 90;
	transform.localScale = Vector3.one;
	rainState = 0;
	renderer.material.color.a= 1;
	
}*/

function OnWater () {
	
	if (!renderer.isVisible) RainDeastroy();
	else {
		transform.parent = GameObject.Find("Water").transform;
		renderer.material.mainTextureOffset.x = 0.5;
		transform.position.y = 0.1 * Random.value;
		transform.eulerAngles.x = 0;
		transform.eulerAngles.y = Random.Range(0,360);
		transform.localScale = 0.2 * Vector3.one;
		//theTimer = 0;
		rainState = 2;
	}
	
}

function RainDeastroy () {

	Destroy(gameObject);
	//GameInfo.GameSystem.GetComponent("PoolingManager").instance.rain.ReleaseElement(gameObject, true);

}
