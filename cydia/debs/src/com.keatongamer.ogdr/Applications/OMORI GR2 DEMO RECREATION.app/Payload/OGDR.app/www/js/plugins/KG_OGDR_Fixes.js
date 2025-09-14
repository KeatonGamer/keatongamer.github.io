//=============================================================================
// KeatonGamer - Fixes for OMORI GR2 DEMO RECREATION
// KG_OGDR_Fixes.js
//=============================================================================

var Imported = Imported || {};
Imported.KG_OGDR_Fixes = true;

var KeatonGamer = KeatonGamer || {};
KeatonGamer.OGDR_Fixes = KeatonGamer.OGDR_Fixes || {};
KeatonGamer.OGDR_Fixes.version = 1.00;

//=============================================================================
/*:
 * @plugindesc This script cotains bug fixes for OMORI GR2 DEMO RECREATION.
 * @author KeatonGamer
 * @help
 * ============================================================================
 * Instructions & Introduction
 * ============================================================================
 * Nothing here yet.
 */
//=============================================================================

KeatonGamer.Parameters = PluginManager.parameters('KG_OGDR_Fixes');

Window_TitleCommand.prototype.textPadding = function() {
    return 4;
};

Window_TitleCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    var height = this.windowHeight();
    this.updatePlacement();
    this.openness = 0;
    this.selectLast();
};

Window_TitleCommand.prototype.windowHeight = function() {
    return 96;
};

Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    this.addCommand(TextManager.newGame,   'newGame');
    // this.addCommand('Quit',   'options');
};

Window_Message.prototype.windowHeight = function() {
    return 120;
};

Window_ChoiceList.prototype.windowWidth = function() {
    var width = this.maxChoiceWidth() + this.padding * 2 + 4;
    return Math.min(width, Graphics.boxWidth);
};

Window_ChoiceList.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows()) + 4;
};

Window_ChoiceList.prototype.contentsHeight = function() {
    return this.maxItems() * this.itemHeight() + 8;
};

Window_ChoiceList.prototype.textPadding = function() {
    return 4;
};

Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
        return;
    }
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
        this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
		// this._dashing ? this._moveFrequency = 50 : this._moveFrequency = 88;
    } else {
        this._dashing = false;
    }
};

Game_Player.prototype.moveFrequency = function() {
    return this._moveFrequency;
};

function Scene_Logo() {
    this.initialize(...arguments);
}
    
Scene_Logo.prototype = Object.create(Scene_Base.prototype);
Scene_Logo.prototype.constructor = Scene_Logo;
	
Scene_Logo.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackgroundSprite();
    this.createSprites();
};

Scene_Logo.prototype.createBackgroundSprite = function() {
    var bg = new Sprite();
    bg.bitmap = ImageManager.loadSystem("SYS_white");
    bg.anchor.x = 0;
    bg.anchor.y = 0;
    bg.x = 0;
    bg.y = 0;
	bg.z = -10;
    this._bgSprite = bg;
    bg.opacity = 255;
    this.addChild(bg);
};

// Window_NameBox.prototype = Object.create(Window_NameBox.prototype);
// Window_NameBox.prototype.constructor = Window_NameBox;

// Window_NameBox.prototype.loadWindowskin = function() {
    // if ($gameSwitches.value(90) === true) {
		// this.windowskin = ImageManager.loadSystem('Window_DreamWorld');
	// } else {
		// this.windowskin = ImageManager.loadSystem('Window');
	// }
// };

Window_Base.prototype.loadWindowskin = function() {
	if ($gameSwitches.value(90)) {
		this.windowskin = ImageManager.loadSystem('Window_DreamWorld');
	} else {
		this.windowskin = ImageManager.loadSystem('Window');
	};
};