//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.56;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.56] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 * 
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Item, Weapon, and Armor Notetags
 * - Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *   option (only when selling).
 * - Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 *   - Default priority level is '50'.
 * - Items, weapons, and armors with higher priority values will be sorted
 *   higher up on the list while lower values will be lower on the list.
 * 
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 * 
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 * 
 * ---
 * 
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 * 
 * ---
 * 
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 * 
 * '''WARNING!''' If you are trying to calculate a value based off a full
 * parameter value, such as "ATK = user.atk * 0.10", it's going to break and
 * will cause an infinite loop. Use base parameter values instead.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following for skills and items:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'key' with one of the following for weapons and armors:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 *   - For those with VisuMZ_0_CoreEngine:
 *     - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *     - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 *   - When used with weapon or armor database objects, this information is
 *     only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 * 
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 * 
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Purify Plugin Commands ===
 * 
 * ---
 * 
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 * ---
 * 
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 * 
 *     Sort By:
 *     - Sort this category (in Scene_Item and Scene_Shop only) this way.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Data Style:
 *   - How do you wish to display equipment data?
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 *     Compare Style:
 * 
 *       Already Equipped:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       Can't Equip:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       No Changes:
 *       - Marker used to show no changes have occurred.
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Classic Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Double Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.56: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug where newly added equipment would cause crashes upon
 *    interaction. Fix made by Irina.
 * 
 * Version 1.55: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where you can no longer attempt to equip an actor with zero
 *    equip slots and causing a crash. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated <Status Info>
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** Replace 'key' with one of the following for weapons and armors:
 * ***** 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 * ***** For those with VisuMZ_0_CoreEngine:
 * ****** 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 * ****** 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 * **** Only relevant if the Draw Style for equipment is "classic" or "double".
 * ** Updated <Custom Status Info> notetag:
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** When used with weapon or armor database objects, this information is
 *      only relevant if the Draw Style for equipment is "classic" or "double".
 * * New Feature!
 * ** New Plugin Parameters: 
 * *** Parameters > Shop Status Window > Data Style:
 * **** How do you wish to display equipment data?
 * ***** Compare - Compares selected equip to equipped gear
 * ****** Lists all main party actors
 * ****** Displays the parameter differences when equipped
 * ****** Calculates custom JS values
 * ***** Classic - Shows basic parameters of selected equip
 * ***** Double - Shows basic parameters in double columns
 * ****** Involves no actors, only shows the item's stats
 * ****** Shows weapon or armor specific parameters
 * ****** Does not show custom JS values as those are calculated per actor
 * ****** Does not show custom parameters as those are calculated per actor
 * ****** Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *        add custom data to classic equip data
 * **** Data Style > Classic Style:
 * **** Data Style > Double Style:
 * ***** Added Weapon Params
 * ***** Added Armor Params
 * ****** Display these parameters when a weapon/armor is selected.
 * ****** Requires VisuMZ_0_CoreEngine!
 * 
 * Version 1.54: October 17, 2024
 * * Feature Update!
 * ** If "Modern Controls" is selected while "Remove Equip" and "Optimize" are
 *    gone from the Equip Menu, right click will exit the menu. Feature added
 *    by Arisu.
 * 
 * Version 1.53: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added warning to <JS Parameters>:
 * *** If you are trying to calculate a value based off a full parameter value,
 *     such as "ATK = user.atk * 0.10", it's going to break and will cause an
 *     infinite loop. Use base parameter values instead.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *      option (only when selling).
 * **** Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 * **** Default priority level is '50'.
 * **** Items, weapons, and armors with higher priority values will be sorted
 *      higher up on the list while lower values will be lower on the list.
 * 
 * Version 1.52: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Item Categories > Category List > Category > Sorted By:
 * **** You can now sort specific item categories by ID or Name.
 * **** Only usable within Scene_Item and Scene_Shop.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 * 
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 * 
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 * 
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 * 
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"[\"HIT\"]","ClassicArmorParameters:arraystr":"[\"EVA\"]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"[\"HIT\",\"CNT\"]","DoubleArmorParameters:arraystr":"[\"EVA\",\"GRD\"]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @option ID
 * @option Name
 * @desc Sort this category (in Scene_Item and Scene_Shop only) this way.
 * @default ID
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 * 
 * @param EquipDataStyle:str
 * @text Data Style
 * @parent EquipData
 * @type select
 * @option Compare - Compares selected equip to equipped gear
 * @value compare
 * @option Classic - Shows basic parameters of selected equip
 * @value classic
 * @option Double - Shows basic parameters in double columns
 * @value double
 * @desc How do you wish to display equipment data?
 * @default compare
 *
 * @param EquipDataCompare
 * @text Compare Style
 * @parent EquipDataStyle:str
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipDataCompare
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataCompare
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param EquipDataClassic
 * @text Classic Style
 * @parent EquipDataStyle:str
 *
 * @param ClassicWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT"]
 *
 * @param ClassicArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA"]
 *
 * @param DrawEquipClassicData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataClassic
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDataDouble
 * @text Double Style
 * @parent EquipDataStyle:str
 *
 * @param DoubleWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT","CNT"]
 *
 * @param DoubleArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA","GRD"]
 *
 * @param DrawEquipDoubleData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataDouble
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 * @text Data Settings
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 * @param EquipType
 * @parent Vocabulary
 * @text Equip Type
 *
 * @param WeaponType:str
 * @text Weapon Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Weapon Type
 *
 * @param ArmorType:str
 * @text Armor Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Armor Type
 *
 * @param NoEquipTypeResult:str
 * @text No Equip Type
 * @parent EquipType
 * @desc Marker used to show an unlisted equip type.
 * @default -
 *
 */
//=============================================================================

const _0x5b2ecf=_0x2b45;(function(_0x323b2c,_0x914202){const _0x584f2f=_0x2b45,_0x244ec4=_0x323b2c();while(!![]){try{const _0x273782=-parseInt(_0x584f2f(0x13a))/0x1+parseInt(_0x584f2f(0x507))/0x2*(-parseInt(_0x584f2f(0x435))/0x3)+parseInt(_0x584f2f(0x378))/0x4*(-parseInt(_0x584f2f(0x2af))/0x5)+parseInt(_0x584f2f(0x31c))/0x6*(parseInt(_0x584f2f(0x38d))/0x7)+-parseInt(_0x584f2f(0x428))/0x8*(parseInt(_0x584f2f(0x21f))/0x9)+-parseInt(_0x584f2f(0x2f9))/0xa+-parseInt(_0x584f2f(0x4d2))/0xb*(-parseInt(_0x584f2f(0x42b))/0xc);if(_0x273782===_0x914202)break;else _0x244ec4['push'](_0x244ec4['shift']());}catch(_0x40d322){_0x244ec4['push'](_0x244ec4['shift']());}}}(_0x93d3,0x6e902));var label=_0x5b2ecf(0x11a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5b2ecf(0x341)](function(_0x19662a){const _0x1723ab=_0x5b2ecf;return _0x19662a[_0x1723ab(0x3be)]&&_0x19662a[_0x1723ab(0x19f)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x5b2ecf(0x1ea)]=function(_0x29dbe2,_0x35bf43){const _0x3d6f9f=_0x5b2ecf;for(const _0x590c9a in _0x35bf43){if(_0x590c9a[_0x3d6f9f(0x3f2)](/(.*):(.*)/i)){const _0x3301e2=String(RegExp['$1']),_0x3698f8=String(RegExp['$2'])[_0x3d6f9f(0x505)]()[_0x3d6f9f(0xe8)]();let _0x5e2b2f,_0x275e3c,_0x4e37db;switch(_0x3698f8){case _0x3d6f9f(0x38f):_0x5e2b2f=_0x35bf43[_0x590c9a]!==''?Number(_0x35bf43[_0x590c9a]):0x0;break;case _0x3d6f9f(0x1ce):_0x275e3c=_0x35bf43[_0x590c9a]!==''?JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a]):[],_0x5e2b2f=_0x275e3c[_0x3d6f9f(0x4ec)](_0x4e0cce=>Number(_0x4e0cce));break;case _0x3d6f9f(0x3fe):_0x5e2b2f=_0x35bf43[_0x590c9a]!==''?eval(_0x35bf43[_0x590c9a]):null;break;case _0x3d6f9f(0xca):_0x275e3c=_0x35bf43[_0x590c9a]!==''?JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a]):[],_0x5e2b2f=_0x275e3c[_0x3d6f9f(0x4ec)](_0x18aa81=>eval(_0x18aa81));break;case _0x3d6f9f(0x4fb):_0x5e2b2f=_0x35bf43[_0x590c9a]!==''?JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a]):'';break;case _0x3d6f9f(0x4a5):_0x275e3c=_0x35bf43[_0x590c9a]!==''?JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a]):[],_0x5e2b2f=_0x275e3c[_0x3d6f9f(0x4ec)](_0x175d71=>JSON[_0x3d6f9f(0x17f)](_0x175d71));break;case _0x3d6f9f(0x147):_0x5e2b2f=_0x35bf43[_0x590c9a]!==''?new Function(JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a])):new Function(_0x3d6f9f(0x208));break;case _0x3d6f9f(0x338):_0x275e3c=_0x35bf43[_0x590c9a]!==''?JSON['parse'](_0x35bf43[_0x590c9a]):[],_0x5e2b2f=_0x275e3c[_0x3d6f9f(0x4ec)](_0x4a241f=>new Function(JSON[_0x3d6f9f(0x17f)](_0x4a241f)));break;case _0x3d6f9f(0x307):_0x5e2b2f=_0x35bf43[_0x590c9a]!==''?String(_0x35bf43[_0x590c9a]):'';break;case _0x3d6f9f(0x3d6):_0x275e3c=_0x35bf43[_0x590c9a]!==''?JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a]):[],_0x5e2b2f=_0x275e3c[_0x3d6f9f(0x4ec)](_0x43b6c6=>String(_0x43b6c6));break;case _0x3d6f9f(0x3e2):_0x4e37db=_0x35bf43[_0x590c9a]!==''?JSON[_0x3d6f9f(0x17f)](_0x35bf43[_0x590c9a]):{},_0x29dbe2[_0x3301e2]={},VisuMZ['ConvertParams'](_0x29dbe2[_0x3301e2],_0x4e37db);continue;case _0x3d6f9f(0x4c2):_0x275e3c=_0x35bf43[_0x590c9a]!==''?JSON['parse'](_0x35bf43[_0x590c9a]):[],_0x5e2b2f=_0x275e3c[_0x3d6f9f(0x4ec)](_0x1fc978=>VisuMZ[_0x3d6f9f(0x1ea)]({},JSON['parse'](_0x1fc978)));break;default:continue;}_0x29dbe2[_0x3301e2]=_0x5e2b2f;}}return _0x29dbe2;},(_0x1b443d=>{const _0x435c55=_0x5b2ecf,_0x18a591=_0x1b443d[_0x435c55(0x4df)];for(const _0x422b05 of dependencies){if(!Imported[_0x422b05]){alert(_0x435c55(0x4da)[_0x435c55(0x350)](_0x18a591,_0x422b05)),SceneManager['exit']();break;}}const _0x1f1814=_0x1b443d[_0x435c55(0x19f)];if(_0x1f1814[_0x435c55(0x3f2)](/\[Version[ ](.*?)\]/i)){const _0x4c2940=Number(RegExp['$1']);_0x4c2940!==VisuMZ[label][_0x435c55(0x2cc)]&&(alert(_0x435c55(0x471)[_0x435c55(0x350)](_0x18a591,_0x4c2940)),SceneManager[_0x435c55(0x1c5)]());}if(_0x1f1814['match'](/\[Tier[ ](\d+)\]/i)){const _0x311c86=Number(RegExp['$1']);_0x311c86<tier?(alert(_0x435c55(0x275)[_0x435c55(0x350)](_0x18a591,_0x311c86,tier)),SceneManager['exit']()):tier=Math[_0x435c55(0x3c2)](_0x311c86,tier);}VisuMZ[_0x435c55(0x1ea)](VisuMZ[label]['Settings'],_0x1b443d[_0x435c55(0x4f3)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x5b2ecf(0x4df)],_0x5b2ecf(0x339),_0xf251f9=>{const _0x31c421=_0x5b2ecf;VisuMZ[_0x31c421(0x1ea)](_0xf251f9,_0xf251f9);const _0x18a768=_0xf251f9[_0x31c421(0x48a)][_0x31c421(0x4ec)](_0x428653=>$gameActors[_0x31c421(0x181)](_0x428653)),_0x4d6eae=_0xf251f9[_0x31c421(0x287)][_0x31c421(0x4ec)](_0x20adf7=>$dataSystem[_0x31c421(0x172)][_0x31c421(0x455)](_0x20adf7[_0x31c421(0xe8)]()));for(const _0x1c1759 of _0x18a768){if(!_0x1c1759)continue;_0x1c1759[_0x31c421(0x416)](_0x4d6eae);}}),PluginManager[_0x5b2ecf(0x34b)](pluginData['name'],_0x5b2ecf(0x385),_0x4aa144=>{const _0x283975=_0x5b2ecf;VisuMZ['ConvertParams'](_0x4aa144,_0x4aa144);const _0x2e78a8=_0x4aa144[_0x283975(0x48a)]['map'](_0x487349=>$gameActors['actor'](_0x487349));for(const _0x2020f3 of _0x2e78a8){if(!_0x2020f3)continue;_0x2020f3[_0x283975(0x4ad)]();}}),PluginManager[_0x5b2ecf(0x34b)](pluginData['name'],_0x5b2ecf(0x44f),_0x2270c4=>{const _0x51f58c=_0x5b2ecf;if($gameParty[_0x51f58c(0x1be)]())return;VisuMZ['ConvertParams'](_0x2270c4,_0x2270c4);const _0x29f380=_0x2270c4[_0x51f58c(0x48a)][_0x51f58c(0x4ec)](_0x38bba9=>$gameActors['actor'](_0x38bba9));for(const _0xbb0a89 of _0x29f380){if(!_0xbb0a89)continue;_0xbb0a89[_0x51f58c(0x29a)]();}}),PluginManager[_0x5b2ecf(0x34b)](pluginData[_0x5b2ecf(0x4df)],'PurifyParty',_0x40588c=>{const _0x20529b=_0x5b2ecf;if($gameParty[_0x20529b(0x1be)]())return;$gameParty['purifyCursedEquips']();}),PluginManager[_0x5b2ecf(0x34b)](pluginData[_0x5b2ecf(0x4df)],'BatchShop',_0x28f56e=>{const _0x37f9ec=_0x5b2ecf;VisuMZ[_0x37f9ec(0x1ea)](_0x28f56e,_0x28f56e);const _0xd320a0=[],_0x205bbf=_0x28f56e[_0x37f9ec(0x491)][_0x37f9ec(0x4ec)](_0x1ba7fc=>_0x1ba7fc['toUpperCase']()[_0x37f9ec(0xe8)]()),_0x38f73b=_0x28f56e['Whitelist'][_0x37f9ec(0x4ec)](_0x22b5cf=>_0x22b5cf[_0x37f9ec(0x505)]()[_0x37f9ec(0xe8)]()),_0x2816e1=_0x28f56e['Step1End']>=_0x28f56e[_0x37f9ec(0x3ae)]?_0x28f56e[_0x37f9ec(0x3ae)]:_0x28f56e[_0x37f9ec(0x1d0)],_0x290b85=_0x28f56e[_0x37f9ec(0x1d0)]>=_0x28f56e['Step1Start']?_0x28f56e[_0x37f9ec(0x1d0)]:_0x28f56e[_0x37f9ec(0x3ae)],_0x2d189f=Array(_0x290b85-_0x2816e1+0x1)[_0x37f9ec(0x2a3)]()[_0x37f9ec(0x4ec)]((_0x31e55b,_0x47177)=>_0x2816e1+_0x47177);for(const _0x1924c6 of _0x2d189f){const _0x177192=$dataItems[_0x1924c6];if(!_0x177192)continue;if(!VisuMZ[_0x37f9ec(0x11a)][_0x37f9ec(0x4ac)](_0x177192,_0x205bbf,_0x38f73b))continue;_0xd320a0[_0x37f9ec(0x1bf)]([0x0,_0x1924c6,0x0,_0x177192['price']]);}const _0x58b467=_0x28f56e[_0x37f9ec(0x456)]>=_0x28f56e[_0x37f9ec(0x312)]?_0x28f56e[_0x37f9ec(0x312)]:_0x28f56e[_0x37f9ec(0x456)],_0x2e218c=_0x28f56e['Step2End']>=_0x28f56e[_0x37f9ec(0x312)]?_0x28f56e['Step2End']:_0x28f56e['Step2Start'],_0x1483e4=Array(_0x2e218c-_0x58b467+0x1)['fill']()[_0x37f9ec(0x4ec)]((_0x2720ea,_0x5f56df)=>_0x58b467+_0x5f56df);for(const _0x2c3a58 of _0x1483e4){const _0x3195d9=$dataWeapons[_0x2c3a58];if(!_0x3195d9)continue;if(!VisuMZ[_0x37f9ec(0x11a)][_0x37f9ec(0x4ac)](_0x3195d9,_0x205bbf,_0x38f73b))continue;_0xd320a0[_0x37f9ec(0x1bf)]([0x1,_0x2c3a58,0x0,_0x3195d9[_0x37f9ec(0x3fd)]]);}const _0x193c52=_0x28f56e['Step3End']>=_0x28f56e[_0x37f9ec(0x1ab)]?_0x28f56e[_0x37f9ec(0x1ab)]:_0x28f56e[_0x37f9ec(0x365)],_0xd53c92=_0x28f56e[_0x37f9ec(0x365)]>=_0x28f56e[_0x37f9ec(0x1ab)]?_0x28f56e[_0x37f9ec(0x365)]:_0x28f56e[_0x37f9ec(0x1ab)],_0x38cfe9=Array(_0xd53c92-_0x193c52+0x1)[_0x37f9ec(0x2a3)]()['map']((_0x152538,_0x5d7faa)=>_0x193c52+_0x5d7faa);for(const _0x1f3ed9 of _0x38cfe9){const _0x30ed29=$dataArmors[_0x1f3ed9];if(!_0x30ed29)continue;if(!VisuMZ[_0x37f9ec(0x11a)]['IncludeShopItem'](_0x30ed29,_0x205bbf,_0x38f73b))continue;_0xd320a0[_0x37f9ec(0x1bf)]([0x2,_0x1f3ed9,0x0,_0x30ed29[_0x37f9ec(0x3fd)]]);}SceneManager[_0x37f9ec(0x1bf)](Scene_Shop),SceneManager['prepareNextScene'](_0xd320a0,_0x28f56e['PurchaseOnly']);}),VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x4ac)]=function(_0xf754,_0x35a055,_0x1692f3){const _0x3076c5=_0x5b2ecf;if(_0xf754[_0x3076c5(0x4df)][_0x3076c5(0xe8)]()==='')return![];if(_0xf754['name']['match'](/-----/i))return![];const _0x27cb28=_0xf754[_0x3076c5(0x225)];if(_0x35a055[_0x3076c5(0x3e7)]>0x0)for(const _0x26aa26 of _0x35a055){if(!_0x26aa26)continue;if(_0x27cb28[_0x3076c5(0x4a1)](_0x26aa26))return![];}if(_0x1692f3[_0x3076c5(0x3e7)]>0x0){for(const _0x6b51d6 of _0x1692f3){if(!_0x6b51d6)continue;if(_0x27cb28[_0x3076c5(0x4a1)](_0x6b51d6))return!![];}return![];}return!![];},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x1fe)]=Scene_Boot[_0x5b2ecf(0x138)]['onDatabaseLoaded'],Scene_Boot[_0x5b2ecf(0x138)]['onDatabaseLoaded']=function(){const _0x3c7aa2=_0x5b2ecf;this[_0x3c7aa2(0x434)](),VisuMZ['ItemsEquipsCore'][_0x3c7aa2(0x1fe)][_0x3c7aa2(0x4b6)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags'](),VisuMZ['ItemsEquipsCore'][_0x3c7aa2(0x38a)](),VisuMZ['ItemsEquipsCore'][_0x3c7aa2(0x216)]();},Scene_Boot[_0x5b2ecf(0x138)][_0x5b2ecf(0x434)]=function(){const _0x1e0f56=_0x5b2ecf;VisuMZ[_0x1e0f56(0x11a)]['RegExp']={},VisuMZ[_0x1e0f56(0x11a)][_0x1e0f56(0x4d0)]['EquipParams']=[],VisuMZ[_0x1e0f56(0x11a)][_0x1e0f56(0x4d0)][_0x1e0f56(0x4db)]=[];const _0x1415bb=[_0x1e0f56(0xff),_0x1e0f56(0x2fa),_0x1e0f56(0x3f4),_0x1e0f56(0x501),_0x1e0f56(0x2a2),_0x1e0f56(0x342),_0x1e0f56(0x1fb),_0x1e0f56(0x3bd)];for(const _0x360121 of _0x1415bb){const _0x58c88c=_0x1e0f56(0x202)['format'](_0x360121);VisuMZ[_0x1e0f56(0x11a)]['RegExp'][_0x1e0f56(0x14e)][_0x1e0f56(0x1bf)](new RegExp(_0x58c88c,'i'));const _0x4dc57e=_0x1e0f56(0x37a)[_0x1e0f56(0x350)](_0x360121);VisuMZ[_0x1e0f56(0x11a)][_0x1e0f56(0x4d0)][_0x1e0f56(0x4db)]['push'](new RegExp(_0x4dc57e,'g'));}},Scene_Boot[_0x5b2ecf(0x138)][_0x5b2ecf(0x2c9)]=function(){const _0x45b514=_0x5b2ecf;if(VisuMZ[_0x45b514(0x50c)])return;this[_0x45b514(0x3e9)]();const _0x6f4218=[$dataItems,$dataWeapons,$dataArmors];for(const _0x184adf of _0x6f4218){for(const _0x55d07c of _0x184adf){if(!_0x55d07c)continue;VisuMZ[_0x45b514(0x11a)][_0x45b514(0x27c)](_0x55d07c,_0x184adf),VisuMZ['ItemsEquipsCore'][_0x45b514(0x238)](_0x55d07c,_0x184adf),VisuMZ[_0x45b514(0x11a)]['Parse_Notetags_ParamValues'](_0x55d07c,_0x184adf),VisuMZ[_0x45b514(0x11a)][_0x45b514(0x274)](_0x55d07c,_0x184adf),VisuMZ[_0x45b514(0x11a)]['Parse_Notetags_EnableJS'](_0x55d07c,_0x184adf);}}},Scene_Boot['prototype'][_0x5b2ecf(0x3e9)]=function(){const _0x362a98=_0x5b2ecf;for(const _0x552bbc of $dataClasses){if(!_0x552bbc)continue;VisuMZ[_0x362a98(0x11a)][_0x362a98(0x176)](_0x552bbc);}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x479)]=VisuMZ[_0x5b2ecf(0x479)],VisuMZ[_0x5b2ecf(0x479)]=function(_0xd4eff4){const _0x45b081=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x45b081(0x479)]['call'](this,_0xd4eff4),VisuMZ[_0x45b081(0x11a)][_0x45b081(0x176)](_0xd4eff4);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x234)]=VisuMZ[_0x5b2ecf(0x234)],VisuMZ[_0x5b2ecf(0x234)]=function(_0x2d348b){const _0x158330=_0x5b2ecf;VisuMZ[_0x158330(0x11a)][_0x158330(0x234)][_0x158330(0x4b6)](this,_0x2d348b),VisuMZ[_0x158330(0x11a)][_0x158330(0x30d)](_0x2d348b,$dataItems);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0xe3)]=VisuMZ[_0x5b2ecf(0xe3)],VisuMZ[_0x5b2ecf(0xe3)]=function(_0x3fa328){const _0x39788b=_0x5b2ecf;VisuMZ[_0x39788b(0x11a)][_0x39788b(0xe3)][_0x39788b(0x4b6)](this,_0x3fa328),VisuMZ[_0x39788b(0x11a)]['Parse_Notetags_Batch'](_0x3fa328,$dataWeapons);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x2ff)]=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x5d9134){const _0x25c0dd=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x25c0dd(0x2ff)][_0x25c0dd(0x4b6)](this,_0x5d9134),VisuMZ[_0x25c0dd(0x11a)][_0x25c0dd(0x30d)](_0x5d9134,$dataArmors);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x176)]=function(_0x1d42c6){const _0x499ba0=_0x5b2ecf;_0x1d42c6[_0x499ba0(0x460)]=[];const _0x2a7a2c=$dataSystem['equipTypes'][_0x499ba0(0x4ec)](_0x4f3109=>_0x4f3109?_0x4f3109[_0x499ba0(0xe8)]():'');if(!BattleManager[_0x499ba0(0x127)]()&&_0x1d42c6[_0x499ba0(0x106)][_0x499ba0(0x3f2)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x3ff5f0=String(RegExp['$1'])[_0x499ba0(0x406)](/[\r\n]+/);for(const _0x11af8a of _0x3ff5f0){const _0x6fe5ac=_0x2a7a2c[_0x499ba0(0x455)](_0x11af8a[_0x499ba0(0xe8)]());if(_0x6fe5ac>0x0)_0x1d42c6['equipSlots'][_0x499ba0(0x1bf)](_0x6fe5ac);}}else for(const _0x3f6925 of _0x2a7a2c){const _0x13195f=_0x2a7a2c[_0x499ba0(0x455)](_0x3f6925['trim']());if(_0x13195f>0x0)_0x1d42c6[_0x499ba0(0x460)][_0x499ba0(0x1bf)](_0x13195f);}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x30d)]=function(_0x43f192,_0x48b630){const _0x1b54f7=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x1b54f7(0x27c)](_0x43f192,_0x48b630),VisuMZ[_0x1b54f7(0x11a)]['Parse_Notetags_Prices'](_0x43f192,_0x48b630),VisuMZ[_0x1b54f7(0x11a)][_0x1b54f7(0x246)](_0x43f192,_0x48b630),VisuMZ[_0x1b54f7(0x11a)][_0x1b54f7(0x274)](_0x43f192,_0x48b630),VisuMZ['ItemsEquipsCore'][_0x1b54f7(0xcf)](_0x43f192,_0x48b630);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x27c)]=function(_0x1a4783,_0x57abdf){const _0x3c03af=_0x5b2ecf;_0x1a4783[_0x3c03af(0x225)]=[];const _0x1ba038=_0x1a4783[_0x3c03af(0x106)]||'',_0x361cee=_0x1ba038[_0x3c03af(0x3f2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x361cee)for(const _0x27d363 of _0x361cee){_0x27d363[_0x3c03af(0x3f2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x50b986=String(RegExp['$1'])[_0x3c03af(0x505)]()[_0x3c03af(0xe8)]()[_0x3c03af(0x406)](',');for(const _0x4ea8d9 of _0x50b986){_0x1a4783['categories']['push'](_0x4ea8d9[_0x3c03af(0xe8)]());}}if(_0x1ba038[_0x3c03af(0x3f2)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x26dfb1=RegExp['$1'][_0x3c03af(0x406)](/[\r\n]+/);for(const _0x2d8eb8 of _0x26dfb1){_0x1a4783[_0x3c03af(0x225)][_0x3c03af(0x1bf)](_0x2d8eb8[_0x3c03af(0x505)]()[_0x3c03af(0xe8)]());}}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x37f)]=function(_0x350ffe,_0x18e288){const _0x3d7606=_0x5b2ecf;if(!_0x350ffe)return;_0x350ffe['sortPriority']=0x32;const _0x23944b=_0x350ffe[_0x3d7606(0x106)]||'';_0x23944b['match'](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x350ffe[_0x3d7606(0xd5)]=Number(RegExp['$1']));},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x238)]=function(_0x2838fc,_0x28df90){const _0xc27ddf=_0x5b2ecf;_0x2838fc[_0xc27ddf(0x106)][_0xc27ddf(0x3f2)](/<PRICE:[ ](\d+)>/i)&&(_0x2838fc[_0xc27ddf(0x3fd)]=Number(RegExp['$1']));},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x246)]=function(_0x4f7b27,_0x4992c1){const _0x526d7d=_0x5b2ecf;if(_0x4992c1===$dataItems)return;for(let _0x3722d9=0x0;_0x3722d9<0x8;_0x3722d9++){const _0x13f211=VisuMZ[_0x526d7d(0x11a)][_0x526d7d(0x4d0)][_0x526d7d(0x14e)][_0x3722d9];_0x4f7b27['note'][_0x526d7d(0x3f2)](_0x13f211)&&(_0x4f7b27[_0x526d7d(0x207)][_0x3722d9]=parseInt(RegExp['$1']));}},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x255)]={},VisuMZ[_0x5b2ecf(0x11a)]['Parse_Notetags_ParamJS']=function(_0x7ba336,_0x2f5cee){const _0x104005=_0x5b2ecf;if(_0x2f5cee===$dataItems)return;if(_0x7ba336[_0x104005(0x106)][_0x104005(0x3f2)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x1345fc=String(RegExp['$1']),_0x54a468=(_0x2f5cee===$dataWeapons?_0x104005(0xd8):_0x104005(0x412))[_0x104005(0x350)](_0x7ba336['id']),_0x398a15=_0x104005(0x1c9)[_0x104005(0x350)](_0x1345fc);for(let _0x408185=0x0;_0x408185<0x8;_0x408185++){if(_0x1345fc[_0x104005(0x3f2)](VisuMZ[_0x104005(0x11a)][_0x104005(0x4d0)][_0x104005(0x4db)][_0x408185])){const _0x568808='%1-%2'[_0x104005(0x350)](_0x54a468,_0x408185);VisuMZ['ItemsEquipsCore'][_0x104005(0x255)][_0x568808]=new Function(_0x104005(0x334),_0x104005(0x502),_0x398a15);}}}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x325)]={},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0xcf)]=function(_0x227bb,_0x206265){const _0x42105a=_0x5b2ecf;if(_0x206265!==$dataItems)return;if(_0x227bb['note'][_0x42105a(0x3f2)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x34c55d=String(RegExp['$1']),_0x4b2153='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x42105a(0x350)](_0x34c55d);VisuMZ[_0x42105a(0x11a)][_0x42105a(0x325)][_0x227bb['id']]=new Function(_0x42105a(0x334),_0x4b2153);}},DataManager['isKeyItem']=function(_0x4f46d4){return this['isItem'](_0x4f46d4)&&_0x4f46d4['itypeId']===0x2;},DataManager[_0x5b2ecf(0x2dd)]=function(_0x35bbdc){const _0x2b946b=_0x5b2ecf;if(!_0x35bbdc)return 0x63;else return _0x35bbdc['note'][_0x2b946b(0x3f2)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this['defaultItemMax'](_0x35bbdc);},DataManager[_0x5b2ecf(0x111)]=function(_0x563dda){const _0x20b9a0=_0x5b2ecf;if(this[_0x20b9a0(0x2d4)](_0x563dda))return VisuMZ['ItemsEquipsCore'][_0x20b9a0(0x151)]['ItemScene'][_0x20b9a0(0x43f)];else{if(this[_0x20b9a0(0xdc)](_0x563dda))return VisuMZ[_0x20b9a0(0x11a)]['Settings'][_0x20b9a0(0x369)][_0x20b9a0(0x16b)];else{if(this['isArmor'](_0x563dda))return VisuMZ['ItemsEquipsCore'][_0x20b9a0(0x151)]['ItemScene'][_0x20b9a0(0x12e)];}}},DataManager[_0x5b2ecf(0x4af)]=function(_0x2a8c04){const _0x5530a1=_0x5b2ecf;_0x2a8c04=_0x2a8c04[_0x5530a1(0x505)]()[_0x5530a1(0xe8)](),this[_0x5530a1(0x239)]=this[_0x5530a1(0x239)]||{};if(this['_classIDs'][_0x2a8c04])return this[_0x5530a1(0x239)][_0x2a8c04];for(const _0x449aec of $dataClasses){if(!_0x449aec)continue;let _0x172561=_0x449aec[_0x5530a1(0x4df)];_0x172561=_0x172561['replace'](/\x1I\[(\d+)\]/gi,''),_0x172561=_0x172561['replace'](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x172561[_0x5530a1(0x505)]()[_0x5530a1(0xe8)]()]=_0x449aec['id'];}return this[_0x5530a1(0x239)][_0x2a8c04]||0x0;},DataManager['getSkillIdWithName']=function(_0x226304){const _0x9a4a86=_0x5b2ecf;_0x226304=_0x226304[_0x9a4a86(0x505)]()[_0x9a4a86(0xe8)](),this[_0x9a4a86(0x271)]=this[_0x9a4a86(0x271)]||{};if(this[_0x9a4a86(0x271)][_0x226304])return this[_0x9a4a86(0x271)][_0x226304];for(const _0x22477b of $dataSkills){if(!_0x22477b)continue;this[_0x9a4a86(0x271)][_0x22477b[_0x9a4a86(0x4df)][_0x9a4a86(0x505)]()[_0x9a4a86(0xe8)]()]=_0x22477b['id'];}return this[_0x9a4a86(0x271)][_0x226304]||0x0;},DataManager[_0x5b2ecf(0x493)]=function(_0x58c195){const _0x52d8a9=_0x5b2ecf;_0x58c195=_0x58c195[_0x52d8a9(0x505)]()[_0x52d8a9(0xe8)](),this['_itemIDs']=this[_0x52d8a9(0x433)]||{};if(this[_0x52d8a9(0x433)][_0x58c195])return this[_0x52d8a9(0x433)][_0x58c195];for(const _0x29d9ce of $dataItems){if(!_0x29d9ce)continue;this[_0x52d8a9(0x433)][_0x29d9ce['name']['toUpperCase']()[_0x52d8a9(0xe8)]()]=_0x29d9ce['id'];}return this[_0x52d8a9(0x433)][_0x58c195]||0x0;},DataManager['getWeaponIdWithName']=function(_0x197920){const _0x18c01c=_0x5b2ecf;_0x197920=_0x197920[_0x18c01c(0x505)]()['trim'](),this[_0x18c01c(0xe0)]=this[_0x18c01c(0xe0)]||{};if(this['_weaponIDs'][_0x197920])return this[_0x18c01c(0xe0)][_0x197920];for(const _0x5b663e of $dataWeapons){if(!_0x5b663e)continue;this[_0x18c01c(0xe0)][_0x5b663e[_0x18c01c(0x4df)][_0x18c01c(0x505)]()[_0x18c01c(0xe8)]()]=_0x5b663e['id'];}return this[_0x18c01c(0xe0)][_0x197920]||0x0;},DataManager[_0x5b2ecf(0x3d1)]=function(_0x1144ac){const _0x34cda3=_0x5b2ecf;_0x1144ac=_0x1144ac[_0x34cda3(0x505)]()['trim'](),this[_0x34cda3(0x457)]=this[_0x34cda3(0x457)]||{};if(this[_0x34cda3(0x457)][_0x1144ac])return this[_0x34cda3(0x457)][_0x1144ac];for(const _0x2ce42c of $dataArmors){if(!_0x2ce42c)continue;this[_0x34cda3(0x457)][_0x2ce42c[_0x34cda3(0x4df)]['toUpperCase']()['trim']()]=_0x2ce42c['id'];}return this['_armorIDs'][_0x1144ac]||0x0;},DataManager[_0x5b2ecf(0x376)]=function(_0x29afe5){const _0x236ba7=_0x5b2ecf;_0x29afe5=_0x29afe5[_0x236ba7(0x505)]()[_0x236ba7(0xe8)](),this['_etypeIDs']=this[_0x236ba7(0x285)]||{};if(this[_0x236ba7(0x285)][_0x29afe5])return this[_0x236ba7(0x285)][_0x29afe5];for(const _0x4eac46 of $dataSystem[_0x236ba7(0x172)]){this[_0x236ba7(0x285)][_0x4eac46[_0x236ba7(0x505)]()[_0x236ba7(0xe8)]()]=$dataSystem[_0x236ba7(0x172)][_0x236ba7(0x455)](_0x4eac46);}return this[_0x236ba7(0x285)][_0x29afe5]||0x0;},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x38a)]=function(){const _0x23626a=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x23626a(0x446)]($dataItems),VisuMZ[_0x23626a(0x11a)][_0x23626a(0x446)]($dataWeapons),VisuMZ[_0x23626a(0x11a)][_0x23626a(0x446)]($dataArmors);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x446)]=function(_0x5a4443){const _0xedf82f=_0x5b2ecf;for(const _0x6b13d4 of _0x5a4443){if(!_0x6b13d4)continue;if(!DataManager[_0xedf82f(0x45d)](_0x6b13d4))continue;const _0x178e9d=DataManager['getProxyItem'](_0x6b13d4),_0x4ce6cb=[_0xedf82f(0x4df),_0xedf82f(0x46a),_0xedf82f(0x19f)];for(const _0x270ee7 of _0x4ce6cb){_0x6b13d4[_0x270ee7]=_0x178e9d[_0x270ee7];}}},DataManager[_0x5b2ecf(0x45d)]=function(_0x573f40){const _0x87e2d0=_0x5b2ecf;if(!_0x573f40)return![];if(!_0x573f40['note'])return![];return _0x573f40&&_0x573f40[_0x87e2d0(0x106)][_0x87e2d0(0x3f2)](/<PROXY:[ ](.*)>/i);},DataManager[_0x5b2ecf(0x4e9)]=function(_0x87bba4){const _0x352c7b=_0x5b2ecf;return this[_0x352c7b(0x45d)](_0x87bba4)?this[_0x352c7b(0x18a)](_0x87bba4)||_0x87bba4:_0x87bba4;},DataManager[_0x5b2ecf(0x18a)]=function(_0x517a92){const _0x3c0ba0=_0x5b2ecf;_0x517a92['note']['match'](/<PROXY:[ ](.*)>/i);const _0x4cd10c=RegExp['$1'][_0x3c0ba0(0xe8)](),_0x4f1ee2=/^\d+$/[_0x3c0ba0(0x399)](_0x4cd10c);if(this[_0x3c0ba0(0x2d4)](_0x517a92)){const _0x3a17ed=_0x4f1ee2?Number(_0x4cd10c):DataManager[_0x3c0ba0(0x493)](_0x4cd10c);return $dataItems[_0x3a17ed]||_0x517a92;}else{if(this[_0x3c0ba0(0xdc)](_0x517a92)){const _0x540abe=_0x4f1ee2?Number(_0x4cd10c):DataManager['getWeaponIdWithName'](_0x4cd10c);return $dataWeapons[_0x540abe]||_0x517a92;}else{if(this['isArmor'](_0x517a92)){const _0x5ae0b5=_0x4f1ee2?Number(_0x4cd10c):DataManager[_0x3c0ba0(0x3d1)](_0x4cd10c);return $dataArmors[_0x5ae0b5]||_0x517a92;}}}return _0x517a92;},VisuMZ[_0x5b2ecf(0x11a)]['Window_ItemList_item']=Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x334)],Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x334)]=function(){const _0x40dbef=_0x5b2ecf;if($gameTemp[_0x40dbef(0x105)])return VisuMZ[_0x40dbef(0x11a)][_0x40dbef(0x1e6)][_0x40dbef(0x4b6)](this);return DataManager[_0x40dbef(0x4e9)](VisuMZ[_0x40dbef(0x11a)]['Window_ItemList_item'][_0x40dbef(0x4b6)](this));},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x27f)]=function(){const _0x5d8818=_0x5b2ecf;return VisuMZ[_0x5d8818(0x11a)][_0x5d8818(0x1e6)][_0x5d8818(0x4b6)](this);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x124)]=Window_ShopBuy[_0x5b2ecf(0x138)]['item'],Window_ShopBuy[_0x5b2ecf(0x138)]['item']=function(){const _0x4f8134=_0x5b2ecf;if($gameTemp[_0x4f8134(0x105)])return VisuMZ['ItemsEquipsCore'][_0x4f8134(0x124)]['call'](this);return DataManager[_0x4f8134(0x4e9)](VisuMZ[_0x4f8134(0x11a)][_0x4f8134(0x124)][_0x4f8134(0x4b6)](this));},Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x27f)]=function(){const _0x21a75b=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x21a75b(0x124)][_0x21a75b(0x4b6)](this);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x211)]=Game_Item['prototype'][_0x5b2ecf(0x1f3)],Game_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x1f3)]=function(_0x281de9){const _0x1016b3=_0x5b2ecf;if(DataManager[_0x1016b3(0x45d)](_0x281de9))return;VisuMZ['ItemsEquipsCore'][_0x1016b3(0x211)][_0x1016b3(0x4b6)](this,_0x281de9);},VisuMZ[_0x5b2ecf(0x11a)]['SetupArtifactItemIDs']=function(){const _0x1a2eca=_0x5b2ecf;this[_0x1a2eca(0x3ad)]={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x4341af of $dataArmors){if(!_0x4341af)continue;if(!DataManager[_0x1a2eca(0x413)](_0x4341af))continue;DataManager[_0x1a2eca(0x437)](_0x4341af)&&this[_0x1a2eca(0x3ad)]['partyArtifactIDs'][_0x1a2eca(0x1bf)](_0x4341af['id']),DataManager['isTroopArtifact'](_0x4341af)&&this[_0x1a2eca(0x3ad)][_0x1a2eca(0x392)][_0x1a2eca(0x1bf)](_0x4341af['id']);}},DataManager[_0x5b2ecf(0x413)]=function(_0x45bdec){const _0x28a5d0=_0x5b2ecf;if(!this[_0x28a5d0(0x4dc)](_0x45bdec))return![];const _0x43008d=_0x45bdec['note'];if(!_0x43008d)return![];if(_0x43008d[_0x28a5d0(0x3f2)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x43008d[_0x28a5d0(0x3f2)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x43008d[_0x28a5d0(0x3f2)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x43008d[_0x28a5d0(0x3f2)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x5b2ecf(0x2f1)]=function(_0x362168){const _0x468c37=_0x5b2ecf;if(!this['isArtifact'](_0x362168))return![];const _0x52ff34=_0x362168[_0x468c37(0x106)];if(!_0x52ff34)return![];if(_0x52ff34[_0x468c37(0x3f2)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x52ff34[_0x468c37(0x3f2)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x5b2ecf(0x437)]=function(_0x1b13a5){const _0xe8f6ec=_0x5b2ecf;if(!this[_0xe8f6ec(0x413)](_0x1b13a5))return![];const _0x52571d=_0x1b13a5['note'];if(!_0x52571d)return![];if(_0x52571d[_0xe8f6ec(0x3f2)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x52571d['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x5b2ecf(0x415)]=function(_0x404926){const _0x38f034=_0x5b2ecf;if(!this[_0x38f034(0x413)](_0x404926))return![];const _0x5243de=_0x404926['note'];if(!_0x5243de)return![];if(_0x5243de[_0x38f034(0x3f2)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5243de['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x3d4)]=Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x335)],Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x335)]=function(_0x33016a){const _0x396965=_0x5b2ecf;if(DataManager['isArtifact'](_0x33016a))return![];if(!DataManager[_0x396965(0x4eb)](this,_0x33016a))return![];if(!DataManager[_0x396965(0x1ad)](this,_0x33016a))return![];return VisuMZ['ItemsEquipsCore'][_0x396965(0x3d4)][_0x396965(0x4b6)](this,_0x33016a);},VisuMZ[_0x5b2ecf(0x11a)]['Game_BattlerBase_param_artifact']=Game_BattlerBase['prototype']['param'],Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x249)]=function(_0x592126){const _0x12d81d=_0x5b2ecf;this[_0x12d81d(0x3bf)]=!![];const _0x45dc8f=VisuMZ[_0x12d81d(0x11a)][_0x12d81d(0x4d8)]['call'](this,_0x592126);return this['_allowArtifactParamBase']=undefined,_0x45dc8f;},VisuMZ['ItemsEquipsCore']['Game_Actor_artifact']=Game_Actor['prototype'][_0x5b2ecf(0x18f)],Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x18f)]=function(){const _0xcd3d2f=_0x5b2ecf;this[_0xcd3d2f(0x4ed)]=!![];const _0x5299ad=VisuMZ['ItemsEquipsCore'][_0xcd3d2f(0x3c8)][_0xcd3d2f(0x4b6)](this);return this[_0xcd3d2f(0x4ed)]=undefined,_0x5299ad;},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x454)]=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x15a)],Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x15a)]=function(){const _0x33d6f2=_0x5b2ecf,_0x4e04b7=VisuMZ[_0x33d6f2(0x11a)][_0x33d6f2(0x454)][_0x33d6f2(0x4b6)](this);if(this[_0x33d6f2(0x4ed)]||this['_allowArtifactParamBase']){const _0x4979c8=_0x4e04b7[_0x33d6f2(0x35f)]($gameParty['partyArtifacts']());return _0x4979c8;}else return _0x4e04b7;},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x49f)]=Game_BattlerBase['prototype'][_0x5b2ecf(0x403)],Game_BattlerBase[_0x5b2ecf(0x138)]['paramPlus']=function(_0x4d3680){const _0xdce54=_0x5b2ecf;let _0x2a5fe1=VisuMZ[_0xdce54(0x11a)][_0xdce54(0x49f)][_0xdce54(0x4b6)](this,_0x4d3680);if(this[_0xdce54(0x160)]===Game_Enemy)for(const _0x396d33 of $gameParty[_0xdce54(0xe5)]()){if(_0x396d33)_0x2a5fe1+=_0x396d33[_0xdce54(0x207)][_0x4d3680];}return _0x2a5fe1;},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x29e)]=Game_Enemy[_0x5b2ecf(0x138)][_0x5b2ecf(0x18f)],Game_Enemy['prototype'][_0x5b2ecf(0x18f)]=function(){const _0x40e186=_0x5b2ecf;let _0x5925d9=VisuMZ[_0x40e186(0x11a)][_0x40e186(0x29e)][_0x40e186(0x4b6)](this);return _0x5925d9[_0x40e186(0x35f)]($gameParty['troopArtifacts']());},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0xf5)]=Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x30f)],Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x30f)]=function(_0x4ba1ea,_0x2dbb7e,_0xd9ee5){const _0x5239e5=_0x5b2ecf;VisuMZ[_0x5239e5(0x11a)][_0x5239e5(0xf5)][_0x5239e5(0x4b6)](this,_0x4ba1ea,_0x2dbb7e,_0xd9ee5);if(DataManager[_0x5239e5(0x413)](_0x4ba1ea)){let _0x1b7c86=$gameParty[_0x5239e5(0x109)]();if($gameParty[_0x5239e5(0x1be)]())_0x1b7c86=_0x1b7c86[_0x5239e5(0x35f)]($gameTroop[_0x5239e5(0x32d)]());for(const _0x174bf8 of _0x1b7c86){if(!_0x174bf8)continue;_0x174bf8[_0x5239e5(0x261)]={};}}},Game_Party['prototype'][_0x5b2ecf(0x2c7)]=function(){const _0x4c5a25=_0x5b2ecf;let _0x1da58e=[];const _0x3c7a0d=VisuMZ[_0x4c5a25(0x11a)][_0x4c5a25(0x3ad)][_0x4c5a25(0x23e)];if(_0x3c7a0d)for(const _0x4688d1 of _0x3c7a0d){const _0x37c08a=$dataArmors[_0x4688d1];if(!_0x37c08a)continue;if(!this[_0x4c5a25(0x2ea)](_0x37c08a))continue;let _0x218cd6=0x1;if(DataManager[_0x4c5a25(0x2f1)](_0x37c08a))_0x218cd6=this[_0x4c5a25(0x128)](_0x37c08a);while(_0x218cd6--)_0x1da58e[_0x4c5a25(0x1bf)](_0x37c08a);}return _0x1da58e;},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0xe5)]=function(){const _0x22e53f=_0x5b2ecf;let _0x59f616=[];const _0xbdda8d=VisuMZ[_0x22e53f(0x11a)][_0x22e53f(0x3ad)][_0x22e53f(0x392)];if(_0xbdda8d)for(const _0x269429 of _0xbdda8d){const _0x8e9cd4=$dataArmors[_0x269429];if(!_0x8e9cd4)continue;if(!this['hasItem'](_0x8e9cd4))continue;let _0x47827c=0x1;if(DataManager[_0x22e53f(0x2f1)](_0x8e9cd4))_0x47827c=this[_0x22e53f(0x128)](_0x8e9cd4);while(_0x47827c--)_0x59f616[_0x22e53f(0x1bf)](_0x8e9cd4);}return _0x59f616;},Game_Party[_0x5b2ecf(0x138)]['artifacts']=function(){const _0x418fc5=_0x5b2ecf;return this[_0x418fc5(0x2c7)]()[_0x418fc5(0x35f)](this['troopArtifacts']());},VisuMZ[_0x5b2ecf(0x11a)]['Game_Party_setupBattleTestItems_artifact']=Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x23c)],Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x23c)]=function(){const _0x3963b9=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x3963b9(0x371)][_0x3963b9(0x4b6)](this),this[_0x3963b9(0x4f5)]();},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x4f5)]=function(){const _0x5a5b08=_0x5b2ecf,_0xf49d08=$gameParty[_0x5a5b08(0x382)]()[_0x5a5b08(0x341)](_0x4986ce=>DataManager[_0x5a5b08(0x413)](_0x4986ce));for(const _0x465229 of _0xf49d08){const _0x150537=this[_0x5a5b08(0x128)](_0x465229);if(_0x150537)this[_0x5a5b08(0x2e3)](_0x465229,_0x150537);}},DataManager[_0x5b2ecf(0x4eb)]=function(_0x443097,_0x343b04){const _0x643538=_0x5b2ecf;if(this[_0x643538(0x2d4)](_0x343b04))return![];if(!_0x443097)return![];if($gameTemp[_0x643538(0x2a6)])return!![];if(BattleManager[_0x643538(0x127)]())return!![];const _0x2ce438=this[_0x643538(0x48f)](_0x343b04);if(_0x2ce438[_0x643538(0x3e7)]<=0x0)return!![];return _0x2ce438[_0x643538(0x4a1)](_0x443097['currentClass']()['id']);},DataManager[_0x5b2ecf(0x48f)]=function(_0x32e809){const _0x2c23a4=_0x5b2ecf;if(!_0x32e809)return[];this[_0x2c23a4(0x20f)]=this[_0x2c23a4(0x20f)]||{};const _0x2bc658=_0x2c23a4(0x472)[_0x2c23a4(0x350)](this['isWeapon'](_0x32e809)?_0x2c23a4(0x1b4):_0x2c23a4(0x117),_0x32e809['id']);if(this[_0x2c23a4(0x20f)][_0x2bc658]!==undefined)return this['_getClassRequirements'][_0x2bc658];let _0x402fe8=[];const _0x4f96f1=_0x32e809[_0x2c23a4(0x106)]||'';if(_0x4f96f1[_0x2c23a4(0x3f2)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0x220661=String(RegExp['$1'])[_0x2c23a4(0x406)](',')[_0x2c23a4(0x4ec)](_0x279a06=>_0x279a06[_0x2c23a4(0xe8)]());for(const _0x4c27ff of _0x220661){const _0x4f6e0d=/^\d+$/['test'](_0x4c27ff);_0x4f6e0d?_0x402fe8[_0x2c23a4(0x1bf)](Number(_0x4c27ff)):_0x402fe8[_0x2c23a4(0x1bf)](DataManager['getClassIdWithName'](_0x4c27ff));}}return this[_0x2c23a4(0x20f)][_0x2bc658]=_0x402fe8,this[_0x2c23a4(0x20f)][_0x2bc658];},DataManager[_0x5b2ecf(0x1ad)]=function(_0x40ce8e,_0x2f7a77){const _0x12c6cd=_0x5b2ecf;if(this[_0x12c6cd(0x2d4)](_0x2f7a77))return![];if(!_0x40ce8e)return![];if($gameTemp['_checkEquipRequirements'])return!![];if(BattleManager['isBattleTest']())return!![];const _0x20d66f=this[_0x12c6cd(0x336)](_0x2f7a77);for(const _0x5a02aa of _0x20d66f){if(!this[_0x12c6cd(0x47e)](_0x40ce8e,_0x5a02aa))return![];}return!![];},DataManager['getEquipRequirements']=function(_0x187d5e){const _0x2a26da=_0x5b2ecf;if(!_0x187d5e)return[];this[_0x2a26da(0x381)]=this['_getEquipRequirements']||{};const _0x434703=_0x2a26da(0x472)[_0x2a26da(0x350)](this[_0x2a26da(0xdc)](_0x187d5e)?_0x2a26da(0x1b4):'ARMOR',_0x187d5e['id']);if(this[_0x2a26da(0x381)][_0x434703]!==undefined)return this[_0x2a26da(0x381)][_0x434703];let _0x4119af=[];const _0x599a7d=_0x187d5e['note']||'';return _0x599a7d[_0x2a26da(0x3f2)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x4119af=String(RegExp['$1'])[_0x2a26da(0x406)](/[\r\n]+/)),this[_0x2a26da(0x381)][_0x434703]=_0x4119af,this[_0x2a26da(0x381)][_0x434703];},DataManager[_0x5b2ecf(0x47e)]=function(_0x39fef6,_0x20146){const _0x41bd2e=_0x5b2ecf;if(_0x20146[_0x41bd2e(0x3f2)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x2a35a5=String(RegExp['$1'])['trim'](),_0x1e588b=Number(RegExp['$2']);switch(_0x2a35a5){case'>':return _0x39fef6[_0x41bd2e(0xd9)]>_0x1e588b;case'>=':return _0x39fef6[_0x41bd2e(0xd9)]>=_0x1e588b;case _0x41bd2e(0x1d6):return _0x39fef6[_0x41bd2e(0xd9)]===_0x1e588b;case'<=':return _0x39fef6[_0x41bd2e(0xd9)]<=_0x1e588b;case'<':return _0x39fef6[_0x41bd2e(0xd9)]<_0x1e588b;}return![];}if(_0x20146[_0x41bd2e(0x3f2)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x57830d=String(RegExp['$1'])[_0x41bd2e(0x227)]()['trim'](),_0x59efa6=String(RegExp['$2'])['trim'](),_0x5888d2=Number(RegExp['$3']);let _0x1f7cc2=0x0;if(['maxmp',_0x41bd2e(0x19c)][_0x41bd2e(0x4a1)](_0x57830d))_0x1f7cc2=0x1;const _0x282d17=_0x39fef6[_0x41bd2e(0x3bb)][_0x1f7cc2]||0x0;switch(_0x59efa6){case'>':return _0x39fef6[_0x41bd2e(0x503)](_0x1f7cc2)+_0x282d17>_0x5888d2;case'>=':return _0x39fef6[_0x41bd2e(0x503)](_0x1f7cc2)+_0x282d17>=_0x5888d2;case'===':return _0x39fef6[_0x41bd2e(0x503)](_0x1f7cc2)+_0x282d17===_0x5888d2;case'<=':return _0x39fef6['paramBase'](_0x1f7cc2)+_0x282d17<=_0x5888d2;case'<':return _0x39fef6[_0x41bd2e(0x503)](_0x1f7cc2)+_0x282d17<_0x5888d2;}return![];}if(_0x20146[_0x41bd2e(0x3f2)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x3880b2=String(RegExp['$1'])[_0x41bd2e(0x227)]()[_0x41bd2e(0xe8)](),_0x3917c8=String(RegExp['$2'])['trim'](),_0x36f2c2=Number(RegExp['$3']),_0x423d4f=['atk','def',_0x41bd2e(0x184),_0x41bd2e(0x4c6),_0x41bd2e(0x13d),_0x41bd2e(0x478)];let _0x419616=_0x423d4f[_0x41bd2e(0x455)](_0x3880b2)+0x2;if(_0x419616<0x2)return![];const _0x57036f=_0x39fef6[_0x41bd2e(0x3bb)][_0x419616]||0x0;switch(_0x3917c8){case'>':return _0x39fef6[_0x41bd2e(0x503)](_0x419616)+_0x57036f>_0x36f2c2;case'>=':return _0x39fef6[_0x41bd2e(0x503)](_0x419616)+_0x57036f>=_0x36f2c2;case _0x41bd2e(0x1d6):return _0x39fef6[_0x41bd2e(0x503)](_0x419616)+_0x57036f===_0x36f2c2;case'<=':return _0x39fef6[_0x41bd2e(0x503)](_0x419616)+_0x57036f<=_0x36f2c2;case'<':return _0x39fef6[_0x41bd2e(0x503)](_0x419616)+_0x57036f<_0x36f2c2;}return![];}if(_0x20146[_0x41bd2e(0x3f2)](/LEARNED SKILL:[ ](\d+)/i)){const _0x38773e=Number(RegExp['$1']);return _0x39fef6[_0x41bd2e(0x3db)](_0x38773e);}else{if(_0x20146[_0x41bd2e(0x3f2)](/LEARNED SKILL:[ ](.*)/i)){const _0x1ffa4d=String(RegExp['$1']),_0x218a62=this[_0x41bd2e(0x39e)](_0x1ffa4d);return _0x39fef6[_0x41bd2e(0x3db)](_0x218a62);}}if(_0x20146[_0x41bd2e(0x3f2)](/SWITCH:[ ](\d+)/i)){const _0x44f758=Number(RegExp['$1']);return $gameSwitches['value'](_0x44f758);}return!![];},DataManager[_0x5b2ecf(0x182)]=function(_0x4221bc){const _0x451ad3=_0x5b2ecf;return this['isArmor'](_0x4221bc)?this['getEtypeIDsCache'](_0x4221bc):[_0x4221bc[_0x451ad3(0x355)]||0x0];},DataManager[_0x5b2ecf(0x4ba)]=function(_0x3e879b){const _0x19578b=_0x5b2ecf;this[_0x19578b(0x2fe)]=this['_cache_etypeIDs']||{};if(this['_cache_etypeIDs'][_0x3e879b['id']]!==undefined)return this[_0x19578b(0x2fe)][_0x3e879b['id']];this[_0x19578b(0x2fe)][_0x3e879b['id']]=[_0x3e879b[_0x19578b(0x355)]||0x0];const _0x2025ba=_0x3e879b[_0x19578b(0x106)]||'';if(_0x2025ba[_0x19578b(0x3f2)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x28ace3=String(RegExp['$1'])[_0x19578b(0x406)](',')['map'](_0x5701fc=>_0x5701fc['trim']());for(const _0x33149d of _0x28ace3){const _0x5159b4=/^\d+$/[_0x19578b(0x399)](_0x33149d);let _0x39d342=0x0;_0x5159b4?_0x39d342=Number(_0x33149d):_0x39d342=this['getEtypeIdWithName'](_0x33149d),_0x39d342>0x1&&this[_0x19578b(0x2fe)][_0x3e879b['id']][_0x19578b(0x1bf)](_0x39d342);}}return this[_0x19578b(0x2fe)][_0x3e879b['id']];},Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x4cb)]=function(_0x4708ed){const _0x3dd307=_0x5b2ecf;return this['isEquipAtypeOk'](_0x4708ed[_0x3dd307(0x22d)])&&!this['isEquipTypeSealed'](_0x4708ed[_0x3dd307(0x355)])&&DataManager[_0x3dd307(0x182)](_0x4708ed)[_0x3dd307(0x360)](_0x4a471a=>!this[_0x3dd307(0x3a1)](_0x4a471a));},DataManager['isCursedItem']=function(_0x22a7fe){const _0x1c54c3=_0x5b2ecf;if(!this['isWeapon'](_0x22a7fe)&&!this['isArmor'](_0x22a7fe))return![];if(Imported[_0x1c54c3(0x4c1)]&&this[_0x1c54c3(0xdc)](_0x22a7fe))return![];if(!_0x22a7fe['note'])return![];return _0x22a7fe[_0x1c54c3(0x106)][_0x1c54c3(0x3f2)](/<CURSED>/i);},DataManager['getPurifyTransformation']=function(_0x42cb5b){const _0x333c42=_0x5b2ecf;if(!_0x42cb5b)return _0x42cb5b;if(!this['isWeapon'](_0x42cb5b)&&!this['isArmor'](_0x42cb5b))return _0x42cb5b;if(_0x42cb5b['note']['match'](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x3e7eae=String(RegExp['$1'])[_0x333c42(0xe8)](),_0x170c8c=/^\d+$/[_0x333c42(0x399)](_0x3e7eae);if(_0x170c8c){if(this[_0x333c42(0xdc)](_0x42cb5b))return $dataWeapons[Number(_0x3e7eae)];if(this[_0x333c42(0x4dc)](_0x42cb5b))return $dataArmors[Number(_0x3e7eae)];}else{if(this[_0x333c42(0xdc)](_0x42cb5b))return $dataWeapons[this[_0x333c42(0x16c)](_0x3e7eae)];if(this[_0x333c42(0x4dc)](_0x42cb5b))return $dataArmors[this[_0x333c42(0x3d1)](_0x3e7eae)];}}return _0x42cb5b;},Game_Party['prototype'][_0x5b2ecf(0x29a)]=function(){const _0x2f3073=_0x5b2ecf,_0x2fc785=this[_0x2f3073(0x109)]();for(const _0x1b145a of _0x2fc785){if(!_0x1b145a)continue;_0x1b145a[_0x2f3073(0x29a)]();}},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x29a)]=function(){const _0x46a02a=_0x5b2ecf,_0xe05e21=this[_0x46a02a(0x460)]()[_0x46a02a(0x3e7)];for(let _0x57bc4=0x0;_0x57bc4<_0xe05e21;_0x57bc4++){const _0x1233e5=this[_0x46a02a(0x3c4)][_0x57bc4];if(!_0x1233e5)continue;const _0x5bdaed=_0x1233e5[_0x46a02a(0x2e8)]();if(!DataManager['isCursedItem'](_0x5bdaed))continue;let _0x1a6a99=DataManager[_0x46a02a(0x36e)](_0x5bdaed);this['isPurifyItemSwapOk'](_0x5bdaed,_0x1a6a99)?(!this['_equips'][_0x57bc4]&&(this[_0x46a02a(0x3c4)][_0x57bc4]=new Game_Item()),this['_equips'][_0x57bc4]['setObject'](_0x1a6a99),this['refresh']()):this['changeEquip'](_0x57bc4,null);}},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x11d)]=function(_0xb82a2b,_0x4abd13){const _0x1dc253=_0x5b2ecf;if(_0xb82a2b===_0x4abd13)return![];const _0x579418=DataManager[_0x1dc253(0x182)](_0x4abd13);if(!_0x579418['includes'](_0xb82a2b[_0x1dc253(0x355)]))return![];if(DataManager[_0x1dc253(0xdc)](_0x4abd13))return this[_0x1dc253(0x42f)](_0x4abd13[_0x1dc253(0x283)]);else{if(DataManager[_0x1dc253(0x4dc)](_0x4abd13))return this['isEquipAtypeOk'](_0x4abd13['atypeId']);}return![];},TextManager[_0x5b2ecf(0x11e)]={'helpDesc':{'equip':VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x151)][_0x5b2ecf(0x276)][_0x5b2ecf(0x28d)]??_0x5b2ecf(0x313),'optimize':VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x151)][_0x5b2ecf(0x276)]['optimizeCmdDesc']??_0x5b2ecf(0xdd),'clear':VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x151)][_0x5b2ecf(0x276)][_0x5b2ecf(0x4f2)]??_0x5b2ecf(0x27e)}},ColorManager[_0x5b2ecf(0x30e)]=function(_0x1a0893){const _0x4d8291=_0x5b2ecf;if(!_0x1a0893)return this[_0x4d8291(0x1c8)]();else{if(_0x1a0893[_0x4d8291(0x106)]['match'](/<COLOR:[ ](\d+)>/i))return this['textColor'](Number(RegExp['$1'])[_0x4d8291(0x1b1)](0x0,0x1f));else return _0x1a0893['note'][_0x4d8291(0x3f2)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x4d8291(0x1c8)]();}},ColorManager[_0x5b2ecf(0x263)]=function(_0x5412d2){const _0x5b8f31=_0x5b2ecf;return _0x5412d2=String(_0x5412d2),_0x5412d2[_0x5b8f31(0x3f2)](/#(.*)/i)?_0x5b8f31(0x480)[_0x5b8f31(0x350)](String(RegExp['$1'])):this[_0x5b8f31(0x130)](Number(_0x5412d2));},SceneManager['isSceneShop']=function(){const _0x250699=_0x5b2ecf;return this[_0x250699(0x3f7)]&&this[_0x250699(0x3f7)][_0x250699(0x160)]===Scene_Shop;},Game_Temp[_0x5b2ecf(0x138)][_0x5b2ecf(0x280)]=function(){const _0x390867=_0x5b2ecf;if(this['_bypassNewLabel'])return![];return VisuMZ['ItemsEquipsCore'][_0x390867(0x151)][_0x390867(0x1e2)][_0x390867(0x3a8)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x151)][_0x5b2ecf(0x35d)][_0x5b2ecf(0x48e)],VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x4d7)]=Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x249)],Game_BattlerBase[_0x5b2ecf(0x138)]['param']=function(_0x3ea66a){const _0x504336=_0x5b2ecf;return this[_0x504336(0x16e)]?this[_0x504336(0x36d)]?VisuMZ[_0x504336(0x196)]:0x1:VisuMZ[_0x504336(0x11a)][_0x504336(0x4d7)][_0x504336(0x4b6)](this,_0x3ea66a);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3dc)]=Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x22b)],Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x22b)]=function(_0x522e47){const _0x5beb94=_0x5b2ecf;if(!_0x522e47)return![];if(!VisuMZ['ItemsEquipsCore'][_0x5beb94(0x3dc)][_0x5beb94(0x4b6)](this,_0x522e47))return![];if(!this[_0x5beb94(0x16d)](_0x522e47))return![];if(!this[_0x5beb94(0x473)](_0x522e47))return![];return!![];},Game_BattlerBase['prototype']['meetsItemConditionsNotetags']=function(_0x2930c4){const _0x4995b1=_0x5b2ecf;if(!this[_0x4995b1(0x100)](_0x2930c4))return![];return!![];},Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x100)]=function(_0x466e1b){const _0x12cf1d=_0x5b2ecf,_0x44e15c=_0x466e1b['note'];if(_0x44e15c[_0x12cf1d(0x3f2)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x518c4b=JSON[_0x12cf1d(0x17f)]('['+RegExp['$1'][_0x12cf1d(0x3f2)](/\d+/g)+']');for(const _0x1509f8 of _0x518c4b){if(!$gameSwitches['value'](_0x1509f8))return![];}return!![];}if(_0x44e15c[_0x12cf1d(0x3f2)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5864a3=JSON[_0x12cf1d(0x17f)]('['+RegExp['$1'][_0x12cf1d(0x3f2)](/\d+/g)+']');for(const _0x40a1a8 of _0x5864a3){if(!$gameSwitches[_0x12cf1d(0x12c)](_0x40a1a8))return![];}return!![];}if(_0x44e15c['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b083f=JSON[_0x12cf1d(0x17f)]('['+RegExp['$1'][_0x12cf1d(0x3f2)](/\d+/g)+']');for(const _0x93fd48 of _0x1b083f){if($gameSwitches[_0x12cf1d(0x12c)](_0x93fd48))return!![];}return![];}if(_0x44e15c[_0x12cf1d(0x3f2)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x152a19=JSON['parse']('['+RegExp['$1'][_0x12cf1d(0x3f2)](/\d+/g)+']');for(const _0x200a31 of _0x152a19){if(!$gameSwitches[_0x12cf1d(0x12c)](_0x200a31))return!![];}return![];}if(_0x44e15c['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfd1f7c=JSON[_0x12cf1d(0x17f)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x123f86 of _0xfd1f7c){if(!$gameSwitches[_0x12cf1d(0x12c)](_0x123f86))return!![];}return![];}if(_0x44e15c[_0x12cf1d(0x3f2)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e4327=JSON[_0x12cf1d(0x17f)]('['+RegExp['$1'][_0x12cf1d(0x3f2)](/\d+/g)+']');for(const _0x370a42 of _0x5e4327){if($gameSwitches[_0x12cf1d(0x12c)](_0x370a42))return![];}return!![];}return!![];},Game_BattlerBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x473)]=function(_0x4d08cb){const _0xb6b421=_0x5b2ecf,_0x296b33=_0x4d08cb['note'],_0x41e9af=VisuMZ[_0xb6b421(0x11a)][_0xb6b421(0x325)];return _0x41e9af[_0x4d08cb['id']]?_0x41e9af[_0x4d08cb['id']][_0xb6b421(0x4b6)](this,_0x4d08cb):!![];},Game_Actor[_0x5b2ecf(0x138)]['clearEquipments']=function(){const _0x49bc7f=_0x5b2ecf,_0x4eb96b=this['equipSlots']()[_0x49bc7f(0x3e7)];for(let _0x2d9309=0x0;_0x2d9309<_0x4eb96b;_0x2d9309++){if(this[_0x49bc7f(0x104)](_0x2d9309))this[_0x49bc7f(0x3d3)](_0x2d9309,null);}},Game_Actor['prototype'][_0x5b2ecf(0x104)]=function(_0x58d67e){const _0x4d6c6a=_0x5b2ecf;return this[_0x4d6c6a(0x3b1)]()['includes'](this[_0x4d6c6a(0x460)]()[_0x58d67e])?![]:this[_0x4d6c6a(0x402)](_0x58d67e);},Game_Actor['prototype'][_0x5b2ecf(0x3b1)]=function(){const _0x1ad4be=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x1ad4be(0x151)][_0x1ad4be(0x276)][_0x1ad4be(0x292)];},Game_Actor['prototype'][_0x5b2ecf(0xec)]=function(){const _0x203b76=_0x5b2ecf,_0x3e3842=this['equipSlots']()[_0x203b76(0x3e7)];for(let _0x1a1460=0x0;_0x1a1460<_0x3e3842;_0x1a1460++){if(this[_0x203b76(0x212)](_0x1a1460))this[_0x203b76(0x3d3)](_0x1a1460,null);}for(let _0x58a4e8=0x0;_0x58a4e8<_0x3e3842;_0x58a4e8++){if(this['isOptimizeEquipOk'](_0x58a4e8))this['changeEquip'](_0x58a4e8,this['bestEquipItem'](_0x58a4e8));}},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x212)]=function(_0x231ee4){const _0x1e0487=_0x5b2ecf;return this[_0x1e0487(0x2de)]()[_0x1e0487(0x4a1)](this[_0x1e0487(0x460)]()[_0x231ee4])?![]:this[_0x1e0487(0x402)](_0x231ee4);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x15f)]=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x402)],Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x402)]=function(_0x355dbd){const _0x2ffe08=_0x5b2ecf;!this[_0x2ffe08(0x3c4)][_0x355dbd]&&(this[_0x2ffe08(0x3c4)][_0x355dbd]=new Game_Item());const _0x15ceff=this['_equips'][_0x355dbd];if(_0x15ceff){const _0x24c84c=_0x15ceff[_0x2ffe08(0x2e8)]();if(DataManager[_0x2ffe08(0xc7)](_0x24c84c))return![];}return VisuMZ[_0x2ffe08(0x11a)][_0x2ffe08(0x15f)][_0x2ffe08(0x4b6)](this,_0x355dbd);},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x2de)]=function(){const _0x583ca5=_0x5b2ecf;return VisuMZ[_0x583ca5(0x11a)][_0x583ca5(0x151)][_0x583ca5(0x276)][_0x583ca5(0x359)];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x16a)]=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x32b)],Game_Actor['prototype'][_0x5b2ecf(0x32b)]=function(_0x393890,_0xd878ae){const _0x243194=_0x5b2ecf;if(this[_0x243194(0x43b)])return![];$gameTemp[_0x243194(0x1da)]=!![];const _0x40f2ed=VisuMZ[_0x243194(0x11a)][_0x243194(0x16a)][_0x243194(0x4b6)](this,_0x393890,_0xd878ae);return $gameTemp[_0x243194(0x1da)]=![],_0x40f2ed;},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x1aa)]=function(_0x3044ea,_0x2eaf70){const _0xa14584=_0x5b2ecf,_0x5dd87f=this[_0xa14584(0x217)](_0x3044ea);if(_0x5dd87f<0x0)return;const _0x14e21c=_0x3044ea===0x1?$dataWeapons[_0x2eaf70]:$dataArmors[_0x2eaf70];this[_0xa14584(0x3d3)](_0x5dd87f,_0x14e21c);},Game_Actor['prototype'][_0x5b2ecf(0x217)]=function(_0x5c1c5d){const _0x358070=_0x5b2ecf;let _0x523e51=0x0;const _0xd12eb2=this[_0x358070(0x460)](),_0x3c62d3=this[_0x358070(0x15a)]();for(let _0x5a8b04=0x0;_0x5a8b04<_0xd12eb2['length'];_0x5a8b04++){if(_0xd12eb2[_0x5a8b04]===_0x5c1c5d){_0x523e51=_0x5a8b04;if(!_0x3c62d3[_0x5a8b04])return _0x523e51;}}return _0x523e51;},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x2ef)]=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x403)],Game_Actor['prototype'][_0x5b2ecf(0x403)]=function(_0x37b88a){const _0x527af8=_0x5b2ecf;let _0x5e7156=VisuMZ[_0x527af8(0x11a)][_0x527af8(0x2ef)][_0x527af8(0x4b6)](this,_0x37b88a);for(const _0x5dbe83 of this[_0x527af8(0x15a)]()){if(_0x5dbe83)_0x5e7156+=this['paramPlusItemsEquipsCoreCustomJS'](_0x5dbe83,_0x37b88a);}return _0x5e7156;},Game_Actor['prototype'][_0x5b2ecf(0x354)]=function(_0x114542,_0x3f0cca){const _0x5936a4=_0x5b2ecf;if(this[_0x5936a4(0x2f5)])return 0x0;const _0x30bbb8=(DataManager['isWeapon'](_0x114542)?_0x5936a4(0xd8):_0x5936a4(0x412))[_0x5936a4(0x350)](_0x114542['id']),_0xe97330=_0x5936a4(0x472)[_0x5936a4(0x350)](_0x30bbb8,_0x3f0cca);if(VisuMZ[_0x5936a4(0x11a)][_0x5936a4(0x255)][_0xe97330]){this[_0x5936a4(0x2f5)]=!![];const _0x5125f5=VisuMZ[_0x5936a4(0x11a)]['paramJS'][_0xe97330][_0x5936a4(0x4b6)](this,_0x114542,_0x3f0cca);return this[_0x5936a4(0x2f5)]=![],_0x5125f5;}else return 0x0;},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x411)]=function(_0x5bb09f){const _0x3cd5ce=_0x5b2ecf;this[_0x3cd5ce(0x16e)]=!![],this[_0x3cd5ce(0x36d)]=_0x5bb09f;},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x47a)]=function(_0x48649e){const _0x7a167a=_0x5b2ecf;_0x48649e=this['convertInitEquipsToItems'](_0x48649e);const _0x1a2cd4=this[_0x7a167a(0x460)]();this[_0x7a167a(0x3c4)]=[];for(let _0x5e6477=0x0;_0x5e6477<_0x1a2cd4['length'];_0x5e6477++){this['_equips'][_0x5e6477]=new Game_Item();}for(let _0x4f4530=0x0;_0x4f4530<_0x1a2cd4['length'];_0x4f4530++){const _0x22187b=_0x1a2cd4[_0x4f4530],_0xf497ea=this['getMatchingInitEquip'](_0x48649e,_0x22187b);if(this[_0x7a167a(0x335)](_0xf497ea))this[_0x7a167a(0x3c4)][_0x4f4530][_0x7a167a(0x1f3)](_0xf497ea);}this[_0x7a167a(0x1a6)](!![]),this[_0x7a167a(0x35a)]();},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x27b)]=function(_0x3ce84e){const _0x25f9f7=_0x5b2ecf,_0x2d24db=[];for(let _0x5545f1=0x0;_0x5545f1<_0x3ce84e[_0x25f9f7(0x3e7)];_0x5545f1++){const _0x5c276f=_0x3ce84e[_0x5545f1];if(_0x5c276f<=0x0)continue;const _0x586e92=$dataSystem['equipTypes'][_0x5545f1+0x1];if(_0x586e92===$dataSystem['equipTypes'][0x1]||_0x5545f1===0x1&&this['isDualWield']())_0x2d24db[_0x25f9f7(0x1bf)]($dataWeapons[_0x5c276f]);else{if(BattleManager[_0x25f9f7(0x127)]()){const _0x399f22=$dataArmors[_0x5c276f];_0x399f22&&_0x399f22[_0x25f9f7(0x355)]===_0x5545f1+0x1&&_0x2d24db[_0x25f9f7(0x1bf)](_0x399f22);}else{const _0x53a282=$dataArmors[_0x5c276f];_0x53a282&&_0x53a282['etypeId']===_0x5545f1+0x1&&_0x2d24db[_0x25f9f7(0x1bf)](_0x53a282);}}}return _0x2d24db;},Game_Actor[_0x5b2ecf(0x138)]['getMatchingInitEquip']=function(_0x2c5b42,_0x176c3b){const _0x59b5af=_0x5b2ecf;for(const _0x3f9cf6 of _0x2c5b42){if(!_0x3f9cf6)continue;if(_0x3f9cf6['etypeId']===_0x176c3b)return _0x2c5b42[_0x59b5af(0x4ff)](_0x2c5b42['indexOf'](_0x3f9cf6),0x1),_0x3f9cf6;}return null;},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x460)]=function(){const _0x385423=_0x5b2ecf,_0x5e87cf=VisuMZ[_0x385423(0x11a)]['deepCopy'](this[_0x385423(0x1b0)]||this[_0x385423(0x195)]()[_0x385423(0x460)]);if(_0x5e87cf['length']>=0x2&&this[_0x385423(0xd3)]())_0x5e87cf[0x1]=0x1;return _0x5e87cf;},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x416)]=function(_0x23d8e5){const _0xccd908=_0x5b2ecf;_0x23d8e5[_0xccd908(0x44d)](0x0),_0x23d8e5[_0xccd908(0x44d)](-0x1),this['_forcedSlots']=_0x23d8e5,this['refresh'](),this[_0xccd908(0x357)]();},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x4ad)]=function(){const _0x59f729=_0x5b2ecf;this[_0x59f729(0x1b0)]=undefined,this[_0x59f729(0x35a)](),this[_0x59f729(0x357)]();},Game_Actor['prototype']['updateChangedSlots']=function(){const _0xfbe2cc=_0x5b2ecf;let _0x1a9ac9=this[_0xfbe2cc(0x460)]()[_0xfbe2cc(0x3e7)];while(this['_equips'][_0xfbe2cc(0x3e7)]>_0x1a9ac9){const _0x3c62bb=this[_0xfbe2cc(0x3c4)][this[_0xfbe2cc(0x3c4)]['length']-0x1];_0x3c62bb&&_0x3c62bb[_0xfbe2cc(0x2e8)]()&&$gameParty['gainItem'](_0x3c62bb[_0xfbe2cc(0x2e8)](),0x1),this[_0xfbe2cc(0x3c4)][_0xfbe2cc(0x1ec)]();}while(_0x1a9ac9>this['_equips'][_0xfbe2cc(0x3e7)]){this[_0xfbe2cc(0x3c4)][_0xfbe2cc(0x1bf)](new Game_Item());}},VisuMZ[_0x5b2ecf(0x11a)]['Game_Actor_changeClass']=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x461)],Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x461)]=function(_0x1c9d96,_0x1714ce){const _0x3115d0=_0x5b2ecf;VisuMZ[_0x3115d0(0x11a)][_0x3115d0(0x129)]['call'](this,_0x1c9d96,_0x1714ce),this['updateChangedSlots']();},Game_Actor['prototype'][_0x5b2ecf(0x340)]=function(){const _0x4c3c38=_0x5b2ecf,_0x58bbad=this[_0x4c3c38(0x460)]();for(let _0x4ef859=0x0;_0x4ef859<_0x58bbad[_0x4c3c38(0x3e7)];_0x4ef859++){if(!this[_0x4c3c38(0x3c4)][_0x4ef859])this[_0x4c3c38(0x3c4)][_0x4ef859]=new Game_Item();}this[_0x4c3c38(0x1a6)](![]),this['refresh']();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3df)]=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x3d3)],Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x3d3)]=function(_0xeb9ac0,_0xd293db){const _0x170779=_0x5b2ecf;if(!this[_0x170779(0x43b)]){const _0x2d128a=JsonEx[_0x170779(0x3b6)](this);_0x2d128a[_0x170779(0x43b)]=!![],this[_0x170779(0x499)](_0xeb9ac0,_0xd293db),this[_0x170779(0x3fb)](_0x2d128a);}else this[_0x170779(0x499)](_0xeb9ac0,_0xd293db);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x466)]=Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x252)],Game_Actor['prototype'][_0x5b2ecf(0x252)]=function(_0x1424d0,_0x26f14b){const _0x5e6b75=_0x5b2ecf;!this['_equips'][_0x1424d0]&&(this[_0x5e6b75(0x3c4)][_0x1424d0]=new Game_Item());if(!this[_0x5e6b75(0x43b)]){const _0x395f11=JsonEx[_0x5e6b75(0x3b6)](this);_0x395f11['_tempActor']=!![],VisuMZ[_0x5e6b75(0x11a)][_0x5e6b75(0x466)][_0x5e6b75(0x4b6)](this,_0x1424d0,_0x26f14b),this[_0x5e6b75(0x3fb)](_0x395f11);}else VisuMZ[_0x5e6b75(0x11a)]['Game_Actor_forceChangeEquip'][_0x5e6b75(0x4b6)](this,_0x1424d0,_0x26f14b);},VisuMZ[_0x5b2ecf(0x11a)]['Game_Actor_discardEquip']=Game_Actor['prototype'][_0x5b2ecf(0x4c9)],Game_Actor['prototype'][_0x5b2ecf(0x4c9)]=function(_0x255cb7){const _0x376d2f=_0x5b2ecf;if(!this[_0x376d2f(0x43b)]){const _0x5ad338=JsonEx[_0x376d2f(0x3b6)](this);_0x5ad338[_0x376d2f(0x43b)]=!![],VisuMZ[_0x376d2f(0x11a)][_0x376d2f(0x4d5)][_0x376d2f(0x4b6)](this,_0x255cb7),this[_0x376d2f(0x3fb)](_0x5ad338);}else VisuMZ[_0x376d2f(0x11a)][_0x376d2f(0x4d5)]['call'](this,_0x255cb7);},Game_Actor['prototype'][_0x5b2ecf(0x1a6)]=function(_0x4f508b){const _0x2ffb06=_0x5b2ecf;if(this[_0x2ffb06(0x24b)])return;let _0x353759=0x0;for(;;){_0x353759++;if(_0x353759>0x3)break;const _0x381ba4=this['equipSlots'](),_0x4dfa7f=this[_0x2ffb06(0x15a)](),_0x421052=_0x4dfa7f[_0x2ffb06(0x3e7)];let _0xdd95ce=![];for(let _0x359b33=0x0;_0x359b33<_0x421052;_0x359b33++){const _0x223cfc=_0x4dfa7f[_0x359b33];if(!_0x223cfc)continue;const _0x2f23cc=DataManager[_0x2ffb06(0x182)](_0x223cfc);if(!this['canEquip'](_0x223cfc)||!_0x2f23cc[_0x2ffb06(0x4a1)](_0x381ba4[_0x359b33])){!_0x4f508b&&this['tradeItemWithParty'](null,_0x223cfc);if(!this[_0x2ffb06(0x43b)]){const _0x432b4a=JsonEx[_0x2ffb06(0x3b6)](this);_0x432b4a[_0x2ffb06(0x43b)]=!![],this['_equips'][_0x359b33][_0x2ffb06(0x1f3)](null),this[_0x2ffb06(0x24b)]=!![],this['equipAdjustHpMp'](_0x432b4a),this[_0x2ffb06(0x24b)]=undefined;}else{if(this['_equips'][_0x359b33])this[_0x2ffb06(0x3c4)][_0x359b33]['setObject'](null);else continue;}_0xdd95ce=!![];}}if(!_0xdd95ce)break;}},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x3fb)]=function(_0x34bdbc){const _0x574601=_0x5b2ecf;if(this[_0x574601(0x43b)])return;if(!VisuMZ['ItemsEquipsCore']['Settings'][_0x574601(0x276)]['EquipAdjustHpMp'])return;const _0x25566e=Math[_0x574601(0x20d)](_0x34bdbc[_0x574601(0x209)]()*this[_0x574601(0xda)]),_0x4fd215=Math[_0x574601(0x20d)](_0x34bdbc['mpRate']()*this[_0x574601(0x19c)]);if(this['hp']>0x0)this[_0x574601(0x298)](_0x25566e);if(this['mp']>0x0)this[_0x574601(0x1d1)](_0x4fd215);},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x499)]=function(_0x1534e3,_0x1f4330){const _0x4380d7=_0x5b2ecf;if(!this['tradeItemWithParty'](_0x1f4330,this[_0x4380d7(0x15a)]()[_0x1534e3]))return;if(_0x1f4330){const _0x23b09f=DataManager['getEtypeIDs'](_0x1f4330);if(!_0x23b09f['includes'](this['equipSlots']()[_0x1534e3]))return;}!this[_0x4380d7(0x3c4)][_0x1534e3]&&(this['_equips'][_0x1534e3]=new Game_Item());this[_0x4380d7(0x3c4)][_0x1534e3][_0x4380d7(0x1f3)](_0x1f4330);if(VisuMZ[_0x4380d7(0x11a)][_0x4380d7(0x175)](_0x1f4330)){const _0x246e3b=VisuMZ['ItemsEquipsCore'][_0x4380d7(0x151)][_0x4380d7(0x276)][_0x4380d7(0x3a7)]||'',_0x3d1194=this[_0x4380d7(0x4df)](),_0x20cdc4='\x5cI[%1]'['format'](_0x1f4330[_0x4380d7(0x46a)]),_0x5f34da=_0x1f4330[_0x4380d7(0x4df)]||'';let _0x398d0a=_0x246e3b[_0x4380d7(0x350)](_0x3d1194,_0x20cdc4,_0x5f34da);if(VisuMZ[_0x4380d7(0xc8)][_0x4380d7(0x2cc)]>=1.79&&_0x398d0a[_0x4380d7(0x3e7)]>0x0)$textPopup(_0x398d0a);}this[_0x4380d7(0x35a)]();},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x175)]=function(_0x334d75){const _0x2f9486=_0x5b2ecf;if(!_0x334d75)return![];if(!Imported[_0x2f9486(0x1d2)])return![];if(VisuMZ[_0x2f9486(0xc8)][_0x2f9486(0x2cc)]<1.79)return![];return DataManager[_0x2f9486(0xc7)](_0x334d75);},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x1e7)]=function(_0x543a76){const _0x299950=_0x5b2ecf,_0x2c92a1=this['equipSlots']()[_0x543a76],_0xd7ec3f=$gameParty[_0x299950(0x41e)]()['filter'](_0x42372a=>DataManager[_0x299950(0x182)](_0x42372a)[_0x299950(0x4a1)](_0x2c92a1)&&this['canEquip'](_0x42372a)&&!DataManager[_0x299950(0xc7)](_0x42372a));let _0x557b67=null,_0xb026d=-0x3e8;for(let _0x1a8db3=0x0;_0x1a8db3<_0xd7ec3f[_0x299950(0x3e7)];_0x1a8db3++){const _0x4fb936=this[_0x299950(0x3ca)](_0xd7ec3f[_0x1a8db3]);_0x4fb936>_0xb026d&&(_0xb026d=_0x4fb936,_0x557b67=_0xd7ec3f[_0x1a8db3]);}return _0x557b67;},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x362)]=Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)],Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)]=function(){const _0x319e68=_0x5b2ecf;VisuMZ[_0x319e68(0x11a)][_0x319e68(0x362)][_0x319e68(0x4b6)](this),this[_0x319e68(0x262)](),this[_0x319e68(0x3c6)]();},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x262)]=function(){const _0xe6f34c=_0x5b2ecf;this[_0xe6f34c(0xf0)]=[];},Game_Party['prototype']['isNewItem']=function(_0x484f3d){const _0x4204a9=_0x5b2ecf;if(!$gameTemp[_0x4204a9(0x280)]())return![];if(this[_0x4204a9(0xf0)]===undefined)this['initNewItemsList']();let _0x4b2801='';if(DataManager[_0x4204a9(0x2d4)](_0x484f3d))_0x4b2801=_0x4204a9(0x485)[_0x4204a9(0x350)](_0x484f3d['id']);else{if(DataManager[_0x4204a9(0xdc)](_0x484f3d))_0x4b2801=_0x4204a9(0x33d)[_0x4204a9(0x350)](_0x484f3d['id']);else{if(DataManager[_0x4204a9(0x4dc)](_0x484f3d))_0x4b2801=_0x4204a9(0x34d)[_0x4204a9(0x350)](_0x484f3d['id']);else return;}}return this[_0x4204a9(0xf0)][_0x4204a9(0x4a1)](_0x4b2801);},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x2c2)]=function(_0x20e4cd){const _0x40fd9a=_0x5b2ecf;if(!$gameTemp[_0x40fd9a(0x280)]())return;if(this[_0x40fd9a(0xf0)]===undefined)this[_0x40fd9a(0x262)]();let _0x1890b9='';if(DataManager[_0x40fd9a(0x2d4)](_0x20e4cd))_0x1890b9=_0x40fd9a(0x485)[_0x40fd9a(0x350)](_0x20e4cd['id']);else{if(DataManager['isWeapon'](_0x20e4cd))_0x1890b9=_0x40fd9a(0x33d)[_0x40fd9a(0x350)](_0x20e4cd['id']);else{if(DataManager[_0x40fd9a(0x4dc)](_0x20e4cd))_0x1890b9=_0x40fd9a(0x34d)[_0x40fd9a(0x350)](_0x20e4cd['id']);else return;}}if(!this[_0x40fd9a(0xf0)]['includes'](_0x1890b9))this[_0x40fd9a(0xf0)][_0x40fd9a(0x1bf)](_0x1890b9);},Game_Party[_0x5b2ecf(0x138)]['clearNewItem']=function(_0x3506dc){const _0x462c48=_0x5b2ecf;if(!$gameTemp[_0x462c48(0x280)]())return;if(this[_0x462c48(0xf0)]===undefined)this[_0x462c48(0x262)]();let _0x3e673a='';if(DataManager[_0x462c48(0x2d4)](_0x3506dc))_0x3e673a=_0x462c48(0x485)['format'](_0x3506dc['id']);else{if(DataManager['isWeapon'](_0x3506dc))_0x3e673a=_0x462c48(0x33d)[_0x462c48(0x350)](_0x3506dc['id']);else{if(DataManager[_0x462c48(0x4dc)](_0x3506dc))_0x3e673a=_0x462c48(0x34d)['format'](_0x3506dc['id']);else return;}}this[_0x462c48(0xf0)][_0x462c48(0x4a1)](_0x3e673a)&&this[_0x462c48(0xf0)][_0x462c48(0x4ff)](this['_newItemsList'][_0x462c48(0x455)](_0x3e673a),0x1);},VisuMZ[_0x5b2ecf(0x11a)]['Game_Party_numItems']=Game_Party['prototype'][_0x5b2ecf(0x128)],Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x128)]=function(_0x59dbd8){const _0xea7cf8=_0x5b2ecf;if(DataManager[_0xea7cf8(0x45d)](_0x59dbd8))_0x59dbd8=DataManager[_0xea7cf8(0x4e9)](_0x59dbd8);return VisuMZ[_0xea7cf8(0x11a)][_0xea7cf8(0x410)][_0xea7cf8(0x4b6)](this,_0x59dbd8);},VisuMZ['ItemsEquipsCore']['Game_Party_gainItem']=Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x30f)],Game_Party['prototype'][_0x5b2ecf(0x30f)]=function(_0x5e9bdc,_0x1f9e2e,_0x424714){const _0x330e61=_0x5b2ecf;if(DataManager[_0x330e61(0x45d)](_0x5e9bdc))_0x5e9bdc=null;const _0x2700cd=this[_0x330e61(0x128)](_0x5e9bdc);VisuMZ[_0x330e61(0x11a)][_0x330e61(0x4bd)][_0x330e61(0x4b6)](this,_0x5e9bdc,_0x1f9e2e,_0x424714);if(this['numItems'](_0x5e9bdc)>_0x2700cd)this['setNewItem'](_0x5e9bdc);},Game_Party['prototype']['maxItems']=function(_0x50d338){const _0xece8fb=_0x5b2ecf;if(DataManager[_0xece8fb(0x45d)](_0x50d338))_0x50d338=DataManager['getProxyItem'](_0x50d338);return DataManager[_0xece8fb(0x2dd)](_0x50d338);},VisuMZ[_0x5b2ecf(0x11a)]['Game_Party_consumeItem']=Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0xc2)],Game_Party[_0x5b2ecf(0x138)]['consumeItem']=function(_0x58289e){const _0x3372cb=_0x5b2ecf;if(_0x58289e){const _0x2471a5=_0x58289e[_0x3372cb(0x106)]||'';if(_0x2471a5[_0x3372cb(0x3f2)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x50b082=Number(RegExp['$1'])*0.01;if(Math[_0x3372cb(0x279)]()<_0x50b082)return;}}VisuMZ[_0x3372cb(0x11a)][_0x3372cb(0x18d)]['call'](this,_0x58289e);},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x3c6)]=function(){const _0x3f8626=_0x5b2ecf;this[_0x3f8626(0x214)]={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x43e)]=function(){const _0x5d2ed0=_0x5b2ecf;return this[_0x5d2ed0(0x214)]===undefined&&this['initShopTrackingData'](),this[_0x5d2ed0(0x214)];},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x490)]=function(_0x3059f7,_0x205d93){const _0xafa877=_0x5b2ecf;if(!_0x205d93)return 0x0;this[_0xafa877(0x214)]===undefined&&this[_0xafa877(0x3c6)]();const _0x16b2d1=this[_0xafa877(0x43e)]();if(!_0x16b2d1[_0x3059f7])return 0x0;if(_0x205d93===_0xafa877(0x31a))return _0x16b2d1[_0x3059f7][_0xafa877(0x31a)]=_0x16b2d1[_0x3059f7][_0xafa877(0x31a)]||0x0,_0x16b2d1[_0x3059f7][_0xafa877(0x31a)];else{if(DataManager[_0xafa877(0x2d4)](_0x205d93))key=_0xafa877(0x485)['format'](_0x205d93['id']);else{if(DataManager[_0xafa877(0xdc)](_0x205d93))key=_0xafa877(0x33d)[_0xafa877(0x350)](_0x205d93['id']);else{if(DataManager[_0xafa877(0x4dc)](_0x205d93))key=_0xafa877(0x34d)[_0xafa877(0x350)](_0x205d93['id']);else return 0x0;}}}return _0x16b2d1[_0x3059f7][_0xafa877(0xfc)][key]=_0x16b2d1[_0x3059f7]['items'][key]||0x0,_0x16b2d1[_0x3059f7][_0xafa877(0xfc)][key];},Game_Party['prototype'][_0x5b2ecf(0x34e)]=function(_0x54f136){const _0x4671fe=_0x5b2ecf;return this[_0x4671fe(0x490)]('buy',_0x54f136);},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x3c0)]=function(_0x330924){const _0x708363=_0x5b2ecf;return this[_0x708363(0x490)](_0x708363(0x3fa),_0x330924);},Game_Party[_0x5b2ecf(0x138)]['getShopTrackingGoldBuy']=function(){const _0x4d99f4=_0x5b2ecf;return this['getShopTrackingItem'](_0x4d99f4(0x4d3),_0x4d99f4(0x31a));},Game_Party[_0x5b2ecf(0x138)]['getShopTrackingGoldSell']=function(){const _0x1d871a=_0x5b2ecf;return this['getShopTrackingItem'](_0x1d871a(0x3fa),'gold');},Game_Party['prototype'][_0x5b2ecf(0x323)]=function(_0x5c7af2,_0x5a0019,_0xcbbf75){const _0x5a19a7=_0x5b2ecf;if(!_0x5a0019)return;if(_0xcbbf75<=0x0)return;this[_0x5a19a7(0x214)]===undefined&&this[_0x5a19a7(0x3c6)]();const _0x3689ea=this['getShopTrackingData']();if(!_0x3689ea[_0x5c7af2])return;if(_0x5a0019===_0x5a19a7(0x31a)){_0x3689ea[_0x5c7af2][_0x5a19a7(0x31a)]=_0x3689ea[_0x5c7af2][_0x5a19a7(0x31a)]||0x0,_0x3689ea[_0x5c7af2][_0x5a19a7(0x31a)]+=_0xcbbf75;return;}else{if(DataManager['isItem'](_0x5a0019))key=_0x5a19a7(0x485)[_0x5a19a7(0x350)](_0x5a0019['id']);else{if(DataManager['isWeapon'](_0x5a0019))key=_0x5a19a7(0x33d)['format'](_0x5a0019['id']);else{if(DataManager[_0x5a19a7(0x4dc)](_0x5a0019))key=_0x5a19a7(0x34d)[_0x5a19a7(0x350)](_0x5a0019['id']);else return;}}}_0x3689ea[_0x5c7af2][_0x5a19a7(0xfc)][key]=_0x3689ea[_0x5c7af2]['items'][key]||0x0,_0x3689ea[_0x5c7af2]['items'][key]+=_0xcbbf75;},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x506)]=function(_0x259b5e,_0x34c5e8){const _0x26f68a=_0x5b2ecf;this[_0x26f68a(0x323)](_0x26f68a(0x4d3),_0x259b5e,_0x34c5e8);},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x1bb)]=function(_0x1a14fc,_0x498ee7){const _0x2577cd=_0x5b2ecf;this[_0x2577cd(0x323)](_0x2577cd(0x3fa),_0x1a14fc,_0x498ee7);},Game_Party[_0x5b2ecf(0x138)][_0x5b2ecf(0x37b)]=function(_0xea3914){const _0x251194=_0x5b2ecf;this[_0x251194(0x323)](_0x251194(0x4d3),_0x251194(0x31a),_0xea3914);},Game_Party[_0x5b2ecf(0x138)]['addShopTrackingGoldSell']=function(_0x5cce98){const _0x4490f4=_0x5b2ecf;this[_0x4490f4(0x323)](_0x4490f4(0x3fa),_0x4490f4(0x31a),_0x5cce98);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x366)]=Scene_ItemBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x125)],Scene_ItemBase[_0x5b2ecf(0x138)][_0x5b2ecf(0x125)]=function(){const _0x36477a=_0x5b2ecf;VisuMZ[_0x36477a(0x11a)][_0x36477a(0x366)]['call'](this),this[_0x36477a(0x30c)][_0x36477a(0x316)]();},Scene_Item[_0x5b2ecf(0x138)]['isBottomHelpMode']=function(){const _0x3b7fd0=_0x5b2ecf;if(ConfigManager[_0x3b7fd0(0x320)]&&ConfigManager[_0x3b7fd0(0x2cf)]!==undefined)return ConfigManager[_0x3b7fd0(0x2cf)];else return this[_0x3b7fd0(0x487)]()?this[_0x3b7fd0(0x155)]()[_0x3b7fd0(0x3f2)](/LOWER/i):Scene_ItemBase[_0x3b7fd0(0x138)][_0x3b7fd0(0x240)][_0x3b7fd0(0x4b6)](this);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x351)]=function(){const _0x37d9da=_0x5b2ecf;if(ConfigManager[_0x37d9da(0x320)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x37d9da(0x3f5)];else return this[_0x37d9da(0x487)]()?this[_0x37d9da(0x155)]()[_0x37d9da(0x3f2)](/RIGHT/i):Scene_ItemBase[_0x37d9da(0x138)][_0x37d9da(0x351)][_0x37d9da(0x4b6)](this);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x155)]=function(){const _0x5d33e4=_0x5b2ecf;return VisuMZ[_0x5d33e4(0x11a)][_0x5d33e4(0x151)][_0x5d33e4(0x369)]['LayoutStyle'];},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x24d)]=function(){return this['_categoryWindow']&&this['_categoryWindow']['isUseModernControls']();},Scene_Item['prototype'][_0x5b2ecf(0x487)]=function(){const _0x34fd35=_0x5b2ecf;return VisuMZ[_0x34fd35(0x11a)][_0x34fd35(0x151)][_0x34fd35(0x369)][_0x34fd35(0x28b)];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x2cb)]=Scene_Item[_0x5b2ecf(0x138)]['create'],Scene_Item[_0x5b2ecf(0x138)]['create']=function(){const _0x9652e0=_0x5b2ecf;VisuMZ[_0x9652e0(0x11a)][_0x9652e0(0x2cb)][_0x9652e0(0x4b6)](this),this[_0x9652e0(0x24d)]()&&this[_0x9652e0(0x3ea)]();},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x260)]=Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0xc4)],Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0xc4)]=function(){const _0x59a733=_0x5b2ecf;return this[_0x59a733(0x487)]()?this[_0x59a733(0x314)]():VisuMZ['ItemsEquipsCore'][_0x59a733(0x260)]['call'](this);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x314)]=function(){const _0x4b5dcb=_0x5b2ecf,_0x104d79=0x0,_0x21c994=this['helpAreaTop'](),_0x918672=Graphics[_0x4b5dcb(0x1b5)],_0x14ebba=this[_0x4b5dcb(0x346)]();return new Rectangle(_0x104d79,_0x21c994,_0x918672,_0x14ebba);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x10a)]=Scene_Item[_0x5b2ecf(0x138)]['createCategoryWindow'],Scene_Item['prototype'][_0x5b2ecf(0x26d)]=function(){const _0x53bf06=_0x5b2ecf;VisuMZ[_0x53bf06(0x11a)][_0x53bf06(0x10a)][_0x53bf06(0x4b6)](this),this['isUseModernControls']()&&this[_0x53bf06(0xfe)]();},Scene_Item['prototype'][_0x5b2ecf(0xfe)]=function(){const _0x3188cf=_0x5b2ecf;delete this['_categoryWindow'][_0x3188cf(0x177)]['ok'],delete this['_categoryWindow']['_handlers']['cancel'];},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Item_categoryWindowRect']=Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x191)],Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x191)]=function(){const _0x271655=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x271655(0x1ca)]():VisuMZ[_0x271655(0x11a)][_0x271655(0x108)]['call'](this);},Scene_Item[_0x5b2ecf(0x138)]['categoryWindowRectItemsEquipsCore']=function(){const _0x2b8911=_0x5b2ecf,_0x19fa33=0x0,_0x17317d=this[_0x2b8911(0x43a)](),_0x9a124d=Graphics[_0x2b8911(0x1b5)],_0x301e5d=this[_0x2b8911(0x48c)](0x1,!![]);return new Rectangle(_0x19fa33,_0x17317d,_0x9a124d,_0x301e5d);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x231)]=Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x396)],Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x396)]=function(){const _0x469cff=_0x5b2ecf;VisuMZ[_0x469cff(0x11a)][_0x469cff(0x231)][_0x469cff(0x4b6)](this),this[_0x469cff(0x24d)]()&&this[_0x469cff(0x15c)](),this[_0x469cff(0x148)]()&&this[_0x469cff(0x34c)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x4a2)]=Scene_Item['prototype'][_0x5b2ecf(0x427)],Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x427)]=function(){const _0x1c886f=_0x5b2ecf;if(this[_0x1c886f(0x487)]())return this[_0x1c886f(0x4ee)]();else{const _0x40ae87=VisuMZ['ItemsEquipsCore'][_0x1c886f(0x4a2)]['call'](this);return this[_0x1c886f(0x148)]()&&this[_0x1c886f(0x35e)]()&&(_0x40ae87[_0x1c886f(0x4b9)]-=this[_0x1c886f(0x229)]()),_0x40ae87;}},Scene_Item['prototype'][_0x5b2ecf(0x4ee)]=function(){const _0x5f192e=_0x5b2ecf,_0xfe8986=this[_0x5f192e(0x351)]()?this[_0x5f192e(0x229)]():0x0,_0x315ca7=this['_categoryWindow']['y']+this[_0x5f192e(0x218)][_0x5f192e(0x42c)],_0x2fabb2=Graphics[_0x5f192e(0x1b5)]-this[_0x5f192e(0x229)](),_0x49b063=this[_0x5f192e(0x46b)]()-_0x315ca7;return new Rectangle(_0xfe8986,_0x315ca7,_0x2fabb2,_0x49b063);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x15c)]=function(){const _0x19f1a0=_0x5b2ecf;this[_0x19f1a0(0x30c)]['setHandler'](_0x19f1a0(0x3cd),this[_0x19f1a0(0x12d)][_0x19f1a0(0x1a8)](this));},Scene_Item[_0x5b2ecf(0x138)]['allowCreateStatusWindow']=function(){const _0x1f0c07=_0x5b2ecf;return this[_0x1f0c07(0x487)]()?!![]:VisuMZ[_0x1f0c07(0x11a)][_0x1f0c07(0x151)]['ItemScene'][_0x1f0c07(0x232)];},Scene_Item[_0x5b2ecf(0x138)]['adjustItemWidthByStatus']=function(){const _0x5c7b38=_0x5b2ecf;return VisuMZ[_0x5c7b38(0x11a)]['Settings'][_0x5c7b38(0x369)]['ItemSceneAdjustItemList'];},Scene_Item['prototype'][_0x5b2ecf(0x34c)]=function(){const _0x36400d=_0x5b2ecf,_0xe54652=this[_0x36400d(0x465)]();this[_0x36400d(0x13c)]=new Window_ShopStatus(_0xe54652),this['addWindow'](this[_0x36400d(0x13c)]),this['_itemWindow'][_0x36400d(0x398)](this[_0x36400d(0x13c)]);const _0x2b796c=VisuMZ[_0x36400d(0x11a)][_0x36400d(0x151)][_0x36400d(0x369)][_0x36400d(0x3e6)];this['_statusWindow'][_0x36400d(0x3d2)](_0x2b796c||0x0);},Scene_Item[_0x5b2ecf(0x138)]['statusWindowRect']=function(){const _0x3a9334=_0x5b2ecf;return this[_0x3a9334(0x487)]()?this[_0x3a9334(0x2e9)]():VisuMZ[_0x3a9334(0x11a)][_0x3a9334(0x151)][_0x3a9334(0x369)]['ItemMenuStatusRect'][_0x3a9334(0x4b6)](this);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x2e9)]=function(){const _0xd9808e=_0x5b2ecf,_0x240f70=this['statusWidth'](),_0x3ed4eb=this[_0xd9808e(0x30c)][_0xd9808e(0x42c)],_0x3ccf76=this[_0xd9808e(0x351)]()?0x0:Graphics[_0xd9808e(0x1b5)]-this[_0xd9808e(0x229)](),_0x28ff37=this[_0xd9808e(0x30c)]['y'];return new Rectangle(_0x3ccf76,_0x28ff37,_0x240f70,_0x3ed4eb);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x229)]=function(){const _0x3e36a1=_0x5b2ecf;return Scene_Shop[_0x3e36a1(0x138)]['statusWidth']();},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x1fd)]=function(){const _0x438bc0=_0x5b2ecf;if(!this[_0x438bc0(0x155)]())return![];if(!this[_0x438bc0(0x24d)]())return![];if(!this[_0x438bc0(0x30c)])return![];if(!this[_0x438bc0(0x30c)][_0x438bc0(0x41d)])return![];return this['updatedLayoutStyle']()&&this[_0x438bc0(0x24d)]();},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x14a)]=function(){const _0x2ac133=_0x5b2ecf;if(this[_0x2ac133(0x1fd)]())return this['_itemWindow']['maxCols']()===0x1?TextManager['getInputMultiButtonStrings'](_0x2ac133(0x3da),'right'):TextManager[_0x2ac133(0x186)](_0x2ac133(0x2bf),_0x2ac133(0x1eb));return Scene_ItemBase[_0x2ac133(0x138)][_0x2ac133(0x14a)][_0x2ac133(0x4b6)](this);},Scene_Item[_0x5b2ecf(0x138)][_0x5b2ecf(0x32c)]=function(){const _0x2334d7=_0x5b2ecf;if(this[_0x2334d7(0x1fd)]())return VisuMZ['ItemsEquipsCore'][_0x2334d7(0x151)][_0x2334d7(0x369)][_0x2334d7(0x397)];return Scene_ItemBase[_0x2334d7(0x138)][_0x2334d7(0x32c)][_0x2334d7(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x1e4)]=function(){const _0x175a1b=_0x5b2ecf;Scene_ItemBase['prototype'][_0x175a1b(0x1e4)][_0x175a1b(0x4b6)](this),this[_0x175a1b(0x319)]();},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x240)]=function(){const _0x8b669e=_0x5b2ecf;if(ConfigManager[_0x8b669e(0x320)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x8b669e(0x487)]())return this[_0x8b669e(0x155)]()['match'](/LOWER/i);else Scene_MenuBase[_0x8b669e(0x138)][_0x8b669e(0x351)][_0x8b669e(0x4b6)](this);}},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x351)]=function(){const _0xc55dd4=_0x5b2ecf;if(ConfigManager[_0xc55dd4(0x320)]&&ConfigManager[_0xc55dd4(0x3f5)]!==undefined)return ConfigManager[_0xc55dd4(0x3f5)];else{if(this[_0xc55dd4(0x487)]())return this[_0xc55dd4(0x155)]()[_0xc55dd4(0x3f2)](/RIGHT/i);else Scene_MenuBase[_0xc55dd4(0x138)][_0xc55dd4(0x351)][_0xc55dd4(0x4b6)](this);}},Scene_Equip[_0x5b2ecf(0x138)]['updatedLayoutStyle']=function(){const _0x385678=_0x5b2ecf;return VisuMZ[_0x385678(0x11a)][_0x385678(0x151)]['EquipScene'][_0x385678(0x344)];},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x24d)]=function(){const _0x4c9a42=_0x5b2ecf;return this['_commandWindow']&&this[_0x4c9a42(0x4a8)][_0x4c9a42(0x24d)]();},Scene_Equip['prototype'][_0x5b2ecf(0x487)]=function(){const _0x3b0c49=_0x5b2ecf;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x3b0c49(0x28b)];},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x301)]=Scene_Equip[_0x5b2ecf(0x138)]['create'],Scene_Equip[_0x5b2ecf(0x138)]['create']=function(){const _0x587c21=_0x5b2ecf;VisuMZ[_0x587c21(0x11a)][_0x587c21(0x301)][_0x587c21(0x4b6)](this),this[_0x587c21(0x24d)]()&&this['commandEquip']();},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Equip_helpWindowRect']=Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0xc4)],Scene_Equip['prototype'][_0x5b2ecf(0xc4)]=function(){const _0x176841=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x176841(0x314)]():VisuMZ[_0x176841(0x11a)]['Scene_Equip_helpWindowRect'][_0x176841(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)]['helpWindowRectItemsEquipsCore']=function(){const _0x5c6986=_0x5b2ecf,_0x226c4b=0x0,_0x3b87a9=this[_0x5c6986(0x3f0)](),_0x4da642=Graphics['boxWidth'],_0x40b707=this[_0x5c6986(0x346)]();return new Rectangle(_0x226c4b,_0x3b87a9,_0x4da642,_0x40b707);},VisuMZ['ItemsEquipsCore']['Scene_Equip_statusWindowRect']=Scene_Equip['prototype'][_0x5b2ecf(0x465)],Scene_Equip['prototype'][_0x5b2ecf(0x465)]=function(){const _0x3a447e=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['statusWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x3a447e(0x133)][_0x3a447e(0x4b6)](this);},Scene_Equip['prototype'][_0x5b2ecf(0x2e9)]=function(){const _0x1e1c2e=_0x5b2ecf,_0x5c6bf7=this[_0x1e1c2e(0x351)]()?0x0:Graphics[_0x1e1c2e(0x1b5)]-this[_0x1e1c2e(0x229)](),_0x4fa55f=this[_0x1e1c2e(0x43a)](),_0x37b0d2=this[_0x1e1c2e(0x229)](),_0x5a0361=this[_0x1e1c2e(0x169)]();return new Rectangle(_0x5c6bf7,_0x4fa55f,_0x37b0d2,_0x5a0361);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3a9)]=Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x25d)],Scene_Equip[_0x5b2ecf(0x138)]['createCommandWindow']=function(){const _0x2787cd=_0x5b2ecf;VisuMZ[_0x2787cd(0x11a)][_0x2787cd(0x3a9)][_0x2787cd(0x4b6)](this);if(this[_0x2787cd(0x4b1)])this[_0x2787cd(0x4a8)]['setHelpWindow'](this[_0x2787cd(0x4b1)]);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x444)]=Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x1af)],Scene_Equip[_0x5b2ecf(0x138)]['commandWindowRect']=function(){const _0x420964=_0x5b2ecf;return this[_0x420964(0x487)]()?this[_0x420964(0xe7)]():VisuMZ[_0x420964(0x11a)][_0x420964(0x444)][_0x420964(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)]['shouldCommandWindowExist']=function(){const _0x3af14d=_0x5b2ecf,_0x558a0c=VisuMZ[_0x3af14d(0x11a)][_0x3af14d(0x151)][_0x3af14d(0x276)];return _0x558a0c[_0x3af14d(0x1f1)]||_0x558a0c[_0x3af14d(0x26f)];},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0xe7)]=function(){const _0x4e3806=_0x5b2ecf,_0x1d64a8=this[_0x4e3806(0x31e)](),_0x40b7c4=this['isRightInputMode']()?this['statusWidth']():0x0,_0x58ac27=this[_0x4e3806(0x43a)](),_0x41dd45=Graphics[_0x4e3806(0x1b5)]-this['statusWidth'](),_0x5b23f5=_0x1d64a8?this[_0x4e3806(0x48c)](0x1,!![]):0x0;return new Rectangle(_0x40b7c4,_0x58ac27,_0x41dd45,_0x5b23f5);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x484)]=Scene_Equip[_0x5b2ecf(0x138)]['createSlotWindow'],Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x272)]=function(){const _0x39a46a=_0x5b2ecf;VisuMZ[_0x39a46a(0x11a)][_0x39a46a(0x484)][_0x39a46a(0x4b6)](this),this[_0x39a46a(0x24d)]()&&this[_0x39a46a(0x1f8)]();},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x194)],Scene_Equip['prototype'][_0x5b2ecf(0x194)]=function(){const _0x5e5477=_0x5b2ecf;return this[_0x5e5477(0x487)]()?this[_0x5e5477(0x408)]():VisuMZ['ItemsEquipsCore'][_0x5e5477(0x164)][_0x5e5477(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)]['slotWindowRectItemsEquipsCore']=function(){const _0x1a5a97=_0x5b2ecf,_0x4105b5=this['commandWindowRect'](),_0x38e513=this[_0x1a5a97(0x351)]()?this[_0x1a5a97(0x229)]():0x0,_0x27c0eb=_0x4105b5['y']+_0x4105b5[_0x1a5a97(0x42c)],_0x93e26d=Graphics['boxWidth']-this[_0x1a5a97(0x229)](),_0x390b6=this[_0x1a5a97(0x169)]()-_0x4105b5['height'];return new Rectangle(_0x38e513,_0x27c0eb,_0x93e26d,_0x390b6);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x28f)]=Scene_Equip['prototype']['itemWindowRect'],Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x427)]=function(){const _0x31b199=_0x5b2ecf;return this[_0x31b199(0x487)]()?this['slotWindowRect']():VisuMZ[_0x31b199(0x11a)]['Scene_Equip_itemWindowRect'][_0x31b199(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x229)]=function(){const _0xb599d0=_0x5b2ecf;return this[_0xb599d0(0x487)]()?this[_0xb599d0(0x400)]():VisuMZ[_0xb599d0(0x11a)][_0xb599d0(0x151)]['EquipScene'][_0xb599d0(0x3c5)];},Scene_Equip['prototype'][_0x5b2ecf(0x400)]=function(){const _0x3de691=_0x5b2ecf;return Math['floor'](Graphics[_0x3de691(0x1b5)]/0x2);},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x1f8)]=function(){const _0x2d4b1a=_0x5b2ecf;this[_0x2d4b1a(0x22c)][_0x2d4b1a(0x1b2)](_0x2d4b1a(0x3cd),this['popScene'][_0x2d4b1a(0x1a8)](this)),this['_slotWindow'][_0x2d4b1a(0x1b2)](_0x2d4b1a(0x1eb),this[_0x2d4b1a(0x3a5)]['bind'](this)),this['_slotWindow'][_0x2d4b1a(0x1b2)](_0x2d4b1a(0x2bf),this[_0x2d4b1a(0x49c)][_0x2d4b1a(0x1a8)](this));},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x4e4)]=Scene_Equip['prototype'][_0x5b2ecf(0x331)],Scene_Equip[_0x5b2ecf(0x138)]['commandEquip']=function(){const _0x2c7a58=_0x5b2ecf;this['isUseModernControls']()&&(this[_0x2c7a58(0x4a8)][_0x2c7a58(0x436)](),this[_0x2c7a58(0x4a8)][_0x2c7a58(0x24f)]()),VisuMZ[_0x2c7a58(0x11a)][_0x2c7a58(0x4e4)][_0x2c7a58(0x4b6)](this);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0xe1)]=Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x1cd)],Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x1cd)]=function(){const _0xc80ddb=_0x5b2ecf;this['_slotWindow'][_0xc80ddb(0x4f1)]()>=0x0?(VisuMZ[_0xc80ddb(0x11a)][_0xc80ddb(0xe1)]['call'](this),this[_0xc80ddb(0x20b)]()):(this[_0xc80ddb(0x22c)][_0xc80ddb(0x4fd)](0x0),this[_0xc80ddb(0x22c)][_0xc80ddb(0x2c0)]());},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x20b)]=function(){const _0x2ea628=_0x5b2ecf;this['_itemWindow'][_0x2ea628(0x35a)]();const _0x5d6d24=this[_0x2ea628(0x22c)][_0x2ea628(0x334)](),_0x3b8131=this['_itemWindow'][_0x2ea628(0x34a)][_0x2ea628(0x455)](_0x5d6d24),_0x225168=Math['floor'](this[_0x2ea628(0x30c)]['maxVisibleItems']()/0x2)-0x1;this[_0x2ea628(0x30c)][_0x2ea628(0x4fd)](_0x3b8131>=0x0?_0x3b8131:0x0),this[_0x2ea628(0x30c)][_0x2ea628(0x221)]>0x1&&(this[_0x2ea628(0x30c)][_0x2ea628(0x221)]=0x1,this[_0x2ea628(0x30c)][_0x2ea628(0x302)]()),this[_0x2ea628(0x30c)][_0x2ea628(0x46e)](this[_0x2ea628(0x30c)]['index']()-_0x225168);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3b2)]=Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x3eb)],Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x3eb)]=function(){const _0x116b20=_0x5b2ecf;VisuMZ[_0x116b20(0x11a)][_0x116b20(0x3b2)][_0x116b20(0x4b6)](this),this['isUseModernControls']()&&(this[_0x116b20(0x4a8)][_0x116b20(0x4fd)](0x0),this[_0x116b20(0x22c)]['deactivate']());},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0xcb)]=Scene_Equip[_0x5b2ecf(0x138)]['onActorChange'],Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x423)]=function(){const _0x16f930=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x16f930(0xcb)][_0x16f930(0x4b6)](this),this[_0x16f930(0x24d)]()&&(this['_commandWindow'][_0x16f930(0x24f)](),this[_0x16f930(0x4a8)][_0x16f930(0x436)](),this[_0x16f930(0x22c)][_0x16f930(0x4fd)](0x0),this[_0x16f930(0x22c)]['activate']());},Scene_Equip['prototype'][_0x5b2ecf(0x4c0)]=function(){const _0x3fea81=_0x5b2ecf;if(!this[_0x3fea81(0x22c)])return![];if(!this[_0x3fea81(0x22c)][_0x3fea81(0x41d)])return![];return this[_0x3fea81(0x22c)][_0x3fea81(0x2b4)]();},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x358)]=function(){const _0x33532d=_0x5b2ecf;if(this['buttonAssistSlotWindowShift']())return TextManager[_0x33532d(0x4d6)]('shift');return Scene_MenuBase[_0x33532d(0x138)][_0x33532d(0x358)][_0x33532d(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0xcd)]=function(){const _0x5b37c4=_0x5b2ecf;if(this[_0x5b37c4(0x4c0)]())return VisuMZ[_0x5b37c4(0x11a)][_0x5b37c4(0x151)][_0x5b37c4(0x276)][_0x5b37c4(0x2a8)];return Scene_MenuBase[_0x5b37c4(0x138)][_0x5b37c4(0xcd)][_0x5b37c4(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)]['buttonAssistOffset3']=function(){const _0x492382=_0x5b2ecf;if(this[_0x492382(0x4c0)]())return this[_0x492382(0x2a9)]['width']/0x5/-0x3;return Scene_MenuBase[_0x492382(0x138)]['buttonAssistOffset3'][_0x492382(0x4b6)](this);},Scene_Equip[_0x5b2ecf(0x138)][_0x5b2ecf(0x12d)]=function(){const _0x198b52=_0x5b2ecf;SceneManager[_0x198b52(0x1ec)]();},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Load_reloadMapIfUpdated']=Scene_Load[_0x5b2ecf(0x138)][_0x5b2ecf(0x1e9)],Scene_Load['prototype'][_0x5b2ecf(0x1e9)]=function(){const _0x68aeb9=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x68aeb9(0x2c5)][_0x68aeb9(0x4b6)](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load[_0x5b2ecf(0x138)][_0x5b2ecf(0x333)]=function(){const _0x12fc62=_0x5b2ecf;if($gameSystem[_0x12fc62(0x33c)]()!==$dataSystem[_0x12fc62(0x33c)])for(const _0x169d57 of $gameActors[_0x12fc62(0x34a)]){if(_0x169d57)_0x169d57['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x240)]=function(){const _0x467584=_0x5b2ecf;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x467584(0x2cf)];else{if(this[_0x467584(0x487)]())return this['updatedLayoutStyle']()[_0x467584(0x3f2)](/LOWER/i);else Scene_MenuBase[_0x467584(0x138)][_0x467584(0x351)][_0x467584(0x4b6)](this);}},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x351)]=function(){const _0x2daa85=_0x5b2ecf;if(ConfigManager[_0x2daa85(0x320)]&&ConfigManager[_0x2daa85(0x3f5)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x2daa85(0x155)]()[_0x2daa85(0x3f2)](/RIGHT/i);else Scene_MenuBase[_0x2daa85(0x138)][_0x2daa85(0x351)]['call'](this);}},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x155)]=function(){const _0x571329=_0x5b2ecf;return VisuMZ[_0x571329(0x11a)][_0x571329(0x151)][_0x571329(0x4a3)][_0x571329(0x344)];},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x24d)]=function(){const _0x4085b2=_0x5b2ecf;return this['_categoryWindow']&&this[_0x4085b2(0x218)][_0x4085b2(0x24d)]();},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x487)]=function(){const _0x152cd0=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x152cd0(0x151)][_0x152cd0(0x4a3)][_0x152cd0(0x28b)];},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x23a)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x407)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x407)]=function(_0x1ee017,_0x5e088d){const _0x598fc3=_0x5b2ecf;_0x1ee017=VisuMZ[_0x598fc3(0x11a)][_0x598fc3(0x31f)](_0x1ee017),VisuMZ[_0x598fc3(0x11a)][_0x598fc3(0x23a)][_0x598fc3(0x4b6)](this,_0x1ee017,_0x5e088d),this[_0x598fc3(0x167)]();},Scene_Shop['prototype']['adjustHiddenShownGoods']=function(){const _0x3bea2a=_0x5b2ecf;this[_0x3bea2a(0xf4)]=0x0;const _0x532d16=[];for(const _0x446117 of this['_goods']){this[_0x3bea2a(0x296)](_0x446117)?this[_0x3bea2a(0xf4)]++:_0x532d16['push'](_0x446117);}for(const _0x284499 of _0x532d16){this['_goods'][_0x3bea2a(0x44d)](_0x284499);}},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x296)]=function(_0x4dd77a){if(_0x4dd77a[0x0]>0x2||_0x4dd77a[0x0]<0x0)return![];const _0x239b36=[$dataItems,$dataWeapons,$dataArmors][_0x4dd77a[0x0]][_0x4dd77a[0x1]];if(!_0x239b36)return![];return!![];},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3e1)]=Scene_Shop[_0x5b2ecf(0x138)]['create'],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x198)]=function(){const _0xa069f6=_0x5b2ecf;VisuMZ[_0xa069f6(0x11a)]['Scene_Shop_create'][_0xa069f6(0x4b6)](this),this[_0xa069f6(0x487)]()&&this[_0xa069f6(0x2ac)](),this[_0xa069f6(0x47f)]();},Scene_Shop[_0x5b2ecf(0x138)]['postCreateItemsEquipsCore']=function(){const _0x25595b=_0x5b2ecf;this['_dummyWindow'][_0x25595b(0x2e1)](),this[_0x25595b(0x3af)][_0x25595b(0x137)](),this[_0x25595b(0x3af)]['deselect'](),this['_statusWindow'][_0x25595b(0x137)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x1e0)]=Scene_Shop['prototype'][_0x5b2ecf(0xc4)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xc4)]=function(){const _0x95f733=_0x5b2ecf;return this[_0x95f733(0x487)]()?this[_0x95f733(0x314)]():VisuMZ[_0x95f733(0x11a)]['Scene_Shop_helpWindowRect'][_0x95f733(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x314)]=function(){const _0x17e112=_0x5b2ecf,_0x5cdd33=0x0,_0x12efe8=this[_0x17e112(0x3f0)](),_0x14c2b4=Graphics[_0x17e112(0x1b5)],_0x2fef1b=this[_0x17e112(0x346)]();return new Rectangle(_0x5cdd33,_0x12efe8,_0x14c2b4,_0x2fef1b);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x45c)]=Scene_Shop['prototype']['goldWindowRect'],Scene_Shop[_0x5b2ecf(0x138)]['goldWindowRect']=function(){const _0x2c2038=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2c2038(0x189)]():VisuMZ[_0x2c2038(0x11a)][_0x2c2038(0x45c)][_0x2c2038(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x189)]=function(){const _0x3a6299=_0x5b2ecf,_0xbe9ce4=this[_0x3a6299(0x2dc)](),_0x4efbdf=this[_0x3a6299(0x48c)](0x1,!![]),_0x36a9ca=this[_0x3a6299(0x351)]()?0x0:Graphics[_0x3a6299(0x1b5)]-_0xbe9ce4,_0x20ba44=this['mainAreaTop']();return new Rectangle(_0x36a9ca,_0x20ba44,_0xbe9ce4,_0x4efbdf);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x23d)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1af)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1af)]=function(){const _0x38f86c=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x38f86c(0xe7)]():VisuMZ[_0x38f86c(0x11a)]['Scene_Shop_commandWindowRect'][_0x38f86c(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xe7)]=function(){const _0x590ce1=_0x5b2ecf,_0x1a628f=this[_0x590ce1(0x351)]()?this[_0x590ce1(0x2dc)]():0x0,_0x4b9fa5=this[_0x590ce1(0x43a)](),_0x3978f7=Graphics['boxWidth']-this['mainCommandWidth'](),_0x30070b=this[_0x590ce1(0x48c)](0x1,!![]);return new Rectangle(_0x1a628f,_0x4b9fa5,_0x3978f7,_0x30070b);},VisuMZ['ItemsEquipsCore']['Scene_Shop_numberWindowRect']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x443)],Scene_Shop['prototype'][_0x5b2ecf(0x443)]=function(){const _0x5cf2a3=_0x5b2ecf;return this[_0x5cf2a3(0x487)]()?this['numberWindowRectItemsEquipsCore']():VisuMZ[_0x5cf2a3(0x11a)][_0x5cf2a3(0x244)][_0x5cf2a3(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1b6)]=function(){const _0x34b1fb=_0x5b2ecf,_0x851c22=this[_0x34b1fb(0x4a8)]['y']+this[_0x34b1fb(0x4a8)]['height'],_0x1a7b5a=Graphics[_0x34b1fb(0x1b5)]-this['statusWidth'](),_0x40d470=this[_0x34b1fb(0x351)]()?Graphics[_0x34b1fb(0x1b5)]-_0x1a7b5a:0x0,_0x328e80=this[_0x34b1fb(0x169)]()-this['_commandWindow'][_0x34b1fb(0x42c)];return new Rectangle(_0x40d470,_0x851c22,_0x1a7b5a,_0x328e80);},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_statusWindowRect']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x465)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x465)]=function(){const _0x500e86=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['statusWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x500e86(0x1a4)][_0x500e86(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x2e9)]=function(){const _0x116d0d=_0x5b2ecf,_0x228b60=this['statusWidth'](),_0x74b003=this[_0x116d0d(0x169)]()-this[_0x116d0d(0x4a8)][_0x116d0d(0x42c)],_0x4c0a68=this[_0x116d0d(0x351)]()?0x0:Graphics['boxWidth']-_0x228b60,_0x31ccce=this[_0x116d0d(0x4a8)]['y']+this['_commandWindow']['height'];return new Rectangle(_0x4c0a68,_0x31ccce,_0x228b60,_0x74b003);},VisuMZ['ItemsEquipsCore']['Scene_Shop_buyWindowRect']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x2f8)],Scene_Shop['prototype']['buyWindowRect']=function(){const _0x3c1023=_0x5b2ecf;return this[_0x3c1023(0x487)]()?this['buyWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x3c1023(0x3e5)]['call'](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x190)]=function(){const _0x262c0f=_0x5b2ecf,_0x13952b=this[_0x262c0f(0x4a8)]['y']+this['_commandWindow'][_0x262c0f(0x42c)],_0x3dcec9=Graphics[_0x262c0f(0x1b5)]-this[_0x262c0f(0x229)](),_0x364db9=this[_0x262c0f(0x169)]()-this[_0x262c0f(0x4a8)]['height'],_0x351bcc=this[_0x262c0f(0x351)]()?Graphics[_0x262c0f(0x1b5)]-_0x3dcec9:0x0;return new Rectangle(_0x351bcc,_0x13952b,_0x3dcec9,_0x364db9);},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_createCategoryWindow']=Scene_Shop['prototype'][_0x5b2ecf(0x26d)],Scene_Shop['prototype'][_0x5b2ecf(0x26d)]=function(){const _0x87ef64=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x87ef64(0x23f)][_0x87ef64(0x4b6)](this),this[_0x87ef64(0x24d)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_categoryWindowRect']=Scene_Shop['prototype'][_0x5b2ecf(0x191)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x191)]=function(){const _0x56e396=_0x5b2ecf;return this[_0x56e396(0x487)]()?this[_0x56e396(0x1ca)]():VisuMZ[_0x56e396(0x11a)][_0x56e396(0x163)][_0x56e396(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1ca)]=function(){const _0x5ed15a=_0x5b2ecf,_0x2b6274=this[_0x5ed15a(0x4a8)]['y'],_0x50a36e=this[_0x5ed15a(0x4a8)]['width'],_0x16a4a5=this['calcWindowHeight'](0x1,!![]),_0x1ac25e=this[_0x5ed15a(0x351)]()?Graphics['boxWidth']-_0x50a36e:0x0;return new Rectangle(_0x1ac25e,_0x2b6274,_0x50a36e,_0x16a4a5);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xfe)]=function(){const _0x247089=_0x5b2ecf;delete this[_0x247089(0x218)][_0x247089(0x177)]['ok'],delete this[_0x247089(0x218)][_0x247089(0x177)][_0x247089(0x3cd)];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x451)]=Scene_Shop[_0x5b2ecf(0x138)]['createSellWindow'],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x33f)]=function(){const _0x58edc5=_0x5b2ecf;VisuMZ[_0x58edc5(0x11a)][_0x58edc5(0x451)]['call'](this),this[_0x58edc5(0x487)]()&&this['postCreateSellWindowItemsEquipsCore']();},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_sellWindowRect']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1d7)],Scene_Shop[_0x5b2ecf(0x138)]['sellWindowRect']=function(){const _0x2b74f1=_0x5b2ecf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['sellWindowRectItemsEquipsCore']():VisuMZ[_0x2b74f1(0x11a)][_0x2b74f1(0x1c1)][_0x2b74f1(0x4b6)](this);},Scene_Shop['prototype'][_0x5b2ecf(0x4de)]=function(){const _0x1996ab=_0x5b2ecf,_0x56cefd=this['_categoryWindow']['y']+this[_0x1996ab(0x218)][_0x1996ab(0x42c)],_0x9970a8=Graphics['boxWidth']-this[_0x1996ab(0x229)](),_0x16a922=this[_0x1996ab(0x169)]()-this['_categoryWindow']['height'],_0x2d6f72=this[_0x1996ab(0x351)]()?Graphics[_0x1996ab(0x1b5)]-_0x9970a8:0x0;return new Rectangle(_0x2d6f72,_0x56cefd,_0x9970a8,_0x16a922);},Scene_Shop['prototype']['postCreateSellWindowItemsEquipsCore']=function(){const _0x4e320f=_0x5b2ecf;this[_0x4e320f(0x353)][_0x4e320f(0x398)](this[_0x4e320f(0x13c)]);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x229)]=function(){const _0x592676=_0x5b2ecf;return VisuMZ[_0x592676(0x11a)][_0x592676(0x151)][_0x592676(0x35d)][_0x592676(0x4a9)];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x1e8)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1cc)],Scene_Shop['prototype']['activateSellWindow']=function(){const _0x114bf2=_0x5b2ecf;VisuMZ['ItemsEquipsCore']['Scene_Shop_activateSellWindow']['call'](this),this[_0x114bf2(0x487)]()&&this[_0x114bf2(0x13c)][_0x114bf2(0x137)](),this[_0x114bf2(0x353)][_0x114bf2(0x39c)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x10e)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x387)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x387)]=function(){const _0x41b99e=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x41b99e(0x10e)]['call'](this),this[_0x41b99e(0x487)]()&&this['commandBuyItemsEquipsCore']();},Scene_Shop[_0x5b2ecf(0x138)]['commandBuyItemsEquipsCore']=function(){const _0x19fa8f=_0x5b2ecf;this['_buyWindowLastIndex']=this[_0x19fa8f(0x306)]||0x0,this[_0x19fa8f(0x3af)][_0x19fa8f(0x4fd)](this[_0x19fa8f(0x306)]);},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_commandSell']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x2ee)],Scene_Shop[_0x5b2ecf(0x138)]['commandSell']=function(){const _0x6834ff=_0x5b2ecf;VisuMZ[_0x6834ff(0x11a)][_0x6834ff(0x145)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['commandSellItemsEquipsCore'](),this[_0x6834ff(0x24d)]()&&(this[_0x6834ff(0x218)]['smoothSelect'](0x0),this[_0x6834ff(0x3ea)]());},Scene_Shop[_0x5b2ecf(0x138)]['commandSellItemsEquipsCore']=function(){const _0x960036=_0x5b2ecf;this[_0x960036(0x3af)][_0x960036(0x2e1)](),this[_0x960036(0x4a8)][_0x960036(0x2e1)]();},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x1f4)]=Scene_Shop[_0x5b2ecf(0x138)]['onBuyCancel'],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x1db)]=function(){const _0xa0813f=_0x5b2ecf;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel'][_0xa0813f(0x4b6)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0xa0813f(0x28a)]();},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x28a)]=function(){const _0x27e4d7=_0x5b2ecf;this[_0x27e4d7(0x306)]=this[_0x27e4d7(0x3af)][_0x27e4d7(0x4f1)](),this[_0x27e4d7(0x3af)][_0x27e4d7(0x137)](),this['_buyWindow']['deselect'](),this[_0x27e4d7(0x3af)]['smoothScrollTo'](0x0,0x0),this[_0x27e4d7(0x13c)][_0x27e4d7(0x137)](),this['_dummyWindow'][_0x27e4d7(0x2e1)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3cf)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xee)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xee)]=function(){const _0x586058=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x586058(0x3cf)]['call'](this),this[_0x586058(0x487)]()&&this[_0x586058(0x4dd)]();},Scene_Shop['prototype'][_0x5b2ecf(0x4dd)]=function(){const _0x7e40cf=_0x5b2ecf;this[_0x7e40cf(0x3af)][_0x7e40cf(0x137)](),this[_0x7e40cf(0x4a8)][_0x7e40cf(0x137)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x119)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x21b)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x21b)]=function(){const _0xce2185=_0x5b2ecf;$gameTemp[_0xce2185(0x105)]=!![],VisuMZ[_0xce2185(0x11a)]['Scene_Shop_onBuyOk'][_0xce2185(0x4b6)](this),$gameTemp[_0xce2185(0x105)]=![],this['_item']=this[_0xce2185(0x3af)][_0xce2185(0x334)]();},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x377)]=Scene_Shop[_0x5b2ecf(0x138)]['buyingPrice'],Scene_Shop[_0x5b2ecf(0x138)]['buyingPrice']=function(){const _0x66698f=_0x5b2ecf;$gameTemp[_0x66698f(0x105)]=!![],this['_item']=this[_0x66698f(0x3af)][_0x66698f(0x334)]();const _0x1879c6=VisuMZ[_0x66698f(0x11a)][_0x66698f(0x377)][_0x66698f(0x4b6)](this);return $gameTemp['_bypassProxy']=![],this[_0x66698f(0x23b)]=this['_buyWindow'][_0x66698f(0x334)](),_0x1879c6;},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_onSellOk']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x379)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x379)]=function(){const _0x1dca1b=_0x5b2ecf;VisuMZ[_0x1dca1b(0x11a)][_0x1dca1b(0x16f)][_0x1dca1b(0x4b6)](this),this[_0x1dca1b(0x487)]()&&this[_0x1dca1b(0x300)]();},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x300)]=function(){const _0x10324d=_0x5b2ecf;this[_0x10324d(0x218)]['show']();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x291)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x46d)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x46d)]=function(){const _0x4d5324=_0x5b2ecf;VisuMZ[_0x4d5324(0x11a)][_0x4d5324(0x291)][_0x4d5324(0x4b6)](this),this[_0x4d5324(0x24d)]()&&this[_0x4d5324(0xee)](),this[_0x4d5324(0x487)]()&&this[_0x4d5324(0x1ef)][_0x4d5324(0x2e1)]();},Scene_Shop['prototype']['sellPriceOfItem']=function(_0x2856de){const _0x333487=_0x5b2ecf,_0x57ec23=this[_0x333487(0x23b)];this[_0x333487(0x23b)]=_0x2856de;const _0x206c8=this[_0x333487(0xe6)]();return this[_0x333487(0x23b)]=_0x57ec23,_0x206c8;},VisuMZ[_0x5b2ecf(0x11a)]['Scene_Shop_sellingPrice']=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xe6)],Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0xe6)]=function(){const _0x15fb1e=_0x5b2ecf;let _0x343859=this[_0x15fb1e(0x4ca)]();const _0x5678cd=this['_item'];return _0x343859=VisuMZ[_0x15fb1e(0x11a)][_0x15fb1e(0x151)][_0x15fb1e(0x4a3)]['SellPriceJS'][_0x15fb1e(0x4b6)](this,_0x5678cd,_0x343859),_0x343859;},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x4ca)]=function(){const _0x463ab9=_0x5b2ecf;let _0x16d2e1=this['_item'][_0x463ab9(0x3fd)];if(!this['_item'])return 0x0;else{if(this[_0x463ab9(0x23b)][_0x463ab9(0x106)][_0x463ab9(0x3f2)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x3847dd=String(RegExp['$1']);window['item']=this[_0x463ab9(0x23b)],window[_0x463ab9(0x3fd)]=_0x16d2e1*this[_0x463ab9(0x49a)]();try{eval(_0x3847dd);}catch(_0x4c162f){if($gameTemp['isPlaytest']())console[_0x463ab9(0x265)](_0x4c162f);}let _0x5edd6b=window['price'];window[_0x463ab9(0x334)]=undefined,window[_0x463ab9(0x3fd)]=undefined;if(isNaN(_0x5edd6b))_0x5edd6b=0x0;return Math[_0x463ab9(0x18c)](_0x5edd6b);}else return this[_0x463ab9(0x23b)]['note']['match'](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x463ab9(0x18c)](this[_0x463ab9(0x345)]());}},Scene_Shop['prototype'][_0x5b2ecf(0x345)]=function(){const _0x37a659=_0x5b2ecf;return this['_item']['price']*this[_0x37a659(0x49a)]();},Scene_Shop['prototype'][_0x5b2ecf(0x49a)]=function(){const _0xef750a=_0x5b2ecf;return VisuMZ[_0xef750a(0x11a)][_0xef750a(0x151)][_0xef750a(0x4a3)]['SellPriceRate'];},Scene_Shop[_0x5b2ecf(0x138)]['buttonAssistItemListRequirement']=function(){const _0x2d74f4=_0x5b2ecf;if(!this[_0x2d74f4(0x155)]())return![];if(!this[_0x2d74f4(0x24d)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x2d74f4(0x353)][_0x2d74f4(0x41d)])return![];return this[_0x2d74f4(0x155)]()&&this[_0x2d74f4(0x24d)]();},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x14a)]=function(){const _0x4c89fd=_0x5b2ecf;if(this[_0x4c89fd(0x1fd)]())return this[_0x4c89fd(0x353)]['maxCols']()===0x1?TextManager[_0x4c89fd(0x186)]('left','right'):TextManager[_0x4c89fd(0x186)]('pageup',_0x4c89fd(0x1eb));else{if(this[_0x4c89fd(0x10c)]&&this[_0x4c89fd(0x10c)][_0x4c89fd(0x41d)])return TextManager[_0x4c89fd(0x186)](_0x4c89fd(0x3da),_0x4c89fd(0x3ac));}return Scene_MenuBase['prototype'][_0x4c89fd(0x14a)][_0x4c89fd(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x439)]=function(){const _0x4954a3=_0x5b2ecf;if(this[_0x4954a3(0x10c)]&&this[_0x4954a3(0x10c)]['active'])return TextManager[_0x4954a3(0x186)]('up','down');return Scene_MenuBase[_0x4954a3(0x138)]['buttonAssistKey2'][_0x4954a3(0x4b6)](this);},Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x32c)]=function(){const _0x3d9447=_0x5b2ecf;if(this[_0x3d9447(0x1fd)]())return VisuMZ['ItemsEquipsCore'][_0x3d9447(0x151)][_0x3d9447(0x369)][_0x3d9447(0x397)];else{if(this[_0x3d9447(0x10c)]&&this[_0x3d9447(0x10c)][_0x3d9447(0x41d)])return VisuMZ[_0x3d9447(0x11a)][_0x3d9447(0x151)]['ShopScene'][_0x3d9447(0x2b3)];}return Scene_MenuBase[_0x3d9447(0x138)][_0x3d9447(0x32c)][_0x3d9447(0x4b6)](this);},Scene_Shop['prototype'][_0x5b2ecf(0x20c)]=function(){const _0x1b5c6f=_0x5b2ecf;if(this[_0x1b5c6f(0x10c)]&&this[_0x1b5c6f(0x10c)][_0x1b5c6f(0x41d)])return VisuMZ['ItemsEquipsCore']['Settings'][_0x1b5c6f(0x4a3)][_0x1b5c6f(0x213)];return Scene_MenuBase[_0x1b5c6f(0x138)][_0x1b5c6f(0x20c)]['call'](this);},Scene_Shop[_0x5b2ecf(0x138)]['resetShopSwitches']=function(){const _0x2c56ef=_0x5b2ecf;if(!SceneManager[_0x2c56ef(0x2ca)]())return;const _0x27ca2d=VisuMZ[_0x2c56ef(0x11a)][_0x2c56ef(0x151)][_0x2c56ef(0x4a3)];_0x27ca2d[_0x2c56ef(0x2aa)]&&$gameSwitches[_0x2c56ef(0xeb)](_0x27ca2d[_0x2c56ef(0x2aa)],![]),_0x27ca2d[_0x2c56ef(0x388)]&&$gameSwitches[_0x2c56ef(0xeb)](_0x27ca2d[_0x2c56ef(0x388)],![]);},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x297)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x2c6)],Scene_Shop['prototype']['doBuy']=function(_0x588a12){const _0x46ea0a=_0x5b2ecf;VisuMZ[_0x46ea0a(0x11a)]['Scene_Shop_doBuy'][_0x46ea0a(0x4b6)](this,_0x588a12),this['onBuyItem'](this['_item'],_0x588a12);if(_0x588a12<=0x0)return;const _0x45c1d4=VisuMZ[_0x46ea0a(0x11a)]['Settings'][_0x46ea0a(0x4a3)];_0x45c1d4[_0x46ea0a(0x2aa)]&&$gameSwitches[_0x46ea0a(0xeb)](_0x45c1d4[_0x46ea0a(0x2aa)],!![]),this[_0x46ea0a(0x3af)][_0x46ea0a(0x35a)](),this[_0x46ea0a(0x353)][_0x46ea0a(0x35a)]();},Scene_Shop[_0x5b2ecf(0x138)]['onBuyItem']=function(_0x581aaf,_0x1acbed){const _0x17d72d=_0x5b2ecf;this[_0x17d72d(0x483)](_0x581aaf,_0x1acbed),$gameParty[_0x17d72d(0x506)](_0x581aaf,_0x1acbed),$gameParty['addShopTrackingGoldBuy'](_0x1acbed*this[_0x17d72d(0x30b)]());},Scene_Shop[_0x5b2ecf(0x138)]['processShopCondListingOnBuyItem']=function(_0x6ebb74,_0x3f1427){const _0x278206=_0x5b2ecf;if(!_0x6ebb74)return;if(!_0x3f1427)return;const _0x1abb90=VisuMZ[_0x278206(0x11a)][_0x278206(0x2fd)],_0x399643=_0x6ebb74[_0x278206(0x106)]||'';if(_0x399643[_0x278206(0x3f2)](_0x1abb90['BuyTurnSwitchOn'])){const _0x4c34f3=String(RegExp['$1'])[_0x278206(0x406)](',')[_0x278206(0x4ec)](_0x56d803=>Number(_0x56d803));for(const _0x22f3d8 of _0x4c34f3){$gameSwitches[_0x278206(0xeb)](_0x22f3d8,!![]);}}if(_0x399643[_0x278206(0x3f2)](_0x1abb90[_0x278206(0x327)])){const _0x6c5a13=String(RegExp['$1'])[_0x278206(0x406)](',')[_0x278206(0x4ec)](_0x5cdf2e=>Number(_0x5cdf2e));for(const _0x4bbd2f of _0x6c5a13){$gameSwitches[_0x278206(0xeb)](_0x4bbd2f,![]);}}},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x393)]=Scene_Shop[_0x5b2ecf(0x138)][_0x5b2ecf(0x2fc)],Scene_Shop['prototype'][_0x5b2ecf(0x2fc)]=function(_0x5c0673){const _0x3bfb12=_0x5b2ecf;VisuMZ[_0x3bfb12(0x11a)]['Scene_Shop_doSell'][_0x3bfb12(0x4b6)](this,_0x5c0673),this[_0x3bfb12(0x1d4)](this[_0x3bfb12(0x23b)],_0x5c0673);if(_0x5c0673<=0x0)return;const _0x1bd213=VisuMZ[_0x3bfb12(0x11a)]['Settings'][_0x3bfb12(0x4a3)];_0x1bd213[_0x3bfb12(0x2aa)]&&$gameSwitches[_0x3bfb12(0xeb)](_0x1bd213['SwitchSell'],!![]),this[_0x3bfb12(0x3af)]['refresh'](),this['_sellWindow'][_0x3bfb12(0x35a)]();},Scene_Shop[_0x5b2ecf(0x138)]['onSellItem']=function(_0x272252,_0x2c0ea5){const _0x2819a5=_0x5b2ecf;this[_0x2819a5(0x24c)](_0x272252,_0x2c0ea5),$gameParty[_0x2819a5(0x1bb)](_0x272252,_0x2c0ea5),$gameParty[_0x2819a5(0x19a)](_0x2c0ea5*this[_0x2819a5(0xe6)]());},Scene_Shop[_0x5b2ecf(0x138)]['processShopCondListingOnSellItem']=function(_0x2798d5,_0x28e610){const _0x1b82a3=_0x5b2ecf;if(!_0x2798d5)return;if(!_0x28e610)return;const _0x3b51b9=VisuMZ[_0x1b82a3(0x11a)][_0x1b82a3(0x2fd)],_0x3c84ee=_0x2798d5[_0x1b82a3(0x106)]||'';if(_0x3c84ee[_0x1b82a3(0x3f2)](_0x3b51b9['SellTurnSwitchOn'])){const _0x2d5470=String(RegExp['$1'])[_0x1b82a3(0x406)](',')['map'](_0x26532c=>Number(_0x26532c));for(const _0x26c90e of _0x2d5470){$gameSwitches[_0x1b82a3(0xeb)](_0x26c90e,!![]);}}if(_0x3c84ee[_0x1b82a3(0x3f2)](_0x3b51b9[_0x1b82a3(0x150)])){const _0x55178f=String(RegExp['$1'])[_0x1b82a3(0x406)](',')[_0x1b82a3(0x4ec)](_0x2b134a=>Number(_0x2b134a));for(const _0x47ee0f of _0x55178f){$gameSwitches[_0x1b82a3(0xeb)](_0x47ee0f,![]);}}};function _0x2b45(_0x3e5dd0,_0x583698){const _0x93d374=_0x93d3();return _0x2b45=function(_0x2b4539,_0x3a6884){_0x2b4539=_0x2b4539-0xc1;let _0x2d794f=_0x93d374[_0x2b4539];return _0x2d794f;},_0x2b45(_0x3e5dd0,_0x583698);}function Sprite_NewLabel(){const _0x2dff8a=_0x5b2ecf;this[_0x2dff8a(0x170)](...arguments);}Sprite_NewLabel['prototype']=Object[_0x5b2ecf(0x198)](Sprite[_0x5b2ecf(0x138)]),Sprite_NewLabel['prototype'][_0x5b2ecf(0x160)]=Sprite_NewLabel,Sprite_NewLabel['prototype'][_0x5b2ecf(0x170)]=function(){const _0x5ad13e=_0x5b2ecf;Sprite['prototype'][_0x5ad13e(0x170)][_0x5ad13e(0x4b6)](this),this[_0x5ad13e(0x2b9)]();},Sprite_NewLabel['prototype'][_0x5b2ecf(0x2b9)]=function(){const _0x55bb15=_0x5b2ecf,_0x4cff94=ImageManager['iconWidth'],_0xe84963=ImageManager[_0x55bb15(0xf2)];this['bitmap']=new Bitmap(_0x4cff94,_0xe84963),this[_0x55bb15(0x44b)](),this[_0x55bb15(0x230)]();},Sprite_NewLabel[_0x5b2ecf(0x138)][_0x5b2ecf(0x44b)]=function(){const _0x30d68e=_0x5b2ecf,_0x2b3b1d=VisuMZ['ItemsEquipsCore'][_0x30d68e(0x151)][_0x30d68e(0x1e2)][_0x30d68e(0x10b)];if(_0x2b3b1d<=0x0)return;const _0xd90a3d=ImageManager[_0x30d68e(0x4d9)](_0x30d68e(0xdf)),_0x343471=ImageManager[_0x30d68e(0x1e1)],_0x1b6ca8=ImageManager['iconHeight'],_0x26e13f=_0x2b3b1d%0x10*_0x343471,_0x581a3f=Math[_0x30d68e(0x18c)](_0x2b3b1d/0x10)*_0x1b6ca8;this[_0x30d68e(0x3a4)][_0x30d68e(0x36c)](_0xd90a3d,_0x26e13f,_0x581a3f,_0x343471,_0x1b6ca8,0x0,0x0);},Sprite_NewLabel[_0x5b2ecf(0x138)][_0x5b2ecf(0x230)]=function(){const _0xc75e78=_0x5b2ecf,_0xc25964=VisuMZ[_0xc75e78(0x11a)][_0xc75e78(0x151)][_0xc75e78(0x1e2)],_0x389616=_0xc25964[_0xc75e78(0x25b)];if(_0x389616==='')return;const _0x3671f1=ImageManager['iconWidth'],_0x2624d1=ImageManager['iconHeight'];this[_0xc75e78(0x3a4)][_0xc75e78(0x372)]=_0xc25964[_0xc75e78(0x273)]||$gameSystem[_0xc75e78(0x391)](),this[_0xc75e78(0x3a4)][_0xc75e78(0x130)]=this['getTextColor'](),this[_0xc75e78(0x3a4)]['fontSize']=_0xc25964[_0xc75e78(0x2f3)],this['bitmap'][_0xc75e78(0x102)](_0x389616,0x0,_0x2624d1/0x2,_0x3671f1,_0x2624d1/0x2,_0xc75e78(0x1dc));},Sprite_NewLabel['prototype'][_0x5b2ecf(0x29c)]=function(){const _0x3767d8=_0x5b2ecf,_0x472125=VisuMZ[_0x3767d8(0x11a)][_0x3767d8(0x151)][_0x3767d8(0x1e2)][_0x3767d8(0x330)];return _0x472125[_0x3767d8(0x3f2)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x472125);},Window_Base[_0x5b2ecf(0x138)][_0x5b2ecf(0x21a)]=function(_0x344e45,_0x1d3341,_0x4ebd08,_0x424f54){const _0x2d1ac9=_0x5b2ecf;if(_0x344e45){const _0x2f6e18=_0x4ebd08+(this['lineHeight']()-ImageManager[_0x2d1ac9(0xf2)])/0x2,_0x3ab633=ImageManager[_0x2d1ac9(0x1e1)]+0x4,_0x33753f=Math[_0x2d1ac9(0x3c2)](0x0,_0x424f54-_0x3ab633);this[_0x2d1ac9(0x4bc)](ColorManager[_0x2d1ac9(0x30e)](_0x344e45)),this['drawIcon'](_0x344e45[_0x2d1ac9(0x46a)],_0x1d3341,_0x2f6e18),this[_0x2d1ac9(0x102)](_0x344e45[_0x2d1ac9(0x4df)],_0x1d3341+_0x3ab633,_0x4ebd08,_0x33753f),this[_0x2d1ac9(0x140)]();}},Window_Base['prototype'][_0x5b2ecf(0x3c3)]=function(_0x13bc8a,_0x459928,_0x521b01,_0x127f72){const _0x56579a=_0x5b2ecf;if(this['isDrawItemNumber'](_0x13bc8a)){this[_0x56579a(0x113)]();const _0x199479=VisuMZ[_0x56579a(0x11a)][_0x56579a(0x151)][_0x56579a(0x369)],_0xcd3300=_0x199479[_0x56579a(0x134)],_0x305185=_0xcd3300[_0x56579a(0x350)]($gameParty[_0x56579a(0x128)](_0x13bc8a));this[_0x56579a(0x146)][_0x56579a(0x31b)]=_0x199479['ItemQuantityFontSize'],this[_0x56579a(0x102)](_0x305185,_0x459928,_0x521b01,_0x127f72,_0x56579a(0x3ac)),this[_0x56579a(0x113)]();}},Window_Base[_0x5b2ecf(0x138)][_0x5b2ecf(0x496)]=function(_0x41cc27){const _0xc635c2=_0x5b2ecf;if(DataManager[_0xc635c2(0x4be)](_0x41cc27))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0x5b2ecf(0x138)][_0x5b2ecf(0x236)]=function(_0x373e02,_0x11e547,_0x6c95e3,_0x38458a,_0x240327){const _0x3984b7=_0x5b2ecf;_0x240327=Math['max'](_0x240327||0x1,0x1);while(_0x240327--){_0x38458a=_0x38458a||this[_0x3984b7(0x452)](),this[_0x3984b7(0x153)][_0x3984b7(0x21c)]=0xa0;const _0x4ef2d2=ColorManager[_0x3984b7(0x4b8)]();this['contentsBack'][_0x3984b7(0x442)](_0x373e02+0x1,_0x11e547+0x1,_0x6c95e3-0x2,_0x38458a-0x2,_0x4ef2d2),this['contentsBack'][_0x3984b7(0x21c)]=0xff;}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x3b3)]=Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)],Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)]=function(_0x5bc957){const _0x5523fe=_0x5b2ecf;this['initNewLabelSprites'](),VisuMZ[_0x5523fe(0x11a)]['Window_Selectable_initialize'][_0x5523fe(0x4b6)](this,_0x5bc957);},Window_Selectable[_0x5b2ecf(0x138)]['initNewLabelSprites']=function(){const _0x739d40=_0x5b2ecf;this[_0x739d40(0x2c4)]={},this['_newLabelOpacity']=0xff,this[_0x739d40(0xfd)]=VisuMZ['ItemsEquipsCore'][_0x739d40(0x151)][_0x739d40(0x1e2)][_0x739d40(0x2b5)],this[_0x739d40(0x3de)]=VisuMZ[_0x739d40(0x11a)][_0x739d40(0x151)][_0x739d40(0x1e2)][_0x739d40(0x1c2)];},Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x17e)]=function(){return![];},VisuMZ[_0x5b2ecf(0x11a)]['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x5b2ecf(0x138)]['setHelpWindowItem'],Window_Selectable[_0x5b2ecf(0x138)]['setHelpWindowItem']=function(_0x19537c){const _0x5b3b69=_0x5b2ecf;VisuMZ[_0x5b3b69(0x11a)][_0x5b3b69(0x2e2)][_0x5b3b69(0x4b6)](this,_0x19537c);if(this['isShowNew']())this['clearNewLabelFromItem'](_0x19537c);},Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x14c)]=function(_0xdf06fd){const _0x3b937f=_0x5b2ecf;if(!_0xdf06fd)return;$gameParty[_0x3b937f(0x477)](_0xdf06fd);let _0x284eb9='';if(DataManager['isItem'](_0xdf06fd))_0x284eb9=_0x3b937f(0x485)[_0x3b937f(0x350)](_0xdf06fd['id']);else{if(DataManager[_0x3b937f(0xdc)](_0xdf06fd))_0x284eb9=_0x3b937f(0x33d)[_0x3b937f(0x350)](_0xdf06fd['id']);else{if(DataManager[_0x3b937f(0x4dc)](_0xdf06fd))_0x284eb9=_0x3b937f(0x34d)[_0x3b937f(0x350)](_0xdf06fd['id']);else return;}}const _0x4489a3=this[_0x3b937f(0x2c4)][_0x284eb9];if(_0x4489a3)_0x4489a3['hide']();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0xcc)]=Window_Selectable['prototype'][_0x5b2ecf(0x35a)],Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x35a)]=function(){const _0x53c01a=_0x5b2ecf;this['hideNewLabelSprites'](),VisuMZ['ItemsEquipsCore']['Window_Selectable_refresh'][_0x53c01a(0x4b6)](this);},Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x1c4)]=function(){const _0x1a5e15=_0x5b2ecf;for(const _0xdbb941 of Object['values'](this[_0x1a5e15(0x2c4)])){_0xdbb941[_0x1a5e15(0x2e1)]();}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x267)]=Window_Selectable['prototype'][_0x5b2ecf(0x421)],Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x421)]=function(){const _0x42632e=_0x5b2ecf;this[_0x42632e(0x405)](),VisuMZ[_0x42632e(0x11a)][_0x42632e(0x267)][_0x42632e(0x4b6)](this);},Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x405)]=function(){const _0x374af9=_0x5b2ecf;if(!this[_0x374af9(0x17e)]())return;const _0x352c2a=this[_0x374af9(0x3de)];this[_0x374af9(0x486)]+=this[_0x374af9(0xfd)];(this[_0x374af9(0x486)]>=_0x352c2a||this[_0x374af9(0x486)]<=0x0)&&(this[_0x374af9(0xfd)]*=-0x1);this[_0x374af9(0x486)]=this[_0x374af9(0x486)][_0x374af9(0x1b1)](0x0,_0x352c2a);for(const _0x555e31 of Object[_0x374af9(0x20e)](this[_0x374af9(0x2c4)])){_0x555e31[_0x374af9(0x364)]=this[_0x374af9(0x486)];}},Window_Selectable[_0x5b2ecf(0x138)][_0x5b2ecf(0x17c)]=function(_0x2a6a75){const _0x82c1f2=_0x5b2ecf,_0x582c08=this['_newLabelSprites'];if(_0x582c08[_0x2a6a75])return _0x582c08[_0x2a6a75];else{const _0x357c7c=new Sprite_NewLabel();return _0x582c08[_0x2a6a75]=_0x357c7c,this[_0x82c1f2(0x309)](_0x357c7c),_0x357c7c;}},Window_Selectable['prototype'][_0x5b2ecf(0x31d)]=function(_0x15c5f5,_0x4e1ac9,_0x38357a){const _0x694ea3=_0x5b2ecf;let _0x5f3450='';if(DataManager[_0x694ea3(0x2d4)](_0x15c5f5))_0x5f3450='item-%1'[_0x694ea3(0x350)](_0x15c5f5['id']);else{if(DataManager[_0x694ea3(0xdc)](_0x15c5f5))_0x5f3450=_0x694ea3(0x33d)[_0x694ea3(0x350)](_0x15c5f5['id']);else{if(DataManager['isArmor'](_0x15c5f5))_0x5f3450=_0x694ea3(0x34d)[_0x694ea3(0x350)](_0x15c5f5['id']);else return;}}const _0x48ba1c=this['createNewLabelSprite'](_0x5f3450);_0x48ba1c['move'](_0x4e1ac9,_0x38357a),_0x48ba1c[_0x694ea3(0x137)](),_0x48ba1c[_0x694ea3(0x364)]=this[_0x694ea3(0x486)];},Window_ItemCategory['categoryList']=VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x151)][_0x5b2ecf(0x4c8)][_0x5b2ecf(0x48b)],Window_ItemCategory['categoryItemTypes']=[_0x5b2ecf(0x47b),_0x5b2ecf(0x2d7),_0x5b2ecf(0x266),_0x5b2ecf(0x29d),'AlwaysUsable','BattleUsable',_0x5b2ecf(0x24e),'NeverUsable'],VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x48d)]=Window_ItemCategory['prototype'][_0x5b2ecf(0x170)],Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)]=function(_0x316ee6){const _0x5be82f=_0x5b2ecf;VisuMZ[_0x5be82f(0x11a)]['Window_ItemCategory_initialize'][_0x5be82f(0x4b6)](this,_0x316ee6),this['createCategoryNameWindow'](_0x316ee6);},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x4c7)]=function(_0x773626){const _0x1239fc=_0x5b2ecf,_0xed1ec=new Rectangle(0x0,0x0,_0x773626['width'],_0x773626[_0x1239fc(0x42c)]);this['_categoryNameWindow']=new Window_Base(_0xed1ec),this['_categoryNameWindow'][_0x1239fc(0x364)]=0x0,this[_0x1239fc(0xe2)](this[_0x1239fc(0x26e)]),this[_0x1239fc(0x241)]();},Window_ItemCategory['prototype'][_0x5b2ecf(0x24d)]=function(){const _0x111f27=_0x5b2ecf;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x111f27(0x24d)][_0x111f27(0x4b6)](this);},Window_ItemCategory[_0x5b2ecf(0x138)]['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x3f8)]=function(){const _0x5698c2=_0x5b2ecf;if(!this[_0x5698c2(0x24d)]())Window_HorzCommand[_0x5698c2(0x138)]['playOkSound'][_0x5698c2(0x4b6)](this);},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x4a4)]=function(){const _0x15c240=_0x5b2ecf;return this[_0x15c240(0xed)]?this[_0x15c240(0x36b)]():0x4;},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x421)]=function(){const _0x157518=_0x5b2ecf;Window_HorzCommand[_0x157518(0x138)][_0x157518(0x421)]['call'](this),this['_itemWindow']&&this[_0x157518(0x30c)][_0x157518(0x277)](this[_0x157518(0x3b0)]());},Window_ItemCategory['prototype']['processCursorMoveModernControls']=function(){const _0x47ed=_0x5b2ecf;if(this[_0x47ed(0x17a)]()){const _0x518af1=this[_0x47ed(0x4f1)]();if(this[_0x47ed(0x30c)]&&this[_0x47ed(0x30c)][_0x47ed(0x4a4)]()<=0x1)Input[_0x47ed(0x426)]('right')&&this['cursorRight'](Input[_0x47ed(0x251)](_0x47ed(0x3ac))),Input['isRepeated'](_0x47ed(0x3da))&&this[_0x47ed(0xc9)](Input[_0x47ed(0x251)](_0x47ed(0x3da)));else this[_0x47ed(0x30c)]&&this[_0x47ed(0x30c)]['maxCols']()>0x1&&(Input[_0x47ed(0x426)](_0x47ed(0x1eb))&&!Input[_0x47ed(0x135)](_0x47ed(0x4a6))&&this['cursorRight'](Input['isTriggered'](_0x47ed(0x1eb))),Input[_0x47ed(0x426)](_0x47ed(0x2bf))&&!Input['isPressed'](_0x47ed(0x4a6))&&this[_0x47ed(0xc9)](Input[_0x47ed(0x251)](_0x47ed(0x2bf))));this[_0x47ed(0x4f1)]()!==_0x518af1&&this['playCursorSound']();}},Window_ItemCategory['prototype']['processHandling']=function(){const _0x15fade=_0x5b2ecf;if(this[_0x15fade(0x24d)]())return;Window_HorzCommand[_0x15fade(0x138)][_0x15fade(0x126)][_0x15fade(0x4b6)](this);},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x368)]=function(){const _0x34554f=_0x5b2ecf;return this[_0x34554f(0x24d)]()?![]:Window_HorzCommand[_0x34554f(0x138)][_0x34554f(0x368)][_0x34554f(0x4b6)](this);},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x513)]=function(){const _0x323625=_0x5b2ecf;if(this[_0x323625(0x2b1)]()){TouchInput['isTriggered']()&&this['onTouchSelect'](!![]);if(TouchInput[_0x323625(0x459)]())this[_0x323625(0x1d8)]();else TouchInput[_0x323625(0x1ee)]()&&this[_0x323625(0x1ae)]();}},Window_ItemCategory['prototype'][_0x5b2ecf(0x343)]=function(_0x573b62){const _0x107eec=_0x5b2ecf;this['isUseModernControls']()?this[_0x107eec(0x123)](!![]):Window_HorzCommand['prototype'][_0x107eec(0x343)]['call'](this,_0x573b62);},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x123)]=function(_0x3dd5db){const _0x36e865=_0x5b2ecf;this[_0x36e865(0xfa)]=![];if(this[_0x36e865(0x17a)]()){const _0x3ccc13=this[_0x36e865(0x4f1)](),_0x5ce464=this[_0x36e865(0x311)]();_0x5ce464>=0x0&&_0x5ce464!==this[_0x36e865(0x4f1)]()&&this[_0x36e865(0x2a0)](_0x5ce464),_0x3dd5db&&this[_0x36e865(0x4f1)]()!==_0x3ccc13&&this[_0x36e865(0x3dd)]();}},Window_ItemCategory['prototype'][_0x5b2ecf(0x12a)]=function(){const _0x4f73e1=_0x5b2ecf;this[_0x4f73e1(0x13f)](),this['select'](this[_0x4f73e1(0x4f1)]());},Window_ItemCategory['prototype']['addItemCategories']=function(){const _0x42eaf7=_0x5b2ecf;for(const _0x309fd3 of Window_ItemCategory[_0x42eaf7(0x1d5)]){this[_0x42eaf7(0x281)](_0x309fd3);}},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x281)]=function(_0x584ef8){const _0x3567b5=_0x5b2ecf,_0x437786=_0x584ef8['Type'],_0x478e60=_0x584ef8[_0x3567b5(0x10b)],_0x56e805=_0x584ef8[_0x3567b5(0x3cb)]||0x0;if(_0x56e805>0x0&&!$gameSwitches[_0x3567b5(0x12c)](_0x56e805))return;let _0x4fb1ca='',_0x174fbc='category',_0x22c759=_0x437786;if(_0x437786[_0x3567b5(0x3f2)](/Category:(.*)/i))_0x4fb1ca=String(RegExp['$1'])[_0x3567b5(0xe8)]();else{if(Window_ItemCategory[_0x3567b5(0x2b6)][_0x3567b5(0x4a1)](_0x437786))_0x4fb1ca=VisuMZ['ItemsEquipsCore'][_0x3567b5(0x151)]['Categories'][_0x437786];else{if(['AllItems',_0x3567b5(0x161)][_0x3567b5(0x4a1)](_0x437786))_0x4fb1ca=TextManager['item'];else{if(_0x437786===_0x3567b5(0x3cc))_0x4fb1ca=TextManager[_0x3567b5(0x337)];else{if(_0x437786===_0x3567b5(0x420))_0x4fb1ca=TextManager[_0x3567b5(0x12f)];else{if(_0x437786===_0x3567b5(0x20a))_0x4fb1ca=TextManager[_0x3567b5(0x1bc)];else{if(_0x437786[_0x3567b5(0x3f2)](/WTYPE:(\d+)/i))_0x4fb1ca=$dataSystem[_0x3567b5(0x509)][Number(RegExp['$1'])]||'';else{if(_0x437786[_0x3567b5(0x3f2)](/ATYPE:(\d+)/i))_0x4fb1ca=$dataSystem[_0x3567b5(0x4e3)][Number(RegExp['$1'])]||'';else _0x437786['match'](/ETYPE:(\d+)/i)&&(_0x4fb1ca=$dataSystem[_0x3567b5(0x172)][Number(RegExp['$1'])]||'');}}}}}}}if(TextManager[_0x3567b5(0xf7)]&&TextManager[_0x3567b5(0x2b7)]()){const _0x1a8d67=_0x4fb1ca[_0x3567b5(0x227)]()['trim']();if($dataLocalization[_0x1a8d67]&&_0x1a8d67[_0x3567b5(0x3e7)]>0x0){const _0x15f784=ConfigManager[_0x3567b5(0x220)]||_0x3567b5(0x3bc);_0x4fb1ca=$dataLocalization[_0x1a8d67][_0x15f784]||_0x3567b5(0x35b);}}_0x478e60>0x0&&this[_0x3567b5(0xc5)]()!==_0x3567b5(0x2e5)&&(_0x4fb1ca=_0x3567b5(0x268)[_0x3567b5(0x350)](_0x478e60,_0x4fb1ca)),this['addCommand'](_0x4fb1ca,_0x174fbc,!![],_0x22c759);},Window_ItemCategory[_0x5b2ecf(0x138)]['itemTextAlign']=function(){const _0x579fd3=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x579fd3(0x151)][_0x579fd3(0x4c8)][_0x579fd3(0x1a9)];},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x468)]=function(_0x1d849d){const _0x212ce2=_0x5b2ecf,_0x380de7=this['categoryStyleCheck'](_0x1d849d);if(_0x380de7===_0x212ce2(0x45a))this['drawItemStyleIconText'](_0x1d849d);else _0x380de7===_0x212ce2(0x115)?this[_0x212ce2(0x35c)](_0x1d849d):Window_HorzCommand[_0x212ce2(0x138)]['drawItem']['call'](this,_0x1d849d);},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0xc5)]=function(){const _0x89ded3=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x89ded3(0x151)][_0x89ded3(0x4c8)][_0x89ded3(0x50b)];},Window_ItemCategory[_0x5b2ecf(0x138)]['categoryStyleCheck']=function(_0xef841b){const _0x482221=_0x5b2ecf;if(_0xef841b<0x0)return _0x482221(0x2e5);const _0x485f54=this[_0x482221(0xc5)]();if(_0x485f54!==_0x482221(0x45b))return _0x485f54;else{const _0x185602=this[_0x482221(0x26c)](_0xef841b);if(_0x185602[_0x482221(0x3f2)](/\\I\[(\d+)\]/i)){const _0x5d5ae3=this[_0x482221(0x200)](_0xef841b),_0x506588=this[_0x482221(0x10f)](_0x185602)['width'];return _0x506588<=_0x5d5ae3[_0x482221(0x4b9)]?_0x482221(0x45a):_0x482221(0x115);}else return _0x482221(0x2e5);}},Window_ItemCategory[_0x5b2ecf(0x138)]['drawItemStyleIconText']=function(_0x2cc41d){const _0x326b26=_0x5b2ecf,_0x309204=this[_0x326b26(0x200)](_0x2cc41d),_0x4c044b=this[_0x326b26(0x26c)](_0x2cc41d),_0x401f5c=this[_0x326b26(0x10f)](_0x4c044b)['width'];this[_0x326b26(0x4ab)](this[_0x326b26(0x2eb)](_0x2cc41d));const _0x41bac4=this[_0x326b26(0xd6)]();if(_0x41bac4===_0x326b26(0x3ac))this['drawTextEx'](_0x4c044b,_0x309204['x']+_0x309204['width']-_0x401f5c,_0x309204['y'],_0x401f5c);else{if(_0x41bac4===_0x326b26(0x1dc)){const _0x211f63=_0x309204['x']+Math[_0x326b26(0x18c)]((_0x309204[_0x326b26(0x4b9)]-_0x401f5c)/0x2);this['drawTextEx'](_0x4c044b,_0x211f63,_0x309204['y'],_0x401f5c);}else this[_0x326b26(0x47d)](_0x4c044b,_0x309204['x'],_0x309204['y'],_0x401f5c);}},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x35c)]=function(_0x3fc9e9){const _0x14a002=_0x5b2ecf,_0xddfdf9=this['commandName'](_0x3fc9e9);if(_0xddfdf9[_0x14a002(0x3f2)](/\\I\[(\d+)\]/i)){const _0x5b4576=Number(RegExp['$1'])||0x0,_0x57b591=this[_0x14a002(0x200)](_0x3fc9e9),_0x38f7ea=_0x57b591['x']+Math[_0x14a002(0x18c)]((_0x57b591['width']-ImageManager[_0x14a002(0x1e1)])/0x2),_0x1e4dd9=_0x57b591['y']+(_0x57b591[_0x14a002(0x42c)]-ImageManager[_0x14a002(0xf2)])/0x2;this[_0x14a002(0x1b7)](_0x5b4576,_0x38f7ea,_0x1e4dd9);}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x4aa)]=Window_ItemCategory['prototype'][_0x5b2ecf(0x508)],Window_ItemCategory['prototype']['setItemWindow']=function(_0x424824){const _0x20f3ac=_0x5b2ecf;VisuMZ[_0x20f3ac(0x11a)]['Window_ItemCategory_setItemWindow']['call'](this,_0x424824),_0x424824[_0x20f3ac(0x218)]=this;},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x316)]=function(){const _0x570e97=_0x5b2ecf;Window_HorzCommand[_0x570e97(0x138)][_0x570e97(0x316)][_0x570e97(0x4b6)](this);if(this[_0x570e97(0x26e)])this[_0x570e97(0x241)]();},Window_ItemCategory['prototype']['updateCategoryNameWindow']=function(){const _0x5c123f=_0x5b2ecf,_0x3eadbd=this[_0x5c123f(0x26e)];_0x3eadbd[_0x5c123f(0x146)][_0x5c123f(0x290)]();const _0x29bd06=this[_0x5c123f(0x29f)](this[_0x5c123f(0x4f1)]());if(_0x29bd06===_0x5c123f(0x115)){const _0x3c6de6=this[_0x5c123f(0x200)](this[_0x5c123f(0x4f1)]());let _0x4dab35=this[_0x5c123f(0x26c)](this['index']());_0x4dab35=_0x4dab35[_0x5c123f(0x154)](/\\I\[(\d+)\]/gi,''),_0x3eadbd['resetFontSettings'](),this[_0x5c123f(0x2f7)](_0x4dab35,_0x3c6de6),this['categoryNameWindowDrawText'](_0x4dab35,_0x3c6de6),this[_0x5c123f(0x47c)](_0x4dab35,_0x3c6de6);}},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x2f7)]=function(_0x4dac4e,_0x4bc129){},Window_ItemCategory[_0x5b2ecf(0x138)]['categoryNameWindowDrawText']=function(_0x251a93,_0x44e2b1){const _0x3fef57=_0x5b2ecf,_0x28301f=this[_0x3fef57(0x26e)];_0x28301f[_0x3fef57(0x102)](_0x251a93,0x0,_0x44e2b1['y'],_0x28301f[_0x3fef57(0x2f6)],_0x3fef57(0x1dc));},Window_ItemCategory[_0x5b2ecf(0x138)][_0x5b2ecf(0x47c)]=function(_0x23cf6a,_0x3cbeaa){const _0x8164c0=_0x5b2ecf,_0x8f4886=this[_0x8164c0(0x26e)],_0x5857e1=$gameSystem[_0x8164c0(0x1a2)](),_0x54c671=_0x3cbeaa['x']+Math[_0x8164c0(0x18c)](_0x3cbeaa['width']/0x2)+_0x5857e1;_0x8f4886['x']=_0x8f4886[_0x8164c0(0x4b9)]/-0x2+_0x54c671,_0x8f4886['y']=Math[_0x8164c0(0x18c)](_0x3cbeaa[_0x8164c0(0x42c)]/0x2);},Window_ItemList['prototype']['processCursorMoveModernControls']=function(){const _0x161961=_0x5b2ecf;if(this[_0x161961(0x17a)]()){const _0x235183=this['index']();if(this['maxCols']()<=0x1)!this['isHandled'](_0x161961(0x1eb))&&Input[_0x161961(0x251)](_0x161961(0x1eb))&&this[_0x161961(0x324)](),!this['isHandled']('pageup')&&Input[_0x161961(0x251)](_0x161961(0x2bf))&&this['cursorPageup']();else this['maxCols']()>0x1&&(Input[_0x161961(0x426)](_0x161961(0x3ac))&&this[_0x161961(0x12b)](Input[_0x161961(0x251)](_0x161961(0x3ac))),Input['isRepeated'](_0x161961(0x3da))&&this['cursorLeft'](Input['isTriggered'](_0x161961(0x3da))),this['limitedPageUpDownSceneCheck']()?(Input['isTriggered'](_0x161961(0x1eb))&&Input[_0x161961(0x135)](_0x161961(0x4a6))&&this[_0x161961(0x324)](),Input[_0x161961(0x251)](_0x161961(0x2bf))&&Input['isPressed']('shift')&&this[_0x161961(0x144)]()):(Input[_0x161961(0x251)](_0x161961(0x1eb))&&this[_0x161961(0x324)](),Input['isTriggered']('pageup')&&this['cursorPageup']()));Input[_0x161961(0x426)](_0x161961(0x511))&&(Input[_0x161961(0x135)](_0x161961(0x4a6))&&this[_0x161961(0x1b8)]()?this[_0x161961(0x324)]():this[_0x161961(0x3b4)](Input['isTriggered'](_0x161961(0x511)))),Input[_0x161961(0x426)]('up')&&(Input['isPressed'](_0x161961(0x4a6))&&this[_0x161961(0x1b8)]()?this[_0x161961(0x144)]():this[_0x161961(0x1a3)](Input['isTriggered']('up'))),Imported[_0x161961(0x1d2)]&&this[_0x161961(0x4fe)](),this[_0x161961(0x4f1)]()!==_0x235183&&this[_0x161961(0x3dd)]();}},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0xce)]=function(){const _0x532ee9=_0x5b2ecf,_0x1ecde5=SceneManager[_0x532ee9(0x3f7)],_0x54d308=[Scene_Item,Scene_Shop];return _0x54d308[_0x532ee9(0x4a1)](_0x1ecde5[_0x532ee9(0x160)]);},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x2c0)]=function(){const _0x8c462=_0x5b2ecf;Window_Selectable[_0x8c462(0x138)][_0x8c462(0x2c0)]['call'](this),this[_0x8c462(0x218)]&&this[_0x8c462(0x218)][_0x8c462(0x24d)]()&&this[_0x8c462(0x218)]['activate']();},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x24f)]=function(){const _0x4e1b8c=_0x5b2ecf;Window_Selectable[_0x4e1b8c(0x138)][_0x4e1b8c(0x24f)][_0x4e1b8c(0x4b6)](this),this[_0x4e1b8c(0x218)]&&this[_0x4e1b8c(0x218)]['isUseModernControls']()&&this[_0x4e1b8c(0x218)][_0x4e1b8c(0x24f)]();},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x277)]=function(_0x527e80){const _0x29fa5c=_0x5b2ecf;this[_0x29fa5c(0x42d)]!==_0x527e80&&(this[_0x29fa5c(0x42d)]=_0x527e80,this[_0x29fa5c(0x35a)](),this[_0x29fa5c(0x218)]&&this['_categoryWindow']['isUseModernControls']()?this[_0x29fa5c(0x4fd)](0x0):this[_0x29fa5c(0x1df)](0x0,0x0));},VisuMZ[_0x5b2ecf(0x11a)]['Window_ItemList_maxCols']=Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x4a4)],Window_ItemList['prototype'][_0x5b2ecf(0x4a4)]=function(){const _0x3fb080=_0x5b2ecf;if(SceneManager['_scene'][_0x3fb080(0x160)]===Scene_Battle)return VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x3fb080(0x4b6)](this);else return SceneManager[_0x3fb080(0x3f7)][_0x3fb080(0x160)]===Scene_Map?VisuMZ[_0x3fb080(0x11a)][_0x3fb080(0x370)][_0x3fb080(0x4b6)](this):VisuMZ[_0x3fb080(0x11a)][_0x3fb080(0x151)][_0x3fb080(0x369)][_0x3fb080(0x1ba)];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x3aa)]=Window_ItemList[_0x5b2ecf(0x138)]['colSpacing'],Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x3fc)]=function(){const _0x2fa58b=_0x5b2ecf;return this[_0x2fa58b(0x4a4)]()<=0x1?Window_Selectable[_0x2fa58b(0x138)]['colSpacing'][_0x2fa58b(0x4b6)](this):VisuMZ['ItemsEquipsCore'][_0x2fa58b(0x3aa)]['call'](this);},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x4a1)]=function(_0x13d862){const _0x3797fc=_0x5b2ecf;switch(this['_category']){case _0x3797fc(0x222):return DataManager[_0x3797fc(0x2d4)](_0x13d862);case _0x3797fc(0x161):return DataManager['isItem'](_0x13d862)&&_0x13d862[_0x3797fc(0x114)]===0x1;case'KeyItems':return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&_0x13d862['itypeId']===0x2;case _0x3797fc(0x47b):return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&_0x13d862[_0x3797fc(0x114)]===0x3;case _0x3797fc(0x2d7):return DataManager['isItem'](_0x13d862)&&_0x13d862['itypeId']===0x4;case _0x3797fc(0x29d):return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&_0x13d862[_0x3797fc(0x37d)];case'Nonconsumable':return DataManager['isItem'](_0x13d862)&&!_0x13d862[_0x3797fc(0x37d)];case _0x3797fc(0x299):return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&[0x0]['includes'](_0x13d862[_0x3797fc(0x41a)]);case'BattleUsable':return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&[0x0,0x1]['includes'](_0x13d862[_0x3797fc(0x41a)]);case _0x3797fc(0x24e):return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&[0x0,0x2][_0x3797fc(0x4a1)](_0x13d862[_0x3797fc(0x41a)]);case _0x3797fc(0x41f):return DataManager[_0x3797fc(0x2d4)](_0x13d862)&&[0x3][_0x3797fc(0x4a1)](_0x13d862[_0x3797fc(0x41a)]);case'AllWeapons':return DataManager[_0x3797fc(0xdc)](_0x13d862);case _0x3797fc(0x20a):return DataManager[_0x3797fc(0x4dc)](_0x13d862);default:if(this['_category'][_0x3797fc(0x3f2)](/WTYPE:(\d+)/i))return DataManager[_0x3797fc(0xdc)](_0x13d862)&&_0x13d862[_0x3797fc(0x283)]===Number(RegExp['$1']);else{if(this[_0x3797fc(0x42d)]['match'](/WTYPE:(.*)/i)){const _0x46e2da=$dataSystem['weaponTypes'][_0x3797fc(0x455)](String(RegExp['$1'])[_0x3797fc(0xe8)]());return DataManager[_0x3797fc(0xdc)](_0x13d862)&&_0x13d862[_0x3797fc(0x283)]===_0x46e2da;}else{if(this[_0x3797fc(0x42d)]['match'](/ATYPE:(\d+)/i))return DataManager[_0x3797fc(0x4dc)](_0x13d862)&&_0x13d862['atypeId']===Number(RegExp['$1']);else{if(this[_0x3797fc(0x42d)]['match'](/ATYPE:(.*)/i)){const _0x3c1c0c=$dataSystem[_0x3797fc(0x4e3)][_0x3797fc(0x455)](String(RegExp['$1'])[_0x3797fc(0xe8)]());return DataManager[_0x3797fc(0x4dc)](_0x13d862)&&_0x13d862[_0x3797fc(0x22d)]===_0x3c1c0c;}else{if(this['_category'][_0x3797fc(0x3f2)](/ETYPE:(\d+)/i))return!!_0x13d862&&_0x13d862['etypeId']===Number(RegExp['$1']);else{if(this[_0x3797fc(0x42d)]['match'](/ETYPE:(.*)/i)){const _0x447b9f=$dataSystem[_0x3797fc(0x172)][_0x3797fc(0x455)](String(RegExp['$1'])[_0x3797fc(0xe8)]());return DataManager[_0x3797fc(0x4dc)](_0x13d862)&&_0x13d862[_0x3797fc(0x355)]===_0x447b9f;}else{if(this[_0x3797fc(0x42d)][_0x3797fc(0x3f2)](/Category:(.*)/i))return!!_0x13d862&&_0x13d862[_0x3797fc(0x225)][_0x3797fc(0x4a1)](String(RegExp['$1'])[_0x3797fc(0x505)]()[_0x3797fc(0xe8)]());}}}}}}}return![];},VisuMZ['ItemsEquipsCore']['Window_ItemList_makeItemList']=Window_ItemList['prototype'][_0x5b2ecf(0x37e)],Window_ItemList['prototype'][_0x5b2ecf(0x37e)]=function(){const _0xe0bd9a=_0x5b2ecf;VisuMZ[_0xe0bd9a(0x11a)][_0xe0bd9a(0x448)][_0xe0bd9a(0x4b6)](this);if(this[_0xe0bd9a(0x11f)]())this[_0xe0bd9a(0x308)]();},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x11f)]=function(){const _0x57b788=_0x5b2ecf,_0xc7dc92=['Scene_Battle',_0x57b788(0x50d),'Scene_Equip',_0x57b788(0x4c3)],_0x40a14b=SceneManager['_scene'];return _0xc7dc92[_0x57b788(0x4a1)](_0x40a14b['constructor'][_0x57b788(0x4df)]);},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x308)]=function(){const _0xdc7c01=_0x5b2ecf,_0x5563ae=Window_ItemCategory[_0xdc7c01(0x1d5)],_0x3b40bf=_0x5563ae[_0xdc7c01(0x21d)](_0x1f26c4=>_0x1f26c4[_0xdc7c01(0x24a)]===this['_category']);if(!_0x3b40bf){VisuMZ[_0xdc7c01(0x11a)]['SortByIDandPriority'](this[_0xdc7c01(0x34a)]);return;}const _0x12158b=((_0x3b40bf[_0xdc7c01(0x22f)]??'ID')||'ID')['toUpperCase']()['trim']();_0x12158b===_0xdc7c01(0x193)?this[_0xdc7c01(0x34a)][_0xdc7c01(0x2a5)]((_0x38875b,_0x3464d3)=>{const _0x18177d=_0xdc7c01;if(!!_0x38875b&&!!_0x3464d3)return _0x38875b[_0x18177d(0x4df)][_0x18177d(0xf1)](_0x3464d3['name']);return 0x0;}):VisuMZ[_0xdc7c01(0x11a)][_0xdc7c01(0x1d3)](this[_0xdc7c01(0x34a)]);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x1d3)]=function(_0x32a477){const _0xd4767f=_0x5b2ecf;return _0x32a477[_0xd4767f(0x2a5)]((_0x726817,_0x36c2ed)=>{const _0x6c83b7=_0xd4767f;if(!!_0x726817&&!!_0x36c2ed){if(_0x726817[_0x6c83b7(0xd5)]===undefined)VisuMZ[_0x6c83b7(0x11a)][_0x6c83b7(0x37f)](_0x726817);if(_0x36c2ed[_0x6c83b7(0xd5)]===undefined)VisuMZ[_0x6c83b7(0x11a)][_0x6c83b7(0x37f)](_0x36c2ed);const _0x21fe15=_0x726817[_0x6c83b7(0xd5)],_0xa5852=_0x36c2ed[_0x6c83b7(0xd5)];if(_0x21fe15!==_0xa5852)return _0xa5852-_0x21fe15;return _0x726817['id']-_0x36c2ed['id'];}return 0x0;}),_0x32a477;},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x17e)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x235)]=Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x468)],Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x468)]=function(_0x6591b4){const _0x1c1d04=_0x5b2ecf;VisuMZ[_0x1c1d04(0x11a)][_0x1c1d04(0x235)]['call'](this,_0x6591b4),this[_0x1c1d04(0x18b)](_0x6591b4);},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x3c3)]=function(_0xe4982b,_0x3165a3,_0x3f2676,_0x47f865){const _0x308f39=_0x5b2ecf;Window_Selectable[_0x308f39(0x138)][_0x308f39(0x3c3)]['call'](this,_0xe4982b,_0x3165a3,_0x3f2676,_0x47f865);},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x18b)]=function(_0x27928c){const _0x4ddf15=_0x5b2ecf,_0x5998c4=this[_0x4ddf15(0x4b4)](_0x27928c);if(!_0x5998c4||!this[_0x4ddf15(0x17e)]())return;if(!$gameParty['isNewItem'](_0x5998c4))return;const _0x55248d=this['itemLineRect'](_0x27928c),_0x30f60f=_0x55248d['x'],_0x204354=_0x55248d['y']+(this[_0x4ddf15(0x452)]()-ImageManager[_0x4ddf15(0xf2)])/0x2,_0x37f42c=VisuMZ['ItemsEquipsCore'][_0x4ddf15(0x151)][_0x4ddf15(0x1e2)][_0x4ddf15(0x258)],_0x43f830=VisuMZ[_0x4ddf15(0x11a)][_0x4ddf15(0x151)][_0x4ddf15(0x1e2)][_0x4ddf15(0x395)];this[_0x4ddf15(0x31d)](_0x5998c4,_0x30f60f+_0x37f42c,_0x204354+_0x43f830);},Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x398)]=function(_0x5c092d){const _0x4f437c=_0x5b2ecf;this[_0x4f437c(0x13c)]=_0x5c092d,this[_0x4f437c(0x316)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x28c)]=Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x39c)],Window_ItemList[_0x5b2ecf(0x138)][_0x5b2ecf(0x39c)]=function(){const _0x510f2e=_0x5b2ecf;VisuMZ[_0x510f2e(0x11a)]['Window_ItemList_updateHelp'][_0x510f2e(0x4b6)](this),this[_0x510f2e(0x13c)]&&this[_0x510f2e(0x13c)][_0x510f2e(0x160)]===Window_ShopStatus&&this['_statusWindow'][_0x510f2e(0x40c)](this[_0x510f2e(0x334)]());},Window_BattleItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x42e)]=function(_0x416b6f){const _0x4fc825=_0x5b2ecf;return BattleManager[_0x4fc825(0x181)]()?BattleManager[_0x4fc825(0x181)]()[_0x4fc825(0x43d)](_0x416b6f):Window_ItemList['prototype'][_0x4fc825(0x42e)][_0x4fc825(0x4b6)](this,_0x416b6f);},Window_EventItem['prototype'][_0x5b2ecf(0x17e)]=function(){return![];},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x487)]=function(){const _0x58e0d2=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x58e0d2(0x151)]['EquipScene'][_0x58e0d2(0x28b)];},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x165)]=Window_EquipStatus[_0x5b2ecf(0x138)]['refresh'],Window_EquipStatus[_0x5b2ecf(0x138)]['refresh']=function(){const _0x9312a1=_0x5b2ecf;this['hideAdditionalSprites'](),this[_0x9312a1(0x113)]();if(this['_actor'])this['_actor']['refresh']();this[_0x9312a1(0x487)]()?this[_0x9312a1(0x4fc)]():VisuMZ[_0x9312a1(0x11a)][_0x9312a1(0x165)][_0x9312a1(0x4b6)](this);},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4fc)]=function(){const _0x498930=_0x5b2ecf;this[_0x498930(0x146)][_0x498930(0x290)]();if(!this[_0x498930(0x3ed)])return;if(this[_0x498930(0x4e7)]()){const _0x21f866=ImageManager[_0x498930(0x44a)](this[_0x498930(0x3ed)]['getMenuImage']());_0x21f866[_0x498930(0x173)](this[_0x498930(0x158)]['bind'](this));}else this[_0x498930(0x33b)]();},Window_EquipStatus['prototype'][_0x5b2ecf(0x4e7)]=function(){const _0x314987=_0x5b2ecf;return Imported[_0x314987(0x39a)]&&this[_0x314987(0x3ed)][_0x314987(0x2cd)]()!==''&&VisuMZ[_0x314987(0x11a)][_0x314987(0x151)]['EquipScene'][_0x314987(0x3d0)];},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x158)]=function(){const _0x56f518=_0x5b2ecf;VisuMZ[_0x56f518(0x11a)][_0x56f518(0x151)][_0x56f518(0x276)]['DrawPortraitJS']['call'](this),this[_0x56f518(0x4f0)]();},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x33b)]=function(){const _0x11b4e7=_0x5b2ecf;VisuMZ[_0x11b4e7(0x11a)][_0x11b4e7(0x151)][_0x11b4e7(0x276)][_0x11b4e7(0x118)][_0x11b4e7(0x4b6)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus['prototype'][_0x5b2ecf(0x4f0)]=function(){const _0x21fcd9=_0x5b2ecf;this['resetFontSettings'](),VisuMZ[_0x21fcd9(0x11a)][_0x21fcd9(0x151)][_0x21fcd9(0x276)]['DrawParamJS'][_0x21fcd9(0x4b6)](this);},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x14b)]=function(_0xb63c86,_0x3148a2,_0x584bd9,_0x4208f9,_0x40c14d){const _0x4ee6d6=_0x5b2ecf,_0x34b3ed=ImageManager[_0x4ee6d6(0x44a)](_0xb63c86[_0x4ee6d6(0x2cd)]()),_0xcf2437=this[_0x4ee6d6(0x2f6)]-_0x34b3ed[_0x4ee6d6(0x4b9)];_0x3148a2+=_0xcf2437/0x2;if(_0xcf2437<0x0)_0x4208f9-=_0xcf2437;Window_StatusBase[_0x4ee6d6(0x138)][_0x4ee6d6(0x14b)][_0x4ee6d6(0x4b6)](this,_0xb63c86,_0x3148a2,_0x584bd9,_0x4208f9,_0x40c14d);},Window_EquipStatus[_0x5b2ecf(0x138)]['actorParams']=function(){const _0x3444cd=_0x5b2ecf;return Imported[_0x3444cd(0x1d2)]?VisuMZ[_0x3444cd(0xc8)][_0x3444cd(0x151)][_0x3444cd(0x2d3)][_0x3444cd(0x383)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x49e)]=function(){const _0x1e506d=_0x5b2ecf;return VisuMZ[_0x1e506d(0x11a)][_0x1e506d(0x151)][_0x1e506d(0x276)][_0x1e506d(0x488)];},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3e0)]=function(){const _0x3e3279=_0x5b2ecf;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ['CoreEngine'][_0x3e3279(0x151)]['Param'][_0x3e3279(0x367)];},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x389)]=function(_0x1d463a,_0xbcab5b,_0x1a8a91,_0x5dba93){const _0x16eefa=_0x5b2ecf,_0x47c3f6=this[_0x16eefa(0x2a7)]();Imported[_0x16eefa(0x1d2)]?this[_0x16eefa(0x2d2)](_0xbcab5b+_0x47c3f6,_0x1a8a91,_0x5dba93,_0x1d463a,![]):this[_0x16eefa(0x102)](TextManager[_0x16eefa(0x249)](_0x1d463a),_0xbcab5b+_0x47c3f6,_0x1a8a91,_0x5dba93);},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x15b)]=function(_0x33cfea,_0x342a24,_0x28fa70,_0x7aae55){const _0x412c17=_0x5b2ecf,_0x145265=this[_0x412c17(0x2a7)]();let _0x381c16=0x0;Imported['VisuMZ_0_CoreEngine']?_0x381c16=this['_actor']['paramValueByName'](_0x33cfea,!![]):_0x381c16=this[_0x412c17(0x3ed)][_0x412c17(0x249)](_0x33cfea);const _0x46a9c4=_0x381c16;this[_0x412c17(0x102)](_0x381c16,_0x342a24,_0x28fa70,_0x7aae55-_0x145265,_0x412c17(0x3ac));},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x361)]=function(_0x35adbb,_0x3c6854,_0x3f8bf5,_0x36b065){const _0x52ea12=_0x5b2ecf,_0x1f04aa=this[_0x52ea12(0x2a7)]();let _0x5421e9=0x0,_0x256bc3=0x0,_0x49cab0='';if(this[_0x52ea12(0x43b)]){Imported[_0x52ea12(0x1d2)]?(_0x5421e9=this[_0x52ea12(0x3ed)][_0x52ea12(0x40d)](_0x35adbb,![]),_0x256bc3=this[_0x52ea12(0x43b)][_0x52ea12(0x40d)](_0x35adbb,![]),_0x49cab0=this[_0x52ea12(0x43b)]['paramValueByName'](_0x35adbb,!![])):(_0x5421e9=this[_0x52ea12(0x3ed)][_0x52ea12(0x249)](_0x35adbb),_0x256bc3=this['_tempActor'][_0x52ea12(0x249)](_0x35adbb),_0x49cab0=this[_0x52ea12(0x43b)][_0x52ea12(0x249)](_0x35adbb));const _0x5ace4d=_0x5421e9,_0x3d551e=_0x256bc3;diffValue=_0x3d551e-_0x5ace4d,this[_0x52ea12(0x4bc)](ColorManager[_0x52ea12(0x3d9)](diffValue)),this[_0x52ea12(0x102)](_0x49cab0,_0x3c6854,_0x3f8bf5,_0x36b065-_0x1f04aa,_0x52ea12(0x3ac));}},Window_EquipStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x32e)]=function(_0x476e66,_0x5160f6,_0x9caea,_0x551a52){const _0x471b4b=_0x5b2ecf,_0x24b109=this[_0x471b4b(0x2a7)]();let _0x4ca443=0x0,_0x175a88=0x0,_0x4f90e4=![];if(this['_tempActor']){Imported[_0x471b4b(0x1d2)]?(_0x4ca443=this[_0x471b4b(0x3ed)][_0x471b4b(0x40d)](_0x476e66,![]),_0x175a88=this['_tempActor']['paramValueByName'](_0x476e66,![]),_0x4f90e4=String(this['_actor']['paramValueByName'](_0x476e66,!![]))[_0x471b4b(0x3f2)](/([%％])/i)):(_0x4ca443=this[_0x471b4b(0x3ed)][_0x471b4b(0x249)](_0x476e66),_0x175a88=this[_0x471b4b(0x43b)]['param'](_0x476e66),_0x4f90e4=_0x4ca443%0x1!==0x0||_0x175a88%0x1!==0x0);const _0xf824c2=_0x4ca443,_0x525ca0=_0x175a88,_0x34e937=_0x525ca0-_0xf824c2;let _0xcb9fa2=_0x34e937;if(_0x4f90e4)_0xcb9fa2=Math[_0x471b4b(0x20d)](_0x34e937*0x64)+'%';_0x34e937!==0x0&&(this[_0x471b4b(0x4bc)](ColorManager[_0x471b4b(0x3d9)](_0x34e937)),_0xcb9fa2=(_0x34e937>0x0?'(+%1)':_0x471b4b(0x329))[_0x471b4b(0x350)](_0xcb9fa2),this[_0x471b4b(0x102)](_0xcb9fa2,_0x5160f6+_0x24b109,_0x9caea,_0x551a52,_0x471b4b(0x3da)));}},Window_EquipStatus['prototype'][_0x5b2ecf(0x236)]=function(_0x9f0707,_0x51ecbf,_0x4565d9,_0x3618b0,_0x37588b){const _0x391390=_0x5b2ecf;if(VisuMZ['ItemsEquipsCore']['Settings'][_0x391390(0x276)][_0x391390(0x178)]===![])return;_0x37588b=Math[_0x391390(0x3c2)](_0x37588b||0x1,0x1);while(_0x37588b--){_0x3618b0=_0x3618b0||this[_0x391390(0x452)](),this[_0x391390(0x146)]['paintOpacity']=0xa0;const _0xeaca9f=ColorManager[_0x391390(0x363)]();this['contents'][_0x391390(0x442)](_0x9f0707+0x1,_0x51ecbf+0x1,_0x4565d9-0x2,_0x3618b0-0x2,_0xeaca9f),this[_0x391390(0x146)][_0x391390(0x21c)]=0xff;}},ColorManager[_0x5b2ecf(0x363)]=function(){const _0x32e750=_0x5b2ecf,_0x29172f=VisuMZ[_0x32e750(0x11a)][_0x32e750(0x151)][_0x32e750(0x276)];let _0x35c122=_0x29172f[_0x32e750(0x458)]!==undefined?_0x29172f[_0x32e750(0x458)]:0x13;return ColorManager[_0x32e750(0x263)](_0x35c122);},VisuMZ[_0x5b2ecf(0x11a)]['Window_EquipCommand_initialize']=Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)],Window_EquipCommand[_0x5b2ecf(0x138)]['initialize']=function(_0x18bb72){const _0x14b18d=_0x5b2ecf;VisuMZ['ItemsEquipsCore'][_0x14b18d(0x475)][_0x14b18d(0x4b6)](this,_0x18bb72),this[_0x14b18d(0x492)](_0x18bb72);},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x492)]=function(_0x5741fa){const _0x9c92bd=_0x5b2ecf,_0x3467b2=new Rectangle(0x0,0x0,_0x5741fa[_0x9c92bd(0x4b9)],_0x5741fa[_0x9c92bd(0x42c)]);this[_0x9c92bd(0x37c)]=new Window_Base(_0x3467b2),this['_commandNameWindow'][_0x9c92bd(0x364)]=0x0,this[_0x9c92bd(0xe2)](this[_0x9c92bd(0x37c)]),this[_0x9c92bd(0x25c)]();},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x316)]=function(){const _0x195385=_0x5b2ecf;Window_HorzCommand['prototype'][_0x195385(0x316)][_0x195385(0x4b6)](this);if(this[_0x195385(0x37c)])this['updateCommandNameWindow']();},Window_EquipCommand['prototype'][_0x5b2ecf(0x25c)]=function(){const _0x2df111=_0x5b2ecf,_0x97770=this[_0x2df111(0x37c)];_0x97770[_0x2df111(0x146)][_0x2df111(0x290)]();const _0x37a266=this['commandStyleCheck'](this[_0x2df111(0x4f1)]());if(_0x37a266===_0x2df111(0x115)){const _0x1afd29=this['itemLineRect'](this[_0x2df111(0x4f1)]());let _0x340a73=this[_0x2df111(0x26c)](this[_0x2df111(0x4f1)]());_0x340a73=_0x340a73['replace'](/\\I\[(\d+)\]/gi,''),_0x97770[_0x2df111(0x113)](),this[_0x2df111(0x293)](_0x340a73,_0x1afd29),this[_0x2df111(0x14f)](_0x340a73,_0x1afd29),this[_0x2df111(0x375)](_0x340a73,_0x1afd29);}},Window_EquipCommand['prototype'][_0x5b2ecf(0x293)]=function(_0x261161,_0x3837d0){},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x14f)]=function(_0x4fbdc0,_0x198c89){const _0x40be3e=_0x5b2ecf,_0x55c565=this['_commandNameWindow'];_0x55c565[_0x40be3e(0x102)](_0x4fbdc0,0x0,_0x198c89['y'],_0x55c565[_0x40be3e(0x2f6)],_0x40be3e(0x1dc));},Window_EquipCommand['prototype'][_0x5b2ecf(0x375)]=function(_0x1baf01,_0x43d738){const _0x132ff1=_0x5b2ecf,_0x535a76=this[_0x132ff1(0x37c)],_0x4f7dbc=$gameSystem['windowPadding'](),_0x5b22c7=_0x43d738['x']+Math[_0x132ff1(0x18c)](_0x43d738[_0x132ff1(0x4b9)]/0x2)+_0x4f7dbc;_0x535a76['x']=_0x535a76['width']/-0x2+_0x5b22c7,_0x535a76['y']=Math[_0x132ff1(0x18c)](_0x43d738[_0x132ff1(0x42c)]/0x2);},Window_EquipCommand[_0x5b2ecf(0x138)]['isUseModernControls']=function(){const _0x30d975=_0x5b2ecf;return Imported[_0x30d975(0x1d2)]&&Window_HorzCommand['prototype'][_0x30d975(0x24d)][_0x30d975(0x4b6)](this);},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x3f8)]=function(){const _0x492f04=_0x5b2ecf;if(this['currentSymbol']()===_0x492f04(0x1a1))Window_HorzCommand[_0x492f04(0x138)][_0x492f04(0x3f8)][_0x492f04(0x4b6)](this);},Window_EquipCommand['prototype'][_0x5b2ecf(0x42a)]=function(){const _0x35f835=_0x5b2ecf;!this[_0x35f835(0x27d)]()&&Window_HorzCommand[_0x35f835(0x138)][_0x35f835(0x42a)]['call'](this);},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x27d)]=function(){const _0x455d85=_0x5b2ecf;if(!this[_0x455d85(0x17a)]())return![];if(SceneManager[_0x455d85(0x3f7)][_0x455d85(0x160)]!==Scene_Equip)return![];return Input[_0x455d85(0x251)](_0x455d85(0x511))&&this[_0x455d85(0x430)](),![];},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x430)]=function(){const _0x35d9b4=_0x5b2ecf;this['playCursorSound'](),SceneManager[_0x35d9b4(0x3f7)][_0x35d9b4(0x331)](),SceneManager[_0x35d9b4(0x3f7)]['_slotWindow']['smoothSelect'](-0x1);},Window_EquipCommand['prototype'][_0x5b2ecf(0x4a4)]=function(){const _0x5e1faa=_0x5b2ecf;return this[_0x5e1faa(0xed)]?this[_0x5e1faa(0xed)]['length']:0x3;},Window_EquipCommand[_0x5b2ecf(0x138)]['processTouchModernControls']=function(){const _0xe40241=_0x5b2ecf;if(this['isOpen']()&&this['visible']&&SceneManager[_0xe40241(0x3f7)]['constructor']===Scene_Equip){if(this[_0xe40241(0x368)]()&&TouchInput['isHovered']())this['onTouchSelectModernControls'](![]);else TouchInput[_0xe40241(0x251)]()&&this['onTouchSelectModernControls'](!![]);TouchInput[_0xe40241(0x459)]()&&this['onTouchOk']();}},Window_EquipCommand[_0x5b2ecf(0x138)]['onTouchSelectModernControls']=function(_0x4bcaa7){const _0xd41e1d=_0x5b2ecf;this[_0xd41e1d(0xfa)]=![];const _0x4656bf=this['index'](),_0x1a4b4f=this[_0xd41e1d(0x311)](),_0x344ba9=SceneManager[_0xd41e1d(0x3f7)][_0xd41e1d(0x22c)];if(_0x344ba9[_0xd41e1d(0x45e)]()&&_0x344ba9[_0xd41e1d(0x2ba)]){if(_0x1a4b4f>=0x0)_0x1a4b4f===this[_0xd41e1d(0x4f1)]()&&(this[_0xd41e1d(0xfa)]=!![]),this[_0xd41e1d(0x2c0)](),this['select'](_0x1a4b4f);else _0x344ba9[_0xd41e1d(0x311)]()>=0x0&&(this[_0xd41e1d(0x24f)](),this[_0xd41e1d(0x436)]());}_0x4bcaa7&&this['index']()!==_0x4656bf&&this[_0xd41e1d(0x3dd)]();},Window_EquipCommand['prototype'][_0x5b2ecf(0x12a)]=function(){const _0x2ddad4=_0x5b2ecf;this['addEquipCommand'](),this[_0x2ddad4(0x4ae)](),this[_0x2ddad4(0x257)]();},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x35a)]=function(){const _0x140d5d=_0x5b2ecf;Window_HorzCommand[_0x140d5d(0x138)][_0x140d5d(0x35a)][_0x140d5d(0x4b6)](this),this[_0x140d5d(0x4f4)]();},Window_EquipCommand['prototype'][_0x5b2ecf(0x50f)]=function(){const _0x134dc2=_0x5b2ecf;if(!this[_0x134dc2(0x3ec)]())return;const _0x10fb41=this[_0x134dc2(0x2ad)](),_0xe1ba0c=VisuMZ[_0x134dc2(0x11a)][_0x134dc2(0x151)][_0x134dc2(0x276)][_0x134dc2(0x33a)],_0x42afd7=_0x10fb41===_0x134dc2(0x2e5)?TextManager['equip2']:_0x134dc2(0x268)[_0x134dc2(0x350)](_0xe1ba0c,TextManager[_0x134dc2(0x2ab)]),_0x442b65=this[_0x134dc2(0x1f9)]();this['addCommand'](_0x42afd7,_0x134dc2(0x1a1),_0x442b65);},Window_EquipCommand['prototype'][_0x5b2ecf(0x3ec)]=function(){const _0x29d280=_0x5b2ecf;return!this[_0x29d280(0x24d)]();},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x1f9)]=function(){return!![];},Window_EquipCommand['prototype'][_0x5b2ecf(0x4ae)]=function(){const _0x13d408=_0x5b2ecf;if(!this[_0x13d408(0x3a3)]())return;const _0x459bd8=this[_0x13d408(0x2ad)](),_0x29e6aa=VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x13d408(0xd4)],_0x42c18b=_0x459bd8===_0x13d408(0x2e5)?TextManager['optimize']:_0x13d408(0x268)[_0x13d408(0x350)](_0x29e6aa,TextManager['optimize']),_0x103abc=this[_0x13d408(0x463)]();this[_0x13d408(0x2a4)](_0x42c18b,_0x13d408(0x4bb),_0x103abc);},Window_EquipCommand[_0x5b2ecf(0x138)]['isOptimizeCommandAdded']=function(){const _0xa3df68=_0x5b2ecf;return VisuMZ[_0xa3df68(0x11a)][_0xa3df68(0x151)][_0xa3df68(0x276)][_0xa3df68(0x1f1)];},Window_EquipCommand[_0x5b2ecf(0x138)]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x257)]=function(){const _0xf7ba8c=_0x5b2ecf;if(!this[_0xf7ba8c(0x247)]())return;const _0x398413=this['commandStyle'](),_0xc5051a=VisuMZ[_0xf7ba8c(0x11a)][_0xf7ba8c(0x151)]['EquipScene'][_0xf7ba8c(0x494)],_0x5d4fb0=_0x398413===_0xf7ba8c(0x2e5)?TextManager['clear']:'\x5cI[%1]%2'[_0xf7ba8c(0x350)](_0xc5051a,TextManager[_0xf7ba8c(0x290)]),_0x1bea9a=this[_0xf7ba8c(0x45f)]();this[_0xf7ba8c(0x2a4)](_0x5d4fb0,_0xf7ba8c(0x290),_0x1bea9a);},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x247)]=function(){const _0x457953=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x457953(0x151)][_0x457953(0x276)]['CommandAddClear'];},Window_EquipCommand['prototype']['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0xd6)]=function(){const _0x3410a6=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x3410a6(0x151)][_0x3410a6(0x276)]['CmdTextAlign'];},Window_EquipCommand['prototype'][_0x5b2ecf(0x468)]=function(_0x176f35){const _0x1ef287=_0x5b2ecf,_0x2e0cec=this['commandStyleCheck'](_0x176f35);if(_0x2e0cec==='iconText')this['drawItemStyleIconText'](_0x176f35);else _0x2e0cec===_0x1ef287(0x115)?this['drawItemStyleIcon'](_0x176f35):Window_HorzCommand[_0x1ef287(0x138)][_0x1ef287(0x468)]['call'](this,_0x176f35);},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x2ad)]=function(){const _0x4e7c5c=_0x5b2ecf;return VisuMZ[_0x4e7c5c(0x11a)][_0x4e7c5c(0x151)][_0x4e7c5c(0x276)]['CmdStyle'];},Window_EquipCommand[_0x5b2ecf(0x138)]['commandStyleCheck']=function(_0x57223d){const _0x487066=_0x5b2ecf;if(_0x57223d<0x0)return _0x487066(0x2e5);const _0x51f386=this['commandStyle']();if(_0x51f386!==_0x487066(0x45b))return _0x51f386;else{if(this[_0x487066(0x36b)]()>0x0){const _0x413961=this[_0x487066(0x26c)](_0x57223d);if(_0x413961[_0x487066(0x3f2)](/\\I\[(\d+)\]/i)){const _0x63437b=this[_0x487066(0x200)](_0x57223d),_0x427c95=this['textSizeEx'](_0x413961)['width'];return _0x427c95<=_0x63437b[_0x487066(0x4b9)]?_0x487066(0x45a):_0x487066(0x115);}}}return'text';},Window_EquipCommand['prototype']['drawItemStyleIconText']=function(_0x22ac92){const _0x384aea=_0x5b2ecf,_0x3ea602=this[_0x384aea(0x200)](_0x22ac92),_0x74b27=this['commandName'](_0x22ac92),_0x31facb=this[_0x384aea(0x10f)](_0x74b27)[_0x384aea(0x4b9)];this[_0x384aea(0x4ab)](this[_0x384aea(0x2eb)](_0x22ac92));const _0xf14135=this[_0x384aea(0xd6)]();if(_0xf14135===_0x384aea(0x3ac))this[_0x384aea(0x47d)](_0x74b27,_0x3ea602['x']+_0x3ea602[_0x384aea(0x4b9)]-_0x31facb,_0x3ea602['y'],_0x31facb);else{if(_0xf14135===_0x384aea(0x1dc)){const _0x166cdf=_0x3ea602['x']+Math[_0x384aea(0x18c)]((_0x3ea602[_0x384aea(0x4b9)]-_0x31facb)/0x2);this['drawTextEx'](_0x74b27,_0x166cdf,_0x3ea602['y'],_0x31facb);}else this[_0x384aea(0x47d)](_0x74b27,_0x3ea602['x'],_0x3ea602['y'],_0x31facb);}},Window_EquipCommand[_0x5b2ecf(0x138)]['drawItemStyleIcon']=function(_0x3bc181){const _0x2f5db1=_0x5b2ecf;this[_0x2f5db1(0x26c)](_0x3bc181)[_0x2f5db1(0x3f2)](/\\I\[(\d+)\]/i);const _0xd68ddc=Number(RegExp['$1'])||0x0,_0x35a0ff=this[_0x2f5db1(0x200)](_0x3bc181),_0x36a6bd=_0x35a0ff['x']+Math[_0x2f5db1(0x18c)]((_0x35a0ff[_0x2f5db1(0x4b9)]-ImageManager[_0x2f5db1(0x1e1)])/0x2),_0x220dd6=_0x35a0ff['y']+(_0x35a0ff[_0x2f5db1(0x42c)]-ImageManager[_0x2f5db1(0xf2)])/0x2;this[_0x2f5db1(0x1b7)](_0xd68ddc,_0x36a6bd,_0x220dd6);},Window_EquipCommand['prototype'][_0x5b2ecf(0x181)]=function(){const _0x1b250a=_0x5b2ecf,_0x5823cb=SceneManager[_0x1b250a(0x3f7)];if(_0x5823cb&&_0x5823cb[_0x1b250a(0x101)])return _0x5823cb[_0x1b250a(0x101)]();return null;},Window_EquipCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x39c)]=function(){const _0x2b5c5e=_0x5b2ecf;Window_Command[_0x2b5c5e(0x138)][_0x2b5c5e(0x39c)][_0x2b5c5e(0x4b6)](this),this[_0x2b5c5e(0x4b1)][_0x2b5c5e(0x386)](this[_0x2b5c5e(0x449)]());},Window_EquipCommand[_0x5b2ecf(0x138)]['helpDescriptionText']=function(){const _0x36f660=_0x5b2ecf,_0x530c76=this[_0x36f660(0x4e0)]();switch(_0x530c76){case _0x36f660(0x1a1):return TextManager[_0x36f660(0x11e)][_0x36f660(0x1bd)][_0x36f660(0x1a1)];case'optimize':return TextManager[_0x36f660(0x11e)][_0x36f660(0x1bd)][_0x36f660(0x4bb)];case'clear':return TextManager[_0x36f660(0x11e)][_0x36f660(0x1bd)][_0x36f660(0x290)];default:return'';}},Window_EquipSlot['prototype'][_0x5b2ecf(0x24d)]=function(){const _0x1fae27=_0x5b2ecf;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x1fae27(0x138)]['isUseModernControls'][_0x1fae27(0x4b6)](this);},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x2c0)]=function(){const _0x4c28c6=_0x5b2ecf;Window_StatusBase[_0x4c28c6(0x138)]['activate'][_0x4c28c6(0x4b6)](this),this[_0x4c28c6(0x316)]();},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x32a)]=function(){const _0x5e24a2=_0x5b2ecf;Window_StatusBase[_0x5e24a2(0x138)]['processCursorMove'][_0x5e24a2(0x4b6)](this),this['checkShiftRemoveShortcut']();},Window_EquipSlot[_0x5b2ecf(0x138)]['checkShiftRemoveShortcut']=function(){const _0x8b7023=_0x5b2ecf;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x8b7023(0x251)]('shift')&&this[_0x8b7023(0x334)]()){const _0x4563ca=SceneManager[_0x8b7023(0x3f7)]['_actor'];_0x4563ca&&(this[_0x8b7023(0x310)](this[_0x8b7023(0x4f1)]())?(this[_0x8b7023(0x25e)](),this['updateHelp']()):this['playBuzzerSound']());}},Window_EquipSlot['prototype'][_0x5b2ecf(0x310)]=function(_0x54ef3e){const _0x4b0710=_0x5b2ecf,_0x26d361=SceneManager['_scene'][_0x4b0710(0x3ed)];if(!_0x26d361)return;if(!_0x26d361[_0x4b0710(0x402)](_0x54ef3e))return![];const _0x599cb1=_0x26d361['equipSlots']()[_0x54ef3e];if(_0x26d361[_0x4b0710(0x3b1)]()[_0x4b0710(0x4a1)](_0x599cb1))return![];return!![];;},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x25e)]=function(){const _0xa9d77a=_0x5b2ecf;SoundManager['playEquip']();const _0xe3dce8=SceneManager[_0xa9d77a(0x3f7)][_0xa9d77a(0x3ed)];_0xe3dce8['changeEquip'](this['index'](),null),this[_0xa9d77a(0x35a)](),this[_0xa9d77a(0x30c)][_0xa9d77a(0x35a)](),this[_0xa9d77a(0x316)]();const _0x1a2c69=SceneManager[_0xa9d77a(0x3f7)]['_statusWindow'];if(_0x1a2c69)_0x1a2c69[_0xa9d77a(0x35a)]();},Window_EquipSlot[_0x5b2ecf(0x138)]['isShiftRemoveShortcutEnabled']=function(){const _0x4b3e5d=_0x5b2ecf;if(!this[_0x4b3e5d(0x41d)])return![];if(!VisuMZ['ItemsEquipsCore'][_0x4b3e5d(0x151)][_0x4b3e5d(0x276)][_0x4b3e5d(0x450)])return![];return!![];},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x42a)]=function(){const _0x329eb0=_0x5b2ecf;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase[_0x329eb0(0x138)][_0x329eb0(0x42a)][_0x329eb0(0x4b6)](this);},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x27d)]=function(){const _0x3e33ac=_0x5b2ecf;if(!this[_0x3e33ac(0x17a)]())return![];if(SceneManager[_0x3e33ac(0x3f7)][_0x3e33ac(0x160)]!==Scene_Equip)return![];if(this[_0x3e33ac(0x504)]())return this[_0x3e33ac(0x3dd)](),Input[_0x3e33ac(0x290)](),SceneManager['_scene'][_0x3e33ac(0x3eb)](),![];else{if(Input['isRepeated'](_0x3e33ac(0x511))){const _0x3506f7=this[_0x3e33ac(0x4f1)]();return Input[_0x3e33ac(0x135)](_0x3e33ac(0x4a6))?this[_0x3e33ac(0x324)]():this['cursorDown'](Input[_0x3e33ac(0x251)](_0x3e33ac(0x511))),this[_0x3e33ac(0x4f1)]()!==_0x3506f7&&this[_0x3e33ac(0x3dd)](),!![];}else{if(this[_0x3e33ac(0x2e7)]()&&Input[_0x3e33ac(0x251)](_0x3e33ac(0x4a6)))return!![];}}return![];},Window_EquipSlot['prototype'][_0x5b2ecf(0x504)]=function(){const _0x52daed=_0x5b2ecf;if(this['index']()!==0x0)return![];const _0xbb4d00=VisuMZ['ItemsEquipsCore']['Settings'][_0x52daed(0x276)];if(!_0xbb4d00[_0x52daed(0x1f1)]&&!_0xbb4d00['CommandAddClear'])return![];return Input[_0x52daed(0x251)]('up');},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x2e7)]=function(){const _0x534794=_0x5b2ecf;return VisuMZ[_0x534794(0x11a)][_0x534794(0x151)][_0x534794(0x276)][_0x534794(0x450)];},Window_EquipSlot['prototype'][_0x5b2ecf(0x513)]=function(){const _0x4e85a6=_0x5b2ecf;if(this[_0x4e85a6(0x45e)]()&&this[_0x4e85a6(0x2ba)]&&SceneManager[_0x4e85a6(0x3f7)][_0x4e85a6(0x160)]===Scene_Equip){if(this[_0x4e85a6(0x368)]()&&TouchInput[_0x4e85a6(0xc6)]())this['onTouchSelectModernControls'](![]);else TouchInput['isTriggered']()&&this[_0x4e85a6(0x2bc)](!![]);if(TouchInput['isClicked']())this['onTouchOk']();else{if(TouchInput[_0x4e85a6(0x1ee)]()){const _0x41fe8e=VisuMZ[_0x4e85a6(0x11a)][_0x4e85a6(0x151)][_0x4e85a6(0x276)];this[_0x4e85a6(0x24d)]()&&this[_0x4e85a6(0x41d)]&&!_0x41fe8e['CommandAddOptimize']&&!_0x41fe8e[_0x4e85a6(0x26f)]?(SoundManager[_0x4e85a6(0x243)](),SceneManager[_0x4e85a6(0x1ec)]()):this[_0x4e85a6(0x1ae)]();}}}},Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x2bc)]=function(_0x1f1969){const _0x2c772e=_0x5b2ecf;this['_doubleTouch']=![];const _0x10d980=this[_0x2c772e(0x4f1)](),_0x50d1f4=this['hitIndex'](),_0x494de5=SceneManager['_scene']['_commandWindow'];if(_0x494de5[_0x2c772e(0x45e)]()&&_0x494de5[_0x2c772e(0x2ba)]){if(_0x50d1f4>=0x0)_0x50d1f4===this[_0x2c772e(0x4f1)]()&&(this[_0x2c772e(0xfa)]=!![]),this['activate'](),this[_0x2c772e(0x2a0)](_0x50d1f4),_0x494de5[_0x2c772e(0x24f)]();else _0x494de5[_0x2c772e(0x311)]()>=0x0&&(this['deactivate'](),this[_0x2c772e(0x436)](),_0x494de5[_0x2c772e(0x2c0)]());}_0x1f1969&&this[_0x2c772e(0x4f1)]()!==_0x10d980&&this[_0x2c772e(0x3dd)]();},Window_EquipSlot['prototype'][_0x5b2ecf(0x223)]=function(){const _0x5921c8=_0x5b2ecf;return this[_0x5921c8(0x4f1)]();},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x29b)]=Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x42e)],Window_EquipSlot[_0x5b2ecf(0x138)][_0x5b2ecf(0x42e)]=function(_0x36c803){const _0x10c6b4=_0x5b2ecf;if(this[_0x10c6b4(0x36b)]()<=0x0)return![];return VisuMZ[_0x10c6b4(0x11a)][_0x10c6b4(0x29b)][_0x10c6b4(0x4b6)](this,_0x36c803);},VisuMZ[_0x5b2ecf(0x11a)]['Window_EquipItem_includes']=Window_EquipItem[_0x5b2ecf(0x138)]['includes'],Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x4a1)]=function(_0x3d78a0){const _0x3e81d2=_0x5b2ecf;if(_0x3d78a0===null&&this[_0x3e81d2(0x3b1)]()[_0x3e81d2(0x4a1)](this[_0x3e81d2(0x355)]()))return![];else{$gameTemp[_0x3e81d2(0x2a6)]=!![];let _0x421023=VisuMZ[_0x3e81d2(0x11a)][_0x3e81d2(0x17d)][_0x3e81d2(0x4b6)](this,_0x3d78a0);if(!_0x421023&&_0x3d78a0&&DataManager[_0x3e81d2(0x4dc)](_0x3d78a0)){const _0x4c9767=_0x3d78a0['atypeId']||0x0;if(this[_0x3e81d2(0x3ed)]&&this[_0x3e81d2(0x3ed)]['isEquipAtypeOk'](_0x4c9767)){const _0x5ddc00=DataManager['getEtypeIDs'](_0x3d78a0);_0x5ddc00[_0x3e81d2(0x4a1)](this['etypeId']())&&(_0x421023=!![]);}}return $gameTemp[_0x3e81d2(0x2a6)]=undefined,_0x421023;}},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x482)]=Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x42e)],Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x42e)]=function(_0xf4bd8){const _0x2107e0=_0x5b2ecf;if(_0xf4bd8&&this[_0x2107e0(0x3ed)]){if(this[_0x2107e0(0x11c)](_0xf4bd8))return![];if(this[_0x2107e0(0x497)](_0xf4bd8))return![];if(this[_0x2107e0(0x253)](_0xf4bd8))return![];if(!this[_0x2107e0(0x3ed)][_0x2107e0(0x335)](_0xf4bd8))return![];}if(!_0xf4bd8)return!this['nonRemovableEtypes']()['includes'](this[_0x2107e0(0x355)]());return VisuMZ[_0x2107e0(0x11a)][_0x2107e0(0x482)][_0x2107e0(0x4b6)](this,_0xf4bd8);},Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x11c)]=function(_0x5b2743){const _0x2769ac=_0x5b2ecf,_0x2d241c=_0x5b2743[_0x2769ac(0x106)];if(_0x2d241c[_0x2769ac(0x3f2)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x4cec62=Number(RegExp['$1'])||0x1;let _0x5e2689=0x0;const _0x134584=this[_0x2769ac(0x3ed)][_0x2769ac(0x15a)](),_0x2e94e5=SceneManager[_0x2769ac(0x3f7)]['_slotWindow'][_0x2769ac(0x223)]();_0x134584[_0x2e94e5]=null;for(const _0x56cd19 of _0x134584){if(!_0x56cd19)continue;if(DataManager['isWeapon'](_0x5b2743)===DataManager[_0x2769ac(0xdc)](_0x56cd19)){if(_0x5b2743['id']===_0x56cd19['id'])_0x5e2689+=0x1;}}return _0x5e2689>=_0x4cec62;}else return![];},Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x497)]=function(_0xf9e03){const _0x371d7f=_0x5b2ecf;if(!DataManager['isWeapon'](_0xf9e03))return![];const _0x386ef3=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x249807=0x0;const _0x36fa98=this[_0x371d7f(0x3ed)][_0x371d7f(0x15a)](),_0xb54d6e=SceneManager[_0x371d7f(0x3f7)][_0x371d7f(0x22c)][_0x371d7f(0x223)]();_0x36fa98[_0xb54d6e]=null;for(const _0x523dcf of _0x36fa98){if(!_0x523dcf)continue;if(!DataManager[_0x371d7f(0xdc)](_0x523dcf))continue;if(_0xf9e03[_0x371d7f(0x283)]===_0x523dcf[_0x371d7f(0x283)]){_0x249807+=0x1;if(_0xf9e03['note'][_0x371d7f(0x3f2)](_0x386ef3)){const _0x3a76a7=Number(RegExp['$1'])||0x1;if(_0x249807>=_0x3a76a7)return!![];}if(_0x523dcf[_0x371d7f(0x106)][_0x371d7f(0x3f2)](_0x386ef3)){const _0x55aaae=Number(RegExp['$1'])||0x1;if(_0x249807>=_0x55aaae)return!![];}}}return![];},Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x253)]=function(_0x34efa5){const _0x273d7a=_0x5b2ecf;if(!DataManager['isArmor'](_0x34efa5))return![];const _0x364920=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x352ddc=0x0;const _0x6fc6f2=this['_actor'][_0x273d7a(0x15a)](),_0x965a13=SceneManager[_0x273d7a(0x3f7)][_0x273d7a(0x22c)][_0x273d7a(0x223)]();_0x6fc6f2[_0x965a13]=null;for(const _0x2d184d of _0x6fc6f2){if(!_0x2d184d)continue;if(!DataManager[_0x273d7a(0x4dc)](_0x2d184d))continue;if(_0x34efa5[_0x273d7a(0x22d)]===_0x2d184d[_0x273d7a(0x22d)]){_0x352ddc+=0x1;if(_0x34efa5[_0x273d7a(0x106)][_0x273d7a(0x3f2)](_0x364920)){const _0x288c10=Number(RegExp['$1'])||0x1;if(_0x352ddc>=_0x288c10)return!![];}if(_0x2d184d[_0x273d7a(0x106)][_0x273d7a(0x3f2)](_0x364920)){const _0x5d64f9=Number(RegExp['$1'])||0x1;if(_0x352ddc>=_0x5d64f9)return!![];}}}return![];},Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x3b1)]=function(){const _0x2612b8=_0x5b2ecf;return VisuMZ[_0x2612b8(0x11a)][_0x2612b8(0x151)][_0x2612b8(0x276)][_0x2612b8(0x292)];},Window_EquipItem[_0x5b2ecf(0x138)][_0x5b2ecf(0x468)]=function(_0x49a25c){const _0x2200ae=_0x5b2ecf,_0x4ba0aa=this[_0x2200ae(0x4b4)](_0x49a25c);_0x4ba0aa?Window_ItemList[_0x2200ae(0x138)][_0x2200ae(0x468)][_0x2200ae(0x4b6)](this,_0x49a25c):this[_0x2200ae(0xde)](_0x49a25c);},Window_EquipItem['prototype'][_0x5b2ecf(0xde)]=function(_0x2af836){const _0x207776=_0x5b2ecf;this[_0x207776(0x4ab)](this['isEnabled'](null));const _0x6ebe85=VisuMZ[_0x207776(0x11a)][_0x207776(0x151)][_0x207776(0x276)],_0x544568=this['itemLineRect'](_0x2af836),_0x3ab8b5=_0x544568['y']+(this[_0x207776(0x452)]()-ImageManager['iconHeight'])/0x2,_0x37f040=ImageManager['iconWidth']+0x4,_0xd1edfa=Math[_0x207776(0x3c2)](0x0,_0x544568[_0x207776(0x4b9)]-_0x37f040);this[_0x207776(0x140)](),this['drawIcon'](_0x6ebe85['RemoveEquipIcon'],_0x544568['x'],_0x3ab8b5),this['drawText'](_0x6ebe85[_0x207776(0xe9)],_0x544568['x']+_0x37f040,_0x544568['y'],_0xd1edfa),this['changePaintOpacity'](!![]);},Window_EquipItem['prototype']['updateHelp']=function(){const _0x271320=_0x5b2ecf;Window_ItemList[_0x271320(0x138)]['updateHelp']['call'](this);if(this['_actor']&&this['_statusWindow']&&this[_0x271320(0xef)]>=0x0){const _0x24f628=JsonEx[_0x271320(0x3b6)](this[_0x271320(0x3ed)]);_0x24f628[_0x271320(0x43b)]=!![],_0x24f628['forceChangeEquip'](this['_slotId'],this['item']()),this[_0x271320(0x13c)][_0x271320(0x33e)](_0x24f628);}},VisuMZ[_0x5b2ecf(0x11a)]['Window_ShopCommand_initialize']=Window_ShopCommand[_0x5b2ecf(0x138)]['initialize'],Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x170)]=function(_0x4b396a){const _0x530014=_0x5b2ecf;VisuMZ['ItemsEquipsCore']['Window_ShopCommand_initialize'][_0x530014(0x4b6)](this,_0x4b396a),this[_0x530014(0x492)](_0x4b396a);},Window_ShopCommand[_0x5b2ecf(0x138)]['createCommandNameWindow']=function(_0x18b840){const _0x369191=_0x5b2ecf,_0x97c729=new Rectangle(0x0,0x0,_0x18b840[_0x369191(0x4b9)],_0x18b840[_0x369191(0x42c)]);this['_commandNameWindow']=new Window_Base(_0x97c729),this[_0x369191(0x37c)][_0x369191(0x364)]=0x0,this['addChild'](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_ShopCommand['prototype']['callUpdateHelp']=function(){const _0x3e3621=_0x5b2ecf;Window_HorzCommand[_0x3e3621(0x138)][_0x3e3621(0x316)][_0x3e3621(0x4b6)](this);if(this['_commandNameWindow'])this[_0x3e3621(0x25c)]();},Window_ShopCommand[_0x5b2ecf(0x138)]['updateCommandNameWindow']=function(){const _0x3f16ae=_0x5b2ecf,_0x17adb9=this[_0x3f16ae(0x37c)];_0x17adb9[_0x3f16ae(0x146)][_0x3f16ae(0x290)]();const _0x17cec2=this['commandStyleCheck'](this[_0x3f16ae(0x4f1)]());if(_0x17cec2===_0x3f16ae(0x115)){const _0x3f01e4=this[_0x3f16ae(0x200)](this['index']());let _0x51110a=this[_0x3f16ae(0x26c)](this[_0x3f16ae(0x4f1)]());_0x51110a=_0x51110a['replace'](/\\I\[(\d+)\]/gi,''),_0x17adb9[_0x3f16ae(0x113)](),this[_0x3f16ae(0x293)](_0x51110a,_0x3f01e4),this[_0x3f16ae(0x14f)](_0x51110a,_0x3f01e4),this[_0x3f16ae(0x375)](_0x51110a,_0x3f01e4);}},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x293)]=function(_0x31e3f4,_0x449a59){},Window_ShopCommand[_0x5b2ecf(0x138)]['commandNameWindowDrawText']=function(_0x31d3b9,_0x304e85){const _0x1d7648=_0x5b2ecf,_0x52a65e=this[_0x1d7648(0x37c)];_0x52a65e[_0x1d7648(0x102)](_0x31d3b9,0x0,_0x304e85['y'],_0x52a65e[_0x1d7648(0x2f6)],_0x1d7648(0x1dc));},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x375)]=function(_0x59f54f,_0x4fba0a){const _0x307c17=_0x5b2ecf,_0x110c01=this[_0x307c17(0x37c)],_0x2c9a5f=$gameSystem[_0x307c17(0x1a2)](),_0xf93b7f=_0x4fba0a['x']+Math['floor'](_0x4fba0a['width']/0x2)+_0x2c9a5f;_0x110c01['x']=_0x110c01[_0x307c17(0x4b9)]/-0x2+_0xf93b7f,_0x110c01['y']=Math[_0x307c17(0x18c)](_0x4fba0a['height']/0x2);},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x4a4)]=function(){const _0x1edc08=_0x5b2ecf;return this[_0x1edc08(0xed)]?this[_0x1edc08(0xed)][_0x1edc08(0x3e7)]:0x3;},Window_ShopCommand[_0x5b2ecf(0x138)]['hideDisabledCommands']=function(){const _0x584d70=_0x5b2ecf;return VisuMZ[_0x584d70(0x11a)][_0x584d70(0x151)][_0x584d70(0x4a3)]['CmdHideDisabled'];},Window_ShopCommand[_0x5b2ecf(0x138)]['makeCommandList']=function(){const _0x14c593=_0x5b2ecf;this[_0x14c593(0x143)](),this[_0x14c593(0x22a)](),this[_0x14c593(0x168)]();},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x35a)]=function(){const _0x4d9fff=_0x5b2ecf;Window_HorzCommand[_0x4d9fff(0x138)][_0x4d9fff(0x35a)]['call'](this),this['refreshCursor']();},Window_ShopCommand[_0x5b2ecf(0x138)]['addBuyCommand']=function(){const _0x876a48=_0x5b2ecf,_0xd995f2=this[_0x876a48(0x2ad)](),_0x3eba1b=VisuMZ[_0x876a48(0x11a)][_0x876a48(0x151)][_0x876a48(0x4a3)][_0x876a48(0x4d4)],_0x4dd607=_0xd995f2===_0x876a48(0x2e5)?TextManager[_0x876a48(0x4d3)]:_0x876a48(0x268)[_0x876a48(0x350)](_0x3eba1b,TextManager['buy']),_0x26ae02=this[_0x876a48(0xf8)]();if(this[_0x876a48(0x2d1)]()&&!_0x26ae02)return;this[_0x876a48(0x2a4)](_0x4dd607,_0x876a48(0x4d3),_0x26ae02);},Window_ShopCommand[_0x5b2ecf(0x138)]['isBuyCommandEnabled']=function(){const _0x5a1c2d=_0x5b2ecf;return SceneManager[_0x5a1c2d(0x3f7)][_0x5a1c2d(0x160)]===Scene_Shop?SceneManager[_0x5a1c2d(0x3f7)]['_goodsCount']>0x0:!![];},Window_ShopCommand['prototype'][_0x5b2ecf(0x22a)]=function(){const _0x40d568=_0x5b2ecf,_0x5ef42c=this[_0x40d568(0x2ad)](),_0x2b666a=VisuMZ[_0x40d568(0x11a)][_0x40d568(0x151)][_0x40d568(0x4a3)][_0x40d568(0x40a)],_0x2d65a7=_0x5ef42c===_0x40d568(0x2e5)?TextManager['sell']:_0x40d568(0x268)[_0x40d568(0x350)](_0x2b666a,TextManager[_0x40d568(0x3fa)]),_0x2a8227=this[_0x40d568(0x4cd)]();if(this[_0x40d568(0x2d1)]()&&!_0x2a8227)return;this[_0x40d568(0x2a4)](_0x2d65a7,_0x40d568(0x3fa),_0x2a8227);},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x4cd)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x168)]=function(){const _0x355308=_0x5b2ecf,_0x1b6935=this[_0x355308(0x2ad)](),_0x1a22e9=VisuMZ[_0x355308(0x11a)][_0x355308(0x151)]['ShopScene'][_0x355308(0x286)],_0x41411c=VisuMZ[_0x355308(0x11a)][_0x355308(0x151)][_0x355308(0x4a3)][_0x355308(0x199)],_0x1e8307=_0x1b6935===_0x355308(0x2e5)?_0x41411c:_0x355308(0x268)[_0x355308(0x350)](_0x1a22e9,_0x41411c);this[_0x355308(0x2a4)](_0x1e8307,_0x355308(0x3cd));},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0xd6)]=function(){const _0x4bac64=_0x5b2ecf;return VisuMZ[_0x4bac64(0x11a)]['Settings'][_0x4bac64(0x4a3)][_0x4bac64(0x152)];},Window_ShopCommand['prototype'][_0x5b2ecf(0x468)]=function(_0x19011d){const _0x52be64=_0x5b2ecf,_0x4c7c2d=this['commandStyleCheck'](_0x19011d);if(_0x4c7c2d==='iconText')this['drawItemStyleIconText'](_0x19011d);else _0x4c7c2d==='icon'?this[_0x52be64(0x35c)](_0x19011d):Window_HorzCommand[_0x52be64(0x138)]['drawItem']['call'](this,_0x19011d);},Window_ShopCommand['prototype']['commandStyle']=function(){const _0xf7885c=_0x5b2ecf;return VisuMZ[_0xf7885c(0x11a)][_0xf7885c(0x151)][_0xf7885c(0x4a3)][_0xf7885c(0x13b)];},Window_ShopCommand[_0x5b2ecf(0x138)][_0x5b2ecf(0x510)]=function(_0x47000c){const _0x35ebaf=_0x5b2ecf;if(_0x47000c<0x0)return _0x35ebaf(0x2e5);const _0x3f0402=this[_0x35ebaf(0x2ad)]();if(_0x3f0402!==_0x35ebaf(0x45b))return _0x3f0402;else{if(this[_0x35ebaf(0x36b)]()>0x0){const _0x3faac9=this[_0x35ebaf(0x26c)](_0x47000c);if(_0x3faac9[_0x35ebaf(0x3f2)](/\\I\[(\d+)\]/i)){const _0x2bf5f5=this[_0x35ebaf(0x200)](_0x47000c),_0x1b487c=this['textSizeEx'](_0x3faac9)[_0x35ebaf(0x4b9)];return _0x1b487c<=_0x2bf5f5[_0x35ebaf(0x4b9)]?_0x35ebaf(0x45a):_0x35ebaf(0x115);}}}return _0x35ebaf(0x2e5);},Window_ShopCommand['prototype'][_0x5b2ecf(0x201)]=function(_0xc64a4){const _0x39e824=_0x5b2ecf,_0xd35378=this[_0x39e824(0x200)](_0xc64a4),_0x52a528=this[_0x39e824(0x26c)](_0xc64a4),_0x55c3b5=this[_0x39e824(0x10f)](_0x52a528)[_0x39e824(0x4b9)];this[_0x39e824(0x4ab)](this['isCommandEnabled'](_0xc64a4));const _0x96aec9=this[_0x39e824(0xd6)]();if(_0x96aec9==='right')this['drawTextEx'](_0x52a528,_0xd35378['x']+_0xd35378[_0x39e824(0x4b9)]-_0x55c3b5,_0xd35378['y'],_0x55c3b5);else{if(_0x96aec9===_0x39e824(0x1dc)){const _0x216deb=_0xd35378['x']+Math['floor']((_0xd35378['width']-_0x55c3b5)/0x2);this[_0x39e824(0x47d)](_0x52a528,_0x216deb,_0xd35378['y'],_0x55c3b5);}else this[_0x39e824(0x47d)](_0x52a528,_0xd35378['x'],_0xd35378['y'],_0x55c3b5);}},Window_ShopCommand[_0x5b2ecf(0x138)]['drawItemStyleIcon']=function(_0xb903dc){const _0x2044bd=_0x5b2ecf;this['commandName'](_0xb903dc)[_0x2044bd(0x3f2)](/\\I\[(\d+)\]/i);const _0x567b06=Number(RegExp['$1'])||0x0,_0xac8467=this[_0x2044bd(0x200)](_0xb903dc),_0x8ed215=_0xac8467['x']+Math[_0x2044bd(0x18c)]((_0xac8467[_0x2044bd(0x4b9)]-ImageManager[_0x2044bd(0x1e1)])/0x2),_0x1eef8f=_0xac8467['y']+(_0xac8467[_0x2044bd(0x42c)]-ImageManager[_0x2044bd(0xf2)])/0x2;this[_0x2044bd(0x1b7)](_0x567b06,_0x8ed215,_0x1eef8f);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x50a)]=Window_ShopBuy['prototype']['refresh'],Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x35a)]=function(){const _0x42425a=_0x5b2ecf;this[_0x42425a(0x2e4)](),VisuMZ[_0x42425a(0x11a)][_0x42425a(0x50a)]['call'](this);},Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x2e4)]=function(){const _0x3878b0=_0x5b2ecf;SceneManager[_0x3878b0(0x3f7)]['constructor']===Scene_Shop&&(this[_0x3878b0(0x250)]=SceneManager[_0x3878b0(0x3f7)][_0x3878b0(0x3a6)]());},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0xd7)]=Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x3fd)],Window_ShopBuy['prototype']['price']=function(_0x383a3c){const _0x9bf0e7=_0x5b2ecf;if(!_0x383a3c)return 0x0;let _0x404795=VisuMZ[_0x9bf0e7(0x11a)][_0x9bf0e7(0xd7)][_0x9bf0e7(0x4b6)](this,_0x383a3c);return Math['max'](0x0,this[_0x9bf0e7(0x2d9)](_0x383a3c,_0x404795));},Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x2d9)]=function(_0x102f6e,_0x14489c){const _0x416081=_0x5b2ecf,_0x1c6c0c=_0x102f6e[_0x416081(0x106)]||'';if(_0x1c6c0c[_0x416081(0x3f2)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x353b52=String(RegExp['$1']);window[_0x416081(0x3fd)]=_0x14489c,window[_0x416081(0x334)]=_0x102f6e;try{eval(_0x353b52);}catch(_0x14ea00){if($gameTemp[_0x416081(0x384)]())console[_0x416081(0x265)](_0x14ea00);}_0x14489c=window['price'],window[_0x416081(0x3fd)]=undefined,window[_0x416081(0x334)]=undefined;}_0x14489c=VisuMZ[_0x416081(0x11a)][_0x416081(0x151)][_0x416081(0x4a3)][_0x416081(0x219)][_0x416081(0x4b6)](this,_0x102f6e,_0x14489c);if(isNaN(_0x14489c))_0x14489c=0x0;return Math[_0x416081(0x18c)](_0x14489c);},VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x489)]=Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x288)],Window_ShopBuy[_0x5b2ecf(0x138)]['goodsToItem']=function(_0x2fffbb){const _0x4702ed=_0x5b2ecf,_0xb8bdcc=VisuMZ['ItemsEquipsCore'][_0x4702ed(0x489)]['call'](this,_0x2fffbb);return _0xb8bdcc&&!this[_0x4702ed(0x3f9)](_0xb8bdcc)?null:_0xb8bdcc;},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x2fd)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy[_0x5b2ecf(0x138)]['meetsShopListingConditions']=function(_0x5e904f){const _0x355db0=_0x5b2ecf;if(!_0x5e904f)return![];const _0x105029=VisuMZ[_0x355db0(0x11a)][_0x355db0(0x2fd)],_0x1850fe=_0x5e904f?_0x5e904f[_0x355db0(0x106)]||'':'';if(_0x1850fe[_0x355db0(0x3f2)](_0x105029[_0x355db0(0x2ed)])){const _0x16aa02=String(RegExp['$1'])[_0x355db0(0x406)](',')[_0x355db0(0x4ec)](_0x20f6c2=>Number(_0x20f6c2));if(_0x16aa02[_0x355db0(0x233)](_0x499f58=>!$gameSwitches[_0x355db0(0x12c)](_0x499f58)))return![];}if(_0x1850fe[_0x355db0(0x3f2)](_0x105029[_0x355db0(0x380)])){const _0x1c9ccf=String(RegExp['$1'])['split'](',')[_0x355db0(0x4ec)](_0x1dbcd8=>Number(_0x1dbcd8));if(_0x1c9ccf[_0x355db0(0x360)](_0x4edc1a=>!$gameSwitches['value'](_0x4edc1a)))return![];}if(_0x1850fe[_0x355db0(0x3f2)](_0x105029['HideAllSwitches'])){const _0x53795c=String(RegExp['$1'])[_0x355db0(0x406)](',')[_0x355db0(0x4ec)](_0x8a4ded=>Number(_0x8a4ded));if(_0x53795c['every'](_0x11cc32=>$gameSwitches[_0x355db0(0x12c)](_0x11cc32)))return![];}if(_0x1850fe['match'](_0x105029['HideAnySwitches'])){const _0x17ce5e=String(RegExp['$1'])['split'](',')[_0x355db0(0x4ec)](_0x42696c=>Number(_0x42696c));if(_0x17ce5e['some'](_0x5742cd=>$gameSwitches[_0x355db0(0x12c)](_0x5742cd)))return![];}return!![];},Window_ShopBuy['prototype'][_0x5b2ecf(0x468)]=function(_0x4209df){const _0x3bed79=_0x5b2ecf;this[_0x3bed79(0x113)]();const _0x1f9437=this['itemAt'](_0x4209df),_0x1a8d21=this[_0x3bed79(0x200)](_0x4209df),_0x4222a=_0x1a8d21[_0x3bed79(0x4b9)];this[_0x3bed79(0x4ab)](this['isEnabled'](_0x1f9437)),this[_0x3bed79(0x21a)](_0x1f9437,_0x1a8d21['x'],_0x1a8d21['y'],_0x4222a),this['drawItemCost'](_0x1f9437,_0x1a8d21),this[_0x3bed79(0x4ab)](!![]);},Window_ShopBuy[_0x5b2ecf(0x138)][_0x5b2ecf(0x4e1)]=function(_0x3229b2,_0x416579){const _0x106a3d=_0x5b2ecf,_0x231985=this[_0x106a3d(0x3fd)](_0x3229b2);this[_0x106a3d(0x326)](_0x231985,TextManager[_0x106a3d(0x19b)],_0x416579['x'],_0x416579['y'],_0x416579[_0x106a3d(0x4b9)]);},Window_ShopSell[_0x5b2ecf(0x138)][_0x5b2ecf(0x4a4)]=function(){const _0x151d78=_0x5b2ecf;return SceneManager[_0x151d78(0x3f7)]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ['ItemsEquipsCore']['Window_ShopSell_isEnabled']=Window_ShopSell[_0x5b2ecf(0x138)]['isEnabled'],Window_ShopSell['prototype'][_0x5b2ecf(0x42e)]=function(_0x5e469f){const _0x3fb2ce=_0x5b2ecf;if(!_0x5e469f)return![];const _0x426723=_0x5e469f['note'];if(_0x426723[_0x3fb2ce(0x3f2)](/<CANNOT SELL>/i))return![];if(_0x426723[_0x3fb2ce(0x3f2)](/<CAN SELL>/i))return!![];if(_0x426723['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2118bb=JSON['parse']('['+RegExp['$1'][_0x3fb2ce(0x3f2)](/\d+/g)+']');for(const _0x5001f8 of _0x2118bb){if(!$gameSwitches['value'](_0x5001f8))return![];}}if(_0x426723['match'](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f23b5=JSON[_0x3fb2ce(0x17f)]('['+RegExp['$1'][_0x3fb2ce(0x3f2)](/\d+/g)+']');for(const _0x3eb875 of _0x3f23b5){if(!$gameSwitches[_0x3fb2ce(0x12c)](_0x3eb875))return![];}}if(_0x426723[_0x3fb2ce(0x3f2)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f17a2=JSON[_0x3fb2ce(0x17f)]('['+RegExp['$1'][_0x3fb2ce(0x3f2)](/\d+/g)+']');for(const _0x389287 of _0x5f17a2){if($gameSwitches[_0x3fb2ce(0x12c)](_0x389287))return![];}}return VisuMZ['ItemsEquipsCore'][_0x3fb2ce(0x2f0)][_0x3fb2ce(0x4b6)](this,_0x5e469f);},Window_ShopStatus['EQUIP_DELAY_MS']=VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x151)][_0x5b2ecf(0x35d)][_0x5b2ecf(0x1dd)]??0xf0,VisuMZ[_0x5b2ecf(0x11a)][_0x5b2ecf(0x210)]=Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x40c)],Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x40c)]=function(_0x49997e){const _0x1d4cdf=_0x5b2ecf;_0x49997e=DataManager[_0x1d4cdf(0x4e9)](_0x49997e),DataManager['isWeapon'](_0x49997e)||DataManager[_0x1d4cdf(0x4dc)](_0x49997e)?this['setItemDelay'](_0x49997e):VisuMZ[_0x1d4cdf(0x11a)][_0x1d4cdf(0x210)][_0x1d4cdf(0x4b6)](this,_0x49997e);},Window_ShopStatus['prototype']['setItemDelay']=function(_0x9b1010){const _0x22762a=_0x5b2ecf;this[_0x22762a(0x23b)]=_0x9b1010;const _0x1801f2=Window_ShopStatus['EQUIP_DELAY_MS'];setTimeout(this[_0x22762a(0x414)]['bind'](this,_0x9b1010),_0x1801f2);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x414)]=function(_0x28cc47){const _0x510bf7=_0x5b2ecf;this[_0x510bf7(0x23b)]===_0x28cc47&&this[_0x510bf7(0x35a)]();},Window_ShopStatus['prototype'][_0x5b2ecf(0x192)]=function(){return![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x142)]=function(){const _0x43704c=_0x5b2ecf;Window_StatusBase[_0x43704c(0x138)]['loadFaceImages'][_0x43704c(0x4b6)](this);for(const _0x447c20 of $gameParty[_0x43704c(0x32d)]()){ImageManager[_0x43704c(0x205)](_0x447c20[_0x43704c(0x317)]());}},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x162)]=function(){const _0x2fb632=_0x5b2ecf;return VisuMZ[_0x2fb632(0x11a)]['Settings'][_0x2fb632(0x35d)]['Translucent'];},Window_ShopStatus[_0x5b2ecf(0x138)]['refresh']=function(){const _0xe36eb1=_0x5b2ecf;this[_0xe36eb1(0x146)][_0xe36eb1(0x290)](),this['contentsBack'][_0xe36eb1(0x290)](),this[_0xe36eb1(0x23b)]&&(this[_0xe36eb1(0x113)](),this['changePaintOpacity'](!![]),this[_0xe36eb1(0x474)](),this[_0xe36eb1(0x476)]()?this[_0xe36eb1(0x1c7)]():this['drawItemData'](),this[_0xe36eb1(0x1b9)]());},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x349)]=function(_0x56afab,_0xadc2e1){const _0x228e4b=_0x5b2ecf;if(!this[_0x228e4b(0x476)]()&&!DataManager[_0x228e4b(0x2d4)](this['_item']))return;const _0x294211=this[_0x228e4b(0x2f6)]-this[_0x228e4b(0x2a7)]()-_0x56afab,_0x5b4ea5=this[_0x228e4b(0x15e)](_0x228e4b(0x32f));this['changeTextColor'](ColorManager[_0x228e4b(0x10d)]()),this[_0x228e4b(0x102)](TextManager[_0x228e4b(0x156)],_0x56afab+this['itemPadding'](),_0xadc2e1,_0x294211-_0x5b4ea5),this[_0x228e4b(0x140)](),this[_0x228e4b(0x3c3)](this[_0x228e4b(0x23b)],_0x56afab,_0xadc2e1,_0x294211);},Window_ShopStatus['prototype']['drawItemDarkRect']=function(_0x1a2afc,_0x25abf9,_0x1e2219,_0x2cf783,_0x338c97){const _0xc56704=_0x5b2ecf;if(VisuMZ[_0xc56704(0x11a)]['Settings'][_0xc56704(0x35d)][_0xc56704(0x178)]===![])return;_0x338c97=Math[_0xc56704(0x3c2)](_0x338c97||0x1,0x1);while(_0x338c97--){_0x2cf783=_0x2cf783||this[_0xc56704(0x452)](),this[_0xc56704(0x153)][_0xc56704(0x21c)]=0xa0;const _0x15279c=ColorManager['getItemsEquipsCoreBackColor1']();this[_0xc56704(0x153)][_0xc56704(0x442)](_0x1a2afc+0x1,_0x25abf9+0x1,_0x1e2219-0x2,_0x2cf783-0x2,_0x15279c),this[_0xc56704(0x153)][_0xc56704(0x21c)]=0xff;}},ColorManager[_0x5b2ecf(0x36a)]=function(){const _0x1f8ed3=_0x5b2ecf,_0x2dec81=VisuMZ[_0x1f8ed3(0x11a)][_0x1f8ed3(0x151)][_0x1f8ed3(0x35d)];let _0x943cda=_0x2dec81[_0x1f8ed3(0x458)]!==undefined?_0x2dec81[_0x1f8ed3(0x458)]:0x13;return ColorManager['getColor'](_0x943cda);},Window_ShopStatus['prototype'][_0x5b2ecf(0x1c7)]=function(){const _0x2cb74f=_0x5b2ecf,_0x4acc7a=this['getEquipDataStyle']();if(_0x4acc7a===_0x2cb74f(0x2db))this[_0x2cb74f(0x464)]();else _0x4acc7a===_0x2cb74f(0x3f6)?this[_0x2cb74f(0x2bb)]():this[_0x2cb74f(0x4e2)]();},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4f8)]=function(){const _0x3f3953=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x3f3953(0x151)][_0x3f3953(0x35d)][_0x3f3953(0x512)]??'compare';},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x464)]=function(){const _0xb86927=_0x5b2ecf;this[_0xb86927(0x43b)]=null;if(VisuMZ[_0xb86927(0x11a)][_0xb86927(0x151)]['StatusWindow'][_0xb86927(0xe4)]){VisuMZ[_0xb86927(0x11a)][_0xb86927(0x151)][_0xb86927(0x35d)][_0xb86927(0xe4)][_0xb86927(0x4b6)](this);return;}const _0x3887d0=this['lineHeight'](),_0x232345=this[_0xb86927(0x495)]()+0x8;let _0x2ead9e=0x0,_0x16eea3=0x0,_0x4010cd=this[_0xb86927(0x2f6)],_0x2f28ca=this[_0xb86927(0x500)],_0x59559d=Math[_0xb86927(0x18c)](_0x4010cd/0x2),_0x464be6=_0x2ead9e+_0x4010cd-_0x59559d;this['drawItemName'](this[_0xb86927(0x23b)],_0x2ead9e+this['itemPadding'](),_0x16eea3,_0x4010cd-this[_0xb86927(0x2a7)]()*0x2),this[_0xb86927(0x236)](_0x2ead9e,_0x16eea3,_0x4010cd),_0x16eea3+=_0x3887d0;if(this[_0xb86927(0x13e)](_0x2ead9e,_0x16eea3,_0x59559d))_0x16eea3+=0x0;if(this[_0xb86927(0x269)](_0x464be6,_0x16eea3,_0x59559d))_0x16eea3+=_0x3887d0;const _0x5751bf=this[_0xb86927(0x39f)](),_0x59865f=_0x16eea3;_0x16eea3=_0x2f28ca-_0x5751bf['length']*_0x232345-0x4;let _0x3f28cc=_0x2ead9e,_0xb808aa=0x0,_0x5709d0=_0x16eea3;for(const _0x28b825 of _0x5751bf){_0xb808aa=Math[_0xb86927(0x3c2)](this[_0xb86927(0x2ae)](_0x28b825,_0x2ead9e+0x4,_0x16eea3+0x4,_0x4010cd),_0xb808aa),_0x16eea3+=_0x232345;}const _0x939052=$gameParty['maxBattleMembers'](),_0x54c09f=Math[_0xb86927(0x18c)]((_0x4010cd-_0xb808aa)/_0x939052);_0xb808aa=_0x4010cd-_0x54c09f*_0x939052;for(const _0x3de316 of $gameParty[_0xb86927(0x4b2)]()){const _0xa00686=$gameParty['battleMembers']()['indexOf'](_0x3de316),_0x20d2ed=_0x3f28cc+_0xb808aa+_0xa00686*_0x54c09f;this[_0xb86927(0x4ab)](_0x3de316['canEquip'](this[_0xb86927(0x23b)])),this[_0xb86927(0x2da)](_0x3de316,_0x20d2ed+_0x54c09f/0x2,_0x5709d0);let _0x3155e0=_0x5709d0;for(const _0x19cedd of _0x5751bf){const _0x39518e=_0x3155e0-(_0x3887d0-_0x232345)/0x2;this[_0xb86927(0x3ce)](_0x3de316,_0x19cedd,_0x20d2ed,_0x39518e,_0x54c09f),_0x3155e0+=_0x232345;}}this[_0xb86927(0x236)](_0x3f28cc,_0x59865f,_0xb808aa,_0x5709d0-_0x59865f);for(let _0x397cc1=0x0;_0x397cc1<_0x939052;_0x397cc1++){const _0x445f2c=_0x3f28cc+_0xb808aa+_0x397cc1*_0x54c09f;this[_0xb86927(0x236)](_0x445f2c,_0x59865f,_0x54c09f,_0x5709d0-_0x59865f);}for(const _0x68cbdb of _0x5751bf){this[_0xb86927(0x236)](_0x3f28cc,_0x5709d0,_0xb808aa,_0x232345);for(let _0x2ee4dd=0x0;_0x2ee4dd<_0x939052;_0x2ee4dd++){const _0x2ff26e=_0x3f28cc+_0xb808aa+_0x2ee4dd*_0x54c09f;this['drawItemDarkRect'](_0x2ff26e,_0x5709d0,_0x54c09f,_0x232345);}_0x5709d0+=_0x232345;}},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4e2)]=function(){const _0x3b0752=_0x5b2ecf;this[_0x3b0752(0x43b)]=null;if(VisuMZ[_0x3b0752(0x11a)][_0x3b0752(0x151)]['StatusWindow']['DrawEquipClassicData']){VisuMZ[_0x3b0752(0x11a)][_0x3b0752(0x151)][_0x3b0752(0x35d)][_0x3b0752(0x28e)]['call'](this);return;}const _0x1ea73a=this[_0x3b0752(0x452)]();let _0x2c5de9=0x0,_0xee5270=0x0,_0x5caa11=this[_0x3b0752(0x2f6)],_0x432b5=this['innerHeight'],_0x171325=Math[_0x3b0752(0x18c)](_0x5caa11/0x2),_0x606006=_0x2c5de9+_0x5caa11-_0x171325;this[_0x3b0752(0x21a)](this['_item'],_0x2c5de9+this[_0x3b0752(0x2a7)](),_0xee5270,_0x5caa11-this[_0x3b0752(0x2a7)]()*0x2),this[_0x3b0752(0x236)](_0x2c5de9,_0xee5270,_0x5caa11),_0xee5270+=_0x1ea73a;if(this[_0x3b0752(0x13e)](_0x2c5de9,_0xee5270,_0x171325))_0xee5270+=0x0;if(this['drawItemQuantity'](_0x606006,_0xee5270,_0x171325))_0xee5270+=_0x1ea73a;if(this['drawItemEquipSubType'](_0x2c5de9,_0xee5270,_0x5caa11))_0xee5270+=_0x1ea73a;const _0x225274=this['actorParams']();for(const _0x39873f of _0x225274){if(this['isCustomParameter'](_0x39873f))continue;this[_0x3b0752(0x2d5)](_0x39873f,_0x2c5de9,_0xee5270,_0x5caa11),_0xee5270+=_0x1ea73a;}_0xee5270=this[_0x3b0752(0x404)](_0x2c5de9,_0xee5270,_0x5caa11),this[_0x3b0752(0x236)](_0x2c5de9,_0xee5270,_0x5caa11,_0x432b5-_0xee5270);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x2bb)]=function(){const _0x34efa1=_0x5b2ecf;this[_0x34efa1(0x43b)]=null;if(VisuMZ['ItemsEquipsCore'][_0x34efa1(0x151)][_0x34efa1(0x35d)]['DrawEquipDoubleData']){VisuMZ[_0x34efa1(0x11a)]['Settings'][_0x34efa1(0x35d)][_0x34efa1(0x2be)]['call'](this);return;}const _0x1f345f=this[_0x34efa1(0x452)]();let _0x34bf1a=0x0,_0x581728=0x0,_0x46c87c=this['innerWidth'],_0x490ac3=this[_0x34efa1(0x500)],_0x4c74b4=Math[_0x34efa1(0x18c)](_0x46c87c/0x2),_0x2d329e=_0x34bf1a+_0x46c87c-_0x4c74b4;this['drawItemName'](this[_0x34efa1(0x23b)],_0x34bf1a+this[_0x34efa1(0x2a7)](),_0x581728,_0x46c87c-this['itemPadding']()*0x2),this[_0x34efa1(0x236)](_0x34bf1a,_0x581728,_0x46c87c),_0x581728+=_0x1f345f;if(this[_0x34efa1(0x13e)](_0x34bf1a,_0x581728,_0x4c74b4))_0x581728+=0x0;if(this[_0x34efa1(0x269)](_0x2d329e,_0x581728,_0x4c74b4))_0x581728+=_0x1f345f;if(this[_0x34efa1(0x4c4)](_0x34bf1a,_0x581728,_0x46c87c))_0x581728+=_0x1f345f;const _0x1e4ec9=this[_0x34efa1(0x39f)]();for(const _0x206a72 of _0x1e4ec9){if(this[_0x34efa1(0xf9)](_0x206a72))continue;this[_0x34efa1(0x2d5)](_0x206a72,_0x34bf1a,_0x581728,_0x4c74b4),_0x34bf1a===_0x4c74b4?(_0x581728+=_0x1f345f,_0x34bf1a=0x0):_0x34bf1a=_0x4c74b4;}_0x34bf1a===_0x4c74b4&&(this[_0x34efa1(0x236)](_0x4c74b4,_0x581728,_0x4c74b4,_0x1f345f),_0x581728+=_0x1f345f,_0x34bf1a=0x0),_0x581728=this[_0x34efa1(0x404)](_0x34bf1a,_0x581728,_0x46c87c),this[_0x34efa1(0x236)](_0x34bf1a,_0x581728,_0x46c87c,_0x490ac3-_0x581728);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x13e)]=function(_0x45b39c,_0x2bbff1,_0x514312){const _0x4fa509=_0x5b2ecf;if(!this[_0x4fa509(0x476)]())return![];const _0xfe5e57=$dataSystem[_0x4fa509(0x172)][this[_0x4fa509(0x23b)][_0x4fa509(0x355)]];return this[_0x4fa509(0xd0)](_0xfe5e57,_0x45b39c,_0x2bbff1,_0x514312,!![]),this[_0x4fa509(0x236)](_0x45b39c,_0x2bbff1,_0x514312),this[_0x4fa509(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4c4)]=function(_0xec1ddc,_0x588a43,_0x180057){const _0x36c554=_0x5b2ecf;if(!this['isEquipItem']())return![];let _0x97daa3='',_0x1c966f='';const _0x5ec3f2=VisuMZ['ItemsEquipsCore']['Settings'][_0x36c554(0x35d)];return DataManager[_0x36c554(0xdc)](this[_0x36c554(0x23b)])?(_0x97daa3=_0x5ec3f2[_0x36c554(0x139)]??'Weapon\x20Type',_0x1c966f=$dataSystem[_0x36c554(0x509)][this[_0x36c554(0x23b)][_0x36c554(0x283)]]||_0x5ec3f2['NoEquipTypeResult']||'-'):(_0x97daa3=_0x5ec3f2['ArmorType']??_0x36c554(0x3ff),_0x1c966f=$dataSystem[_0x36c554(0x4e3)][this[_0x36c554(0x23b)]['atypeId']]||_0x5ec3f2[_0x36c554(0x248)]||'-'),this['drawItemKeyData'](_0x97daa3,_0xec1ddc,_0x588a43,_0x180057,!![]),this['drawItemKeyData'](_0x1c966f,_0xec1ddc,_0x588a43,_0x180057,![],_0x36c554(0x3ac)),this[_0x36c554(0x236)](_0xec1ddc,_0x588a43,_0x180057),this[_0x36c554(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)]['getItemQuantityText']=function(){const _0x2952c0=_0x5b2ecf,_0x445a40=VisuMZ[_0x2952c0(0x11a)][_0x2952c0(0x151)]['ItemScene']['ItemQuantityFmt'];return _0x445a40[_0x2952c0(0x350)]($gameParty['numItems'](this['_item']));},Window_ShopStatus[_0x5b2ecf(0x138)]['actorParams']=function(){const _0x49d65b=_0x5b2ecf;let _0x55ca54=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0x49d65b(0x1d2)]){_0x55ca54=VisuMZ[_0x49d65b(0xc8)]['Settings'][_0x49d65b(0x2d3)][_0x49d65b(0x383)];const _0x318853=VisuMZ[_0x49d65b(0x11a)]['Settings'][_0x49d65b(0x35d)];if(this[_0x49d65b(0x4f8)]()===_0x49d65b(0x321)){if(DataManager[_0x49d65b(0xdc)](this[_0x49d65b(0x23b)]))_0x55ca54=_0x55ca54[_0x49d65b(0x35f)](_0x318853[_0x49d65b(0x3d7)]||[]);if(DataManager['isArmor'](this[_0x49d65b(0x23b)]))_0x55ca54=_0x55ca54[_0x49d65b(0x35f)](_0x318853[_0x49d65b(0x1f5)]||[]);}else{if(this[_0x49d65b(0x4f8)]()===_0x49d65b(0x3f6)){if(DataManager[_0x49d65b(0xdc)](this[_0x49d65b(0x23b)]))_0x55ca54=_0x55ca54[_0x49d65b(0x35f)](_0x318853[_0x49d65b(0x4e5)]||[]);if(DataManager['isArmor'](this[_0x49d65b(0x23b)]))_0x55ca54=_0x55ca54['concat'](_0x318853['DoubleArmorParameters']||[]);}}}return _0x55ca54=_0x55ca54[_0x49d65b(0x4ec)](_0x2fe2ff=>typeof _0x2fe2ff==='number'?_0x2fe2ff:_0x2fe2ff[_0x49d65b(0x505)]()[_0x49d65b(0xe8)]()),_0x55ca54;},Window_ShopStatus['prototype'][_0x5b2ecf(0x3e8)]=function(){const _0x5defcc=_0x5b2ecf;return VisuMZ[_0x5defcc(0x11a)][_0x5defcc(0x151)]['StatusWindow'][_0x5defcc(0x3ab)];},Window_ShopStatus['prototype']['drawParamName']=function(_0x353509,_0x177c4a,_0x3e49ab,_0xb27bfb){const _0x4df15f=_0x5b2ecf;this[_0x4df15f(0x113)](),this[_0x4df15f(0x146)][_0x4df15f(0x31b)]=this[_0x4df15f(0x3e8)]();let _0x369a95=this[_0x4df15f(0x15e)](TextManager[_0x4df15f(0x249)](_0x353509))+0x4+_0x177c4a;return Imported[_0x4df15f(0x1d2)]?(this[_0x4df15f(0x2d2)](_0x177c4a,_0x3e49ab,_0xb27bfb,_0x353509,!![]),VisuMZ[_0x4df15f(0xc8)][_0x4df15f(0x151)][_0x4df15f(0x2d3)][_0x4df15f(0x367)]&&(_0x369a95+=ImageManager['iconWidth']+0x4)):(this[_0x4df15f(0x4bc)](ColorManager['systemColor']()),this[_0x4df15f(0x102)](TextManager[_0x4df15f(0x249)](_0x353509),_0x177c4a,_0x3e49ab,_0xb27bfb)),this[_0x4df15f(0x113)](),_0x369a95;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3ce)]=function(_0x5382e1,_0x293484,_0x5ac125,_0x128042,_0x52fc27){const _0xfaa477=_0x5b2ecf;_0x5ac125+=this[_0xfaa477(0x2a7)](),_0x52fc27-=this['itemPadding']()*0x2;const _0x2dc107=VisuMZ[_0xfaa477(0x11a)][_0xfaa477(0x151)][_0xfaa477(0x35d)];this[_0xfaa477(0x146)][_0xfaa477(0x31b)]=_0x2dc107[_0xfaa477(0x3ab)],this[_0xfaa477(0x4ab)](_0x5382e1[_0xfaa477(0x335)](this[_0xfaa477(0x23b)]));if(_0x5382e1[_0xfaa477(0x1a0)](this[_0xfaa477(0x23b)])&&!_0x5382e1[_0xfaa477(0x1cb)](this[_0xfaa477(0x23b)])){const _0x2eeba1=_0x2dc107[_0xfaa477(0x1b3)];this[_0xfaa477(0x102)](_0x2eeba1,_0x5ac125,_0x128042,_0x52fc27,_0xfaa477(0x1dc));}else{if(_0x5382e1[_0xfaa477(0x335)](this[_0xfaa477(0x23b)])){const _0x5d8624=this[_0xfaa477(0x3b7)](_0x5382e1);let _0x2b2208=0x0,_0x5bfcfa=0x0,_0x4c5643=0x0;Imported[_0xfaa477(0x1d2)]?(_0x2b2208=_0x5d8624[_0xfaa477(0x40d)](_0x293484),_0x5bfcfa=_0x2b2208-_0x5382e1[_0xfaa477(0x40d)](_0x293484),this[_0xfaa477(0x4bc)](ColorManager[_0xfaa477(0x3d9)](_0x5bfcfa)),_0x4c5643=(_0x5bfcfa>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x5bfcfa,0x0,_0x293484)):(_0x2b2208=_0x5d8624[_0xfaa477(0x249)](_0x293484),_0x5bfcfa=_0x2b2208-_0x5382e1['param'](_0x293484),this['changeTextColor'](ColorManager[_0xfaa477(0x3d9)](_0x5bfcfa)),_0x4c5643=(_0x5bfcfa>=0x0?'+':'')+_0x5bfcfa),_0x4c5643==='+0'&&(_0x4c5643=_0x2dc107['NoChangeMarker']),this[_0xfaa477(0x102)](_0x4c5643,_0x5ac125,_0x128042,_0x52fc27,_0xfaa477(0x1dc));}else{const _0x18945c=_0x2dc107[_0xfaa477(0x259)];this[_0xfaa477(0x102)](_0x18945c,_0x5ac125,_0x128042,_0x52fc27,'center');}}this[_0xfaa477(0x113)](),this['changePaintOpacity'](!![]);},Window_ShopStatus[_0x5b2ecf(0x138)]['createTempActorEquips']=function(_0x2daf15){const _0x265bc2=_0x5b2ecf;if(this['needsNewTempActor'](_0x2daf15)){const _0x3545a1=JsonEx[_0x265bc2(0x3b6)](_0x2daf15);_0x3545a1[_0x265bc2(0x43b)]=!![];const _0xb09505=_0x3545a1['getEmptyEquipSlotOfSameEtype'](this[_0x265bc2(0x23b)]);_0xb09505>=0x0&&_0x3545a1[_0x265bc2(0x252)](_0xb09505,this[_0x265bc2(0x23b)]),this['_tempActor']=_0x3545a1;}return this[_0x265bc2(0x43b)];},Window_ShopStatus['prototype'][_0x5b2ecf(0x179)]=function(_0x36756f){const _0x1336e6=_0x5b2ecf;if(!this[_0x1336e6(0x43b)])return!![];return this[_0x1336e6(0x43b)][_0x1336e6(0x401)]()!==_0x36756f[_0x1336e6(0x401)]();},Game_Actor[_0x5b2ecf(0x138)]['anyEmptyEquipSlotsOfSameEtype']=function(_0x45dab1){const _0x472d77=_0x5b2ecf;if(!_0x45dab1)return![];const _0x5e1bc6=_0x45dab1[_0x472d77(0x355)],_0x5ec016=this['equipSlots']();for(let _0x149943=0x0;_0x149943<_0x5ec016[_0x472d77(0x3e7)];_0x149943++){const _0x48c7f3=_0x5ec016[_0x149943];if(_0x48c7f3!==_0x5e1bc6)continue;if(!this[_0x472d77(0x15a)]()[_0x149943])return!![];}return![];},Game_Actor[_0x5b2ecf(0x138)][_0x5b2ecf(0x1ff)]=function(_0x349dbe){const _0x565e9a=_0x5b2ecf;if(!_0x349dbe)return-0x1;const _0x5699b=_0x349dbe['etypeId'],_0x4ccbd8=this[_0x565e9a(0x460)]();let _0xc29203=-0x1;for(let _0x24ab9=0x0;_0x24ab9<_0x4ccbd8['length'];_0x24ab9++){const _0x35713a=_0x4ccbd8[_0x24ab9];if(_0x35713a!==_0x5699b)continue;if(!this[_0x565e9a(0x15a)]()[_0x24ab9])return _0x24ab9;if(_0xc29203<0x0)_0xc29203=_0x24ab9;}return _0xc29203;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x2d5)]=function(_0x4d6a67,_0x4351cd,_0x4a1f75,_0x448c18){const _0x4746f8=_0x5b2ecf,_0x7b5355=TextManager['param'](_0x4d6a67);this['drawItemKeyData'](_0x7b5355,_0x4351cd,_0x4a1f75,_0x448c18,!![]);let _0x28af17='+0';Imported[_0x4746f8(0x1d2)]?_0x28af17=this[_0x4746f8(0x141)](_0x4d6a67):_0x28af17=this[_0x4746f8(0x3e3)](_0x4d6a67),this['drawItemKeyData'](_0x28af17,_0x4351cd,_0x4a1f75,_0x448c18,![],_0x4746f8(0x3ac)),this[_0x4746f8(0x236)](_0x4351cd,_0x4a1f75,_0x448c18);},Window_ShopStatus[_0x5b2ecf(0x138)]['isCustomParameter']=function(_0x4d41f9){const _0x4df2a3=_0x5b2ecf;return Imported[_0x4df2a3(0x1d2)]?!!VisuMZ[_0x4df2a3(0xc8)][_0x4df2a3(0x3b5)][_0x4d41f9]:![];},Window_ShopStatus[_0x5b2ecf(0x138)]['getParamValueClassicCore']=function(_0x1c3f90){const _0x31724f=_0x5b2ecf;if(this[_0x31724f(0x2e6)][_0x1c3f90])return this[_0x31724f(0x2e6)][_0x1c3f90];const _0x386716=['MAXHP',_0x31724f(0x187),_0x31724f(0x3f4),_0x31724f(0x501),_0x31724f(0x2a2),_0x31724f(0x342),_0x31724f(0x1fb),_0x31724f(0x3bd)],_0x1f72ce=[_0x31724f(0x418),_0x31724f(0x224),_0x31724f(0x26a),_0x31724f(0xd2),_0x31724f(0x17b),_0x31724f(0xc1),_0x31724f(0x44e),_0x31724f(0x203),'MRG','TRG'],_0x1659c6=[_0x31724f(0x4f6),_0x31724f(0xea),_0x31724f(0x215),_0x31724f(0x38c),_0x31724f(0x2b2),'TCR',_0x31724f(0x180),_0x31724f(0x469),_0x31724f(0x3b9),'EXR'];if(_0x386716[_0x31724f(0x4a1)](_0x1c3f90)){const _0x5e8d37=_0x386716['indexOf'](_0x1c3f90),_0x540f2a=this[_0x31724f(0x23b)][_0x31724f(0x207)][_0x5e8d37]||0x0;return this[_0x31724f(0x4bc)](ColorManager[_0x31724f(0x3d9)](_0x540f2a)),(_0x540f2a>=0x0?'+':'')+String(_0x540f2a);}else{if(_0x1f72ce['includes'](_0x1c3f90)){const _0x2b094f=_0x1f72ce['indexOf'](_0x1c3f90);let _0x22b7f4=0x0;for(const _0x732df7 of this[_0x31724f(0x23b)]['traits']){if(_0x732df7['code']!==0x16)continue;_0x732df7['dataId']===_0x2b094f&&(_0x22b7f4+=_0x732df7[_0x31724f(0x12c)]||0x0);}return this[_0x31724f(0x4bc)](ColorManager[_0x31724f(0x3d9)](_0x22b7f4)),_0x22b7f4*=0x64,(_0x22b7f4>=0x0?'+':'')+String(_0x22b7f4)+'%';}else{if(_0x1659c6['includes'](_0x1c3f90)){const _0x5c8b07=_0x1659c6[_0x31724f(0x455)](_0x1c3f90);let _0x210c9a=0x1;for(const _0xaeb477 of this['_item']['traits']){if(_0xaeb477['code']!==0x17)continue;_0xaeb477[_0x31724f(0x4a0)]===_0x5c8b07&&(_0x210c9a*=_0xaeb477[_0x31724f(0x12c)]||0x0);}let _0x2871a2=0x1;if([_0x31724f(0x4f6),'MCR','PDR',_0x31724f(0x469),'FDR'][_0x31724f(0x4a1)](_0x1c3f90))_0x2871a2=-0x1;return this['changeTextColor'](ColorManager['paramchangeTextColor']((_0x210c9a-0x1)*_0x2871a2)),_0x210c9a*=0x64,String(_0x210c9a)+'%';}}}return'';},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3e3)]=function(_0x4b83dc){const _0x315574=_0x5b2ecf,_0x26a36d=[_0x315574(0x206),_0x315574(0x187),_0x315574(0x3f4),_0x315574(0x501),_0x315574(0x2a2),_0x315574(0x342),_0x315574(0x1fb),_0x315574(0x3bd)],_0x476ab7=_0x26a36d[_0x4b83dc]||_0x315574(0x4ce);if(this['_customItemInfo'][_0x476ab7])return this[_0x315574(0x2e6)][_0x476ab7];const _0xb9582f=Number(this[_0x315574(0x23b)][_0x315574(0x207)][_0x4b83dc]||0x0);return this[_0x315574(0x4bc)](ColorManager['paramchangeTextColor'](_0xb9582f)),(_0xb9582f>=0x0?'+':'')+String(_0xb9582f);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x347)]=function(){const _0x44e710=_0x5b2ecf;VisuMZ[_0x44e710(0x11a)][_0x44e710(0x151)][_0x44e710(0x35d)][_0x44e710(0x481)][_0x44e710(0x4b6)](this);},Window_ShopStatus['prototype'][_0x5b2ecf(0x21a)]=function(_0x212bc7,_0x20fe2d,_0x31f688,_0x43f411){const _0x237b8e=_0x5b2ecf,_0x3083ad=DataManager[_0x237b8e(0x4bf)](_0x212bc7,_0x20fe2d,_0x31f688,_0x43f411)&&Imported['VisuMZ_1_SkillsStatesCore'],_0x42c8bd=_0x212bc7?_0x212bc7['name']:'';if(_0x3083ad)Window_SkillList[_0x237b8e(0x138)]['alterSkillName']['call'](this,_0x212bc7);Window_Base[_0x237b8e(0x138)][_0x237b8e(0x21a)][_0x237b8e(0x4b6)](this,_0x212bc7,_0x20fe2d,_0x31f688,_0x43f411);if(_0x3083ad)_0x212bc7[_0x237b8e(0x4df)]=_0x42c8bd;},Window_ShopStatus['prototype'][_0x5b2ecf(0x474)]=function(){const _0x88b6b3=_0x5b2ecf;this[_0x88b6b3(0x2e6)]={};if(!this['_item'])return;const _0xd3e1eb=this['_item'][_0x88b6b3(0x106)];if(_0xd3e1eb[_0x88b6b3(0x3f2)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x8d186b=String(RegExp['$1'])[_0x88b6b3(0x406)](/[\r\n]+/);for(const _0x13144c of _0x8d186b){if(_0x13144c[_0x88b6b3(0x3f2)](/(.*):[ ](.*)/i)){const _0x50d749=String(RegExp['$1'])[_0x88b6b3(0x505)]()['trim'](),_0xf136af=String(RegExp['$2'])[_0x88b6b3(0xe8)]();this['_customItemInfo'][_0x50d749]=_0xf136af;}}}},Window_ShopStatus['prototype']['itemDataFontSize']=function(){const _0x18db11=_0x5b2ecf;return Math[_0x18db11(0x3c2)](0x1,$gameSystem[_0x18db11(0x4e8)]()-0x4);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x113)]=function(){const _0x1817b8=_0x5b2ecf;Window_StatusBase[_0x1817b8(0x138)][_0x1817b8(0x113)]['call'](this),this[_0x1817b8(0x146)][_0x1817b8(0x31b)]=this[_0x1817b8(0x4b0)]||this[_0x1817b8(0x146)][_0x1817b8(0x31b)],this['contents'][_0x1817b8(0x130)]=this[_0x1817b8(0x132)]||this['contents'][_0x1817b8(0x130)];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x18e)]=function(){const _0x2a1cc1=_0x5b2ecf;return this['contents'][_0x2a1cc1(0x31b)]/$gameSystem[_0x2a1cc1(0x4e8)]();},Window_ShopStatus['prototype'][_0x5b2ecf(0x1b7)]=function(_0x371dfe,_0x3d1d5c,_0x3709ac){const _0x402c23=_0x5b2ecf,_0x30e240=ImageManager[_0x402c23(0x4d9)]('IconSet'),_0x4ea657=ImageManager['iconWidth'],_0x1dd43e=ImageManager[_0x402c23(0xf2)],_0x12ccbb=_0x371dfe%0x10*_0x4ea657,_0x5aea33=Math['floor'](_0x371dfe/0x10)*_0x1dd43e,_0x2f486c=Math[_0x402c23(0xf6)](_0x4ea657*this[_0x402c23(0x18e)]()),_0x1a278c=Math[_0x402c23(0xf6)](_0x1dd43e*this['fontSizeRatio']());this[_0x402c23(0x146)]['blt'](_0x30e240,_0x12ccbb,_0x5aea33,_0x4ea657,_0x1dd43e,_0x3d1d5c,_0x3709ac,_0x2f486c,_0x1a278c);},Window_ShopStatus['prototype']['processDrawIcon']=function(_0x1fb87e,_0x4fe6dd){const _0x3dec2f=_0x5b2ecf;_0x4fe6dd['drawing']&&this['drawIcon'](_0x1fb87e,_0x4fe6dd['x'],_0x4fe6dd['y']+0x2);_0x4fe6dd['x']+=Math['ceil'](ImageManager['iconWidth']*this[_0x3dec2f(0x18e)]());if(this[_0x3dec2f(0x18e)]()===0x1)_0x4fe6dd['x']+=0x4;},Window_ShopStatus[_0x5b2ecf(0x138)]['drawItemKeyData']=function(_0x32e039,_0x35be07,_0x72b51,_0x87876b,_0x5dcdaa,_0x57cd2b){const _0x353744=_0x5b2ecf;_0x32e039=_0x32e039||'',_0x57cd2b=_0x57cd2b||_0x353744(0x3da),this[_0x353744(0x4b0)]=this['itemDataFontSize'](),this[_0x353744(0x132)]=_0x5dcdaa?ColorManager[_0x353744(0x10d)]():this[_0x353744(0x146)][_0x353744(0x130)],_0x35be07+=this[_0x353744(0x2a7)](),_0x87876b-=this[_0x353744(0x2a7)]()*0x2;const _0x3d49d3=this[_0x353744(0x10f)](_0x32e039);if(_0x57cd2b===_0x353744(0x1dc))_0x35be07=_0x35be07+Math[_0x353744(0x18c)]((_0x87876b-_0x3d49d3[_0x353744(0x4b9)])/0x2);else _0x57cd2b===_0x353744(0x3ac)&&(_0x35be07=_0x35be07+_0x87876b-_0x3d49d3[_0x353744(0x4b9)]);_0x72b51+=(this[_0x353744(0x452)]()-_0x3d49d3[_0x353744(0x42c)])/0x2,this['drawTextEx'](_0x32e039,_0x35be07,_0x72b51,_0x87876b),this[_0x353744(0x4b0)]=undefined,this[_0x353744(0x132)]=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x204)]=function(_0x1f3685,_0x513b69,_0x3fbc7f){const _0x1f37cb=_0x5b2ecf;if(!DataManager[_0x1f37cb(0x2d4)](this[_0x1f37cb(0x23b)]))return![];const _0x5af34a=this['getItemConsumableLabel']();this[_0x1f37cb(0xd0)](_0x5af34a,_0x1f3685,_0x513b69,_0x3fbc7f,!![]);const _0x1a1956=this['getItemConsumableText']();return this[_0x1f37cb(0xd0)](_0x1a1956,_0x1f3685,_0x513b69,_0x3fbc7f,![],_0x1f37cb(0x3ac)),this['drawItemDarkRect'](_0x1f3685,_0x513b69,_0x3fbc7f),this[_0x1f37cb(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x159)]=function(){const _0x4f7453=_0x5b2ecf;return VisuMZ[_0x4f7453(0x11a)][_0x4f7453(0x151)]['StatusWindow'][_0x4f7453(0x419)];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x424)]=function(){const _0x26d688=_0x5b2ecf,_0x1ecb83=_0x26d688(0x120);if(this['_customItemInfo'][_0x1ecb83])return this[_0x26d688(0x2e6)][_0x1ecb83];return this[_0x26d688(0x3f1)]()?VisuMZ[_0x26d688(0x11a)][_0x26d688(0x151)]['StatusWindow'][_0x26d688(0x29d)]:VisuMZ[_0x26d688(0x11a)]['Settings'][_0x26d688(0x35d)][_0x26d688(0x171)];},Window_ShopStatus['prototype'][_0x5b2ecf(0x3f1)]=function(){const _0x1680bf=_0x5b2ecf;return VisuMZ[_0x1680bf(0xc8)]&&VisuMZ[_0x1680bf(0xc8)][_0x1680bf(0x151)][_0x1680bf(0x2fb)]['KeyItemProtect']&&DataManager[_0x1680bf(0x4be)](this[_0x1680bf(0x23b)])?![]:this['_item'][_0x1680bf(0x37d)];},Window_ShopStatus['prototype'][_0x5b2ecf(0x269)]=function(_0x452750,_0x188f1f,_0x1e2c35){const _0x233f51=_0x5b2ecf;if(!this[_0x233f51(0x476)]()&&!DataManager[_0x233f51(0x2d4)](this[_0x233f51(0x23b)]))return![];if(DataManager[_0x233f51(0x4be)](this[_0x233f51(0x23b)])&&!$dataSystem[_0x233f51(0x49d)]){const _0x333ec7=TextManager[_0x233f51(0x337)];this[_0x233f51(0xd0)](_0x333ec7,_0x452750,_0x188f1f,_0x1e2c35,!![],_0x233f51(0x1dc));}else{const _0x2c2a21=TextManager[_0x233f51(0x156)];this[_0x233f51(0xd0)](_0x2c2a21,_0x452750,_0x188f1f,_0x1e2c35,!![]);const _0x5347d5=this[_0x233f51(0x1e5)]();this['drawItemKeyData'](_0x5347d5,_0x452750,_0x188f1f,_0x1e2c35,![],'right');}return this[_0x233f51(0x236)](_0x452750,_0x188f1f,_0x1e2c35),this[_0x233f51(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x1e5)]=function(){const _0x56cc5d=_0x5b2ecf,_0x36ed60=_0x56cc5d(0x4ea);if(this[_0x56cc5d(0x2e6)][_0x36ed60])return this['_customItemInfo'][_0x36ed60];const _0x3ab2bb=VisuMZ[_0x56cc5d(0x11a)][_0x56cc5d(0x151)]['ItemScene'][_0x56cc5d(0x134)];return _0x3ab2bb['format']($gameParty[_0x56cc5d(0x128)](this['_item']));},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4f9)]=function(_0xc74343,_0x5e15a4,_0x1872ef){const _0x5c221e=_0x5b2ecf,_0x2695d4=this[_0x5c221e(0x2c8)]();return this[_0x5c221e(0xd0)](_0x2695d4,_0xc74343,_0x5e15a4,_0x1872ef,![],'center'),this['drawItemDarkRect'](_0xc74343,_0x5e15a4,_0x1872ef),this[_0x5c221e(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)]['getItemOccasionText']=function(){const _0x273414=_0x5b2ecf,_0x10cdc3=_0x273414(0x46f);if(this['_customItemInfo'][_0x10cdc3])return this[_0x273414(0x2e6)][_0x10cdc3];const _0x40d493=VisuMZ[_0x273414(0x11a)][_0x273414(0x151)]['StatusWindow'],_0x26b4cf=_0x273414(0x4fa)[_0x273414(0x350)](this[_0x273414(0x23b)][_0x273414(0x41a)]);return _0x40d493[_0x26b4cf];},Window_ShopStatus['prototype'][_0x5b2ecf(0x15d)]=function(_0x58e72f,_0x381eae,_0xd41e33){const _0x2dc59d=_0x5b2ecf,_0x62a717=this[_0x2dc59d(0x348)]();return this['drawItemKeyData'](_0x62a717,_0x58e72f,_0x381eae,_0xd41e33,![],_0x2dc59d(0x1dc)),this['drawItemDarkRect'](_0x58e72f,_0x381eae,_0xd41e33),this[_0x2dc59d(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x348)]=function(){const _0x1fd247=_0x5b2ecf,_0x3e859f=_0x1fd247(0x318);if(this['_customItemInfo'][_0x3e859f])return this[_0x1fd247(0x2e6)][_0x3e859f];const _0x2a14bf=VisuMZ[_0x1fd247(0x11a)]['Settings'][_0x1fd247(0x35d)];if(Imported[_0x1fd247(0x157)]){const _0x3a554f=this[_0x1fd247(0x23b)][_0x1fd247(0x106)];if(_0x3a554f[_0x1fd247(0x3f2)](/<TARGET:[ ](.*)>/i)){const _0x509ce5=String(RegExp['$1']);if(_0x509ce5[_0x1fd247(0x3f2)](/(\d+) RANDOM ANY/i))return _0x2a14bf[_0x1fd247(0x4b5)]['format'](Number(RegExp['$1']));else{if(_0x509ce5['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x2a14bf[_0x1fd247(0x1de)][_0x1fd247(0x350)](Number(RegExp['$1']));else{if(_0x509ce5['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x2a14bf[_0x1fd247(0x40b)][_0x1fd247(0x350)](Number(RegExp['$1']));else{if(_0x509ce5['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x2a14bf[_0x1fd247(0x1f0)];else{if(_0x509ce5['match'](/ALLY OR ENEMY/i))return _0x2a14bf[_0x1fd247(0x174)]||_0x2a14bf[_0x1fd247(0x2bd)];else{if(_0x509ce5['match'](/ENEMY OR ALLY/i))return _0x2a14bf['ScopeEnemyOrAlly']||_0x2a14bf['Scope1'];}}}}}}}const _0x26e64b=_0x1fd247(0x1c0)[_0x1fd247(0x350)](this[_0x1fd247(0x23b)][_0x1fd247(0x40f)]);return _0x2a14bf[_0x26e64b];},Window_ShopStatus['prototype'][_0x5b2ecf(0x103)]=function(_0x4b65eb,_0xe7d785,_0x1fc44b){const _0x2f204a=_0x5b2ecf,_0x3b3c02=this[_0x2f204a(0x110)]();this[_0x2f204a(0xd0)](_0x3b3c02,_0x4b65eb,_0xe7d785,_0x1fc44b,!![]);const _0x454ae0=this['getItemSpeedText']();return this['drawItemKeyData'](_0x454ae0,_0x4b65eb,_0xe7d785,_0x1fc44b,![],_0x2f204a(0x3ac)),this[_0x2f204a(0x236)](_0x4b65eb,_0xe7d785,_0x1fc44b),this[_0x2f204a(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x110)]=function(){const _0xa0777f=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0xa0777f(0x151)][_0xa0777f(0x35d)][_0xa0777f(0x390)];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x136)]=function(){const _0x539a2e=_0x5b2ecf,_0x48721a=_0x539a2e(0x49b);if(this[_0x539a2e(0x2e6)][_0x48721a])return this[_0x539a2e(0x2e6)][_0x48721a];const _0x495b89=this[_0x539a2e(0x23b)][_0x539a2e(0x1f7)];if(_0x495b89>=0x7d0)return VisuMZ[_0x539a2e(0x11a)][_0x539a2e(0x151)][_0x539a2e(0x35d)][_0x539a2e(0x256)];else{if(_0x495b89>=0x3e8)return VisuMZ[_0x539a2e(0x11a)]['Settings'][_0x539a2e(0x35d)][_0x539a2e(0x2ce)];else{if(_0x495b89>0x0)return VisuMZ[_0x539a2e(0x11a)][_0x539a2e(0x151)][_0x539a2e(0x35d)][_0x539a2e(0x242)];else{if(_0x495b89===0x0)return VisuMZ[_0x539a2e(0x11a)]['Settings']['StatusWindow']['Speed0'];else{if(_0x495b89>-0x3e8)return VisuMZ[_0x539a2e(0x11a)]['Settings']['StatusWindow'][_0x539a2e(0x394)];else{if(_0x495b89>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0x539a2e(0x151)][_0x539a2e(0x35d)]['SpeedNeg1999'];else return _0x495b89<=-0x7d0?VisuMZ['ItemsEquipsCore'][_0x539a2e(0x151)]['StatusWindow'][_0x539a2e(0x50e)]:_0x539a2e(0x2b8);}}}}}},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x121)]=function(_0x5a0724,_0x5f3cbb,_0x273645){const _0xab87d=_0x5b2ecf,_0x2fc476=this[_0xab87d(0x2f2)]();this['drawItemKeyData'](_0x2fc476,_0x5a0724,_0x5f3cbb,_0x273645,!![]);const _0x4066fe=this[_0xab87d(0x245)]();return this[_0xab87d(0xd0)](_0x4066fe,_0x5a0724,_0x5f3cbb,_0x273645,![],_0xab87d(0x3ac)),this[_0xab87d(0x236)](_0x5a0724,_0x5f3cbb,_0x273645),this[_0xab87d(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x2f2)]=function(){const _0x1e71fb=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0x1e71fb(0x151)]['StatusWindow']['LabelSuccessRate'];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x245)]=function(){const _0x4e3e20=_0x5b2ecf,_0x562905=_0x4e3e20(0x41c);if(this[_0x4e3e20(0x2e6)][_0x562905])return this[_0x4e3e20(0x2e6)][_0x562905];if(Imported[_0x4e3e20(0x157)]){const _0x4fc72e=this[_0x4e3e20(0x23b)][_0x4e3e20(0x106)];if(_0x4fc72e[_0x4e3e20(0x3f2)](/<ALWAYS HIT>/i))return'100%';else{if(_0x4fc72e[_0x4e3e20(0x3f2)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x4e3e20(0x282)[_0x4e3e20(0x350)](Number(RegExp['$1']));}}return _0x4e3e20(0x282)['format'](this[_0x4e3e20(0x23b)][_0x4e3e20(0x237)]);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x2f4)]=function(_0x56022d,_0x189c3f,_0x252517){const _0x9cdae8=_0x5b2ecf,_0x30ef5e=this[_0x9cdae8(0x328)]();this[_0x9cdae8(0xd0)](_0x30ef5e,_0x56022d,_0x189c3f,_0x252517,!![]);const _0x4060f9=this[_0x9cdae8(0x4ef)]();return this[_0x9cdae8(0xd0)](_0x4060f9,_0x56022d,_0x189c3f,_0x252517,![],_0x9cdae8(0x3ac)),this['drawItemDarkRect'](_0x56022d,_0x189c3f,_0x252517),this[_0x9cdae8(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x328)]=function(){const _0xa15793=_0x5b2ecf;return VisuMZ['ItemsEquipsCore'][_0xa15793(0x151)][_0xa15793(0x35d)][_0xa15793(0x332)];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4ef)]=function(){const _0x135ea1=_0x5b2ecf,_0x385941=_0x135ea1(0x1e3);if(this[_0x135ea1(0x2e6)][_0x385941])return this[_0x135ea1(0x2e6)][_0x385941];const _0x5e2e41='×%1';return _0x5e2e41['format'](this['_item'][_0x135ea1(0x2e0)]);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x374)]=function(_0x5dc024,_0x4aa94f,_0x43dbef){const _0x1bba04=_0x5b2ecf,_0x598f87=this[_0x1bba04(0x46c)]();this[_0x1bba04(0xd0)](_0x598f87,_0x5dc024,_0x4aa94f,_0x43dbef,!![]);const _0x5496e7=this[_0x1bba04(0x289)]();return this['drawItemKeyData'](_0x5496e7,_0x5dc024,_0x4aa94f,_0x43dbef,![],_0x1bba04(0x3ac)),this['drawItemDarkRect'](_0x5dc024,_0x4aa94f,_0x43dbef),this[_0x1bba04(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x46c)]=function(){const _0x3502e1=_0x5b2ecf;return VisuMZ[_0x3502e1(0x11a)][_0x3502e1(0x151)]['StatusWindow']['LabelHitType'];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x289)]=function(){const _0x3686ef=_0x5b2ecf,_0x2dfffa='HIT\x20TYPE';if(this['_customItemInfo'][_0x2dfffa])return this[_0x3686ef(0x2e6)][_0x2dfffa];if(DataManager['isToggleSkill']&&DataManager[_0x3686ef(0xd1)](this[_0x3686ef(0x23b)]))return TextManager['toggleType'];const _0x369dd3=VisuMZ[_0x3686ef(0x11a)][_0x3686ef(0x151)][_0x3686ef(0x35d)],_0x2001c2=_0x3686ef(0x26b)[_0x3686ef(0x350)](this[_0x3686ef(0x23b)][_0x3686ef(0x2d0)]);return _0x369dd3[_0x2001c2];},Window_ShopStatus['prototype'][_0x5b2ecf(0x2ec)]=function(_0x3c9c27,_0x4b18f7,_0x13e11c){const _0x3e07d3=_0x5b2ecf;if(this['_item'][_0x3e07d3(0x303)][_0x3e07d3(0x1a5)]<=0x0)return _0x4b18f7;if(this[_0x3e07d3(0x39b)](_0x3c9c27,_0x4b18f7,_0x13e11c))_0x4b18f7+=this[_0x3e07d3(0x452)]();if(this[_0x3e07d3(0x3d5)](_0x3c9c27,_0x4b18f7,_0x13e11c))_0x4b18f7+=this[_0x3e07d3(0x452)]();return this['resetFontSettings'](),_0x4b18f7;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x39b)]=function(_0x1f95cd,_0x17090c,_0x1eb970){const _0x2ebd26=_0x5b2ecf,_0x77f0ef=this[_0x2ebd26(0x22e)]();this[_0x2ebd26(0xd0)](_0x77f0ef,_0x1f95cd,_0x17090c,_0x1eb970,!![]);const _0x26ee88=this['getItemDamageElementText']();return this[_0x2ebd26(0xd0)](_0x26ee88,_0x1f95cd,_0x17090c,_0x1eb970,![],_0x2ebd26(0x3ac)),this[_0x2ebd26(0x236)](_0x1f95cd,_0x17090c,_0x1eb970),this[_0x2ebd26(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x22e)]=function(){const _0x39263a=_0x5b2ecf;return VisuMZ[_0x39263a(0x11a)][_0x39263a(0x151)]['StatusWindow']['LabelElement'];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x373)]=function(){const _0x11c74a=_0x5b2ecf,_0x16a20c=_0x11c74a(0x254);if(this['_customItemInfo'][_0x16a20c])return this['_customItemInfo'][_0x16a20c];if(this['_item'][_0x11c74a(0x303)][_0x11c74a(0x188)]<=-0x1)return VisuMZ[_0x11c74a(0x11a)]['Settings'][_0x11c74a(0x35d)][_0x11c74a(0x107)];else return this['_item']['damage'][_0x11c74a(0x188)]===0x0?VisuMZ[_0x11c74a(0x11a)][_0x11c74a(0x151)][_0x11c74a(0x35d)][_0x11c74a(0x4c5)]:$dataSystem[_0x11c74a(0x409)][this[_0x11c74a(0x23b)]['damage']['elementId']];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3d5)]=function(_0x30403d,_0x17d093,_0x2321dd){const _0x26d58c=_0x5b2ecf,_0x2b8396=this[_0x26d58c(0x431)]();this[_0x26d58c(0xd0)](_0x2b8396,_0x30403d,_0x17d093,_0x2321dd,!![]),this[_0x26d58c(0xdb)]();const _0x4e3679=this['getItemDamageAmountText'](),_0x3a1ceb=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x26d58c(0x23b)][_0x26d58c(0x303)]['type']]);return this[_0x26d58c(0x4bc)](_0x3a1ceb),this[_0x26d58c(0xd0)](_0x4e3679,_0x30403d,_0x17d093,_0x2321dd,![],_0x26d58c(0x3ac)),this['drawItemDarkRect'](_0x30403d,_0x17d093,_0x2321dd),this[_0x26d58c(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x431)]=function(){const _0x42ad88=_0x5b2ecf;return Imported[_0x42ad88(0x157)]&&DataManager[_0x42ad88(0x498)](this[_0x42ad88(0x23b)])!==_0x42ad88(0x3c7)?this['getItemDamageAmountLabelBattleCore']():this[_0x42ad88(0x116)]();},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x116)]=function(){const _0x2ce5ac=_0x5b2ecf,_0x1d7fa1=VisuMZ[_0x2ce5ac(0x11a)][_0x2ce5ac(0x151)][_0x2ce5ac(0x35d)],_0x1a53dc=_0x2ce5ac(0x25f)[_0x2ce5ac(0x350)](this[_0x2ce5ac(0x23b)][_0x2ce5ac(0x303)][_0x2ce5ac(0x1a5)]),_0x1c2517=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x2ce5ac(0x23b)][_0x2ce5ac(0x303)][_0x2ce5ac(0x1a5)]];return _0x1d7fa1[_0x1a53dc][_0x2ce5ac(0x350)](_0x1c2517);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0xdb)]=function(){const _0x4b6c34=_0x5b2ecf,_0x3e8604=$gameActors[_0x4b6c34(0x181)](0x1);this[_0x4b6c34(0x185)]=JsonEx['makeDeepCopy'](_0x3e8604),this[_0x4b6c34(0x1ac)]=JsonEx[_0x4b6c34(0x3b6)](_0x3e8604);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x30a)]=function(){const _0x2cb183=_0x5b2ecf,_0x4200ff='DAMAGE\x20MULTIPLIER';if(this['_customItemInfo'][_0x4200ff])return this[_0x2cb183(0x2e6)][_0x4200ff];return Imported[_0x2cb183(0x157)]&&DataManager[_0x2cb183(0x498)](this[_0x2cb183(0x23b)])!==_0x2cb183(0x3c7)?this['getItemDamageAmountTextBattleCore']():this[_0x2cb183(0x112)]();},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x112)]=function(){const _0x1f4efe=_0x5b2ecf;window['a']=this['_tempActorA'],window['b']=this[_0x1f4efe(0x1ac)],this['_tempActorA']['setShopStatusWindowMode'](!![]),this[_0x1f4efe(0x1ac)][_0x1f4efe(0x411)]([0x3,0x4]['includes'](this['_item'][_0x1f4efe(0x303)][_0x1f4efe(0x1a5)]));let _0x25c2a8=this[_0x1f4efe(0x23b)][_0x1f4efe(0x303)][_0x1f4efe(0x3ef)];try{const _0x3e519e=Math['max'](eval(_0x25c2a8),0x0)/window['a'][_0x1f4efe(0x2d8)];return this[_0x1f4efe(0x27a)](),isNaN(_0x3e519e)?_0x1f4efe(0x2b8):_0x1f4efe(0x282)['format'](Math[_0x1f4efe(0x20d)](_0x3e519e*0x64));}catch(_0x277b9d){return $gameTemp['isPlaytest']()&&(console[_0x1f4efe(0x265)](_0x1f4efe(0x4cf)[_0x1f4efe(0x350)](this[_0x1f4efe(0x23b)][_0x1f4efe(0x4df)])),console[_0x1f4efe(0x265)](_0x277b9d)),this[_0x1f4efe(0x27a)](),_0x1f4efe(0x2b8);}},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x27a)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0xf3)]=function(_0x2db335,_0x3c4c25,_0x1725a4){const _0x29b277=_0x5b2ecf;if(!this[_0x29b277(0x467)]())return _0x3c4c25;if(this[_0x29b277(0x425)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this['lineHeight']();if(this[_0x29b277(0x2df)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this[_0x29b277(0x452)]();if(this[_0x29b277(0x19e)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this[_0x29b277(0x452)]();if(this[_0x29b277(0x1f6)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this[_0x29b277(0x452)]();if(this[_0x29b277(0x284)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this['lineHeight']();if(this[_0x29b277(0x278)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this[_0x29b277(0x452)]();if(this[_0x29b277(0x3a0)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this[_0x29b277(0x452)]();if(this[_0x29b277(0x1ed)](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this['lineHeight']();if(this['drawItemEffectsRemovedStatesBuffs'](_0x2db335,_0x3c4c25,_0x1725a4))_0x3c4c25+=this[_0x29b277(0x452)]();return this[_0x29b277(0x113)](),_0x3c4c25;},Window_ShopStatus[_0x5b2ecf(0x138)]['getItemEffects']=function(){const _0x2244c9=_0x5b2ecf;return this[_0x2244c9(0x23b)][_0x2244c9(0x4f7)];},Window_ShopStatus[_0x5b2ecf(0x138)]['makeItemData']=function(){const _0x280ab0=_0x5b2ecf;let _0x5bbd88=![];this[_0x280ab0(0x432)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0xd831c4=this[_0x280ab0(0x1fc)]();for(const _0x4a8fc6 of _0xd831c4){switch(_0x4a8fc6[_0x280ab0(0x417)]){case Game_Action[_0x280ab0(0x270)]:this['_itemData']['rateHP']+=_0x4a8fc6[_0x280ab0(0x1c6)],this[_0x280ab0(0x432)][_0x280ab0(0x38e)]+=_0x4a8fc6['value2'],_0x5bbd88=!![];break;case Game_Action[_0x280ab0(0x44c)]:this[_0x280ab0(0x432)][_0x280ab0(0x149)]+=_0x4a8fc6[_0x280ab0(0x1c6)],this['_itemData']['flatMP']+=_0x4a8fc6['value2'],_0x5bbd88=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x280ab0(0x432)][_0x280ab0(0x438)]+=_0x4a8fc6['value1'],_0x5bbd88=!![];break;case Game_Action[_0x280ab0(0x19d)]:this[_0x280ab0(0x432)][_0x280ab0(0x304)][_0x280ab0(0x1bf)](_0x4a8fc6['dataId']),_0x5bbd88=!![];break;case Game_Action[_0x280ab0(0x43c)]:this['_itemData'][_0x280ab0(0x3e4)][_0x280ab0(0x1bf)](_0x4a8fc6[_0x280ab0(0x4a0)]),this[_0x280ab0(0x432)][_0x280ab0(0x2a1)]=!![],_0x5bbd88=!![];break;case Game_Action[_0x280ab0(0x1f2)]:this[_0x280ab0(0x432)][_0x280ab0(0x39d)][_0x4a8fc6['dataId']]+=0x1,_0x5bbd88=!![];break;case Game_Action[_0x280ab0(0x322)]:this[_0x280ab0(0x432)][_0x280ab0(0x39d)][_0x4a8fc6[_0x280ab0(0x4a0)]]-=0x1,_0x5bbd88=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this['_itemData'][_0x280ab0(0x3a2)][_0x280ab0(0x1bf)](_0x4a8fc6[_0x280ab0(0x4a0)]),this['_itemData'][_0x280ab0(0x2a1)]=!![],_0x5bbd88=!![];break;case Game_Action[_0x280ab0(0x4b7)]:this[_0x280ab0(0x432)][_0x280ab0(0x4cc)][_0x280ab0(0x1bf)](_0x4a8fc6[_0x280ab0(0x4a0)]),this[_0x280ab0(0x432)][_0x280ab0(0x2a1)]=!![],_0x5bbd88=!![];break;}}if(this[_0x280ab0(0x432)][_0x280ab0(0x304)]['length']>0x0)this[_0x280ab0(0x432)][_0x280ab0(0x3b8)]=!![];for(let _0x34a0b1=0x0;_0x34a0b1<this[_0x280ab0(0x432)][_0x280ab0(0x39d)][_0x280ab0(0x3e7)];_0x34a0b1++){if(this[_0x280ab0(0x432)][_0x280ab0(0x39d)][_0x34a0b1]!==0x0)this['_itemData'][_0x280ab0(0x3b8)]=!![];}this[_0x280ab0(0x23b)][_0x280ab0(0x34f)]!==0x0&&(this[_0x280ab0(0x432)]['selfTP']=this['_item'][_0x280ab0(0x34f)],_0x5bbd88=!![]);const _0x12f74d=[_0x280ab0(0x453),_0x280ab0(0x197),_0x280ab0(0x3f3),_0x280ab0(0x3c1),'MP\x20DAMAGE',_0x280ab0(0xc3),_0x280ab0(0x440),_0x280ab0(0x4a7),'REMOVED\x20EFFECTS'];for(const _0x58b740 of _0x12f74d){if(this[_0x280ab0(0x2e6)][_0x58b740]){_0x5bbd88=!![];break;}}return _0x5bbd88;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x425)]=function(_0x366933,_0x54198c,_0x308c96){const _0x644162=_0x5b2ecf,_0xa27843=_0x644162(0x453);if(this[_0x644162(0x432)]['rateHP']<=0x0&&this[_0x644162(0x432)][_0x644162(0x38e)]<=0x0&&!this[_0x644162(0x2e6)][_0xa27843])return![];const _0x526d6b=this[_0x644162(0x2b0)]();this[_0x644162(0xd0)](_0x526d6b,_0x366933,_0x54198c,_0x308c96,!![]);const _0x20dda2=this[_0x644162(0x1a7)]();return this['changeTextColor'](ColorManager[_0x644162(0x1cf)](0x1)),this[_0x644162(0xd0)](_0x20dda2,_0x366933,_0x54198c,_0x308c96,![],_0x644162(0x3ac)),this[_0x644162(0x236)](_0x366933,_0x54198c,_0x308c96),this[_0x644162(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)]['getItemEffectsHpRecoveryLabel']=function(){const _0x238577=_0x5b2ecf,_0x3db386=VisuMZ['ItemsEquipsCore']['Settings'][_0x238577(0x35d)]['LabelRecoverHP'];return _0x3db386[_0x238577(0x350)](TextManager['hp']);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x1a7)]=function(){const _0x3d66fe=_0x5b2ecf,_0x21825c=_0x3d66fe(0x453);if(this[_0x3d66fe(0x2e6)][_0x21825c])return this['_customItemInfo'][_0x21825c];let _0x1230bc='';if(this[_0x3d66fe(0x432)][_0x3d66fe(0x228)]>0x0)_0x1230bc+=_0x3d66fe(0x305)['format'](Math['floor'](this['_itemData']['rateHP']*0x64));if(this[_0x3d66fe(0x432)][_0x3d66fe(0x228)]>0x0&&this[_0x3d66fe(0x432)][_0x3d66fe(0x38e)]>0x0)_0x1230bc+='\x20';if(this[_0x3d66fe(0x432)]['flatHP']>0x0)_0x1230bc+=_0x3d66fe(0x3ba)[_0x3d66fe(0x350)](this[_0x3d66fe(0x432)][_0x3d66fe(0x38e)]);return _0x1230bc;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x2df)]=function(_0x366958,_0x37d9c9,_0x36737c){const _0x4cfdd1=_0x5b2ecf,_0xce8be=_0x4cfdd1(0x197);if(this[_0x4cfdd1(0x432)][_0x4cfdd1(0x149)]<=0x0&&this[_0x4cfdd1(0x432)]['flatMP']<=0x0&&!this[_0x4cfdd1(0x2e6)][_0xce8be])return![];const _0x227778=this[_0x4cfdd1(0x21e)]();this['drawItemKeyData'](_0x227778,_0x366958,_0x37d9c9,_0x36737c,!![]);const _0x5542df=this[_0x4cfdd1(0x2c1)]();return this[_0x4cfdd1(0x4bc)](ColorManager[_0x4cfdd1(0x1cf)](0x3)),this[_0x4cfdd1(0xd0)](_0x5542df,_0x366958,_0x37d9c9,_0x36737c,![],_0x4cfdd1(0x3ac)),this[_0x4cfdd1(0x236)](_0x366958,_0x37d9c9,_0x36737c),this[_0x4cfdd1(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x21e)]=function(){const _0xe7c31=_0x5b2ecf,_0x18b844=VisuMZ[_0xe7c31(0x11a)]['Settings'][_0xe7c31(0x35d)][_0xe7c31(0x131)];return _0x18b844[_0xe7c31(0x350)](TextManager['mp']);},Window_ShopStatus['prototype'][_0x5b2ecf(0x2c1)]=function(){const _0x25e34e=_0x5b2ecf,_0x3901f0=_0x25e34e(0x197);if(this[_0x25e34e(0x2e6)][_0x3901f0])return this[_0x25e34e(0x2e6)][_0x3901f0];let _0x4447d1='';if(this[_0x25e34e(0x432)][_0x25e34e(0x149)]>0x0)_0x4447d1+=_0x25e34e(0x305)[_0x25e34e(0x350)](Math[_0x25e34e(0x18c)](this[_0x25e34e(0x432)][_0x25e34e(0x149)]*0x64));if(this[_0x25e34e(0x432)][_0x25e34e(0x149)]>0x0&&this['_itemData'][_0x25e34e(0x41b)]>0x0)_0x4447d1+='\x20';if(this[_0x25e34e(0x432)][_0x25e34e(0x41b)]>0x0)_0x4447d1+='+%1'['format'](this[_0x25e34e(0x432)][_0x25e34e(0x41b)]);return _0x4447d1;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x19e)]=function(_0xa81c91,_0x5597ca,_0x53f4e8){const _0x205719=_0x5b2ecf,_0x4d0cce='TP\x20RECOVERY';if(this['_itemData'][_0x205719(0x438)]<=0x0&&!this[_0x205719(0x2e6)][_0x4d0cce])return![];const _0x281153=this[_0x205719(0x36f)]();this['drawItemKeyData'](_0x281153,_0xa81c91,_0x5597ca,_0x53f4e8,!![]);const _0x5ddc06=this[_0x205719(0x122)]();return this['changeTextColor'](ColorManager['powerUpColor']()),this[_0x205719(0xd0)](_0x5ddc06,_0xa81c91,_0x5597ca,_0x53f4e8,![],'right'),this['drawItemDarkRect'](_0xa81c91,_0x5597ca,_0x53f4e8),this[_0x205719(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x36f)]=function(){const _0x427517=_0x5b2ecf,_0x59c54c=VisuMZ['ItemsEquipsCore'][_0x427517(0x151)][_0x427517(0x35d)]['LabelRecoverTP'];return _0x59c54c[_0x427517(0x350)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x5b2ecf(0x122)]=function(){const _0x403100=_0x5b2ecf,_0x212056='TP\x20RECOVERY';if(this['_customItemInfo'][_0x212056])return this[_0x403100(0x2e6)][_0x212056];let _0x621922='';return _0x621922+=_0x403100(0x3ba)[_0x403100(0x350)](this['_itemData'][_0x403100(0x438)]),_0x621922;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3a0)]=function(_0x426ce4,_0x3df0c5,_0x11269f){const _0x40076d=_0x5b2ecf,_0x4cafac=_0x40076d(0x440);if(this[_0x40076d(0x432)]['selfTP']===0x0&&!this[_0x40076d(0x2e6)][_0x4cafac])return![];const _0x20cb4c=this[_0x40076d(0x3ee)]();this[_0x40076d(0xd0)](_0x20cb4c,_0x426ce4,_0x3df0c5,_0x11269f,!![]);const _0x103bd8=this[_0x40076d(0x25a)]();return this[_0x40076d(0x432)][_0x40076d(0x4d1)]>0x0?this['changeTextColor'](ColorManager[_0x40076d(0x1c3)]()):this['changeTextColor'](ColorManager['powerDownColor']()),this[_0x40076d(0xd0)](_0x103bd8,_0x426ce4,_0x3df0c5,_0x11269f,![],_0x40076d(0x3ac)),this[_0x40076d(0x236)](_0x426ce4,_0x3df0c5,_0x11269f),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3ee)]=function(){const _0x151a11=_0x5b2ecf,_0x5bada9=VisuMZ[_0x151a11(0x11a)][_0x151a11(0x151)][_0x151a11(0x35d)][_0x151a11(0xfb)];return _0x5bada9[_0x151a11(0x350)](TextManager['tp']);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x25a)]=function(){const _0x1af1a5=_0x5b2ecf,_0x510f9f=_0x1af1a5(0x440);if(this[_0x1af1a5(0x2e6)][_0x510f9f])return this[_0x1af1a5(0x2e6)][_0x510f9f];let _0x512f76='';return this[_0x1af1a5(0x432)]['selfTP']>0x0?_0x512f76+=_0x1af1a5(0x3ba)['format'](this[_0x1af1a5(0x432)][_0x1af1a5(0x4d1)]):_0x512f76+='%1'['format'](this[_0x1af1a5(0x432)][_0x1af1a5(0x4d1)]),_0x512f76;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x1f6)]=function(_0x6f85c6,_0x15cc56,_0x242f09){const _0x3daa14=_0x5b2ecf,_0x4469f5=_0x3daa14(0x3c1);if(this['_itemData'][_0x3daa14(0x228)]>=0x0&&this[_0x3daa14(0x432)][_0x3daa14(0x38e)]>=0x0&&!this[_0x3daa14(0x2e6)][_0x4469f5])return![];const _0x101fa2=this[_0x3daa14(0x14d)]();this['drawItemKeyData'](_0x101fa2,_0x6f85c6,_0x15cc56,_0x242f09,!![]);const _0x296a4b=this['getItemEffectsHpDamageText']();return this[_0x3daa14(0x4bc)](ColorManager['damageColor'](0x0)),this['drawItemKeyData'](_0x296a4b,_0x6f85c6,_0x15cc56,_0x242f09,![],_0x3daa14(0x3ac)),this[_0x3daa14(0x236)](_0x6f85c6,_0x15cc56,_0x242f09),this[_0x3daa14(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x14d)]=function(){const _0x760ca8=_0x5b2ecf,_0x4f10e9=VisuMZ[_0x760ca8(0x11a)][_0x760ca8(0x151)][_0x760ca8(0x35d)][_0x760ca8(0x2c3)];return _0x4f10e9[_0x760ca8(0x350)](TextManager['hp']);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x4b3)]=function(){const _0x5ae03e=_0x5b2ecf,_0x3aad91=_0x5ae03e(0x3c1);if(this[_0x5ae03e(0x2e6)][_0x3aad91])return this['_customItemInfo'][_0x3aad91];let _0x4a96bd='';if(this[_0x5ae03e(0x432)][_0x5ae03e(0x228)]<0x0)_0x4a96bd+=_0x5ae03e(0x282)[_0x5ae03e(0x350)](Math[_0x5ae03e(0x18c)](this['_itemData']['rateHP']*0x64));if(this['_itemData'][_0x5ae03e(0x228)]<0x0&&this['_itemData']['flatHP']<0x0)_0x4a96bd+='\x20';if(this['_itemData'][_0x5ae03e(0x38e)]<0x0)_0x4a96bd+='%1'[_0x5ae03e(0x350)](this[_0x5ae03e(0x432)]['flatHP']);return _0x4a96bd;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x284)]=function(_0x7ef4cf,_0x76b441,_0x2caff3){const _0x448407=_0x5b2ecf,_0x514bb1=_0x448407(0x422);if(this[_0x448407(0x432)][_0x448407(0x149)]>=0x0&&this[_0x448407(0x432)][_0x448407(0x41b)]>=0x0&&!this[_0x448407(0x2e6)][_0x514bb1])return![];const _0x46ba68=this[_0x448407(0x166)]();this[_0x448407(0xd0)](_0x46ba68,_0x7ef4cf,_0x76b441,_0x2caff3,!![]);const _0x36950f=this[_0x448407(0x1d9)]();return this['changeTextColor'](ColorManager['damageColor'](0x2)),this[_0x448407(0xd0)](_0x36950f,_0x7ef4cf,_0x76b441,_0x2caff3,![],'right'),this[_0x448407(0x236)](_0x7ef4cf,_0x76b441,_0x2caff3),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x166)]=function(){const _0x11a515=_0x5b2ecf,_0x7c56f6=VisuMZ[_0x11a515(0x11a)][_0x11a515(0x151)][_0x11a515(0x35d)][_0x11a515(0x11b)];return _0x7c56f6[_0x11a515(0x350)](TextManager['mp']);},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x1d9)]=function(){const _0x52fbe0=_0x5b2ecf,_0x104f01=_0x52fbe0(0x422);if(this[_0x52fbe0(0x2e6)][_0x104f01])return this[_0x52fbe0(0x2e6)][_0x104f01];let _0x4319e1='';if(this[_0x52fbe0(0x432)][_0x52fbe0(0x149)]<0x0)_0x4319e1+='%1%'[_0x52fbe0(0x350)](Math['floor'](this['_itemData'][_0x52fbe0(0x149)]*0x64));if(this[_0x52fbe0(0x432)][_0x52fbe0(0x149)]<0x0&&this[_0x52fbe0(0x432)]['flatMP']<0x0)_0x4319e1+='\x20';if(this[_0x52fbe0(0x432)][_0x52fbe0(0x41b)]<0x0)_0x4319e1+='%1'[_0x52fbe0(0x350)](this[_0x52fbe0(0x432)][_0x52fbe0(0x41b)]);return _0x4319e1;},Window_ShopStatus[_0x5b2ecf(0x138)]['drawItemEffectsTpDamage']=function(_0x5b72a8,_0xd1bff8,_0x1021c6){const _0x2eb255=_0x5b2ecf,_0x396047=_0x2eb255(0xc3);if(this[_0x2eb255(0x432)]['gainTP']>=0x0&&!this['_customItemInfo'][_0x396047])return![];const _0x33d183=this[_0x2eb255(0x352)]();this['drawItemKeyData'](_0x33d183,_0x5b72a8,_0xd1bff8,_0x1021c6,!![]);const _0x4a9916=this[_0x2eb255(0x447)]();return this[_0x2eb255(0x4bc)](ColorManager[_0x2eb255(0x315)]()),this[_0x2eb255(0xd0)](_0x4a9916,_0x5b72a8,_0xd1bff8,_0x1021c6,![],_0x2eb255(0x3ac)),this[_0x2eb255(0x236)](_0x5b72a8,_0xd1bff8,_0x1021c6),this[_0x2eb255(0x113)](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x352)]=function(){const _0x4fb722=_0x5b2ecf,_0x315381=VisuMZ[_0x4fb722(0x11a)][_0x4fb722(0x151)][_0x4fb722(0x35d)][_0x4fb722(0x264)];return _0x315381['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x5b2ecf(0x447)]=function(){const _0xaaf8aa=_0x5b2ecf,_0x3c7a1e=_0xaaf8aa(0xc3);if(this[_0xaaf8aa(0x2e6)][_0x3c7a1e])return this[_0xaaf8aa(0x2e6)][_0x3c7a1e];let _0x24961d='';return _0x24961d+='%1'['format'](this[_0xaaf8aa(0x432)][_0xaaf8aa(0x438)]),_0x24961d;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x1ed)]=function(_0x3378f8,_0x5bb8f6,_0x274495){const _0x37ac9d=_0x5b2ecf,_0x247ffb=_0x37ac9d(0x4a7);if(!this[_0x37ac9d(0x432)][_0x37ac9d(0x3b8)]&&!this['_customItemInfo'][_0x247ffb])return![];const _0x2eb180=this[_0x37ac9d(0x3d8)]();if(_0x2eb180[_0x37ac9d(0x3e7)]<=0x0)return![];const _0x51f1cc=this[_0x37ac9d(0x1fa)]();return this[_0x37ac9d(0xd0)](_0x51f1cc,_0x3378f8,_0x5bb8f6,_0x274495,!![]),this[_0x37ac9d(0xd0)](_0x2eb180,_0x3378f8,_0x5bb8f6,_0x274495,![],_0x37ac9d(0x3ac)),this[_0x37ac9d(0x236)](_0x3378f8,_0x5bb8f6,_0x274495),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x5b2ecf(0x1fa)]=function(){const _0x468f4f=_0x5b2ecf;return VisuMZ[_0x468f4f(0x11a)][_0x468f4f(0x151)][_0x468f4f(0x35d)][_0x468f4f(0x40e)];},Window_ShopStatus['prototype']['getItemEffectsAddedStatesBuffsText']=function(){const _0x3013ee=_0x5b2ecf,_0x36655b=_0x3013ee(0x4a7);if(this[_0x3013ee(0x2e6)][_0x36655b])return this['_customItemInfo'][_0x36655b];let _0x179904='',_0x51cff7=0x0;const _0x3e6142=0x8;for(const _0x3552bf of this[_0x3013ee(0x432)][_0x3013ee(0x304)]){const _0x137fe2=$dataStates[_0x3552bf];if(_0x137fe2&&_0x137fe2[_0x3013ee(0x46a)]>0x0){_0x179904+=_0x3013ee(0x226)[_0x3013ee(0x350)](_0x137fe2[_0x3013ee(0x46a)]),_0x51cff7++;if(_0x51cff7>=_0x3e6142)return _0x179904;}}for(let _0x3a7165=0x0;_0x3a7165<this[_0x3013ee(0x432)][_0x3013ee(0x39d)]['length'];_0x3a7165++){const _0x5474a3=this['_itemData'][_0x3013ee(0x39d)][_0x3a7165],_0x1b8d0c=Game_BattlerBase[_0x3013ee(0x138)][_0x3013ee(0x356)](_0x5474a3,_0x3a7165);if(_0x1b8d0c>0x0){_0x179904+=_0x3013ee(0x226)[_0x3013ee(0x350)](_0x1b8d0c),_0x51cff7++;if(_0x51cff7>=_0x3e6142)return _0x179904;}}return _0x179904;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x445)]=function(_0x4e42d8,_0x284d1c,_0xbbb68f){const _0x388fb9=_0x5b2ecf,_0x38159f='REMOVED\x20EFFECTS';if(!this[_0x388fb9(0x432)][_0x388fb9(0x2a1)]&&!this[_0x388fb9(0x2e6)][_0x38159f])return![];const _0x1d5c7d=this[_0x388fb9(0x470)]();this[_0x388fb9(0xd0)](_0x1d5c7d,_0x4e42d8,_0x284d1c,_0xbbb68f,!![]);const _0x549a2c=this[_0x388fb9(0x429)]();return this['drawItemKeyData'](_0x549a2c,_0x4e42d8,_0x284d1c,_0xbbb68f,![],_0x388fb9(0x3ac)),this[_0x388fb9(0x236)](_0x4e42d8,_0x284d1c,_0xbbb68f),this[_0x388fb9(0x113)](),!![];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x470)]=function(){const _0x5932ce=_0x5b2ecf;return VisuMZ[_0x5932ce(0x11a)][_0x5932ce(0x151)][_0x5932ce(0x35d)][_0x5932ce(0x183)];},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x429)]=function(){const _0x1be78b=_0x5b2ecf,_0x5f244d='REMOVED\x20EFFECTS';if(this[_0x1be78b(0x2e6)][_0x5f244d])return this[_0x1be78b(0x2e6)][_0x5f244d];let _0x8e2e8c='',_0x477342=0x0;const _0x546c79=VisuMZ[_0x1be78b(0x11a)][_0x1be78b(0x151)][_0x1be78b(0x35d)][_0x1be78b(0x38b)];for(const _0x1c63c9 of this[_0x1be78b(0x432)][_0x1be78b(0x3e4)]){const _0x1faa5f=$dataStates[_0x1c63c9];if(_0x1faa5f&&_0x1faa5f[_0x1be78b(0x46a)]>0x0){_0x8e2e8c+=_0x1be78b(0x226)['format'](_0x1faa5f[_0x1be78b(0x46a)]),_0x477342++;if(_0x477342>=_0x546c79)return _0x8e2e8c;}}for(let _0x4e70a3=0x0;_0x4e70a3<this[_0x1be78b(0x432)]['removeBuff']['length'];_0x4e70a3++){const _0x10639a=this[_0x1be78b(0x432)][_0x1be78b(0x3a2)][_0x4e70a3],_0x1dc7a2=Game_BattlerBase[_0x1be78b(0x138)][_0x1be78b(0x356)](0x1,_0x10639a);if(_0x1dc7a2>0x0){_0x8e2e8c+=_0x1be78b(0x226)[_0x1be78b(0x350)](_0x1dc7a2),_0x477342++;if(_0x477342>=_0x546c79)return _0x8e2e8c;}}for(let _0x56afe1=0x0;_0x56afe1<this['_itemData'][_0x1be78b(0x4cc)][_0x1be78b(0x3e7)];_0x56afe1++){const _0x191915=this[_0x1be78b(0x432)][_0x1be78b(0x4cc)][_0x56afe1],_0x2fc89b=Game_BattlerBase['prototype'][_0x1be78b(0x356)](-0x1,_0x191915);if(_0x2fc89b>0x0){_0x8e2e8c+=_0x1be78b(0x226)[_0x1be78b(0x350)](_0x2fc89b),_0x477342++;if(_0x477342>=_0x546c79)return _0x8e2e8c;}}return _0x8e2e8c;},Window_ShopStatus['prototype'][_0x5b2ecf(0x404)]=function(_0x4e6272,_0x1d48e3,_0x411e4c){const _0x2ba69b=_0x5b2ecf;if(this[_0x2ba69b(0x23b)][_0x2ba69b(0x106)][_0x2ba69b(0x3f2)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x1c9fdf=String(RegExp['$1'])[_0x2ba69b(0x406)](/[\r\n]+/);for(const _0x3e40a2 of _0x1c9fdf){if(_0x3e40a2[_0x2ba69b(0x3f2)](/(.*):[ ](.*)/i)){const _0x3cdc96=String(RegExp['$1'])[_0x2ba69b(0xe8)](),_0x572066=String(RegExp['$2'])[_0x2ba69b(0xe8)]();this[_0x2ba69b(0x462)](_0x3cdc96,_0x572066,_0x4e6272,_0x1d48e3,_0x411e4c),_0x1d48e3+=this[_0x2ba69b(0x452)]();}}}return this[_0x2ba69b(0x113)](),_0x1d48e3;},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x462)]=function(_0x50f12e,_0x8ae90a,_0x552047,_0x47d05d,_0x41f39f){const _0x245995=_0x5b2ecf;this['drawItemKeyData'](_0x50f12e,_0x552047,_0x47d05d,_0x41f39f,!![]),this[_0x245995(0xd0)](_0x8ae90a,_0x552047,_0x47d05d,_0x41f39f,![],'right'),this[_0x245995(0x236)](_0x552047,_0x47d05d,_0x41f39f),this[_0x245995(0x113)]();},Window_ShopStatus['prototype'][_0x5b2ecf(0x1b9)]=function(){const _0x1feaa0=_0x5b2ecf;if(!this[_0x1feaa0(0x23b)])return;const _0x1aa98a=this[_0x1feaa0(0x23b)][_0x1feaa0(0x106)],_0xae19ff=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x286b98=_0x1aa98a[_0x1feaa0(0x3f2)](_0xae19ff);if(_0x286b98)for(const _0x4e0501 of _0x286b98){_0x4e0501['match'](_0xae19ff);const _0x2dd3a4=String(RegExp['$1'])[_0x1feaa0(0xe8)]()||'';if(_0x2dd3a4==='')continue;const _0x3e9074=ImageManager[_0x1feaa0(0x44a)](_0x2dd3a4);_0x3e9074['addLoadListener'](this['drawCustomShopGraphicLoad'][_0x1feaa0(0x1a8)](this,_0x3e9074,this[_0x1feaa0(0x23b)]));}},Window_ShopStatus[_0x5b2ecf(0x138)][_0x5b2ecf(0x3c9)]=function(_0xff08c6,_0xc6f577){const _0x194fd3=_0x5b2ecf;if(this[_0x194fd3(0x23b)]!==_0xc6f577)return;if(!_0xff08c6)return;if(_0xff08c6['width']<=0x0||_0xff08c6[_0x194fd3(0x42c)]<=0x0)return;const _0x1d621e=_0xc6f577[_0x194fd3(0x106)];let _0x2cc165=_0x194fd3(0x2d6);_0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x2cc165=_0x194fd3(0x295));const _0x44bb64=_0x2cc165===_0x194fd3(0x2d6)?this['contentsBack']:this[_0x194fd3(0x146)];let _0x1aaecd=this[_0x194fd3(0x2f6)],_0xf5c854=this[_0x194fd3(0x500)];_0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x1aaecd=Number(RegExp['$1']));_0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0xf5c854=Number(RegExp['$1']));_0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x1aaecd=Number(RegExp['$1']),_0xf5c854=Number(RegExp['$2']));const _0x51f904=Math['min'](0x1,_0x1aaecd/_0xff08c6['width'],_0xf5c854/_0xff08c6[_0x194fd3(0x42c)]);let _0x5044ad=0x0,_0x531637=0x0,_0x94b29f=Math[_0x194fd3(0x18c)](_0xff08c6[_0x194fd3(0x4b9)]*_0x51f904),_0x3c6c23=Math[_0x194fd3(0x18c)](_0xff08c6[_0x194fd3(0x42c)]*_0x51f904),_0x6e1532='center';_0x1d621e['match'](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x6e1532=String(RegExp['$1'])[_0x194fd3(0x227)]()[_0x194fd3(0xe8)]());if(_0x6e1532==='left')_0x5044ad=0x0;else _0x6e1532===_0x194fd3(0x1dc)?_0x5044ad=Math[_0x194fd3(0x20d)]((this[_0x194fd3(0x2f6)]-_0x94b29f)/0x2):_0x5044ad=this[_0x194fd3(0x2f6)]-_0x94b29f;let _0x11a3e6='middle';_0x1d621e['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x11a3e6=String(RegExp['$1'])[_0x194fd3(0x227)]()[_0x194fd3(0xe8)]());if(_0x11a3e6===_0x194fd3(0x441))_0x531637=0x0;else _0x11a3e6===_0x194fd3(0x294)?_0x531637=Math['round']((this[_0x194fd3(0x500)]-_0x3c6c23)/0x2):_0x531637=this[_0x194fd3(0x500)]-_0x3c6c23;_0x1d621e['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x5044ad+=Number(RegExp['$1']));_0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x531637+=Number(RegExp['$1']));_0x1d621e['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x5044ad+=Number(RegExp['$1']),_0x531637+=Number(RegExp['$2']));let _0x1067bd=0xff;if(_0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x1067bd=Number(RegExp['$1']);else _0x1d621e[_0x194fd3(0x3f2)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x1067bd=Math[_0x194fd3(0x20d)](Number(RegExp['$1'])*0.01*0xff)[_0x194fd3(0x1b1)](0x0,0xff));_0x44bb64[_0x194fd3(0x21c)]=_0x1067bd,_0x44bb64['blt'](_0xff08c6,0x0,0x0,_0xff08c6['width'],_0xff08c6[_0x194fd3(0x42c)],_0x5044ad,_0x531637,_0x94b29f,_0x3c6c23),_0x44bb64[_0x194fd3(0x21c)]=0xff;},VisuMZ['ItemsEquipsCore'][_0x5b2ecf(0x31f)]=function(_0x63089b){const _0xfcab43=_0x5b2ecf;if(_0x63089b===null||typeof _0x63089b!==_0xfcab43(0x2e8))return _0x63089b;const _0x40ed05=Array['isArray'](_0x63089b)?[]:Object['create'](Object['getPrototypeOf'](_0x63089b));for(const _0x3d9b90 in _0x63089b){Object[_0xfcab43(0x138)][_0xfcab43(0x4e6)][_0xfcab43(0x4b6)](_0x63089b,_0x3d9b90)&&(_0x40ed05[_0x3d9b90]=typeof _0x63089b[_0x3d9b90]==='object'&&_0x63089b[_0x3d9b90]!==null?VisuMZ[_0xfcab43(0x11a)][_0xfcab43(0x31f)](_0x63089b[_0x3d9b90]):_0x63089b[_0x3d9b90]);}return _0x40ed05;};function _0x93d3(){const _0x337387=['SetupProxyItemGroups','MaxIcons','PHA','7YHrTBa','flatHP','NUM','LabelSpeed','mainFontFace','troopArtifactIDs','Scene_Shop_doSell','SpeedNeg999','OffsetY','createItemWindow','buttonAssistCategory','setStatusWindow','test','VisuMZ_1_MainMenuCore','drawItemDamageElement','updateHelp','changeBuff','getSkillIdWithName','actorParams','drawItemEffectsSelfTpGain','isEquipTypeSealed','removeBuff','isOptimizeCommandAdded','bitmap','nextActor','money','CursedTextPopup','Enable','Scene_Equip_createCommandWindow','Window_ItemList_colSpacing','ParamChangeFontSize','right','artifactIDs','Step1Start','_buyWindow','currentExt','nonRemovableEtypes','Scene_Equip_onSlotCancel','Window_Selectable_initialize','cursorDown','CustomParamNames','makeDeepCopy','createTempActorEquips','addStateBuffChanges','FDR','+%1','_paramPlus','English','LUK','status','_allowArtifactParamBase','getShopTrackingItemSell','HP\x20DAMAGE','max','drawItemNumber','_equips','StatusWindowWidth','initShopTrackingData','MANUAL','Game_Actor_artifact','drawCustomShopGraphicLoad','calcEquipItemPerformance','SwitchID','KeyItems','cancel','drawActorParamDifference','Scene_Shop_onCategoryCancel','MenuPortraits','getArmorIdWithName','setBackgroundType','changeEquip','Game_BattlerBase_canEquip_artifact','drawItemDamageAmount','ARRAYSTR','ClassicWeaponParameters','getItemEffectsAddedStatesBuffsText','paramchangeTextColor','left','isLearnedSkill','Game_BattlerBase_meetsItemConditions','playCursorSound','_newLabelOpacityUpperLimit','Game_Actor_changeEquip','isUseParamNamesWithIcons','Scene_Shop_create','STRUCT','getParamValueClassicNoCore','removeState','Scene_Shop_buyWindowRect','ItemMenuStatusBgType','length','smallParamFontSize','process_VisuMZ_ItemsEquipsCore_EquipSlots','onCategoryOk','onSlotCancel','isEquipCommandAdded','_actor','getItemEffectsSelfTpGainLabel','formula','helpAreaTop','canConsumeItem','match','TP\x20RECOVERY','ATK','uiInputPosition','double','_scene','playOkSound','meetsShopListingConditions','sell','equipAdjustHpMp','colSpacing','price','EVAL','Armor\x20Type','geUpdatedLayoutStatusWidth','actorId','isEquipChangeOk','paramPlus','drawItemCustomEntries','updateNewLabelOpacity','split','prepare','slotWindowRectItemsEquipsCore','elements','CmdIconSell','ScopeRandomAllies','setItem','paramValueByName','LabelApply','scope','Game_Party_numItems','setShopStatusWindowMode','A%1','isArtifact','refreshDelay','isTroopArtifact','forceChangeEquipSlots','code','HIT','LabelConsume','occasion','flatMP','SUCCESS\x20RATE','active','equipItems','NeverUsable','AllWeapons','update','MP\x20DAMAGE','onActorChange','getItemConsumableText','drawItemEffectsHpRecovery','isRepeated','itemWindowRect','15128ZGqhnq','getItemEffectsRemovedStatesBuffsText','processCursorMoveModernControls','9012864WNXmBB','height','_category','isEnabled','isEquipWtypeOk','processDownCursorSpecialCheckModernControls','getItemDamageAmountLabel','_itemData','_itemIDs','process_VisuMZ_ItemsEquipsCore_RegExp','6ACtpsE','deselect','isPartyArtifact','gainTP','buttonAssistKey2','mainAreaTop','_tempActor','EFFECT_REMOVE_STATE','canUse','getShopTrackingData','MaxItems','USER\x20TP\x20GAIN','top','fillRect','numberWindowRect','Scene_Equip_commandWindowRect','drawItemEffectsRemovedStatesBuffs','SetupProxyItemGroup','getItemEffectsTpDamageText','Window_ItemList_makeItemList','helpDescriptionText','loadPicture','drawNewLabelIcon','EFFECT_RECOVER_MP','remove','CNT','PurifyActors','ShiftShortcutKey','Scene_Shop_createSellWindow','lineHeight','HP\x20RECOVERY','Game_Actor_equips_artifacts','indexOf','Step2End','_armorIDs','BackRectColor','isClicked','iconText','auto','Scene_Shop_goldWindowRect','isProxyItem','isOpen','isClearCommandEnabled','equipSlots','changeClass','drawItemCustomEntryLine','isOptimizeCommandEnabled','drawEquipDataCompare','statusWindowRect','Game_Actor_forceChangeEquip','makeItemData','drawItem','MDR','iconIndex','mainAreaBottom','getItemHitTypeLabel','onSellCancel','setTopRow','OCCASION','getItemEffectsRemovedStatesBuffsLabel','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','%1-%2','meetsItemConditionsJS','prepareItemCustomData','Window_EquipCommand_initialize','isEquipItem','clearNewItem','luk','ParseClassNotetags','initEquips','HiddenItemA','categoryNameWindowCenter','drawTextEx','meetsEquipRequirement','resetShopSwitches','#%1','DrawItemData','Window_EquipItem_isEnabled','processShopCondListingOnBuyItem','Scene_Equip_createSlotWindow','item-%1','_newLabelOpacity','isUseItemsEquipsCoreUpdatedLayout','ParamValueFontSize','Window_ShopBuy_goodsToItem','Actors','List','calcWindowHeight','Window_ItemCategory_initialize','MultiplierStandard','getClassRequirements','getShopTrackingItem','Blacklist','createCommandNameWindow','getItemIdWithName','CmdIconClear','gaugeLineHeight','isDrawItemNumber','isSoleWeaponType','getDamageStyle','changeEquipBase','sellPriceRate','SPEED','previousActor','optKeyItemsNumber','paramValueFontSize','Game_BattlerBase_paramPlus_artifact','dataId','includes','Scene_Item_itemWindowRect','ShopScene','maxCols','ARRAYJSON','shift','ADDED\x20EFFECTS','_commandWindow','Width','Window_ItemCategory_setItemWindow','changePaintOpacity','IncludeShopItem','forceResetEquipSlots','addOptimizeCommand','getClassIdWithName','_resetFontSize','_helpWindow','battleMembers','getItemEffectsHpDamageText','itemAt','ScopeRandomAny','call','EFFECT_REMOVE_DEBUFF','gaugeBackColor','width','getEtypeIDsCache','optimize','changeTextColor','Game_Party_gainItem','isKeyItem','isSkill','buttonAssistSlotWindowShift','VisuMZ_2_WeaponSwapSystem','ARRAYSTRUCT','Scene_Shop','drawItemEquipSubType','ElementNone','mdf','createCategoryNameWindow','Categories','discardEquip','determineBaseSellingPrice','canEquipArmor','removeDebuff','isSellCommandEnabled','n/a','Damage\x20Formula\x20Error\x20for\x20%1','RegExp','selfTP','44RJoCbT','buy','CmdIconBuy','Game_Actor_discardEquip','getInputButtonString','Game_BattlerBase_param','Game_BattlerBase_param_artifact','loadSystem','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','BorderRegExp','isArmor','onCategoryCancelItemsEquipsCore','sellWindowRectItemsEquipsCore','name','currentSymbol','drawItemCost','drawEquipDataClassic','armorTypes','Scene_Equip_commandEquip','DoubleWeaponParameters','hasOwnProperty','isMainMenuCoreMenuImageOptionAvailable','mainFontSize','getProxyItem','QUANTITY','meetsClassRequirements','map','_allowArtifactTraitObjects','itemWindowRectItemsEquipsCore','getItemRepeatsText','drawParamsItemsEquipsCore','index','clearCmdDesc','parameters','refreshCursor','removeBattleTestArtifacts','TGR','effects','getEquipDataStyle','drawItemOccasion','Occasion%1','JSON','prepareRefreshItemsEquipsCoreLayout','smoothSelect','processCursorHomeEndTrigger','splice','innerHeight','DEF','paramId','paramBase','allowCommandWindowCursorUp','toUpperCase','addShopTrackingItemBuy','612638djNDVw','setItemWindow','weaponTypes','Window_ShopBuy_refresh','Style','ParseAllNotetags','Scene_Item','SpeedNeg2000','addEquipCommand','commandStyleCheck','down','EquipDataStyle','processTouchModernControls','MRF','consumeItem','TP\x20DAMAGE','helpWindowRect','categoryStyle','isHovered','isCursedItem','CoreEngine','cursorLeft','ARRAYEVAL','Scene_Equip_onActorChange','Window_Selectable_refresh','buttonAssistText3','limitedPageUpDownSceneCheck','Parse_Notetags_EnableJS','drawItemKeyData','isToggleSkill','CEV','isDualWield','CmdIconOptimize','sortPriority','itemTextAlign','Window_ShopBuy_price','W%1','level','mhp','setupItemDamageTempActors','isWeapon','Equip\x20the\x20strongest\x20available\x20equipment.','drawRemoveItem','IconSet','_weaponIDs','Scene_Equip_onSlotOk','addChild','ParseWeaponNotetags','DrawEquipData','troopArtifacts','sellingPrice','commandWindowRectItemsEquipsCore','trim','RemoveEquipText','GRD','setValue','optimizeEquipments','_list','onCategoryCancel','_slotId','_newItemsList','localeCompare','iconHeight','drawItemEffects','_goodsCount','Game_Party_gainItem_artifact','ceil','parseLocalizedText','isBuyCommandEnabled','isCustomParameter','_doubleTouch','LabelSelfGainTP','items','_newLabelOpacityChange','postCreateCategoryWindowItemsEquipsCore','MaxHP','checkItemConditionsSwitchNotetags','user','drawText','drawItemSpeed','isClearEquipOk','_bypassProxy','note','ElementWeapon','Scene_Item_categoryWindowRect','allMembers','Scene_Item_createCategoryWindow','Icon','_numberWindow','systemColor','Scene_Shop_commandBuy','textSizeEx','getItemSpeedLabel','defaultItemMax','getItemDamageAmountTextOriginal','resetFontSettings','itypeId','icon','getItemDamageAmountLabelOriginal','ARMOR','DrawFaceJS','Scene_Shop_onBuyOk','ItemsEquipsCore','LabelDamageMP','itemHasEquipLimit','isPurifyItemSwapOk','ITEMS_EQUIPS_CORE','canSortListItemScene','CONSUMABLE','drawItemSuccessRate','getItemEffectsTpRecoveryText','onTouchSelectModern','Window_ShopBuy_item','activateItemWindow','processHandling','isBattleTest','numItems','Game_Actor_changeClass','makeCommandList','cursorRight','value','popScene','MaxArmors','weapon','textColor','LabelRecoverMP','_resetFontColor','Scene_Equip_statusWindowRect','ItemQuantityFmt','isPressed','getItemSpeedText','show','prototype','WeaponType','679178NzbTcy','CmdStyle','_statusWindow','agi','drawItemEquipType','addItemCategories','resetTextColor','getParamValueClassicCore','loadFaceImages','addBuyCommand','cursorPageup','Scene_Shop_commandSell','contents','FUNC','allowCreateStatusWindow','rateMP','buttonAssistKey1','drawItemActorMenuImage','clearNewLabelFromItem','getItemEffectsHpDamageLabel','EquipParams','commandNameWindowDrawText','SellTurnSwitchOff','Settings','CmdTextAlign','contentsBack','replace','updatedLayoutStyle','possession','VisuMZ_1_BattleCore','onMenuImageLoad','getItemConsumableLabel','equips','drawUpdatedBeforeParamValue','postCreateItemWindowModernControls','drawItemScope','textWidth','Game_Actor_isEquipChangeOk','constructor','RegularItems','translucentOpacity','Scene_Shop_categoryWindowRect','Scene_Equip_slotWindowRect','Window_EquipStatus_refresh','getItemEffectsMpDamageLabel','adjustHiddenShownGoods','addCancelCommand','mainAreaHeight','Game_Actor_tradeItemWithParty','MaxWeapons','getWeaponIdWithName','meetsItemConditionsNotetags','_shopStatusMenuMode','Scene_Shop_onSellOk','initialize','NotConsumable','equipTypes','addLoadListener','ScopeAllyOrEnemy','CheckCursedItemMsg','Parse_Notetags_EquipSlots','_handlers','DrawBackRect','needsNewTempActor','isCursorMovable','MEV','createNewLabelSprite','Window_EquipItem_includes','isShowNew','parse','PDR','actor','getEtypeIDs','LabelRemove','mat','_tempActorA','getInputMultiButtonStrings','MAXMP','elementId','goldWindowRectItemsEquipsCore','switchProxyItem','placeItemNewLabel','floor','Game_Party_consumeItem','fontSizeRatio','traitObjects','buyWindowRectItemsEquipsCore','categoryWindowRect','isPageChangeRequested','NAME','slotWindowRect','currentClass','ShopMenuStatusStandard','MP\x20RECOVERY','create','CmdCancelRename','addShopTrackingGoldSell','currencyUnit','mmp','EFFECT_ADD_STATE','drawItemEffectsTpRecovery','description','isEquipped','equip','windowPadding','cursorUp','Scene_Shop_statusWindowRect','type','releaseUnequippableItems','getItemEffectsHpRecoveryText','bind','TextAlign','changeEquipById','Step3Start','_tempActorB','meetsEquipRequirements','onTouchCancel','commandWindowRect','_forcedSlots','clamp','setHandler','AlreadyEquipMarker','WEAPON','boxWidth','numberWindowRectItemsEquipsCore','drawIcon','allowShiftScrolling','drawCustomShopGraphic','ListWindowCols','addShopTrackingItemSell','armor','helpDesc','inBattle','push','Scope%1','Scene_Shop_sellWindowRect','FadeLimit','powerUpColor','hideNewLabelSprites','exit','value1','drawEquipData','normalColor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','categoryWindowRectItemsEquipsCore','anyEmptyEquipSlotsOfSameEtype','activateSellWindow','onSlotOk','ARRAYNUM','damageColor','Step1End','setMp','VisuMZ_0_CoreEngine','SortByIDandPriority','onSellItem','categoryList','===','sellWindowRect','onTouchOk','getItemEffectsMpDamageText','_bypassNewLabel','onBuyCancel','center','EquipDelayMS','ScopeRandomEnemies','scrollTo','Scene_Shop_helpWindowRect','iconWidth','New','REPEAT','start','getItemQuantityText','Window_ItemList_item','bestEquipItem','Scene_Shop_activateSellWindow','reloadMapIfUpdated','ConvertParams','pagedown','pop','drawItemEffectsAddedStatesBuffs','isCancelled','_dummyWindow','ScopeAlliesButUser','CommandAddOptimize','EFFECT_ADD_BUFF','setObject','Scene_Shop_onBuyCancel','ClassicArmorParameters','drawItemEffectsHpDamage','speed','postCreateSlotWindowItemsEquipsCore','isEquipCommandEnabled','getItemEffectsAddedStatesBuffsLabel','AGI','getItemEffects','buttonAssistItemListRequirement','Scene_Boot_onDatabaseLoaded','getEmptyEquipSlotOfSameEtype','itemLineRect','drawItemStyleIconText','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','HRG','drawItemConsumable','loadCharacter','MAXHP','params','return\x200','hpRate','AllArmors','onSlotOkAutoSelect','buttonAssistText2','round','values','_getClassRequirements','Window_ShopStatus_setItem','Game_Item_setObject','isOptimizeEquipOk','buttonAssistLargeIncrement','_shopTrackingData','REC','SetupArtifactItemIDs','getNextAvailableEtypeId','_categoryWindow','BuyPriceJS','drawItemName','onBuyOk','paintOpacity','find','getItemEffectsMpRecoveryLabel','3033TxJqLS','textLocale','_scrollDuration','AllItems','equipSlotIndex','EVA','categories','\x5cI[%1]','toLowerCase','rateHP','statusWidth','addSellCommand','meetsItemConditions','_slotWindow','atypeId','getItemDamageElementLabel','SortBy','drawNewLabelText','Scene_Item_createItemWindow','ShowShopStatus','some','ParseItemNotetags','Window_ItemList_drawItem','drawItemDarkRect','successRate','Parse_Notetags_Prices','_classIDs','Scene_Shop_prepare','_item','setupBattleTestItems','Scene_Shop_commandWindowRect','partyArtifactIDs','Scene_Shop_createCategoryWindow','isBottomHelpMode','updateCategoryNameWindow','Speed1','playCancel','Scene_Shop_numberWindowRect','getItemSuccessRateText','Parse_Notetags_ParamValues','isClearCommandAdded','NoEquipTypeResult','param','Type','_bypassReleaseUnequippableItemsItemsEquipsCore','processShopCondListingOnSellItem','isUseModernControls','FieldUsable','deactivate','_money','isTriggered','forceChangeEquip','isSoleArmorType','ELEMENT','paramJS','Speed2000','addClearCommand','OffsetX','CannotEquipMarker','getItemEffectsSelfTpGainText','Text','updateCommandNameWindow','createCommandWindow','processShiftRemoveShortcut','DamageType%1','Scene_Item_helpWindowRect','_cache','initNewItemsList','getColor','LabelDamageTP','log','Nonconsumable','Window_Selectable_update','\x5cI[%1]%2','drawItemQuantity','CRI','HitType%1','commandName','createCategoryWindow','_categoryNameWindow','CommandAddClear','EFFECT_RECOVER_HP','_skillIDs','createSlotWindow','FontFace','Parse_Notetags_ParamJS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EquipScene','setCategory','drawItemEffectsTpDamage','random','revertGlobalNamespaceVariables','convertInitEquipsToItems','Parse_Notetags_Category','processCursorSpecialCheckModernControls','Remove\x20all\x20available\x20equipment.','proxyItem','newLabelEnabled','addItemCategory','%1%','wtypeId','drawItemEffectsMpDamage','_etypeIDs','CmdIconCancel','Slots','goodsToItem','getItemHitTypeText','onBuyCancelItemsEquipsCore','EnableLayout','Window_ItemList_updateHelp','equipCmdDesc','DrawEquipClassicData','Scene_Equip_itemWindowRect','clear','Scene_Shop_onSellCancel','NonRemoveETypes','commandNameWindowDrawBackground','middle','foreground','isGoodShown','Scene_Shop_doBuy','setHp','AlwaysUsable','purifyCursedEquips','Window_EquipSlot_isEnabled','getTextColor','Consumable','Game_Enemy_traitObjects_artifact','categoryStyleCheck','select','removeStateBuffChanges','MAT','fill','addCommand','sort','_checkEquipRequirements','itemPadding','buttonAssistRemove','_buttonAssistWindow','SwitchBuy','equip2','postCreateItemsEquipsCore','commandStyle','drawParamName','269955DxzKpN','getItemEffectsHpRecoveryLabel','isOpenAndActive','MCR','buttonAssistSmallIncrement','isShiftRemoveShortcutEnabled','FadeSpeed','categoryItemTypes','isVisuMzLocalizationEnabled','?????','createBitmap','visible','drawEquipDataDouble','onTouchSelectModernControls','Scope7','DrawEquipDoubleData','pageup','activate','getItemEffectsMpRecoveryText','setNewItem','LabelDamageHP','_newLabelSprites','Scene_Load_reloadMapIfUpdated','doBuy','partyArtifacts','getItemOccasionText','process_VisuMZ_ItemsEquipsCore_Notetags','isSceneShop','Scene_Item_create','version','getMenuImage','Speed1000','uiHelpPosition','hitType','hideDisabledCommands','drawParamText','Param','isItem','drawActorParamClassic','background','HiddenItemB','atk','modifiedBuyPriceItemsEquipsCore','drawActorCharacter','compare','mainCommandWidth','maxItemAmount','nonOptimizeEtypes','drawItemEffectsMpRecovery','repeats','hide','Window_Selectable_setHelpWindowItem','loseItem','updateMoneyAmount','text','_customItemInfo','isShiftShortcutKeyForRemove','object','statusWindowRectItemsEquipsCore','hasItem','isCommandEnabled','drawItemDamage','ShowAllSwitches','commandSell','Game_Actor_paramPlus','Window_ShopSell_isEnabled','isStackableArtifact','getItemSuccessRateLabel','FontSize','drawItemRepeats','_calculatingJSParameters','innerWidth','categoryNameWindowDrawBackground','buyWindowRect','9034040yirAXH','MaxMP','QoL','doSell','ShopListingRegExp','_cache_etypeIDs','ParseArmorNotetags','onSellOkItemsEquipsCore','Scene_Equip_create','updateSmoothScroll','damage','addState','+%1%','_buyWindowLastIndex','STR','sortListItemScene','addInnerChild','getItemDamageAmountText','buyingPrice','_itemWindow','Parse_Notetags_Batch','getItemColor','gainItem','canShiftRemoveEquipment','hitIndex','Step2Start','Pick\x20and\x20choose\x20equipment\x20to\x20change.','helpWindowRectItemsEquipsCore','powerDownColor','callUpdateHelp','characterName','SCOPE','refreshActor','gold','fontSize','3954012gSxwlX','placeNewLabel','shouldCommandWindowExist','deepCopy','uiMenuStyle','classic','EFFECT_ADD_DEBUFF','addShopTrackingItem','cursorPagedown','itemEnableJS','drawCurrencyValue','BuyTurnSwitchOff','getItemRepeatsLabel','(%1)','processCursorMove','tradeItemWithParty','buttonAssistText1','members','drawUpdatedParamValueDiff','0000','FontColor','commandEquip','LabelRepeats','refreshActorEquipSlotsIfUpdated','item','canEquip','getEquipRequirements','keyItem','ARRAYFUNC','ActorChangeEquipSlots','CmdIconEquip','refreshItemsEquipsCoreNoMenuImage','versionId','weapon-%1','setTempActor','createSellWindow','prepareNewEquipSlotsOnLoad','filter','MDF','onTouchSelect','LayoutStyle','baseSellingPrice','helpAreaHeight','drawItemData','getItemScopeText','drawPossession','_data','registerCommand','createStatusWindow','armor-%1','getShopTrackingItemBuy','tpGain','format','isRightInputMode','getItemEffectsTpDamageLabel','_sellWindow','paramPlusItemsEquipsCoreCustomJS','etypeId','buffIconIndex','updateChangedSlots','buttonAssistKey3','NonOptimizeETypes','refresh','UNDEFINED!','drawItemStyleIcon','StatusWindow','adjustItemWidthByStatus','concat','every','drawUpdatedAfterParamValue','Game_Party_initialize','getItemsEquipsCoreBackColor2','opacity','Step3End','Scene_ItemBase_activateItemWindow','DrawIcons','isHoverEnabled','ItemScene','getItemsEquipsCoreBackColor1','maxItems','blt','_shopStatusMenuAlly','getPurifyTransformation','getItemEffectsTpRecoveryLabel','Window_ItemList_maxCols','Game_Party_setupBattleTestItems_artifact','fontFace','getItemDamageElementText','drawItemHitType','commandNameWindowCenter','getEtypeIdWithName','Scene_Shop_buyingPrice','28zOObCd','onSellOk','\x5cb%1\x5cb','addShopTrackingGoldBuy','_commandNameWindow','consumable','makeItemList','Parse_Notetags_Sorting','ShowAnySwitches','_getEquipRequirements','armors','ExtDisplayedParams','isPlaytest','ActorResetEquipSlots','setText','commandBuy','SwitchSell','drawUpdatedParamName'];_0x93d3=function(){return _0x337387;};return _0x93d3();}