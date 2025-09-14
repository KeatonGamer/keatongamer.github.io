//=============================================================================
// Disable Async
//=============================================================================
 /*:
 * @plugindesc v1.00 Disables Asynchronous loading. Useful for instantly loading
 * files on sub directory.
 * @author Visustella
 */

_disableAsync = true
;(function() {
    const _load = Bitmap.load
    Bitmap.load = function(url) {
        Bitmap.stopUpdatePlz = true
        return _load.call(this, url)
    }

    const __onLoad = Bitmap.prototype._onLoad
    Bitmap.prototype._onLoad = function() {
        __onLoad.call(this)
        if (ImageManager.isReady()) {
            Bitmap.stopUpdatePlz = false
        }
    }

    const _updateScene = SceneManager.updateScene
    SceneManager.updateScene = function() {
        if (Bitmap.stopUpdatePlz) {
            return
        }
        _updateScene.call(this)
    }

    Sprite.prototype._onBitmapLoad = function(bitmapLoaded) {
        if (bitmapLoaded === this._bitmap) {
            this._frame.width = this._bitmap.width
            this._frame.height = this._bitmap.height
        }

        this._refresh()
    }
})()
