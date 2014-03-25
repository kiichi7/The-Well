#pragma strict
var peachtree : Material[];
var peachtree_hd : Material[];
var peachtreeshadow : Material[];
//是否倒影
var ifShadow : boolean = false;
//树形选择,0为随机
var whichTree : int;
//对称调整,0为随机
var mirrorDirection : int;

function Awake () {
	//镜像
	if ((mirrorDirection == 1)||(mirrorDirection == -1)) transform.localScale.x = mirrorDirection;
	else transform.localScale.x = 2*Random.Range(0,2)-1;
	var theTree : Transform;
	var theTreeShadow : Transform;
	theTree = transform.GetChild(0);
	theTreeShadow = theTree.GetChild(0);
	//树形
	var theNumber : int;
	if ((whichTree > 0)&&(whichTree < 17)) {
		theNumber = whichTree - 1;
	}
	else {
		theNumber = Random.Range(0,16);
	}
	var randomValue : float;
	randomValue = Random.Range(0.0,0.1);
	var theColor = Color(1.0, 1.0 - randomValue, 1.0 - Random.Range(0.0, randomValue));
	GetComponent(TreeQuality).SetColor(theColor);
	GetComponent(TreeQuality).thePeachTree = theTree;
	GetComponent(TreeQuality).peach = peachtree[theNumber];
	GetComponent(TreeQuality).peach_hd = peachtree_hd[theNumber];
	GetComponent(TreeQuality).SetLowQuality();
	theTreeShadow.renderer.material = peachtreeshadow[theNumber];
	theTreeShadow.GetComponent(ColorChange).SetColor(theColor);
	//影子位置
	theTreeShadow.localPosition.z = 1 + transform.position.y/10;
	//开启影子
	if (ifShadow) {
		theTreeShadow.gameObject.SetActive(true);
	}
	Destroy(this);

}
