Hooks.on("createChatMessage", async (message) => {
    if (!message.isRoll || !message.rolls || message.rolls.length === 0) return;

    let roll = message.rolls[0];

    // Verifica se a rolagem foi um d20 e se houve um 1
    if (roll.dice[0]?.faces === 20 && roll.dice[0].results.some(r => r.result === 1)) {
        // Nome exato da tabela no Foundry
        let tableName = "Falha Crítica";  // Altere para o nome exato da sua tabela

        // Obtém a tabela pelo nome
        let table = game.tables.getName(tableName);

        if (table) {
            await table.draw();  // Rola a tabela automaticamente
            ui.notifications.info(`Falha crítica! Rolando tabela: ${tableName}`);
        } else {
            ui.notifications.error(`Tabela '${tableName}' não encontrada!`);
        }
    }
});
