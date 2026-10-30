// ** Sauvegarde **

import { player } from "./Player";

export const save = () => {
    let data = {
        m_score: player.m_score,
        bille_mangees: player.bille_mangees,
        fantome_manges: player.fantome_manges,
        parties_jouees: player.parties_jouees
    }
    localStorage.setItem("save_pacman", JSON.stringify(data));
}
export const get_save = () => {
    let save = localStorage.getItem("save_pacman");
    if (!save) return;

    let data = JSON.parse(save);

    player.m_score = data.m_score ?? 0;
    player.bille_mangees = data.bille_mangees ?? 0;
    player.fantome_manges = data.fantome_manges ?? 0;
    player.parties_jouees = data.parties_jouees ?? 0;
}
