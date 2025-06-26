//=============================================================================
// KeatonGamer - Fixes for OMORI GR2 DEMO RECREATION (For RPG Maker MZ)
// KGMZ_OGDR_Fixes.js
//=============================================================================

var Imported = Imported || {};
Imported.KGMZ_OGDR_Fixes = true;

var KGMZ = KGMZ || {};
KGMZ.OGDRFixes = KGMZ.OGDRFixes || {};
KGMZ.OGDRFixes.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc Fixes for OMORI GR2 DEMO RECREATION
 * @author KeatonGamer
 * @url http://keatongamer1248.neocities.org/index.html
 * @orderAfter KGMZ_OGDR_Fixes
 */
//=============================================================================

//=============================================================================
// VX Ace Message Fix
//=============================================================================

// Icons
ImageManager.iconWidth = 24;
ImageManager.iconHeight = 24;

// Faces
ImageManager.faceWidth = 96;
ImageManager.faceHeight = 96;

Window_Message.prototype.drawMessageFace = function() {
    const faceName = $gameMessage.faceName();
    const faceIndex = $gameMessage.faceIndex();
    const rtl = $gameMessage.isRTL();
    const width = ImageManager.faceWidth;
    const height = this.innerHeight;
    const x = rtl ? this.innerWidth - width - 4 : 4;
    this.drawFace(faceName, faceIndex, x, 0, width, height);
	this.height = 120 // Message Height Fix
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};

Window_NameBox.prototype.lineHeight = function() {
    return 24;
};

Window_Base.prototype.standardFontSize = function() {
    return 29;
};

var _WindowMessage_calcTextHeight_LHM = Window_Message.prototype.calcTextHeight; 
Window_Message.prototype.calcTextHeight = function(textState, all) {
    var offset = -10;
    return _WindowMessage_calcTextHeight_LHM.call(this, textState, all) + offset;
};

var _WindowTitleCommand_calcTextHeight_OGDR_KG = Window_TitleCommand.prototype.calcTextHeight; 
Window_TitleCommand.prototype.calcTextHeight = function(textState, all) {
    var offset = -10;
    return _WindowTitleCommand_calcTextHeight_OGDR_KG.call(this, textState, all) + offset;
};

Window_TitleCommand.prototype.itemTextAlign = function() {
    return "left";
};

Window_Message.prototype.lineHeight = function() {
    return 32;
};