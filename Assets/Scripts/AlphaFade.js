var theTransparency : float = 0.2;
var isMeshFade : boolean = false;
private var fadeTime : float = -2;
private var theColorChange : ColorChange;
private var doTimer : int;
private var startFadeTime : float;

function Start () {

	if (isMeshFade) {
		if (GetComponent(ColorChange) == null) gameObject.AddComponent(ColorChange);
		theColorChange = GetComponent(ColorChange);
	}

}

function Update () {

	if (ShowTown.ifKeepFade) {
		if ((renderer != null)&&(renderer.isVisible)) {
			//if ((doTimer <3)&&((Time.time - startFadeTime)>0.2)) doTimer=0;
			//else 
			if (((Time.time - fadeTime) > 0.2)&&((Time.time - fadeTime) < 1.25)) {
				doTimer = 0;
				if (isMeshFade) {
					if (theColorChange.GetAlpha() < 1.0) {
						theColorChange.SetAlpha(theColorChange.GetAlpha() + Time.deltaTime);
					}
				}
				else {
					if (renderer.material.color.a < 1.0) {
						renderer.material.color.a += Time.deltaTime;
					}
				}
			}
		}
	}
	else {
		if (renderer != null) {
			if (isMeshFade) {
				if (theColorChange.GetAlpha() < 1.0) {
					theColorChange.SetAlpha(theColorChange.GetAlpha() + 0.2*Time.deltaTime);
				}
				else Destroy(this);
			}
			else {
				if (renderer.material.color.a < 1.0) {
					renderer.material.color.a += 0.2*Time.deltaTime;
				}
				else Destroy(this);
			}

		}
		else Destroy(this);
	}
	

}

function ColorFade () {

	//if (doTimer == 0) startFadeTime = Time.time;
	//else if (doTimer < 3) doTimer ++;
	//else {
		fadeTime = Time.time;
		for (var i = 0; i < transform.childCount; i++) {
			if (transform.GetChild(i).GetComponent("AlphaFade") != null) {
	      		transform.GetChild(i).GetComponent("AlphaFade").ColorFade(); 
	        }
		}
		if (gameObject.renderer != null) {
			if (isMeshFade) {
				if (theColorChange.GetAlpha() > theTransparency) {
					theColorChange.SetAlpha(theColorChange.GetAlpha() - Time.deltaTime);
				}
			}
			else {
				if (renderer.material.color.a > theTransparency) {
					renderer.material.color.a -= Time.deltaTime;
				}
			}
		}
	//}

}
