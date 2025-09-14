/*=============================================================================
 * OMORI -- Speed Up Walking Sprites
 * By Caethyril - https://forums.rpgmakerweb.com/index.php?members/caethyril.118196/
 *=============================================================================
 
//* -----------------------------------------------------------------------*/
//* Speeds up walking sprites for that 2014 OMORI feel
//* -----------------------------------------------------------------------*/


(function(alias) {
  Game_CharacterBase.prototype.animationWait = function() {
    return alias.apply(this, arguments) * 2 / 3;
  };
})(Game_CharacterBase.prototype.animationWait);

