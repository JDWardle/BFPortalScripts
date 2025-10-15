import { Logging } from "../../logging/logging";

// Set the log level to whatever you need.
// Debug   = Log everything.
// Info    = Log everything excluding Debug logs.
// Warning = Log only Warning and Error logs.
// Error   = Log only Error logs.
const logger: Logging.Logger = new Logging.Logger(Logging.LogLevel.Debug);

export function OngoingGlobal(): void {
    // Calling update on an interval is necessary to get proper output.
    logger.update();
}

export async function OnGameModeStarted() {
    logger.debug(mod.Message("OnGameModeStarted"));

    // show() needs to be called to display the log UI.
    // Call hide() to hide the UI as needed.
    logger.show();

    while (true) {
        await mod.Wait(5);

        logger.debug(mod.Message("tick"));
    }
}

export function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint): void {
    logger.debug(mod.Message("OnPlayerInteract eventPlayer {} eventInteractPoint {}", eventPlayer, mod.GetObjId(eventInteractPoint)));
}

export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
    logger.debug(mod.Message("debug log"));
    logger.info(mod.Message("info log"));
    logger.warning(mod.Message("warning log"));
    logger.error(mod.Message("error log"));
}

export function OnPlayerLeaveGame(eventNumber: number): void {
    logger.debug(mod.Message("OnPlayerLeaveGame: eventNumber {}", eventNumber));
}

export function OnPlayerDeployed(eventPlayer: mod.Player): void {
    logger.debug(mod.Message("OnPayerDeployed eventPlayer: {}", eventPlayer));
}

export function OnPlayerDied(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock): void {
    logger.debug(mod.Message("OnPlayerDied eventPlayer: {} eventOtherPlayer: {}", eventPlayer, eventOtherPlayer));
}

