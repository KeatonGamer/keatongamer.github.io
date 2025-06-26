//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.52;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.52] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV file that will contain all of the text used to
 * translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV ===
 * 
 * The Language CSV is structured as a normal CSV file would be, which also
 * means it can be modified in programs like Microsoft Excel or Google Sheets.
 * We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV file in programs like notepad directly
 * due to the way certain things like commas (,) are handled and how easy it is
 * to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV file via the spreadsheet editor (Excel or Google
 * Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV and insert in a new key for that particular database
 * name. For example, the equip type "Accessory" will use "Accessory" as the
 * automatic key to look for a translated phrase. If there isn't any in the CSV
 * file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x348c4=_0x54a8;(function(_0x14ef88,_0x3292b3){const _0xfb7128=_0x54a8,_0x37d131=_0x14ef88();while(!![]){try{const _0x217488=parseInt(_0xfb7128(0x453))/0x1+-parseInt(_0xfb7128(0x272))/0x2+-parseInt(_0xfb7128(0x14d))/0x3+parseInt(_0xfb7128(0x2d1))/0x4+-parseInt(_0xfb7128(0x1e0))/0x5+-parseInt(_0xfb7128(0x400))/0x6+parseInt(_0xfb7128(0x404))/0x7*(parseInt(_0xfb7128(0x1a0))/0x8);if(_0x217488===_0x3292b3)break;else _0x37d131['push'](_0x37d131['shift']());}catch(_0x4d33fc){_0x37d131['push'](_0x37d131['shift']());}}}(_0x1c33,0x45d05));function _0x54a8(_0x22580b,_0x3a3fd4){const _0x1c33ca=_0x1c33();return _0x54a8=function(_0x54a876,_0x2e0b32){_0x54a876=_0x54a876-0xbe;let _0x3c82d9=_0x1c33ca[_0x54a876];return _0x3c82d9;},_0x54a8(_0x22580b,_0x3a3fd4);}var label=_0x348c4(0x166),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x348c4(0x28f)](function(_0x2f99f3){const _0x3a4286=_0x348c4;return _0x2f99f3[_0x3a4286(0x23a)]&&_0x2f99f3[_0x3a4286(0x206)][_0x3a4286(0xc2)]('['+label+']');})[0x0];VisuMZ[label][_0x348c4(0x2b2)]=VisuMZ[label][_0x348c4(0x2b2)]||{},VisuMZ[_0x348c4(0x30a)]=function(_0x3b03bb,_0x121f4a){const _0x28d395=_0x348c4;for(const _0x5d7105 in _0x121f4a){if(_0x5d7105[_0x28d395(0xcf)](/(.*):(.*)/i)){const _0x2f7167=String(RegExp['$1']),_0x412a98=String(RegExp['$2'])['toUpperCase']()[_0x28d395(0x23e)]();let _0x3d8100,_0x587fa4,_0x5869bb;switch(_0x412a98){case _0x28d395(0x29d):_0x3d8100=_0x121f4a[_0x5d7105]!==''?Number(_0x121f4a[_0x5d7105]):0x0;break;case _0x28d395(0x2cf):_0x587fa4=_0x121f4a[_0x5d7105]!==''?JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105]):[],_0x3d8100=_0x587fa4[_0x28d395(0x144)](_0x7194ab=>Number(_0x7194ab));break;case _0x28d395(0x15a):_0x3d8100=_0x121f4a[_0x5d7105]!==''?eval(_0x121f4a[_0x5d7105]):null;break;case'ARRAYEVAL':_0x587fa4=_0x121f4a[_0x5d7105]!==''?JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105]):[],_0x3d8100=_0x587fa4[_0x28d395(0x144)](_0x3c9c9a=>eval(_0x3c9c9a));break;case _0x28d395(0x14f):_0x3d8100=_0x121f4a[_0x5d7105]!==''?JSON['parse'](_0x121f4a[_0x5d7105]):'';break;case _0x28d395(0xf8):_0x587fa4=_0x121f4a[_0x5d7105]!==''?JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105]):[],_0x3d8100=_0x587fa4[_0x28d395(0x144)](_0x30a70b=>JSON['parse'](_0x30a70b));break;case'FUNC':_0x3d8100=_0x121f4a[_0x5d7105]!==''?new Function(JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105])):new Function(_0x28d395(0xe8));break;case _0x28d395(0x39a):_0x587fa4=_0x121f4a[_0x5d7105]!==''?JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105]):[],_0x3d8100=_0x587fa4['map'](_0x14908f=>new Function(JSON['parse'](_0x14908f)));break;case'STR':_0x3d8100=_0x121f4a[_0x5d7105]!==''?String(_0x121f4a[_0x5d7105]):'';break;case _0x28d395(0x32e):_0x587fa4=_0x121f4a[_0x5d7105]!==''?JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105]):[],_0x3d8100=_0x587fa4[_0x28d395(0x144)](_0x246cfb=>String(_0x246cfb));break;case _0x28d395(0x40a):_0x5869bb=_0x121f4a[_0x5d7105]!==''?JSON['parse'](_0x121f4a[_0x5d7105]):{},_0x3b03bb[_0x2f7167]={},VisuMZ['ConvertParams'](_0x3b03bb[_0x2f7167],_0x5869bb);continue;case _0x28d395(0x196):_0x587fa4=_0x121f4a[_0x5d7105]!==''?JSON[_0x28d395(0x10a)](_0x121f4a[_0x5d7105]):[],_0x3d8100=_0x587fa4[_0x28d395(0x144)](_0x4faf58=>VisuMZ[_0x28d395(0x30a)]({},JSON['parse'](_0x4faf58)));break;default:continue;}_0x3b03bb[_0x2f7167]=_0x3d8100;}}return _0x3b03bb;},(_0x24fb42=>{const _0x2dccfc=_0x348c4,_0x4edcf7=_0x24fb42['name'];for(const _0x538c68 of dependencies){if(!Imported[_0x538c68]){alert(_0x2dccfc(0x148)[_0x2dccfc(0x413)](_0x4edcf7,_0x538c68)),SceneManager[_0x2dccfc(0x3b3)]();break;}}const _0x255c72=_0x24fb42['description'];if(_0x255c72[_0x2dccfc(0xcf)](/\[Version[ ](.*?)\]/i)){const _0x397380=Number(RegExp['$1']);_0x397380!==VisuMZ[label][_0x2dccfc(0x32d)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x4edcf7,_0x397380)),SceneManager[_0x2dccfc(0x3b3)]());}if(_0x255c72['match'](/\[Tier[ ](\d+)\]/i)){const _0x34604e=Number(RegExp['$1']);_0x34604e<tier?(alert(_0x2dccfc(0x1a6)[_0x2dccfc(0x413)](_0x4edcf7,_0x34604e,tier)),SceneManager[_0x2dccfc(0x3b3)]()):tier=Math[_0x2dccfc(0x32c)](_0x34604e,tier);}VisuMZ[_0x2dccfc(0x30a)](VisuMZ[label][_0x2dccfc(0x2b2)],_0x24fb42[_0x2dccfc(0x134)]);})(pluginData),PluginManager[_0x348c4(0x180)](pluginData['name'],_0x348c4(0x11e),_0x434bc7=>{const _0x2762f9=_0x348c4;VisuMZ['ConvertParams'](_0x434bc7,_0x434bc7);const _0xb806ed=Number(_0x434bc7[_0x2762f9(0x499)])||0x0;$gameSystem['setChoiceMessageDistance'](_0xb806ed);}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x2ed),_0xcb1600=>{const _0x2ab919=_0x348c4;VisuMZ['ConvertParams'](_0xcb1600,_0xcb1600);const _0x878059=_0xcb1600[_0x2ab919(0x20b)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x37163f=_0xcb1600[_0x2ab919(0x42c)]??0x60,_0x386543=_0xcb1600[_0x2ab919(0x440)]||$gameSystem[_0x2ab919(0x19e)]()||0x1,_0x1a8c30=_0xcb1600[_0x2ab919(0x32a)]||$gameSystem[_0x2ab919(0x288)]()||0x1,_0x217bd0=_0xcb1600[_0x2ab919(0x1ed)][_0x2ab919(0x367)]()||'default';$gameSystem['setChoiceListLineHeight'](_0x878059),$gameSystem[_0x2ab919(0x267)](_0x37163f),$gameSystem[_0x2ab919(0x1f3)](_0x386543),$gameSystem[_0x2ab919(0x353)](_0x1a8c30),$gameSystem[_0x2ab919(0xe7)](_0x217bd0);}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x3fa),_0x9ae7ec=>{const _0x245ab9=_0x348c4;VisuMZ['ConvertParams'](_0x9ae7ec,_0x9ae7ec);const _0x201d79=_0x9ae7ec[_0x245ab9(0x3f4)]||$gameSystem['getMessageWindowRows']()||0x1,_0x42e899=_0x9ae7ec[_0x245ab9(0x10e)]||$gameSystem[_0x245ab9(0x139)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0x2f0750=_0x9ae7ec[_0x245ab9(0x280)][_0x245ab9(0x367)]();$gameSystem[_0x245ab9(0x488)](_0x201d79),$gameSystem[_0x245ab9(0x16a)](_0x42e899);['true','false'][_0x245ab9(0xc2)](_0x2f0750)&&$gameSystem[_0x245ab9(0x268)](eval(_0x2f0750));const _0x2e6e06=SceneManager[_0x245ab9(0x219)][_0x245ab9(0x188)];_0x2e6e06&&(_0x2e6e06['resetWordWrap'](),_0x2e6e06[_0x245ab9(0x26e)](),_0x2e6e06['createContents']());}),PluginManager['registerCommand'](pluginData[_0x348c4(0x438)],_0x348c4(0x129),_0x466e43=>{const _0x121dc7=_0x348c4;VisuMZ['ConvertParams'](_0x466e43,_0x466e43),$gameSystem[_0x121dc7(0x300)](_0x466e43[_0x121dc7(0x464)],_0x466e43[_0x121dc7(0x2f9)]);const _0x537ea6=SceneManager['_scene'][_0x121dc7(0x188)];_0x537ea6&&(_0x537ea6[_0x121dc7(0x474)](),_0x537ea6[_0x121dc7(0x26e)](),_0x537ea6['createContents']());}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x27f),_0x1c1a54=>{const _0x1e38c9=_0x348c4;VisuMZ[_0x1e38c9(0x30a)](_0x1c1a54,_0x1c1a54),$gameMessage[_0x1e38c9(0x2b1)](_0x1c1a54[_0x1e38c9(0x25d)]||0x0,_0x1c1a54[_0x1e38c9(0x418)]||0x0);const _0x12cd13=$gameTemp[_0x1e38c9(0x2f6)]();if(_0x12cd13)_0x12cd13[_0x1e38c9(0x3ad)](_0x1e38c9(0x340));}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x2af),_0x101f5f=>{const _0x225348=_0x348c4;VisuMZ[_0x225348(0x30a)](_0x101f5f,_0x101f5f),$gameMessage[_0x225348(0x45b)](_0x101f5f[_0x225348(0x25d)]||0x0,_0x101f5f['ArmorTypeID']||0x0,_0x101f5f['EquipTypeID']||0x0);const _0x5306db=$gameTemp[_0x225348(0x2f6)]();if(_0x5306db)_0x5306db[_0x225348(0x3ad)]('message');}),PluginManager['registerCommand'](pluginData[_0x348c4(0x438)],'SelectSkill',_0x29c485=>{const _0x362f27=_0x348c4;VisuMZ[_0x362f27(0x30a)](_0x29c485,_0x29c485),$gameMessage[_0x362f27(0x1ac)](_0x29c485['VariableID']||0x0,_0x29c485['ActorID']||0x0,_0x29c485[_0x362f27(0x10b)]||0x0);const _0x1c3c76=$gameTemp[_0x362f27(0x2f6)]();if(_0x1c3c76)_0x1c3c76[_0x362f27(0x3ad)](_0x362f27(0x340));}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x195),_0x47638f=>{const _0x45b12b=_0x348c4;VisuMZ['ConvertParams'](_0x47638f,_0x47638f);const _0x3621b0=_0x47638f['PictureIDs']||[],_0x174043=_0x47638f[_0x45b12b(0x235)]||0x0,_0x2429e8=[_0x45b12b(0x484),'up',_0x45b12b(0x37e),'left',_0x45b12b(0x492),_0x45b12b(0x19a),'lowerleft',_0x45b12b(0x22a),_0x45b12b(0x3c4)];for(const _0xd3d40 of _0x3621b0){$gameScreen[_0x45b12b(0x304)](_0xd3d40,_0x174043);for(const _0x5acbe0 of _0x2429e8){if(_0x47638f[_0x5acbe0]===undefined)continue;$gameScreen[_0x45b12b(0x47a)](_0xd3d40,_0x47638f[_0x5acbe0],_0x5acbe0);}}}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x2e8),_0x12c00a=>{const _0x5b1d7a=_0x348c4;VisuMZ['ConvertParams'](_0x12c00a,_0x12c00a);const _0x4b8ca1=_0x12c00a[_0x5b1d7a(0x226)]||[];for(const _0x4a0671 of _0x4b8ca1){$gameScreen[_0x5b1d7a(0x237)](_0x4a0671),$gameScreen[_0x5b1d7a(0x16e)](_0x4a0671);}}),PluginManager[_0x348c4(0x180)](pluginData[_0x348c4(0x438)],_0x348c4(0x1e8),_0x100029=>{const _0x53b638=_0x348c4;$gameScreen[_0x53b638(0x208)]();}),VisuMZ['MessageCore'][_0x348c4(0x189)]=Scene_Boot[_0x348c4(0xf4)][_0x348c4(0x11d)],Scene_Boot[_0x348c4(0xf4)]['onDatabaseLoaded']=function(){const _0x1a70e2=_0x348c4;VisuMZ[_0x1a70e2(0x166)]['Scene_Boot_onDatabaseLoaded']['call'](this),VisuMZ['MessageCore'][_0x1a70e2(0x420)](),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x1a70e2(0x164)](),this[_0x1a70e2(0x44d)](),this[_0x1a70e2(0x422)]();},VisuMZ[_0x348c4(0x166)]['CheckCompatibility']=function(){const _0x218b58=_0x348c4;if(Imported[_0x218b58(0x133)]&&VisuMZ[_0x218b58(0x452)][_0x218b58(0x32d)]<1.09){let _0x49e327='';_0x49e327+=_0x218b58(0x41b),_0x49e327+=_0x218b58(0x40b),alert(_0x49e327),SceneManager['exit']();}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x251)]=function(_0xa4b604){const _0x100b59=_0x348c4,_0x3aee36=VisuMZ['MessageCore'][_0x100b59(0x2b2)][_0xa4b604];_0x3aee36[_0x100b59(0x431)]((_0x12e4b9,_0x13d0e9)=>{const _0x220351=_0x100b59;if(!_0x12e4b9||!_0x13d0e9)return-0x1;return _0x13d0e9[_0x220351(0x126)][_0x220351(0x3f1)]-_0x12e4b9[_0x220351(0x126)]['length'];});},Scene_Boot['prototype'][_0x348c4(0x1af)]=function(){const _0x430eca=_0x348c4;VisuMZ[_0x430eca(0x166)][_0x430eca(0x251)](_0x430eca(0x232));for(const _0xf86212 of VisuMZ[_0x430eca(0x166)][_0x430eca(0x2b2)][_0x430eca(0x232)]){_0xf86212[_0x430eca(0x126)]=_0xf86212['Match'][_0x430eca(0x198)](),_0xf86212['textCodeCheck']=new RegExp('\x1b'+_0xf86212[_0x430eca(0x126)],'gi'),_0xf86212[_0x430eca(0x2e1)]='\x1b'+_0xf86212[_0x430eca(0x126)];if(_0xf86212['Type']==='')_0xf86212[_0x430eca(0x2e1)]+='[0]';}},Scene_Boot[_0x348c4(0xf4)][_0x348c4(0x164)]=function(){const _0x2b2121=_0x348c4;VisuMZ[_0x2b2121(0x166)][_0x2b2121(0x251)](_0x2b2121(0x141));for(const _0x37e78c of VisuMZ[_0x2b2121(0x166)][_0x2b2121(0x2b2)][_0x2b2121(0x141)]){_0x37e78c[_0x2b2121(0x2ec)]=new RegExp('\x1b'+_0x37e78c[_0x2b2121(0x126)]+_0x37e78c[_0x2b2121(0x1d2)],'gi'),_0x37e78c[_0x2b2121(0x34a)]!==''&&_0x37e78c[_0x2b2121(0x34a)]!==_0x2b2121(0xca)?_0x37e78c['textCodeResult']=new Function('return\x20\x27'+_0x37e78c['TextStr'][_0x2b2121(0x2f2)](/\\/g,'\x1b')+'\x27'):_0x37e78c[_0x2b2121(0x2e1)]=_0x37e78c[_0x2b2121(0x266)];}},Scene_Boot[_0x348c4(0xf4)][_0x348c4(0x44d)]=function(){const _0x53fd14=_0x348c4;for(const _0x4b350b of VisuMZ[_0x53fd14(0x166)]['Settings']['TextMacros']){_0x4b350b[_0x53fd14(0x2ec)]=new RegExp('\x5c['+_0x4b350b[_0x53fd14(0x126)]+'\x5c]','gi');if(_0x4b350b[_0x53fd14(0x34a)]!==''&&_0x4b350b[_0x53fd14(0x34a)]!==_0x53fd14(0xca)){let _0x4d699c=_0x4b350b[_0x53fd14(0x34a)];_0x4d699c=_0x4d699c[_0x53fd14(0x2f2)](/\\/g,'\x1b'),_0x4d699c=_0x4d699c[_0x53fd14(0x2f2)]('\x27','\x5c\x27'),_0x4d699c=_0x4d699c['replace']('\x22','\x5c\x22'),_0x4b350b[_0x53fd14(0x2e1)]=new Function('return\x20\x27'+_0x4d699c+'\x27');}else _0x4b350b['textCodeResult']=_0x4b350b[_0x53fd14(0x266)];}},Scene_Boot[_0x348c4(0xf4)][_0x348c4(0x422)]=function(){const _0x357598=_0x348c4,_0x4d566f=VisuMZ[_0x357598(0x166)][_0x357598(0x2b2)][_0x357598(0x21e)];!VisuMZ['ParseAllNotetags']&&(VisuMZ[_0x357598(0x166)][_0x357598(0x44a)]($dataClasses,_0x4d566f[_0x357598(0x11b)]),VisuMZ['MessageCore']['AddAutoColor']($dataSkills,_0x4d566f[_0x357598(0x348)]),VisuMZ['MessageCore']['AddAutoColor']($dataItems,_0x4d566f['Items']),VisuMZ['MessageCore'][_0x357598(0x44a)]($dataWeapons,_0x4d566f[_0x357598(0x485)]),VisuMZ[_0x357598(0x166)][_0x357598(0x44a)]($dataArmors,_0x4d566f[_0x357598(0x34e)]),VisuMZ[_0x357598(0x166)][_0x357598(0x44a)]($dataEnemies,_0x4d566f[_0x357598(0x132)]),VisuMZ[_0x357598(0x166)][_0x357598(0x44a)]($dataStates,_0x4d566f[_0x357598(0xce)])),VisuMZ['MessageCore'][_0x357598(0x281)]();},VisuMZ['MessageCore'][_0x348c4(0x487)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x348c4(0xd8),_0x348c4(0x15b),_0x348c4(0x3bd),_0x348c4(0x370),_0x348c4(0x2e3),'</LEFT>','<CENTER>',_0x348c4(0x277),'<RIGHT>','</RIGHT>','<COLORLOCK>',_0x348c4(0x498),_0x348c4(0x458),_0x348c4(0x318),_0x348c4(0x2a5),_0x348c4(0x480),_0x348c4(0x489),_0x348c4(0x1fc),'PICTURE',_0x348c4(0x478),'COMMONEVENT',_0x348c4(0x199),_0x348c4(0x16d),_0x348c4(0x344),_0x348c4(0x227),'DISABLE',_0x348c4(0x380),_0x348c4(0x242),_0x348c4(0x230),_0x348c4(0x421)],VisuMZ[_0x348c4(0x166)][_0x348c4(0x44a)]=function(_0x2ecb37,_0x4a4789){const _0x515a84=_0x348c4;if(_0x4a4789<=0x0)return;const _0x264f0b=_0x2ecb37;for(const _0x5ce532 of _0x264f0b){if(!_0x5ce532)continue;VisuMZ[_0x515a84(0x166)]['CreateAutoColorFor'](_0x5ce532,_0x4a4789);}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x281)]=function(){const _0x56ff8f=_0x348c4;VisuMZ[_0x56ff8f(0x166)][_0x56ff8f(0x43c)]=[];for(let _0x3dfd58=0x1;_0x3dfd58<=0x1f;_0x3dfd58++){const _0xd954d8=_0x56ff8f(0x4a1)[_0x56ff8f(0x413)](_0x3dfd58),_0x16cf5a=VisuMZ['MessageCore'][_0x56ff8f(0x2b2)][_0x56ff8f(0x21e)][_0xd954d8];_0x16cf5a['sort']((_0x728575,_0x39fb)=>{const _0x54ab83=_0x56ff8f;if(!_0x728575||!_0x39fb)return-0x1;return _0x39fb[_0x54ab83(0x3f1)]-_0x728575[_0x54ab83(0x3f1)];}),this[_0x56ff8f(0x153)](_0x16cf5a,_0x3dfd58);}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x153)]=function(_0x3dae7f,_0x423fc1){const _0x5cd179=_0x348c4;for(const _0x53bfef of _0x3dae7f){if(_0x53bfef[_0x5cd179(0x3f1)]<=0x0)continue;if(/^\d+$/[_0x5cd179(0xe9)](_0x53bfef))continue;let _0x307ee6=VisuMZ[_0x5cd179(0x166)]['ConvertTextAutoColorRegExpFriendly'](_0x53bfef);if(_0x53bfef[_0x5cd179(0xcf)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x126553=new RegExp(_0x307ee6,'i');else var _0x126553=new RegExp('\x5cb'+_0x307ee6+'\x5cb','g');VisuMZ[_0x5cd179(0x166)]['AutoColorRegExp'][_0x5cd179(0x122)]([_0x126553,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5cd179(0x413)](_0x423fc1,_0x53bfef)]);}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x3cb)]=function(_0x143c57){const _0x33a4a7=_0x348c4;return _0x143c57=_0x143c57[_0x33a4a7(0x2f2)](/(\W)/gi,(_0x89157c,_0x4faa66)=>_0x33a4a7(0x374)[_0x33a4a7(0x413)](_0x4faa66)),_0x143c57;},VisuMZ['MessageCore']['ParseClassNotetags']=VisuMZ[_0x348c4(0x3b7)],VisuMZ[_0x348c4(0x3b7)]=function(_0x16b0d7){const _0x3cfb63=_0x348c4;VisuMZ[_0x3cfb63(0x166)][_0x3cfb63(0x3b7)]['call'](this,_0x16b0d7);const _0x111b75=VisuMZ['MessageCore']['Settings'][_0x3cfb63(0x21e)];VisuMZ[_0x3cfb63(0x166)][_0x3cfb63(0x156)](_0x16b0d7,_0x111b75[_0x3cfb63(0x11b)]);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x2f3)]=VisuMZ[_0x348c4(0x2f3)],VisuMZ[_0x348c4(0x2f3)]=function(_0x250753){const _0x8d632a=_0x348c4;VisuMZ[_0x8d632a(0x166)][_0x8d632a(0x2f3)][_0x8d632a(0x290)](this,_0x250753);const _0x40c31b=VisuMZ[_0x8d632a(0x166)]['Settings'][_0x8d632a(0x21e)];VisuMZ[_0x8d632a(0x166)][_0x8d632a(0x156)](_0x250753,_0x40c31b[_0x8d632a(0x348)]);},0x7,VisuMZ[_0x348c4(0x166)][_0x348c4(0x125)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x348c4(0x125)]=function(_0x224cfc){const _0x24649b=_0x348c4;VisuMZ[_0x24649b(0x166)]['ParseItemNotetags']['call'](this,_0x224cfc);const _0x584567=VisuMZ[_0x24649b(0x166)][_0x24649b(0x2b2)]['AutoColor'];VisuMZ[_0x24649b(0x166)]['CreateAutoColorFor'](_0x224cfc,_0x584567[_0x24649b(0x34f)]);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x109)]=VisuMZ[_0x348c4(0x109)],VisuMZ['ParseWeaponNotetags']=function(_0x53bcd6){const _0xa17f9e=_0x348c4;VisuMZ[_0xa17f9e(0x166)][_0xa17f9e(0x109)][_0xa17f9e(0x290)](this,_0x53bcd6);const _0x5f3e22=VisuMZ[_0xa17f9e(0x166)][_0xa17f9e(0x2b2)]['AutoColor'];VisuMZ[_0xa17f9e(0x166)][_0xa17f9e(0x156)](_0x53bcd6,_0x5f3e22['Weapons']);},VisuMZ[_0x348c4(0x166)]['ParseArmorNotetags']=VisuMZ[_0x348c4(0x405)],VisuMZ[_0x348c4(0x405)]=function(_0x2a45e2){const _0x2c2a02=_0x348c4;VisuMZ[_0x2c2a02(0x166)][_0x2c2a02(0x405)][_0x2c2a02(0x290)](this,_0x2a45e2);const _0x2a3612=VisuMZ['MessageCore'][_0x2c2a02(0x2b2)][_0x2c2a02(0x21e)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x2a45e2,_0x2a3612['Armors']);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x110)]=VisuMZ[_0x348c4(0x110)],VisuMZ[_0x348c4(0x110)]=function(_0x598789){const _0x2fe660=_0x348c4;VisuMZ[_0x2fe660(0x166)][_0x2fe660(0x110)][_0x2fe660(0x290)](this,_0x598789);const _0x4977ac=VisuMZ[_0x2fe660(0x166)]['Settings']['AutoColor'];VisuMZ['MessageCore'][_0x2fe660(0x156)](_0x598789,_0x4977ac[_0x2fe660(0x132)]);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x3d2)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x348c4(0x3d2)]=function(_0x4c44e2){const _0x3d70af=_0x348c4;VisuMZ['MessageCore']['ParseStateNotetags'][_0x3d70af(0x290)](this,_0x4c44e2);const _0x1c0f76=VisuMZ[_0x3d70af(0x166)][_0x3d70af(0x2b2)][_0x3d70af(0x21e)];VisuMZ[_0x3d70af(0x166)]['CreateAutoColorFor'](_0x4c44e2,_0x1c0f76[_0x3d70af(0xce)]);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x156)]=function(_0x53d8b7,_0x5b1369){const _0x1670ad=_0x348c4;if(_0x5b1369<=0x0)return;const _0x227acc=VisuMZ[_0x1670ad(0x166)][_0x1670ad(0x2b2)][_0x1670ad(0x21e)][_0x1670ad(0x357)+_0x5b1369];let _0xaebefa=_0x53d8b7[_0x1670ad(0x438)][_0x1670ad(0x23e)]();if(/^\d+$/['test'](_0xaebefa))return;if(VisuMZ['MessageCore'][_0x1670ad(0x487)]['includes'](_0xaebefa[_0x1670ad(0x198)]()))return;_0xaebefa=_0xaebefa['replace'](/\\I\[(\d+)\]/gi,''),_0xaebefa=_0xaebefa['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0xaebefa['length']<=0x0)return;if(_0xaebefa[_0x1670ad(0xcf)](/-----/i))return;_0x227acc[_0x1670ad(0x122)](_0xaebefa);},VisuMZ['MessageCore'][_0x348c4(0xe0)]=Scene_Boot[_0x348c4(0xf4)]['loadGameFonts'],Scene_Boot[_0x348c4(0xf4)][_0x348c4(0x12f)]=function(){const _0x304b31=_0x348c4;VisuMZ[_0x304b31(0x166)]['Scene_Boot_loadGameFonts'][_0x304b31(0x290)](this),this[_0x304b31(0xec)]();},Scene_Boot['prototype'][_0x348c4(0xec)]=function(){const _0x2941e1=_0x348c4,_0x2ea296=VisuMZ[_0x2941e1(0x166)][_0x2941e1(0x2b2)][_0x2941e1(0x3e3)]||[];for(const _0x4a3ef0 of _0x2ea296){if(!_0x4a3ef0)continue;const _0xac4299=_0x4a3ef0[_0x2941e1(0x462)];if(_0xac4299[_0x2941e1(0x23e)]()==='')continue;if(_0xac4299[_0x2941e1(0x367)]()[_0x2941e1(0x23e)]()==='unnamed')continue;const _0x189f94=_0x4a3ef0[_0x2941e1(0x3a2)];if(_0x189f94===_0x2941e1(0xc1))continue;FontManager[_0x2941e1(0x1fa)](_0xac4299,_0x189f94);}},VisuMZ['MessageCore'][_0x348c4(0x31f)]=DataManager[_0x348c4(0x1f9)],DataManager[_0x348c4(0x1f9)]=function(){const _0x209aab=_0x348c4;VisuMZ[_0x209aab(0x166)]['DataManager_loadDatabase'][_0x209aab(0x290)](this),this['loadLocalization']();},DataManager[_0x348c4(0x150)]=function(){const _0xd102e6=_0x348c4;if(!TextManager['isVisuMzLocalizationEnabled']())return;const _0x247c3e=VisuMZ['MessageCore'][_0xd102e6(0x2b2)][_0xd102e6(0x27a)],_0x29ef6c=_0x247c3e[_0xd102e6(0x13c)]||'';if(!_0x29ef6c)return;const _0x3c54d4=_0xd102e6(0x3a7),_0x179047=new XMLHttpRequest(),_0x3a61bc=_0xd102e6(0x2d0)+_0x29ef6c;window[_0x3c54d4]=null,_0x179047[_0xd102e6(0x36e)](_0xd102e6(0xf1),_0x3a61bc),_0x179047[_0xd102e6(0x23f)](_0xd102e6(0x355)),_0x179047[_0xd102e6(0x28d)]=()=>this[_0xd102e6(0x333)](_0x179047,_0x3c54d4),_0x179047[_0xd102e6(0x2aa)]=()=>this[_0xd102e6(0x19d)](),_0x179047[_0xd102e6(0x410)]();},DataManager[_0x348c4(0x333)]=function(_0x598267,_0x141ff5){const _0x4ddc52=_0x348c4;if(_0x598267['status']>=0x190)return;const _0x29e549=_0x598267['responseText'];window[_0x141ff5]=VisuMZ['MessageCore'][_0x4ddc52(0x2a7)](_0x29e549);},VisuMZ[_0x348c4(0x166)]['ParseLocalizationCsv']=function(_0x17f55d){const _0x126563=_0x348c4,_0x3c047a=_0x17f55d[_0x126563(0x496)]('\x0a'),_0x24aa8a=_0x3c047a[0x0][_0x126563(0x496)](';'),_0x21e12b={};return _0x3c047a[_0x126563(0x158)](0x1)[_0x126563(0x14a)](_0x168661=>{const _0x5c5f4e=_0x126563;let _0x57524a=[],_0x3ed8f2='',_0x1f48e7=![];for(let _0x3b6556=0x0;_0x3b6556<_0x168661[_0x5c5f4e(0x3f1)];_0x3b6556++){let _0x5ba854=_0x168661[_0x3b6556];if(_0x5ba854==='\x22')_0x1f48e7&&_0x168661[_0x3b6556+0x1]==='\x22'?(_0x3ed8f2+=_0x5ba854,_0x3b6556++):_0x1f48e7=!_0x1f48e7;else _0x5ba854===';'&&!_0x1f48e7?(_0x57524a[_0x5c5f4e(0x122)](_0x3ed8f2),_0x3ed8f2=''):_0x3ed8f2+=_0x5ba854;}if(_0x3ed8f2)_0x57524a[_0x5c5f4e(0x122)](_0x3ed8f2);if(!_0x57524a[0x0])_0x57524a[0x0]='';const _0x2233ef=_0x57524a[0x0][_0x5c5f4e(0x2f2)](/^"|"$/g,'')[_0x5c5f4e(0x367)]()['trim']();_0x21e12b[_0x2233ef]=_0x24aa8a[_0x5c5f4e(0x158)](0x1)[_0x5c5f4e(0x114)]((_0x2a013c,_0x1e400c,_0x15d8ed)=>{const _0x9d3e32=_0x5c5f4e;return _0x2a013c[_0x1e400c]=(_0x57524a[_0x15d8ed+0x1]||'')[_0x9d3e32(0x2f2)](/^"|"$/g,''),_0x2a013c;},{});}),_0x21e12b;},DataManager[_0x348c4(0x19d)]=function(){const _0x27ebe9=_0x348c4;let _0x46e27b='';_0x46e27b+=_0x27ebe9(0x495),_0x46e27b+=_0x27ebe9(0x469),confirm(_0x46e27b)?Utils['isOptionValid'](_0x27ebe9(0xe9))?(_0x46e27b=_0x27ebe9(0x2b7),alert(_0x46e27b),this[_0x27ebe9(0x36a)](),this[_0x27ebe9(0x260)](),_0x46e27b=''):_0x46e27b=_0x27ebe9(0x33e):_0x46e27b=_0x27ebe9(0x1da),_0x46e27b+='Please\x20restart\x20the\x20game.',alert(_0x46e27b),SceneManager['exit']();},DataManager[_0x348c4(0x36a)]=function(){const _0x5c5ffc=_0x348c4,_0x2158c0=[_0x5c5ffc(0x338),'English',_0x5c5ffc(0x213),'Chinese(Simplified)',_0x5c5ffc(0x10c),'Czech',_0x5c5ffc(0x31c),_0x5c5ffc(0x171),_0x5c5ffc(0x3c6),_0x5c5ffc(0x1d7),_0x5c5ffc(0x32f),_0x5c5ffc(0x475),_0x5c5ffc(0x35b),_0x5c5ffc(0x20a),'Indonesian','Italian',_0x5c5ffc(0x3ea),_0x5c5ffc(0x22c),_0x5c5ffc(0x390),_0x5c5ffc(0x43f),_0x5c5ffc(0x117),'Romanian','Russian','Slovak',_0x5c5ffc(0x262),_0x5c5ffc(0x209),'Tamil',_0x5c5ffc(0xd6),_0x5c5ffc(0x1a9)],_0x15c7fb=[_0x5c5ffc(0x1c1),_0x5c5ffc(0x136),'হ্যালো','你好','你好','Ahoj',_0x5c5ffc(0xd7),_0x5c5ffc(0x287),_0x5c5ffc(0x3f3),'Bonjour',_0x5c5ffc(0x287),_0x5c5ffc(0x135),_0x5c5ffc(0x2d7),_0x5c5ffc(0x250),_0x5c5ffc(0x100),'Ciao',_0x5c5ffc(0xd5),_0x5c5ffc(0x335),'Hei',_0x5c5ffc(0x284),_0x5c5ffc(0x271),_0x5c5ffc(0x10f),_0x5c5ffc(0x1c5),_0x5c5ffc(0x2e9),_0x5c5ffc(0x486),_0x5c5ffc(0xd7),_0x5c5ffc(0x1eb),_0x5c5ffc(0x449),_0x5c5ffc(0x352)],_0xc428f1=['Farewell','Good-bye','বিদায়','再见','再見',_0x5c5ffc(0x269),'Farvel',_0x5c5ffc(0x42b),_0x5c5ffc(0x331),_0x5c5ffc(0x393),'Auf\x20Wiedersehen',_0x5c5ffc(0x41c),_0x5c5ffc(0x275),_0x5c5ffc(0x3e9),_0x5c5ffc(0x1e4),'Arrivederci',_0x5c5ffc(0x10d),_0x5c5ffc(0xc0),_0x5c5ffc(0x447),_0x5c5ffc(0x375),'Adeus','La\x20revedere',_0x5c5ffc(0x179),'Zbohom',_0x5c5ffc(0x279),_0x5c5ffc(0x21a),_0x5c5ffc(0x207),_0x5c5ffc(0x38d),_0x5c5ffc(0x3f0)],_0xe1a5f9=[_0x5c5ffc(0x3ed),_0x5c5ffc(0x3ed),_0x5c5ffc(0x28a),'哇','哇','Ó','Wow',_0x5c5ffc(0x35f),'Vau',_0x5c5ffc(0x12a),'Wow',_0x5c5ffc(0x163),'वाह','Hűha',_0x5c5ffc(0x229),_0x5c5ffc(0x3ed),'ワオ','와우','Oi','O',_0x5c5ffc(0x307),_0x5c5ffc(0x307),_0x5c5ffc(0x401),'Ó',_0x5c5ffc(0x22d),'Oj',_0x5c5ffc(0x1d5),_0x5c5ffc(0x1e6),_0x5c5ffc(0x3f9)],_0x3e902e=[_0x2158c0,_0x15c7fb,_0xc428f1,_0xe1a5f9],_0x10e60e=_0x3e902e[_0x5c5ffc(0x144)](_0x3a3b0d=>_0x3a3b0d[_0x5c5ffc(0x276)](';'))[_0x5c5ffc(0x276)]('\x0a'),_0x58811=VisuMZ[_0x5c5ffc(0x166)][_0x5c5ffc(0x2b2)][_0x5c5ffc(0x27a)],_0x3aeee8=_0x58811[_0x5c5ffc(0x13c)]||_0x5c5ffc(0x170),_0x37b6b7=require(_0x5c5ffc(0x252)),_0x5b9698=_0x37b6b7[_0x5c5ffc(0x1b6)](process['mainModule'][_0x5c5ffc(0x3d0)]),_0x51e8ad=_0x37b6b7[_0x5c5ffc(0x276)](_0x5b9698,_0x5c5ffc(0x2d0)),_0xe9a0b7=_0x51e8ad+_0x3aeee8,_0x58d24d=require('fs');return _0x58d24d['writeFileSync'](_0xe9a0b7,_0x10e60e),_0xe9a0b7;},DataManager[_0x348c4(0x260)]=function(){const _0x36aeb2=_0x348c4,{exec:_0x457e07}=require(_0x36aeb2(0x313));_0x457e07(_0x36aeb2(0x165)),_0x457e07(_0x36aeb2(0x14c));},VisuMZ[_0x348c4(0x166)][_0x348c4(0x215)]=ImageManager[_0x348c4(0x3bf)],ImageManager[_0x348c4(0x3bf)]=function(_0x38740e,_0x331b43){const _0x299600=_0x348c4;if(ConfigManager[_0x299600(0x319)]!==undefined){const _0x29890e=VisuMZ[_0x299600(0x166)][_0x299600(0x2b2)][_0x299600(0x27a)]||{},_0x1aa964=_0x29890e[_0x299600(0x439)]||'English',_0x2192c6=VisuMZ[_0x299600(0x166)][_0x299600(0x2b2)]['LanguageImages']||{},_0x588bf9=ConfigManager[_0x299600(0x319)]||_0x1aa964;if(_0x588bf9===_0x1aa964&&!_0x2192c6[_0x299600(0x3b8)]){}else{const _0x3d365c=_0x2192c6[_0x588bf9]||_0x299600(0x494);_0x38740e&&_0x38740e['match'](/\[XX\]/g)&&console[_0x299600(0x292)](_0x38740e,_0x331b43),_0x331b43&&_0x331b43[_0x299600(0xcf)](/\[XX\]/g)&&(_0x331b43=_0x331b43[_0x299600(0x2f2)](/\[XX\]/g,_0x3d365c));}}return VisuMZ[_0x299600(0x166)][_0x299600(0x215)][_0x299600(0x290)](this,_0x38740e,_0x331b43);},SceneManager['isSceneBattle']=function(){const _0xee3301=_0x348c4;return this['_scene']&&this[_0xee3301(0x219)][_0xee3301(0x20d)]===Scene_Battle;},SceneManager[_0x348c4(0x497)]=function(){const _0x1e6a42=_0x348c4;return this[_0x1e6a42(0x219)]&&this[_0x1e6a42(0x219)]['constructor']===Scene_Map;},ConfigManager['textLocale']=VisuMZ[_0x348c4(0x166)][_0x348c4(0x2b2)][_0x348c4(0x27a)][_0x348c4(0x439)]||_0x348c4(0x3fe),ConfigManager[_0x348c4(0x476)]=VisuMZ['MessageCore'][_0x348c4(0x2b2)][_0x348c4(0x325)][_0x348c4(0x221)],VisuMZ[_0x348c4(0x166)][_0x348c4(0x426)]=ConfigManager[_0x348c4(0x1be)],ConfigManager[_0x348c4(0x1be)]=function(){const _0x448cc7=_0x348c4,_0x15803a=VisuMZ['MessageCore'][_0x448cc7(0x426)][_0x448cc7(0x290)](this);return TextManager[_0x448cc7(0x26c)]()&&(_0x15803a['textLocale']=this[_0x448cc7(0x319)]),_0x15803a[_0x448cc7(0x476)]=this['textSpeed'],_0x15803a;},VisuMZ[_0x348c4(0x166)]['ConfigManager_applyData']=ConfigManager[_0x348c4(0x42f)],ConfigManager[_0x348c4(0x42f)]=function(_0xe4f120){const _0x9cac97=_0x348c4;VisuMZ[_0x9cac97(0x166)]['ConfigManager_applyData'][_0x9cac97(0x290)](this,_0xe4f120),TextManager[_0x9cac97(0x26c)]()&&(_0x9cac97(0x319)in _0xe4f120?this[_0x9cac97(0x319)]=String(_0xe4f120[_0x9cac97(0x319)]):this[_0x9cac97(0x319)]=VisuMZ[_0x9cac97(0x166)]['Settings']['Localization']['DefaultLocale']||_0x9cac97(0x3fe)),_0x9cac97(0x476)in _0xe4f120?this[_0x9cac97(0x476)]=Number(_0xe4f120[_0x9cac97(0x476)])['clamp'](0x1,0xb):this[_0x9cac97(0x476)]=VisuMZ[_0x9cac97(0x166)][_0x9cac97(0x2b2)][_0x9cac97(0x325)][_0x9cac97(0x221)];},TextManager[_0x348c4(0x2c6)]=VisuMZ[_0x348c4(0x166)]['Settings'][_0x348c4(0x27a)][_0x348c4(0x33f)],TextManager[_0x348c4(0x2cc)]=VisuMZ[_0x348c4(0x166)]['Settings'][_0x348c4(0x325)]['Name'],TextManager[_0x348c4(0x216)]=VisuMZ[_0x348c4(0x166)]['Settings'][_0x348c4(0x325)][_0x348c4(0x3a1)],VisuMZ[_0x348c4(0x166)][_0x348c4(0xc5)]=TextManager[_0x348c4(0x340)],TextManager[_0x348c4(0x340)]=function(_0x201bb5){const _0x12e9c0=_0x348c4,_0x3ba208=[_0x12e9c0(0x441),_0x12e9c0(0x3c7),_0x12e9c0(0x3b6),_0x12e9c0(0x2b8),_0x12e9c0(0x24a),_0x12e9c0(0x3cd),_0x12e9c0(0x13b),'obtainExp','obtainGold',_0x12e9c0(0x341)];let _0x1aa375=VisuMZ['MessageCore'][_0x12e9c0(0xc5)][_0x12e9c0(0x290)](this,_0x201bb5);return _0x3ba208[_0x12e9c0(0xc2)](_0x201bb5)&&(_0x1aa375='</WORDWRAP>'+_0x1aa375),_0x1aa375;},TextManager['isVisuMzLocalizationEnabled']=function(){const _0x46032d=_0x348c4;return VisuMZ['MessageCore']['Settings'][_0x46032d(0x27a)][_0x46032d(0x2eb)];},TextManager['parseLocalizedText']=function(_0x365d49){const _0x1b8332=_0x348c4;if(!this[_0x1b8332(0x26c)]())return _0x365d49;return _0x365d49=String(_0x365d49)['replace'](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x5033d3,_0x163820)=>this[_0x1b8332(0x286)](String(_0x163820))),_0x365d49=String(_0x365d49)['replace'](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x442c5a,_0xb86b)=>this['getLocalizedText'](String(_0xb86b))),_0x365d49=String(_0x365d49)[_0x1b8332(0x2f2)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x529641,_0x291762)=>this[_0x1b8332(0x286)](String(_0x291762))),_0x365d49;},TextManager[_0x348c4(0x286)]=function(_0x597692){const _0x20ec3d=_0x348c4;if(!$dataLocalization)return'';const _0x4bbb18=$dataLocalization[_0x597692[_0x20ec3d(0x367)]()[_0x20ec3d(0x23e)]()];if(!_0x4bbb18)return;const _0x17ba97=ConfigManager[_0x20ec3d(0x319)]||_0x20ec3d(0x3fe);let _0x40ea66=_0x4bbb18[_0x17ba97]||_0x20ec3d(0x3eb);return _0x40ea66=_0x40ea66[_0x20ec3d(0x2f2)](/\\/g,'\x1b'),_0x40ea66=_0x40ea66[_0x20ec3d(0x2f2)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x40ea66;},TextManager[_0x348c4(0x2a3)]=function(_0xcf1acc){const _0x116d7b=_0x348c4;return VisuMZ[_0x116d7b(0x166)][_0x116d7b(0x2b2)][_0x116d7b(0x27a)][_0xcf1acc]||'';},TextManager[_0x348c4(0x3ba)]=function(){const _0x21b3a2=_0x348c4,_0x165bf9=ConfigManager[_0x21b3a2(0x319)]||_0x21b3a2(0x3fe);return this[_0x21b3a2(0x2a3)](_0x165bf9);},TextManager['getLanguageAt']=function(_0x1b2125){const _0x226b5a=_0x348c4,_0x3e31bc=VisuMZ[_0x226b5a(0x166)][_0x226b5a(0x2b2)][_0x226b5a(0x27a)]['Languages']||[];let _0x349195=_0x3e31bc['indexOf'](ConfigManager['textLocale']||'English');_0x349195+=_0x1b2125;const _0x37a5e8=_0x3e31bc[_0x349195]||'';return this[_0x226b5a(0x2a3)](_0x37a5e8);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x29f)]=Game_System['prototype'][_0x348c4(0xbe)],Game_System[_0x348c4(0xf4)][_0x348c4(0xbe)]=function(){const _0x9d11d1=_0x348c4;let _0x412949=VisuMZ[_0x9d11d1(0x166)]['Game_System_mainFontFace'][_0x9d11d1(0x290)](this);if(ConfigManager&&ConfigManager['textFont']!==undefined&&ConfigManager[_0x9d11d1(0x3cf)]>0x0)return _0x412949;else{const _0x5d0e2=ConfigManager[_0x9d11d1(0x319)]||_0x9d11d1(0x3fe),_0x29793e=VisuMZ['MessageCore'][_0x9d11d1(0x2b2)][_0x9d11d1(0xe2)];return _0x29793e[_0x5d0e2]!==undefined&&(_0x412949=_0x29793e[_0x5d0e2]+',\x20'+$dataSystem[_0x9d11d1(0x2f1)][_0x9d11d1(0xeb)]),_0x412949;}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x1b5)]=Window_Command[_0x348c4(0xf4)][_0x348c4(0x1ef)],Window_Command[_0x348c4(0xf4)][_0x348c4(0x1ef)]=function(_0x487b66,_0x18b210,_0x1ee554,_0x60b299){const _0x169c2f=_0x348c4;if(TextManager[_0x169c2f(0x1b2)]&&TextManager['isVisuMzLocalizationEnabled']()){const _0x2596ce=String(_0x487b66)['toLowerCase']()[_0x169c2f(0x23e)]();if($dataLocalization[_0x2596ce]&&_0x2596ce[_0x169c2f(0x3f1)]>0x0){const _0x30c260=ConfigManager[_0x169c2f(0x319)]||_0x169c2f(0x3fe);_0x487b66=$dataLocalization[_0x2596ce][_0x30c260]||_0x169c2f(0x3eb);}}VisuMZ['MessageCore']['Window_Command_addCommand'][_0x169c2f(0x290)](this,_0x487b66,_0x18b210,_0x1ee554,_0x60b299);},Window_StatusBase[_0x348c4(0xf4)][_0x348c4(0x45c)]=function(_0x3e9d04,_0x296aa6){const _0x42f911=_0x348c4,_0x5eb9a7=_0x3e9d04[_0x42f911(0x1a7)]();let _0x5e6a37=$dataSystem['equipTypes'][_0x5eb9a7[_0x296aa6]];if(TextManager[_0x42f911(0x1b2)]){const _0x972b61=String(_0x5e6a37)[_0x42f911(0x367)]()[_0x42f911(0x23e)]();if(TextManager['isVisuMzLocalizationEnabled']()&&$dataLocalization[_0x972b61]){const _0x127aab=ConfigManager['textLocale']||_0x42f911(0x3fe);_0x5e6a37=$dataLocalization[_0x972b61][_0x127aab]||_0x42f911(0x3eb);}}return _0x5e6a37;},Game_Temp[_0x348c4(0xf4)][_0x348c4(0x130)]=function(_0x46568c){const _0x55e06a=_0x348c4;this[_0x55e06a(0x36c)]=_0x46568c;},Game_Temp[_0x348c4(0xf4)]['getLastPluginCommandInterpreter']=function(){const _0x58cc8c=_0x348c4;return this[_0x58cc8c(0x36c)];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x294)]=Game_Interpreter['prototype']['command357'],Game_Interpreter['prototype']['command357']=function(_0x36ba9e){const _0xd17f5d=_0x348c4;return $gameTemp[_0xd17f5d(0x130)](this),VisuMZ['MessageCore']['Game_Interpreter_PluginCommand'][_0xd17f5d(0x290)](this,_0x36ba9e);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x2bf)]=Game_System['prototype'][_0x348c4(0x467)],Game_System[_0x348c4(0xf4)]['initialize']=function(){const _0x116ea9=_0x348c4;VisuMZ['MessageCore'][_0x116ea9(0x2bf)][_0x116ea9(0x290)](this),this[_0x116ea9(0x33a)]();},Game_System[_0x348c4(0xf4)][_0x348c4(0x33a)]=function(){const _0x2735ca=_0x348c4,_0x5d1be4=VisuMZ[_0x2735ca(0x166)]['Settings'][_0x2735ca(0x2fa)],_0x55758e=VisuMZ['MessageCore'][_0x2735ca(0x2b2)][_0x2735ca(0x280)];this[_0x2735ca(0x3cc)]={'messageRows':_0x5d1be4['MessageRows'],'messageWidth':_0x5d1be4[_0x2735ca(0x2b6)],'messageWordWrap':_0x55758e[_0x2735ca(0x2e2)],'helpWordWrap':_0x55758e[_0x2735ca(0x468)],'choiceLineHeight':_0x5d1be4['ChoiceWindowLineHeight'],'choiceMinWidth':_0x5d1be4[_0x2735ca(0x3a6)]??0x60,'choiceRows':_0x5d1be4[_0x2735ca(0x2a0)],'choiceCols':_0x5d1be4[_0x2735ca(0x322)],'choiceTextAlign':_0x5d1be4[_0x2735ca(0x3d3)],'choiceDistance':0x0},this[_0x2735ca(0xf7)]===undefined&&(this[_0x2735ca(0xf7)]=_0x5d1be4[_0x2735ca(0x244)],this[_0x2735ca(0x113)]=_0x5d1be4[_0x2735ca(0x31b)]);},Game_System[_0x348c4(0xf4)]['getMessageWindowRows']=function(){const _0x1818d6=_0x348c4;if(this[_0x1818d6(0x3cc)]===undefined)this['initMessageCore']();if(this[_0x1818d6(0x3cc)][_0x1818d6(0xdc)]===undefined)this[_0x1818d6(0x33a)]();return this['_MessageCoreSettings'][_0x1818d6(0xdc)];},Game_System[_0x348c4(0xf4)][_0x348c4(0x488)]=function(_0x1e4bf6){const _0x96b22e=_0x348c4;if(this['_MessageCoreSettings']===undefined)this[_0x96b22e(0x33a)]();if(this['_MessageCoreSettings'][_0x96b22e(0xdc)]===undefined)this[_0x96b22e(0x33a)]();this[_0x96b22e(0x3cc)]['messageRows']=_0x1e4bf6||0x1;},Game_System[_0x348c4(0xf4)][_0x348c4(0x139)]=function(){const _0x31a6ee=_0x348c4;if(this[_0x31a6ee(0x3cc)]===undefined)this[_0x31a6ee(0x33a)]();if(this[_0x31a6ee(0x3cc)][_0x31a6ee(0x1db)]===undefined)this[_0x31a6ee(0x33a)]();return this[_0x31a6ee(0x3cc)]['messageWidth'];},Game_System[_0x348c4(0xf4)][_0x348c4(0x16a)]=function(_0xb1c8d8){const _0xf7aa=_0x348c4;if(this[_0xf7aa(0x3cc)]===undefined)this[_0xf7aa(0x33a)]();if(this[_0xf7aa(0x3cc)]['messageWidth']===undefined)this[_0xf7aa(0x33a)]();_0xb1c8d8=Math[_0xf7aa(0xd9)](_0xb1c8d8);if(_0xb1c8d8%0x2!==0x0)_0xb1c8d8+=0x1;this[_0xf7aa(0x3cc)][_0xf7aa(0x1db)]=_0xb1c8d8||0x2;},Game_System[_0x348c4(0xf4)][_0x348c4(0x2db)]=function(){const _0x231f4e=_0x348c4;if(this[_0x231f4e(0x3cc)]===undefined)this[_0x231f4e(0x33a)]();if(this[_0x231f4e(0x3cc)]['messageWordWrap']===undefined)this[_0x231f4e(0x33a)]();return this[_0x231f4e(0x3cc)][_0x231f4e(0x2e5)];},Game_System['prototype'][_0x348c4(0x268)]=function(_0x592756){const _0x7be45e=_0x348c4;if(this['_MessageCoreSettings']===undefined)this[_0x7be45e(0x33a)]();if(this['_MessageCoreSettings'][_0x7be45e(0x2e5)]===undefined)this['initMessageCore']();this[_0x7be45e(0x3cc)][_0x7be45e(0x2e5)]=_0x592756;},Game_System[_0x348c4(0xf4)][_0x348c4(0x174)]=function(){const _0x139d30=_0x348c4;if(this[_0x139d30(0xf7)]===undefined){const _0x1ef9ca=VisuMZ[_0x139d30(0x166)]['Settings']['General'];this[_0x139d30(0xf7)]=_0x1ef9ca[_0x139d30(0x244)],this[_0x139d30(0x113)]=_0x1ef9ca['MsgWindowOffsetY'];}return{'x':this[_0x139d30(0xf7)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System['prototype']['setMessageWindowXyOffsets']=function(_0x5d3e51,_0x34a874){const _0x406365=_0x348c4;if(this['_MessageCoreSettings']===undefined)this[_0x406365(0x33a)]();this[_0x406365(0xf7)]=_0x5d3e51,this[_0x406365(0x113)]=_0x34a874;},Game_System['prototype'][_0x348c4(0x1e3)]=function(){const _0x40524f=_0x348c4;if(this[_0x40524f(0x3cc)]===undefined)this[_0x40524f(0x33a)]();if(this[_0x40524f(0x3cc)][_0x40524f(0x48c)]===undefined)this[_0x40524f(0x33a)]();return this[_0x40524f(0x3cc)][_0x40524f(0x48c)];},Game_System[_0x348c4(0xf4)]['setHelpWindowWordWrap']=function(_0x56d6d5){const _0x283d65=_0x348c4;if(this['_MessageCoreSettings']===undefined)this[_0x283d65(0x33a)]();if(this[_0x283d65(0x3cc)]['helpWordWrap']===undefined)this['initMessageCore']();this[_0x283d65(0x3cc)][_0x283d65(0x48c)]=_0x56d6d5;},Game_System[_0x348c4(0xf4)][_0x348c4(0xda)]=function(){const _0x5a77f0=_0x348c4;if(this[_0x5a77f0(0x3cc)]===undefined)this[_0x5a77f0(0x33a)]();if(this[_0x5a77f0(0x3cc)][_0x5a77f0(0x1e5)]===undefined)this['initMessageCore']();return this[_0x5a77f0(0x3cc)][_0x5a77f0(0x1e5)];},Game_System[_0x348c4(0xf4)]['setChoiceListLineHeight']=function(_0x378422){const _0x1bbe45=_0x348c4;if(this[_0x1bbe45(0x3cc)]===undefined)this[_0x1bbe45(0x33a)]();if(this[_0x1bbe45(0x3cc)][_0x1bbe45(0x1e5)]===undefined)this[_0x1bbe45(0x33a)]();this[_0x1bbe45(0x3cc)][_0x1bbe45(0x1e5)]=_0x378422||0x1;},Game_System[_0x348c4(0xf4)][_0x348c4(0x1e7)]=function(){const _0x36d70d=_0x348c4;if(this[_0x36d70d(0x3cc)]===undefined)this[_0x36d70d(0x33a)]();return this[_0x36d70d(0x3cc)][_0x36d70d(0x13f)]??0x60;},Game_System[_0x348c4(0xf4)][_0x348c4(0x267)]=function(_0x3c5c6a){const _0x267220=_0x348c4;if(this[_0x267220(0x3cc)]===undefined)this[_0x267220(0x33a)]();this[_0x267220(0x3cc)][_0x267220(0x13f)]=_0x3c5c6a||0x0;},Game_System[_0x348c4(0xf4)][_0x348c4(0x19e)]=function(){const _0x435464=_0x348c4;if(this[_0x435464(0x3cc)]===undefined)this[_0x435464(0x33a)]();if(this[_0x435464(0x3cc)][_0x435464(0x187)]===undefined)this[_0x435464(0x33a)]();return this[_0x435464(0x3cc)][_0x435464(0x187)];},Game_System[_0x348c4(0xf4)][_0x348c4(0x1f3)]=function(_0x3f7672){const _0x34808d=_0x348c4;if(this[_0x34808d(0x3cc)]===undefined)this[_0x34808d(0x33a)]();if(this[_0x34808d(0x3cc)]['choiceRows']===undefined)this['initMessageCore']();this[_0x34808d(0x3cc)][_0x34808d(0x187)]=_0x3f7672||0x1;},Game_System[_0x348c4(0xf4)][_0x348c4(0x288)]=function(){const _0x36d479=_0x348c4;if(this[_0x36d479(0x3cc)]===undefined)this[_0x36d479(0x33a)]();if(this[_0x36d479(0x3cc)][_0x36d479(0x3f7)]===undefined)this[_0x36d479(0x33a)]();return this[_0x36d479(0x3cc)][_0x36d479(0x3f7)];},Game_System[_0x348c4(0xf4)][_0x348c4(0x353)]=function(_0x83c012){const _0x54b8c3=_0x348c4;if(this[_0x54b8c3(0x3cc)]===undefined)this[_0x54b8c3(0x33a)]();if(this[_0x54b8c3(0x3cc)][_0x54b8c3(0x3f7)]===undefined)this['initMessageCore']();this[_0x54b8c3(0x3cc)]['choiceCols']=_0x83c012||0x1;},Game_System['prototype'][_0x348c4(0x1c9)]=function(){const _0x274666=_0x348c4;if(this[_0x274666(0x3cc)]===undefined)this[_0x274666(0x33a)]();if(this[_0x274666(0x3cc)][_0x274666(0x155)]===undefined)this[_0x274666(0x33a)]();return this['_MessageCoreSettings']['choiceTextAlign'];},Game_System[_0x348c4(0xf4)][_0x348c4(0xe7)]=function(_0x2b2587){const _0x2af9c4=_0x348c4;if(this[_0x2af9c4(0x3cc)]===undefined)this[_0x2af9c4(0x33a)]();if(this[_0x2af9c4(0x3cc)][_0x2af9c4(0x155)]===undefined)this['initMessageCore']();this[_0x2af9c4(0x3cc)]['choiceTextAlign']=_0x2b2587[_0x2af9c4(0x367)]();},Game_System['prototype'][_0x348c4(0x436)]=function(){const _0x13fb4a=_0x348c4;if(this[_0x13fb4a(0x3cc)]===undefined)this[_0x13fb4a(0x33a)]();return this[_0x13fb4a(0x3cc)][_0x13fb4a(0x37f)]||0x0;},Game_System[_0x348c4(0xf4)][_0x348c4(0x482)]=function(_0x2deeb5){const _0x51a0de=_0x348c4;if(this['_MessageCoreSettings']===undefined)this[_0x51a0de(0x33a)]();this['_MessageCoreSettings'][_0x51a0de(0x37f)]=_0x2deeb5||0x0;},Game_Message[_0x348c4(0xf4)]['setWeaponChoice']=function(_0x5b97a8,_0x46d157){const _0x17d65c=_0x348c4;this['_itemChoiceVariableId']=_0x5b97a8,this[_0x17d65c(0x466)]=_0x17d65c(0x397),this[_0x17d65c(0x2ea)]=_0x46d157,this[_0x17d65c(0x2bc)]=0x0;},Game_Message[_0x348c4(0xf4)]['itemChoiceWtypeId']=function(){return this['_itemChoiceWtypeId']||0x0;},Game_Message[_0x348c4(0xf4)]['setArmorChoice']=function(_0x240ef0,_0xaee920,_0x22d968){const _0x33e183=_0x348c4;this[_0x33e183(0x339)]=_0x240ef0,this[_0x33e183(0x466)]='armor',this[_0x33e183(0x2e7)]=_0xaee920,this[_0x33e183(0x2bc)]=_0x22d968;},Game_Message[_0x348c4(0xf4)][_0x348c4(0x3e0)]=function(){const _0x50b80e=_0x348c4;return this[_0x50b80e(0x2e7)]||0x0;},Game_Message[_0x348c4(0xf4)][_0x348c4(0x33b)]=function(){const _0x290ae2=_0x348c4;return this[_0x290ae2(0x2bc)]||0x0;},Game_Message[_0x348c4(0xf4)][_0x348c4(0x1ac)]=function(_0x2bc5b9,_0x5548c7,_0x362c98){const _0x1568ae=_0x348c4;this[_0x1568ae(0x339)]=_0x2bc5b9,this[_0x1568ae(0x466)]=_0x1568ae(0x409),this['_itemChoiceActorId']=_0x5548c7,this[_0x1568ae(0xf5)]=_0x362c98;},Game_Message[_0x348c4(0xf4)][_0x348c4(0x1cc)]=function(){const _0x59c61f=_0x348c4;return this[_0x59c61f(0x336)]||0x0;},Game_Message[_0x348c4(0xf4)]['itemChoiceActor']=function(){const _0x588b4b=_0x348c4;return $gameActors[_0x588b4b(0x124)](this[_0x588b4b(0x1cc)]())||$gameParty[_0x588b4b(0x35a)]()||null;},Game_Message[_0x348c4(0xf4)][_0x348c4(0x479)]=function(){const _0x10492e=_0x348c4;return this[_0x10492e(0xf5)]||0x0;},VisuMZ[_0x348c4(0x166)][_0x348c4(0x2c9)]=Game_Message[_0x348c4(0xf4)]['setChoices'],Game_Message['prototype']['setChoices']=function(_0x5226b2,_0x17d6c9,_0x537081){const _0x454161=_0x348c4;this['_scriptCall']=!![],VisuMZ['MessageCore'][_0x454161(0x2c9)][_0x454161(0x290)](this,_0x5226b2,_0x17d6c9,_0x537081);},Game_Message[_0x348c4(0xf4)][_0x348c4(0x16c)]=function(){const _0x1e0b21=_0x348c4;this[_0x1e0b21(0xcc)]=![],this[_0x1e0b21(0x21c)]=[];const _0x354f36=this[_0x1e0b21(0x346)][_0x1e0b21(0x3f1)];this[_0x1e0b21(0x3f5)]=_0x354f36;let _0x5e5cc6=![];for(let _0x525952=0x0;_0x525952<_0x354f36;_0x525952++){let _0x492569=this[_0x1e0b21(0x346)][_0x525952];_0x492569['match'](/<SHUFFLE>/gi)&&(_0x5e5cc6=!![],_0x492569=_0x492569[_0x1e0b21(0x2f2)](/<SHUFFLE>/gi,'')),_0x492569[_0x1e0b21(0xcf)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x5e5cc6=!![],this[_0x1e0b21(0x3f5)]=Math['min'](Number(RegExp['$1']),this['_maxShuffleChoices']),_0x492569=_0x492569[_0x1e0b21(0x2f2)](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x492569['match'](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x5e5cc6=!![],this['_maxShuffleChoices']=Math[_0x1e0b21(0x2e0)]($gameVariables['value'](Number(RegExp['$1']))||0x1,this['_maxShuffleChoices']),_0x492569=_0x492569[_0x1e0b21(0x2f2)](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this[_0x1e0b21(0x21c)][_0x1e0b21(0x122)](_0x525952),this['_choices'][_0x525952]=_0x492569;}if(_0x5e5cc6){this[_0x1e0b21(0x21c)]=VisuMZ['MessageCore']['ShuffleArray'](this[_0x1e0b21(0x21c)]);if(this[_0x1e0b21(0x2ac)]()!==-0x2)this['_choiceCancelType']=-0x1;}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x392)]=function(_0x8c40e4){const _0x33351c=_0x348c4;var _0x21501d,_0x72f7e9,_0x5e394c;for(_0x5e394c=_0x8c40e4[_0x33351c(0x3f1)]-0x1;_0x5e394c>0x0;_0x5e394c--){_0x21501d=Math[_0x33351c(0x455)](Math[_0x33351c(0x24f)]()*(_0x5e394c+0x1)),_0x72f7e9=_0x8c40e4[_0x5e394c],_0x8c40e4[_0x5e394c]=_0x8c40e4[_0x21501d],_0x8c40e4[_0x21501d]=_0x72f7e9;}return _0x8c40e4;},Game_Message[_0x348c4(0xf4)][_0x348c4(0x20c)]=function(){const _0x38f7d2=_0x348c4;if(!this[_0x38f7d2(0x21c)])this[_0x38f7d2(0x16c)]();return this[_0x38f7d2(0x21c)];},Game_Message[_0x348c4(0xf4)]['maxShuffleChoices']=function(){const _0x39da10=_0x348c4;if(this['_maxShuffleChoices']===undefined)this[_0x39da10(0x16c)]();return this[_0x39da10(0x3f5)];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x330)]=Game_Screen[_0x348c4(0xf4)][_0x348c4(0x2f5)],Game_Screen[_0x348c4(0xf4)][_0x348c4(0x2f5)]=function(){const _0x3b9ebc=_0x348c4;VisuMZ[_0x3b9ebc(0x166)][_0x3b9ebc(0x330)][_0x3b9ebc(0x290)](this),this[_0x3b9ebc(0xfb)]();},Game_Screen[_0x348c4(0xf4)]['clearAllPictureTexts']=function(){const _0x38767c=_0x348c4;this[_0x38767c(0x2de)]=[],this[_0x38767c(0x248)]=[],this[_0x38767c(0x308)]=[];},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x18b)]=function(_0xb0b88){const _0x4aa024=_0x348c4;if(this[_0x4aa024(0x2de)]===undefined)this[_0x4aa024(0xfb)]();const _0xecbeaa=this[_0x4aa024(0x18e)](_0xb0b88);return this[_0x4aa024(0x2de)][_0xecbeaa]=this['_pictureText'][_0xecbeaa]||{},this[_0x4aa024(0x2de)][_0xecbeaa];},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x450)]=function(_0x200f13,_0x52cf20){const _0x480759=_0x348c4;return _0x52cf20=_0x52cf20[_0x480759(0x367)]()[_0x480759(0x23e)](),this['getPictureTextData'](_0x200f13)[_0x52cf20]||'';},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x47a)]=function(_0x3c0463,_0x4d8346,_0x207f1c){const _0xd162c6=_0x348c4;_0x207f1c=_0x207f1c[_0xd162c6(0x367)]()[_0xd162c6(0x23e)](),this[_0xd162c6(0x18b)](_0x3c0463)[_0x207f1c]=_0x4d8346||'',this['requestPictureTextRefresh'](_0x3c0463,!![]);},Game_Screen['prototype']['eraseAllPictureTexts']=function(_0x34857f){const _0x1cc2f9=_0x348c4;if(this[_0x1cc2f9(0x2de)]===undefined)this[_0x1cc2f9(0xfb)]();const _0x3fdddc=this['realPictureId'](_0x34857f);this[_0x1cc2f9(0x2de)][_0x3fdddc]=null,this[_0x1cc2f9(0x23d)](_0x34857f,!![]);},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x243)]=function(_0x1911c0){const _0x3227ee=_0x348c4;if(this['_pictureText']===undefined)this[_0x3227ee(0xfb)]();const _0x3d9de2=this[_0x3227ee(0x18e)](_0x1911c0);return this[_0x3227ee(0x248)][_0x3d9de2]||0x0;},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x304)]=function(_0x44ec8b,_0x1d6def){const _0x2d899b=_0x348c4;if(this[_0x2d899b(0x2de)]===undefined)this[_0x2d899b(0xfb)]();const _0x1b52c0=this[_0x2d899b(0x18e)](_0x44ec8b);this[_0x2d899b(0x248)][_0x1b52c0]=Math[_0x2d899b(0x32c)](0x0,_0x1d6def);},Game_Screen[_0x348c4(0xf4)]['erasePictureTextBuffer']=function(_0x35262f){const _0x1b52ff=_0x348c4;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0x1cb47d=this['realPictureId'](_0x35262f);this[_0x1b52ff(0x248)][_0x1cb47d]=undefined;},VisuMZ[_0x348c4(0x166)][_0x348c4(0x414)]=Game_Screen[_0x348c4(0xf4)][_0x348c4(0x120)],Game_Screen[_0x348c4(0xf4)][_0x348c4(0x120)]=function(_0x8a87a2){const _0x23510e=_0x348c4;VisuMZ[_0x23510e(0x166)][_0x23510e(0x414)]['call'](this,_0x8a87a2),this[_0x23510e(0x237)](_0x8a87a2),this[_0x23510e(0x16e)](_0x8a87a2),this['requestPictureTextRefresh'](_0x8a87a2,!![]);},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x208)]=function(){const _0x298f2d=_0x348c4;for(const _0x15271e of this[_0x298f2d(0x445)]){if(_0x15271e){let _0x48eaae=this[_0x298f2d(0x445)]['indexOf'](_0x15271e);this[_0x298f2d(0x23d)](_0x48eaae);}}},Game_Screen[_0x348c4(0xf4)]['requestPictureTextRefresh']=function(_0x3690da,_0x591e41){const _0x1e0747=_0x348c4;this[_0x1e0747(0x308)]=this[_0x1e0747(0x308)]||[],(this[_0x1e0747(0x2c5)](_0x3690da)||_0x591e41)&&this['_pictureTextRefresh'][_0x1e0747(0x122)](_0x3690da);},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x39e)]=function(_0x36e555){const _0x431d47=_0x348c4;return this['_pictureTextRefresh']=this[_0x431d47(0x308)]||[],this[_0x431d47(0x308)][_0x431d47(0xc2)](_0x36e555);},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x1f1)]=function(_0x29a3a5){const _0x2e7e68=_0x348c4;this[_0x2e7e68(0x308)]=this[_0x2e7e68(0x308)]||[],this[_0x2e7e68(0x308)][_0x2e7e68(0x47d)](_0x29a3a5);},Game_Screen[_0x348c4(0xf4)][_0x348c4(0x2c5)]=function(_0x286122){const _0x368853=_0x348c4,_0x991765=[_0x368853(0x484),'up',_0x368853(0x37e),_0x368853(0x26b),_0x368853(0x492),_0x368853(0x19a),'lowerleft',_0x368853(0x22a),_0x368853(0x3c4)];return _0x991765[_0x368853(0x253)](_0x483f7c=>this[_0x368853(0x450)](_0x286122,_0x483f7c)!=='');},VisuMZ[_0x348c4(0x166)][_0x348c4(0x1e2)]=Game_Party[_0x348c4(0xf4)][_0x348c4(0x467)],Game_Party['prototype']['initialize']=function(){const _0x305882=_0x348c4;VisuMZ[_0x305882(0x166)][_0x305882(0x1e2)][_0x305882(0x290)](this),this[_0x305882(0x33a)]();},Game_Party['prototype'][_0x348c4(0x33a)]=function(){const _0xd29784=_0x348c4;this[_0xd29784(0x2df)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x348c4(0xf4)][_0x348c4(0x315)]=function(){const _0x37d1bc=_0x348c4;if(this[_0x37d1bc(0x2df)]===undefined)this[_0x37d1bc(0x33a)]();return this[_0x37d1bc(0x2df)];},Game_Party[_0x348c4(0xf4)][_0x348c4(0x185)]=function(_0x478d4a,_0x397c9a){const _0x1a6c6a=_0x348c4;if(this['_lastGainedItemData']===undefined)this[_0x1a6c6a(0x33a)]();if(!_0x478d4a)return;if(DataManager[_0x1a6c6a(0x238)](_0x478d4a))this[_0x1a6c6a(0x2df)][_0x1a6c6a(0x477)]=0x0;else{if(DataManager[_0x1a6c6a(0x383)](_0x478d4a))this['_lastGainedItemData'][_0x1a6c6a(0x477)]=0x1;else DataManager[_0x1a6c6a(0x1d3)](_0x478d4a)&&(this['_lastGainedItemData'][_0x1a6c6a(0x477)]=0x2);}this[_0x1a6c6a(0x2df)]['id']=_0x478d4a['id'],this[_0x1a6c6a(0x2df)]['quantity']=_0x397c9a;},VisuMZ[_0x348c4(0x166)][_0x348c4(0x220)]=Game_Party['prototype'][_0x348c4(0xf9)],Game_Party[_0x348c4(0xf4)][_0x348c4(0xf9)]=function(_0x3afee9,_0x1dba92,_0xdd533e){const _0x3b6f2c=_0x348c4;VisuMZ[_0x3b6f2c(0x166)][_0x3b6f2c(0x220)][_0x3b6f2c(0x290)](this,_0x3afee9,_0x1dba92,_0xdd533e),_0x1dba92>0x0&&this[_0x3b6f2c(0x185)](_0x3afee9,_0x1dba92);},VisuMZ[_0x348c4(0x166)]['Game_Map_initialize']=Game_Map['prototype'][_0x348c4(0x467)],Game_Map[_0x348c4(0xf4)][_0x348c4(0x467)]=function(){const _0x30b7f2=_0x348c4;VisuMZ[_0x30b7f2(0x166)][_0x30b7f2(0x320)]['call'](this),this[_0x30b7f2(0x48b)]=[];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x428)]=Game_Map[_0x348c4(0xf4)][_0x348c4(0x1df)],Game_Map['prototype'][_0x348c4(0x1df)]=function(){const _0x1411e2=_0x348c4;VisuMZ[_0x1411e2(0x166)][_0x1411e2(0x428)][_0x1411e2(0x290)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x348c4(0x166)]['Game_Map_updateEvents']=Game_Map['prototype'][_0x348c4(0x184)],Game_Map['prototype'][_0x348c4(0x184)]=function(){const _0x5bdf65=_0x348c4;VisuMZ[_0x5bdf65(0x166)]['Game_Map_updateEvents'][_0x5bdf65(0x290)](this),this[_0x5bdf65(0x239)]();},Game_Map[_0x348c4(0xf4)][_0x348c4(0x429)]=function(_0x18b7f6){const _0x30d439=_0x348c4;if(!$dataCommonEvents[_0x18b7f6])return;this[_0x30d439(0x48b)]=this[_0x30d439(0x48b)]||[];const _0x4a62b8=this['_interpreter']['_eventId'],_0x14e3c=new Game_MessageCommonEvent(_0x18b7f6,_0x4a62b8);this['_messageCommonEvents'][_0x30d439(0x122)](_0x14e3c);},Game_Map['prototype']['updateMessageCommonEvents']=function(){const _0x2db18a=_0x348c4;this['_messageCommonEvents']=this[_0x2db18a(0x48b)]||[];for(const _0x2617bd of this[_0x2db18a(0x48b)]){!_0x2617bd[_0x2db18a(0x47b)]?this[_0x2db18a(0x48b)][_0x2db18a(0x47d)](_0x2617bd):_0x2617bd[_0x2db18a(0x49f)]();}},VisuMZ['MessageCore']['Game_Map_refresh']=Game_Map[_0x348c4(0xf4)][_0x348c4(0x159)],Game_Map[_0x348c4(0xf4)][_0x348c4(0x159)]=function(){const _0x569974=_0x348c4;VisuMZ[_0x569974(0x166)][_0x569974(0x45e)][_0x569974(0x290)](this),$gameScreen[_0x569974(0x208)]();},Game_Interpreter[_0x348c4(0x183)]=pluginData[_0x348c4(0x438)],Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x265)]=function(_0x1bfc59){const _0x1456e4=_0x348c4;if($gameMessage[_0x1456e4(0x2c1)]())return![];return this['prepareShowTextCommand'](_0x1bfc59),this['addContinuousShowTextCommands'](_0x1bfc59),this[_0x1456e4(0xfd)](_0x1bfc59),this['setWaitMode']('message'),!![];},Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x11a)]=function(_0x28003a){const _0x20ab45=_0x348c4;$gameMessage[_0x20ab45(0x131)](_0x28003a[0x0],_0x28003a[0x1]),$gameMessage[_0x20ab45(0x1b4)](_0x28003a[0x2]),$gameMessage[_0x20ab45(0x2b5)](_0x28003a[0x3]),$gameMessage[_0x20ab45(0x247)](_0x28003a[0x4]);},Game_Interpreter[_0x348c4(0xf4)]['addContinuousShowTextCommands']=function(_0x5b81c0){const _0x2000bc=_0x348c4;while(this['isContinuePrepareShowTextCommands']()){this['_index']++;if(this[_0x2000bc(0x27b)]()[_0x2000bc(0x3e6)]===0x191){let _0x360c81=this[_0x2000bc(0x27b)]()[_0x2000bc(0x134)][0x0];_0x360c81=VisuMZ[_0x2000bc(0x166)][_0x2000bc(0x3dd)](_0x360c81),$gameMessage[_0x2000bc(0x473)](_0x360c81);}if(this[_0x2000bc(0x218)]())break;}},Game_Interpreter['prototype'][_0x348c4(0x3c3)]=function(){const _0x4cea75=_0x348c4;return this[_0x4cea75(0x264)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this['nextEventCode']()===0x191;},VisuMZ[_0x348c4(0x166)][_0x348c4(0x3dd)]=function(_0x1d07ee){const _0x34e714=_0x348c4,_0x2839f0=VisuMZ[_0x34e714(0x166)]['Settings'][_0x34e714(0x2fa)];return _0x1d07ee=(_0x2839f0[_0x34e714(0x29c)]||'')+_0x1d07ee+(_0x2839f0[_0x34e714(0x258)]||''),_0x1d07ee=_0x1d07ee[_0x34e714(0x2f2)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x1d07ee=_0x1d07ee[_0x34e714(0x2f2)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x5e987d,_0x10c55e)=>this[_0x34e714(0x1fb)](_0x10c55e)),_0x1d07ee;},VisuMZ['MessageCore']['getRandomTextFromPool']=function(_0x29d8d4){const _0x57f0b1=_0x348c4,_0x1566dd=_0x29d8d4[_0x57f0b1(0x496)]('|')[_0x57f0b1(0x144)](_0x415107=>_0x415107['trim']())[_0x57f0b1(0x47d)]('')[_0x57f0b1(0x47d)](null);return _0x1566dd[Math[_0x57f0b1(0x142)](_0x1566dd['length'])];},Game_Interpreter['prototype'][_0x348c4(0x218)]=function(){const _0x13e037=_0x348c4;if(this[_0x13e037(0x27b)]()&&this[_0x13e037(0x27b)]()['parameters'][0x0][_0x13e037(0xcf)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x13e037(0x182)][_0x13e037(0x3f1)]>=$gameSystem[_0x13e037(0x1f6)]()&&this[_0x13e037(0x264)]()!==0x191;},Game_Interpreter[_0x348c4(0xf4)]['prepareShowTextFollowups']=function(_0x34093f){const _0x8f6817=_0x348c4;switch(this['nextEventCode']()){case 0x66:this['_index']++,this[_0x8f6817(0xe1)](this[_0x8f6817(0x27b)]()[_0x8f6817(0x134)]);break;case 0x67:this[_0x8f6817(0xfc)]++,this[_0x8f6817(0x1a3)](this['currentCommand']()[_0x8f6817(0x134)]);break;case 0x68:this[_0x8f6817(0xfc)]++,this[_0x8f6817(0x39b)](this[_0x8f6817(0x27b)]()[_0x8f6817(0x134)]);break;case 0x165:const _0x4c4082=this[_0x8f6817(0x38a)][this[_0x8f6817(0xfc)]+0x1],_0xa8448c=_0x4c4082[_0x8f6817(0x134)];_0xa8448c[0x0]===Game_Interpreter['MESSAGE_CORE_PLUGIN_NAME']&&this[_0x8f6817(0x347)](_0xa8448c);break;}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x30f)]=Game_Interpreter['prototype'][_0x348c4(0xe1)],Game_Interpreter[_0x348c4(0xf4)]['setupChoices']=function(_0x3bbf5c){const _0x105272=_0x348c4;_0x3bbf5c=this['addContinuousShowChoices'](),VisuMZ[_0x105272(0x166)][_0x105272(0x30f)][_0x105272(0x290)](this,_0x3bbf5c),$gameMessage[_0x105272(0x16c)]();},Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x2c0)]=function(){const _0x4ec0b3=_0x348c4,_0x2a1f77=this[_0x4ec0b3(0xfc)],_0x898d5=[];let _0x264d2f=0x0;this[_0x4ec0b3(0xfc)]++;while(this[_0x4ec0b3(0xfc)]<this[_0x4ec0b3(0x38a)][_0x4ec0b3(0x3f1)]){if(this[_0x4ec0b3(0x27b)]()[_0x4ec0b3(0x3a4)]===this['_indent']){if(this['currentCommand']()[_0x4ec0b3(0x3e6)]===0x194&&this[_0x4ec0b3(0x264)]()!==0x66)break;else{if(this['currentCommand']()[_0x4ec0b3(0x3e6)]===0x66)this['adjustShowChoiceExtension'](_0x264d2f,this['currentCommand'](),_0x2a1f77),this[_0x4ec0b3(0xfc)]-=0x2;else this['currentCommand']()[_0x4ec0b3(0x3e6)]===0x192&&(this['currentCommand']()['parameters'][0x0]=_0x264d2f,_0x264d2f++);}}this[_0x4ec0b3(0xfc)]++;}return this[_0x4ec0b3(0xfc)]=_0x2a1f77,this[_0x4ec0b3(0x27b)]()[_0x4ec0b3(0x134)];},Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x224)]=function(_0x9c168b,_0x5b299e,_0x10d3cf){const _0x5f6460=_0x348c4;this['adjustShowChoiceDefault'](_0x9c168b,_0x5b299e,_0x10d3cf),this['adjustShowChoiceCancel'](_0x9c168b,_0x5b299e,_0x10d3cf),this[_0x5f6460(0x3b9)](_0x5b299e,_0x10d3cf);},Game_Interpreter['prototype'][_0x348c4(0x255)]=function(_0x5a13c3,_0x3708d5,_0x3e0124){const _0x236f94=_0x348c4;if(_0x3708d5[_0x236f94(0x134)][0x2]<0x0)return;const _0x3f957f=_0x3708d5[_0x236f94(0x134)][0x2]+_0x5a13c3;this[_0x236f94(0x38a)][_0x3e0124][_0x236f94(0x134)][0x2]=_0x3f957f;},Game_Interpreter['prototype'][_0x348c4(0x2be)]=function(_0x5ebc69,_0x350ab3,_0x486d88){const _0x48e2e3=_0x348c4;if(_0x350ab3[_0x48e2e3(0x134)][0x1]>=0x0){var _0x4cd0f6=_0x350ab3[_0x48e2e3(0x134)][0x1]+_0x5ebc69;this['_list'][_0x486d88]['parameters'][0x1]=_0x4cd0f6;}else _0x350ab3[_0x48e2e3(0x134)][0x1]===-0x2&&(this['_list'][_0x486d88]['parameters'][0x1]=_0x350ab3['parameters'][0x1]);},Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x3b9)]=function(_0x187356,_0x40418b){const _0x4c09d9=_0x348c4;for(const _0x5cdb40 of _0x187356[_0x4c09d9(0x134)][0x0]){this[_0x4c09d9(0x38a)][_0x40418b]['parameters'][0x0][_0x4c09d9(0x122)](_0x5cdb40);}this[_0x4c09d9(0x38a)][_0x4c09d9(0x241)](this[_0x4c09d9(0xfc)]-0x1,0x2);},Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x347)]=function(_0x3ef933){const _0x2847e7=_0x348c4,_0x2a0315=_0x3ef933[0x1];if(_0x2a0315===_0x2847e7(0x27f))this['_index']++,this['setWeaponChoice'](_0x3ef933);else{if(_0x2a0315===_0x2847e7(0x2af))this[_0x2847e7(0xfc)]++,this['setArmorChoice'](_0x3ef933);else _0x2a0315===_0x2847e7(0x1f0)&&Imported[_0x2847e7(0x273)]&&(this[_0x2847e7(0xfc)]++,this[_0x2847e7(0x1ac)](_0x3ef933));}},Game_Interpreter[_0x348c4(0xf4)][_0x348c4(0x2b1)]=function(_0x109639){const _0x36ad4e=_0x348c4,_0x121383=JSON['parse'](JSON['stringify'](_0x109639[0x3]));VisuMZ[_0x36ad4e(0x30a)](_0x121383,_0x121383),$gameMessage[_0x36ad4e(0x2b1)](_0x121383['VariableID']||0x0,_0x121383[_0x36ad4e(0x418)]||0x0);},Game_Interpreter['prototype']['setArmorChoice']=function(_0x6b6fe9){const _0x2b3d7e=_0x348c4,_0x52ac10=JSON[_0x2b3d7e(0x10a)](JSON[_0x2b3d7e(0x2d4)](_0x6b6fe9[0x3]));VisuMZ['ConvertParams'](_0x52ac10,_0x52ac10),$gameMessage['setArmorChoice'](_0x52ac10['VariableID']||0x0,_0x52ac10[_0x2b3d7e(0x15c)]||0x0,_0x52ac10[_0x2b3d7e(0x2a1)]||0x0);},Game_Interpreter['prototype'][_0x348c4(0x1ac)]=function(_0xe5db31){const _0x575504=_0x348c4,_0xb3c1ea=JSON[_0x575504(0x10a)](JSON[_0x575504(0x2d4)](_0xe5db31[0x3]));VisuMZ[_0x575504(0x30a)](_0xb3c1ea,_0xb3c1ea),$gameMessage[_0x575504(0x1ac)](_0xb3c1ea[_0x575504(0x25d)]||0x0,_0xb3c1ea[_0x575504(0x379)]||0x0,_0xb3c1ea[_0x575504(0x10b)]||0x0);};function _0x1c33(){const _0x344932=['startPause','_targets','getChoiceMessageDistance','actorName','name','DefaultLocale','COMMONEVENT','WRAPBREAK','AutoColorRegExp','windowX','updateAutoPosition','Polish','MaxRows','levelUp','EndPadding','_textAlignment','makeItemList','_pictures','switchOutTextForLocalization','Ha\x20det','lowercenter','สวัสดี','AddAutoColor','isOpen','findTargetSprite','process_VisuMZ_MessageCore_TextMacros','contentsHeight','itemChoiceItypeId','getPictureText','openness','ExtraEnemyDrops','507248VxsFGU','moveTo','floor','value','lower\x20center','(((','every','innerHeight','setArmorChoice','actorSlotName','updatePictureText','Game_Map_refresh','ITALIC','Window_EventItem_includes','statusText','FontFamily','battleUserName','OffsetX','convertBaseEscapeCharacters','_itemChoiceItypeId','initialize','HelpWindow','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20CSV\x20file?\x0a\x0a','round','text','autoPositionOffsetY','_textCasing','VisuMZ_0_CoreEngine','activate','_eventId','\x1bTEXTALIGNMENT','processTextAlignmentChange','add','resetWordWrap','Greek','textSpeed','type','CENTERPICTURE','itemChoiceStypeId','setPictureText','_interpreter','textColor','remove','moveBy','applyMoveEasing','</WORDWRAP>','shift','setChoiceMessageDistance','itemBackColor1','upperleft','Weapons','Hola','AutoColorBypassList','setMessageWindowRows','<BR>','Actors','_messageCommonEvents','helpWordWrap','grey','white','autoPositionOffsetX','isSkillHidden','convertBackslashCharacters','center','crisisColor','[XX]','You\x20do\x20not\x20have\x20a\x20language\x20CSV\x20set\x20up.\x0a','split','isSceneMap','</COLORLOCK>','Distance','event','isRTL','realignMapName','_refreshPauseSign','setup','update','_nameBoxWindow','TextColor%1','mainFontFace','Bitmap_drawText','안녕히\x20가세요','Unnamed.ttf','includes','Window_Base_changeTextColor','resetRect','TextManager_message','_relativePosition','hide','easeOut','startWait','Undefined','members','_scriptCall','pageup','States','match','apply','\x1bITALIC[1]','createTextState','prepareWordWrapEscapeCharacters','gray','こんにちは','Thai','Hej','<B>','ceil','getChoiceListLineHeight','stretchDimmerSprite','messageRows','NonSupportedTextCodes','updateNameBoxMove','textSizeEx','Scene_Boot_loadGameFonts','setupChoices','LanguageFonts','indexOf','outputWidth','#a186be','_textCasingUpperState','setChoiceListTextAlign','return\x200','test','choice','fallbackFonts','loadCustomFontsMessageCore','down\x20center','maxLines','processCommonEvent','drawCustomBackgroundColor','GET','paintOpacity','#c69c6d','prototype','_itemChoiceStypeId','maxFontSizeInLine','_messageOffsetX','ARRAYJSON','gainItem','changeTextColor','clearAllPictureTexts','_index','prepareShowTextFollowups','Window_Options_isVolumeSymbol','\x1bWrapJpBreak[0]','Halo','addMessageCoreLocalizationCommand','Window_Message_terminateMessage','_currentAutoSize','Window_Message_needsNewPage','attachPictureText','callOkHandler','zoomScale','windowWidth','ParseWeaponNotetags','parse','SkillTypeID','Chinese(Traditional)','さようなら','Width','Salut','ParseEnemyNotetags','#fff799','Window_ChoiceList_windowX','_messageOffsetY','reduce','\x1bCASING[1]','_textColorStack','Portuguese','_lastAltCase','String_format','prepareShowTextCommand','Classes','maxShuffleChoices','onDatabaseLoaded','ChoiceWindowDistance','outlineColor','erasePicture','updateBitmap','push','resetPositionX','actor','ParseItemNotetags','Match','isPressed','maxCols','MessageWindowXyOffsets','Waouh','makeSkillList','up\x20center','map\x20player','itemRect','loadGameFonts','setLastPluginCommandInterpreter','setFaceImage','Enemies','VisuMZ_4_ExtraEnemyDrops','parameters','Γειά\x20σου','Hello','default','_pictureTextSprite','getMessageWindowWidth','yes','escapeStart','CsvFilename','_colorLock','updateOverlappingY','choiceMinWidth','#7cc576','TextCodeReplace','randomInt','isClosing','map','drawText','_messagePositionReset','_textDelay','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_Message_newPage','forEach','resizePictureText','open\x20.\x5cdata','1710459gySkpg','contents','JSON','loadLocalization','fontSize','inBattle','CreateAutoColorRegExpListEntries','Window_Message_isTriggered','choiceTextAlign','CreateAutoColorFor','isVolumeSymbol','slice','refresh','EVAL','</B>','ArmorTypeID','unshift','green','processFontChangeItalic','isColorLocked','convertButtonAssistEscapeCharacters','placeCancelButton','Ουάου','process_VisuMZ_MessageCore_TextCodes_Replace','start\x20.\x5cdata','MessageCore','applyDatabaseAutoColor','drawItemContents','index','setMessageWindowWidth','calcMoveEasing','setupShuffleChoices','SHOW','erasePictureTextBuffer','<%1>','Languages.csv','Dutch','updatePlacement','processStoredAutoColorChanges','getMessageWindowXyOffsets','getChoiceIndent','drawItem','Window_NameBox_updatePlacement','itemChoiceWtypeId','До\x20свидания','_autoSizeCheck','battle\x20party','AddOption','databaseObjectName','height','makeDeepCopy','registerCommand','convertTextAlignmentEscapeCharacters','_texts','MESSAGE_CORE_PLUGIN_NAME','updateEvents','setLastGainedItemData','setText','choiceRows','_messageWindow','Scene_Boot_onDatabaseLoaded','\x1bTEXTALIGNMENT[2]','getPictureTextData','up-center','itemHeight','realPictureId','getInputButtonString','_autoSizeRegexp','lower-right','drawMessageFace','upper-center','easeIn','PictureTextChange','ARRAYSTRUCT','itemRectWithPadding','toUpperCase','WAIT','right','setRelativePosition','processCharacter','onLocalizationXhrError','getChoiceListMaxRows','lower\x20right','11096EaLrCe','createContents','isInputting','setupNumInput','updateMove','downleft','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','equipSlots','rtl','Turkish','processActorNameAutoColorChanges','MessageTextDelay','setSkillChoice','centered','addMessageCoreCommands','process_VisuMZ_MessageCore_TextCodes_Action','changeVolume','WORD_WRAP_PADDING','parseLocalizedText','width','setBackground','Window_Command_addCommand','dirname','textSizeExWordWrap','startY','messagePositionReset','_data','commandSymbol','FontSmallerCap','Window_Message_clearFlags','makeData','getPreservedFontSettings','yellow','Greeting','displayName','Sprite_Picture_updateBitmap','upcenter','Привет','refreshDimmerBitmap','item','StretchDimmedBg','getChoiceListTextAlign','drawTextEx','\x1bTEXTALIGNMENT[1]','itemChoiceActorId','upper-right','preConvertEscapeCharacters','BOLD','clearActorNameAutoColor','_forcedPosition','Type','isArmor','processAutoPosition','ஆஹா','startX','French','Window_Base_update','midcenter','CSV\x20file\x20has\x20not\x20been\x20made.\x0a','messageWidth','\x1bCASING[4]','processWrapBreak','padding','setupEvents','2580230tivMGZ','Scene_Message_createChoiceListWindow','Game_Party_initialize','isHelpWindowWordWrap','Selamat\x20tinggal','choiceLineHeight','ว้าว','getChoiceListMinChoiceWidth','PictureTextRefresh','isTriggered','selectDefault','வணக்கம்','processAutoSize','TextAlign','clearFlags','addCommand','SelectSkill','clearPictureTextRefresh','setHelpWindow','setChoiceListMaxRows','powerUpColor','_moveTargetWidth','getMessageWindowRows','changeOutlineColor','midright','loadDatabase','load','getRandomTextFromPool','<LINE\x20BREAK>','changeChoiceBackgroundColor','choicePositionType','_autoPosRegExp','#ffffff','normalColor','getStartingChoiceWidth','resetTextColor','maxCommands','onProcessCharacter','description','பிரியாவிடை','requestPictureTextRefreshAll','Swedish','Hungarian','LineHeight','choiceIndexArray','constructor','systemColor','strokeRect','exec','isRunning','middleleft','Bengali','mainFontSize','ImageManager_loadBitmap','instantTextSpeed','updateAutoSizePosition','isBreakShowTextCommands','_scene','Hejdå','_resetRect','_choiceIndexArray','\x1bWrapBreak[0]','AutoColor','COLORLOCK','Game_Party_gainItem','Default','Window_Message_synchronizeNameBox','TextMacros','adjustShowChoiceExtension','visuMzTextLocaleStatusText','PictureIDs','ENABLE','upper\x20left','Wah','down','skills','Korean','Guau','addedHeight','Window_ItemList_drawItemNumber','ALL','convertShowChoiceEscapeCodes','TextCodeActions','updateForcedPlacement','blt','Padding','outLineColor','eraseAllPictureTexts','isItem','updateMessageCommonEvents','status','FontChangeValue','armor','requestPictureTextRefresh','trim','overrideMimeType','convertChoiceMacros','splice','SWITCHES','getPictureTextBuffer','MsgWindowOffsetX','isChoiceVisible','_moveDuration','setSpeakerName','_pictureTextBuffer','updateChoiceListHelpWindowPlacement','victory','addWindow','addChildAt','substr','windowPadding','random','Szia','SortObjectByKeyLength','path','some','needsNewPage','adjustShowChoiceDefault','fontFace','isAutoColorAffected','EachMessageEnd','isChoiceEnabled','Window_Base_processControlCharacter','_pictureTextWidth','map\x20party','VariableID','launchMessageCommonEvent','processFontChangeBold','openLocalizationFolder','RelativePXPY','Spanish','callCancelHandler','nextEventCode','command101','TextJS','setChoiceListMinChoiceWidth','setMessageWindowWordWrap','Sbohem','choiceListHelpWindowRect','left','isVisuMzLocalizationEnabled','Window_Options_statusText','updateDimensions','returnPreservedFontSettings','convertHardcodedEscapeReplacements','Olá','72830ZaAJLl','VisuMZ_1_SkillsStatesCore','map\x20event','अलविदा','join','</CENTER>','etypeId','Adiós','Localization','currentCommand','processPyTextCode','Window_Options_addGeneralOptions','_helpWindow','SelectWeapon','WordWrap','CreateAutoColorRegExpLists','newPage','charAt','Cześć','up-left','getLocalizedText','Hallo','getChoiceListMaxColumns','processFailsafeChoice','ওহে','_spriteset','clamp','onload','setColorLock','filter','call','itemPadding','log','Window_Base_textSizeEx','Game_Interpreter_PluginCommand','up\x20right','maxChoiceWidth','convertCasingEscapeCharacters','updateOffsetPosition','obtainEscapeString','lower\x20left','changeTextSpeed','EachMessageStart','NUM','Window_Message_processEscapeCharacter','Game_System_mainFontFace','ChoiceWindowMaxRows','EquipTypeID','itemChoiceActor','getLanguageName','follower','<WORDWRAP>','lower-center','ParseLocalizationCsv','prepareForcedPositionEscapeCharacters','drawBackground','onerror','outlineWidth','choiceCancelType','battle\x20enemy','_pictureTextCache','SelectArmor','requestChoiceBackgroundImage','setWeaponChoice','Settings','makeFontBigger','obtainEscapeParam','setPositionType','MessageWidth','CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','surprise','downright','Window_Message_updatePlacement','visible','_itemChoiceEtypeId','_target','adjustShowChoiceCancel','Game_System_initialize','addContinuousShowChoices','isBusy','processEscapeCharacter','drawTextTopAligned','initTextAlignement','hasPictureText','messageCoreLocalization','clear','Bitmap_drawTextTopAligned','Game_Message_setChoices','gradientFillRect','\x1bCASING[0]','messageCoreTextSpeed','down-right','lower-left','ARRAYNUM','data/','343252xQusKq','bind','drawSkillCost','stringify','textSizeExRaw','\x1bBOLD[1]','नमस्ते','list','partyMemberName','updateRelativePosition','isMessageWindowWordWrap','iconIndex','drawItemNumber','_pictureText','_lastGainedItemData','min','textCodeResult','MessageWindow','<LEFT>','_wholeMoveDuration','messageWordWrap','cancel','_itemChoiceAtypeId','PictureTextErase','Ahoj','_itemChoiceWtypeId','Enable','textCodeCheck','ChoiceWindowProperties','NameBoxWindowDefaultColor','\x1bCOLORLOCK[0]','isPlaytest','advanced','replace','ParseSkillNotetags','middleright','clearPictures','getLastPluginCommandInterpreter','drawBackCenteredPicture','%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.','OffsetY','General','setTextAlignment','Scene_Options_maxCommands','boxHeight','#707070','setTextDelay','setMessageWindowXyOffsets','lastGainedObjectQuantity','Window_ChoiceList','fontBold','setPictureTextBuffer','WRAPJPBREAK','registerResetRect','Uau','_pictureTextRefresh','followers','ConvertParams','midleft','processMessageCoreEscapeActions','convertTextMacros','lineHeight','Game_Interpreter_setupChoices','charCodeAt','processAutoColorWords','processDrawCenteredPicture','child_process','Sprite_Picture_update','getLastGainedItemData','createPictureText','canMove',')))','textLocale','show','MsgWindowOffsetY','Danish','addGeneralOptions','_wordWrap','DataManager_loadDatabase','Game_Map_initialize','addWrapBreakAfterPunctuation','ChoiceWindowMaxCols','convertLockColorsEscapeCharacters','itemBackColor2','TextSpeed','faceWidth','_pictureTextWindow','down\x20right','\x1bITALIC[0]','MaxCols','_autoPositionTarget','max','version','ARRAYSTR','German','Game_Screen_clearPictures','Näkemiin','drawPictureTextZone','onLocalizationXhrLoad','drawPictureText','안녕하세요','_itemChoiceActorId','\x1bCASING[5]','Key','_itemChoiceVariableId','initMessageCore','itemChoiceEtypeId','_macroBypassWordWrap','close','CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','Name','message','obtainItem','getTextAlignment','convertMessageCoreEscapeActions','HIDE','convertButtonAssistText','_choices','prepareShowTextPluginCommandFollowups','Skills','makeCommandListScriptCall','TextStr','SplitJpCnCharacters','NameBoxWindowOffsetX','\x1bCASING[2]','Armors','Items','_moveEasingType','processPreviousColor','Merhaba','setChoiceListMaxColumns','Window_Options_changeVolume','application/csv','setWordWrap','TextColor','VisuMZ_3_ActSeqCamera','choices','leader','Hindi','start','textSpeedStatusText','messageCoreWindowX','Wauw','faceName','postFlushTextState','addedWidth','\x1bI[%1]','ActionJS','currentExt','upper\x20right','toLowerCase','#ffc8e0','\x1bTEXTALIGNMENT[0]','createLocalizationCsvFile','substring','_lastPluginCommandInterpreter','isWordWrapEnabled','open','FontBiggerCap','</I>','Window_NameBox_refresh','drawBackPicture','isSkill','\x5c%1','Do\x20widzenia','parseChoiceText','down\x20left','_positionType','ActorID','postConvertEscapeCharacters','getColor','AdjustRect','_textDelayCount','upperright','choiceDistance','SWITCH','Window_Base_processAllText','registerActorNameAutoColorChanges','isWeapon','_textMacroFound','isSkillTypeMatchForUse','anchorPictureText','flushTextState','onNewPageMessageCore','easeInOut','_list','brown','createChoiceListHelpWindow','ลาก่อน','terminateMessage','processControlCharacter','Norwegian','battle\x20actor','ShuffleArray','Au\x20revoir','addChoiceDistance','VisuMZ_1_EventsMoveCore','defaultColor','weapon','CASING','drawChoiceLocationImage','ARRAYFUNC','setupItemChoice','down-left','changeVisuMzTextLocale','needsPictureTextRefresh','prepareAutoSizeEscapeCharacters','processTextAlignmentX','Instant','Filename','#acacac','indent','Window_ChoiceList_updatePlacement','ChoiceWindowMinWidth','$dataLocalization','processDrawPicture','convertFontSettingsEscapeCharacters','_autoColorActorNames','processNewLine','boxWidth','setWaitMode','anyPictureTextChanges','_moveTargetX','down-center','clearCommandList','_pictureId','exit','_showFast','fontItalic','preemptive','ParseClassNotetags','ConvertDefault','addExtraShowChoices','getCurrentLanguage','_moveTargetY','Window_Base_processEscapeCharacter','<I>','DefaultOutlineWidth','loadBitmap','isSceneBattle','createChoiceListWindow','battleTargetName','isContinuePrepareShowTextCommands','lowerright','calcWindowHeight','Finnish','emerge','violet','changePaintOpacity','convertMessageCoreEscapeReplacements','ConvertTextAutoColorRegExpFriendly','_MessageCoreSettings','defeat','\x1bBOLD[0]','textFont','filename','quantity','ParseStateNotetags','ChoiceWindowTextAlign','_choiceListHelpWindow','outputHeight','getConfigValue','_dimmerSprite','getSkillTypes','upright','orange','anchor','_choiceHelpDescriptions','ParseAddedText','choiceAlignText','makeCommandList','itemChoiceAtypeId','synchronizeNameBox','textSizeExTextAlignment','CustomFonts','processColorLock','scale','code','clearChoiceHelpDescriptions','downcenter','Viszontlátásra','Japanese','UNDEFINED!','clearRect','Wow','drawing','processTextCasing','Hoşça\x20kal','length','NameBoxWindowOffsetY','Hei','Rows','_maxShuffleChoices','applyChoiceHelpDescriptions','choiceCols','innerWidth','Vay','MessageWindowProperties','lowerleft','_moveTargetHeight','loadPicture','English','\x1bi[%1]%2','707646zlKJEc','Вау','LineBreakSpace','upper-left','4711eonSzL','ParseArmorNotetags','battleActionName','_centerMessageWindow','processAllText','skill','STRUCT','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','Window_Base_processNewLine','_pictureTextHeight','commandName','_subject','send','registerSelfEvent','setChoiceListHelpWindow','format','Game_Screen_erasePicture','contentsBack','clampPlacementPosition','enabled','WeaponTypeID','convertVariableEscapeCharacters','Window_Base_initialize','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','Αντίο','\x1bi[%1]','uppercenter','middlecenter','CheckCompatibility','ANY','process_VisuMZ_MessageCore_AutoColor','textWidth','onChoice','map\x20actor','ConfigManager_makeData','Window_ChoiceList_callCancelHandler','Game_Map_setupEvents','addMessageCommonEvent','none','Tot\x20ziens','MinWidth','requestChoiceForegroundImage','up-right','applyData','addLoadListener','sort','\x1bC[%1]%2\x1bPREVCOLOR[0]','Window_Help_refresh'];_0x1c33=function(){return _0x344932;};return _0x1c33();}function Game_MessageCommonEvent(){this['initialize'](...arguments);}Game_MessageCommonEvent[_0x348c4(0xf4)][_0x348c4(0x467)]=function(_0x234b4f,_0x19a374){const _0x35a7c9=_0x348c4;this['_commonEventId']=_0x234b4f,this[_0x35a7c9(0x470)]=_0x19a374||0x0,this[_0x35a7c9(0x159)]();},Game_MessageCommonEvent['prototype'][_0x348c4(0x49a)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x348c4(0xf4)]['list']=function(){const _0x575f14=_0x348c4;return this[_0x575f14(0x49a)]()[_0x575f14(0x2d8)];},Game_MessageCommonEvent[_0x348c4(0xf4)][_0x348c4(0x159)]=function(){const _0x55c475=_0x348c4;this[_0x55c475(0x47b)]=new Game_Interpreter(),this[_0x55c475(0x47b)][_0x55c475(0x49e)](this[_0x55c475(0x2d8)](),this[_0x55c475(0x470)]);},Game_MessageCommonEvent['prototype'][_0x348c4(0x49f)]=function(){const _0x5ab3e2=_0x348c4;this[_0x5ab3e2(0x47b)]&&(this[_0x5ab3e2(0x47b)][_0x5ab3e2(0x211)]()?this[_0x5ab3e2(0x47b)][_0x5ab3e2(0x49f)]():this[_0x5ab3e2(0x2c7)]());},Game_MessageCommonEvent[_0x348c4(0xf4)]['clear']=function(){this['_interpreter']=null;},Scene_Message[_0x348c4(0xf4)]['messageWindowRect']=function(){const _0x452015=_0x348c4,_0x1547fb=Math[_0x452015(0x2e0)](Graphics[_0x452015(0x1b3)],$gameSystem[_0x452015(0x139)]()),_0xdb63b0=$gameSystem['getMessageWindowRows'](),_0x3e54df=this[_0x452015(0x3c5)](_0xdb63b0,![]),_0x4cc1a6=(Graphics['boxWidth']-_0x1547fb)/0x2,_0x1b0e97=0x0;return new Rectangle(_0x4cc1a6,_0x1b0e97,_0x1547fb,_0x3e54df);},VisuMZ['MessageCore'][_0x348c4(0x1e1)]=Scene_Message['prototype']['createChoiceListWindow'],Scene_Message['prototype'][_0x348c4(0x3c1)]=function(){const _0x1ecb18=_0x348c4;VisuMZ['MessageCore'][_0x1ecb18(0x1e1)][_0x1ecb18(0x290)](this),this[_0x1ecb18(0x38c)]();},Scene_Message['prototype'][_0x348c4(0x38c)]=function(){const _0x38afc6=_0x348c4,_0x4cfc80=this[_0x38afc6(0x26a)](),_0x41edf1=new Window_Help(_0x4cfc80);_0x41edf1[_0x38afc6(0xc7)](),this['_choiceListWindow'][_0x38afc6(0x1f2)](_0x41edf1),this[_0x38afc6(0x188)][_0x38afc6(0x412)](_0x41edf1),this[_0x38afc6(0x24b)](_0x41edf1),this[_0x38afc6(0x3d4)]=_0x41edf1;},Scene_Message[_0x348c4(0xf4)]['choiceListHelpWindowRect']=function(){const _0x3282cc=_0x348c4,_0x4d112a=0x0,_0x5d26d4=0x0,_0x4a550a=Graphics[_0x3282cc(0x3ac)],_0x57a1dc=this[_0x3282cc(0x3c5)](0x2,![]);return new Rectangle(_0x4d112a,_0x5d26d4,_0x4a550a,_0x57a1dc);},Window_Message[_0x348c4(0xf4)][_0x348c4(0x412)]=function(_0x10f26e){const _0x5be6f5=_0x348c4;this[_0x5be6f5(0x3d4)]=_0x10f26e;},Window_Message[_0x348c4(0xf4)]['updateChoiceListHelpWindowPlacement']=function(){const _0x241ad1=_0x348c4;if(!this['_choiceListHelpWindow'])return;const _0x2de6b3=this[_0x241ad1(0x3d4)];_0x2de6b3&&(_0x2de6b3['y']=this['y']>0x0?0x0:Graphics[_0x241ad1(0x2fd)]-_0x2de6b3[_0x241ad1(0x17e)]);},VisuMZ['MessageCore'][_0x348c4(0x2fc)]=Scene_Options[_0x348c4(0xf4)][_0x348c4(0x204)],Scene_Options[_0x348c4(0xf4)][_0x348c4(0x204)]=function(){const _0xdceba7=_0x348c4;let _0x2a543f=VisuMZ[_0xdceba7(0x166)]['Scene_Options_maxCommands'][_0xdceba7(0x290)](this);const _0x39a4ec=VisuMZ['MessageCore'][_0xdceba7(0x2b2)];if(_0x39a4ec['TextSpeed'][_0xdceba7(0x37c)]){_0x39a4ec[_0xdceba7(0x27a)][_0xdceba7(0x17c)]&&TextManager[_0xdceba7(0x26c)]()&&_0x2a543f++;if(_0x39a4ec[_0xdceba7(0x325)][_0xdceba7(0x17c)])_0x2a543f++;}return _0x2a543f;},VisuMZ['MessageCore'][_0x348c4(0x1c3)]=Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x121)],Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x121)]=function(){const _0xb474f6=_0x348c4;VisuMZ[_0xb474f6(0x166)]['Sprite_Picture_updateBitmap']['call'](this),this[_0xb474f6(0x316)]();},VisuMZ['MessageCore'][_0x348c4(0x314)]=Sprite_Picture['prototype']['update'],Sprite_Picture[_0x348c4(0xf4)]['update']=function(){const _0x4ba794=_0x348c4;VisuMZ[_0x4ba794(0x166)][_0x4ba794(0x314)][_0x4ba794(0x290)](this),this[_0x4ba794(0x45d)]();},Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x45d)]=function(){const _0x2d61c0=_0x348c4;if(!this[_0x2d61c0(0x2bb)])return;this[_0x2d61c0(0x14b)](),this['anchorPictureText'](),this[_0x2d61c0(0x334)](),this[_0x2d61c0(0x105)]();},Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x316)]=function(){const _0x52a17e=_0x348c4;if(this[_0x52a17e(0x327)])return;if(this[_0x52a17e(0x138)])return;const _0x55287a=new Rectangle(0x0,0x0,0x0,0x0);this[_0x52a17e(0x327)]=new Window_Base(_0x55287a),this['_pictureTextWindow'][_0x52a17e(0x1de)]=0x0,this[_0x52a17e(0x138)]=new Sprite(),this[_0x52a17e(0x24c)](this['_pictureTextSprite'],0x0),this[_0x52a17e(0x25b)]=0x0,this[_0x52a17e(0x40d)]=0x0,this[_0x52a17e(0x2ae)]={};},Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x14b)]=function(){const _0x2969ad=_0x348c4;if(!this[_0x2969ad(0x327)])return;if(this[_0x2969ad(0x25b)]===this[_0x2969ad(0x1b3)]&&this[_0x2969ad(0x40d)]===this['height'])return;this['_pictureTextWidth']=this[_0x2969ad(0x1b3)],this[_0x2969ad(0x40d)]=this['height'],this['_pictureTextCache']={},this[_0x2969ad(0x327)]['move'](0x0,0x0,this['width'],this[_0x2969ad(0x17e)]);},Sprite_Picture['prototype'][_0x348c4(0x386)]=function(){const _0x41e376=_0x348c4;if(!this['_pictureTextSprite'])return;this[_0x41e376(0x138)][_0x41e376(0x3db)]['x']=this[_0x41e376(0x3db)]['x'],this[_0x41e376(0x138)][_0x41e376(0x3db)]['y']=this['anchor']['y'];},Sprite_Picture[_0x348c4(0xf4)]['drawPictureText']=function(){const _0x23995b=_0x348c4;if(!this[_0x23995b(0x327)])return;if(!this[_0x23995b(0x3ae)]())return;const _0x8cfc69=['upperleft','up',_0x23995b(0x37e),'left',_0x23995b(0x492),_0x23995b(0x19a),_0x23995b(0x3fb),_0x23995b(0x22a),'lowerright'];this[_0x23995b(0x327)][_0x23995b(0x1a1)]();for(const _0xe58887 of _0x8cfc69){this[_0x23995b(0x332)](_0xe58887);}},Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x3ae)]=function(){const _0x214162=_0x348c4;if($gameScreen[_0x214162(0x39e)](this[_0x214162(0x3b2)]))return!![];const _0x2694e3=[_0x214162(0x484),'up',_0x214162(0x37e),_0x214162(0x26b),_0x214162(0x492),'right',_0x214162(0x3fb),_0x214162(0x22a),'lowerright'];for(const _0x51766f of _0x2694e3){const _0x2dd3c0=$gameScreen['getPictureText'](this['_pictureId'],_0x51766f);if(this[_0x214162(0x2ae)][_0x51766f]===_0x2dd3c0)continue;return!![];}return![];},Sprite_Picture['prototype']['drawPictureTextZone']=function(_0x46151d){const _0x52ac4f=_0x348c4;$gameScreen[_0x52ac4f(0x1f1)](this['_pictureId']);const _0x4c7996=$gameScreen['getPictureText'](this[_0x52ac4f(0x3b2)],_0x46151d);this[_0x52ac4f(0x2ae)][_0x46151d]=_0x4c7996;const _0x477c6d=this[_0x52ac4f(0x327)][_0x52ac4f(0xdf)](_0x4c7996);let _0x53785a=$gameScreen[_0x52ac4f(0x243)](this[_0x52ac4f(0x3b2)]),_0x1427ea=_0x53785a,_0x392773=_0x53785a;if(['up',_0x52ac4f(0x492),_0x52ac4f(0x22a)][_0x52ac4f(0xc2)](_0x46151d))_0x1427ea=Math[_0x52ac4f(0x455)]((this['width']-_0x477c6d[_0x52ac4f(0x1b3)])/0x2);else[_0x52ac4f(0x37e),_0x52ac4f(0x19a),_0x52ac4f(0x3c4)][_0x52ac4f(0xc2)](_0x46151d)&&(_0x1427ea=Math[_0x52ac4f(0x455)](this[_0x52ac4f(0x1b3)]-_0x477c6d['width']-_0x53785a));if([_0x52ac4f(0x26b),_0x52ac4f(0x492),_0x52ac4f(0x19a)][_0x52ac4f(0xc2)](_0x46151d))_0x392773=Math[_0x52ac4f(0x455)]((this[_0x52ac4f(0x17e)]-_0x477c6d[_0x52ac4f(0x17e)])/0x2);else[_0x52ac4f(0x3fb),_0x52ac4f(0x22a),_0x52ac4f(0x3c4)][_0x52ac4f(0xc2)](_0x46151d)&&(_0x392773=Math[_0x52ac4f(0x455)](this['height']-_0x477c6d[_0x52ac4f(0x17e)]-_0x53785a));this[_0x52ac4f(0x327)][_0x52ac4f(0x1ca)](_0x4c7996,_0x1427ea,_0x392773);},Sprite_Picture[_0x348c4(0xf4)][_0x348c4(0x105)]=function(){const _0x4fa199=_0x348c4;if(!this['_pictureTextWindow'])return;if(!this[_0x4fa199(0x138)])return;this[_0x4fa199(0x138)]['bitmap']=this[_0x4fa199(0x327)][_0x4fa199(0x14e)];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x41a)]=Window_Base['prototype']['initialize'],Window_Base['prototype'][_0x348c4(0x467)]=function(_0x1f1e63){const _0x217d1c=_0x348c4;this[_0x217d1c(0x33a)](_0x1f1e63),VisuMZ[_0x217d1c(0x166)][_0x217d1c(0x41a)][_0x217d1c(0x290)](this,_0x1f1e63);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x33a)]=function(_0x4e49ff){const _0x5a3648=_0x348c4;this[_0x5a3648(0x2c4)](),this[_0x5a3648(0x474)](),this[_0x5a3648(0x306)](_0x4e49ff);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x2c4)]=function(){const _0x13a6b1=_0x348c4;this[_0x13a6b1(0x2fb)](_0x13a6b1(0x137));},Window_Base['prototype']['setTextAlignment']=function(_0x145e32){this['_textAlignment']=_0x145e32;},Window_Base['prototype'][_0x348c4(0x342)]=function(){const _0x5cf472=_0x348c4;return this[_0x5cf472(0x443)];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x293)]=Window_Base[_0x348c4(0xf4)][_0x348c4(0xdf)],Window_Base[_0x348c4(0xf4)][_0x348c4(0xdf)]=function(_0x1c4ff1){const _0x5b4a6e=_0x348c4;return this[_0x5b4a6e(0x474)](),VisuMZ[_0x5b4a6e(0x166)][_0x5b4a6e(0x293)][_0x5b4a6e(0x290)](this,_0x1c4ff1);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x2d5)]=function(_0x10a672){const _0x19baad=_0x348c4;return VisuMZ[_0x19baad(0x166)]['Window_Base_textSizeEx'][_0x19baad(0x290)](this,_0x10a672);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x381)]=Window_Base[_0x348c4(0xf4)][_0x348c4(0x408)],Window_Base[_0x348c4(0xf4)][_0x348c4(0x408)]=function(_0x4990a7){const _0x33dbb0=_0x348c4;VisuMZ['MessageCore'][_0x33dbb0(0x381)][_0x33dbb0(0x290)](this,_0x4990a7);if(_0x4990a7[_0x33dbb0(0x3ee)])this[_0x33dbb0(0x2fb)](_0x33dbb0(0x137));},Window_Base['prototype'][_0x348c4(0x474)]=function(){this['setWordWrap'](![]);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x36d)]=function(){const _0x24d809=_0x348c4;return this[_0x24d809(0x31e)];},Window_Base[_0x348c4(0xf4)][_0x348c4(0x356)]=function(_0x225b4e){const _0x1517b7=_0x348c4;return this[_0x1517b7(0x31e)]=_0x225b4e,'';},Window_Base[_0x348c4(0xf4)][_0x348c4(0x306)]=function(_0x171418){const _0x557ca4=_0x348c4;this[_0x557ca4(0x21b)]=JsonEx[_0x557ca4(0x17f)](_0x171418);},Window_Base[_0x348c4(0xf4)]['resetFontSettings']=function(){const _0x114a92=_0x348c4;this[_0x114a92(0x14e)]['fontFace']=$gameSystem['mainFontFace'](),this['contents']['fontSize']=$gameSystem[_0x114a92(0x214)](),this[_0x114a92(0x14e)][_0x114a92(0x303)]=![],this[_0x114a92(0x14e)][_0x114a92(0x3b5)]=![],this[_0x114a92(0x46d)]=0x0,this['_textCasingUpperState']=!![],this[_0x114a92(0x203)]();},Window_Base[_0x348c4(0xf4)][_0x348c4(0x203)]=function(){const _0x232267=_0x348c4;this['changeTextColor'](ColorManager[_0x232267(0x201)]()),this[_0x232267(0x1f7)](ColorManager[_0x232267(0x11f)]());const _0xc6d464=VisuMZ[_0x232267(0x166)][_0x232267(0x2b2)][_0x232267(0x2fa)];_0xc6d464[_0x232267(0x3be)]===undefined&&(_0xc6d464[_0x232267(0x3be)]=0x3),this[_0x232267(0x14e)][_0x232267(0x2ab)]=_0xc6d464[_0x232267(0x3be)],this[_0x232267(0x28e)](![]);},Window_Base['prototype'][_0x348c4(0x28e)]=function(_0x326bdf){const _0x386c5a=_0x348c4;this[_0x386c5a(0x13d)]=_0x326bdf;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x160)]=function(){const _0xb152d8=_0x348c4;return this[_0xb152d8(0x13d)];},Window_Base[_0x348c4(0xf4)][_0x348c4(0x257)]=function(){return![];},Window_Base[_0x348c4(0xf4)][_0x348c4(0x1bf)]=function(){const _0x2bac95=_0x348c4,_0x3428ee=[_0x2bac95(0x256),_0x2bac95(0x151),_0x2bac95(0x303),_0x2bac95(0x3b5),'textColor',_0x2bac95(0x236),_0x2bac95(0x2ab),_0x2bac95(0xf2)];let _0x293657={};for(const _0x43a8e9 of _0x3428ee){_0x293657[_0x43a8e9]=this[_0x2bac95(0x14e)][_0x43a8e9];}return _0x293657;},Window_Base['prototype'][_0x348c4(0x26f)]=function(_0x528459){const _0x5a4645=_0x348c4;for(const _0x555db0 in _0x528459){this[_0x5a4645(0x14e)][_0x555db0]=_0x528459[_0x555db0];}},VisuMZ['MessageCore'][_0x348c4(0x1d8)]=Window_Base[_0x348c4(0xf4)][_0x348c4(0x49f)],Window_Base[_0x348c4(0xf4)][_0x348c4(0x49f)]=function(){const _0x21d53e=_0x348c4;VisuMZ[_0x21d53e(0x166)][_0x21d53e(0x1d8)][_0x21d53e(0x290)](this),this[_0x21d53e(0x1a4)]();},Window_Base[_0x348c4(0xf4)]['canMove']=function(){return![];},Window_Base[_0x348c4(0xf4)]['updateMove']=function(){const _0x575ef0=_0x348c4;this[_0x575ef0(0x246)]>0x0&&(this[_0x575ef0(0x317)]()&&(this['x']=this[_0x575ef0(0x47f)](this['x'],this[_0x575ef0(0x3af)]),this['y']=this[_0x575ef0(0x47f)](this['y'],this['_moveTargetY']),this['width']=this[_0x575ef0(0x47f)](this['width'],this[_0x575ef0(0x1f5)]),this[_0x575ef0(0x17e)]=this[_0x575ef0(0x47f)](this[_0x575ef0(0x17e)],this[_0x575ef0(0x3fc)]),this['clampPlacementPosition']()),this[_0x575ef0(0x246)]--);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x416)]=function(_0x5b6558,_0x942de4){const _0x3e88fc=_0x348c4;!_0x5b6558&&(this[_0x3e88fc(0x1b3)]=Math['min'](this[_0x3e88fc(0x1b3)],Graphics['width']),this['height']=Math['min'](this[_0x3e88fc(0x17e)],Graphics[_0x3e88fc(0x17e)]));if(!_0x942de4){const _0x205cf9=-(Math[_0x3e88fc(0x455)](Graphics['width']-Graphics[_0x3e88fc(0x3ac)])/0x2),_0x9ccb05=_0x205cf9+Graphics[_0x3e88fc(0x1b3)]-this[_0x3e88fc(0x1b3)],_0x2f8429=-(Math[_0x3e88fc(0x455)](Graphics[_0x3e88fc(0x17e)]-Graphics[_0x3e88fc(0x2fd)])/0x2),_0x451541=_0x2f8429+Graphics['height']-this[_0x3e88fc(0x17e)];this['x']=this['x'][_0x3e88fc(0x28c)](_0x205cf9,_0x9ccb05),this['y']=this['y']['clamp'](_0x2f8429,_0x451541);}},Window_Base['prototype'][_0x348c4(0x47f)]=function(_0x299db4,_0x44d3a5){const _0x2935fb=_0x348c4,_0x593c41=this[_0x2935fb(0x246)],_0x4fd6a4=this[_0x2935fb(0x2e4)],_0x5be0c3=this[_0x2935fb(0x16b)]((_0x4fd6a4-_0x593c41)/_0x4fd6a4),_0x53bfbf=this['calcMoveEasing']((_0x4fd6a4-_0x593c41+0x1)/_0x4fd6a4),_0x39815d=(_0x299db4-_0x44d3a5*_0x5be0c3)/(0x1-_0x5be0c3);return _0x39815d+(_0x44d3a5-_0x39815d)*_0x53bfbf;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x16b)]=function(_0x5e2dca){const _0x3f4224=_0x348c4,_0x226b24=0x2;switch(this[_0x3f4224(0x350)]){case 0x0:return _0x5e2dca;case 0x1:return this[_0x3f4224(0x194)](_0x5e2dca,_0x226b24);case 0x2:return this[_0x3f4224(0xc8)](_0x5e2dca,_0x226b24);case 0x3:return this[_0x3f4224(0x389)](_0x5e2dca,_0x226b24);default:return Imported[_0x3f4224(0x46e)]?VisuMZ['applyMoveEasing'](_0x5e2dca,this[_0x3f4224(0x350)]):_0x5e2dca;}},Window_Base[_0x348c4(0xf4)][_0x348c4(0x454)]=function(_0x2efe15,_0x31c72c,_0x1ddd75,_0x57c684,_0xbb5a42,_0xee182){const _0x17f15d=_0x348c4;this[_0x17f15d(0x3af)]=_0x2efe15,this['_moveTargetY']=_0x31c72c,this[_0x17f15d(0x1f5)]=_0x1ddd75||this['width'],this[_0x17f15d(0x3fc)]=_0x57c684||this[_0x17f15d(0x17e)],this['_moveDuration']=_0xbb5a42||0x1;if(this['_moveDuration']<=0x0)this[_0x17f15d(0x246)]=0x1;this[_0x17f15d(0x2e4)]=this[_0x17f15d(0x246)],this[_0x17f15d(0x350)]=_0xee182||0x0;if(_0xbb5a42<=0x0)this['updateMove']();},Window_Base[_0x348c4(0xf4)][_0x348c4(0x47e)]=function(_0x24675c,_0x310b54,_0x470b76,_0x3d5dbc,_0x125bbe,_0x4c4356){const _0x10ff55=_0x348c4;this[_0x10ff55(0x3af)]=this['x']+_0x24675c,this[_0x10ff55(0x3bb)]=this['y']+_0x310b54,this[_0x10ff55(0x1f5)]=this['width']+(_0x470b76||0x0),this['_moveTargetHeight']=this['height']+(_0x3d5dbc||0x0),this[_0x10ff55(0x246)]=_0x125bbe||0x1;if(this[_0x10ff55(0x246)]<=0x0)this[_0x10ff55(0x246)]=0x1;this[_0x10ff55(0x2e4)]=this[_0x10ff55(0x246)],this['_moveEasingType']=_0x4c4356||0x0;if(_0x125bbe<=0x0)this[_0x10ff55(0x1a4)]();},Window_Base[_0x348c4(0xf4)][_0x348c4(0xc4)]=function(_0x4dd5f5,_0x3ee55e){const _0x203e71=_0x348c4;this[_0x203e71(0x454)](this[_0x203e71(0x21b)]['x'],this[_0x203e71(0x21b)]['y'],this[_0x203e71(0x21b)][_0x203e71(0x1b3)],this[_0x203e71(0x21b)][_0x203e71(0x17e)],_0x4dd5f5,_0x3ee55e);},VisuMZ[_0x348c4(0x166)][_0x348c4(0xc3)]=Window_Base[_0x348c4(0xf4)][_0x348c4(0xfa)],Window_Base[_0x348c4(0xf4)][_0x348c4(0xfa)]=function(_0x6179b6){const _0x4b4bd6=_0x348c4;if(this[_0x4b4bd6(0x160)]())return;_0x6179b6=_0x6179b6[_0x4b4bd6(0x2f2)](/\,/g,''),this['_textColorStack']=this[_0x4b4bd6(0x116)]||[],this[_0x4b4bd6(0x116)][_0x4b4bd6(0x15d)](this[_0x4b4bd6(0x14e)][_0x4b4bd6(0x47c)]),VisuMZ[_0x4b4bd6(0x166)][_0x4b4bd6(0xc3)]['call'](this,_0x6179b6);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x351)]=function(_0x16b639){const _0x266440=_0x348c4;this[_0x266440(0x2b4)](_0x16b639);if(this[_0x266440(0x160)]())return;_0x16b639[_0x266440(0x3ee)]&&(this[_0x266440(0x116)]=this[_0x266440(0x116)]||[],this[_0x266440(0x14e)][_0x266440(0x47c)]=this[_0x266440(0x116)][_0x266440(0x481)]()||ColorManager[_0x266440(0x201)]());},Window_Base[_0x348c4(0xf4)]['convertEscapeCharacters']=function(_0x3d586){const _0x46fb40=_0x348c4;return _0x3d586=this[_0x46fb40(0x30d)](_0x3d586),_0x3d586=this[_0x46fb40(0x491)](_0x3d586),_0x3d586=this['convertVariableEscapeCharacters'](_0x3d586),_0x3d586=this[_0x46fb40(0x161)](_0x3d586),_0x3d586=this[_0x46fb40(0x1ce)](_0x3d586),_0x3d586=this[_0x46fb40(0x231)](_0x3d586),_0x3d586=this[_0x46fb40(0x3a9)](_0x3d586),_0x3d586=this['convertTextAlignmentEscapeCharacters'](_0x3d586),_0x3d586=this['convertLockColorsEscapeCharacters'](_0x3d586),_0x3d586=this[_0x46fb40(0x297)](_0x3d586),_0x3d586=this[_0x46fb40(0x465)](_0x3d586),_0x3d586=this[_0x46fb40(0x270)](_0x3d586),_0x3d586=this[_0x46fb40(0x343)](_0x3d586),_0x3d586=this[_0x46fb40(0x3ca)](_0x3d586),_0x3d586=this[_0x46fb40(0x37a)](_0x3d586),_0x3d586=this[_0x46fb40(0x419)](_0x3d586),_0x3d586=this[_0x46fb40(0x311)](_0x3d586),_0x3d586=this['prepareWordWrapEscapeCharacters'](_0x3d586),_0x3d586;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x30d)]=function(_0x5d1513){const _0x43b107=_0x348c4;this[_0x43b107(0x384)]=![];for(const _0x489b7b of VisuMZ[_0x43b107(0x166)][_0x43b107(0x2b2)][_0x43b107(0x223)]){_0x5d1513&&_0x5d1513[_0x43b107(0xcf)](_0x489b7b[_0x43b107(0x2ec)])&&(this[_0x43b107(0x384)]=!![],_0x5d1513=_0x5d1513[_0x43b107(0x2f2)](_0x489b7b[_0x43b107(0x2ec)],_0x489b7b[_0x43b107(0x2e1)][_0x43b107(0x2d2)](this)));}return _0x5d1513||'';},Window_Base[_0x348c4(0xf4)][_0x348c4(0x491)]=function(_0x3164cb){const _0x4900c5=_0x348c4;return _0x3164cb=_0x3164cb[_0x4900c5(0x2f2)](/\\/g,'\x1b'),_0x3164cb=_0x3164cb[_0x4900c5(0x2f2)](/\x1b\x1b/g,'\x5c'),_0x3164cb;},Window_Base['prototype'][_0x348c4(0x419)]=function(_0x3d2ab3){const _0x5c4629=_0x348c4;for(;;){if(_0x3d2ab3[_0x5c4629(0xcf)](/\\V\[(\d+)\]/gi))_0x3d2ab3=_0x3d2ab3['replace'](/\\V\[(\d+)\]/gi,(_0x2011f6,_0x29165b)=>this['convertBackslashCharacters'](String($gameVariables[_0x5c4629(0x456)](parseInt(_0x29165b)))));else{if(_0x3d2ab3['match'](/\x1bV\[(\d+)\]/gi))_0x3d2ab3=_0x3d2ab3['replace'](/\x1bV\[(\d+)\]/gi,(_0x4a0dff,_0x454972)=>this[_0x5c4629(0x491)](String($gameVariables['value'](parseInt(_0x454972)))));else break;}}return _0x3d2ab3;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x161)]=function(_0x4c4597){const _0x2fa0d0=_0x348c4;return Imported['VisuMZ_0_CoreEngine']&&(_0x4c4597=_0x4c4597[_0x2fa0d0(0x2f2)](/<Up (?:KEY|BUTTON)>/gi,this[_0x2fa0d0(0x345)]('up')),_0x4c4597=_0x4c4597[_0x2fa0d0(0x2f2)](/<Left (?:KEY|BUTTON)>/gi,this[_0x2fa0d0(0x345)]('left')),_0x4c4597=_0x4c4597['replace'](/<Right (?:KEY|BUTTON)>/gi,this[_0x2fa0d0(0x345)](_0x2fa0d0(0x19a))),_0x4c4597=_0x4c4597['replace'](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x2fa0d0(0x22a))),_0x4c4597=_0x4c4597[_0x2fa0d0(0x2f2)](/<Ok (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('ok')),_0x4c4597=_0x4c4597[_0x2fa0d0(0x2f2)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x2fa0d0(0x345)](_0x2fa0d0(0x2e6))),_0x4c4597=_0x4c4597['replace'](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('menu')),_0x4c4597=_0x4c4597['replace'](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('shift')),_0x4c4597=_0x4c4597[_0x2fa0d0(0x2f2)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x2fa0d0(0x345)](_0x2fa0d0(0xcd))),_0x4c4597=_0x4c4597[_0x2fa0d0(0x2f2)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('pagedown'))),_0x4c4597;},Window_Base['prototype'][_0x348c4(0x345)]=function(_0x3d40b4){const _0xe6259d=_0x348c4;let _0x1c8efd=TextManager[_0xe6259d(0x18f)](_0x3d40b4)||'';return _0x1c8efd=this[_0xe6259d(0x491)](_0x1c8efd),_0x1c8efd=this[_0xe6259d(0x419)](_0x1c8efd),_0x1c8efd[_0xe6259d(0x23e)]();},Window_Base['prototype'][_0x348c4(0x1ce)]=function(_0x9d99f6){const _0x29ecae=_0x348c4;return _0x9d99f6=this[_0x29ecae(0x446)](_0x9d99f6),this[_0x29ecae(0x382)](),_0x9d99f6;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x446)]=function(_0x594fbe){const _0x3a8c8c=_0x348c4;return _0x594fbe=TextManager[_0x3a8c8c(0x1b2)](_0x594fbe),_0x594fbe;},VisuMZ['MessageCore'][_0x348c4(0x119)]=String['prototype'][_0x348c4(0x413)],String[_0x348c4(0xf4)][_0x348c4(0x413)]=function(){const _0x1fbd3c=_0x348c4;let _0x406073=this;return _0x406073=TextManager[_0x1fbd3c(0x1b2)](_0x406073),VisuMZ[_0x1fbd3c(0x166)][_0x1fbd3c(0x119)][_0x1fbd3c(0xd0)](_0x406073,arguments);},VisuMZ['MessageCore'][_0x348c4(0xbf)]=Bitmap[_0x348c4(0xf4)][_0x348c4(0x145)],Bitmap['prototype'][_0x348c4(0x145)]=function(_0x435a72,_0x1a26ba,_0x264e17,_0x13ebd6,_0x3a9925,_0x2c242c){const _0x2d7ab7=_0x348c4;_0x435a72=TextManager[_0x2d7ab7(0x1b2)](_0x435a72),VisuMZ['MessageCore']['Bitmap_drawText'][_0x2d7ab7(0x290)](this,_0x435a72,_0x1a26ba,_0x264e17,_0x13ebd6,_0x3a9925,_0x2c242c);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x2c8)]=Bitmap['prototype'][_0x348c4(0x2c3)],Bitmap['prototype']['drawTextTopAligned']=function(_0x7fb9dd,_0x452505,_0x138974,_0x344323,_0x57f8cd,_0x38709f){const _0x4470ae=_0x348c4;_0x7fb9dd=TextManager[_0x4470ae(0x1b2)](_0x7fb9dd),VisuMZ[_0x4470ae(0x166)][_0x4470ae(0x2c8)][_0x4470ae(0x290)](this,_0x7fb9dd,_0x452505,_0x138974,_0x344323,_0x57f8cd,_0x38709f);},Window_Base[_0x348c4(0xf4)]['postConvertEscapeCharacters']=function(_0x124664){return _0x124664;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x231)]=function(_0x33b631){const _0x5bbe0e=_0x348c4;return this['isChoiceWindow']()&&(_0x33b631=_0x33b631[_0x5bbe0e(0x2f2)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x33b631=_0x33b631[_0x5bbe0e(0x2f2)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x33b631=_0x33b631[_0x5bbe0e(0x2f2)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x33b631=_0x33b631['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x33b631=_0x33b631[_0x5bbe0e(0x2f2)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x33b631=_0x33b631[_0x5bbe0e(0x2f2)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x33b631=_0x33b631['replace'](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x33b631=_0x33b631[_0x5bbe0e(0x2f2)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x33b631;},Window_Base['prototype']['isChoiceWindow']=function(){const _0xb7cae7=_0x348c4,_0xe9619=[_0xb7cae7(0x302),'Window_MessageLog'];return _0xe9619[_0xb7cae7(0xc2)](this[_0xb7cae7(0x20d)][_0xb7cae7(0x438)]);},Window_Base[_0x348c4(0xf4)]['convertFontSettingsEscapeCharacters']=function(_0x3969ff){const _0x56d026=_0x348c4;return _0x3969ff=_0x3969ff[_0x56d026(0x2f2)](/<B>/gi,_0x56d026(0x2d6)),_0x3969ff=_0x3969ff['replace'](/<\/B>/gi,_0x56d026(0x3ce)),_0x3969ff=_0x3969ff[_0x56d026(0x2f2)](/<I>/gi,_0x56d026(0xd1)),_0x3969ff=_0x3969ff['replace'](/<\/I>/gi,_0x56d026(0x329)),_0x3969ff;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x181)]=function(_0x47807a){const _0x1aafec=_0x348c4;return _0x47807a=_0x47807a[_0x1aafec(0x2f2)](/<LEFT>/gi,_0x1aafec(0x1cb)),_0x47807a=_0x47807a[_0x1aafec(0x2f2)](/<\/LEFT>/gi,_0x1aafec(0x369)),_0x47807a=_0x47807a[_0x1aafec(0x2f2)](/<CENTER>/gi,_0x1aafec(0x18a)),_0x47807a=_0x47807a[_0x1aafec(0x2f2)](/<\/CENTER>/gi,_0x1aafec(0x369)),_0x47807a=_0x47807a['replace'](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x47807a=_0x47807a[_0x1aafec(0x2f2)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x47807a;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x323)]=function(_0x1257ce){const _0x52f38a=_0x348c4;return _0x1257ce=_0x1257ce[_0x52f38a(0x2f2)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x1257ce=_0x1257ce['replace'](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x1257ce=_0x1257ce['replace'](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x1257ce=_0x1257ce['replace'](/\)\)\)/gi,_0x52f38a(0x2ef)),_0x1257ce;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x297)]=function(_0x483c1e){const _0x264d0d=_0x348c4;return _0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0x264d0d(0x115)),_0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0x264d0d(0x2cb)),_0x483c1e=_0x483c1e['replace'](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x264d0d(0x34d)),_0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,'\x1bCASING[0]'),_0x483c1e=_0x483c1e['replace'](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,'\x1bCASING[3]'),_0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x264d0d(0x2cb)),_0x483c1e=_0x483c1e['replace'](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x264d0d(0x1dc)),_0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x264d0d(0x2cb)),_0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x264d0d(0x337)),_0x483c1e=_0x483c1e[_0x264d0d(0x2f2)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,'\x1bCASING[0]'),_0x483c1e;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x465)]=function(_0x2991f1){const _0x421bd7=_0x348c4;return _0x2991f1=_0x2991f1[_0x421bd7(0x2f2)](/\x1bN\[(\d+)\]/gi,(_0x30d34d,_0x1beff9)=>this[_0x421bd7(0x437)](parseInt(_0x1beff9))),_0x2991f1=_0x2991f1[_0x421bd7(0x2f2)](/\x1bP\[(\d+)\]/gi,(_0x52e840,_0x1181c1)=>this[_0x421bd7(0x2d9)](parseInt(_0x1181c1))),_0x2991f1=_0x2991f1[_0x421bd7(0x2f2)](/\x1bG/gi,TextManager['currencyUnit']),_0x2991f1;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x270)]=function(_0x4a866b){const _0x4165d9=_0x348c4;return _0x4a866b=_0x4a866b[_0x4165d9(0x2f2)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x4165d9(0x3c2)]()),_0x4a866b=_0x4a866b[_0x4165d9(0x2f2)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x4a866b=_0x4a866b[_0x4165d9(0x2f2)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x4165d9(0x406)](!![])),_0x4a866b=_0x4a866b['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x4165d9(0x406)](![])),_0x4a866b;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x3c2)]=function(){const _0x334665=_0x348c4;if(!SceneManager[_0x334665(0x3c0)]())return'';if(BattleManager[_0x334665(0x2bd)])return BattleManager['_target'][_0x334665(0x438)]();if(BattleManager[_0x334665(0x435)][0x0])return BattleManager['_targets'][0x0][_0x334665(0x438)]();return'';},Window_Base[_0x348c4(0xf4)][_0x348c4(0x463)]=function(){const _0x2686b3=_0x348c4;if(!SceneManager[_0x2686b3(0x3c0)]())return'';let _0x3acacf=null;return _0x3acacf=BattleManager[_0x2686b3(0x40f)],!_0x3acacf&&BattleManager['isInputting']()&&(_0x3acacf=BattleManager['actor']()),_0x3acacf?_0x3acacf[_0x2686b3(0x438)]():'';},Window_Base[_0x348c4(0xf4)][_0x348c4(0x406)]=function(_0x2d0977){const _0x2fa880=_0x348c4;if(!SceneManager[_0x2fa880(0x3c0)]())return'';let _0x2f1260=BattleManager['_action']||null;!_0x2f1260&&BattleManager[_0x2fa880(0x1a2)]()&&(_0x2f1260=BattleManager['inputtingAction']());if(_0x2f1260&&_0x2f1260['item']()){let _0x398cc4='';if(_0x2d0977)_0x398cc4+=_0x2fa880(0x363)[_0x2fa880(0x413)](_0x2f1260[_0x2fa880(0x1c7)]()[_0x2fa880(0x2dc)]);return _0x398cc4+=_0x2f1260[_0x2fa880(0x1c7)]()['name'],_0x398cc4;}return'';},Window_Base[_0x348c4(0xf4)]['convertMessageCoreEscapeActions']=function(_0x260f7e){const _0x6a7b74=_0x348c4;for(const _0x351dea of VisuMZ[_0x6a7b74(0x166)][_0x6a7b74(0x2b2)][_0x6a7b74(0x232)]){_0x260f7e[_0x6a7b74(0xcf)](_0x351dea[_0x6a7b74(0x2ec)])&&(_0x260f7e=_0x260f7e['replace'](_0x351dea[_0x6a7b74(0x2ec)],_0x351dea[_0x6a7b74(0x2e1)]),_0x260f7e=this['convertVariableEscapeCharacters'](_0x260f7e));}return _0x260f7e;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x3ca)]=function(_0x73727a){const _0x292959=_0x348c4;for(const _0x14900b of VisuMZ[_0x292959(0x166)]['Settings']['TextCodeReplace']){_0x73727a['match'](_0x14900b[_0x292959(0x2ec)])&&(_0x73727a=_0x73727a['replace'](_0x14900b['textCodeCheck'],_0x14900b[_0x292959(0x2e1)][_0x292959(0x2d2)](this)),_0x73727a=this[_0x292959(0x419)](_0x73727a));}return _0x73727a;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x437)]=function(_0x4ae4ec){const _0x16448c=_0x348c4,_0x257102=_0x4ae4ec>=0x1?$gameActors[_0x16448c(0x124)](_0x4ae4ec):null,_0x117c36=_0x257102?_0x257102['name']():'',_0xffe768=Number(VisuMZ[_0x16448c(0x166)]['Settings']['AutoColor'][_0x16448c(0x48a)]);return this[_0x16448c(0x257)]()&&_0xffe768!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x16448c(0x413)](_0xffe768,_0x117c36):_0x117c36;},Window_Base['prototype'][_0x348c4(0x2d9)]=function(_0x4649a9){const _0x2ca971=_0x348c4,_0x2aa008=_0x4649a9>=0x1?$gameParty[_0x2ca971(0xcb)]()[_0x4649a9-0x1]:null,_0x1cf8e3=_0x2aa008?_0x2aa008['name']():'',_0xff62db=Number(VisuMZ[_0x2ca971(0x166)][_0x2ca971(0x2b2)][_0x2ca971(0x21e)][_0x2ca971(0x48a)]);return this[_0x2ca971(0x257)]()&&_0xff62db!==0x0?_0x2ca971(0x432)[_0x2ca971(0x413)](_0xff62db,_0x1cf8e3):_0x1cf8e3;},Window_Base['prototype'][_0x348c4(0x311)]=function(_0x3a489e){const _0x2c51ae=_0x348c4;return this[_0x2c51ae(0x257)]()&&(_0x3a489e=this[_0x2c51ae(0x173)](_0x3a489e),_0x3a489e=this['processActorNameAutoColorChanges'](_0x3a489e)),_0x3a489e;},Window_Base['prototype'][_0x348c4(0x173)]=function(_0x4f8619){const _0x42139f=_0x348c4;for(autoColor of VisuMZ[_0x42139f(0x166)][_0x42139f(0x43c)]){_0x4f8619=_0x4f8619['replace'](autoColor[0x0],autoColor[0x1]);}return _0x4f8619;},Window_Base['prototype'][_0x348c4(0x1d0)]=function(){this['_autoColorActorNames']=[];},Window_Base[_0x348c4(0xf4)][_0x348c4(0x382)]=function(){const _0x23eea3=_0x348c4;this[_0x23eea3(0x1d0)]();const _0x39cb05=VisuMZ['MessageCore'][_0x23eea3(0x2b2)][_0x23eea3(0x21e)],_0xed71f5=_0x39cb05[_0x23eea3(0x48a)];if(_0xed71f5<=0x0)return;for(const _0x551ebd of $gameActors[_0x23eea3(0x1ba)]){if(!_0x551ebd)continue;const _0x1f159d=_0x551ebd[_0x23eea3(0x438)]();if(_0x1f159d[_0x23eea3(0x23e)]()[_0x23eea3(0x3f1)]<=0x0)continue;if(/^\d+$/[_0x23eea3(0xe9)](_0x1f159d))continue;if(_0x1f159d[_0x23eea3(0xcf)](/-----/i))continue;let _0x424ec0=VisuMZ[_0x23eea3(0x166)][_0x23eea3(0x3cb)](_0x1f159d);const _0x399b29=new RegExp('\x5cb'+_0x424ec0+'\x5cb','g'),_0x1b7c53=_0x23eea3(0x432)[_0x23eea3(0x413)](_0xed71f5,_0x1f159d);this[_0x23eea3(0x3aa)][_0x23eea3(0x122)]([_0x399b29,_0x1b7c53]);}},Window_Base['prototype'][_0x348c4(0x1aa)]=function(_0x6ef09e){const _0x401899=_0x348c4;this['_autoColorActorNames']===undefined&&this[_0x401899(0x382)]();for(autoColor of this[_0x401899(0x3aa)]){_0x6ef09e=_0x6ef09e['replace'](autoColor[0x0],autoColor[0x1]);}return _0x6ef09e;},Window_Base['prototype'][_0x348c4(0x17d)]=function(_0x2bc179,_0xb18131,_0x2bcc1c){const _0xf35164=_0x348c4;if(!_0x2bc179)return'';const _0x55141=_0x2bc179[_0xb18131];let _0x4b151b='';if(_0x55141&&_0x2bcc1c&&_0x55141[_0xf35164(0x2dc)]){const _0x72a459=_0xf35164(0x3ff);_0x4b151b=_0x72a459[_0xf35164(0x413)](_0x55141[_0xf35164(0x2dc)],_0x55141[_0xf35164(0x438)]);}else _0x55141?_0x4b151b=_0x55141[_0xf35164(0x438)]:_0x4b151b='';return _0x4b151b=TextManager[_0xf35164(0x1b2)](_0x4b151b),this[_0xf35164(0x257)]()&&(_0x4b151b=this['applyDatabaseAutoColor'](_0x4b151b,_0x2bc179)),_0x4b151b;},Window_Base['prototype']['lastGainedObjectIcon']=function(){const _0x1e7865=_0x348c4,_0xafd9ef=$gameParty[_0x1e7865(0x315)]();if(_0xafd9ef['id']<0x0)return'';let _0x4cf58d=null;if(_0xafd9ef[_0x1e7865(0x477)]===0x0)_0x4cf58d=$dataItems[_0xafd9ef['id']];if(_0xafd9ef['type']===0x1)_0x4cf58d=$dataWeapons[_0xafd9ef['id']];if(_0xafd9ef[_0x1e7865(0x477)]===0x2)_0x4cf58d=$dataArmors[_0xafd9ef['id']];if(!_0x4cf58d)return'';return _0x1e7865(0x41d)[_0x1e7865(0x413)](_0x4cf58d['iconIndex']);},Window_Base[_0x348c4(0xf4)]['lastGainedObjectName']=function(_0x1124d2){const _0x31e13b=_0x348c4,_0x42188b=$gameParty[_0x31e13b(0x315)]();if(_0x42188b['id']<0x0)return'';let _0x258972=null;if(_0x42188b[_0x31e13b(0x477)]===0x0)_0x258972=$dataItems[_0x42188b['id']];if(_0x42188b['type']===0x1)_0x258972=$dataWeapons[_0x42188b['id']];if(_0x42188b[_0x31e13b(0x477)]===0x2)_0x258972=$dataArmors[_0x42188b['id']];if(!_0x258972)return'';let _0xbc394=_0x258972[_0x31e13b(0x438)]||'';return TextManager['isVisuMzLocalizationEnabled']()&&(_0xbc394=TextManager[_0x31e13b(0x1b2)](_0xbc394)),_0x1124d2?_0x31e13b(0x3ff)[_0x31e13b(0x413)](_0x258972['iconIndex'],_0xbc394):_0xbc394;},Window_Base['prototype'][_0x348c4(0x301)]=function(){const _0x439ea8=_0x348c4,_0x231e29=$gameParty[_0x439ea8(0x315)]();if(_0x231e29['id']<=0x0)return'';return _0x231e29[_0x439ea8(0x3d1)];},Window_Base[_0x348c4(0xf4)][_0x348c4(0x167)]=function(_0x54b67e,_0x2d4e08){const _0x5cb3fd=_0x348c4,_0x27cb2d=VisuMZ[_0x5cb3fd(0x166)][_0x5cb3fd(0x2b2)][_0x5cb3fd(0x21e)];let _0x3b1b8b=0x0;if(_0x2d4e08===$dataActors)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0x48a)];if(_0x2d4e08===$dataClasses)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0x11b)];if(_0x2d4e08===$dataSkills)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0x348)];if(_0x2d4e08===$dataItems)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0x34f)];if(_0x2d4e08===$dataWeapons)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0x485)];if(_0x2d4e08===$dataArmors)_0x3b1b8b=_0x27cb2d['Armors'];if(_0x2d4e08===$dataEnemies)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0x132)];if(_0x2d4e08===$dataStates)_0x3b1b8b=_0x27cb2d[_0x5cb3fd(0xce)];return _0x3b1b8b>0x0&&(_0x54b67e='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5cb3fd(0x413)](_0x3b1b8b,_0x54b67e)),_0x54b67e;},Window_Base[_0x348c4(0xf4)][_0x348c4(0xd3)]=function(_0x1454f8){const _0x29026b=_0x348c4;if(_0x1454f8[_0x29026b(0xc2)](_0x29026b(0x471)))return this[_0x29026b(0x356)](![]),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x1454f8;_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x18317a,_0x2a842f)=>this[_0x29026b(0x356)](!![])),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x3cb6be,_0xea20ed)=>this[_0x29026b(0x356)](![])),_0x1454f8=_0x1454f8['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x591159,_0x3cdce8)=>this[_0x29026b(0x356)](![]));if(_0x1454f8[_0x29026b(0xcf)](Window_Message[_0x29026b(0x190)]))this[_0x29026b(0x356)](![]);else _0x1454f8['match'](Window_Message[_0x29026b(0x1ff)])&&this[_0x29026b(0x356)](![]);if(!this['isWordWrapEnabled']())return _0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x1454f8;if(_0x1454f8[_0x29026b(0x3f1)]<=0x0)return _0x1454f8;return _0x1454f8[_0x29026b(0xcf)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x1454f8=VisuMZ[_0x29026b(0x166)]['SplitJpCnCharacters'](_0x1454f8)['join']('')),VisuMZ[_0x29026b(0x166)][_0x29026b(0x2b2)][_0x29026b(0x280)][_0x29026b(0x402)]?(_0x1454f8=_0x1454f8['replace'](/[\n\r]+/g,'\x20'),_0x1454f8=_0x1454f8['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/[\n\r]+/g,''),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x1454f8=this['addWrapBreakAfterPunctuation'](_0x1454f8),_0x1454f8=_0x1454f8['split']('\x20')['join'](_0x29026b(0x21d)),_0x1454f8=_0x1454f8['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1454f8=_0x1454f8[_0x29026b(0x2f2)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1454f8;},VisuMZ['MessageCore'][_0x348c4(0x34b)]=function(_0x4a6aea){const _0xaea8f4=_0x348c4;let _0x2730cb=[],_0x1b204b='';while(_0x4a6aea[_0xaea8f4(0x3f1)]>0x0){const _0x19d463=_0x4a6aea[_0xaea8f4(0x283)](0x0);_0x4a6aea=_0x4a6aea[_0xaea8f4(0x158)](0x1),_0x19d463['match'](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x1b204b['length']>0x0&&(_0x2730cb[_0xaea8f4(0x122)](_0x1b204b),_0x1b204b=''),_0x2730cb['push'](_0x19d463+'\x1bWrapJpBreak[0]')):_0x1b204b+=_0x19d463;}return _0x1b204b[_0xaea8f4(0x3f1)]>0x0&&(_0x2730cb[_0xaea8f4(0x122)](_0x1b204b),_0x1b204b=''),_0x2730cb;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x321)]=function(_0xa3f1d5){return _0xa3f1d5;},VisuMZ['MessageCore']['Window_Base_processNewLine']=Window_Base[_0x348c4(0xf4)][_0x348c4(0x3ab)],Window_Base['prototype'][_0x348c4(0x3ab)]=function(_0x3e2a31){const _0x5e14be=_0x348c4;VisuMZ[_0x5e14be(0x166)][_0x5e14be(0x40c)][_0x5e14be(0x290)](this,_0x3e2a31),this[_0x5e14be(0x3a0)](_0x3e2a31);},Window_Base['prototype']['processCharacter']=function(_0x90444a){const _0x22dc2a=_0x348c4;let _0x3dc946=_0x90444a[_0x22dc2a(0x46b)][_0x90444a['index']++];if(_0x3dc946[_0x22dc2a(0x310)](0x0)<0x20)this[_0x22dc2a(0x387)](_0x90444a),this[_0x22dc2a(0x38f)](_0x90444a,_0x3dc946);else{if(this[_0x22dc2a(0x46d)]===0x1)_0x3dc946=_0x3dc946[_0x22dc2a(0x367)]();if(this['_textCasing']===0x2){if(this[_0x22dc2a(0xe6)])_0x3dc946=_0x3dc946[_0x22dc2a(0x198)]();this['_textCasingUpperState']=/\s/[_0x22dc2a(0xe9)](_0x3dc946);}if(this[_0x22dc2a(0x46d)]===0x3)_0x3dc946=_0x3dc946[_0x22dc2a(0x198)]();this[_0x22dc2a(0x46d)]===0x4&&(_0x3dc946=this[_0x22dc2a(0x118)]?_0x3dc946[_0x22dc2a(0x198)]():_0x3dc946[_0x22dc2a(0x367)](),this[_0x22dc2a(0x118)]=!this[_0x22dc2a(0x118)]),this[_0x22dc2a(0x46d)]===0x5&&(_0x3dc946=Math['random']()<0.5?_0x3dc946[_0x22dc2a(0x198)]():_0x3dc946['toLowerCase']()),_0x90444a['buffer']+=_0x3dc946;}},VisuMZ[_0x348c4(0x166)][_0x348c4(0x25a)]=Window_Base[_0x348c4(0xf4)]['processControlCharacter'],Window_Base[_0x348c4(0xf4)]['processControlCharacter']=function(_0x504a87,_0x131e82){const _0x41caa7=_0x348c4;VisuMZ[_0x41caa7(0x166)][_0x41caa7(0x25a)]['call'](this,_0x504a87,_0x131e82);if(_0x131e82==='\x1bWrapBreak[0]')this[_0x41caa7(0x1dd)](_0x504a87);else _0x131e82===_0x41caa7(0xff)&&this[_0x41caa7(0x1dd)](_0x504a87,!![]);},Window_Base['prototype']['obtainEscapeString']=function(_0x140f34){const _0x2e2eda=_0x348c4;var _0x3ae34e=/^\<(.*?)\>/[_0x2e2eda(0x210)](_0x140f34['text'][_0x2e2eda(0x158)](_0x140f34[_0x2e2eda(0x169)]));return _0x3ae34e?(_0x140f34[_0x2e2eda(0x169)]+=_0x3ae34e[0x0][_0x2e2eda(0x3f1)],String(_0x3ae34e[0x0]['slice'](0x1,_0x3ae34e[0x0]['length']-0x1))):'';},VisuMZ[_0x348c4(0x166)][_0x348c4(0x3bc)]=Window_Base[_0x348c4(0xf4)]['processEscapeCharacter'],Window_Base['prototype'][_0x348c4(0x2c2)]=function(_0x18f155,_0x13e938){const _0x28e64c=_0x348c4;switch(_0x18f155){case'C':_0x13e938[_0x28e64c(0x3ee)]?VisuMZ[_0x28e64c(0x166)]['Window_Base_processEscapeCharacter']['call'](this,_0x18f155,_0x13e938):this[_0x28e64c(0x2b4)](_0x13e938);break;case'I':case'{':case'}':VisuMZ['MessageCore']['Window_Base_processEscapeCharacter'][_0x28e64c(0x290)](this,_0x18f155,_0x13e938);break;case'FS':this['processFsTextCode'](_0x13e938);break;case'PX':this['processPxTextCode'](_0x13e938);break;case'PY':this[_0x28e64c(0x27c)](_0x13e938);break;case _0x28e64c(0x1cf):this[_0x28e64c(0x25f)](this[_0x28e64c(0x2b4)](_0x13e938));break;case _0x28e64c(0x398):this['processTextCasing'](_0x13e938);break;case _0x28e64c(0x478):this[_0x28e64c(0x312)](_0x13e938);break;case _0x28e64c(0x21f):this[_0x28e64c(0x3e4)](_0x13e938);break;case _0x28e64c(0x43a):this[_0x28e64c(0xef)](_0x13e938);break;case _0x28e64c(0x45f):this[_0x28e64c(0x15f)](this[_0x28e64c(0x2b4)](_0x13e938));break;case'PICTURE':this['processDrawPicture'](_0x13e938);break;case'PREVCOLOR':this[_0x28e64c(0x351)](_0x13e938);break;case'TEXTALIGNMENT':this[_0x28e64c(0x472)](_0x13e938);break;case _0x28e64c(0x199):this['processCustomWait'](_0x13e938);break;case _0x28e64c(0x43b):this['processWrapBreak'](_0x13e938);break;case _0x28e64c(0x305):this[_0x28e64c(0x1dd)](_0x13e938,!![]);break;default:this['processMessageCoreEscapeActions'](_0x18f155,_0x13e938);}},Window_Base['prototype'][_0x348c4(0x30c)]=function(_0xcf7a1a,_0x382be8){const _0x38abae=_0x348c4;for(const _0x306f73 of VisuMZ[_0x38abae(0x166)]['Settings']['TextCodeActions']){if(_0x306f73[_0x38abae(0x126)]===_0xcf7a1a){if(_0x306f73[_0x38abae(0x1d2)]==='')this['obtainEscapeParam'](_0x382be8);_0x306f73[_0x38abae(0x364)][_0x38abae(0x290)](this,_0x382be8);if(this[_0x38abae(0x20d)]===Window_Message){const _0x3623a5=_0x306f73['CommonEvent']||0x0;if(_0x3623a5>0x0)this[_0x38abae(0x25e)](_0x3623a5);}}}},Window_Base[_0x348c4(0xf4)]['makeFontBigger']=function(){const _0x5161c4=_0x348c4;this[_0x5161c4(0x14e)][_0x5161c4(0x151)]+=VisuMZ[_0x5161c4(0x166)][_0x5161c4(0x2b2)][_0x5161c4(0x2fa)][_0x5161c4(0x23b)],this['contents'][_0x5161c4(0x151)]=Math[_0x5161c4(0x2e0)](this[_0x5161c4(0x14e)][_0x5161c4(0x151)],VisuMZ[_0x5161c4(0x166)]['Settings'][_0x5161c4(0x2fa)]['FontBiggerCap']);},Window_Base[_0x348c4(0xf4)]['makeFontSmaller']=function(){const _0x3efeca=_0x348c4;this[_0x3efeca(0x14e)]['fontSize']-=VisuMZ['MessageCore'][_0x3efeca(0x2b2)][_0x3efeca(0x2fa)][_0x3efeca(0x23b)],this[_0x3efeca(0x14e)][_0x3efeca(0x151)]=Math[_0x3efeca(0x32c)](this['contents'][_0x3efeca(0x151)],VisuMZ[_0x3efeca(0x166)]['Settings'][_0x3efeca(0x2fa)][_0x3efeca(0x1bc)]);},Window_Base[_0x348c4(0xf4)]['processFsTextCode']=function(_0xf9e88b){const _0x138cc3=_0x348c4,_0x541e9e=this[_0x138cc3(0x2b4)](_0xf9e88b);this[_0x138cc3(0x14e)][_0x138cc3(0x151)]=_0x541e9e[_0x138cc3(0x28c)](VisuMZ[_0x138cc3(0x166)][_0x138cc3(0x2b2)][_0x138cc3(0x2fa)][_0x138cc3(0x1bc)],VisuMZ[_0x138cc3(0x166)]['Settings']['General'][_0x138cc3(0x36f)]);},Window_Base[_0x348c4(0xf4)][_0x348c4(0xf6)]=function(_0x5f20b1){const _0x54c0e8=_0x348c4;let _0x350a08=this['contents']['fontSize'];const _0xc0fa2a=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0xef2665=_0xc0fa2a[_0x54c0e8(0x210)](_0x5f20b1);if(!_0xef2665)break;const _0x12134f=String(_0xef2665[0x1])[_0x54c0e8(0x198)]();if(_0x12134f==='{')this[_0x54c0e8(0x2b3)]();else{if(_0x12134f==='}')this['makeFontSmaller']();else _0x12134f==='FS'&&(this[_0x54c0e8(0x14e)][_0x54c0e8(0x151)]=parseInt(_0xef2665[0x3])[_0x54c0e8(0x28c)](VisuMZ['MessageCore'][_0x54c0e8(0x2b2)][_0x54c0e8(0x2fa)][_0x54c0e8(0x1bc)],VisuMZ[_0x54c0e8(0x166)][_0x54c0e8(0x2b2)][_0x54c0e8(0x2fa)]['FontBiggerCap']));}this[_0x54c0e8(0x14e)][_0x54c0e8(0x151)]>_0x350a08&&(_0x350a08=this[_0x54c0e8(0x14e)]['fontSize']);}return _0x350a08;},Window_Base['prototype']['processPxTextCode']=function(_0x3368da){const _0x151bcc=_0x348c4;_0x3368da['x']=this[_0x151bcc(0x2b4)](_0x3368da),VisuMZ[_0x151bcc(0x166)]['Settings'][_0x151bcc(0x2fa)][_0x151bcc(0x261)]&&(_0x3368da['x']+=_0x3368da[_0x151bcc(0x1d6)]);},Window_Base['prototype']['processPyTextCode']=function(_0x5cf72f){const _0x315472=_0x348c4;_0x5cf72f['y']=this[_0x315472(0x2b4)](_0x5cf72f),VisuMZ[_0x315472(0x166)][_0x315472(0x2b2)][_0x315472(0x2fa)][_0x315472(0x261)]&&(_0x5cf72f['y']+=_0x5cf72f['startY']);},Window_Base['prototype'][_0x348c4(0x25f)]=function(_0x53fa5a){const _0x48a756=_0x348c4;this[_0x48a756(0x14e)][_0x48a756(0x303)]=!!_0x53fa5a;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x15f)]=function(_0x35676e){const _0x4480ce=_0x348c4;this[_0x4480ce(0x14e)][_0x4480ce(0x3b5)]=!!_0x35676e;},Window_Base[_0x348c4(0xf4)]['processTextAlignmentChange']=function(_0x5f564b){const _0xecd6ff=_0x348c4,_0x11a5b8=this['obtainEscapeParam'](_0x5f564b);if(!_0x5f564b[_0xecd6ff(0x3ee)])return;switch(_0x11a5b8){case 0x0:this['setTextAlignment'](_0xecd6ff(0x137));return;case 0x1:this[_0xecd6ff(0x2fb)]('left');break;case 0x2:this['setTextAlignment'](_0xecd6ff(0x492));break;case 0x3:this[_0xecd6ff(0x2fb)]('right');break;}this[_0xecd6ff(0x3a0)](_0x5f564b);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x3a0)]=function(_0x25dc1b){const _0x25b506=_0x348c4;if(!_0x25dc1b[_0x25b506(0x3ee)])return;if(_0x25dc1b[_0x25b506(0x1a8)])return;if(this['getTextAlignment']()===_0x25b506(0x137))return;let _0x30a2e9=_0x25dc1b[_0x25b506(0x46b)][_0x25b506(0xe3)](_0x25b506(0x471),_0x25dc1b[_0x25b506(0x169)]+0x1),_0x39dd18=_0x25dc1b[_0x25b506(0x46b)][_0x25b506(0xe3)]('\x0a',_0x25dc1b[_0x25b506(0x169)]+0x1);if(_0x30a2e9<0x0)_0x30a2e9=_0x25dc1b[_0x25b506(0x46b)][_0x25b506(0x3f1)]+0x1;if(_0x39dd18>0x0)_0x30a2e9=Math[_0x25b506(0x2e0)](_0x30a2e9,_0x39dd18);const _0x1e1e60=_0x25dc1b[_0x25b506(0x46b)][_0x25b506(0x36b)](_0x25dc1b[_0x25b506(0x169)],_0x30a2e9),_0x3241bf=this[_0x25b506(0x3e2)](_0x1e1e60)[_0x25b506(0x1b3)],_0x2ef256=_0x25dc1b[_0x25b506(0x1b3)]||this['innerWidth']-0x8,_0x356743=this[_0x25b506(0x20d)]===Window_Message&&$gameMessage[_0x25b506(0x360)]()!=='';switch(this[_0x25b506(0x342)]()){case _0x25b506(0x26b):_0x25dc1b['x']=_0x25dc1b[_0x25b506(0x1d6)];break;case _0x25b506(0x492):_0x25dc1b['x']=_0x25dc1b[_0x25b506(0x1d6)],_0x25dc1b['x']+=Math[_0x25b506(0x455)]((_0x2ef256-_0x3241bf)/0x2);_0x356743&&(_0x25dc1b['x']-=_0x25dc1b['startX']/0x2);break;case _0x25b506(0x19a):_0x25dc1b['x']=_0x2ef256-_0x3241bf+_0x25dc1b[_0x25b506(0x1d6)];_0x356743&&(_0x25dc1b['x']-=_0x25dc1b[_0x25b506(0x1d6)]);break;}},Window_Base[_0x348c4(0xf4)][_0x348c4(0x3e2)]=function(_0x3374fb){const _0x16c650=_0x348c4;_0x3374fb=_0x3374fb[_0x16c650(0x2f2)](/\x1b!/g,''),_0x3374fb=_0x3374fb[_0x16c650(0x2f2)](/\x1b\|/g,''),_0x3374fb=_0x3374fb[_0x16c650(0x2f2)](/\x1b\./g,'');const _0x169d0f=this[_0x16c650(0xd2)](_0x3374fb,0x0,0x0,0x0),_0x5b95da=this[_0x16c650(0x1bf)]();return _0x169d0f[_0x16c650(0x3ee)]=![],this['processAllText'](_0x169d0f),this[_0x16c650(0x26f)](_0x5b95da),{'width':_0x169d0f[_0x16c650(0xe4)],'height':_0x169d0f[_0x16c650(0x3d5)]};},Window_Base[_0x348c4(0x1b1)]=VisuMZ[_0x348c4(0x166)][_0x348c4(0x2b2)][_0x348c4(0x280)][_0x348c4(0x442)]||0x0,Window_Base['prototype'][_0x348c4(0x1dd)]=function(_0x2d7aa0,_0x3d285d){const _0xbefdc2=_0x348c4,_0xa073d1=(_0x2d7aa0[_0xbefdc2(0x1a8)]?-0x1:0x1)*this[_0xbefdc2(0x423)]('\x20');if(!_0x3d285d)_0x2d7aa0['x']+=_0xa073d1;if(this['obtainEscapeParam'](_0x2d7aa0)>0x0&&!_0x3d285d)_0x2d7aa0['x']+=_0xa073d1;if(_0x2d7aa0[_0xbefdc2(0x1a8)])return;let _0x4943f6;_0x3d285d?_0x4943f6=_0x2d7aa0[_0xbefdc2(0x46b)][_0xbefdc2(0xe3)](_0xbefdc2(0xff),_0x2d7aa0[_0xbefdc2(0x169)]+0x1):_0x4943f6=_0x2d7aa0['text'][_0xbefdc2(0xe3)](_0xbefdc2(0x21d),_0x2d7aa0[_0xbefdc2(0x169)]+0x1);let _0x5ce2ed=_0x2d7aa0[_0xbefdc2(0x46b)][_0xbefdc2(0xe3)]('\x0a',_0x2d7aa0[_0xbefdc2(0x169)]+0x1);if(_0x4943f6<0x0)_0x4943f6=_0x2d7aa0['text'][_0xbefdc2(0x3f1)]+0x1;if(_0x5ce2ed>0x0)_0x4943f6=Math[_0xbefdc2(0x2e0)](_0x4943f6,_0x5ce2ed);const _0x420d0d=_0x2d7aa0[_0xbefdc2(0x46b)][_0xbefdc2(0x36b)](_0x2d7aa0['index'],_0x4943f6),_0x4e5f2d=this[_0xbefdc2(0x1b7)](_0x420d0d)['width'];let _0x393fd1=_0x2d7aa0[_0xbefdc2(0x1b3)]||this[_0xbefdc2(0x3f8)];_0x393fd1-=Window_Base[_0xbefdc2(0x1b1)];if(this['constructor']===Window_Message){const _0x5a3732=$gameMessage[_0xbefdc2(0x360)]()===''?0x0:ImageManager[_0xbefdc2(0x326)]+0x14;_0x393fd1-=_0x5a3732,VisuMZ[_0xbefdc2(0x166)][_0xbefdc2(0x2b2)][_0xbefdc2(0x280)]['TightWrap']&&(_0x393fd1-=_0x5a3732);}let _0xfb2e67=![];_0x2d7aa0['x']+_0x4e5f2d>_0x2d7aa0[_0xbefdc2(0x1d6)]+_0x393fd1&&(_0xfb2e67=!![]),_0x4e5f2d===0x0&&(_0xfb2e67=![]),_0xfb2e67&&(_0x2d7aa0['text']=_0x2d7aa0[_0xbefdc2(0x46b)][_0xbefdc2(0x158)](0x0,_0x2d7aa0[_0xbefdc2(0x169)])+'\x0a'+_0x2d7aa0['text'][_0xbefdc2(0x24d)](_0x2d7aa0[_0xbefdc2(0x169)]));},Window_Base['prototype'][_0x348c4(0x1b7)]=function(_0x2f2682){const _0xe79906=_0x348c4,_0x407bb1=this['createTextState'](_0x2f2682,0x0,0x0,0x0),_0x45902b=this[_0xe79906(0x1bf)]();return _0x407bb1[_0xe79906(0x3ee)]=![],this[_0xe79906(0x356)](![]),this[_0xe79906(0x408)](_0x407bb1),this['setWordWrap'](!![]),this[_0xe79906(0x26f)](_0x45902b),{'width':_0x407bb1[_0xe79906(0xe4)],'height':_0x407bb1[_0xe79906(0x3d5)]};},Window_Base['prototype'][_0x348c4(0xef)]=function(_0x242ad5){return this['obtainEscapeParam'](_0x242ad5);},Window_Base['prototype'][_0x348c4(0x3a8)]=function(_0x4c7537){const _0x5504dd=_0x348c4,_0x52860a=this[_0x5504dd(0x299)](_0x4c7537)['split'](',');if(!_0x4c7537[_0x5504dd(0x3ee)])return;const _0x20087d=_0x52860a[0x0][_0x5504dd(0x23e)](),_0x3f0ea2=_0x52860a[0x1]||0x0,_0x2e908d=_0x52860a[0x2]||0x0,_0xf90631=ImageManager['loadPicture'](_0x20087d),_0x55dee2=this[_0x5504dd(0x14e)][_0x5504dd(0xf2)];_0xf90631['addLoadListener'](this[_0x5504dd(0x372)][_0x5504dd(0x2d2)](this,_0xf90631,_0x4c7537['x'],_0x4c7537['y'],_0x3f0ea2,_0x2e908d,_0x55dee2));},Window_Base[_0x348c4(0xf4)][_0x348c4(0x372)]=function(_0x43a213,_0x115959,_0x2189c6,_0x359e90,_0x5b2a45,_0x3c6774){const _0x279299=_0x348c4;_0x359e90=_0x359e90||_0x43a213[_0x279299(0x1b3)],_0x5b2a45=_0x5b2a45||_0x43a213[_0x279299(0x17e)],this[_0x279299(0x415)][_0x279299(0xf2)]=_0x3c6774,this[_0x279299(0x415)][_0x279299(0x234)](_0x43a213,0x0,0x0,_0x43a213[_0x279299(0x1b3)],_0x43a213[_0x279299(0x17e)],_0x115959,_0x2189c6,_0x359e90,_0x5b2a45),this[_0x279299(0x415)][_0x279299(0xf2)]=0xff;},Window_Base[_0x348c4(0xf4)]['processDrawCenteredPicture']=function(_0x19ff23){const _0x17a972=_0x348c4,_0x270b01=this[_0x17a972(0x299)](_0x19ff23)[_0x17a972(0x496)](',');if(!_0x19ff23[_0x17a972(0x3ee)])return;const _0x44ab2b=_0x270b01[0x0]['trim'](),_0x23ecd4=ImageManager[_0x17a972(0x3fd)](_0x44ab2b),_0x58f412=JsonEx[_0x17a972(0x17f)](_0x19ff23),_0x19fd44=this['contents'][_0x17a972(0xf2)];_0x23ecd4['addLoadListener'](this[_0x17a972(0x2f7)][_0x17a972(0x2d2)](this,_0x23ecd4,_0x58f412,_0x19fd44));},Window_Base['prototype'][_0x348c4(0x2f7)]=function(_0x27f40a,_0x1f86af,_0x516405){const _0xe85f17=_0x348c4,_0x3333c8=_0x1f86af[_0xe85f17(0x1b3)]||this['innerWidth'],_0x1c3016=this[_0xe85f17(0xfc)]!==undefined?this[_0xe85f17(0x18d)]():this[_0xe85f17(0x45a)],_0xe3b620=_0x3333c8/_0x27f40a[_0xe85f17(0x1b3)],_0x21c34f=_0x1c3016/_0x27f40a[_0xe85f17(0x17e)],_0x400037=Math[_0xe85f17(0x2e0)](_0xe3b620,_0x21c34f,0x1),_0x3fc670=this[_0xe85f17(0xfc)]!==undefined?(this['itemRectWithPadding'](0x0)[_0xe85f17(0x17e)]-this[_0xe85f17(0x30e)]())/0x2:0x0,_0x12d34b=_0x27f40a[_0xe85f17(0x1b3)]*_0x400037,_0x2ce3de=_0x27f40a[_0xe85f17(0x17e)]*_0x400037,_0x2d0536=Math[_0xe85f17(0x455)]((_0x3333c8-_0x12d34b)/0x2)+_0x1f86af[_0xe85f17(0x1d6)],_0x385795=Math[_0xe85f17(0x455)]((_0x1c3016-_0x2ce3de)/0x2)+_0x1f86af[_0xe85f17(0x1b8)]-_0x3fc670*0x2;this[_0xe85f17(0x415)][_0xe85f17(0xf2)]=_0x516405,this[_0xe85f17(0x415)]['blt'](_0x27f40a,0x0,0x0,_0x27f40a['width'],_0x27f40a[_0xe85f17(0x17e)],_0x2d0536,_0x385795,_0x12d34b,_0x2ce3de),this['contentsBack']['paintOpacity']=0xff;},Window_Base[_0x348c4(0xf4)][_0x348c4(0x3e4)]=function(_0x4c1ef9){const _0x3fc806=_0x348c4,_0x2df3a8=this[_0x3fc806(0x2b4)](_0x4c1ef9);if(_0x4c1ef9[_0x3fc806(0x3ee)])this['setColorLock'](_0x2df3a8>0x0);},Window_Base[_0x348c4(0xf4)]['processCustomWait']=function(_0x382ce3){const _0x416b19=_0x348c4,_0x1338bf=this[_0x416b19(0x2b4)](_0x382ce3);this[_0x416b19(0x20d)]===Window_Message&&_0x382ce3[_0x416b19(0x3ee)]&&this[_0x416b19(0xc9)](_0x1338bf);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x3ef)]=function(_0x548c25){const _0xc3f1b8=_0x348c4;this[_0xc3f1b8(0x46d)]=this['obtainEscapeParam'](_0x548c25),this[_0xc3f1b8(0xe6)]=!![],this[_0xc3f1b8(0x118)]=!![];},VisuMZ['MessageCore'][_0x348c4(0xdd)]=function(_0x359ae4){const _0xcf8e8a=_0x348c4;if($gameTemp[_0xcf8e8a(0x2f0)]()){let _0x2da5d7=_0xcf8e8a(0x2f8)[_0xcf8e8a(0x413)](_0x359ae4[_0xcf8e8a(0x20d)][_0xcf8e8a(0x438)]);alert(_0x2da5d7),SceneManager[_0xcf8e8a(0x3b3)]();}},Window_Base['prototype']['loadMessageFace']=function(){const _0x2a9eb8=_0x348c4;VisuMZ[_0x2a9eb8(0x166)][_0x2a9eb8(0xdd)](this);},Window_Base[_0x348c4(0xf4)][_0x348c4(0x192)]=function(){const _0xc10384=_0x348c4;VisuMZ[_0xc10384(0x166)][_0xc10384(0xdd)](this);},Window_Base[_0x348c4(0xf4)]['setTextDelay']=function(){const _0x80dc9=_0x348c4;VisuMZ[_0x80dc9(0x166)]['NonSupportedTextCodes'](this);},Window_Help[_0x348c4(0xf4)][_0x348c4(0x474)]=function(){const _0x43c226=_0x348c4;this[_0x43c226(0x356)]($gameSystem['isHelpWindowWordWrap']());},Window_Help[_0x348c4(0xf4)][_0x348c4(0x257)]=function(){return!![];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x433)]=Window_Help[_0x348c4(0xf4)][_0x348c4(0x159)],Window_Help[_0x348c4(0xf4)][_0x348c4(0x159)]=function(){const _0x564b25=_0x348c4;this[_0x564b25(0x1d0)](),VisuMZ[_0x564b25(0x166)]['Window_Help_refresh'][_0x564b25(0x290)](this),this['resetWordWrap']();},VisuMZ[_0x348c4(0x166)]['Window_Options_addGeneralOptions']=Window_Options[_0x348c4(0xf4)]['addGeneralOptions'],Window_Options[_0x348c4(0xf4)][_0x348c4(0x31d)]=function(){const _0x126fe9=_0x348c4;VisuMZ[_0x126fe9(0x166)][_0x126fe9(0x27d)][_0x126fe9(0x290)](this),this[_0x126fe9(0x1ae)]();},Window_Options[_0x348c4(0xf4)][_0x348c4(0x1ae)]=function(){const _0x88af9e=_0x348c4;VisuMZ[_0x88af9e(0x166)]['Settings'][_0x88af9e(0x27a)][_0x88af9e(0x17c)]&&TextManager['isVisuMzLocalizationEnabled']()&&this[_0x88af9e(0x101)](),VisuMZ['MessageCore'][_0x88af9e(0x2b2)]['TextSpeed']['AddOption']&&this['addMessageCoreTextSpeedCommand']();},Window_Options['prototype'][_0x348c4(0x101)]=function(){const _0x5f5e03=_0x348c4,_0x523afc=TextManager[_0x5f5e03(0x2c6)],_0x5519b0=_0x5f5e03(0x319);this[_0x5f5e03(0x1ef)](_0x523afc,_0x5519b0);},Window_Options[_0x348c4(0xf4)]['addMessageCoreTextSpeedCommand']=function(){const _0x8e3724=_0x348c4,_0x4ce3da=TextManager[_0x8e3724(0x2cc)],_0x1d3b08='textSpeed';this[_0x8e3724(0x1ef)](_0x4ce3da,_0x1d3b08);},VisuMZ[_0x348c4(0x166)]['Window_Options_statusText']=Window_Options['prototype'][_0x348c4(0x461)],Window_Options[_0x348c4(0xf4)][_0x348c4(0x461)]=function(_0x4f1683){const _0x7e05be=_0x348c4,_0x269cfe=this[_0x7e05be(0x1bb)](_0x4f1683);if(_0x269cfe===_0x7e05be(0x319))return this[_0x7e05be(0x225)]();if(_0x269cfe==='textSpeed')return this[_0x7e05be(0x35d)]();return VisuMZ[_0x7e05be(0x166)][_0x7e05be(0x26d)][_0x7e05be(0x290)](this,_0x4f1683);},Window_Options['prototype'][_0x348c4(0x225)]=function(){const _0x1172bb=_0x348c4,_0x54f1c4=ConfigManager[_0x1172bb(0x319)];return TextManager[_0x1172bb(0x2a3)](_0x54f1c4);},Window_Options[_0x348c4(0xf4)]['textSpeedStatusText']=function(){const _0x4d909b=_0x348c4,_0x56f4a9=this[_0x4d909b(0x3d6)](_0x4d909b(0x476));return _0x56f4a9>0xa?TextManager['instantTextSpeed']:_0x56f4a9;},VisuMZ[_0x348c4(0x166)][_0x348c4(0xfe)]=Window_Options['prototype']['isVolumeSymbol'],Window_Options[_0x348c4(0xf4)][_0x348c4(0x157)]=function(_0x20cf0c){const _0x7250e5=_0x348c4;if(_0x20cf0c==='textLocale')return!![];if(_0x20cf0c===_0x7250e5(0x476))return!![];return VisuMZ[_0x7250e5(0x166)][_0x7250e5(0xfe)][_0x7250e5(0x290)](this,_0x20cf0c);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x354)]=Window_Options['prototype']['changeVolume'],Window_Options[_0x348c4(0xf4)][_0x348c4(0x1b0)]=function(_0x5db129,_0x2af730,_0x1647af){const _0x59ff4e=_0x348c4;if(_0x5db129==='textLocale')return this[_0x59ff4e(0x39d)](_0x2af730,_0x1647af);if(_0x5db129==='textSpeed')return this[_0x59ff4e(0x29b)](_0x5db129,_0x2af730,_0x1647af);VisuMZ[_0x59ff4e(0x166)][_0x59ff4e(0x354)]['call'](this,_0x5db129,_0x2af730,_0x1647af);},Window_Options[_0x348c4(0xf4)][_0x348c4(0x39d)]=function(_0x37c536,_0x4bfc33){const _0x255f5=_0x348c4,_0x3ddda8=VisuMZ[_0x255f5(0x166)][_0x255f5(0x2b2)][_0x255f5(0x27a)]['Languages']||[],_0x143442=ConfigManager['textLocale'];let _0xc5383b=_0x3ddda8[_0x255f5(0xe3)](_0x143442);_0xc5383b+=_0x37c536?0x1:-0x1;if(_0xc5383b>=_0x3ddda8[_0x255f5(0x3f1)])_0xc5383b=_0x4bfc33?0x0:_0x3ddda8[_0x255f5(0x3f1)]-0x1;if(_0xc5383b<0x0)_0xc5383b=_0x4bfc33?_0x3ddda8[_0x255f5(0x3f1)]-0x1:0x0;this['changeValue'](_0x255f5(0x319),_0x3ddda8[_0xc5383b]);},Window_Options[_0x348c4(0xf4)][_0x348c4(0x29b)]=function(_0x58a645,_0x14f089,_0x31b20f){const _0x5485b8=_0x348c4,_0x1f103b=this[_0x5485b8(0x3d6)](_0x58a645),_0x57cc2a=0x1,_0xc59619=_0x1f103b+(_0x14f089?_0x57cc2a:-_0x57cc2a);_0xc59619>0xb&&_0x31b20f?this['changeValue'](_0x58a645,0x1):this['changeValue'](_0x58a645,_0xc59619[_0x5485b8(0x28c)](0x1,0xb));},Window_Message[_0x348c4(0xf4)]['contentsHeight']=function(){const _0x161fbe=_0x348c4;let _0x4d3dc1=Window_Base[_0x161fbe(0xf4)][_0x161fbe(0x44e)][_0x161fbe(0x290)](this);return _0x4d3dc1-=this[_0x161fbe(0x22e)](),_0x4d3dc1;},Window_Message[_0x348c4(0xf4)][_0x348c4(0x1c6)]=function(){const _0xf7de25=_0x348c4;Window_Base[_0xf7de25(0xf4)][_0xf7de25(0x1c6)][_0xf7de25(0x290)](this),VisuMZ[_0xf7de25(0x166)][_0xf7de25(0x2b2)][_0xf7de25(0x2fa)][_0xf7de25(0x1c8)]&&this[_0xf7de25(0xdb)]();},Window_Message[_0x348c4(0xf4)][_0x348c4(0xdb)]=function(){const _0x40f9b1=_0x348c4;this['_dimmerSprite']['x']=Math[_0x40f9b1(0x46a)](this[_0x40f9b1(0x1b3)]/0x2),this[_0x40f9b1(0x3d7)][_0x40f9b1(0x3db)]['x']=0.5,this[_0x40f9b1(0x3d7)][_0x40f9b1(0x3e5)]['x']=Graphics['width'];},VisuMZ[_0x348c4(0x166)][_0x348c4(0x1bd)]=Window_Message[_0x348c4(0xf4)]['clearFlags'],Window_Message[_0x348c4(0xf4)][_0x348c4(0x1ee)]=function(){const _0x212325=_0x348c4;VisuMZ['MessageCore'][_0x212325(0x1bd)][_0x212325(0x290)](this),this[_0x212325(0x1d0)](),this[_0x212325(0x474)](),this[_0x212325(0x28e)](![]),this['setTextAlignment']('default'),this['setTextDelay'](VisuMZ['MessageCore'][_0x212325(0x2b2)][_0x212325(0x2fa)][_0x212325(0x1ab)]);},Window_Message[_0x348c4(0xf4)]['resetWordWrap']=function(){const _0x1fa07d=_0x348c4;this[_0x1fa07d(0x356)]($gameSystem['isMessageWindowWordWrap']());},Window_Message[_0x348c4(0xf4)][_0x348c4(0x257)]=function(){return!![];},Window_Message[_0x348c4(0xf4)][_0x348c4(0x2ff)]=function(_0x312c5a){const _0x4c43ea=_0x348c4,_0x2dcb1d=0xb-ConfigManager[_0x4c43ea(0x476)];_0x312c5a=Math[_0x4c43ea(0x46a)](_0x312c5a*_0x2dcb1d),this[_0x4c43ea(0x37d)]=_0x312c5a,this['_textDelay']=_0x312c5a;},VisuMZ[_0x348c4(0x166)]['Window_Message_isTriggered']=Window_Message[_0x348c4(0xf4)]['isTriggered'],Window_Message['prototype'][_0x348c4(0x1e9)]=function(){const _0x244e90=_0x348c4;return VisuMZ[_0x244e90(0x166)][_0x244e90(0x154)][_0x244e90(0x290)](this)||Input[_0x244e90(0x127)](VisuMZ[_0x244e90(0x166)]['Settings'][_0x244e90(0x2fa)]['FastForwardKey']);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x2ba)]=Window_Message[_0x348c4(0xf4)][_0x348c4(0x172)],Window_Message[_0x348c4(0xf4)][_0x348c4(0x172)]=function(){const _0xfcc7e=_0x348c4;let _0xef28cd=this['y'];this['x']=Math['round']((Graphics[_0xfcc7e(0x3ac)]-this[_0xfcc7e(0x1b3)])/0x2),VisuMZ['MessageCore'][_0xfcc7e(0x2ba)][_0xfcc7e(0x290)](this);if(this[_0xfcc7e(0x32b)])this['y']=_0xef28cd;this['updateXyOffsets'](),this['updateForcedPlacement'](),this[_0xfcc7e(0x416)](),this[_0xfcc7e(0x249)]();},VisuMZ[_0x348c4(0x166)][_0x348c4(0x149)]=Window_Message[_0x348c4(0xf4)][_0x348c4(0x282)],Window_Message[_0x348c4(0xf4)][_0x348c4(0x282)]=function(_0x28056f){const _0x50e71c=_0x348c4;this['convertNewPageTextStateMacros'](_0x28056f),this['onNewPageMessageCore'](_0x28056f),VisuMZ[_0x50e71c(0x166)][_0x50e71c(0x149)][_0x50e71c(0x290)](this,_0x28056f),this['createContents']();},Window_Message[_0x348c4(0xf4)]['convertNewPageTextStateMacros']=function(_0x8d9f86){const _0x44b56c=_0x348c4;if(!_0x8d9f86)return;this[_0x44b56c(0x33c)]=![],_0x8d9f86[_0x44b56c(0x46b)]=this[_0x44b56c(0x30d)](_0x8d9f86[_0x44b56c(0x46b)]),this[_0x44b56c(0x384)]&&(_0x8d9f86[_0x44b56c(0x46b)]=this[_0x44b56c(0xd3)](_0x8d9f86[_0x44b56c(0x46b)]),this[_0x44b56c(0x33c)]=!![]);},Window_Message[_0x348c4(0xf4)]['prepareWordWrapEscapeCharacters']=function(_0x265b4){const _0x5a2381=_0x348c4;if(this[_0x5a2381(0x33c)])return _0x265b4;return Window_Base[_0x5a2381(0xf4)]['prepareWordWrapEscapeCharacters'][_0x5a2381(0x290)](this,_0x265b4);},Window_Message[_0x348c4(0xf4)][_0x348c4(0x388)]=function(_0x17ebd4){const _0x35bf75=_0x348c4;this[_0x35bf75(0x2a8)](_0x17ebd4),this[_0x35bf75(0x39f)](_0x17ebd4),this[_0x35bf75(0x26e)]();},VisuMZ[_0x348c4(0x166)][_0x348c4(0x102)]=Window_Message[_0x348c4(0xf4)][_0x348c4(0x38e)],Window_Message[_0x348c4(0xf4)]['terminateMessage']=function(){const _0x117e00=_0x348c4;VisuMZ[_0x117e00(0x166)][_0x117e00(0x102)]['call'](this),this['clearFlags']();if(this[_0x117e00(0x146)])this[_0x117e00(0x1b9)]();},Window_Message['prototype'][_0x348c4(0x26e)]=function(){const _0x4abe8d=_0x348c4;this[_0x4abe8d(0x1b3)]=$gameSystem[_0x4abe8d(0x139)]()+this['addedWidth']();;this[_0x4abe8d(0x1b3)]=Math[_0x4abe8d(0x2e0)](Graphics[_0x4abe8d(0x1b3)],this['width']);const _0x2a7233=$gameSystem[_0x4abe8d(0x1f6)]();this[_0x4abe8d(0x17e)]=SceneManager[_0x4abe8d(0x219)]['calcWindowHeight'](_0x2a7233,![])+this[_0x4abe8d(0x22e)](),this[_0x4abe8d(0x17e)]=Math[_0x4abe8d(0x2e0)](Graphics[_0x4abe8d(0x17e)],this[_0x4abe8d(0x17e)]);if($gameTemp[_0x4abe8d(0x407)])this['resetPositionX']();},Window_Message[_0x348c4(0xf4)][_0x348c4(0x362)]=function(){return 0x0;},Window_Message[_0x348c4(0xf4)][_0x348c4(0x22e)]=function(){return 0x0;},Window_Message[_0x348c4(0xf4)][_0x348c4(0x123)]=function(){const _0x419f54=_0x348c4;this['x']=(Graphics[_0x419f54(0x3ac)]-this['width'])/0x2,$gameTemp[_0x419f54(0x407)]=undefined,this[_0x419f54(0x416)]();},Window_Message['prototype'][_0x348c4(0x1a4)]=function(){const _0x14c188=_0x348c4,_0x44d94a={'x':this['x'],'y':this['y']};Window_Base[_0x14c188(0xf4)][_0x14c188(0x1a4)][_0x14c188(0x290)](this),this[_0x14c188(0xde)](_0x44d94a);},Window_Message[_0x348c4(0xf4)][_0x348c4(0x317)]=function(){return!![];},Window_Message[_0x348c4(0xf4)][_0x348c4(0xde)]=function(_0x4cb477){const _0x2ae2bf=_0x348c4;this[_0x2ae2bf(0x4a0)]&&(this['_nameBoxWindow']['x']+=this['x']-_0x4cb477['x'],this['_nameBoxWindow']['y']+=this['y']-_0x4cb477['y']);},Window_Message[_0x348c4(0xf4)]['resetRect']=function(_0x1309b2,_0x2bef04){const _0x37c142=_0x348c4;this[_0x37c142(0x454)](this[_0x37c142(0x21b)]['x'],this[_0x37c142(0x378)]*(Graphics[_0x37c142(0x2fd)]-this['height'])/0x2,this[_0x37c142(0x21b)][_0x37c142(0x1b3)],this['_resetRect'][_0x37c142(0x17e)],_0x1309b2,_0x2bef04);},Window_Message[_0x348c4(0xf4)]['processCommonEvent']=function(_0x20e05e){const _0x1487c1=_0x348c4,_0x4cd078=Window_Base['prototype'][_0x1487c1(0xef)][_0x1487c1(0x290)](this,_0x20e05e);_0x20e05e['drawing']&&this[_0x1487c1(0x25e)](_0x4cd078);},Window_Message[_0x348c4(0xf4)][_0x348c4(0x25e)]=function(_0x394fcd){const _0x5f2500=_0x348c4;if($gameParty[_0x5f2500(0x152)]()){}else $gameMap[_0x5f2500(0x429)](_0x394fcd);},Window_Message[_0x348c4(0xf4)][_0x348c4(0x19c)]=function(_0x515e0a){const _0x48bbae=_0x348c4;this[_0x48bbae(0x37d)]--,this['_textDelayCount']<=0x0&&(this[_0x48bbae(0x205)](_0x515e0a),Window_Base[_0x48bbae(0xf4)][_0x48bbae(0x19c)][_0x48bbae(0x290)](this,_0x515e0a));},Window_Message[_0x348c4(0xf4)]['onProcessCharacter']=function(_0xd82c16){const _0x52157d=_0x348c4;this['_textDelayCount']=this[_0x52157d(0x147)];if(this['_textDelay']<=0x0)this[_0x52157d(0x3b4)]=!![];},VisuMZ[_0x348c4(0x166)]['Window_Message_processEscapeCharacter']=Window_Message[_0x348c4(0xf4)][_0x348c4(0x2c2)],Window_Message[_0x348c4(0xf4)][_0x348c4(0x2c2)]=function(_0x309537,_0x4f20bc){const _0x8c64d5=_0x348c4;!_0x4f20bc[_0x8c64d5(0x3ee)]?Window_Base[_0x8c64d5(0xf4)][_0x8c64d5(0x2c2)]['call'](this,_0x309537,_0x4f20bc):VisuMZ[_0x8c64d5(0x166)][_0x8c64d5(0x29e)]['call'](this,_0x309537,_0x4f20bc);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x104)]=Window_Message['prototype'][_0x348c4(0x254)],Window_Message[_0x348c4(0xf4)][_0x348c4(0x254)]=function(_0x244b0a){const _0x16256b=_0x348c4;if(this[_0x16256b(0x103)])return![];return VisuMZ['MessageCore'][_0x16256b(0x104)][_0x16256b(0x290)](this,_0x244b0a);},Window_Message['prototype']['prepareForcedPositionEscapeCharacters']=function(_0x1eaea6){const _0x54821e=_0x348c4;let _0x165424=_0x1eaea6[_0x54821e(0x46b)];this[_0x54821e(0x1d1)]={};if(this[_0x54821e(0x36d)]())return _0x165424;_0x165424=_0x165424[_0x54821e(0x2f2)](/<POSITION:[ ]*(.*?)>/gi,(_0x376a62,_0x594638)=>{const _0x565127=_0x54821e,_0x4fed75=_0x594638[_0x565127(0x496)](',')[_0x565127(0x144)](_0x32f00e=>Number(_0x32f00e)||0x0);if(_0x4fed75[0x0]!==undefined)this[_0x565127(0x1d1)]['x']=Number(_0x4fed75[0x0]);if(_0x4fed75[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x4fed75[0x1]);if(_0x4fed75[0x2]!==undefined)this[_0x565127(0x1d1)][_0x565127(0x1b3)]=Number(_0x4fed75[0x2]);if(_0x4fed75[0x3]!==undefined)this[_0x565127(0x1d1)]['height']=Number(_0x4fed75[0x3]);return'';}),_0x165424=_0x165424[_0x54821e(0x2f2)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x1496f9,_0x2294e0)=>{const _0x144177=_0x54821e,_0x5d38f6=_0x2294e0['split'](',')[_0x144177(0x144)](_0x4d9fbf=>Number(_0x4d9fbf)||0x0);if(_0x5d38f6[0x0]!==undefined)this[_0x144177(0x1d1)]['x']=Number(_0x5d38f6[0x0]);if(_0x5d38f6[0x1]!==undefined)this[_0x144177(0x1d1)]['y']=Number(_0x5d38f6[0x1]);return'';}),_0x165424=_0x165424[_0x54821e(0x2f2)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x2aaede,_0x3165f0)=>{const _0x377d62=_0x54821e,_0x16bbff=_0x3165f0[_0x377d62(0x496)](',')[_0x377d62(0x144)](_0x50b9af=>Number(_0x50b9af)||0x0);if(_0x16bbff[0x0]!==undefined)this[_0x377d62(0x1d1)][_0x377d62(0x1b3)]=Number(_0x16bbff[0x2]);if(_0x16bbff[0x1]!==undefined)this[_0x377d62(0x1d1)][_0x377d62(0x17e)]=Number(_0x16bbff[0x3]);return'';}),_0x165424=_0x165424[_0x54821e(0x2f2)](/<OFFSET:[ ]*(.*?)>/gi,(_0x274f93,_0x1ac33e)=>{const _0x1b98c4=_0x54821e,_0x3c4596=_0x1ac33e[_0x1b98c4(0x496)](',')[_0x1b98c4(0x144)](_0x3e92ed=>Number(_0x3e92ed)||0x0);let _0x7306cc=_0x3c4596[0x0]||0x0,_0x1b0ae3=_0x3c4596[0x1]||0x0;return $gameSystem[_0x1b98c4(0x300)](_0x7306cc,_0x1b0ae3),'';}),_0x1eaea6['text']=_0x165424;},Window_Message[_0x348c4(0xf4)]['updateXyOffsets']=function(){const _0x2410ea=_0x348c4,_0x1fa189=$gameSystem[_0x2410ea(0x174)]();this['x']+=_0x1fa189['x'],this['y']+=_0x1fa189['y'];},Window_Message[_0x348c4(0xf4)][_0x348c4(0x233)]=function(){const _0x1307f0=_0x348c4;this[_0x1307f0(0x1d1)]=this[_0x1307f0(0x1d1)]||{};const _0x36d743=['x','y',_0x1307f0(0x1b3),'height'];for(const _0x317bc6 of _0x36d743){this[_0x1307f0(0x1d1)][_0x317bc6]!==undefined&&(this[_0x317bc6]=Number(this['_forcedPosition'][_0x317bc6]));}},Window_Message['prototype'][_0x348c4(0x39f)]=function(_0x32e1ac){const _0x1955ac=_0x348c4;this['_currentAutoSize']=![];let _0x2664fe=_0x32e1ac['text'];_0x2664fe=_0x2664fe['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x57b122=_0x54a8;return this[_0x57b122(0x1ec)](_0x2664fe,!![],!![]),this['processAutoPosition'](_0x57b122(0x42a)),'';}),_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x311316=_0x1955ac;return this[_0x311316(0x1ec)](_0x2664fe,!![],![]),this['processAutoPosition'](_0x311316(0x42a)),'';}),_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x3bd201=_0x1955ac;return this[_0x3bd201(0x1ec)](_0x2664fe,![],!![]),this[_0x3bd201(0x1d4)](_0x3bd201(0x42a)),'';});if(SceneManager[_0x1955ac(0x3c0)]())_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x3bcf3f,_0xaea748)=>{const _0x697cd4=_0x1955ac;return this['processAutoSize'](_0x2664fe,!![],!![]),this[_0x697cd4(0x1d4)](_0x697cd4(0x391),Number(_0xaea748)||0x1),'';}),_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3b40aa,_0x148fb7)=>{const _0x542bc2=_0x1955ac;return this[_0x542bc2(0x1ec)](_0x2664fe,!![],!![]),this[_0x542bc2(0x1d4)](_0x542bc2(0x17b),Number(_0x148fb7)||0x0),'';}),_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x1c068a,_0x2dd00f)=>{const _0x2d1fb8=_0x1955ac;return this[_0x2d1fb8(0x1ec)](_0x2664fe,!![],!![]),this[_0x2d1fb8(0x1d4)](_0x2d1fb8(0x2ad),Number(_0x2dd00f)||0x0),'';});else SceneManager[_0x1955ac(0x497)]()&&(_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x48825a,_0x24d03f)=>{const _0x40819e=_0x1955ac;return this[_0x40819e(0x1ec)](_0x2664fe,!![],!![]),this[_0x40819e(0x1d4)](_0x40819e(0x12d),0x0),'';}),_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x16d3fe,_0x3ca4ad)=>{const _0x3ef21f=_0x1955ac;return this[_0x3ef21f(0x1ec)](_0x2664fe,!![],!![]),this[_0x3ef21f(0x1d4)](_0x3ef21f(0x425),Number(_0x3ca4ad)||0x1),'';}),_0x2664fe=_0x2664fe['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x48d0c6,_0x34e170)=>{const _0x33f45d=_0x1955ac;return this['processAutoSize'](_0x2664fe,!![],!![]),this[_0x33f45d(0x1d4)](_0x33f45d(0x25c),Number(_0x34e170)||0x0),'';}),_0x2664fe=_0x2664fe[_0x1955ac(0x2f2)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x1325e7,_0x2f2fec)=>{const _0xba506d=_0x1955ac;return this[_0xba506d(0x1ec)](_0x2664fe,!![],!![]),this[_0xba506d(0x1d4)](_0xba506d(0x274),Number(_0x2f2fec)||0x0),'';}));_0x32e1ac[_0x1955ac(0x46b)]=_0x2664fe;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x348c4(0x1ff)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x348c4(0xf4)][_0x348c4(0x1ec)]=function(_0xc03c66,_0x354788,_0x7860a4){const _0x12496c=_0x348c4;_0xc03c66=_0xc03c66['replace'](Window_Message[_0x12496c(0x190)],''),_0xc03c66=_0xc03c66[_0x12496c(0x2f2)](Window_Message[_0x12496c(0x1ff)],''),this[_0x12496c(0x17a)]=!![],this[_0x12496c(0x103)]=!![],this[_0x12496c(0x356)](![]);const _0x42b694=this['textSizeExRaw'](_0xc03c66);if(_0x354788){let _0x4f6bcc=_0x42b694[_0x12496c(0x1b3)]+$gameSystem[_0x12496c(0x24e)]()*0x2+0x6;const _0x3d84ab=$gameMessage[_0x12496c(0x360)]()!=='',_0x33ec0a=ImageManager[_0x12496c(0x326)],_0x2c3282=0x14;_0x4f6bcc+=_0x3d84ab?_0x33ec0a+_0x2c3282:0x4;if(_0x4f6bcc%0x2!==0x0)_0x4f6bcc+=0x1;$gameSystem[_0x12496c(0x16a)](_0x4f6bcc);}if(_0x7860a4){let _0x455f67=Math[_0x12496c(0xd9)](_0x42b694[_0x12496c(0x17e)]/this['lineHeight']());$gameSystem[_0x12496c(0x488)](_0x455f67);}this[_0x12496c(0x217)](),this[_0x12496c(0x49d)](),this['_autoSizeCheck']=![],this[_0x12496c(0x146)]=!![];},Window_Message[_0x348c4(0xf4)][_0x348c4(0x217)]=function(){const _0xee6b8=_0x348c4;this['updateDimensions'](),this[_0xee6b8(0x172)](),this[_0xee6b8(0x123)](),this['updateTransform'](),this[_0xee6b8(0x14e)][_0xee6b8(0x2c7)](),this[_0xee6b8(0x1a1)]();},Window_Message[_0x348c4(0xf4)][_0x348c4(0x1d4)]=function(_0x400cbc,_0x53ab4b){const _0x31e49e=_0x348c4;switch(_0x400cbc[_0x31e49e(0x367)]()[_0x31e49e(0x23e)]()){case _0x31e49e(0x391):this['_autoPositionTarget']=$gameActors['actor'](_0x53ab4b);break;case _0x31e49e(0x17b):this[_0x31e49e(0x32b)]=$gameParty[_0x31e49e(0xcb)]()[_0x53ab4b-0x1];break;case _0x31e49e(0x2ad):this[_0x31e49e(0x32b)]=$gameTroop['members']()[_0x53ab4b-0x1];break;case _0x31e49e(0x12d):this[_0x31e49e(0x32b)]=$gamePlayer;break;case'map\x20actor':const _0x34ddfe=$gameActors[_0x31e49e(0x124)](_0x53ab4b)[_0x31e49e(0x169)]();_0x34ddfe===0x0?this[_0x31e49e(0x32b)]=$gamePlayer:this[_0x31e49e(0x32b)]=$gamePlayer[_0x31e49e(0x309)]()['follower'](_0x34ddfe-0x1);break;case _0x31e49e(0x25c):_0x53ab4b===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x31e49e(0x32b)]=$gamePlayer[_0x31e49e(0x309)]()[_0x31e49e(0x2a4)](_0x53ab4b-0x2);break;case'map\x20event':this[_0x31e49e(0x32b)]=$gameMap[_0x31e49e(0x49a)](_0x53ab4b);break;}this[_0x31e49e(0x32b)]&&this['updateAutoPosition']();},VisuMZ[_0x348c4(0x166)][_0x348c4(0x222)]=Window_Message[_0x348c4(0xf4)][_0x348c4(0x3e1)],Window_Message[_0x348c4(0xf4)][_0x348c4(0x3e1)]=function(){const _0x1395fa=_0x348c4;this[_0x1395fa(0x43e)](),VisuMZ[_0x1395fa(0x166)][_0x1395fa(0x222)]['call'](this);},Window_Message[_0x348c4(0xf4)][_0x348c4(0x43e)]=function(){const _0x5da0c3=_0x348c4;if(!this['_autoPositionTarget'])return;const _0x2321d8=SceneManager[_0x5da0c3(0x219)];if(!_0x2321d8)return;const _0x52b1c4=_0x2321d8[_0x5da0c3(0x28b)];if(!_0x52b1c4)return;const _0xca926b=_0x52b1c4[_0x5da0c3(0x44c)](this[_0x5da0c3(0x32b)]);if(!_0xca926b)return;let _0xad9bc0=_0xca926b['x'];if(SceneManager[_0x5da0c3(0x497)]())_0xad9bc0*=$gameScreen['zoomScale']();else{if(SceneManager[_0x5da0c3(0x3c0)]()&&Imported[_0x5da0c3(0x358)]){let _0x2d0b46=_0xca926b['x']-Graphics['boxWidth']*_0x52b1c4[_0x5da0c3(0x3db)]['x'];_0xad9bc0+=_0x2d0b46*(_0x52b1c4[_0x5da0c3(0x3e5)]['x']-0x1);}}_0xad9bc0-=this['width']/0x2,_0xad9bc0-=(Graphics[_0x5da0c3(0x1b3)]-Graphics[_0x5da0c3(0x3ac)])/0x2,_0xad9bc0+=this[_0x5da0c3(0x48f)]();let _0x213cfc=_0xca926b['y'];if(SceneManager[_0x5da0c3(0x497)]())_0x213cfc-=_0xca926b[_0x5da0c3(0x17e)]+0x8,_0x213cfc*=$gameScreen[_0x5da0c3(0x107)](),_0x213cfc-=this[_0x5da0c3(0x17e)]*$gameScreen[_0x5da0c3(0x107)]();else{if(SceneManager[_0x5da0c3(0x3c0)]()&&Imported[_0x5da0c3(0x358)]){let _0x5ed22e=_0xca926b[_0x5da0c3(0x17e)]*_0x52b1c4[_0x5da0c3(0x3e5)]['y'];_0x213cfc-=this['height']*_0x52b1c4[_0x5da0c3(0x3e5)]['y']+_0x5ed22e+0x8;let _0x41d61a=_0xca926b['y']-Graphics[_0x5da0c3(0x2fd)]*_0x52b1c4[_0x5da0c3(0x3db)]['y'];_0x213cfc+=_0x41d61a*(_0x52b1c4['scale']['y']-0x1);}else _0x213cfc-=_0xca926b[_0x5da0c3(0x17e)]+0x8,_0x213cfc-=this[_0x5da0c3(0x17e)];}_0x213cfc-=(Graphics['height']-Graphics[_0x5da0c3(0x2fd)])/0x2,_0x213cfc+=this[_0x5da0c3(0x46c)]();const _0x2aac05=$gameSystem['getMessageWindowXyOffsets']();_0xad9bc0+=_0x2aac05['x'],_0x213cfc+=_0x2aac05['y'],this['x']=Math['round'](_0xad9bc0),this['y']=Math[_0x5da0c3(0x46a)](_0x213cfc),this['clampPlacementPosition'](!![],![]),this[_0x5da0c3(0x1d1)]=this[_0x5da0c3(0x1d1)]||{},this[_0x5da0c3(0x1d1)]['x']=this['x'],this[_0x5da0c3(0x1d1)]['y']=this['y'],this['_forcedPosition'][_0x5da0c3(0x1b3)]=this[_0x5da0c3(0x1b3)],this[_0x5da0c3(0x1d1)][_0x5da0c3(0x17e)]=this[_0x5da0c3(0x17e)],this[_0x5da0c3(0x4a0)][_0x5da0c3(0x172)]();},Window_Message['prototype']['autoPositionOffsetX']=function(){return 0x0;},Window_Message[_0x348c4(0xf4)][_0x348c4(0x46c)]=function(){return 0x0;},Window_Message[_0x348c4(0xf4)][_0x348c4(0x1b9)]=function(){const _0x268ec4=_0x348c4;this[_0x268ec4(0x146)]=![],this[_0x268ec4(0x32b)]=undefined,$gameSystem[_0x268ec4(0x33a)](),this[_0x268ec4(0x217)](),this['openness']=0x0;},Window_Message[_0x348c4(0xf4)][_0x348c4(0x1ce)]=function(_0x3e9c6d){const _0xd8fe0d=_0x348c4;return Window_Base['prototype'][_0xd8fe0d(0x1ce)][_0xd8fe0d(0x290)](this,_0x3e9c6d);},Window_Message[_0x348c4(0xf4)]['postConvertEscapeCharacters']=function(_0x3cdf46){const _0x2f8a37=_0x348c4;return Window_Base[_0x2f8a37(0xf4)][_0x2f8a37(0x37a)][_0x2f8a37(0x290)](this,_0x3cdf46);},Window_Message['prototype'][_0x348c4(0x387)]=function(_0x38d29f){const _0x3c021a=_0x348c4;this['preFlushTextState'](_0x38d29f),Window_Base[_0x3c021a(0xf4)][_0x3c021a(0x387)][_0x3c021a(0x290)](this,_0x38d29f),this[_0x3c021a(0x361)](_0x38d29f);},Window_Message[_0x348c4(0xf4)]['preFlushTextState']=function(_0x368996){},Window_Message[_0x348c4(0xf4)]['postFlushTextState']=function(_0x4e0e6d){},Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x257)]=function(){return![];},Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x203)]=function(){const _0x1a6ebd=_0x348c4;Window_Base[_0x1a6ebd(0xf4)][_0x1a6ebd(0x203)][_0x1a6ebd(0x290)](this),this['changeTextColor'](this[_0x1a6ebd(0x396)]());},Window_NameBox['prototype']['defaultColor']=function(){const _0x2f496a=_0x348c4,_0x242321=VisuMZ[_0x2f496a(0x166)][_0x2f496a(0x2b2)][_0x2f496a(0x2fa)][_0x2f496a(0x2ee)];return ColorManager[_0x2f496a(0x47c)](_0x242321);},VisuMZ[_0x348c4(0x166)]['Window_NameBox_updatePlacement']=Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x172)],Window_NameBox[_0x348c4(0xf4)]['updatePlacement']=function(){const _0x2322c8=_0x348c4;VisuMZ[_0x2322c8(0x166)][_0x2322c8(0x177)][_0x2322c8(0x290)](this),this[_0x2322c8(0x2da)](),this[_0x2322c8(0x298)](),this[_0x2322c8(0x416)](),this[_0x2322c8(0x13e)]();},Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x1ce)]=function(_0x50a916){const _0x53acda=_0x348c4;return _0x50a916=_0x50a916['replace'](/<LEFT>/gi,this[_0x53acda(0x19b)][_0x53acda(0x2d2)](this,0x0)),_0x50a916=_0x50a916[_0x53acda(0x2f2)](/<CENTER>/gi,this[_0x53acda(0x19b)][_0x53acda(0x2d2)](this,0x5)),_0x50a916=_0x50a916['replace'](/<RIGHT>/gi,this[_0x53acda(0x19b)]['bind'](this,0xa)),_0x50a916=_0x50a916[_0x53acda(0x2f2)](/<POSITION:[ ](\d+)>/gi,(_0x6cddbb,_0x488319)=>this['setRelativePosition'](parseInt(_0x488319))),_0x50a916=_0x50a916[_0x53acda(0x2f2)](/<\/LEFT>/gi,''),_0x50a916=_0x50a916[_0x53acda(0x2f2)](/<\/CENTER>/gi,''),_0x50a916=_0x50a916[_0x53acda(0x2f2)](/<\/RIGHT>/gi,''),_0x50a916=_0x50a916[_0x53acda(0x23e)](),Window_Base[_0x53acda(0xf4)][_0x53acda(0x1ce)]['call'](this,_0x50a916);},Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x19b)]=function(_0x2ac42b){const _0x52e0c6=_0x348c4;return this[_0x52e0c6(0xc6)]=_0x2ac42b,'';},Window_NameBox[_0x348c4(0xf4)]['updateRelativePosition']=function(){const _0x2b1b6e=_0x348c4;if($gameMessage[_0x2b1b6e(0x49b)]())return;this[_0x2b1b6e(0xc6)]=this['_relativePosition']||0x0;const _0x170faf=this[_0x2b1b6e(0x188)],_0x14acb8=Math[_0x2b1b6e(0x455)](_0x170faf['width']*this[_0x2b1b6e(0xc6)]/0xa);this['x']=_0x170faf['x']+_0x14acb8-Math[_0x2b1b6e(0x455)](this[_0x2b1b6e(0x1b3)]/0x2),this['x']=this['x']['clamp'](_0x170faf['x'],_0x170faf['x']+_0x170faf[_0x2b1b6e(0x1b3)]-this['width']);},Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x298)]=function(){const _0x1ad366=_0x348c4;if($gameMessage[_0x1ad366(0x49b)]())return;this[_0x1ad366(0xc6)]=this[_0x1ad366(0xc6)]||0x0;const _0xa489bf=VisuMZ['MessageCore']['Settings'][_0x1ad366(0x2fa)][_0x1ad366(0x34c)],_0x11443b=VisuMZ[_0x1ad366(0x166)]['Settings'][_0x1ad366(0x2fa)][_0x1ad366(0x3f2)],_0xf80e8f=(0x5-this[_0x1ad366(0xc6)])/0x5;this['x']+=Math[_0x1ad366(0x455)](_0xa489bf*_0xf80e8f),this['y']+=_0x11443b;},Window_NameBox['prototype'][_0x348c4(0x13e)]=function(){const _0x1b3a78=_0x348c4,_0x27632f=this['_messageWindow'],_0xa23028=_0x27632f['y'],_0x955d2a=VisuMZ[_0x1b3a78(0x166)][_0x1b3a78(0x2b2)][_0x1b3a78(0x2fa)][_0x1b3a78(0x3f2)];_0xa23028>this['y']&&_0xa23028<this['y']+this[_0x1b3a78(0x17e)]-_0x955d2a&&(this['y']=_0x27632f['y']+_0x27632f[_0x1b3a78(0x17e)]);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x371)]=Window_NameBox['prototype'][_0x348c4(0x159)],Window_NameBox[_0x348c4(0xf4)][_0x348c4(0x159)]=function(){const _0xb7174=_0x348c4;this[_0xb7174(0xc6)]=0x0,VisuMZ['MessageCore'][_0xb7174(0x371)][_0xb7174(0x290)](this);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x36d)]=function(){return![];},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x257)]=function(){return!![];},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x18d)]=function(){const _0x4ff299=_0x348c4;return $gameSystem[_0x4ff299(0xda)]()+0x8;},Window_ChoiceList[_0x348c4(0xf4)]['maxCols']=function(){const _0x4c607b=_0x348c4;return $gameSystem[_0x4c607b(0x288)]();},Window_ChoiceList['prototype'][_0x348c4(0x35c)]=function(){const _0xc9cccf=_0x348c4;this[_0xc9cccf(0x159)](),this[_0xc9cccf(0x1ea)](),this[_0xc9cccf(0x36e)](),this[_0xc9cccf(0x46f)](),this[_0xc9cccf(0x289)]();},Window_ChoiceList['prototype'][_0x348c4(0x106)]=function(){const _0x4fc007=_0x348c4;$gameMessage[_0x4fc007(0x424)](this[_0x4fc007(0x365)]()),this[_0x4fc007(0x188)][_0x4fc007(0x38e)](),this[_0x4fc007(0x33d)](),this['_helpWindow']&&(this[_0x4fc007(0x27e)][_0x4fc007(0x2c7)](),this[_0x4fc007(0x27e)][_0x4fc007(0xc7)]());},VisuMZ[_0x348c4(0x166)][_0x348c4(0x427)]=Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x263)],Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x263)]=function(){const _0x5ea99e=_0x348c4;VisuMZ[_0x5ea99e(0x166)][_0x5ea99e(0x427)][_0x5ea99e(0x290)](this),this[_0x5ea99e(0x27e)]&&(this['_helpWindow']['clear'](),this[_0x5ea99e(0x27e)][_0x5ea99e(0xc7)]());},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x159)]=function(){const _0x4df0c3=_0x348c4;this[_0x4df0c3(0x3b1)](),this[_0x4df0c3(0x3df)](),this[_0x4df0c3(0x188)]&&(this[_0x4df0c3(0x172)](),this[_0x4df0c3(0x162)]()),this[_0x4df0c3(0x1a1)](),this['updateBackground'](),this[_0x4df0c3(0x1c6)](),Window_Selectable[_0x4df0c3(0xf4)][_0x4df0c3(0x159)][_0x4df0c3(0x290)](this);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x3df)]=function(){const _0x317cbe=_0x348c4;$gameMessage['_scriptCall']?this[_0x317cbe(0x349)]():this['makeCommandListShuffle'](),this[_0x317cbe(0x3e7)](),this[_0x317cbe(0x3f6)]();},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x349)]=function(){const _0x7b9b1f=_0x348c4,_0x6300a3=$gameMessage[_0x7b9b1f(0x359)]();let _0x3c3a83=0x0;for(let _0xced512 of _0x6300a3){_0xced512=this[_0x7b9b1f(0x240)](_0xced512);if(this[_0x7b9b1f(0x245)](_0xced512)){const _0x3568c0=this[_0x7b9b1f(0x376)](_0xced512),_0x587e32=this[_0x7b9b1f(0x259)](_0xced512);this['addCommand'](_0x3568c0,_0x7b9b1f(0xea),_0x587e32,_0x3c3a83);}_0x3c3a83++;}},Window_ChoiceList[_0x348c4(0xf4)]['makeCommandListShuffle']=function(){const _0x328bac=_0x348c4,_0x142c28=$gameMessage['choices'](),_0x32d4c9=$gameMessage[_0x328bac(0x20c)](),_0x40b450=$gameMessage[_0x328bac(0x11c)](),_0x1dabc3=_0x142c28[_0x328bac(0x3f1)];let _0x16d15=0x0;for(let _0xd29191=0x0;_0xd29191<_0x1dabc3;_0xd29191++){if(this['_list'][_0x328bac(0x3f1)]>=_0x40b450)break;const _0x512eee=_0x32d4c9[_0xd29191];let _0x1e518f=_0x142c28[_0x512eee];if(_0x1e518f===undefined)continue;_0x1e518f=this[_0x328bac(0x240)](_0x1e518f);if(this['isChoiceVisible'](_0x1e518f)){const _0x9102e0=this['parseChoiceText'](_0x1e518f),_0x1eb395=this[_0x328bac(0x259)](_0x1e518f);this[_0x328bac(0x1ef)](_0x9102e0,_0x328bac(0xea),_0x1eb395,_0x512eee);}_0x16d15++;}},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x240)]=function(_0x9c1500){const _0x54cd3c=_0x348c4;return Window_Base[_0x54cd3c(0xf4)][_0x54cd3c(0x30d)][_0x54cd3c(0x290)](this,_0x9c1500);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x245)]=function(_0x1863be){const _0x29ba71=_0x348c4;if(Imported[_0x29ba71(0x395)])$gameMessage[_0x29ba71(0x411)]();if(_0x1863be[_0x29ba71(0xcf)](/<HIDE>/i))return![];if(_0x1863be['match'](/<SHOW>/i))return!![];if(_0x1863be['match'](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3aa793=RegExp['$1']['split'](',')[_0x29ba71(0x144)](_0x18d6e2=>Number(_0x18d6e2)||0x0);if(_0x3aa793[_0x29ba71(0x253)](_0x34272e=>!$gameSwitches[_0x29ba71(0x456)](_0x34272e)))return![];}if(_0x1863be[_0x29ba71(0xcf)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4f5c81=RegExp['$1'][_0x29ba71(0x496)](',')['map'](_0x22d4dc=>Number(_0x22d4dc)||0x0);if(_0x4f5c81[_0x29ba71(0x459)](_0x922510=>!$gameSwitches[_0x29ba71(0x456)](_0x922510)))return![];}if(_0x1863be['match'](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x6acfd9=RegExp['$1'][_0x29ba71(0x496)](',')[_0x29ba71(0x144)](_0x26ff21=>Number(_0x26ff21)||0x0);if(_0x6acfd9[_0x29ba71(0x459)](_0x692bd6=>$gameSwitches[_0x29ba71(0x456)](_0x692bd6)))return![];}if(_0x1863be[_0x29ba71(0xcf)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x18cca6=RegExp['$1']['split'](',')[_0x29ba71(0x144)](_0x585303=>Number(_0x585303)||0x0);if(_0x18cca6['some'](_0xb4a0eb=>$gameSwitches[_0x29ba71(0x456)](_0xb4a0eb)))return![];}return!![];},Window_ChoiceList[_0x348c4(0xf4)]['parseChoiceText']=function(_0x45e29e){const _0x1292c7=_0x348c4;let _0x4a28ff=_0x45e29e;return _0x4a28ff=_0x4a28ff[_0x1292c7(0x2f2)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x4a28ff=_0x4a28ff[_0x1292c7(0x2f2)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x4a28ff;},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x259)]=function(_0x464019){const _0x3901a5=_0x348c4;if(Imported[_0x3901a5(0x395)])$gameMessage[_0x3901a5(0x411)]();if(_0x464019[_0x3901a5(0xcf)](/<DISABLE>/i))return![];if(_0x464019[_0x3901a5(0xcf)](/<ENABLE>/i))return!![];if(_0x464019[_0x3901a5(0xcf)](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5710ae=RegExp['$1'][_0x3901a5(0x496)](',')[_0x3901a5(0x144)](_0x1a9da9=>Number(_0x1a9da9)||0x0);if(_0x5710ae[_0x3901a5(0x253)](_0x4a05bf=>!$gameSwitches[_0x3901a5(0x456)](_0x4a05bf)))return![];}if(_0x464019[_0x3901a5(0xcf)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3c4a73=RegExp['$1']['split'](',')[_0x3901a5(0x144)](_0x5d0ab8=>Number(_0x5d0ab8)||0x0);if(_0x3c4a73[_0x3901a5(0x459)](_0x3dac29=>!$gameSwitches[_0x3901a5(0x456)](_0x3dac29)))return![];}if(_0x464019[_0x3901a5(0xcf)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x322928=RegExp['$1']['split'](',')[_0x3901a5(0x144)](_0x367977=>Number(_0x367977)||0x0);if(_0x322928[_0x3901a5(0x459)](_0x45515a=>$gameSwitches['value'](_0x45515a)))return![];}if(_0x464019[_0x3901a5(0xcf)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xbafa33=RegExp['$1'][_0x3901a5(0x496)](',')['map'](_0x4b012d=>Number(_0x4b012d)||0x0);if(_0xbafa33[_0x3901a5(0x253)](_0x477121=>$gameSwitches['value'](_0x477121)))return![];}return!![];},Window_ChoiceList['prototype']['clearChoiceHelpDescriptions']=function(){const _0x26cd6d=_0x348c4;this[_0x26cd6d(0x3dc)]={},this['_helpWindow']&&(this['_helpWindow'][_0x26cd6d(0x2c7)](),this[_0x26cd6d(0x27e)][_0x26cd6d(0xc7)]());},Window_ChoiceList['prototype']['applyChoiceHelpDescriptions']=function(){const _0x2ed0a2=_0x348c4,_0x58632f=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x2dc032 of this[_0x2ed0a2(0x38a)]){if(!_0x2dc032)continue;const _0x31f75a=this[_0x2ed0a2(0x38a)]['indexOf'](_0x2dc032);if(_0x2dc032[_0x2ed0a2(0x438)][_0x2ed0a2(0xcf)](_0x58632f)){const _0x431d32=String(RegExp['$1']);this[_0x2ed0a2(0x3dc)][_0x31f75a]=_0x431d32[_0x2ed0a2(0x23e)](),_0x2dc032[_0x2ed0a2(0x438)]=_0x2dc032[_0x2ed0a2(0x438)][_0x2ed0a2(0x2f2)](_0x58632f,'')[_0x2ed0a2(0x23e)]();}else this[_0x2ed0a2(0x3dc)][_0x31f75a]='';}},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x289)]=function(){const _0x51c956=_0x348c4;if(this[_0x51c956(0x38a)][_0x51c956(0x253)](_0x1b7243=>_0x1b7243[_0x51c956(0x417)]))return;this['deactivate'](),this['close'](),$gameMessage[_0x51c956(0x346)]=[],this[_0x51c956(0x188)][_0x51c956(0x44b)]()&&this[_0x51c956(0x188)][_0x51c956(0x434)]();},VisuMZ[_0x348c4(0x166)][_0x348c4(0x3a5)]=Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x172)],Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x172)]=function(){const _0x2787ef=_0x348c4;VisuMZ[_0x2787ef(0x166)][_0x2787ef(0x3a5)][_0x2787ef(0x290)](this),this['addChoiceDistance'](),this['clampPlacementPosition']();},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x162)]=function(){const _0x352c68=_0x348c4;if(!this['_cancelButton'])return;const _0x2ed0ab=0x8,_0x531ec1=this['_cancelButton'],_0x120c23=this['x']+this[_0x352c68(0x1b3)],_0x2c322e=Math[_0x352c68(0x455)]((Graphics[_0x352c68(0x1b3)]-Graphics['boxWidth'])/0x2);_0x120c23>=Graphics['boxWidth']+_0x2c322e-_0x531ec1[_0x352c68(0x1b3)]+_0x2ed0ab?_0x531ec1['x']=-_0x531ec1[_0x352c68(0x1b3)]-_0x2ed0ab:_0x531ec1['x']=this['width']+_0x2ed0ab,_0x531ec1['y']=this[_0x352c68(0x17e)]/0x2-_0x531ec1[_0x352c68(0x17e)]/0x2;},VisuMZ[_0x348c4(0x166)][_0x348c4(0x112)]=Window_ChoiceList['prototype'][_0x348c4(0x43d)],Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x43d)]=function(){const _0x28aa80=_0x348c4;return this['_messageWindow']?this[_0x28aa80(0x35e)]():VisuMZ[_0x28aa80(0x166)][_0x28aa80(0x112)][_0x28aa80(0x290)](this);},Window_ChoiceList['prototype'][_0x348c4(0x35e)]=function(){const _0xac1366=_0x348c4,_0x278f50=$gameMessage[_0xac1366(0x1fe)]();if(_0x278f50===0x1)return(Graphics[_0xac1366(0x3ac)]-this[_0xac1366(0x108)]())/0x2;else return _0x278f50===0x2?this[_0xac1366(0x188)]['x']+this['_messageWindow'][_0xac1366(0x1b3)]-this['windowWidth']():this[_0xac1366(0x188)]['x'];},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x108)]=function(){const _0x19992d=_0x348c4,_0x221ff8=(this['maxChoiceWidth']()+this['colSpacing']())*this[_0x19992d(0x128)]()+this[_0x19992d(0x1de)]*0x2;return Math[_0x19992d(0x2e0)](_0x221ff8,Graphics[_0x19992d(0x1b3)]);},Window_ChoiceList[_0x348c4(0xf4)]['numVisibleRows']=function(){const _0x406e13=_0x348c4,_0x11440d=$gameMessage[_0x406e13(0x359)]()[_0x406e13(0x144)](_0x3aaf47=>this[_0x406e13(0x240)](_0x3aaf47))[_0x406e13(0x28f)](_0x4fc2f0=>this['isChoiceVisible'](_0x4fc2f0));let _0x59197f=Math[_0x406e13(0xd9)](_0x11440d[_0x406e13(0x3f1)]/this[_0x406e13(0x128)]());if(!$gameMessage[_0x406e13(0xcc)]){const _0x473775=$gameMessage[_0x406e13(0x11c)]();_0x59197f=Math[_0x406e13(0xd9)](Math[_0x406e13(0x2e0)](_0x473775,_0x11440d[_0x406e13(0x3f1)])/this[_0x406e13(0x128)]());}return Math[_0x406e13(0x32c)](0x1,Math[_0x406e13(0x2e0)](_0x59197f,this[_0x406e13(0xee)]()));},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0xee)]=function(){const _0xa45d5b=_0x348c4,_0x48dc4e=this[_0xa45d5b(0x188)],_0xe85771=_0x48dc4e?_0x48dc4e['y']:0x0,_0x43744c=_0x48dc4e?_0x48dc4e[_0xa45d5b(0x17e)]:0x0,_0x2d63e1=Graphics['boxHeight']/0x2;return _0xe85771<_0x2d63e1&&_0xe85771+_0x43744c>_0x2d63e1?0x4:$gameSystem['getChoiceListMaxRows']();},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x296)]=function(){const _0x355256=_0x348c4;let _0x23e1aa=this[_0x355256(0x202)]();for(const _0x15d564 of this[_0x355256(0x38a)]){const _0x3c81b7=_0x15d564[_0x355256(0x438)],_0x50eacc=this[_0x355256(0x175)](_0x3c81b7),_0x3524c4=this[_0x355256(0xdf)](_0x3c81b7)[_0x355256(0x1b3)]+_0x50eacc,_0x2ae403=Math[_0x355256(0xd9)](_0x3524c4)+this[_0x355256(0x291)]()*0x2;_0x23e1aa=Math[_0x355256(0x32c)](_0x23e1aa,_0x2ae403);}return _0x23e1aa;},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x202)]=function(){const _0x474f2e=_0x348c4;let _0x5885a4=$gameSystem[_0x474f2e(0x1e7)]();const _0x1186ad=$gameMessage[_0x474f2e(0x359)]();for(const _0x23315d of _0x1186ad){_0x23315d[_0x474f2e(0xcf)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x5885a4=Math[_0x474f2e(0x32c)](_0x5885a4,Number(RegExp['$1'])));}return Math[_0x474f2e(0x32c)](_0x5885a4,0x1);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x394)]=function(){const _0x57184f=_0x348c4,_0x4ed3cb=$gameSystem[_0x57184f(0x436)]()||0x0,_0x560b0d=this['_messageWindow']['y'],_0x44b313=this[_0x57184f(0x188)][_0x57184f(0x17e)],_0x206705=this['_messageWindow'][_0x57184f(0x4a0)],_0x5837c1=_0x206705[_0x57184f(0x451)]>0x0&&_0x206705[_0x57184f(0x1b3)]>0x0,_0x2a8ed2=_0x5837c1?_0x206705[_0x57184f(0x17e)]:0x0;if(_0x4ed3cb<0x0&&(this[_0x57184f(0x188)]['isClosed']()||this[_0x57184f(0x188)][_0x57184f(0x143)]()))this['y']=Math[_0x57184f(0x46a)]((Graphics[_0x57184f(0x2fd)]-this[_0x57184f(0x17e)])/0x2);else{if(_0x560b0d>=Graphics[_0x57184f(0x2fd)]/0x2)_0x4ed3cb>=0x0?this['y']-=_0x4ed3cb:this['y']=Math[_0x57184f(0x455)]((_0x560b0d-this[_0x57184f(0x17e)]-_0x2a8ed2)/0x2);else{if(_0x4ed3cb>=0x0)this['y']+=_0x4ed3cb;else{const _0x518bc0=Graphics[_0x57184f(0x2fd)]-(_0x560b0d+_0x44b313+_0x2a8ed2);this['y']+=Math[_0x57184f(0x455)]((_0x518bc0-this[_0x57184f(0x17e)])/0x2)+_0x2a8ed2;}}}},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x176)]=function(_0x1065c9){const _0x29be10=_0x348c4,_0x3f80db=this[_0x29be10(0x42d)](_0x1065c9);if(_0x3f80db){const _0x50c061=ImageManager[_0x29be10(0x3fd)](_0x3f80db),_0x144cbd=this[_0x29be10(0x3de)](),_0x5659da=_0x144cbd+this[_0x29be10(0x40e)](_0x1065c9),_0x3ed993=this[_0x29be10(0x197)](_0x1065c9);_0x50c061['addLoadListener'](this['drawChoiceLocationImage'][_0x29be10(0x2d2)](this,_0x1065c9,!![],_0x5659da,_0x3ed993,_0x50c061));return;}this['drawItemContents'](_0x1065c9);},Window_ChoiceList['prototype'][_0x348c4(0x168)]=function(_0x345d35){const _0x114f24=_0x348c4,_0x4b7247=this[_0x114f24(0x197)](_0x345d35),_0x17b2fe=this[_0x114f24(0x3de)](),_0x38e0a=_0x17b2fe+this[_0x114f24(0x40e)](_0x345d35);this[_0x114f24(0x3c9)](this['isCommandEnabled'](_0x345d35));const _0x5a030c=this['textSizeEx'](_0x38e0a)[_0x114f24(0x17e)],_0x3080ba=_0x4b7247['x']+this[_0x114f24(0x175)](_0x38e0a),_0x5182a1=Math['max'](_0x4b7247['y'],_0x4b7247['y']+Math['round']((_0x4b7247[_0x114f24(0x17e)]-_0x5a030c)/0x2));this[_0x114f24(0x1ca)](_0x38e0a,_0x3080ba,_0x5182a1,_0x4b7247[_0x114f24(0x1b3)]),this[_0x114f24(0x1fd)](_0x345d35),this['requestChoiceBackgroundImage'](_0x345d35,_0x38e0a,_0x4b7247);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x3de)]=function(){const _0x1958e5=_0x348c4;return $gameSystem['getChoiceListTextAlign']()!==_0x1958e5(0x137)?_0x1958e5(0x16f)['format']($gameSystem['getChoiceListTextAlign']()):'';},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x175)]=function(_0x570a2f){let _0x268851=0x0;return _0x570a2f['match'](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x268851=Number(RegExp['$1'])),_0x268851;},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x1fd)]=function(_0x472bd5){const _0x54fcfa=_0x348c4;if(!Imported[_0x54fcfa(0x46e)])return;const _0x5838cb=this['commandName'](_0x472bd5);let _0xce73=![],_0x422c72=![],_0x4053cf=ColorManager[_0x54fcfa(0x483)](),_0x3d4658=ColorManager[_0x54fcfa(0x324)]();if(_0x5838cb[_0x54fcfa(0xcf)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x4053cf=ColorManager[_0x54fcfa(0x37b)](RegExp['$1'])[_0x54fcfa(0x23e)](),_0x3d4658=ColorManager[_0x54fcfa(0x37b)](RegExp['$2'])['trim'](),_0xce73=!![];else{if(_0x5838cb[_0x54fcfa(0xcf)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x51f566=String(RegExp['$1'])['toLowerCase']()[_0x54fcfa(0x23e)]();switch(_0x51f566){case'red':_0x4053cf=_0x3d4658='#f26c4f',_0x422c72=!![];break;case _0x54fcfa(0x3da):_0x4053cf=_0x3d4658='#fbaf5d',_0x422c72=!![];break;case _0x54fcfa(0x1c0):_0x4053cf=_0x3d4658=_0x54fcfa(0x111),_0x422c72=!![];break;case _0x54fcfa(0x15e):_0x4053cf=_0x3d4658=_0x54fcfa(0x140),_0x422c72=!![];break;case'blue':_0x4053cf=_0x3d4658='#6dcff6',_0x422c72=!![];break;case'purple':case _0x54fcfa(0x3c8):_0x4053cf=_0x3d4658=_0x54fcfa(0xe5),_0x422c72=!![];break;case _0x54fcfa(0x38b):_0x4053cf=_0x3d4658=_0x54fcfa(0xf3),_0x422c72=!![];break;case'pink':_0x4053cf=_0x3d4658=_0x54fcfa(0x368),_0x422c72=!![];break;case _0x54fcfa(0x48e):_0x4053cf=_0x3d4658=_0x54fcfa(0x200),_0x422c72=!![];break;case _0x54fcfa(0xd4):case _0x54fcfa(0x48d):_0x4053cf=_0x3d4658=_0x54fcfa(0x3a3),_0x422c72=!![];break;case'black':_0x4053cf=_0x3d4658=_0x54fcfa(0x2fe),_0x422c72=!![];break;case _0x54fcfa(0x13a):_0x4053cf=_0x3d4658=ColorManager[_0x54fcfa(0x1f4)](),_0x422c72=!![];break;case'no':_0x4053cf=_0x3d4658=ColorManager['powerDownColor'](),_0x422c72=!![];break;case'system':_0x4053cf=_0x3d4658=ColorManager[_0x54fcfa(0x20e)](),_0x422c72=!![];break;case'crisis':_0x4053cf=_0x3d4658=ColorManager[_0x54fcfa(0x493)](),_0x422c72=!![];break;default:_0x4053cf=_0x3d4658=ColorManager[_0x54fcfa(0x37b)](_0x51f566),_0x422c72=!![];break;}_0xce73=!![];}}if(!_0xce73)return;const _0x1d9f90=this[_0x54fcfa(0x12e)](_0x472bd5);this[_0x54fcfa(0x415)][_0x54fcfa(0x3ec)](_0x1d9f90['x'],_0x1d9f90['y'],_0x1d9f90[_0x54fcfa(0x1b3)],_0x1d9f90[_0x54fcfa(0x17e)]),this[_0x54fcfa(0xf0)](_0x1d9f90,_0x4053cf,_0x3d4658,_0x422c72);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0xf0)]=function(_0x39213d,_0x3f1423,_0xc62393,_0x53c39d){const _0x1b54ad=_0x348c4,_0x435486=ColorManager[_0x1b54ad(0x483)](),_0x70ed3d=ColorManager['dimColor2'](),_0x152854=_0x3f1423??ColorManager['itemBackColor1'](),_0x1728be=_0xc62393??_0x3f1423,_0x3c7ece=_0x39213d['x'],_0x3d2704=_0x39213d['y'],_0x435304=_0x39213d[_0x1b54ad(0x1b3)],_0x13c5ce=_0x39213d[_0x1b54ad(0x17e)];this[_0x1b54ad(0x415)][_0x1b54ad(0x2ca)](_0x3c7ece,_0x3d2704,_0x435304,_0x13c5ce,_0x152854,_0x1728be,!![]),_0x53c39d&&this['contentsBack'][_0x1b54ad(0x2ca)](_0x3c7ece,_0x3d2704,_0x435304,_0x13c5ce,_0x435486,_0x1728be,!![]),this[_0x1b54ad(0x415)][_0x1b54ad(0x20f)](_0x3c7ece,_0x3d2704,_0x435304,_0x13c5ce,_0x435486);},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x42d)]=function(_0x401254){const _0x28922c=_0x348c4,_0x271dc8=this[_0x28922c(0x3de)](),_0xcd4a8d=_0x271dc8+this[_0x28922c(0x40e)](_0x401254);let _0x102e5a='';if(_0xcd4a8d[_0x28922c(0xcf)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x102e5a=String(RegExp['$1'])['trim']();else _0xcd4a8d['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x102e5a=String(RegExp['$2'])[_0x28922c(0x23e)]());return _0x102e5a;},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x2b0)]=function(_0x6e20eb,_0x1f7caf,_0x2c15d0){const _0x5a3938=_0x348c4;let _0x1db833='';if(_0x1f7caf['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x1db833=String(RegExp['$1'])['trim']();else _0x1f7caf[_0x5a3938(0xcf)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x1db833=String(RegExp['$2'])['trim']());if(_0x1db833){const _0x41cbca=ImageManager[_0x5a3938(0x3fd)](_0x1db833);_0x41cbca[_0x5a3938(0x430)](this[_0x5a3938(0x399)][_0x5a3938(0x2d2)](this,_0x6e20eb,![],_0x1f7caf,_0x2c15d0,_0x41cbca));}},Window_ChoiceList[_0x348c4(0xf4)][_0x348c4(0x399)]=function(_0x3fd2fa,_0x1cbc85,_0x382248,_0x271648,_0x59cc69){const _0x2f1346=_0x348c4,_0x475645=this[_0x2f1346(0x3de)](),_0x343362=_0x475645+this[_0x2f1346(0x40e)](_0x3fd2fa);if(_0x382248!==_0x343362)return;const _0x4d5dfb=this[_0x2f1346(0x197)](_0x3fd2fa);if(['x','y',_0x2f1346(0x1b3),'height']['some'](_0x14029a=>_0x4d5dfb[_0x14029a]!==_0x271648[_0x14029a]))return;let _0x28b351=0x0,_0xd68740='';if(_0x1cbc85&&_0x343362[_0x2f1346(0xcf)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x1cbc85&&_0x343362[_0x2f1346(0xcf)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0xd68740=String(RegExp['$1'])[_0x2f1346(0x367)]()[_0x2f1346(0x23e)]();else!_0x1cbc85&&_0x343362[_0x2f1346(0xcf)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0xd68740=String(RegExp['$1'])['toLowerCase']()[_0x2f1346(0x23e)]());}switch(_0xd68740){case _0x2f1346(0x3fb):case _0x2f1346(0x2ce):case _0x2f1346(0x29a):case _0x2f1346(0x1a5):case _0x2f1346(0x39c):case _0x2f1346(0x377):case'1':_0x28b351=0x1;break;case _0x2f1346(0x448):case _0x2f1346(0x2a6):case _0x2f1346(0x457):case _0x2f1346(0x3e8):case _0x2f1346(0x3b0):case _0x2f1346(0xed):case _0x2f1346(0x22a):case'2':_0x28b351=0x2;break;case _0x2f1346(0x3c4):case _0x2f1346(0x191):case _0x2f1346(0x19f):case _0x2f1346(0x2b9):case _0x2f1346(0x2cd):case _0x2f1346(0x328):case'3':_0x28b351=0x3;break;case _0x2f1346(0x30b):case _0x2f1346(0x212):case _0x2f1346(0x26b):case'4':_0x28b351=0x4;break;case _0x2f1346(0x1d9):case _0x2f1346(0x41f):case _0x2f1346(0x492):case _0x2f1346(0x1ad):case'5':_0x28b351=0x5;break;case _0x2f1346(0x1f8):case _0x2f1346(0x2f4):case _0x2f1346(0x19a):case'6':_0x28b351=0x6;break;case _0x2f1346(0x484):case _0x2f1346(0x403):case _0x2f1346(0x228):case'upleft':case _0x2f1346(0x285):case'up\x20left':case'7':_0x28b351=0x7;break;case _0x2f1346(0x41e):case _0x2f1346(0x193):case'upper\x20center':case _0x2f1346(0x1c4):case _0x2f1346(0x18c):case _0x2f1346(0x12c):case'up':case'8':_0x28b351=0x8;break;case _0x2f1346(0x37e):case _0x2f1346(0x1cd):case _0x2f1346(0x366):case _0x2f1346(0x3d9):case _0x2f1346(0x42e):case _0x2f1346(0x295):case'9':_0x28b351=0x9;break;}const _0x41494d=_0x1cbc85?this[_0x2f1346(0x14e)]:this[_0x2f1346(0x415)],_0x2a3f32=this[_0x2f1346(0x12e)](_0x3fd2fa);!_0x1cbc85&&_0x41494d[_0x2f1346(0x3ec)](_0x2a3f32['x']-0x1,_0x2a3f32['y']-0x1,_0x2a3f32[_0x2f1346(0x1b3)]+0x2,_0x2a3f32[_0x2f1346(0x17e)]+0x2);const _0x80bbe3=_0x2a3f32['x']+0x2,_0x228587=_0x2a3f32['y']+0x2,_0x553a71=_0x2a3f32['width']-0x4,_0x5577b4=_0x2a3f32[_0x2f1346(0x17e)]-0x4,_0x1ab292=_0x59cc69[_0x2f1346(0x1b3)],_0x18860e=_0x59cc69['height'];let _0x48a646=_0x80bbe3,_0x5d90e2=_0x228587,_0x256883=_0x553a71,_0x2a4a20=_0x5577b4;const _0x2e588f=_0x553a71/_0x1ab292,_0x2e082d=_0x5577b4/_0x18860e;let _0x1e05c0=Math[_0x2f1346(0x2e0)](_0x2e588f,_0x2e082d);if(_0x1cbc85)_0x1e05c0=Math['min'](_0x1e05c0,0x1);_0x28b351!==0x0&&(_0x256883=Math[_0x2f1346(0x46a)](_0x1ab292*_0x1e05c0),_0x2a4a20=Math['round'](_0x18860e*_0x1e05c0));switch(_0x28b351){case 0x1:case 0x4:case 0x7:_0x48a646=_0x80bbe3;break;case 0x2:case 0x5:case 0x8:_0x48a646+=Math[_0x2f1346(0x46a)]((_0x553a71-_0x256883)/0x2);break;case 0x3:case 0x6:case 0x9:_0x48a646+=_0x553a71-_0x256883;break;}switch(_0x28b351){case 0x7:case 0x8:case 0x9:_0x5d90e2=_0x228587;break;case 0x4:case 0x5:case 0x6:_0x5d90e2+=Math[_0x2f1346(0x46a)]((_0x5577b4-_0x2a4a20)/0x2);break;case 0x1:case 0x2:case 0x3:_0x5d90e2+=_0x5577b4-_0x2a4a20;break;}_0x41494d['blt'](_0x59cc69,0x0,0x0,_0x1ab292,_0x18860e,_0x48a646,_0x5d90e2,_0x256883,_0x2a4a20),_0x1cbc85&&this['drawItemContents'](_0x3fd2fa);},Window_ChoiceList[_0x348c4(0xf4)]['updateHelp']=function(){const _0x1fe034=_0x348c4;this[_0x1fe034(0x27e)][_0x1fe034(0x2c7)]();if(!this[_0x1fe034(0x3dc)])return;const _0x1115c6=this[_0x1fe034(0x169)]();this[_0x1fe034(0x3dc)][_0x1115c6]?(this[_0x1fe034(0x27e)][_0x1fe034(0x186)](this['_choiceHelpDescriptions'][_0x1115c6]),this[_0x1fe034(0x27e)][_0x1fe034(0x31a)]()):(this[_0x1fe034(0x27e)][_0x1fe034(0x2c7)](),this['_helpWindow'][_0x1fe034(0xc7)]());},Window_EventItem['prototype'][_0x348c4(0x444)]=function(){const _0x5a9f0e=_0x348c4,_0x1c4de7=$gameMessage[_0x5a9f0e(0x44f)]();_0x1c4de7==='skill'&&Imported['VisuMZ_1_SkillsStatesCore']?this[_0x5a9f0e(0x12b)]():Window_ItemList[_0x5a9f0e(0xf4)]['makeItemList'][_0x5a9f0e(0x290)](this);},Window_EventItem[_0x348c4(0xf4)][_0x348c4(0x12b)]=function(){const _0x59721e=_0x348c4,_0x2f2e28=$gameMessage['itemChoiceActor']();this[_0x59721e(0x1ba)]=_0x2f2e28?_0x2f2e28[_0x59721e(0x22b)]()[_0x59721e(0x28f)](_0x456c1d=>this[_0x59721e(0xc2)](_0x456c1d)):[],this[_0x59721e(0xc2)](null)&&this[_0x59721e(0x1ba)][_0x59721e(0x122)](null);},VisuMZ[_0x348c4(0x166)][_0x348c4(0x460)]=Window_EventItem['prototype'][_0x348c4(0xc2)],Window_EventItem[_0x348c4(0xf4)]['includes']=function(_0x518499){const _0x1f7347=_0x348c4,_0x406393=$gameMessage['itemChoiceItypeId']();if(_0x406393===_0x1f7347(0x397)){if(!DataManager[_0x1f7347(0x383)](_0x518499))return![];const _0x2840ba=$gameMessage[_0x1f7347(0x178)]();if(_0x2840ba>0x0){if(_0x518499['wtypeId']!==_0x2840ba)return![];}return!![];}else{if(_0x406393===_0x1f7347(0x23c)){if(!DataManager[_0x1f7347(0x1d3)](_0x518499))return![];const _0x2b5d88=$gameMessage['itemChoiceAtypeId']();if(_0x2b5d88>0x0){if(_0x518499['atypeId']!==_0x2b5d88)return![];}const _0x2a177b=$gameMessage[_0x1f7347(0x33b)]();if(_0x2a177b>0x0){if(_0x518499[_0x1f7347(0x278)]!==_0x2a177b)return![];}return!![];}else{if(_0x406393===_0x1f7347(0x409)){if(!DataManager[_0x1f7347(0x373)](_0x518499))return![];const _0x5226b9=$gameMessage['itemChoiceActor']();if(_0x5226b9[_0x1f7347(0x490)](_0x518499))return![];if(!_0x5226b9[_0x1f7347(0x385)](_0x518499))return![];const _0x242991=$gameMessage[_0x1f7347(0x479)]();if(_0x242991>0x0){const _0x1e3c9b=DataManager[_0x1f7347(0x3d8)](_0x518499);if(!_0x1e3c9b[_0x1f7347(0xc2)](_0x242991))return![];}return!![];}else return VisuMZ[_0x1f7347(0x166)][_0x1f7347(0x460)]['call'](this,_0x518499);}}},VisuMZ['MessageCore'][_0x348c4(0x22f)]=Window_ItemList[_0x348c4(0xf4)]['drawItemNumber'],Window_ItemList[_0x348c4(0xf4)][_0x348c4(0x2dd)]=function(_0x5aa776,_0x420875,_0x3873aa,_0x5ce074){const _0x40a30d=_0x348c4,_0xe5a436=$gameMessage[_0x40a30d(0x44f)]();if(_0xe5a436===_0x40a30d(0x409)){const _0x5e3725=$gameMessage[_0x40a30d(0x2a2)]();this[_0x40a30d(0x2d3)](_0x5e3725,_0x5aa776,_0x420875,_0x3873aa,_0x5ce074);}else VisuMZ[_0x40a30d(0x166)][_0x40a30d(0x22f)]['call'](this,_0x5aa776,_0x420875,_0x3873aa,_0x5ce074);},Window_MapName[_0x348c4(0xf4)]['refreshWithTextCodeSupport']=function(){const _0x14e4a2=_0x348c4;this[_0x14e4a2(0x14e)][_0x14e4a2(0x2c7)]();let _0x4152d0=$gameMap[_0x14e4a2(0x1c2)]();if(_0x4152d0){const _0x151a70=this[_0x14e4a2(0x3f8)];this[_0x14e4a2(0x2a9)](0x0,0x0,_0x151a70,this[_0x14e4a2(0x30e)]()),_0x4152d0=this[_0x14e4a2(0x49c)](_0x4152d0);const _0x3938ce=this[_0x14e4a2(0xdf)](_0x4152d0)[_0x14e4a2(0x1b3)];this[_0x14e4a2(0x1ca)](_0x4152d0,Math[_0x14e4a2(0x455)]((_0x151a70-_0x3938ce)/0x2),0x0);}},Window_MapName[_0x348c4(0xf4)][_0x348c4(0x49c)]=function(_0x25d9d1){const _0xab2310=_0x348c4;if(_0x25d9d1[_0xab2310(0xcf)](/<LEFT>/gi))this['x']=0x0;else{if(_0x25d9d1[_0xab2310(0xcf)](/<CENTER>/gi))this['x']=Math['floor']((Graphics[_0xab2310(0x3ac)]-this[_0xab2310(0x1b3)])/0x2);else _0x25d9d1[_0xab2310(0xcf)](/<RIGHT>/gi)&&(this['x']=Graphics[_0xab2310(0x3ac)]-this[_0xab2310(0x1b3)]);}_0x25d9d1=_0x25d9d1['replace'](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x25d9d1=_0x25d9d1['replace'](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0x25d9d1[_0xab2310(0xcf)](/<TOP>/gi))this['y']=0x0;else{if(_0x25d9d1['match'](/<MIDDLE>/gi))this['y']=Math[_0xab2310(0x455)]((Graphics[_0xab2310(0x2fd)]-this[_0xab2310(0x17e)])/0x2);else _0x25d9d1[_0xab2310(0xcf)](/<BOTTOM>/gi)&&(this['y']=Graphics[_0xab2310(0x2fd)]-this[_0xab2310(0x17e)]);}return _0x25d9d1=_0x25d9d1[_0xab2310(0x2f2)](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x25d9d1=_0x25d9d1[_0xab2310(0x2f2)](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x25d9d1[_0xab2310(0xcf)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0x25d9d1=_0x25d9d1[_0xab2310(0x2f2)](/<X:[ ]([\+\-]\d+)>/gi,'')),_0x25d9d1[_0xab2310(0xcf)](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0x25d9d1=_0x25d9d1[_0xab2310(0x2f2)](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0x25d9d1;};