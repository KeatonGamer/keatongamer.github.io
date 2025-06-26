//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.85;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.85] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
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
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
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
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
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
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x32e60b=_0x1f8f;(function(_0x52157f,_0x44364f){const _0x4856ab=_0x1f8f,_0x43ad78=_0x52157f();while(!![]){try{const _0x5656ac=-parseInt(_0x4856ab(0x7ae))/0x1*(parseInt(_0x4856ab(0x8cf))/0x2)+parseInt(_0x4856ab(0x6f5))/0x3+parseInt(_0x4856ab(0x254))/0x4+parseInt(_0x4856ab(0x620))/0x5+-parseInt(_0x4856ab(0x530))/0x6+parseInt(_0x4856ab(0x4ad))/0x7+-parseInt(_0x4856ab(0x8ae))/0x8;if(_0x5656ac===_0x44364f)break;else _0x43ad78['push'](_0x43ad78['shift']());}catch(_0x107b2a){_0x43ad78['push'](_0x43ad78['shift']());}}}(_0x1222,0x8a0ac));var label=_0x32e60b(0x565),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5a19fe){const _0xabcb2f=_0x32e60b;return _0x5a19fe[_0xabcb2f(0x1e0)]&&_0x5a19fe[_0xabcb2f(0x10e)][_0xabcb2f(0x7b0)]('['+label+']');})[0x0];function _0x1f8f(_0xb22ebb,_0x4a6566){const _0x1222e1=_0x1222();return _0x1f8f=function(_0x1f8ff3,_0x1cab4d){_0x1f8ff3=_0x1f8ff3-0x104;let _0xf4253a=_0x1222e1[_0x1f8ff3];return _0xf4253a;},_0x1f8f(_0xb22ebb,_0x4a6566);}VisuMZ[label][_0x32e60b(0x1e6)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x32e60b(0x781)]=function(_0xe3d17e,_0x11d1a6){const _0x219bb1=_0x32e60b;for(const _0x5676f4 in _0x11d1a6){if(_0x5676f4[_0x219bb1(0x58a)](/(.*):(.*)/i)){const _0x517d12=String(RegExp['$1']),_0x6734f7=String(RegExp['$2'])[_0x219bb1(0x58e)]()[_0x219bb1(0x870)]();let _0x5676c5,_0x26a922,_0x353a51;switch(_0x6734f7){case'NUM':_0x5676c5=_0x11d1a6[_0x5676f4]!==''?Number(_0x11d1a6[_0x5676f4]):0x0;break;case'ARRAYNUM':_0x26a922=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):[],_0x5676c5=_0x26a922[_0x219bb1(0x708)](_0x31692e=>Number(_0x31692e));break;case'EVAL':_0x5676c5=_0x11d1a6[_0x5676f4]!==''?eval(_0x11d1a6[_0x5676f4]):null;break;case _0x219bb1(0x4d5):_0x26a922=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):[],_0x5676c5=_0x26a922[_0x219bb1(0x708)](_0x27f907=>eval(_0x27f907));break;case'JSON':_0x5676c5=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):'';break;case'ARRAYJSON':_0x26a922=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):[],_0x5676c5=_0x26a922['map'](_0xb6c7a4=>JSON[_0x219bb1(0x28c)](_0xb6c7a4));break;case'FUNC':_0x5676c5=_0x11d1a6[_0x5676f4]!==''?new Function(JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4])):new Function(_0x219bb1(0x5ec));break;case _0x219bb1(0x11f):_0x26a922=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):[],_0x5676c5=_0x26a922['map'](_0x562565=>new Function(JSON['parse'](_0x562565)));break;case _0x219bb1(0x4ec):_0x5676c5=_0x11d1a6[_0x5676f4]!==''?String(_0x11d1a6[_0x5676f4]):'';break;case'ARRAYSTR':_0x26a922=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):[],_0x5676c5=_0x26a922[_0x219bb1(0x708)](_0x1a48c8=>String(_0x1a48c8));break;case _0x219bb1(0x752):_0x353a51=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):{},_0xe3d17e[_0x517d12]={},VisuMZ[_0x219bb1(0x781)](_0xe3d17e[_0x517d12],_0x353a51);continue;case _0x219bb1(0x33b):_0x26a922=_0x11d1a6[_0x5676f4]!==''?JSON[_0x219bb1(0x28c)](_0x11d1a6[_0x5676f4]):[],_0x5676c5=_0x26a922[_0x219bb1(0x708)](_0x478757=>VisuMZ[_0x219bb1(0x781)]({},JSON[_0x219bb1(0x28c)](_0x478757)));break;default:continue;}_0xe3d17e[_0x517d12]=_0x5676c5;}}return _0xe3d17e;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1d8)]=SceneManager['exit'],SceneManager['exit']=function(){const _0x50a721=_0x32e60b;VisuMZ[_0x50a721(0x565)][_0x50a721(0x1d8)][_0x50a721(0x2d2)](this);if(Utils[_0x50a721(0x817)]>=_0x50a721(0x811)){if(typeof nw==='object')nw[_0x50a721(0x70e)][_0x50a721(0x2da)]();}},(_0x310fdb=>{const _0x11091b=_0x32e60b,_0x219662=_0x310fdb[_0x11091b(0x50d)];for(const _0x5a6cd8 of dependencies){if(!Imported[_0x5a6cd8]){alert(_0x11091b(0x7fd)['format'](_0x219662,_0x5a6cd8)),SceneManager[_0x11091b(0x84e)]();break;}}const _0x4da93b=_0x310fdb['description'];if(_0x4da93b['match'](/\[Version[ ](.*?)\]/i)){const _0x1613d9=Number(RegExp['$1']);_0x1613d9!==VisuMZ[label][_0x11091b(0x4ea)]&&(alert(_0x11091b(0x43d)['format'](_0x219662,_0x1613d9)),SceneManager[_0x11091b(0x84e)]());}if(_0x4da93b['match'](/\[Tier[ ](\d+)\]/i)){const _0x9ad7a1=Number(RegExp['$1']);_0x9ad7a1<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x11091b(0x42e)](_0x219662,_0x9ad7a1,tier)),SceneManager['exit']()):tier=Math['max'](_0x9ad7a1,tier);}VisuMZ[_0x11091b(0x781)](VisuMZ[label][_0x11091b(0x1e6)],_0x310fdb[_0x11091b(0x2ce)]);})(pluginData),((()=>{const _0x2983a9=_0x32e60b;if(VisuMZ[_0x2983a9(0x565)][_0x2983a9(0x1e6)][_0x2983a9(0x89e)][_0x2983a9(0x856)]??!![])for(const _0x3581a1 in $plugins){const _0x521919=$plugins[_0x3581a1];_0x521919[_0x2983a9(0x50d)]['match'](/(.*)\/(.*)/i)&&(_0x521919[_0x2983a9(0x50d)]=String(RegExp['$2'][_0x2983a9(0x870)]()));}})()),PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x211),_0x1b3f8c=>{const _0x13d8a2=_0x32e60b;if(!SceneManager[_0x13d8a2(0x10b)])return;if(!SceneManager[_0x13d8a2(0x10b)][_0x13d8a2(0x68e)])return;VisuMZ[_0x13d8a2(0x781)](_0x1b3f8c,_0x1b3f8c);const _0x2afb8f=Math[_0x13d8a2(0x474)](_0x1b3f8c[_0x13d8a2(0x5af)]),_0x5e3f38=Math[_0x13d8a2(0x474)](_0x1b3f8c[_0x13d8a2(0x8a8)]);$gameTemp['requestPointAnimation'](_0x2afb8f,_0x5e3f38,_0x1b3f8c[_0x13d8a2(0x8c5)],_0x1b3f8c[_0x13d8a2(0x20b)],_0x1b3f8c['Mute']);}),PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x77d),_0x3884ec=>{const _0x1d15d4=_0x32e60b;VisuMZ[_0x1d15d4(0x781)](_0x3884ec,_0x3884ec);const _0x4e4b3f=Math[_0x1d15d4(0x474)](_0x3884ec['volume'])[_0x1d15d4(0x7c2)](0x0,0x64),_0x4111ef=AudioManager['_currentBgm'];_0x4111ef&&(_0x4111ef[_0x1d15d4(0x20e)]=_0x4e4b3f,_0x4111ef[_0x1d15d4(0x59a)]=AudioManager['_bgmBuffer']['seek'](),AudioManager[_0x1d15d4(0x7e8)](_0x4111ef),AudioManager[_0x1d15d4(0x7a9)](_0x4111ef,_0x4111ef[_0x1d15d4(0x59a)]),AudioManager['_bgmBuffer'][_0x1d15d4(0x656)](_0x4111ef[_0x1d15d4(0x59a)]));}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x611),_0x504dae=>{const _0x392450=_0x32e60b;VisuMZ[_0x392450(0x781)](_0x504dae,_0x504dae);const _0x2287ea=Math[_0x392450(0x474)](_0x504dae[_0x392450(0x132)])[_0x392450(0x7c2)](0x32,0x96),_0x3c9184=AudioManager[_0x392450(0x106)];_0x3c9184&&(_0x3c9184['pitch']=_0x2287ea,_0x3c9184[_0x392450(0x59a)]=AudioManager[_0x392450(0x543)]['seek'](),AudioManager[_0x392450(0x7e8)](_0x3c9184),AudioManager['playBgm'](_0x3c9184,_0x3c9184[_0x392450(0x59a)]),AudioManager['_bgmBuffer']['_startPlaying'](_0x3c9184[_0x392450(0x59a)]));}),PluginManager[_0x32e60b(0x7e2)](pluginData['name'],_0x32e60b(0x2d4),_0x194f57=>{const _0x23a9a3=_0x32e60b;VisuMZ[_0x23a9a3(0x781)](_0x194f57,_0x194f57);const _0xbc3f26=Math[_0x23a9a3(0x474)](_0x194f57[_0x23a9a3(0x228)])[_0x23a9a3(0x7c2)](-0x64,0x64),_0x25db8c=AudioManager[_0x23a9a3(0x106)];_0x25db8c&&(_0x25db8c[_0x23a9a3(0x228)]=_0xbc3f26,_0x25db8c['pos']=AudioManager[_0x23a9a3(0x543)][_0x23a9a3(0x4df)](),AudioManager[_0x23a9a3(0x7e8)](_0x25db8c),AudioManager[_0x23a9a3(0x7a9)](_0x25db8c,_0x25db8c[_0x23a9a3(0x59a)]),AudioManager['_bgmBuffer'][_0x23a9a3(0x656)](_0x25db8c[_0x23a9a3(0x59a)]));}),PluginManager['registerCommand'](pluginData['name'],_0x32e60b(0x498),_0x22918a=>{const _0x3416b1=_0x32e60b;VisuMZ[_0x3416b1(0x781)](_0x22918a,_0x22918a);const _0x3ab056=Math[_0x3416b1(0x474)](_0x22918a[_0x3416b1(0x20e)])['clamp'](0x0,0x64),_0x318018=AudioManager['_currentBgs'];_0x318018&&(_0x318018['volume']=_0x3ab056,_0x318018['pos']=AudioManager['_bgsBuffer'][_0x3416b1(0x4df)](),AudioManager[_0x3416b1(0x410)](_0x318018),AudioManager[_0x3416b1(0x43a)](_0x318018,_0x318018[_0x3416b1(0x59a)]),AudioManager['_bgsBuffer'][_0x3416b1(0x656)](_0x318018[_0x3416b1(0x59a)]));}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x81e),_0x3a5610=>{const _0x193227=_0x32e60b;VisuMZ[_0x193227(0x781)](_0x3a5610,_0x3a5610);const _0x31ed20=Math[_0x193227(0x474)](_0x3a5610[_0x193227(0x132)])['clamp'](0x32,0x96),_0x22ea3c=AudioManager[_0x193227(0x7f4)];_0x22ea3c&&(_0x22ea3c[_0x193227(0x132)]=_0x31ed20,_0x22ea3c[_0x193227(0x59a)]=AudioManager[_0x193227(0x590)][_0x193227(0x4df)](),AudioManager[_0x193227(0x410)](_0x22ea3c),AudioManager[_0x193227(0x43a)](_0x22ea3c,_0x22ea3c[_0x193227(0x59a)]),AudioManager[_0x193227(0x590)][_0x193227(0x656)](_0x22ea3c[_0x193227(0x59a)]));}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],'AudioChangeBgsPan',_0xede835=>{const _0x59cb38=_0x32e60b;VisuMZ['ConvertParams'](_0xede835,_0xede835);const _0x1eb084=Math[_0x59cb38(0x474)](_0xede835['pan'])[_0x59cb38(0x7c2)](-0x64,0x64),_0xe4fc9d=AudioManager[_0x59cb38(0x7f4)];_0xe4fc9d&&(_0xe4fc9d[_0x59cb38(0x228)]=_0x1eb084,_0xe4fc9d[_0x59cb38(0x59a)]=AudioManager['_bgsBuffer'][_0x59cb38(0x4df)](),AudioManager['updateBgsParameters'](_0xe4fc9d),AudioManager[_0x59cb38(0x43a)](_0xe4fc9d,_0xe4fc9d[_0x59cb38(0x59a)]),AudioManager[_0x59cb38(0x590)][_0x59cb38(0x656)](_0xe4fc9d[_0x59cb38(0x59a)]));}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x5c2),_0x4b0b9c=>{const _0x422e6b=_0x32e60b;if(!$gameTemp[_0x422e6b(0x252)]())return;const _0x388c8a=Input[_0x422e6b(0x72a)]();console['log'](_0x388c8a);}),PluginManager[_0x32e60b(0x7e2)](pluginData['name'],_0x32e60b(0x7a8),_0x4f607e=>{const _0x473bcd=_0x32e60b;if(!$gameTemp[_0x473bcd(0x252)]())return;if(!Utils[_0x473bcd(0x837)]())return;SceneManager['_scene'][_0x473bcd(0x5f1)]=![],VisuMZ[_0x473bcd(0x565)]['ExportStrFromAllMaps']();}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x2f6),_0xe786c=>{const _0x7839c4=_0x32e60b;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x7839c4(0x837)]())return;SceneManager[_0x7839c4(0x10b)]['_active']=![],VisuMZ[_0x7839c4(0x565)][_0x7839c4(0x845)]();}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x259),_0x8680d1=>{const _0x16e835=_0x32e60b;if(!$gameTemp[_0x16e835(0x252)]())return;if(!Utils[_0x16e835(0x837)]())return;if(!$gameMap)return;if($gameMap[_0x16e835(0x119)]()<=0x0)return;VisuMZ[_0x16e835(0x781)](_0x8680d1,_0x8680d1);const _0xc690dd=_0x16e835(0x1f7)['format']($gameMap[_0x16e835(0x119)]()[_0x16e835(0x888)](0x3)),_0x5d8ea5=VisuMZ[_0x16e835(0x565)][_0x16e835(0x734)]($gameMap[_0x16e835(0x119)]());VisuMZ[_0x16e835(0x565)]['ExportString'](_0x5d8ea5,_0xc690dd,!![]);}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x193),_0x315381=>{const _0x92fee7=_0x32e60b;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x92fee7(0x74f)]())return;VisuMZ['ConvertParams'](_0x315381,_0x315381);const _0x326877=_0x92fee7(0x4c3)['format']($gameTroop[_0x92fee7(0x6c1)][_0x92fee7(0x888)](0x4)),_0x181e0c=VisuMZ[_0x92fee7(0x565)][_0x92fee7(0x1ce)]($gameTroop['_troopId']);VisuMZ[_0x92fee7(0x565)]['ExportString'](_0x181e0c,_0x326877,!![]);}),VisuMZ['CoreEngine'][_0x32e60b(0x3a1)]=function(_0xd440a2,_0x36a168,_0x5636e2){const _0x3e785e=_0x32e60b,_0x599cf5=require('fs');let _0x40cdcd=_0x3e785e(0x49c)[_0x3e785e(0x42e)](_0x36a168||'0');_0x599cf5[_0x3e785e(0x58d)](_0x40cdcd,_0xd440a2,_0xf6c6ba=>{const _0x7ffc6f=_0x3e785e;if(_0xf6c6ba)throw err;else _0x5636e2&&alert(_0x7ffc6f(0x435)[_0x7ffc6f(0x42e)](_0x40cdcd));});},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x226)]=function(){const _0x2ec096=_0x32e60b,_0x334a80=[];for(const _0x436c3a of $dataMapInfos){if(!_0x436c3a)continue;_0x334a80['push'](_0x436c3a['id']);}const _0x1741fa=_0x334a80[_0x2ec096(0x4e4)]*0x64+Math[_0x2ec096(0x3cb)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x2ec096(0x42e)](_0x1741fa)),this[_0x2ec096(0x535)]=[],this[_0x2ec096(0x85e)]=$dataMap;for(const _0x5a597d of _0x334a80){VisuMZ[_0x2ec096(0x565)][_0x2ec096(0x15e)](_0x5a597d);}setTimeout(VisuMZ[_0x2ec096(0x565)][_0x2ec096(0x448)]['bind'](this),_0x1741fa);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x15e)]=function(_0x344ddf){const _0x5c5597=_0x32e60b,_0x339011=_0x5c5597(0x207)[_0x5c5597(0x42e)](_0x344ddf[_0x5c5597(0x888)](0x3)),_0x464275=new XMLHttpRequest(),_0x134bbb=_0x5c5597(0x246)+_0x339011;_0x464275[_0x5c5597(0x3ac)](_0x5c5597(0x560),_0x134bbb),_0x464275[_0x5c5597(0x5d0)](_0x5c5597(0x51b)),_0x464275['onload']=()=>this[_0x5c5597(0x636)](_0x464275,_0x344ddf,_0x339011,_0x134bbb),_0x464275[_0x5c5597(0x4a3)]=()=>DataManager[_0x5c5597(0x453)](_0x5c5597(0x5d1),_0x339011,_0x134bbb),_0x464275[_0x5c5597(0x235)]();},VisuMZ[_0x32e60b(0x565)]['storeMapData']=function(_0x531f43,_0x5f410b,_0x4862fa,_0x40aa6a){const _0x114daa=_0x32e60b;$dataMap=JSON[_0x114daa(0x28c)](_0x531f43['responseText']),DataManager[_0x114daa(0x762)]($dataMap),this[_0x114daa(0x535)][_0x5f410b]=VisuMZ['CoreEngine'][_0x114daa(0x734)](_0x5f410b),$dataMap=this[_0x114daa(0x85e)];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x448)]=function(){const _0x417410=_0x32e60b,_0x518913=_0x417410(0x2f8);this[_0x417410(0x535)][_0x417410(0x8d3)](undefined)[_0x417410(0x8d3)]('')[_0x417410(0x8d3)](null);const _0x2be699=this[_0x417410(0x535)][_0x417410(0x2e7)](_0x417410(0x765))[_0x417410(0x870)]();VisuMZ[_0x417410(0x565)][_0x417410(0x3a1)](_0x2be699,_0x518913,!![]),SceneManager[_0x417410(0x10b)][_0x417410(0x5f1)]=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0x5b7646){const _0x598fca=_0x32e60b;if(!$dataMap)return'';let _0x5e1f52='█'['repeat'](0x46)+'\x0a\x0a',_0x1a15ec='═'[_0x598fca(0x352)](0x46)+'\x0a\x0a',_0xe2c179='';this['_commonEventLayers']=0x0;for(const _0x2a9d28 of $dataMap[_0x598fca(0x1b9)]){if(!_0x2a9d28)continue;let _0x38155b=_0x2a9d28['id'],_0x4d9837=_0x2a9d28[_0x598fca(0x50d)],_0x25e291=_0x2a9d28[_0x598fca(0x425)];for(const _0x1aff63 of _0x25e291){const _0x57d3b2=_0x25e291[_0x598fca(0x430)](_0x1aff63)+0x1;let _0x2e27f8=_0x1a15ec+_0x598fca(0x6e7),_0x5d743b=VisuMZ[_0x598fca(0x565)][_0x598fca(0x6e5)](_0x1aff63[_0x598fca(0x4c6)]);if(_0x5d743b[_0x598fca(0x4e4)]>0x0){if(_0xe2c179['length']>0x0)_0xe2c179+=_0x1a15ec+'\x0a\x0a\x0a\x0a\x0a';else{const _0x389380=$dataMapInfos[_0x5b7646][_0x598fca(0x50d)];_0xe2c179+=_0x5e1f52+_0x598fca(0x71d)['format'](_0x5b7646,_0x389380||_0x598fca(0x8bc))+_0x5e1f52;}_0xe2c179+=_0x2e27f8['format'](_0x38155b,_0x4d9837,_0x57d3b2,_0x5d743b);}}}return _0xe2c179[_0x598fca(0x4e4)]>0x0&&(_0xe2c179+=_0x1a15ec),_0xe2c179;},VisuMZ[_0x32e60b(0x565)]['ExportStrFromAllTroops']=function(){const _0x4ed894=_0x32e60b,_0x1342a3=$dataTroops[_0x4ed894(0x4e4)]*0xa+Math['randomInt'](0xa);alert(_0x4ed894(0x854)['format'](_0x1342a3));const _0x424e14=[];for(const _0x4f5b61 of $dataTroops){if(!_0x4f5b61)continue;const _0x22738e=_0x4f5b61['id'];_0x424e14[_0x22738e]=VisuMZ[_0x4ed894(0x565)][_0x4ed894(0x1ce)](_0x22738e);}setTimeout(VisuMZ['CoreEngine']['exportAllTroopStrings']['bind'](this,_0x424e14),_0x1342a3);},VisuMZ[_0x32e60b(0x565)]['ExtractStrFromTroop']=function(_0x16e668){const _0x43308a=_0x32e60b;if(!$dataTroops[_0x16e668])return'';let _0xb4037f='█'[_0x43308a(0x352)](0x46)+'\x0a\x0a',_0x5dad93='═'[_0x43308a(0x352)](0x46)+'\x0a\x0a',_0x786e88='';this['_commonEventLayers']=0x0;const _0x4455ab=$dataTroops[_0x16e668];let _0x2a30f8=_0x4455ab[_0x43308a(0x425)];for(const _0x569371 of _0x2a30f8){const _0x295d1e=_0x2a30f8['indexOf'](_0x569371)+0x1;let _0x4d348a=_0x5dad93+_0x43308a(0x39a),_0x390ef9=VisuMZ[_0x43308a(0x565)][_0x43308a(0x6e5)](_0x569371['list']);_0x390ef9[_0x43308a(0x4e4)]>0x0&&(_0x786e88[_0x43308a(0x4e4)]>0x0?_0x786e88+=_0x5dad93+_0x43308a(0x765):_0x786e88+=_0xb4037f+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x43308a(0x42e)](_0x16e668,_0x4455ab[_0x43308a(0x50d)]||_0x43308a(0x8bc))+_0xb4037f,_0x786e88+=_0x4d348a[_0x43308a(0x42e)](_0x295d1e,_0x390ef9));}return _0x786e88[_0x43308a(0x4e4)]>0x0&&(_0x786e88+=_0x5dad93),_0x786e88;},VisuMZ[_0x32e60b(0x565)]['exportAllTroopStrings']=function(_0x1c62df){const _0x26a224=_0x32e60b,_0x19c83f='AllTroops';_0x1c62df[_0x26a224(0x8d3)](undefined)[_0x26a224(0x8d3)]('')[_0x26a224(0x8d3)](null);const _0x12b211=_0x1c62df[_0x26a224(0x2e7)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ['CoreEngine'][_0x26a224(0x3a1)](_0x12b211,_0x19c83f,!![]),SceneManager[_0x26a224(0x10b)]['_active']=!![];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x6e5)]=function(_0x1feb2d){const _0x16c910=_0x32e60b;let _0x2c3c7b='\x0a'+'─'[_0x16c910(0x352)](0x46)+'\x0a',_0x4b4099='\x0a'+'┄'[_0x16c910(0x352)](0x46)+'\x0a',_0x2b5c6e='';for(const _0x4e63a9 of _0x1feb2d){if(!_0x4e63a9)continue;if(_0x4e63a9[_0x16c910(0x21a)]===0x65)_0x2b5c6e+=_0x2c3c7b+'\x0a',_0x2b5c6e+='〘Show\x20Text〙\x0a',_0x4e63a9['parameters'][0x4]!==''&&_0x4e63a9[_0x16c910(0x2ce)][0x4]!==undefined&&(_0x2b5c6e+=_0x16c910(0x773)[_0x16c910(0x42e)](_0x4e63a9[_0x16c910(0x2ce)][0x4]));else{if(_0x4e63a9[_0x16c910(0x21a)]===0x191)_0x2b5c6e+='%1\x0a'[_0x16c910(0x42e)](_0x4e63a9[_0x16c910(0x2ce)][0x0]);else{if(_0x4e63a9[_0x16c910(0x21a)]===0x192)_0x2b5c6e+=_0x2c3c7b,_0x2b5c6e+=_0x16c910(0x717)['format'](_0x4b4099,_0x4e63a9['parameters'][0x0]+0x1,_0x4e63a9[_0x16c910(0x2ce)][0x1]);else{if(_0x4e63a9[_0x16c910(0x21a)]===0x193)_0x2b5c6e+=_0x2c3c7b,_0x2b5c6e+='%1〘Choice\x20Cancel〙%1'[_0x16c910(0x42e)](_0x4b4099);else{if(_0x4e63a9[_0x16c910(0x21a)]===0x194)_0x2b5c6e+=_0x2c3c7b,_0x2b5c6e+=_0x16c910(0x56c)[_0x16c910(0x42e)](_0x4b4099);else{if(_0x4e63a9['code']===0x69)_0x2b5c6e+=_0x2c3c7b+'\x0a',_0x2b5c6e+=_0x16c910(0x4cf);else{if(_0x4e63a9[_0x16c910(0x21a)]===0x6c)_0x2b5c6e+=_0x2c3c7b+'\x0a',_0x2b5c6e+=_0x16c910(0x1df)['format'](_0x4e63a9[_0x16c910(0x2ce)][0x0]);else{if(_0x4e63a9[_0x16c910(0x21a)]===0x198)_0x2b5c6e+='%1\x0a'['format'](_0x4e63a9['parameters'][0x0]);else{if(_0x4e63a9[_0x16c910(0x21a)]===0x75){const _0x2b0509=$dataCommonEvents[_0x4e63a9[_0x16c910(0x2ce)][0x0]];if(_0x2b0509&&this['_commonEventLayers']<=0xa){this[_0x16c910(0x8ad)]++;let _0x5d9801=VisuMZ[_0x16c910(0x565)][_0x16c910(0x6e5)](_0x2b0509[_0x16c910(0x4c6)]);_0x5d9801[_0x16c910(0x4e4)]>0x0&&(_0x2b5c6e+=_0x2c3c7b,_0x2b5c6e+=_0x4b4099,_0x2b5c6e+=_0x16c910(0x7a7)[_0x16c910(0x42e)](_0x2b0509['id'],_0x2b0509[_0x16c910(0x50d)]),_0x2b5c6e+=_0x4b4099,_0x2b5c6e+=_0x5d9801,_0x2b5c6e+=_0x4b4099,_0x2b5c6e+=_0x16c910(0x1d9)[_0x16c910(0x42e)](_0x2b0509['id'],_0x2b0509['name']),_0x2b5c6e+=_0x4b4099),this[_0x16c910(0x8ad)]--;}}}}}}}}}}}return _0x2b5c6e[_0x16c910(0x4e4)]>0x0&&(_0x2b5c6e+=_0x2c3c7b),_0x2b5c6e;},PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x210),_0x254cbc=>{const _0x46bab4=_0x32e60b;VisuMZ[_0x46bab4(0x781)](_0x254cbc,_0x254cbc);const _0x36976b=_0x254cbc[_0x46bab4(0x76e)];VisuMZ['openURL'](_0x36976b);}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x87d),_0x4513ce=>{const _0x2d08bd=_0x32e60b;VisuMZ[_0x2d08bd(0x781)](_0x4513ce,_0x4513ce);const _0x3284b1=_0x4513ce[_0x2d08bd(0x59c)]||0x0;$gameParty[_0x2d08bd(0x6ae)](_0x3284b1);}),PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x851),_0x20aed3=>{const _0x140e1f=_0x32e60b;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x140e1f(0x781)](_0x20aed3,_0x20aed3);const _0x523110=_0x20aed3[_0x140e1f(0x409)];SceneManager[_0x140e1f(0x10b)][_0x140e1f(0x237)](_0x523110);}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x5db),_0x54e6b6=>{const _0x172f3a=_0x32e60b;if(!$gameTemp[_0x172f3a(0x252)]())return;if(!Utils[_0x172f3a(0x837)]())return;VisuMZ[_0x172f3a(0x781)](_0x54e6b6,_0x54e6b6);const _0xbda992=_0x54e6b6[_0x172f3a(0x1a5)]||0x1;$gameTemp[_0x172f3a(0x46b)]=_0xbda992;}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x3d3),_0x23f889=>{const _0x5a1569=_0x32e60b;VisuMZ['ConvertParams'](_0x23f889,_0x23f889);const _0x5da4d5=_0x23f889[_0x5a1569(0x80e)]||0x1,_0x5436a4=_0x23f889['easingType']||'Linear',_0x107cd6=$gameScreen[_0x5a1569(0x130)](_0x5da4d5);_0x107cd6&&_0x107cd6[_0x5a1569(0x6b1)](_0x5436a4);}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x41d),_0x563f0c=>{const _0x39aa11=_0x32e60b;for(let _0x5d345d=0x1;_0x5d345d<=0x64;_0x5d345d++){$gameScreen[_0x39aa11(0x864)](_0x5d345d);}}),PluginManager[_0x32e60b(0x7e2)](pluginData['name'],_0x32e60b(0x7f9),_0x1acbcf=>{const _0x4c4a95=_0x32e60b;VisuMZ[_0x4c4a95(0x781)](_0x1acbcf,_0x1acbcf);const _0x382d18=Math['min'](_0x1acbcf[_0x4c4a95(0x5b8)],_0x1acbcf[_0x4c4a95(0x224)]),_0x5dae3e=Math[_0x4c4a95(0x66c)](_0x1acbcf[_0x4c4a95(0x5b8)],_0x1acbcf[_0x4c4a95(0x224)]);for(let _0x48821e=_0x382d18;_0x48821e<=_0x5dae3e;_0x48821e++){$gameScreen['erasePicture'](_0x48821e);}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x4a4),_0x1211a3=>{const _0x28e7c9=_0x32e60b;VisuMZ[_0x28e7c9(0x781)](_0x1211a3,_0x1211a3);const _0x1bbc6d=Math[_0x28e7c9(0x474)](_0x1211a3['PictureID'])[_0x28e7c9(0x7c2)](0x1,0x64),_0x4d691a=-Number(_0x1211a3[_0x28e7c9(0x4a2)]||0x0),_0x35cb6b=Math[_0x28e7c9(0x66c)](_0x1211a3[_0x28e7c9(0x5ef)]||0x0,0x0),_0x58076a=_0x1211a3[_0x28e7c9(0x6fc)]||_0x28e7c9(0x6f0),_0x136261=_0x1211a3[_0x28e7c9(0x4fc)],_0x2ea4be=$gameScreen[_0x28e7c9(0x130)](_0x1bbc6d);if(!_0x2ea4be)return;_0x2ea4be[_0x28e7c9(0x5f4)](_0x4d691a,_0x35cb6b,_0x58076a);if(_0x136261){const _0x2ce415=$gameTemp['getLastPluginCommandInterpreter']();if(_0x2ce415)_0x2ce415[_0x28e7c9(0x6d1)](_0x35cb6b);}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x4b7),_0x379140=>{const _0x48878a=_0x32e60b;VisuMZ[_0x48878a(0x781)](_0x379140,_0x379140);const _0x2b051b=Math[_0x48878a(0x474)](_0x379140[_0x48878a(0x1a5)])[_0x48878a(0x7c2)](0x1,0x64),_0x58a67f=-Number(_0x379140[_0x48878a(0x26d)]||0x0),_0x296592=Math[_0x48878a(0x66c)](_0x379140[_0x48878a(0x5ef)]||0x0,0x0),_0x4580b4=_0x379140[_0x48878a(0x6fc)]||_0x48878a(0x6f0),_0x35efba=_0x379140[_0x48878a(0x4fc)],_0x29955f=$gameScreen[_0x48878a(0x130)](_0x2b051b);if(!_0x29955f)return;_0x29955f[_0x48878a(0x3aa)](_0x58a67f,_0x296592,_0x4580b4);if(_0x35efba){const _0x4bbaf2=$gameTemp[_0x48878a(0x197)]();if(_0x4bbaf2)_0x4bbaf2[_0x48878a(0x6d1)](_0x296592);}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x163),_0x501eb6=>{const _0x4f8c42=_0x32e60b;VisuMZ[_0x4f8c42(0x781)](_0x501eb6,_0x501eb6);const _0x49a25b=Math[_0x4f8c42(0x474)](_0x501eb6[_0x4f8c42(0x1a5)])['clamp'](0x1,0x64),_0x375f21=_0x501eb6[_0x4f8c42(0x1e6)],_0x5ee823=_0x375f21[_0x4f8c42(0x5b3)][_0x4f8c42(0x7c2)](0x0,0x1),_0x51bf85=Math[_0x4f8c42(0x474)](_0x375f21[_0x4f8c42(0x588)]||0x0),_0x5fa63a=Math[_0x4f8c42(0x474)](_0x375f21[_0x4f8c42(0x209)]||0x0),_0x177a6f=Math[_0x4f8c42(0x474)](_0x375f21[_0x4f8c42(0x673)]||0x0),_0x52640e=Math['round'](_0x375f21['ScaleY']||0x0),_0x46469a=Math[_0x4f8c42(0x474)](_0x375f21[_0x4f8c42(0x348)])[_0x4f8c42(0x7c2)](0x0,0xff),_0x8282ad=_0x375f21[_0x4f8c42(0x1ba)],_0x24b733='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x1f13ee=_0x501eb6[_0x4f8c42(0x269)]?_0x4f8c42(0x269):_0x4f8c42(0x445),_0x302eb1=_0x24b733[_0x4f8c42(0x42e)](_0x501eb6['IconIndex'],_0x1f13ee);$gameScreen[_0x4f8c42(0x6f4)](_0x49a25b,_0x302eb1,_0x5ee823,_0x51bf85,_0x5fa63a,_0x177a6f,_0x52640e,_0x46469a,_0x8282ad);}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x85b),_0x5ec9ad=>{const _0x443297=_0x32e60b;VisuMZ['ConvertParams'](_0x5ec9ad,_0x5ec9ad);const _0x5af6e6=_0x5ec9ad[_0x443297(0x629)]||'random',_0x226975=_0x5ec9ad[_0x443297(0x353)][_0x443297(0x7c2)](0x1,0x9),_0x17638e=_0x5ec9ad[_0x443297(0x3a0)]['clamp'](0x1,0x9),_0x335318=_0x5ec9ad[_0x443297(0x5ef)]||0x1,_0x2b15de=_0x5ec9ad[_0x443297(0x4fc)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x5af6e6),$gameScreen[_0x443297(0x1fb)](_0x226975,_0x17638e,_0x335318);if(_0x2b15de){const _0x52e456=$gameTemp[_0x443297(0x197)]();if(_0x52e456)_0x52e456[_0x443297(0x6d1)](_0x335318);}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x13c),_0x4cb26f=>{const _0x460faf=_0x32e60b;if($gameParty[_0x460faf(0x74f)]())return;VisuMZ['ConvertParams'](_0x4cb26f,_0x4cb26f);const _0x231587=_0x4cb26f['IDs'],_0x40b62d=(_0x4cb26f[_0x460faf(0x550)]||0x0)/0x64;for(const _0x4270d5 of _0x231587){const _0x49d87c=Math[_0x460faf(0x5fa)]()<=_0x40b62d;$gameSwitches[_0x460faf(0x4a0)](_0x4270d5,_0x49d87c);}}),PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],'SwitchRandomizeRange',_0xb3ebf2=>{const _0x318ef7=_0x32e60b;if($gameParty[_0x318ef7(0x74f)]())return;VisuMZ[_0x318ef7(0x781)](_0xb3ebf2,_0xb3ebf2);const _0x4fc716=Math[_0x318ef7(0x8bb)](_0xb3ebf2['StartID'],_0xb3ebf2['EndingID']),_0x281210=Math[_0x318ef7(0x66c)](_0xb3ebf2['StartID'],_0xb3ebf2[_0x318ef7(0x224)]),_0x427be0=(_0xb3ebf2[_0x318ef7(0x550)]||0x0)/0x64;for(let _0xee854=_0x4fc716;_0xee854<=_0x281210;_0xee854++){const _0x99a596=Math['random']()<=_0x427be0;$gameSwitches[_0x318ef7(0x4a0)](_0xee854,_0x99a596);}}),PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x788),_0x27b69a=>{const _0x2ad1f3=_0x32e60b;if($gameParty[_0x2ad1f3(0x74f)]())return;VisuMZ['ConvertParams'](_0x27b69a,_0x27b69a);const _0x4c047f=_0x27b69a[_0x2ad1f3(0x1a7)];for(const _0x268144 of _0x4c047f){const _0x3c7bbd=$gameSwitches[_0x2ad1f3(0x59c)](_0x268144);$gameSwitches[_0x2ad1f3(0x4a0)](_0x268144,!_0x3c7bbd);}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x4f3),_0x1f987e=>{const _0x15e189=_0x32e60b;if($gameParty[_0x15e189(0x74f)]())return;VisuMZ[_0x15e189(0x781)](_0x1f987e,_0x1f987e);const _0x4a62d4=Math[_0x15e189(0x8bb)](_0x1f987e['StartID'],_0x1f987e[_0x15e189(0x224)]),_0x1ad6bd=Math[_0x15e189(0x66c)](_0x1f987e[_0x15e189(0x5b8)],_0x1f987e[_0x15e189(0x224)]);for(let _0x3d14ca=_0x4a62d4;_0x3d14ca<=_0x1ad6bd;_0x3d14ca++){const _0x23131a=$gameSwitches['value'](_0x3d14ca);$gameSwitches[_0x15e189(0x4a0)](_0x3d14ca,!_0x23131a);}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x642),_0x29c575=>{const _0x178b70=_0x32e60b;VisuMZ['ConvertParams'](_0x29c575,_0x29c575);const _0x5293b7=_0x29c575['option']||0x1;$gameSystem[_0x178b70(0x2c4)](_0x5293b7);}),PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],'SystemSetSideView',_0x459614=>{const _0x379d52=_0x32e60b;if($gameParty['inBattle']())return;VisuMZ[_0x379d52(0x781)](_0x459614,_0x459614);const _0x16181d=_0x459614[_0x379d52(0x720)];if(_0x16181d[_0x379d52(0x58a)](/Front/i))$gameSystem[_0x379d52(0x531)](![]);else _0x16181d[_0x379d52(0x58a)](/Side/i)?$gameSystem[_0x379d52(0x531)](!![]):$gameSystem[_0x379d52(0x531)](!$gameSystem[_0x379d52(0x85c)]());}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],'SystemLoadAudio',_0x1de0ea=>{const _0x1e29e=_0x32e60b;if($gameParty[_0x1e29e(0x74f)]())return;VisuMZ['ConvertParams'](_0x1de0ea,_0x1de0ea);const _0x13b25f=[_0x1e29e(0x44c),_0x1e29e(0x795),'me','se'];for(const _0x145439 of _0x13b25f){const _0x554809=_0x1de0ea[_0x145439],_0x176f62=_0x1e29e(0x178)['format'](_0x145439);for(const _0x4ed535 of _0x554809){AudioManager[_0x1e29e(0x1ff)](_0x176f62,_0x4ed535);}}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x202),_0x56fa5b=>{const _0x2117e8=_0x32e60b;if($gameParty['inBattle']())return;VisuMZ[_0x2117e8(0x781)](_0x56fa5b,_0x56fa5b);const _0x2b9363=[_0x2117e8(0x2bf),_0x2117e8(0x596),_0x2117e8(0x492),_0x2117e8(0x8b8),_0x2117e8(0x2f5),'faces',_0x2117e8(0x609),_0x2117e8(0x73d),_0x2117e8(0x256),'sv_enemies',_0x2117e8(0x315),_0x2117e8(0x383),'titles1',_0x2117e8(0x897)];for(const _0x12dfc5 of _0x2b9363){const _0x5c9e6c=_0x56fa5b[_0x12dfc5],_0x2b6d4e=_0x2117e8(0x5c6)[_0x2117e8(0x42e)](_0x12dfc5);for(const _0x2f43a9 of _0x5c9e6c){ImageManager[_0x2117e8(0x6c5)](_0x2b6d4e,_0x2f43a9);}}}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],'SystemSetBattleSystem',_0x1e3534=>{const _0x362339=_0x32e60b;if($gameParty['inBattle']())return;VisuMZ[_0x362339(0x781)](_0x1e3534,_0x1e3534);const _0x5e53e2=_0x1e3534['option'][_0x362339(0x58e)]()[_0x362339(0x870)](),_0x5b6085=VisuMZ[_0x362339(0x565)][_0x362339(0x645)](_0x5e53e2);$gameSystem[_0x362339(0x69f)](_0x5b6085);}),VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x645)]=function(_0x3c67e5){const _0x336875=_0x32e60b;_0x3c67e5=_0x3c67e5||_0x336875(0x172),_0x3c67e5=String(_0x3c67e5)[_0x336875(0x58e)]()[_0x336875(0x870)]();switch(_0x3c67e5){case _0x336875(0x67d):return 0x0;case _0x336875(0x43f):Imported[_0x336875(0x739)]&&(ConfigManager[_0x336875(0x6fe)]=!![]);return 0x1;case _0x336875(0x6a1):Imported[_0x336875(0x739)]&&(ConfigManager[_0x336875(0x6fe)]=![]);return 0x2;case _0x336875(0x899):if(Imported[_0x336875(0x58c)])return _0x336875(0x899);break;case _0x336875(0x3f7):if(Imported[_0x336875(0x6d9)])return'STB';break;case'BTB':if(Imported[_0x336875(0x162)])return _0x336875(0x691);break;case _0x336875(0x490):if(Imported[_0x336875(0x7cd)])return _0x336875(0x490);break;case _0x336875(0x62d):if(Imported[_0x336875(0x630)])return _0x336875(0x62d);break;case _0x336875(0x32c):if(Imported['VisuMZ_2_BattleSystemETB'])return'ETB';break;case _0x336875(0x88e):if(Imported[_0x336875(0x152)])return'PTB';break;}return $dataSystem['battleSystem'];},PluginManager['registerCommand'](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x4cc),_0x533310=>{const _0x17ebca=_0x32e60b;VisuMZ[_0x17ebca(0x781)](_0x533310,_0x533310);const _0x4d1502=_0x533310[_0x17ebca(0x720)]||0x1;$gameSystem[_0x17ebca(0x866)](_0x4d1502);}),PluginManager[_0x32e60b(0x7e2)](pluginData[_0x32e60b(0x50d)],_0x32e60b(0x6dd),_0x242b74=>{const _0x35a207=_0x32e60b;VisuMZ[_0x35a207(0x781)](_0x242b74,_0x242b74);const _0x152adf=_0x242b74[_0x35a207(0x711)]||'';$textPopup(_0x152adf);}),PluginManager[_0x32e60b(0x7e2)](pluginData['name'],_0x32e60b(0x380),_0x680d1c=>{const _0x285de7=_0x32e60b;VisuMZ[_0x285de7(0x781)](_0x680d1c,_0x680d1c);const _0x257860=_0x680d1c['id']||0x1,_0x1ed625=_0x680d1c['operation'],_0x403daa=_0x680d1c[_0x285de7(0x3ba)]||0x0;let _0x4da618=$gameVariables[_0x285de7(0x59c)](_0x257860)||0x0;switch(_0x1ed625){case'=':_0x4da618=_0x403daa;break;case'+':_0x4da618+=_0x403daa;break;case'-':_0x4da618-=_0x403daa;break;case'*':_0x4da618*=_0x403daa;break;case'/':_0x4da618/=_0x403daa;break;case'%':_0x4da618%=_0x403daa;break;}_0x4da618=_0x4da618||0x0,$gameVariables[_0x285de7(0x4a0)](_0x257860,_0x4da618);}),PluginManager['registerCommand'](pluginData['name'],_0x32e60b(0x35a),_0x330085=>{const _0x1d35b5=_0x32e60b;VisuMZ['ConvertParams'](_0x330085,_0x330085);const _0x38219e=_0x330085['id']()||0x1,_0x5d0f64=_0x330085['operation'],_0x5c1607=_0x330085['operand']()||0x0;let _0x26a092=$gameVariables[_0x1d35b5(0x59c)](_0x38219e)||0x0;switch(_0x5d0f64){case'=':_0x26a092=_0x5c1607;break;case'+':_0x26a092+=_0x5c1607;break;case'-':_0x26a092-=_0x5c1607;break;case'*':_0x26a092*=_0x5c1607;break;case'/':_0x26a092/=_0x5c1607;break;case'%':_0x26a092%=_0x5c1607;break;}_0x26a092=_0x26a092||0x0,$gameVariables[_0x1d35b5(0x4a0)](_0x38219e,_0x26a092);}),VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x701)]=Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x5ee)],Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x5ee)]=function(){const _0x58e045=_0x32e60b;VisuMZ['CoreEngine'][_0x58e045(0x701)][_0x58e045(0x2d2)](this),this[_0x58e045(0x618)](),this[_0x58e045(0x123)](),this[_0x58e045(0x690)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x58e045(0x807)](),this[_0x58e045(0x406)](),VisuMZ[_0x58e045(0x2d6)]();},VisuMZ['CoreEngine'][_0x32e60b(0x34f)]={},Scene_Boot['prototype'][_0x32e60b(0x618)]=function(){const _0x3d35c2=_0x32e60b,_0xcea22f=[_0x3d35c2(0x871),'MAXMP',_0x3d35c2(0x755),_0x3d35c2(0x408),'MAT',_0x3d35c2(0x4a1),_0x3d35c2(0x164),'LUK'],_0x248538=['HIT',_0x3d35c2(0x173),_0x3d35c2(0x7e4),_0x3d35c2(0x26c),'MEV',_0x3d35c2(0x2e6),_0x3d35c2(0x605),_0x3d35c2(0x46e),_0x3d35c2(0x6be),_0x3d35c2(0x282)],_0x1386b8=[_0x3d35c2(0x108),_0x3d35c2(0x3e8),_0x3d35c2(0x362),'PHA',_0x3d35c2(0x15c),_0x3d35c2(0x78c),_0x3d35c2(0x304),_0x3d35c2(0x6fb),'FDR',_0x3d35c2(0x432)],_0x1f34cb=[_0xcea22f,_0x248538,_0x1386b8],_0x5b8dc2=[_0x3d35c2(0x273),'Plus1',_0x3d35c2(0x7b9),'Max',_0x3d35c2(0x575),_0x3d35c2(0x83a),_0x3d35c2(0x3d8),_0x3d35c2(0x87f),_0x3d35c2(0x67f),_0x3d35c2(0x532)];for(const _0x2fe04c of _0x1f34cb){let _0x3b5ae6='';if(_0x2fe04c===_0xcea22f)_0x3b5ae6=_0x3d35c2(0x787);if(_0x2fe04c===_0x248538)_0x3b5ae6='xparam';if(_0x2fe04c===_0x1386b8)_0x3b5ae6='sparam';for(const _0x32aaba of _0x5b8dc2){let _0x273adb=_0x3d35c2(0x54b)[_0x3d35c2(0x42e)](_0x3b5ae6,_0x32aaba);VisuMZ[_0x3d35c2(0x565)][_0x3d35c2(0x34f)][_0x273adb]=[],VisuMZ['CoreEngine'][_0x3d35c2(0x34f)][_0x273adb+'JS']=[];let _0x3d41bb=_0x3d35c2(0x17f);if(['Plus','Flat'][_0x3d35c2(0x7b0)](_0x32aaba))_0x3d41bb+=_0x3d35c2(0x473);else{if([_0x3d35c2(0x633),_0x3d35c2(0x67f)]['includes'](_0x32aaba))_0x3d41bb+=_0x3d35c2(0x260);else{if(['Plus2',_0x3d35c2(0x532)][_0x3d35c2(0x7b0)](_0x32aaba))_0x3d41bb+=_0x3d35c2(0x388);else{if(_0x32aaba===_0x3d35c2(0x31f))_0x3d41bb+='(\x5cd+)>';else{if(_0x32aaba===_0x3d35c2(0x83a))_0x3d41bb+=_0x3d35c2(0x81b);else _0x32aaba==='Rate2'&&(_0x3d41bb+=_0x3d35c2(0x73c));}}}}for(const _0xecf8bd of _0x2fe04c){let _0x1237a6=_0x32aaba[_0x3d35c2(0x1b6)](/[\d+]/g,'')[_0x3d35c2(0x58e)]();const _0x3e5cea=_0x3d41bb[_0x3d35c2(0x42e)](_0xecf8bd,_0x1237a6);VisuMZ[_0x3d35c2(0x565)]['RegExp'][_0x273adb][_0x3d35c2(0x724)](new RegExp(_0x3e5cea,'i'));const _0x28175c=_0x3d35c2(0x4a8)[_0x3d35c2(0x42e)](_0xecf8bd,_0x1237a6);VisuMZ['CoreEngine'][_0x3d35c2(0x34f)][_0x273adb+'JS'][_0x3d35c2(0x724)](new RegExp(_0x28175c,'i'));}}}},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x123)]=function(){const _0xdb711b=_0x32e60b;if(VisuMZ[_0xdb711b(0x2d6)])return;},Scene_Boot[_0x32e60b(0x303)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x484bb2=_0x32e60b,_0x15ffb4=VisuMZ[_0x484bb2(0x565)]['Settings'];_0x15ffb4[_0x484bb2(0x89e)][_0x484bb2(0x27b)]&&VisuMZ[_0x484bb2(0x570)](!![]);_0x15ffb4[_0x484bb2(0x89e)]['ModernControls']&&(Input[_0x484bb2(0x838)][0x23]=_0x484bb2(0x8bf),Input[_0x484bb2(0x838)][0x24]='home');if(_0x15ffb4[_0x484bb2(0x50c)]){const _0x4e8ed8=_0x15ffb4[_0x484bb2(0x50c)];_0x4e8ed8['KeySHIFT']=_0x4e8ed8[_0x484bb2(0x668)]||_0x484bb2(0x309),_0x4e8ed8[_0x484bb2(0x1b5)]=_0x4e8ed8[_0x484bb2(0x1b5)]||_0x484bb2(0x84d);}_0x15ffb4[_0x484bb2(0x339)][_0x484bb2(0x37d)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]=_0x484bb2(0x322),Input[_0x484bb2(0x838)][0x53]=_0x484bb2(0x7dc),Input[_0x484bb2(0x838)][0x44]=_0x484bb2(0x19e),Input[_0x484bb2(0x838)][0x45]=_0x484bb2(0x723)),_0x15ffb4[_0x484bb2(0x339)][_0x484bb2(0x11d)]&&(Input[_0x484bb2(0x838)][0x52]=_0x484bb2(0x4f5)),_0x15ffb4[_0x484bb2(0x621)][_0x484bb2(0x27f)]=_0x15ffb4['Param'][_0x484bb2(0x27f)][_0x484bb2(0x708)](_0x20b0a6=>_0x20b0a6[_0x484bb2(0x58e)]()[_0x484bb2(0x870)]()),_0x15ffb4[_0x484bb2(0x621)][_0x484bb2(0x767)]=_0x15ffb4[_0x484bb2(0x621)][_0x484bb2(0x767)]['map'](_0x11a3e8=>_0x11a3e8[_0x484bb2(0x58e)]()[_0x484bb2(0x870)]()),_0x15ffb4[_0x484bb2(0x89e)]['ShiftR_Toggle']=_0x15ffb4[_0x484bb2(0x89e)]['ShiftR_Toggle']??!![],_0x15ffb4[_0x484bb2(0x89e)][_0x484bb2(0x22c)]=_0x15ffb4[_0x484bb2(0x89e)][_0x484bb2(0x22c)]??!![];},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x697)]=function(){const _0x5042d9=_0x32e60b;this[_0x5042d9(0x1fe)]();},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x1fe)]=function(){const _0x26d259=_0x32e60b,_0x1e9328=VisuMZ['CoreEngine']['Settings'][_0x26d259(0x346)];for(const _0x59d9d9 of _0x1e9328){const _0x14e811=_0x59d9d9[_0x26d259(0x675)][_0x26d259(0x1b6)](/[ ]/g,''),_0x1e7b4e=_0x59d9d9[_0x26d259(0x544)];VisuMZ[_0x26d259(0x565)][_0x26d259(0x555)](_0x14e811,_0x1e7b4e);}},VisuMZ[_0x32e60b(0x565)]['createJsQuickFunction']=function(_0x3c9c3e,_0x41f8e8){const _0x1b1f21=_0x32e60b;if(!!window[_0x3c9c3e]){if($gameTemp[_0x1b1f21(0x252)]())console[_0x1b1f21(0x57f)](_0x1b1f21(0x11b)['format'](_0x3c9c3e));}const _0x4069b3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x1b1f21(0x42e)](_0x3c9c3e,_0x41f8e8);window[_0x3c9c3e]=new Function(_0x4069b3);},Scene_Boot[_0x32e60b(0x303)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x18c043=_0x32e60b,_0xb6b669=VisuMZ[_0x18c043(0x565)][_0x18c043(0x1e6)]['CustomParam'];if(!_0xb6b669)return;for(const _0x1c4a13 of _0xb6b669){if(!_0x1c4a13)continue;VisuMZ[_0x18c043(0x565)]['createCustomParameter'](_0x1c4a13);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ['CoreEngine']['CustomParamIcons']={},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x552)]={},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x47f)]={},VisuMZ['CoreEngine'][_0x32e60b(0x2ed)]=function(_0x537da1){const _0x3b018d=_0x32e60b,_0x2be7e9=_0x537da1[_0x3b018d(0x61d)],_0x28e9e2=_0x537da1[_0x3b018d(0x859)],_0x162246=_0x537da1[_0x3b018d(0x681)],_0x476511=_0x537da1[_0x3b018d(0x629)],_0x2001d8=new Function(_0x537da1[_0x3b018d(0x824)]);VisuMZ['CoreEngine'][_0x3b018d(0x685)][_0x2be7e9[_0x3b018d(0x58e)]()['trim']()]=_0x28e9e2,VisuMZ[_0x3b018d(0x565)][_0x3b018d(0x373)][_0x2be7e9[_0x3b018d(0x58e)]()[_0x3b018d(0x870)]()]=_0x162246,VisuMZ[_0x3b018d(0x565)]['CustomParamType'][_0x2be7e9[_0x3b018d(0x58e)]()['trim']()]=_0x476511,VisuMZ[_0x3b018d(0x565)][_0x3b018d(0x47f)][_0x2be7e9[_0x3b018d(0x58e)]()[_0x3b018d(0x870)]()]=_0x2be7e9,Object[_0x3b018d(0x77b)](Game_BattlerBase[_0x3b018d(0x303)],_0x2be7e9,{'get'(){const _0x48010a=_0x3b018d,_0x255169=_0x2001d8[_0x48010a(0x2d2)](this);return _0x476511===_0x48010a(0x814)?Math[_0x48010a(0x474)](_0x255169):_0x255169;}});},VisuMZ['CoreEngine'][_0x32e60b(0x3b6)]={},VisuMZ['CoreEngine'][_0x32e60b(0x217)]={},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x406)]=function(){const _0x5070b7=_0x32e60b,_0x84485e=VisuMZ[_0x5070b7(0x565)]['Settings']['ControllerButtons'];for(const _0xdb1eec of _0x84485e){const _0x236e29=(_0xdb1eec[_0x5070b7(0x1c0)]||'')['toLowerCase']()[_0x5070b7(0x870)](),_0x4a7683=(_0xdb1eec[_0x5070b7(0x6ba)]||'')[_0x5070b7(0x7d9)]()[_0x5070b7(0x870)]();VisuMZ[_0x5070b7(0x565)][_0x5070b7(0x3b6)][_0x236e29]=_0xdb1eec,VisuMZ[_0x5070b7(0x565)][_0x5070b7(0x217)][_0x4a7683]=_0x236e29;}},VisuMZ['ParseAllNotetags']=function(){const _0x133691=_0x32e60b;for(const _0x454d33 of $dataActors){if(_0x454d33)VisuMZ[_0x133691(0x748)](_0x454d33);}for(const _0x1a6ddc of $dataClasses){if(_0x1a6ddc)VisuMZ[_0x133691(0x471)](_0x1a6ddc);}for(const _0x45fe2b of $dataSkills){if(_0x45fe2b)VisuMZ[_0x133691(0x4ce)](_0x45fe2b);}for(const _0x29ee0d of $dataItems){if(_0x29ee0d)VisuMZ[_0x133691(0x343)](_0x29ee0d);}for(const _0x1c2248 of $dataWeapons){if(_0x1c2248)VisuMZ[_0x133691(0x761)](_0x1c2248);}for(const _0x569668 of $dataArmors){if(_0x569668)VisuMZ['ParseArmorNotetags'](_0x569668);}for(const _0x22d511 of $dataEnemies){if(_0x22d511)VisuMZ['ParseEnemyNotetags'](_0x22d511);}for(const _0x3fdbc8 of $dataStates){if(_0x3fdbc8)VisuMZ[_0x133691(0x57c)](_0x3fdbc8);}for(const _0xb95ac9 of $dataTilesets){if(_0xb95ac9)VisuMZ[_0x133691(0x634)](_0xb95ac9);}},VisuMZ[_0x32e60b(0x748)]=function(_0x1c0ebf){},VisuMZ['ParseClassNotetags']=function(_0xd6feb5){},VisuMZ[_0x32e60b(0x4ce)]=function(_0x3fc576){},VisuMZ['ParseItemNotetags']=function(_0x45cef2){},VisuMZ[_0x32e60b(0x761)]=function(_0x184788){},VisuMZ[_0x32e60b(0x3b8)]=function(_0x45d810){},VisuMZ[_0x32e60b(0x571)]=function(_0x33fcad){},VisuMZ[_0x32e60b(0x57c)]=function(_0x46b336){},VisuMZ[_0x32e60b(0x634)]=function(_0xf872b0){},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x748)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x32e60b(0x748)]=function(_0x74a91c){const _0x4d89ca=_0x32e60b;VisuMZ[_0x4d89ca(0x565)][_0x4d89ca(0x748)][_0x4d89ca(0x2d2)](this,_0x74a91c);const _0x220f4c=_0x74a91c[_0x4d89ca(0x5d3)];if(_0x220f4c['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x74a91c[_0x4d89ca(0x34c)]=Number(RegExp['$1']);if(_0x74a91c[_0x4d89ca(0x34c)]===0x0)_0x74a91c[_0x4d89ca(0x34c)]=Number[_0x4d89ca(0x4b2)];}_0x220f4c[_0x4d89ca(0x58a)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x74a91c[_0x4d89ca(0x502)]=Math[_0x4d89ca(0x8bb)](Number(RegExp['$1']),_0x74a91c['maxLevel']));},VisuMZ['CoreEngine']['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x32e60b(0x471)]=function(_0x5e9640){const _0x6d429=_0x32e60b;VisuMZ[_0x6d429(0x565)][_0x6d429(0x471)][_0x6d429(0x2d2)](this,_0x5e9640);if(_0x5e9640['learnings'])for(const _0x28bf7c of _0x5e9640[_0x6d429(0x43e)]){_0x28bf7c[_0x6d429(0x5d3)][_0x6d429(0x58a)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x28bf7c['level']=Math[_0x6d429(0x66c)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x571)]=VisuMZ[_0x32e60b(0x571)],VisuMZ[_0x32e60b(0x571)]=function(_0x2bd812){const _0x17aca3=_0x32e60b;VisuMZ['CoreEngine']['ParseEnemyNotetags'][_0x17aca3(0x2d2)](this,_0x2bd812),_0x2bd812[_0x17aca3(0x248)]=0x1;const _0x169dc0=_0x2bd812[_0x17aca3(0x5d3)];if(_0x169dc0[_0x17aca3(0x58a)](/<LEVEL:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x248)]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<MAXHP:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x0]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<MAXMP:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x1]=Number(RegExp['$1']);if(_0x169dc0['match'](/<ATK:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x2]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<DEF:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x3]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<MAT:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x4]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<MDF:[ ](\d+)>/i))_0x2bd812['params'][0x5]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<AGI:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x6]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<LUK:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x528)][0x7]=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<EXP:[ ](\d+)>/i))_0x2bd812['exp']=Number(RegExp['$1']);if(_0x169dc0[_0x17aca3(0x58a)](/<GOLD:[ ](\d+)>/i))_0x2bd812[_0x17aca3(0x14e)]=Number(RegExp['$1']);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x770)]=Graphics[_0x32e60b(0x294)],Graphics[_0x32e60b(0x294)]=function(){const _0x2ec041=_0x32e60b;switch(VisuMZ[_0x2ec041(0x565)][_0x2ec041(0x1e6)][_0x2ec041(0x89e)]['AutoStretch']){case'stretch':return!![];case _0x2ec041(0x79a):return![];default:return VisuMZ['CoreEngine'][_0x2ec041(0x770)][_0x2ec041(0x2d2)](this);}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x72c)]=Graphics[_0x32e60b(0x522)],Graphics[_0x32e60b(0x522)]=function(_0x12af25,_0x400791,_0x1025e0=null){const _0x11c9dd=_0x32e60b;VisuMZ[_0x11c9dd(0x565)][_0x11c9dd(0x72c)][_0x11c9dd(0x2d2)](this,_0x12af25,_0x400791,_0x1025e0),VisuMZ[_0x11c9dd(0x570)](![]);},VisuMZ[_0x32e60b(0x565)]['Graphics_centerElement']=Graphics['_centerElement'],Graphics[_0x32e60b(0x759)]=function(_0x1335bc){const _0x4ae18e=_0x32e60b;VisuMZ['CoreEngine'][_0x4ae18e(0x15f)]['call'](this,_0x1335bc),this['_centerElementCoreEngine'](_0x1335bc);},Graphics['_centerElementCoreEngine']=function(_0x42732b){const _0x2c92dc=_0x32e60b;VisuMZ[_0x2c92dc(0x565)][_0x2c92dc(0x1e6)][_0x2c92dc(0x89e)][_0x2c92dc(0x66f)]&&(_0x42732b[_0x2c92dc(0x4db)][_0x2c92dc(0x394)]='none');VisuMZ[_0x2c92dc(0x565)]['Settings'][_0x2c92dc(0x89e)][_0x2c92dc(0x50f)]&&(_0x42732b[_0x2c92dc(0x4db)][_0x2c92dc(0x6c0)]=_0x2c92dc(0x37c));const _0x358716=Math[_0x2c92dc(0x66c)](0x0,Math['floor'](_0x42732b[_0x2c92dc(0x36c)]*this[_0x2c92dc(0x137)])),_0x508292=Math['max'](0x0,Math[_0x2c92dc(0x338)](_0x42732b[_0x2c92dc(0x32b)]*this[_0x2c92dc(0x137)]));_0x42732b['style'][_0x2c92dc(0x36c)]=_0x358716+'px',_0x42732b[_0x2c92dc(0x4db)][_0x2c92dc(0x32b)]=_0x508292+'px';},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x157)]=Bitmap[_0x32e60b(0x303)][_0x32e60b(0x829)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(_0x42796e,_0x9d7983){const _0x5ba9c9=_0x32e60b;VisuMZ['CoreEngine'][_0x5ba9c9(0x157)]['call'](this,_0x42796e,_0x9d7983),this[_0x5ba9c9(0x63b)]=!(VisuMZ[_0x5ba9c9(0x565)][_0x5ba9c9(0x1e6)]['QoL'][_0x5ba9c9(0x50f)]??!![]);},Bitmap[_0x32e60b(0x303)][_0x32e60b(0x2c0)]=function(){this['_customModified']=!![];},VisuMZ[_0x32e60b(0x565)]['Sprite_destroy']=Sprite[_0x32e60b(0x303)][_0x32e60b(0x29d)],Sprite[_0x32e60b(0x303)][_0x32e60b(0x29d)]=function(){const _0x3e494e=_0x32e60b;if(this[_0x3e494e(0x810)])VisuMZ[_0x3e494e(0x565)][_0x3e494e(0x89d)][_0x3e494e(0x2d2)](this);this[_0x3e494e(0x8ac)]();},Sprite[_0x32e60b(0x303)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x5f22af=_0x32e60b;if(!this[_0x5f22af(0x568)])return;if(!this[_0x5f22af(0x568)][_0x5f22af(0x223)])return;this[_0x5f22af(0x568)]['_baseTexture']&&!this[_0x5f22af(0x5eb)]['_baseTexture'][_0x5f22af(0x7f6)]&&this[_0x5f22af(0x568)][_0x5f22af(0x29d)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x22d)]=Bitmap['prototype'][_0x32e60b(0x64e)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x64e)]=function(_0x5b8b3a,_0x1eb68a){const _0x4c1a34=_0x32e60b;VisuMZ[_0x4c1a34(0x565)][_0x4c1a34(0x22d)]['call'](this,_0x5b8b3a,_0x1eb68a),this[_0x4c1a34(0x2c0)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x69d)]=Bitmap[_0x32e60b(0x303)][_0x32e60b(0x7d6)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x7d6)]=function(_0x24e10d,_0x2de26b,_0x221262,_0xae16ae,_0x3dba96,_0x3ffa4f,_0x1e7e52,_0x32ac55,_0x27af94){const _0x262e8f=_0x32e60b;_0x2de26b=Math['round'](_0x2de26b),_0x221262=Math[_0x262e8f(0x474)](_0x221262),_0xae16ae=Math[_0x262e8f(0x474)](_0xae16ae),_0x3dba96=Math[_0x262e8f(0x474)](_0x3dba96),_0x3ffa4f=Math[_0x262e8f(0x474)](_0x3ffa4f),_0x1e7e52=Math['round'](_0x1e7e52),VisuMZ['CoreEngine']['Bitmap_blt'][_0x262e8f(0x2d2)](this,_0x24e10d,_0x2de26b,_0x221262,_0xae16ae,_0x3dba96,_0x3ffa4f,_0x1e7e52,_0x32ac55,_0x27af94),this['markCoreEngineModified']();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e7)]=Bitmap['prototype'][_0x32e60b(0x1a6)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x1a6)]=function(_0x91a714,_0x3d667f,_0x9dd797,_0x5dc5a3){const _0x4544b6=_0x32e60b;VisuMZ[_0x4544b6(0x565)]['Bitmap_clearRect'][_0x4544b6(0x2d2)](this,_0x91a714,_0x3d667f,_0x9dd797,_0x5dc5a3),this[_0x4544b6(0x2c0)]();},VisuMZ['CoreEngine']['Bitmap_fillRect']=Bitmap[_0x32e60b(0x303)][_0x32e60b(0x5a3)],Bitmap['prototype']['fillRect']=function(_0x243db9,_0x178759,_0x492644,_0x11f220,_0x525aa3){const _0x3d8b69=_0x32e60b;VisuMZ[_0x3d8b69(0x565)][_0x3d8b69(0x60e)][_0x3d8b69(0x2d2)](this,_0x243db9,_0x178759,_0x492644,_0x11f220,_0x525aa3),this[_0x3d8b69(0x2c0)]();},VisuMZ['CoreEngine'][_0x32e60b(0x847)]=Bitmap[_0x32e60b(0x303)][_0x32e60b(0x21c)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x21c)]=function(_0x2fbca4,_0xb7895,_0x2a0b31,_0x2ba8e2,_0x3b648e){const _0x579d9a=_0x32e60b;VisuMZ[_0x579d9a(0x565)][_0x579d9a(0x847)]['call'](this,_0x2fbca4,_0xb7895,_0x2a0b31,_0x2ba8e2,_0x3b648e),this[_0x579d9a(0x2c0)]();},VisuMZ['CoreEngine'][_0x32e60b(0x2a7)]=Bitmap[_0x32e60b(0x303)]['gradientFillRect'],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x267)]=function(_0x2a5f02,_0x599a05,_0x3c3e8a,_0x489f4c,_0x117c4a,_0x202bfd,_0x2863b4){const _0x1bce35=_0x32e60b;VisuMZ[_0x1bce35(0x565)][_0x1bce35(0x2a7)]['call'](this,_0x2a5f02,_0x599a05,_0x3c3e8a,_0x489f4c,_0x117c4a,_0x202bfd,_0x2863b4),this[_0x1bce35(0x2c0)]();},VisuMZ['CoreEngine'][_0x32e60b(0x87a)]=Bitmap[_0x32e60b(0x303)][_0x32e60b(0x1f5)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x1f5)]=function(_0x488b0e,_0x2e6721,_0x2f310e,_0x2a076f){const _0x3afffb=_0x32e60b;_0x488b0e=Math['round'](_0x488b0e),_0x2e6721=Math[_0x3afffb(0x474)](_0x2e6721),_0x2f310e=Math[_0x3afffb(0x474)](_0x2f310e),VisuMZ['CoreEngine'][_0x3afffb(0x87a)][_0x3afffb(0x2d2)](this,_0x488b0e,_0x2e6721,_0x2f310e,_0x2a076f),this[_0x3afffb(0x2c0)]();},VisuMZ['CoreEngine'][_0x32e60b(0x3c9)]=Bitmap[_0x32e60b(0x303)][_0x32e60b(0x5ab)],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x5ab)]=function(_0x23a798){const _0x23aa6d=_0x32e60b;return Math[_0x23aa6d(0x689)](VisuMZ[_0x23aa6d(0x565)][_0x23aa6d(0x3c9)][_0x23aa6d(0x2d2)](this,_0x23a798));},VisuMZ['CoreEngine']['Bitmap_drawText']=Bitmap[_0x32e60b(0x303)]['drawText'],Bitmap[_0x32e60b(0x303)][_0x32e60b(0x7fe)]=function(_0x44c1c9,_0x171b9a,_0x389968,_0x21393e,_0x3e6594,_0x2cabc6){const _0x5cc474=_0x32e60b;_0x171b9a=Math['round'](_0x171b9a),_0x389968=Math['round'](_0x389968),_0x21393e=Math[_0x5cc474(0x689)](_0x21393e),_0x3e6594=Math[_0x5cc474(0x689)](_0x3e6594),VisuMZ[_0x5cc474(0x565)][_0x5cc474(0x6f1)]['call'](this,_0x44c1c9,_0x171b9a,_0x389968,_0x21393e,_0x3e6594,_0x2cabc6),this[_0x5cc474(0x2c0)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x82f)]=Bitmap['prototype'][_0x32e60b(0x819)],Bitmap[_0x32e60b(0x303)]['_drawTextOutline']=function(_0x1cbe5a,_0x3189c0,_0x173a1b,_0x538808){const _0x366490=_0x32e60b;VisuMZ[_0x366490(0x565)][_0x366490(0x1e6)][_0x366490(0x89e)][_0x366490(0x169)]?this['_drawTextShadow'](_0x1cbe5a,_0x3189c0,_0x173a1b,_0x538808):VisuMZ[_0x366490(0x565)][_0x366490(0x82f)]['call'](this,_0x1cbe5a,_0x3189c0,_0x173a1b,_0x538808);},Bitmap[_0x32e60b(0x303)][_0x32e60b(0x465)]=function(_0x11a458,_0x39a6ad,_0x39817e,_0x48e3f9){const _0x317538=_0x32e60b,_0x40573e=this[_0x317538(0x88b)];_0x40573e[_0x317538(0x6e9)]=this[_0x317538(0x18b)],_0x40573e[_0x317538(0x666)](_0x11a458,_0x39a6ad+0x2,_0x39817e+0x2,_0x48e3f9);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x74b)]=Input[_0x32e60b(0x22f)],Input[_0x32e60b(0x22f)]=function(){const _0x4bbd25=_0x32e60b;VisuMZ[_0x4bbd25(0x565)][_0x4bbd25(0x74b)]['call'](this),this[_0x4bbd25(0x181)]=undefined,this[_0x4bbd25(0x660)]=undefined,this[_0x4bbd25(0x74d)]=Input['keyRepeatWait'];},VisuMZ[_0x32e60b(0x565)]['Input_update']=Input[_0x32e60b(0x512)],Input['update']=function(){const _0x78dad4=_0x32e60b;VisuMZ[_0x78dad4(0x565)][_0x78dad4(0x31d)][_0x78dad4(0x2d2)](this);if(this[_0x78dad4(0x74d)])this['_gamepadWait']--;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x6c8)]=Input[_0x32e60b(0x704)],Input[_0x32e60b(0x704)]=function(){const _0x5a5260=_0x32e60b;if(this['_gamepadWait'])return;VisuMZ[_0x5a5260(0x565)][_0x5a5260(0x6c8)][_0x5a5260(0x2d2)](this);},VisuMZ['CoreEngine'][_0x32e60b(0x25f)]=Input[_0x32e60b(0x7c9)],Input[_0x32e60b(0x7c9)]=function(){const _0x361632=_0x32e60b;VisuMZ[_0x361632(0x565)]['Input_setupEventHandlers'][_0x361632(0x2d2)](this),document[_0x361632(0x398)](_0x361632(0x17c),this[_0x361632(0x74e)]['bind'](this));},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x5fb)]=Input[_0x32e60b(0x2ab)],Input[_0x32e60b(0x2ab)]=function(_0x10d7f5){const _0x176400=_0x32e60b;this['_inputSpecialKeyCode']=_0x10d7f5[_0x176400(0x78e)],VisuMZ[_0x176400(0x565)][_0x176400(0x5fb)][_0x176400(0x2d2)](this,_0x10d7f5),this[_0x176400(0x637)](null);},Input[_0x32e60b(0x74e)]=function(_0x5396c9){this['_registerKeyInput'](_0x5396c9);},Input[_0x32e60b(0x726)]=function(_0x1d752e){const _0x3a282a=_0x32e60b;this[_0x3a282a(0x660)]=_0x1d752e[_0x3a282a(0x78e)];let _0x3e7b21=String[_0x3a282a(0x7e1)](_0x1d752e[_0x3a282a(0x3c5)]);this[_0x3a282a(0x181)]===undefined?this['_inputString']=_0x3e7b21:this[_0x3a282a(0x181)]+=_0x3e7b21;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1f2)]=Input[_0x32e60b(0x401)],Input[_0x32e60b(0x401)]=function(_0x4d77c8){const _0x299840=_0x32e60b;if(_0x4d77c8===0x8)return![];return VisuMZ[_0x299840(0x565)][_0x299840(0x1f2)][_0x299840(0x2d2)](this,_0x4d77c8);},Input[_0x32e60b(0x2be)]=function(_0x372614){const _0x577a02=_0x32e60b;if(_0x372614[_0x577a02(0x58a)](/backspace/i))return this[_0x577a02(0x660)]===0x8;if(_0x372614['match'](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x372614['match'](/escape/i))return this[_0x577a02(0x660)]===0x1b;},Input['isNumpadPressed']=function(){const _0x2c32cb=_0x32e60b;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x2c32cb(0x125)](this['_inputSpecialKeyCode']);},Input[_0x32e60b(0x4a9)]=function(){const _0x3b39b3=_0x32e60b;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3b39b3(0x660)]);},Input[_0x32e60b(0x8a6)]=function(){const _0xc4864f=_0x32e60b;if(navigator[_0xc4864f(0x44d)]){const _0x28ad4e=navigator[_0xc4864f(0x44d)]();if(_0x28ad4e)for(const _0x317420 of _0x28ad4e){if(_0x317420&&_0x317420[_0xc4864f(0x6c3)])return!![];}}return![];},Input[_0x32e60b(0x783)]=function(){const _0x370599=_0x32e60b;if(navigator['getGamepads']){const _0x5241d9=navigator[_0x370599(0x44d)]();if(_0x5241d9)for(const _0x3989c3 of _0x5241d9){if(_0x3989c3&&_0x3989c3[_0x370599(0x6c3)]){if(this[_0x370599(0x7f8)](_0x3989c3))return!![];if(this[_0x370599(0x867)](_0x3989c3))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x2e4d05){const _0x2ac9ae=_0x32e60b,_0x392ce8=_0x2e4d05['buttons'];for(let _0x838d94=0x0;_0x838d94<_0x392ce8[_0x2ac9ae(0x4e4)];_0x838d94++){if(_0x392ce8[_0x838d94]['pressed'])return!![];}return![];},Input[_0x32e60b(0x867)]=function(_0x363f1a){const _0x3475c8=_0x32e60b,_0x3c25f0=_0x363f1a[_0x3475c8(0x153)],_0x318577=0.5;if(_0x3c25f0[0x0]<-_0x318577)return!![];if(_0x3c25f0[0x0]>_0x318577)return!![];if(_0x3c25f0[0x1]<-_0x318577)return!![];if(_0x3c25f0[0x1]>_0x318577)return!![];return![];},Input[_0x32e60b(0x80a)]=function(){const _0x531992=_0x32e60b;return this[_0x531992(0x82c)]||null;},Input[_0x32e60b(0x637)]=function(_0xe759b){const _0x55206c=_0x32e60b;this[_0x55206c(0x82c)]=_0xe759b;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x46d)]=Input['_updateGamepadState'],Input[_0x32e60b(0x4af)]=function(_0x291d9c){const _0x3991b1=_0x32e60b;VisuMZ[_0x3991b1(0x565)][_0x3991b1(0x46d)][_0x3991b1(0x2d2)](this,_0x291d9c),(this[_0x3991b1(0x7f8)](_0x291d9c)||this[_0x3991b1(0x867)](_0x291d9c))&&this[_0x3991b1(0x637)](_0x291d9c);},Input['getLastUsedGamepadType']=function(){const _0x1102cb=_0x32e60b;return this[_0x1102cb(0x82c)]?this[_0x1102cb(0x82c)]['id']:'Keyboard';},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x641)]=Tilemap[_0x32e60b(0x303)][_0x32e60b(0x8cb)],Tilemap['prototype'][_0x32e60b(0x8cb)]=function(_0x53876d,_0x2a5cec,_0x4df14e,_0x708df9){const _0x587b27=_0x32e60b;if($gameMap&&$gameMap[_0x587b27(0x225)]())return;VisuMZ[_0x587b27(0x565)][_0x587b27(0x641)][_0x587b27(0x2d2)](this,_0x53876d,_0x2a5cec,_0x4df14e,_0x708df9);},Tilemap[_0x32e60b(0x809)][_0x32e60b(0x303)][_0x32e60b(0x40b)]=function(){const _0x2923ee=_0x32e60b;this['_destroyInternalTextures']();for(let _0x5a28e7=0x0;_0x5a28e7<Tilemap['Layer'][_0x2923ee(0x815)];_0x5a28e7++){const _0x1f10fd=new PIXI['BaseTexture']();_0x1f10fd[_0x2923ee(0x4d4)](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x2923ee(0x89e)][_0x2923ee(0x50f)]&&(_0x1f10fd[_0x2923ee(0x82a)]=PIXI[_0x2923ee(0x1ab)][_0x2923ee(0x648)]),this[_0x2923ee(0x105)][_0x2923ee(0x724)](_0x1f10fd);}},WindowLayer['prototype'][_0x32e60b(0x59d)]=function(){const _0x41e500=_0x32e60b;return SceneManager&&SceneManager[_0x41e500(0x10b)]?SceneManager[_0x41e500(0x10b)][_0x41e500(0x76a)]():!![];},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer[_0x32e60b(0x303)][_0x32e60b(0x79b)],WindowLayer[_0x32e60b(0x303)]['render']=function render(_0x1c8af4){const _0x503d88=_0x32e60b;this['isMaskingEnabled']()?VisuMZ[_0x503d88(0x565)][_0x503d88(0x579)][_0x503d88(0x2d2)](this,_0x1c8af4):this['renderNoMask'](_0x1c8af4);},WindowLayer['prototype']['renderNoMask']=function render(_0x3ab043){const _0xdc636b=_0x32e60b;if(!this[_0xdc636b(0x270)])return;const _0x554130=new PIXI[(_0xdc636b(0x60c))](),_0x5e4545=_0x3ab043['gl'],_0x5184b0=this['children']['clone']();_0x3ab043['framebuffer'][_0xdc636b(0x5cb)](),_0x554130[_0xdc636b(0x5d9)]=this['transform'],_0x3ab043['batch'][_0xdc636b(0x14d)](),_0x5e4545[_0xdc636b(0x6a5)](_0x5e4545[_0xdc636b(0x4e1)]);while(_0x5184b0['length']>0x0){const _0x67ddee=_0x5184b0[_0xdc636b(0x67c)]();_0x67ddee['_isWindow']&&_0x67ddee[_0xdc636b(0x270)]&&_0x67ddee['openness']>0x0&&(_0x5e4545[_0xdc636b(0x8cd)](_0x5e4545[_0xdc636b(0x1ca)],0x0,~0x0),_0x5e4545[_0xdc636b(0x20c)](_0x5e4545[_0xdc636b(0x832)],_0x5e4545[_0xdc636b(0x832)],_0x5e4545[_0xdc636b(0x832)]),_0x67ddee[_0xdc636b(0x79b)](_0x3ab043),_0x3ab043['batch'][_0xdc636b(0x14d)](),_0x554130[_0xdc636b(0x22f)](),_0x5e4545[_0xdc636b(0x8cd)](_0x5e4545[_0xdc636b(0x3e0)],0x1,~0x0),_0x5e4545[_0xdc636b(0x20c)](_0x5e4545[_0xdc636b(0x627)],_0x5e4545['REPLACE'],_0x5e4545[_0xdc636b(0x627)]),_0x5e4545[_0xdc636b(0x109)](_0x5e4545[_0xdc636b(0x518)],_0x5e4545[_0xdc636b(0x227)]),_0x554130[_0xdc636b(0x79b)](_0x3ab043),_0x3ab043['batch'][_0xdc636b(0x14d)](),_0x5e4545[_0xdc636b(0x109)](_0x5e4545[_0xdc636b(0x227)],_0x5e4545[_0xdc636b(0x59f)]));}_0x5e4545[_0xdc636b(0x5dc)](_0x5e4545[_0xdc636b(0x4e1)]),_0x5e4545[_0xdc636b(0x22f)](_0x5e4545['STENCIL_BUFFER_BIT']),_0x5e4545[_0xdc636b(0x22b)](0x0),_0x3ab043[_0xdc636b(0x6bd)]['flush']();for(const _0x97f715 of this[_0xdc636b(0x38e)]){!_0x97f715[_0xdc636b(0x6f9)]&&_0x97f715[_0xdc636b(0x270)]&&_0x97f715[_0xdc636b(0x79b)](_0x3ab043);}_0x3ab043['batch'][_0xdc636b(0x14d)]();},DataManager[_0x32e60b(0x77c)]=function(_0x356c38){const _0x20b006=_0x32e60b;return this[_0x20b006(0x359)](_0x356c38)&&_0x356c38[_0x20b006(0x813)]===0x2;},VisuMZ['CoreEngine'][_0x32e60b(0x144)]=DataManager[_0x32e60b(0x682)],DataManager[_0x32e60b(0x682)]=function(){const _0x43b1f6=_0x32e60b;VisuMZ[_0x43b1f6(0x565)][_0x43b1f6(0x144)][_0x43b1f6(0x2d2)](this),this[_0x43b1f6(0x22a)](),this[_0x43b1f6(0x1b0)]();},DataManager[_0x32e60b(0x22a)]=function(){const _0x251604=_0x32e60b;if($gameTemp['isPlaytest']()){const _0x4dc950=VisuMZ[_0x251604(0x565)][_0x251604(0x1e6)][_0x251604(0x89e)][_0x251604(0x514)];if(_0x4dc950>0x0)$gameTemp[_0x251604(0x657)](_0x4dc950);}},DataManager[_0x32e60b(0x1b0)]=function(){const _0x575e50=_0x32e60b,_0x33008d=VisuMZ[_0x575e50(0x565)][_0x575e50(0x1e6)][_0x575e50(0x89e)][_0x575e50(0x865)]||0x0;if(_0x33008d>0x0)$gameTemp[_0x575e50(0x657)](_0x33008d);},DataManager[_0x32e60b(0x335)]=function(_0x5aef3c){const _0x2e90e0=_0x32e60b,_0x43e12b=$dataTroops[_0x5aef3c];if(!_0x43e12b)return'';let _0x204fec='';_0x204fec+=_0x43e12b[_0x2e90e0(0x50d)];for(const _0x142ebf of _0x43e12b[_0x2e90e0(0x425)]){for(const _0xdc4ac3 of _0x142ebf[_0x2e90e0(0x4c6)]){[0x6c,0x198][_0x2e90e0(0x7b0)](_0xdc4ac3[_0x2e90e0(0x21a)])&&(_0x204fec+='\x0a',_0x204fec+=_0xdc4ac3[_0x2e90e0(0x2ce)][0x0]);}}return _0x204fec;};(VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x89e)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x6d6)]=Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x35f)],Scene_Base[_0x32e60b(0x303)]['create']=function(){const _0x3a388f=_0x32e60b;VisuMZ[_0x3a388f(0x565)]['Scene_Base_create'][_0x3a388f(0x2d2)](this),$scene=this;},$spriteset=null,VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x5c4)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x38c)]=function(){const _0x1f2437=_0x32e60b;VisuMZ[_0x1f2437(0x565)]['Scene_Map_createSpriteset']['call'](this),$spriteset=this[_0x1f2437(0x68e)];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x78b)]=Scene_Battle[_0x32e60b(0x303)][_0x32e60b(0x38c)],Scene_Battle[_0x32e60b(0x303)]['createSpriteset']=function(){const _0xac19e9=_0x32e60b;VisuMZ[_0xac19e9(0x565)][_0xac19e9(0x78b)]['call'](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x32e60b(0x427)]=Scene_Base['prototype']['terminate'],Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x5fd)]=function(){const _0x5ab0e7=_0x32e60b;VisuMZ[_0x5ab0e7(0x565)][_0x5ab0e7(0x427)][_0x5ab0e7(0x2d2)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x32e60b(0x142)]=BattleManager[_0x32e60b(0x512)],BattleManager[_0x32e60b(0x512)]=function(_0x45b176){const _0x566acc=_0x32e60b;VisuMZ['CoreEngine'][_0x566acc(0x142)]['call'](this,_0x45b176),$subject=this[_0x566acc(0x1a9)],$targets=this[_0x566acc(0x3f0)],$target=this[_0x566acc(0x185)]||this[_0x566acc(0x3f0)][0x0];},$event=null,VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x38a)]=Game_Event[_0x32e60b(0x303)]['start'],Game_Event['prototype']['start']=function(){const _0x3fdb58=_0x32e60b;VisuMZ[_0x3fdb58(0x565)]['Game_Event_start'][_0x3fdb58(0x2d2)](this),$event=this;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x782)]=Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x512)],Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x510964=_0x32e60b;VisuMZ['CoreEngine'][_0x510964(0x782)][_0x510964(0x2d2)](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x32e60b(0x303)][_0x32e60b(0x236)]=function(){const _0x467c6d=_0x32e60b;!this[_0x467c6d(0x457)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x306ce6){const _0x863128=_0x32e60b;if($gameTemp)$gameTemp[_0x863128(0x657)](_0x306ce6);});;$onceParallel=function(_0x1683ed,_0x295d6c){const _0x5d6855=_0x32e60b;if(SceneManager[_0x5d6855(0x3bd)]())SceneManager[_0x5d6855(0x10b)][_0x5d6855(0x237)](_0x1683ed,_0x295d6c);else{if(SceneManager[_0x5d6855(0x5b6)]()){if(Imported['VisuMZ_1_BattleCore'])SceneManager['_scene']['playOnceParallelInterpreter'](_0x1683ed);else $gameTemp&&$gameTemp[_0x5d6855(0x252)]()&&alert(_0x5d6855(0x17e));}else $gameTemp&&$gameTemp[_0x5d6855(0x252)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}},StorageManager[_0x32e60b(0x86e)]=function(_0x221f76){return new Promise((_0x41936e,_0xf763d)=>{const _0xa8b507=_0x1f8f;try{const _0x1ff593=pako[_0xa8b507(0x62c)](_0x221f76,{'to':_0xa8b507(0x41c),'level':0x1});if(_0x1ff593[_0xa8b507(0x4e4)]>=0xc350){}_0x41936e(_0x1ff593);}catch(_0x5e5955){_0xf763d(_0x5e5955);}});},TextManager[_0x32e60b(0x527)]=['','','',_0x32e60b(0x750),'','','HELP','',_0x32e60b(0x27e),_0x32e60b(0x412),'','','CLEAR',_0x32e60b(0x320),_0x32e60b(0x232),'',_0x32e60b(0x604),'CTRL',_0x32e60b(0x2df),_0x32e60b(0x159),'CAPSLOCK',_0x32e60b(0x26e),'EISU',_0x32e60b(0x368),'FINAL',_0x32e60b(0x4ab),'',_0x32e60b(0x342),_0x32e60b(0x73b),'NONCONVERT',_0x32e60b(0x715),'MODECHANGE',_0x32e60b(0x1d2),_0x32e60b(0x54a),'PGDN',_0x32e60b(0x622),_0x32e60b(0x56a),'LEFT','UP',_0x32e60b(0x19b),'DOWN',_0x32e60b(0x55c),_0x32e60b(0x3bf),_0x32e60b(0x1d3),'PRINTSCREEN',_0x32e60b(0x43b),_0x32e60b(0x4ba),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x32e60b(0x63c),'LESS_THAN',_0x32e60b(0x6de),_0x32e60b(0x483),_0x32e60b(0x7b8),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','','CONTEXT_MENU','',_0x32e60b(0x49e),_0x32e60b(0x25a),_0x32e60b(0x893),'NUMPAD2',_0x32e60b(0x61e),_0x32e60b(0x1e2),_0x32e60b(0x7a0),_0x32e60b(0x2b3),'NUMPAD7',_0x32e60b(0x559),_0x32e60b(0x71c),_0x32e60b(0x354),_0x32e60b(0x3e9),_0x32e60b(0x2e1),_0x32e60b(0x1f8),'DECIMAL',_0x32e60b(0x743),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x32e60b(0x751),_0x32e60b(0x7bd),_0x32e60b(0x479),'F14',_0x32e60b(0x868),_0x32e60b(0x88f),'F17',_0x32e60b(0x7ce),_0x32e60b(0x3f8),'F20',_0x32e60b(0x463),'F22','F23',_0x32e60b(0x3fc),'','','','','','','','','NUM_LOCK',_0x32e60b(0x6a6),_0x32e60b(0x17b),_0x32e60b(0x63a),_0x32e60b(0x24d),_0x32e60b(0x4cb),_0x32e60b(0x179),'','','','','','','','','',_0x32e60b(0x6e3),'EXCLAMATION',_0x32e60b(0x61b),_0x32e60b(0x154),_0x32e60b(0x4aa),_0x32e60b(0x25e),'AMPERSAND',_0x32e60b(0x2fc),_0x32e60b(0x5a5),_0x32e60b(0x5b0),'ASTERISK',_0x32e60b(0x59e),_0x32e60b(0x23c),_0x32e60b(0x13a),_0x32e60b(0x7d2),_0x32e60b(0x789),_0x32e60b(0x324),'','','','',_0x32e60b(0x1aa),'VOLUME_DOWN',_0x32e60b(0x5e1),'','',_0x32e60b(0x63c),_0x32e60b(0x6de),_0x32e60b(0x4c2),'MINUS','PERIOD','SLASH','BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x32e60b(0x4dc),'BACK_SLASH',_0x32e60b(0x576),_0x32e60b(0x174),'','META',_0x32e60b(0x542),'','WIN_ICO_HELP',_0x32e60b(0x69c),'',_0x32e60b(0x4bb),'','',_0x32e60b(0x13f),_0x32e60b(0x4bd),'WIN_OEM_PA1',_0x32e60b(0x5ea),_0x32e60b(0x561),_0x32e60b(0x234),_0x32e60b(0x8c0),'WIN_OEM_ATTN',_0x32e60b(0x1de),_0x32e60b(0x395),_0x32e60b(0x643),'WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x32e60b(0x569),'CRSEL',_0x32e60b(0x1dc),_0x32e60b(0x7ac),'PLAY',_0x32e60b(0x8d8),'',_0x32e60b(0x496),_0x32e60b(0x288),''],TextManager[_0x32e60b(0x5bc)]=VisuMZ['CoreEngine']['Settings'][_0x32e60b(0x50c)][_0x32e60b(0x251)],TextManager[_0x32e60b(0x3e6)]=VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x50c)][_0x32e60b(0x52f)],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine'][_0x32e60b(0x1e6)]['ButtonAssist']['SwitchActorText'],VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x5ac)]=TextManager[_0x32e60b(0x787)],TextManager['param']=function(_0x14cb66){const _0x19adac=_0x32e60b;return typeof _0x14cb66==='number'?VisuMZ[_0x19adac(0x565)][_0x19adac(0x5ac)][_0x19adac(0x2d2)](this,_0x14cb66):this[_0x19adac(0x586)](_0x14cb66);},TextManager[_0x32e60b(0x586)]=function(_0x1e16f2){const _0x5a09b2=_0x32e60b;_0x1e16f2=String(_0x1e16f2||'')[_0x5a09b2(0x58e)]();const _0x4845a1=VisuMZ[_0x5a09b2(0x565)][_0x5a09b2(0x1e6)]['Param'];if(_0x1e16f2===_0x5a09b2(0x871))return $dataSystem['terms']['params'][0x0];if(_0x1e16f2===_0x5a09b2(0x8b2))return $dataSystem[_0x5a09b2(0x7e7)][_0x5a09b2(0x528)][0x1];if(_0x1e16f2==='ATK')return $dataSystem[_0x5a09b2(0x7e7)][_0x5a09b2(0x528)][0x2];if(_0x1e16f2==='DEF')return $dataSystem[_0x5a09b2(0x7e7)][_0x5a09b2(0x528)][0x3];if(_0x1e16f2===_0x5a09b2(0x766))return $dataSystem[_0x5a09b2(0x7e7)]['params'][0x4];if(_0x1e16f2===_0x5a09b2(0x4a1))return $dataSystem[_0x5a09b2(0x7e7)][_0x5a09b2(0x528)][0x5];if(_0x1e16f2===_0x5a09b2(0x164))return $dataSystem[_0x5a09b2(0x7e7)][_0x5a09b2(0x528)][0x6];if(_0x1e16f2===_0x5a09b2(0x88a))return $dataSystem['terms'][_0x5a09b2(0x528)][0x7];if(_0x1e16f2===_0x5a09b2(0x875))return _0x4845a1[_0x5a09b2(0x77f)];if(_0x1e16f2==='EVA')return _0x4845a1['XParamVocab1'];if(_0x1e16f2==='CRI')return _0x4845a1[_0x5a09b2(0x75d)];if(_0x1e16f2==='CEV')return _0x4845a1[_0x5a09b2(0x8c8)];if(_0x1e16f2===_0x5a09b2(0x5aa))return _0x4845a1[_0x5a09b2(0x4a7)];if(_0x1e16f2===_0x5a09b2(0x2e6))return _0x4845a1[_0x5a09b2(0x1a3)];if(_0x1e16f2===_0x5a09b2(0x605))return _0x4845a1['XParamVocab6'];if(_0x1e16f2===_0x5a09b2(0x46e))return _0x4845a1[_0x5a09b2(0x229)];if(_0x1e16f2==='MRG')return _0x4845a1[_0x5a09b2(0x59b)];if(_0x1e16f2===_0x5a09b2(0x282))return _0x4845a1['XParamVocab9'];if(_0x1e16f2===_0x5a09b2(0x108))return _0x4845a1[_0x5a09b2(0x86b)];if(_0x1e16f2==='GRD')return _0x4845a1[_0x5a09b2(0x65f)];if(_0x1e16f2==='REC')return _0x4845a1['SParamVocab2'];if(_0x1e16f2===_0x5a09b2(0x4e0))return _0x4845a1[_0x5a09b2(0x1b7)];if(_0x1e16f2===_0x5a09b2(0x15c))return _0x4845a1[_0x5a09b2(0x4be)];if(_0x1e16f2===_0x5a09b2(0x78c))return _0x4845a1['SParamVocab5'];if(_0x1e16f2==='PDR')return _0x4845a1[_0x5a09b2(0x700)];if(_0x1e16f2===_0x5a09b2(0x6fb))return _0x4845a1[_0x5a09b2(0x82e)];if(_0x1e16f2===_0x5a09b2(0x663))return _0x4845a1[_0x5a09b2(0x127)];if(_0x1e16f2===_0x5a09b2(0x432))return _0x4845a1[_0x5a09b2(0x39f)];if(VisuMZ[_0x5a09b2(0x565)][_0x5a09b2(0x685)][_0x1e16f2])return VisuMZ['CoreEngine'][_0x5a09b2(0x685)][_0x1e16f2];return'';},TextManager['getInputButtonString']=function(_0xd31223){const _0x108312=_0x32e60b,_0x13c344=Input['getLastUsedGamepadType']();return _0x13c344==='Keyboard'?this[_0x108312(0x14b)](_0xd31223):this[_0x108312(0x716)](_0x13c344,_0xd31223);},TextManager[_0x32e60b(0x14b)]=function(_0x3c2cd7){const _0x2d22e1=_0x32e60b,_0xf1de84=VisuMZ['CoreEngine'][_0x2d22e1(0x1e6)][_0x2d22e1(0x50c)][_0x2d22e1(0x39d)];if(!_0xf1de84){if(_0x3c2cd7===_0x2d22e1(0x679))_0x3c2cd7=_0x2d22e1(0x468);if(_0x3c2cd7===_0x2d22e1(0x175))_0x3c2cd7=_0x2d22e1(0x468);}let _0x34e6aa=[];for(let _0x3cbe17 in Input[_0x2d22e1(0x838)]){_0x3cbe17=Number(_0x3cbe17);if(_0x3cbe17>=0x60&&_0x3cbe17<=0x69)continue;if([0x12,0x20][_0x2d22e1(0x7b0)](_0x3cbe17))continue;_0x3c2cd7===Input[_0x2d22e1(0x838)][_0x3cbe17]&&_0x34e6aa['push'](_0x3cbe17);}for(let _0x3be3a2=0x0;_0x3be3a2<_0x34e6aa[_0x2d22e1(0x4e4)];_0x3be3a2++){_0x34e6aa[_0x3be3a2]=TextManager['stringKeyMap'][_0x34e6aa[_0x3be3a2]];}return this[_0x2d22e1(0x3af)](_0x34e6aa);},TextManager[_0x32e60b(0x3af)]=function(_0x52212c){const _0x36ea0b=_0x32e60b,_0x3b0782=VisuMZ[_0x36ea0b(0x565)]['Settings'][_0x36ea0b(0x50c)],_0x4cfb82=_0x3b0782[_0x36ea0b(0x84b)],_0xc5bbf9=_0x52212c[_0x36ea0b(0x1d1)](),_0x45b178='Key%1'[_0x36ea0b(0x42e)](_0xc5bbf9);return _0x3b0782[_0x45b178]?_0x3b0782[_0x45b178]:_0x4cfb82[_0x36ea0b(0x42e)](_0xc5bbf9);},TextManager[_0x32e60b(0x1bf)]=function(_0x59a913,_0xfb1d14){const _0x38e001=_0x32e60b,_0x19e45a=VisuMZ[_0x38e001(0x565)][_0x38e001(0x1e6)][_0x38e001(0x50c)],_0x112fa5=_0x19e45a[_0x38e001(0x580)],_0x410bcf=this[_0x38e001(0x6f7)](_0x59a913),_0x2e7d34=this[_0x38e001(0x6f7)](_0xfb1d14);return _0x112fa5[_0x38e001(0x42e)](_0x410bcf,_0x2e7d34);},TextManager[_0x32e60b(0x716)]=function(_0x5f26ce,_0x442d2c){const _0x3bed83=_0x32e60b,_0x22ed00=_0x5f26ce['toLowerCase']()['trim'](),_0x3bb27d=VisuMZ[_0x3bed83(0x565)]['ControllerButtons'][_0x22ed00];if(!_0x3bb27d)return this[_0x3bed83(0x28d)](_0x5f26ce,_0x442d2c);return _0x3bb27d[_0x442d2c]||this[_0x3bed83(0x14b)](_0x5f26ce,_0x442d2c);},TextManager[_0x32e60b(0x28d)]=function(_0x57653a,_0x177983){const _0xff47f3=_0x32e60b,_0x28069c=_0x57653a[_0xff47f3(0x7d9)]()[_0xff47f3(0x870)]();for(const _0x3d82b2 in VisuMZ['CoreEngine'][_0xff47f3(0x217)]){if(_0x28069c['includes'](_0x3d82b2)){const _0x532a2d=VisuMZ[_0xff47f3(0x565)][_0xff47f3(0x217)][_0x3d82b2],_0x54d79f=VisuMZ[_0xff47f3(0x565)][_0xff47f3(0x3b6)][_0x532a2d];return _0x54d79f[_0x177983]||this[_0xff47f3(0x14b)](_0x177983);}}return this[_0xff47f3(0x14b)](_0x177983);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x195)]=ColorManager[_0x32e60b(0x1e1)],ColorManager['loadWindowskin']=function(){const _0x5e6e5d=_0x32e60b;VisuMZ[_0x5e6e5d(0x565)]['ColorManager_loadWindowskin'][_0x5e6e5d(0x2d2)](this),this['_colorCache']=this[_0x5e6e5d(0x3ee)]||{};},ColorManager[_0x32e60b(0x491)]=function(_0x5ca3ee,_0x385dbb){const _0x3d78ce=_0x32e60b;return _0x385dbb=String(_0x385dbb),this[_0x3d78ce(0x3ee)]=this[_0x3d78ce(0x3ee)]||{},_0x385dbb[_0x3d78ce(0x58a)](/#(.*)/i)?this[_0x3d78ce(0x3ee)][_0x5ca3ee]=_0x3d78ce(0x2dc)[_0x3d78ce(0x42e)](String(RegExp['$1'])):this[_0x3d78ce(0x3ee)][_0x5ca3ee]=this[_0x3d78ce(0x76b)](Number(_0x385dbb)),this['_colorCache'][_0x5ca3ee];},ColorManager['getColor']=function(_0x263f60){const _0x1ded72=_0x32e60b;return _0x263f60=String(_0x263f60),_0x263f60['match'](/#(.*)/i)?_0x1ded72(0x2dc)[_0x1ded72(0x42e)](String(RegExp['$1'])):this[_0x1ded72(0x76b)](Number(_0x263f60));},ColorManager[_0x32e60b(0x8a9)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x161bdd=_0x32e60b,_0xd70dda='_stored_normalColor';this['_colorCache']=this[_0x161bdd(0x3ee)]||{};if(this[_0x161bdd(0x3ee)][_0xd70dda])return this['_colorCache'][_0xd70dda];const _0x1415aa=VisuMZ[_0x161bdd(0x565)][_0x161bdd(0x1e6)][_0x161bdd(0x138)]['ColorNormal'];return this[_0x161bdd(0x491)](_0xd70dda,_0x1415aa);},ColorManager[_0x32e60b(0x389)]=function(){const _0x349683=_0x32e60b,_0x10385e='_stored_systemColor';this['_colorCache']=this[_0x349683(0x3ee)]||{};if(this[_0x349683(0x3ee)][_0x10385e])return this[_0x349683(0x3ee)][_0x10385e];const _0x586ead=VisuMZ[_0x349683(0x565)][_0x349683(0x1e6)][_0x349683(0x138)]['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x10385e,_0x586ead);},ColorManager[_0x32e60b(0x25c)]=function(){const _0x2cd265=_0x32e60b,_0x5801f9=_0x2cd265(0x36e);this[_0x2cd265(0x3ee)]=this['_colorCache']||{};if(this[_0x2cd265(0x3ee)][_0x5801f9])return this['_colorCache'][_0x5801f9];const _0x2c0631=VisuMZ[_0x2cd265(0x565)]['Settings'][_0x2cd265(0x138)][_0x2cd265(0x7a4)];return this[_0x2cd265(0x491)](_0x5801f9,_0x2c0631);},ColorManager['deathColor']=function(){const _0xc8363e=_0x32e60b,_0x5812dc=_0xc8363e(0x136);this[_0xc8363e(0x3ee)]=this['_colorCache']||{};if(this[_0xc8363e(0x3ee)][_0x5812dc])return this['_colorCache'][_0x5812dc];const _0x20aefd=VisuMZ['CoreEngine'][_0xc8363e(0x1e6)][_0xc8363e(0x138)]['ColorDeath'];return this[_0xc8363e(0x491)](_0x5812dc,_0x20aefd);},ColorManager['gaugeBackColor']=function(){const _0x358328=_0x32e60b,_0x162cc9='_stored_gaugeBackColor';this[_0x358328(0x3ee)]=this['_colorCache']||{};if(this[_0x358328(0x3ee)][_0x162cc9])return this[_0x358328(0x3ee)][_0x162cc9];const _0x1b46a7=VisuMZ['CoreEngine']['Settings'][_0x358328(0x138)][_0x358328(0x598)];return this[_0x358328(0x491)](_0x162cc9,_0x1b46a7);},ColorManager[_0x32e60b(0x5cd)]=function(){const _0x3c7827=_0x32e60b,_0x232cc6=_0x3c7827(0x64c);this['_colorCache']=this[_0x3c7827(0x3ee)]||{};if(this[_0x3c7827(0x3ee)][_0x232cc6])return this['_colorCache'][_0x232cc6];const _0x133138=VisuMZ['CoreEngine'][_0x3c7827(0x1e6)][_0x3c7827(0x138)]['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x232cc6,_0x133138);},ColorManager['hpGaugeColor2']=function(){const _0x10d740=_0x32e60b,_0x5c6a0f='_stored_hpGaugeColor2';this[_0x10d740(0x3ee)]=this[_0x10d740(0x3ee)]||{};if(this[_0x10d740(0x3ee)][_0x5c6a0f])return this[_0x10d740(0x3ee)][_0x5c6a0f];const _0x353f33=VisuMZ[_0x10d740(0x565)][_0x10d740(0x1e6)]['Color'][_0x10d740(0x292)];return this[_0x10d740(0x491)](_0x5c6a0f,_0x353f33);},ColorManager['mpGaugeColor1']=function(){const _0x1af3b5=_0x32e60b,_0x2b1017=_0x1af3b5(0x8c3);this['_colorCache']=this[_0x1af3b5(0x3ee)]||{};if(this[_0x1af3b5(0x3ee)][_0x2b1017])return this[_0x1af3b5(0x3ee)][_0x2b1017];const _0x326d49=VisuMZ[_0x1af3b5(0x565)][_0x1af3b5(0x1e6)]['Color'][_0x1af3b5(0x6e1)];return this[_0x1af3b5(0x491)](_0x2b1017,_0x326d49);},ColorManager[_0x32e60b(0x7f5)]=function(){const _0x567e7d=_0x32e60b,_0x32ff79='_stored_mpGaugeColor2';this[_0x567e7d(0x3ee)]=this[_0x567e7d(0x3ee)]||{};if(this['_colorCache'][_0x32ff79])return this[_0x567e7d(0x3ee)][_0x32ff79];const _0xfa75b4=VisuMZ[_0x567e7d(0x565)][_0x567e7d(0x1e6)]['Color'][_0x567e7d(0x250)];return this[_0x567e7d(0x491)](_0x32ff79,_0xfa75b4);},ColorManager['mpCostColor']=function(){const _0x2bacb6=_0x32e60b,_0x539e6f=_0x2bacb6(0x3d7);this['_colorCache']=this[_0x2bacb6(0x3ee)]||{};if(this[_0x2bacb6(0x3ee)][_0x539e6f])return this['_colorCache'][_0x539e6f];const _0x139fc4=VisuMZ['CoreEngine']['Settings'][_0x2bacb6(0x138)][_0x2bacb6(0x4f4)];return this[_0x2bacb6(0x491)](_0x539e6f,_0x139fc4);},ColorManager[_0x32e60b(0x27c)]=function(){const _0x857c9f=_0x32e60b,_0x20c677=_0x857c9f(0x375);this['_colorCache']=this[_0x857c9f(0x3ee)]||{};if(this[_0x857c9f(0x3ee)][_0x20c677])return this['_colorCache'][_0x20c677];const _0x429b27=VisuMZ[_0x857c9f(0x565)][_0x857c9f(0x1e6)][_0x857c9f(0x138)][_0x857c9f(0x19a)];return this['getColorDataFromPluginParameters'](_0x20c677,_0x429b27);},ColorManager[_0x32e60b(0x497)]=function(){const _0x505411=_0x32e60b,_0x1b60be='_stored_powerDownColor';this[_0x505411(0x3ee)]=this[_0x505411(0x3ee)]||{};if(this[_0x505411(0x3ee)][_0x1b60be])return this['_colorCache'][_0x1b60be];const _0x4b2108=VisuMZ[_0x505411(0x565)][_0x505411(0x1e6)]['Color'][_0x505411(0x7d7)];return this['getColorDataFromPluginParameters'](_0x1b60be,_0x4b2108);},ColorManager[_0x32e60b(0x5e3)]=function(){const _0x3a80db=_0x32e60b,_0x2c7665=_0x3a80db(0x661);this[_0x3a80db(0x3ee)]=this[_0x3a80db(0x3ee)]||{};if(this[_0x3a80db(0x3ee)][_0x2c7665])return this[_0x3a80db(0x3ee)][_0x2c7665];const _0x3456c2=VisuMZ[_0x3a80db(0x565)][_0x3a80db(0x1e6)]['Color'][_0x3a80db(0x780)];return this[_0x3a80db(0x491)](_0x2c7665,_0x3456c2);},ColorManager[_0x32e60b(0x436)]=function(){const _0x1399bd=_0x32e60b,_0x4773ff=_0x1399bd(0x58b);this[_0x1399bd(0x3ee)]=this['_colorCache']||{};if(this[_0x1399bd(0x3ee)][_0x4773ff])return this[_0x1399bd(0x3ee)][_0x4773ff];const _0x32b1fe=VisuMZ['CoreEngine'][_0x1399bd(0x1e6)][_0x1399bd(0x138)][_0x1399bd(0x24f)];return this[_0x1399bd(0x491)](_0x4773ff,_0x32b1fe);},ColorManager[_0x32e60b(0x387)]=function(){const _0x3beaa8=_0x32e60b,_0x338e14='_stored_tpGaugeColor1';this[_0x3beaa8(0x3ee)]=this[_0x3beaa8(0x3ee)]||{};if(this[_0x3beaa8(0x3ee)][_0x338e14])return this[_0x3beaa8(0x3ee)][_0x338e14];const _0xaf66f1=VisuMZ[_0x3beaa8(0x565)][_0x3beaa8(0x1e6)][_0x3beaa8(0x138)][_0x3beaa8(0x880)];return this[_0x3beaa8(0x491)](_0x338e14,_0xaf66f1);},ColorManager[_0x32e60b(0x553)]=function(){const _0x589092=_0x32e60b,_0x16fb8b='_stored_tpGaugeColor2';this[_0x589092(0x3ee)]=this[_0x589092(0x3ee)]||{};if(this[_0x589092(0x3ee)][_0x16fb8b])return this[_0x589092(0x3ee)][_0x16fb8b];const _0x1c8ac7=VisuMZ[_0x589092(0x565)][_0x589092(0x1e6)]['Color']['ColorTPGauge2'];return this[_0x589092(0x491)](_0x16fb8b,_0x1c8ac7);},ColorManager[_0x32e60b(0x73a)]=function(){const _0x41183a=_0x32e60b,_0x1ea1ca=_0x41183a(0x70a);this[_0x41183a(0x3ee)]=this[_0x41183a(0x3ee)]||{};if(this[_0x41183a(0x3ee)][_0x1ea1ca])return this[_0x41183a(0x3ee)][_0x1ea1ca];const _0x47003f=VisuMZ[_0x41183a(0x565)]['Settings']['Color'][_0x41183a(0x6a0)];return this['getColorDataFromPluginParameters'](_0x1ea1ca,_0x47003f);},ColorManager[_0x32e60b(0x6c6)]=function(){const _0x3a537f=_0x32e60b,_0x49ed6c='_stored_pendingColor';this['_colorCache']=this[_0x3a537f(0x3ee)]||{};if(this[_0x3a537f(0x3ee)][_0x49ed6c])return this[_0x3a537f(0x3ee)][_0x49ed6c];const _0x32ed19=VisuMZ[_0x3a537f(0x565)][_0x3a537f(0x1e6)][_0x3a537f(0x138)][_0x3a537f(0x6a0)];return this['getColorDataFromPluginParameters'](_0x49ed6c,_0x32ed19);},ColorManager[_0x32e60b(0x42d)]=function(){const _0x590a16=_0x32e60b,_0x4ff39a=_0x590a16(0x3e5);this[_0x590a16(0x3ee)]=this[_0x590a16(0x3ee)]||{};if(this[_0x590a16(0x3ee)][_0x4ff39a])return this[_0x590a16(0x3ee)][_0x4ff39a];const _0x58ae49=VisuMZ[_0x590a16(0x565)][_0x590a16(0x1e6)][_0x590a16(0x138)]['ColorExpGauge1'];return this[_0x590a16(0x491)](_0x4ff39a,_0x58ae49);},ColorManager[_0x32e60b(0x80d)]=function(){const _0x394042=_0x32e60b,_0x22cc49=_0x394042(0x327);this[_0x394042(0x3ee)]=this[_0x394042(0x3ee)]||{};if(this[_0x394042(0x3ee)][_0x22cc49])return this[_0x394042(0x3ee)][_0x22cc49];const _0x460b98=VisuMZ[_0x394042(0x565)][_0x394042(0x1e6)][_0x394042(0x138)][_0x394042(0x4b4)];return this[_0x394042(0x491)](_0x22cc49,_0x460b98);},ColorManager[_0x32e60b(0x381)]=function(){const _0x1f855e=_0x32e60b,_0x17dc69=_0x1f855e(0x651);this[_0x1f855e(0x3ee)]=this[_0x1f855e(0x3ee)]||{};if(this[_0x1f855e(0x3ee)][_0x17dc69])return this['_colorCache'][_0x17dc69];const _0x34427d=VisuMZ[_0x1f855e(0x565)][_0x1f855e(0x1e6)][_0x1f855e(0x138)]['ColorMaxLvGauge1'];return this[_0x1f855e(0x491)](_0x17dc69,_0x34427d);},ColorManager['maxLvGaugeColor2']=function(){const _0x5efb24=_0x32e60b,_0x16483a=_0x5efb24(0x444);this[_0x5efb24(0x3ee)]=this[_0x5efb24(0x3ee)]||{};if(this[_0x5efb24(0x3ee)][_0x16483a])return this[_0x5efb24(0x3ee)][_0x16483a];const _0x5deb28=VisuMZ['CoreEngine'][_0x5efb24(0x1e6)]['Color'][_0x5efb24(0x48f)];return this[_0x5efb24(0x491)](_0x16483a,_0x5deb28);},ColorManager['hpColor']=function(_0x4c0193){const _0x1cc936=_0x32e60b;return VisuMZ[_0x1cc936(0x565)]['Settings']['Color'][_0x1cc936(0x29b)]['call'](this,_0x4c0193);},ColorManager[_0x32e60b(0x84c)]=function(_0x2be7b2){const _0x446dd9=_0x32e60b;return VisuMZ[_0x446dd9(0x565)][_0x446dd9(0x1e6)][_0x446dd9(0x138)][_0x446dd9(0x1d4)][_0x446dd9(0x2d2)](this,_0x2be7b2);},ColorManager[_0x32e60b(0x247)]=function(_0x90ac9e){const _0x38e4ac=_0x32e60b;return VisuMZ[_0x38e4ac(0x565)][_0x38e4ac(0x1e6)][_0x38e4ac(0x138)]['ActorTPColor'][_0x38e4ac(0x2d2)](this,_0x90ac9e);},ColorManager[_0x32e60b(0x379)]=function(_0x21c57b){const _0x4aadae=_0x32e60b;return VisuMZ[_0x4aadae(0x565)][_0x4aadae(0x1e6)][_0x4aadae(0x138)]['ParamChange'][_0x4aadae(0x2d2)](this,_0x21c57b);},ColorManager[_0x32e60b(0x49f)]=function(_0x2eeb23){const _0x5375a9=_0x32e60b;return VisuMZ[_0x5375a9(0x565)][_0x5375a9(0x1e6)][_0x5375a9(0x138)][_0x5375a9(0x150)][_0x5375a9(0x2d2)](this,_0x2eeb23);},ColorManager[_0x32e60b(0x18b)]=function(){const _0x125982=_0x32e60b;return VisuMZ[_0x125982(0x565)][_0x125982(0x1e6)][_0x125982(0x138)][_0x125982(0x563)];},ColorManager['outlineColorDmg']=function(){const _0x2fbc2c=_0x32e60b;return VisuMZ[_0x2fbc2c(0x565)][_0x2fbc2c(0x1e6)][_0x2fbc2c(0x138)][_0x2fbc2c(0x7a5)]||_0x2fbc2c(0x4a5);},ColorManager[_0x32e60b(0x331)]=function(){const _0x26192c=_0x32e60b;return VisuMZ[_0x26192c(0x565)]['Settings'][_0x26192c(0x138)][_0x26192c(0x687)]||_0x26192c(0x827);},ColorManager['dimColor1']=function(){const _0x49c35f=_0x32e60b;return VisuMZ[_0x49c35f(0x565)]['Settings'][_0x49c35f(0x138)][_0x49c35f(0x336)];},ColorManager[_0x32e60b(0x2b0)]=function(){const _0x44a3d6=_0x32e60b;return VisuMZ[_0x44a3d6(0x565)]['Settings'][_0x44a3d6(0x138)][_0x44a3d6(0x683)];},ColorManager[_0x32e60b(0x363)]=function(){const _0x27ff84=_0x32e60b;return VisuMZ[_0x27ff84(0x565)][_0x27ff84(0x1e6)][_0x27ff84(0x138)]['ItemBackColor1'];},ColorManager[_0x32e60b(0x54c)]=function(){const _0x4f7c03=_0x32e60b;return VisuMZ[_0x4f7c03(0x565)][_0x4f7c03(0x1e6)][_0x4f7c03(0x138)][_0x4f7c03(0x295)];},SceneManager[_0x32e60b(0x7e6)]=[],SceneManager[_0x32e60b(0x5b6)]=function(){const _0x22c728=_0x32e60b;return this[_0x22c728(0x10b)]&&this['_scene'][_0x22c728(0x13d)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x43ae3f=_0x32e60b;return this['_scene']&&this[_0x43ae3f(0x10b)]['constructor']===Scene_Map;},SceneManager[_0x32e60b(0x13b)]=function(){const _0x37aadb=_0x32e60b;return this[_0x37aadb(0x10b)]&&this[_0x37aadb(0x10b)]instanceof Scene_Map;},VisuMZ[_0x32e60b(0x565)]['SceneManager_initialize']=SceneManager['initialize'],SceneManager[_0x32e60b(0x829)]=function(){const _0x40b2f9=_0x32e60b;VisuMZ[_0x40b2f9(0x565)][_0x40b2f9(0x593)][_0x40b2f9(0x2d2)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x45b)]=SceneManager[_0x32e60b(0x881)],SceneManager[_0x32e60b(0x881)]=function(_0xd35ff1){const _0x52cc43=_0x32e60b;if($gameTemp)this[_0x52cc43(0x55f)](_0xd35ff1);VisuMZ['CoreEngine'][_0x52cc43(0x45b)][_0x52cc43(0x2d2)](this,_0xd35ff1);},SceneManager['onKeyDownKeysF6F7']=function(_0x2fee03){const _0x23128b=_0x32e60b;if(!_0x2fee03['ctrlKey']&&!_0x2fee03[_0x23128b(0x52a)])switch(_0x2fee03[_0x23128b(0x78e)]){case 0x52:this[_0x23128b(0x1e5)]();break;case 0x54:this[_0x23128b(0x4ca)]();break;case 0x75:this[_0x23128b(0x612)]();break;case 0x76:if(Input[_0x23128b(0x151)](_0x23128b(0x67c))||Input[_0x23128b(0x151)]('ctrl'))return;this[_0x23128b(0x778)]();break;}else{if(_0x2fee03[_0x23128b(0x149)]){let _0x2cc0cb=_0x2fee03['keyCode'];if(_0x2cc0cb>=0x31&&_0x2cc0cb<=0x39){const _0x4de65e=_0x2cc0cb-0x30;return SceneManager[_0x23128b(0x659)](_0x4de65e);}else{if(_0x2cc0cb>=0x61&&_0x2cc0cb<=0x69){const _0x2bcfe9=_0x2cc0cb-0x60;return SceneManager['playtestQuickLoad'](_0x2bcfe9);}}}}},SceneManager['playTestF6']=function(){const _0x58b5ea=_0x32e60b;if($gameTemp['isPlaytest']()&&VisuMZ[_0x58b5ea(0x565)][_0x58b5ea(0x1e6)][_0x58b5ea(0x89e)][_0x58b5ea(0x4d7)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x58b5ea(0x802)]=0x0,ConfigManager[_0x58b5ea(0x2b6)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x58b5ea(0x129)]=0x0):(ConfigManager[_0x58b5ea(0x802)]=0x64,ConfigManager[_0x58b5ea(0x2b6)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x58b5ea(0x129)]=0x64);ConfigManager['save']();if(this[_0x58b5ea(0x10b)][_0x58b5ea(0x13d)]===Scene_Options){if(this[_0x58b5ea(0x10b)]['_optionsWindow'])this[_0x58b5ea(0x10b)][_0x58b5ea(0x21f)][_0x58b5ea(0x3a5)]();if(this[_0x58b5ea(0x10b)][_0x58b5ea(0x47d)])this['_scene'][_0x58b5ea(0x47d)][_0x58b5ea(0x3a5)]();}}},SceneManager['playTestF7']=function(){const _0x3856d3=_0x32e60b;$gameTemp[_0x3856d3(0x252)]()&&VisuMZ['CoreEngine'][_0x3856d3(0x1e6)][_0x3856d3(0x89e)][_0x3856d3(0x67b)]&&($gameTemp[_0x3856d3(0x1f6)]=!$gameTemp['_playTestFastMode']);},SceneManager['playTestShiftR']=function(){const _0x50b93e=_0x32e60b;if(!VisuMZ[_0x50b93e(0x565)]['Settings'][_0x50b93e(0x89e)]['ShiftR_Toggle'])return;if(!$gameTemp[_0x50b93e(0x252)]())return;if(!SceneManager[_0x50b93e(0x5b6)]())return;if(!Input['isPressed'](_0x50b93e(0x67c)))return;for(const _0x2cc464 of $gameParty['members']()){if(!_0x2cc464)continue;_0x2cc464[_0x50b93e(0x890)]();}},SceneManager[_0x32e60b(0x4ca)]=function(){const _0x39694a=_0x32e60b;if(!VisuMZ[_0x39694a(0x565)][_0x39694a(0x1e6)][_0x39694a(0x89e)][_0x39694a(0x22c)])return;if(!$gameTemp[_0x39694a(0x252)]())return;if(!SceneManager[_0x39694a(0x5b6)]())return;if(!Input[_0x39694a(0x151)]('shift'))return;for(const _0x188643 of $gameParty[_0x39694a(0x6d7)]()){if(!_0x188643)continue;_0x188643[_0x39694a(0x11a)](_0x188643[_0x39694a(0x88c)]());}},SceneManager[_0x32e60b(0x659)]=function(_0x5ccf23){const _0x3b0590=_0x32e60b;if(!$gameTemp[_0x3b0590(0x252)]())return;if(!DataManager[_0x3b0590(0x835)](_0x5ccf23))return;if(!(VisuMZ[_0x3b0590(0x565)][_0x3b0590(0x1e6)][_0x3b0590(0x89e)][_0x3b0590(0x688)]??!![]))return;this[_0x3b0590(0x724)](Scene_QuickLoad),this[_0x3b0590(0x3d1)](_0x5ccf23);},SceneManager['initVisuMZCoreEngine']=function(){const _0xa23cba=_0x32e60b;this['_sideButtonLayout']=![],this['_hideButtons']=!VisuMZ[_0xa23cba(0x565)][_0xa23cba(0x1e6)]['UI'][_0xa23cba(0x26b)];},SceneManager['setSideButtonLayout']=function(_0xa941a1){const _0x3983e9=_0x32e60b;VisuMZ[_0x3983e9(0x565)][_0x3983e9(0x1e6)]['UI'][_0x3983e9(0x7bb)]&&(this[_0x3983e9(0x54d)]=_0xa941a1);},SceneManager[_0x32e60b(0x462)]=function(){const _0x15260f=_0x32e60b;return this[_0x15260f(0x54d)];},SceneManager[_0x32e60b(0x14c)]=function(){const _0x1bf61f=_0x32e60b;return this[_0x1bf61f(0x826)];},SceneManager[_0x32e60b(0x8b6)]=function(){const _0x7d6ab2=_0x32e60b;return this[_0x7d6ab2(0x14c)]()||this[_0x7d6ab2(0x462)]();},VisuMZ['CoreEngine'][_0x32e60b(0x822)]=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x462dc6=_0x32e60b;return VisuMZ[_0x462dc6(0x565)]['Settings'][_0x462dc6(0x89e)]['RequireFocus']?VisuMZ[_0x462dc6(0x565)][_0x462dc6(0x822)][_0x462dc6(0x2d2)](this):!![];},SceneManager[_0x32e60b(0x220)]=function(_0xeb6665){const _0x3d68ab=_0x32e60b;if(_0xeb6665 instanceof Error)this['catchNormalError'](_0xeb6665);else _0xeb6665 instanceof Array&&_0xeb6665[0x0]===_0x3d68ab(0x32d)?this[_0x3d68ab(0x104)](_0xeb6665):this[_0x3d68ab(0x274)](_0xeb6665);this[_0x3d68ab(0x879)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x5ad)]=BattleManager[_0x32e60b(0x2d3)],BattleManager[_0x32e60b(0x2d3)]=function(){const _0x3feeec=_0x32e60b;return VisuMZ[_0x3feeec(0x565)]['Settings']['QoL'][_0x3feeec(0x2f7)]?this[_0x3feeec(0x28e)]():VisuMZ[_0x3feeec(0x565)][_0x3feeec(0x5ad)][_0x3feeec(0x2d2)](this);},BattleManager[_0x32e60b(0x28e)]=function(){const _0x1a936e=_0x32e60b;return $gameParty[_0x1a936e(0x6db)](),SoundManager['playEscape'](),this[_0x1a936e(0x2cd)](),!![];},BattleManager[_0x32e60b(0x451)]=function(){const _0x25475f=_0x32e60b;return $gameSystem[_0x25475f(0x6b3)]()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x178792=_0x32e60b;return $gameSystem[_0x178792(0x6b3)]()===0x1;},VisuMZ['CoreEngine'][_0x32e60b(0x624)]=Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x829)],Game_Temp[_0x32e60b(0x303)]['initialize']=function(){const _0x15865d=_0x32e60b;VisuMZ['CoreEngine'][_0x15865d(0x624)][_0x15865d(0x2d2)](this),this[_0x15865d(0x52d)](),this[_0x15865d(0x30f)](),this[_0x15865d(0x7ee)]();},Game_Temp['prototype'][_0x32e60b(0x52d)]=function(){const _0x33a406=_0x32e60b;VisuMZ[_0x33a406(0x565)][_0x33a406(0x1e6)][_0x33a406(0x89e)][_0x33a406(0x10c)]&&(this[_0x33a406(0x495)]=![]);},Game_Temp[_0x32e60b(0x303)]['setLastPluginCommandInterpreter']=function(_0x2b1638){this['_lastPluginCommandInterpreter']=_0x2b1638;},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x197)]=function(){const _0x214e5a=_0x32e60b;return this[_0x214e5a(0x6b0)];},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x6d2)]=function(){const _0x52f7ee=_0x32e60b;this[_0x52f7ee(0x57b)]=undefined,this['_forcedBattleSys']=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp['prototype'][_0x32e60b(0x4b8)]=function(_0x58c659){const _0x3f2f9d=_0x32e60b;$gameMap&&$dataMap&&$dataMap[_0x3f2f9d(0x5d3)]&&this[_0x3f2f9d(0x5da)]($dataMap[_0x3f2f9d(0x5d3)]);const _0x22e475=$dataTroops[_0x58c659];if(_0x22e475){let _0x52150e=DataManager[_0x3f2f9d(0x335)](_0x22e475['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x52150e);}},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x5da)]=function(_0x19cdcc){const _0x256aef=_0x32e60b;if(!_0x19cdcc)return;if(_0x19cdcc['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x256aef(0x57b)]='FV';else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2c2574=String(RegExp['$1']);if(_0x2c2574[_0x256aef(0x58a)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x2c2574['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x256aef(0x57b)]='SV');}}}if(_0x19cdcc[_0x256aef(0x58a)](/<(?:DTB)>/i))this[_0x256aef(0x523)]=0x0;else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x256aef(0x523)]=0x2;else{if(_0x19cdcc['match'](/<(?:TPB|ATB)>/i))this[_0x256aef(0x523)]=0x2;else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:CTB)>/i))Imported[_0x256aef(0x58c)]&&(this[_0x256aef(0x523)]=_0x256aef(0x899));else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:STB)>/i))Imported[_0x256aef(0x6d9)]&&(this[_0x256aef(0x523)]='STB');else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:BTB)>/i))Imported[_0x256aef(0x162)]&&(this[_0x256aef(0x523)]='BTB');else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:FTB)>/i))Imported[_0x256aef(0x7cd)]&&(this[_0x256aef(0x523)]='FTB');else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x256aef(0x523)]='OTB');else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x256aef(0x32c));else{if(_0x19cdcc['match'](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x256aef(0x523)]=_0x256aef(0x88e));else{if(_0x19cdcc[_0x256aef(0x58a)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x24f62f=String(RegExp['$1']);if(_0x24f62f[_0x256aef(0x58a)](/DTB/i))this[_0x256aef(0x523)]=0x0;else{if(_0x24f62f[_0x256aef(0x58a)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x24f62f[_0x256aef(0x58a)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x256aef(0x523)]=0x2;else{if(_0x24f62f['match'](/CTB/i))Imported[_0x256aef(0x58c)]&&(this['_forcedBattleSys']='CTB');else{if(_0x24f62f[_0x256aef(0x58a)](/STB/i))Imported[_0x256aef(0x6d9)]&&(this[_0x256aef(0x523)]=_0x256aef(0x3f7));else{if(_0x24f62f['match'](/BTB/i))Imported[_0x256aef(0x162)]&&(this[_0x256aef(0x523)]='BTB');else{if(_0x24f62f[_0x256aef(0x58a)](/FTB/i))Imported[_0x256aef(0x7cd)]&&(this[_0x256aef(0x523)]=_0x256aef(0x490));else{if(_0x24f62f[_0x256aef(0x58a)](/OTB/i))Imported[_0x256aef(0x630)]&&(this[_0x256aef(0x523)]=_0x256aef(0x62d));else{if(_0x24f62f['match'](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x256aef(0x523)]=_0x256aef(0x32c));else _0x24f62f[_0x256aef(0x58a)](/PTB/i)&&(Imported[_0x256aef(0x152)]&&(this[_0x256aef(0x523)]=_0x256aef(0x88e)));}}}}}}}}}}}}}}}}}}}}if(_0x19cdcc[_0x256aef(0x58a)](/<(?:|BATTLE )GRID>/i))this[_0x256aef(0x3cf)]=!![];else _0x19cdcc[_0x256aef(0x58a)](/<NO (?:|BATTLE )GRID>/i)&&(this['_forcedBattleGridSystem']=![]);},Game_Temp['prototype']['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x89b)]=function(_0x35bbf2,_0x1e7c59,_0x476148,_0x1ff091){const _0x1be309=_0x32e60b;if(!this['showFauxAnimations']())return;_0x476148=_0x476148||![],_0x1ff091=_0x1ff091||![];if($dataAnimations[_0x1e7c59]){const _0x2ffa1f={'targets':_0x35bbf2,'animationId':_0x1e7c59,'mirror':_0x476148,'mute':_0x1ff091};this[_0x1be309(0x374)][_0x1be309(0x724)](_0x2ffa1f);for(const _0x48fa5e of _0x35bbf2){_0x48fa5e[_0x1be309(0x4ef)]&&_0x48fa5e[_0x1be309(0x4ef)]();}}},Game_Temp[_0x32e60b(0x303)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x883)]=function(){const _0x47e191=_0x32e60b;return this[_0x47e191(0x374)][_0x47e191(0x67c)]();},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x7ee)]=function(){const _0xbfc3db=_0x32e60b;this[_0xbfc3db(0x475)]=[];},Game_Temp[_0x32e60b(0x303)][_0x32e60b(0x3b1)]=function(_0x149ad1,_0x44af61,_0x39cdf7,_0x35a359,_0x2df4c5){const _0x24f7bf=_0x32e60b;if(!this['showPointAnimations']())return;_0x35a359=_0x35a359||![],_0x2df4c5=_0x2df4c5||![];if($dataAnimations[_0x39cdf7]){const _0x5a4a0e={'x':_0x149ad1,'y':_0x44af61,'animationId':_0x39cdf7,'mirror':_0x35a359,'mute':_0x2df4c5};this[_0x24f7bf(0x475)]['push'](_0x5a4a0e);}},Game_Temp['prototype'][_0x32e60b(0x68c)]=function(){return!![];},Game_Temp[_0x32e60b(0x303)]['retrievePointAnimation']=function(){const _0x5a5359=_0x32e60b;return this[_0x5a5359(0x475)]['shift']();},VisuMZ[_0x32e60b(0x565)]['Game_System_initialize']=Game_System[_0x32e60b(0x303)][_0x32e60b(0x829)],Game_System[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(){const _0x40b5f3=_0x32e60b;VisuMZ[_0x40b5f3(0x565)][_0x40b5f3(0x2fa)][_0x40b5f3(0x2d2)](this),this[_0x40b5f3(0x6ff)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x3f942a=_0x32e60b;this[_0x3f942a(0x62a)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced']['fontSize'],'Padding':0xc};},Game_System['prototype'][_0x32e60b(0x85c)]=function(){const _0x3d250d=_0x32e60b;if($gameTemp[_0x3d250d(0x57b)]==='SV')return!![];else{if($gameTemp[_0x3d250d(0x57b)]==='FV')return![];}if(this[_0x3d250d(0x62a)]===undefined)this[_0x3d250d(0x6ff)]();if(this[_0x3d250d(0x62a)][_0x3d250d(0x30e)]===undefined)this[_0x3d250d(0x6ff)]();return this[_0x3d250d(0x62a)][_0x3d250d(0x30e)];},Game_System['prototype'][_0x32e60b(0x531)]=function(_0x495ae4){const _0x40246e=_0x32e60b;if(this[_0x40246e(0x62a)]===undefined)this[_0x40246e(0x6ff)]();if(this[_0x40246e(0x62a)][_0x40246e(0x30e)]===undefined)this[_0x40246e(0x6ff)]();this[_0x40246e(0x62a)][_0x40246e(0x30e)]=_0x495ae4;},Game_System[_0x32e60b(0x303)][_0x32e60b(0x8d2)]=function(){const _0x1c3090=_0x32e60b;if(this[_0x1c3090(0x62a)]===undefined)this[_0x1c3090(0x6ff)]();this[_0x1c3090(0x62a)][_0x1c3090(0x7fb)]=this[_0x1c3090(0x8a2)]();},Game_System['prototype'][_0x32e60b(0x8a2)]=function(){const _0x1639a6=_0x32e60b,_0x24694f=(VisuMZ[_0x1639a6(0x565)]['Settings']['BattleSystem']||'DATABASE')[_0x1639a6(0x58e)]()[_0x1639a6(0x870)]();return VisuMZ[_0x1639a6(0x565)]['CreateBattleSystemID'](_0x24694f);},Game_System[_0x32e60b(0x303)][_0x32e60b(0x6b3)]=function(){const _0xf4bbd3=_0x32e60b;if($gameTemp[_0xf4bbd3(0x523)]!==undefined)return $gameTemp[_0xf4bbd3(0x523)];if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0xf4bbd3(0x7fb)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0xf4bbd3(0x7fb)];},Game_System[_0x32e60b(0x303)][_0x32e60b(0x69f)]=function(_0x528f2c){const _0x5f196d=_0x32e60b;if(this[_0x5f196d(0x62a)]===undefined)this[_0x5f196d(0x6ff)]();if(this[_0x5f196d(0x62a)][_0x5f196d(0x7fb)]===undefined)this[_0x5f196d(0x8d2)]();this['_CoreEngineSettings']['BattleSystem']=_0x528f2c;},Game_System[_0x32e60b(0x303)][_0x32e60b(0x5c0)]=function(){const _0x2f473f=_0x32e60b;if(this['_CoreEngineSettings']===undefined)this[_0x2f473f(0x6ff)]();if(this[_0x2f473f(0x62a)][_0x2f473f(0x581)]===undefined)this[_0x2f473f(0x6ff)]();return this[_0x2f473f(0x62a)]['FontSize'];},Game_System[_0x32e60b(0x303)][_0x32e60b(0x2c4)]=function(_0x58d09d){const _0x39b1d2=_0x32e60b;if(this[_0x39b1d2(0x62a)]===undefined)this[_0x39b1d2(0x6ff)]();if(this['_CoreEngineSettings'][_0x39b1d2(0x7a1)]===undefined)this['initCoreEngine']();this[_0x39b1d2(0x62a)][_0x39b1d2(0x581)]=_0x58d09d;},Game_System[_0x32e60b(0x303)][_0x32e60b(0x28f)]=function(){const _0x554862=_0x32e60b;if(this[_0x554862(0x62a)]===undefined)this[_0x554862(0x6ff)]();if(this[_0x554862(0x62a)][_0x554862(0x51c)]===undefined)this[_0x554862(0x6ff)]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x32e60b(0x303)][_0x32e60b(0x866)]=function(_0x1158bf){const _0x2e9624=_0x32e60b;if(this[_0x2e9624(0x62a)]===undefined)this[_0x2e9624(0x6ff)]();if(this[_0x2e9624(0x62a)][_0x2e9624(0x7a1)]===undefined)this[_0x2e9624(0x6ff)]();this[_0x2e9624(0x62a)][_0x2e9624(0x51c)]=_0x1158bf;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x756)]=Game_Screen['prototype'][_0x32e60b(0x829)],Game_Screen[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(){const _0x271431=_0x32e60b;VisuMZ[_0x271431(0x565)][_0x271431(0x756)][_0x271431(0x2d2)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x32e60b(0x303)][_0x32e60b(0x8c7)]=function(){const _0x20b55c=_0x32e60b,_0x114c64=VisuMZ[_0x20b55c(0x565)][_0x20b55c(0x1e6)][_0x20b55c(0x85b)];this[_0x20b55c(0x2d8)]=_0x114c64?.['DefaultStyle']||_0x20b55c(0x5fa);},Game_Screen[_0x32e60b(0x303)][_0x32e60b(0x148)]=function(){const _0x2ee8fd=_0x32e60b;if(this[_0x2ee8fd(0x2d8)]===undefined)this[_0x2ee8fd(0x8c7)]();return this[_0x2ee8fd(0x2d8)];},Game_Screen[_0x32e60b(0x303)][_0x32e60b(0x15a)]=function(_0x34edee){const _0x34b3d7=_0x32e60b;if(this[_0x34b3d7(0x2d8)]===undefined)this[_0x34b3d7(0x8c7)]();this[_0x34b3d7(0x2d8)]=_0x34edee['toLowerCase']()['trim']();},Game_Picture['prototype'][_0x32e60b(0x143)]=function(){const _0x7579fb=_0x32e60b;if($gameParty[_0x7579fb(0x74f)]())return![];return this[_0x7579fb(0x3f1)]()&&this['onlyfilename']()[_0x7579fb(0x45c)](0x0)==='!';},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x3f1)]=function(){const _0x233bc6=_0x32e60b;return this[_0x233bc6(0x33f)][_0x233bc6(0x1c7)]('/')['pop']();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x86d)]=Game_Picture[_0x32e60b(0x303)]['x'],Game_Picture['prototype']['x']=function(){const _0x5535d6=_0x32e60b;return this[_0x5535d6(0x143)]()?this['xScrollLinkedOffset']():VisuMZ['CoreEngine'][_0x5535d6(0x86d)]['call'](this);},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x562)]=function(){const _0x353e3a=_0x32e60b,_0x88450d=$gameMap[_0x353e3a(0x469)]()*$gameMap[_0x353e3a(0x85d)]();return(this['_x']-_0x88450d)*$gameScreen['zoomScale']();},VisuMZ[_0x32e60b(0x565)]['Game_Picture_y']=Game_Picture[_0x32e60b(0x303)]['y'],Game_Picture[_0x32e60b(0x303)]['y']=function(){const _0x5da93f=_0x32e60b;return this['isMapScrollLinked']()?this[_0x5da93f(0x420)]():VisuMZ[_0x5da93f(0x565)]['Game_Picture_y'][_0x5da93f(0x2d2)](this);},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x420)]=function(){const _0x12d894=_0x32e60b,_0x5937c0=$gameMap[_0x12d894(0x608)]()*$gameMap[_0x12d894(0x37b)]();return(this['_y']-_0x5937c0)*$gameScreen[_0x12d894(0x494)]();},VisuMZ[_0x32e60b(0x565)]['Game_Picture_scaleX']=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x2f2)],Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x2f2)]=function(){const _0x416b86=_0x32e60b;let _0x2d8fe4=VisuMZ['CoreEngine'][_0x416b86(0x2d9)]['call'](this);return this[_0x416b86(0x143)]()&&(_0x2d8fe4*=$gameScreen[_0x416b86(0x494)]()),_0x2d8fe4;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x79d)]=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x7eb)],Game_Picture['prototype'][_0x32e60b(0x7eb)]=function(){const _0x507705=_0x32e60b;let _0x54b1db=VisuMZ['CoreEngine']['Game_Picture_scaleY']['call'](this);return this[_0x507705(0x143)]()&&(_0x54b1db*=$gameScreen[_0x507705(0x494)]()),_0x54b1db;},Game_Picture[_0x32e60b(0x303)]['setEasingType']=function(_0x4f6411){const _0x488b39=_0x32e60b;this[_0x488b39(0x347)]=_0x4f6411;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x4fa)]=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x5a0)],Game_Picture[_0x32e60b(0x303)]['calcEasing']=function(_0x1fe5e4){const _0x31818f=_0x32e60b;return this['_coreEasingType']=this[_0x31818f(0x347)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x31818f(0x347)])?VisuMZ[_0x31818f(0x565)][_0x31818f(0x4fa)][_0x31818f(0x2d2)](this,_0x1fe5e4):VisuMZ[_0x31818f(0x313)](_0x1fe5e4,this[_0x31818f(0x347)]);},VisuMZ[_0x32e60b(0x565)]['Game_Picture_initRotation']=Game_Picture['prototype']['initRotation'],Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x10a)]=function(){const _0x58952b=_0x32e60b;VisuMZ[_0x58952b(0x565)][_0x58952b(0x316)][_0x58952b(0x2d2)](this),this[_0x58952b(0x607)]();},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x607)]=function(){const _0x3920b2=_0x32e60b;this[_0x3920b2(0x728)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x3920b2(0x6f0)};},VisuMZ[_0x32e60b(0x565)]['Game_Picture_angle']=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x5a7)],Game_Picture[_0x32e60b(0x303)]['angle']=function(){const _0x77be=_0x32e60b;let _0x49158f=VisuMZ[_0x77be(0x565)][_0x77be(0x885)][_0x77be(0x2d2)](this);return _0x49158f+=this[_0x77be(0x600)](),_0x49158f;},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x600)]=function(){const _0x1961e5=_0x32e60b;if(this[_0x1961e5(0x728)]===undefined)this['initRotationCoreEngine']();return this[_0x1961e5(0x728)][_0x1961e5(0x5ff)]||0x0;},Game_Picture[_0x32e60b(0x303)]['setAnglePlusData']=function(_0x172d24,_0x658aea,_0x9b15e9){const _0x4c84cb=_0x32e60b;if(this[_0x4c84cb(0x728)]===undefined)this[_0x4c84cb(0x607)]();this['_anglePlus'][_0x4c84cb(0x84a)]=_0x172d24||0x0,this[_0x4c84cb(0x728)][_0x4c84cb(0x592)]=_0x658aea||0x0,this[_0x4c84cb(0x728)][_0x4c84cb(0x156)]=_0x658aea||0x0,this['_anglePlus'][_0x4c84cb(0x6fc)]=_0x9b15e9||'Linear',_0x658aea<=0x0&&(this[_0x4c84cb(0x728)][_0x4c84cb(0x5ff)]=this[_0x4c84cb(0x728)]['target']);},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x5f4)]=function(_0x149910,_0x5fab39,_0x3fe47d){const _0x16346d=_0x32e60b;if(this[_0x16346d(0x728)]===undefined)this[_0x16346d(0x607)]();this[_0x16346d(0x728)][_0x16346d(0x84a)]+=_0x149910||0x0,this[_0x16346d(0x728)][_0x16346d(0x592)]=_0x5fab39||0x0,this['_anglePlus'][_0x16346d(0x156)]=_0x5fab39||0x0,this[_0x16346d(0x728)]['easingType']=_0x3fe47d||_0x16346d(0x6f0),_0x5fab39<=0x0&&(this[_0x16346d(0x728)][_0x16346d(0x5ff)]=this[_0x16346d(0x728)]['target']);},VisuMZ[_0x32e60b(0x565)]['Game_Picture_updateRotation']=Game_Picture['prototype'][_0x32e60b(0x60f)],Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x60f)]=function(){const _0x197986=_0x32e60b;VisuMZ[_0x197986(0x565)]['Game_Picture_updateRotation'][_0x197986(0x2d2)](this),this[_0x197986(0x86f)]();},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x86f)]=function(){const _0xfe3b5c=_0x32e60b;if(this[_0xfe3b5c(0x728)]===undefined)this['initRotationCoreEngine']();const _0x44b679=this['_anglePlus'];if(_0x44b679[_0xfe3b5c(0x592)]<=0x0)return;_0x44b679[_0xfe3b5c(0x5ff)]=this[_0xfe3b5c(0x284)](_0x44b679['current'],_0x44b679[_0xfe3b5c(0x84a)]),_0x44b679[_0xfe3b5c(0x592)]--,_0x44b679[_0xfe3b5c(0x592)]<=0x0&&(_0x44b679['current']=_0x44b679['target']);},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x284)]=function(_0x19b1d9,_0x545fe0){const _0x3caca8=_0x32e60b,_0x573057=this[_0x3caca8(0x728)],_0x4c8305=_0x573057['easingType'],_0x210ece=_0x573057[_0x3caca8(0x592)],_0x162bb1=_0x573057['wholeDuration'],_0x1d0bbb=VisuMZ[_0x3caca8(0x313)]((_0x162bb1-_0x210ece)/_0x162bb1,_0x4c8305),_0x1fbd36=VisuMZ[_0x3caca8(0x313)]((_0x162bb1-_0x210ece+0x1)/_0x162bb1,_0x4c8305),_0x115392=(_0x19b1d9-_0x545fe0*_0x1d0bbb)/(0x1-_0x1d0bbb);return _0x115392+(_0x545fe0-_0x115392)*_0x1fbd36;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x706)]=Game_Action['prototype'][_0x32e60b(0x4dd)],Game_Action[_0x32e60b(0x303)]['itemHit']=function(_0x33407b){const _0x57a13a=_0x32e60b;return VisuMZ['CoreEngine']['Settings'][_0x57a13a(0x89e)]['ImprovedAccuracySystem']?this[_0x57a13a(0x4b5)](_0x33407b):VisuMZ[_0x57a13a(0x565)][_0x57a13a(0x706)][_0x57a13a(0x2d2)](this,_0x33407b);},Game_Action['prototype']['itemHitImprovedAccuracy']=function(_0x2ee83a){const _0x273786=_0x32e60b,_0x4c0325=this[_0x273786(0x72e)](_0x2ee83a),_0x111bfe=this['subjectHitRate'](_0x2ee83a),_0x3c8d0a=this[_0x273786(0x7dd)](_0x2ee83a);return _0x4c0325*(_0x111bfe-_0x3c8d0a);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x793)]=Game_Action[_0x32e60b(0x303)]['itemEva'],Game_Action['prototype'][_0x32e60b(0x74c)]=function(_0x10f9b3){const _0x4beb96=_0x32e60b;return VisuMZ['CoreEngine'][_0x4beb96(0x1e6)][_0x4beb96(0x89e)][_0x4beb96(0x203)]?0x0:VisuMZ[_0x4beb96(0x565)][_0x4beb96(0x793)][_0x4beb96(0x2d2)](this,_0x10f9b3);},Game_Action[_0x32e60b(0x303)][_0x32e60b(0x72e)]=function(_0x277d84){const _0x546d33=_0x32e60b;return this[_0x546d33(0x5e8)]()[_0x546d33(0x587)]*0.01;},Game_Action['prototype'][_0x32e60b(0x2b5)]=function(_0x1abbbf){const _0x13bd24=_0x32e60b;if(VisuMZ[_0x13bd24(0x565)][_0x13bd24(0x1e6)]['QoL']['AccuracyBoost']&&this[_0x13bd24(0x359)]())return 0x1;return this[_0x13bd24(0x846)]()?VisuMZ['CoreEngine'][_0x13bd24(0x1e6)][_0x13bd24(0x89e)][_0x13bd24(0x140)]&&this[_0x13bd24(0x2a1)]()[_0x13bd24(0x7b1)]()?this[_0x13bd24(0x2a1)]()[_0x13bd24(0x10f)]+0.05:this[_0x13bd24(0x2a1)]()[_0x13bd24(0x10f)]:0x1;},Game_Action[_0x32e60b(0x303)][_0x32e60b(0x7dd)]=function(_0x3ee4b8){const _0x368ce2=_0x32e60b;if(this[_0x368ce2(0x2a1)]()[_0x368ce2(0x7b1)]()===_0x3ee4b8[_0x368ce2(0x7b1)]())return 0x0;if(this[_0x368ce2(0x846)]())return VisuMZ[_0x368ce2(0x565)]['Settings'][_0x368ce2(0x89e)][_0x368ce2(0x140)]&&_0x3ee4b8[_0x368ce2(0x69a)]()?_0x3ee4b8[_0x368ce2(0x36f)]-0.05:_0x3ee4b8['eva'];else return this[_0x368ce2(0x583)]()?_0x3ee4b8[_0x368ce2(0x48a)]:0x0;},VisuMZ[_0x32e60b(0x565)]['Game_Action_updateLastTarget']=Game_Action[_0x32e60b(0x303)][_0x32e60b(0x725)],Game_Action[_0x32e60b(0x303)][_0x32e60b(0x725)]=function(_0x3a8bf7){const _0x4a37d4=_0x32e60b;VisuMZ[_0x4a37d4(0x565)][_0x4a37d4(0x36a)]['call'](this,_0x3a8bf7);if(VisuMZ[_0x4a37d4(0x565)][_0x4a37d4(0x1e6)][_0x4a37d4(0x89e)][_0x4a37d4(0x203)])return;const _0x444f5f=_0x3a8bf7[_0x4a37d4(0x40f)]();_0x444f5f[_0x4a37d4(0x50b)]&&(0x1-this[_0x4a37d4(0x74c)](_0x3a8bf7)>this[_0x4a37d4(0x4dd)](_0x3a8bf7)&&(_0x444f5f[_0x4a37d4(0x50b)]=![],_0x444f5f['evaded']=!![]));},VisuMZ[_0x32e60b(0x565)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x268)],Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x268)]=function(){const _0x1582f2=_0x32e60b;this[_0x1582f2(0x146)]={},VisuMZ[_0x1582f2(0x565)][_0x1582f2(0x70b)][_0x1582f2(0x2d2)](this);},VisuMZ['CoreEngine'][_0x32e60b(0x476)]=Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x3a5)],Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x3a5)]=function(){const _0xb4ec46=_0x32e60b;this[_0xb4ec46(0x146)]={},VisuMZ[_0xb4ec46(0x565)]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x719)]=function(_0x3575b2){const _0x441a8f=_0x32e60b;return this[_0x441a8f(0x146)]=this[_0x441a8f(0x146)]||{},this[_0x441a8f(0x146)][_0x3575b2]!==undefined;},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x4f7)]=function(_0x3fd805){const _0x1cda0f=_0x32e60b,_0x142d3a=(_0x2d1b89,_0x2954b5)=>{const _0x1261c=_0x1f8f;if(!_0x2954b5)return _0x2d1b89;if(_0x2954b5[_0x1261c(0x5d3)]['match'](VisuMZ['CoreEngine'][_0x1261c(0x34f)]['paramPlus'][_0x3fd805])){var _0x304ada=Number(RegExp['$1']);_0x2d1b89+=_0x304ada;}if(_0x2954b5['note'][_0x1261c(0x58a)](VisuMZ[_0x1261c(0x565)]['RegExp'][_0x1261c(0x165)][_0x3fd805])){var _0x18ffbc=String(RegExp['$1']);try{_0x2d1b89+=eval(_0x18ffbc);}catch(_0x2811c7){if($gameTemp[_0x1261c(0x252)]())console[_0x1261c(0x57f)](_0x2811c7);}}return _0x2d1b89;};return this[_0x1cda0f(0x60b)]()[_0x1cda0f(0x1c3)](_0x142d3a,this[_0x1cda0f(0x115)][_0x3fd805]);},Game_BattlerBase['prototype'][_0x32e60b(0x732)]=function(_0x2777f2){const _0x41481c=_0x32e60b;var _0x2d9429=_0x41481c(0x507)+(this[_0x41481c(0x7b1)]()?_0x41481c(0x591):_0x41481c(0x53d))+_0x41481c(0x296)+_0x2777f2;if(this['checkCacheKey'](_0x2d9429))return this[_0x41481c(0x146)][_0x2d9429];this['_cache'][_0x2d9429]=eval(VisuMZ[_0x41481c(0x565)]['Settings'][_0x41481c(0x621)][_0x2d9429]);const _0x50993d=(_0x16026a,_0x11d1b4)=>{const _0x11b805=_0x41481c;if(!_0x11d1b4)return _0x16026a;if(_0x11d1b4[_0x11b805(0x5d3)][_0x11b805(0x58a)](VisuMZ[_0x11b805(0x565)][_0x11b805(0x34f)][_0x11b805(0x732)][_0x2777f2])){var _0x20a5a3=Number(RegExp['$1']);if(_0x20a5a3===0x0)_0x20a5a3=Number[_0x11b805(0x4b2)];_0x16026a=Math[_0x11b805(0x66c)](_0x16026a,_0x20a5a3);}if(_0x11d1b4['note'][_0x11b805(0x58a)](VisuMZ[_0x11b805(0x565)]['RegExp'][_0x11b805(0x208)][_0x2777f2])){var _0x1ba290=String(RegExp['$1']);try{_0x16026a=Math[_0x11b805(0x66c)](_0x16026a,Number(eval(_0x1ba290)));}catch(_0x460dd1){if($gameTemp[_0x11b805(0x252)]())console[_0x11b805(0x57f)](_0x460dd1);}}return _0x16026a;};if(this['_cache'][_0x2d9429]===0x0)this['_cache'][_0x2d9429]=Number[_0x41481c(0x4b2)];return this[_0x41481c(0x146)][_0x2d9429]=this[_0x41481c(0x60b)]()[_0x41481c(0x1c3)](_0x50993d,this[_0x41481c(0x146)][_0x2d9429]),this[_0x41481c(0x146)][_0x2d9429];},Game_BattlerBase['prototype'][_0x32e60b(0x464)]=function(_0xad9ee1){const _0x4edd50=_0x32e60b,_0x33ead8=this[_0x4edd50(0x6cb)](Game_BattlerBase[_0x4edd50(0x434)],_0xad9ee1),_0x107914=(_0x8f56bd,_0x32007f)=>{const _0x54bea3=_0x4edd50;if(!_0x32007f)return _0x8f56bd;if(_0x32007f[_0x54bea3(0x5d3)][_0x54bea3(0x58a)](VisuMZ[_0x54bea3(0x565)][_0x54bea3(0x34f)]['paramRate1'][_0xad9ee1])){var _0x32ac4c=Number(RegExp['$1'])/0x64;_0x8f56bd*=_0x32ac4c;}if(_0x32007f[_0x54bea3(0x5d3)][_0x54bea3(0x58a)](VisuMZ[_0x54bea3(0x565)][_0x54bea3(0x34f)]['paramRate2'][_0xad9ee1])){var _0x32ac4c=Number(RegExp['$1']);_0x8f56bd*=_0x32ac4c;}if(_0x32007f[_0x54bea3(0x5d3)][_0x54bea3(0x58a)](VisuMZ[_0x54bea3(0x565)][_0x54bea3(0x34f)][_0x54bea3(0x361)][_0xad9ee1])){var _0x577348=String(RegExp['$1']);try{_0x8f56bd*=eval(_0x577348);}catch(_0x315a8d){if($gameTemp[_0x54bea3(0x252)]())console[_0x54bea3(0x57f)](_0x315a8d);}}return _0x8f56bd;};return this[_0x4edd50(0x60b)]()[_0x4edd50(0x1c3)](_0x107914,_0x33ead8);},Game_BattlerBase[_0x32e60b(0x303)]['paramFlatBonus']=function(_0x46774b){const _0x31ad7f=_0x32e60b,_0x1c10f0=(_0x4ce539,_0x3ec9d5)=>{const _0x2b8b0b=_0x1f8f;if(!_0x3ec9d5)return _0x4ce539;if(_0x3ec9d5['note'][_0x2b8b0b(0x58a)](VisuMZ[_0x2b8b0b(0x565)][_0x2b8b0b(0x34f)][_0x2b8b0b(0x201)][_0x46774b])){var _0x36ee6d=Number(RegExp['$1']);_0x4ce539+=_0x36ee6d;}if(_0x3ec9d5[_0x2b8b0b(0x5d3)][_0x2b8b0b(0x58a)](VisuMZ['CoreEngine'][_0x2b8b0b(0x34f)]['paramFlatJS'][_0x46774b])){var _0xe33a55=String(RegExp['$1']);try{_0x4ce539+=eval(_0xe33a55);}catch(_0x5571a3){if($gameTemp[_0x2b8b0b(0x252)]())console['log'](_0x5571a3);}}return _0x4ce539;};return this[_0x31ad7f(0x60b)]()[_0x31ad7f(0x1c3)](_0x1c10f0,0x0);},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x787)]=function(_0xdee90d){const _0x4b59a9=_0x32e60b;let _0x11cd6e='param'+_0xdee90d+_0x4b59a9(0x2a5);if(this['checkCacheKey'](_0x11cd6e))return this['_cache'][_0x11cd6e];return this['_cache'][_0x11cd6e]=Math[_0x4b59a9(0x474)](VisuMZ[_0x4b59a9(0x565)]['Settings'][_0x4b59a9(0x621)][_0x4b59a9(0x76f)]['call'](this,_0xdee90d)),this[_0x4b59a9(0x146)][_0x11cd6e];},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x525)]=function(_0x497e25){const _0x4ae6cd=_0x32e60b,_0x5d1afa=(_0x246e14,_0x2d399c)=>{const _0x406b4e=_0x1f8f;if(!_0x2d399c)return _0x246e14;if(_0x2d399c[_0x406b4e(0x5d3)][_0x406b4e(0x58a)](VisuMZ[_0x406b4e(0x565)]['RegExp'][_0x406b4e(0x110)][_0x497e25])){var _0x535ace=Number(RegExp['$1'])/0x64;_0x246e14+=_0x535ace;}if(_0x2d399c[_0x406b4e(0x5d3)]['match'](VisuMZ[_0x406b4e(0x565)][_0x406b4e(0x34f)][_0x406b4e(0x672)][_0x497e25])){var _0x535ace=Number(RegExp['$1']);_0x246e14+=_0x535ace;}if(_0x2d399c[_0x406b4e(0x5d3)][_0x406b4e(0x58a)](VisuMZ[_0x406b4e(0x565)][_0x406b4e(0x34f)]['xparamPlusJS'][_0x497e25])){var _0x2d0f78=String(RegExp['$1']);try{_0x246e14+=eval(_0x2d0f78);}catch(_0x5e3edf){if($gameTemp[_0x406b4e(0x252)]())console[_0x406b4e(0x57f)](_0x5e3edf);}}return _0x246e14;};return this[_0x4ae6cd(0x60b)]()[_0x4ae6cd(0x1c3)](_0x5d1afa,0x0);},Game_BattlerBase['prototype'][_0x32e60b(0x887)]=function(_0x29313d){const _0x2d325f=_0x32e60b,_0x5b24da=(_0x39ce8e,_0x12b739)=>{const _0x477079=_0x1f8f;if(!_0x12b739)return _0x39ce8e;if(_0x12b739[_0x477079(0x5d3)][_0x477079(0x58a)](VisuMZ[_0x477079(0x565)][_0x477079(0x34f)]['xparamRate1'][_0x29313d])){var _0x3a05dc=Number(RegExp['$1'])/0x64;_0x39ce8e*=_0x3a05dc;}if(_0x12b739[_0x477079(0x5d3)][_0x477079(0x58a)](VisuMZ[_0x477079(0x565)][_0x477079(0x34f)][_0x477079(0x545)][_0x29313d])){var _0x3a05dc=Number(RegExp['$1']);_0x39ce8e*=_0x3a05dc;}if(_0x12b739[_0x477079(0x5d3)][_0x477079(0x58a)](VisuMZ[_0x477079(0x565)][_0x477079(0x34f)]['xparamRateJS'][_0x29313d])){var _0x3113b8=String(RegExp['$1']);try{_0x39ce8e*=eval(_0x3113b8);}catch(_0x16e747){if($gameTemp[_0x477079(0x252)]())console[_0x477079(0x57f)](_0x16e747);}}return _0x39ce8e;};return this[_0x2d325f(0x60b)]()[_0x2d325f(0x1c3)](_0x5b24da,0x1);},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x302)]=function(_0x1ae939){const _0x542dee=_0x32e60b,_0x3e7283=(_0x2b975f,_0xca15a7)=>{const _0x2ae69d=_0x1f8f;if(!_0xca15a7)return _0x2b975f;if(_0xca15a7[_0x2ae69d(0x5d3)]['match'](VisuMZ[_0x2ae69d(0x565)][_0x2ae69d(0x34f)][_0x2ae69d(0x5b1)][_0x1ae939])){var _0x5710c0=Number(RegExp['$1'])/0x64;_0x2b975f+=_0x5710c0;}if(_0xca15a7['note'][_0x2ae69d(0x58a)](VisuMZ['CoreEngine'][_0x2ae69d(0x34f)][_0x2ae69d(0x18e)][_0x1ae939])){var _0x5710c0=Number(RegExp['$1']);_0x2b975f+=_0x5710c0;}if(_0xca15a7['note']['match'](VisuMZ[_0x2ae69d(0x565)][_0x2ae69d(0x34f)][_0x2ae69d(0x2c9)][_0x1ae939])){var _0x18e18a=String(RegExp['$1']);try{_0x2b975f+=eval(_0x18e18a);}catch(_0x511db5){if($gameTemp[_0x2ae69d(0x252)]())console[_0x2ae69d(0x57f)](_0x511db5);}}return _0x2b975f;};return this[_0x542dee(0x60b)]()[_0x542dee(0x1c3)](_0x3e7283,0x0);},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x784)]=function(_0x174840){const _0x3fc96b=_0x32e60b;let _0x2666bd=_0x3fc96b(0x784)+_0x174840+_0x3fc96b(0x2a5);if(this[_0x3fc96b(0x719)](_0x2666bd))return this[_0x3fc96b(0x146)][_0x2666bd];return this[_0x3fc96b(0x146)][_0x2666bd]=VisuMZ[_0x3fc96b(0x565)][_0x3fc96b(0x1e6)][_0x3fc96b(0x621)][_0x3fc96b(0x258)][_0x3fc96b(0x2d2)](this,_0x174840),this[_0x3fc96b(0x146)][_0x2666bd];},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x3a6)]=function(_0x17c30d){const _0x20bfc8=_0x32e60b,_0x3af25c=(_0x3628a4,_0x2a8f01)=>{const _0x5185b3=_0x1f8f;if(!_0x2a8f01)return _0x3628a4;if(_0x2a8f01[_0x5185b3(0x5d3)][_0x5185b3(0x58a)](VisuMZ[_0x5185b3(0x565)][_0x5185b3(0x34f)]['sparamPlus1'][_0x17c30d])){var _0x258dc4=Number(RegExp['$1'])/0x64;_0x3628a4+=_0x258dc4;}if(_0x2a8f01[_0x5185b3(0x5d3)][_0x5185b3(0x58a)](VisuMZ[_0x5185b3(0x565)]['RegExp'][_0x5185b3(0x4c4)][_0x17c30d])){var _0x258dc4=Number(RegExp['$1']);_0x3628a4+=_0x258dc4;}if(_0x2a8f01[_0x5185b3(0x5d3)][_0x5185b3(0x58a)](VisuMZ[_0x5185b3(0x565)][_0x5185b3(0x34f)]['sparamPlusJS'][_0x17c30d])){var _0x234bf4=String(RegExp['$1']);try{_0x3628a4+=eval(_0x234bf4);}catch(_0x4e34b7){if($gameTemp[_0x5185b3(0x252)]())console[_0x5185b3(0x57f)](_0x4e34b7);}}return _0x3628a4;};return this[_0x20bfc8(0x60b)]()[_0x20bfc8(0x1c3)](_0x3af25c,0x0);},Game_BattlerBase[_0x32e60b(0x303)]['sparamRate']=function(_0x44de51){const _0x1c2222=_0x32e60b,_0x10de93=(_0x891a09,_0x4f7e02)=>{const _0x156ff2=_0x1f8f;if(!_0x4f7e02)return _0x891a09;if(_0x4f7e02[_0x156ff2(0x5d3)][_0x156ff2(0x58a)](VisuMZ[_0x156ff2(0x565)][_0x156ff2(0x34f)]['sparamRate1'][_0x44de51])){var _0x52d0de=Number(RegExp['$1'])/0x64;_0x891a09*=_0x52d0de;}if(_0x4f7e02[_0x156ff2(0x5d3)][_0x156ff2(0x58a)](VisuMZ[_0x156ff2(0x565)][_0x156ff2(0x34f)][_0x156ff2(0x341)][_0x44de51])){var _0x52d0de=Number(RegExp['$1']);_0x891a09*=_0x52d0de;}if(_0x4f7e02[_0x156ff2(0x5d3)][_0x156ff2(0x58a)](VisuMZ[_0x156ff2(0x565)]['RegExp'][_0x156ff2(0x520)][_0x44de51])){var _0x2da769=String(RegExp['$1']);try{_0x891a09*=eval(_0x2da769);}catch(_0x4d3fbb){if($gameTemp[_0x156ff2(0x252)]())console[_0x156ff2(0x57f)](_0x4d3fbb);}}return _0x891a09;};return this['traitObjects']()[_0x1c2222(0x1c3)](_0x10de93,0x1);},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x6ce)]=function(_0x4a5d33){const _0x2abd4d=_0x32e60b,_0x17ecff=(_0xbe2da3,_0x8c866)=>{const _0x128e8b=_0x1f8f;if(!_0x8c866)return _0xbe2da3;if(_0x8c866[_0x128e8b(0x5d3)][_0x128e8b(0x58a)](VisuMZ[_0x128e8b(0x565)][_0x128e8b(0x34f)][_0x128e8b(0x5e4)][_0x4a5d33])){var _0x547c21=Number(RegExp['$1'])/0x64;_0xbe2da3+=_0x547c21;}if(_0x8c866[_0x128e8b(0x5d3)][_0x128e8b(0x58a)](VisuMZ['CoreEngine'][_0x128e8b(0x34f)][_0x128e8b(0x4e6)][_0x4a5d33])){var _0x547c21=Number(RegExp['$1']);_0xbe2da3+=_0x547c21;}if(_0x8c866['note']['match'](VisuMZ[_0x128e8b(0x565)][_0x128e8b(0x34f)][_0x128e8b(0x858)][_0x4a5d33])){var _0x43fe3d=String(RegExp['$1']);try{_0xbe2da3+=eval(_0x43fe3d);}catch(_0x977126){if($gameTemp['isPlaytest']())console[_0x128e8b(0x57f)](_0x977126);}}return _0xbe2da3;};return this[_0x2abd4d(0x60b)]()['reduce'](_0x17ecff,0x0);},Game_BattlerBase[_0x32e60b(0x303)][_0x32e60b(0x2c1)]=function(_0xb71396){const _0x2e5f2a=_0x32e60b;let _0x1878d6=_0x2e5f2a(0x2c1)+_0xb71396+_0x2e5f2a(0x2a5);if(this['checkCacheKey'](_0x1878d6))return this['_cache'][_0x1878d6];return this[_0x2e5f2a(0x146)][_0x1878d6]=VisuMZ[_0x2e5f2a(0x565)][_0x2e5f2a(0x1e6)][_0x2e5f2a(0x621)][_0x2e5f2a(0x48b)][_0x2e5f2a(0x2d2)](this,_0xb71396),this[_0x2e5f2a(0x146)][_0x1878d6];},Game_BattlerBase[_0x32e60b(0x303)]['paramValueByName']=function(_0x15d290,_0x2c9c7f){const _0x188386=_0x32e60b;if(typeof paramId===_0x188386(0x400))return this['param'](_0x15d290);_0x15d290=String(_0x15d290||'')['toUpperCase']();if(_0x15d290===_0x188386(0x871))return this[_0x188386(0x787)](0x0);if(_0x15d290===_0x188386(0x8b2))return this[_0x188386(0x787)](0x1);if(_0x15d290==='ATK')return this[_0x188386(0x787)](0x2);if(_0x15d290===_0x188386(0x408))return this['param'](0x3);if(_0x15d290===_0x188386(0x766))return this[_0x188386(0x787)](0x4);if(_0x15d290===_0x188386(0x4a1))return this['param'](0x5);if(_0x15d290===_0x188386(0x164))return this['param'](0x6);if(_0x15d290===_0x188386(0x88a))return this[_0x188386(0x787)](0x7);if(_0x15d290==='HIT')return _0x2c9c7f?String(Math['round'](this[_0x188386(0x784)](0x0)*0x64))+'%':this[_0x188386(0x784)](0x0);if(_0x15d290===_0x188386(0x173))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x784)](0x1)*0x64))+'%':this[_0x188386(0x784)](0x1);if(_0x15d290==='CRI')return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x784)](0x2)*0x64))+'%':this[_0x188386(0x784)](0x2);if(_0x15d290==='CEV')return _0x2c9c7f?String(Math[_0x188386(0x474)](this['xparam'](0x3)*0x64))+'%':this[_0x188386(0x784)](0x3);if(_0x15d290===_0x188386(0x5aa))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x784)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x15d290===_0x188386(0x2e6))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x784)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x15d290===_0x188386(0x605))return _0x2c9c7f?String(Math['round'](this[_0x188386(0x784)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x15d290==='HRG')return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x784)](0x7)*0x64))+'%':this[_0x188386(0x784)](0x7);if(_0x15d290===_0x188386(0x6be))return _0x2c9c7f?String(Math[_0x188386(0x474)](this['xparam'](0x8)*0x64))+'%':this[_0x188386(0x784)](0x8);if(_0x15d290===_0x188386(0x282))return _0x2c9c7f?String(Math['round'](this[_0x188386(0x784)](0x9)*0x64))+'%':this[_0x188386(0x784)](0x9);if(_0x15d290==='TGR')return _0x2c9c7f?String(Math['round'](this[_0x188386(0x2c1)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x15d290===_0x188386(0x3e8))return _0x2c9c7f?String(Math['round'](this['sparam'](0x1)*0x64))+'%':this[_0x188386(0x2c1)](0x1);if(_0x15d290==='REC')return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x2c1)](0x2)*0x64))+'%':this[_0x188386(0x2c1)](0x2);if(_0x15d290===_0x188386(0x4e0))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x2c1)](0x3)*0x64))+'%':this[_0x188386(0x2c1)](0x3);if(_0x15d290===_0x188386(0x15c))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x2c1)](0x4)*0x64))+'%':this[_0x188386(0x2c1)](0x4);if(_0x15d290===_0x188386(0x78c))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x2c1)](0x5)*0x64))+'%':this[_0x188386(0x2c1)](0x5);if(_0x15d290===_0x188386(0x304))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x2c1)](0x6)*0x64))+'%':this[_0x188386(0x2c1)](0x6);if(_0x15d290===_0x188386(0x6fb))return _0x2c9c7f?String(Math[_0x188386(0x474)](this[_0x188386(0x2c1)](0x7)*0x64))+'%':this[_0x188386(0x2c1)](0x7);if(_0x15d290===_0x188386(0x663))return _0x2c9c7f?String(Math[_0x188386(0x474)](this['sparam'](0x8)*0x64))+'%':this[_0x188386(0x2c1)](0x8);if(_0x15d290===_0x188386(0x432))return _0x2c9c7f?String(Math['round'](this[_0x188386(0x2c1)](0x9)*0x64))+'%':this[_0x188386(0x2c1)](0x9);if(VisuMZ['CoreEngine'][_0x188386(0x47f)][_0x15d290]){const _0x7e9110=VisuMZ[_0x188386(0x565)][_0x188386(0x47f)][_0x15d290],_0x3f8b36=this[_0x7e9110];return VisuMZ[_0x188386(0x565)][_0x188386(0x552)][_0x15d290]===_0x188386(0x814)?_0x3f8b36:_0x2c9c7f?String(Math['round'](_0x3f8b36*0x64))+'%':_0x3f8b36;}return'';},Game_BattlerBase[_0x32e60b(0x303)]['isDying']=function(){const _0x3eaae7=_0x32e60b;return this[_0x3eaae7(0x34b)]()&&this[_0x3eaae7(0x2bc)]<this['mhp']*VisuMZ[_0x3eaae7(0x565)][_0x3eaae7(0x1e6)][_0x3eaae7(0x621)][_0x3eaae7(0x2b8)];},Game_Battler[_0x32e60b(0x303)][_0x32e60b(0x628)]=function(){const _0x54e56d=_0x32e60b;SoundManager[_0x54e56d(0x686)](),this[_0x54e56d(0x170)]('evade');},VisuMZ['CoreEngine'][_0x32e60b(0x746)]=Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x836)],Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x836)]=function(_0x5270ee){const _0x323c71=_0x32e60b;if(this[_0x323c71(0x248)]>0x63)return this[_0x323c71(0x1fa)](_0x5270ee);return VisuMZ['CoreEngine'][_0x323c71(0x746)][_0x323c71(0x2d2)](this,_0x5270ee);},Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x1fa)]=function(_0x470d78){const _0x7f8fee=_0x32e60b,_0x4a572d=this[_0x7f8fee(0x5b2)]()['params'][_0x470d78][0x63],_0x5c6826=this[_0x7f8fee(0x5b2)]()[_0x7f8fee(0x528)][_0x470d78][0x62];return _0x4a572d+(_0x4a572d-_0x5c6826)*(this['level']-0x63);},VisuMZ[_0x32e60b(0x565)]['Game_Actor_changeClass']=Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x45e)],Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x45e)]=function(_0x4891c1,_0xabd995){const _0x4ccc2a=_0x32e60b;$gameTemp[_0x4ccc2a(0x863)]=!![],VisuMZ[_0x4ccc2a(0x565)][_0x4ccc2a(0x80b)][_0x4ccc2a(0x2d2)](this,_0x4891c1,_0xabd995),$gameTemp[_0x4ccc2a(0x863)]=undefined;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3c7)]=Game_Actor['prototype'][_0x32e60b(0x1ad)],Game_Actor['prototype'][_0x32e60b(0x1ad)]=function(){const _0x134b53=_0x32e60b;VisuMZ[_0x134b53(0x565)][_0x134b53(0x3c7)][_0x134b53(0x2d2)](this);if(!$gameTemp['_changingClass'])this[_0x134b53(0x49a)]();},Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x49a)]=function(){const _0x4dc4c2=_0x32e60b;this[_0x4dc4c2(0x146)]={};if(VisuMZ[_0x4dc4c2(0x565)][_0x4dc4c2(0x1e6)][_0x4dc4c2(0x89e)][_0x4dc4c2(0x5bb)])this[_0x4dc4c2(0x2bc)]=this[_0x4dc4c2(0x12b)];if(VisuMZ['CoreEngine'][_0x4dc4c2(0x1e6)]['QoL'][_0x4dc4c2(0x1c1)])this[_0x4dc4c2(0x384)]=this[_0x4dc4c2(0x857)];},Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x7ba)]=function(){const _0x76bb52=_0x32e60b;if(this[_0x76bb52(0x78a)]())return 0x1;const _0x4fb772=this[_0x76bb52(0x740)]()-this[_0x76bb52(0x4d0)](),_0x5693ba=this['currentExp']()-this[_0x76bb52(0x4d0)]();return(_0x5693ba/_0x4fb772)[_0x76bb52(0x7c2)](0x0,0x1);},Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x60b)]=function(){const _0x17e6d4=_0x32e60b,_0x3aadf7=Game_Battler[_0x17e6d4(0x303)][_0x17e6d4(0x60b)][_0x17e6d4(0x2d2)](this);for(const _0x3861a1 of this['equips']()){_0x3861a1&&_0x3aadf7[_0x17e6d4(0x724)](_0x3861a1);}return _0x3aadf7['push'](this[_0x17e6d4(0x5b2)](),this[_0x17e6d4(0x7b3)]()),_0x3aadf7;},Object['defineProperty'](Game_Enemy['prototype'],_0x32e60b(0x248),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x32e60b(0x303)]['getLevel']=function(){const _0x1ccab6=_0x32e60b;return this[_0x1ccab6(0x87b)]()[_0x1ccab6(0x248)];},Game_Enemy[_0x32e60b(0x303)][_0x32e60b(0x393)]=function(){const _0x185104=_0x32e60b;!this[_0x185104(0x884)]&&(this[_0x185104(0x646)]+=Math[_0x185104(0x474)]((Graphics[_0x185104(0x32b)]-0x270)/0x2),this[_0x185104(0x646)]-=Math['floor']((Graphics[_0x185104(0x32b)]-Graphics[_0x185104(0x3ea)])/0x2),$gameSystem[_0x185104(0x85c)]()?this[_0x185104(0x696)]-=Math['floor']((Graphics[_0x185104(0x36c)]-Graphics[_0x185104(0x3a7)])/0x2):this['_screenX']+=Math[_0x185104(0x474)]((Graphics[_0x185104(0x3a7)]-0x330)/0x2)),this[_0x185104(0x884)]=!![];},Game_Party[_0x32e60b(0x303)][_0x32e60b(0x240)]=function(){const _0x173205=_0x32e60b;return VisuMZ[_0x173205(0x565)]['Settings'][_0x173205(0x344)][_0x173205(0x33d)];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x65a)]=Game_Party['prototype']['consumeItem'],Game_Party[_0x32e60b(0x303)][_0x32e60b(0x218)]=function(_0xbd551){const _0x5e32f4=_0x32e60b;if(VisuMZ['CoreEngine']['Settings'][_0x5e32f4(0x89e)][_0x5e32f4(0x7de)]&&DataManager[_0x5e32f4(0x77c)](_0xbd551))return;VisuMZ[_0x5e32f4(0x565)]['Game_Party_consumeItem'][_0x5e32f4(0x2d2)](this,_0xbd551);},Game_Party[_0x32e60b(0x303)][_0x32e60b(0x51e)]=function(){const _0x272ad0=_0x32e60b,_0x1f6993=VisuMZ[_0x272ad0(0x565)]['Settings'][_0x272ad0(0x89e)],_0x34efea=_0x1f6993[_0x272ad0(0x416)]??0x63;let _0x48cfaa=[];(_0x1f6993[_0x272ad0(0x133)]??!![])&&(_0x48cfaa=_0x48cfaa[_0x272ad0(0x35d)]($dataItems));(_0x1f6993[_0x272ad0(0x67e)]??!![])&&(_0x48cfaa=_0x48cfaa['concat']($dataWeapons));(_0x1f6993['BTestArmors']??!![])&&(_0x48cfaa=_0x48cfaa[_0x272ad0(0x35d)]($dataArmors));for(const _0x4e497b of _0x48cfaa){if(!_0x4e497b)continue;if(_0x4e497b[_0x272ad0(0x50d)][_0x272ad0(0x870)]()<=0x0)continue;if(_0x4e497b[_0x272ad0(0x50d)]['match'](/-----/i))continue;this[_0x272ad0(0x22e)](_0x4e497b,_0x34efea);}},VisuMZ['CoreEngine'][_0x32e60b(0x3c3)]=Game_Troop[_0x32e60b(0x303)][_0x32e60b(0x186)],Game_Troop['prototype'][_0x32e60b(0x186)]=function(_0x548dff){const _0x289680=_0x32e60b;$gameTemp[_0x289680(0x6d2)](),$gameTemp[_0x289680(0x4b8)](_0x548dff),VisuMZ['CoreEngine'][_0x289680(0x3c3)][_0x289680(0x2d2)](this,_0x548dff);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e8)]=Game_Map[_0x32e60b(0x303)][_0x32e60b(0x186)],Game_Map['prototype']['setup']=function(_0x5db08c){const _0x40c070=_0x32e60b;VisuMZ[_0x40c070(0x565)]['Game_Map_setup']['call'](this,_0x5db08c),this[_0x40c070(0x4c1)](),this[_0x40c070(0x7c7)](_0x5db08c),this[_0x40c070(0x111)]();},Game_Map[_0x32e60b(0x303)][_0x32e60b(0x7c7)]=function(){const _0xd9ba4a=_0x32e60b;this['_hideTileShadows']=VisuMZ[_0xd9ba4a(0x565)][_0xd9ba4a(0x1e6)][_0xd9ba4a(0x89e)][_0xd9ba4a(0x155)]||![];const _0x5658c3=VisuMZ[_0xd9ba4a(0x565)][_0xd9ba4a(0x1e6)][_0xd9ba4a(0x7f0)],_0x2e6820=$dataMap?$dataMap['note']||'':'';if(_0x2e6820[_0xd9ba4a(0x58a)](/<SHOW TILE SHADOWS>/i))this[_0xd9ba4a(0x53e)]=![];else _0x2e6820['match'](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x2e6820['match'](/<SCROLL LOCK X>/i))this[_0xd9ba4a(0x566)]()[_0xd9ba4a(0x8c6)]=!![],this[_0xd9ba4a(0x566)]()['displayX']=_0x5658c3[_0xd9ba4a(0x23d)];else _0x2e6820[_0xd9ba4a(0x58a)](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()['centerX']=!![],this[_0xd9ba4a(0x566)]()['displayX']=Number(RegExp['$1']));if(_0x2e6820[_0xd9ba4a(0x58a)](/<SCROLL LOCK Y>/i))this[_0xd9ba4a(0x566)]()[_0xd9ba4a(0x6ea)]=!![],this[_0xd9ba4a(0x566)]()[_0xd9ba4a(0x608)]=_0x5658c3[_0xd9ba4a(0x5a6)];else _0x2e6820['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0xd9ba4a(0x566)]()[_0xd9ba4a(0x6ea)]=!![],this[_0xd9ba4a(0x566)]()[_0xd9ba4a(0x608)]=Number(RegExp['$1']));},Game_Map['prototype'][_0x32e60b(0x225)]=function(){const _0x453ffb=_0x32e60b;if(this[_0x453ffb(0x53e)]===undefined)this['setupCoreEngine']();return this[_0x453ffb(0x53e)];},Game_Map['prototype'][_0x32e60b(0x4c1)]=function(){const _0x533721=_0x32e60b,_0xd3a3e4=VisuMZ['CoreEngine'][_0x533721(0x1e6)][_0x533721(0x7f0)];this[_0x533721(0x6bb)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0xd3a3e4[_0x533721(0x77a)]){const _0x5423ce=Graphics[_0x533721(0x36c)]/this['tileWidth']();_0x5423ce%0x1!==0x0&&Math[_0x533721(0x689)](_0x5423ce)===this[_0x533721(0x36c)]()&&!this[_0x533721(0x8b4)]()&&(this[_0x533721(0x6bb)]['centerX']=!![],this[_0x533721(0x6bb)]['displayX']=_0xd3a3e4[_0x533721(0x23d)]||0x0);}if(_0xd3a3e4['AutoScrollLockY']){const _0x3c40d6=Graphics[_0x533721(0x32b)]/this['tileHeight']();_0x3c40d6%0x1!==0x0&&Math[_0x533721(0x689)](_0x3c40d6)===this[_0x533721(0x32b)]()&&!this['isLoopVertical']()&&(this[_0x533721(0x6bb)][_0x533721(0x6ea)]=!![],this[_0x533721(0x6bb)]['displayY']=_0xd3a3e4[_0x533721(0x5a6)]||0x0);}$gameScreen[_0x533721(0x494)]()===0x1&&(this[_0x533721(0x566)]()[_0x533721(0x8c6)]&&(this[_0x533721(0x37f)]=this[_0x533721(0x566)]()['displayX']),this[_0x533721(0x566)]()[_0x533721(0x6ea)]&&(this['_displayY']=this[_0x533721(0x566)]()[_0x533721(0x608)]));},VisuMZ[_0x32e60b(0x565)]['Game_Map_setDisplayPos']=Game_Map[_0x32e60b(0x303)][_0x32e60b(0x485)],Game_Map[_0x32e60b(0x303)][_0x32e60b(0x485)]=function(_0x25bfab,_0x12527f){const _0x2944e3=_0x32e60b;VisuMZ[_0x2944e3(0x565)][_0x2944e3(0x8b1)][_0x2944e3(0x2d2)](this,_0x25bfab,_0x12527f),$gameScreen['zoomScale']()===0x1&&(!this[_0x2944e3(0x8b4)]()&&this[_0x2944e3(0x566)]()['centerX']&&(this[_0x2944e3(0x37f)]=this['centerCameraCheckData']()[_0x2944e3(0x469)]),!this[_0x2944e3(0x271)]()&&this[_0x2944e3(0x566)]()[_0x2944e3(0x6ea)]&&(this[_0x2944e3(0x328)]=this[_0x2944e3(0x566)]()[_0x2944e3(0x608)]));},Game_Map[_0x32e60b(0x303)][_0x32e60b(0x566)]=function(){const _0x282e97=_0x32e60b;if(this[_0x282e97(0x6bb)]===undefined)this[_0x282e97(0x4c1)]();return this['_centerCameraCheck'];},VisuMZ['CoreEngine'][_0x32e60b(0x12c)]=Game_Map[_0x32e60b(0x303)][_0x32e60b(0x658)],Game_Map[_0x32e60b(0x303)][_0x32e60b(0x658)]=function(_0x18075a){const _0x4b2146=_0x32e60b;if(this[_0x4b2146(0x566)]()[_0x4b2146(0x6ea)]&&$gameScreen[_0x4b2146(0x494)]()===0x1){this['_displayY']=this[_0x4b2146(0x566)]()[_0x4b2146(0x608)];return;}VisuMZ[_0x4b2146(0x565)]['Game_Map_scrollDown'][_0x4b2146(0x2d2)](this,_0x18075a);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3ef)]=Game_Map[_0x32e60b(0x303)][_0x32e60b(0x684)],Game_Map['prototype'][_0x32e60b(0x684)]=function(_0x4c07d2){const _0x2e93a9=_0x32e60b;if(this['centerCameraCheckData']()['centerX']&&$gameScreen[_0x2e93a9(0x494)]()===0x1){this['_displayX']=this['centerCameraCheckData']()[_0x2e93a9(0x469)];return;}VisuMZ['CoreEngine']['Game_Map_scrollLeft'][_0x2e93a9(0x2d2)](this,_0x4c07d2);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x76d)]=Game_Map[_0x32e60b(0x303)]['scrollRight'],Game_Map[_0x32e60b(0x303)]['scrollRight']=function(_0x3e6c80){const _0x224288=_0x32e60b;if(this[_0x224288(0x566)]()['centerX']&&$gameScreen['zoomScale']()===0x1){this[_0x224288(0x37f)]=this[_0x224288(0x566)]()[_0x224288(0x469)];return;}VisuMZ[_0x224288(0x565)]['Game_Map_scrollRight'][_0x224288(0x2d2)](this,_0x3e6c80);},VisuMZ[_0x32e60b(0x565)]['Game_Map_scrollUp']=Game_Map['prototype']['scrollUp'],Game_Map[_0x32e60b(0x303)][_0x32e60b(0x551)]=function(_0x435c60){const _0xf8a0f8=_0x32e60b;if(this[_0xf8a0f8(0x566)]()[_0xf8a0f8(0x6ea)]&&$gameScreen[_0xf8a0f8(0x494)]()===0x1){this[_0xf8a0f8(0x328)]=this[_0xf8a0f8(0x566)]()[_0xf8a0f8(0x608)];return;}VisuMZ[_0xf8a0f8(0x565)][_0xf8a0f8(0x654)][_0xf8a0f8(0x2d2)](this,_0x435c60);},Game_Map[_0x32e60b(0x303)]['setupTileExtendTerrainTags']=function(){const _0x32e177=_0x32e60b;this['_tileExtendTerrainTags']={};const _0x13ce89=this[_0x32e177(0x377)]();if(!_0x13ce89)return{};const _0x2b6163=_0x13ce89[_0x32e177(0x5d3)]||'',_0x2a3d4b=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x48d55e={};const _0x4380db=_0x2b6163[_0x32e177(0x58a)](_0x2a3d4b);if(_0x4380db)for(const _0x53a3be of _0x4380db){_0x53a3be[_0x32e177(0x58a)](_0x2a3d4b);const _0x3fc7ed=Number(RegExp['$1'])[_0x32e177(0x7c2)](0x1,0x10),_0x567036=String(RegExp['$2'])[_0x32e177(0x1c7)](',')[_0x32e177(0x708)](_0x4b1d9d=>Number(_0x4b1d9d)[_0x32e177(0x7c2)](0x1,0x7));for(const _0x15d730 of _0x567036){_0x48d55e[_0x15d730]=_0x3fc7ed;}}this[_0x32e177(0x8a4)]=_0x48d55e;},Game_Map[_0x32e60b(0x303)][_0x32e60b(0x355)]=function(){const _0x366696=_0x32e60b;if(this[_0x366696(0x8a4)]===undefined)this[_0x366696(0x111)]();return this[_0x366696(0x8a4)];},Game_Map[_0x32e60b(0x303)]['isTileExtended']=function(_0x508171){const _0x401d48=_0x32e60b;if(_0x508171>=0x400)return![];const _0x33c650=$gameMap['getTileExtendTerrainTags']();if(Object['keys'](_0x33c650)[_0x401d48(0x4e4)]<=0x0)return![];const _0x3e5797=this[_0x401d48(0x276)](),_0x176d1e=_0x3e5797[_0x508171]>>0xc,_0x169111=_0x33c650[_0x176d1e]||0x0;return _0x169111>0x0;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x742)]=Game_Map['prototype'][_0x32e60b(0x7df)],Game_Map[_0x32e60b(0x303)]['changeTileset']=function(_0x49e577){const _0x1030c6=_0x32e60b;VisuMZ[_0x1030c6(0x565)][_0x1030c6(0x742)][_0x1030c6(0x2d2)](this,_0x49e577),this[_0x1030c6(0x1d6)](),SceneManager[_0x1030c6(0x10b)]['_spriteset']['update']();},Game_Map[_0x32e60b(0x303)][_0x32e60b(0x1d6)]=function(){const _0x42dbe3=_0x32e60b,_0x354c07=this[_0x42dbe3(0x355)]();if(Object[_0x42dbe3(0x5d6)](_0x354c07)[_0x42dbe3(0x4e4)]<=0x0)return;const _0x18d5ad=SceneManager[_0x42dbe3(0x10b)][_0x42dbe3(0x68e)];_0x18d5ad&&(_0x18d5ad[_0x42dbe3(0x16e)]&&_0x18d5ad['removeTileExtendSprites'](),_0x18d5ad[_0x42dbe3(0x180)]&&_0x18d5ad[_0x42dbe3(0x180)]());},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3a4)]=Game_Character[_0x32e60b(0x303)]['processMoveCommand'],Game_Character[_0x32e60b(0x303)][_0x32e60b(0x7d5)]=function(_0x267857){const _0x5b896c=_0x32e60b;try{VisuMZ[_0x5b896c(0x565)][_0x5b896c(0x3a4)][_0x5b896c(0x2d2)](this,_0x267857);}catch(_0x5e718e){if($gameTemp['isPlaytest']())console[_0x5b896c(0x57f)](_0x5e718e);}},Game_Player[_0x32e60b(0x303)][_0x32e60b(0x1b1)]=function(){const _0xe27b13=_0x32e60b,_0x7dd04d=$gameMap[_0xe27b13(0x83b)]();this[_0xe27b13(0x364)]=Math['randomInt'](_0x7dd04d)+Math[_0xe27b13(0x3cb)](_0x7dd04d)+this['encounterStepsMinimum']();},Game_Player[_0x32e60b(0x303)][_0x32e60b(0x49d)]=function(){const _0x42eb5a=_0x32e60b;return $dataMap&&$dataMap[_0x42eb5a(0x5d3)]&&$dataMap[_0x42eb5a(0x5d3)][_0x42eb5a(0x58a)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x42eb5a(0x565)]['Settings'][_0x42eb5a(0x89e)][_0x42eb5a(0x5b5)];},VisuMZ[_0x32e60b(0x565)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x32e60b(0x303)][_0x32e60b(0x289)],Game_Event['prototype'][_0x32e60b(0x289)]=function(_0x1a6dc7,_0x39993a){const _0x960db6=_0x32e60b;return this[_0x960db6(0x6a2)]()?this['checkSmartEventCollision'](_0x1a6dc7,_0x39993a):VisuMZ[_0x960db6(0x565)][_0x960db6(0x7ff)][_0x960db6(0x2d2)](this,_0x1a6dc7,_0x39993a);},Game_Event[_0x32e60b(0x303)][_0x32e60b(0x6a2)]=function(){const _0x19b359=_0x32e60b;return VisuMZ['CoreEngine'][_0x19b359(0x1e6)][_0x19b359(0x89e)]['SmartEventCollisionPriority'];},Game_Event[_0x32e60b(0x303)][_0x32e60b(0x2cc)]=function(_0x32c369,_0x2049cd){const _0x22b7c3=_0x32e60b;if(!this[_0x22b7c3(0x6fa)]())return![];else{const _0x54e772=$gameMap[_0x22b7c3(0x3e3)](_0x32c369,_0x2049cd)[_0x22b7c3(0x6c2)](_0x2ec6e3=>_0x2ec6e3['isNormalPriority']());return _0x54e772[_0x22b7c3(0x4e4)]>0x0;}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x4e2)]=Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x3ca)],Game_Interpreter['prototype'][_0x32e60b(0x3ca)]=function(_0x44fb14){const _0x54ff77=_0x32e60b,_0x2b4acf=this[_0x54ff77(0x397)]();return _0x2b4acf[_0x54ff77(0x58a)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x54ff77(0x4bc)](_0x2b4acf):VisuMZ[_0x54ff77(0x565)][_0x54ff77(0x4e2)]['call'](this,_0x44fb14);},Game_Interpreter[_0x32e60b(0x303)]['getCombinedScrollingText']=function(){const _0x1f00e0=_0x32e60b;let _0x5dafe6='',_0x42182c=this[_0x1f00e0(0x7ed)]+0x1;while(this['_list'][_0x42182c]&&this[_0x1f00e0(0x357)][_0x42182c][_0x1f00e0(0x21a)]===0x195){_0x5dafe6+=this[_0x1f00e0(0x357)][_0x42182c][_0x1f00e0(0x2ce)][0x0]+'\x0a',_0x42182c++;}return _0x5dafe6;},Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x4bc)]=function(_0x30e6e7){const _0x18bdc=_0x32e60b;try{eval(_0x30e6e7);}catch(_0x1302ac){$gameTemp[_0x18bdc(0x252)]()&&(console['log'](_0x18bdc(0x23e)),console[_0x18bdc(0x57f)](_0x1302ac));}return!![];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x131)]=Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x82b)],Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x82b)]=function(_0x30566f){const _0x3fa29d=_0x32e60b;try{VisuMZ['CoreEngine']['Game_Interpreter_command111']['call'](this,_0x30566f);}catch(_0x16ec61){$gameTemp[_0x3fa29d(0x252)]()&&(console[_0x3fa29d(0x57f)](_0x3fa29d(0x6bc)),console[_0x3fa29d(0x57f)](_0x16ec61)),this[_0x3fa29d(0x437)]();}return!![];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x840)]=Game_Interpreter['prototype'][_0x32e60b(0x3a2)],Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x3a2)]=function(_0x38f550){const _0x96e39e=_0x32e60b;try{VisuMZ['CoreEngine']['Game_Interpreter_command122'][_0x96e39e(0x2d2)](this,_0x38f550);}catch(_0x9447fe){$gameTemp[_0x96e39e(0x252)]()&&(console[_0x96e39e(0x57f)](_0x96e39e(0x42b)),console[_0x96e39e(0x57f)](_0x9447fe));}return!![];},VisuMZ[_0x32e60b(0x565)]['Game_Interpreter_command355']=Game_Interpreter['prototype'][_0x32e60b(0x63f)],Game_Interpreter['prototype']['command355']=function(){const _0x3e5a8b=_0x32e60b;try{VisuMZ[_0x3e5a8b(0x565)][_0x3e5a8b(0x699)][_0x3e5a8b(0x2d2)](this);}catch(_0xe8a3c){$gameTemp['isPlaytest']()&&(console['log'](_0x3e5a8b(0x71f)),console['log'](_0xe8a3c));}return!![];},VisuMZ['CoreEngine'][_0x32e60b(0x2c3)]=Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x540)],Game_Interpreter[_0x32e60b(0x303)][_0x32e60b(0x540)]=function(_0x2f963b){const _0x4b244e=_0x32e60b;return $gameTemp[_0x4b244e(0x5e9)](this),VisuMZ['CoreEngine'][_0x4b244e(0x2c3)]['call'](this,_0x2f963b);},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x421)]=function(){const _0x19015f=_0x32e60b;return VisuMZ[_0x19015f(0x565)][_0x19015f(0x1e6)]['UI'][_0x19015f(0x6e0)];},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x293)]=function(){const _0x5e4808=_0x32e60b;return VisuMZ['CoreEngine'][_0x5e4808(0x1e6)]['UI']['BottomHelp'];},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x50e)]=function(){const _0x30c72a=_0x32e60b;return VisuMZ['CoreEngine'][_0x30c72a(0x1e6)]['UI']['BottomButtons'];},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x418)]=function(){const _0x73499f=_0x32e60b;return VisuMZ[_0x73499f(0x565)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x32e60b(0x303)]['mainCommandWidth']=function(){const _0x2cbf7b=_0x32e60b;return VisuMZ[_0x2cbf7b(0x565)][_0x2cbf7b(0x1e6)]['UI'][_0x2cbf7b(0x7bc)];},Scene_Base['prototype'][_0x32e60b(0x281)]=function(){const _0x44fdc5=_0x32e60b;return VisuMZ['CoreEngine']['Settings']['UI'][_0x44fdc5(0x423)];},Scene_Base['prototype'][_0x32e60b(0x76a)]=function(){const _0xdfb5c=_0x32e60b;return VisuMZ[_0xdfb5c(0x565)][_0xdfb5c(0x1e6)][_0xdfb5c(0x365)]['EnableMasking'];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x71a)]=Scene_Base['prototype'][_0x32e60b(0x894)],Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x894)]=function(){const _0x9731bc=_0x32e60b;VisuMZ[_0x9731bc(0x565)][_0x9731bc(0x71a)]['call'](this),this[_0x9731bc(0x71b)](),this[_0x9731bc(0x85f)](),this['_windowLayer']['x']=Math['round'](this['_windowLayer']['x']),this['_windowLayer']['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x71b)]=function(){},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x85f)]=function(){const _0xf74289=_0x32e60b;this[_0xf74289(0x61f)]=new Window_TextPopup(),this['addChild'](this['_textPopupWindow']);},$textPopup=function(_0x22b191){const _0x5c19ad=_0x32e60b,_0x28c362=SceneManager[_0x5c19ad(0x10b)][_0x5c19ad(0x61f)];_0x28c362&&_0x28c362['addQueue'](_0x22b191);},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x484)]=function(){const _0x359a21=_0x32e60b;return TextManager[_0x359a21(0x1bf)]('pageup','pagedown');},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x3d2)]=function(){const _0xf37fb0=_0x32e60b;return TextManager[_0xf37fb0(0x6f7)](_0xf37fb0(0x533));},Scene_Base[_0x32e60b(0x303)]['buttonAssistKey3']=function(){const _0x398bba=_0x32e60b;return TextManager[_0x398bba(0x6f7)](_0x398bba(0x67c));},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x834)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x23f)]=function(){const _0x5995f0=_0x32e60b;return TextManager[_0x5995f0(0x6f7)](_0x5995f0(0x679));},Scene_Base['prototype'][_0x32e60b(0x5d8)]=function(){const _0x4e3fb7=_0x32e60b;return this[_0x4e3fb7(0x733)]&&this[_0x4e3fb7(0x733)][_0x4e3fb7(0x270)]?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x32e60b(0x303)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x6b5)]=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){const _0x44e439=_0x32e60b;return TextManager[_0x44e439(0x5bc)];},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x5d2)]=function(){const _0x47f8e2=_0x32e60b;return TextManager[_0x47f8e2(0x3e6)];},Scene_Base['prototype'][_0x32e60b(0x48d)]=function(){return 0x0;},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x816)]=function(){return 0x0;},Scene_Base[_0x32e60b(0x303)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x53b)]=function(){return 0x0;},Scene_Base[_0x32e60b(0x303)][_0x32e60b(0x116)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x32e60b(0x330)]=Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x4b3)],Scene_Boot[_0x32e60b(0x303)]['loadSystemImages']=function(){const _0x2d1beb=_0x32e60b;VisuMZ[_0x2d1beb(0x565)][_0x2d1beb(0x330)][_0x2d1beb(0x2d2)](this),this[_0x2d1beb(0x70c)]();},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x70c)]=function(){const _0x36192a=_0x32e60b,_0x3dc634=['animations','battlebacks1','battlebacks2',_0x36192a(0x8b8),_0x36192a(0x2f5),_0x36192a(0x481),_0x36192a(0x609),_0x36192a(0x73d),'sv_actors',_0x36192a(0x53a),_0x36192a(0x315),_0x36192a(0x383),'titles1',_0x36192a(0x897)];for(const _0x59277b of _0x3dc634){const _0x3cd091=VisuMZ['CoreEngine'][_0x36192a(0x1e6)][_0x36192a(0x55e)][_0x59277b],_0x32fa48='img/%1/'['format'](_0x59277b);for(const _0x3e8465 of _0x3cd091){ImageManager['loadBitmap'](_0x32fa48,_0x3e8465);}}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x2c5)]=Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x3b2)],Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x3b2)]=function(){const _0x11218f=_0x32e60b;Utils[_0x11218f(0x3b5)](_0x11218f(0x41b))&&VisuMZ[_0x11218f(0x565)][_0x11218f(0x1e6)]['QoL'][_0x11218f(0x318)]?this['startAutoNewGame']():VisuMZ[_0x11218f(0x565)][_0x11218f(0x2c5)][_0x11218f(0x2d2)](this);},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x134)]=function(){const _0x4da93d=_0x32e60b;this[_0x4da93d(0x11e)](),DataManager['setupNewGame'](),SceneManager[_0x4da93d(0x8be)](Scene_Map);},Scene_Boot['prototype'][_0x32e60b(0x458)]=function(){const _0x44f01e=_0x32e60b,_0x40f67d=$dataSystem[_0x44f01e(0x1c5)]['uiAreaWidth'],_0x5965a8=$dataSystem[_0x44f01e(0x1c5)][_0x44f01e(0x47e)],_0x8c5c88=VisuMZ['CoreEngine'][_0x44f01e(0x1e6)]['UI'][_0x44f01e(0x4cd)];Graphics[_0x44f01e(0x3a7)]=_0x40f67d-_0x8c5c88*0x2,Graphics[_0x44f01e(0x3ea)]=_0x5965a8-_0x8c5c88*0x2,this[_0x44f01e(0x403)]();},VisuMZ['CoreEngine'][_0x32e60b(0x253)]=Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x3df)],Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x3df)]=function(){const _0x41165f=_0x32e60b;this[_0x41165f(0x698)]()?this[_0x41165f(0x1a8)]():VisuMZ[_0x41165f(0x565)][_0x41165f(0x253)][_0x41165f(0x2d2)](this);},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x698)]=function(){const _0x4d96e8=_0x32e60b;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x4d96e8(0x4c0)]==='Subtitle')return![];if(Scene_Title[_0x4d96e8(0x4ea)]==='')return![];if(Scene_Title['version']==='0.00')return![];return!![];},Scene_Boot[_0x32e60b(0x303)][_0x32e60b(0x1a8)]=function(){const _0x5a4418=_0x32e60b,_0x13b372=$dataSystem[_0x5a4418(0x8a1)],_0x580748=Scene_Title[_0x5a4418(0x4c0)]||'',_0x20aa88=Scene_Title[_0x5a4418(0x4ea)]||'',_0x34cc83=VisuMZ[_0x5a4418(0x565)][_0x5a4418(0x1e6)][_0x5a4418(0x31c)][_0x5a4418(0x51f)][_0x5a4418(0x2f3)],_0x52d368=_0x34cc83[_0x5a4418(0x42e)](_0x13b372,_0x580748,_0x20aa88);document[_0x5a4418(0x4c5)]=_0x52d368;},Scene_Boot['prototype'][_0x32e60b(0x403)]=function(){const _0x563adb=_0x32e60b;if(VisuMZ[_0x563adb(0x565)][_0x563adb(0x1e6)]['UI'][_0x563adb(0x7bb)]){const _0x1a57d6=Graphics[_0x563adb(0x36c)]-Graphics[_0x563adb(0x3a7)]-VisuMZ['CoreEngine'][_0x563adb(0x1e6)]['UI']['BoxMargin']*0x2,_0x9fbbc6=Sprite_Button[_0x563adb(0x303)][_0x563adb(0x610)][_0x563adb(0x2d2)](this)*0x4;if(_0x1a57d6>=_0x9fbbc6)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title[_0x32e60b(0x4c0)]=VisuMZ['CoreEngine'][_0x32e60b(0x1e6)]['MenuLayout'][_0x32e60b(0x51f)][_0x32e60b(0x5a4)],Scene_Title[_0x32e60b(0x4ea)]=VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x31c)][_0x32e60b(0x51f)][_0x32e60b(0x86c)],Scene_Title['pictureButtons']=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x6cc)],VisuMZ[_0x32e60b(0x565)]['Scene_Title_drawGameTitle']=Scene_Title[_0x32e60b(0x303)]['drawGameTitle'],Scene_Title['prototype'][_0x32e60b(0x567)]=function(){const _0x3bbcbb=_0x32e60b;VisuMZ['CoreEngine'][_0x3bbcbb(0x1e6)]['MenuLayout'][_0x3bbcbb(0x51f)][_0x3bbcbb(0x567)][_0x3bbcbb(0x2d2)](this);if(Scene_Title[_0x3bbcbb(0x4c0)]!==''&&Scene_Title[_0x3bbcbb(0x4c0)]!==_0x3bbcbb(0x5a4))this[_0x3bbcbb(0x10d)]();if(Scene_Title[_0x3bbcbb(0x4ea)]!==''&&Scene_Title['version']!=='0.00')this[_0x3bbcbb(0x41a)]();},Scene_Title['prototype'][_0x32e60b(0x10d)]=function(){const _0x106b12=_0x32e60b;VisuMZ['CoreEngine'][_0x106b12(0x1e6)][_0x106b12(0x31c)][_0x106b12(0x51f)][_0x106b12(0x10d)][_0x106b12(0x2d2)](this);},Scene_Title[_0x32e60b(0x303)][_0x32e60b(0x41a)]=function(){const _0x5a2d4a=_0x32e60b;VisuMZ[_0x5a2d4a(0x565)][_0x5a2d4a(0x1e6)][_0x5a2d4a(0x31c)][_0x5a2d4a(0x51f)]['drawGameVersion']['call'](this);},Scene_Title[_0x32e60b(0x303)][_0x32e60b(0x114)]=function(){const _0x3cf6ed=_0x32e60b;this[_0x3cf6ed(0x4ed)]();const _0x24f97d=$dataSystem['titleCommandWindow']['background'],_0x2ec593=this[_0x3cf6ed(0x407)]();this['_commandWindow']=new Window_TitleCommand(_0x2ec593),this['_commandWindow'][_0x3cf6ed(0x8ab)](_0x24f97d);const _0x51f79a=this[_0x3cf6ed(0x407)]();this[_0x3cf6ed(0x419)][_0x3cf6ed(0x632)](_0x51f79a['x'],_0x51f79a['y'],_0x51f79a[_0x3cf6ed(0x36c)],_0x51f79a[_0x3cf6ed(0x32b)]),this[_0x3cf6ed(0x419)][_0x3cf6ed(0x737)](),this[_0x3cf6ed(0x419)][_0x3cf6ed(0x3a5)](),this[_0x3cf6ed(0x419)][_0x3cf6ed(0x147)](),this[_0x3cf6ed(0x821)](this[_0x3cf6ed(0x419)]);},Scene_Title['prototype'][_0x32e60b(0x69e)]=function(){const _0x1d06cf=_0x32e60b;return this[_0x1d06cf(0x419)]?this[_0x1d06cf(0x419)][_0x1d06cf(0x3ae)]():VisuMZ['CoreEngine']['Settings'][_0x1d06cf(0x896)][_0x1d06cf(0x4e4)];},Scene_Title[_0x32e60b(0x303)][_0x32e60b(0x407)]=function(){const _0x2f92ee=_0x32e60b;return VisuMZ['CoreEngine'][_0x2f92ee(0x1e6)][_0x2f92ee(0x31c)][_0x2f92ee(0x51f)][_0x2f92ee(0x4da)][_0x2f92ee(0x2d2)](this);},Scene_Title[_0x32e60b(0x303)][_0x32e60b(0x4ed)]=function(){const _0x12c15c=_0x32e60b;for(const _0x539c76 of Scene_Title[_0x12c15c(0x13e)]){const _0x1a8df0=new Sprite_TitlePictureButton(_0x539c76);this[_0x12c15c(0x6b4)](_0x1a8df0);}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x667)]=Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x829)],Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(){const _0x32915f=_0x32e60b;VisuMZ[_0x32915f(0x565)][_0x32915f(0x667)][_0x32915f(0x2d2)](this),$gameTemp[_0x32915f(0x6d2)](),this[_0x32915f(0x4ae)]();},VisuMZ['CoreEngine'][_0x32e60b(0x7e3)]=Scene_Map[_0x32e60b(0x303)]['updateMainMultiply'],Scene_Map[_0x32e60b(0x303)]['updateMainMultiply']=function(){const _0x45428e=_0x32e60b;VisuMZ['CoreEngine'][_0x45428e(0x7e3)][_0x45428e(0x2d2)](this),$gameTemp['_playTestFastMode']&&!$gameMessage['isBusy']()&&(this[_0x45428e(0x5c7)](),SceneManager[_0x45428e(0x57e)]());},Scene_Map['prototype']['terminate']=function(){const _0x41d086=_0x32e60b;Scene_Message[_0x41d086(0x303)][_0x41d086(0x5fd)][_0x41d086(0x2d2)](this),!SceneManager[_0x41d086(0x333)](Scene_Battle)&&(this[_0x41d086(0x68e)]['update'](),this[_0x41d086(0x493)][_0x41d086(0x536)](),this['_windowLayer']['visible']=![],SceneManager['snapForBackground']()),$gameScreen[_0x41d086(0x25d)](),this[_0x41d086(0x4ae)]();},VisuMZ[_0x32e60b(0x565)]['Scene_Map_createMenuButton']=Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x1d5)],Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x1d5)]=function(){const _0x55504d=_0x32e60b;VisuMZ[_0x55504d(0x565)]['Scene_Map_createMenuButton'][_0x55504d(0x2d2)](this),SceneManager[_0x55504d(0x462)]()&&this[_0x55504d(0x300)]();},Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x300)]=function(){const _0x4b10f9=_0x32e60b;this[_0x4b10f9(0x488)]['x']=Graphics[_0x4b10f9(0x3a7)]+0x4;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1f3)]=Scene_Map['prototype']['updateScene'],Scene_Map[_0x32e60b(0x303)]['updateScene']=function(){const _0x153079=_0x32e60b;VisuMZ[_0x153079(0x565)]['Scene_Map_updateScene'][_0x153079(0x2d2)](this),this[_0x153079(0x833)]();},Scene_Map['prototype'][_0x32e60b(0x833)]=function(){const _0x55270e=_0x32e60b;Input[_0x55270e(0x4e7)](_0x55270e(0x4f5))&&(ConfigManager[_0x55270e(0x2f4)]=!ConfigManager[_0x55270e(0x2f4)],ConfigManager[_0x55270e(0x6c4)]());},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x8b3)]=Scene_Map[_0x32e60b(0x303)]['updateMain'],Scene_Map['prototype']['updateMain']=function(){const _0xe3eb3b=_0x32e60b;VisuMZ[_0xe3eb3b(0x565)][_0xe3eb3b(0x8b3)][_0xe3eb3b(0x2d2)](this),this[_0xe3eb3b(0x5df)]();},Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x4ae)]=function(){const _0x59cb63=_0x32e60b;this[_0x59cb63(0x4e3)]=[];},Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x5df)]=function(){const _0x2cc6c1=_0x32e60b;if(!this[_0x2cc6c1(0x4e3)])return;for(const _0x249886 of this['_onceParallelInterpreters']){_0x249886&&_0x249886[_0x2cc6c1(0x512)]();}},Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x237)]=function(_0xee0bd3,_0x9413db){const _0x5ee507=_0x32e60b,_0x19885b=$dataCommonEvents[_0xee0bd3];if(!_0x19885b)return;const _0x289945=new Game_OnceParallelInterpreter();this[_0x5ee507(0x25b)](_0x289945),_0x289945['setCommonEvent'](_0xee0bd3),_0x289945[_0x5ee507(0x7cf)](_0x9413db);},Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x25b)]=function(_0x5ec4a9){const _0x32da6b=_0x32e60b;this[_0x32da6b(0x4e3)]=this[_0x32da6b(0x4e3)]||[],this[_0x32da6b(0x4e3)][_0x32da6b(0x724)](_0x5ec4a9);},Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x1bd)]=function(_0x3496ff){const _0x6ec0f9=_0x32e60b;this[_0x6ec0f9(0x4e3)]=this[_0x6ec0f9(0x4e3)]||[],this[_0x6ec0f9(0x4e3)][_0x6ec0f9(0x8d3)](_0x3496ff);};function Game_OnceParallelInterpreter(){const _0x353966=_0x32e60b;this[_0x353966(0x829)](...arguments);}Game_OnceParallelInterpreter[_0x32e60b(0x303)]=Object[_0x32e60b(0x35f)](Game_Interpreter[_0x32e60b(0x303)]),Game_OnceParallelInterpreter[_0x32e60b(0x303)][_0x32e60b(0x13d)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x32e60b(0x303)][_0x32e60b(0x712)]=function(_0x46990b){const _0x1ab68f=_0x32e60b,_0x2606cd=$dataCommonEvents[_0x46990b];_0x2606cd?this['setup'](_0x2606cd[_0x1ab68f(0x4c6)],0x0):this[_0x1ab68f(0x5fd)]();},Game_OnceParallelInterpreter['prototype'][_0x32e60b(0x7cf)]=function(_0x585eb7){const _0x172fd4=_0x32e60b;this[_0x172fd4(0x754)]=_0x585eb7||0x0;},Game_OnceParallelInterpreter['prototype'][_0x32e60b(0x5fd)]=function(){const _0x34d9a9=_0x32e60b;if(!SceneManager['isSceneMap']())return;SceneManager['_scene'][_0x34d9a9(0x1bd)](this),Game_Interpreter[_0x34d9a9(0x303)][_0x34d9a9(0x5fd)]['call'](this);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x5c3)]=Scene_MenuBase['prototype']['helpAreaTop'],Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x5e0)]=function(){const _0x2cde3a=_0x32e60b;let _0x4e2e57=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x4e2e57=this['helpAreaTopSideButtonLayout']():_0x4e2e57=VisuMZ[_0x2cde3a(0x565)]['Scene_MenuBase_helpAreaTop'][_0x2cde3a(0x2d2)](this),_0x4e2e57;},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x2ee)]=function(){const _0x3b2892=_0x32e60b;return this['isBottomHelpMode']()?this[_0x3b2892(0x31b)]():0x0;},VisuMZ['CoreEngine'][_0x32e60b(0x503)]=Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x56e)],Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x56e)]=function(){const _0x290f93=_0x32e60b;return SceneManager['areButtonsOutsideMainUI']()?this[_0x290f93(0x18c)]():VisuMZ[_0x290f93(0x565)][_0x290f93(0x503)][_0x290f93(0x2d2)](this);},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x18c)]=function(){const _0xa9810a=_0x32e60b;if(!this[_0xa9810a(0x293)]())return this[_0xa9810a(0x2db)]();else return this['isMenuButtonAssistEnabled']()&&this[_0xa9810a(0x65c)]()===_0xa9810a(0x5bf)?Window_ButtonAssist['prototype'][_0xa9810a(0x823)]():0x0;},VisuMZ[_0x32e60b(0x565)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x519)],Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x519)]=function(){const _0x353e2a=_0x32e60b;let _0x475d12=0x0;return SceneManager[_0x353e2a(0x8b6)]()?_0x475d12=this['mainAreaHeightSideButtonLayout']():_0x475d12=VisuMZ[_0x353e2a(0x565)][_0x353e2a(0x3dc)][_0x353e2a(0x2d2)](this),this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!==_0x353e2a(0x6d0)&&(_0x475d12-=Window_ButtonAssist[_0x353e2a(0x303)][_0x353e2a(0x823)]()),_0x475d12;},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x89f)]=function(){const _0x262d49=_0x32e60b;return Graphics[_0x262d49(0x3ea)]-this[_0x262d49(0x664)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x7e5)]=Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x319)],Scene_MenuBase['prototype'][_0x32e60b(0x319)]=function(){const _0x1e548d=_0x32e60b,_0x2a3f3c=VisuMZ[_0x1e548d(0x565)][_0x1e548d(0x1e6)][_0x1e548d(0x370)][_0x1e548d(0x806)]??0x8;this[_0x1e548d(0x804)]=new PIXI[(_0x1e548d(0x84f))][(_0x1e548d(0x478))](_0x2a3f3c),this[_0x1e548d(0x6df)]=new Sprite(),this[_0x1e548d(0x6df)][_0x1e548d(0x568)]=SceneManager[_0x1e548d(0x2e3)](),this['_backgroundSprite'][_0x1e548d(0x84f)]=[this['_backgroundFilter']],this[_0x1e548d(0x6b4)](this[_0x1e548d(0x6df)]),this[_0x1e548d(0x1be)](0xc0),this[_0x1e548d(0x1be)](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x3a9)]=function(){const _0x15a9e9=_0x32e60b,_0x2de7cb=String(this['constructor'][_0x15a9e9(0x50d)]),_0x51e9a4=this[_0x15a9e9(0x424)](_0x2de7cb);return _0x51e9a4?_0x51e9a4[_0x15a9e9(0x321)]:0xc0;},Scene_MenuBase['prototype'][_0x32e60b(0x2aa)]=function(){const _0x1161f6=_0x32e60b,_0x13b7e8=String(this[_0x1161f6(0x13d)][_0x1161f6(0x50d)]),_0x33a885=this[_0x1161f6(0x424)](_0x13b7e8);_0x33a885&&(_0x33a885[_0x1161f6(0x7be)]!==''||_0x33a885[_0x1161f6(0x2c7)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x1161f6(0x459)](_0x33a885[_0x1161f6(0x7be)])),this[_0x1161f6(0x206)]=new Sprite(ImageManager[_0x1161f6(0x5ca)](_0x33a885[_0x1161f6(0x2c7)])),this[_0x1161f6(0x6b4)](this[_0x1161f6(0x73e)]),this[_0x1161f6(0x6b4)](this[_0x1161f6(0x206)]),this[_0x1161f6(0x73e)][_0x1161f6(0x568)]['addLoadListener'](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x1161f6(0x206)][_0x1161f6(0x568)][_0x1161f6(0x2c8)](this[_0x1161f6(0x120)]['bind'](this,this['_backSprite2'])));},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x424)]=function(_0x21280c){const _0x3914eb=_0x32e60b;return VisuMZ[_0x3914eb(0x565)]['Settings']['MenuBg'][_0x21280c]||VisuMZ[_0x3914eb(0x565)][_0x3914eb(0x1e6)][_0x3914eb(0x370)][_0x3914eb(0x763)];},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x120)]=function(_0x26fb00){const _0x186467=_0x32e60b;this[_0x186467(0x11c)](_0x26fb00),this[_0x186467(0x1c6)](_0x26fb00);},VisuMZ['CoreEngine'][_0x32e60b(0x34d)]=Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x298)],Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x298)]=function(){const _0x22217c=_0x32e60b;VisuMZ[_0x22217c(0x565)]['Scene_MenuBase_createCancelButton'][_0x22217c(0x2d2)](this),SceneManager[_0x22217c(0x462)]()&&this[_0x22217c(0x831)]();},Scene_MenuBase['prototype'][_0x32e60b(0x831)]=function(){const _0x41a5d2=_0x32e60b;this['_cancelButton']['x']=Graphics[_0x41a5d2(0x3a7)]+0x4;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x501)]=Scene_MenuBase['prototype'][_0x32e60b(0x729)],Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x729)]=function(){const _0x48b0ac=_0x32e60b;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']['call'](this),SceneManager[_0x48b0ac(0x462)]()&&this[_0x48b0ac(0x231)]();},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x231)]=function(){const _0x241f2e=_0x32e60b;this['_pageupButton']['x']=-0x1*(this[_0x241f2e(0x733)][_0x241f2e(0x36c)]+this[_0x241f2e(0x1fd)][_0x241f2e(0x36c)]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x32e60b(0x303)]['isMenuButtonAssistEnabled']=function(){const _0xb927c2=_0x32e60b;return VisuMZ[_0xb927c2(0x565)][_0xb927c2(0x1e6)][_0xb927c2(0x50c)][_0xb927c2(0x83d)];},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x65c)]=function(){const _0x41978b=_0x32e60b;return SceneManager['isSideButtonLayout']()||SceneManager[_0x41978b(0x14c)]()?VisuMZ[_0x41978b(0x565)][_0x41978b(0x1e6)][_0x41978b(0x50c)]['Location']:_0x41978b(0x6d0);},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x71b)]=function(){const _0x561bad=_0x32e60b;if(!this[_0x561bad(0x538)]())return;const _0x42ea56=this['buttonAssistWindowRect']();this[_0x561bad(0x447)]=new Window_ButtonAssist(_0x42ea56),this['addWindow'](this[_0x561bad(0x447)]);},Scene_MenuBase['prototype'][_0x32e60b(0x118)]=function(){const _0xa4ee4e=_0x32e60b;return this[_0xa4ee4e(0x65c)]()===_0xa4ee4e(0x6d0)?this[_0xa4ee4e(0x47b)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x32e60b(0x303)]['buttonAssistWindowButtonRect']=function(){const _0x55459b=_0x32e60b,_0x1b4cda=ConfigManager['touchUI']?(Sprite_Button[_0x55459b(0x303)][_0x55459b(0x610)]()+0x6)*0x2:0x0,_0x48cb0b=this[_0x55459b(0x7ca)](),_0x536629=Graphics[_0x55459b(0x3a7)]-_0x1b4cda*0x2,_0x380178=this[_0x55459b(0x281)]();return new Rectangle(_0x1b4cda,_0x48cb0b,_0x536629,_0x380178);},Scene_MenuBase[_0x32e60b(0x303)][_0x32e60b(0x4b0)]=function(){const _0x4abf00=_0x32e60b,_0x37f8ff=Graphics[_0x4abf00(0x3a7)],_0x42fd6d=Window_ButtonAssist[_0x4abf00(0x303)][_0x4abf00(0x823)](),_0x415a88=0x0;let _0x28860f=0x0;return this[_0x4abf00(0x65c)]()===_0x4abf00(0x5bf)?_0x28860f=0x0:_0x28860f=Graphics['boxHeight']-_0x42fd6d,new Rectangle(_0x415a88,_0x28860f,_0x37f8ff,_0x42fd6d);},Scene_Menu['layoutSettings']=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)]['MenuLayout']['MainMenu'],VisuMZ['CoreEngine']['Scene_Menu_create']=Scene_Menu[_0x32e60b(0x303)][_0x32e60b(0x35f)],Scene_Menu[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x2181ba=_0x32e60b;VisuMZ[_0x2181ba(0x565)][_0x2181ba(0x5e7)][_0x2181ba(0x2d2)](this),this[_0x2181ba(0x707)]();},Scene_Menu[_0x32e60b(0x303)][_0x32e60b(0x707)]=function(){const _0x163aaf=_0x32e60b;this[_0x163aaf(0x419)]&&this[_0x163aaf(0x419)][_0x163aaf(0x8ab)](Scene_Menu['layoutSettings'][_0x163aaf(0x777)]),this[_0x163aaf(0x200)]&&this[_0x163aaf(0x200)][_0x163aaf(0x8ab)](Scene_Menu['layoutSettings'][_0x163aaf(0x411)]),this[_0x163aaf(0x2a6)]&&this[_0x163aaf(0x2a6)][_0x163aaf(0x8ab)](Scene_Menu[_0x163aaf(0x7da)][_0x163aaf(0x3ce)]);},Scene_Menu[_0x32e60b(0x303)][_0x32e60b(0x407)]=function(){const _0x51d1f4=_0x32e60b;return Scene_Menu['layoutSettings'][_0x51d1f4(0x4da)][_0x51d1f4(0x2d2)](this);},Scene_Menu['prototype']['goldWindowRect']=function(){const _0x1e4cdf=_0x32e60b;return Scene_Menu[_0x1e4cdf(0x7da)][_0x1e4cdf(0x6af)][_0x1e4cdf(0x2d2)](this);},Scene_Menu['prototype'][_0x32e60b(0x44b)]=function(){const _0x446f34=_0x32e60b;return Scene_Menu[_0x446f34(0x7da)][_0x446f34(0x60d)][_0x446f34(0x2d2)](this);},Scene_Item[_0x32e60b(0x7da)]=VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x31c)][_0x32e60b(0x239)],VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x285)]=Scene_Item[_0x32e60b(0x303)]['create'],Scene_Item[_0x32e60b(0x303)]['create']=function(){const _0x57d69a=_0x32e60b;VisuMZ[_0x57d69a(0x565)]['Scene_Item_create']['call'](this),this[_0x57d69a(0x707)]();},Scene_Item[_0x32e60b(0x303)]['setCoreEngineUpdateWindowBg']=function(){const _0x26259f=_0x32e60b;this[_0x26259f(0x16a)]&&this[_0x26259f(0x16a)][_0x26259f(0x8ab)](Scene_Item[_0x26259f(0x7da)][_0x26259f(0x4f1)]),this['_categoryWindow']&&this[_0x26259f(0x7cc)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x26259f(0x454)]),this[_0x26259f(0x30a)]&&this[_0x26259f(0x30a)][_0x26259f(0x8ab)](Scene_Item[_0x26259f(0x7da)][_0x26259f(0x242)]),this[_0x26259f(0x15b)]&&this[_0x26259f(0x15b)]['setBackgroundType'](Scene_Item[_0x26259f(0x7da)][_0x26259f(0x2b7)]);},Scene_Item['prototype'][_0x32e60b(0x76c)]=function(){const _0xe81fbe=_0x32e60b;return Scene_Item[_0xe81fbe(0x7da)][_0xe81fbe(0x40c)]['call'](this);},Scene_Item['prototype'][_0x32e60b(0x6ec)]=function(){const _0xa443b6=_0x32e60b;return Scene_Item['layoutSettings'][_0xa443b6(0x8d6)][_0xa443b6(0x2d2)](this);},Scene_Item['prototype'][_0x32e60b(0x585)]=function(){const _0x32b882=_0x32e60b;return Scene_Item[_0x32b882(0x7da)][_0x32b882(0x215)]['call'](this);},Scene_Item[_0x32e60b(0x303)][_0x32e60b(0x87e)]=function(){const _0x194923=_0x32e60b;return Scene_Item['layoutSettings'][_0x194923(0x874)][_0x194923(0x2d2)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x31c)][_0x32e60b(0x325)],VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x64d)]=Scene_Skill['prototype'][_0x32e60b(0x35f)],Scene_Skill[_0x32e60b(0x303)]['create']=function(){const _0x59a311=_0x32e60b;VisuMZ[_0x59a311(0x565)][_0x59a311(0x64d)][_0x59a311(0x2d2)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x32e60b(0x303)]['setCoreEngineUpdateWindowBg']=function(){const _0x2af407=_0x32e60b;this[_0x2af407(0x16a)]&&this[_0x2af407(0x16a)][_0x2af407(0x8ab)](Scene_Skill['layoutSettings'][_0x2af407(0x4f1)]),this[_0x2af407(0x323)]&&this['_skillTypeWindow'][_0x2af407(0x8ab)](Scene_Skill[_0x2af407(0x7da)][_0x2af407(0x855)]),this[_0x2af407(0x2a6)]&&this[_0x2af407(0x2a6)][_0x2af407(0x8ab)](Scene_Skill[_0x2af407(0x7da)][_0x2af407(0x3ce)]),this[_0x2af407(0x30a)]&&this[_0x2af407(0x30a)][_0x2af407(0x8ab)](Scene_Skill[_0x2af407(0x7da)]['ItemBgType']),this[_0x2af407(0x15b)]&&this['_actorWindow'][_0x2af407(0x8ab)](Scene_Skill['layoutSettings'][_0x2af407(0x2b7)]);},Scene_Skill[_0x32e60b(0x303)][_0x32e60b(0x76c)]=function(){const _0x4bca6b=_0x32e60b;return Scene_Skill[_0x4bca6b(0x7da)]['HelpRect'][_0x4bca6b(0x2d2)](this);},Scene_Skill[_0x32e60b(0x303)][_0x32e60b(0x70d)]=function(){const _0x1fcfe9=_0x32e60b;return Scene_Skill[_0x1fcfe9(0x7da)][_0x1fcfe9(0x615)][_0x1fcfe9(0x2d2)](this);},Scene_Skill[_0x32e60b(0x303)][_0x32e60b(0x44b)]=function(){const _0x553b41=_0x32e60b;return Scene_Skill[_0x553b41(0x7da)][_0x553b41(0x60d)][_0x553b41(0x2d2)](this);},Scene_Skill[_0x32e60b(0x303)]['itemWindowRect']=function(){const _0x1e3a3b=_0x32e60b;return Scene_Skill['layoutSettings'][_0x1e3a3b(0x215)][_0x1e3a3b(0x2d2)](this);},Scene_Skill[_0x32e60b(0x303)][_0x32e60b(0x87e)]=function(){const _0x3689b2=_0x32e60b;return Scene_Skill[_0x3689b2(0x7da)][_0x3689b2(0x874)][_0x3689b2(0x2d2)](this);},Scene_Equip[_0x32e60b(0x7da)]=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)]['MenuLayout']['EquipMenu'],VisuMZ['CoreEngine']['Scene_Equip_create']=Scene_Equip[_0x32e60b(0x303)]['create'],Scene_Equip[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x4b9b77=_0x32e60b;VisuMZ[_0x4b9b77(0x565)]['Scene_Equip_create'][_0x4b9b77(0x2d2)](this),this[_0x4b9b77(0x707)]();},Scene_Equip[_0x32e60b(0x303)]['setCoreEngineUpdateWindowBg']=function(){const _0x17237c=_0x32e60b;this[_0x17237c(0x16a)]&&this['_helpWindow'][_0x17237c(0x8ab)](Scene_Equip[_0x17237c(0x7da)]['HelpBgType']),this[_0x17237c(0x2a6)]&&this['_statusWindow'][_0x17237c(0x8ab)](Scene_Equip[_0x17237c(0x7da)]['StatusBgType']),this[_0x17237c(0x419)]&&this[_0x17237c(0x419)][_0x17237c(0x8ab)](Scene_Equip['layoutSettings']['CommandBgType']),this[_0x17237c(0x1e3)]&&this[_0x17237c(0x1e3)]['setBackgroundType'](Scene_Equip['layoutSettings']['SlotBgType']),this[_0x17237c(0x30a)]&&this[_0x17237c(0x30a)][_0x17237c(0x8ab)](Scene_Equip[_0x17237c(0x7da)]['ItemBgType']);},Scene_Equip[_0x32e60b(0x303)][_0x32e60b(0x76c)]=function(){const _0x3c782e=_0x32e60b;return Scene_Equip[_0x3c782e(0x7da)][_0x3c782e(0x40c)][_0x3c782e(0x2d2)](this);},Scene_Equip[_0x32e60b(0x303)]['statusWindowRect']=function(){const _0x5cfaf3=_0x32e60b;return Scene_Equip[_0x5cfaf3(0x7da)]['StatusRect'][_0x5cfaf3(0x2d2)](this);},Scene_Equip[_0x32e60b(0x303)][_0x32e60b(0x407)]=function(){const _0x19247f=_0x32e60b;return Scene_Equip[_0x19247f(0x7da)][_0x19247f(0x4da)][_0x19247f(0x2d2)](this);},Scene_Equip[_0x32e60b(0x303)][_0x32e60b(0x692)]=function(){const _0x5211c2=_0x32e60b;return Scene_Equip[_0x5211c2(0x7da)]['SlotRect'][_0x5211c2(0x2d2)](this);},Scene_Equip[_0x32e60b(0x303)][_0x32e60b(0x585)]=function(){const _0x4069b1=_0x32e60b;return Scene_Equip[_0x4069b1(0x7da)][_0x4069b1(0x215)][_0x4069b1(0x2d2)](this);},Scene_Status[_0x32e60b(0x7da)]=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)]['MenuLayout'][_0x32e60b(0x758)],VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x46f)]=Scene_Status[_0x32e60b(0x303)][_0x32e60b(0x35f)],Scene_Status[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x26cc99=_0x32e60b;VisuMZ[_0x26cc99(0x565)][_0x26cc99(0x46f)][_0x26cc99(0x2d2)](this),this[_0x26cc99(0x707)]();},Scene_Status[_0x32e60b(0x303)][_0x32e60b(0x707)]=function(){const _0xc4b860=_0x32e60b;this[_0xc4b860(0x121)]&&this[_0xc4b860(0x121)][_0xc4b860(0x8ab)](Scene_Status[_0xc4b860(0x7da)][_0xc4b860(0x449)]),this['_statusWindow']&&this[_0xc4b860(0x2a6)][_0xc4b860(0x8ab)](Scene_Status[_0xc4b860(0x7da)][_0xc4b860(0x3ce)]),this['_statusParamsWindow']&&this['_statusParamsWindow'][_0xc4b860(0x8ab)](Scene_Status[_0xc4b860(0x7da)][_0xc4b860(0x42f)]),this[_0xc4b860(0x791)]&&this[_0xc4b860(0x791)][_0xc4b860(0x8ab)](Scene_Status[_0xc4b860(0x7da)][_0xc4b860(0x649)]);},Scene_Status[_0x32e60b(0x303)][_0x32e60b(0x1e9)]=function(){const _0x18ecc4=_0x32e60b;return Scene_Status[_0x18ecc4(0x7da)][_0x18ecc4(0x3b3)][_0x18ecc4(0x2d2)](this);},Scene_Status[_0x32e60b(0x303)]['statusWindowRect']=function(){const _0x27701a=_0x32e60b;return Scene_Status[_0x27701a(0x7da)]['StatusRect'][_0x27701a(0x2d2)](this);},Scene_Status[_0x32e60b(0x303)][_0x32e60b(0x3f6)]=function(){const _0x299191=_0x32e60b;return Scene_Status[_0x299191(0x7da)]['StatusParamsRect'][_0x299191(0x2d2)](this);},Scene_Status['prototype'][_0x32e60b(0x214)]=function(){const _0x50ad04=_0x32e60b;return Scene_Status[_0x50ad04(0x7da)]['StatusEquipRect']['call'](this);},Scene_Options[_0x32e60b(0x7da)]=VisuMZ['CoreEngine'][_0x32e60b(0x1e6)][_0x32e60b(0x31c)][_0x32e60b(0x58f)],VisuMZ['CoreEngine'][_0x32e60b(0x693)]=Scene_Options['prototype'][_0x32e60b(0x35f)],Scene_Options[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x155e97=_0x32e60b;VisuMZ['CoreEngine'][_0x155e97(0x693)][_0x155e97(0x2d2)](this),this[_0x155e97(0x707)]();},Scene_Options[_0x32e60b(0x303)][_0x32e60b(0x707)]=function(){const _0x224221=_0x32e60b;this[_0x224221(0x21f)]&&this[_0x224221(0x21f)][_0x224221(0x8ab)](Scene_Options['layoutSettings'][_0x224221(0x678)]);},Scene_Options[_0x32e60b(0x303)][_0x32e60b(0x747)]=function(){const _0x4caa73=_0x32e60b;return Scene_Options[_0x4caa73(0x7da)]['OptionsRect'][_0x4caa73(0x2d2)](this);},Scene_Save[_0x32e60b(0x7da)]=VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x31c)]['SaveMenu'],Scene_Save[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x49efaa=_0x32e60b;Scene_File[_0x49efaa(0x303)][_0x49efaa(0x35f)][_0x49efaa(0x2d2)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x32e60b(0x303)][_0x32e60b(0x707)]=function(){const _0x367d80=_0x32e60b;this['_helpWindow']&&this[_0x367d80(0x16a)]['setBackgroundType'](Scene_Save[_0x367d80(0x7da)][_0x367d80(0x4f1)]),this['_listWindow']&&this['_listWindow'][_0x367d80(0x8ab)](Scene_Save['layoutSettings'][_0x367d80(0x31a)]);},Scene_Save[_0x32e60b(0x303)][_0x32e60b(0x76c)]=function(){const _0x224b80=_0x32e60b;return Scene_Save['layoutSettings'][_0x224b80(0x40c)][_0x224b80(0x2d2)](this);},Scene_Save[_0x32e60b(0x303)][_0x32e60b(0x2af)]=function(){const _0x111f8b=_0x32e60b;return Scene_Save['layoutSettings'][_0x111f8b(0x6a9)][_0x111f8b(0x2d2)](this);},Scene_Load[_0x32e60b(0x7da)]=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x31c)]['LoadMenu'],Scene_Load[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x28582b=_0x32e60b;Scene_File['prototype'][_0x28582b(0x35f)][_0x28582b(0x2d2)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x32e60b(0x303)]['setCoreEngineUpdateWindowBg']=function(){const _0x1b7f99=_0x32e60b;this['_helpWindow']&&this[_0x1b7f99(0x16a)][_0x1b7f99(0x8ab)](Scene_Load[_0x1b7f99(0x7da)][_0x1b7f99(0x4f1)]),this[_0x1b7f99(0x47d)]&&this['_listWindow'][_0x1b7f99(0x8ab)](Scene_Load[_0x1b7f99(0x7da)][_0x1b7f99(0x31a)]);},Scene_Load[_0x32e60b(0x303)][_0x32e60b(0x76c)]=function(){const _0x23ea81=_0x32e60b;return Scene_Load[_0x23ea81(0x7da)][_0x23ea81(0x40c)][_0x23ea81(0x2d2)](this);},Scene_Load[_0x32e60b(0x303)][_0x32e60b(0x2af)]=function(){const _0x28b5d7=_0x32e60b;return Scene_Load[_0x28b5d7(0x7da)]['ListRect'][_0x28b5d7(0x2d2)](this);};function Scene_QuickLoad(){const _0x3c8c7b=_0x32e60b;this[_0x3c8c7b(0x829)](...arguments);}Scene_QuickLoad[_0x32e60b(0x303)]=Object[_0x32e60b(0x35f)](Scene_Load['prototype']),Scene_QuickLoad[_0x32e60b(0x303)][_0x32e60b(0x13d)]=Scene_QuickLoad,Scene_QuickLoad[_0x32e60b(0x303)]['initialize']=function(){const _0x32be48=_0x32e60b;Scene_Load[_0x32be48(0x303)][_0x32be48(0x829)]['call'](this);},Scene_QuickLoad['prototype'][_0x32e60b(0x35f)]=function(){const _0x34bdd9=_0x32e60b;this[_0x34bdd9(0x5c8)](this[_0x34bdd9(0x32e)]);},Scene_QuickLoad[_0x32e60b(0x303)][_0x32e60b(0x5b7)]=function(_0x5bc8c2){const _0x9679ad=_0x32e60b;this[_0x9679ad(0x32e)]=_0x5bc8c2;},Scene_QuickLoad[_0x32e60b(0x303)][_0x32e60b(0x1cb)]=function(){const _0x153dce=_0x32e60b;Scene_MenuBase['prototype']['start'][_0x153dce(0x2d2)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)]['MenuLayout'][_0x32e60b(0x769)],VisuMZ[_0x32e60b(0x565)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x32e60b(0x303)][_0x32e60b(0x319)],Scene_GameEnd[_0x32e60b(0x303)]['createBackground']=function(){const _0x18e652=_0x32e60b;Scene_MenuBase[_0x18e652(0x303)][_0x18e652(0x319)][_0x18e652(0x2d2)](this);},Scene_GameEnd[_0x32e60b(0x303)][_0x32e60b(0x114)]=function(){const _0x3d6a8f=_0x32e60b,_0x6296=this['commandWindowRect']();this[_0x3d6a8f(0x419)]=new Window_GameEnd(_0x6296),this[_0x3d6a8f(0x419)][_0x3d6a8f(0x749)]('cancel',this[_0x3d6a8f(0x603)]['bind'](this)),this['addWindow'](this[_0x3d6a8f(0x419)]),this[_0x3d6a8f(0x419)][_0x3d6a8f(0x8ab)](Scene_GameEnd[_0x3d6a8f(0x7da)]['CommandBgType']);},Scene_GameEnd[_0x32e60b(0x303)]['commandWindowRect']=function(){const _0x42a853=_0x32e60b;return Scene_GameEnd[_0x42a853(0x7da)][_0x42a853(0x4da)]['call'](this);},Scene_Shop[_0x32e60b(0x7da)]=VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x31c)]['ShopMenu'],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop[_0x32e60b(0x303)][_0x32e60b(0x35f)],Scene_Shop[_0x32e60b(0x303)][_0x32e60b(0x35f)]=function(){const _0x270fbc=_0x32e60b;VisuMZ[_0x270fbc(0x565)][_0x270fbc(0x275)][_0x270fbc(0x2d2)](this),this[_0x270fbc(0x707)]();},Scene_Shop[_0x32e60b(0x303)]['setCoreEngineUpdateWindowBg']=function(){const _0x842dcd=_0x32e60b;this[_0x842dcd(0x16a)]&&this['_helpWindow'][_0x842dcd(0x8ab)](Scene_Shop[_0x842dcd(0x7da)][_0x842dcd(0x4f1)]),this[_0x842dcd(0x200)]&&this[_0x842dcd(0x200)]['setBackgroundType'](Scene_Shop[_0x842dcd(0x7da)][_0x842dcd(0x411)]),this['_commandWindow']&&this['_commandWindow'][_0x842dcd(0x8ab)](Scene_Shop[_0x842dcd(0x7da)]['CommandBgType']),this[_0x842dcd(0x1a2)]&&this[_0x842dcd(0x1a2)][_0x842dcd(0x8ab)](Scene_Shop['layoutSettings']['DummyBgType']),this['_numberWindow']&&this[_0x842dcd(0x89a)][_0x842dcd(0x8ab)](Scene_Shop[_0x842dcd(0x7da)][_0x842dcd(0x599)]),this[_0x842dcd(0x2a6)]&&this[_0x842dcd(0x2a6)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x842dcd(0x3ce)]),this[_0x842dcd(0x2ef)]&&this[_0x842dcd(0x2ef)][_0x842dcd(0x8ab)](Scene_Shop['layoutSettings']['BuyBgType']),this[_0x842dcd(0x7cc)]&&this[_0x842dcd(0x7cc)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x842dcd(0x454)]),this['_sellWindow']&&this['_sellWindow'][_0x842dcd(0x8ab)](Scene_Shop[_0x842dcd(0x7da)][_0x842dcd(0x3db)]);},Scene_Shop[_0x32e60b(0x303)][_0x32e60b(0x76c)]=function(){const _0x2a3f20=_0x32e60b;return Scene_Shop[_0x2a3f20(0x7da)][_0x2a3f20(0x40c)][_0x2a3f20(0x2d2)](this);},Scene_Shop['prototype'][_0x32e60b(0x18d)]=function(){const _0x38fe1d=_0x32e60b;return Scene_Shop['layoutSettings'][_0x38fe1d(0x6af)][_0x38fe1d(0x2d2)](this);},Scene_Shop[_0x32e60b(0x303)][_0x32e60b(0x407)]=function(){const _0x70151d=_0x32e60b;return Scene_Shop['layoutSettings'][_0x70151d(0x4da)][_0x70151d(0x2d2)](this);},Scene_Shop[_0x32e60b(0x303)][_0x32e60b(0x8c9)]=function(){const _0x13dc1a=_0x32e60b;return Scene_Shop[_0x13dc1a(0x7da)][_0x13dc1a(0x662)][_0x13dc1a(0x2d2)](this);},Scene_Shop[_0x32e60b(0x303)]['numberWindowRect']=function(){const _0x2e2e95=_0x32e60b;return Scene_Shop[_0x2e2e95(0x7da)][_0x2e2e95(0x32a)]['call'](this);},Scene_Shop[_0x32e60b(0x303)][_0x32e60b(0x44b)]=function(){const _0x4fa491=_0x32e60b;return Scene_Shop[_0x4fa491(0x7da)][_0x4fa491(0x60d)]['call'](this);},Scene_Shop['prototype'][_0x32e60b(0x510)]=function(){const _0x3da992=_0x32e60b;return Scene_Shop['layoutSettings']['BuyRect'][_0x3da992(0x2d2)](this);},Scene_Shop['prototype']['categoryWindowRect']=function(){const _0x1fafe8=_0x32e60b;return Scene_Shop[_0x1fafe8(0x7da)][_0x1fafe8(0x8d6)][_0x1fafe8(0x2d2)](this);},Scene_Shop[_0x32e60b(0x303)]['sellWindowRect']=function(){const _0xc736c7=_0x32e60b;return Scene_Shop['layoutSettings'][_0xc736c7(0x28b)][_0xc736c7(0x2d2)](this);},Scene_Name[_0x32e60b(0x7da)]=VisuMZ['CoreEngine'][_0x32e60b(0x1e6)][_0x32e60b(0x31c)][_0x32e60b(0x39e)],VisuMZ['CoreEngine']['Scene_Name_create']=Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x35f)],Scene_Name['prototype'][_0x32e60b(0x35f)]=function(){const _0x112909=_0x32e60b;VisuMZ['CoreEngine']['Scene_Name_create'][_0x112909(0x2d2)](this),this[_0x112909(0x707)]();},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x707)]=function(){const _0x453f9b=_0x32e60b;this[_0x453f9b(0x6b8)]&&this['_editWindow']['setBackgroundType'](Scene_Name[_0x453f9b(0x7da)][_0x453f9b(0x486)]),this[_0x453f9b(0x1f0)]&&this['_inputWindow'][_0x453f9b(0x8ab)](Scene_Name[_0x453f9b(0x7da)]['InputBgType']);},Scene_Name[_0x32e60b(0x303)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x32e60b(0x303)]['editWindowRect']=function(){const _0x54082f=_0x32e60b;return Scene_Name[_0x54082f(0x7da)][_0x54082f(0x1a1)][_0x54082f(0x2d2)](this);},Scene_Name['prototype'][_0x32e60b(0x26f)]=function(){const _0x1bdbe4=_0x32e60b;return Scene_Name[_0x1bdbe4(0x7da)]['InputRect'][_0x1bdbe4(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x4f2)]=function(){const _0x2eaa3d=_0x32e60b;if(!this['_inputWindow'])return![];return VisuMZ['CoreEngine'][_0x2eaa3d(0x1e6)][_0x2eaa3d(0x339)]['EnableNameInput'];},Scene_Name['prototype'][_0x32e60b(0x484)]=function(){const _0x5e006e=_0x32e60b;if(this[_0x5e006e(0x4f2)]()&&this[_0x5e006e(0x1f0)][_0x5e006e(0x452)]!==_0x5e006e(0x8b5))return TextManager['getInputMultiButtonStrings']('pageup',_0x5e006e(0x723));return Scene_MenuBase[_0x5e006e(0x303)][_0x5e006e(0x484)][_0x5e006e(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x428)]=function(){const _0x55a909=_0x32e60b;return this['EnableNameInput']()?TextManager[_0x55a909(0x6f7)]('tab'):Scene_MenuBase[_0x55a909(0x303)][_0x55a909(0x428)][_0x55a909(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x834)]=function(){const _0x5401c8=_0x32e60b;if(this[_0x5401c8(0x4f2)]()&&this[_0x5401c8(0x1f0)][_0x5401c8(0x452)]===_0x5401c8(0x8b5))return TextManager[_0x5401c8(0x3af)]([_0x5401c8(0x320)]);return Scene_MenuBase['prototype']['buttonAssistKey4']['call'](this);},Scene_Name[_0x32e60b(0x303)]['buttonAssistKey5']=function(){const _0x25d076=_0x32e60b;if(this[_0x25d076(0x4f2)]()&&this['_inputWindow']['_mode']===_0x25d076(0x8b5))return TextManager[_0x25d076(0x3af)]([_0x25d076(0x808)]);return Scene_MenuBase['prototype']['buttonAssistKey5'][_0x25d076(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)]['buttonAssistText1']=function(){const _0x1e3b84=_0x32e60b;if(this[_0x1e3b84(0x4f2)]()&&this[_0x1e3b84(0x1f0)][_0x1e3b84(0x452)]!=='keyboard'){const _0x52a6b9=VisuMZ[_0x1e3b84(0x565)][_0x1e3b84(0x1e6)][_0x1e3b84(0x339)];return _0x52a6b9['PageChange']||'Page';}return Scene_MenuBase[_0x1e3b84(0x303)][_0x1e3b84(0x5d8)][_0x1e3b84(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x6b5)]=function(){const _0x5bca1c=_0x32e60b;if(this[_0x5bca1c(0x4f2)]()){const _0x4532bb=VisuMZ[_0x5bca1c(0x565)][_0x5bca1c(0x1e6)]['KeyboardInput'];return this[_0x5bca1c(0x1f0)][_0x5bca1c(0x452)]===_0x5bca1c(0x8b5)?_0x4532bb[_0x5bca1c(0x51a)]||_0x5bca1c(0x51a):_0x4532bb[_0x5bca1c(0x396)]||_0x5bca1c(0x396);}else return Scene_MenuBase[_0x5bca1c(0x303)][_0x5bca1c(0x6b5)][_0x5bca1c(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x1f4)]=function(){const _0x1ad819=_0x32e60b;if(this[_0x1ad819(0x4f2)]()){const _0x110fde=VisuMZ[_0x1ad819(0x565)]['Settings'][_0x1ad819(0x339)];if(this[_0x1ad819(0x1f0)][_0x1ad819(0x452)]===_0x1ad819(0x8b5))return _0x110fde[_0x1ad819(0x8b9)]||'Finish';}return Scene_MenuBase[_0x1ad819(0x303)][_0x1ad819(0x1f4)][_0x1ad819(0x2d2)](this);},VisuMZ['CoreEngine'][_0x32e60b(0x8d4)]=Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x415)],Scene_Name['prototype']['onInputOk']=function(){const _0x93eb91=_0x32e60b;this['doesNameContainBannedWords']()?this[_0x93eb91(0x7d4)]():VisuMZ[_0x93eb91(0x565)][_0x93eb91(0x8d4)][_0x93eb91(0x2d2)](this);},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x4e5)]=function(){const _0xd6345a=_0x32e60b,_0x176179=VisuMZ[_0xd6345a(0x565)][_0xd6345a(0x1e6)][_0xd6345a(0x339)];if(!_0x176179)return![];const _0x423619=_0x176179['BannedWords'];if(!_0x423619)return![];const _0x4e5b69=this[_0xd6345a(0x6b8)]['name']()['toLowerCase']();for(const _0x4c062d of _0x423619){if(_0x4e5b69[_0xd6345a(0x7b0)](_0x4c062d[_0xd6345a(0x7d9)]()))return!![];}return![];},Scene_Name[_0x32e60b(0x303)][_0x32e60b(0x7d4)]=function(){const _0x23a2d4=_0x32e60b;SoundManager[_0x23a2d4(0x441)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3f5)]=Scene_Battle[_0x32e60b(0x303)][_0x32e60b(0x512)],Scene_Battle[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x187c0a=_0x32e60b;VisuMZ['CoreEngine'][_0x187c0a(0x3f5)]['call'](this);if($gameTemp[_0x187c0a(0x1f6)])this['updatePlayTestF7']();},Scene_Battle[_0x32e60b(0x303)]['updatePlayTestF7']=function(){const _0xb23ef6=_0x32e60b;!BattleManager[_0xb23ef6(0x554)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0xb23ef6(0x16f)]()&&(this[_0xb23ef6(0x12a)]=!![],this[_0xb23ef6(0x512)](),SceneManager[_0xb23ef6(0x57e)](),this[_0xb23ef6(0x12a)]=![]);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3fe)]=Scene_Battle[_0x32e60b(0x303)][_0x32e60b(0x298)],Scene_Battle['prototype'][_0x32e60b(0x298)]=function(){const _0x1b387b=_0x32e60b;VisuMZ[_0x1b387b(0x565)]['Scene_Battle_createCancelButton'][_0x1b387b(0x2d2)](this),SceneManager['isSideButtonLayout']()&&this[_0x1b387b(0x6b9)]();},Scene_Battle[_0x32e60b(0x303)]['repositionCancelButtonSideButtonLayout']=function(){const _0x30022f=_0x32e60b;this['_cancelButton']['x']=Graphics[_0x30022f(0x3a7)]+0x4,this['isBottomButtonMode']()?this[_0x30022f(0x33e)]['y']=Graphics[_0x30022f(0x3ea)]-this[_0x30022f(0x281)]():this[_0x30022f(0x33e)]['y']=0x0;},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x32e60b(0x303)]['initialize'],Sprite_Button[_0x32e60b(0x303)]['initialize']=function(_0x561ea9){const _0x11cd90=_0x32e60b;VisuMZ[_0x11cd90(0x565)]['Sprite_Button_initialize']['call'](this,_0x561ea9),this[_0x11cd90(0x212)]();},Sprite_Button[_0x32e60b(0x303)][_0x32e60b(0x212)]=function(){const _0x50df5e=_0x32e60b,_0x5c3fa0=VisuMZ['CoreEngine']['Settings']['UI'];this['_isButtonHidden']=![];switch(this['_buttonType']){case _0x50df5e(0x679):this['_isButtonHidden']=!_0x5c3fa0[_0x50df5e(0x513)];break;case _0x50df5e(0x702):case'pagedown':this[_0x50df5e(0x241)]=!_0x5c3fa0['pagedownShowButton'];break;case _0x50df5e(0x7dc):case'up':case _0x50df5e(0x3b0):case _0x50df5e(0x272):case'ok':this['_isButtonHidden']=!_0x5c3fa0[_0x50df5e(0x77e)];break;case _0x50df5e(0x175):this[_0x50df5e(0x241)]=!_0x5c3fa0[_0x50df5e(0x53f)];break;}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x442)]=Sprite_Button[_0x32e60b(0x303)]['updateOpacity'],Sprite_Button[_0x32e60b(0x303)][_0x32e60b(0x78d)]=function(){const _0x3fe45a=_0x32e60b;SceneManager['areButtonsHidden']()||this[_0x3fe45a(0x241)]?this['hideButtonFromView']():VisuMZ['CoreEngine']['Sprite_Button_updateOpacity'][_0x3fe45a(0x2d2)](this);},Sprite_Button[_0x32e60b(0x303)][_0x32e60b(0x4f6)]=function(){const _0xc00076=_0x32e60b;this[_0xc00076(0x270)]=![],this['opacity']=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0xc00076(0x32b)]*0xa;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x7b4)]=Sprite_Battler[_0x32e60b(0x303)][_0x32e60b(0x556)],Sprite_Battler[_0x32e60b(0x303)]['startMove']=function(_0xc38d09,_0x19c9c8,_0x2d9a97){const _0x113d02=_0x32e60b;(this[_0x113d02(0x349)]!==_0xc38d09||this[_0x113d02(0x34e)]!==_0x19c9c8)&&(this[_0x113d02(0x1d0)](_0x113d02(0x6f0)),this['_movementWholeDuration']=_0x2d9a97),VisuMZ['CoreEngine'][_0x113d02(0x7b4)][_0x113d02(0x2d2)](this,_0xc38d09,_0x19c9c8,_0x2d9a97);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x31c2cd){this['_moveEasingType']=_0x31c2cd;},Sprite_Battler[_0x32e60b(0x303)][_0x32e60b(0x714)]=function(){const _0x5d3a7d=_0x32e60b;if(this[_0x5d3a7d(0x6a8)]<=0x0)return;const _0x1117da=this[_0x5d3a7d(0x6a8)],_0xea08f=this['_movementWholeDuration'],_0x2e6e96=this['_moveEasingType'];this['_offsetX']=this['applyEasing'](this[_0x5d3a7d(0x1cf)],this[_0x5d3a7d(0x349)],_0x1117da,_0xea08f,_0x2e6e96),this[_0x5d3a7d(0x54f)]=this['applyEasing'](this[_0x5d3a7d(0x54f)],this[_0x5d3a7d(0x34e)],_0x1117da,_0xea08f,_0x2e6e96),this[_0x5d3a7d(0x6a8)]--;if(this[_0x5d3a7d(0x6a8)]<=0x0)this['onMoveEnd']();},Sprite_Battler['prototype'][_0x32e60b(0x7d8)]=function(_0x3d9a2e,_0x12aea1,_0x219db6,_0x50e46b,_0x2d82f8){const _0x41e2c5=_0x32e60b,_0x44939e=VisuMZ['ApplyEasing']((_0x50e46b-_0x219db6)/_0x50e46b,_0x2d82f8||_0x41e2c5(0x6f0)),_0xa1ecb7=VisuMZ[_0x41e2c5(0x313)]((_0x50e46b-_0x219db6+0x1)/_0x50e46b,_0x2d82f8||_0x41e2c5(0x6f0)),_0x362137=(_0x3d9a2e-_0x12aea1*_0x44939e)/(0x1-_0x44939e);return _0x362137+(_0x12aea1-_0x362137)*_0xa1ecb7;},VisuMZ[_0x32e60b(0x565)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x32e60b(0x303)][_0x32e60b(0x2e5)],Sprite_Actor[_0x32e60b(0x303)][_0x32e60b(0x2e5)]=function(_0x29f5db){const _0x4cf068=_0x32e60b;VisuMZ[_0x4cf068(0x565)][_0x4cf068(0x1e6)]['UI'][_0x4cf068(0x6d8)]?this[_0x4cf068(0x7b7)](_0x29f5db):VisuMZ[_0x4cf068(0x565)][_0x4cf068(0x653)][_0x4cf068(0x2d2)](this,_0x29f5db);},Sprite_Actor[_0x32e60b(0x303)][_0x32e60b(0x7b7)]=function(_0xbbaac8){const _0x1849ce=_0x32e60b;let _0x1035a0=Math[_0x1849ce(0x474)](Graphics[_0x1849ce(0x36c)]/0x2+0xc0);_0x1035a0-=Math[_0x1849ce(0x338)]((Graphics['width']-Graphics['boxWidth'])/0x2),_0x1035a0+=_0xbbaac8*0x20;let _0x342795=Graphics[_0x1849ce(0x32b)]-0xc8-$gameParty[_0x1849ce(0x305)]()*0x30;_0x342795-=Math['floor']((Graphics[_0x1849ce(0x32b)]-Graphics[_0x1849ce(0x3ea)])/0x2),_0x342795+=_0xbbaac8*0x30,this[_0x1849ce(0x3f3)](_0x1035a0,_0x342795);},Sprite_Actor['prototype'][_0x32e60b(0x655)]=function(){const _0x2de5e4=_0x32e60b;this[_0x2de5e4(0x556)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x32e60b(0x31e)]=function(_0x9541e){const _0x4ea1f2=_0x32e60b;this[_0x4ea1f2(0x460)]=_0x9541e;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x8d0)]=Sprite_Animation[_0x32e60b(0x303)][_0x32e60b(0x3bb)],Sprite_Animation[_0x32e60b(0x303)][_0x32e60b(0x3bb)]=function(){const _0xa26ec6=_0x32e60b;if(this[_0xa26ec6(0x460)])return;VisuMZ[_0xa26ec6(0x565)][_0xa26ec6(0x8d0)][_0xa26ec6(0x2d2)](this);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x83e)]=Sprite_Animation[_0x32e60b(0x303)][_0x32e60b(0x828)],Sprite_Animation['prototype']['setViewport']=function(_0x312da2){const _0x4f3532=_0x32e60b;this[_0x4f3532(0x2bb)]()?this[_0x4f3532(0x81f)](_0x312da2):VisuMZ[_0x4f3532(0x565)][_0x4f3532(0x83e)][_0x4f3532(0x2d2)](this,_0x312da2);},Sprite_Animation[_0x32e60b(0x303)][_0x32e60b(0x2bb)]=function(){const _0x11d097=_0x32e60b;if(!this[_0x11d097(0x8c4)])return![];const _0x39bb34=this[_0x11d097(0x8c4)]['name']||'';if(_0x39bb34[_0x11d097(0x58a)](/<MIRROR OFFSET X>/i))return!![];if(_0x39bb34[_0x11d097(0x58a)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x11d097(0x565)][_0x11d097(0x1e6)][_0x11d097(0x89e)][_0x11d097(0x5ed)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x1fa879){const _0x5b438d=_0x32e60b,_0x54e8ff=this['_viewportSize'],_0x52881f=this[_0x5b438d(0x332)],_0x64aea0=this['_animation']['offsetX']*(this['_mirror']?-0x1:0x1)-_0x54e8ff/0x2,_0x40cf96=this[_0x5b438d(0x8c4)][_0x5b438d(0x75f)]-_0x52881f/0x2,_0x9d48c6=this[_0x5b438d(0x5e6)](_0x1fa879);_0x1fa879['gl']['viewport'](_0x64aea0+_0x9d48c6['x'],_0x40cf96+_0x9d48c6['y'],_0x54e8ff,_0x52881f);},Sprite_Animation[_0x32e60b(0x303)][_0x32e60b(0x386)]=function(_0x4c3b1b){const _0x4d0b99=_0x32e60b;if(_0x4c3b1b['_mainSprite']){}const _0xa41039=this['_animation'][_0x4d0b99(0x50d)];let _0x5355fb=_0x4c3b1b[_0x4d0b99(0x32b)]*_0x4c3b1b[_0x4d0b99(0x820)]['y'],_0x541cdf=0x0,_0x300d25=-_0x5355fb/0x2;if(_0xa41039[_0x4d0b99(0x58a)](/<(?:HEAD|HEADER|TOP)>/i))_0x300d25=-_0x5355fb;if(_0xa41039[_0x4d0b99(0x58a)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x300d25=0x0;if(this[_0x4d0b99(0x8c4)][_0x4d0b99(0x66a)])_0x300d25=0x0;if(_0xa41039[_0x4d0b99(0x58a)](/<(?:LEFT)>/i))_0x541cdf=-_0x4c3b1b[_0x4d0b99(0x36c)]/0x2;if(_0xa41039[_0x4d0b99(0x58a)](/<(?:RIGHT)>/i))_0x541cdf=_0x4c3b1b[_0x4d0b99(0x36c)]/0x2;_0xa41039['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x541cdf=Number(RegExp['$1'])*_0x4c3b1b['width']);_0xa41039['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x300d25=(0x1-Number(RegExp['$1']))*-_0x5355fb);_0xa41039[_0x4d0b99(0x58a)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x541cdf=Number(RegExp['$1'])*_0x4c3b1b[_0x4d0b99(0x36c)],_0x300d25=(0x1-Number(RegExp['$2']))*-_0x5355fb);if(_0xa41039[_0x4d0b99(0x58a)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x541cdf+=Number(RegExp['$1']);if(_0xa41039['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x300d25+=Number(RegExp['$1']);_0xa41039[_0x4d0b99(0x58a)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x541cdf+=Number(RegExp['$1']),_0x300d25+=Number(RegExp['$2']));const _0x16b619=new Point(_0x541cdf,_0x300d25);return _0x4c3b1b[_0x4d0b99(0x1b4)](),_0x4c3b1b[_0x4d0b99(0x2ff)][_0x4d0b99(0x7c3)](_0x16b619);},Sprite_AnimationMV[_0x32e60b(0x303)][_0x32e60b(0x595)]=function(){const _0x4f4071=_0x32e60b;this[_0x4f4071(0x7d1)]=VisuMZ[_0x4f4071(0x565)]['Settings'][_0x4f4071(0x89e)][_0x4f4071(0x1bc)]??0x4,this[_0x4f4071(0x1ef)](),this['_rate']=this[_0x4f4071(0x7d1)][_0x4f4071(0x7c2)](0x1,0xa);},Sprite_AnimationMV[_0x32e60b(0x303)][_0x32e60b(0x1ef)]=function(){const _0x57e1a0=_0x32e60b;if(!this[_0x57e1a0(0x8c4)]);const _0xbffd2f=this[_0x57e1a0(0x8c4)][_0x57e1a0(0x50d)]||'';_0xbffd2f[_0x57e1a0(0x58a)](/<RATE:[ ](\d+)>/i)&&(this[_0x57e1a0(0x7d1)]=(Number(RegExp['$1'])||0x1)[_0x57e1a0(0x7c2)](0x1,0xa));},Sprite_AnimationMV[_0x32e60b(0x303)][_0x32e60b(0x31e)]=function(_0x1d2dfc){const _0x3d9d76=_0x32e60b;this[_0x3d9d76(0x460)]=_0x1d2dfc;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x4f0)]=Sprite_AnimationMV['prototype'][_0x32e60b(0x15d)],Sprite_AnimationMV['prototype']['processTimingData']=function(_0x296cb3){const _0x22a45b=_0x32e60b;this[_0x22a45b(0x460)]&&(_0x296cb3=JsonEx[_0x22a45b(0x4fe)](_0x296cb3),_0x296cb3['se']&&(_0x296cb3['se'][_0x22a45b(0x20e)]=0x0)),VisuMZ[_0x22a45b(0x565)][_0x22a45b(0x4f0)][_0x22a45b(0x2d2)](this,_0x296cb3);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x46c)]=Sprite_AnimationMV[_0x32e60b(0x303)][_0x32e60b(0x7ec)],Sprite_AnimationMV['prototype']['updatePosition']=function(){const _0x37a1da=_0x32e60b;VisuMZ[_0x37a1da(0x565)][_0x37a1da(0x46c)][_0x37a1da(0x2d2)](this);if(this[_0x37a1da(0x8c4)]['position']===0x3){if(this['x']===0x0)this['x']=Math[_0x37a1da(0x474)](Graphics[_0x37a1da(0x36c)]/0x2);if(this['y']===0x0)this['y']=Math[_0x37a1da(0x474)](Graphics[_0x37a1da(0x32b)]/0x2);}},Sprite_Damage['prototype'][_0x32e60b(0x7b2)]=function(_0x522db4){const _0x3a89ba=_0x32e60b;let _0x344132=Math[_0x3a89ba(0x722)](_0x522db4)['toString']();this[_0x3a89ba(0x264)]()&&(_0x344132=VisuMZ[_0x3a89ba(0x405)](_0x344132));const _0x3ae27a=this[_0x3a89ba(0x69b)](),_0x518beb=Math[_0x3a89ba(0x338)](_0x3ae27a*0.75);for(let _0xf97a8=0x0;_0xf97a8<_0x344132[_0x3a89ba(0x4e4)];_0xf97a8++){const _0x1fc554=this[_0x3a89ba(0x306)](_0x518beb,_0x3ae27a);_0x1fc554[_0x3a89ba(0x568)][_0x3a89ba(0x7fe)](_0x344132[_0xf97a8],0x0,0x0,_0x518beb,_0x3ae27a,_0x3a89ba(0x718)),_0x1fc554['x']=(_0xf97a8-(_0x344132[_0x3a89ba(0x4e4)]-0x1)/0x2)*_0x518beb,_0x1fc554['dy']=-_0xf97a8;}},Sprite_Damage[_0x32e60b(0x303)]['useDigitGrouping']=function(){const _0x15ae2e=_0x32e60b;return VisuMZ[_0x15ae2e(0x565)][_0x15ae2e(0x1e6)][_0x15ae2e(0x89e)][_0x15ae2e(0x5a8)];},Sprite_Damage[_0x32e60b(0x303)][_0x32e60b(0x371)]=function(){const _0x5616ac=_0x32e60b;return ColorManager[_0x5616ac(0x443)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x49b)]=Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x61c)],Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x61c)]=function(){const _0x2f56be=_0x32e60b;return VisuMZ['CoreEngine'][_0x2f56be(0x49b)][_0x2f56be(0x2d2)](this)[_0x2f56be(0x7c2)](0x0,0x1);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1a4)]=Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x182)],Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x182)]=function(){const _0x9206f1=_0x32e60b;let _0x1155db=VisuMZ[_0x9206f1(0x565)][_0x9206f1(0x1a4)][_0x9206f1(0x2d2)](this);return _0x1155db;},Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x337)]=function(){const _0xbff205=_0x32e60b;let _0x45ed0f=this[_0xbff205(0x182)]();this[_0xbff205(0x264)]()&&(_0x45ed0f=VisuMZ[_0xbff205(0x405)](_0x45ed0f));const _0x47f09d=this['bitmapWidth']()-0x1,_0x3b3d78=this[_0xbff205(0x800)]?this[_0xbff205(0x800)]():this[_0xbff205(0x5a1)]();this[_0xbff205(0x6e4)](),this[_0xbff205(0x568)]['drawText'](_0x45ed0f,0x0,0x0,_0x47f09d,_0x3b3d78,_0xbff205(0x19e));},Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x55d)]=function(){return 0x3;},Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x264)]=function(){const _0x8a3d8=_0x32e60b;return VisuMZ[_0x8a3d8(0x565)][_0x8a3d8(0x1e6)][_0x8a3d8(0x89e)][_0x8a3d8(0x244)];},Sprite_Gauge[_0x32e60b(0x303)][_0x32e60b(0x371)]=function(){const _0x5bbaa9=_0x32e60b;return ColorManager[_0x5bbaa9(0x331)]();},Sprite_StateIcon[_0x32e60b(0x6a4)]=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)]['UI'][_0x32e60b(0x6f6)]??!![],VisuMZ['CoreEngine']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x32e60b(0x303)][_0x32e60b(0x6c5)],Sprite_StateIcon[_0x32e60b(0x303)][_0x32e60b(0x6c5)]=function(){const _0x50ae0b=_0x32e60b;Sprite_StateIcon[_0x50ae0b(0x6a4)]?this[_0x50ae0b(0x7f2)]():VisuMZ[_0x50ae0b(0x565)][_0x50ae0b(0x4fd)][_0x50ae0b(0x2d2)](this);},Sprite_StateIcon['prototype']['loadBitmapCoreEngine']=function(){const _0x2daeaf=_0x32e60b;this['bitmap']=new Bitmap(ImageManager[_0x2daeaf(0x3fb)],ImageManager[_0x2daeaf(0x735)]),this[_0x2daeaf(0x812)]=ImageManager['loadSystem'](_0x2daeaf(0x508));},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x404)]=Sprite_StateIcon[_0x32e60b(0x303)]['updateFrame'],Sprite_StateIcon['prototype'][_0x32e60b(0x326)]=function(){const _0x48e0a3=_0x32e60b;Sprite_StateIcon[_0x48e0a3(0x6a4)]?this[_0x48e0a3(0x399)]():VisuMZ[_0x48e0a3(0x565)]['Sprite_StateIcon_updateFrame'][_0x48e0a3(0x2d2)](this);},Sprite_StateIcon[_0x32e60b(0x303)][_0x32e60b(0x399)]=function(){const _0x34d965=_0x32e60b;if(this[_0x34d965(0x392)]===this[_0x34d965(0x141)])return;this['_lastIconIndex']=this[_0x34d965(0x141)];const _0xc415eb=ImageManager[_0x34d965(0x3fb)],_0x425935=ImageManager['iconHeight'],_0x476e13=this[_0x34d965(0x141)]%0x10*_0xc415eb,_0x60e7be=Math[_0x34d965(0x338)](this[_0x34d965(0x141)]/0x10)*_0x425935,_0x106b92=this[_0x34d965(0x812)],_0x234425=this[_0x34d965(0x568)];_0x234425[_0x34d965(0x22f)](),_0x234425['blt'](_0x106b92,_0x476e13,_0x60e7be,_0xc415eb,_0x425935,0x0,0x0,_0x234425[_0x34d965(0x36c)],_0x234425[_0x34d965(0x32b)]);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x877)]=Sprite_Picture[_0x32e60b(0x303)][_0x32e60b(0x6c5)],Sprite_Picture[_0x32e60b(0x303)][_0x32e60b(0x6c5)]=function(){const _0x2f8339=_0x32e60b;this[_0x2f8339(0x5d5)]&&this['_pictureName'][_0x2f8339(0x58a)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x2f8339(0x565)][_0x2f8339(0x877)][_0x2f8339(0x2d2)](this);},Sprite_Picture[_0x32e60b(0x303)]['loadIconBitmap']=function(_0x254ea6){const _0x3015fb=_0x32e60b,_0x10eb05=ImageManager[_0x3015fb(0x3fb)],_0x321796=ImageManager['iconHeight'],_0x1658c6=this[_0x3015fb(0x5d5)][_0x3015fb(0x58a)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x10eb05,_0x321796);const _0x58defa=ImageManager[_0x3015fb(0x852)](_0x3015fb(0x508)),_0x393d02=_0x254ea6%0x10*_0x10eb05,_0x5efda2=Math[_0x3015fb(0x338)](_0x254ea6/0x10)*_0x321796;this[_0x3015fb(0x568)][_0x3015fb(0x619)]=_0x1658c6,this[_0x3015fb(0x568)]['blt'](_0x58defa,_0x393d02,_0x5efda2,_0x10eb05,_0x321796,0x0,0x0,_0x10eb05,_0x321796);};function Sprite_TitlePictureButton(){const _0x58d156=_0x32e60b;this[_0x58d156(0x829)](...arguments);}Sprite_TitlePictureButton[_0x32e60b(0x303)]=Object['create'](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x32e60b(0x303)][_0x32e60b(0x13d)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x32e60b(0x303)]['initialize']=function(_0x4a4580){const _0x217760=_0x32e60b;Sprite_Clickable[_0x217760(0x303)][_0x217760(0x829)][_0x217760(0x2d2)](this),this[_0x217760(0x38b)]=_0x4a4580,this['_clickHandler']=null,this[_0x217760(0x186)]();},Sprite_TitlePictureButton[_0x32e60b(0x303)][_0x32e60b(0x186)]=function(){const _0x40f575=_0x32e60b;this['x']=Graphics['width'],this['y']=Graphics[_0x40f575(0x32b)],this[_0x40f575(0x270)]=![],this[_0x40f575(0x2ae)]();},Sprite_TitlePictureButton[_0x32e60b(0x303)][_0x32e60b(0x2ae)]=function(){const _0x41f4d4=_0x32e60b;this[_0x41f4d4(0x568)]=ImageManager[_0x41f4d4(0x616)](this['_data'][_0x41f4d4(0x18f)]),this[_0x41f4d4(0x568)][_0x41f4d4(0x2c8)](this[_0x41f4d4(0x37a)][_0x41f4d4(0x3d0)](this));},Sprite_TitlePictureButton['prototype'][_0x32e60b(0x37a)]=function(){const _0x402aab=_0x32e60b;this[_0x402aab(0x38b)][_0x402aab(0x38f)][_0x402aab(0x2d2)](this),this[_0x402aab(0x38b)][_0x402aab(0x24b)]['call'](this),this[_0x402aab(0x417)](this[_0x402aab(0x38b)]['CallHandlerJS'][_0x402aab(0x3d0)](this));},Sprite_TitlePictureButton[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x2dca4e=_0x32e60b;Sprite_Clickable[_0x2dca4e(0x303)][_0x2dca4e(0x512)][_0x2dca4e(0x2d2)](this),this[_0x2dca4e(0x78d)](),this[_0x2dca4e(0x825)]();},Sprite_TitlePictureButton[_0x32e60b(0x303)][_0x32e60b(0x421)]=function(){const _0x556ac1=_0x32e60b;return VisuMZ[_0x556ac1(0x565)][_0x556ac1(0x1e6)][_0x556ac1(0x31c)][_0x556ac1(0x51f)][_0x556ac1(0x85a)];},Sprite_TitlePictureButton['prototype'][_0x32e60b(0x78d)]=function(){const _0x530e30=_0x32e60b;this[_0x530e30(0x7f1)]||this['_hovered']?this[_0x530e30(0x1b8)]=0xff:(this[_0x530e30(0x1b8)]+=this[_0x530e30(0x270)]?this['fadeSpeed']():-0x1*this[_0x530e30(0x421)](),this['opacity']=Math[_0x530e30(0x8bb)](0xc0,this[_0x530e30(0x1b8)]));},Sprite_TitlePictureButton[_0x32e60b(0x303)][_0x32e60b(0x417)]=function(_0x1aebeb){const _0x3f165f=_0x32e60b;this[_0x3f165f(0x7d3)]=_0x1aebeb;},Sprite_TitlePictureButton['prototype']['onClick']=function(){const _0x261895=_0x32e60b;this['_clickHandler']&&this[_0x261895(0x7d3)]();};function Sprite_ExtendedTile(){const _0x40d48c=_0x32e60b;this[_0x40d48c(0x829)](...arguments);}Sprite_ExtendedTile[_0x32e60b(0x303)]=Object[_0x32e60b(0x35f)](Sprite['prototype']),Sprite_ExtendedTile['prototype'][_0x32e60b(0x13d)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(_0x28ce56,_0x2c4389,_0xe267f0,_0x2168af){const _0x5d048c=_0x32e60b;this[_0x5d048c(0x4ac)]=Game_CharacterBase[_0x5d048c(0x63e)]||-0x6,this[_0x5d048c(0x1ac)]=_0x28ce56,this[_0x5d048c(0x12e)]=_0x2c4389,this[_0x5d048c(0x158)]=_0xe267f0,this['_patternHeight']=_0x2168af,Sprite[_0x5d048c(0x303)][_0x5d048c(0x829)][_0x5d048c(0x2d2)](this),this[_0x5d048c(0x440)](),this[_0x5d048c(0x5e2)](),this[_0x5d048c(0x5b4)](),this[_0x5d048c(0x512)]();},Sprite_ExtendedTile[_0x32e60b(0x303)][_0x32e60b(0x440)]=function(){const _0x1ff7ad=_0x32e60b;this[_0x1ff7ad(0x695)]=new Sprite(),this[_0x1ff7ad(0x695)][_0x1ff7ad(0x79e)]['x']=0.5,this[_0x1ff7ad(0x695)][_0x1ff7ad(0x79e)]['y']=0x1,this[_0x1ff7ad(0x695)]['y']=-this[_0x1ff7ad(0x4ac)]+0x1,this[_0x1ff7ad(0x6b4)](this[_0x1ff7ad(0x695)]);},Sprite_ExtendedTile['prototype'][_0x32e60b(0x5e2)]=function(){const _0x1f62c9=_0x32e60b,_0x20613d=$gameMap['tileset'](),_0x5522f9=0x5+Math['floor'](this[_0x1f62c9(0x158)]/0x100);this['_tileSprite'][_0x1f62c9(0x568)]=ImageManager[_0x1f62c9(0x139)](_0x20613d[_0x1f62c9(0x839)][_0x5522f9]);},Sprite_ExtendedTile[_0x32e60b(0x303)][_0x32e60b(0x5b4)]=function(){const _0x40799b=_0x32e60b,_0x56a09a=this[_0x40799b(0x158)],_0x2e9035=$gameMap[_0x40799b(0x85d)](),_0x4cfe2b=$gameMap[_0x40799b(0x37b)](),_0x12e661=(Math['floor'](_0x56a09a/0x80)%0x2*0x8+_0x56a09a%0x8)*_0x2e9035,_0x5b8bec=Math['floor'](_0x56a09a%0x100/0x8)%0x10*_0x4cfe2b,_0x1ea68e=this[_0x40799b(0x3d9)]*_0x4cfe2b;this[_0x40799b(0x695)]['setFrame'](_0x12e661,_0x5b8bec-_0x1ea68e,_0x2e9035,_0x4cfe2b+_0x1ea68e);},Sprite_ExtendedTile[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x3c18bc=_0x32e60b;Sprite['prototype'][_0x3c18bc(0x512)][_0x3c18bc(0x2d2)](this),this[_0x3c18bc(0x7ec)]();},Sprite_ExtendedTile['prototype'][_0x32e60b(0x7ec)]=function(){const _0x512ce6=_0x32e60b,_0x10714b=$gameMap[_0x512ce6(0x85d)](),_0x28a836=$gameMap[_0x512ce6(0x37b)](),_0x2415c9=this['_mapX'],_0x54f9aa=this[_0x512ce6(0x12e)];this['x']=Math['floor'](($gameMap[_0x512ce6(0x48c)](_0x2415c9)+0.5)*_0x10714b),this['y']=Math[_0x512ce6(0x338)](($gameMap[_0x512ce6(0x160)](_0x54f9aa)+0x1)*_0x28a836)+this[_0x512ce6(0x4ac)]-0x1;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3da)]=Spriteset_Base['prototype'][_0x32e60b(0x829)],Spriteset_Base[_0x32e60b(0x303)]['initialize']=function(){const _0x130282=_0x32e60b;VisuMZ[_0x130282(0x565)]['Spriteset_Base_initialize'][_0x130282(0x2d2)](this),this[_0x130282(0x794)]();},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x794)]=function(){const _0x40efb2=_0x32e60b;this['_fauxAnimationSprites']=[],this[_0x40efb2(0x850)]=[],this[_0x40efb2(0x7af)]=this[_0x40efb2(0x820)]['x'],this[_0x40efb2(0x631)]=this[_0x40efb2(0x820)]['y'];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x709)]=Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x29d)],Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x29d)]=function(_0x26ab67){const _0x26ba2c=_0x32e60b;this[_0x26ba2c(0x41f)](),this[_0x26ba2c(0x5f3)](),VisuMZ[_0x26ba2c(0x565)][_0x26ba2c(0x709)][_0x26ba2c(0x2d2)](this,_0x26ab67);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x2de)]=Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x512)],Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x2dc665=_0x32e60b;VisuMZ[_0x2dc665(0x565)]['Spriteset_Base_update'][_0x2dc665(0x2d2)](this),this[_0x2dc665(0x3ed)](),this[_0x2dc665(0x6cf)](),this[_0x2dc665(0x6d5)](),this['updatePointAnimations']();},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x3ed)]=function(){},Spriteset_Base['prototype']['updatePictureAntiZoom']=function(){const _0x3c46fc=_0x32e60b;if(!VisuMZ['CoreEngine'][_0x3c46fc(0x1e6)][_0x3c46fc(0x89e)][_0x3c46fc(0x647)])return;if(this[_0x3c46fc(0x7af)]===this[_0x3c46fc(0x820)]['x']&&this[_0x3c46fc(0x631)]===this[_0x3c46fc(0x820)]['y'])return;this['adjustPictureAntiZoom'](),this[_0x3c46fc(0x7af)]=this[_0x3c46fc(0x820)]['x'],this['_cacheScaleY']=this['scale']['y'];},Spriteset_Base['prototype'][_0x32e60b(0x30b)]=function(){const _0x3c6d76=_0x32e60b;if(SceneManager[_0x3c6d76(0x3bd)]()&&Spriteset_Map[_0x3c6d76(0x329)])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x3c6d76(0x329)])return;}this[_0x3c6d76(0x820)]['x']!==0x0&&(this[_0x3c6d76(0x45a)][_0x3c6d76(0x820)]['x']=0x1/this[_0x3c6d76(0x820)]['x'],this[_0x3c6d76(0x45a)]['x']=-(this['x']/this[_0x3c6d76(0x820)]['x'])),this['scale']['y']!==0x0&&(this[_0x3c6d76(0x45a)][_0x3c6d76(0x820)]['y']=0x1/this[_0x3c6d76(0x820)]['y'],this[_0x3c6d76(0x45a)]['y']=-(this['y']/this[_0x3c6d76(0x820)]['y']));},VisuMZ['CoreEngine']['Spriteset_Base_updatePosition']=Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x7ec)],Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x7ec)]=function(){const _0x2adc0e=_0x32e60b;VisuMZ[_0x2adc0e(0x565)][_0x2adc0e(0x311)][_0x2adc0e(0x2d2)](this),this['updatePositionCoreEngine']();},Spriteset_Base['prototype']['updatePositionCoreEngine']=function(){const _0x13102b=_0x32e60b;if(!$gameScreen)return;if($gameScreen[_0x13102b(0x62e)]<=0x0)return;this['x']-=Math[_0x13102b(0x474)]($gameScreen[_0x13102b(0x6a7)]());const _0x443cbc=$gameScreen[_0x13102b(0x148)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case'original':this['updatePositionCoreEngineShakeOriginal']();break;case _0x13102b(0x26a):this[_0x13102b(0x4f9)]();break;case _0x13102b(0x391):this['updatePositionCoreEngineShakeVert']();break;default:this[_0x13102b(0x351)]();break;}},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x7ad)]=function(){const _0x34e034=_0x32e60b,_0x11f1b8=VisuMZ[_0x34e034(0x565)]['Settings']['ScreenShake'];if(_0x11f1b8&&_0x11f1b8['originalJS'])return _0x11f1b8[_0x34e034(0x62f)][_0x34e034(0x2d2)](this);this['x']+=Math['round']($gameScreen[_0x34e034(0x6a7)]());},Spriteset_Base['prototype'][_0x32e60b(0x351)]=function(){const _0x2e560b=_0x32e60b,_0x1d5956=VisuMZ[_0x2e560b(0x565)][_0x2e560b(0x1e6)][_0x2e560b(0x85b)];if(_0x1d5956&&_0x1d5956[_0x2e560b(0x506)])return _0x1d5956[_0x2e560b(0x506)][_0x2e560b(0x2d2)](this);const _0xc46d7a=$gameScreen[_0x2e560b(0x21e)]*0.75,_0x95e712=$gameScreen[_0x2e560b(0x537)]*0.6,_0x405536=$gameScreen[_0x2e560b(0x62e)];this['x']+=Math[_0x2e560b(0x474)](Math[_0x2e560b(0x3cb)](_0xc46d7a)-Math[_0x2e560b(0x3cb)](_0x95e712))*(Math['min'](_0x405536,0x1e)*0.5),this['y']+=Math[_0x2e560b(0x474)](Math[_0x2e560b(0x3cb)](_0xc46d7a)-Math['randomInt'](_0x95e712))*(Math[_0x2e560b(0x8bb)](_0x405536,0x1e)*0.5);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x4f9)]=function(){const _0x390ad0=_0x32e60b,_0xfff8b4=VisuMZ[_0x390ad0(0x565)][_0x390ad0(0x1e6)][_0x390ad0(0x85b)];if(_0xfff8b4&&_0xfff8b4['horzJS'])return _0xfff8b4[_0x390ad0(0x3fa)][_0x390ad0(0x2d2)](this);const _0x2f49c8=$gameScreen[_0x390ad0(0x21e)]*0.75,_0x3ed4a5=$gameScreen[_0x390ad0(0x537)]*0.6,_0x447c87=$gameScreen[_0x390ad0(0x62e)];this['x']+=Math[_0x390ad0(0x474)](Math[_0x390ad0(0x3cb)](_0x2f49c8)-Math[_0x390ad0(0x3cb)](_0x3ed4a5))*(Math[_0x390ad0(0x8bb)](_0x447c87,0x1e)*0.5);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x5bd)]=function(){const _0x36b795=_0x32e60b,_0x29f9a2=VisuMZ[_0x36b795(0x565)][_0x36b795(0x1e6)][_0x36b795(0x85b)];if(_0x29f9a2&&_0x29f9a2[_0x36b795(0x2b2)])return _0x29f9a2[_0x36b795(0x2b2)]['call'](this);const _0x13904d=$gameScreen[_0x36b795(0x21e)]*0.75,_0x56c947=$gameScreen[_0x36b795(0x537)]*0.6,_0x426d9d=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x36b795(0x3cb)](_0x13904d)-Math[_0x36b795(0x3cb)](_0x56c947))*(Math[_0x36b795(0x8bb)](_0x426d9d,0x1e)*0.5);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x6d5)]=function(){const _0x260327=_0x32e60b;for(const _0x13c837 of this['_fauxAnimationSprites']){!_0x13c837['isPlaying']()&&this['removeFauxAnimation'](_0x13c837);}this[_0x260327(0x2d7)]();},Spriteset_Base[_0x32e60b(0x303)]['processFauxAnimationRequests']=function(){const _0x1beada=_0x32e60b;for(;;){const _0xd68d2c=$gameTemp[_0x1beada(0x883)]();if(_0xd68d2c)this[_0x1beada(0x367)](_0xd68d2c);else break;}},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x367)]=function(_0x380fe3){const _0x48f0f3=_0x32e60b,_0x43144a=$dataAnimations[_0x380fe3['animationId']],_0x1f0952=_0x380fe3[_0x48f0f3(0x390)],_0x44fcb1=_0x380fe3['mirror'],_0x59401f=_0x380fe3[_0x48f0f3(0x764)];let _0x13cc42=this[_0x48f0f3(0x52c)]();const _0x230c83=this[_0x48f0f3(0x308)]();if(this[_0x48f0f3(0x606)](_0x43144a))for(const _0x7e534 of _0x1f0952){this['createFauxAnimationSprite']([_0x7e534],_0x43144a,_0x44fcb1,_0x13cc42,_0x59401f),_0x13cc42+=_0x230c83;}else this['createFauxAnimationSprite'](_0x1f0952,_0x43144a,_0x44fcb1,_0x13cc42,_0x59401f);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x727)]=function(_0x5a8d1f,_0x70c1ff,_0x3a1fa4,_0x34ad30){const _0x5887e5=_0x32e60b,_0xf80044=this[_0x5887e5(0x72d)](_0x70c1ff),_0x2a23e7=new(_0xf80044?Sprite_AnimationMV:Sprite_Animation)(),_0x1092ed=this[_0x5887e5(0x67a)](_0x5a8d1f),_0x33d596=this[_0x5887e5(0x52c)](),_0x3c5096=_0x34ad30>_0x33d596?this[_0x5887e5(0x73f)]():null;this[_0x5887e5(0x2fb)](_0x5a8d1f[0x0])&&(_0x3a1fa4=!_0x3a1fa4),_0x2a23e7[_0x5887e5(0x249)]=_0x5a8d1f,_0x2a23e7[_0x5887e5(0x186)](_0x1092ed,_0x70c1ff,_0x3a1fa4,_0x34ad30,_0x3c5096),this['addAnimationSpriteToContainer'](_0x2a23e7),this[_0x5887e5(0x255)][_0x5887e5(0x724)](_0x2a23e7);},Spriteset_Base[_0x32e60b(0x303)]['createFauxAnimationSprite']=function(_0x49d012,_0x4ace04,_0x1f6b4c,_0x1cee4a,_0x24db52){const _0x78ef31=_0x32e60b,_0x2df32a=this['isMVAnimation'](_0x4ace04),_0x285ca6=new(_0x2df32a?Sprite_AnimationMV:Sprite_Animation)(),_0x227dde=this[_0x78ef31(0x67a)](_0x49d012);this['animationShouldMirror'](_0x49d012[0x0])&&(_0x1f6b4c=!_0x1f6b4c);_0x285ca6[_0x78ef31(0x249)]=_0x49d012,_0x285ca6[_0x78ef31(0x186)](_0x227dde,_0x4ace04,_0x1f6b4c,_0x1cee4a),_0x285ca6[_0x78ef31(0x31e)](_0x24db52),this[_0x78ef31(0x79f)](_0x285ca6);if(this[_0x78ef31(0x255)])this[_0x78ef31(0x255)][_0x78ef31(0x8d3)](_0x285ca6);this['_fauxAnimationSprites'][_0x78ef31(0x724)](_0x285ca6);},Spriteset_Base['prototype'][_0x32e60b(0x79f)]=function(_0x33ce15){const _0x22cdef=_0x32e60b;this['_effectsContainer'][_0x22cdef(0x6b4)](_0x33ce15);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x3cd)]=function(_0x171d29){const _0x566f56=_0x32e60b;this['_animationSprites'][_0x566f56(0x8d3)](_0x171d29),this[_0x566f56(0x286)](_0x171d29);for(const _0x4058a2 of _0x171d29['targetObjects']){_0x4058a2[_0x566f56(0x6d3)]&&_0x4058a2[_0x566f56(0x6d3)]();}_0x171d29[_0x566f56(0x29d)]();},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x72f)]=function(_0x19de76){const _0xd53b94=_0x32e60b;this[_0xd53b94(0x517)][_0xd53b94(0x8d3)](_0x19de76),this[_0xd53b94(0x286)](_0x19de76);for(const _0x2d0f4f of _0x19de76[_0xd53b94(0x249)]){_0x2d0f4f[_0xd53b94(0x6d3)]&&_0x2d0f4f[_0xd53b94(0x6d3)]();}_0x19de76['destroy']();},Spriteset_Base['prototype'][_0x32e60b(0x286)]=function(_0x1637e3){const _0x38bb63=_0x32e60b;this['_effectsContainer'][_0x38bb63(0x5c5)](_0x1637e3);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x41f)]=function(){const _0x380745=_0x32e60b;for(const _0x105686 of this[_0x380745(0x517)]){this[_0x380745(0x72f)](_0x105686);}},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x64a)]=function(){const _0x9f824b=_0x32e60b;return this[_0x9f824b(0x517)]['length']>0x0;},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x88d)]=function(){const _0x3682bb=_0x32e60b;for(const _0xd7454e of this['_pointAnimationSprites']){!_0xd7454e[_0x3682bb(0x75b)]()&&this['removePointAnimation'](_0xd7454e);}this[_0x3682bb(0x278)]();},Spriteset_Base[_0x32e60b(0x303)]['processPointAnimationRequests']=function(){const _0x4ec2c5=_0x32e60b;for(;;){const _0x3d600c=$gameTemp[_0x4ec2c5(0x5fc)]();if(_0x3d600c)this[_0x4ec2c5(0x291)](_0x3d600c);else break;}},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x291)]=function(_0x26e1ec){const _0x4598d5=_0x32e60b,_0x414fad=$dataAnimations[_0x26e1ec[_0x4598d5(0x477)]],_0x18af7a=this[_0x4598d5(0x785)](_0x26e1ec),_0x301e0d=_0x26e1ec[_0x4598d5(0x848)],_0x2cb84f=_0x26e1ec['mute'];let _0x3fd7a6=this[_0x4598d5(0x52c)]();const _0x59b69f=this[_0x4598d5(0x308)]();if(this['isAnimationForEach'](_0x414fad))for(const _0x48abb7 of _0x18af7a){this[_0x4598d5(0x61a)]([_0x48abb7],_0x414fad,_0x301e0d,_0x3fd7a6,_0x2cb84f),_0x3fd7a6+=_0x59b69f;}else this['createPointAnimationSprite'](_0x18af7a,_0x414fad,_0x301e0d,_0x3fd7a6,_0x2cb84f);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x785)]=function(_0x4ca9e1){const _0x169c7a=_0x32e60b,_0x3498a8=new Sprite_Clickable(),_0x26fe96=this[_0x169c7a(0x36d)]();_0x3498a8['x']=_0x4ca9e1['x']-_0x26fe96['x'],_0x3498a8['y']=_0x4ca9e1['y']-_0x26fe96['y'],_0x3498a8['z']=0x64;const _0x4cc889=this[_0x169c7a(0x36d)]();return _0x4cc889[_0x169c7a(0x6b4)](_0x3498a8),[_0x3498a8];},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x36d)]=function(){return this;},Spriteset_Map[_0x32e60b(0x303)][_0x32e60b(0x36d)]=function(){const _0x4f7887=_0x32e60b;return this[_0x4f7887(0x446)]||this;},Spriteset_Battle[_0x32e60b(0x303)][_0x32e60b(0x36d)]=function(){const _0x1ac50e=_0x32e60b;return this[_0x1ac50e(0x3f4)]||this;},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x61a)]=function(_0x80db7,_0x18884c,_0x4893bd,_0xfc13ea,_0x5e0518){const _0x4013ed=_0x32e60b,_0x53ce17=this[_0x4013ed(0x72d)](_0x18884c),_0x19f663=new(_0x53ce17?Sprite_AnimationMV:Sprite_Animation)();_0x19f663[_0x4013ed(0x249)]=_0x80db7,_0x19f663[_0x4013ed(0x186)](_0x80db7,_0x18884c,_0x4893bd,_0xfc13ea),_0x19f663[_0x4013ed(0x31e)](_0x5e0518),this[_0x4013ed(0x79f)](_0x19f663),this[_0x4013ed(0x850)][_0x4013ed(0x724)](_0x19f663);},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x74a)]=function(_0x5d6b70){const _0x2a0259=_0x32e60b;this[_0x2a0259(0x850)][_0x2a0259(0x8d3)](_0x5d6b70),this[_0x2a0259(0x356)][_0x2a0259(0x5c5)](_0x5d6b70);for(const _0x11255e of _0x5d6b70[_0x2a0259(0x249)]){_0x11255e[_0x2a0259(0x6d3)]&&_0x11255e['endAnimation']();const _0x51feb7=this['getPointAnimationLayer']();if(_0x51feb7)_0x51feb7[_0x2a0259(0x5c5)](_0x11255e);}_0x5d6b70[_0x2a0259(0x29d)]();},Spriteset_Base['prototype'][_0x32e60b(0x5f3)]=function(){const _0x54e912=_0x32e60b;for(const _0x10d5cd of this[_0x54e912(0x850)]){this[_0x54e912(0x74a)](_0x10d5cd);}},Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x898)]=function(){const _0x1dd0f9=_0x32e60b;return this[_0x1dd0f9(0x850)][_0x1dd0f9(0x4e4)]>0x0;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x44f)]=Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x4d2)],Spriteset_Base[_0x32e60b(0x303)][_0x32e60b(0x4d2)]=function(){const _0x467c78=_0x32e60b;return VisuMZ[_0x467c78(0x565)][_0x467c78(0x44f)]['call'](this)||this[_0x467c78(0x898)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x89e)][_0x32e60b(0x2a3)]||![],VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x6b7)]=Scene_Map[_0x32e60b(0x303)]['createSpriteset'],Scene_Map['prototype'][_0x32e60b(0x38c)]=function(){const _0x5d8ab8=_0x32e60b;VisuMZ[_0x5d8ab8(0x565)][_0x5d8ab8(0x6b7)][_0x5d8ab8(0x2d2)](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x52300e=this[_0x5d8ab8(0x68e)];if(!_0x52300e)return;this[_0x5d8ab8(0x45a)]=_0x52300e[_0x5d8ab8(0x45a)];if(!this[_0x5d8ab8(0x45a)])return;this['addChild'](this[_0x5d8ab8(0x45a)]);},VisuMZ[_0x32e60b(0x565)]['Spriteset_Map_createTilemap']=Spriteset_Map[_0x32e60b(0x303)][_0x32e60b(0x844)],Spriteset_Map['prototype'][_0x32e60b(0x844)]=function(){const _0x5b7c6e=_0x32e60b;VisuMZ[_0x5b7c6e(0x565)]['Spriteset_Map_createTilemap'][_0x5b7c6e(0x2d2)](this),this['createTileExtendSprites']();},Spriteset_Map[_0x32e60b(0x303)][_0x32e60b(0x180)]=function(){const _0x545187=_0x32e60b,_0x5daeb3=$gameMap[_0x545187(0x377)]();if(!_0x5daeb3)return;const _0x4a77ab=$gameMap['getTileExtendTerrainTags']();if(Object[_0x545187(0x5d6)](_0x4a77ab)[_0x545187(0x4e4)]<=0x0)return;const _0x43ae5a=$gameMap[_0x545187(0x276)]();this[_0x545187(0x889)]=this[_0x545187(0x889)]||[];for(let _0x18023b=0x0;_0x18023b<$gameMap[_0x545187(0x32b)]();_0x18023b++){for(let _0x2fe731=0x0;_0x2fe731<$gameMap[_0x545187(0x36c)]();_0x2fe731++){for(const _0x180ffe of $gameMap[_0x545187(0x534)](_0x2fe731,_0x18023b)){const _0x56a13c=_0x43ae5a[_0x180ffe]>>0xc,_0x17c15e=_0x4a77ab[_0x56a13c]||0x0;if(_0x17c15e<=0x0)continue;this['createExtendedTileSprite'](_0x2fe731,_0x18023b,_0x180ffe,_0x17c15e);}}}},Spriteset_Map[_0x32e60b(0x303)][_0x32e60b(0x16e)]=function(){const _0x3a7e2a=_0x32e60b;this[_0x3a7e2a(0x889)]=this['_tileExtendSprites']||[];for(const _0x208f9e of this[_0x3a7e2a(0x889)]){this[_0x3a7e2a(0x446)]['removeChild'](_0x208f9e);}this[_0x3a7e2a(0x889)]=[];},Spriteset_Map[_0x32e60b(0x303)][_0x32e60b(0x340)]=function(_0x2e79bc,_0x4cab71,_0x3f8a63,_0x1aec65){const _0x4db55d=_0x32e60b,_0x4c196d=new Sprite_ExtendedTile(_0x2e79bc,_0x4cab71,_0x3f8a63,_0x1aec65),_0x49cdf0=$gameMap['tilesetFlags']();_0x49cdf0[_0x3f8a63]&0x10?_0x4c196d['z']=0x4:_0x4c196d['z']=0x3,this['_tilemap'][_0x4db55d(0x6b4)](_0x4c196d),this[_0x4db55d(0x889)][_0x4db55d(0x724)](_0x4c196d);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x3b9)]=Tilemap['prototype'][_0x32e60b(0x3e7)],Tilemap[_0x32e60b(0x303)][_0x32e60b(0x3e7)]=function(_0x57fbbd,_0xb271a0,_0xefbb89){const _0x195123=_0x32e60b;if($gameMap[_0x195123(0x482)](_0x57fbbd))return;VisuMZ['CoreEngine'][_0x195123(0x3b9)]['call'](this,_0x57fbbd,_0xb271a0,_0xefbb89);},Spriteset_Battle[_0x32e60b(0x329)]=VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x89e)][_0x32e60b(0x2b9)]||![],VisuMZ[_0x32e60b(0x565)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x32e60b(0x303)][_0x32e60b(0x38c)],Scene_Battle['prototype'][_0x32e60b(0x38c)]=function(){const _0xc38f53=_0x32e60b;VisuMZ[_0xc38f53(0x565)][_0xc38f53(0x2e4)][_0xc38f53(0x2d2)](this);if(!Spriteset_Battle[_0xc38f53(0x329)])return;const _0x519265=this[_0xc38f53(0x68e)];if(!_0x519265)return;this[_0xc38f53(0x45a)]=_0x519265[_0xc38f53(0x45a)];if(!this['_pictureContainer'])return;this['addChild'](this[_0xc38f53(0x45a)]);},Spriteset_Battle['prototype'][_0x32e60b(0x319)]=function(){const _0x2712cd=_0x32e60b;this[_0x2712cd(0x804)]=new PIXI[(_0x2712cd(0x84f))][(_0x2712cd(0x478))](clamp=!![]),this[_0x2712cd(0x6df)]=new Sprite(),this[_0x2712cd(0x6df)][_0x2712cd(0x568)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x2712cd(0x84f)]=[this[_0x2712cd(0x804)]],this[_0x2712cd(0x640)][_0x2712cd(0x6b4)](this[_0x2712cd(0x6df)]);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x29a)]=Spriteset_Battle[_0x32e60b(0x303)]['createEnemies'],Spriteset_Battle['prototype']['createEnemies']=function(){const _0x1e8b7e=_0x32e60b;this[_0x1e8b7e(0x638)]()&&this[_0x1e8b7e(0x694)](),VisuMZ[_0x1e8b7e(0x565)][_0x1e8b7e(0x29a)][_0x1e8b7e(0x2d2)](this);},Spriteset_Battle[_0x32e60b(0x303)][_0x32e60b(0x638)]=function(){const _0x114662=_0x32e60b,_0x1901a5=VisuMZ[_0x114662(0x565)][_0x114662(0x1e6)][_0x114662(0x7f0)];if(!_0x1901a5)return![];if(Utils[_0x114662(0x817)]>='1.3.0'&&!_0x1901a5[_0x114662(0x4c9)])return![];return _0x1901a5[_0x114662(0x307)];},Spriteset_Battle[_0x32e60b(0x303)][_0x32e60b(0x694)]=function(){const _0x5ebaa3=_0x32e60b;for(member of $gameTroop['members']()){member[_0x5ebaa3(0x393)]();}},VisuMZ['CoreEngine'][_0x32e60b(0x4c7)]=Window_Base[_0x32e60b(0x303)][_0x32e60b(0x829)],Window_Base['prototype']['initialize']=function(_0x5e223e){const _0x31eb6f=_0x32e60b;_0x5e223e['x']=Math[_0x31eb6f(0x474)](_0x5e223e['x']),_0x5e223e['y']=Math[_0x31eb6f(0x474)](_0x5e223e['y']),_0x5e223e[_0x31eb6f(0x36c)]=Math[_0x31eb6f(0x474)](_0x5e223e[_0x31eb6f(0x36c)]),_0x5e223e[_0x31eb6f(0x32b)]=Math[_0x31eb6f(0x474)](_0x5e223e[_0x31eb6f(0x32b)]),this[_0x31eb6f(0x8ce)](),VisuMZ[_0x31eb6f(0x565)][_0x31eb6f(0x4c7)][_0x31eb6f(0x2d2)](this,_0x5e223e),this[_0x31eb6f(0x710)]();},Window_Base['prototype']['initDigitGrouping']=function(){const _0x2a8b22=_0x32e60b;this['_digitGrouping']=VisuMZ['CoreEngine'][_0x2a8b22(0x1e6)][_0x2a8b22(0x89e)][_0x2a8b22(0x3be)],this[_0x2a8b22(0x2ac)]=VisuMZ['CoreEngine'][_0x2a8b22(0x1e6)]['QoL'][_0x2a8b22(0x480)];},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x823)]=function(){const _0x2abc85=_0x32e60b;return VisuMZ[_0x2abc85(0x565)][_0x2abc85(0x1e6)][_0x2abc85(0x365)][_0x2abc85(0x876)];},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x107)]=function(){const _0x5dc42b=_0x32e60b;return VisuMZ[_0x5dc42b(0x565)][_0x5dc42b(0x1e6)][_0x5dc42b(0x365)][_0x5dc42b(0x4ee)];},Window_Base['prototype']['updateBackOpacity']=function(){const _0xfd01b6=_0x32e60b;$gameSystem[_0xfd01b6(0x3cc)]?this[_0xfd01b6(0x55b)]=$gameSystem[_0xfd01b6(0x3cc)]():this[_0xfd01b6(0x55b)]=VisuMZ[_0xfd01b6(0x565)][_0xfd01b6(0x1e6)][_0xfd01b6(0x365)][_0xfd01b6(0x2a2)];},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x83f)]=function(){const _0x1b41c8=_0x32e60b;return VisuMZ[_0x1b41c8(0x565)][_0x1b41c8(0x1e6)][_0x1b41c8(0x365)][_0x1b41c8(0x431)];},Window_Base['prototype'][_0x32e60b(0x27a)]=function(){const _0x485cf2=_0x32e60b;return VisuMZ[_0x485cf2(0x565)][_0x485cf2(0x1e6)][_0x485cf2(0x365)][_0x485cf2(0x7c8)];},VisuMZ[_0x32e60b(0x565)]['Window_Base_update']=Window_Base[_0x32e60b(0x303)][_0x32e60b(0x512)],Window_Base['prototype'][_0x32e60b(0x512)]=function(){const _0x403de8=_0x32e60b;VisuMZ[_0x403de8(0x565)][_0x403de8(0x741)][_0x403de8(0x2d2)](this),this[_0x403de8(0x257)]();},Window_Base['prototype'][_0x32e60b(0x639)]=function(){const _0x27b27d=_0x32e60b;this[_0x27b27d(0x30d)]&&(this[_0x27b27d(0x7a2)]+=this[_0x27b27d(0x27a)](),this['isOpen']()&&(this[_0x27b27d(0x30d)]=![]));},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x578)]=function(){const _0x539e4b=_0x32e60b;this['_closing']&&(this['openness']-=this['openingSpeed'](),this[_0x539e4b(0x2eb)]()&&(this['_closing']=![]));},VisuMZ[_0x32e60b(0x565)]['Window_Base_drawText']=Window_Base[_0x32e60b(0x303)]['drawText'],Window_Base[_0x32e60b(0x303)][_0x32e60b(0x7fe)]=function(_0x4c4f3f,_0x16f98b,_0x5433b5,_0x2c25f1,_0x2a97f9){const _0x52ee0b=_0x32e60b;if(this[_0x52ee0b(0x264)]())_0x4c4f3f=VisuMZ[_0x52ee0b(0x405)](_0x4c4f3f);VisuMZ[_0x52ee0b(0x565)][_0x52ee0b(0x16d)]['call'](this,_0x4c4f3f,_0x16f98b,_0x5433b5,_0x2c25f1,_0x2a97f9);},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x264)]=function(){const _0x424157=_0x32e60b;return this[_0x424157(0x3ab)];},VisuMZ['CoreEngine'][_0x32e60b(0x589)]=Window_Base[_0x32e60b(0x303)][_0x32e60b(0x1ae)],Window_Base[_0x32e60b(0x303)][_0x32e60b(0x1ae)]=function(_0x216c97,_0x145f39,_0x35608e,_0x479a26){const _0x32f53b=_0x32e60b;var _0x340167=VisuMZ[_0x32f53b(0x565)][_0x32f53b(0x589)]['call'](this,_0x216c97,_0x145f39,_0x35608e,_0x479a26);if(this[_0x32f53b(0x6f2)]())_0x340167[_0x32f53b(0x711)]=String(VisuMZ[_0x32f53b(0x405)](_0x340167[_0x32f53b(0x711)]))||'';return _0x340167;},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x6f2)]=function(){const _0x240dfd=_0x32e60b;return this[_0x240dfd(0x2ac)];},Window_Base['prototype'][_0x32e60b(0x23b)]=function(_0x498886){this['_digitGrouping']=_0x498886;},Window_Base[_0x32e60b(0x303)]['enableDigitGroupingEx']=function(_0x169aae){const _0x565a1b=_0x32e60b;this[_0x565a1b(0x2ac)]=_0x169aae;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base['prototype'][_0x32e60b(0x334)],Window_Base[_0x32e60b(0x303)][_0x32e60b(0x334)]=function(_0x5a4911,_0x114cc0,_0x57d95a){const _0x45793f=_0x32e60b;_0x114cc0=Math['round'](_0x114cc0),_0x57d95a=Math[_0x45793f(0x474)](_0x57d95a),VisuMZ[_0x45793f(0x565)][_0x45793f(0x40e)][_0x45793f(0x2d2)](this,_0x5a4911,_0x114cc0,_0x57d95a);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x279)]=Window_Base[_0x32e60b(0x303)][_0x32e60b(0x2c2)],Window_Base['prototype'][_0x32e60b(0x2c2)]=function(_0x4689d8,_0xde59dc,_0x14c707,_0x4669b1,_0x43758f,_0x3f1327){const _0x20ce67=_0x32e60b;_0x43758f=_0x43758f||ImageManager['faceWidth'],_0x3f1327=_0x3f1327||ImageManager[_0x20ce67(0x376)],_0x14c707=Math[_0x20ce67(0x474)](_0x14c707),_0x4669b1=Math[_0x20ce67(0x474)](_0x4669b1),_0x43758f=Math[_0x20ce67(0x474)](_0x43758f),_0x3f1327=Math[_0x20ce67(0x474)](_0x3f1327),VisuMZ[_0x20ce67(0x565)][_0x20ce67(0x279)][_0x20ce67(0x2d2)](this,_0x4689d8,_0xde59dc,_0x14c707,_0x4669b1,_0x43758f,_0x3f1327);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x2e2)]=Window_Base['prototype'][_0x32e60b(0x19d)],Window_Base[_0x32e60b(0x303)][_0x32e60b(0x19d)]=function(_0x5fdfa1,_0x303202,_0x18e0ad,_0x4e0fd3){const _0x517214=_0x32e60b;_0x18e0ad=Math[_0x517214(0x474)](_0x18e0ad),_0x4e0fd3=Math['round'](_0x4e0fd3),VisuMZ['CoreEngine'][_0x517214(0x2e2)]['call'](this,_0x5fdfa1,_0x303202,_0x18e0ad,_0x4e0fd3);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x192)]=Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x4d9)],Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x4d9)]=function(_0x418549){const _0x7b6d4=_0x32e60b;let _0xc720c5=VisuMZ[_0x7b6d4(0x565)][_0x7b6d4(0x192)][_0x7b6d4(0x2d2)](this,_0x418549);return _0xc720c5['x']=Math[_0x7b6d4(0x474)](_0xc720c5['x']),_0xc720c5['y']=Math[_0x7b6d4(0x474)](_0xc720c5['y']),_0xc720c5[_0x7b6d4(0x36c)]=Math[_0x7b6d4(0x474)](_0xc720c5['width']),_0xc720c5[_0x7b6d4(0x32b)]=Math[_0x7b6d4(0x474)](_0xc720c5[_0x7b6d4(0x32b)]),_0xc720c5;},VisuMZ[_0x32e60b(0x565)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x32e60b(0x303)]['drawActorSimpleStatus'],Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x262)]=function(_0x4ea2da,_0x3d77d1,_0x20b483){const _0x1ac73d=_0x32e60b;_0x3d77d1=Math[_0x1ac73d(0x474)](_0x3d77d1),_0x20b483=Math[_0x1ac73d(0x474)](_0x20b483),VisuMZ[_0x1ac73d(0x565)][_0x1ac73d(0x731)][_0x1ac73d(0x2d2)](this,_0x4ea2da,_0x3d77d1,_0x20b483);},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x710)]=function(){const _0x1883a7=_0x32e60b;this[_0x1883a7(0x2cf)]={'duration':0x0,'wholeDuration':0x0,'type':_0x1883a7(0x78f),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x1883a7(0x820)]['x'],'targetScaleY':this[_0x1883a7(0x820)]['y'],'targetOpacity':this[_0x1883a7(0x1b8)],'targetBackOpacity':this[_0x1883a7(0x55b)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x32e60b(0x303)]['updateCoreEasing']=function(){const _0x37d585=_0x32e60b;if(!this[_0x37d585(0x2cf)])return;if(this[_0x37d585(0x2cf)]['duration']<=0x0)return;this['x']=this[_0x37d585(0x7c4)](this['x'],this[_0x37d585(0x2cf)][_0x37d585(0x790)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x37d585(0x2cf)][_0x37d585(0x2a9)]),this[_0x37d585(0x820)]['x']=this[_0x37d585(0x7c4)](this[_0x37d585(0x820)]['x'],this[_0x37d585(0x2cf)][_0x37d585(0x3c8)]),this[_0x37d585(0x820)]['y']=this['applyCoreEasing'](this['scale']['y'],this[_0x37d585(0x2cf)][_0x37d585(0x171)]),this[_0x37d585(0x1b8)]=this[_0x37d585(0x7c4)](this[_0x37d585(0x1b8)],this[_0x37d585(0x2cf)][_0x37d585(0x1eb)]),this['backOpacity']=this[_0x37d585(0x7c4)](this['backOpacity'],this[_0x37d585(0x2cf)]['targetBackOpacity']),this['contentsOpacity']=this[_0x37d585(0x7c4)](this[_0x37d585(0x5a9)],this[_0x37d585(0x2cf)]['targetContentsOpacity']),this['_coreEasing'][_0x37d585(0x592)]--;},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x7c4)]=function(_0x3b22bb,_0x155191){const _0x22f2aa=_0x32e60b;if(!this[_0x22f2aa(0x2cf)])return _0x155191;const _0x4306af=this[_0x22f2aa(0x2cf)][_0x22f2aa(0x592)],_0xc95398=this[_0x22f2aa(0x2cf)][_0x22f2aa(0x156)],_0x3554df=this[_0x22f2aa(0x382)]((_0xc95398-_0x4306af)/_0xc95398),_0x24df57=this[_0x22f2aa(0x382)]((_0xc95398-_0x4306af+0x1)/_0xc95398),_0x469f65=(_0x3b22bb-_0x155191*_0x3554df)/(0x1-_0x3554df);return _0x469f65+(_0x155191-_0x469f65)*_0x24df57;},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x382)]=function(_0x19e765){const _0x26dfbc=_0x32e60b;if(!this[_0x26dfbc(0x2cf)])return _0x19e765;return VisuMZ[_0x26dfbc(0x313)](_0x19e765,this[_0x26dfbc(0x2cf)][_0x26dfbc(0x5f0)]||'LINEAR');},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x2f9)]=function(_0x22633f,_0x768781){const _0x2cfbaf=_0x32e60b;if(!this[_0x2cfbaf(0x2cf)])return;this['x']=this[_0x2cfbaf(0x2cf)]['targetX'],this['y']=this[_0x2cfbaf(0x2cf)][_0x2cfbaf(0x2a9)],this['scale']['x']=this[_0x2cfbaf(0x2cf)]['targetScaleX'],this[_0x2cfbaf(0x820)]['y']=this['_coreEasing'][_0x2cfbaf(0x171)],this[_0x2cfbaf(0x1b8)]=this['_coreEasing']['targetOpacity'],this[_0x2cfbaf(0x55b)]=this[_0x2cfbaf(0x2cf)][_0x2cfbaf(0x776)],this[_0x2cfbaf(0x5a9)]=this[_0x2cfbaf(0x2cf)][_0x2cfbaf(0x68d)],this['setupCoreEasing'](_0x22633f,_0x768781,this['x'],this['y'],this[_0x2cfbaf(0x820)]['x'],this[_0x2cfbaf(0x820)]['y'],this[_0x2cfbaf(0x1b8)],this[_0x2cfbaf(0x55b)],this[_0x2cfbaf(0x5a9)]);},Window_Base['prototype'][_0x32e60b(0x680)]=function(_0x207945,_0x3395e0,_0x24453b,_0x9ad66e,_0x4fb78c,_0x296095,_0x413821,_0x592795,_0xcf513f){this['_coreEasing']={'duration':_0x207945,'wholeDuration':_0x207945,'type':_0x3395e0,'targetX':_0x24453b,'targetY':_0x9ad66e,'targetScaleX':_0x4fb78c,'targetScaleY':_0x296095,'targetOpacity':_0x413821,'targetBackOpacity':_0x592795,'targetContentsOpacity':_0xcf513f};},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x24c)]=function(_0x50a270,_0x2374fd,_0x24521e,_0x483563,_0x2315c7){const _0x562c51=_0x32e60b;this[_0x562c51(0x350)](),this[_0x562c51(0x6eb)]['fontSize']=VisuMZ[_0x562c51(0x565)][_0x562c51(0x1e6)][_0x562c51(0x344)][_0x562c51(0x3ec)];const _0x10aaa6=VisuMZ[_0x562c51(0x565)][_0x562c51(0x1e6)][_0x562c51(0x344)][_0x562c51(0x196)];if(_0x10aaa6>0x0&&_0x2374fd===TextManager[_0x562c51(0x4b6)]){const _0x4fd833=_0x483563+(this[_0x562c51(0x823)]()-ImageManager[_0x562c51(0x735)])/0x2;this[_0x562c51(0x334)](_0x10aaa6,_0x24521e+(_0x2315c7-ImageManager[_0x562c51(0x3fb)]),_0x4fd833),_0x2315c7-=ImageManager['iconWidth']+0x4;}else this[_0x562c51(0x2a8)](ColorManager['systemColor']()),this['drawText'](_0x2374fd,_0x24521e,_0x483563,_0x2315c7,_0x562c51(0x19e)),_0x2315c7-=this[_0x562c51(0x1b2)](_0x2374fd)+0x6;this[_0x562c51(0x7c5)]();const _0x3187c8=this[_0x562c51(0x1b2)](this[_0x562c51(0x3ab)]?VisuMZ[_0x562c51(0x405)](_0x50a270):_0x50a270);_0x3187c8>_0x2315c7?this[_0x562c51(0x7fe)](VisuMZ['CoreEngine'][_0x562c51(0x1e6)][_0x562c51(0x344)][_0x562c51(0x72b)],_0x24521e,_0x483563,_0x2315c7,_0x562c51(0x19e)):this[_0x562c51(0x7fe)](_0x50a270,_0x24521e,_0x483563,_0x2315c7,_0x562c51(0x19e)),this['resetFontSettings']();},Window_Base['prototype'][_0x32e60b(0x730)]=function(_0x3a9612,_0x3551a7,_0x7d9658,_0x2a891c,_0x293fde){const _0x440419=_0x32e60b,_0x3293fa=ImageManager[_0x440419(0x852)]('IconSet'),_0x2e7111=ImageManager[_0x440419(0x3fb)],_0x2522a2=ImageManager[_0x440419(0x735)],_0x5afbbd=_0x3a9612%0x10*_0x2e7111,_0x3a3398=Math['floor'](_0x3a9612/0x10)*_0x2522a2,_0x5026af=_0x2a891c,_0x39d515=_0x2a891c;this[_0x440419(0x6eb)]['_context'][_0x440419(0x584)]=_0x293fde,this[_0x440419(0x6eb)][_0x440419(0x7d6)](_0x3293fa,_0x5afbbd,_0x3a3398,_0x2e7111,_0x2522a2,_0x3551a7,_0x7d9658,_0x5026af,_0x39d515),this[_0x440419(0x6eb)]['_context'][_0x440419(0x584)]=!![];},Window_Base['prototype'][_0x32e60b(0x5f9)]=function(_0x27875b,_0x14c75a,_0x4cf044,_0x27efc3,_0x3ba78a,_0x5efed4){const _0x109678=_0x32e60b,_0x16795a=Math[_0x109678(0x338)]((_0x4cf044-0x2)*_0x27efc3),_0x24f561=Sprite_Gauge[_0x109678(0x303)][_0x109678(0x7bf)][_0x109678(0x2d2)](this),_0x523435=_0x14c75a+this['lineHeight']()-_0x24f561-0x2;this[_0x109678(0x6eb)][_0x109678(0x5a3)](_0x27875b,_0x523435,_0x4cf044,_0x24f561,ColorManager[_0x109678(0x7b6)]()),this['contents'][_0x109678(0x267)](_0x27875b+0x1,_0x523435+0x1,_0x16795a,_0x24f561-0x2,_0x3ba78a,_0x5efed4);},Window_Scrollable[_0x32e60b(0x57d)]={'enabled':VisuMZ['CoreEngine'][_0x32e60b(0x1e6)][_0x32e60b(0x365)]['ShowScrollBar']??!![],'thickness':VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x365)][_0x32e60b(0x6ab)]??0x2,'offset':VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)]['Window'][_0x32e60b(0x505)]??0x2,'bodyColor':VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x365)][_0x32e60b(0x1af)]??0x0,'offColor':VisuMZ[_0x32e60b(0x565)]['Settings'][_0x32e60b(0x365)]['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x365)][_0x32e60b(0x3fd)]??0x80},Window_Base['prototype'][_0x32e60b(0x66d)]=function(){const _0x3d2d8b=_0x32e60b;return Window_Scrollable[_0x3d2d8b(0x57d)][_0x3d2d8b(0x2cb)]&&Window_Scrollable[_0x3d2d8b(0x57d)][_0x3d2d8b(0x557)]>0x0;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x80f)]=Window_Base[_0x32e60b(0x303)][_0x32e60b(0x737)],Window_Base[_0x32e60b(0x303)][_0x32e60b(0x737)]=function(){const _0x14f737=_0x32e60b;VisuMZ[_0x14f737(0x565)][_0x14f737(0x80f)][_0x14f737(0x2d2)](this),this[_0x14f737(0x2e8)](),this['setupScrollBarBitmap'](!![]),this[_0x14f737(0x345)](![]);},Window_Base['prototype']['createScrollBarSprites']=function(){const _0x1fc721=_0x32e60b;if(!this[_0x1fc721(0x66d)]())return;if(this[_0x1fc721(0x44a)]||this[_0x1fc721(0x3dd)])return;this[_0x1fc721(0x7e0)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x1fc721(0x3dd)]=new Sprite(),this['addChild'](this[_0x1fc721(0x44a)]),this[_0x1fc721(0x6b4)](this[_0x1fc721(0x3dd)]);},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x345)]=function(_0x366247){const _0x12725e=_0x32e60b,_0x132f58=_0x366247?this[_0x12725e(0x44a)]:this[_0x12725e(0x3dd)];if(!_0x132f58)return;const _0x2dfb1d=Window_Scrollable[_0x12725e(0x57d)],_0x33a4ce=_0x2dfb1d[_0x12725e(0x557)],_0x329a6c=_0x366247?this[_0x12725e(0x2dd)]-_0x33a4ce*0x2:_0x33a4ce,_0x3d43c4=_0x366247?_0x33a4ce:this[_0x12725e(0x3eb)]-_0x33a4ce*0x2;_0x132f58['bitmap']=new Bitmap(_0x329a6c,_0x3d43c4),_0x132f58[_0x12725e(0x5b9)](0x0,0x0,_0x329a6c,_0x3d43c4),this['updateScrollBarPosition'](_0x366247);},VisuMZ['CoreEngine'][_0x32e60b(0x35e)]=Window_Base['prototype'][_0x32e60b(0x841)],Window_Base['prototype'][_0x32e60b(0x841)]=function(){const _0x2583c8=_0x32e60b;VisuMZ[_0x2583c8(0x565)]['Window_Base_destroyContents'][_0x2583c8(0x2d2)](this),this[_0x2583c8(0x796)]();},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x796)]=function(){const _0x351112=_0x32e60b,_0xaa5eac=[this['_scrollBarHorz'],this[_0x351112(0x3dd)]];for(const _0x33dbbb of _0xaa5eac){if(_0x33dbbb&&_0x33dbbb['bitmap'])_0x33dbbb['bitmap'][_0x351112(0x29d)]();}},VisuMZ[_0x32e60b(0x565)]['Window_Scrollable_update']=Window_Scrollable['prototype'][_0x32e60b(0x512)],Window_Scrollable[_0x32e60b(0x303)]['update']=function(){const _0x2c1878=_0x32e60b;VisuMZ['CoreEngine'][_0x2c1878(0x8c1)]['call'](this),this['updateScrollBars']();},Window_Scrollable['prototype'][_0x32e60b(0x4bf)]=function(){const _0x291dd3=_0x32e60b;this[_0x291dd3(0x126)](),this[_0x291dd3(0x6f8)](!![]),this[_0x291dd3(0x6f8)](![]),this[_0x291dd3(0x280)](!![]),this[_0x291dd3(0x280)](![]);},Window_Scrollable[_0x32e60b(0x303)][_0x32e60b(0x126)]=function(){const _0x22bcb6=_0x32e60b,_0x2a8e6c=[this[_0x22bcb6(0x44a)],this['_scrollBarVert']];for(const _0x51380e of _0x2a8e6c){_0x51380e&&(_0x51380e[_0x22bcb6(0x270)]=this[_0x22bcb6(0x66d)]()&&this[_0x22bcb6(0x6bf)]());}},Window_Scrollable[_0x32e60b(0x303)][_0x32e60b(0x6f8)]=function(_0x303816){const _0x5207f2=_0x32e60b;if(!this[_0x5207f2(0x7e0)])return;const _0x53fb7e=this['scrollbar'](_0x303816),_0x38248c=this[_0x5207f2(0x3c2)](_0x303816),_0x9a52b2=_0x303816?'horz':_0x5207f2(0x7fa),_0x141e3d=_0x303816?_0x5207f2(0x219):_0x5207f2(0x597);(this[_0x5207f2(0x7e0)][_0x9a52b2]!==_0x53fb7e||this[_0x5207f2(0x7e0)][_0x141e3d]!==_0x38248c)&&(this[_0x5207f2(0x7e0)][_0x9a52b2]=_0x53fb7e,this['_lastScrollBarValues'][_0x141e3d]=_0x38248c,this['refreshScrollBarBitmap'](_0x303816,_0x53fb7e,_0x38248c));},Window_Scrollable[_0x32e60b(0x303)][_0x32e60b(0x878)]=function(_0x50c4c1){const _0x23a4cb=_0x32e60b;if(this[_0x23a4cb(0x4ff)]!==undefined)return _0x50c4c1?this[_0x23a4cb(0x818)]():this[_0x23a4cb(0x2f1)]['y'];return _0x50c4c1?this['scrollX']():this[_0x23a4cb(0x5e5)]();},Window_Scrollable[_0x32e60b(0x303)]['maxScrollbar']=function(_0xbbc385){const _0x5c6d93=_0x32e60b;if(this[_0x5c6d93(0x4ff)]!==undefined)return _0xbbc385?this[_0x5c6d93(0x541)]():Math[_0x5c6d93(0x66c)](0x0,this[_0x5c6d93(0x4ff)]-this[_0x5c6d93(0x3eb)]);return _0xbbc385?this[_0x5c6d93(0x541)]():this[_0x5c6d93(0x3f9)]();},Window_Scrollable[_0x32e60b(0x303)][_0x32e60b(0x3b7)]=function(){const _0x2811b1=_0x32e60b;if(this[_0x2811b1(0x4ff)]!==undefined)return Math[_0x2811b1(0x66c)](0x0,this[_0x2811b1(0x4ff)]);return this[_0x2811b1(0x677)]();},Window_Scrollable['prototype'][_0x32e60b(0x5f8)]=function(_0x5d8e75,_0x5a397f,_0x515649){const _0x451fcc=_0x32e60b,_0xe24f8f=_0x5d8e75?this['_scrollBarHorz']:this['_scrollBarVert'];if(!_0xe24f8f)return;if(!_0xe24f8f[_0x451fcc(0x568)])return;const _0x41416c=_0xe24f8f['bitmap'];_0x41416c[_0x451fcc(0x22f)]();if(_0x515649<=0x0)return;const _0x43195d=_0x5d8e75?this[_0x451fcc(0x2dd)]/this[_0x451fcc(0x6aa)]():this[_0x451fcc(0x3eb)]/this[_0x451fcc(0x3b7)](),_0x19bef0=_0x5d8e75?Math[_0x451fcc(0x474)](_0x5a397f*_0x43195d):0x0,_0x35defb=_0x5d8e75?0x0:Math[_0x451fcc(0x474)](_0x5a397f*_0x43195d),_0x30198a=_0x5d8e75?Math[_0x451fcc(0x474)](_0x41416c[_0x451fcc(0x36c)]*_0x43195d):_0x41416c[_0x451fcc(0x36c)],_0x1a7a78=_0x5d8e75?_0x41416c[_0x451fcc(0x32b)]:Math[_0x451fcc(0x474)](_0x41416c[_0x451fcc(0x32b)]*_0x43195d),_0x479343=Window_Scrollable[_0x451fcc(0x57d)],_0x30d63a=ColorManager[_0x451fcc(0x75e)](_0x479343[_0x451fcc(0x75a)]),_0x228a61=ColorManager[_0x451fcc(0x75e)](_0x479343[_0x451fcc(0x81d)]),_0x93e08e=_0x479343[_0x451fcc(0x68f)];_0x41416c['paintOpacity']=_0x93e08e,_0x41416c[_0x451fcc(0x191)](_0x30d63a),_0x41416c[_0x451fcc(0x549)]=0xff,_0x41416c[_0x451fcc(0x5a3)](_0x19bef0,_0x35defb,_0x30198a,_0x1a7a78,_0x228a61);},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x280)]=function(_0x3a1b08){const _0x26da16=_0x32e60b,_0xb0380e=_0x3a1b08?this['_scrollBarHorz']:this[_0x26da16(0x3dd)];if(!_0xb0380e)return;const _0x3ea1f7=Window_Scrollable['SCROLLBAR'],_0x12f49b=_0x3ea1f7[_0x26da16(0x557)],_0x1ba86d=_0x3ea1f7['offset'];if(!_0xb0380e[_0x26da16(0x5d9)])return;_0xb0380e['x']=this[_0x26da16(0x849)]+(_0x3a1b08?_0x12f49b:this['innerWidth']+_0x1ba86d),_0xb0380e['y']=this[_0x26da16(0x849)]+(_0x3a1b08?this['innerHeight']+_0x1ba86d:_0x12f49b);},Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x297)]=function(_0x1b6c88){const _0x2a3e5b=_0x32e60b;let _0x5e8b7f=this[_0x2a3e5b(0x414)]();const _0x5dd42a=this['maxItems'](),_0x49aad0=this[_0x2a3e5b(0x558)]();if(this[_0x2a3e5b(0x385)]()&&(_0x5e8b7f<_0x5dd42a||_0x1b6c88&&_0x49aad0===0x1)){_0x5e8b7f+=_0x49aad0;if(_0x5e8b7f>=_0x5dd42a)_0x5e8b7f=_0x5dd42a-0x1;this[_0x2a3e5b(0x625)](_0x5e8b7f);}else!this['isUseModernControls']()&&((_0x5e8b7f<_0x5dd42a-_0x49aad0||_0x1b6c88&&_0x49aad0===0x1)&&this[_0x2a3e5b(0x625)]((_0x5e8b7f+_0x49aad0)%_0x5dd42a));},VisuMZ['CoreEngine'][_0x32e60b(0x799)]=Window_Selectable['prototype'][_0x32e60b(0x297)],Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x297)]=function(_0xd8186){const _0x42a891=_0x32e60b;this[_0x42a891(0x385)]()&&_0xd8186&&this['maxCols']()===0x1&&this[_0x42a891(0x414)]()===this[_0x42a891(0x3ae)]()-0x1?this[_0x42a891(0x625)](0x0):VisuMZ[_0x42a891(0x565)][_0x42a891(0x799)][_0x42a891(0x2d2)](this,_0xd8186);},Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x5fe)]=function(_0x36bdcf){const _0x5abadf=_0x32e60b;let _0x107bd1=Math[_0x5abadf(0x66c)](0x0,this['index']());const _0x5d0870=this[_0x5abadf(0x3ae)](),_0xc5a90f=this['maxCols']();if(this[_0x5abadf(0x385)]()&&_0x107bd1>0x0||_0x36bdcf&&_0xc5a90f===0x1){_0x107bd1-=_0xc5a90f;if(_0x107bd1<=0x0)_0x107bd1=0x0;this[_0x5abadf(0x625)](_0x107bd1);}else!this[_0x5abadf(0x385)]()&&((_0x107bd1>=_0xc5a90f||_0x36bdcf&&_0xc5a90f===0x1)&&this[_0x5abadf(0x625)]((_0x107bd1-_0xc5a90f+_0x5d0870)%_0x5d0870));},VisuMZ['CoreEngine'][_0x32e60b(0x7cb)]=Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x5fe)],Window_Selectable['prototype'][_0x32e60b(0x5fe)]=function(_0x5c63d5){const _0x201773=_0x32e60b;this[_0x201773(0x385)]()&&_0x5c63d5&&this[_0x201773(0x558)]()===0x1&&this[_0x201773(0x414)]()===0x0?this[_0x201773(0x625)](this[_0x201773(0x3ae)]()-0x1):VisuMZ[_0x201773(0x565)][_0x201773(0x7cb)][_0x201773(0x2d2)](this,_0x5c63d5);},Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x385)]=function(){const _0x3e8e37=_0x32e60b;return VisuMZ[_0x3e8e37(0x565)][_0x3e8e37(0x1e6)]['QoL'][_0x3e8e37(0x245)];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x47a)]=Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x7ea)],Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x7ea)]=function(){const _0x1fb3fb=_0x32e60b;this[_0x1fb3fb(0x385)]()?(this[_0x1fb3fb(0x4d1)](),this[_0x1fb3fb(0x1da)]()):VisuMZ[_0x1fb3fb(0x565)]['Window_Selectable_processCursorMove']['call'](this);},Window_Selectable['prototype'][_0x32e60b(0x50a)]=function(){return!![];},Window_Selectable['prototype'][_0x32e60b(0x4d1)]=function(){const _0x341785=_0x32e60b;if(this[_0x341785(0x2d0)]()){const _0x5b3778=this[_0x341785(0x414)]();Input[_0x341785(0x842)](_0x341785(0x7dc))&&(Input['isPressed']('shift')&&this[_0x341785(0x50a)]()?this[_0x341785(0x213)]():this[_0x341785(0x297)](Input[_0x341785(0x4e7)](_0x341785(0x7dc)))),Input[_0x341785(0x842)]('up')&&(Input[_0x341785(0x151)]('shift')&&this[_0x341785(0x50a)]()?this[_0x341785(0x7d0)]():this[_0x341785(0x5fe)](Input[_0x341785(0x4e7)]('up'))),Input[_0x341785(0x842)](_0x341785(0x19e))&&this[_0x341785(0x20d)](Input[_0x341785(0x4e7)](_0x341785(0x19e))),Input[_0x341785(0x842)](_0x341785(0x322))&&this[_0x341785(0x6e8)](Input[_0x341785(0x4e7)]('left')),!this[_0x341785(0x19c)](_0x341785(0x723))&&Input[_0x341785(0x842)]('pagedown')&&this[_0x341785(0x213)](),!this[_0x341785(0x19c)](_0x341785(0x702))&&Input[_0x341785(0x842)](_0x341785(0x702))&&this[_0x341785(0x7d0)](),this[_0x341785(0x414)]()!==_0x5b3778&&this[_0x341785(0x17a)]();}},Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x1da)]=function(){const _0xb8f28f=_0x32e60b;if(this[_0xb8f28f(0x2d0)]()){const _0x342674=this[_0xb8f28f(0x414)]();Input[_0xb8f28f(0x4e7)](_0xb8f28f(0x2a4))&&this[_0xb8f28f(0x625)](Math[_0xb8f28f(0x8bb)](this[_0xb8f28f(0x414)](),0x0)),Input[_0xb8f28f(0x4e7)](_0xb8f28f(0x8bf))&&this['smoothSelect'](Math['max'](this[_0xb8f28f(0x414)](),this[_0xb8f28f(0x3ae)]()-0x1)),this[_0xb8f28f(0x414)]()!==_0x342674&&this[_0xb8f28f(0x17a)]();}},VisuMZ[_0x32e60b(0x565)]['Window_Selectable_processTouch']=Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x825)],Window_Selectable['prototype'][_0x32e60b(0x825)]=function(){const _0x406c28=_0x32e60b;this[_0x406c28(0x385)]()?this[_0x406c28(0x526)]():VisuMZ['CoreEngine']['Window_Selectable_processTouch'][_0x406c28(0x2d2)](this);},Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x526)]=function(){const _0x135c0b=_0x32e60b;VisuMZ['CoreEngine']['Window_Selectable_processTouch'][_0x135c0b(0x2d2)](this);},Window_Selectable['prototype'][_0x32e60b(0x1c2)]=function(){const _0x1f4162=_0x32e60b;return VisuMZ[_0x1f4162(0x565)]['Settings'][_0x1f4162(0x365)][_0x1f4162(0x4e8)];},Window_Selectable[_0x32e60b(0x303)][_0x32e60b(0x500)]=function(){const _0x4d8360=_0x32e60b;return VisuMZ['CoreEngine'][_0x4d8360(0x1e6)]['Window'][_0x4d8360(0x6e6)];},Window_Selectable['prototype'][_0x32e60b(0x5cc)]=function(){const _0xe925d3=_0x32e60b;return Window_Scrollable[_0xe925d3(0x303)][_0xe925d3(0x5cc)][_0xe925d3(0x2d2)](this)+VisuMZ[_0xe925d3(0x565)][_0xe925d3(0x1e6)][_0xe925d3(0x365)]['ItemHeight'];;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x44e)]=Window_Selectable['prototype'][_0x32e60b(0x7ef)],Window_Selectable[_0x32e60b(0x303)]['drawBackgroundRect']=function(_0x22270c){const _0x3be881=_0x32e60b,_0x3dd35f=VisuMZ[_0x3be881(0x565)][_0x3be881(0x1e6)][_0x3be881(0x365)];if(_0x3dd35f[_0x3be881(0x861)]===![])return;_0x3dd35f[_0x3be881(0x470)]?_0x3dd35f[_0x3be881(0x470)]['call'](this,_0x22270c):VisuMZ[_0x3be881(0x565)][_0x3be881(0x44e)][_0x3be881(0x2d2)](this,_0x22270c);},VisuMZ[_0x32e60b(0x565)]['Window_Gold_refresh']=Window_Gold['prototype'][_0x32e60b(0x3a5)],Window_Gold[_0x32e60b(0x303)][_0x32e60b(0x3a5)]=function(){const _0x1b16ec=_0x32e60b;this[_0x1b16ec(0x3d6)]()?this[_0x1b16ec(0x891)]():VisuMZ[_0x1b16ec(0x565)][_0x1b16ec(0x29f)][_0x1b16ec(0x2d2)](this);},Window_Gold[_0x32e60b(0x303)][_0x32e60b(0x3d6)]=function(){const _0x1d15f2=_0x32e60b;if(TextManager[_0x1d15f2(0x4b6)]!==this['currencyUnit']())return![];return VisuMZ[_0x1d15f2(0x565)]['Settings'][_0x1d15f2(0x344)][_0x1d15f2(0x516)];},Window_Gold[_0x32e60b(0x303)][_0x32e60b(0x891)]=function(){const _0x5cc350=_0x32e60b;this[_0x5cc350(0x350)](),this[_0x5cc350(0x6eb)]['clear'](),this[_0x5cc350(0x6eb)]['fontSize']=VisuMZ['CoreEngine'][_0x5cc350(0x1e6)][_0x5cc350(0x344)]['GoldFontSize'];const _0x1be9b9=VisuMZ[_0x5cc350(0x565)][_0x5cc350(0x1e6)][_0x5cc350(0x344)][_0x5cc350(0x196)],_0x3289f4=this[_0x5cc350(0x56f)](0x0);if(_0x1be9b9>0x0){const _0x1e34f1=_0x3289f4['y']+(this[_0x5cc350(0x823)]()-ImageManager[_0x5cc350(0x735)])/0x2;this[_0x5cc350(0x334)](_0x1be9b9,_0x3289f4['x'],_0x1e34f1);const _0x93ccef=ImageManager['iconWidth']+0x4;_0x3289f4['x']+=_0x93ccef,_0x3289f4[_0x5cc350(0x36c)]-=_0x93ccef;}this[_0x5cc350(0x2a8)](ColorManager[_0x5cc350(0x389)]()),this[_0x5cc350(0x7fe)](this[_0x5cc350(0x4b6)](),_0x3289f4['x'],_0x3289f4['y'],_0x3289f4[_0x5cc350(0x36c)],_0x5cc350(0x322));const _0x216132=this['textWidth'](this[_0x5cc350(0x4b6)]())+0x6;;_0x3289f4['x']+=_0x216132,_0x3289f4[_0x5cc350(0x36c)]-=_0x216132,this[_0x5cc350(0x7c5)]();const _0x99f585=this[_0x5cc350(0x59c)](),_0x34e6bb=this['textWidth'](this[_0x5cc350(0x3ab)]?VisuMZ['GroupDigits'](this['value']()):this['value']());_0x34e6bb>_0x3289f4['width']?this[_0x5cc350(0x7fe)](VisuMZ[_0x5cc350(0x565)][_0x5cc350(0x1e6)]['Gold'][_0x5cc350(0x72b)],_0x3289f4['x'],_0x3289f4['y'],_0x3289f4[_0x5cc350(0x36c)],_0x5cc350(0x19e)):this[_0x5cc350(0x7fe)](this[_0x5cc350(0x59c)](),_0x3289f4['x'],_0x3289f4['y'],_0x3289f4[_0x5cc350(0x36c)],_0x5cc350(0x19e)),this[_0x5cc350(0x350)]();},Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x60a)]=function(_0x5508ee,_0xbf43df,_0x515e8c,_0x319ab9,_0x4076f1){const _0x4718b=_0x32e60b;_0x319ab9=String(_0x319ab9||'')[_0x4718b(0x58e)]();if(VisuMZ[_0x4718b(0x565)][_0x4718b(0x1e6)]['Param'][_0x4718b(0x760)]){const _0x32d44b=VisuMZ['GetParamIcon'](_0x319ab9);_0x4076f1?(this[_0x4718b(0x730)](_0x32d44b,_0x5508ee,_0xbf43df,this[_0x4718b(0x314)]()),_0x515e8c-=this[_0x4718b(0x314)]()+0x2,_0x5508ee+=this[_0x4718b(0x314)]()+0x2):(this[_0x4718b(0x334)](_0x32d44b,_0x5508ee+0x2,_0xbf43df+0x2),_0x515e8c-=ImageManager[_0x4718b(0x3fb)]+0x4,_0x5508ee+=ImageManager['iconWidth']+0x4);}const _0x25a511=TextManager[_0x4718b(0x787)](_0x319ab9);this[_0x4718b(0x350)](),this['changeTextColor'](ColorManager[_0x4718b(0x389)]()),_0x4076f1?(this[_0x4718b(0x6eb)][_0x4718b(0x69b)]=this[_0x4718b(0x674)](),this[_0x4718b(0x6eb)][_0x4718b(0x7fe)](_0x25a511,_0x5508ee,_0xbf43df,_0x515e8c,this[_0x4718b(0x314)](),_0x4718b(0x322))):this['drawText'](_0x25a511,_0x5508ee,_0xbf43df,_0x515e8c),this[_0x4718b(0x350)]();},Window_StatusBase['prototype'][_0x32e60b(0x674)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x6c9)]=function(_0x33193a,_0x13f817,_0x233989,_0x49da15){const _0x49be96=_0x32e60b;_0x49da15=_0x49da15||0xa8,this[_0x49be96(0x7c5)]();if(VisuMZ['CoreEngine'][_0x49be96(0x1e6)]['UI'][_0x49be96(0x81a)])this[_0x49be96(0x8af)](_0x33193a[_0x49be96(0x5b2)]()[_0x49be96(0x50d)],_0x13f817,_0x233989,_0x49da15);else{const _0x173be9=_0x33193a[_0x49be96(0x5b2)]()['name'][_0x49be96(0x1b6)](/\\I\[(\d+)\]/gi,'');this[_0x49be96(0x7fe)](_0x173be9,_0x13f817,_0x233989,_0x49da15);}},Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x29e)]=function(_0x5461bd,_0x193e16,_0x5994b8,_0x5b65a6){const _0x26e948=_0x32e60b;_0x5b65a6=_0x5b65a6||0x10e,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x26e948(0x1e6)]['UI'][_0x26e948(0x872)])this[_0x26e948(0x8af)](_0x5461bd[_0x26e948(0x204)](),_0x193e16,_0x5994b8,_0x5b65a6);else{const _0x564ff8=_0x5461bd['nickname']()[_0x26e948(0x1b6)](/\\I\[(\d+)\]/gi,'');this[_0x26e948(0x7fe)](_0x5461bd[_0x26e948(0x204)](),_0x193e16,_0x5994b8,_0x5b65a6);}},VisuMZ[_0x32e60b(0x565)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x176)],Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x176)]=function(_0x4bd673,_0x282610,_0x2b6ef1){const _0xfb10a3=_0x32e60b;if(VisuMZ[_0xfb10a3(0x565)][_0xfb10a3(0x1e6)][_0xfb10a3(0x621)]['ShowActorLevel']===![])return;if(this[_0xfb10a3(0x2bd)]())this[_0xfb10a3(0x5f7)](_0x4bd673,_0x282610,_0x2b6ef1);VisuMZ[_0xfb10a3(0x565)][_0xfb10a3(0x65b)][_0xfb10a3(0x2d2)](this,_0x4bd673,_0x282610,_0x2b6ef1);},Window_StatusBase[_0x32e60b(0x303)]['isExpGaugeDrawn']=function(){const _0x53badd=_0x32e60b;return VisuMZ[_0x53badd(0x565)]['Settings']['UI'][_0x53badd(0x1c9)];},Window_StatusBase[_0x32e60b(0x303)][_0x32e60b(0x5f7)]=function(_0x2c4735,_0x10caf7,_0x3c06b5){const _0x11269c=_0x32e60b;if(!_0x2c4735)return;if(!_0x2c4735[_0x11269c(0x7b1)]())return;const _0x4dfdee=0x80,_0x4b4483=_0x2c4735[_0x11269c(0x7ba)]();let _0x5eda87=ColorManager[_0x11269c(0x42d)](),_0x41a4b7=ColorManager[_0x11269c(0x80d)]();_0x4b4483>=0x1&&(_0x5eda87=ColorManager['maxLvGaugeColor1'](),_0x41a4b7=ColorManager[_0x11269c(0x5f5)]()),this[_0x11269c(0x5f9)](_0x10caf7,_0x3c06b5,_0x4dfdee,_0x4b4483,_0x5eda87,_0x41a4b7);},Window_EquipStatus[_0x32e60b(0x303)]['drawAllParams']=function(){const _0x52ee24=_0x32e60b;let _0x44fbdc=0x0;for(const _0x409764 of VisuMZ[_0x52ee24(0x565)][_0x52ee24(0x1e6)][_0x52ee24(0x621)]['DisplayedParams']){const _0x24d920=this[_0x52ee24(0x107)](),_0xe54c7b=this[_0x52ee24(0x3ff)](_0x44fbdc);this['drawItem'](_0x24d920,_0xe54c7b,_0x409764),_0x44fbdc++;}},Window_EquipStatus[_0x32e60b(0x303)][_0x32e60b(0x6b2)]=function(_0x42053c,_0x26b544,_0x176a84){const _0x149985=_0x32e60b,_0x2fd150=this[_0x149985(0x2e0)]()-this['itemPadding']()*0x2;this[_0x149985(0x60a)](_0x42053c,_0x26b544,_0x2fd150,_0x176a84,![]);},Window_EquipStatus['prototype'][_0x32e60b(0x64b)]=function(_0x39139c,_0x3393ab,_0x5b10b1){const _0x47ba79=_0x32e60b,_0x435d50=this[_0x47ba79(0x433)]();this['resetTextColor'](),this[_0x47ba79(0x7fe)](this['_actor'][_0x47ba79(0x6da)](_0x5b10b1,!![]),_0x39139c,_0x3393ab,_0x435d50,_0x47ba79(0x19e));},Window_EquipStatus[_0x32e60b(0x303)][_0x32e60b(0x7a6)]=function(_0x5436d8,_0x4a55f8){const _0x5f0b65=_0x32e60b,_0x1bc878=this['rightArrowWidth']();this['changeTextColor'](ColorManager[_0x5f0b65(0x389)]());const _0x1ca2f0=VisuMZ[_0x5f0b65(0x565)][_0x5f0b65(0x1e6)]['UI']['ParamArrow'];this[_0x5f0b65(0x7fe)](_0x1ca2f0,_0x5436d8,_0x4a55f8,_0x1bc878,_0x5f0b65(0x718));},Window_EquipStatus['prototype'][_0x32e60b(0x676)]=function(_0x1020ce,_0x51aa10,_0x4aaa0d){const _0x387909=_0x32e60b,_0x2cad7c=this['paramWidth'](),_0x42bd98=this[_0x387909(0x360)][_0x387909(0x6da)](_0x4aaa0d),_0x631755=_0x42bd98-this[_0x387909(0x6fd)][_0x387909(0x6da)](_0x4aaa0d);this[_0x387909(0x2a8)](ColorManager['paramchangeTextColor'](_0x631755)),this[_0x387909(0x7fe)](this[_0x387909(0x360)]['paramValueByName'](_0x4aaa0d,!![]),_0x1020ce,_0x51aa10,_0x2cad7c,_0x387909(0x19e));},VisuMZ['CoreEngine']['Window_EquipItem_isEnabled']=Window_EquipItem['prototype']['isEnabled'],Window_EquipItem[_0x32e60b(0x303)][_0x32e60b(0x135)]=function(_0x134f8a){const _0x4657de=_0x32e60b;return _0x134f8a&&this['_actor']?this['_actor'][_0x4657de(0x650)](_0x134f8a):VisuMZ[_0x4657de(0x565)][_0x4657de(0x455)][_0x4657de(0x2d2)](this,_0x134f8a);},Window_StatusParams[_0x32e60b(0x303)][_0x32e60b(0x3ae)]=function(){const _0x2de2a0=_0x32e60b;return VisuMZ[_0x2de2a0(0x565)][_0x2de2a0(0x1e6)][_0x2de2a0(0x621)][_0x2de2a0(0x27f)][_0x2de2a0(0x4e4)];},Window_StatusParams[_0x32e60b(0x303)][_0x32e60b(0x2a0)]=function(_0x844ada){const _0x331366=_0x32e60b,_0xdd3336=this[_0x331366(0x56f)](_0x844ada),_0x10e8bf=VisuMZ[_0x331366(0x565)][_0x331366(0x1e6)][_0x331366(0x621)]['DisplayedParams'][_0x844ada],_0x150873=TextManager[_0x331366(0x787)](_0x10e8bf),_0xc9fe62=this[_0x331366(0x6fd)]['paramValueByName'](_0x10e8bf,!![]);this[_0x331366(0x60a)](_0xdd3336['x'],_0xdd3336['y'],0xa0,_0x10e8bf,![]),this[_0x331366(0x7c5)](),this[_0x331366(0x7fe)](_0xc9fe62,_0xdd3336['x']+0xa0,_0xdd3336['y'],0x3c,_0x331366(0x19e));};function _0x1222(){const _0x2cabd3=['updateAnglePlus','trim','MAXHP','TextCodeNicknames','add','ActorRect','HIT','LineHeight','Sprite_Picture_loadBitmap','scrollbar','stop','Bitmap_drawCircle','enemy','drawTextTopAligned','GoldChange','actorWindowRect','Flat','ColorTPGauge1','onKeyDown','nw.gui','retrieveFauxAnimation','_repositioned','Game_Picture_angle','CommandList','xparamRate','padZero','_tileExtendSprites','LUK','context','maxTp','updatePointAnimations','PTB','F16','recoverAll','drawGoldItemStyle','_targetX','NUMPAD1','createWindowLayer','baseId','TitleCommandList','titles2','isPointAnimationPlaying','CTB','_numberWindow','requestFauxAnimation','INCUBIC','Sprite_destroy','QoL','mainAreaHeightSideButtonLayout','_startLoading','gameTitle','initialBattleSystem','X:\x20%1','_tileExtendTerrainTags','setEnemyAction','isGamepadConnected','_phase','pointY','clearCachedKeys','measureTextWidthNoRounding','setBackgroundType','destroyCoreEngineMarkedBitmaps','_commonEventLayers','7327960pVwDNC','drawTextEx','UpdatePictureCoordinates','Game_Map_setDisplayPos','MAXMP','Scene_Map_updateMain','isLoopHorizontal','keyboard','areButtonsOutsideMainUI','allTiles','characters','Finish','INBOUNCE','min','Unnamed','skillTypes','goto','end','WIN_OEM_CUSEL','Window_Scrollable_update','DurationPerChat','_stored_mpGaugeColor1','_animation','AnimationID','centerX','initCoreEngineScreenShake','XParamVocab3','dummyWindowRect','processKeyboardBackspace','_addShadow','framesPerChar','stencilFunc','initDigitGrouping','12XlFKZj','Sprite_Animation_processSoundTimings','_margin','resetBattleSystem','remove','Scene_Name_onInputOk','IconParam1','CategoryRect','Scene_Battle_createSpritesetFix','ZOOM','catchLoadError','_internalTextures','_currentBgm','itemPadding','TGR','blendFunc','initRotation','_scene','ForceNoPlayTest','drawGameSubtitle','description','hit','xparamPlus1','setupTileExtendTerrainTags','isEventTest','refreshActor','createCommandWindow','_paramPlus','buttonAssistOffset5','_targetAnchor','buttonAssistWindowRect','mapId','gainSilentTp','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','scaleSprite','DashToggleR','checkPlayerLocation','ARRAYFUNC','adjustSprite','_profileWindow','_number','process_VisuMZ_CoreEngine_Notetags','Upper\x20Left','contains','updateScrollBarVisibility','SParamVocab8','child_process','seVolume','_playtestF7Looping','mhp','Game_Map_scrollDown','_dimmerSprite','_mapY','substring','picture','Game_Interpreter_command111','pitch','BTestItems','startAutoNewGame','isEnabled','_stored_deathColor','_realScale','Color','loadTileset','HYPHEN_MINUS','isInstanceOfSceneMap','SwitchRandomizeOne','constructor','pictureButtons','WIN_OEM_RESET','AccuracyBoost','_iconIndex','BattleManager_update','isMapScrollLinked','DataManager_setupNewGame','setActionState','_cache','selectLast','getCoreEngineScreenShakeStyle','ctrlKey','Window_refreshBack','getKeyboardInputButtonString','areButtonsHidden','flush','gold','outbounce','DamageColor','isPressed','VisuMZ_2_BattleSystemPTB','axes','HASH','NoTileShadows','wholeDuration','Bitmap_initialize','_tile','PAUSE','setCoreEngineScreenShakeStyle','_actorWindow','MCR','processTimingData','loadMapData','Graphics_centerElement','adjustY','toLocaleString','VisuMZ_2_BattleSystemBTB','PictureShowIcon','AGI','paramPlusJS','%1:\x20Exit\x20','IconParam6','default','FontShadows','_helpWindow','_lastOrigin','showDevTools','Window_Base_drawText','removeTileExtendSprites','isBusy','requestMotion','targetScaleY','DATABASE','EVA','QUOTE','menu','drawActorLevel','makeActionList','%1/','WIN_OEM_FJ_ROYA','playCursorSound','WIN_OEM_FJ_JISHO','keypress','checkSubstitute','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','<%1\x20%2:[\x20]','createTileExtendSprites','_inputString','currentValue','IconParam0','Game_Action_numRepeats','_target','setup','_destroyCanvas','shouldAutosave','IconSParam9','and\x20add\x20it\x20onto\x20this\x20one.','outlineColor','mainAreaTopSideButtonLayout','goldWindowRect','xparamFlat2','PictureFilename','setTargetAnchor','fillAll','Window_Selectable_itemRect','ExportCurTroopText','INSINE','ColorManager_loadWindowskin','GoldIcon','getLastPluginCommandInterpreter','_makeFontNameText','BattleManager_invokeCounterAttack','ColorPowerUp','RIGHT','isHandled','drawCharacter','right','updatePictureCoordinates','setGuard','EditRect','_dummyWindow','XParamVocab5','Sprite_Gauge_currentValue','PictureID','clearRect','IDs','makeDocumentTitle','_subject','VOLUME_MUTE','SCALE_MODES','_mapX','levelUp','createTextState','BarBodyColor','reserveNewGameCommonEvent','makeEncounterCount','textWidth','_origin','updateTransform','KeyTAB','replace','SParamVocab3','opacity','events','BlendMode','_targetScaleY','MvAnimationRate','removeOnceParallelInterpreter','setBackgroundOpacity','getInputMultiButtonStrings','Name','LevelUpFullMp','colSpacing','reduce','INQUAD','advanced','centerSprite','split','nah','LvExpGauge','EQUAL','start','pow','processKeyboardDelete','ExtractStrFromTroop','_offsetX','setMoveEasingType','pop','SPACE','EXECUTE','ActorMPColor','createMenuButton','refreshSpritesetForExtendedTiles','INOUTELASTIC','SceneManager_exit','〘Common\x20Event\x20%1:\x20%2〙\x20End','processCursorHomeEndTrigger','OUTCIRC','EXSEL','Game_Action_setAttack','WIN_OEM_FINISH','》Comment《\x0a%1\x0a','status','loadWindowskin','NUMPAD4','_slotWindow','_anchor','playTestShiftR','Settings','Bitmap_clearRect','Game_Map_setup','profileWindowRect','buttonAssistKey%1','targetOpacity','active','MaxDuration','invokeCounterAttack','setupCustomRateCoreEngine','_inputWindow','Page','Input_shouldPreventDefault','Scene_Map_updateScene','buttonAssistText4','drawCircle','_playTestFastMode','Map%1','SUBTRACT','maxVisibleItems','paramBaseAboveLevel99','startShake','_targetY','_pagedownButton','process_VisuMZ_CoreEngine_jsQuickFunctions','createBuffer','_goldWindow','paramFlat','SystemLoadImages','ImprovedAccuracySystem','nickname','inbounce','_backSprite2','Map%1.json','paramMaxJS','PositionY','IconXParam6','Mirror','stencilOp','cursorRight','volume','dropItems','OpenURL','AnimationPoint','initButtonHidden','cursorPagedown','statusEquipWindowRect','ItemRect','IconXParam0','ControllerMatches','consumeItem','maxHorz','code','textSizeEx','strokeRect','EnableJS','_shakePower','_optionsWindow','catchException','Window_SkillList_includes','_scrollDuration','_customModified','EndingID','areTileShadowsHidden','ExportStrFromAllMaps','ONE','pan','XParamVocab7','reservePlayTestNewGameCommonEvent','clearStencil','ShiftT_Toggle','Bitmap_resize','gainItem','clear','Window_NameInput_processTouch','movePageButtonSideButtonLayout','ENTER_SPECIAL','processKeyboardDigitChange','WIN_OEM_WSCTRL','send','updateCurrentEvent','playOnceParallelInterpreter','textBaseline','ItemMenu','createKeyJS','enableDigitGrouping','PIPE','DisplayLockX','Show\x20Scrolling\x20Text\x20Script\x20Error','buttonAssistKey5','maxGold','_isButtonHidden','ItemBgType','FontWidthFix','DigitGroupingGaugeSprites','ModernControls','data/','tpColor','level','targetObjects','_commandList','PositionJS','drawCurrencyValue','WIN_OEM_FJ_TOUROKU','IconSParam8','ColorCTGauge2','ColorMPGauge2','OkText','isPlaytest','Scene_Boot_updateDocumentTitle','2729452iKXKPC','_animationSprites','sv_actors','updateCoreEasing','XParameterFormula','ExportCurMapText','NUMPAD0','addOnceParallelInterpreter','crisisColor','clearZoom','PERCENT','Input_setupEventHandlers','([\x5c+\x5c-]\x5cd+)([%％])>','MinDuration','drawActorSimpleStatus','_previousClass','useDigitGrouping','redraw','ConvertNumberToString','gradientFillRect','initMembers','Smooth','horizontal','ShowButtons','CEV','TargetAngle','KANA','inputWindowRect','visible','isLoopVertical','up2','Plus','catchUnknownError','Scene_Shop_create','tilesetFlags','IconParam3','processPointAnimationRequests','Window_Base_drawFace','openingSpeed','OpenConsole','powerUpColor','_action','BACKSPACE','DisplayedParams','updateScrollBarPosition','buttonAreaHeight','TRG','Scene_Map_createSpritesetFix','applyEasingAnglePlus','Scene_Item_create','removeAnimationFromContainer','exec','WIN_OEM_CLEAR','isCollidedWithEvents','Scene_Load','SellRect','parse','getControllerInputButtonMatch','processAlwaysEscape','windowPadding','Scene_Base_terminateAnimationClearBugFix','createPointAnimation','ColorHPGauge2','isBottomHelpMode','_defaultStretchMode','ItemBackColor2','ParamMax','cursorDown','createCancelButton','INBACK','Spriteset_Battle_createEnemies','ActorHPColor','sceneTerminationClearEffects','destroy','drawActorNickname','Window_Gold_refresh','drawItem','subject','BackOpacity','DetachMapPictureContainer','home','Total','_statusWindow','Bitmap_gradientFillRect','changeTextColor','targetY','createCustomBackgroundImages','_onKeyDown','_digitGroupingEx','src','setupButtonImage','listWindowRect','dimColor2','updateData','vertJS','NUMPAD6','IconParam7','subjectHitRate','bgsVolume','ActorBgType','CrisisRate','DetachBattlePictureContainer','windowRect','isAnimationOffsetXMirrored','_hp','isExpGaugeDrawn','isSpecialCode','animations','markCoreEngineModified','sparam','drawFace','Game_Interpreter_PluginCommand','setMainFontSize','Scene_Boot_startNormalGame','Window_NumberInput_processDigitChange','BgFilename2','addLoadListener','xparamFlatJS','deselect','enabled','checkSmartEventCollision','onEscapeSuccess','parameters','_coreEasing','isCursorMovable','usableSkills','call','processEscape','AudioChangeBgmPan','createDimmerSprite','ParseAllNotetags','processFauxAnimationRequests','_coreEngineShakeStyle','Game_Picture_scaleX','quit','helpAreaBottom','#%1','innerWidth','Spriteset_Base_update','ALT','paramX','SEPARATOR','Window_Base_drawCharacter','backgroundBitmap','Scene_Battle_createSpriteset_detach','setActorHome','MRF','join','createScrollBarSprites','skillId','IconSParam0','isClosed','_balloonQueue','createCustomParameter','helpAreaTopSideButtonLayout','_buyWindow','playCursor','origin','scaleX','DocumentTitleFmt','alwaysDash','enemies','ExportAllTroopText','EscapeAlways','AllMaps','anchorCoreEasing','Game_System_initialize','animationShouldMirror','UNDERSCORE','guardSkillId','Window_NameInput_initialize','worldTransform','moveMenuButtonSideButtonLayout','openURL','xparamFlatBonus','prototype','PDR','maxBattleMembers','createChildSprite','RepositionEnemies','animationNextDelay','\x5c}❪SHIFT❫\x5c{','_itemWindow','adjustPictureAntiZoom','dimColor1','_opening','SideView','createFauxAnimationQueue','findSymbol','Spriteset_Base_updatePosition','alpha','ApplyEasing','gaugeLineHeight','system','Game_Picture_initRotation','numActions','NewGameBoot','createBackground','ListBgType','mainAreaBottom','MenuLayout','Input_update','setMute','Max','ENTER','SnapshotOpacity','left','_skillTypeWindow','TILDE','SkillMenu','updateFrame','_stored_expGaugeColor2','_displayY','DETACH_PICTURE_CONTAINER','NumberRect','height','ETB','LoadError','_saveFileID','baseTextRect','Scene_Boot_loadSystemImages','outlineColorGauge','_viewportSize','isNextScene','drawIcon','createTroopNote','DimColor1','drawValue','floor','KeyboardInput','BgType','ARRAYSTRUCT','deactivate','GoldMax','_cancelButton','_name','createExtendedTileSprite','sparamRate2','ESC','ParseItemNotetags','Gold','setupScrollBarBitmap','jsQuickFunc','_coreEasingType','Opacity','_targetOffsetX','globalAlpha','isAlive','maxLevel','Scene_MenuBase_createCancelButton','_targetOffsetY','RegExp','resetFontSettings','updatePositionCoreEngineShakeRand','repeat','Power','MULTIPLY','getTileExtendTerrainTags','_effectsContainer','_list','etypeId','isItem','VariableJsBlock','isNumpadPressed','_width','concat','Window_Base_destroyContents','create','_tempActor','paramRateJS','REC','itemBackColor1','_encounterCount','Window','ExtJS','createFauxAnimation','JUNJA','autoRemovalTiming','Game_Action_updateLastTarget','Untitled','width','getPointAnimationLayer','_stored_crisisColor','eva','MenuBg','valueOutlineColor','Skill-%1-%2','CustomParamIcons','_fauxAnimationQueue','_stored_powerUpColor','faceHeight','tileset','_windowskin','paramchangeTextColor','onButtonImageLoad','tileHeight','pixelated','WASD','_textQueue','_displayX','VariableEvalReference','maxLvGaugeColor1','calcCoreEasing','tilesets','_mp','isUseModernControls','targetSpritePosition','tpGaugeColor1','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','systemColor','Game_Event_start','_data','createSpriteset','IconSParam4','children','OnLoadJS','targets','vertical','_lastIconIndex','moveRelativeToResolutionChange','font-smooth','WIN_OEM_COPY','Manual','getCombinedScrollingText','addEventListener','updateFrameCoreEngine','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Window_MapName_refresh','toFixed','SplitEscape','NameMenu','SParamVocab9','Speed','ExportString','command122','addChildToBack','Game_Character_processMoveCommand','refresh','sparamPlus','boxWidth','consumable','getBackgroundOpacity','setAnglePlusData','_digitGrouping','open','Actor-%1-%2','maxItems','makeInputButtonString','down2','requestPointAnimation','startNormalGame','ProfileRect','switchModes','isOptionValid','ControllerButtons','scrollbarHeight','ParseArmorNotetags','Tilemap_addSpotTile','operand','processSoundTimings','win32','isSceneMap','DigitGroupingStandardText','PRINT','OUTQUART','updateDuration','maxScrollbar','Game_Troop_setup','endAction','charCode','focus','Game_Actor_levelUp','targetScaleX','Bitmap_measureTextWidth','command105','randomInt','windowOpacity','removeAnimation','StatusBgType','_forcedBattleGridSystem','bind','prepareNextScene','buttonAssistKey2','PictureEasingType','Window_NameInput_refresh','_timeDuration','isItemStyle','_stored_mpCostColor','Rate2','_patternHeight','Spriteset_Base_initialize','SellBgType','Scene_MenuBase_mainAreaHeight','_scrollBarVert','_lastY','updateDocumentTitle','ALWAYS','processHandling','isAutoColorAffected','eventsXyNt','measureText','_stored_expGaugeColor1','buttonAssistCancel','_addSpotTile','GRD','ADD','boxHeight','innerHeight','GoldFontSize','updatePictureSettings','_colorCache','Game_Map_scrollLeft','_targets','onlyfilename','IconSParam6','setHome','_battleField','Scene_Battle_update','statusParamsWindowRect','STB','F19','maxScrollY','horzJS','iconWidth','F24','OffBarOpacity','Scene_Battle_createCancelButton','paramY','number','_shouldPreventDefault','updateText','determineSideButtonLayoutValid','Sprite_StateIcon_updateFrame','GroupDigits','process_VisuMZ_CoreEngine_ControllerButtons','commandWindowRect','DEF','CommonEventID','_lastX','_createInternalTextures','HelpRect','isCancelled','Window_Base_drawIcon','result','updateBgsParameters','GoldBgType','TAB','Scene_Title','index','onInputOk','BTestAddedQuantity','setClickHandler','isRightInputMode','_commandWindow','drawGameVersion','test','string','PictureEraseAll','Window_NameInput_cursorPagedown','removeAllFauxAnimations','yScrollLinkedOffset','fadeSpeed','ShowJS','ButtonHeight','getCustomBackgroundSettings','pages','displayName','Scene_Base_terminate','buttonAssistKey3','sin','onload','Control\x20Variables\x20Script\x20Error','Scene_SingleLoadTransition','expGaugeColor1','format','StatusParamsBgType','indexOf','TranslucentOpacity','EXR','paramWidth','TRAIT_PARAM','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','ctGaugeColor2','skipBranch','_timerSprite','text%1','playBgs','INSERT','EnableNumberInput','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','learnings','TPB\x20ACTIVE','createSubSprite','playBuzzer','Sprite_Button_updateOpacity','outlineColorDmg','_stored_maxLvGaugeColor2','Pixelated','_tilemap','_buttonAssistWindow','exportAllMapStrings','ProfileBgType','_scrollBarHorz','statusWindowRect','bgm','getGamepads','Window_Selectable_drawBackgroundRect','Spriteset_Base_isAnimationPlaying','OUTEXPO','isTpb','_mode','onXhrError','CategoryBgType','Window_EquipItem_isEnabled','showIncompleteTilesetError','isEventRunning','adjustBoxSize','loadTitle1','_pictureContainer','SceneManager_onKeyDown','charAt','makeCoreEngineCommandList','changeClass','_image','_muteSound','select','isSideButtonLayout','F21','paramRate','_drawTextShadow','_url','IconSParam2','escape','displayX','Window_NameInput_cursorLeft','_pictureCoordinatesMode','Sprite_AnimationMV_updatePosition','Input_updateGamepadState','HRG','Scene_Status_create','DrawItemBackgroundJS','ParseClassNotetags','maxTurns','([\x5c+\x5c-]\x5cd+)>','round','_pointAnimationQueue','Game_BattlerBase_refresh','animationId','BlurFilter','F13','Window_Selectable_processCursorMove','buttonAssistWindowButtonRect','INOUTCIRC','_listWindow','uiAreaHeight','CustomParamAbb','DigitGroupingExText','faces','isTileExtended','GREATER_THAN','buttonAssistKey1','setDisplayPos','EditBgType','get','_menuButton','restore','mev','SParameterFormula','adjustX','buttonAssistOffset1','INOUTEXPO','ColorMaxLvGauge2','FTB','getColorDataFromPluginParameters','battlebacks2','_mapNameWindow','zoomScale','_isPlaytest','PA1','powerDownColor','AudioChangeBgsVolume','getParameter','levelUpRecovery','Sprite_Gauge_gaugeRate','Exported_Script_%1.txt','encounterStepsMinimum','SLEEP','damageColor','setValue','MDF','AdjustAngle','onerror','PictureRotateBy','rgba(0,\x200,\x200,\x200.7)','INOUTSINE','XParamVocab4','<JS\x20%1\x20%2:[\x20](.*)>','isArrowPressed','DOLLAR','HANJA','_shiftY','5272099fteZoH','clearOnceParallelInterpreters','_updateGamepadState','buttonAssistWindowSideRect','processKeyboardHandling','MAX_SAFE_INTEGER','loadSystemImages','ColorExpGauge2','itemHitImprovedAccuracy','currencyUnit','PictureRotate','applyForcedGameTroopSettingsCoreEngine','_onLoad','DELETE','WIN_ICO_CLEAR','runCombinedScrollingTextAsCode','WIN_OEM_JUMP','SParamVocab4','updateScrollBars','subtitle','checkCoreEngineDisplayCenter','COMMA','Troop%1','sparamPlus2','title','list','Window_Base_initialize','_battlerName','RepositionEnemies130','playTestShiftT','WIN_OEM_FJ_LOYA','SystemSetWindowPadding','BoxMargin','ParseSkillNotetags','〘Scrolling\x20Text〙\x0a','currentLevelExp','processCursorMoveModernControls','isAnimationPlaying','OUTCUBIC','setSize','ARRAYEVAL','_originalViewport','F6key','addCommand','itemRect','CommandRect','style','OPEN_BRACKET','itemHit','INEXPO','seek','PHA','STENCIL_TEST','Game_Interpreter_command105','_onceParallelInterpreters','length','doesNameContainBannedWords','sparamFlat2','isTriggered','ColSpacing','OUTELASTIC','version','Class-%1-%2','STR','createTitleButtons','ItemPadding','startAnimation','Sprite_AnimationMV_processTimingData','HelpBgType','EnableNameInput','SwitchToggleRange','ColorMPCost','dashToggle','hideButtonFromView','paramPlus','Armor-%1-%2','updatePositionCoreEngineShakeHorz','Game_Picture_calcEasing','initBasic','Wait','Sprite_StateIcon_loadBitmap','makeDeepCopy','_allTextHeight','rowSpacing','Scene_MenuBase_createPageButtons','initialLevel','Scene_MenuBase_mainAreaTop','_refreshPauseSign','BarOffset','randomJS','Basic','IconSet','OUTBACK','allowShiftScrolling','missed','ButtonAssist','name','isBottomButtonMode','PixelateImageRendering','buyWindowRect','show','update','cancelShowButton','NewGameCommonEvent','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','ItemStyle','_fauxAnimationSprites','ZERO','mainAreaHeight','Keyboard','application/json','Padding','checkPassage','setupBattleTestItems','Title','sparamRateJS','IconXParam5','printError','_forcedBattleSys','updateSmoothScroll','xparamPlus','processTouchModernControls','stringKeyMap','params','buttonAssistOffset%1','altKey','battlerHue','animationBaseDelay','forceOutOfPlaytest','filterArea','CancelText','6269808hyZYzu','setSideView','Flat2','tab','layeredTiles','_storedMapText','hide','_shakeSpeed','isMenuButtonAssistEnabled','IconXParam1','sv_enemies','buttonAssistOffset4','INELASTIC','Enemy','_hideTileShadows','menuShowButton','command357','maxScrollX','ALTGR','_bgmBuffer','CodeJS','xparamRate2','IconXParam3','updateWaitMode','canUse','paintOpacity','PGUP','%1%2','itemBackColor2','_sideButtonLayout','waiting','_offsetY','Chance','scrollUp','CustomParamType','tpGaugeColor2','isInputting','createJsQuickFunction','startMove','thickness','maxCols','NUMPAD8','BattleManager_checkSubstitute','backOpacity','SELECT','valueOutlineWidth','ImgLoad','onKeyDownKeysF6F7','GET','WIN_OEM_PA3','xScrollLinkedOffset','OutlineColor','INOUTQUAD','CoreEngine','centerCameraCheckData','drawGameTitle','bitmap','ATTN','HOME','_pauseSignSprite','%1〘End\x20Choice\x20Selection〙%1','numRepeats','mainAreaTop','itemLineRect','ShowDevTools','ParseEnemyNotetags','Game_Picture_initBasic','VIEWPORT','asin','Rate','CLOSE_BRACKET','GetParamIcon','updateClose','WindowLayer_render','setColorTone','_forcedTroopView','ParseStateNotetags','SCROLLBAR','updateEffekseer','log','MultiKeyFmt','FontSize','Scene_Map_shouldAutosave','isMagical','imageSmoothingEnabled','itemWindowRect','paramName','successRate','PositionX','Window_Base_createTextState','match','_stored_ctGaugeColor2','VisuMZ_2_BattleSystemCTB','writeFile','toUpperCase','OptionsMenu','_bgsBuffer','Actor','duration','SceneManager_initialize','_bypassCanCounterCheck','setupRate','battlebacks1','maxVert','ColorGaugeBack','NumberBgType','pos','XParamVocab8','value','isMaskingEnabled','PLUS','ONE_MINUS_SRC_ALPHA','calcEasing','bitmapHeight','updatePadding','fillRect','Subtitle','OPEN_PAREN','DisplayLockY','angle','DigitGroupingDamageSprites','contentsOpacity','MEV','measureTextWidth','TextManager_param','BattleManager_processEscape','Enemy-%1-%2','pointX','CLOSE_PAREN','xparamFlat1','currentClass','Origin','setTileFrame','EncounterRateMinimum','isSceneBattle','prepare','StartID','setFrame','playCancel','LevelUpFullHp','buttonAssistOk','updatePositionCoreEngineShakeVert','_logWindow','top','mainFontSize','_pictureCoordinatesWindow','DebugConsoleLastControllerID','Scene_MenuBase_helpAreaTop','Scene_Map_createSpriteset','removeChild','img/%1/','updateMain','executeLoad','bitmapWidth','loadTitle2','forceStencil','itemHeight','hpGaugeColor1','IconXParam9','needsUpdate','overrideMimeType','$dataMap','buttonAssistText5','note','processKeyboardEnd','_pictureName','keys','slice','buttonAssistText1','transform','parseForcedGameTroopSettingsCoreEngine','PictureCoordinatesMode','disable','Sprite_Picture_updateOrigin','close','updateOnceParallelInterpreters','helpAreaTop','VOLUME_UP','loadTileBitmap','ctGaugeColor1','sparamFlat1','scrollY','targetPosition','Scene_Menu_create','item','setLastPluginCommandInterpreter','WIN_OEM_PA2','_bitmap','return\x200','AnimationMirrorOffset','onDatabaseLoaded','Duration','type','_active','cos','removeAllPointAnimations','changeAnglePlusData','maxLvGaugeColor2','processKeyboardHome','drawActorExpGauge','refreshScrollBarBitmap','drawGauge','random','Input_onKeyDown','retrievePointAnimation','terminate','cursorUp','current','anglePlus','Window_NameInput_cursorRight','INOUTCUBIC','popScene','SHIFT','CNT','isAnimationForEach','initRotationCoreEngine','displayY','parallaxes','drawParamText','traitObjects','Graphics','StatusRect','Bitmap_fillRect','updateRotation','blockWidth','AudioChangeBgmPitch','playTestF6','_backSprite','_upArrowSprite','SkillTypeRect','loadPicture','OUTBOUNCE','process_VisuMZ_CoreEngine_RegExp','smooth','createPointAnimationSprite','DOUBLE_QUOTE','gaugeRate','Abbreviation','NUMPAD3','_textPopupWindow','5334270mKPSDX','Param','END','INCIRC','Game_Temp_initialize','smoothSelect','en-US','REPLACE','performMiss','Type','_CoreEngineSettings','Window_NumberInput_start','deflate','OTB','_shakeDuration','originalJS','VisuMZ_2_BattleSystemOTB','_cacheScaleY','move','Plus1','ParseTilesetNotetags','evaluate','storeMapData','setLastGamepadUsed','coreEngineRepositionEnemies','updateOpen','WIN_OEM_FJ_MASSHOU','_smooth','SEMICOLON','_lastCommandSymbol','DEFAULT_SHIFT_Y','command355','_baseSprite','Tilemap_addShadow','SystemSetFontSize','WIN_OEM_AUTO','setTopRow','CreateBattleSystemID','_screenY','AntiZoomPictures','NEAREST','StatusEquipBgType','isFauxAnimationPlaying','drawCurrentParam','_stored_hpGaugeColor1','Scene_Skill_create','resize','_duration','canEquip','_stored_maxLvGaugeColor1','onNameOk','Sprite_Actor_setActorHome','Game_Map_scrollUp','retreat','_startPlaying','reserveCommonEvent','scrollDown','playtestQuickLoad','Game_Party_consumeItem','Window_StatusBase_drawActorLevel','getButtonAssistLocation','Symbol','VisuMZ_4_UniqueTileEffects','SParamVocab1','_inputSpecialKeyCode','_stored_ctGaugeColor1','DummyRect','FDR','helpAreaHeight','textAlign','fillText','Scene_Map_initialize','KeySHIFT','IconSParam7','alignBottom','turn','max','isScrollBarVisible','updateAnchor','FontSmoothing','onActorChange','defaultInputMode','xparamPlus2','ScaleX','smallParamFontSize','FunctionName','drawNewParam','overallHeight','OptionsBgType','cancel','makeTargetSprites','F7key','shift','DTB','BTestWeapons','Flat1','setupCoreEasing','Icon','setupNewGame','DimColor2','scrollLeft','CustomParamNames','playMiss','OutlineColorGauge','CtrlQuickLoad','ceil','TextJS','Window_NameInput_processHandling','showPointAnimations','targetContentsOpacity','_spriteset','offOpacity','process_VisuMZ_CoreEngine_Settings','BTB','slotWindowRect','Scene_Options_create','repositionEnemiesByResolution','_tileSprite','_screenX','process_VisuMZ_CoreEngine_Functions','isFullDocumentTitle','Game_Interpreter_command355','isEnemy','fontSize','WIN_ICO_00','Bitmap_blt','commandWindowRows','setBattleSystem','ColorTPCost','TPB\x20WAIT','isSmartEventCollisionOn','_updateFilterArea','NON_FRAME','enable','SCROLL_LOCK','shake','_movementDuration','ListRect','overallWidth','BarThickness','enter','INOUTBOUNCE','gainGold','GoldRect','_lastPluginCommandInterpreter','setEasingType','drawParamName','getBattleSystem','addChild','buttonAssistText3','sqrt','Scene_Map_createSpriteset_detach','_editWindow','repositionCancelButtonSideButtonLayout','Match','_centerCameraCheck','Conditional\x20Branch\x20Script\x20Error','batch','MRG','isOpen','image-rendering','_troopId','filter','connected','save','loadBitmap','pendingColor','requiredWtypeId1','Input_pollGamepads','drawActorClass','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','traitsPi','TitlePicButtons','setSkill','sparamFlatBonus','updatePictureAntiZoom','button','wait','clearForcedGameTroopSettingsCoreEngine','endAnimation','IconSParam5','updateFauxAnimations','Scene_Base_create','members','RepositionActors','VisuMZ_2_BattleSystemSTB','paramValueByName','performEscape','makeAutoBattleActions','TextPopupShow','EQUALS','_backgroundSprite','FadeSpeed','ColorMPGauge1','setAction','CIRCUMFLEX','setupValueFont','ExtractStrFromList','RowSpacing','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','cursorLeft','fillStyle','centerY','contents','categoryWindowRect','Game_Picture_updateMove','isForFriend','_refreshBack','Linear','Bitmap_drawText','useDigitGroupingEx','IconSParam1','showPicture','1515141RMjUpS','StateIconsNonFrame','getInputButtonString','checkScrollBarBitmap','_isWindow','isNormalPriority','MDR','easingType','_actor','atbActive','initCoreEngine','SParamVocab6','Scene_Boot_onDatabaseLoaded','pageup','font','_pollGamepads','stypeId','Game_Action_itemHit','setCoreEngineUpdateWindowBg','map','Spriteset_Base_destroy','_stored_tpCostColor','Game_BattlerBase_initMembers','loadGameImagesCoreEngine','skillTypeWindowRect','App','makeCommandList','initCoreEasing','text','setCommonEvent','useFontWidthFix','updateMove','ACCEPT','getControllerInputButtonString','%1〘Choice\x20%2〙\x20%3%1','center','checkCacheKey','Scene_Base_createWindowLayer','createButtonAssistWindow','NUMPAD9','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','PreserveNumbers','Script\x20Call\x20Error','option','framesMax','abs','pagedown','push','updateLastTarget','_registerKeyInput','createAnimationSprite','_anglePlus','createPageButtons','getLastUsedGamepadType','GoldOverlap','Graphics_printError','isMVAnimation','itemSuccessRate','removeFauxAnimation','drawIconBySize','Window_StatusBase_drawActorSimpleStatus','paramMax','_pageupButton','ExtractStrFromMap','iconHeight','playOk','createContents','State-%1-%2','VisuMZ_1_OptionsCore','tpCostColor','CONVERT','(\x5cd+\x5c.?\x5cd+)>','pictures','_backSprite1','lastAnimationSprite','nextLevelExp','Window_Base_update','Game_Map_changeTileset','DIVIDE','Window_NameInput_cursorPageup','Window_TitleCommand_selectLast','Game_Actor_paramBase','optionsWindowRect','ParseActorNotetags','setHandler','removePointAnimation','Input_clear','itemEva','_gamepadWait','_onKeyPress','inBattle','CANCEL','F11','STRUCT','setAnchor','_eventId','ATK','Game_Screen_initialize','activate','StatusMenu','_centerElement','offColor','isPlaying','_height','XParamVocab2','getColor','offsetY','DrawIcons','ParseWeaponNotetags','onLoad','Scene_Unlisted','mute','\x0a\x0a\x0a\x0a\x0a','MAT','ExtDisplayedParams','key%1','GameEnd','isWindowMaskingEnabled','textColor','helpWindowRect','Game_Map_scrollRight','URL','BasicParameterFormula','Graphics_defaultStretchMode','platform','_clientArea','【%1】\x0a','_downArrowSprite','_showDevTools','targetBackOpacity','CommandBgType','playTestF7','backspace','AutoScrollLockX','defineProperty','isKeyItem','AudioChangeBgmVolume','numberShowButton','XParamVocab0','ColorCTGauge1','ConvertParams','Scene_Map_update','isGamepadTriggered','xparam','createPointAnimationTargets','attackSkillId','param','SwitchToggleOne','CLOSE_CURLY_BRACKET','isMaxLevel','Scene_Battle_createSpriteset','TCR','updateOpacity','keyCode','LINEAR','targetX','_statusEquipWindow','updateMotion','Game_Action_itemEva','initMembersCoreEngine','bgs','destroyScrollBarBitmaps','Game_Picture_show','IconXParam2','Window_Selectable_cursorDown','normal','render','IconXParam4','Game_Picture_scaleY','anchor','addAnimationSpriteToContainer','NUMPAD5','TimeProgress','openness','SETTINGS','ColorCrisis','OutlineColorDmg','drawRightArrow','〘Common\x20Event\x20%1:\x20%2〙\x20Start','ExportAllMapText','playBgm','buttonAssistText%1','LATIN1','EREOF','updatePositionCoreEngineShakeOriginal','80173gexcnM','_cacheScaleX','includes','isActor','createDigits','actor','Sprite_Battler_startMove','IconParam5','gaugeBackColor','setActorHomeRepositioned','QUESTION_MARK','Plus2','expRate','SideButtons','CommandWidth','F12','BgFilename1','gaugeHeight','_text','Window_NameInput_cursorUp','clamp','apply','applyCoreEasing','resetTextColor','RevertPreserveNumbers','setupCoreEngine','OpenSpeed','_setupEventHandlers','buttonY','Window_Selectable_cursorUp','_categoryWindow','VisuMZ_2_BattleSystemFTB','F18','setEvent','cursorPageup','_rate','OPEN_CURLY_BRACKET','_clickHandler','onInputBannedWords','processMoveCommand','blt','ColorPowerDown','applyEasing','toLowerCase','layoutSettings','INOUTQUINT','down','targetEvaRate','KeyItemProtect','changeTileset','_lastScrollBarValues','fromCharCode','registerCommand','Scene_Map_updateMainMultiply','CRI','Scene_MenuBase_createBackground','_storedStack','terms','updateBgmParameters','contentsBack','processCursorMove','scaleY','updatePosition','_index','createPointAnimationQueue','drawBackgroundRect','ScreenResolution','_pressed','loadBitmapCoreEngine','atypeId','_currentBgs','mpGaugeColor2','destroyed','IconXParam8','isGamepadButtonPressed','PictureEraseRange','vert','BattleSystem','isClosing','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawText','Game_Event_isCollidedWithEvents','textHeight','TextFmt','bgmVolume','_blank','_backgroundFilter','updateShadow','BlurStrength','process_VisuMZ_CoreEngine_CustomParameters','BKSP','Renderer','getLastGamepadUsed','Game_Actor_changeClass','OUTSINE','expGaugeColor2','pictureId','Window_Base_createContents','_texture','1.4.4','_srcBitmap','itypeId','integer','MAX_GL_TEXTURES','buttonAssistOffset2','RPGMAKER_VERSION','scrollX','_drawTextOutline','TextCodeClassNames','(\x5cd+)([%％])>','canAttack','bodyColor','AudioChangeBgsPitch','setViewportCoreEngineFix','scale','addWindow','SceneManager_isGameActive','lineHeight','ValueJS','processTouch','_hideButtons','rgba(0,\x200,\x200,\x201.0)','setViewport','initialize','scaleMode','command111','_lastGamepad','_scaleY','SParamVocab7','Bitmap_drawTextOutline','refreshWithTextCodeSupport','moveCancelButtonSideButtonLayout','KEEP','updateDashToggle','buttonAssistKey4','savefileInfo','paramBase','isNwjs','keyMapper','tilesetNames','Rate1','encounterStep','isOpening','Enable','Sprite_Animation_setViewport','translucentOpacity','Game_Interpreter_command122','destroyContents','isRepeated','saveViewport','createTilemap','ExportStrFromAllTroops','isPhysical','Bitmap_strokeRect','mirror','padding','target','KeyUnlisted','mpColor','\x5c}❪TAB❫\x5c{','exit','filters','_pointAnimationSprites','MapOnceParallel','loadSystem','%2%1%3','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','SkillTypeBgType','SubfolderParse','mmp','sparamFlatJS','ParamName','ButtonFadeSpeed','ScreenShake','isSideView','tileWidth','_currentMap','createTextPopupWindow','isOpenAndActive','ShowItemBackground','IconSParam3','_changingClass','erasePicture','NewGameCommonEventAll','setWindowPadding','isGamepadAxisMoved','F15','PRESERVCONVERSION(%1)','_maxDigits','SParamVocab0','Version','Game_Picture_x','jsonToZip'];_0x1222=function(){return _0x2cabd3;};return _0x1222();}if(VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x339)][_0x32e60b(0x4f2)]){VisuMZ['CoreEngine'][_0x32e60b(0x1e6)][_0x32e60b(0x339)]['QwertyLayout']&&(Window_NameInput[_0x32e60b(0x7ab)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x32e60b(0x1f1),'OK']);;VisuMZ[_0x32e60b(0x565)]['Window_NameInput_initialize']=Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x829)],Window_NameInput[_0x32e60b(0x303)]['initialize']=function(_0x208af4){const _0x492582=_0x32e60b;this[_0x492582(0x452)]=this[_0x492582(0x671)](),VisuMZ['CoreEngine'][_0x492582(0x2fe)][_0x492582(0x2d2)](this,_0x208af4),this['_mode']===_0x492582(0x168)?this[_0x492582(0x461)](0x0):(Input[_0x492582(0x22f)](),this[_0x492582(0x2ca)]());},Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x671)]=function(){const _0xeaf979=_0x32e60b;if(Input['isGamepadConnected']())return _0xeaf979(0x168);return VisuMZ[_0xeaf979(0x565)]['Settings']['KeyboardInput']['DefaultMode']||_0xeaf979(0x8b5);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x68b)]=Window_NameInput[_0x32e60b(0x303)]['processHandling'],Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x3e1)]=function(){const _0x418fd2=_0x32e60b;if(!this['isOpen']())return;if(!this[_0x418fd2(0x1ec)])return;if(this[_0x418fd2(0x452)]===_0x418fd2(0x8b5)&&Input[_0x418fd2(0x783)]())this['switchModes']('default');else{if(Input[_0x418fd2(0x2be)](_0x418fd2(0x779)))Input[_0x418fd2(0x22f)](),this['processBack']();else{if(Input['isTriggered'](_0x418fd2(0x533)))Input[_0x418fd2(0x22f)](),this['_mode']===_0x418fd2(0x8b5)?this['switchModes'](_0x418fd2(0x168)):this[_0x418fd2(0x3b4)](_0x418fd2(0x8b5));else{if(this[_0x418fd2(0x452)]==='keyboard')this['processKeyboardHandling']();else Input[_0x418fd2(0x2be)](_0x418fd2(0x468))?(Input[_0x418fd2(0x22f)](),this['switchModes'](_0x418fd2(0x8b5))):VisuMZ[_0x418fd2(0x565)][_0x418fd2(0x68b)][_0x418fd2(0x2d2)](this);}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput['prototype'][_0x32e60b(0x825)],Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x825)]=function(){const _0x127e38=_0x32e60b;if(!this[_0x127e38(0x860)]())return;if(this['_mode']===_0x127e38(0x8b5)){if(TouchInput['isTriggered']()&&this['isTouchedInsideFrame']())this[_0x127e38(0x3b4)](_0x127e38(0x168));else TouchInput[_0x127e38(0x40d)]()&&this[_0x127e38(0x3b4)](_0x127e38(0x168));}else VisuMZ[_0x127e38(0x565)][_0x127e38(0x230)][_0x127e38(0x2d2)](this);},Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x4b1)]=function(){const _0x45504f=_0x32e60b;if(Input[_0x45504f(0x2be)](_0x45504f(0x6ac)))Input[_0x45504f(0x22f)](),this[_0x45504f(0x652)]();else{if(Input[_0x45504f(0x181)]!==undefined){let _0xf270ee=Input[_0x45504f(0x181)],_0x38cdad=_0xf270ee[_0x45504f(0x4e4)];for(let _0x122497=0x0;_0x122497<_0x38cdad;++_0x122497){this[_0x45504f(0x6b8)][_0x45504f(0x873)](_0xf270ee[_0x122497])?SoundManager['playOk']():SoundManager['playBuzzer']();}Input[_0x45504f(0x22f)]();}}},Window_NameInput[_0x32e60b(0x303)]['switchModes']=function(_0x3af1fa){const _0x59f0fe=_0x32e60b;let _0x3492ca=this[_0x59f0fe(0x452)];this[_0x59f0fe(0x452)]=_0x3af1fa,_0x3492ca!==this['_mode']&&(this[_0x59f0fe(0x3a5)](),SoundManager['playOk'](),this[_0x59f0fe(0x452)]===_0x59f0fe(0x168)?this['select'](0x0):this[_0x59f0fe(0x461)](-0x1));},VisuMZ['CoreEngine']['Window_NameInput_cursorDown']=Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x297)],Window_NameInput[_0x32e60b(0x303)]['cursorDown']=function(_0x26d7f0){const _0x207718=_0x32e60b;if(this[_0x207718(0x452)]===_0x207718(0x8b5)&&!Input[_0x207718(0x4a9)]())return;if(Input[_0x207718(0x35b)]())return;VisuMZ[_0x207718(0x565)]['Window_NameInput_cursorDown'][_0x207718(0x2d2)](this,_0x26d7f0),this[_0x207718(0x3b4)]('default');},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x7c1)]=Window_NameInput['prototype'][_0x32e60b(0x5fe)],Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x5fe)]=function(_0x1ecc14){const _0x3f03ef=_0x32e60b;if(this[_0x3f03ef(0x452)]===_0x3f03ef(0x8b5)&&!Input['isArrowPressed']())return;if(Input[_0x3f03ef(0x35b)]())return;VisuMZ[_0x3f03ef(0x565)]['Window_NameInput_cursorUp'][_0x3f03ef(0x2d2)](this,_0x1ecc14),this[_0x3f03ef(0x3b4)](_0x3f03ef(0x168));},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x601)]=Window_NameInput[_0x32e60b(0x303)]['cursorRight'],Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x20d)]=function(_0x5f3291){const _0x624d4e=_0x32e60b;if(this[_0x624d4e(0x452)]==='keyboard'&&!Input[_0x624d4e(0x4a9)]())return;if(Input[_0x624d4e(0x35b)]())return;VisuMZ[_0x624d4e(0x565)][_0x624d4e(0x601)][_0x624d4e(0x2d2)](this,_0x5f3291),this[_0x624d4e(0x3b4)](_0x624d4e(0x168));},VisuMZ[_0x32e60b(0x565)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x6e8)],Window_NameInput[_0x32e60b(0x303)]['cursorLeft']=function(_0x49c346){const _0x18617a=_0x32e60b;if(this[_0x18617a(0x452)]===_0x18617a(0x8b5)&&!Input['isArrowPressed']())return;if(Input[_0x18617a(0x35b)]())return;VisuMZ[_0x18617a(0x565)][_0x18617a(0x46a)][_0x18617a(0x2d2)](this,_0x49c346),this[_0x18617a(0x3b4)](_0x18617a(0x168));},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x41e)]=Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x213)],Window_NameInput[_0x32e60b(0x303)]['cursorPagedown']=function(){const _0x2bfc4e=_0x32e60b;if(this['_mode']===_0x2bfc4e(0x8b5))return;if(Input[_0x2bfc4e(0x35b)]())return;VisuMZ[_0x2bfc4e(0x565)][_0x2bfc4e(0x41e)][_0x2bfc4e(0x2d2)](this),this[_0x2bfc4e(0x3b4)]('default');},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x744)]=Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x7d0)],Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x7d0)]=function(){const _0x38d8fa=_0x32e60b;if(this[_0x38d8fa(0x452)]===_0x38d8fa(0x8b5))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x38d8fa(0x565)][_0x38d8fa(0x744)][_0x38d8fa(0x2d2)](this),this[_0x38d8fa(0x3b4)](_0x38d8fa(0x168));},VisuMZ['CoreEngine'][_0x32e60b(0x3d4)]=Window_NameInput[_0x32e60b(0x303)][_0x32e60b(0x3a5)],Window_NameInput['prototype']['refresh']=function(){const _0x1b45b0=_0x32e60b;if(this[_0x1b45b0(0x452)]==='keyboard'){this[_0x1b45b0(0x6eb)][_0x1b45b0(0x22f)](),this[_0x1b45b0(0x7e9)]['clear'](),this[_0x1b45b0(0x7c5)]();let _0x34457f=VisuMZ[_0x1b45b0(0x565)][_0x1b45b0(0x1e6)][_0x1b45b0(0x339)]['NameInputMessage']['split']('\x0a'),_0x18583c=_0x34457f[_0x1b45b0(0x4e4)],_0x4c5043=(this[_0x1b45b0(0x3eb)]-_0x18583c*this[_0x1b45b0(0x823)]())/0x2;for(let _0x9dac07=0x0;_0x9dac07<_0x18583c;++_0x9dac07){let _0x792ecb=_0x34457f[_0x9dac07],_0x229b0a=this['textSizeEx'](_0x792ecb)['width'],_0x195ef6=Math[_0x1b45b0(0x338)]((this[_0x1b45b0(0x6eb)][_0x1b45b0(0x36c)]-_0x229b0a)/0x2);this['drawTextEx'](_0x792ecb,_0x195ef6,_0x4c5043),_0x4c5043+=this[_0x1b45b0(0x823)]();}}else VisuMZ[_0x1b45b0(0x565)][_0x1b45b0(0x3d4)]['call'](this);};};VisuMZ[_0x32e60b(0x565)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x32e60b(0x303)][_0x32e60b(0x135)],Window_ShopSell[_0x32e60b(0x303)][_0x32e60b(0x135)]=function(_0x2d1ed9){const _0x1eff62=_0x32e60b;return VisuMZ[_0x1eff62(0x565)]['Settings'][_0x1eff62(0x89e)][_0x1eff62(0x7de)]&&DataManager[_0x1eff62(0x77c)](_0x2d1ed9)?![]:VisuMZ[_0x1eff62(0x565)]['Window_ShopSell_isEnabled'][_0x1eff62(0x2d2)](this,_0x2d1ed9);},Window_NumberInput[_0x32e60b(0x303)][_0x32e60b(0x385)]=function(){return![];};VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x339)][_0x32e60b(0x43c)]&&(VisuMZ['CoreEngine'][_0x32e60b(0x62b)]=Window_NumberInput[_0x32e60b(0x303)][_0x32e60b(0x1cb)],Window_NumberInput[_0x32e60b(0x303)]['start']=function(){const _0xdec958=_0x32e60b;VisuMZ[_0xdec958(0x565)][_0xdec958(0x62b)][_0xdec958(0x2d2)](this),this[_0xdec958(0x461)](this[_0xdec958(0x86a)]-0x1),Input[_0xdec958(0x22f)]();},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x2c6)]=Window_NumberInput[_0x32e60b(0x303)]['processDigitChange'],Window_NumberInput[_0x32e60b(0x303)]['processDigitChange']=function(){const _0x35bbcc=_0x32e60b;if(!this['isOpenAndActive']())return;if(Input[_0x35bbcc(0x35b)]())this[_0x35bbcc(0x233)]();else{if(Input[_0x35bbcc(0x2be)]('backspace'))this[_0x35bbcc(0x8ca)]();else{if(Input[_0x35bbcc(0x660)]===0x2e)this[_0x35bbcc(0x1cd)]();else{if(Input[_0x35bbcc(0x660)]===0x24)this[_0x35bbcc(0x5f6)]();else Input['_inputSpecialKeyCode']===0x23?this['processKeyboardEnd']():VisuMZ['CoreEngine'][_0x35bbcc(0x2c6)][_0x35bbcc(0x2d2)](this);}}}},Window_NumberInput[_0x32e60b(0x303)][_0x32e60b(0x7ea)]=function(){const _0x3275a7=_0x32e60b;if(!this[_0x3275a7(0x2d0)]())return;Input['isNumpadPressed']()?this[_0x3275a7(0x233)]():Window_Selectable[_0x3275a7(0x303)][_0x3275a7(0x7ea)][_0x3275a7(0x2d2)](this);},Window_NumberInput['prototype']['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x32e60b(0x303)][_0x32e60b(0x233)]=function(){const _0x46d7da=_0x32e60b;if(String(this[_0x46d7da(0x122)])[_0x46d7da(0x4e4)]>=this[_0x46d7da(0x86a)])return;const _0x598cf5=Number(String(this[_0x46d7da(0x122)])+Input[_0x46d7da(0x181)]);if(isNaN(_0x598cf5))return;this[_0x46d7da(0x122)]=_0x598cf5;const _0x51eff7='9'[_0x46d7da(0x352)](this['_maxDigits']);this[_0x46d7da(0x122)]=this['_number']['clamp'](0x0,_0x51eff7),Input['clear'](),this[_0x46d7da(0x3a5)](),SoundManager['playCursor'](),this['select'](this[_0x46d7da(0x86a)]-0x1);},Window_NumberInput[_0x32e60b(0x303)]['processKeyboardBackspace']=function(){const _0x4bd478=_0x32e60b;this[_0x4bd478(0x122)]=Number(String(this['_number'])[_0x4bd478(0x5d7)](0x0,-0x1)),this[_0x4bd478(0x122)]=Math[_0x4bd478(0x66c)](0x0,this[_0x4bd478(0x122)]),Input['clear'](),this['refresh'](),SoundManager['playCursor'](),this[_0x4bd478(0x461)](this[_0x4bd478(0x86a)]-0x1);},Window_NumberInput['prototype'][_0x32e60b(0x1cd)]=function(){const _0x3e3976=_0x32e60b;this['_number']=Number(String(this[_0x3e3976(0x122)])[_0x3e3976(0x12f)](0x1)),this['_number']=Math[_0x3e3976(0x66c)](0x0,this[_0x3e3976(0x122)]),Input[_0x3e3976(0x22f)](),this[_0x3e3976(0x3a5)](),SoundManager[_0x3e3976(0x2f0)](),this[_0x3e3976(0x461)](this[_0x3e3976(0x86a)]-0x1);},Window_NumberInput[_0x32e60b(0x303)][_0x32e60b(0x5f6)]=function(){const _0x26da23=_0x32e60b;if(this['index']()===0x0)return;Input['clear'](),this['refresh'](),SoundManager[_0x26da23(0x2f0)](),this[_0x26da23(0x461)](0x0);},Window_NumberInput[_0x32e60b(0x303)][_0x32e60b(0x5d4)]=function(){const _0x18d526=_0x32e60b;if(this[_0x18d526(0x414)]()===this[_0x18d526(0x86a)]-0x1)return;Input[_0x18d526(0x22f)](),this['refresh'](),SoundManager[_0x18d526(0x2f0)](),this[_0x18d526(0x461)](this[_0x18d526(0x86a)]-0x1);});;VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x39b)]=Window_MapName['prototype'][_0x32e60b(0x3a5)],Window_MapName[_0x32e60b(0x303)][_0x32e60b(0x3a5)]=function(){const _0x348daa=_0x32e60b;VisuMZ[_0x348daa(0x565)][_0x348daa(0x1e6)]['QoL']['MapNameTextCode']?this[_0x348daa(0x830)]():VisuMZ['CoreEngine'][_0x348daa(0x39b)]['call'](this);},Window_MapName['prototype'][_0x32e60b(0x830)]=function(){const _0x5472c6=_0x32e60b;this['contents']['clear']();if($gameMap[_0x5472c6(0x426)]()){const _0x261848=this['innerWidth'];this['drawBackground'](0x0,0x0,_0x261848,this['lineHeight']());const _0x5ae1c9=this[_0x5472c6(0x21b)]($gameMap[_0x5472c6(0x426)]())['width'];this[_0x5472c6(0x8af)]($gameMap[_0x5472c6(0x426)](),Math[_0x5472c6(0x338)]((_0x261848-_0x5ae1c9)/0x2),0x0);}},Window_TitleCommand[_0x32e60b(0x24a)]=VisuMZ['CoreEngine'][_0x32e60b(0x1e6)][_0x32e60b(0x896)],Window_TitleCommand[_0x32e60b(0x303)][_0x32e60b(0x70f)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand['prototype'][_0x32e60b(0x45d)]=function(){const _0x9a6ad2=_0x32e60b;for(const _0x117847 of Window_TitleCommand['_commandList']){if(_0x117847[_0x9a6ad2(0x422)]['call'](this)){const _0x465be5=_0x117847[_0x9a6ad2(0x65d)];let _0x352816=_0x117847['TextStr'];if(['',_0x9a6ad2(0x36b)][_0x9a6ad2(0x7b0)](_0x352816))_0x352816=_0x117847['TextJS'][_0x9a6ad2(0x2d2)](this);const _0x266450=_0x117847[_0x9a6ad2(0x21d)][_0x9a6ad2(0x2d2)](this),_0x39cb1d=_0x117847[_0x9a6ad2(0x366)]['call'](this);this[_0x9a6ad2(0x4d8)](_0x352816,_0x465be5,_0x266450,_0x39cb1d),this[_0x9a6ad2(0x749)](_0x465be5,_0x117847['CallHandlerJS'][_0x9a6ad2(0x3d0)](this,_0x39cb1d));}}},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x745)]=Window_TitleCommand[_0x32e60b(0x303)][_0x32e60b(0x147)],Window_TitleCommand[_0x32e60b(0x303)]['selectLast']=function(){const _0x5d1007=_0x32e60b;VisuMZ['CoreEngine'][_0x5d1007(0x745)][_0x5d1007(0x2d2)](this);if(!Window_TitleCommand[_0x5d1007(0x63d)])return;const _0xcf6e58=this[_0x5d1007(0x310)](Window_TitleCommand[_0x5d1007(0x63d)]),_0x11d11c=Math[_0x5d1007(0x338)](this[_0x5d1007(0x1f9)]()/0x2)-0x1;this[_0x5d1007(0x625)](_0xcf6e58),this[_0x5d1007(0x222)]>0x1&&(this['_scrollDuration']=0x1,this[_0x5d1007(0x524)]()),this[_0x5d1007(0x644)](_0xcf6e58-_0x11d11c);},Window_GameEnd[_0x32e60b(0x24a)]=VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x31c)]['GameEnd'][_0x32e60b(0x886)],Window_GameEnd[_0x32e60b(0x303)][_0x32e60b(0x70f)]=function(){const _0x6c1f16=_0x32e60b;this[_0x6c1f16(0x45d)]();},Window_GameEnd[_0x32e60b(0x303)][_0x32e60b(0x45d)]=function(){const _0x329958=_0x32e60b;for(const _0x2df7de of Window_GameEnd['_commandList']){if(_0x2df7de[_0x329958(0x422)][_0x329958(0x2d2)](this)){const _0x589e02=_0x2df7de['Symbol'];let _0x165489=_0x2df7de['TextStr'];if(['','Untitled'][_0x329958(0x7b0)](_0x165489))_0x165489=_0x2df7de[_0x329958(0x68a)][_0x329958(0x2d2)](this);const _0x16ba9b=_0x2df7de[_0x329958(0x21d)]['call'](this),_0xa4d078=_0x2df7de['ExtJS'][_0x329958(0x2d2)](this);this[_0x329958(0x4d8)](_0x165489,_0x589e02,_0x16ba9b,_0xa4d078),this[_0x329958(0x749)](_0x589e02,_0x2df7de['CallHandlerJS']['bind'](this,_0xa4d078));}}};function Window_ButtonAssist(){const _0xc273bf=_0x32e60b;this[_0xc273bf(0x829)](...arguments);}Window_ButtonAssist[_0x32e60b(0x303)]=Object['create'](Window_Base[_0x32e60b(0x303)]),Window_ButtonAssist[_0x32e60b(0x303)][_0x32e60b(0x13d)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x32e60b(0x829)]=function(_0x2574b5){const _0x1c43ae=_0x32e60b;this['_data']={},Window_Base[_0x1c43ae(0x303)][_0x1c43ae(0x829)][_0x1c43ae(0x2d2)](this,_0x2574b5),this[_0x1c43ae(0x8ab)](VisuMZ[_0x1c43ae(0x565)]['Settings'][_0x1c43ae(0x50c)][_0x1c43ae(0x33a)]||0x0),this['refresh']();},Window_ButtonAssist[_0x32e60b(0x303)]['makeFontBigger']=function(){const _0x36a0b0=_0x32e60b;this[_0x36a0b0(0x6eb)][_0x36a0b0(0x69b)]<=0x60&&(this[_0x36a0b0(0x6eb)][_0x36a0b0(0x69b)]+=0x6);},Window_ButtonAssist[_0x32e60b(0x303)]['makeFontSmaller']=function(){const _0x365fae=_0x32e60b;this[_0x365fae(0x6eb)][_0x365fae(0x69b)]>=0x18&&(this[_0x365fae(0x6eb)][_0x365fae(0x69b)]-=0x6);},Window_ButtonAssist[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x41319d=_0x32e60b;Window_Base[_0x41319d(0x303)]['update'][_0x41319d(0x2d2)](this),this['updateKeyText']();},Window_ButtonAssist['prototype'][_0x32e60b(0x5a2)]=function(){const _0x14ce25=_0x32e60b;this[_0x14ce25(0x849)]=SceneManager[_0x14ce25(0x10b)][_0x14ce25(0x65c)]()!==_0x14ce25(0x6d0)?0x0:0x8;},Window_ButtonAssist[_0x32e60b(0x303)]['updateKeyText']=function(){const _0x579561=_0x32e60b,_0x2385f1=SceneManager[_0x579561(0x10b)];for(let _0x401edb=0x1;_0x401edb<=0x5;_0x401edb++){if(this[_0x579561(0x38b)][_0x579561(0x768)[_0x579561(0x42e)](_0x401edb)]!==_0x2385f1['buttonAssistKey%1'[_0x579561(0x42e)](_0x401edb)]())return this[_0x579561(0x3a5)]();if(this[_0x579561(0x38b)]['text%1'[_0x579561(0x42e)](_0x401edb)]!==_0x2385f1[_0x579561(0x7aa)[_0x579561(0x42e)](_0x401edb)]())return this['refresh']();}},Window_ButtonAssist[_0x32e60b(0x303)][_0x32e60b(0x3a5)]=function(){const _0x310e81=_0x32e60b;this[_0x310e81(0x6eb)][_0x310e81(0x22f)]();for(let _0x33b132=0x1;_0x33b132<=0x5;_0x33b132++){this['drawSegment'](_0x33b132);}},Window_ButtonAssist[_0x32e60b(0x303)]['drawSegment']=function(_0x38ae7f){const _0x509af6=_0x32e60b,_0x1bcf2c=this['innerWidth']/0x5,_0x54e3e8=SceneManager[_0x509af6(0x10b)],_0x202641=_0x54e3e8[_0x509af6(0x1ea)[_0x509af6(0x42e)](_0x38ae7f)](),_0x4cbd13=_0x54e3e8['buttonAssistText%1'[_0x509af6(0x42e)](_0x38ae7f)]();this[_0x509af6(0x38b)]['key%1'[_0x509af6(0x42e)](_0x38ae7f)]=_0x202641,this[_0x509af6(0x38b)][_0x509af6(0x439)['format'](_0x38ae7f)]=_0x4cbd13;if(_0x202641==='')return;if(_0x4cbd13==='')return;const _0x3658f5=_0x54e3e8[_0x509af6(0x529)[_0x509af6(0x42e)](_0x38ae7f)](),_0xdd17d2=this[_0x509af6(0x107)](),_0x7be274=_0x1bcf2c*(_0x38ae7f-0x1)+_0xdd17d2+_0x3658f5,_0x20bdb6=VisuMZ['CoreEngine'][_0x509af6(0x1e6)][_0x509af6(0x50c)][_0x509af6(0x801)];this[_0x509af6(0x8af)](_0x20bdb6[_0x509af6(0x42e)](_0x202641,_0x4cbd13),_0x7be274,0x0,_0x1bcf2c-_0xdd17d2*0x2);},VisuMZ[_0x32e60b(0x565)]['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype'][_0x32e60b(0x547)],Game_Interpreter[_0x32e60b(0x303)]['updateWaitMode']=function(){const _0x6e2250=_0x32e60b;if($gameTemp[_0x6e2250(0x46b)]!==undefined)return VisuMZ[_0x6e2250(0x565)]['UpdatePictureCoordinates']();return VisuMZ[_0x6e2250(0x565)]['Game_Interpreter_updateWaitMode'][_0x6e2250(0x2d2)](this);},VisuMZ['CoreEngine'][_0x32e60b(0x8b0)]=function(){const _0x4ccb63=_0x32e60b,_0x452544=$gameTemp[_0x4ccb63(0x46b)]||0x0;(_0x452544<0x0||_0x452544>0x64||TouchInput[_0x4ccb63(0x40d)]()||Input[_0x4ccb63(0x4e7)]('cancel'))&&($gameTemp[_0x4ccb63(0x46b)]=undefined,Input[_0x4ccb63(0x22f)](),TouchInput[_0x4ccb63(0x22f)]());const _0x4e7554=$gameScreen[_0x4ccb63(0x130)](_0x452544);return _0x4e7554&&(_0x4e7554['_x']=TouchInput['_x'],_0x4e7554['_y']=TouchInput['_y']),VisuMZ[_0x4ccb63(0x565)][_0x4ccb63(0x19f)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ['CoreEngine'][_0x32e60b(0x19f)]=function(){const _0x5454bf=_0x32e60b,_0x3d65d0=SceneManager[_0x5454bf(0x10b)];if(!_0x3d65d0)return;!_0x3d65d0[_0x5454bf(0x5c1)]&&(SoundManager['playLoad'](),_0x3d65d0['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x3d65d0['addChild'](_0x3d65d0[_0x5454bf(0x5c1)])),$gameTemp[_0x5454bf(0x46b)]===undefined&&(SoundManager[_0x5454bf(0x5ba)](),_0x3d65d0[_0x5454bf(0x5c5)](_0x3d65d0[_0x5454bf(0x5c1)]),_0x3d65d0['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x1cac21=_0x32e60b;this[_0x1cac21(0x829)](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x32e60b(0x35f)](Window_Base[_0x32e60b(0x303)]),Window_PictureCoordinates[_0x32e60b(0x303)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(){const _0x4e1b23=_0x32e60b;this[_0x4e1b23(0x16b)]=_0x4e1b23(0x1c8),this['_lastX']=_0x4e1b23(0x1c8),this['_lastY']=_0x4e1b23(0x1c8);const _0x48cf07=this['windowRect']();Window_Base['prototype'][_0x4e1b23(0x829)][_0x4e1b23(0x2d2)](this,_0x48cf07),this[_0x4e1b23(0x8ab)](0x2);},Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x2ba)]=function(){const _0x19c4da=_0x32e60b;let _0x363fa2=0x0,_0x1560b6=Graphics[_0x19c4da(0x32b)]-this[_0x19c4da(0x823)](),_0x279597=Graphics[_0x19c4da(0x36c)],_0x3e3b51=this['lineHeight']();return new Rectangle(_0x363fa2,_0x1560b6,_0x279597,_0x3e3b51);},Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x5a2)]=function(){const _0x23f63f=_0x32e60b;this[_0x23f63f(0x849)]=0x0;},Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x512)]=function(){const _0x20e9a1=_0x32e60b;Window_Base['prototype'][_0x20e9a1(0x512)][_0x20e9a1(0x2d2)](this),this['updateData']();},Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x2b1)]=function(){const _0x492a10=_0x32e60b;if(!this[_0x492a10(0x5cf)]())return;this['refresh']();},Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x5cf)]=function(){const _0x11379b=_0x32e60b,_0x3adf84=$gameTemp[_0x11379b(0x46b)],_0x45b24f=$gameScreen[_0x11379b(0x130)](_0x3adf84);return _0x45b24f?this[_0x11379b(0x16b)]!==_0x45b24f[_0x11379b(0x1b3)]||this[_0x11379b(0x40a)]!==_0x45b24f['_x']||this[_0x11379b(0x3de)]!==_0x45b24f['_y']:![];},Window_PictureCoordinates[_0x32e60b(0x303)][_0x32e60b(0x3a5)]=function(){const _0x5e01df=_0x32e60b;this[_0x5e01df(0x6eb)]['clear']();const _0x4b6397=$gameTemp[_0x5e01df(0x46b)],_0x4a57dd=$gameScreen['picture'](_0x4b6397);if(!_0x4a57dd)return;this[_0x5e01df(0x16b)]=_0x4a57dd[_0x5e01df(0x1b3)],this['_lastX']=_0x4a57dd['_x'],this[_0x5e01df(0x3de)]=_0x4a57dd['_y'];const _0x2bfa52=ColorManager['itemBackColor1']();this[_0x5e01df(0x6eb)][_0x5e01df(0x5a3)](0x0,0x0,this[_0x5e01df(0x2dd)],this[_0x5e01df(0x3eb)],_0x2bfa52);const _0x123271='\x20Origin:\x20%1'['format'](_0x4a57dd[_0x5e01df(0x1b3)]===0x0?_0x5e01df(0x124):'Center'),_0x5395ab=_0x5e01df(0x8a3)[_0x5e01df(0x42e)](_0x4a57dd['_x']),_0x5d9a3c='Y:\x20%1'['format'](_0x4a57dd['_y']),_0x436776=_0x5e01df(0x166)[_0x5e01df(0x42e)](TextManager[_0x5e01df(0x6f7)]('cancel'));let _0x180b95=Math['floor'](this['innerWidth']/0x4);this[_0x5e01df(0x7fe)](_0x123271,_0x180b95*0x0,0x0,_0x180b95),this[_0x5e01df(0x7fe)](_0x5395ab,_0x180b95*0x1,0x0,_0x180b95,'center'),this[_0x5e01df(0x7fe)](_0x5d9a3c,_0x180b95*0x2,0x0,_0x180b95,'center');const _0x200c62=this['textSizeEx'](_0x436776)['width'],_0x51a716=this[_0x5e01df(0x2dd)]-_0x200c62;this[_0x5e01df(0x8af)](_0x436776,_0x51a716,0x0,_0x200c62);};function Window_TextPopup(){const _0x4039fb=_0x32e60b;this[_0x4039fb(0x829)](...arguments);}Window_TextPopup['prototype']=Object[_0x32e60b(0x35f)](Window_Base['prototype']),Window_TextPopup[_0x32e60b(0x303)][_0x32e60b(0x13d)]=Window_TextPopup,Window_TextPopup['SETTINGS']={'framesPerChar':VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x365)][_0x32e60b(0x8c2)]??1.5,'framesMin':VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1e6)][_0x32e60b(0x365)][_0x32e60b(0x261)]??0x5a,'framesMax':VisuMZ['CoreEngine']['Settings']['Window'][_0x32e60b(0x1ed)]??0x12c},Window_TextPopup[_0x32e60b(0x303)][_0x32e60b(0x829)]=function(){const _0x187245=_0x32e60b,_0x44a73a=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x187245(0x303)][_0x187245(0x829)][_0x187245(0x2d2)](this,_0x44a73a),this['openness']=0x0,this['_text']='',this['_textQueue']=[],this[_0x187245(0x3d5)]=0x0;},Window_TextPopup[_0x32e60b(0x303)][_0x32e60b(0x3e2)]=function(){return!![];},Window_TextPopup[_0x32e60b(0x303)]['addQueue']=function(_0x14bbf2){const _0x5e5ed0=_0x32e60b;if(this['_textQueue'][this['_textQueue'][_0x5e5ed0(0x4e4)]-0x1]===_0x14bbf2)return;this[_0x5e5ed0(0x37e)][_0x5e5ed0(0x724)](_0x14bbf2),SceneManager[_0x5e5ed0(0x10b)][_0x5e5ed0(0x6b4)](this);},Window_TextPopup['prototype']['update']=function(){const _0x5e5e3b=_0x32e60b;Window_Base[_0x5e5e3b(0x303)][_0x5e5e3b(0x512)][_0x5e5e3b(0x2d2)](this),this['updateText'](),this[_0x5e5e3b(0x3c1)]();},Window_TextPopup[_0x32e60b(0x303)][_0x32e60b(0x402)]=function(){const _0x3eeba3=_0x32e60b;if(this[_0x3eeba3(0x7c0)]!=='')return;if(this[_0x3eeba3(0x37e)][_0x3eeba3(0x4e4)]<=0x0)return;if(!this['isClosed']())return;this[_0x3eeba3(0x7c0)]=this[_0x3eeba3(0x37e)][_0x3eeba3(0x67c)]();const _0x3abda5=Window_TextPopup[_0x3eeba3(0x7a3)],_0xe356e0=Math[_0x3eeba3(0x689)](this['_text'][_0x3eeba3(0x4e4)]*_0x3abda5[_0x3eeba3(0x8cc)]);this[_0x3eeba3(0x3d5)]=_0xe356e0[_0x3eeba3(0x7c2)](_0x3abda5['framesMin'],_0x3abda5[_0x3eeba3(0x721)]);const _0x237414=this[_0x3eeba3(0x21b)](this[_0x3eeba3(0x7c0)]);let _0x1fa35a=_0x237414[_0x3eeba3(0x36c)]+this[_0x3eeba3(0x107)]()*0x2;_0x1fa35a+=$gameSystem['windowPadding']()*0x2;let _0x3eb5f9=Math[_0x3eeba3(0x66c)](_0x237414[_0x3eeba3(0x32b)],this[_0x3eeba3(0x823)]());_0x3eb5f9+=$gameSystem[_0x3eeba3(0x28f)]()*0x2;const _0x306183=Math[_0x3eeba3(0x474)]((Graphics[_0x3eeba3(0x36c)]-_0x1fa35a)/0x2),_0x4d645b=Math[_0x3eeba3(0x474)]((Graphics[_0x3eeba3(0x32b)]-_0x3eb5f9)/0x2),_0x4c868c=new Rectangle(_0x306183,_0x4d645b,_0x1fa35a,_0x3eb5f9);this[_0x3eeba3(0x632)](_0x4c868c['x'],_0x4c868c['y'],_0x4c868c[_0x3eeba3(0x36c)],_0x4c868c['height']),this['createContents'](),this[_0x3eeba3(0x3a5)](),this['open'](),SceneManager[_0x3eeba3(0x10b)]['addChild'](this);},Window_TextPopup[_0x32e60b(0x303)][_0x32e60b(0x3a5)]=function(){const _0x195742=_0x32e60b,_0xddaf12=this[_0x195742(0x32f)]();this[_0x195742(0x6eb)][_0x195742(0x22f)](),this['drawTextEx'](this['_text'],_0xddaf12['x'],_0xddaf12['y'],_0xddaf12['width']);},Window_TextPopup[_0x32e60b(0x303)][_0x32e60b(0x3c1)]=function(){const _0x2bf5ce=_0x32e60b;if(this[_0x2bf5ce(0x83c)]()||this[_0x2bf5ce(0x7fc)]())return;if(this[_0x2bf5ce(0x3d5)]<=0x0)return;this[_0x2bf5ce(0x3d5)]--,this[_0x2bf5ce(0x3d5)]<=0x0&&(this[_0x2bf5ce(0x5de)](),this['_text']='');},VisuMZ[_0x32e60b(0x570)]=function(_0xe8810b){const _0x217c54=_0x32e60b;if(Utils[_0x217c54(0x3b5)](_0x217c54(0x41b))){var _0x50def4=require(_0x217c54(0x882))['Window'][_0x217c54(0x487)]();SceneManager['showDevTools']();if(_0xe8810b)setTimeout(_0x50def4[_0x217c54(0x3c6)][_0x217c54(0x3d0)](_0x50def4),0x190);}},VisuMZ[_0x32e60b(0x313)]=function(_0x553287,_0x55f5ee){const _0x1424a4=_0x32e60b;_0x55f5ee=_0x55f5ee[_0x1424a4(0x58e)]();var _0x145a5b=1.70158,_0x1c6625=0.7;switch(_0x55f5ee){case _0x1424a4(0x78f):return _0x553287;case _0x1424a4(0x194):return-0x1*Math[_0x1424a4(0x5f2)](_0x553287*(Math['PI']/0x2))+0x1;case _0x1424a4(0x80c):return Math['sin'](_0x553287*(Math['PI']/0x2));case _0x1424a4(0x4a6):return-0.5*(Math[_0x1424a4(0x5f2)](Math['PI']*_0x553287)-0x1);case _0x1424a4(0x1c4):return _0x553287*_0x553287;case'OUTQUAD':return _0x553287*(0x2-_0x553287);case _0x1424a4(0x564):return _0x553287<0.5?0x2*_0x553287*_0x553287:-0x1+(0x4-0x2*_0x553287)*_0x553287;case _0x1424a4(0x89c):return _0x553287*_0x553287*_0x553287;case _0x1424a4(0x4d3):var _0x265065=_0x553287-0x1;return _0x265065*_0x265065*_0x265065+0x1;case _0x1424a4(0x602):return _0x553287<0.5?0x4*_0x553287*_0x553287*_0x553287:(_0x553287-0x1)*(0x2*_0x553287-0x2)*(0x2*_0x553287-0x2)+0x1;case'INQUART':return _0x553287*_0x553287*_0x553287*_0x553287;case _0x1424a4(0x3c0):var _0x265065=_0x553287-0x1;return 0x1-_0x265065*_0x265065*_0x265065*_0x265065;case'INOUTQUART':var _0x265065=_0x553287-0x1;return _0x553287<0.5?0x8*_0x553287*_0x553287*_0x553287*_0x553287:0x1-0x8*_0x265065*_0x265065*_0x265065*_0x265065;case'INQUINT':return _0x553287*_0x553287*_0x553287*_0x553287*_0x553287;case'OUTQUINT':var _0x265065=_0x553287-0x1;return 0x1+_0x265065*_0x265065*_0x265065*_0x265065*_0x265065;case _0x1424a4(0x7db):var _0x265065=_0x553287-0x1;return _0x553287<0.5?0x10*_0x553287*_0x553287*_0x553287*_0x553287*_0x553287:0x1+0x10*_0x265065*_0x265065*_0x265065*_0x265065*_0x265065;case _0x1424a4(0x4de):if(_0x553287===0x0)return 0x0;return Math[_0x1424a4(0x1cc)](0x2,0xa*(_0x553287-0x1));case _0x1424a4(0x450):if(_0x553287===0x1)return 0x1;return-Math[_0x1424a4(0x1cc)](0x2,-0xa*_0x553287)+0x1;case _0x1424a4(0x48e):if(_0x553287===0x0||_0x553287===0x1)return _0x553287;var _0x1e3fd8=_0x553287*0x2,_0x3499d8=_0x1e3fd8-0x1;if(_0x1e3fd8<0x1)return 0.5*Math[_0x1424a4(0x1cc)](0x2,0xa*_0x3499d8);return 0.5*(-Math[_0x1424a4(0x1cc)](0x2,-0xa*_0x3499d8)+0x2);case _0x1424a4(0x623):var _0x1e3fd8=_0x553287/0x1;return-0x1*(Math[_0x1424a4(0x6b6)](0x1-_0x1e3fd8*_0x553287)-0x1);case _0x1424a4(0x1db):var _0x265065=_0x553287-0x1;return Math[_0x1424a4(0x6b6)](0x1-_0x265065*_0x265065);case _0x1424a4(0x47c):var _0x1e3fd8=_0x553287*0x2,_0x3499d8=_0x1e3fd8-0x2;if(_0x1e3fd8<0x1)return-0.5*(Math[_0x1424a4(0x6b6)](0x1-_0x1e3fd8*_0x1e3fd8)-0x1);return 0.5*(Math[_0x1424a4(0x6b6)](0x1-_0x3499d8*_0x3499d8)+0x1);case _0x1424a4(0x299):return _0x553287*_0x553287*((_0x145a5b+0x1)*_0x553287-_0x145a5b);case _0x1424a4(0x509):var _0x1e3fd8=_0x553287/0x1-0x1;return _0x1e3fd8*_0x1e3fd8*((_0x145a5b+0x1)*_0x1e3fd8+_0x145a5b)+0x1;break;case'INOUTBACK':var _0x1e3fd8=_0x553287*0x2,_0x519bc5=_0x1e3fd8-0x2,_0xf1e7a4=_0x145a5b*1.525;if(_0x1e3fd8<0x1)return 0.5*_0x1e3fd8*_0x1e3fd8*((_0xf1e7a4+0x1)*_0x1e3fd8-_0xf1e7a4);return 0.5*(_0x519bc5*_0x519bc5*((_0xf1e7a4+0x1)*_0x519bc5+_0xf1e7a4)+0x2);case _0x1424a4(0x53c):if(_0x553287===0x0||_0x553287===0x1)return _0x553287;var _0x1e3fd8=_0x553287/0x1,_0x3499d8=_0x1e3fd8-0x1,_0x4cfa33=0x1-_0x1c6625,_0xf1e7a4=_0x4cfa33/(0x2*Math['PI'])*Math[_0x1424a4(0x574)](0x1);return-(Math[_0x1424a4(0x1cc)](0x2,0xa*_0x3499d8)*Math['sin']((_0x3499d8-_0xf1e7a4)*(0x2*Math['PI'])/_0x4cfa33));case _0x1424a4(0x4e9):var _0x4cfa33=0x1-_0x1c6625,_0x1e3fd8=_0x553287*0x2;if(_0x553287===0x0||_0x553287===0x1)return _0x553287;var _0xf1e7a4=_0x4cfa33/(0x2*Math['PI'])*Math[_0x1424a4(0x574)](0x1);return Math[_0x1424a4(0x1cc)](0x2,-0xa*_0x1e3fd8)*Math[_0x1424a4(0x429)]((_0x1e3fd8-_0xf1e7a4)*(0x2*Math['PI'])/_0x4cfa33)+0x1;case _0x1424a4(0x1d7):var _0x4cfa33=0x1-_0x1c6625;if(_0x553287===0x0||_0x553287===0x1)return _0x553287;var _0x1e3fd8=_0x553287*0x2,_0x3499d8=_0x1e3fd8-0x1,_0xf1e7a4=_0x4cfa33/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x1e3fd8<0x1)return-0.5*(Math[_0x1424a4(0x1cc)](0x2,0xa*_0x3499d8)*Math['sin']((_0x3499d8-_0xf1e7a4)*(0x2*Math['PI'])/_0x4cfa33));return Math['pow'](0x2,-0xa*_0x3499d8)*Math[_0x1424a4(0x429)]((_0x3499d8-_0xf1e7a4)*(0x2*Math['PI'])/_0x4cfa33)*0.5+0x1;case _0x1424a4(0x617):var _0x1e3fd8=_0x553287/0x1;if(_0x1e3fd8<0x1/2.75)return 7.5625*_0x1e3fd8*_0x1e3fd8;else{if(_0x1e3fd8<0x2/2.75){var _0x519bc5=_0x1e3fd8-1.5/2.75;return 7.5625*_0x519bc5*_0x519bc5+0.75;}else{if(_0x1e3fd8<2.5/2.75){var _0x519bc5=_0x1e3fd8-2.25/2.75;return 7.5625*_0x519bc5*_0x519bc5+0.9375;}else{var _0x519bc5=_0x1e3fd8-2.625/2.75;return 7.5625*_0x519bc5*_0x519bc5+0.984375;}}}case _0x1424a4(0x8ba):var _0x153f71=0x1-VisuMZ[_0x1424a4(0x313)](0x1-_0x553287,_0x1424a4(0x14f));return _0x153f71;case _0x1424a4(0x6ad):if(_0x553287<0.5)var _0x153f71=VisuMZ[_0x1424a4(0x313)](_0x553287*0x2,_0x1424a4(0x205))*0.5;else var _0x153f71=VisuMZ['ApplyEasing'](_0x553287*0x2-0x1,_0x1424a4(0x14f))*0.5+0.5;return _0x153f71;default:return _0x553287;}},VisuMZ[_0x32e60b(0x577)]=function(_0x3f0d93){const _0x194f21=_0x32e60b;_0x3f0d93=String(_0x3f0d93)[_0x194f21(0x58e)]();const _0x8b020a=VisuMZ[_0x194f21(0x565)]['Settings'][_0x194f21(0x621)];if(_0x3f0d93===_0x194f21(0x871))return _0x8b020a[_0x194f21(0x183)];if(_0x3f0d93===_0x194f21(0x8b2))return _0x8b020a[_0x194f21(0x8d5)];if(_0x3f0d93===_0x194f21(0x755))return _0x8b020a['IconParam2'];if(_0x3f0d93===_0x194f21(0x408))return _0x8b020a[_0x194f21(0x277)];if(_0x3f0d93===_0x194f21(0x766))return _0x8b020a['IconParam4'];if(_0x3f0d93==='MDF')return _0x8b020a[_0x194f21(0x7b5)];if(_0x3f0d93==='AGI')return _0x8b020a[_0x194f21(0x167)];if(_0x3f0d93==='LUK')return _0x8b020a[_0x194f21(0x2b4)];if(_0x3f0d93==='HIT')return _0x8b020a[_0x194f21(0x216)];if(_0x3f0d93===_0x194f21(0x173))return _0x8b020a[_0x194f21(0x539)];if(_0x3f0d93===_0x194f21(0x7e4))return _0x8b020a[_0x194f21(0x798)];if(_0x3f0d93===_0x194f21(0x26c))return _0x8b020a[_0x194f21(0x546)];if(_0x3f0d93===_0x194f21(0x5aa))return _0x8b020a[_0x194f21(0x79c)];if(_0x3f0d93===_0x194f21(0x2e6))return _0x8b020a[_0x194f21(0x521)];if(_0x3f0d93===_0x194f21(0x605))return _0x8b020a[_0x194f21(0x20a)];if(_0x3f0d93==='HRG')return _0x8b020a['IconXParam7'];if(_0x3f0d93==='MRG')return _0x8b020a[_0x194f21(0x7f7)];if(_0x3f0d93==='TRG')return _0x8b020a[_0x194f21(0x5ce)];if(_0x3f0d93===_0x194f21(0x108))return _0x8b020a[_0x194f21(0x2ea)];if(_0x3f0d93===_0x194f21(0x3e8))return _0x8b020a[_0x194f21(0x6f3)];if(_0x3f0d93===_0x194f21(0x362))return _0x8b020a[_0x194f21(0x467)];if(_0x3f0d93===_0x194f21(0x4e0))return _0x8b020a[_0x194f21(0x862)];if(_0x3f0d93===_0x194f21(0x15c))return _0x8b020a[_0x194f21(0x38d)];if(_0x3f0d93===_0x194f21(0x78c))return _0x8b020a[_0x194f21(0x6d4)];if(_0x3f0d93===_0x194f21(0x304))return _0x8b020a[_0x194f21(0x3f2)];if(_0x3f0d93===_0x194f21(0x6fb))return _0x8b020a[_0x194f21(0x669)];if(_0x3f0d93===_0x194f21(0x663))return _0x8b020a[_0x194f21(0x24e)];if(_0x3f0d93===_0x194f21(0x432))return _0x8b020a[_0x194f21(0x189)];if(VisuMZ[_0x194f21(0x565)][_0x194f21(0x373)][_0x3f0d93])return VisuMZ[_0x194f21(0x565)][_0x194f21(0x373)][_0x3f0d93]||0x0;return 0x0;},VisuMZ[_0x32e60b(0x266)]=function(_0x47882d,_0x38b5a2,_0x870e98){const _0x5813c0=_0x32e60b;if(_0x870e98===undefined&&_0x47882d%0x1===0x0)return _0x47882d;if(_0x870e98!==undefined&&[_0x5813c0(0x871),_0x5813c0(0x8b2),'ATK',_0x5813c0(0x408),_0x5813c0(0x766),_0x5813c0(0x4a1),_0x5813c0(0x164),_0x5813c0(0x88a)][_0x5813c0(0x7b0)](String(_0x870e98)['toUpperCase']()[_0x5813c0(0x870)]()))return _0x47882d;_0x38b5a2=_0x38b5a2||0x0;if(VisuMZ[_0x5813c0(0x565)][_0x5813c0(0x47f)][_0x870e98])return VisuMZ['CoreEngine'][_0x5813c0(0x552)][_0x870e98]==='integer'?_0x47882d:String((_0x47882d*0x64)[_0x5813c0(0x39c)](_0x38b5a2))+'%';return String((_0x47882d*0x64)[_0x5813c0(0x39c)](_0x38b5a2))+'%';},VisuMZ[_0x32e60b(0x405)]=function(_0x34bd5f){const _0x17eb33=_0x32e60b;_0x34bd5f=String(_0x34bd5f);if(!_0x34bd5f)return _0x34bd5f;if(typeof _0x34bd5f!==_0x17eb33(0x41c))return _0x34bd5f;const _0x3fb5c0=VisuMZ[_0x17eb33(0x565)]['Settings'][_0x17eb33(0x89e)]['DigitGroupingLocale']||_0x17eb33(0x626),_0x5cc501={'maximumFractionDigits':0x6};_0x34bd5f=_0x34bd5f[_0x17eb33(0x1b6)](/\[(.*?)\]/g,(_0x44836a,_0x1d3e53)=>{return VisuMZ['PreserveNumbers'](_0x1d3e53,'[',']');}),_0x34bd5f=_0x34bd5f[_0x17eb33(0x1b6)](/<(.*?)>/g,(_0x1faf29,_0x3fbe9d)=>{const _0x4558b8=_0x17eb33;return VisuMZ[_0x4558b8(0x71e)](_0x3fbe9d,'<','>');}),_0x34bd5f=_0x34bd5f[_0x17eb33(0x1b6)](/\{\{(.*?)\}\}/g,(_0xe86d91,_0x530792)=>{const _0xff4ea3=_0x17eb33;return VisuMZ[_0xff4ea3(0x71e)](_0x530792,'','');}),_0x34bd5f=_0x34bd5f[_0x17eb33(0x1b6)](/(\d+\.?\d*)/g,(_0x5d1e15,_0x93eaeb)=>{const _0x2d66ee=_0x17eb33;let _0x40fd71=_0x93eaeb;if(_0x40fd71[0x0]==='0')return _0x40fd71;if(_0x40fd71[_0x40fd71[_0x2d66ee(0x4e4)]-0x1]==='.')return Number(_0x40fd71)['toLocaleString'](_0x3fb5c0,_0x5cc501)+'.';else return _0x40fd71[_0x40fd71[_0x2d66ee(0x4e4)]-0x1]===','?Number(_0x40fd71)['toLocaleString'](_0x3fb5c0,_0x5cc501)+',':Number(_0x40fd71)[_0x2d66ee(0x161)](_0x3fb5c0,_0x5cc501);});let _0x1c0c3c=0x3;while(_0x1c0c3c--){_0x34bd5f=VisuMZ[_0x17eb33(0x7c6)](_0x34bd5f);}return _0x34bd5f;},VisuMZ[_0x32e60b(0x71e)]=function(_0x448230,_0x389b58,_0x56139c){const _0x57782c=_0x32e60b;return _0x448230=_0x448230['replace'](/(\d)/gi,(_0xf11ade,_0x4a31ed)=>_0x57782c(0x869)[_0x57782c(0x42e)](Number(_0x4a31ed))),_0x57782c(0x853)[_0x57782c(0x42e)](_0x448230,_0x389b58,_0x56139c);},VisuMZ[_0x32e60b(0x7c6)]=function(_0x2f592f){return _0x2f592f=_0x2f592f['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x31438c,_0xf07590)=>Number(parseInt(_0xf07590))),_0x2f592f;},VisuMZ[_0x32e60b(0x301)]=function(_0xe7a58b){const _0x13222f=_0x32e60b;SoundManager[_0x13222f(0x736)]();if(!Utils[_0x13222f(0x837)]()){const _0x37c477=window[_0x13222f(0x3ac)](_0xe7a58b,_0x13222f(0x803));}else{const _0x2e115a=process['platform']=='darwin'?_0x13222f(0x3ac):process[_0x13222f(0x771)]==_0x13222f(0x3bc)?'start':'xdg-open';require(_0x13222f(0x128))[_0x13222f(0x287)](_0x2e115a+'\x20'+_0xe7a58b);}},VisuMZ[_0x32e60b(0x23a)]=function(_0x43d6a7,_0x2ad4d4){const _0x449d5f=_0x32e60b;if(!_0x43d6a7)return'';const _0x4d1770=_0x43d6a7[_0x449d5f(0x895)]||_0x43d6a7['id'];let _0x939716='';return _0x43d6a7[_0x449d5f(0x502)]!==undefined&&_0x43d6a7[_0x449d5f(0x204)]!==undefined&&(_0x939716=_0x449d5f(0x3ad)[_0x449d5f(0x42e)](_0x4d1770,_0x2ad4d4)),_0x43d6a7['expParams']!==undefined&&_0x43d6a7[_0x449d5f(0x43e)]!==undefined&&(_0x939716=_0x449d5f(0x4eb)[_0x449d5f(0x42e)](_0x4d1770,_0x2ad4d4)),_0x43d6a7[_0x449d5f(0x705)]!==undefined&&_0x43d6a7[_0x449d5f(0x6c7)]!==undefined&&(_0x939716=_0x449d5f(0x372)['format'](_0x4d1770,_0x2ad4d4)),_0x43d6a7[_0x449d5f(0x813)]!==undefined&&_0x43d6a7[_0x449d5f(0x3a8)]!==undefined&&(_0x939716='Item-%1-%2'[_0x449d5f(0x42e)](_0x4d1770,_0x2ad4d4)),_0x43d6a7['wtypeId']!==undefined&&_0x43d6a7[_0x449d5f(0x358)]===0x1&&(_0x939716='Weapon-%1-%2'[_0x449d5f(0x42e)](_0x4d1770,_0x2ad4d4)),_0x43d6a7[_0x449d5f(0x7f3)]!==undefined&&_0x43d6a7[_0x449d5f(0x358)]>0x1&&(_0x939716=_0x449d5f(0x4f8)[_0x449d5f(0x42e)](_0x4d1770,_0x2ad4d4)),_0x43d6a7[_0x449d5f(0x20f)]!==undefined&&_0x43d6a7[_0x449d5f(0x52b)]!==undefined&&(_0x939716=_0x449d5f(0x5ae)[_0x449d5f(0x42e)](_0x4d1770,_0x2ad4d4)),_0x43d6a7[_0x449d5f(0x369)]!==undefined&&_0x43d6a7[_0x449d5f(0x472)]!==undefined&&(_0x939716=_0x449d5f(0x738)['format'](_0x4d1770,_0x2ad4d4)),_0x939716;},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x79e)]=function(){const _0xcf996b=_0x32e60b;return this[_0xcf996b(0x1e4)];},VisuMZ[_0x32e60b(0x565)]['Game_Picture_initBasic']=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x4fb)],Game_Picture['prototype'][_0x32e60b(0x4fb)]=function(){const _0x59921d=_0x32e60b;VisuMZ['CoreEngine'][_0x59921d(0x572)]['call'](this),this[_0x59921d(0x1e4)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x32e60b(0x565)]['Game_Picture_updateMove']=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x714)],Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x714)]=function(){const _0x4ade1a=_0x32e60b;this[_0x4ade1a(0x66e)]();const _0x502d2a=this[_0x4ade1a(0x64f)];VisuMZ[_0x4ade1a(0x565)][_0x4ade1a(0x6ed)][_0x4ade1a(0x2d2)](this),_0x502d2a>0x0&&this[_0x4ade1a(0x64f)]<=0x0&&(this['_x']=this[_0x4ade1a(0x892)],this['_y']=this[_0x4ade1a(0x1fc)],this['_scaleX']=this['_targetScaleX'],this[_0x4ade1a(0x82d)]=this[_0x4ade1a(0x1bb)],this['_opacity']=this['_targetOpacity'],this[_0x4ade1a(0x1e4)]&&(this[_0x4ade1a(0x1e4)]['x']=this[_0x4ade1a(0x117)]['x'],this[_0x4ade1a(0x1e4)]['y']=this[_0x4ade1a(0x117)]['y']));},VisuMZ[_0x32e60b(0x565)]['Game_Picture_show']=Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x511)],Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x511)]=function(_0x121803,_0x4dc8bf,_0x149bc6,_0x37db38,_0x4fdd49,_0x1e25aa,_0x3e37ac,_0x1d5d7b){const _0x4ba16a=_0x32e60b;VisuMZ[_0x4ba16a(0x565)][_0x4ba16a(0x797)][_0x4ba16a(0x2d2)](this,_0x121803,_0x4dc8bf,_0x149bc6,_0x37db38,_0x4fdd49,_0x1e25aa,_0x3e37ac,_0x1d5d7b),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4dc8bf]||{'x':0x0,'y':0x0});},VisuMZ[_0x32e60b(0x565)]['Game_Picture_move']=Game_Picture[_0x32e60b(0x303)]['move'],Game_Picture['prototype'][_0x32e60b(0x632)]=function(_0x2cded7,_0x588262,_0x165f31,_0x341904,_0x3d1a1c,_0x5aa1d0,_0x1e32c4,_0x5e71f8,_0xb83d69){const _0x93cbf6=_0x32e60b;VisuMZ['CoreEngine']['Game_Picture_move'][_0x93cbf6(0x2d2)](this,_0x2cded7,_0x588262,_0x165f31,_0x341904,_0x3d1a1c,_0x5aa1d0,_0x1e32c4,_0x5e71f8,_0xb83d69),this[_0x93cbf6(0x190)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2cded7]||{'x':0x0,'y':0x0});},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x66e)]=function(){const _0x21caed=_0x32e60b;this[_0x21caed(0x64f)]>0x0&&(this['_anchor']['x']=this['applyEasing'](this[_0x21caed(0x1e4)]['x'],this[_0x21caed(0x117)]['x']),this[_0x21caed(0x1e4)]['y']=this[_0x21caed(0x7d8)](this[_0x21caed(0x1e4)]['y'],this[_0x21caed(0x117)]['y']));},Game_Picture[_0x32e60b(0x303)][_0x32e60b(0x753)]=function(_0x1d30a9){const _0x822570=_0x32e60b;this[_0x822570(0x1e4)]=_0x1d30a9,this[_0x822570(0x117)]=JsonEx[_0x822570(0x4fe)](this[_0x822570(0x1e4)]);},Game_Picture['prototype']['setTargetAnchor']=function(_0x37c843){const _0x3fc8ef=_0x32e60b;this[_0x3fc8ef(0x117)]=_0x37c843;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x5dd)]=Sprite_Picture[_0x32e60b(0x303)]['updateOrigin'],Sprite_Picture[_0x32e60b(0x303)]['updateOrigin']=function(){const _0x2c9e7d=_0x32e60b,_0x25885c=this[_0x2c9e7d(0x130)]();!_0x25885c[_0x2c9e7d(0x79e)]()?VisuMZ[_0x2c9e7d(0x565)][_0x2c9e7d(0x5dd)][_0x2c9e7d(0x2d2)](this):(this[_0x2c9e7d(0x79e)]['x']=_0x25885c[_0x2c9e7d(0x79e)]()['x'],this[_0x2c9e7d(0x79e)]['y']=_0x25885c[_0x2c9e7d(0x79e)]()['y']);},Game_Action['prototype'][_0x32e60b(0x8a5)]=function(_0x245e4f){const _0x364adc=_0x32e60b;if(_0x245e4f){const _0x4940b0=_0x245e4f[_0x364adc(0x2e9)];if(_0x4940b0===0x1&&this['subject']()[_0x364adc(0x786)]()!==0x1)this['setAttack']();else _0x4940b0===0x2&&this[_0x364adc(0x2a1)]()[_0x364adc(0x2fd)]()!==0x2?this[_0x364adc(0x1a0)]():this[_0x364adc(0x6cd)](_0x4940b0);}else this[_0x364adc(0x22f)]();},Game_Actor[_0x32e60b(0x303)][_0x32e60b(0x2d1)]=function(){const _0x2e3c22=_0x32e60b;return this['skills']()[_0x2e3c22(0x6c2)](_0x143dc3=>this['canUse'](_0x143dc3)&&this[_0x2e3c22(0x8bd)]()[_0x2e3c22(0x7b0)](_0x143dc3['stypeId']));},Window_Base[_0x32e60b(0x303)][_0x32e60b(0x2d5)]=function(){const _0x423a87=_0x32e60b;this[_0x423a87(0x12d)]=new Sprite(),this[_0x423a87(0x12d)][_0x423a87(0x568)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x423a87(0x3a3)](this[_0x423a87(0x12d)]);},Window_Base['prototype']['refreshDimmerBitmap']=function(){const _0x492e59=_0x32e60b;if(this[_0x492e59(0x12d)]){const _0x1c58ee=this['_dimmerSprite'][_0x492e59(0x568)],_0x36d9e2=this[_0x492e59(0x36c)],_0xf74383=this[_0x492e59(0x32b)],_0x1fac2d=this[_0x492e59(0x849)],_0x1d8060=ColorManager[_0x492e59(0x30c)](),_0x2d7686=ColorManager[_0x492e59(0x2b0)]();_0x1c58ee[_0x492e59(0x64e)](_0x36d9e2,_0xf74383),_0x1c58ee['gradientFillRect'](0x0,0x0,_0x36d9e2,_0x1fac2d,_0x2d7686,_0x1d8060,!![]),_0x1c58ee['fillRect'](0x0,_0x1fac2d,_0x36d9e2,_0xf74383-_0x1fac2d*0x2,_0x1d8060),_0x1c58ee[_0x492e59(0x267)](0x0,_0xf74383-_0x1fac2d,_0x36d9e2,_0x1fac2d,_0x1d8060,_0x2d7686,!![]),this[_0x492e59(0x12d)]['setFrame'](0x0,0x0,_0x36d9e2,_0xf74383);}},Game_Actor['prototype'][_0x32e60b(0x6dc)]=function(){const _0xe9a608=_0x32e60b;for(let _0x5a9dd3=0x0;_0x5a9dd3<this[_0xe9a608(0x317)]();_0x5a9dd3++){const _0x19a7e8=this[_0xe9a608(0x177)]();let _0xa87348=Number['MIN_SAFE_INTEGER'];this[_0xe9a608(0x6e2)](_0x5a9dd3,_0x19a7e8[0x0]);for(const _0x305417 of _0x19a7e8){const _0x1dbe2e=_0x305417[_0xe9a608(0x635)]();_0x1dbe2e>_0xa87348&&(_0xa87348=_0x1dbe2e,this['setAction'](_0x5a9dd3,_0x305417));}}this[_0xe9a608(0x145)](_0xe9a608(0x54e));},Window_BattleItem[_0x32e60b(0x303)]['isEnabled']=function(_0x3fde4d){const _0x58f76f=_0x32e60b;return BattleManager[_0x58f76f(0x7b3)]()?BattleManager[_0x58f76f(0x7b3)]()[_0x58f76f(0x548)](_0x3fde4d):Window_ItemList['prototype'][_0x58f76f(0x135)][_0x58f76f(0x2d2)](this,_0x3fde4d);},VisuMZ[_0x32e60b(0x565)]['Scene_Map_createSpritesetFix']=Scene_Map[_0x32e60b(0x303)]['createSpriteset'],Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x38c)]=function(){const _0x2b38db=_0x32e60b;VisuMZ['CoreEngine'][_0x2b38db(0x283)][_0x2b38db(0x2d2)](this);const _0x4cb62d=this[_0x2b38db(0x68e)][_0x2b38db(0x438)];if(_0x4cb62d)this['addChild'](_0x4cb62d);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x8d7)]=Scene_Battle[_0x32e60b(0x303)]['createSpriteset'],Scene_Battle[_0x32e60b(0x303)][_0x32e60b(0x38c)]=function(){const _0x58ee0f=_0x32e60b;VisuMZ[_0x58ee0f(0x565)][_0x58ee0f(0x8d7)][_0x58ee0f(0x2d2)](this);const _0x8aaf7=this[_0x58ee0f(0x68e)][_0x58ee0f(0x438)];if(_0x8aaf7)this[_0x58ee0f(0x6b4)](_0x8aaf7);},Sprite_Actor[_0x32e60b(0x303)]['update']=function(){const _0x19afa8=_0x32e60b;Sprite_Battler[_0x19afa8(0x303)][_0x19afa8(0x512)]['call'](this),this[_0x19afa8(0x805)]();if(this[_0x19afa8(0x6fd)])this[_0x19afa8(0x792)]();else this[_0x19afa8(0x4c8)]!==''&&(this[_0x19afa8(0x4c8)]='');},Window['prototype']['_refreshArrows']=function(){const _0x506f9d=_0x32e60b,_0x572a01=this['_width'],_0xfd6545=this[_0x506f9d(0x75c)],_0x1fe910=0x18,_0x1e8b50=_0x1fe910/0x2,_0xcaf6f=0x60+_0x1fe910,_0x34565a=0x0+_0x1fe910;this[_0x506f9d(0x774)][_0x506f9d(0x568)]=this['_windowskin'],this[_0x506f9d(0x774)][_0x506f9d(0x79e)]['x']=0.5,this[_0x506f9d(0x774)][_0x506f9d(0x79e)]['y']=0.5,this[_0x506f9d(0x774)][_0x506f9d(0x5b9)](_0xcaf6f+_0x1e8b50,_0x34565a+_0x1e8b50+_0x1fe910,_0x1fe910,_0x1e8b50),this[_0x506f9d(0x774)]['move'](Math[_0x506f9d(0x474)](_0x572a01/0x2),Math[_0x506f9d(0x474)](_0xfd6545-_0x1e8b50)),this['_upArrowSprite'][_0x506f9d(0x568)]=this[_0x506f9d(0x378)],this[_0x506f9d(0x614)][_0x506f9d(0x79e)]['x']=0.5,this[_0x506f9d(0x614)]['anchor']['y']=0.5,this['_upArrowSprite']['setFrame'](_0xcaf6f+_0x1e8b50,_0x34565a,_0x1fe910,_0x1e8b50),this['_upArrowSprite'][_0x506f9d(0x632)](Math[_0x506f9d(0x474)](_0x572a01/0x2),Math['round'](_0x1e8b50));},Window[_0x32e60b(0x303)][_0x32e60b(0x504)]=function(){const _0x145631=_0x32e60b,_0xd5a965=0x90,_0x33a19b=0x60,_0x320c74=0x18;this[_0x145631(0x56b)][_0x145631(0x568)]=this[_0x145631(0x378)],this[_0x145631(0x56b)][_0x145631(0x79e)]['x']=0.5,this['_pauseSignSprite'][_0x145631(0x79e)]['y']=0x1,this[_0x145631(0x56b)]['move'](Math[_0x145631(0x474)](this[_0x145631(0x35c)]/0x2),this[_0x145631(0x75c)]),this[_0x145631(0x56b)]['setFrame'](_0xd5a965,_0x33a19b,_0x320c74,_0x320c74),this[_0x145631(0x56b)][_0x145631(0x312)]=0xff;},Window[_0x32e60b(0x303)][_0x32e60b(0x6a3)]=function(){const _0x3ec624=_0x32e60b,_0x56ecaa=this[_0x3ec624(0x772)][_0x3ec624(0x2ff)][_0x3ec624(0x7c3)](new Point(0x0,0x0)),_0x364b59=this['_clientArea'][_0x3ec624(0x52e)];_0x364b59['x']=_0x56ecaa['x']+this[_0x3ec624(0x2f1)]['x'],_0x364b59['y']=_0x56ecaa['y']+this[_0x3ec624(0x2f1)]['y'],_0x364b59['width']=Math['ceil'](this[_0x3ec624(0x2dd)]*this[_0x3ec624(0x820)]['x']),_0x364b59['height']=Math['ceil'](this[_0x3ec624(0x3eb)]*this[_0x3ec624(0x820)]['y']);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x14a)]=Window['prototype'][_0x32e60b(0x6ef)],Window[_0x32e60b(0x303)]['_refreshBack']=function(){const _0x204f4f=_0x32e60b,_0x347dc7=VisuMZ[_0x204f4f(0x565)][_0x204f4f(0x1e6)][_0x204f4f(0x365)]['CorrectSkinBleeding']??!![];if(!_0x347dc7)return VisuMZ[_0x204f4f(0x565)][_0x204f4f(0x14a)][_0x204f4f(0x2d2)](this);const _0x586e9d=this[_0x204f4f(0x8d1)],_0xe63d1b=Math[_0x204f4f(0x66c)](0x0,this[_0x204f4f(0x35c)]-_0x586e9d*0x2),_0x3f0b90=Math[_0x204f4f(0x66c)](0x0,this['_height']-_0x586e9d*0x2),_0x582d0d=this[_0x204f4f(0x613)],_0x4d9a4a=_0x582d0d[_0x204f4f(0x38e)][0x0];_0x582d0d[_0x204f4f(0x568)]=this[_0x204f4f(0x378)],_0x582d0d[_0x204f4f(0x5b9)](0x0,0x0,0x60,0x60),_0x582d0d[_0x204f4f(0x632)](_0x586e9d,_0x586e9d),_0x582d0d['scale']['x']=_0xe63d1b/0x60,_0x582d0d[_0x204f4f(0x820)]['y']=_0x3f0b90/0x60,_0x4d9a4a['bitmap']=this[_0x204f4f(0x378)],_0x4d9a4a[_0x204f4f(0x5b9)](0x0,0x60,0x60,0x60),_0x4d9a4a[_0x204f4f(0x632)](0x0,0x0,_0xe63d1b,_0x3f0b90),_0x4d9a4a[_0x204f4f(0x820)]['x']=0x1/_0x582d0d[_0x204f4f(0x820)]['x'],_0x4d9a4a[_0x204f4f(0x820)]['y']=0x1/_0x582d0d['scale']['y'],_0x582d0d[_0x204f4f(0x57a)](this['_colorTone']);},Game_Temp[_0x32e60b(0x303)]['sceneTerminationClearEffects']=function(){const _0x2b0480=_0x32e60b;this['_animationQueue']=[],this[_0x2b0480(0x374)]=[],this[_0x2b0480(0x475)]=[],this[_0x2b0480(0x2ec)]=[];},VisuMZ['CoreEngine'][_0x32e60b(0x290)]=Scene_Base[_0x32e60b(0x303)]['terminate'],Scene_Base[_0x32e60b(0x303)]['terminate']=function(){const _0x37d1d8=_0x32e60b;if($gameTemp)$gameTemp[_0x37d1d8(0x29c)]();VisuMZ['CoreEngine'][_0x37d1d8(0x290)][_0x37d1d8(0x2d2)](this);},Bitmap[_0x32e60b(0x303)][_0x32e60b(0x8aa)]=function(_0x4037d5){const _0x177d4a=_0x32e60b,_0x55d76f=this[_0x177d4a(0x88b)];_0x55d76f[_0x177d4a(0x6c4)](),_0x55d76f['font']=this[_0x177d4a(0x198)]();const _0x4bba9a=_0x55d76f[_0x177d4a(0x3e4)](_0x4037d5)[_0x177d4a(0x36c)];return _0x55d76f['restore'](),_0x4bba9a;},Window_Message[_0x32e60b(0x303)]['textWidth']=function(_0x101444){const _0x506db5=_0x32e60b;return this[_0x506db5(0x713)]()?this[_0x506db5(0x6eb)][_0x506db5(0x8aa)](_0x101444):Window_Base['prototype']['textWidth'][_0x506db5(0x2d2)](this,_0x101444);},Window_Message[_0x32e60b(0x303)][_0x32e60b(0x713)]=function(){const _0x48c2d4=_0x32e60b;return VisuMZ[_0x48c2d4(0x565)][_0x48c2d4(0x1e6)][_0x48c2d4(0x89e)][_0x48c2d4(0x243)]??!![];},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x184)]=Game_Action[_0x32e60b(0x303)][_0x32e60b(0x56d)],Game_Action[_0x32e60b(0x303)][_0x32e60b(0x56d)]=function(){const _0x47f370=_0x32e60b;return this['item']()?VisuMZ[_0x47f370(0x565)][_0x47f370(0x184)][_0x47f370(0x2d2)](this):0x0;},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x1dd)]=Game_Action[_0x32e60b(0x303)]['setAttack'],Game_Action['prototype']['setAttack']=function(){const _0x2b20a2=_0x32e60b;if(this['subject']()&&this['subject']()[_0x2b20a2(0x81c)]())VisuMZ[_0x2b20a2(0x565)][_0x2b20a2(0x1dd)][_0x2b20a2(0x2d2)](this);else BattleManager[_0x2b20a2(0x594)]?VisuMZ[_0x2b20a2(0x565)][_0x2b20a2(0x1dd)][_0x2b20a2(0x2d2)](this):this['clear']();},VisuMZ['CoreEngine'][_0x32e60b(0x199)]=BattleManager[_0x32e60b(0x1ee)],BattleManager[_0x32e60b(0x1ee)]=function(_0x3dc1a8,_0x510554){const _0x32d521=_0x32e60b;this[_0x32d521(0x594)]=!![],VisuMZ['CoreEngine']['BattleManager_invokeCounterAttack']['call'](this,_0x3dc1a8,_0x510554),this[_0x32d521(0x594)]=undefined;},Sprite_Name[_0x32e60b(0x303)][_0x32e60b(0x5a1)]=function(){return 0x24;},Sprite_Name['prototype'][_0x32e60b(0x265)]=function(){const _0x389e43=_0x32e60b,_0x195242=this[_0x389e43(0x50d)](),_0xbab365=this[_0x389e43(0x5c9)](),_0x3ca829=this[_0x389e43(0x5a1)]();this['setupFont'](),this[_0x389e43(0x568)][_0x389e43(0x22f)](),this[_0x389e43(0x568)][_0x389e43(0x87c)](_0x195242,0x4,0x0,_0xbab365-0xa,_0x3ca829,_0x389e43(0x322));},Bitmap[_0x32e60b(0x303)]['drawTextTopAligned']=function(_0x2558fd,_0x420205,_0xc3ffa1,_0xe09789,_0x32c7b1,_0x33b3ed){const _0x371f6a=_0x32e60b,_0x29fcba=this[_0x371f6a(0x88b)],_0x38019b=_0x29fcba[_0x371f6a(0x34a)];_0xe09789=_0xe09789||0xffffffff;let _0x46a787=_0x420205,_0x5196b4=Math[_0x371f6a(0x474)](_0xc3ffa1+0x18/0x2+this[_0x371f6a(0x69b)]*0.35);_0x33b3ed===_0x371f6a(0x718)&&(_0x46a787+=_0xe09789/0x2),_0x33b3ed===_0x371f6a(0x19e)&&(_0x46a787+=_0xe09789),_0x29fcba['save'](),_0x29fcba[_0x371f6a(0x703)]=this[_0x371f6a(0x198)](),_0x29fcba[_0x371f6a(0x665)]=_0x33b3ed,_0x29fcba[_0x371f6a(0x238)]='alphabetic',_0x29fcba[_0x371f6a(0x34a)]=0x1,this[_0x371f6a(0x819)](_0x2558fd,_0x46a787,_0x5196b4,_0xe09789),_0x29fcba['globalAlpha']=_0x38019b,this['_drawTextBody'](_0x2558fd,_0x46a787,_0x5196b4,_0xe09789),_0x29fcba[_0x371f6a(0x489)](),this['_baseTexture'][_0x371f6a(0x512)]();},VisuMZ[_0x32e60b(0x565)]['BattleManager_checkSubstitute']=BattleManager[_0x32e60b(0x17d)],BattleManager[_0x32e60b(0x17d)]=function(_0x1b7eac){const _0x371c84=_0x32e60b;if(this[_0x371c84(0x27d)][_0x371c84(0x6ee)]())return![];return VisuMZ[_0x371c84(0x565)][_0x371c84(0x55a)][_0x371c84(0x2d2)](this,_0x1b7eac);},BattleManager[_0x32e60b(0x3c4)]=function(){const _0x52b883=_0x32e60b;if(this[_0x52b883(0x1a9)])this[_0x52b883(0x5be)][_0x52b883(0x3c4)](this[_0x52b883(0x1a9)]);this[_0x52b883(0x8a7)]=_0x52b883(0x66b),this[_0x52b883(0x1a9)]&&this[_0x52b883(0x1a9)][_0x52b883(0x317)]()===0x0&&(this['endBattlerActions'](this['_subject']),this[_0x52b883(0x1a9)]=null);},Bitmap[_0x32e60b(0x303)][_0x32e60b(0x8a0)]=function(){const _0x16228e=_0x32e60b;this['_image']=new Image(),this[_0x16228e(0x45f)][_0x16228e(0x42a)]=this[_0x16228e(0x4b9)]['bind'](this),this[_0x16228e(0x45f)]['onerror']=this['_onError'][_0x16228e(0x3d0)](this),this[_0x16228e(0x187)](),this['_loadingState']='loading',Utils['hasEncryptedImages']()?this['_startDecrypting']():(this['_image'][_0x16228e(0x2ad)]=this[_0x16228e(0x466)],![]&&this[_0x16228e(0x45f)][_0x16228e(0x36c)]>0x0&&(this['_image'][_0x16228e(0x42a)]=null,this[_0x16228e(0x4b9)]()));},Scene_Skill[_0x32e60b(0x303)][_0x32e60b(0x670)]=function(){const _0xd95f71=_0x32e60b;Scene_MenuBase[_0xd95f71(0x303)][_0xd95f71(0x670)][_0xd95f71(0x2d2)](this),this[_0xd95f71(0x113)](),this[_0xd95f71(0x30a)][_0xd95f71(0x33c)](),this['_itemWindow'][_0xd95f71(0x2ca)](),this[_0xd95f71(0x323)][_0xd95f71(0x757)]();},Scene_Skill[_0x32e60b(0x303)]['arePageButtonsEnabled']=function(){const _0x3d49de=_0x32e60b;return this['_skillTypeWindow']&&this[_0x3d49de(0x323)][_0x3d49de(0x1ec)];},Game_Map['prototype'][_0x32e60b(0x51d)]=function(_0xc85ced,_0x54a630,_0x2b0391){const _0x58f2a3=_0x32e60b,_0x223729=this[_0x58f2a3(0x276)](),_0x4a5885=this[_0x58f2a3(0x8b7)](_0xc85ced,_0x54a630);for(const _0xcde32e of _0x4a5885){const _0x49a7f6=_0x223729[_0xcde32e];if(_0x49a7f6===undefined||_0x49a7f6===null){if($gameTemp[_0x58f2a3(0x252)]()&&!DataManager[_0x58f2a3(0x112)]()){let _0x409ffb=_0x58f2a3(0x515)+'\x0a';_0x409ffb+=_0x58f2a3(0x6ca)+'\x0a',_0x409ffb+=_0x58f2a3(0x18a),this[_0x58f2a3(0x456)]()?(alert(_0x409ffb),SceneManager[_0x58f2a3(0x84e)]()):(console[_0x58f2a3(0x57f)](_0x409ffb),!$gameTemp[_0x58f2a3(0x775)]&&($gameTemp[_0x58f2a3(0x775)]=!![],SceneManager[_0x58f2a3(0x16c)]()));}}if((_0x49a7f6&0x10)!==0x0)continue;if((_0x49a7f6&_0x2b0391)===0x0)return!![];if((_0x49a7f6&_0x2b0391)===_0x2b0391)return![];}return![];},Game_Map['prototype'][_0x32e60b(0x456)]=function(){const _0x84aca2=_0x32e60b;if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported[_0x84aca2(0x65e)])return!![];return![];},Sprite_Animation[_0x32e60b(0x303)][_0x32e60b(0x843)]=function(_0x4a929b){const _0x21f789=_0x32e60b;!this['_originalViewport']&&(this[_0x21f789(0x4d6)]=_0x4a929b['gl'][_0x21f789(0x499)](_0x4a929b['gl'][_0x21f789(0x573)]));},VisuMZ['CoreEngine'][_0x32e60b(0x582)]=Scene_Map['prototype']['shouldAutosave'],Scene_Map[_0x32e60b(0x303)][_0x32e60b(0x188)]=function(){const _0xdec5c=_0x32e60b,_0x3f5811=SceneManager[_0xdec5c(0x263)][_0xdec5c(0x50d)];if([_0xdec5c(0x413),_0xdec5c(0x28a),'Scene_TitleTransition',_0xdec5c(0x42c)][_0xdec5c(0x7b0)](_0x3f5811))return![];return VisuMZ[_0xdec5c(0x565)][_0xdec5c(0x582)]['call'](this);},VisuMZ[_0x32e60b(0x565)][_0x32e60b(0x221)]=Window_SkillList[_0x32e60b(0x303)][_0x32e60b(0x7b0)],Window_SkillList['prototype'][_0x32e60b(0x7b0)]=function(_0x52ab75){const _0x2af46b=_0x32e60b;if(this['_stypeId']<=0x0)return![];return VisuMZ[_0x2af46b(0x565)]['Window_SkillList_includes'][_0x2af46b(0x2d2)](this,_0x52ab75);};