#pragma strict
//0~3为线
var kind : int = 0;
//Tiling Scale
private var t : Vector2 = Vector2(1,1);
//Offset
private var o : Vector2 = Vector2(0,0);
//倒影图
var shadowTexture : Texture2D;
//是否是单独的边
var isEdge : boolean = false;

function Update () {

	var minV : float = 32/1024f;
	switch (kind) {
	//线条
		case 0:
			o.y = minV * Random.Range(0,3);
			t.y = minV;
			break;
		case 1:
			o.y = minV * Random.Range(3,6);
			t.y = minV;
			break;
		case 2:
			o.y = 2 * minV * Random.Range(3,6);
			t.y = 2 * minV;
		break;
		case 3:
			o.y = 2 * minV * Random.Range(6,9);
			t.y = 2 * minV;
		break;
	//门
		case 4:
			o.y = 2 * minV * 9;
			o.x = 4 * minV * Random.Range(0,6);
			t.y = 8 * minV;
			t.x = 4 * minV;
		break;
	//窗
		case 5:
			o.y = 2 * minV * (9 + 2*Random.Range(0,2));
			o.x = 4 * minV * 6;
			t.y = 4 * minV;
			t.x = 4 * minV;
		break;
	//台阶
		case 6:
			o.y = 2 * minV * Random.Range(9,13);
			o.x = 4 * minV * 7;
			t.y = 2 * minV;
			t.x = 4 * minV;
		break;
			
	}

	renderer.material.SetTextureScale ("_MainTex", t);
	renderer.material.SetTextureOffset ("_MainTex", o);
	if (transform.position.y < 0) renderer.material.mainTexture = shadowTexture;
	if (isEdge) {
		if (transform.position.y > 0.5) {
			var edgeShadow : GameObject;
			edgeShadow = Instantiate (gameObject, Vector3(transform.position.x,-transform.position.y,transform.position.z), transform.rotation);
			//edgeShadow.transform.localEulerAngles.x = -transform.localEulerAngles.x;
			edgeShadow.transform.parent = gameObject.transform;
			edgeShadow.transform.localScale.y = -1;
			edgeShadow.name = "EdgeShadow";
		}
	}
	Destroy(this);

}
