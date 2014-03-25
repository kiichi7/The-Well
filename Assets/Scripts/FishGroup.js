#pragma strict
var theFish : GameObject;
//1~5五种鱼
var fishKind : int;
var groupFish : GameObject[];
private var i : int;
private var j : int;
private var k : int;
private var theArea : int;
private var ifFinishInitialization : boolean = false;
var fishMaterial : Material[];

function Start () {

	if ((fishKind != 1)&&(fishKind != 2)&&(fishKind != 3)&&(fishKind != 4)&&(fishKind != 5)) fishKind = Random.Range(1,6);
	switch (fishKind) {
		case 1: groupFish = new GameObject[Random.Range(15,50)];
				theArea = 4;
		break;
		case 2: groupFish = new GameObject[Random.Range(25,50)];
				theArea = 5;
		break;
		case 3: groupFish = new GameObject[Random.Range(2,5)];
				theArea = 7;
		break;
		case 4: groupFish = new GameObject[Random.Range(15,25)];
				theArea = 3;
		break;
		case 5: groupFish = new GameObject[Random.Range(100,200)];
				theArea = 2;
		break;
	}

}

function Update () {

	/*for (j = 0;j <5;j++) {
		fishMaterial[j].color.r = 1.0 - AmbientLight.ambientLight.r;
		fishMaterial[j].color.g = 1.0 - AmbientLight.ambientLight.g;
		fishMaterial[j].color.b = 1.0 - AmbientLight.ambientLight.b;
	}*/

	if (!ifFinishInitialization) {
		if ((i < groupFish.length)&&(Time.time > i/10))	 {
			var startRotation : Quaternion;
			startRotation.eulerAngles.x = 270;
			groupFish[i] = Instantiate(theFish, transform.position, startRotation);
			if (i==0) {
				groupFish[0].GetComponent(FishInput).SetHeadFish();
			}
			groupFish[i].name = "Fish";
			groupFish[i].transform.parent = gameObject.transform;
			groupFish[i].transform.localScale *= Random.Range(0.8, 1.25);
	
			//groupFish[i].GetComponent(FishInput).Initialize(3,3);
			GetMaterial(groupFish[i],fishKind);
			
			i++;
		}
		else if (i == groupFish.length) {
			InitializationController.SetFinished();
			ifFinishInitialization = true;
		}
	}
	
}

function GetMaterial (theFish : GameObject, theNumber : int) {

	switch (theNumber) {
		case 1: theFish.GetComponent(FishInput).Initialize(3,3);
			theFish.renderer.material = fishMaterial[0];
		break;
		case 2: theFish.GetComponent(FishInput).Initialize(3,5);
			theFish.renderer.material = fishMaterial[1];
		break;
		case 3: theFish.GetComponent(FishInput).Initialize(6,4); 
			theFish.renderer.material = fishMaterial[2];	
		break;
		case 4: theFish.GetComponent(FishInput).Initialize(3,3);
			theFish.renderer.material = fishMaterial[3];	
		break;
		case 5: theFish.GetComponent(FishInput).Initialize(0.5,1.5);
			theFish.renderer.material = fishMaterial[4];	
		break;
	} 

}

function LateUpdate () {

	if (i>=2) {
		for (var j = 0;j <= (i/10);j++) GroupJudge();
	}
	if (i>=1) {
		groupFish[0].GetComponent(FishInput).ClampAngle();
	}

}

function GroupJudge () {

	var d : float;
	var angle : float;
	var x : float;
	var z : float;
	if (k == 0) {
		d = Vector2.Distance(Vector2(groupFish[0].transform.position.x,groupFish[0].transform.position.z),Vector2(GameInfo.playerPos.x,GameInfo.playerPos.z));
		if (d > 25*theArea) {
			x = GameInfo.playerPos.x - groupFish[0].transform.position.x;
			z = GameInfo.playerPos.z - groupFish[0].transform.position.z;
			if (x > 0) angle = -Mathf.Atan(z/x)*Mathf.Rad2Deg;
			else angle = -180 - Mathf.Atan(z/x)*Mathf.Rad2Deg;
			if (angle < 0) angle += 360;
			groupFish[0].GetComponent(FishInput).GetBack(angle);
			groupFish[0].GetComponent(FishInput).SpeedUp(d);
		}
		else {
			groupFish[0].GetComponent(FishInput).ClampAngle();
			groupFish[0].GetComponent(FishInput).SpeedDown();
		}
	}
	else {
		d = Vector2.Distance(Vector2(groupFish[0].transform.position.x,groupFish[0].transform.position.z),Vector2(groupFish[k].transform.position.x,groupFish[k].transform.position.z));
		if (d > theArea) {
			x = groupFish[0].transform.position.x - groupFish[k].transform.position.x;
			z = groupFish[0].transform.position.z - groupFish[k].transform.position.z;
			if (x > 0) angle = -Mathf.Atan(z/x)*Mathf.Rad2Deg;
			else angle = -180 - Mathf.Atan(z/x)*Mathf.Rad2Deg;
			if (angle < 0) angle += 360;
			groupFish[k].GetComponent(FishInput).GetBack(angle);
			groupFish[k].GetComponent(FishInput).SpeedUp(d);
		}
		else {
			groupFish[k].GetComponent(FishInput).ClampAngle();
			groupFish[k].GetComponent(FishInput).SpeedDown();
		}
	}
	k = (k+1)%i;
	
}