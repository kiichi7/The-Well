#pragma strict
private var lastLevel : int = -1;

function Start () {

}

function Update () {

	if (lastLevel != QualitySettings.GetQualityLevel()) {
		QualitySettings.IncreaseLevel(true);
		lastLevel = QualitySettings.GetQualityLevel();
	}
	else {
		Destroy(this);
	}

}