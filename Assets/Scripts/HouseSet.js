#pragma strict
//宽高长
private var size : Vector3;
//0~2墙,3~10边,11~13门
var part : Transform[];
var ifRandomDirection : boolean = true;
var ifRandomHeight : boolean = true;
var ifDeletePart : boolean = true;
var canBeDeletedPart : GameObject[];

function Awake () {

	Initialize ();
	DestroyImmediate(this);

}

function Initialize () {

	var boxCollider = GetComponent(BoxCollider);
	
	if (ifRandomHeight) boxCollider.size.y = 15 + 15 * Mathf.Pow(Random.value,2);
	
	size = boxCollider.size;
	boxCollider.center.y = 0.5*size.y;

	var i : int;

	var hypotenuse : float;
	hypotenuse = Mathf.Pow((size.x*size.x+size.z*size.z),0.5)-0.05;
	var angle : float;
	angle = Mathf.Atan(size.z/size.x)*Mathf.Rad2Deg;
	
	//身体
	part[20].localScale = size - 0.25*Vector3.one;
	part[20].localPosition.y = 0.5*size.y;
	
	//墙
	/*part[0].localScale.x = size.x-0.05;
	part[0].localScale.y = size.z-0.05;
	part[1].localScale.x = hypotenuse;
	part[2].localScale.x = hypotenuse;
	part[1].localEulerAngles.y = angle;
	part[2].localEulerAngles.y = -angle;
	part[1].localScale.y = size.y;
	part[2].localScale.y = size.y;
	part[0].localPosition.y = size.y;
	part[1].localPosition.y = 0.5*size.y;
	part[2].localPosition.y = 0.5*size.y;*/
	//消除冗余
	//DestroyImmediate (part[0].gameObject);
	//DestroyImmediate (part[1].gameObject);
	//DestroyImmediate (part[2].gameObject);
	
	//边
	part[3].localPosition = 0.5*Vector3(size.x+0.5,size.y,size.z+0.5);
	part[4].localPosition = 0.5*Vector3(size.x+0.5,size.y,-size.z-0.5);
	part[5].localPosition = 0.5*Vector3(-size.x-0.5,size.y,-size.z-0.5);
	part[6].localPosition = 0.5*Vector3(-size.x-0.5,size.y,size.z+0.5);
	
	for (i = 3;i<=6;i++) {
		part[i].localScale.x = size.y;
	}
	
	/*part[7].localPosition = Vector3(-0.5*size.x-0.5,size.y,0);
	part[8].localPosition = Vector3(0,size.y,0.5*size.z+0.5);
	part[9].localPosition = Vector3(0.5*size.x,size.y+0.5,0);
	part[10].localPosition = Vector3(0,size.y,-0.5*size.z-0.5);
	part[14].localPosition = Vector3(-0.5*size.x-0.5,0,0);
	part[15].localPosition = Vector3(0,0,0.5*size.z+0.5);
	part[16].localPosition = Vector3(0.5*size.x+0.5,0,0);
	part[17].localPosition = Vector3(0,0,-0.5*size.z-0.5);*/
	
	part[7].localPosition = Vector3(-0.51*size.x-0.5,size.y,0);
	part[8].localPosition = Vector3(0,size.y,0.51*size.z+0.5);
	part[9].localPosition = Vector3(0.51*size.x,size.y+0.5,0);
	part[10].localPosition = Vector3(0,size.y,-0.51*size.z-0.5);
	part[14].localPosition = Vector3(-0.51*size.x-0.5,0,0);
	part[15].localPosition = Vector3(0,0,0.51*size.z+0.5);
	part[16].localPosition = Vector3(0.51*size.x+0.5,0,0);
	part[17].localPosition = Vector3(0,0,-0.51*size.z-0.5);
	
	for (i=0;i<=3;i++) {
		part[i+7].localEulerAngles.y = (i+1)*90;
	}
	
	part[7].localScale.x = size.z;
	part[8].localScale.x = size.x;
	part[9].localScale.x = size.z;
	part[10].localScale.x = size.x;
	part[14].localScale.x = size.z;
	part[15].localScale.x = size.x;
	part[16].localScale.x = size.z;
	part[17].localScale.x = size.x;
	
	//门窗
	/*part[11].localPosition.x = 0.45*size.x;
	part[12].localPosition.x = -0.4*size.x;
	part[13].localPosition.x = -0.45*size.x;
	part[18].localPosition.x = 0.45*size.x;
	part[19].localPosition.z = 0.5*size.z;*/
	
	part[11].localPosition.x = 0.55*size.x;
	part[12].localPosition.x = -0.55*size.x;
	part[13].localPosition.x = -0.55*size.x;
	part[18].localPosition.x = 0.55*size.x;
	part[19].localPosition.z = 0.55*size.z;
	
	var k = Random.Range(0,2)*2-1;
	part[11].localPosition.z = k*Random.Range(0.1,0.3)*size.z;
	part[18].localPosition.z = -k*Random.Range(0.1,0.3)*size.z;
	k = Random.Range(0,2)*2-1;
	part[12].localPosition.z = k*Random.Range(0.1,0.25)*size.z;
	part[13].localPosition.z = -k*Random.Range(0.15,0.35)*size.z;
	
	if (size.x > size.z) part[19].localPosition.x = Random.Range(-0.25,0.25)*size.x;
	else part[19].localPosition.x = 0;
	
	part[18].localPosition.y = 0.6*size.y;
	if (size.y <= 15 ) part[19].localPosition.y = 0.6*size.y;
	else part[19].localPosition.y = Random.Range(0.6,0.75)*size.y;
	
	/*part[11].localScale.x = 0.1*size.z;
	part[18].localScale.x = 0.1*size.z;
	part[12].localScale.x = 0.1*size.z;
	part[13].localScale.x = 0.1*size.z;
	part[19].localScale.z = 0.1*size.x;*/
	
	//方向改变
	if (ifRandomDirection) {
		transform.localScale.x *= Random.Range(0,2)*2-1;
		transform.localScale.z *= Random.Range(0,2)*2-1;
	}
	
	//局部删除
	if (ifDeletePart) {
		if (Random.value < 0.2) {
			for (i = 0; i < 4; i++) DestroyImmediate (canBeDeletedPart[i]);
		}
		if (Random.value < 0.1) {
			for (i = 4; i < 8; i++) DestroyImmediate (canBeDeletedPart[i]);
		}
		if (Random.value < 0.3) DestroyImmediate (canBeDeletedPart[8]);
		if (Random.value < 0.3) DestroyImmediate (canBeDeletedPart[9]);
	}
	
	//开启倒影
	GetComponent(HouseShadow).isShadow = false;
		
}
