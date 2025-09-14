/*=============================================================================
 * Princess Princess BugFixes
//=============================================================================
/*:
 * @plugindesc <PrinPrin_BugFixes> v1.0 Contains Various Bug Fixes
 * @author Various
 * 
 * 
 * @help This plugin does not provide plugin commands.
 * 
 *  * >> Bug Fixes:
 * =============================================================================
 * 
 * ◆ Pixi GL Texture
 * ---------------------------------------------------------------------------
 * Transparent WebM videos does not clear previous alpha.
 * 
 * ◆ Pixi FPS Meter Fix
 * ---------------------------------------------------------------------------
 * The cause of this bug is that the pause function of fpsMeter called 
 * cancelAnimationFrame without checking is the frameId is created with 
 * requestAnimationFrame or setTimeout (it is determined by interval of 
 * fpsMeter), which cause it accidentally canceled request requested by others 
 * (PIXI.ticker.shared, in this case). This adds a check in fpsMeter's pause 
 * function. PIXI.ticker.shared is useful since DragonBones Runtime use it to 
 * update it's animation.
 * 
*/

var Imported = Imported || {};
Imported.PrinPrin_BugFixes = true;

//=============================================================================
// ** Set Parameters
//=============================================================================
var PrinPrin = PrinPrin || {};
PrinPrin.BugFixes = PrinPrin.BugFixes || {};

//=============================================================================
// ** Parameter Check
//=============================================================================
var parameters = $plugins.filter(function(p) {
    return p.description.contains('<PrinPrin_BugFixes>')
})[0].parameters;


//==============================================================================
// Editting anything past this point may potentially result in causing
// computer damage, incontinence, explosion of user's head, coma, death, and/or
// halitosis so edit at your own risk.
//==============================================================================

// ** Pixi GLTexture
//-----------------------------------------------------------------------------
// Fixes Transparency for WebM Files.
//-----------------------------------------------------------------------------
PIXI.glCore.GLTexture.prototype.upload = function(source) {
    this.bind();

    var gl = this.gl;

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);

    var isVideo = !!source.videoWidth;
    var newWidth = isVideo ? source.videoWidth : source.width;
    var newHeight = isVideo ? source.videoHeight : source.height;

    if (newHeight !== this.height || newWidth !== this.width || isVideo) {
        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source);
    } else {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source);
    }

    this.width = newWidth;
    this.height = newHeight;
}

// ** Pixi FPS Meter Fix
//-----------------------------------------------------------------------------
// Fixes whenever FPSMeter.js cancels PIXI.ticker.shared's _tick callback
//-----------------------------------------------------------------------------
const oldFPSMeter = FPSMeter;
FPSMeter = function() {
    oldFPSMeter.apply(this);
    const FPSMeter_pause = this.pause;
    this.pause = function() {
        FPSMeter_pause.apply(this);
        //sadly, we can't get frameId because of the fpsmeter.js is minified
        //so, restart ticker in all case.
        PIXI.ticker.shared._requestId = null;
        PIXI.ticker.shared._requestIfNeeded();
    }
}