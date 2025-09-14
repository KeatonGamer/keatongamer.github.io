// Window_Base._faceWidth  = 96;
// Window_Base._faceHeight = 96;

// Window_Message.prototype.standardPadding = function() {
//     return 8;
// };

Window_Message.prototype.newLineX = function() {
    return $gameMessage.faceName() === '' ? 0 : 112; // padding from face to text
};

Window_Message.prototype.lineHeight = function() {
    return 24;
};

Window_Message.prototype.numVisibleRows = function() {
    return 4;
};

Window_Base._faceWidth  = 96;
Window_Base._faceHeight = 96;

Window_Message.prototype.standardPadding = function() {
    return 8;
};

var _WindowMessage_calcTextHeight_LHM = Window_Message.prototype.calcTextHeight; 
Window_Message.prototype.calcTextHeight = function(textState, all) {
    var offset = -10;
    return _WindowMessage_calcTextHeight_LHM.call(this, textState, all) + offset;
};


// // Yanfly Namebox

// Window_NameBox.prototype.lineHeight = function() {
//     return 24;
// };

// Window_NameBox.prototype.standardPadding = function() {
//     return 12;
// };

// Window_NameBox.prototype.windowHeight = function() {
//     return this.fittingHeight(2);

// };

// Window_NameBox.prototype.standardFontFace = function() {
//     return $gameSystem.getMessageFontName();
// };

// Window_NameBox.prototype.standardFontSize = function() {
//     // return $gameSystem.getMessageFontSize();
//     return 30
// };

// Window_Message.prototype.newLineX = function() {
//     return $gameMessage.faceName() === '' ? 0 : 112; // padding from face to text
// };

// Window_Message.prototype.lineHeight = function() {
//     return 24;
// };

// Window_Message.prototype.numVisibleRows = function() {
//     return 4;
// };