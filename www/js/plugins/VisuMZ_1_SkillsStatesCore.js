//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.47;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.47] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
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
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x38de83=_0x2f11;function _0x17d9(){const _0x3d9801=['allIcons','format','setupSkillsStatesCore','endAction','drawSkillCost','Game_BattlerBase_refresh','shift','createCommandNameWindow','parse','drawActorStateTurns','eraseBuff','MDF','_skillIDs','_currentActor','isSceneBattle','testApply','DataOffsetX','_stateData','width','push','clearStates','stateHpSlipHealJS','isUserBypassRemoveStatesByDamage','Game_BattlerBase_skillMpCost','Skill-%1-%2','stateColor','_lastStatesActionEndFrameCount','isStateExpired','match','setDebuffTurns','drawItemStyleIcon','addCommand','ARRAYNUM','checkSkillConditionsNotetags','CalcJS','slipHp','contents','clearStateData','getStateRetainType','States','commandName','uiInputPosition','applyBuffTurnManipulationEffects','labelOutlineColor','Game_Battler_addBuff','toLowerCase','onExpireBuffGlobalJS','onExpireState','statesByCategory','removeOtherStatesOfSameCategory','makeSuccess','makeResistedStateCategories','gainMp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','exit','uiHelpPosition','Game_BattlerBase_clearStates','meetsSkillConditions','currentValueSkillsStatesCore','onExpireBuff','parameters','categories','_subject','calcWindowHeight','iconHeight','PassiveStates','initMembersSkillsStatesCore','SkillsStatesCore','SortSkillTypesAbc','createShopStatusWindow','Game_BattlerBase_recoverAll','slice','randomInt','isSkillHidden','meetsPassiveStateConditionJS','valueFontFace','uiMenuStyle','ARRAYSTRUCT','onExpireDebuffJS','action','mainFontSize','State-%1-%2','Parse_Notetags_Skill_JS','traitsSet','Parse_Notetags_Skill_Cost','Gauge','isBuffOrDebuffAffected','_cache','createAllSkillCostText','updateVisibility','AutoAddState','currentMaxValue','commandStyleCheck','TurnFontSize','setActor','MAT','createKeyJS','addPassiveStatesByNotetag','setup','onEraseStateGlobalJS','removeStatesByCategoryAll','Game_BattlerBase_meetsSkillConditions','Actor-%1-%2','Name','isRightInputMode','setStateRetainType','auto','SkillSceneAdjustSkillList','_data','Sprite_Gauge_gaugeRate','hasSkill','state','checkSkillConditionsSwitchNotetags','updateFrame','tpCost','addStateTurns','setStateTurns','replace','_bypassRemoveStateDamage_user','skillMpCost','DataFontSize','_tempBattler','getClassIdWithName','maxSlipDamage','Game_Actor_learnSkill','recoverAll','updatedLayoutStyle','debuffTurns','3862810WvOcsL','drawItemStyleIconText','heal','onAddBuffJS','passiveStateIDs','makeCommandName','_actor','Window_SkillStatus_refresh','STRUCT','SortByIDandPriorityUsingIDs','convertPassiveStates','concat','_states','commandNameWindowDrawText','canUse','windowPadding','regenerateAll','getCurrentTroopUniqueID','scrollTo','Parse_Notetags_State_Category','retrieveStateColor','Scene_Boot_onDatabaseLoaded','applySkillsStatesCoreEffects','6ttUiRu','meetsPassiveStateConditionClasses','onEraseBuff','user','drawItem','Game_Action_applyItemUserEffect','mpCost','updateStatesActionEnd','getSkillTypes','canChangeSkillsThroughStateEffects','Game_BattlerBase_eraseBuff','skill','mainFontFace','changePaintOpacity','testSkillStatesCoreNotetags','stateEraseJS','recalculateSlipDamageJS','canClearState','addBuffTurns','states','Weapon-%1-%2','skillTypeWindowRect','members','overwriteBuffTurns','ShowShopStatus','onAddDebuffGlobalJS','shopStatusWindowRect','Window_SkillType_initialize','Parse_Notetags_State_ApplyRemoveLeaveJS','%1\x20%2\x20%3','onDatabaseLoaded','setBackgroundType','Scene_Skill_skillTypeWindowRect','height','Costs','drawTextEx','priority','checkSkillTypeMatch','_stateIDs','LabelOutlineSolid','SkillID','hpDamage','VisuMZ_1_ItemsEquipsCore','getStateReapplyRulings','allBattleMembers','ColorNegative','onEraseStateCustomJS','TurnOffsetX','getStateDisplay','CheckBypassRemoveStatesByDamage','ShowTurns','_classIDs','stateTpSlipHealJS','Game_BattlerBase_overwriteBuffTurns','placeExactGauge','AGI','meetsSkillConditionsEnableJS','ceil','checkShowHideJS','trim','isSkillTypeMatchForUse','_buffs','meetsPassiveStateGlobalConditionJS','stateMpSlipHealJS','eraseState','gaugeBackColor','isUseModernControls','addPassiveStatesFromOtherPlugins','Game_Switches_onChange','toUpperCase','getStateIdWithName','Skills','greater','ParseClassIDs','ParseSkillNotetags','onBattleEnd','_cache_getPassiveStateConditionClassesData','addState','POSITIVE','Window_StatusBase_placeGauge','_categoryWindow','index','gaugeColor1','isBuffPrevented','getStypeIdWithName','onExpireBuffJS','2487842mEyOYq','stateMaximumTurns','Sprite_StateIcon_loadBitmap','buffIconIndex','name','Sprite_Gauge_currentMaxValue','paySkillCost','forgetSkill','Actor','call','clearStateOrigin','addPassiveStatesByPluginParameters','HiddenSkillTypes','addWindow','2420780QDuSlH','EnemyIndex','none','addDebuffTurns','Sprite_StateIcon_updateFrame','itemTextAlign','increaseBuff','Game_Battler_addDebuff','onRemoveState','multiClass','onEraseDebuffJS','allSwitchOff','slipMp','ConvertParams','hasState','ParseAllNotetags','menuActor','_commandNameWindow','_colorCache','alterSkillName','stypeId','getSkillChangesFromState','drawActorStateData','<troop-%1>','equipPassives','gradientFillRect','CheckVisibleSkillNotetags','buttonAssistSwitch','Window_SkillList_setActor','_hidden','_endingBattle','applyItemUserEffect','rgba(0,\x200,\x200,\x200)','prepareResetStateCounts','drawExtendedParameter','frameCount','onExpireStateCustomJS','drawExtendedSkillsStatesCoreStatus','83619JelReS','meetsStateCondition','redraw','skillId','onAddStateCustomJS','removeBuffsAuto','_stored_buffColor','Game_Actor_forgetSkill','onEraseBuffGlobalJS','Sprite_Gauge_redraw','includes','prototype','stateId','_statusWindow','isStateCategoryAffected','isBuffAffected','isAlive','Game_BattlerBase_die','Parse_Notetags_Skill_Sorting','Game_Battler_onBattleEnd','Game_BattlerBase_states','VisuMZ_1_MainMenuCore','addPassiveStates','clearStateRetainType','Parse_Notetags_State_SlipEffectJS','fontBold','fillRect','<actor-%1>','stateCategoriesResisted','\x5cI[%1]%2','recover\x20all','maxItems','isPlaytest','_bypassRemoveStateDamage_value','isMaxDebuffAffected','ActorIDs','StackDebuffMax','restriction','onExpireStateGlobalJS','passiveStates','isUseSkillsStatesCoreUpdatedLayout','checkCacheKey','GaugeCurrentJS','test','CmdStyle','colSpacing','redrawSkillsStatesCore','_passiveStateResults','updateCommandNameWindow','updateTurnDisplaySprite','split','setStateData','Scene_Skill_itemWindowRect','ColorBuff','_checkingPassiveStates','getColor','MatchLabelColor','anySwitchOn','onEraseBuffJS','commandNameWindowCenter','isLearnedSkill','paramBuffRate','FUNC','createTurnDisplaySprite','deadMembers','Game_BattlerBase_resetStateCounts','max','textSizeEx','Sprite_Gauge_currentValue','makeCurrentTroopUniqueID','Game_Actor_skillTypes','VisuMZ_2_ClassChangeSystem','Buffs','bitmap','placeGauge','death','stateData','resetFontSettings','isStateResist','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','right','onAddStateMakeCustomSlipValues','_stateOrigin','getPassiveStatesFromObj','ValueFontMainType','Game_Unit_isAllDead','onAddStateGlobalJS','TurnOffsetY','_stateSteps','onEraseDebuff','mainAreaTop','skills','drawActorBuffRates','_turnDisplaySprite','DEF','item','applyDebuffTurnManipulationEffects','Class-%1-%2','process_VisuMZ_SkillsStatesCore_Notetags','onExpireDebuff','learnSkill','stateMpSlipDamageJS','Sprite_Gauge_setup','itemWindowRect','onAddBuffGlobalJS','slipTp','mpDamage','isStateRemoved','refresh','gainHp','Game_Battler_regenerateAll','BattleHiddenSkillTypes','indexOf','setStatusWindow','innerWidth','onRegenerateCustomStateDamageOverTime','getCurrentStateOriginKey','Game_Action_testApply','damage','skillCostSeparator','itemAt','allSwitchOn','drawActorIconsAllTurnCounters','clear','localeCompare','CheckIncompatibleStates','setStateDisplay','addBuff','makeAdditionalSkillCostText','getSkillIdWithName','onChange','changeTextColor','map','statePassiveConditionJS','StateTurnsActorChangeTo','usableSkills','_stypeIDs','isBuffExpired','CoreEngine','version','min','value','meetsPassiveStateConditions','mainAreaHeight','StateID','sortSkillList','stateAddJS','meetsSkillConditionsGlobalJS','process_VisuMZ_SkillsStatesCore_State_Notetags','hide','getCurrentStateActiveUser','itemWindowRectSkillsStatesCore','isCommandEnabled','normalColor','enemyId','target','success','includesSkillsStatesCore','PassiveConditionJS','convertGaugeTypeSkillsStatesCore','decreaseBuff','_stateTurns','CheckVisibleBattleNotetags','iconIndex','stateExpireJS','Game_Variables_onChange','debuffColor','_stateDisplay','currentClass','active','icon','buffColor','gaugeLineHeight','convertTargetToStateOriginKey','buffTurns','Enemy','_itemWindow','DataOffsetY','removeBuff','removeStatesByCategory','ValueOutlineWidth','setStateOrigin','Settings','text','outlineColor','LabelFontMainType','allowCreateShopStatusWindow','helpAreaTop','skillVisibleJS','stateTpSlipDamageJS','_skillTypeWindow','clearStateDisplay','commandStyle','regenerateAllSkillsStatesCore','applyStateTurnManipulationEffects','_stateMaxTurns','IconStypeMagic','Game_BattlerBase_buffIconIndex','_skillChangesFromState','createSkillCostText','clearStatesWithStateRetain','inBattle','Window_SkillList_maxCols','_stateRetainType','currentValue','Game_BattlerBase_eraseState','Enemy-%1-%2','status','actions','Game_BattlerBase_skillTpCost','SortByIDandPriority','isAllDead','Game_Battler_isStateAddable','onAddDebuff','gaugeColor2','stepsForTurn','9XQEmTJ','StateTurnsActorChangeBy','ANY','Turns','addChild','iconWidth','adjustItemWidthByShopStatus','mainCommandWidth','drawActorIcons','meetsPassiveStateConditionSwitches','GaugeMaxJS','Window_SkillList_makeItemList','ignore','isDebuffAffected','clearAllStateOrigins','_checkingTraitsSetSkillsStatesCore','constructor','RefreshCacheVar','applyStateCategoryRemovalEffects','labelOutlineWidth','addDebuff','executeHpDamage','GroupDigits','setBuffTurns','2WiHgru','textColor','updateHelp','ARRAYEVAL','setItem','resetStateCounts','BattleManager_endAction','setPassiveStateSlipDamageJS','removeByDamage','createItemWindow','process_VisuMZ_SkillsStatesCore_Skill_Notetags','currentMaxValueSkillsStatesCore','MAXHP','changeOutlineColor','shopStatusWindowRectSkillsStatesCore','_cache_getPassiveStatesFromObj','Window_StatusBase_drawActorIcons','MatchLabelGaugeColor','TextJS','_checkingVisuMzPassiveStateObjects','onAddStateJS','center','actorId','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','isPassiveStateStackable','length','helpWindowRect','actor','onAddBuff','ShowData','iconText','chanceByDamage','callUpdateHelp','canSortSkillTypeList','8166824riByDy','_stypeId','drawText','skillEnableJS','createPassiveStatesCache','649370ZYRXHr','hasStateCategory','clamp','die','valueOutlineWidth','Game_BattlerBase_decreaseBuff','_costSettings','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','helpAreaHeight','isTargetBypassRemoveStatesByDamage','_skills','anySwitchOff','aliveMembers','drawFullGauge','Game_BattlerBase_traitsSet','paramValueByName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','CheckVisibleSwitchNotetags','numberFontFace','PresetLabelGaugeColor','getColorDataFromPluginParameters','isPartyAllAffectedByGroupDefeatStates','%1%','Window_SkillList_drawItem','reset','gaugeRate','LabelOutlineWidth','getStateOrigin','_battler','Scene_Skill_helpWindowRect','registerCommand','checkShowHideNotetags','ActionEndUpdate','IconStypeNorm','keys','SkillActorPaySkillCost','STR','resetTextColor','ATK','isBottomHelpMode','isStateCategoryResisted','Parse_Notetags_State_PassiveJS','itemLineRect','changeSkillsThroughStateEffects','gainSilentTp','initialize','buff','Scene_Skill_createItemWindow','TurnEndOnMap','totalStateCategoryAffected','ColorPositive','_tempActor','isStateAddable','MaxTurns','groupDefeat','skillTypes','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','isActor','statusWindowRect','ListWindowCols','filter','SkillSceneStatusBgType','RefreshCacheSwitch','removeStatesAuto','getStateData','StackBuffMax','commandNameWindowDrawBackground','log','_bypassRemoveStateDamage_action','passiveStateObjects','isStateAffected','DisplayedParams','drawIcon','onExpireDebuffGlobalJS','Game_BattlerBase_initMembers','onAddState','initMembers','useDigitGrouping','shopStatusWidth','attacker','ARRAYSTR','note','isSkillCostShown','bypassRemoveStatesByDamage','equips','Game_Troop_setup','Armor-%1-%2','drawActorBuffTurns','MAXMP','boxWidth','stateHpSlipDamageJS','floor','_scene','Game_Action_executeHpDamage_bypassStateDmgRemoval','_currentTroopUniqueID','<enemy-%1>','1131666INhSNl','adjustSkillCost','number','getPassiveStateConditionSwitchData','VisuMZ_1_ElementStatusCore','ParseStateNotetags','makeItemList','helpWindowRectSkillsStatesCore','loadBitmap','valueOutlineColor','Game_BattlerBase_isStateResist','skillTypeWindowRectSkillsStatesCore','_result','_shopStatusWindow','ColorDebuff','removeState','VisuMZ_0_CoreEngine','sort','_cache_CheckBypassRemoveStatesByDamage','isGroupDefeatStateAffected','getStateOriginByKey','onEraseDebuffGlobalJS','rgba(0,\x200,\x200,\x201)','stateTurns','_cache_getPassiveStateConditionSwitchData','anchor','round','autoRemovalTiming','sortPriority','getPassiveStateConditionClassesData','ParseSkillChangessIntoData','_animationIndex','_buffTurns','Game_Unit_deadMembers','Sprite_Gauge_initMembers','fontSize','traitObjects','ReapplyRules','Window_SkillList_includes'];_0x17d9=function(){return _0x3d9801;};return _0x17d9();}(function(_0x59ac59,_0x17bb66){const _0x3b1afd=_0x2f11,_0x64caf1=_0x59ac59();while(!![]){try{const _0x3e76ef=parseInt(_0x3b1afd(0x1be))/0x1*(parseInt(_0x3b1afd(0x137))/0x2)+parseInt(_0x3b1afd(0x306))/0x3+parseInt(_0x3b1afd(0x2e0))/0x4+-parseInt(_0x3b1afd(0x15e))/0x5*(parseInt(_0x3b1afd(0x27c))/0x6)+-parseInt(_0x3b1afd(0x2d2))/0x7+-parseInt(_0x3b1afd(0x159))/0x8*(parseInt(_0x3b1afd(0x11f))/0x9)+parseInt(_0x3b1afd(0x265))/0xa;if(_0x3e76ef===_0x17bb66)break;else _0x64caf1['push'](_0x64caf1['shift']());}catch(_0x151ba0){_0x64caf1['push'](_0x64caf1['shift']());}}}(_0x17d9,0x9d712));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x38de83(0x19a)](function(_0x45b165){const _0x13fe01=_0x38de83;return _0x45b165[_0x13fe01(0x116)]&&_0x45b165['description'][_0x13fe01(0x310)]('['+label+']');})[0x0];function _0x2f11(_0x495b25,_0x4984ae){const _0x17d934=_0x17d9();return _0x2f11=function(_0x2f11b2,_0x51dec7){_0x2f11b2=_0x2f11b2-0x6b;let _0x4fb35a=_0x17d934[_0x2f11b2];return _0x4fb35a;},_0x2f11(_0x495b25,_0x4984ae);}VisuMZ[label][_0x38de83(0xfd)]=VisuMZ[label][_0x38de83(0xfd)]||{},VisuMZ[_0x38de83(0x2ed)]=function(_0x136d25,_0x6ea40e){const _0x45dacd=_0x38de83;for(const _0x4b874c in _0x6ea40e){if(_0x4b874c[_0x45dacd(0x201)](/(.*):(.*)/i)){const _0x3d57f6=String(RegExp['$1']),_0x2f0a2c=String(RegExp['$2'])[_0x45dacd(0x2c1)]()['trim']();let _0x3e343b,_0x4f0a0f,_0x521a9a;switch(_0x2f0a2c){case'NUM':_0x3e343b=_0x6ea40e[_0x4b874c]!==''?Number(_0x6ea40e[_0x4b874c]):0x0;break;case _0x45dacd(0x205):_0x4f0a0f=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):[],_0x3e343b=_0x4f0a0f[_0x45dacd(0xcb)](_0x410ec2=>Number(_0x410ec2));break;case'EVAL':_0x3e343b=_0x6ea40e[_0x4b874c]!==''?eval(_0x6ea40e[_0x4b874c]):null;break;case _0x45dacd(0x13a):_0x4f0a0f=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):[],_0x3e343b=_0x4f0a0f[_0x45dacd(0xcb)](_0x47dd95=>eval(_0x47dd95));break;case'JSON':_0x3e343b=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):'';break;case'ARRAYJSON':_0x4f0a0f=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):[],_0x3e343b=_0x4f0a0f[_0x45dacd(0xcb)](_0x41c632=>JSON[_0x45dacd(0x1ed)](_0x41c632));break;case _0x45dacd(0x85):_0x3e343b=_0x6ea40e[_0x4b874c]!==''?new Function(JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c])):new Function('return\x200');break;case'ARRAYFUNC':_0x4f0a0f=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):[],_0x3e343b=_0x4f0a0f[_0x45dacd(0xcb)](_0x2d4bee=>new Function(JSON[_0x45dacd(0x1ed)](_0x2d4bee)));break;case _0x45dacd(0x182):_0x3e343b=_0x6ea40e[_0x4b874c]!==''?String(_0x6ea40e[_0x4b874c]):'';break;case _0x45dacd(0x1ae):_0x4f0a0f=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):[],_0x3e343b=_0x4f0a0f[_0x45dacd(0xcb)](_0x216f19=>String(_0x216f19));break;case _0x45dacd(0x26d):_0x521a9a=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):{},_0x136d25[_0x3d57f6]={},VisuMZ[_0x45dacd(0x2ed)](_0x136d25[_0x3d57f6],_0x521a9a);continue;case _0x45dacd(0x232):_0x4f0a0f=_0x6ea40e[_0x4b874c]!==''?JSON[_0x45dacd(0x1ed)](_0x6ea40e[_0x4b874c]):[],_0x3e343b=_0x4f0a0f[_0x45dacd(0xcb)](_0x5de625=>VisuMZ['ConvertParams']({},JSON['parse'](_0x5de625)));break;default:continue;}_0x136d25[_0x3d57f6]=_0x3e343b;}}return _0x136d25;},(_0x351da2=>{const _0x470d79=_0x38de83,_0x1fcadb=_0x351da2[_0x470d79(0x2d6)];for(const _0x233c88 of dependencies){if(!Imported[_0x233c88]){alert(_0x470d79(0x96)[_0x470d79(0x1e6)](_0x1fcadb,_0x233c88)),SceneManager[_0x470d79(0x21b)]();break;}}const _0x1184a6=_0x351da2['description'];if(_0x1184a6[_0x470d79(0x201)](/\[Version[ ](.*?)\]/i)){const _0x33fc29=Number(RegExp['$1']);_0x33fc29!==VisuMZ[label][_0x470d79(0xd2)]&&(alert(_0x470d79(0x21a)[_0x470d79(0x1e6)](_0x1fcadb,_0x33fc29)),SceneManager['exit']());}if(_0x1184a6[_0x470d79(0x201)](/\[Tier[ ](\d+)\]/i)){const _0x451f45=Number(RegExp['$1']);_0x451f45<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x470d79(0x1e6)](_0x1fcadb,_0x451f45,tier)),SceneManager[_0x470d79(0x21b)]()):tier=Math['max'](_0x451f45,tier);}VisuMZ[_0x470d79(0x2ed)](VisuMZ[label][_0x470d79(0xfd)],_0x351da2[_0x470d79(0x221)]);})(pluginData),PluginManager[_0x38de83(0x17c)](pluginData[_0x38de83(0x2d6)],_0x38de83(0x181),_0x2fc8d7=>{const _0x14faa2=_0x38de83;VisuMZ[_0x14faa2(0x2ed)](_0x2fc8d7,_0x2fc8d7);const _0x33cfc0=_0x2fc8d7['ActorIDs']||[],_0x39f7b1=Number(_0x2fc8d7[_0x14faa2(0x2a4)]),_0x5cec4d=$dataSkills[_0x39f7b1];if(!_0x5cec4d)return;for(const _0x1b6c6c of _0x33cfc0){const _0x4250aa=$gameActors[_0x14faa2(0x152)](_0x1b6c6c);if(!_0x4250aa)continue;_0x4250aa[_0x14faa2(0x2d8)](_0x5cec4d);}}),PluginManager[_0x38de83(0x17c)](pluginData[_0x38de83(0x2d6)],'SkillEnemyPaySkillCost',_0x5bf1c8=>{const _0x19d835=_0x38de83;VisuMZ[_0x19d835(0x2ed)](_0x5bf1c8,_0x5bf1c8);const _0x1ba971=_0x5bf1c8[_0x19d835(0x2e1)]||[],_0xcffeec=Number(_0x5bf1c8[_0x19d835(0x2a4)]),_0x5e7bfc=$dataSkills[_0xcffeec];if(!_0x5e7bfc)return;for(const _0x3a395c of _0x1ba971){const _0x4057da=$gameTroop['members']()[_0x3a395c];if(!_0x4057da)continue;_0x4057da[_0x19d835(0x2d8)](_0x5e7bfc);}}),PluginManager[_0x38de83(0x17c)](pluginData[_0x38de83(0x2d6)],_0x38de83(0x120),_0x41b2d9=>{const _0x3dbde7=_0x38de83;VisuMZ[_0x3dbde7(0x2ed)](_0x41b2d9,_0x41b2d9);const _0x58a760=_0x41b2d9['ActorIDs']||[],_0x4574b0=Number(_0x41b2d9[_0x3dbde7(0xd7)]),_0x217683=Number(_0x41b2d9[_0x3dbde7(0x122)]),_0x4bbbca=_0x41b2d9[_0x3dbde7(0x23f)];for(const _0x580955 of _0x58a760){const _0x4427dd=$gameActors[_0x3dbde7(0x152)](_0x580955);if(!_0x4427dd)continue;_0x4bbbca&&!_0x4427dd[_0x3dbde7(0x1a4)](_0x4574b0)?(_0x4427dd['addState'](_0x4574b0),_0x4427dd[_0x3dbde7(0x259)](_0x4574b0,_0x217683)):_0x4427dd[_0x3dbde7(0x258)](_0x4574b0,_0x217683);}}),PluginManager[_0x38de83(0x17c)](pluginData[_0x38de83(0x2d6)],_0x38de83(0xcd),_0x4a2c18=>{const _0x1b3b42=_0x38de83;VisuMZ[_0x1b3b42(0x2ed)](_0x4a2c18,_0x4a2c18);const _0xad7520=_0x4a2c18[_0x1b3b42(0x329)]||[],_0x5048cd=Number(_0x4a2c18[_0x1b3b42(0xd7)]),_0x4c7ace=Math[_0x1b3b42(0x89)](Number(_0x4a2c18[_0x1b3b42(0x122)]),0x0),_0x3a17c4=_0x4a2c18['AutoAddState'];for(const _0x503d93 of _0xad7520){const _0xca1e59=$gameActors[_0x1b3b42(0x152)](_0x503d93);if(!_0xca1e59)continue;_0x3a17c4&&!_0xca1e59[_0x1b3b42(0x1a4)](_0x5048cd)&&_0xca1e59['addState'](_0x5048cd),_0xca1e59[_0x1b3b42(0x259)](_0x5048cd,_0x4c7ace);}}),PluginManager['registerCommand'](pluginData['name'],'StateTurnsEnemyChangeBy',_0x1bc6c9=>{const _0x4afc2f=_0x38de83;if(!$gameParty[_0x4afc2f(0x110)]())return;VisuMZ[_0x4afc2f(0x2ed)](_0x1bc6c9,_0x1bc6c9);const _0x4cdbef=_0x1bc6c9[_0x4afc2f(0x2e1)]||[],_0x2b9c98=Number(_0x1bc6c9[_0x4afc2f(0xd7)]),_0x3264ff=Number(_0x1bc6c9['Turns']),_0x517430=_0x1bc6c9['AutoAddState'];for(const _0x2adc4e of _0x4cdbef){const _0x5ec89f=$gameTroop[_0x4afc2f(0x292)]()[_0x2adc4e];if(!_0x5ec89f)continue;_0x517430&&!_0x5ec89f[_0x4afc2f(0x1a4)](_0x2b9c98)?(_0x5ec89f[_0x4afc2f(0x2c9)](_0x2b9c98),_0x5ec89f[_0x4afc2f(0x259)](_0x2b9c98,_0x3264ff)):_0x5ec89f['addStateTurns'](_0x2b9c98,_0x3264ff);}}),PluginManager[_0x38de83(0x17c)](pluginData[_0x38de83(0x2d6)],'StateTurnsEnemyChangeTo',_0x407cc8=>{const _0x381446=_0x38de83;if(!$gameParty[_0x381446(0x110)]())return;VisuMZ[_0x381446(0x2ed)](_0x407cc8,_0x407cc8);const _0x767008=_0x407cc8[_0x381446(0x2e1)]||[],_0x316802=Number(_0x407cc8['StateID']),_0x1a7b69=Math[_0x381446(0x89)](Number(_0x407cc8[_0x381446(0x122)]),0x0),_0x378086=_0x407cc8[_0x381446(0x23f)];for(const _0x10f55c of _0x767008){const _0x31e5a6=$gameTroop[_0x381446(0x292)]()[_0x10f55c];if(!_0x31e5a6)continue;_0x378086&&!_0x31e5a6[_0x381446(0x1a4)](_0x316802)&&_0x31e5a6['addState'](_0x316802),_0x31e5a6[_0x381446(0x259)](_0x316802,_0x1a7b69);}}),VisuMZ[_0x38de83(0x228)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x38de83(0x29a)],Scene_Boot[_0x38de83(0x311)]['onDatabaseLoaded']=function(){const _0x1a201f=_0x38de83;VisuMZ[_0x1a201f(0x228)][_0x1a201f(0x27a)][_0x1a201f(0x2db)](this),this[_0x1a201f(0xa9)](),VisuMZ[_0x1a201f(0x228)][_0x1a201f(0xc4)]();},Scene_Boot['prototype'][_0x38de83(0xa9)]=function(){const _0x2c9af5=_0x38de83;if(VisuMZ[_0x2c9af5(0x2ef)])return;this[_0x2c9af5(0x141)](),this[_0x2c9af5(0xdb)]();},Scene_Boot[_0x38de83(0x311)][_0x38de83(0x141)]=function(){const _0x59fb59=_0x38de83;for(const _0x4a1bcd of $dataSkills){if(!_0x4a1bcd)continue;VisuMZ[_0x59fb59(0x228)][_0x59fb59(0x239)](_0x4a1bcd),VisuMZ[_0x59fb59(0x228)]['Parse_Notetags_Skill_Sorting'](_0x4a1bcd),VisuMZ[_0x59fb59(0x228)][_0x59fb59(0x237)](_0x4a1bcd);}},Scene_Boot[_0x38de83(0x311)][_0x38de83(0xdb)]=function(){const _0x471f35=_0x38de83;for(const _0x31a937 of $dataStates){if(!_0x31a937)continue;VisuMZ[_0x471f35(0x228)][_0x471f35(0x278)](_0x31a937),VisuMZ['SkillsStatesCore'][_0x471f35(0x187)](_0x31a937),VisuMZ[_0x471f35(0x228)]['Parse_Notetags_State_SlipEffectJS'](_0x31a937),VisuMZ['SkillsStatesCore'][_0x471f35(0x298)](_0x31a937);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2c6)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x38de83(0x2c6)]=function(_0xc8669c){const _0x5bf171=_0x38de83;VisuMZ[_0x5bf171(0x228)][_0x5bf171(0x2c6)][_0x5bf171(0x2db)](this,_0xc8669c),VisuMZ[_0x5bf171(0x228)]['Parse_Notetags_Skill_Cost'](_0xc8669c),VisuMZ['SkillsStatesCore'][_0x5bf171(0x318)](_0xc8669c),VisuMZ[_0x5bf171(0x228)]['Parse_Notetags_Skill_JS'](_0xc8669c);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1c3)]=VisuMZ[_0x38de83(0x1c3)],VisuMZ[_0x38de83(0x1c3)]=function(_0xa6fca2){const _0x37604b=_0x38de83;VisuMZ[_0x37604b(0x228)]['ParseStateNotetags'][_0x37604b(0x2db)](this,_0xa6fca2),VisuMZ['SkillsStatesCore'][_0x37604b(0x278)](_0xa6fca2),VisuMZ[_0x37604b(0x228)][_0x37604b(0x187)](_0xa6fca2),VisuMZ[_0x37604b(0x228)][_0x37604b(0x31e)](_0xa6fca2),VisuMZ[_0x37604b(0x228)][_0x37604b(0x298)](_0xa6fca2);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x239)]=function(_0x3db88b){const _0x4e292f=_0x38de83,_0x43e7c8=_0x3db88b[_0x4e292f(0x1af)];_0x43e7c8['match'](/<MP COST:[ ](\d+)>/i)&&(_0x3db88b[_0x4e292f(0x282)]=Number(RegExp['$1'])),_0x43e7c8[_0x4e292f(0x201)](/<TP COST:[ ](\d+)>/i)&&(_0x3db88b[_0x4e292f(0x257)]=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore'][_0x38de83(0x318)]=function(_0x27ab42){const _0x50859a=_0x38de83;if(!_0x27ab42)return;_0x27ab42[_0x50859a(0x1da)]=0x32;const _0x1b1436=_0x27ab42[_0x50859a(0x1af)]||'';_0x1b1436[_0x50859a(0x201)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x27ab42['sortPriority']=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore'][_0x38de83(0x15c)]={},VisuMZ[_0x38de83(0x228)]['skillVisibleJS']={},VisuMZ['SkillsStatesCore'][_0x38de83(0x237)]=function(_0x5a7d13){const _0x458499=_0x38de83,_0x62f28c=_0x5a7d13['note'];if(_0x62f28c[_0x458499(0x201)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x384cbe=String(RegExp['$1']),_0x4ca672=_0x458499(0x16e)[_0x458499(0x1e6)](_0x384cbe);VisuMZ[_0x458499(0x228)]['skillEnableJS'][_0x5a7d13['id']]=new Function(_0x458499(0x287),_0x4ca672);}if(_0x62f28c['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x2cd590=String(RegExp['$1']),_0x100014=_0x458499(0x165)[_0x458499(0x1e6)](_0x2cd590);VisuMZ[_0x458499(0x228)][_0x458499(0x103)][_0x5a7d13['id']]=new Function(_0x458499(0x287),_0x100014);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x278)]=function(_0x2c5744){const _0x6cd2e1=_0x38de83;_0x2c5744['categories']=['ALL',_0x6cd2e1(0x121)];const _0x4cb526=_0x2c5744[_0x6cd2e1(0x1af)],_0x579672=_0x4cb526[_0x6cd2e1(0x201)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x579672)for(const _0x1c7be9 of _0x579672){_0x1c7be9['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x4895c7=String(RegExp['$1'])[_0x6cd2e1(0x2c1)]()[_0x6cd2e1(0x2b7)]()[_0x6cd2e1(0x79)](',');for(const _0x152ebe of _0x4895c7){_0x2c5744[_0x6cd2e1(0x222)][_0x6cd2e1(0x1f8)](_0x152ebe[_0x6cd2e1(0x2b7)]());}}if(_0x4cb526[_0x6cd2e1(0x201)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x1d7b78=RegExp['$1'][_0x6cd2e1(0x79)](/[\r\n]+/);for(const _0x15cc11 of _0x1d7b78){_0x2c5744[_0x6cd2e1(0x222)][_0x6cd2e1(0x1f8)](_0x15cc11[_0x6cd2e1(0x2c1)]()[_0x6cd2e1(0x2b7)]());}}_0x4cb526[_0x6cd2e1(0x201)](/<POSITIVE STATE>/i)&&_0x2c5744['categories'][_0x6cd2e1(0x1f8)](_0x6cd2e1(0x2ca)),_0x4cb526[_0x6cd2e1(0x201)](/<NEGATIVE STATE>/i)&&_0x2c5744[_0x6cd2e1(0x222)]['push']('NEGATIVE');},VisuMZ[_0x38de83(0x228)][_0x38de83(0xcc)]={},VisuMZ[_0x38de83(0x228)][_0x38de83(0x187)]=function(_0x274e46){const _0xcbd1ac=_0x38de83,_0x56afdf=_0x274e46['note'];if(_0x56afdf[_0xcbd1ac(0x201)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x12318e=String(RegExp['$1']),_0x31206b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xcbd1ac(0x1e6)](_0x12318e);VisuMZ['SkillsStatesCore'][_0xcbd1ac(0xcc)][_0x274e46['id']]=new Function(_0xcbd1ac(0x254),_0x31206b);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1b8)]={},VisuMZ[_0x38de83(0x228)]['stateHpSlipHealJS']={},VisuMZ[_0x38de83(0x228)][_0x38de83(0xac)]={},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2bb)]={},VisuMZ['SkillsStatesCore'][_0x38de83(0x104)]={},VisuMZ[_0x38de83(0x228)]['stateTpSlipHealJS']={},VisuMZ[_0x38de83(0x228)][_0x38de83(0x31e)]=function(_0x137e60){const _0x190d2f=_0x38de83,_0x50e1b2=_0x137e60[_0x190d2f(0x1af)],_0x2cffa8=_0x190d2f(0x196);if(_0x50e1b2['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x34c702=String(RegExp['$1']),_0x3cac5d=_0x2cffa8[_0x190d2f(0x1e6)](_0x34c702,'damage',-0x1,_0x190d2f(0x208));VisuMZ[_0x190d2f(0x228)][_0x190d2f(0x1b8)][_0x137e60['id']]=new Function(_0x190d2f(0x312),_0x3cac5d);}else{if(_0x50e1b2[_0x190d2f(0x201)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x3aad3f=String(RegExp['$1']),_0x44b679=_0x2cffa8[_0x190d2f(0x1e6)](_0x3aad3f,_0x190d2f(0x267),0x1,'slipHp');VisuMZ[_0x190d2f(0x228)][_0x190d2f(0x1fa)][_0x137e60['id']]=new Function(_0x190d2f(0x312),_0x44b679);}}if(_0x50e1b2['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x3ab507=String(RegExp['$1']),_0x1b09a1=_0x2cffa8[_0x190d2f(0x1e6)](_0x3ab507,_0x190d2f(0xbd),-0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x190d2f(0xac)][_0x137e60['id']]=new Function(_0x190d2f(0x312),_0x1b09a1);}else{if(_0x50e1b2['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x5e0061=String(RegExp['$1']),_0x5003e1=_0x2cffa8[_0x190d2f(0x1e6)](_0x5e0061,'heal',0x1,_0x190d2f(0x2ec));VisuMZ[_0x190d2f(0x228)]['stateMpSlipHealJS'][_0x137e60['id']]=new Function(_0x190d2f(0x312),_0x5003e1);}}if(_0x50e1b2[_0x190d2f(0x201)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x354192=String(RegExp['$1']),_0x1d995e=_0x2cffa8['format'](_0x354192,'damage',-0x1,'slipTp');VisuMZ[_0x190d2f(0x228)][_0x190d2f(0x104)][_0x137e60['id']]=new Function(_0x190d2f(0x312),_0x1d995e);}else{if(_0x50e1b2[_0x190d2f(0x201)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x4ee76a=String(RegExp['$1']),_0x31b97c=_0x2cffa8[_0x190d2f(0x1e6)](_0x4ee76a,'heal',0x1,'slipTp');VisuMZ[_0x190d2f(0x228)][_0x190d2f(0x2b0)][_0x137e60['id']]=new Function(_0x190d2f(0x312),_0x31b97c);}}},VisuMZ[_0x38de83(0x228)]['stateAddJS']={},VisuMZ['SkillsStatesCore'][_0x38de83(0x28b)]={},VisuMZ['SkillsStatesCore'][_0x38de83(0xeb)]={},VisuMZ[_0x38de83(0x228)][_0x38de83(0x298)]=function(_0x1ed996){const _0x2121e7=_0x38de83,_0x2c43eb=_0x1ed996['note'],_0x2a1110=_0x2121e7(0x14e);if(_0x2c43eb[_0x2121e7(0x201)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x377b07=String(RegExp['$1']),_0x51ca84=_0x2a1110[_0x2121e7(0x1e6)](_0x377b07);VisuMZ['SkillsStatesCore'][_0x2121e7(0xd9)][_0x1ed996['id']]=new Function(_0x2121e7(0x312),_0x51ca84);}if(_0x2c43eb[_0x2121e7(0x201)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x42ba6d=String(RegExp['$1']),_0x44a68c=_0x2a1110['format'](_0x42ba6d);VisuMZ[_0x2121e7(0x228)][_0x2121e7(0x28b)][_0x1ed996['id']]=new Function(_0x2121e7(0x312),_0x44a68c);}if(_0x2c43eb[_0x2121e7(0x201)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x43dd42=String(RegExp['$1']),_0x26957c=_0x2a1110[_0x2121e7(0x1e6)](_0x43dd42);VisuMZ[_0x2121e7(0x228)]['stateExpireJS'][_0x1ed996['id']]=new Function(_0x2121e7(0x312),_0x26957c);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0xc4)]=function(){const _0x1e0993=_0x38de83;if(!VisuMZ[_0x1e0993(0x228)][_0x1e0993(0xfd)][_0x1e0993(0x20c)]['ActionEndUpdate'])return;for(const _0x5a3008 of $dataStates){if(!_0x5a3008)continue;_0x5a3008[_0x1e0993(0x6c)]===0x4&&_0x5a3008[_0x1e0993(0x1d9)]===0x1&&(_0x5a3008[_0x1e0993(0x1d9)]=0x2);}},VisuMZ['SkillsStatesCore']['createKeyJS']=function(_0x318413,_0x3addd3){const _0x4a6c22=_0x38de83;if(VisuMZ['createKeyJS'])return VisuMZ[_0x4a6c22(0x245)](_0x318413,_0x3addd3);let _0x517058='';if($dataActors['includes'](_0x318413))_0x517058=_0x4a6c22(0x24b)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataClasses['includes'](_0x318413))_0x517058=_0x4a6c22(0xa8)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataSkills[_0x4a6c22(0x310)](_0x318413))_0x517058=_0x4a6c22(0x1fd)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataItems[_0x4a6c22(0x310)](_0x318413))_0x517058='Item-%1-%2'[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataWeapons['includes'](_0x318413))_0x517058=_0x4a6c22(0x290)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataArmors['includes'](_0x318413))_0x517058=_0x4a6c22(0x1b4)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataEnemies[_0x4a6c22(0x310)](_0x318413))_0x517058=_0x4a6c22(0x115)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);if($dataStates['includes'](_0x318413))_0x517058=_0x4a6c22(0x236)[_0x4a6c22(0x1e6)](_0x318413['id'],_0x3addd3);return _0x517058;},DataManager[_0x38de83(0x25f)]=function(_0x2c0738){const _0xb182e5=_0x38de83;_0x2c0738=_0x2c0738[_0xb182e5(0x2c1)]()['trim'](),this[_0xb182e5(0x2af)]=this[_0xb182e5(0x2af)]||{};if(this['_classIDs'][_0x2c0738])return this[_0xb182e5(0x2af)][_0x2c0738];for(const _0x240c02 of $dataClasses){if(!_0x240c02)continue;let _0x4998d9=_0x240c02['name'];_0x4998d9=_0x4998d9[_0xb182e5(0x25a)](/\x1I\[(\d+)\]/gi,''),_0x4998d9=_0x4998d9['replace'](/\\I\[(\d+)\]/gi,''),this[_0xb182e5(0x2af)][_0x4998d9[_0xb182e5(0x2c1)]()[_0xb182e5(0x2b7)]()]=_0x240c02['id'];}return this['_classIDs'][_0x2c0738]||0x0;},DataManager[_0x38de83(0x284)]=function(_0x49358c){const _0x568b4e=_0x38de83;this[_0x568b4e(0xcf)]=this[_0x568b4e(0xcf)]||{};if(this['_stypeIDs'][_0x49358c['id']])return this['_stypeIDs'][_0x49358c['id']];this[_0x568b4e(0xcf)][_0x49358c['id']]=[_0x49358c[_0x568b4e(0x2f4)]];if(_0x49358c[_0x568b4e(0x1af)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28af79=JSON['parse']('['+RegExp['$1'][_0x568b4e(0x201)](/\d+/g)+']');this[_0x568b4e(0xcf)][_0x49358c['id']]=this[_0x568b4e(0xcf)][_0x49358c['id']][_0x568b4e(0x270)](_0x28af79);}else{if(_0x49358c[_0x568b4e(0x1af)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x5342e8=RegExp['$1'][_0x568b4e(0x79)](',');for(const _0x2746ed of _0x5342e8){const _0x47521e=DataManager[_0x568b4e(0x2d0)](_0x2746ed);if(_0x47521e)this[_0x568b4e(0xcf)][_0x49358c['id']]['push'](_0x47521e);}}}return this[_0x568b4e(0xcf)][_0x49358c['id']];},DataManager[_0x38de83(0x2d0)]=function(_0x3a8b86){const _0x134410=_0x38de83;_0x3a8b86=_0x3a8b86[_0x134410(0x2c1)]()[_0x134410(0x2b7)](),this[_0x134410(0xcf)]=this[_0x134410(0xcf)]||{};if(this[_0x134410(0xcf)][_0x3a8b86])return this[_0x134410(0xcf)][_0x3a8b86];for(let _0x485eb2=0x1;_0x485eb2<0x64;_0x485eb2++){if(!$dataSystem[_0x134410(0x195)][_0x485eb2])continue;let _0x1e86f1=$dataSystem['skillTypes'][_0x485eb2][_0x134410(0x2c1)]()[_0x134410(0x2b7)]();_0x1e86f1=_0x1e86f1[_0x134410(0x25a)](/\x1I\[(\d+)\]/gi,''),_0x1e86f1=_0x1e86f1[_0x134410(0x25a)](/\\I\[(\d+)\]/gi,''),this[_0x134410(0xcf)][_0x1e86f1]=_0x485eb2;}return this['_stypeIDs'][_0x3a8b86]||0x0;},DataManager[_0x38de83(0xc8)]=function(_0x5fcdc1){const _0x1cd03e=_0x38de83;_0x5fcdc1=_0x5fcdc1['toUpperCase']()['trim'](),this[_0x1cd03e(0x1f1)]=this['_skillIDs']||{};if(this['_skillIDs'][_0x5fcdc1])return this[_0x1cd03e(0x1f1)][_0x5fcdc1];for(const _0x51bb0f of $dataSkills){if(!_0x51bb0f)continue;this['_skillIDs'][_0x51bb0f[_0x1cd03e(0x2d6)][_0x1cd03e(0x2c1)]()[_0x1cd03e(0x2b7)]()]=_0x51bb0f['id'];}return this['_skillIDs'][_0x5fcdc1]||0x0;},DataManager[_0x38de83(0x2c2)]=function(_0x1f9033){const _0x6dbd42=_0x38de83;_0x1f9033=_0x1f9033[_0x6dbd42(0x2c1)]()[_0x6dbd42(0x2b7)](),this[_0x6dbd42(0x2a2)]=this['_stateIDs']||{};if(this['_stateIDs'][_0x1f9033])return this[_0x6dbd42(0x2a2)][_0x1f9033];for(const _0x5e0e90 of $dataStates){if(!_0x5e0e90)continue;this[_0x6dbd42(0x2a2)][_0x5e0e90[_0x6dbd42(0x2d6)][_0x6dbd42(0x2c1)]()[_0x6dbd42(0x2b7)]()]=_0x5e0e90['id'];}return this['_stateIDs'][_0x1f9033]||0x0;},DataManager[_0x38de83(0x2d3)]=function(_0x16477d){const _0x196a5e=_0x38de83;this[_0x196a5e(0x10a)]=this[_0x196a5e(0x10a)]||{};if(this[_0x196a5e(0x10a)][_0x16477d])return this[_0x196a5e(0x10a)][_0x16477d];return $dataStates[_0x16477d][_0x196a5e(0x1af)][_0x196a5e(0x201)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x196a5e(0x10a)][_0x16477d]=Number(RegExp['$1']):this[_0x196a5e(0x10a)][_0x16477d]=VisuMZ['SkillsStatesCore'][_0x196a5e(0xfd)][_0x196a5e(0x20c)][_0x196a5e(0x193)],this['_stateMaxTurns'][_0x16477d];},DataManager[_0x38de83(0x2f5)]=function(_0x415fa9){const _0x30d638=_0x38de83;if(!_0x415fa9)return{};this[_0x30d638(0x10d)]=this['_skillChangesFromState']||{};if(this[_0x30d638(0x10d)][_0x415fa9['id']]!==undefined)return this[_0x30d638(0x10d)][_0x415fa9['id']];const _0x4eb64d=_0x415fa9[_0x30d638(0x1af)]||'',_0x49e4dc={};{const _0xb4220b=_0x4eb64d['match'](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0xb4220b)for(const _0x20adb2 of _0xb4220b){_0x20adb2['match'](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x3eb83c=String(RegExp['$1']),_0x15503e=String(RegExp['$2']);VisuMZ[_0x30d638(0x228)]['ParseSkillChangessIntoData'](_0x49e4dc,_0x3eb83c,_0x15503e);}}if(_0x4eb64d[_0x30d638(0x201)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x29af06=String(RegExp['$1'])['split'](/[\r\n]+/)['remove']('');for(const _0x3ebfe2 of _0x29af06){if(_0x3ebfe2[_0x30d638(0x201)](/(.*)[ ]>>>[ ](.*)/i)){let _0xdaa728=String(RegExp['$1']),_0x35fb81=String(RegExp['$2']);VisuMZ[_0x30d638(0x228)][_0x30d638(0x1dc)](_0x49e4dc,_0xdaa728,_0x35fb81);}}}return this[_0x30d638(0x10d)][_0x415fa9['id']]=_0x49e4dc,this[_0x30d638(0x10d)][_0x415fa9['id']];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1dc)]=function(_0x4b9134,_0x3cd241,_0x1fa719){const _0x4c8a64=_0x38de83;/^\d+$/['test'](_0x3cd241)?_0x3cd241=Number(_0x3cd241):_0x3cd241=DataManager[_0x4c8a64(0xc8)](_0x3cd241),/^\d+$/[_0x4c8a64(0x72)](_0x1fa719)?_0x1fa719=Number(_0x1fa719):_0x1fa719=DataManager[_0x4c8a64(0xc8)](_0x1fa719),_0x4b9134[_0x3cd241]=_0x1fa719;},ColorManager[_0x38de83(0x172)]=function(_0x3af019,_0x58872b){const _0x4481d2=_0x38de83;return _0x58872b=String(_0x58872b),this['_colorCache']=this[_0x4481d2(0x2f2)]||{},_0x58872b[_0x4481d2(0x201)](/#(.*)/i)?this['_colorCache'][_0x3af019]='#%1'[_0x4481d2(0x1e6)](String(RegExp['$1'])):this[_0x4481d2(0x2f2)][_0x3af019]=this[_0x4481d2(0x138)](Number(_0x58872b)),this[_0x4481d2(0x2f2)][_0x3af019];},ColorManager[_0x38de83(0x7e)]=function(_0x2ad617){const _0xffd786=_0x38de83;return _0x2ad617=String(_0x2ad617),_0x2ad617[_0xffd786(0x201)](/#(.*)/i)?'#%1'[_0xffd786(0x1e6)](String(RegExp['$1'])):this[_0xffd786(0x138)](Number(_0x2ad617));},ColorManager[_0x38de83(0x1fe)]=function(_0x224ec5){const _0xa6b620=_0x38de83;if(typeof _0x224ec5===_0xa6b620(0x1c0))_0x224ec5=$dataStates[_0x224ec5];const _0x438b9f='_stored_state-%1-color'[_0xa6b620(0x1e6)](_0x224ec5['id']);this[_0xa6b620(0x2f2)]=this['_colorCache']||{};if(this['_colorCache'][_0x438b9f])return this[_0xa6b620(0x2f2)][_0x438b9f];const _0x39bed1=this[_0xa6b620(0x279)](_0x224ec5);return this['getColorDataFromPluginParameters'](_0x438b9f,_0x39bed1);},ColorManager[_0x38de83(0x279)]=function(_0x3b592e){const _0x3c982a=_0x38de83,_0x1c796a=_0x3b592e[_0x3c982a(0x1af)];if(_0x1c796a['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1c796a[_0x3c982a(0x201)](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x3c982a(0xfd)][_0x3c982a(0x20c)][_0x3c982a(0x190)];else return _0x1c796a[_0x3c982a(0x201)](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore'][_0x3c982a(0xfd)][_0x3c982a(0x20c)][_0x3c982a(0x2a9)]:VisuMZ[_0x3c982a(0x228)][_0x3c982a(0xfd)][_0x3c982a(0x20c)]['ColorNeutral'];}},ColorManager[_0x38de83(0xf2)]=function(){const _0x5997e5=_0x38de83,_0x1e29b2=_0x5997e5(0x30c);this[_0x5997e5(0x2f2)]=this[_0x5997e5(0x2f2)]||{};if(this[_0x5997e5(0x2f2)][_0x1e29b2])return this[_0x5997e5(0x2f2)][_0x1e29b2];const _0x582084=VisuMZ[_0x5997e5(0x228)][_0x5997e5(0xfd)][_0x5997e5(0x8f)][_0x5997e5(0x7c)];return this[_0x5997e5(0x172)](_0x1e29b2,_0x582084);},ColorManager[_0x38de83(0xed)]=function(){const _0x3aab90=_0x38de83,_0x4541ab='_stored_debuffColor';this[_0x3aab90(0x2f2)]=this[_0x3aab90(0x2f2)]||{};if(this[_0x3aab90(0x2f2)][_0x4541ab])return this[_0x3aab90(0x2f2)][_0x4541ab];const _0x488dd3=VisuMZ[_0x3aab90(0x228)][_0x3aab90(0xfd)][_0x3aab90(0x8f)][_0x3aab90(0x1cc)];return this['getColorDataFromPluginParameters'](_0x4541ab,_0x488dd3);},SceneManager['isSceneBattle']=function(){const _0x5b4445=_0x38de83;return this['_scene']&&this[_0x5b4445(0x1ba)][_0x5b4445(0x12f)]===Scene_Battle;},VisuMZ[_0x38de83(0x228)][_0x38de83(0x13d)]=BattleManager[_0x38de83(0x1e8)],BattleManager[_0x38de83(0x1e8)]=function(){const _0x3de68e=_0x38de83;this['updateStatesActionEnd'](),VisuMZ[_0x3de68e(0x228)][_0x3de68e(0x13d)][_0x3de68e(0x2db)](this);},BattleManager[_0x38de83(0x283)]=function(){const _0x48eec9=_0x38de83,_0x1b3059=VisuMZ[_0x48eec9(0x228)][_0x48eec9(0xfd)][_0x48eec9(0x20c)];if(!_0x1b3059)return;if(_0x1b3059[_0x48eec9(0x17e)]===![])return;if(!this[_0x48eec9(0x223)])return;this[_0x48eec9(0x223)][_0x48eec9(0x283)]();},Game_Battler['prototype'][_0x38de83(0x283)]=function(){const _0x3e4e68=_0x38de83;if(BattleManager['_phase']!==_0x3e4e68(0x234))return;if(this[_0x3e4e68(0x1ff)]===Graphics[_0x3e4e68(0x303)])return;this[_0x3e4e68(0x1ff)]=Graphics[_0x3e4e68(0x303)];for(const _0x5be37b of this[_0x3e4e68(0x271)]){const _0x341ae1=$dataStates[_0x5be37b];if(!_0x341ae1)continue;if(_0x341ae1[_0x3e4e68(0x1d9)]!==0x1)continue;this[_0x3e4e68(0xe8)][_0x5be37b]>0x0&&this['_stateTurns'][_0x5be37b]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x38de83(0x311)]['updateStateTurns']=function(){const _0xdc7b94=_0x38de83,_0x5caafa=VisuMZ[_0xdc7b94(0x228)][_0xdc7b94(0xfd)]['States'];for(const _0x434fc9 of this[_0xdc7b94(0x271)]){const _0x2318fb=$dataStates[_0x434fc9];if(_0x5caafa&&_0x5caafa[_0xdc7b94(0x17e)]!==![]){if(_0x2318fb&&_0x2318fb[_0xdc7b94(0x1d9)]===0x1)continue;}this[_0xdc7b94(0xe8)][_0x434fc9]>0x0&&this[_0xdc7b94(0xe8)][_0x434fc9]--;}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2c0)]=Game_Switches[_0x38de83(0x311)]['onChange'],Game_Switches[_0x38de83(0x311)][_0x38de83(0xc9)]=function(){const _0x5f1c77=_0x38de83;VisuMZ[_0x5f1c77(0x228)][_0x5f1c77(0x2c0)][_0x5f1c77(0x2db)](this);const _0x116929=VisuMZ[_0x5f1c77(0x228)]['Settings'][_0x5f1c77(0x226)][_0x5f1c77(0x19c)]??!![];if(!_0x116929)return;if(SceneManager[_0x5f1c77(0x1f3)]())for(const _0x48bf9b of BattleManager[_0x5f1c77(0x2a8)]()){if(_0x48bf9b)_0x48bf9b['refresh']();}},VisuMZ[_0x38de83(0x228)][_0x38de83(0xec)]=Game_Variables['prototype'][_0x38de83(0xc9)],Game_Variables[_0x38de83(0x311)][_0x38de83(0xc9)]=function(){const _0x1a10ce=_0x38de83;VisuMZ[_0x1a10ce(0x228)][_0x1a10ce(0xec)][_0x1a10ce(0x2db)](this);const _0x53b7e8=VisuMZ[_0x1a10ce(0x228)][_0x1a10ce(0xfd)]['PassiveStates'][_0x1a10ce(0x130)]??!![];if(!_0x53b7e8)return;if(SceneManager[_0x1a10ce(0x1f3)]())for(const _0x4a34bb of BattleManager[_0x1a10ce(0x2a8)]()){if(_0x4a34bb)_0x4a34bb[_0x1a10ce(0xb3)]();}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x281)]=Game_Action[_0x38de83(0x311)][_0x38de83(0x2ff)],Game_Action[_0x38de83(0x311)][_0x38de83(0x2ff)]=function(_0x241021){const _0x2e588c=_0x38de83;VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect']['call'](this,_0x241021),this[_0x2e588c(0x27b)](_0x241021);},Game_Action['prototype']['applySkillsStatesCoreEffects']=function(_0x23e96f){const _0x240549=_0x38de83;this[_0x240549(0x131)](_0x23e96f),this[_0x240549(0x109)](_0x23e96f),this[_0x240549(0x20f)](_0x23e96f),this[_0x240549(0xa7)](_0x23e96f);},VisuMZ['SkillsStatesCore'][_0x38de83(0xbc)]=Game_Action[_0x38de83(0x311)][_0x38de83(0x1f4)],Game_Action[_0x38de83(0x311)][_0x38de83(0x1f4)]=function(_0x3bd903){const _0x1f4a2d=_0x38de83;if(this[_0x1f4a2d(0x28a)](_0x3bd903))return!![];return VisuMZ[_0x1f4a2d(0x228)][_0x1f4a2d(0xbc)]['call'](this,_0x3bd903);},Game_Action['prototype'][_0x38de83(0x28a)]=function(_0xf95fd7){const _0x1e8680=_0x38de83;if(!this[_0x1e8680(0xa6)]())return;const _0x3fb32e=this[_0x1e8680(0xa6)]()[_0x1e8680(0x1af)];if(_0x3fb32e[_0x1e8680(0x201)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x3dafed=String(RegExp['$1']);if(_0xf95fd7['isStateCategoryAffected'](_0x3dafed))return!![];}if(_0x3fb32e[_0x1e8680(0x201)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x53bde3=Number(RegExp['$1']);if(_0xf95fd7[_0x1e8680(0x1a4)](_0x53bde3))return!![];}else{if(_0x3fb32e[_0x1e8680(0x201)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x5f3d79=DataManager[_0x1e8680(0x2c2)](RegExp['$1']);if(_0xf95fd7['isStateAffected'](_0x5f3d79))return!![];}}return![];},Game_Action['prototype'][_0x38de83(0x131)]=function(_0x24c3d2){const _0x662084=_0x38de83;if(_0x24c3d2[_0x662084(0x28f)]()[_0x662084(0x150)]<=0x0)return;const _0x370bf3=this[_0x662084(0xa6)]()['note'];{const _0x30652c=_0x370bf3[_0x662084(0x201)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x30652c)for(const _0xfb2502 of _0x30652c){_0xfb2502['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x58cb3e=String(RegExp['$1']);_0x24c3d2[_0x662084(0x249)](_0x58cb3e);}}{const _0x1ae262=_0x370bf3[_0x662084(0x201)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x1ae262)for(const _0x830f07 of _0x1ae262){_0x830f07[_0x662084(0x201)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0xd35d45=String(RegExp['$1']),_0x2f3685=Number(RegExp['$2']);_0x24c3d2['removeStatesByCategory'](_0xd35d45,_0x2f3685);}}},Game_Action[_0x38de83(0x311)][_0x38de83(0x109)]=function(_0x2700f5){const _0x3a6085=_0x38de83,_0x175892=this[_0x3a6085(0xa6)]()[_0x3a6085(0x1af)],_0x396016=_0x175892[_0x3a6085(0x201)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x396016)for(const _0x107fea of _0x396016){let _0x1abc66=0x0,_0x5825f5=0x0;if(_0x107fea[_0x3a6085(0x201)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x1abc66=Number(RegExp['$1']),_0x5825f5=Number(RegExp['$2']);else _0x107fea[_0x3a6085(0x201)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x1abc66=DataManager[_0x3a6085(0x2c2)](RegExp['$1']),_0x5825f5=Number(RegExp['$2']));_0x2700f5[_0x3a6085(0x259)](_0x1abc66,_0x5825f5),this['makeSuccess'](_0x2700f5);}const _0x130412=_0x175892[_0x3a6085(0x201)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x130412)for(const _0x52333c of _0x130412){let _0x322b6b=0x0,_0x2f0759=0x0;if(_0x52333c[_0x3a6085(0x201)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x322b6b=Number(RegExp['$1']),_0x2f0759=Number(RegExp['$2']);else _0x52333c['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x322b6b=DataManager[_0x3a6085(0x2c2)](RegExp['$1']),_0x2f0759=Number(RegExp['$2']));_0x2700f5[_0x3a6085(0x258)](_0x322b6b,_0x2f0759),this[_0x3a6085(0x217)](_0x2700f5);}},Game_Action[_0x38de83(0x311)]['applyBuffTurnManipulationEffects']=function(_0x3499fa){const _0x2e5ea3=_0x38de83,_0x524569=['MAXHP',_0x2e5ea3(0x1b6),_0x2e5ea3(0x184),_0x2e5ea3(0xa5),_0x2e5ea3(0x244),'MDF','AGI','LUK'],_0xb29231=this['item']()[_0x2e5ea3(0x1af)],_0x2cbede=_0xb29231[_0x2e5ea3(0x201)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2cbede)for(const _0x866a37 of _0x2cbede){_0x866a37[_0x2e5ea3(0x201)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x24a398=_0x524569[_0x2e5ea3(0xb7)](String(RegExp['$1'])[_0x2e5ea3(0x2c1)]()),_0x5bb3d7=Number(RegExp['$2']);_0x24a398>=0x0&&(_0x3499fa[_0x2e5ea3(0x136)](_0x24a398,_0x5bb3d7),this[_0x2e5ea3(0x217)](_0x3499fa));}const _0x1f5197=_0xb29231[_0x2e5ea3(0x201)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1f5197)for(const _0x3272a9 of _0x2cbede){_0x3272a9[_0x2e5ea3(0x201)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xb964c0=_0x524569[_0x2e5ea3(0xb7)](String(RegExp['$1'])[_0x2e5ea3(0x2c1)]()),_0x5117eb=Number(RegExp['$2']);_0xb964c0>=0x0&&(_0x3499fa[_0x2e5ea3(0x28e)](_0xb964c0,_0x5117eb),this['makeSuccess'](_0x3499fa));}},Game_Action[_0x38de83(0x311)][_0x38de83(0xa7)]=function(_0x98d33){const _0x36c1d4=_0x38de83,_0x32b58e=[_0x36c1d4(0x143),_0x36c1d4(0x1b6),_0x36c1d4(0x184),_0x36c1d4(0xa5),_0x36c1d4(0x244),_0x36c1d4(0x1f0),_0x36c1d4(0x2b3),'LUK'],_0x3b067c=this[_0x36c1d4(0xa6)]()['note'],_0x29d09e=_0x3b067c[_0x36c1d4(0x201)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x29d09e)for(const _0x4bf7ce of _0x29d09e){_0x4bf7ce[_0x36c1d4(0x201)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0xa11066=_0x32b58e[_0x36c1d4(0xb7)](String(RegExp['$1'])['toUpperCase']()),_0x565c15=Number(RegExp['$2']);_0xa11066>=0x0&&(_0x98d33['setDebuffTurns'](_0xa11066,_0x565c15),this[_0x36c1d4(0x217)](_0x98d33));}const _0x2f2f18=_0x3b067c[_0x36c1d4(0x201)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2f2f18)for(const _0x13480a of _0x29d09e){_0x13480a['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3ba31a=_0x32b58e[_0x36c1d4(0xb7)](String(RegExp['$1'])[_0x36c1d4(0x2c1)]()),_0x5bf1ae=Number(RegExp['$2']);_0x3ba31a>=0x0&&(_0x98d33[_0x36c1d4(0x2e3)](_0x3ba31a,_0x5bf1ae),this[_0x36c1d4(0x217)](_0x98d33));}},VisuMZ[_0x38de83(0x228)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x38de83(0x311)]['initMembers'],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1aa)]=function(){const _0x99d64d=_0x38de83;this['_cache']={},this[_0x99d64d(0x227)](),VisuMZ['SkillsStatesCore'][_0x99d64d(0x1a8)][_0x99d64d(0x2db)](this);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x227)]=function(){const _0xa94fac=_0x38de83;this[_0xa94fac(0x112)]='',this['_stateData']={},this['_stateDisplay']={},this[_0xa94fac(0x99)]={};},Game_BattlerBase['prototype'][_0x38de83(0x70)]=function(_0x1f60a1){const _0x2f0457=_0x38de83;return this[_0x2f0457(0x23c)]=this['_cache']||{},this[_0x2f0457(0x23c)][_0x1f60a1]!==undefined;},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1ea)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xb3)],Game_BattlerBase[_0x38de83(0x311)]['refresh']=function(){const _0x196de9=_0x38de83;this['_cache']={},VisuMZ[_0x196de9(0x228)][_0x196de9(0x1ea)][_0x196de9(0x2db)](this);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x114)]=Game_BattlerBase['prototype'][_0x38de83(0x2bc)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2bc)]=function(_0x2bcfb4){const _0x4e3640=_0x38de83;let _0x1a2f60=this['isStateAffected'](_0x2bcfb4);VisuMZ['SkillsStatesCore'][_0x4e3640(0x114)][_0x4e3640(0x2db)](this,_0x2bcfb4);if(_0x1a2f60&&!this[_0x4e3640(0x1a4)](_0x2bcfb4))this[_0x4e3640(0x2e8)](_0x2bcfb4);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2e8)]=function(_0x1207dd){const _0x4ce7c3=_0x38de83;this[_0x4ce7c3(0x20a)](_0x1207dd),this[_0x4ce7c3(0x106)](_0x1207dd);},VisuMZ['SkillsStatesCore'][_0x38de83(0x319)]=Game_Battler['prototype'][_0x38de83(0x2c7)],Game_Battler['prototype'][_0x38de83(0x2c7)]=function(){const _0x2f242e=_0x38de83;VisuMZ['SkillsStatesCore'][_0x2f242e(0x319)][_0x2f242e(0x2db)](this),this['clearAllStateOrigins']();},VisuMZ[_0x38de83(0x228)][_0x38de83(0x88)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x13c)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x13c)]=function(_0x28ace6){const _0x21c14c=_0x38de83,_0x143835=$dataStates[_0x28ace6],_0x42cb4e=this['stateTurns'](_0x28ace6),_0x3830ef=this[_0x21c14c(0x2a7)](_0x143835)['toLowerCase']()[_0x21c14c(0x2b7)]();switch(_0x3830ef){case _0x21c14c(0x12b):if(_0x42cb4e<=0x0)this[_0x21c14c(0x301)](_0x28ace6);break;case _0x21c14c(0x176):this[_0x21c14c(0x301)](_0x28ace6);break;case _0x21c14c(0x2c4):this['prepareResetStateCounts'](_0x28ace6),this['_stateTurns'][_0x28ace6]=Math[_0x21c14c(0x89)](this['_stateTurns'][_0x28ace6],_0x42cb4e);break;case'add':this[_0x21c14c(0x301)](_0x28ace6),this[_0x21c14c(0xe8)][_0x28ace6]+=_0x42cb4e;break;default:this[_0x21c14c(0x301)](_0x28ace6);break;}if(this[_0x21c14c(0x1a4)](_0x28ace6)){const _0x24026d=DataManager['stateMaximumTurns'](_0x28ace6);this[_0x21c14c(0xe8)][_0x28ace6]=this['_stateTurns'][_0x28ace6][_0x21c14c(0x160)](0x0,_0x24026d);}},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x301)]=function(_0x39b330){const _0x555dcd=_0x38de83;VisuMZ['SkillsStatesCore'][_0x555dcd(0x88)][_0x555dcd(0x2db)](this,_0x39b330);},Game_BattlerBase['prototype']['getStateReapplyRulings']=function(_0x14c121){const _0x19cfd6=_0x38de83,_0x460c69=_0x14c121[_0x19cfd6(0x1af)];return _0x460c69[_0x19cfd6(0x201)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x19cfd6(0x228)]['Settings'][_0x19cfd6(0x20c)][_0x19cfd6(0x1e3)];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2b1)]=Game_BattlerBase['prototype'][_0x38de83(0x293)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x293)]=function(_0x32416d,_0x51a5dd){const _0x386ab1=_0x38de83,_0x1ac85b=VisuMZ[_0x386ab1(0x228)][_0x386ab1(0xfd)]['Buffs'][_0x386ab1(0x1e3)],_0x4b1006=this['buffTurns'](_0x32416d);switch(_0x1ac85b){case _0x386ab1(0x12b):if(_0x4b1006<=0x0)this[_0x386ab1(0x1de)][_0x32416d]=_0x51a5dd;break;case'reset':this[_0x386ab1(0x1de)][_0x32416d]=_0x51a5dd;break;case _0x386ab1(0x2c4):this[_0x386ab1(0x1de)][_0x32416d]=Math[_0x386ab1(0x89)](_0x4b1006,_0x51a5dd);break;case'add':this[_0x386ab1(0x1de)][_0x32416d]+=_0x51a5dd;break;default:VisuMZ[_0x386ab1(0x228)][_0x386ab1(0x2b1)][_0x386ab1(0x2db)](this,_0x32416d,_0x51a5dd);break;}const _0x4ef0da=VisuMZ[_0x386ab1(0x228)]['Settings']['Buffs'][_0x386ab1(0x193)];this[_0x386ab1(0x1de)][_0x32416d]=this[_0x386ab1(0x1de)][_0x32416d]['clamp'](0x0,_0x4ef0da);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1d1)]=function(){const _0x58b71e=_0x38de83;if(this[_0x58b71e(0x23c)]['groupDefeat']!==undefined)return this['_cache'][_0x58b71e(0x194)];this['_cache'][_0x58b71e(0x194)]=![];const _0x465923=this['states']();for(const _0x6498d2 of _0x465923){if(!_0x6498d2)continue;if(_0x6498d2['note'][_0x58b71e(0x201)](/<GROUP DEFEAT>/i)){this[_0x58b71e(0x23c)][_0x58b71e(0x194)]=!![];break;}}return this[_0x58b71e(0x23c)][_0x58b71e(0x194)];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1df)]=Game_Unit[_0x38de83(0x311)]['deadMembers'],Game_Unit[_0x38de83(0x311)][_0x38de83(0x87)]=function(){const _0x2dda34=_0x38de83;let _0x1d743e=VisuMZ[_0x2dda34(0x228)]['Game_Unit_deadMembers'][_0x2dda34(0x2db)](this);return BattleManager[_0x2dda34(0x2fe)]&&(_0x1d743e=_0x1d743e[_0x2dda34(0x270)](this['members']()[_0x2dda34(0x19a)](_0x424228=>_0x424228[_0x2dda34(0x1d1)]()))),_0x1d743e;},VisuMZ[_0x38de83(0x228)][_0x38de83(0x21d)]=Game_BattlerBase[_0x38de83(0x311)]['clearStates'],Game_BattlerBase['prototype'][_0x38de83(0x1f9)]=function(){const _0x56c6fa=_0x38de83;this['getStateRetainType']()!==''?this[_0x56c6fa(0x10f)]():(VisuMZ[_0x56c6fa(0x228)][_0x56c6fa(0x21d)][_0x56c6fa(0x2db)](this),this[_0x56c6fa(0x227)]());},Game_Actor['prototype'][_0x38de83(0x1f9)]=function(){const _0x1e405b=_0x38de83;this['_stateSteps']=this[_0x1e405b(0x9f)]||{},Game_Battler[_0x1e405b(0x311)]['clearStates']['call'](this);},Game_BattlerBase[_0x38de83(0x311)]['clearStatesWithStateRetain']=function(){const _0x5664fc=_0x38de83,_0x2074e0=this['states']();for(const _0x50078a of _0x2074e0){if(_0x50078a&&this[_0x5664fc(0x28d)](_0x50078a))this['eraseState'](_0x50078a['id']);}this[_0x5664fc(0x23c)]={};},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x28d)]=function(_0x1c5ae1){const _0x2f1199=_0x38de83,_0x489f69=this[_0x2f1199(0x20b)]();if(_0x489f69!==''){const _0x4285c1=_0x1c5ae1[_0x2f1199(0x1af)];if(_0x489f69===_0x2f1199(0x92)&&_0x4285c1[_0x2f1199(0x201)](/<NO DEATH CLEAR>/i))return![];if(_0x489f69===_0x2f1199(0x324)&&_0x4285c1[_0x2f1199(0x201)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x2f1199(0x1a4)](_0x1c5ae1['id']);},Game_BattlerBase['prototype']['getStateRetainType']=function(){const _0xcff25c=_0x38de83;return this[_0xcff25c(0x112)];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x24e)]=function(_0x2f62d4){const _0x4f4176=_0x38de83;this[_0x4f4176(0x112)]=_0x2f62d4;},Game_BattlerBase[_0x38de83(0x311)]['clearStateRetainType']=function(){const _0xb0980=_0x38de83;this[_0xb0980(0x112)]='';},VisuMZ['SkillsStatesCore'][_0x38de83(0x317)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x161)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x161)]=function(){const _0x286f25=_0x38de83;this['setStateRetainType']('death'),VisuMZ[_0x286f25(0x228)]['Game_BattlerBase_die']['call'](this),this[_0x286f25(0x31d)]();},VisuMZ[_0x38de83(0x228)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x262)],Game_BattlerBase['prototype'][_0x38de83(0x262)]=function(){const _0xe8dbf7=_0x38de83;this['setStateRetainType'](_0xe8dbf7(0x324)),VisuMZ[_0xe8dbf7(0x228)][_0xe8dbf7(0x22b)]['call'](this),this['clearStateRetainType']();},Game_BattlerBase['prototype'][_0x38de83(0x1bf)]=function(_0x58edd7,_0x151abe,_0x2c34cb){return _0x151abe;},Game_BattlerBase['prototype']['canPaySkillCost']=function(_0x610854){const _0x1bf84b=_0x38de83;for(settings of VisuMZ[_0x1bf84b(0x228)][_0x1bf84b(0xfd)][_0x1bf84b(0x29e)]){let _0x378717=settings[_0x1bf84b(0x207)][_0x1bf84b(0x2db)](this,_0x610854);_0x378717=this[_0x1bf84b(0x1bf)](_0x610854,_0x378717,settings);if(!settings['CanPayJS'][_0x1bf84b(0x2db)](this,_0x610854,_0x378717))return![];}return!![];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2d8)]=function(_0x49f886){const _0x58d1b3=_0x38de83;for(settings of VisuMZ['SkillsStatesCore'][_0x58d1b3(0xfd)][_0x58d1b3(0x29e)]){let _0x3d5dbf=settings[_0x58d1b3(0x207)][_0x58d1b3(0x2db)](this,_0x49f886);_0x3d5dbf=this[_0x58d1b3(0x1bf)](_0x49f886,_0x3d5dbf,settings),settings['PayJS'][_0x58d1b3(0x2db)](this,_0x49f886,_0x3d5dbf);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x24a)]=Game_BattlerBase[_0x38de83(0x311)]['meetsSkillConditions'],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x21e)]=function(_0x491a0e){const _0x4ac71a=_0x38de83;if(!_0x491a0e)return![];if(!VisuMZ[_0x4ac71a(0x228)]['Game_BattlerBase_meetsSkillConditions'][_0x4ac71a(0x2db)](this,_0x491a0e))return![];if(!this[_0x4ac71a(0x206)](_0x491a0e))return![];if(!this[_0x4ac71a(0x2b4)](_0x491a0e))return![];if(!this[_0x4ac71a(0xda)](_0x491a0e))return![];return!![];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x206)]=function(_0x55b963){const _0x7a590e=_0x38de83;if(!this[_0x7a590e(0x255)](_0x55b963))return![];return!![];},Game_BattlerBase[_0x38de83(0x311)]['checkSkillConditionsSwitchNotetags']=function(_0x4a4c48){const _0x4fa79e=_0x38de83,_0x2b368d=_0x4a4c48[_0x4fa79e(0x1af)];if(_0x2b368d[_0x4fa79e(0x201)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x418722=JSON[_0x4fa79e(0x1ed)]('['+RegExp['$1'][_0x4fa79e(0x201)](/\d+/g)+']');for(const _0x3174ab of _0x418722){if(!$gameSwitches[_0x4fa79e(0xd4)](_0x3174ab))return![];}return!![];}if(_0x2b368d[_0x4fa79e(0x201)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a7c19=JSON['parse']('['+RegExp['$1'][_0x4fa79e(0x201)](/\d+/g)+']');for(const _0x5bf500 of _0x3a7c19){if(!$gameSwitches[_0x4fa79e(0xd4)](_0x5bf500))return![];}return!![];}if(_0x2b368d[_0x4fa79e(0x201)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x495a8c=JSON[_0x4fa79e(0x1ed)]('['+RegExp['$1'][_0x4fa79e(0x201)](/\d+/g)+']');for(const _0x5cb3be of _0x495a8c){if($gameSwitches[_0x4fa79e(0xd4)](_0x5cb3be))return!![];}return![];}if(_0x2b368d[_0x4fa79e(0x201)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ef059=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4820bf of _0x3ef059){if(!$gameSwitches['value'](_0x4820bf))return!![];}return![];}if(_0x2b368d[_0x4fa79e(0x201)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4981b7=JSON[_0x4fa79e(0x1ed)]('['+RegExp['$1'][_0x4fa79e(0x201)](/\d+/g)+']');for(const _0x5ea367 of _0x4981b7){if(!$gameSwitches['value'](_0x5ea367))return!![];}return![];}if(_0x2b368d[_0x4fa79e(0x201)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45be82=JSON[_0x4fa79e(0x1ed)]('['+RegExp['$1'][_0x4fa79e(0x201)](/\d+/g)+']');for(const _0x38d282 of _0x45be82){if($gameSwitches['value'](_0x38d282))return![];}return!![];}return!![];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2b4)]=function(_0xc149fc){const _0x209121=_0x38de83,_0x240655=_0xc149fc['note'],_0x46ea64=VisuMZ[_0x209121(0x228)][_0x209121(0x15c)];return _0x46ea64[_0xc149fc['id']]?_0x46ea64[_0xc149fc['id']][_0x209121(0x2db)](this,_0xc149fc):!![];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xda)]=function(_0x2508b2){const _0x33913c=_0x38de83;return VisuMZ[_0x33913c(0x228)][_0x33913c(0xfd)]['Skills']['SkillConditionJS'][_0x33913c(0x2db)](this,_0x2508b2);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1fc)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x25c)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x25c)]=function(_0x56dfb0){const _0x5117e9=_0x38de83;for(settings of VisuMZ[_0x5117e9(0x228)]['Settings'][_0x5117e9(0x29e)]){if(settings['Name']['toUpperCase']()==='MP'){let _0x3ee387=settings['CalcJS'][_0x5117e9(0x2db)](this,_0x56dfb0);return _0x3ee387=this[_0x5117e9(0x1bf)](_0x56dfb0,_0x3ee387,settings),_0x3ee387;}}return VisuMZ[_0x5117e9(0x228)]['Game_BattlerBase_skillMpCost']['call'](this,_0x56dfb0);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x118)]=Game_BattlerBase[_0x38de83(0x311)]['skillTpCost'],Game_BattlerBase[_0x38de83(0x311)]['skillTpCost']=function(_0x46ae29){const _0x21e77d=_0x38de83;for(settings of VisuMZ[_0x21e77d(0x228)][_0x21e77d(0xfd)][_0x21e77d(0x29e)]){if(settings[_0x21e77d(0x24c)][_0x21e77d(0x2c1)]()==='TP'){let _0x4a4b6f=settings[_0x21e77d(0x207)]['call'](this,_0x46ae29);return _0x4a4b6f=this[_0x21e77d(0x1bf)](_0x46ae29,_0x4a4b6f,settings),_0x4a4b6f;}}return VisuMZ[_0x21e77d(0x228)][_0x21e77d(0x118)][_0x21e77d(0x2db)](this,_0x46ae29);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2ee)]=function(_0x3fb0d6){const _0x11e5b9=_0x38de83;if(typeof _0x3fb0d6===_0x11e5b9(0x1c0))_0x3fb0d6=$dataStates[_0x3fb0d6];return this['states']()['includes'](_0x3fb0d6);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x31a)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x28f)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x28f)]=function(){const _0x3816c9=_0x38de83;let _0x2a859e=VisuMZ[_0x3816c9(0x228)]['Game_BattlerBase_states'][_0x3816c9(0x2db)](this);if($gameTemp[_0x3816c9(0x7d)])return _0x2a859e;return $gameTemp[_0x3816c9(0x7d)]=!![],this[_0x3816c9(0x31c)](_0x2a859e),$gameTemp[_0x3816c9(0x7d)]=undefined,_0x2a859e;},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x31c)]=function(_0x2399f9){const _0x356730=_0x38de83,_0x49cd97=this[_0x356730(0x6e)]();for(state of _0x49cd97){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x2399f9[_0x356730(0x310)](state))continue;_0x2399f9[_0x356730(0x1f8)](state);}_0x49cd97[_0x356730(0x150)]>0x0&&_0x2399f9[_0x356730(0x1cf)]((_0x57b57f,_0x441615)=>{const _0x590f2b=_0x356730,_0x3915a3=_0x57b57f[_0x590f2b(0x2a0)],_0x4e5f63=_0x441615['priority'];if(_0x3915a3!==_0x4e5f63)return _0x4e5f63-_0x3915a3;return _0x57b57f-_0x441615;});},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x14f)]=function(_0x30f7bd){const _0x3c491f=_0x38de83;return _0x30f7bd[_0x3c491f(0x1af)][_0x3c491f(0x201)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x16c)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x238)],Game_BattlerBase['prototype'][_0x38de83(0x238)]=function(_0x206fb7){const _0x44c368=_0x38de83;this[_0x44c368(0x12e)]=!![];let _0x2e2e6b=VisuMZ[_0x44c368(0x228)]['Game_BattlerBase_traitsSet']['call'](this,_0x206fb7);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x2e2e6b;},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x26f)]=function(){const _0x4d13d4=_0x38de83;let _0x287947=[];this[_0x4d13d4(0x76)]=this['_passiveStateResults']||{};for(;;){_0x287947=[];let _0x317707=!![];for(const _0x4c5639 of this[_0x4d13d4(0x23c)][_0x4d13d4(0x6e)]){const _0x23106e=$dataStates[_0x4c5639];if(!_0x23106e)continue;let _0x96a6ab=this[_0x4d13d4(0xd5)](_0x23106e);this['_passiveStateResults'][_0x4c5639]!==_0x96a6ab&&(_0x317707=![],this[_0x4d13d4(0x76)][_0x4c5639]=_0x96a6ab);if(!_0x96a6ab)continue;_0x287947[_0x4d13d4(0x1f8)](_0x23106e);}if(_0x317707)break;else{if(!this[_0x4d13d4(0x12e)])this[_0x4d13d4(0xb3)]();this[_0x4d13d4(0x15d)]();}}return _0x287947;},Game_BattlerBase[_0x38de83(0x311)]['meetsPassiveStateConditions']=function(_0x3f1ffb){const _0x47f9d0=_0x38de83;if(!this[_0x47f9d0(0x27d)](_0x3f1ffb))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x3f1ffb))return![];if(!this[_0x47f9d0(0x22f)](_0x3f1ffb))return![];if(!this[_0x47f9d0(0x2ba)](_0x3f1ffb))return![];return!![];},Game_BattlerBase['prototype'][_0x38de83(0x27d)]=function(_0x5a16df){return!![];},Game_Actor[_0x38de83(0x311)][_0x38de83(0x27d)]=function(_0x1917b7){const _0x27e34b=_0x38de83,_0x740c43=DataManager[_0x27e34b(0x1db)](_0x1917b7);if(_0x740c43[_0x27e34b(0xef)][_0x27e34b(0x150)]>0x0){const _0x1bc737=_0x740c43[_0x27e34b(0xef)];if(!_0x1bc737[_0x27e34b(0x310)](this[_0x27e34b(0xef)]()))return![];}if(_0x740c43[_0x27e34b(0x2e9)][_0x27e34b(0x150)]>0x0){const _0x318ae7=_0x740c43[_0x27e34b(0x2e9)];let _0x5c6079=[this[_0x27e34b(0xef)]()];Imported[_0x27e34b(0x8e)]&&this['multiclasses']&&(_0x5c6079=this['multiclasses']());if(_0x318ae7[_0x27e34b(0x19a)](_0x2a03c2=>_0x5c6079[_0x27e34b(0x310)](_0x2a03c2))['length']<=0x0)return![];}return Game_BattlerBase['prototype'][_0x27e34b(0x27d)][_0x27e34b(0x2db)](this,_0x1917b7);},DataManager[_0x38de83(0x1db)]=function(_0x20c6c1){const _0x44403f=_0x38de83,_0x50e348={'currentClass':[],'multiClass':[]};if(!_0x20c6c1)return _0x50e348;this['_cache_getPassiveStateConditionClassesData']=this[_0x44403f(0x2c8)]||{};if(this[_0x44403f(0x2c8)][_0x20c6c1['id']]!==undefined)return this[_0x44403f(0x2c8)][_0x20c6c1['id']];const _0x2ebeec=_0x20c6c1[_0x44403f(0x1af)]||'';if(_0x2ebeec[_0x44403f(0x201)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x502acd=String(RegExp['$1'])[_0x44403f(0x79)](',')['map'](_0x20ad05=>_0x20ad05[_0x44403f(0x2b7)]());_0x50e348[_0x44403f(0xef)]=VisuMZ[_0x44403f(0x228)][_0x44403f(0x2c5)](_0x502acd);}if(_0x2ebeec[_0x44403f(0x201)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x525f41=String(RegExp['$1'])[_0x44403f(0x79)](',')[_0x44403f(0xcb)](_0x210753=>_0x210753['trim']());_0x50e348[_0x44403f(0x2e9)]=VisuMZ['SkillsStatesCore'][_0x44403f(0x2c5)](_0x525f41);}return this[_0x44403f(0x2c8)][_0x20c6c1['id']]=_0x50e348,this[_0x44403f(0x2c8)][_0x20c6c1['id']];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2c5)]=function(_0x22be5a){const _0x1b4de5=_0x38de83,_0xbd560b=[];for(let _0x262554 of _0x22be5a){_0x262554=(String(_0x262554)||'')['trim']();const _0x24e7de=/^\d+$/[_0x1b4de5(0x72)](_0x262554);_0x24e7de?_0xbd560b[_0x1b4de5(0x1f8)](Number(_0x262554)):_0xbd560b[_0x1b4de5(0x1f8)](DataManager['getClassIdWithName'](_0x262554));}return _0xbd560b[_0x1b4de5(0xcb)](_0x49b447=>$dataClasses[Number(_0x49b447)])['remove'](null);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x128)]=function(_0x621c21){const _0x201c75=_0x38de83,_0x36d72f=DataManager[_0x201c75(0x1c1)](_0x621c21);if(_0x36d72f[_0x201c75(0xc0)]&&_0x36d72f[_0x201c75(0xc0)][_0x201c75(0x150)]>0x0){const _0x3abd1b=_0x36d72f[_0x201c75(0xc0)];for(const _0x2706fc of _0x3abd1b){if(!$gameSwitches[_0x201c75(0xd4)](_0x2706fc))return![];}}if(_0x36d72f[_0x201c75(0x80)]&&_0x36d72f[_0x201c75(0x80)]['length']>0x0){const _0x107b5c=_0x36d72f[_0x201c75(0x80)];let _0x4b02a7=!![];for(const _0x4a7bce of _0x107b5c){if($gameSwitches[_0x201c75(0xd4)](_0x4a7bce)){_0x4b02a7=![];break;}}if(_0x4b02a7)return![];}if(_0x36d72f['allSwitchOff']&&_0x36d72f[_0x201c75(0x2eb)][_0x201c75(0x150)]>0x0){const _0x2ac3b2=_0x36d72f['allSwitchOff'];for(const _0x59ad0d of _0x2ac3b2){if($gameSwitches['value'](_0x59ad0d))return![];}}if(_0x36d72f[_0x201c75(0x169)]&&_0x36d72f[_0x201c75(0x169)][_0x201c75(0x150)]>0x0){const _0x335cd5=_0x36d72f[_0x201c75(0x169)];let _0x569a3c=!![];for(const _0x170bf4 of _0x335cd5){if(!$gameSwitches[_0x201c75(0xd4)](_0x170bf4)){_0x569a3c=![];break;}}if(_0x569a3c)return![];}return!![];},DataManager[_0x38de83(0x1c1)]=function(_0x565f94){const _0x52dbb4=_0x38de83;let _0x31530a={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x565f94)return _0x31530a;const _0x3f5433=_0x565f94['id'];this['_cache_getPassiveStateConditionSwitchData']=this[_0x52dbb4(0x1d6)]||{};if(this['_cache_getPassiveStateConditionSwitchData'][_0x3f5433]!==undefined)return this[_0x52dbb4(0x1d6)][_0x3f5433];const _0x15502c=_0x565f94[_0x52dbb4(0x1af)]||'';return _0x15502c[_0x52dbb4(0x201)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x31530a['allSwitchOn']=String(RegExp['$1'])[_0x52dbb4(0x79)](',')[_0x52dbb4(0xcb)](_0x3d4666=>Number(_0x3d4666))),_0x15502c[_0x52dbb4(0x201)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x31530a[_0x52dbb4(0x80)]=String(RegExp['$1'])[_0x52dbb4(0x79)](',')['map'](_0x43ff94=>Number(_0x43ff94))),_0x15502c[_0x52dbb4(0x201)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x31530a['allSwitchOff']=String(RegExp['$1'])[_0x52dbb4(0x79)](',')[_0x52dbb4(0xcb)](_0x409bcc=>Number(_0x409bcc))),_0x15502c['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x31530a[_0x52dbb4(0x169)]=String(RegExp['$1'])['split'](',')[_0x52dbb4(0xcb)](_0x51dabe=>Number(_0x51dabe))),this['_cache_getPassiveStateConditionSwitchData'][_0x3f5433]=_0x31530a,this[_0x52dbb4(0x1d6)][_0x3f5433];},Game_BattlerBase[_0x38de83(0x311)]['meetsPassiveStateConditionJS']=function(_0x13cc6b){const _0x30f13c=_0x38de83,_0x199a8f=VisuMZ[_0x30f13c(0x228)][_0x30f13c(0xcc)];if(_0x199a8f[_0x13cc6b['id']]&&!_0x199a8f[_0x13cc6b['id']][_0x30f13c(0x2db)](this,_0x13cc6b))return![];return!![];},Game_BattlerBase[_0x38de83(0x311)]['meetsPassiveStateGlobalConditionJS']=function(_0x3d4b10){const _0x33bc88=_0x38de83;return VisuMZ['SkillsStatesCore'][_0x33bc88(0xfd)][_0x33bc88(0x226)][_0x33bc88(0xe5)]['call'](this,_0x3d4b10);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x6e)]=function(){const _0x16ad33=_0x38de83;if(this[_0x16ad33(0x70)](_0x16ad33(0x6e)))return this[_0x16ad33(0x26f)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x16ad33(0x14a)]=!![],this[_0x16ad33(0x15d)](),this[_0x16ad33(0x14a)]=undefined,this[_0x16ad33(0x26f)]();},Game_BattlerBase[_0x38de83(0x311)]['createPassiveStatesCache']=function(){const _0x31fcbb=_0x38de83;this[_0x31fcbb(0x14a)]=!![],this[_0x31fcbb(0x23c)][_0x31fcbb(0x6e)]=[],this[_0x31fcbb(0x2bf)](),this[_0x31fcbb(0x246)](),this[_0x31fcbb(0x2dd)](),this[_0x31fcbb(0x23c)][_0x31fcbb(0x6e)]=this['_cache'][_0x31fcbb(0x6e)][_0x31fcbb(0x1cf)]((_0x41a4ed,_0x5c1a4a)=>_0x41a4ed-_0x5c1a4a),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2bf)]=function(){const _0x114b85=_0x38de83;if(Imported[_0x114b85(0x1c2)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1a3)]=function(){return[];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x246)]=function(){const _0x4f6a67=_0x38de83,_0x2c2722=this[_0x4f6a67(0x23c)][_0x4f6a67(0x6e)]||[],_0x3dc801=this[_0x4f6a67(0x1a3)]();this[_0x4f6a67(0x23c)][_0x4f6a67(0x6e)]=_0x2c2722||[];for(const _0x32de33 of _0x3dc801){if(!_0x32de33)continue;const _0x7578c3=DataManager[_0x4f6a67(0x9a)](_0x32de33);for(const _0x1dff63 of _0x7578c3){this[_0x4f6a67(0x23c)][_0x4f6a67(0x6e)][_0x4f6a67(0x1f8)](_0x1dff63);}}},DataManager['getPassiveStatesFromObj']=function(_0x38b4f7){const _0x439dbc=_0x38de83;if(!_0x38b4f7)return[];const _0x139177=VisuMZ[_0x439dbc(0x228)][_0x439dbc(0x245)](_0x38b4f7,_0x439dbc(0x269));this[_0x439dbc(0x146)]=this[_0x439dbc(0x146)]||{};if(this[_0x439dbc(0x146)][_0x139177]!==undefined)return this[_0x439dbc(0x146)][_0x139177];const _0xc00df=[],_0x2d960b=_0x38b4f7[_0x439dbc(0x1af)]||'',_0x4df78=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x125e9e=_0x2d960b[_0x439dbc(0x201)](_0x4df78);if(_0x125e9e)for(const _0x2f91c2 of _0x125e9e){_0x2f91c2[_0x439dbc(0x201)](_0x4df78);const _0x17e148=String(RegExp['$1'])[_0x439dbc(0x79)](',')[_0x439dbc(0xcb)](_0x2a4a90=>_0x2a4a90[_0x439dbc(0x2b7)]());for(const _0xae0fd4 of _0x17e148){const _0x27981f=/^\d+$/['test'](_0xae0fd4);let _0x32c66b=0x0;_0x27981f?_0x32c66b=Number(_0xae0fd4):_0x32c66b=DataManager['getStateIdWithName'](_0xae0fd4),_0x32c66b&&_0xc00df[_0x439dbc(0x1f8)](_0x32c66b);}}return this[_0x439dbc(0x146)][_0x139177]=_0xc00df,this[_0x439dbc(0x146)][_0x139177];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2dd)]=function(){const _0x5a77e1=_0x38de83,_0x10201f=VisuMZ[_0x5a77e1(0x228)][_0x5a77e1(0xfd)][_0x5a77e1(0x226)]['Global'];this['_cache']['passiveStates']=this[_0x5a77e1(0x23c)][_0x5a77e1(0x6e)]['concat'](_0x10201f);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1d5)]=function(_0x35c91b){const _0x405549=_0x38de83;if(typeof _0x35c91b!==_0x405549(0x1c0))_0x35c91b=_0x35c91b['id'];return this['_stateTurns'][_0x35c91b]||0x0;},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x259)]=function(_0x1c051b,_0x5c29ae){const _0x1bb2f0=_0x38de83;if(typeof _0x1c051b!==_0x1bb2f0(0x1c0))_0x1c051b=_0x1c051b['id'];if(this['isStateAffected'](_0x1c051b)){const _0xe2497=DataManager[_0x1bb2f0(0x2d3)](_0x1c051b);this[_0x1bb2f0(0xe8)][_0x1c051b]=_0x5c29ae[_0x1bb2f0(0x160)](0x0,_0xe2497);if(this['_stateTurns'][_0x1c051b]<=0x0)this[_0x1bb2f0(0x1cd)](_0x1c051b);}},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x258)]=function(_0x1938e2,_0x2d0ed5){const _0x4dcf76=_0x38de83;if(typeof _0x1938e2!==_0x4dcf76(0x1c0))_0x1938e2=_0x1938e2['id'];this[_0x4dcf76(0x1a4)](_0x1938e2)&&(_0x2d0ed5+=this[_0x4dcf76(0x1d5)](_0x1938e2),this[_0x4dcf76(0x259)](_0x1938e2,_0x2d0ed5));},VisuMZ[_0x38de83(0x228)][_0x38de83(0x286)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1ef)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1ef)]=function(_0x1d072c){const _0x45b24d=_0x38de83,_0x5e2e9d=this['_buffs'][_0x1d072c];VisuMZ[_0x45b24d(0x228)][_0x45b24d(0x286)][_0x45b24d(0x2db)](this,_0x1d072c);if(_0x5e2e9d>0x0)this[_0x45b24d(0x27e)](_0x1d072c);if(_0x5e2e9d<0x0)this[_0x45b24d(0xa0)](_0x1d072c);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x38de83(0x311)]['increaseBuff'],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2e6)]=function(_0x36e1f7){const _0x5c0cfa=_0x38de83;VisuMZ[_0x5c0cfa(0x228)]['Game_BattlerBase_increaseBuff'][_0x5c0cfa(0x2db)](this,_0x36e1f7);if(!this[_0x5c0cfa(0x23b)](_0x36e1f7))this[_0x5c0cfa(0x1ef)](_0x36e1f7);},VisuMZ['SkillsStatesCore'][_0x38de83(0x163)]=Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xe7)],Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xe7)]=function(_0x4321c0){const _0xd5f907=_0x38de83;VisuMZ[_0xd5f907(0x228)][_0xd5f907(0x163)]['call'](this,_0x4321c0);if(!this['isBuffOrDebuffAffected'](_0x4321c0))this[_0xd5f907(0x1ef)](_0x4321c0);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x27e)]=function(_0xb7ccb6){},Game_BattlerBase['prototype'][_0x38de83(0xa0)]=function(_0x435a57){},Game_BattlerBase[_0x38de83(0x311)]['isMaxBuffAffected']=function(_0xd333ce){const _0xc4d46b=_0x38de83;return this[_0xc4d46b(0x2b9)][_0xd333ce]===VisuMZ[_0xc4d46b(0x228)][_0xc4d46b(0xfd)][_0xc4d46b(0x8f)][_0xc4d46b(0x19f)];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x328)]=function(_0x267377){const _0x4ba4bf=_0x38de83;return this['_buffs'][_0x267377]===-VisuMZ[_0x4ba4bf(0x228)]['Settings'][_0x4ba4bf(0x8f)][_0x4ba4bf(0x6b)];},VisuMZ[_0x38de83(0x228)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase['prototype'][_0x38de83(0x2d5)],Game_BattlerBase[_0x38de83(0x311)]['buffIconIndex']=function(_0x14b71a,_0x48445d){const _0x4bb068=_0x38de83;return _0x14b71a=_0x14b71a[_0x4bb068(0x160)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x4bb068(0x10c)][_0x4bb068(0x2db)](this,_0x14b71a,_0x48445d);},Game_BattlerBase['prototype'][_0x38de83(0x84)]=function(_0x46927d){const _0x21b8b5=_0x38de83,_0x4f6415=this[_0x21b8b5(0x2b9)][_0x46927d];return VisuMZ[_0x21b8b5(0x228)][_0x21b8b5(0xfd)][_0x21b8b5(0x8f)]['MultiplierJS'][_0x21b8b5(0x2db)](this,_0x46927d,_0x4f6415);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xf5)]=function(_0x49ef37){const _0xeed2f=_0x38de83;return this[_0xeed2f(0x1de)][_0x49ef37]||0x0;},Game_BattlerBase['prototype'][_0x38de83(0x264)]=function(_0x48a9de){const _0x2993ab=_0x38de83;return this[_0x2993ab(0xf5)](_0x48a9de);},Game_BattlerBase[_0x38de83(0x311)]['setBuffTurns']=function(_0x2f5eae,_0x2f4dfa){const _0x2c1a09=_0x38de83;if(this['isBuffAffected'](_0x2f5eae)){const _0x5a3013=VisuMZ[_0x2c1a09(0x228)][_0x2c1a09(0xfd)]['Buffs']['MaxTurns'];this[_0x2c1a09(0x1de)][_0x2f5eae]=_0x2f4dfa[_0x2c1a09(0x160)](0x0,_0x5a3013);}},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x28e)]=function(_0x24823e,_0x35675e){const _0x22dcfe=_0x38de83;this[_0x22dcfe(0x315)](_0x24823e)&&(_0x35675e+=this[_0x22dcfe(0xf5)](stateId),this[_0x22dcfe(0x136)](_0x24823e,_0x35675e));},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x202)]=function(_0x25b84a,_0x1498a8){const _0x504136=_0x38de83;if(this[_0x504136(0x12c)](_0x25b84a)){const _0xbe3976=VisuMZ[_0x504136(0x228)]['Settings'][_0x504136(0x8f)][_0x504136(0x193)];this['_buffTurns'][_0x25b84a]=_0x1498a8[_0x504136(0x160)](0x0,_0xbe3976);}},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2e3)]=function(_0x32a6b0,_0x4d8270){const _0x1ec8e5=_0x38de83;this[_0x1ec8e5(0x12c)](_0x32a6b0)&&(_0x4d8270+=this[_0x1ec8e5(0xf5)](stateId),this[_0x1ec8e5(0x202)](_0x32a6b0,_0x4d8270));},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x93)]=function(_0x5db703){const _0x1d25cf=_0x38de83;if(typeof _0x5db703!=='number')_0x5db703=_0x5db703['id'];return this['_stateData']=this['_stateData']||{},this[_0x1d25cf(0x1f6)][_0x5db703]=this[_0x1d25cf(0x1f6)][_0x5db703]||{},this[_0x1d25cf(0x1f6)][_0x5db703];},Game_BattlerBase['prototype'][_0x38de83(0x19e)]=function(_0x3350e1,_0x2bb65a){const _0x287df6=_0x38de83;if(typeof _0x3350e1!==_0x287df6(0x1c0))_0x3350e1=_0x3350e1['id'];const _0x5c445d=this['stateData'](_0x3350e1);return _0x5c445d[_0x2bb65a];},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x7a)]=function(_0x3870a6,_0x1f69af,_0x20bec3){const _0x5352ad=_0x38de83;if(typeof _0x3870a6!==_0x5352ad(0x1c0))_0x3870a6=_0x3870a6['id'];const _0x3a65e0=this[_0x5352ad(0x93)](_0x3870a6);_0x3a65e0[_0x1f69af]=_0x20bec3;},Game_BattlerBase[_0x38de83(0x311)]['clearStateData']=function(_0x56edd1){const _0x1ccf75=_0x38de83;if(typeof _0x56edd1!=='number')_0x56edd1=_0x56edd1['id'];this['_stateData']=this[_0x1ccf75(0x1f6)]||{},this[_0x1ccf75(0x1f6)][_0x56edd1]={};},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2ac)]=function(_0x294483){const _0x17468a=_0x38de83;if(typeof _0x294483!==_0x17468a(0x1c0))_0x294483=_0x294483['id'];return this[_0x17468a(0xee)]=this['_stateDisplay']||{},this[_0x17468a(0xee)][_0x294483]===undefined&&(this[_0x17468a(0xee)][_0x294483]=''),this[_0x17468a(0xee)][_0x294483];},Game_BattlerBase['prototype'][_0x38de83(0xc5)]=function(_0x5d635f,_0x11932a){const _0x3545cc=_0x38de83;if(typeof _0x5d635f!==_0x3545cc(0x1c0))_0x5d635f=_0x5d635f['id'];this['_stateDisplay']=this[_0x3545cc(0xee)]||{},this[_0x3545cc(0xee)][_0x5d635f]=_0x11932a;},Game_BattlerBase['prototype'][_0x38de83(0x106)]=function(_0x51ad7e){const _0x4a5d69=_0x38de83;if(typeof _0x51ad7e!==_0x4a5d69(0x1c0))_0x51ad7e=_0x51ad7e['id'];this[_0x4a5d69(0xee)]=this['_stateDisplay']||{},this[_0x4a5d69(0xee)][_0x51ad7e]='';},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x179)]=function(_0x50d06a){const _0xbe6269=_0x38de83;if(typeof _0x50d06a!==_0xbe6269(0x1c0))_0x50d06a=_0x50d06a['id'];this[_0xbe6269(0x99)]=this['_stateOrigin']||{},this['_stateOrigin'][_0x50d06a]=this['_stateOrigin'][_0x50d06a]||_0xbe6269(0x27f);const _0x4eefc4=this[_0xbe6269(0x99)][_0x50d06a];return this[_0xbe6269(0x1d2)](_0x4eefc4);},Game_BattlerBase['prototype']['setStateOrigin']=function(_0x24afcd,_0x268c37){const _0x2638e7=_0x38de83;this[_0x2638e7(0x99)]=this[_0x2638e7(0x99)]||{};const _0x2d6f97=_0x268c37?this['convertTargetToStateOriginKey'](_0x268c37):this[_0x2638e7(0xbb)]();this[_0x2638e7(0x99)][_0x24afcd]=_0x2d6f97;},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x2dc)]=function(_0x52187a){const _0x15d6d7=_0x38de83;this[_0x15d6d7(0x99)]=this[_0x15d6d7(0x99)]||{},delete this[_0x15d6d7(0x99)][_0x52187a];},Game_BattlerBase['prototype'][_0x38de83(0x12d)]=function(){this['_stateOrigin']={};},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xbb)]=function(){const _0x5932d3=_0x38de83,_0x26e406=this[_0x5932d3(0xdd)]();return this[_0x5932d3(0xf4)](_0x26e406);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xdd)]=function(){const _0x408686=_0x38de83;if($gameParty[_0x408686(0x110)]()){if(BattleManager[_0x408686(0x223)])return BattleManager[_0x408686(0x223)];else{if(BattleManager[_0x408686(0x1f2)])return BattleManager[_0x408686(0x1f2)];}}else{const _0x5f27c8=SceneManager[_0x408686(0x1ba)];if(![Scene_Map,Scene_Item][_0x408686(0x310)](_0x5f27c8[_0x408686(0x12f)]))return $gameParty[_0x408686(0x2f0)]();}return this;},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0xf4)]=function(_0x26a339){const _0xe96276=_0x38de83;if(!_0x26a339)return _0xe96276(0x27f);if(_0x26a339['isActor']())return _0xe96276(0x321)[_0xe96276(0x1e6)](_0x26a339[_0xe96276(0x14d)]());else{const _0x3c636b=_0xe96276(0x1bd)['format'](_0x26a339[_0xe96276(0xe1)]()),_0x51d3c6='<member-%1>'['format'](_0x26a339[_0xe96276(0x2cd)]()),_0x3b4dd4=_0xe96276(0x2f7)['format']($gameTroop[_0xe96276(0x276)]());return _0xe96276(0x299)[_0xe96276(0x1e6)](_0x3c636b,_0x51d3c6,_0x3b4dd4);}return _0xe96276(0x27f);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1d2)]=function(_0x4e5d69){const _0x1c2c53=_0x38de83;if(_0x4e5d69===_0x1c2c53(0x27f))return this;else{if(_0x4e5d69[_0x1c2c53(0x201)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if($gameParty[_0x1c2c53(0x110)]()&&_0x4e5d69[_0x1c2c53(0x201)](/<troop-(\d+)>/i)){const _0x81fa97=Number(RegExp['$1']);if(_0x81fa97===$gameTroop[_0x1c2c53(0x276)]()){if(_0x4e5d69['match'](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x4e5d69[_0x1c2c53(0x201)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore']['Game_Battler_addState']=Game_Battler[_0x38de83(0x311)][_0x38de83(0x2c9)],Game_Battler[_0x38de83(0x311)][_0x38de83(0x2c9)]=function(_0x167da3){const _0x37e2f6=_0x38de83,_0x3bb0af=this['isStateAddable'](_0x167da3);VisuMZ[_0x37e2f6(0x228)]['Game_Battler_addState']['call'](this,_0x167da3);if(_0x3bb0af&&this['hasState']($dataStates[_0x167da3])){this[_0x37e2f6(0x1a9)](_0x167da3);;}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x11b)]=Game_Battler['prototype'][_0x38de83(0x192)],Game_Battler[_0x38de83(0x311)][_0x38de83(0x192)]=function(_0x14b283){const _0x4e0918=_0x38de83,_0x36efb8=$dataStates[_0x14b283];if(_0x36efb8&&_0x36efb8[_0x4e0918(0x1af)][_0x4e0918(0x201)](/<NO DEATH CLEAR>/i))return!this['isStateResist'](_0x14b283)&&!this['isStateRestrict'](_0x14b283)&&!this[_0x4e0918(0x1ca)][_0x4e0918(0xb2)](_0x14b283);return VisuMZ[_0x4e0918(0x228)][_0x4e0918(0x11b)][_0x4e0918(0x2db)](this,_0x14b283);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x1a9)]=function(_0x11b2e0){const _0x45e330=_0x38de83;this[_0x45e330(0xfc)](_0x11b2e0),this[_0x45e330(0x216)](_0x11b2e0),this[_0x45e330(0x98)](_0x11b2e0),this[_0x45e330(0x30a)](_0x11b2e0),this['onAddStateGlobalJS'](_0x11b2e0);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x2e8)]=function(_0xbcb0d6){const _0x11cb25=_0x38de83;this[_0x11cb25(0x2aa)](_0xbcb0d6),this[_0x11cb25(0x248)](_0xbcb0d6),Game_BattlerBase[_0x11cb25(0x311)][_0x11cb25(0x2e8)][_0x11cb25(0x2db)](this,_0xbcb0d6);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x19d)]=function(_0x2bde4a){const _0x33599a=_0x38de83;for(const _0x493118 of this[_0x33599a(0x28f)]()){this[_0x33599a(0x200)](_0x493118['id'])&&_0x493118[_0x33599a(0x1d9)]===_0x2bde4a&&(this[_0x33599a(0x1cd)](_0x493118['id']),this[_0x33599a(0x214)](_0x493118['id']),this[_0x33599a(0x6d)](_0x493118['id']));}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x214)]=function(_0x18b57c){this['onExpireStateCustomJS'](_0x18b57c);},Game_Battler['prototype'][_0x38de83(0x30a)]=function(_0x474551){const _0x19604b=_0x38de83;if(this[_0x19604b(0x191)]||this[_0x19604b(0x25e)])return;const _0x228660=VisuMZ['SkillsStatesCore'][_0x19604b(0xd9)];if(_0x228660[_0x474551])_0x228660[_0x474551][_0x19604b(0x2db)](this,_0x474551);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x2aa)]=function(_0x290a0f){const _0x3866de=_0x38de83;if(this[_0x3866de(0x191)]||this[_0x3866de(0x25e)])return;const _0x4e4355=VisuMZ['SkillsStatesCore'][_0x3866de(0x28b)];if(_0x4e4355[_0x290a0f])_0x4e4355[_0x290a0f][_0x3866de(0x2db)](this,_0x290a0f);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x304)]=function(_0xf0e7dd){const _0x4d2bec=_0x38de83;if(this['_tempActor']||this[_0x4d2bec(0x25e)])return;const _0x18c80b=VisuMZ[_0x4d2bec(0x228)][_0x4d2bec(0xeb)];if(_0x18c80b[_0xf0e7dd])_0x18c80b[_0xf0e7dd][_0x4d2bec(0x2db)](this,_0xf0e7dd);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x9d)]=function(_0xb6bc6a){const _0x358c24=_0x38de83;if(this['_tempActor']||this[_0x358c24(0x25e)])return;try{VisuMZ[_0x358c24(0x228)][_0x358c24(0xfd)][_0x358c24(0x20c)][_0x358c24(0x14b)][_0x358c24(0x2db)](this,_0xb6bc6a);}catch(_0x368af2){if($gameTemp[_0x358c24(0x326)]())console['log'](_0x368af2);}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x248)]=function(_0x2f4104){const _0x3aa622=_0x38de83;if(this[_0x3aa622(0x191)]||this[_0x3aa622(0x25e)])return;try{VisuMZ[_0x3aa622(0x228)][_0x3aa622(0xfd)][_0x3aa622(0x20c)]['onEraseStateJS'][_0x3aa622(0x2db)](this,_0x2f4104);}catch(_0x1d325c){if($gameTemp[_0x3aa622(0x326)]())console['log'](_0x1d325c);}},Game_Battler['prototype']['onExpireStateGlobalJS']=function(_0x1660ee){const _0x5ec24e=_0x38de83;if(this['_tempActor']||this[_0x5ec24e(0x25e)])return;try{VisuMZ[_0x5ec24e(0x228)]['Settings'][_0x5ec24e(0x20c)]['onExpireStateJS']['call'](this,_0x1660ee);}catch(_0x3a304f){if($gameTemp['isPlaytest']())console[_0x5ec24e(0x1a1)](_0x3a304f);}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x215)]=function(_0x15e0a4){const _0x1ba019=_0x38de83;return _0x15e0a4=_0x15e0a4[_0x1ba019(0x2c1)]()[_0x1ba019(0x2b7)](),this[_0x1ba019(0x28f)]()[_0x1ba019(0x19a)](_0x39e0e3=>_0x39e0e3[_0x1ba019(0x222)][_0x1ba019(0x310)](_0x15e0a4));},Game_Battler[_0x38de83(0x311)][_0x38de83(0xfa)]=function(_0x172803,_0x1afeb0){const _0x429b66=_0x38de83;_0x172803=_0x172803[_0x429b66(0x2c1)]()[_0x429b66(0x2b7)](),_0x1afeb0=_0x1afeb0||0x0;const _0x5ee2aa=this[_0x429b66(0x215)](_0x172803),_0x540ca1=[];for(const _0x670456 of _0x5ee2aa){if(!_0x670456)continue;if(_0x1afeb0<=0x0)break;_0x540ca1['push'](_0x670456['id']),this[_0x429b66(0x1ca)][_0x429b66(0xe3)]=!![],_0x1afeb0--;}while(_0x540ca1['length']>0x0){this['removeState'](_0x540ca1[_0x429b66(0x1eb)]());}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x249)]=function(_0x24f186,_0x2c990f){const _0xd3813b=_0x38de83;_0x24f186=_0x24f186['toUpperCase']()[_0xd3813b(0x2b7)](),_0x2c990f=_0x2c990f||[];const _0x24670d=this[_0xd3813b(0x215)](_0x24f186),_0x47a89c=[];for(const _0x34894c of _0x24670d){if(!_0x34894c)continue;if(_0x2c990f[_0xd3813b(0x310)](_0x34894c))continue;_0x47a89c['push'](_0x34894c['id']),this[_0xd3813b(0x1ca)][_0xd3813b(0xe3)]=!![];}while(_0x47a89c[_0xd3813b(0x150)]>0x0){this[_0xd3813b(0x1cd)](_0x47a89c[_0xd3813b(0x1eb)]());}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x314)]=function(_0x501ebd){const _0x1e4ed5=_0x38de83;return this[_0x1e4ed5(0x18f)](_0x501ebd)>0x0;},Game_Battler[_0x38de83(0x311)][_0x38de83(0x15f)]=function(_0x1f18b6){return this['totalStateCategory'](_0x1f18b6)>0x0;},Game_Battler[_0x38de83(0x311)]['totalStateCategoryAffected']=function(_0x199cec){const _0x4e5c2a=_0x38de83,_0x5cf6a0=this[_0x4e5c2a(0x215)](_0x199cec)['filter'](_0x4cf255=>this[_0x4e5c2a(0x1a4)](_0x4cf255['id']));return _0x5cf6a0[_0x4e5c2a(0x150)];},Game_Battler['prototype']['totalStateCategory']=function(_0x228cce){const _0x47fad6=_0x38de83,_0x3dc8b0=this[_0x47fad6(0x215)](_0x228cce);return _0x3dc8b0[_0x47fad6(0x150)];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1c8)]=Game_BattlerBase['prototype']['isStateResist'],Game_BattlerBase['prototype'][_0x38de83(0x95)]=function(_0xbee83c){const _0x92fcf4=_0x38de83,_0x209de8=$dataStates[_0xbee83c];if(_0x209de8&&_0x209de8[_0x92fcf4(0x222)][_0x92fcf4(0x150)]>0x0)for(const _0x53e356 of _0x209de8[_0x92fcf4(0x222)]){if(this[_0x92fcf4(0x186)](_0x53e356))return!![];}return VisuMZ['SkillsStatesCore']['Game_BattlerBase_isStateResist'][_0x92fcf4(0x2db)](this,_0xbee83c);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x186)]=function(_0x5d7d1d){const _0x4b8d32=_0x38de83;let _0x4496c2=_0x4b8d32(0x322);if(this['checkCacheKey'](_0x4496c2))return this[_0x4b8d32(0x23c)][_0x4496c2][_0x4b8d32(0x310)](_0x5d7d1d);return this[_0x4b8d32(0x23c)][_0x4496c2]=this[_0x4b8d32(0x218)](),this[_0x4b8d32(0x23c)][_0x4496c2][_0x4b8d32(0x310)](_0x5d7d1d);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x218)]=function(){const _0xe1493=_0x38de83,_0x8e33dc=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x1c97d5=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x19ead0=[];for(const _0x2326f1 of this['traitObjects']()){if(!_0x2326f1)continue;const _0x1c2deb=_0x2326f1[_0xe1493(0x1af)],_0x59b057=_0x1c2deb[_0xe1493(0x201)](_0x8e33dc);if(_0x59b057)for(const _0x4935b6 of _0x59b057){_0x4935b6[_0xe1493(0x201)](_0x8e33dc);const _0x1675a0=String(RegExp['$1'])[_0xe1493(0x79)](',')[_0xe1493(0xcb)](_0x927c68=>String(_0x927c68)[_0xe1493(0x2c1)]()[_0xe1493(0x2b7)]());_0x19ead0=_0x19ead0[_0xe1493(0x270)](_0x1675a0);}if(_0x1c2deb[_0xe1493(0x201)](_0x1c97d5)){const _0x198c15=String(RegExp['$1'])['split'](/[\r\n]+/)[_0xe1493(0xcb)](_0x358799=>String(_0x358799)[_0xe1493(0x2c1)]()[_0xe1493(0x2b7)]());_0x19ead0=_0x19ead0[_0xe1493(0x270)](_0x198c15);}}return _0x19ead0;},Game_BattlerBase[_0x38de83(0x311)]['removeOtherStatesOfSameCategory']=function(_0x574b7d){const _0x23b31a=_0x38de83,_0x214118=$dataStates[_0x574b7d];if(!_0x214118)return;const _0x1bb83f=_0x214118[_0x23b31a(0x1af)]||'',_0x215bb4=_0x1bb83f[_0x23b31a(0x201)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x215bb4){const _0x39a7e0=[_0x214118];for(const _0x45fd65 of _0x215bb4){_0x45fd65[_0x23b31a(0x201)](/<REMOVE OTHER (.*) STATES>/i);const _0x2505a4=String(RegExp['$1']);this[_0x23b31a(0x249)](_0x2505a4,_0x39a7e0);}}},Game_Battler[_0x38de83(0x311)]['removeStatesByDamage']=function(){const _0xfc2d66=_0x38de83;for(const _0x2bd35a of this[_0xfc2d66(0x28f)]()){if(!_0x2bd35a)continue;if(!this['isStateAffected'](_0x2bd35a['id']))continue;if(!_0x2bd35a[_0xfc2d66(0x13f)])continue;if(this['bypassRemoveStatesByDamage'](_0x2bd35a))continue;Math[_0xfc2d66(0x22d)](0x64)<_0x2bd35a[_0xfc2d66(0x156)]&&this[_0xfc2d66(0x1cd)](_0x2bd35a['id']);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1bb)]=Game_Action[_0x38de83(0x311)][_0x38de83(0x134)],Game_Action[_0x38de83(0x311)][_0x38de83(0x134)]=function(_0x535c3c,_0x402e0d){const _0x3d4d33=_0x38de83;$gameTemp['_bypassRemoveStateDamage_action']=this[_0x3d4d33(0xa6)](),$gameTemp['_bypassRemoveStateDamage_user']=this['subject'](),$gameTemp[_0x3d4d33(0x327)]=_0x402e0d,VisuMZ['SkillsStatesCore'][_0x3d4d33(0x1bb)][_0x3d4d33(0x2db)](this,_0x535c3c,_0x402e0d),$gameTemp[_0x3d4d33(0x1a2)]=undefined,$gameTemp[_0x3d4d33(0x25b)]=undefined,$gameTemp[_0x3d4d33(0x327)]=undefined;},Game_Battler[_0x38de83(0x311)][_0x38de83(0x1b1)]=function(_0x1b1785){const _0x236570=_0x38de83;if($gameTemp[_0x236570(0x1a2)]){const _0x43e3fd=$gameTemp[_0x236570(0x1a2)],_0x5bbb73=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x1b1785,_0x43e3fd,_0x5bbb73,_0x236570(0x234)))return!![];}if($gameTemp['_bypassRemoveStateDamage_user']){const _0x4834a9=$gameTemp[_0x236570(0x25b)];if(_0x4834a9[_0x236570(0x1fb)](_0x1b1785))return!![];}if(this[_0x236570(0x167)](_0x1b1785))return!![];return![];},Game_Battler['prototype'][_0x38de83(0x1fb)]=function(_0x267550){const _0x4545ce=_0x38de83,_0x5725c7=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0xd90b4f of this['traitObjects']()){if(!_0xd90b4f)continue;if(DataManager[_0x4545ce(0x2ad)](_0x267550,_0xd90b4f,_0x5725c7,_0x4545ce(0x1ad)))return!![];}return![];},Game_Battler[_0x38de83(0x311)][_0x38de83(0x167)]=function(_0x55046c){const _0x30ecd6=_0x38de83,_0x5a0e1e=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x1c3bf4 of this[_0x30ecd6(0x1e2)]()){if(!_0x1c3bf4)continue;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x55046c,_0x1c3bf4,_0x5a0e1e,_0x30ecd6(0xe2)))return!![];}return![];},DataManager[_0x38de83(0x2ad)]=function(_0x310ec4,_0x5bf207,_0x2d6780,_0x2acd84){const _0x4bf1bc=_0x38de83,_0x28a69e='%1-%2-%3'[_0x4bf1bc(0x1e6)](_0x5bf207[_0x4bf1bc(0x2d6)],_0x5bf207['id'],_0x2acd84);this[_0x4bf1bc(0x1d0)]=this[_0x4bf1bc(0x1d0)]||{};if(this[_0x4bf1bc(0x1d0)][_0x28a69e]!==undefined)return this[_0x4bf1bc(0x1d0)][_0x28a69e][_0x4bf1bc(0x310)](_0x310ec4['id']);const _0x34f934=[],_0x5ef97c=_0x5bf207[_0x4bf1bc(0x1af)][_0x4bf1bc(0x201)](_0x2d6780);if(_0x5ef97c)for(const _0x36ddd6 of _0x5ef97c){_0x36ddd6[_0x4bf1bc(0x201)](_0x2d6780);const _0x3f3176=String(RegExp['$1'])[_0x4bf1bc(0x79)](',')[_0x4bf1bc(0xcb)](_0x681223=>_0x681223[_0x4bf1bc(0x2b7)]());for(let _0xe12df8 of _0x3f3176){_0xe12df8=(String(_0xe12df8)||'')[_0x4bf1bc(0x2b7)]();if(_0xe12df8[_0x4bf1bc(0x201)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x1ec496=Math[_0x4bf1bc(0xd3)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x49d399=Math[_0x4bf1bc(0x89)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x22a9e0=_0x1ec496;_0x22a9e0<=_0x49d399;_0x22a9e0++)elements[_0x4bf1bc(0x1f8)](_0x22a9e0);continue;}const _0x108d23=/^\d+$/['test'](_0xe12df8);_0x108d23?entryID=Number(_0xe12df8):entryID=DataManager[_0x4bf1bc(0x2c2)](_0xe12df8),entryID&&_0x34f934[_0x4bf1bc(0x1f8)](entryID);}}return this[_0x4bf1bc(0x1d0)][_0x28a69e]=_0x34f934,this['_cache_CheckBypassRemoveStatesByDamage'][_0x28a69e][_0x4bf1bc(0x310)](_0x310ec4['id']);},VisuMZ['SkillsStatesCore'][_0x38de83(0x211)]=Game_Battler[_0x38de83(0x311)][_0x38de83(0xc6)],Game_Battler[_0x38de83(0x311)][_0x38de83(0xc6)]=function(_0x3fa449,_0x252d5d){const _0x484f66=_0x38de83;VisuMZ[_0x484f66(0x228)][_0x484f66(0x211)]['call'](this,_0x3fa449,_0x252d5d),this[_0x484f66(0x315)](_0x3fa449)&&this[_0x484f66(0x153)](_0x3fa449,_0x252d5d);},Game_Battler['prototype'][_0x38de83(0x2cf)]=function(_0x12d119){},VisuMZ['SkillsStatesCore'][_0x38de83(0x2e7)]=Game_Battler[_0x38de83(0x311)]['addDebuff'],Game_Battler[_0x38de83(0x311)][_0x38de83(0x133)]=function(_0x5673bf,_0x2daddb){const _0x507ecf=_0x38de83;VisuMZ[_0x507ecf(0x228)][_0x507ecf(0x2e7)][_0x507ecf(0x2db)](this,_0x5673bf,_0x2daddb),this[_0x507ecf(0x12c)](_0x5673bf)&&this['onAddDebuff'](_0x5673bf,_0x2daddb);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x30b)]=function(){const _0x1351d6=_0x38de83;for(let _0x175176=0x0;_0x175176<this['buffLength']();_0x175176++){if(this[_0x1351d6(0xd0)](_0x175176)){const _0xb69e78=this[_0x1351d6(0x2b9)][_0x175176];this[_0x1351d6(0xf9)](_0x175176);if(_0xb69e78>0x0)this[_0x1351d6(0x220)](_0x175176);if(_0xb69e78<0x0)this[_0x1351d6(0xaa)](_0x175176);}}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x153)]=function(_0x15f0a1,_0x6ff10f){this['onAddBuffGlobalJS'](_0x15f0a1,_0x6ff10f);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x11c)]=function(_0x3b5da8,_0x3f9e0a){this['onAddDebuffGlobalJS'](_0x3b5da8,_0x3f9e0a);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x27e)]=function(_0x22889c){const _0x4dbc20=_0x38de83;Game_BattlerBase['prototype'][_0x4dbc20(0x27e)][_0x4dbc20(0x2db)](this,_0x22889c),this[_0x4dbc20(0x30e)](_0x22889c);},Game_Battler['prototype'][_0x38de83(0xa0)]=function(_0x330e6e){const _0x2df689=_0x38de83;Game_BattlerBase[_0x2df689(0x311)][_0x2df689(0xa0)][_0x2df689(0x2db)](this,_0x330e6e),this[_0x2df689(0x1d3)](_0x330e6e);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x220)]=function(_0x1002b8){const _0x7a2a6e=_0x38de83;this[_0x7a2a6e(0x213)](_0x1002b8);},Game_Battler[_0x38de83(0x311)][_0x38de83(0xaa)]=function(_0xdfed4b){const _0x576faf=_0x38de83;this[_0x576faf(0x1a7)](_0xdfed4b);},Game_Battler[_0x38de83(0x311)][_0x38de83(0xaf)]=function(_0x33f776,_0x2012e2){const _0x596e98=_0x38de83;VisuMZ[_0x596e98(0x228)]['Settings']['Buffs'][_0x596e98(0x268)][_0x596e98(0x2db)](this,_0x33f776,_0x2012e2);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x295)]=function(_0xf524e5,_0x516402){const _0x2be762=_0x38de83;VisuMZ['SkillsStatesCore'][_0x2be762(0xfd)][_0x2be762(0x8f)]['onAddDebuffJS'][_0x2be762(0x2db)](this,_0xf524e5,_0x516402);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x30e)]=function(_0x3e25f4){const _0x40793e=_0x38de83;VisuMZ[_0x40793e(0x228)][_0x40793e(0xfd)][_0x40793e(0x8f)][_0x40793e(0x81)][_0x40793e(0x2db)](this,_0x3e25f4);},Game_BattlerBase[_0x38de83(0x311)][_0x38de83(0x1d3)]=function(_0x255387){const _0x6fb02e=_0x38de83;VisuMZ['SkillsStatesCore'][_0x6fb02e(0xfd)]['Buffs'][_0x6fb02e(0x2ea)]['call'](this,_0x255387);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x213)]=function(_0x274f47){const _0x3f8f43=_0x38de83;VisuMZ[_0x3f8f43(0x228)][_0x3f8f43(0xfd)][_0x3f8f43(0x8f)][_0x3f8f43(0x2d1)][_0x3f8f43(0x2db)](this,_0x274f47);},Game_Battler[_0x38de83(0x311)][_0x38de83(0x1a7)]=function(_0x20bc09){const _0x3802e0=_0x38de83;VisuMZ[_0x3802e0(0x228)]['Settings'][_0x3802e0(0x8f)][_0x3802e0(0x233)][_0x3802e0(0x2db)](this,_0x20bc09);},Game_Battler[_0x38de83(0x311)]['onAddStateMakeCustomSlipValues']=function(_0x219255){const _0x24f78f=_0x38de83,_0x2a869f=VisuMZ['SkillsStatesCore'],_0x58e584=[_0x24f78f(0x1b8),_0x24f78f(0x1fa),_0x24f78f(0xac),_0x24f78f(0x2bb),_0x24f78f(0x104),'stateTpSlipHealJS'];for(const _0x1d8fc9 of _0x58e584){_0x2a869f[_0x1d8fc9][_0x219255]&&_0x2a869f[_0x1d8fc9][_0x219255][_0x24f78f(0x2db)](this,_0x219255);}},VisuMZ[_0x38de83(0x228)][_0x38de83(0xb5)]=Game_Battler[_0x38de83(0x311)][_0x38de83(0x275)],Game_Battler[_0x38de83(0x311)][_0x38de83(0x275)]=function(){const _0x135e01=_0x38de83;this[_0x135e01(0x28c)](),VisuMZ['SkillsStatesCore']['Game_Battler_regenerateAll'][_0x135e01(0x2db)](this),this[_0x135e01(0x13e)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x38de83(0x311)][_0x38de83(0x13e)]=function(){const _0x12b39a=_0x38de83;for(const _0x244bdc of this[_0x12b39a(0x6e)]()){if(!_0x244bdc)continue;this[_0x12b39a(0x98)](_0x244bdc['id']);}},Game_Battler[_0x38de83(0x311)][_0x38de83(0x28c)]=function(){const _0x8e826c=_0x38de83;for(const _0xb09245 of this[_0x8e826c(0x28f)]()){if(!_0xb09245)continue;_0xb09245[_0x8e826c(0x1af)][_0x8e826c(0x201)](/<JS SLIP REFRESH>/i)&&this['onAddStateMakeCustomSlipValues'](_0xb09245['id']);}},Game_Battler['prototype'][_0x38de83(0x108)]=function(){const _0xe2b84b=_0x38de83;if(!this[_0xe2b84b(0x316)]())return;const _0x1732d0=this[_0xe2b84b(0x28f)]();for(const _0x5d7d4c of _0x1732d0){if(!_0x5d7d4c)continue;this[_0xe2b84b(0xba)](_0x5d7d4c);}},Game_Battler[_0x38de83(0x311)][_0x38de83(0xba)]=function(_0x2702da){const _0xa18ed0=_0x38de83,_0x3806c3=this[_0xa18ed0(0x19e)](_0x2702da['id'],_0xa18ed0(0x208))||0x0,_0x28150a=-this[_0xa18ed0(0x260)](),_0x43713e=Math[_0xa18ed0(0x89)](_0x3806c3,_0x28150a);if(_0x43713e!==0x0){const _0x227d9b=this[_0xa18ed0(0x1ca)][_0xa18ed0(0x2a5)]||0x0;this[_0xa18ed0(0xb4)](_0x43713e),this[_0xa18ed0(0x1ca)][_0xa18ed0(0x2a5)]+=_0x227d9b;}const _0x2ed056=this['getStateData'](_0x2702da['id'],'slipMp')||0x0;if(_0x2ed056!==0x0){const _0x3d73ee=this[_0xa18ed0(0x1ca)][_0xa18ed0(0xb1)]||0x0;this[_0xa18ed0(0x219)](_0x2ed056),this['_result'][_0xa18ed0(0xb1)]+=_0x3d73ee;}const _0x837d6a=this[_0xa18ed0(0x19e)](_0x2702da['id'],_0xa18ed0(0xb0))||0x0;_0x837d6a!==0x0&&this[_0xa18ed0(0x18a)](_0x837d6a);},VisuMZ[_0x38de83(0x228)]['Game_Actor_skillTypes']=Game_Actor[_0x38de83(0x311)][_0x38de83(0x195)],Game_Actor[_0x38de83(0x311)][_0x38de83(0x195)]=function(){const _0x2a3dfe=_0x38de83,_0x3e59c6=VisuMZ['SkillsStatesCore'][_0x2a3dfe(0x8d)][_0x2a3dfe(0x2db)](this),_0x3732b4=VisuMZ[_0x2a3dfe(0x228)][_0x2a3dfe(0xfd)][_0x2a3dfe(0x2c3)];let _0x469ab9=_0x3732b4[_0x2a3dfe(0x2de)];return $gameParty['inBattle']()&&(_0x469ab9=_0x469ab9[_0x2a3dfe(0x270)](_0x3732b4[_0x2a3dfe(0xb6)])),_0x3e59c6[_0x2a3dfe(0x19a)](_0x53b1a3=>!_0x469ab9['includes'](_0x53b1a3));},Game_Actor[_0x38de83(0x311)][_0x38de83(0xce)]=function(){const _0x48e9a8=_0x38de83;return this[_0x48e9a8(0xa2)]()[_0x48e9a8(0x19a)](_0x3e188a=>this['isSkillUsableForAutoBattle'](_0x3e188a));},Game_Actor[_0x38de83(0x311)]['isSkillUsableForAutoBattle']=function(_0x4f2a81){const _0x56ef20=_0x38de83;if(!this[_0x56ef20(0x273)](_0x4f2a81))return![];if(!_0x4f2a81)return![];if(!this[_0x56ef20(0x2b8)](_0x4f2a81))return![];if(this[_0x56ef20(0x22e)](_0x4f2a81))return![];return!![];},Game_Actor[_0x38de83(0x311)][_0x38de83(0x2b8)]=function(_0x5ef3f3){const _0x41e786=_0x38de83,_0x530397=this[_0x41e786(0x195)](),_0x4368c7=DataManager[_0x41e786(0x284)](_0x5ef3f3),_0x142a81=_0x530397['filter'](_0x563fab=>_0x4368c7['includes'](_0x563fab));return _0x142a81[_0x41e786(0x150)]>0x0;},Game_Actor['prototype'][_0x38de83(0x22e)]=function(_0xa822b5){const _0x30d854=_0x38de83;if(!VisuMZ[_0x30d854(0x228)][_0x30d854(0xe9)](this,_0xa822b5))return!![];if(!VisuMZ[_0x30d854(0x228)]['CheckVisibleSwitchNotetags'](this,_0xa822b5))return!![];if(!VisuMZ[_0x30d854(0x228)][_0x30d854(0x2fa)](this,_0xa822b5))return!![];return![];},Game_Actor[_0x38de83(0x311)][_0x38de83(0x1a3)]=function(){const _0x3e06c3=_0x38de83;let _0x15de44=[this[_0x3e06c3(0x152)](),this['currentClass']()];_0x15de44=_0x15de44[_0x3e06c3(0x270)](this[_0x3e06c3(0x1b2)]()[_0x3e06c3(0x19a)](_0x1a65a0=>_0x1a65a0));for(const _0x7bb79d of this[_0x3e06c3(0x168)]){const _0x34c7b4=$dataSkills[_0x7bb79d];if(_0x34c7b4)_0x15de44[_0x3e06c3(0x1f8)](_0x34c7b4);}return _0x15de44;},Game_Actor['prototype']['addPassiveStatesByPluginParameters']=function(){const _0x114ca1=_0x38de83;Game_Battler[_0x114ca1(0x311)][_0x114ca1(0x2dd)][_0x114ca1(0x2db)](this);const _0x25dd15=VisuMZ[_0x114ca1(0x228)][_0x114ca1(0xfd)][_0x114ca1(0x226)][_0x114ca1(0x2da)];this[_0x114ca1(0x23c)][_0x114ca1(0x6e)]=this[_0x114ca1(0x23c)][_0x114ca1(0x6e)]['concat'](_0x25dd15);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x261)]=Game_Actor[_0x38de83(0x311)][_0x38de83(0xab)],Game_Actor[_0x38de83(0x311)][_0x38de83(0xab)]=function(_0x110fac){const _0x32b600=_0x38de83;VisuMZ[_0x32b600(0x228)][_0x32b600(0x261)]['call'](this,_0x110fac),this[_0x32b600(0x23c)]={},this[_0x32b600(0x6e)]();},VisuMZ['SkillsStatesCore'][_0x38de83(0x30d)]=Game_Actor[_0x38de83(0x311)][_0x38de83(0x2d9)],Game_Actor[_0x38de83(0x311)][_0x38de83(0x2d9)]=function(_0x26a078){const _0x507b28=_0x38de83;VisuMZ['SkillsStatesCore'][_0x507b28(0x30d)]['call'](this,_0x26a078),this[_0x507b28(0x23c)]={},this[_0x507b28(0x6e)]();},Game_Actor['prototype'][_0x38de83(0x11e)]=function(){const _0x2c52b4=_0x38de83;return VisuMZ[_0x2c52b4(0x228)][_0x2c52b4(0xfd)][_0x2c52b4(0x20c)][_0x2c52b4(0x18e)]??0x14;},Game_Enemy[_0x38de83(0x311)][_0x38de83(0x1a3)]=function(){const _0x2ac64b=_0x38de83;let _0x1b7e7b=[this['enemy']()];return _0x1b7e7b['concat'](this[_0x2ac64b(0xa2)]());},Game_Enemy[_0x38de83(0x311)][_0x38de83(0x2dd)]=function(){const _0x3d9f6a=_0x38de83;Game_Battler[_0x3d9f6a(0x311)][_0x3d9f6a(0x2dd)]['call'](this);const _0x1b217f=VisuMZ['SkillsStatesCore'][_0x3d9f6a(0xfd)][_0x3d9f6a(0x226)][_0x3d9f6a(0xf6)];this[_0x3d9f6a(0x23c)]['passiveStates']=this['_cache'][_0x3d9f6a(0x6e)][_0x3d9f6a(0x270)](_0x1b217f);},Game_Enemy[_0x38de83(0x311)][_0x38de83(0xa2)]=function(){const _0x35cb31=_0x38de83,_0x3ce22f=[];for(const _0x28ad90 of this['enemy']()[_0x35cb31(0x117)]){const _0x48a7cb=$dataSkills[_0x28ad90[_0x35cb31(0x309)]];if(_0x48a7cb&&!_0x3ce22f[_0x35cb31(0x310)](_0x48a7cb))_0x3ce22f[_0x35cb31(0x1f8)](_0x48a7cb);}return _0x3ce22f;},Game_Enemy['prototype'][_0x38de83(0x307)]=function(_0x458777){const _0x2ee1f1=_0x38de83;return this[_0x2ee1f1(0x2ee)]($dataStates[_0x458777]);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x9c)]=Game_Unit[_0x38de83(0x311)][_0x38de83(0x11a)],Game_Unit[_0x38de83(0x311)]['isAllDead']=function(){const _0x3c2860=_0x38de83;if(this[_0x3c2860(0x173)]())return!![];return VisuMZ['SkillsStatesCore'][_0x3c2860(0x9c)][_0x3c2860(0x2db)](this);},Game_Unit[_0x38de83(0x311)][_0x38de83(0x173)]=function(){const _0x135eee=_0x38de83,_0x242d69=this[_0x135eee(0x16a)]();for(const _0x51c4f5 of _0x242d69){if(!_0x51c4f5[_0x135eee(0x1d1)]())return![];}return!![];},VisuMZ['SkillsStatesCore'][_0x38de83(0x1b3)]=Game_Troop['prototype'][_0x38de83(0x247)],Game_Troop[_0x38de83(0x311)]['setup']=function(_0x9dcbfb){const _0x31470c=_0x38de83;VisuMZ[_0x31470c(0x228)][_0x31470c(0x1b3)][_0x31470c(0x2db)](this,_0x9dcbfb),this[_0x31470c(0x8c)]();},Game_Troop[_0x38de83(0x311)][_0x38de83(0x8c)]=function(){const _0x4bf717=_0x38de83;this[_0x4bf717(0x1bc)]=Graphics[_0x4bf717(0x303)];},Game_Troop[_0x38de83(0x311)][_0x38de83(0x276)]=function(){const _0x4318a4=_0x38de83;return this['_currentTroopUniqueID']=this['_currentTroopUniqueID']||Graphics[_0x4318a4(0x303)],this['_currentTroopUniqueID'];},Scene_Skill['prototype'][_0x38de83(0x185)]=function(){const _0x1b701e=_0x38de83;if(ConfigManager[_0x1b701e(0x231)]&&ConfigManager[_0x1b701e(0x21c)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x1b701e(0x201)](/LOWER/i);else Scene_ItemBase['prototype']['isRightInputMode'][_0x1b701e(0x2db)](this);}},Scene_Skill['prototype'][_0x38de83(0x24d)]=function(){const _0x3a5e62=_0x38de83;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x3a5e62(0x20e)]!==undefined)return ConfigManager[_0x3a5e62(0x20e)];else return this[_0x3a5e62(0x6f)]()?this[_0x3a5e62(0x263)]()[_0x3a5e62(0x201)](/RIGHT/i):Scene_ItemBase['prototype'][_0x3a5e62(0x24d)][_0x3a5e62(0x2db)](this);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x263)]=function(){const _0x579310=_0x38de83;return VisuMZ[_0x579310(0x228)][_0x579310(0xfd)][_0x579310(0x2c3)]['LayoutStyle'];},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x2be)]=function(){const _0x3ba151=_0x38de83;return this['_categoryWindow']&&this[_0x3ba151(0x2cc)][_0x3ba151(0x2be)]();},Scene_Skill['prototype'][_0x38de83(0x6f)]=function(){const _0x22c51c=_0x38de83;return VisuMZ['SkillsStatesCore']['Settings'][_0x22c51c(0x2c3)]['EnableLayout'];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x17b)]=Scene_Skill['prototype'][_0x38de83(0x151)],Scene_Skill[_0x38de83(0x311)][_0x38de83(0x151)]=function(){const _0x42546b=_0x38de83;return this[_0x42546b(0x6f)]()?this[_0x42546b(0x1c5)]():VisuMZ[_0x42546b(0x228)][_0x42546b(0x17b)]['call'](this);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x1c5)]=function(){const _0x4901d4=_0x38de83,_0x1b6f3c=0x0,_0x4a1579=this[_0x4901d4(0x102)](),_0x40f62b=Graphics[_0x4901d4(0x1b7)],_0x3f57cc=this[_0x4901d4(0x166)]();return new Rectangle(_0x1b6f3c,_0x4a1579,_0x40f62b,_0x3f57cc);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x29c)]=Scene_Skill['prototype'][_0x38de83(0x291)],Scene_Skill['prototype'][_0x38de83(0x291)]=function(){const _0x135789=_0x38de83;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ['SkillsStatesCore'][_0x135789(0x29c)][_0x135789(0x2db)](this);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x126)]=function(){const _0x59c107=_0x38de83;return VisuMZ[_0x59c107(0x228)][_0x59c107(0xfd)][_0x59c107(0x2c3)]['CmdWidth']??Scene_MenuBase[_0x59c107(0x311)]['mainCommandWidth'][_0x59c107(0x2db)](this);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x1c9)]=function(){const _0x44ef4c=_0x38de83,_0x442f18=this[_0x44ef4c(0x126)](),_0x5aa698=this[_0x44ef4c(0x224)](0x3,!![]),_0x3e84c9=this['isRightInputMode']()?Graphics['boxWidth']-_0x442f18:0x0,_0x215ff5=this[_0x44ef4c(0xa1)]();return new Rectangle(_0x3e84c9,_0x215ff5,_0x442f18,_0x5aa698);},VisuMZ[_0x38de83(0x228)]['Scene_Skill_statusWindowRect']=Scene_Skill['prototype'][_0x38de83(0x198)],Scene_Skill[_0x38de83(0x311)][_0x38de83(0x198)]=function(){const _0xfdec0e=_0x38de83;return this[_0xfdec0e(0x6f)]()?this['statusWindowRectSkillsStatesCore']():VisuMZ[_0xfdec0e(0x228)]['Scene_Skill_statusWindowRect'][_0xfdec0e(0x2db)](this);},Scene_Skill[_0x38de83(0x311)]['statusWindowRectSkillsStatesCore']=function(){const _0x1a0e79=Graphics['boxWidth']-this['mainCommandWidth'](),_0x3d5ca2=this['_skillTypeWindow']['height'],_0x59f31f=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x1a0e79,_0x1c16a9=this['mainAreaTop']();return new Rectangle(_0x59f31f,_0x1c16a9,_0x1a0e79,_0x3d5ca2);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x18d)]=Scene_Skill['prototype'][_0x38de83(0x140)],Scene_Skill[_0x38de83(0x311)]['createItemWindow']=function(){const _0x235853=_0x38de83;VisuMZ['SkillsStatesCore'][_0x235853(0x18d)][_0x235853(0x2db)](this),this['allowCreateShopStatusWindow']()&&this['createShopStatusWindow']();},VisuMZ['SkillsStatesCore']['Scene_Skill_itemWindowRect']=Scene_Skill['prototype'][_0x38de83(0xae)],Scene_Skill[_0x38de83(0x311)][_0x38de83(0xae)]=function(){const _0x3acbaa=_0x38de83;if(this[_0x3acbaa(0x6f)]())return this[_0x3acbaa(0xde)]();else{const _0x2e4891=VisuMZ[_0x3acbaa(0x228)][_0x3acbaa(0x7b)][_0x3acbaa(0x2db)](this);return this[_0x3acbaa(0x101)]()&&this[_0x3acbaa(0x125)]()&&(_0x2e4891['width']-=this[_0x3acbaa(0x1ac)]()),_0x2e4891;}},Scene_Skill[_0x38de83(0x311)][_0x38de83(0xde)]=function(){const _0x11eb59=_0x38de83,_0x4c8d35=Graphics[_0x11eb59(0x1b7)]-this[_0x11eb59(0x1ac)](),_0x2c78b3=this[_0x11eb59(0xd6)]()-this[_0x11eb59(0x313)][_0x11eb59(0x29d)],_0x475be9=this[_0x11eb59(0x24d)]()?Graphics[_0x11eb59(0x1b7)]-_0x4c8d35:0x0,_0x5e2193=this[_0x11eb59(0x313)]['y']+this[_0x11eb59(0x313)]['height'];return new Rectangle(_0x475be9,_0x5e2193,_0x4c8d35,_0x2c78b3);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x101)]=function(){const _0x1bf3e9=_0x38de83;if(!Imported[_0x1bf3e9(0x2a6)])return![];else return this[_0x1bf3e9(0x6f)]()?!![]:VisuMZ[_0x1bf3e9(0x228)][_0x1bf3e9(0xfd)][_0x1bf3e9(0x2c3)][_0x1bf3e9(0x294)];},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x125)]=function(){const _0x14809f=_0x38de83;return VisuMZ[_0x14809f(0x228)]['Settings'][_0x14809f(0x2c3)][_0x14809f(0x250)];},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x22a)]=function(){const _0x584c59=_0x38de83,_0x2c8663=this[_0x584c59(0x296)]();this['_shopStatusWindow']=new Window_ShopStatus(_0x2c8663),this[_0x584c59(0x2df)](this[_0x584c59(0x1cb)]),this[_0x584c59(0xf7)][_0x584c59(0xb8)](this[_0x584c59(0x1cb)]);const _0x1be85a=VisuMZ['SkillsStatesCore'][_0x584c59(0xfd)]['Skills'][_0x584c59(0x19b)];this['_shopStatusWindow'][_0x584c59(0x29b)](_0x1be85a||0x0);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x296)]=function(){const _0x214bba=_0x38de83;return this[_0x214bba(0x6f)]()?this[_0x214bba(0x145)]():VisuMZ['SkillsStatesCore'][_0x214bba(0xfd)]['Skills']['SkillMenuStatusRect']['call'](this);},Scene_Skill[_0x38de83(0x311)][_0x38de83(0x145)]=function(){const _0x1149f7=_0x38de83,_0x30e0c7=this[_0x1149f7(0x1ac)](),_0x1686c1=this[_0x1149f7(0xf7)]['height'],_0x3a59c8=this[_0x1149f7(0x24d)]()?0x0:Graphics[_0x1149f7(0x1b7)]-this[_0x1149f7(0x1ac)](),_0x52fff9=this[_0x1149f7(0xf7)]['y'];return new Rectangle(_0x3a59c8,_0x52fff9,_0x30e0c7,_0x1686c1);},Scene_Skill['prototype'][_0x38de83(0x1ac)]=function(){return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop['prototype']['statusWidth']():0x0;},Scene_Skill['prototype']['buttonAssistText1']=function(){const _0x9f7e85=_0x38de83;return this['_skillTypeWindow']&&this[_0x9f7e85(0x105)][_0x9f7e85(0xf0)]?TextManager[_0x9f7e85(0x2fb)]:'';},VisuMZ[_0x38de83(0x228)][_0x38de83(0x1e0)]=Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x1aa)],Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x1aa)]=function(){const _0x1e1eda=_0x38de83;VisuMZ['SkillsStatesCore']['Sprite_Gauge_initMembers'][_0x1e1eda(0x2db)](this),this[_0x1e1eda(0x164)]=null;},VisuMZ[_0x38de83(0x228)][_0x38de83(0xad)]=Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x247)],Sprite_Gauge[_0x38de83(0x311)]['setup']=function(_0x27506b,_0x42b4e9){const _0x209043=_0x38de83;this[_0x209043(0x1e7)](_0x27506b,_0x42b4e9),_0x42b4e9=_0x42b4e9[_0x209043(0x212)](),VisuMZ[_0x209043(0x228)][_0x209043(0xad)][_0x209043(0x2db)](this,_0x27506b,_0x42b4e9);},Sprite_Gauge['prototype'][_0x38de83(0x1e7)]=function(_0x21065e,_0x17e902){const _0x2fb46f=_0x38de83,_0x37263f=VisuMZ[_0x2fb46f(0x228)][_0x2fb46f(0xfd)][_0x2fb46f(0x29e)][_0x2fb46f(0x19a)](_0x50cefb=>_0x50cefb[_0x2fb46f(0x24c)][_0x2fb46f(0x2c1)]()===_0x17e902[_0x2fb46f(0x2c1)]());_0x37263f[_0x2fb46f(0x150)]>=0x1?this[_0x2fb46f(0x164)]=_0x37263f[0x0]:this[_0x2fb46f(0x164)]=null;},VisuMZ['SkillsStatesCore'][_0x38de83(0x8b)]=Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x113)],Sprite_Gauge['prototype'][_0x38de83(0x113)]=function(){const _0x552f44=_0x38de83;return this[_0x552f44(0x17a)]&&this['_costSettings']?this[_0x552f44(0x21f)]():VisuMZ['SkillsStatesCore']['Sprite_Gauge_currentValue'][_0x552f44(0x2db)](this);},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x21f)]=function(){const _0x11093b=_0x38de83;return this[_0x11093b(0x164)][_0x11093b(0x71)][_0x11093b(0x2db)](this[_0x11093b(0x17a)]);},VisuMZ[_0x38de83(0x228)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge['prototype']['currentMaxValue'],Sprite_Gauge['prototype'][_0x38de83(0x240)]=function(){const _0x34b71a=_0x38de83;return this[_0x34b71a(0x17a)]&&this[_0x34b71a(0x164)]?this[_0x34b71a(0x142)]():VisuMZ[_0x34b71a(0x228)][_0x34b71a(0x2d7)]['call'](this);},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x142)]=function(){const _0x3e1690=_0x38de83;return this[_0x3e1690(0x164)][_0x3e1690(0x129)][_0x3e1690(0x2db)](this[_0x3e1690(0x17a)]);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x252)]=Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x177)],Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x177)]=function(){const _0x4417c5=_0x38de83,_0x4f8443=VisuMZ['SkillsStatesCore'][_0x4417c5(0x252)][_0x4417c5(0x2db)](this);return _0x4f8443[_0x4417c5(0x160)](0x0,0x1);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x30f)]=Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x308)],Sprite_Gauge[_0x38de83(0x311)]['redraw']=function(){const _0x20b9da=_0x38de83;this[_0x20b9da(0x17a)]&&this[_0x20b9da(0x164)]?(this[_0x20b9da(0x90)][_0x20b9da(0xc2)](),this[_0x20b9da(0x75)]()):VisuMZ[_0x20b9da(0x228)][_0x20b9da(0x30f)][_0x20b9da(0x2db)](this);},Sprite_Gauge[_0x38de83(0x311)]['currentDisplayedValue']=function(){const _0x254efc=_0x38de83;let _0x1eeebd=this[_0x254efc(0x113)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x254efc(0x1ab)]()&&(_0x1eeebd=VisuMZ[_0x254efc(0x135)](_0x1eeebd)),_0x1eeebd;},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x75)]=function(){const _0x200e55=_0x38de83;this[_0x200e55(0x90)][_0x200e55(0xc2)](),this[_0x200e55(0x164)]['GaugeDrawJS'][_0x200e55(0x2db)](this);},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x16b)]=function(_0xb259cd,_0x424312,_0x32ef3c,_0x256a85,_0x15962d,_0x58cf77){const _0x332729=_0x38de83,_0x42db2d=this[_0x332729(0x177)](),_0x21d4fd=Math[_0x332729(0x1b9)]((_0x15962d-0x2)*_0x42db2d),_0x71ec6c=_0x58cf77-0x2,_0xbf9a57=this[_0x332729(0x2bd)]();this['bitmap'][_0x332729(0x320)](_0x32ef3c,_0x256a85,_0x15962d,_0x58cf77,_0xbf9a57),this['bitmap'][_0x332729(0x2f9)](_0x32ef3c+0x1,_0x256a85+0x1,_0x21d4fd,_0x71ec6c,_0xb259cd,_0x424312);},Sprite_Gauge[_0x38de83(0x311)]['labelFontFace']=function(){const _0x3eb8a5=_0x38de83,_0xb22f21=VisuMZ['SkillsStatesCore']['Settings']['Gauge'];return _0xb22f21[_0x3eb8a5(0x100)]===_0x3eb8a5(0x1c0)?$gameSystem['numberFontFace']():$gameSystem[_0x3eb8a5(0x288)]();},Sprite_Gauge[_0x38de83(0x311)]['labelFontSize']=function(){const _0x107b15=_0x38de83,_0x42b418=VisuMZ[_0x107b15(0x228)][_0x107b15(0xfd)]['Gauge'];return _0x42b418[_0x107b15(0x100)]===_0x107b15(0x1c0)?$gameSystem[_0x107b15(0x235)]()-0x6:$gameSystem[_0x107b15(0x235)]()-0x2;},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x230)]=function(){const _0x5389e2=_0x38de83,_0x30d744=VisuMZ[_0x5389e2(0x228)]['Settings'][_0x5389e2(0x23a)];return _0x30d744[_0x5389e2(0x9b)]===_0x5389e2(0x1c0)?$gameSystem[_0x5389e2(0x170)]():$gameSystem[_0x5389e2(0x288)]();},Sprite_Gauge[_0x38de83(0x311)]['valueFontSize']=function(){const _0x3c3a9c=_0x38de83,_0xb9c141=VisuMZ[_0x3c3a9c(0x228)][_0x3c3a9c(0xfd)][_0x3c3a9c(0x23a)];return _0xb9c141[_0x3c3a9c(0x9b)]===_0x3c3a9c(0x1c0)?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x3c3a9c(0x235)]()-0x2;},Sprite_Gauge['prototype']['labelColor']=function(){const _0xd553ad=_0x38de83,_0x17afc2=VisuMZ['SkillsStatesCore'][_0xd553ad(0xfd)]['Gauge'];if(_0x17afc2[_0xd553ad(0x7f)]){if(_0x17afc2[_0xd553ad(0x148)]===0x1)return this[_0xd553ad(0x2ce)]();else{if(_0x17afc2[_0xd553ad(0x148)]===0x2)return this[_0xd553ad(0x11d)]();}}const _0xb21acd=_0x17afc2[_0xd553ad(0x171)];return ColorManager[_0xd553ad(0x7e)](_0xb21acd);},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x210)]=function(){const _0xf3448d=_0x38de83,_0x579c3e=VisuMZ[_0xf3448d(0x228)][_0xf3448d(0xfd)][_0xf3448d(0x23a)];if(this['labelOutlineWidth']()<=0x0)return _0xf3448d(0x300);else return _0x579c3e[_0xf3448d(0x2a3)]?'rgba(0,\x200,\x200,\x201)':ColorManager['outlineColor']();},Sprite_Gauge['prototype'][_0x38de83(0x132)]=function(){const _0x4d80d8=_0x38de83;return VisuMZ[_0x4d80d8(0x228)]['Settings']['Gauge'][_0x4d80d8(0x178)]||0x0;},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x1c7)]=function(){const _0x10a474=_0x38de83,_0xd4b88b=VisuMZ[_0x10a474(0x228)][_0x10a474(0xfd)]['Gauge'];if(this[_0x10a474(0x162)]()<=0x0)return _0x10a474(0x300);else return _0xd4b88b['ValueOutlineSolid']?_0x10a474(0x1d4):ColorManager[_0x10a474(0xff)]();},Sprite_Gauge[_0x38de83(0x311)][_0x38de83(0x162)]=function(){const _0x43ef98=_0x38de83;return VisuMZ[_0x43ef98(0x228)]['Settings'][_0x43ef98(0x23a)][_0x43ef98(0xfb)]||0x0;},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2d4)]=Sprite_StateIcon['prototype'][_0x38de83(0x1c6)],Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x1c6)]=function(){const _0x4abf10=_0x38de83;VisuMZ[_0x4abf10(0x228)]['Sprite_StateIcon_loadBitmap'][_0x4abf10(0x2db)](this),this[_0x4abf10(0x86)]();},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x86)]=function(){const _0xe8c677=_0x38de83,_0x1a8203=Window_Base[_0xe8c677(0x311)]['lineHeight']();this[_0xe8c677(0xa4)]=new Sprite(),this[_0xe8c677(0xa4)][_0xe8c677(0x90)]=new Bitmap(ImageManager[_0xe8c677(0x124)],_0x1a8203),this['_turnDisplaySprite'][_0xe8c677(0x1d7)]['x']=this[_0xe8c677(0x1d7)]['x'],this[_0xe8c677(0xa4)][_0xe8c677(0x1d7)]['y']=this[_0xe8c677(0x1d7)]['y'],this['addChild'](this[_0xe8c677(0xa4)]),this['contents']=this['_turnDisplaySprite']['bitmap'];},VisuMZ[_0x38de83(0x228)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x256)],Sprite_StateIcon[_0x38de83(0x311)]['updateFrame']=function(){const _0x168649=_0x38de83;VisuMZ[_0x168649(0x228)][_0x168649(0x2e4)][_0x168649(0x2db)](this),this[_0x168649(0x78)]();},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x15b)]=function(_0x405c16,_0x584176,_0x4c9eaa,_0x12157d,_0x5e7d96){const _0xbf4119=_0x38de83;this['contents'][_0xbf4119(0x15b)](_0x405c16,_0x584176,_0x4c9eaa,_0x12157d,this[_0xbf4119(0x209)][_0xbf4119(0x29d)],_0x5e7d96);},Sprite_StateIcon[_0x38de83(0x311)]['updateTurnDisplaySprite']=function(){const _0x31cf3d=_0x38de83;this['resetFontSettings'](),this[_0x31cf3d(0x209)][_0x31cf3d(0xc2)]();const _0x428879=this[_0x31cf3d(0x17a)];if(!_0x428879)return;const _0x4e1e71=_0x428879[_0x31cf3d(0x28f)]()[_0x31cf3d(0x19a)](_0x53aa06=>_0x53aa06[_0x31cf3d(0xea)]>0x0),_0x5bc42c=[...Array(0x8)['keys']()]['filter'](_0x2f1db5=>_0x428879['buff'](_0x2f1db5)!==0x0),_0x903f14=this[_0x31cf3d(0x1dd)],_0x26aab4=_0x4e1e71[_0x903f14];if(_0x26aab4)Window_Base['prototype'][_0x31cf3d(0x1ee)][_0x31cf3d(0x2db)](this,_0x428879,_0x26aab4,0x0,0x0),Window_Base['prototype'][_0x31cf3d(0x2f6)][_0x31cf3d(0x2db)](this,_0x428879,_0x26aab4,0x0,0x0);else{const _0x355ebf=_0x5bc42c[_0x903f14-_0x4e1e71[_0x31cf3d(0x150)]];if(_0x355ebf===undefined)return;Window_Base[_0x31cf3d(0x311)][_0x31cf3d(0x1b5)][_0x31cf3d(0x2db)](this,_0x428879,_0x355ebf,0x0,0x0),Window_Base[_0x31cf3d(0x311)][_0x31cf3d(0xa3)]['call'](this,_0x428879,_0x355ebf,0x0,0x0);}},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x94)]=function(){const _0x134ab6=_0x38de83;this[_0x134ab6(0x209)]['fontFace']=$gameSystem[_0x134ab6(0x288)](),this[_0x134ab6(0x209)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x134ab6(0x183)]();},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x183)]=function(){const _0x25d985=_0x38de83;this[_0x25d985(0xca)](ColorManager['normalColor']()),this[_0x25d985(0x144)](ColorManager[_0x25d985(0xff)]());},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0xca)]=function(_0x492de8){const _0x55a576=_0x38de83;this[_0x55a576(0x209)][_0x55a576(0x138)]=_0x492de8;},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0x144)]=function(_0x29297f){const _0x34e6db=_0x38de83;this[_0x34e6db(0x209)][_0x34e6db(0xff)]=_0x29297f;},Sprite_StateIcon[_0x38de83(0x311)][_0x38de83(0xdc)]=function(){const _0x4ed167=_0x38de83;this[_0x4ed167(0x2fd)]=!![],this[_0x4ed167(0x23e)]();},Window_Base[_0x38de83(0x311)][_0x38de83(0x1e9)]=function(_0x3c0927,_0x4887b1,_0x5b23f7,_0x244bd6,_0x3212ec){const _0x3ee2f8=_0x38de83,_0x2b49f3=this[_0x3ee2f8(0x23d)](_0x3c0927,_0x4887b1),_0x2d0bf3=this['textSizeEx'](_0x2b49f3,_0x5b23f7,_0x244bd6,_0x3212ec),_0x11f846=_0x5b23f7+_0x3212ec-_0x2d0bf3[_0x3ee2f8(0x1f7)];this['drawTextEx'](_0x2b49f3,_0x11f846,_0x244bd6,_0x3212ec),this[_0x3ee2f8(0x94)]();},Window_Base[_0x38de83(0x311)]['createAllSkillCostText']=function(_0x28fc24,_0x17680b){const _0xb49c1a=_0x38de83;let _0x2e5b38='';for(settings of VisuMZ[_0xb49c1a(0x228)][_0xb49c1a(0xfd)][_0xb49c1a(0x29e)]){if(!this[_0xb49c1a(0x1b0)](_0x28fc24,_0x17680b,settings))continue;if(_0x2e5b38[_0xb49c1a(0x150)]>0x0)_0x2e5b38+=this['skillCostSeparator']();_0x2e5b38+=this[_0xb49c1a(0x10e)](_0x28fc24,_0x17680b,settings);}_0x2e5b38=this['makeAdditionalSkillCostText'](_0x28fc24,_0x17680b,_0x2e5b38);if(_0x17680b['note'][_0xb49c1a(0x201)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x2e5b38[_0xb49c1a(0x150)]>0x0)_0x2e5b38+=this[_0xb49c1a(0xbe)]();_0x2e5b38+=String(RegExp['$1']);}return _0x2e5b38;},Window_Base[_0x38de83(0x311)][_0x38de83(0xc7)]=function(_0x502982,_0x39136b,_0x3ecac4){return _0x3ecac4;},Window_Base[_0x38de83(0x311)][_0x38de83(0x1b0)]=function(_0x4a15f4,_0x56ded6,_0x124a1f){let _0x5cf767=_0x124a1f['CalcJS']['call'](_0x4a15f4,_0x56ded6);return _0x5cf767=_0x4a15f4['adjustSkillCost'](_0x56ded6,_0x5cf767,_0x124a1f),_0x124a1f['ShowJS']['call'](_0x4a15f4,_0x56ded6,_0x5cf767,_0x124a1f);},Window_Base['prototype']['createSkillCostText']=function(_0x33848d,_0x3eea40,_0x2e07aa){const _0x685cf=_0x38de83;let _0x2bd658=_0x2e07aa[_0x685cf(0x207)][_0x685cf(0x2db)](_0x33848d,_0x3eea40);return _0x2bd658=_0x33848d['adjustSkillCost'](_0x3eea40,_0x2bd658,_0x2e07aa),_0x2e07aa[_0x685cf(0x149)][_0x685cf(0x2db)](_0x33848d,_0x3eea40,_0x2bd658,_0x2e07aa);},Window_Base[_0x38de83(0x311)][_0x38de83(0xbe)]=function(){return'\x20';},Window_Base[_0x38de83(0x311)][_0x38de83(0x127)]=function(_0x549e74,_0x403d29,_0x34e997,_0x1666b4){const _0x1232db=_0x38de83;if(!_0x549e74)return;VisuMZ[_0x1232db(0x228)][_0x1232db(0x147)]['call'](this,_0x549e74,_0x403d29,_0x34e997,_0x1666b4),this[_0x1232db(0xc1)](_0x549e74,_0x403d29,_0x34e997,_0x1666b4);},Window_Base[_0x38de83(0x311)][_0x38de83(0xc1)]=function(_0x4d8a38,_0x2e63b0,_0x44d390,_0x3736b4){const _0x22db99=_0x38de83;_0x3736b4=_0x3736b4||0x90;const _0xc749da=ImageManager[_0x22db99(0x124)],_0x44199a=_0x4d8a38[_0x22db99(0x1e5)]()[_0x22db99(0x22c)](0x0,Math[_0x22db99(0x1b9)](_0x3736b4/_0xc749da)),_0x2f3b3d=_0x4d8a38[_0x22db99(0x28f)]()[_0x22db99(0x19a)](_0xe38b65=>_0xe38b65[_0x22db99(0xea)]>0x0),_0x500f40=[...Array(0x8)[_0x22db99(0x180)]()][_0x22db99(0x19a)](_0x2720f6=>_0x4d8a38[_0x22db99(0x18c)](_0x2720f6)!==0x0),_0x272cfb=[];let _0xea4ac4=_0x2e63b0;for(let _0x355398=0x0;_0x355398<_0x44199a[_0x22db99(0x150)];_0x355398++){this[_0x22db99(0x94)]();const _0x1b48b0=_0x2f3b3d[_0x355398];if(_0x1b48b0)!_0x272cfb['includes'](_0x1b48b0)&&this[_0x22db99(0x1ee)](_0x4d8a38,_0x1b48b0,_0xea4ac4,_0x44d390),this['drawActorStateData'](_0x4d8a38,_0x1b48b0,_0xea4ac4,_0x44d390),_0x272cfb[_0x22db99(0x1f8)](_0x1b48b0);else{const _0x436623=_0x500f40[_0x355398-_0x2f3b3d[_0x22db99(0x150)]];this[_0x22db99(0x1b5)](_0x4d8a38,_0x436623,_0xea4ac4,_0x44d390),this[_0x22db99(0xa3)](_0x4d8a38,_0x436623,_0xea4ac4,_0x44d390);}_0xea4ac4+=_0xc749da;}},Window_Base['prototype'][_0x38de83(0x1ee)]=function(_0x4b4a21,_0x4145a2,_0x4749d7,_0x173c6d){const _0x215959=_0x38de83;if(!VisuMZ['SkillsStatesCore']['Settings']['States'][_0x215959(0x2ae)])return;if(!_0x4b4a21['isStateAffected'](_0x4145a2['id']))return;if(_0x4145a2[_0x215959(0x1d9)]===0x0)return;if(_0x4145a2['note'][_0x215959(0x201)](/<HIDE STATE TURNS>/i))return;const _0x16c3d2=_0x4b4a21['stateTurns'](_0x4145a2['id']),_0x57e4b2=ImageManager[_0x215959(0x124)],_0xd3c5f4=ColorManager['stateColor'](_0x4145a2);this[_0x215959(0xca)](_0xd3c5f4),this[_0x215959(0x144)](_0x215959(0x1d4)),this[_0x215959(0x209)][_0x215959(0x31f)]=!![],this[_0x215959(0x209)][_0x215959(0x1e1)]=VisuMZ['SkillsStatesCore'][_0x215959(0xfd)][_0x215959(0x20c)][_0x215959(0x242)],_0x4749d7+=VisuMZ[_0x215959(0x228)]['Settings'][_0x215959(0x20c)][_0x215959(0x2ab)],_0x173c6d+=VisuMZ[_0x215959(0x228)][_0x215959(0xfd)][_0x215959(0x20c)][_0x215959(0x9e)],this[_0x215959(0x15b)](_0x16c3d2,_0x4749d7,_0x173c6d,_0x57e4b2,_0x215959(0x97)),this[_0x215959(0x209)][_0x215959(0x31f)]=![],this[_0x215959(0x94)]();},Window_Base[_0x38de83(0x311)][_0x38de83(0x2f6)]=function(_0x529211,_0xbab15e,_0x2adb2d,_0x2e5a03){const _0x21dddc=_0x38de83;if(!VisuMZ[_0x21dddc(0x228)]['Settings'][_0x21dddc(0x20c)][_0x21dddc(0x154)])return;const _0xee0a38=ImageManager['iconWidth'],_0x5526fe=ImageManager[_0x21dddc(0x225)]/0x2,_0x471133=ColorManager[_0x21dddc(0xe0)]();this['changeTextColor'](_0x471133),this[_0x21dddc(0x144)](_0x21dddc(0x1d4)),this['contents']['fontBold']=!![],this['contents'][_0x21dddc(0x1e1)]=VisuMZ[_0x21dddc(0x228)]['Settings']['States'][_0x21dddc(0x25d)],_0x2adb2d+=VisuMZ[_0x21dddc(0x228)]['Settings']['States'][_0x21dddc(0x1f5)],_0x2e5a03+=VisuMZ[_0x21dddc(0x228)][_0x21dddc(0xfd)][_0x21dddc(0x20c)][_0x21dddc(0xf8)];const _0x5e7a46=String(_0x529211[_0x21dddc(0x2ac)](_0xbab15e['id']));this[_0x21dddc(0x15b)](_0x5e7a46,_0x2adb2d,_0x2e5a03,_0xee0a38,_0x21dddc(0x14c)),this[_0x21dddc(0x209)][_0x21dddc(0x31f)]=![],this[_0x21dddc(0x94)]();},Window_Base[_0x38de83(0x311)][_0x38de83(0x1b5)]=function(_0x2f419f,_0x5bdbe3,_0x52e51d,_0x56148a){const _0x54813b=_0x38de83;if(!VisuMZ[_0x54813b(0x228)][_0x54813b(0xfd)][_0x54813b(0x8f)]['ShowTurns'])return;const _0x54b438=_0x2f419f[_0x54813b(0x18c)](_0x5bdbe3);if(_0x54b438===0x0)return;const _0x4ee410=_0x2f419f['buffTurns'](_0x5bdbe3),_0x3b7b64=ImageManager[_0x54813b(0x124)],_0x2fdc96=_0x54b438>0x0?ColorManager[_0x54813b(0xf2)]():ColorManager['debuffColor']();this[_0x54813b(0xca)](_0x2fdc96),this[_0x54813b(0x144)](_0x54813b(0x1d4)),this[_0x54813b(0x209)]['fontBold']=!![],this['contents'][_0x54813b(0x1e1)]=VisuMZ[_0x54813b(0x228)]['Settings'][_0x54813b(0x8f)][_0x54813b(0x242)],_0x52e51d+=VisuMZ[_0x54813b(0x228)][_0x54813b(0xfd)][_0x54813b(0x8f)]['TurnOffsetX'],_0x56148a+=VisuMZ['SkillsStatesCore'][_0x54813b(0xfd)][_0x54813b(0x8f)][_0x54813b(0x9e)],this[_0x54813b(0x15b)](_0x4ee410,_0x52e51d,_0x56148a,_0x3b7b64,_0x54813b(0x97)),this['contents'][_0x54813b(0x31f)]=![],this[_0x54813b(0x94)]();},Window_Base['prototype'][_0x38de83(0xa3)]=function(_0x4c3574,_0x5673fc,_0x520bbb,_0x3e3ade){const _0x323fc0=_0x38de83;if(!VisuMZ['SkillsStatesCore']['Settings']['Buffs']['ShowData'])return;const _0x2b76b3=_0x4c3574[_0x323fc0(0x84)](_0x5673fc),_0x2829e0=_0x4c3574[_0x323fc0(0x18c)](_0x5673fc),_0x4a6ffd=ImageManager[_0x323fc0(0x124)],_0x1dd1c2=ImageManager['iconHeight']/0x2,_0x16c16a=_0x2829e0>0x0?ColorManager['buffColor']():ColorManager[_0x323fc0(0xed)]();this[_0x323fc0(0xca)](_0x16c16a),this[_0x323fc0(0x144)]('rgba(0,\x200,\x200,\x201)'),this[_0x323fc0(0x209)][_0x323fc0(0x31f)]=!![],this[_0x323fc0(0x209)][_0x323fc0(0x1e1)]=VisuMZ[_0x323fc0(0x228)][_0x323fc0(0xfd)][_0x323fc0(0x8f)][_0x323fc0(0x25d)],_0x520bbb+=VisuMZ[_0x323fc0(0x228)]['Settings'][_0x323fc0(0x8f)]['DataOffsetX'],_0x3e3ade+=VisuMZ[_0x323fc0(0x228)][_0x323fc0(0xfd)][_0x323fc0(0x8f)][_0x323fc0(0xf8)];const _0x1b2d36=_0x323fc0(0x174)['format'](Math[_0x323fc0(0x1d8)](_0x2b76b3*0x64));this[_0x323fc0(0x15b)](_0x1b2d36,_0x520bbb,_0x3e3ade,_0x4a6ffd,_0x323fc0(0x14c)),this[_0x323fc0(0x209)][_0x323fc0(0x31f)]=![],this[_0x323fc0(0x94)]();},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2cb)]=Window_StatusBase['prototype'][_0x38de83(0x91)],Window_StatusBase[_0x38de83(0x311)][_0x38de83(0x91)]=function(_0x3865f7,_0x3ce5aa,_0x440bf3,_0x117a2d){const _0x232953=_0x38de83;if(_0x3865f7[_0x232953(0x197)]())_0x3ce5aa=this[_0x232953(0xe6)](_0x3865f7,_0x3ce5aa);this[_0x232953(0x2b2)](_0x3865f7,_0x3ce5aa,_0x440bf3,_0x117a2d);},Window_StatusBase[_0x38de83(0x311)][_0x38de83(0x2b2)]=function(_0x284566,_0x277df5,_0x3ace8c,_0x2f434a){const _0x52a23e=_0x38de83;if([_0x52a23e(0x2e2),'untitled'][_0x52a23e(0x310)](_0x277df5[_0x52a23e(0x212)]()))return;VisuMZ[_0x52a23e(0x228)][_0x52a23e(0x2cb)][_0x52a23e(0x2db)](this,_0x284566,_0x277df5,_0x3ace8c,_0x2f434a);},Window_StatusBase[_0x38de83(0x311)][_0x38de83(0xe6)]=function(_0x11c32c,_0x3817c2){const _0x51c7c0=_0x38de83,_0x3a2ae7=_0x11c32c['currentClass']()[_0x51c7c0(0x1af)];if(_0x3817c2==='hp'&&_0x3a2ae7[_0x51c7c0(0x201)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3817c2==='mp'&&_0x3a2ae7[_0x51c7c0(0x201)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x3817c2==='tp'&&_0x3a2ae7['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x3817c2;}},VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons']=Window_StatusBase['prototype'][_0x38de83(0x127)],Window_StatusBase[_0x38de83(0x311)][_0x38de83(0x127)]=function(_0x4a141a,_0x55b3e0,_0x47b82b,_0x5fdfdb){const _0xde2030=_0x38de83;if(!_0x4a141a)return;Window_Base[_0xde2030(0x311)][_0xde2030(0x127)]['call'](this,_0x4a141a,_0x55b3e0,_0x47b82b,_0x5fdfdb);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x297)]=Window_SkillType[_0x38de83(0x311)][_0x38de83(0x18b)],Window_SkillType['prototype']['initialize']=function(_0x5490a7){const _0x5f4787=_0x38de83;VisuMZ[_0x5f4787(0x228)]['Window_SkillType_initialize']['call'](this,_0x5490a7),this[_0x5f4787(0x1ec)](_0x5490a7);},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x1ec)]=function(_0x42cca4){const _0x1672b0=_0x38de83,_0x113020=new Rectangle(0x0,0x0,_0x42cca4['width'],_0x42cca4['height']);this[_0x1672b0(0x2f1)]=new Window_Base(_0x113020),this[_0x1672b0(0x2f1)]['opacity']=0x0,this[_0x1672b0(0x123)](this[_0x1672b0(0x2f1)]),this[_0x1672b0(0x77)]();},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x157)]=function(){const _0x2ae08b=_0x38de83;Window_Command['prototype'][_0x2ae08b(0x157)][_0x2ae08b(0x2db)](this);if(this[_0x2ae08b(0x2f1)])this[_0x2ae08b(0x77)]();},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x77)]=function(){const _0xc6f7e5=_0x38de83,_0x3bd9fd=this[_0xc6f7e5(0x2f1)];_0x3bd9fd[_0xc6f7e5(0x209)][_0xc6f7e5(0xc2)]();const _0x428558=this['commandStyleCheck'](this[_0xc6f7e5(0x2cd)]());if(_0x428558===_0xc6f7e5(0xf1)&&this[_0xc6f7e5(0x325)]()>0x0){const _0x50efbe=this[_0xc6f7e5(0x188)](this[_0xc6f7e5(0x2cd)]());let _0x26b541=this[_0xc6f7e5(0x20d)](this['index']());_0x26b541=_0x26b541['replace'](/\\I\[(\d+)\]/gi,''),_0x3bd9fd[_0xc6f7e5(0x94)](),this[_0xc6f7e5(0x1a0)](_0x26b541,_0x50efbe),this['commandNameWindowDrawText'](_0x26b541,_0x50efbe),this['commandNameWindowCenter'](_0x26b541,_0x50efbe);}},Window_SkillType['prototype'][_0x38de83(0x1a0)]=function(_0x5196b2,_0x2df71d){},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x272)]=function(_0x587f05,_0x156435){const _0x56c67e=_0x38de83,_0x54fe55=this[_0x56c67e(0x2f1)];_0x54fe55[_0x56c67e(0x15b)](_0x587f05,0x0,_0x156435['y'],_0x54fe55[_0x56c67e(0xb9)],_0x56c67e(0x14c));},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x82)]=function(_0x4f6564,_0x2274f6){const _0x2e105b=_0x38de83,_0x424d9d=this[_0x2e105b(0x2f1)],_0x3bdb85=$gameSystem[_0x2e105b(0x274)](),_0x2260b1=_0x2274f6['x']+Math[_0x2e105b(0x1b9)](_0x2274f6[_0x2e105b(0x1f7)]/0x2)+_0x3bdb85;_0x424d9d['x']=_0x424d9d[_0x2e105b(0x1f7)]/-0x2+_0x2260b1,_0x424d9d['y']=Math['floor'](_0x2274f6[_0x2e105b(0x29d)]/0x2);},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x2be)]=function(){const _0x4d57d4=_0x38de83;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x4d57d4(0x311)][_0x4d57d4(0x2be)]['call'](this);},Window_SkillType[_0x38de83(0x311)]['makeCommandList']=function(){const _0x5c0047=_0x38de83;if(!this[_0x5c0047(0x26b)])return;const _0x232497=this[_0x5c0047(0x26b)]['skillTypes']();for(const _0x27bf44 of _0x232497){const _0x46161c=this[_0x5c0047(0x26a)](_0x27bf44);this[_0x5c0047(0x204)](_0x46161c,_0x5c0047(0x287),!![],_0x27bf44);}},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x26a)]=function(_0x387450){const _0x13bb2e=_0x38de83;let _0x3f4087=$dataSystem['skillTypes'][_0x387450];if(_0x3f4087[_0x13bb2e(0x201)](/\\I\[(\d+)\]/i))return _0x3f4087;if(this['commandStyle']()===_0x13bb2e(0xfe))return _0x3f4087;const _0x23a244=VisuMZ['SkillsStatesCore'][_0x13bb2e(0xfd)]['Skills'],_0x8ee2c3=$dataSystem['magicSkills'][_0x13bb2e(0x310)](_0x387450),_0xee132a=_0x8ee2c3?_0x23a244[_0x13bb2e(0x10b)]:_0x23a244[_0x13bb2e(0x17f)];return _0x13bb2e(0x323)[_0x13bb2e(0x1e6)](_0xee132a,_0x3f4087);},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x2e5)]=function(){const _0xd7083c=_0x38de83;return VisuMZ[_0xd7083c(0x228)][_0xd7083c(0xfd)]['Skills']['CmdTextAlign'];},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x280)]=function(_0x3e0d2a){const _0x33841c=_0x38de83,_0x30020b=this[_0x33841c(0x241)](_0x3e0d2a);if(_0x30020b===_0x33841c(0x155))this['drawItemStyleIconText'](_0x3e0d2a);else _0x30020b===_0x33841c(0xf1)?this[_0x33841c(0x203)](_0x3e0d2a):Window_Command[_0x33841c(0x311)][_0x33841c(0x280)]['call'](this,_0x3e0d2a);},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x107)]=function(){const _0xecd91d=_0x38de83;return VisuMZ[_0xecd91d(0x228)]['Settings'][_0xecd91d(0x2c3)][_0xecd91d(0x73)];},Window_SkillType['prototype'][_0x38de83(0x241)]=function(_0x2ca6d1){const _0x2d0e93=_0x38de83;if(_0x2ca6d1<0x0)return'text';const _0x44a118=this['commandStyle']();if(_0x44a118!==_0x2d0e93(0x24f))return _0x44a118;else{if(this[_0x2d0e93(0x325)]()>0x0){const _0x1ccc2f=this['commandName'](_0x2ca6d1);if(_0x1ccc2f['match'](/\\I\[(\d+)\]/i)){const _0x24632d=this[_0x2d0e93(0x188)](_0x2ca6d1),_0x554ef3=this['textSizeEx'](_0x1ccc2f)[_0x2d0e93(0x1f7)];return _0x554ef3<=_0x24632d[_0x2d0e93(0x1f7)]?_0x2d0e93(0x155):_0x2d0e93(0xf1);}}}return _0x2d0e93(0xfe);},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x266)]=function(_0x453bb2){const _0x1a42d8=_0x38de83,_0x299571=this[_0x1a42d8(0x188)](_0x453bb2),_0x249491=this[_0x1a42d8(0x20d)](_0x453bb2),_0x3197a0=this[_0x1a42d8(0x8a)](_0x249491)[_0x1a42d8(0x1f7)];this[_0x1a42d8(0x289)](this[_0x1a42d8(0xdf)](_0x453bb2));const _0x1ebf44=this[_0x1a42d8(0x2e5)]();if(_0x1ebf44==='right')this[_0x1a42d8(0x29f)](_0x249491,_0x299571['x']+_0x299571[_0x1a42d8(0x1f7)]-_0x3197a0,_0x299571['y'],_0x3197a0);else{if(_0x1ebf44===_0x1a42d8(0x14c)){const _0x56a246=_0x299571['x']+Math['floor']((_0x299571[_0x1a42d8(0x1f7)]-_0x3197a0)/0x2);this[_0x1a42d8(0x29f)](_0x249491,_0x56a246,_0x299571['y'],_0x3197a0);}else this[_0x1a42d8(0x29f)](_0x249491,_0x299571['x'],_0x299571['y'],_0x3197a0);}},Window_SkillType[_0x38de83(0x311)][_0x38de83(0x203)]=function(_0x5d7d5b){const _0x44fb15=_0x38de83;this[_0x44fb15(0x20d)](_0x5d7d5b)[_0x44fb15(0x201)](/\\I\[(\d+)\]/i);const _0x1b7d12=Number(RegExp['$1'])||0x0,_0x5647f4=this[_0x44fb15(0x188)](_0x5d7d5b),_0x3ea16a=_0x5647f4['x']+Math['floor']((_0x5647f4[_0x44fb15(0x1f7)]-ImageManager['iconWidth'])/0x2),_0xcb7bd2=_0x5647f4['y']+(_0x5647f4[_0x44fb15(0x29d)]-ImageManager[_0x44fb15(0x225)])/0x2;this[_0x44fb15(0x1a6)](_0x1b7d12,_0x3ea16a,_0xcb7bd2);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x26c)]=Window_SkillStatus['prototype']['refresh'],Window_SkillStatus[_0x38de83(0x311)][_0x38de83(0xb3)]=function(){const _0x2dc25a=_0x38de83;VisuMZ[_0x2dc25a(0x228)][_0x2dc25a(0x26c)][_0x2dc25a(0x2db)](this);if(this[_0x2dc25a(0x26b)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus['prototype'][_0x38de83(0x305)]=function(){const _0xb91088=_0x38de83;if(!Imported[_0xb91088(0x1ce)])return;if(!Imported[_0xb91088(0x31b)])return;const _0x2529d7=this[_0xb91088(0xf3)]();let _0x222f14=this[_0xb91088(0x74)]()/0x2+0xb4+0xb4+0xb4,_0xa7adb8=this[_0xb91088(0xb9)]-_0x222f14-0x2;if(_0xa7adb8>=0x12c){const _0x1fe5e0=VisuMZ[_0xb91088(0xd1)]['Settings']['Param'][_0xb91088(0x1a5)],_0x1386db=Math[_0xb91088(0x1b9)](_0xa7adb8/0x2)-0x18;let _0x36292d=_0x222f14,_0x35a8c0=Math[_0xb91088(0x1b9)]((this['innerHeight']-Math[_0xb91088(0x2b5)](_0x1fe5e0[_0xb91088(0x150)]/0x2)*_0x2529d7)/0x2),_0x4b6870=0x0;for(const _0x22a2b8 of _0x1fe5e0){this[_0xb91088(0x302)](_0x36292d,_0x35a8c0,_0x1386db,_0x22a2b8),_0x4b6870++,_0x4b6870%0x2===0x0?(_0x36292d=_0x222f14,_0x35a8c0+=_0x2529d7):_0x36292d+=_0x1386db+0x18;}}this[_0xb91088(0x94)]();},Window_SkillStatus[_0x38de83(0x311)][_0x38de83(0x302)]=function(_0x1eb1b6,_0x54aa31,_0x51413d,_0x1b2537){const _0x4adfbb=_0x38de83,_0x364ab9=this[_0x4adfbb(0xf3)]();this[_0x4adfbb(0x94)](),this['drawParamText'](_0x1eb1b6,_0x54aa31,_0x51413d,_0x1b2537,!![]),this[_0x4adfbb(0x183)](),this['contents']['fontSize']-=0x8;const _0x2fe471=this[_0x4adfbb(0x26b)][_0x4adfbb(0x16d)](_0x1b2537,!![]);this[_0x4adfbb(0x209)]['drawText'](_0x2fe471,_0x1eb1b6,_0x54aa31,_0x51413d,_0x364ab9,_0x4adfbb(0x97));},VisuMZ['SkillsStatesCore'][_0x38de83(0x1e4)]=Window_SkillList['prototype'][_0x38de83(0x310)],Window_SkillList[_0x38de83(0x311)]['includes']=function(_0x680262){return this['includesSkillsStatesCore'](_0x680262);},VisuMZ[_0x38de83(0x228)][_0x38de83(0x111)]=Window_SkillList[_0x38de83(0x311)]['maxCols'],Window_SkillList[_0x38de83(0x311)]['maxCols']=function(){const _0x173e2a=_0x38de83;return SceneManager[_0x173e2a(0x1ba)]['constructor']===Scene_Battle?VisuMZ[_0x173e2a(0x228)][_0x173e2a(0x111)][_0x173e2a(0x2db)](this):VisuMZ['SkillsStatesCore']['Settings'][_0x173e2a(0x2c3)][_0x173e2a(0x199)];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2fc)]=Window_SkillList['prototype'][_0x38de83(0x243)],Window_SkillList[_0x38de83(0x311)][_0x38de83(0x243)]=function(_0x9024aa){const _0x512509=_0x38de83,_0x13baad=this[_0x512509(0x26b)]!==_0x9024aa;VisuMZ[_0x512509(0x228)][_0x512509(0x2fc)]['call'](this,_0x9024aa),_0x13baad&&(this[_0x512509(0x313)]&&this[_0x512509(0x313)][_0x512509(0x12f)]===Window_ShopStatus&&this[_0x512509(0x313)]['setItem'](this[_0x512509(0xbf)](0x0)));},Window_SkillList['prototype']['setStypeId']=function(_0x4331f5){const _0x4d36e2=_0x38de83;if(this[_0x4d36e2(0x15a)]===_0x4331f5)return;this['_stypeId']=_0x4331f5,this[_0x4d36e2(0xb3)](),this[_0x4d36e2(0x277)](0x0,0x0),this[_0x4d36e2(0x313)]&&this[_0x4d36e2(0x313)][_0x4d36e2(0x12f)]===Window_ShopStatus&&this[_0x4d36e2(0x313)][_0x4d36e2(0x13b)](this['itemAt'](0x0));},Window_SkillList[_0x38de83(0x311)][_0x38de83(0xe4)]=function(_0xa95eb5){const _0x539f66=_0x38de83;if(!_0xa95eb5)return VisuMZ['SkillsStatesCore'][_0x539f66(0x1e4)][_0x539f66(0x2db)](this,_0xa95eb5);if(!this[_0x539f66(0x2a1)](_0xa95eb5))return![];if(!this['checkShowHideNotetags'](_0xa95eb5))return![];if(!this[_0x539f66(0x2b6)](_0xa95eb5))return![];return!![];},Window_SkillList[_0x38de83(0x311)][_0x38de83(0x2a1)]=function(_0x259a72){const _0x837585=_0x38de83;return DataManager['getSkillTypes'](_0x259a72)['includes'](this[_0x837585(0x15a)]);},Window_SkillList[_0x38de83(0x311)][_0x38de83(0x17d)]=function(_0xf741c){const _0x28ff80=_0x38de83;if(!VisuMZ['SkillsStatesCore'][_0x28ff80(0xe9)](this[_0x28ff80(0x26b)],_0xf741c))return![];if(!VisuMZ[_0x28ff80(0x228)][_0x28ff80(0x16f)](this[_0x28ff80(0x26b)],_0xf741c))return![];if(!VisuMZ[_0x28ff80(0x228)][_0x28ff80(0x2fa)](this[_0x28ff80(0x26b)],_0xf741c))return![];return!![];},VisuMZ['SkillsStatesCore']['CheckVisibleBattleNotetags']=function(_0x5072af,_0x1778e3){const _0x5468cf=_0x38de83,_0x5dc385=_0x1778e3['note'];if(_0x5dc385[_0x5468cf(0x201)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x5468cf(0x110)]())return![];else return _0x5dc385[_0x5468cf(0x201)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ[_0x38de83(0x228)]['CheckVisibleSwitchNotetags']=function(_0x9a25a0,_0x5a7642){const _0x2a258e=_0x38de83,_0x348de4=_0x5a7642[_0x2a258e(0x1af)];if(_0x348de4[_0x2a258e(0x201)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5dac14=JSON['parse']('['+RegExp['$1'][_0x2a258e(0x201)](/\d+/g)+']');for(const _0x171d51 of _0x5dac14){if(!$gameSwitches[_0x2a258e(0xd4)](_0x171d51))return![];}return!![];}if(_0x348de4[_0x2a258e(0x201)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a8cdd=JSON[_0x2a258e(0x1ed)]('['+RegExp['$1'][_0x2a258e(0x201)](/\d+/g)+']');for(const _0x56f3ce of _0x1a8cdd){if(!$gameSwitches[_0x2a258e(0xd4)](_0x56f3ce))return![];}return!![];}if(_0x348de4['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x42ceac=JSON[_0x2a258e(0x1ed)]('['+RegExp['$1'][_0x2a258e(0x201)](/\d+/g)+']');for(const _0x40cbbe of _0x42ceac){if($gameSwitches[_0x2a258e(0xd4)](_0x40cbbe))return!![];}return![];}if(_0x348de4[_0x2a258e(0x201)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43a703=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x315a31 of _0x43a703){if(!$gameSwitches[_0x2a258e(0xd4)](_0x315a31))return!![];}return![];}if(_0x348de4[_0x2a258e(0x201)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b8e27=JSON[_0x2a258e(0x1ed)]('['+RegExp['$1'][_0x2a258e(0x201)](/\d+/g)+']');for(const _0x31fa61 of _0x3b8e27){if(!$gameSwitches[_0x2a258e(0xd4)](_0x31fa61))return!![];}return![];}if(_0x348de4[_0x2a258e(0x201)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4194e0=JSON[_0x2a258e(0x1ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x989d50 of _0x4194e0){if($gameSwitches[_0x2a258e(0xd4)](_0x989d50))return![];}return!![];}return!![];},VisuMZ[_0x38de83(0x228)][_0x38de83(0x2fa)]=function(_0x1bbe48,_0x99f138){const _0x4c0fe7=_0x38de83,_0x511e81=_0x99f138[_0x4c0fe7(0x1af)];if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1fbfb1=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x5bf66f of _0x1fbfb1){if(!_0x1bbe48['isLearnedSkill'](_0x5bf66f))return![];}return!![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x25be10=RegExp['$1']['split'](',');for(const _0x203c43 of _0x25be10){const _0x26791c=DataManager[_0x4c0fe7(0xc8)](_0x203c43);if(!_0x26791c)continue;if(!_0x1bbe48['isLearnedSkill'](_0x26791c))return![];}return!![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ce467=JSON['parse']('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x458e63 of _0x1ce467){if(!_0x1bbe48[_0x4c0fe7(0x83)](_0x458e63))return![];}return!![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1396a8=RegExp['$1']['split'](',');for(const _0x3fefe9 of _0x1396a8){const _0x40ce13=DataManager[_0x4c0fe7(0xc8)](_0x3fefe9);if(!_0x40ce13)continue;if(!_0x1bbe48['isLearnedSkill'](_0x40ce13))return![];}return!![];}}if(_0x511e81['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4054bb=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1fac9c of _0x4054bb){if(_0x1bbe48['isLearnedSkill'](_0x1fac9c))return!![];}return![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x777ed8=RegExp['$1']['split'](',');for(const _0x27a09c of _0x777ed8){const _0x47ce61=DataManager[_0x4c0fe7(0xc8)](_0x27a09c);if(!_0x47ce61)continue;if(_0x1bbe48[_0x4c0fe7(0x83)](_0x47ce61))return!![];}return![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49f522=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x595286 of _0x49f522){if(!_0x1bbe48[_0x4c0fe7(0x83)](_0x595286))return!![];}return![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x57dc16=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x185b6a of _0x57dc16){const _0x5bf057=DataManager[_0x4c0fe7(0xc8)](_0x185b6a);if(!_0x5bf057)continue;if(!_0x1bbe48['isLearnedSkill'](_0x5bf057))return!![];}return![];}}if(_0x511e81['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x575d7c=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x5aa07c of _0x575d7c){if(!_0x1bbe48[_0x4c0fe7(0x83)](_0x5aa07c))return!![];}return![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x390090=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x33c6ff of _0x390090){const _0x25a244=DataManager[_0x4c0fe7(0xc8)](_0x33c6ff);if(!_0x25a244)continue;if(!_0x1bbe48['isLearnedSkill'](_0x25a244))return!![];}return![];}}if(_0x511e81['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfd9dec=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x215644 of _0xfd9dec){if(_0x1bbe48[_0x4c0fe7(0x83)](_0x215644))return![];}return!![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5bbdca=RegExp['$1']['split'](',');for(const _0x5a76fe of _0x5bbdca){const _0x4391a6=DataManager[_0x4c0fe7(0xc8)](_0x5a76fe);if(!_0x4391a6)continue;if(_0x1bbe48['isLearnedSkill'](_0x4391a6))return![];}return!![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x413273=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0xf6ec32 of _0x413273){if(!_0x1bbe48[_0x4c0fe7(0x253)](_0xf6ec32))return![];}return!![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x39e97d=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x3319ae of _0x39e97d){const _0x3ab7d1=DataManager[_0x4c0fe7(0xc8)](_0x3319ae);if(!_0x3ab7d1)continue;if(!_0x1bbe48[_0x4c0fe7(0x253)](_0x3ab7d1))return![];}return!![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a10d6=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x432f94 of _0x5a10d6){if(!_0x1bbe48['hasSkill'](_0x432f94))return![];}return!![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1afcd0=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x434555 of _0x1afcd0){const _0x8843a5=DataManager[_0x4c0fe7(0xc8)](_0x434555);if(!_0x8843a5)continue;if(!_0x1bbe48['hasSkill'](_0x8843a5))return![];}return!![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbcbe85=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x1e02d2 of _0xbcbe85){if(_0x1bbe48[_0x4c0fe7(0x253)](_0x1e02d2))return!![];}return![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x238d41=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x640fe1 of _0x238d41){const _0xa8d03f=DataManager['getSkillIdWithName'](_0x640fe1);if(!_0xa8d03f)continue;if(_0x1bbe48[_0x4c0fe7(0x253)](_0xa8d03f))return!![];}return![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7117df=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x554ba9 of _0x7117df){if(!_0x1bbe48['hasSkill'](_0x554ba9))return!![];}return![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xc2eaa1=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x2c767a of _0xc2eaa1){const _0x135494=DataManager['getSkillIdWithName'](_0x2c767a);if(!_0x135494)continue;if(!_0x1bbe48[_0x4c0fe7(0x253)](_0x135494))return!![];}return![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x424130=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1'][_0x4c0fe7(0x201)](/\d+/g)+']');for(const _0x84fd3a of _0x424130){if(!_0x1bbe48[_0x4c0fe7(0x253)](_0x84fd3a))return!![];}return![];}else{if(_0x511e81['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x51b996=RegExp['$1'][_0x4c0fe7(0x79)](',');for(const _0x5934ed of _0x51b996){const _0x1d9f99=DataManager[_0x4c0fe7(0xc8)](_0x5934ed);if(!_0x1d9f99)continue;if(!_0x1bbe48[_0x4c0fe7(0x253)](_0x1d9f99))return!![];}return![];}}if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x179043=JSON[_0x4c0fe7(0x1ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x204ee4 of _0x179043){if(_0x1bbe48[_0x4c0fe7(0x253)](_0x204ee4))return![];}return!![];}else{if(_0x511e81[_0x4c0fe7(0x201)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x421db9=RegExp['$1']['split'](',');for(const _0x105227 of _0x421db9){const _0xac5251=DataManager[_0x4c0fe7(0xc8)](_0x105227);if(!_0xac5251)continue;if(_0x1bbe48['hasSkill'](_0xac5251))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0x38de83(0x2b6)]=function(_0x2701f1){const _0xc7d8d4=_0x38de83,_0x553d4e=_0x2701f1[_0xc7d8d4(0x1af)],_0x543a74=VisuMZ[_0xc7d8d4(0x228)][_0xc7d8d4(0x103)];return _0x543a74[_0x2701f1['id']]?_0x543a74[_0x2701f1['id']][_0xc7d8d4(0x2db)](this,_0x2701f1):!![];},VisuMZ[_0x38de83(0x228)]['Window_SkillList_makeItemList']=Window_SkillList[_0x38de83(0x311)][_0x38de83(0x1c4)],Window_SkillList[_0x38de83(0x311)][_0x38de83(0x1c4)]=function(){const _0x2db75f=_0x38de83;VisuMZ['SkillsStatesCore'][_0x2db75f(0x12a)][_0x2db75f(0x2db)](this),this[_0x2db75f(0x158)]()&&this['sortSkillList'](),this[_0x2db75f(0x285)]()&&this[_0x2db75f(0x189)]();},Window_SkillList[_0x38de83(0x311)]['canSortSkillTypeList']=function(){return!![];},Window_SkillList[_0x38de83(0x311)][_0x38de83(0xd8)]=function(){const _0x2cf3b6=_0x38de83,_0x532dcf=VisuMZ[_0x2cf3b6(0x228)][_0x2cf3b6(0xfd)][_0x2cf3b6(0x2c3)][_0x2cf3b6(0x229)]||[];return _0x532dcf&&_0x532dcf[_0x2cf3b6(0x310)](this[_0x2cf3b6(0x15a)])?this[_0x2cf3b6(0x251)][_0x2cf3b6(0x1cf)]((_0x23866c,_0x116a04)=>{const _0x4ef495=_0x2cf3b6;if(!!_0x23866c&&!!_0x116a04)return _0x23866c[_0x4ef495(0x2d6)][_0x4ef495(0xc3)](_0x116a04['name']);return 0x0;}):VisuMZ['SkillsStatesCore'][_0x2cf3b6(0x119)](this[_0x2cf3b6(0x251)]),this[_0x2cf3b6(0x251)];},VisuMZ['SkillsStatesCore'][_0x38de83(0x119)]=function(_0x1799b2){const _0x18a7c7=_0x38de83;return _0x1799b2[_0x18a7c7(0x1cf)]((_0x1044c6,_0x349ab9)=>{const _0x5c9388=_0x18a7c7;if(!!_0x1044c6&&!!_0x349ab9){if(_0x1044c6[_0x5c9388(0x1da)]===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x1044c6);if(_0x349ab9[_0x5c9388(0x1da)]===undefined)VisuMZ[_0x5c9388(0x228)][_0x5c9388(0x318)](_0x349ab9);const _0x3511fb=_0x1044c6[_0x5c9388(0x1da)],_0x920a58=_0x349ab9[_0x5c9388(0x1da)];if(_0x3511fb!==_0x920a58)return _0x920a58-_0x3511fb;return _0x1044c6['id']-_0x349ab9['id'];}return 0x0;}),_0x1799b2;},VisuMZ[_0x38de83(0x228)][_0x38de83(0x26e)]=function(_0x3d0ba7){const _0x20664f=_0x38de83;return _0x3d0ba7[_0x20664f(0x1cf)]((_0x43ad6d,_0x3ef09b)=>{const _0x214930=_0x20664f,_0x3ab48b=$dataSkills[_0x43ad6d],_0x211529=$dataSkills[_0x3ef09b];if(!!_0x3ab48b&&!!_0x211529){if(_0x3ab48b['sortPriority']===undefined)VisuMZ[_0x214930(0x228)][_0x214930(0x318)](_0x3ab48b);if(_0x211529[_0x214930(0x1da)]===undefined)VisuMZ['SkillsStatesCore'][_0x214930(0x318)](_0x211529);const _0x5dd3c6=_0x3ab48b[_0x214930(0x1da)],_0x12204a=_0x211529[_0x214930(0x1da)];if(_0x5dd3c6!==_0x12204a)return _0x12204a-_0x5dd3c6;return _0x43ad6d-_0x3ef09b;}return 0x0;}),_0x3d0ba7;},Window_SkillList['prototype'][_0x38de83(0x285)]=function(){const _0x4f7c31=_0x38de83;if(!this[_0x4f7c31(0x26b)])return![];if(['skillLearn','equipBattleSkills',_0x4f7c31(0x2f8)][_0x4f7c31(0x310)](this[_0x4f7c31(0x15a)]))return![];return!![];},Window_SkillList[_0x38de83(0x311)]['changeSkillsThroughStateEffects']=function(){const _0x51e115=_0x38de83,_0x29c79b=this[_0x51e115(0x26b)][_0x51e115(0x28f)]();for(const _0x197cc2 of _0x29c79b){const _0x533829=DataManager['getSkillChangesFromState'](_0x197cc2);for(const _0x1a9221 in _0x533829){const _0xc1fd14=$dataSkills[Number(_0x1a9221)]||null,_0x397162=$dataSkills[Number(_0x533829[_0x1a9221])]||null;while(this[_0x51e115(0x251)]['includes'](_0xc1fd14)){const _0x36c830=this['_data'][_0x51e115(0xb7)](_0xc1fd14);this[_0x51e115(0x251)][_0x36c830]=_0x397162;}}}},VisuMZ[_0x38de83(0x228)][_0x38de83(0x175)]=Window_SkillList[_0x38de83(0x311)][_0x38de83(0x280)],Window_SkillList[_0x38de83(0x311)][_0x38de83(0x280)]=function(_0x520e7a){const _0x48d1f2=_0x38de83,_0x7a4243=this[_0x48d1f2(0xbf)](_0x520e7a),_0x3322d7=_0x7a4243?_0x7a4243['name']:'';if(_0x7a4243)this[_0x48d1f2(0x2f3)](_0x7a4243);VisuMZ[_0x48d1f2(0x228)][_0x48d1f2(0x175)][_0x48d1f2(0x2db)](this,_0x520e7a);if(_0x7a4243)_0x7a4243[_0x48d1f2(0x2d6)]=_0x3322d7;},Window_SkillList[_0x38de83(0x311)][_0x38de83(0x2f3)]=function(_0x4ebe23){const _0x2558cd=_0x38de83;if(_0x4ebe23&&_0x4ebe23[_0x2558cd(0x1af)]['match'](/<LIST NAME:[ ](.*)>/i)){_0x4ebe23[_0x2558cd(0x2d6)]=String(RegExp['$1'])['trim']();for(;;){if(_0x4ebe23[_0x2558cd(0x2d6)][_0x2558cd(0x201)](/\\V\[(\d+)\]/gi))_0x4ebe23[_0x2558cd(0x2d6)]=_0x4ebe23['name'][_0x2558cd(0x25a)](/\\V\[(\d+)\]/gi,(_0xa1989a,_0x465a83)=>$gameVariables['value'](parseInt(_0x465a83)));else break;}}},Window_SkillList[_0x38de83(0x311)][_0x38de83(0x1e9)]=function(_0x29e246,_0x34784a,_0x410a4f,_0x244510){const _0x4ae06a=_0x38de83;Window_Base[_0x4ae06a(0x311)]['drawSkillCost']['call'](this,this[_0x4ae06a(0x26b)],_0x29e246,_0x34784a,_0x410a4f,_0x244510);},Window_SkillList[_0x38de83(0x311)]['setStatusWindow']=function(_0x4005b1){const _0xc7faf7=_0x38de83;this[_0xc7faf7(0x313)]=_0x4005b1,this[_0xc7faf7(0x157)]();},VisuMZ['SkillsStatesCore']['Window_SkillList_updateHelp']=Window_SkillList[_0x38de83(0x311)]['updateHelp'],Window_SkillList['prototype'][_0x38de83(0x139)]=function(){const _0x130918=_0x38de83;VisuMZ['SkillsStatesCore']['Window_SkillList_updateHelp']['call'](this),this[_0x130918(0x313)]&&this['_statusWindow'][_0x130918(0x12f)]===Window_ShopStatus&&this[_0x130918(0x313)][_0x130918(0x13b)](this[_0x130918(0xa6)]());};