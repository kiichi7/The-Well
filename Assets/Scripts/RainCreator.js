//var GS : GameObject;
var theRainFall : GameObject;
private var rainSpeed : float = 1;
private var ranPos : Vector3;
private var creatPos : Vector3;
private var creatRot : Quaternion;
private var randomDis : float;
private var randomAng : float;
private var maxAng : float;
private var theRain : GameObject;
private var disOffset : float;

function Update () {

	for (var i = 0;i < GameInfo.GetRainSpeed();i++) CreatRain ();
	//GS.GetComponent("PoolingManager").instance.CreatRain();
	
}

function CreatRain () {

	disOffset = GameInfo.theCamera.transform.position.y/Mathf.Tan(GameInfo.theCamera.fieldOfView/2*Mathf.Deg2Rad);
	//disOffset = 0;
	randomDis = 0.75*disOffset + GameInfo.qualityDis * Mathf.Pow(Random.value,0.5);
	maxAng = Mathf.Atan(Mathf.Tan(GameInfo.theCamera.fieldOfView/2*Mathf.Deg2Rad) * GameInfo.theCamera.aspect);
	randomAng = maxAng * (Random.value * 2 - 1);
	ranPos = randomDis * GameInfo.theCamera.transform.TransformDirection(Mathf.Sin(randomAng),0,Mathf.Cos(randomAng)) + Vector3(0,0.5*GameInfo.qualityDis,0);
	//ranPos = randomDis * GameInfo.theCamera.transform.TransformDirection(Mathf.Sin(randomAng),0,Mathf.Cos(maxAng)) + Vector3(0,0.5*GameInfo.qualityDis,0);
	creatPos = GameInfo.cameraPos + ranPos;
	//creatRot = transform.rotation;
	creatRot.eulerAngles.x = 90;
	creatRot.eulerAngles.y = Quaternion.LookRotation(Camera.main.transform.position - creatPos).eulerAngles.y;
	theRain = Instantiate(theRainFall, creatPos, creatRot);
	//theRain = GameInfo.GameSystem.GetComponent("PoolingManager").instance.rain.GetElement();
	//theRain.GetComponent(RainFall).Initialize();
	//theRain.GetComponent(RainFall).rD = randomDis;
	//theRain.GetComponent(RainFall).rA = randomAng;
	theRain.name = "RainFall";
	//theRain.transform.position = creatPos;
	//theRain.transform.rotation = creatRot;
	theRain.transform.parent = GameInfo.theCamera.transform;

}