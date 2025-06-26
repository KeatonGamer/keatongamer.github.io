//=============================================================================
// VisuStella MZ - Menu Cursor
// VisuMZ_4_MenuCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MenuCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MenuCursor = VisuMZ.MenuCursor || {};
VisuMZ.MenuCursor.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.09] [MenuCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Menu_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add a menu cursor that uses an icon or an image from the pictures or system
 * folder to help the player find out which windows are active quicker. The
 * subtle movements of a waving cursor can do wonders to grabbing the player's
 * attention to speed up the process of directing player focus.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as the menu cursor.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Alter the menu cursor mid-game through Plugin Commands, too!
 * * Automatically pad in-game windows to accommodate for cursor oscillation.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Animated Menu Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated menu cursor.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Menu Cursor Plugin Commands ===
 * 
 * ---
 *
 * Menu Cursor: Change Settings
 * - Changes the settings for the menu cursor's appearance.
 *
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Cursor Settings
 * ============================================================================
 *
 * This is where you can change the settings for the menu cursor.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Tiling
 * ============================================================================
 *
 * For added visual clarity, you can add a tiling background to the menu cursor
 * that can scroll, hue shift, and has a color tone.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable background tiling?
 * 
 *   Filename:
 *   - Filename of the parallax used for the tiling effect.
 *   - Leave empty to not use a background tile.
 *
 * ---
 *
 * Appearance
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the tiling?
 * 
 *   Buffer:
 *   - How many pixels should be used to buffer the tiling?
 * 
 *   Color Tone:
 *   - What tone do you want for the tiling?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Hue:
 *   - Do you wish to adjust this tiling's hue?
 * 
 *   Hue Shift:
 *   - How much do you want the hue to shift each frame?
 * 
 *   Opacity:
 *   - What is the opacity of the tiling effect?
 * 
 *   Scroll X Speed:
 *   Scroll Y Speed:
 *   - How fast should the tile effect scroll horizontally/vertically?
 *   - 0 for no scroll.
 *   - Negative values scroll the other way.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Blacklist Settings
 * ============================================================================
 * 
 * The menu cursor will not appear in these windows.
 * 
 * ---
 * 
 * Settings
 * 
 *   Window Blacklist:
 *   - Insert the names of the windows' constructors here
 *   - Example: Window_ItemCategory
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Padding Settings
 * ============================================================================
 *
 * Make some windows more padded to accommodate for the menu cursor's
 * oscillation. Because of the oscillation, the cursor would sometimes go over
 * the displayed text. These settings help pad the individual entries and shift
 * over the text to make room for the cursor to move back and forth at.
 *
 * ---
 *
 * Window Padding Settings
 * 
 *   All Windows:
 *   - How much extra item padding do you want for all windows?
 * 
 *   Window_MenuCommand:
 *   Window_MenuStatus:
 *   Window_MenuActor:
 *   Window_ItemCategory:
 *   Window_ItemList:
 *   Window_SkillType:
 *   Window_SkillList:
 *   Window_EquipCommand:
 *   Window_EquipSlot:
 *   Window_EquipItem:
 *   Window_Options:
 *   Window_SavefileList:
 *   Window_ShopCommand:
 *   Window_ShopBuy:
 *   Window_ShopSell:
 *   Window_NameInput:
 *   Window_ChoiceList:
 *   Window_EventItem:
 *   Window_PartyCommand:
 *   Window_ActorCommand:
 *   Window_BattleStatus:
 *   Window_BattleActor:
 *   Window_BattleEnemy:
 *   Window_BattleSkill:
 *   Window_BattleItem:
 *   Window_TitleCommand:
 *   Window_GameEnd:
 *   Window_DebugRange:
 *   Window_DebugEdit:
 *   Window_CommonEventMenuList:
 *   Window_QuestCommand:
 *   Window_QuestList:
 *   Window_TutorialList
 *   - How much extra item padding do you want for this window?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Harmless
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: May 18, 2023
 * * Bug Fixes!
 * ** Removed visual glitch when used together with Sideview Battle UI when
 *    selecting a target actor. Fix made by Irina.
 * 
 * Version 1.08: October 27, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.07: July 9, 2021
 * * Compatibility Update!
 * ** Added Item Crafting System's number window to the default list.
 * 
 * Version 1.06: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** "Background Tiling" series has been added for more visual clarity.
 * 
 * Version 1.05: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for removed feature.
 * * Feature Update!
 * ** "Window_NumberInput" for Window Padding Settings Plugin Parameter is now
 *    removed. This is due to numerous "bug reports" despite the issue of no
 *    numbers being shown having been fixed since v1.01. Since many users did
 *    not do a fresh reinstall of the plugin to fix the problem and continued
 *    to submit it as bug reports, we have decided it would be better to just
 *    hardcode the padding values for this window instead. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * ** Added "Window_ShopNumber" to the default black list.
 * 
 * Version 1.03: January 8, 2021
 * * Bug Fixes!
 * ** Menu Cursor will no longer show if there is no index selected. Fix made
 *    by Irina.
 * 
 * Version 1.02: January 1, 2021
 * * Feature Update!
 * ** Added "Window_Status" to the default black list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Changed the default value of the Window_NumberInput padding amount to 0
 *    from 16 so that numbers don't disappear. Fix made by Yanfly.
 *
 * Version 1.00: January 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCursorChangeSettings
 * @text Menu Cursor: Change Settings
 * @desc Changes the settings for the menu cursor's appearance.
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the menu cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default center
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default top
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MenuCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MenuCursor:struct
 * @text Menu Cursor
 * @type struct<MenuCursor>
 * @desc Default settings for the menu cursor's appearance.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"center","anchorY:str":"top","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param Tiling:struct
 * @text Background Tiling
 * @parent MenuCursor:struct
 * @type struct<Tiling>
 * @desc Background tiling settings for the menu cursor.
 * @default {"General":"","Enable:eval":"false","Filename:str":"StarlitSky","Appearance":"","BlendMode:num":"0","Buffer:num":"2","ColorTone:eval":"[0, 0, 0, 0]","Hue:num":"0","HueShift:num":"+0","Opacity:num":"255","ScrollX:num":"-1.25","ScrollY:num":"+0.5"}
 * 
 * @param CursorBlacklist:arraystr
 * @text Window Blacklist
 * @parent MenuCursor:struct
 * @type string[]
 * @desc The menu cursor will not appear in these windows.
 * @default ["Window_ItemCategory","Window_OptionsCategory","Window_Status","Window_ShopNumber","Window_ItemCraftingNumber"]
 *
 * @param WindowPadding:struct
 * @text Window Padding
 * @type struct<WindowPadding>
 * @desc Make some windows more padded to accommodate for the menu cursor's oscillation.
 * @default {"AllWindows_Padding:num":"0","Window_MenuCommand_Padding:num":"0","Window_MenuStatus_Padding:num":"0","Window_MenuActor_Padding:num":"0","Window_ItemCategory_Padding:num":"0","Window_ItemList_Padding:num":"0","Window_SkillType_Padding:num":"0","Window_SkillList_Padding:num":"0","Window_EquipCommand_Padding:num":"0","Window_EquipSlot_Padding:num":"16","Window_EquipItem_Padding:num":"0","Window_Options_Padding:num":"16","Window_SavefileList_Padding:num":"0","Window_ShopCommand_Padding:num":"0","Window_ShopBuy_Padding:num":"0","Window_ShopSell_Padding:num":"0","Window_NameInput_Padding:num":"0","Window_ChoiceList_Padding:num":"16","Window_EventItem_Padding:num":"0","Window_PartyCommand_Padding:num":"0","Window_ActorCommand_Padding:num":"0","Window_BattleStatus_Padding:num":"0","Window_BattleActor_Padding:num":"0","Window_BattleEnemy_Padding:num":"0","Window_BattleSkill_Padding:num":"0","Window_BattleItem_Padding:num":"0","Window_TitleCommand_Padding:num":"0","Window_GameEnd_Padding:num":"0","Window_DebugRange_Padding:num":"16","Window_DebugEdit_Padding:num":"16","Window_CommonEventMenuList_Padding:num":"0","Window_QuestCommand_Padding:num":"0","Window_QuestList_Padding:num":"16","Window_TutorialList_Padding:num":"16"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * MenuCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the menu cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default center
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default top
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
/* ----------------------------------------------------------------------------
 * Tiling Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tiling:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable background tiling?
 * @default false
 * 
 * @param Filename:str
 * @text Filename
 * @parent General
 * @type file
 * @dir img/parallaxes/
 * @desc Filename of the parallax used for the tiling effect.
 * Leave empty to not use a background tile.
 * @default StarlitSky
 * 
 * @param Appearance
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the tiling?
 * @default 0
 *
 * @param Buffer:num
 * @text Buffer
 * @parent Appearance
 * @type number
 * @desc How many pixels should be used to buffer the tiling?
 * @default 2
 *
 * @param ColorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the tiling?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Hue:num
 * @text Hue
 * @parent Appearance
 * @type number
 * @min 0
 * @max 360
 * @desc Do you wish to adjust this tiling's hue?
 * @default 0
 *
 * @param HueShift:num
 * @text Hue Shift
 * @parent Hue:num
 * @desc How much do you want the hue to shift each frame?
 * @default +0
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity of the tiling effect?
 * @default 255
 *
 * @param ScrollX:num
 * @text Scroll X Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll horizontally?
 * 0 for no scroll. Negative values scroll the other way.
 * @default -1.25
 *
 * @param ScrollY:num
 * @text Scroll Y Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll vertically?
 * 0 for no scroll. Negative values scroll the other way.
 * @default +0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Window Padding Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WindowPadding:
 *
 * @param AllWindows_Padding:num
 * @text All Windows
 * @type number
 * @desc How much extra item padding do you want for all windows?
 * @default 0
 *
 * @param Window_MenuCommand_Padding:num
 * @text Window_MenuCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuStatus_Padding:num
 * @text Window_MenuStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuActor_Padding:num
 * @text Window_MenuActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemCategory_Padding:num
 * @text Window_ItemCategory
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemList_Padding:num
 * @text Window_ItemList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillType_Padding:num
 * @text Window_SkillType
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillList_Padding:num
 * @text Window_SkillList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipCommand_Padding:num
 * @text Window_EquipCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipSlot_Padding:num
 * @text Window_EquipSlot
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EquipItem_Padding:num
 * @text Window_EquipItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_Options_Padding:num
 * @text Window_Options
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_SavefileList_Padding:num
 * @text Window_SavefileList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopCommand_Padding:num
 * @text Window_ShopCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopBuy_Padding:num
 * @text Window_ShopBuy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopSell_Padding:num
 * @text Window_ShopSell
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_NameInput_Padding:num
 * @text Window_NameInput
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ChoiceList_Padding:num
 * @text Window_ChoiceList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EventItem_Padding:num
 * @text Window_EventItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_PartyCommand_Padding:num
 * @text Window_PartyCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ActorCommand_Padding:num
 * @text Window_ActorCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleStatus_Padding:num
 * @text Window_BattleStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleActor_Padding:num
 * @text Window_BattleActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleEnemy_Padding:num
 * @text Window_BattleEnemy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleSkill_Padding:num
 * @text Window_BattleSkill
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleItem_Padding:num
 * @text Window_BattleItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_TitleCommand_Padding:num
 * @text Window_TitleCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_GameEnd_Padding:num
 * @text Window_GameEnd
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_DebugRange_Padding:num
 * @text Window_DebugRange
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_DebugEdit_Padding:num
 * @text Window_DebugEdit
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_CommonEventMenuList_Padding:num
 * @text Window_CommonEventMenuList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestCommand_Padding:num
 * @text Window_QuestCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestList_Padding:num
 * @text Window_QuestList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_TutorialList_Padding:num
 * @text Window_TutorialList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 */
//=============================================================================

const _0x3b9b34=_0x1671;function _0x3b0f(){const _0x3c9710=['picture','type','3167605CrIfWi','blendMode','updateParentWindow','Settings','update','updateAnchor','ARRAYJSON','createMenuCursor','positionY','children','potse','updateFrameColsRows','_updateBackgroundTilingDimensions','waveDistance','_cursorSprite','filters','initMenuCursorSettings','height','vkujW','offsetY','ConvertParams','frameDelay','horz','Filename','includes','addLoadListener','_createBackgroundTiling','_frameRows','trim','opacity','EVAL','left','format','setHue','origin','width','middle','pJNkO','refreshMenuCursorChildren','bind','map','system','description','_cursorBgTiling','Buffer','MenuCursor','positionX','yDirR','MqZWV','ScrollX','_scene','iconIndex','anchorX','setMenuCursor','bottom','updateFrameIcon','3122850wuGGqP','1479590TmPbiM','STR','kTPlF','2831400LhkNRz','setFrame','itemPadding','floor','updateOpacity','BlendMode','Window_Selectable_initialize','menuCursor','Window_BattleActor','_updateBackgroundTiling','removeChild','return\x200','8249568eLtogn','yRvTN','CursorBlacklist','_padding','updatePosition','_updateCursor','center','isMenuCursorBlacklisted','scale','round','parent','Game_System_initialize','_menuCursorData','addChild','bitmap','isUsingSideviewUiLayout','index','bWssW','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','XWhFe','%1_Padding','_clientArea','Window_createCursorSprite','ARRAYSTR','jmvFQ','IconSet','anchor','_createCursorSprite','setParentWindow','icon','3566UeWlfy','_cache','kRBXE','updateFrame','_menuCursorSprite','GPfln','MenuCursorChangeSettings','max','exit','systemFilename','ARRAYSTRUCT','_parentWindow','520261ZVfLlx','NUM','initMembers','_settings','iconHeight','xLRXb','call','log','_hue','_colorFilter','STRUCT','makeDeepCopy','move','Tiling','isVisible','top','_frameCols','jxOFs','create','name','VisuMZ_3_SideviewBattleUI','_updateBackgroundTilingHueShift','prototype','loadBitmap','right','vert','Opacity','iconWidth','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','status','ScrollY','waveType','qAihK','determineFrameColsRows','tVnJU','loadSystem','AllWindows_ItemPadding','Enable','_updateBackgroundTilingScroll','parse','active','match','KiSlC','constructor','615dwyPwS','updateScale','_frameIndex','Window_updateCursor','DrbQw','toUpperCase','updateWave','frameCount','pictureFilename','clamp','version','initialize','Window_Base_itemPadding','uevhm','xxXSr','_frameMax','offsetX'];_0x3b0f=function(){return _0x3c9710;};return _0x3b0f();}function _0x1671(_0x33807b,_0x40e1f4){const _0x3b0fb4=_0x3b0f();return _0x1671=function(_0x167178,_0x40ba78){_0x167178=_0x167178-0x184;let _0x2b47de=_0x3b0fb4[_0x167178];return _0x2b47de;},_0x1671(_0x33807b,_0x40e1f4);}(function(_0x552300,_0x16f879){const _0x712113=_0x1671,_0x8a3f4e=_0x552300();while(!![]){try{const _0x22bb55=-parseInt(_0x712113(0x1a4))/0x1+parseInt(_0x712113(0x198))/0x2*(-parseInt(_0x712113(0x1d0))/0x3)+-parseInt(_0x712113(0x21f))/0x4+parseInt(_0x712113(0x1e3))/0x5+parseInt(_0x712113(0x21b))/0x6+-parseInt(_0x712113(0x21c))/0x7+parseInt(_0x712113(0x22b))/0x8;if(_0x22bb55===_0x16f879)break;else _0x8a3f4e['push'](_0x8a3f4e['shift']());}catch(_0xe09154){_0x8a3f4e['push'](_0x8a3f4e['shift']());}}}(_0x3b0f,0x5cd24));var label=_0x3b9b34(0x210),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0xf39104){const _0x1512dc=_0x3b9b34;return _0xf39104[_0x1512dc(0x1c1)]&&_0xf39104[_0x1512dc(0x20d)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3b9b34(0x1e6)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x15ddd2,_0x29cffe){const _0x37bae8=_0x3b9b34;for(const _0x38477c in _0x29cffe){if('qAihK'===_0x37bae8(0x1c4)){if(_0x38477c[_0x37bae8(0x1cd)](/(.*):(.*)/i)){if(_0x37bae8(0x19a)!==_0x37bae8(0x192)){const _0x1a2a29=String(RegExp['$1']),_0x3a6b15=String(RegExp['$2'])[_0x37bae8(0x1d5)]()[_0x37bae8(0x1ff)]();let _0x1286f9,_0x2be118,_0x4ae09a;switch(_0x3a6b15){case _0x37bae8(0x1a5):_0x1286f9=_0x29cffe[_0x38477c]!==''?Number(_0x29cffe[_0x38477c]):0x0;break;case'ARRAYNUM':_0x2be118=_0x29cffe[_0x38477c]!==''?JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c]):[],_0x1286f9=_0x2be118[_0x37bae8(0x20b)](_0x2d0aa8=>Number(_0x2d0aa8));break;case _0x37bae8(0x201):_0x1286f9=_0x29cffe[_0x38477c]!==''?eval(_0x29cffe[_0x38477c]):null;break;case'ARRAYEVAL':_0x2be118=_0x29cffe[_0x38477c]!==''?JSON['parse'](_0x29cffe[_0x38477c]):[],_0x1286f9=_0x2be118['map'](_0x3a325b=>eval(_0x3a325b));break;case'JSON':_0x1286f9=_0x29cffe[_0x38477c]!==''?JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c]):'';break;case _0x37bae8(0x1e9):_0x2be118=_0x29cffe[_0x38477c]!==''?JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c]):[],_0x1286f9=_0x2be118[_0x37bae8(0x20b)](_0x1870f7=>JSON['parse'](_0x1870f7));break;case'FUNC':_0x1286f9=_0x29cffe[_0x38477c]!==''?new Function(JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c])):new Function(_0x37bae8(0x22a));break;case'ARRAYFUNC':_0x2be118=_0x29cffe[_0x38477c]!==''?JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c]):[],_0x1286f9=_0x2be118['map'](_0x68109e=>new Function(JSON[_0x37bae8(0x1cb)](_0x68109e)));break;case _0x37bae8(0x21d):_0x1286f9=_0x29cffe[_0x38477c]!==''?String(_0x29cffe[_0x38477c]):'';break;case _0x37bae8(0x191):_0x2be118=_0x29cffe[_0x38477c]!==''?JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c]):[],_0x1286f9=_0x2be118[_0x37bae8(0x20b)](_0x51653d=>String(_0x51653d));break;case _0x37bae8(0x1ae):_0x4ae09a=_0x29cffe[_0x38477c]!==''?JSON[_0x37bae8(0x1cb)](_0x29cffe[_0x38477c]):{},_0x1286f9=VisuMZ[_0x37bae8(0x1f7)]({},_0x4ae09a);break;case _0x37bae8(0x1a2):_0x2be118=_0x29cffe[_0x38477c]!==''?JSON['parse'](_0x29cffe[_0x38477c]):[],_0x1286f9=_0x2be118[_0x37bae8(0x20b)](_0x27c0cd=>VisuMZ[_0x37bae8(0x1f7)]({},JSON[_0x37bae8(0x1cb)](_0x27c0cd)));break;default:continue;}_0x15ddd2[_0x1a2a29]=_0x1286f9;}else for(const _0x5dcdbc of _0x3c3e43[_0x37bae8(0x1ec)]){_0x3044d6[_0x37bae8(0x209)](_0x5dcdbc);}}}else _0x5664cf['prototype'][_0x37bae8(0x1db)][_0x37bae8(0x1aa)](this),this[_0x37bae8(0x1a6)]();}return _0x15ddd2;},(_0x382e70=>{const _0x43fbd2=_0x3b9b34,_0x200b3c=_0x382e70[_0x43fbd2(0x1b7)];for(const _0x524c38 of dependencies){if(_0x43fbd2(0x1de)===_0x43fbd2(0x1b5))_0xa23240[_0x43fbd2(0x210)][_0x43fbd2(0x190)]['call'](this),this[_0x43fbd2(0x1fd)]();else{if(!Imported[_0x524c38]){if(_0x43fbd2(0x18b)!=='bWssW'){const _0x42473b=_0x3d21dc[_0x43fbd2(0x210)][_0x43fbd2(0x1e6)][_0x43fbd2(0x1b1)];if(!_0x42473b)return;const _0x1fbc21=this[_0x43fbd2(0x1f1)],_0x5d76ef=this[_0x43fbd2(0x20e)],_0x59ac3a=_0x42473b[_0x43fbd2(0x20f)];_0x5d76ef['move'](_0x1fbc21['x']+_0x59ac3a,_0x1fbc21['y']+_0x59ac3a,_0x5474f7[_0x43fbd2(0x19f)](_0x1fbc21[_0x43fbd2(0x206)]-_0x59ac3a*0x2,0x0),_0x2b205b[_0x43fbd2(0x19f)](_0x1fbc21[_0x43fbd2(0x1f4)]-_0x59ac3a*0x2,0x0));}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x43fbd2(0x203)](_0x200b3c,_0x524c38)),SceneManager['exit']();break;}}}}const _0xb48202=_0x382e70[_0x43fbd2(0x20d)];if(_0xb48202[_0x43fbd2(0x1cd)](/\[Version[ ](.*?)\]/i)){if(_0x43fbd2(0x22c)===_0x43fbd2(0x1dd)){if(!_0xbe5a55)return;_0x24741c[_0x43fbd2(0x1ea)]&&_0x93d4ae['createMenuCursor']();if(_0x157f8e[_0x43fbd2(0x1ec)])for(const _0x33825c of _0x567ec7[_0x43fbd2(0x1ec)]){_0x187f31[_0x43fbd2(0x209)](_0x33825c);}}else{const _0xbe1080=Number(RegExp['$1']);if(_0xbe1080!==VisuMZ[label][_0x43fbd2(0x1da)]){if('yDirR'===_0x43fbd2(0x212))alert(_0x43fbd2(0x18c)['format'](_0x200b3c,_0xbe1080)),SceneManager['exit']();else{this[_0x43fbd2(0x1d2)]++;if(this[_0x43fbd2(0x1d2)]>=this[_0x43fbd2(0x1df)])this['_frameIndex']=0x0;var _0x9dc11f=this['bitmap'][_0x43fbd2(0x206)]/this[_0x43fbd2(0x1b4)],_0x3e718a=this[_0x43fbd2(0x188)]['height']/this[_0x43fbd2(0x1fe)],_0x7f37b5=this['_frameIndex']%this['_frameCols']*_0x9dc11f,_0x2ec1f7=_0x51840a['floor'](this[_0x43fbd2(0x1d2)]/this[_0x43fbd2(0x1b4)])*_0x3e718a;this[_0x43fbd2(0x220)](_0x7f37b5,_0x2ec1f7,_0x9dc11f,_0x3e718a);}}}}if(_0xb48202[_0x43fbd2(0x1cd)](/\[Tier[ ](\d+)\]/i)){const _0x569211=Number(RegExp['$1']);if(_0x569211<tier){if(_0x43fbd2(0x1ce)!=='KiSlC')try{return _0x172ed1['MenuCursor'][_0x43fbd2(0x1dc)]['call'](this);}catch(_0x1c0ac6){return 0x8;}else alert(_0x43fbd2(0x1c0)[_0x43fbd2(0x203)](_0x200b3c,_0x569211,tier)),SceneManager[_0x43fbd2(0x1a0)]();}else tier=Math[_0x43fbd2(0x19f)](_0x569211,tier);}VisuMZ[_0x43fbd2(0x1f7)](VisuMZ[label][_0x43fbd2(0x1e6)],_0x382e70['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3b9b34(0x1b7)],_0x3b9b34(0x19e),_0x1a4af5=>{const _0x260933=_0x3b9b34;VisuMZ[_0x260933(0x1f7)](_0x1a4af5,_0x1a4af5);const _0x3c77e0=JsonEx[_0x260933(0x1af)](_0x1a4af5);$gameSystem[_0x260933(0x218)](_0x3c77e0);}),VisuMZ[_0x3b9b34(0x210)][_0x3b9b34(0x185)]=Game_System['prototype'][_0x3b9b34(0x1db)],Game_System[_0x3b9b34(0x1ba)][_0x3b9b34(0x1db)]=function(){const _0x4ad1c3=_0x3b9b34;VisuMZ[_0x4ad1c3(0x210)][_0x4ad1c3(0x185)][_0x4ad1c3(0x1aa)](this),this[_0x4ad1c3(0x1f3)]();},Game_System[_0x3b9b34(0x1ba)][_0x3b9b34(0x1f3)]=function(){const _0x3b96bd=_0x3b9b34;this[_0x3b96bd(0x186)]=JsonEx[_0x3b96bd(0x1af)](VisuMZ[_0x3b96bd(0x210)][_0x3b96bd(0x1e6)][_0x3b96bd(0x210)]);},Game_System[_0x3b9b34(0x1ba)]['menuCursor']=function(){const _0x53259a=_0x3b9b34;if(this[_0x53259a(0x186)]===undefined)this[_0x53259a(0x1f3)]();return this['_menuCursorData'];},Game_System['prototype'][_0x3b9b34(0x218)]=function(_0x400a16){const _0x30d14f=_0x3b9b34;this[_0x30d14f(0x186)]=_0x400a16,this[_0x30d14f(0x209)](SceneManager[_0x30d14f(0x215)]);},Game_System[_0x3b9b34(0x1ba)][_0x3b9b34(0x209)]=function(_0x58d3a3){const _0x5986ad=_0x3b9b34;if(!_0x58d3a3)return;_0x58d3a3[_0x5986ad(0x1ea)]&&_0x58d3a3['createMenuCursor']();if(_0x58d3a3[_0x5986ad(0x1ec)]){if(_0x5986ad(0x1ed)===_0x5986ad(0x208))this[_0x5986ad(0x223)](),this[_0x5986ad(0x1d1)](),this[_0x5986ad(0x19b)](),this[_0x5986ad(0x22f)](),this[_0x5986ad(0x1d6)]();else for(const _0x1a071a of _0x58d3a3[_0x5986ad(0x1ec)]){_0x5986ad(0x21e)!==_0x5986ad(0x1a9)?$gameSystem[_0x5986ad(0x209)](_0x1a071a):_0x3a90e1=_0x1f9ace[_0x5986ad(0x19f)](_0x47e403,_0x3f8a0b);}}};function Sprite_MenuCursor(){this['initialize'](...arguments);}Sprite_MenuCursor[_0x3b9b34(0x1ba)]=Object[_0x3b9b34(0x1b6)](Sprite[_0x3b9b34(0x1ba)]),Sprite_MenuCursor['prototype'][_0x3b9b34(0x1cf)]=Sprite_MenuCursor,Sprite_MenuCursor['prototype'][_0x3b9b34(0x1db)]=function(){const _0x7ef81f=_0x3b9b34;Sprite[_0x7ef81f(0x1ba)][_0x7ef81f(0x1db)][_0x7ef81f(0x1aa)](this),this[_0x7ef81f(0x1a6)]();},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x1a6)]=function(){const _0xcc2834=_0x3b9b34;this['_parentWindow']=null,this[_0xcc2834(0x1a7)]=null,this['_frameIndex']=0x0,this['_frameCols']=0x1,this[_0xcc2834(0x1fe)]=0x1,this[_0xcc2834(0x1df)]=0x1,this[_0xcc2834(0x199)]={'scale':{'x':0x1,'y':0x1}},this[_0xcc2834(0x200)]=0x0;},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x196)]=function(_0xb4960d){const _0x3486b9=_0x3b9b34;if(this[_0x3486b9(0x1a3)]===_0xb4960d)return;this[_0x3486b9(0x1a3)]=_0xb4960d;if(this[_0x3486b9(0x1a3)])_0x3486b9(0x1f5)!==_0x3486b9(0x1c6)?this['updateParentWindow']():(_0x2977f0['prototype'][_0x3486b9(0x1e7)][_0x3486b9(0x1aa)](this),this[_0x3486b9(0x1a3)]&&this[_0x3486b9(0x188)]&&this[_0x3486b9(0x188)][_0x3486b9(0x206)]>0x0?(this[_0x3486b9(0x223)](),this['updateScale'](),this[_0x3486b9(0x19b)](),this[_0x3486b9(0x22f)](),this[_0x3486b9(0x1d6)]()):this[_0x3486b9(0x200)]=0x0);else{if(_0x3486b9(0x18d)===_0x3486b9(0x213)){const _0x585813=_0x5d764f(_0x45c3a5['$1']);_0x585813<_0x1d2d69?(_0x1b0999(_0x3486b9(0x1c0)[_0x3486b9(0x203)](_0x507d65,_0x585813,_0x3b8d31)),_0x19e17d['exit']()):_0x4af4d3=_0xf32dac['max'](_0x585813,_0x54cb55);}else this['_settings']=null;}},Sprite_MenuCursor['prototype'][_0x3b9b34(0x1e5)]=function(){const _0x283a1b=_0x3b9b34;this['_settings']=$gameSystem[_0x283a1b(0x226)](),this[_0x283a1b(0x1e8)](),this[_0x283a1b(0x1bb)]();},Sprite_MenuCursor['prototype'][_0x3b9b34(0x1e8)]=function(){const _0x33a4a4=_0x3b9b34;switch(this[_0x33a4a4(0x1a7)][_0x33a4a4(0x217)]){case _0x33a4a4(0x202):this[_0x33a4a4(0x194)]['x']=0x0;break;case'center':this['anchor']['x']=0.5;break;case _0x33a4a4(0x1bc):this[_0x33a4a4(0x194)]['x']=0x1;break;}switch(this[_0x33a4a4(0x1a7)]['anchorY']){case _0x33a4a4(0x1b3):this['anchor']['y']=0x0;break;case _0x33a4a4(0x207):this['anchor']['y']=0.5;break;case _0x33a4a4(0x219):this[_0x33a4a4(0x194)]['y']=0x1;break;}},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x1bb)]=function(){const _0x291160=_0x3b9b34;if(!this[_0x291160(0x1a7)])return;switch(this[_0x291160(0x1a7)][_0x291160(0x1e2)]){case _0x291160(0x197):this['bitmap']=ImageManager[_0x291160(0x1c7)](_0x291160(0x193));break;case _0x291160(0x1e1):this['bitmap']=ImageManager['loadPicture'](this[_0x291160(0x1a7)]['pictureFilename']),this['determineFrameColsRows'](this[_0x291160(0x1a7)][_0x291160(0x1d8)]);break;case _0x291160(0x20c):this[_0x291160(0x188)]=ImageManager['loadSystem'](this[_0x291160(0x1a7)][_0x291160(0x1a1)]),this['determineFrameColsRows'](this[_0x291160(0x1a7)][_0x291160(0x1a1)]);break;}this['_frameIndex']=0x0,this[_0x291160(0x188)][_0x291160(0x1fc)](this[_0x291160(0x19b)][_0x291160(0x20a)](this,!![]));},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x1c5)]=function(_0x5eb451){const _0x192ccd=_0x3b9b34;_0x5eb451[_0x192ccd(0x1cd)](/\[(\d+)x(\d+)\]/i)?(this[_0x192ccd(0x1b4)]=Math[_0x192ccd(0x19f)](0x1,Number(RegExp['$1'])),this[_0x192ccd(0x1fe)]=Math['max'](0x1,Number(RegExp['$2']))):(this['_frameCols']=0x1,this[_0x192ccd(0x1fe)]=0x1),this['_frameMax']=this['_frameCols']*this[_0x192ccd(0x1fe)];},Sprite_MenuCursor['prototype'][_0x3b9b34(0x1e7)]=function(){const _0x3bdebd=_0x3b9b34;Sprite[_0x3bdebd(0x1ba)][_0x3bdebd(0x1e7)][_0x3bdebd(0x1aa)](this),this['_parentWindow']&&this[_0x3bdebd(0x188)]&&this['bitmap'][_0x3bdebd(0x206)]>0x0?(this[_0x3bdebd(0x223)](),this[_0x3bdebd(0x1d1)](),this[_0x3bdebd(0x19b)](),this[_0x3bdebd(0x22f)](),this[_0x3bdebd(0x1d6)]()):this[_0x3bdebd(0x200)]=0x0;},Sprite_MenuCursor[_0x3b9b34(0x1ba)]['updateOpacity']=function(){const _0xe66e72=_0x3b9b34;this['opacity']=this[_0xe66e72(0x1b2)]()?0xff:0x0;},Sprite_MenuCursor[_0x3b9b34(0x1ba)]['isVisible']=function(){const _0xed0661=_0x3b9b34,_0x2d9fe5=this[_0xed0661(0x1a3)];if(!_0x2d9fe5)return![];if(!_0x2d9fe5[_0xed0661(0x1cc)])return![];if(_0x2d9fe5[_0xed0661(0x18a)]()<0x0)return![];return!![];},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x1d1)]=function(){const _0x381e03=_0x3b9b34;if(!this[_0x381e03(0x184)])return;if(this[_0x381e03(0x200)]<=0x0)return;if(this['_cache'][_0x381e03(0x233)]['x']===this[_0x381e03(0x184)]['scale']['x']&&this[_0x381e03(0x199)][_0x381e03(0x233)]['y']===this[_0x381e03(0x184)][_0x381e03(0x233)]['y'])return;this[_0x381e03(0x233)]['x']=0x1/this[_0x381e03(0x184)]['scale']['x'],this[_0x381e03(0x233)]['y']=0x1/this[_0x381e03(0x184)][_0x381e03(0x233)]['y'],this[_0x381e03(0x199)][_0x381e03(0x233)]['x']=this[_0x381e03(0x184)]['scale']['x'],this[_0x381e03(0x199)][_0x381e03(0x233)]['y']=this[_0x381e03(0x184)][_0x381e03(0x233)]['y'];},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x19b)]=function(_0x48284c){const _0x40331b=_0x3b9b34;if(!_0x48284c){if(Graphics[_0x40331b(0x1d7)]%this[_0x40331b(0x1a7)][_0x40331b(0x1f8)]>0x0)return;}switch(this[_0x40331b(0x1a7)]['type']){case _0x40331b(0x197):this[_0x40331b(0x21a)]();break;case _0x40331b(0x1e1):case'system':this[_0x40331b(0x1ee)]();break;};},Sprite_MenuCursor[_0x3b9b34(0x1ba)][_0x3b9b34(0x21a)]=function(){const _0x246cf2=_0x3b9b34,_0x2e4d12=this[_0x246cf2(0x1a7)][_0x246cf2(0x216)],_0x5431f9=ImageManager[_0x246cf2(0x1bf)],_0x56aacf=ImageManager[_0x246cf2(0x1a8)],_0x194c9a=_0x2e4d12%0x10*_0x5431f9,_0x2d5b87=Math[_0x246cf2(0x222)](_0x2e4d12/0x10)*_0x56aacf;this[_0x246cf2(0x220)](_0x194c9a,_0x2d5b87,_0x5431f9,_0x56aacf);},Sprite_MenuCursor[_0x3b9b34(0x1ba)]['updateFrameColsRows']=function(){const _0xe0b6ef=_0x3b9b34;this[_0xe0b6ef(0x1d2)]++;if(this[_0xe0b6ef(0x1d2)]>=this[_0xe0b6ef(0x1df)])this[_0xe0b6ef(0x1d2)]=0x0;var _0x234da7=this['bitmap'][_0xe0b6ef(0x206)]/this[_0xe0b6ef(0x1b4)],_0x429cc4=this[_0xe0b6ef(0x188)][_0xe0b6ef(0x1f4)]/this[_0xe0b6ef(0x1fe)],_0x26d5c1=this[_0xe0b6ef(0x1d2)]%this[_0xe0b6ef(0x1b4)]*_0x234da7,_0x12396f=Math[_0xe0b6ef(0x222)](this['_frameIndex']/this['_frameCols'])*_0x429cc4;this['setFrame'](_0x26d5c1,_0x12396f,_0x234da7,_0x429cc4);},Sprite_MenuCursor['prototype'][_0x3b9b34(0x22f)]=function(){const _0x5956cc=_0x3b9b34;if(!this[_0x5956cc(0x184)])return;if(!this[_0x5956cc(0x1a3)])return;const _0x3d9cf8=this[_0x5956cc(0x1a3)][_0x5956cc(0x1f1)];if(!_0x3d9cf8){if(this[_0x5956cc(0x1a3)][_0x5956cc(0x1cf)]===Window_MenuCommand)console[_0x5956cc(0x1ab)](this[_0x5956cc(0x1f1)]);this['opacity']=0x0;return;}const _0x27f193=_0x3d9cf8[_0x5956cc(0x206)],_0x2a1316=_0x3d9cf8['height'],_0x48a72a=this[_0x5956cc(0x1a3)][_0x5956cc(0x18f)],_0x236f03=this[_0x5956cc(0x1a3)][_0x5956cc(0x22e)];switch(this[_0x5956cc(0x1a7)][_0x5956cc(0x211)]){case _0x5956cc(0x202):this['x']=_0x3d9cf8['x'];break;case _0x5956cc(0x231):this['x']=_0x3d9cf8['x']+Math[_0x5956cc(0x234)](_0x27f193/0x2);break;case _0x5956cc(0x1bc):this['x']=_0x3d9cf8['x']+_0x27f193;break;}switch(this[_0x5956cc(0x1a7)][_0x5956cc(0x1eb)]){case _0x5956cc(0x1b3):this['y']=_0x3d9cf8['y'];break;case _0x5956cc(0x207):this['y']=_0x3d9cf8['y']+Math[_0x5956cc(0x234)](_0x2a1316/0x2);break;case'bottom':this['y']=_0x3d9cf8['y']+_0x2a1316;break;}this['x']+=_0x48a72a['x'],this['y']+=_0x48a72a['y'],this['x']+=this[_0x5956cc(0x1a7)][_0x5956cc(0x1e0)],this['y']+=this[_0x5956cc(0x1a7)][_0x5956cc(0x1f6)],this['x']=this['x']['clamp'](_0x236f03,this[_0x5956cc(0x1a3)]['width']-_0x236f03),this['y']=this['y'][_0x5956cc(0x1d9)](_0x236f03,this[_0x5956cc(0x1a3)]['height']-_0x236f03);},Sprite_MenuCursor['prototype'][_0x3b9b34(0x1d6)]=function(){const _0x3276e2=_0x3b9b34,_0x2e32e1=this['_settings'][_0x3276e2(0x1c3)];if(_0x2e32e1==='none')return;if(this[_0x3276e2(0x1a7)]['waveDistance']<=0x0)return;const _0x55b437=this[_0x3276e2(0x1a7)][_0x3276e2(0x1f0)],_0x5b69d9=this[_0x3276e2(0x1a7)]['waveSpeed'],_0x1e0b49=Math[_0x3276e2(0x234)](Math['cos'](Graphics[_0x3276e2(0x1d7)]*_0x5b69d9)*_0x55b437);if(_0x2e32e1===_0x3276e2(0x1f9))this['x']+=_0x1e0b49;else _0x2e32e1===_0x3276e2(0x1bd)&&(this['y']+=_0x1e0b49);},VisuMZ['MenuCursor']['Window_Base_itemPadding']=Window_Base[_0x3b9b34(0x1ba)]['itemPadding'],Window_Base[_0x3b9b34(0x1ba)]['itemPadding']=function(){const _0x1f8554=_0x3b9b34,_0x440d5d=VisuMZ[_0x1f8554(0x210)][_0x1f8554(0x1e6)]['WindowPadding'];let _0x1fdca5=_0x440d5d[_0x1f8554(0x1c8)]||0x0;return _0x1fdca5+=_0x440d5d[_0x1f8554(0x18e)[_0x1f8554(0x203)](this[_0x1f8554(0x1cf)][_0x1f8554(0x1b7)])]||0x0,VisuMZ['MenuCursor'][_0x1f8554(0x1dc)][_0x1f8554(0x1aa)](this)+_0x1fdca5;},VisuMZ['MenuCursor'][_0x3b9b34(0x190)]=Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x195)],Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x195)]=function(){const _0x2a30d7=_0x3b9b34;VisuMZ[_0x2a30d7(0x210)][_0x2a30d7(0x190)][_0x2a30d7(0x1aa)](this),this[_0x2a30d7(0x1fd)]();},Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x1fd)]=function(){const _0x15d1f2=_0x3b9b34,_0x2d9e91=VisuMZ[_0x15d1f2(0x210)][_0x15d1f2(0x1e6)][_0x15d1f2(0x1b1)];if(!_0x2d9e91)return;if(!_0x2d9e91[_0x15d1f2(0x1c9)])return;if(_0x2d9e91[_0x15d1f2(0x1fa)]==='')return;this[_0x15d1f2(0x20e)]=new TilingSprite(),this[_0x15d1f2(0x20e)][_0x15d1f2(0x188)]=ImageManager['loadParallax'](_0x2d9e91['Filename']),this[_0x15d1f2(0x18f)][_0x15d1f2(0x187)](this[_0x15d1f2(0x20e)]),this[_0x15d1f2(0x20e)][_0x15d1f2(0x1f2)]=this[_0x15d1f2(0x20e)][_0x15d1f2(0x1f2)]||[],this[_0x15d1f2(0x20e)][_0x15d1f2(0x1ad)]=new ColorFilter(),this[_0x15d1f2(0x20e)]['filters']['push'](this['_cursorBgTiling'][_0x15d1f2(0x1ad)]),this[_0x15d1f2(0x20e)][_0x15d1f2(0x1e4)]=_0x2d9e91[_0x15d1f2(0x224)],this['_cursorBgTiling']['opacity']=_0x2d9e91[_0x15d1f2(0x1be)],this[_0x15d1f2(0x20e)][_0x15d1f2(0x1ad)][_0x15d1f2(0x1ac)]=_0x2d9e91['Hue']||0x0,this[_0x15d1f2(0x20e)][_0x15d1f2(0x1ad)]['setHue'](_0x2d9e91['Hue']||0x0),this[_0x15d1f2(0x20e)][_0x15d1f2(0x1ad)]['setColorTone'](_0x2d9e91['ColorTone']||[0x0,0x0,0x0,0x0]);},VisuMZ[_0x3b9b34(0x210)]['Window_updateCursor']=Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x230)],Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x230)]=function(){const _0x2d1b54=_0x3b9b34;VisuMZ[_0x2d1b54(0x210)][_0x2d1b54(0x1d3)][_0x2d1b54(0x1aa)](this),this[_0x2d1b54(0x228)]();},Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x228)]=function(){const _0x2a4701=_0x3b9b34;if(!this['_cursorBgTiling'])return;this[_0x2a4701(0x1ef)](),this['_updateBackgroundTilingScroll'](),this[_0x2a4701(0x1b9)]();},Window['prototype'][_0x3b9b34(0x1ef)]=function(){const _0x608990=_0x3b9b34,_0x210bb8=VisuMZ['MenuCursor'][_0x608990(0x1e6)][_0x608990(0x1b1)];if(!_0x210bb8)return;const _0xaa8421=this[_0x608990(0x1f1)],_0x54a120=this[_0x608990(0x20e)],_0x21371e=_0x210bb8[_0x608990(0x20f)];_0x54a120[_0x608990(0x1b0)](_0xaa8421['x']+_0x21371e,_0xaa8421['y']+_0x21371e,Math[_0x608990(0x19f)](_0xaa8421[_0x608990(0x206)]-_0x21371e*0x2,0x0),Math[_0x608990(0x19f)](_0xaa8421[_0x608990(0x1f4)]-_0x21371e*0x2,0x0));},Window['prototype'][_0x3b9b34(0x1ca)]=function(){const _0x3b41b1=_0x3b9b34;if(!this[_0x3b41b1(0x1cc)])return;const _0x2803d4=VisuMZ[_0x3b41b1(0x210)]['Settings'][_0x3b41b1(0x1b1)];if(!_0x2803d4)return;const _0x5c05c0=this[_0x3b41b1(0x20e)];_0x5c05c0[_0x3b41b1(0x205)]['x']+=_0x2803d4[_0x3b41b1(0x214)],_0x5c05c0[_0x3b41b1(0x205)]['y']+=_0x2803d4[_0x3b41b1(0x1c2)];},Window[_0x3b9b34(0x1ba)][_0x3b9b34(0x1b9)]=function(){const _0x3d91d0=_0x3b9b34;if(!this[_0x3d91d0(0x1cc)])return;const _0x47886f=VisuMZ[_0x3d91d0(0x210)][_0x3d91d0(0x1e6)][_0x3d91d0(0x1b1)];if(!_0x47886f)return;this[_0x3d91d0(0x20e)]['_colorFilter'][_0x3d91d0(0x1ac)]+=_0x47886f['HueShift'],this['_cursorBgTiling'][_0x3d91d0(0x1ad)][_0x3d91d0(0x204)](this[_0x3d91d0(0x20e)][_0x3d91d0(0x1ad)][_0x3d91d0(0x1ac)]);},VisuMZ[_0x3b9b34(0x210)]['Window_Selectable_initialize']=Window_Selectable[_0x3b9b34(0x1ba)][_0x3b9b34(0x1db)],Window_Selectable[_0x3b9b34(0x1ba)]['initialize']=function(_0x19f74b){const _0x5180de=_0x3b9b34;VisuMZ[_0x5180de(0x210)][_0x5180de(0x225)][_0x5180de(0x1aa)](this,_0x19f74b),this[_0x5180de(0x1ea)]();},Window_Selectable[_0x3b9b34(0x1ba)][_0x3b9b34(0x1ea)]=function(){const _0x5b8843=_0x3b9b34;if(this[_0x5b8843(0x232)]())return;this[_0x5b8843(0x19c)]&&(_0x5b8843(0x19d)===_0x5b8843(0x1d4)?(_0xb6e85c['match'](/\[(\d+)x(\d+)\]/i)?(this[_0x5b8843(0x1b4)]=_0x202bc2['max'](0x1,_0x4a3dda(_0x45666c['$1'])),this[_0x5b8843(0x1fe)]=_0x406a2a['max'](0x1,_0x3a7f44(_0x28e746['$2']))):(this[_0x5b8843(0x1b4)]=0x1,this['_frameRows']=0x1),this[_0x5b8843(0x1df)]=this[_0x5b8843(0x1b4)]*this['_frameRows']):(this[_0x5b8843(0x229)](this[_0x5b8843(0x19c)]),delete this[_0x5b8843(0x19c)])),this[_0x5b8843(0x19c)]=new Sprite_MenuCursor(),this[_0x5b8843(0x187)](this[_0x5b8843(0x19c)]),this[_0x5b8843(0x19c)][_0x5b8843(0x196)](this);},Window_Selectable['prototype'][_0x3b9b34(0x232)]=function(){const _0x50037e=_0x3b9b34;if(Imported[_0x50037e(0x1b8)]&&BattleManager[_0x50037e(0x189)]()){if(this[_0x50037e(0x1cf)][_0x50037e(0x1b7)]===_0x50037e(0x227))return!![];}const _0x597813=VisuMZ[_0x50037e(0x210)]['Settings'][_0x50037e(0x22d)]||[];return _0x597813[_0x50037e(0x1fb)](this[_0x50037e(0x1cf)]['name']);},Window_NumberInput[_0x3b9b34(0x1ba)][_0x3b9b34(0x221)]=function(){const _0x487710=_0x3b9b34;try{return VisuMZ[_0x487710(0x210)][_0x487710(0x1dc)][_0x487710(0x1aa)](this);}catch(_0x2ef096){return 0x8;}};