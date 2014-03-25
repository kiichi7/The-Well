#pragma strict
static var ambientLight : Color;
private var lastAmbientLight : Color;
static var isAmbientLightChanging : boolean = false;
static var targetAmbientLight : Color;
static var adjustLight : Color;
static var targetAdjustLight : Color;
var startPos : float = 0;
var endPos : float = 500;
private var ranEndPos : float;

//var rainMaterial : Material;
//var waterMarkMaterial : Material;
//var rainWaterMaterial : Material;
var thoseMaterials : Material[];
var swallowMaterial : Material;

function Start () {

	RenderSettings.fog = true;
	ambientLight = Color.white;
	targetAmbientLight = Color.white;
	adjustLight = Color.white;
	targetAdjustLight = Color.white;

}

function Update () {

	endPos = 500 - 400 * GameInfo.chaosValue;
	endPos = Mathf.Clamp(endPos,-GameInfo.PCDis,500);
	startPos = 0.2 * endPos;

	if (GameInfo.isRaining) BecomeNight();
	else BecomeDay();

	//if (Input.GetKeyDown(KeyCode.Alpha3)) targetAmbientLight = Color.white;
	//if (Input.GetKeyDown(KeyCode.Alpha4)) targetAmbientLight = Color.black;
	
	ranEndPos += (Random.value - 0.5);
	ranEndPos = Mathf.Clamp(ranEndPos,-10,10);

	RenderSettings.fogStartDistance = Mathf.Lerp(RenderSettings.fogStartDistance,startPos,5*Time.deltaTime);
	RenderSettings.fogEndDistance = Mathf.Lerp(RenderSettings.fogEndDistance,(endPos + ranEndPos),5*Time.deltaTime);
	transform.GetChild(0).GetChild(0).gameObject.renderer.material.color = adjustLight;
	
	/*waterMarkMaterial.color.r = 0.8 - ambientLight.r;
	waterMarkMaterial.color.g = 0.8 - ambientLight.g;
	waterMarkMaterial.color.b = 0.8 - ambientLight.b;
	rainMaterial.color.r = 0.8 - ambientLight.r;
	rainMaterial.color.g = 0.8 - ambientLight.g;
	rainMaterial.color.b = 0.8 - ambientLight.b;*/
//	rainWaterMaterial.color.r = 0.8 - ambientLight.r;
//	rainWaterMaterial.color.g = 0.8 - ambientLight.g;
//	rainWaterMaterial.color.b = 0.8 - ambientLight.b;
	if (isAmbientLightChanging) {
		Camera.main.backgroundColor = ambientLight;
		RenderSettings.fogColor = ambientLight;
		for (var i=0; i<thoseMaterials.length; i++) {
			thoseMaterials[i].color.r = 1.0 - ambientLight.r;
			thoseMaterials[i].color.g = 1.0 - ambientLight.g;
			thoseMaterials[i].color.b = 1.0 - ambientLight.b;
		}
		swallowMaterial.color.a = (AmbientLight.ambientLight.r+AmbientLight.ambientLight.g+AmbientLight.ambientLight.b)/3;
	}

}

function LateUpdate () {

	ambientLight = ChangeColor(ambientLight, targetAmbientLight);
	if (Vector4.Distance(ambientLight,lastAmbientLight) > 0.0001) {
		isAmbientLightChanging = true;
		lastAmbientLight = ambientLight;
	}
	else isAmbientLightChanging = false;
	
	if (Time.time < 3) isAmbientLightChanging = true;
	
	//if (isAmbientLightChanging) print(ambientLight + " " + isAmbientLightChanging);
	adjustLight = ChangeColor(adjustLight, targetAdjustLight);

}

function ChangeColor (from : Color, to : Color) {

	if (from != to) return Color.Lerp(from, to, 2*Time.deltaTime);
	else return from;

}

function GetFar () {

	return RenderSettings.fogEndDistance;

}

function BecomeDay () {

	targetAmbientLight = Color.white;

}

function BecomeNight () {

	targetAmbientLight = Color.black;

}

function SetAdjustLight (theColor : Color) {

	targetAdjustLight = theColor;

}