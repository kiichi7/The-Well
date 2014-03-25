#pragma strict
//var rainArea : Transform;
private var areaValue : float;
private var lastZValue : float;

function Update () {

	areaValue = camera.pixelHeight/20;
	
	//帧率保障
	if(Time.deltaTime> 0.03){
   		areaValue *= Mathf.Pow((0.03/Time.deltaTime),2);
   	}
	
	var zValue : float = 0.707 * areaValue / Mathf.Tan(camera.fieldOfView/2*Mathf.Deg2Rad);
	//高清平滑
	zValue = Mathf.Lerp(zValue,lastZValue,0.9);
	lastZValue = zValue;

	/*rainArea.localScale.y = areaValue;
    rainArea.localScale.x = camera.aspect * areaValue;
    rainArea.localScale.z = zValue;
    rainArea.position = transform.position;
    rainArea.rotation = transform.rotation;*/
    GameInfo.qualityDis = zValue;
    
    //print(GameInfo.theCamera.transform.position.y);
    //print(GameInfo.theCamera.transform.position.y/Mathf.Tan(camera.fieldOfView/2*Mathf.Deg2Rad));

}
