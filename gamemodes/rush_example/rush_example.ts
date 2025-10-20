const version = "0.0.1";

type Sector = {
    sector: mod.Sector
    mcoms: MCOM[]
    attackerHQ: mod.HQ
    defenderHQ: mod.HQ
    name: string
    active: boolean
    nextSectorID?: number
}

type MCOM = {
    name: string
    mcom: mod.MCOM
    active: boolean
    destroyed: boolean
    position: mod.Vector
    rotation: mod.Vector
}

const mcomFuseTime = 5;

const team1 = mod.GetTeam(1);
const team2 = mod.GetTeam(2);

let currentSector: Sector;

const sector1ID = 2001;
const sector1AttackerHQID = 1001;
const sector1DefenderHQID = 1002;
const sector1MCOMAID = 3001;
const sector1MCOMBID = 3002;
const sector1 = mod.GetSector(sector1ID);
const sector1AttackerHQ = mod.GetHQ(sector1AttackerHQID);
const sector1DefenderHQ = mod.GetHQ(sector1DefenderHQID);
const sector1MCOMA = mod.GetMCOM(sector1MCOMAID);
const sector1MCOMB = mod.GetMCOM(sector1MCOMBID);

const sector2ID = 2002;
const sector2AttackerHQID = 1003;
const sector2DefenderHQID = 1004;
const sector2MCOMAID = 3003;
const sector2MCOMBID = 3004;
const sector2 = mod.GetSector(sector2ID);
const sector2AttackerHQ = mod.GetHQ(sector2AttackerHQID);
const sector2DefenderHQ = mod.GetHQ(sector2DefenderHQID);
const sector2MCOMA = mod.GetMCOM(sector2MCOMAID);
const sector2MCOMB = mod.GetMCOM(sector2MCOMBID);

const sector3ID = 2003;
const sector3AttackerHQID = 1005;
const sector3DefenderHQID = 1006;
const sector3MCOMAID = 3005;
const sector3MCOMBID = 3006;
const sector3 = mod.GetSector(sector3ID);
const sector3AttackerHQ = mod.GetHQ(sector3AttackerHQID);
const sector3DefenderHQ = mod.GetHQ(sector3DefenderHQID);
const sector3MCOMA = mod.GetMCOM(sector3MCOMAID);
const sector3MCOMB = mod.GetMCOM(sector3MCOMBID);

const MCOMS: Record<number, MCOM>  = {
    [sector1MCOMAID]: {
        name: "MCOM A",
        mcom: sector1MCOMA,
        active: true,
        destroyed: false,
        position: mod.GetObjectPosition(sector1MCOMA),
        rotation: mod.GetObjectRotation(sector1MCOMA),
    },
    [sector1MCOMBID]: {
        name: "MCOM B",
        mcom: sector1MCOMB,
        active: true,
        destroyed: false,
        position: mod.GetObjectPosition(sector1MCOMB),
        rotation: mod.GetObjectRotation(sector1MCOMB),
    },
    [sector2MCOMAID]: {
        name: "MCOM A",
        mcom: sector2MCOMA,
        active: false,
        destroyed: false,
        position: mod.GetObjectPosition(sector2MCOMA),
        rotation: mod.GetObjectRotation(sector2MCOMA),
    },
    [sector2MCOMBID]: {
        name: "MCOM B",
        mcom: sector2MCOMB,
        active: false,
        destroyed: false,
        position: mod.GetObjectPosition(sector2MCOMB),
        rotation: mod.GetObjectRotation(sector2MCOMB),
    },
    [sector3MCOMAID]: {
        name: "MCOM A",
        mcom: sector3MCOMA,
        active: false,
        destroyed: false,
        position: mod.GetObjectPosition(sector3MCOMA),
        rotation: mod.GetObjectRotation(sector3MCOMA),
    },
    [sector3MCOMBID]: {
        name: "MCOM B",
        mcom: sector3MCOMB,
        active: false,
        destroyed: false,
        position: mod.GetObjectPosition(sector3MCOMB),
        rotation: mod.GetObjectRotation(sector3MCOMB),
    },
}

const Sectors: Record<number, Sector> = {
    [sector1ID]:  {
        name: "Sector 1",
        sector: sector1,
        attackerHQ: sector1AttackerHQ,
        defenderHQ: sector1DefenderHQ,
        mcoms: [
            MCOMS[sector1MCOMAID],
            MCOMS[sector1MCOMBID],
        ],
        active: true,
        nextSectorID: sector2ID,
    },
    [sector2ID]: {
        name: "Sector 2",
        sector: sector2,
        attackerHQ: sector2AttackerHQ,
        defenderHQ: sector2DefenderHQ,
        mcoms: [
            MCOMS[sector2MCOMAID],
            MCOMS[sector2MCOMBID],
        ],
        active: false,
        nextSectorID: sector3ID,
    },
    [sector3ID]: {
        name: "Sector 3",
        sector: sector3,
        attackerHQ: sector3AttackerHQ,
        defenderHQ: sector3DefenderHQ,
        mcoms:  [
            MCOMS[sector3MCOMAID],
            MCOMS[sector3MCOMBID],
        ],
        active: false
    },
};

function AllSectors(): Sector[] {
    let sectors = [];
    for (const sectorID in Sectors) {
        sectors.push(Sectors[sectorID]);
    }
    return sectors;
}

function AllMCOMs(): MCOM[] {
    let mcoms = [];
    for (const mcomID in MCOMS) {
        mcoms.push(MCOMS[mcomID]);
    }
    return mcoms;
}

function enableSector(sector: Sector): void {
    console.log(`enabled sector ${sector.name}`);

    sector.active = true;
    currentSector = sector;
    mod.EnableHQ(sector.attackerHQ, true)
    mod.EnableHQ(sector.defenderHQ, true)
    mod.SetHQTeam(sector.attackerHQ, mod.GetTeam(1));
    mod.SetHQTeam(sector.defenderHQ, mod.GetTeam(2));
    mod.EnableGameModeObjective(sector.sector, true);

    for (const mcom of sector.mcoms) {
        console.log(`enabled ${mcom.name} in ${sector.name}`);

        mcom.active = true;
        mod.EnableGameModeObjective(mcom.mcom, true);
        mod.SetMCOMFuseTime(mcom.mcom, mcomFuseTime);
    }
}

function disableSector(sector: Sector): void {
    console.log(`disabled sector ${sector.name}`);

    sector.active = false;
    mod.EnableHQ(sector.attackerHQ, false)
    mod.EnableHQ(sector.defenderHQ, false)
    mod.SetHQTeam(sector.attackerHQ, mod.GetTeam(1));
    mod.SetHQTeam(sector.defenderHQ, mod.GetTeam(2));
    mod.EnableGameModeObjective(sector.sector, false);
    for (const mcom of sector.mcoms) {
        console.log(`disabled ${mcom.name} in ${sector.name}`);

        mcom.active = false;
        mod.EnableGameModeObjective(mcom.mcom, false);
        mod.SetMCOMFuseTime(mcom.mcom, mcomFuseTime);
    }
}

export async function OnMCOMArmed(eventMCOM: mod.MCOM): Promise<void> {
    const mcom = MCOMS[mod.GetObjId(eventMCOM)]

    console.log(`${mcom.name} in ${currentSector.name} armed`);
}

export async function OnMCOMDefused(eventMCOM: mod.MCOM): Promise<void> {
    const mcom = MCOMS[mod.GetObjId(eventMCOM)]

    console.log(`${mcom.name} in ${currentSector.name} defused`);
}

export async function OnMCOMDestroyed(eventMCOM: mod.MCOM): Promise<void> {
    const mcom = MCOMS[mod.GetObjId(eventMCOM)]
    console.log(`${mcom.name} in ${currentSector.name} destroyed`);

    mcom.destroyed = true;

    mod.SetGameModeScore(team1, mod.GetGameModeScore(team1) + 1);

    let destroyedMCOMS = 0;
    for (const mcom of currentSector.mcoms) {
        if (mcom.destroyed) {
            destroyedMCOMS++;
        }
    }

    if (destroyedMCOMS !== currentSector.mcoms.length) {
        return;
    }

    // All MCOMs destroyed in sector.
    if (!currentSector.nextSectorID) {
        // Game win logic...
        mod.DisplayNotificationMessage(mod.Message("You win!!!"));
    } else {
        const previousSector = currentSector;
        const nextSector = Sectors[currentSector.nextSectorID];

        mod.DisplayNotificationMessage(mod.Message("Advance to sector {}", nextSector.name))
        enableSector(nextSector);
        mod.Wait(10).then(() => {
            disableSector(previousSector);
        });
    }
}

export async function OnGameModeStarted(): Promise<void> {
    mod.DisplayNotificationMessage(mod.Message("Rush example version {}", version));
    console.log("OnGameModeStarted");

    currentSector = Sectors[sector1ID];

    mod.SetGameModeTargetScore(AllMCOMs().length);
    mod.SetGameModeTimeLimit(10 * 60);
    mod.SetScoreboardType(mod.ScoreboardType.CustomTwoTeams);
    mod.SetScoreboardHeader(mod.Message("Attackers"), mod.Message("Defenders"));
    mod.SetScoreboardColumnNames(mod.Message("Column1"), mod.Message("Column2"), mod.Message("Column3"), mod.Message("Column4"), mod.Message("Column5"));

    for (const sector of AllSectors()) {
        if (sector.active) {
            enableSector(sector);
        } else {
            disableSector(sector);
        }
    }
}
